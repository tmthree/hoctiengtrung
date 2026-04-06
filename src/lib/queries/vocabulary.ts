// Server-side query functions for vocabulary — called directly from Server Components
import { db } from "@/lib/db";

export async function getVocabulary({
  hskLevel,
  search,
  page = 1,
  limit = 20,
}: {
  hskLevel?: number;
  search?: string;
  page?: number;
  limit?: number;
} = {}) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const where: any = {};
  if (hskLevel) where.hskLevel = hskLevel;
  if (search) {
    where.OR = [
      { simplified: { contains: search } },
      { pinyin: { contains: search, mode: "insensitive" } },
      { meaning: { contains: search, mode: "insensitive" } },
    ];
  }

  const [vocabulary, total] = await Promise.all([
    db.vocabulary.findMany({
      where,
      orderBy: [{ hskLevel: "asc" }, { simplified: "asc" }],
      skip: (page - 1) * limit,
      take: limit,
    }),
    db.vocabulary.count({ where }),
  ]);

  return { vocabulary, total, totalPages: Math.ceil(total / limit) };
}

export async function getVocabularyById(id: string) {
  return db.vocabulary.findUnique({ where: { id } });
}
