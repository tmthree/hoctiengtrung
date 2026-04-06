// Access control helpers for free/premium plan gating
import { db } from "./db";

export type UserPlan = "FREE" | "PREMIUM";

export const FREE_LIMITS = {
  maxHskLevel: 1,
  flashcardsPerDay: 10,
  quizAttemptsPerDay: 3,
} as const;

/** Returns true if user has an active PREMIUM subscription. */
export function isPremium(user: { plan: string; planExpiresAt: Date | null }): boolean {
  if (user.plan !== "PREMIUM") return false;
  if (user.planExpiresAt && user.planExpiresAt < new Date()) return false;
  return true;
}

/** Check whether a user can access a lesson at the given HSK level. */
export async function canAccessLesson(userId: string, lessonHskLevel: number): Promise<boolean> {
  const user = await db.user.findUnique({
    where: { id: userId },
    select: { plan: true, planExpiresAt: true },
  });
  if (!user) return false;
  if (isPremium(user)) return true;
  return lessonHskLevel <= FREE_LIMITS.maxHskLevel;
}

/** Check whether a user can view vocabulary at the given HSK level. */
export async function canAccessVocabulary(userId: string, hskLevel: number): Promise<boolean> {
  const user = await db.user.findUnique({
    where: { id: userId },
    select: { plan: true, planExpiresAt: true },
  });
  if (!user) return false;
  if (isPremium(user)) return true;
  return hskLevel <= FREE_LIMITS.maxHskLevel;
}

/** Returns remaining flashcard reviews for today (Infinity for premium). */
export async function getRemainingFlashcards(userId: string): Promise<number> {
  const user = await db.user.findUnique({
    where: { id: userId },
    select: { plan: true, planExpiresAt: true },
  });
  if (!user) return 0;
  if (isPremium(user)) return Infinity;

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayReviews = await db.vocabularyReview.count({
    where: { userId, lastReview: { gte: today } },
  });
  return Math.max(0, FREE_LIMITS.flashcardsPerDay - todayReviews);
}

/** Returns remaining quiz attempts for today (Infinity for premium). */
export async function getRemainingQuizAttempts(userId: string): Promise<number> {
  const user = await db.user.findUnique({
    where: { id: userId },
    select: { plan: true, planExpiresAt: true },
  });
  if (!user) return 0;
  if (isPremium(user)) return Infinity;

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayAttempts = await db.quizAttempt.count({
    where: { userId, attemptedAt: { gte: today } },
  });
  return Math.max(0, FREE_LIMITS.quizAttemptsPerDay - todayAttempts);
}

/** Fetch a user's plan info (for display). */
export async function getUserPlanInfo(userId: string) {
  return db.user.findUnique({
    where: { id: userId },
    select: { plan: true, planExpiresAt: true },
  });
}
