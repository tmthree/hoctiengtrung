// Expansion seed — adds HSK 3 expanded + HSK 4 content
// Does NOT delete existing data — uses upsert / createMany with skipDuplicates
// Run with: npx tsx prisma/seed-expansion.ts

import * as dotenv from "dotenv";
import * as path from "path";
dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

import { PrismaClient } from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import { neonConfig } from "@neondatabase/serverless";
import ws from "ws";

import { hsk3VocabularyExpanded } from "./data/hsk3-vocabulary-expanded";
import { hsk4Vocabulary } from "./data/hsk4-vocabulary";
import { lessonsHsk3Expanded } from "./data/lessons-hsk3-expanded";
import { lessonsHsk4 } from "./data/lessons-hsk4";

neonConfig.webSocketConstructor = ws;

const dbUrl = process.env.DATABASE_URL;
if (!dbUrl) {
  console.error("DATABASE_URL not set! Check .env.local");
  process.exit(1);
}
console.log("Connecting to:", dbUrl.substring(0, 40) + "...");

const adapter = new PrismaNeon({ connectionString: dbUrl });
const prisma = new PrismaClient({ adapter });

// ==================== HELPERS ====================

async function findOrCreateVocab(
  word: {
    simplified: string;
    pinyin: string;
    meaning: string;
    exampleSentence: string;
    examplePinyin: string;
    exampleMeaning: string;
    category: string;
  },
  hskLevel: number
): Promise<{ id: string; isNew: boolean }> {
  // simplified is not @unique in schema — find by simplified + hskLevel
  const existing = await prisma.vocabulary.findFirst({
    where: { simplified: word.simplified, hskLevel },
  });
  if (existing) {
    return { id: existing.id, isNew: false };
  }
  const v = await prisma.vocabulary.create({
    data: {
      simplified: word.simplified,
      pinyin: word.pinyin,
      meaning: word.meaning,
      exampleSentence: word.exampleSentence,
      examplePinyin: word.examplePinyin,
      exampleMeaning: word.exampleMeaning,
      hskLevel,
      category: word.category,
    },
  });
  return { id: v.id, isNew: true };
}

// ==================== MAIN ====================

async function main() {
  console.log("Starting expansion seed (additive — no data deletion)...\n");

  // ── Step 1: Upsert HSK 3 expanded vocabulary (60 new words) ──
  const vocabMap: Record<string, string> = {};
  let hsk3NewCount = 0;
  let hsk3UpdateCount = 0;

  for (const word of hsk3VocabularyExpanded) {
    const { id, isNew } = await findOrCreateVocab(word, 3);
    vocabMap[word.simplified] = id;
    if (isNew) {
      hsk3NewCount++;
    } else {
      hsk3UpdateCount++;
    }
  }
  console.log(
    `HSK 3 expanded vocab: ${hsk3NewCount} created, ${hsk3UpdateCount} skipped (already exist) — ${hsk3VocabularyExpanded.length} total processed.`
  );

  // ── Step 2: Upsert HSK 4 vocabulary (80 new words) ──
  let hsk4NewCount = 0;
  let hsk4UpdateCount = 0;

  for (const word of hsk4Vocabulary) {
    const { id, isNew } = await findOrCreateVocab(word, 4);
    vocabMap[word.simplified] = id;
    if (isNew) {
      hsk4NewCount++;
    } else {
      hsk4UpdateCount++;
    }
  }
  console.log(
    `HSK 4 vocab: ${hsk4NewCount} created, ${hsk4UpdateCount} skipped (already exist) — ${hsk4Vocabulary.length} total processed.`
  );

  // ── Step 3: Seed HSK 3 expanded lessons ──
  let totalExercises = 0;
  let lessonsCreated = 0;

  for (const ld of lessonsHsk3Expanded) {
    // Skip if lesson already exists (by title + hskLevel)
    const existing = await prisma.lesson.findFirst({
      where: { title: ld.title, hskLevel: ld.hskLevel },
    });
    if (existing) {
      console.log(`  Skipping existing lesson: "${ld.title}" (HSK${ld.hskLevel})`);
      continue;
    }

    const { vocabularyKeys, exercises: exerciseData, ...lessonFields } = ld;

    const lesson = await prisma.lesson.create({
      data: {
        ...lessonFields,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        content: lessonFields.content as any,
        isPublished: true,
      },
    });

    // Link vocabulary
    let vocabOrder = 0;
    for (const key of vocabularyKeys) {
      // Look up from vocabMap (newly seeded) or from DB (pre-existing)
      let vocabId = vocabMap[key];
      if (!vocabId) {
        const dbVocab = await prisma.vocabulary.findFirst({ where: { simplified: key } });
        if (dbVocab) vocabId = dbVocab.id;
      }
      if (vocabId) {
        await prisma.lessonVocabulary.create({
          data: { lessonId: lesson.id, vocabularyId: vocabId, order: vocabOrder++ },
        });
      }
    }

    // Create exercises
    for (const ex of exerciseData) {
      await prisma.exercise.create({
        data: {
          lessonId: lesson.id,
          type: ex.type,
          order: ex.order,
          difficulty: ex.difficulty,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          question: ex.question as any,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          answer: ex.answer as any,
          explanation: ex.explanation,
        },
      });
      totalExercises++;
    }

    lessonsCreated++;
    console.log(
      `  Created lesson [HSK${lesson.hskLevel}]: "${lesson.title}" (${exerciseData.length} exercises, ${vocabOrder} vocab links)`
    );
  }

  // ── Step 4: Seed HSK 4 lessons ──
  for (const ld of lessonsHsk4) {
    const existing = await prisma.lesson.findFirst({
      where: { title: ld.title, hskLevel: ld.hskLevel },
    });
    if (existing) {
      console.log(`  Skipping existing lesson: "${ld.title}" (HSK${ld.hskLevel})`);
      continue;
    }

    const { vocabularyKeys, exercises: exerciseData, ...lessonFields } = ld;

    const lesson = await prisma.lesson.create({
      data: {
        ...lessonFields,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        content: lessonFields.content as any,
        isPublished: true,
      },
    });

    let vocabOrder = 0;
    for (const key of vocabularyKeys) {
      let vocabId = vocabMap[key];
      if (!vocabId) {
        const dbVocab = await prisma.vocabulary.findFirst({ where: { simplified: key } });
        if (dbVocab) vocabId = dbVocab.id;
      }
      if (vocabId) {
        await prisma.lessonVocabulary.create({
          data: { lessonId: lesson.id, vocabularyId: vocabId, order: vocabOrder++ },
        });
      }
    }

    for (const ex of exerciseData) {
      await prisma.exercise.create({
        data: {
          lessonId: lesson.id,
          type: ex.type,
          order: ex.order,
          difficulty: ex.difficulty,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          question: ex.question as any,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          answer: ex.answer as any,
          explanation: ex.explanation,
        },
      });
      totalExercises++;
    }

    lessonsCreated++;
    console.log(
      `  Created lesson [HSK${lesson.hskLevel}]: "${lesson.title}" (${exerciseData.length} exercises, ${vocabOrder} vocab links)`
    );
  }

  // ── Summary ──
  const totalVocabInDb = await prisma.vocabulary.count();
  const totalLessonsInDb = await prisma.lesson.count();
  const totalExercisesInDb = await prisma.exercise.count();

  console.log("\n=== Expansion Seed Summary ===");
  console.log(`New HSK 3 words seeded:  ${hsk3NewCount}`);
  console.log(`New HSK 4 words seeded:  ${hsk4NewCount}`);
  console.log(`New lessons created:     ${lessonsCreated}`);
  console.log(`New exercises created:   ${totalExercises}`);
  console.log("──────────────────────────────");
  console.log(`Total vocab in DB:       ${totalVocabInDb}`);
  console.log(`Total lessons in DB:     ${totalLessonsInDb}`);
  console.log(`Total exercises in DB:   ${totalExercisesInDb}`);
  console.log("Expansion seed completed successfully.");
}

main()
  .catch((e) => {
    console.error("Expansion seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
