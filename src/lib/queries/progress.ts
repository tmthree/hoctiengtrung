// Server-side query functions for user progress data — called directly from Server Components
import { db } from "@/lib/db";

/** Aggregate user stats: lessons, words reviewed, streak, total minutes */
export async function getUserStats(userId: string) {
  const [lessonsCompleted, wordsReviewed, streakData, totalMinutes] = await Promise.all([
    db.userProgress.count({ where: { userId, status: "COMPLETED" } }),
    db.vocabularyReview.count({ where: { userId } }),
    db.learningStreak.findMany({
      where: { userId },
      orderBy: { date: "desc" },
      take: 30,
    }),
    db.learningStreak.aggregate({
      where: { userId },
      _sum: { minutesStudied: true },
    }),
  ]);

  // Calculate streak: consecutive days going backward from today
  let currentStreak = 0;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  for (let i = 0; i < streakData.length; i++) {
    const streakDate = new Date(streakData[i].date);
    streakDate.setHours(0, 0, 0, 0);
    const expectedDate = new Date(today);
    expectedDate.setDate(today.getDate() - i);
    if (streakDate.getTime() === expectedDate.getTime()) {
      currentStreak++;
    } else {
      break;
    }
  }

  return {
    lessonsCompleted,
    wordsReviewed,
    currentStreak,
    totalMinutes: totalMinutes._sum.minutesStudied ?? 0,
  };
}

/** Get streak calendar entries for the last 30 days */
export async function getStreakCalendar(userId: string) {
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  return db.learningStreak.findMany({
    where: { userId, date: { gte: thirtyDaysAgo } },
    orderBy: { date: "asc" },
  });
}

/** Get recent quiz attempts and vocabulary reviews */
export async function getRecentActivity(userId: string, limit = 10) {
  const [quizAttempts, reviews] = await Promise.all([
    db.quizAttempt.findMany({
      where: { userId },
      orderBy: { attemptedAt: "desc" },
      take: limit,
      include: { exercise: { include: { lesson: true } } },
    }),
    db.vocabularyReview.findMany({
      where: { userId },
      orderBy: { lastReview: "desc" },
      take: limit,
      include: { vocabulary: true },
    }),
  ]);
  return { quizAttempts, reviews };
}

/** Count reviewed words per HSK level */
export async function getHskProgress(userId: string) {
  const reviewsByLevel = await db.vocabularyReview.findMany({
    where: { userId },
    include: { vocabulary: { select: { hskLevel: true } } },
  });

  const progress: Record<number, number> = {};
  for (const r of reviewsByLevel) {
    const level = r.vocabulary.hskLevel;
    progress[level] = (progress[level] ?? 0) + 1;
  }
  return progress;
}

/** Get today's minutes studied for daily goal ring */
export async function getTodayMinutes(userId: string): Promise<number> {
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  const streak = await db.learningStreak.findFirst({
    where: { userId, date: { gte: today, lt: tomorrow } },
    select: { minutesStudied: true },
  });
  return streak?.minutesStudied ?? 0;
}

/** Count vocabulary reviews due today or overdue */
export async function getDueReviewCount(userId: string): Promise<number> {
  const now = new Date();
  return db.vocabularyReview.count({
    where: { userId, nextReview: { lte: now } },
  });
}
