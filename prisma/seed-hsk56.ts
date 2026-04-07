// HSK 5-6 seed — adds HSK 5 and HSK 6 content
// Run with: npx tsx prisma/seed-hsk56.ts

import * as dotenv from "dotenv";
import * as path from "path";
dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

import { PrismaClient } from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import { neonConfig } from "@neondatabase/serverless";
import ws from "ws";

import { hsk5Vocabulary } from "./data/hsk5-vocabulary";
import { hsk6Vocabulary } from "./data/hsk6-vocabulary";
import { lessonsHsk5 } from "./data/lessons-hsk5";
import { lessonsHsk6 } from "./data/lessons-hsk6";

neonConfig.webSocketConstructor = ws;

const dbUrl = process.env.DATABASE_URL;
if (!dbUrl) {
  console.error("DATABASE_URL not set!");
  process.exit(1);
}

const adapter = new PrismaNeon({ connectionString: dbUrl });
const prisma = new PrismaClient({ adapter });

async function findOrCreateVocab(
  word: { simplified: string; pinyin: string; meaning: string; exampleSentence: string; examplePinyin: string; exampleMeaning: string; category: string },
  hskLevel: number
): Promise<{ id: string; isNew: boolean }> {
  const existing = await prisma.vocabulary.findFirst({
    where: { simplified: word.simplified, hskLevel },
  });
  if (existing) return { id: existing.id, isNew: false };
  const v = await prisma.vocabulary.create({
    data: { ...word, hskLevel },
  });
  return { id: v.id, isNew: true };
}

async function main() {
  console.log("Starting HSK 5-6 seed...\n");
  const vocabMap: Record<string, string> = {};

  // Seed HSK 5 vocabulary
  let h5New = 0, h5Skip = 0;
  for (const word of hsk5Vocabulary) {
    const { id, isNew } = await findOrCreateVocab(word, 5);
    vocabMap[word.simplified] = id;
    isNew ? h5New++ : h5Skip++;
  }
  console.log(`HSK 5 vocab: ${h5New} created, ${h5Skip} skipped`);

  // Seed HSK 6 vocabulary
  let h6New = 0, h6Skip = 0;
  for (const word of hsk6Vocabulary) {
    const { id, isNew } = await findOrCreateVocab(word, 6);
    vocabMap[word.simplified] = id;
    isNew ? h6New++ : h6Skip++;
  }
  console.log(`HSK 6 vocab: ${h6New} created, ${h6Skip} skipped`);

  // Seed lessons
  let lessonsCreated = 0, totalExercises = 0;
  const allLessons = [...lessonsHsk5, ...lessonsHsk6];

  for (const ld of allLessons) {
    const existing = await prisma.lesson.findFirst({
      where: { title: ld.title, hskLevel: ld.hskLevel },
    });
    if (existing) {
      console.log(`  Skip: "${ld.title}" (exists)`);
      continue;
    }

    const { vocabularyKeys, exercises: exData, ...fields } = ld;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const lesson = await prisma.lesson.create({ data: { ...fields, content: fields.content as any, isPublished: true } });

    let vo = 0;
    for (const key of vocabularyKeys) {
      let vid = vocabMap[key];
      if (!vid) {
        const dbv = await prisma.vocabulary.findFirst({ where: { simplified: key } });
        if (dbv) vid = dbv.id;
      }
      if (vid) {
        await prisma.lessonVocabulary.create({ data: { lessonId: lesson.id, vocabularyId: vid, order: vo++ } });
      }
    }

    for (const ex of exData) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await prisma.exercise.create({ data: { lessonId: lesson.id, type: ex.type, order: ex.order, difficulty: ex.difficulty, question: ex.question as any, answer: ex.answer as any, explanation: ex.explanation } });
      totalExercises++;
    }

    lessonsCreated++;
    console.log(`  Created [HSK${lesson.hskLevel}]: "${lesson.title}" (${exData.length} ex, ${vo} vocab)`);
  }

  const [tv, tl, te] = await Promise.all([
    prisma.vocabulary.count(),
    prisma.lesson.count(),
    prisma.exercise.count(),
  ]);

  console.log("\n=== HSK 5-6 Seed Done ===");
  console.log(`HSK5: ${h5New} words | HSK6: ${h6New} words | Lessons: ${lessonsCreated} | Exercises: ${totalExercises}`);
  console.log(`DB totals: ${tv} vocab, ${tl} lessons, ${te} exercises`);
}

main()
  .catch((e) => { console.error("Seed failed:", e); process.exit(1); })
  .finally(() => prisma.$disconnect());
