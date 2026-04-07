// Seed script — run with: npm run db:seed (uses tsx)
// Imports from prisma/data/ for modular content management
import * as dotenv from "dotenv";
import * as path from "path";
dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

import { PrismaClient } from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import { neonConfig } from "@neondatabase/serverless";
import ws from "ws";

import { hsk1Vocabulary } from "./data/hsk1-vocabulary";
import { hsk1VocabularyExpanded } from "./data/hsk1-vocabulary-expanded";
import { hsk2Vocabulary } from "./data/hsk2-vocabulary";
import { hsk2VocabularyExpanded } from "./data/hsk2-vocabulary-expanded";
import { hsk3Vocabulary } from "./data/hsk3-vocabulary";
import { lessonData } from "./data/lessons";
import { lessonDataExpanded } from "./data/lessons-expanded";

// Required for @neondatabase/serverless in Node.js environment
neonConfig.webSocketConstructor = ws;

const dbUrl = process.env.DATABASE_URL;
if (!dbUrl) {
  console.error("DATABASE_URL not set! Check .env.local");
  process.exit(1);
}
console.log("Connecting to:", dbUrl.substring(0, 40) + "...");

const adapter = new PrismaNeon({ connectionString: dbUrl });
const prisma = new PrismaClient({ adapter });

// ==================== MAIN SEED FUNCTION ====================

async function main() {
  console.log("Starting comprehensive seed...");

  // ── Clean existing data in dependency order ──
  await prisma.quizAttempt.deleteMany();
  await prisma.vocabularyReview.deleteMany();
  await prisma.userProgress.deleteMany();
  await prisma.lessonVocabulary.deleteMany();
  await prisma.exercise.deleteMany();
  await prisma.lesson.deleteMany();
  await prisma.vocabulary.deleteMany();
  console.log("Cleaned existing data.");

  // ── Insert vocabulary: HSK 1 ──
  const createdVocab: Record<string, string> = {};

  for (const word of hsk1Vocabulary) {
    const v = await prisma.vocabulary.create({
      data: {
        simplified: word.simplified,
        pinyin: word.pinyin,
        meaning: word.meaning,
        exampleSentence: word.exampleSentence,
        examplePinyin: word.examplePinyin,
        exampleMeaning: word.exampleMeaning,
        hskLevel: 1,
        category: word.category,
      },
    });
    createdVocab[word.simplified] = v.id;
  }
  console.log(`Created ${hsk1Vocabulary.length} HSK 1 words (base).`);

  // ── Insert vocabulary: HSK 1 Expanded ──
  for (const word of hsk1VocabularyExpanded) {
    const v = await prisma.vocabulary.create({
      data: {
        simplified: word.simplified,
        pinyin: word.pinyin,
        meaning: word.meaning,
        exampleSentence: word.exampleSentence,
        examplePinyin: word.examplePinyin,
        exampleMeaning: word.exampleMeaning,
        hskLevel: word.hskLevel,
        category: word.category,
      },
    });
    createdVocab[word.simplified] = v.id;
  }
  console.log(`Created ${hsk1VocabularyExpanded.length} HSK 1 words (expanded).`);

  // ── Insert vocabulary: HSK 2 ──
  for (const word of hsk2Vocabulary) {
    const v = await prisma.vocabulary.create({
      data: {
        simplified: word.simplified,
        pinyin: word.pinyin,
        meaning: word.meaning,
        exampleSentence: word.exampleSentence,
        examplePinyin: word.examplePinyin,
        exampleMeaning: word.exampleMeaning,
        hskLevel: 2,
        category: word.category,
      },
    });
    createdVocab[word.simplified] = v.id;
  }
  console.log(`Created ${hsk2Vocabulary.length} HSK 2 words (base).`);

  // ── Insert vocabulary: HSK 2 Expanded ──
  for (const word of hsk2VocabularyExpanded) {
    const v = await prisma.vocabulary.create({
      data: {
        simplified: word.simplified,
        pinyin: word.pinyin,
        meaning: word.meaning,
        exampleSentence: word.exampleSentence,
        examplePinyin: word.examplePinyin,
        exampleMeaning: word.exampleMeaning,
        hskLevel: word.hskLevel,
        category: word.category,
      },
    });
    createdVocab[word.simplified] = v.id;
  }
  console.log(`Created ${hsk2VocabularyExpanded.length} HSK 2 words (expanded).`);

  // ── Insert vocabulary: HSK 3 ──
  for (const word of hsk3Vocabulary) {
    const v = await prisma.vocabulary.create({
      data: {
        simplified: word.simplified,
        pinyin: word.pinyin,
        meaning: word.meaning,
        exampleSentence: word.exampleSentence,
        examplePinyin: word.examplePinyin,
        exampleMeaning: word.exampleMeaning,
        hskLevel: 3,
        category: word.category,
      },
    });
    createdVocab[word.simplified] = v.id;
  }
  console.log(`Created ${hsk3Vocabulary.length} HSK 3 words.`);

  const totalVocab = hsk1Vocabulary.length + hsk1VocabularyExpanded.length + hsk2Vocabulary.length + hsk2VocabularyExpanded.length + hsk3Vocabulary.length;
  console.log(`Total vocabulary created: ${totalVocab} words.`);

  // ── Insert lessons with exercises and vocabulary links ──
  let totalExercises = 0;
  const allLessons = [...lessonData, ...lessonDataExpanded];

  for (const ld of allLessons) {
    const { vocabularyKeys, exercises: exerciseData, ...lessonFields } = ld;

    const lesson = await prisma.lesson.create({
      data: {
        ...lessonFields,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        content: lessonFields.content as any,
        isPublished: true,
      },
    });

    // Link vocabulary to lesson
    let vocabOrder = 0;
    for (const key of vocabularyKeys) {
      const vocabId = createdVocab[key];
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

    console.log(`  Created lesson [HSK${lesson.hskLevel}]: "${lesson.title}" (${exerciseData.length} exercises, ${vocabOrder} vocab links)`);
  }

  console.log("\n=== Seed Summary ===");
  console.log(`Vocabulary: ${totalVocab} words (HSK 1: ${hsk1Vocabulary.length + hsk1VocabularyExpanded.length}, HSK 2: ${hsk2Vocabulary.length + hsk2VocabularyExpanded.length}, HSK 3: ${hsk3Vocabulary.length})`);
  console.log(`Lessons:    ${allLessons.length} lessons`);
  console.log(`Exercises:  ${totalExercises} exercises`);
  console.log("Seed completed successfully.");
}

main()
  .catch((e) => {
    console.error("Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
