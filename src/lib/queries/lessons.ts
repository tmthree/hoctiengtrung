// Server-side query functions for lessons — called directly from Server Components
import { db } from "@/lib/db";
import { unstable_cache } from "next/cache";

export async function getLessons({
  hskLevel,
  search,
  page = 1,
  limit = 12,
}: {
  hskLevel?: number;
  search?: string;
  page?: number;
  limit?: number;
} = {}) {
  return getCachedLessons(hskLevel, search, page, limit);
}

const getCachedLessons = unstable_cache(
  async (hskLevel?: number, search?: string, page = 1, limit = 12) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const where: any = { isPublished: true };
    if (hskLevel) where.hskLevel = hskLevel;
    if (search) where.title = { contains: search, mode: "insensitive" };

    const [lessons, total] = await Promise.all([
      db.lesson.findMany({
        where,
        orderBy: [{ hskLevel: "asc" }, { order: "asc" }],
        skip: (page - 1) * limit,
        take: limit,
      }),
      db.lesson.count({ where }),
    ]);

    return { lessons, total, totalPages: Math.ceil(total / limit) };
  },
  ["lessons"],
  { revalidate: 300 } // 5 minutes
);

export async function getLessonById(id: string) {
  return getCachedLessonById(id);
}

const getCachedLessonById = unstable_cache(
  async (id: string) => {
    return db.lesson.findUnique({
      where: { id },
      include: {
        vocabulary: {
          include: { vocabulary: true },
          orderBy: { order: "asc" },
        },
        exercises: { orderBy: { order: "asc" } },
      },
    });
  },
  ["lesson-detail"],
  { revalidate: 300 }
);
