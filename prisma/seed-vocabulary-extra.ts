// Extra vocabulary seed — adds HSK 3 and HSK 4 extra words
// Run with: npx tsx prisma/seed-vocabulary-extra.ts

import * as dotenv from "dotenv";
import * as path from "path";
dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

import { PrismaClient } from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import { neonConfig } from "@neondatabase/serverless";
import ws from "ws";

import { hsk3VocabularyExtra } from "./data/hsk3-vocabulary-extra";
import { hsk4VocabularyExtra } from "./data/hsk4-vocabulary-extra";

neonConfig.webSocketConstructor = ws;

const dbUrl = process.env.DATABASE_URL;
if (!dbUrl) {
  console.error("DATABASE_URL not set!");
  process.exit(1);
}

const adapter = new PrismaNeon({ connectionString: dbUrl });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Starting extra vocabulary seed...\n");

  const batches: { data: typeof hsk3VocabularyExtra; level: number; label: string }[] = [
    { data: hsk3VocabularyExtra, level: 3, label: "HSK 3 Extra" },
    { data: hsk4VocabularyExtra, level: 4, label: "HSK 4 Extra" },
  ];

  for (const batch of batches) {
    let created = 0;
    let skipped = 0;

    for (const word of batch.data) {
      const existing = await prisma.vocabulary.findFirst({
        where: { simplified: word.simplified, hskLevel: batch.level },
      });

      if (existing) {
        skipped++;
        continue;
      }

      await prisma.vocabulary.create({
        data: {
          simplified: word.simplified,
          pinyin: word.pinyin,
          meaning: word.meaning,
          exampleSentence: word.exampleSentence,
          examplePinyin: word.examplePinyin,
          exampleMeaning: word.exampleMeaning,
          hskLevel: batch.level,
          category: word.category,
        },
      });
      created++;
    }

    console.log(`${batch.label}: ${created} created, ${skipped} skipped`);
  }

  const total = await prisma.vocabulary.count();
  console.log(`\nTotal vocabulary in DB: ${total}`);
}

main()
  .catch((e) => { console.error("Seed failed:", e); process.exit(1); })
  .finally(() => prisma.$disconnect());
