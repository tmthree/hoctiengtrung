// Extra exercises seed — adds 70 exercises each to HSK 3, 4, 5, 6
// Run with: npx tsx prisma/seed-exercises-extra.ts

import * as dotenv from "dotenv";
import * as path from "path";
dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

import { PrismaClient } from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import { neonConfig } from "@neondatabase/serverless";
import ws from "ws";

import { exerciseLessonsHsk3Extra } from "./data/exercises-hsk3-extra";
import { exerciseLessonsHsk4Extra } from "./data/exercises-hsk4-extra";
import { exerciseLessonsHsk5Extra } from "./data/exercises-hsk5-extra";
import { exerciseLessonsHsk6Extra } from "./data/exercises-hsk6-extra";

neonConfig.webSocketConstructor = ws;

const dbUrl = process.env.DATABASE_URL;
if (!dbUrl) {
  console.error("DATABASE_URL not set!");
  process.exit(1);
}

const adapter = new PrismaNeon({ connectionString: dbUrl });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Starting extra exercises seed...\n");

  const allLessons = [
    ...exerciseLessonsHsk3Extra,
    ...exerciseLessonsHsk4Extra,
    ...exerciseLessonsHsk5Extra,
    ...exerciseLessonsHsk6Extra,
  ];

  let lessonsCreated = 0;
  let lessonsSkipped = 0;
  let totalExercises = 0;

  for (const ld of allLessons) {
    const existing = await prisma.lesson.findFirst({
      where: { title: ld.title, hskLevel: ld.hskLevel },
    });

    if (existing) {
      console.log(`  Skip: "${ld.title}" (exists)`);
      lessonsSkipped++;
      continue;
    }

    const { vocabularyKeys, exercises: exData, ...fields } = ld;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const lesson = await prisma.lesson.create({ data: { ...fields, content: fields.content as any, isPublished: true } });

    // Link vocabulary keys if they exist in DB
    let vo = 0;
    for (const key of vocabularyKeys) {
      const dbv = await prisma.vocabulary.findFirst({ where: { simplified: key } });
      if (dbv) {
        await prisma.lessonVocabulary.create({
          data: { lessonId: lesson.id, vocabularyId: dbv.id, order: vo++ },
        });
      }
    }

    // Create exercises
    for (const ex of exData) {
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
    console.log(`  Created [HSK${lesson.hskLevel}]: "${lesson.title}" (${exData.length} ex)`);
  }

  // Summary by HSK level
  const hsk3Count = await prisma.exercise.count({
    where: { lesson: { hskLevel: 3 } },
  });
  const hsk4Count = await prisma.exercise.count({
    where: { lesson: { hskLevel: 4 } },
  });
  const hsk5Count = await prisma.exercise.count({
    where: { lesson: { hskLevel: 5 } },
  });
  const hsk6Count = await prisma.exercise.count({
    where: { lesson: { hskLevel: 6 } },
  });

  const [tv, tl, te] = await Promise.all([
    prisma.vocabulary.count(),
    prisma.lesson.count(),
    prisma.exercise.count(),
  ]);

  console.log("\n=== Extra Exercises Seed Done ===");
  console.log(`Lessons: ${lessonsCreated} created, ${lessonsSkipped} skipped`);
  console.log(`Exercises this run: ${totalExercises}`);
  console.log(`\nExercise counts by level:`);
  console.log(`  HSK 3: ${hsk3Count} exercises`);
  console.log(`  HSK 4: ${hsk4Count} exercises`);
  console.log(`  HSK 5: ${hsk5Count} exercises`);
  console.log(`  HSK 6: ${hsk6Count} exercises`);
  console.log(`\nDB totals: ${tv} vocab, ${tl} lessons, ${te} exercises`);
}

main()
  .catch((e) => { console.error("Seed failed:", e); process.exit(1); })
  .finally(() => prisma.$disconnect());
