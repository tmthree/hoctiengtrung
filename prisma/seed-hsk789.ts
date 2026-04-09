// HSK 7-9 seed — adds HSK 7, 8 and 9 content
// Run with: npx tsx prisma/seed-hsk789.ts

import * as dotenv from "dotenv";
import * as path from "path";
dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

import { PrismaClient } from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import { neonConfig } from "@neondatabase/serverless";
import ws from "ws";

import { hsk7Vocabulary } from "./data/hsk7-vocabulary";
import { hsk8Vocabulary } from "./data/hsk8-vocabulary";
import { hsk9Vocabulary } from "./data/hsk9-vocabulary";
import { lessonsHsk7 } from "./data/lessons-hsk7";
import { lessonsHsk8 } from "./data/lessons-hsk8";
import { lessonsHsk9 } from "./data/lessons-hsk9";

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
  console.log("Starting HSK 7-9 seed...\n");
  const vocabMap: Record<string, string> = {};

  // Seed HSK 7 vocabulary
  let h7New = 0, h7Skip = 0;
  for (const word of hsk7Vocabulary) {
    const { id, isNew } = await findOrCreateVocab(word, 7);
    vocabMap[word.simplified] = id;
    isNew ? h7New++ : h7Skip++;
  }
  console.log(`HSK 7 vocab: ${h7New} created, ${h7Skip} skipped`);

  // Seed HSK 8 vocabulary
  let h8New = 0, h8Skip = 0;
  for (const word of hsk8Vocabulary) {
    const { id, isNew } = await findOrCreateVocab(word, 8);
    vocabMap[word.simplified] = id;
    isNew ? h8New++ : h8Skip++;
  }
  console.log(`HSK 8 vocab: ${h8New} created, ${h8Skip} skipped`);

  // Seed HSK 9 vocabulary
  let h9New = 0, h9Skip = 0;
  for (const word of hsk9Vocabulary) {
    const { id, isNew } = await findOrCreateVocab(word, 9);
    vocabMap[word.simplified] = id;
    isNew ? h9New++ : h9Skip++;
  }
  console.log(`HSK 9 vocab: ${h9New} created, ${h9Skip} skipped`);

  // Seed lessons
  let lessonsCreated = 0, totalExercises = 0;
  const allLessons = [...lessonsHsk7, ...lessonsHsk8, ...lessonsHsk9];

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

  console.log("\n=== HSK 7-9 Seed Done ===");
  console.log(`HSK7: ${h7New} words | HSK8: ${h8New} words | HSK9: ${h9New} words`);
  console.log(`Lessons: ${lessonsCreated} | Exercises: ${totalExercises}`);
  console.log(`DB totals: ${tv} vocab, ${tl} lessons, ${te} exercises`);
}

main()
  .catch((e) => { console.error("Seed failed:", e); process.exit(1); })
  .finally(() => prisma.$disconnect());
