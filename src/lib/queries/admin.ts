// Admin query functions — called directly from Server Components (no "use server")
import { db } from "@/lib/db";

const PAGE_SIZE = 20;

// ==================== STATS ====================

export async function getAdminStats() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [totalUsers, totalLessons, totalVocabulary, todayActiveUsers] =
    await Promise.all([
      db.user.count(),
      db.lesson.count(),
      db.vocabulary.count(),
      db.session.count({ where: { createdAt: { gte: today } } }),
    ]);

  return { totalUsers, totalLessons, totalVocabulary, todayActiveUsers };
}

// ==================== LESSONS ====================

export async function getAllLessonsAdmin({
  page = 1,
  search,
  hskLevel,
  published,
}: {
  page?: number;
  search?: string;
  hskLevel?: number;
  published?: boolean;
} = {}) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const where: any = {};
  if (search) where.title = { contains: search, mode: "insensitive" };
  if (hskLevel) where.hskLevel = hskLevel;
  if (published !== undefined) where.isPublished = published;

  const [lessons, total] = await Promise.all([
    db.lesson.findMany({
      where,
      orderBy: [{ hskLevel: "asc" }, { order: "asc" }],
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
    }),
    db.lesson.count({ where }),
  ]);

  return { lessons, total, totalPages: Math.ceil(total / PAGE_SIZE) };
}

export async function getLessonForEdit(id: string) {
  return db.lesson.findUnique({
    where: { id },
    include: {
      vocabulary: { include: { vocabulary: true }, orderBy: { order: "asc" } },
      exercises: { orderBy: { order: "asc" } },
    },
  });
}

// ==================== VOCABULARY ====================

export async function getAllVocabularyAdmin({
  page = 1,
  search,
  hskLevel,
}: {
  page?: number;
  search?: string;
  hskLevel?: number;
} = {}) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const where: any = {};
  if (search)
    where.OR = [
      { simplified: { contains: search, mode: "insensitive" } },
      { pinyin: { contains: search, mode: "insensitive" } },
      { meaning: { contains: search, mode: "insensitive" } },
    ];
  if (hskLevel) where.hskLevel = hskLevel;

  const [vocabulary, total] = await Promise.all([
    db.vocabulary.findMany({
      where,
      orderBy: [{ hskLevel: "asc" }, { simplified: "asc" }],
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
    }),
    db.vocabulary.count({ where }),
  ]);

  return { vocabulary, total, totalPages: Math.ceil(total / PAGE_SIZE) };
}

export async function getVocabularyForEdit(id: string) {
  return db.vocabulary.findUnique({ where: { id } });
}

// ==================== USERS ====================

export async function getAllUsers({
  page = 1,
  search,
}: {
  page?: number;
  search?: string;
} = {}) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const where: any = {};
  if (search)
    where.OR = [
      { name: { contains: search, mode: "insensitive" } },
      { email: { contains: search, mode: "insensitive" } },
    ];

  const [users, total] = await Promise.all([
    db.user.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
    }),
    db.user.count({ where }),
  ]);

  return { users, total, totalPages: Math.ceil(total / PAGE_SIZE) };
}
