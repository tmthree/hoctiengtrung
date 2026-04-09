// Server-side query functions for courses — called directly from Server Components
import { db } from "@/lib/db";
import { unstable_cache } from "next/cache";
import { Language } from "@prisma/client";

export async function getCourses({
  language,
  level,
  search,
  page = 1,
  limit = 12,
}: {
  language?: Language;
  level?: number;
  search?: string;
  page?: number;
  limit?: number;
} = {}) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const where: any = { isPublished: true };
  if (language) where.language = language;
  if (level) where.level = level;
  if (search) where.title = { contains: search, mode: "insensitive" };

  const [courses, total] = await Promise.all([
    db.course.findMany({
      where,
      orderBy: [{ isFeatured: "desc" }, { level: "asc" }, { createdAt: "desc" }],
      skip: (page - 1) * limit,
      take: limit,
      include: {
        instructor: { select: { id: true, name: true, image: true } },
        _count: { select: { lessons: true, enrollments: true } },
      },
    }),
    db.course.count({ where }),
  ]);

  return { courses, total, totalPages: Math.ceil(total / limit) };
}

export async function getCourseBySlug(slug: string) {
  return getCachedCourseBySlug(slug);
}

const getCachedCourseBySlug = unstable_cache(
  async (slug: string) => {
    return db.course.findUnique({
      where: { slug },
      include: {
        instructor: { select: { id: true, name: true, image: true } },
        lessons: {
          where: { isPublished: true },
          select: { id: true, title: true, order: true, isFree: true },
          orderBy: { order: "asc" },
        },
        _count: { select: { enrollments: true } },
      },
    });
  },
  ["course-by-slug"],
  { revalidate: 300 }
);

export async function getCourseById(id: string) {
  return getCachedCourseById(id);
}

const getCachedCourseById = unstable_cache(
  async (id: string) => {
    return db.course.findUnique({
      where: { id },
      include: {
        instructor: { select: { id: true, name: true, image: true } },
        lessons: {
          where: { isPublished: true },
          select: { id: true, title: true, order: true, isFree: true },
          orderBy: { order: "asc" },
        },
        _count: { select: { enrollments: true } },
      },
    });
  },
  ["course-by-id"],
  { revalidate: 300 }
);
