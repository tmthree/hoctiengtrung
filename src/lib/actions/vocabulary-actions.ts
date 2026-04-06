"use server";
// Server actions for vocabulary review (spaced repetition)
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { db } from "@/lib/db";
import { calculateNextReview } from "@/lib/spaced-repetition";
import { submitReviewSchema } from "@/lib/validators/practice";

/** Submit a flashcard review using SM-2 algorithm quality rating (0-5) */
export async function submitReview(vocabularyId: string, quality: number) {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) return { success: false, error: "Unauthorized" };

    const parsed = submitReviewSchema.safeParse({ vocabularyId, quality });
    if (!parsed.success) return { success: false, error: "Invalid input" };

    const userId = session.user.id;

    // Find existing review record if any
    const existing = await db.vocabularyReview.findUnique({
      where: { userId_vocabularyId: { userId, vocabularyId } },
    });

    const result = calculateNextReview(
      quality,
      existing?.ease ?? 2.5,
      existing?.interval ?? 0,
      existing?.repetitions ?? 0
    );

    const review = await db.vocabularyReview.upsert({
      where: { userId_vocabularyId: { userId, vocabularyId } },
      create: {
        userId,
        vocabularyId,
        ease: result.ease,
        interval: result.interval,
        repetitions: result.repetitions,
        nextReview: result.nextReview,
        lastReview: new Date(),
      },
      update: {
        ease: result.ease,
        interval: result.interval,
        repetitions: result.repetitions,
        nextReview: result.nextReview,
        lastReview: new Date(),
      },
    });

    return { success: true, data: review };
  } catch (error) {
    console.error("submitReview error:", error);
    return { success: false, error: "Failed to submit review" };
  }
}

/** Get vocabulary cards due for review (nextReview <= now) */
export async function getDueReviewCards(hskLevel?: number) {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) return { success: false, error: "Unauthorized", data: [] };

    const userId = session.user.id;
    const now = new Date();

    // Get all vocabulary (with optional hsk filter)
    const vocabularyWhere = hskLevel ? { hskLevel } : {};
    const allVocabulary = await db.vocabulary.findMany({
      where: vocabularyWhere,
      take: 50,
      orderBy: { hskLevel: "asc" },
    });

    if (allVocabulary.length === 0) return { success: true, data: [] };

    const vocabIds = allVocabulary.map((v) => v.id);

    // Get existing reviews for the user
    const existingReviews = await db.vocabularyReview.findMany({
      where: {
        userId,
        vocabularyId: { in: vocabIds },
        nextReview: { lte: now },
      },
    });

    const reviewedIds = new Set(existingReviews.map((r) => r.vocabularyId));

    // New cards (never reviewed) + cards due for review
    const newCards = allVocabulary.filter((v) => !reviewedIds.has(v.id)).slice(0, 10);
    const dueCards = allVocabulary.filter((v) => reviewedIds.has(v.id));

    const cards = [...dueCards, ...newCards].slice(0, 20);

    return { success: true, data: cards };
  } catch (error) {
    console.error("getDueReviewCards error:", error);
    return { success: false, error: "Failed to fetch cards", data: [] };
  }
}
