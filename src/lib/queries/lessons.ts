// Server-side query functions for lessons — called directly from Server Components
import { db } from "@/lib/db";

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
}

export async function getLessonById(id: string) {
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
}
