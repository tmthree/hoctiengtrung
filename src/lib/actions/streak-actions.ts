"use server";
// Server actions for tracking daily learning streaks
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { db } from "@/lib/db";
import { recordActivitySchema } from "@/lib/validators/practice";

/** Record study activity for today — upserts LearningStreak for the current date */
export async function recordStudyActivity(
  minutes: number,
  wordsLearned: number,
  exercisesCompleted: number
) {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) return { success: false, error: "Unauthorized" };

    const parsed = recordActivitySchema.safeParse({ minutes, wordsLearned, exercisesCompleted });
    if (!parsed.success) return { success: false, error: "Invalid input" };

    const userId = session.user.id;

    // Normalize to date-only (midnight UTC) for the unique constraint
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);

    const streak = await db.learningStreak.upsert({
      where: { userId_date: { userId, date: today } },
      create: {
        userId,
        date: today,
        minutesStudied: minutes,
        wordsLearned,
        exercisesCompleted,
      },
      update: {
        minutesStudied: { increment: minutes },
        wordsLearned: { increment: wordsLearned },
        exercisesCompleted: { increment: exercisesCompleted },
      },
    });

    return { success: true, data: streak };
  } catch (error) {
    console.error("recordStudyActivity error:", error);
    return { success: false, error: "Failed to record activity" };
  }
}
