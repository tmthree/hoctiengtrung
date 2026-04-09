// Seed extra exercises for HSK 7, 8 and 9 — adds 70 exercises per level (7 lessons × 10)
// Run with: npx tsx prisma/seed-exercises-hsk789-extra.ts

import * as dotenv from "dotenv";
import * as path from "path";
dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

import { PrismaClient } from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import { neonConfig } from "@neondatabase/serverless";
import ws from "ws";

import { exerciseLessonsHsk7Extra } from "./data/exercises-hsk7-extra";
import { exerciseLessonsHsk8Extra } from "./data/exercises-hsk8-extra";
import { exerciseLessonsHsk9Extra } from "./data/exercises-hsk9-extra";

neonConfig.webSocketConstructor = ws;

const dbUrl = process.env.DATABASE_URL;
if (!dbUrl) {
  console.error("DATABASE_URL not set!");
  process.exit(1);
}

const adapter = new PrismaNeon({ connectionString: dbUrl });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Starting HSK 7-9 extra exercises seed...\n");

  let lessonsCreated = 0;
  let lessonsSkipped = 0;
  let totalExercises = 0;

  const allLessons = [
    ...exerciseLessonsHsk7Extra,
    ...exerciseLessonsHsk8Extra,
    ...exerciseLessonsHsk9Extra,
  ];

  for (const ld of allLessons) {
    // Skip if lesson already exists (idempotent)
    const existing = await prisma.lesson.findFirst({
      where: { title: ld.title, hskLevel: ld.hskLevel },
    });

    if (existing) {
      console.log(`  Skip: "${ld.title}" (exists)`);
      lessonsSkipped++;
      continue;
    }

    const { vocabularyKeys, exercises: exData, ...fields } = ld;

    // Create lesson
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const lesson = await prisma.lesson.create({
      data: {
        ...fields,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        content: fields.content as any,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        type: fields.type as any,
        isPublished: true,
      },
    });

    // Link vocabulary keys if any
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
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          type: ex.type as any,
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
      `  Created [HSK${lesson.hskLevel}]: "${lesson.title}" (${exData.length} exercises, ${vo} vocab links)`
    );
  }

  // Summary counts
  const [tv, tl, te] = await Promise.all([
    prisma.vocabulary.count(),
    prisma.lesson.count(),
    prisma.exercise.count(),
  ]);

  console.log("\n=== HSK 7-9 Extra Exercises Seed Done ===");
  console.log(`Lessons created: ${lessonsCreated} | Skipped: ${lessonsSkipped}`);
  console.log(`Exercises added: ${totalExercises}`);
  console.log(`DB totals: ${tv} vocab, ${tl} lessons, ${te} exercises`);
}

main()
  .catch((e) => {
    console.error("Seed failed:", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
