// Server-side query functions for vocabulary — called directly from Server Components
import { db } from "@/lib/db";
import { unstable_cache } from "next/cache";

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
  return getCachedVocabulary(hskLevel, search, page, limit);
}

const getCachedVocabulary = unstable_cache(
  async (hskLevel?: number, search?: string, page = 1, limit = 20) => {
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
  },
  ["vocabulary"],
  { revalidate: 300 } // 5 minutes
);

export async function getVocabularyById(id: string) {
  return db.vocabulary.findUnique({ where: { id } });
}
