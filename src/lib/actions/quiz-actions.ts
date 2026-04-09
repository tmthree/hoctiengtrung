"use server";
// Server actions for quiz attempts and exercise retrieval
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { db } from "@/lib/db";

/** Check if a user answer is correct based on exercise type and answer schema */
function checkAnswer(
  type: string,
  answer: Record<string, unknown>,
  userAnswer: unknown
): boolean {
  try {
    if (type === "MULTIPLE_CHOICE" || type === "TONE") {
      const correct = (answer as { correct: number }).correct;
      return (userAnswer as number) === correct;
    }
    if (type === "FILL_BLANK" || type === "PINYIN") {
      const correct = (answer as { correct: string }).correct;
      const ua = String(userAnswer).trim().toLowerCase();
      return ua === String(correct).trim().toLowerCase();
    }
    if (type === "MATCHING") {
      // userAnswer is array of [leftIdx, rightIdx] pairs
      const correctPairs = (answer as { pairs: number[][] }).pairs;
      const userPairs = userAnswer as number[][];
      if (!Array.isArray(userPairs)) return false;
      return JSON.stringify(correctPairs.sort()) === JSON.stringify(userPairs.sort());
    }
    if (type === "LISTENING") {
      const correct = (answer as { correct: number | string }).correct;
      if (typeof correct === "number") return (userAnswer as number) === correct;
      return String(userAnswer).trim().toLowerCase() === String(correct).trim().toLowerCase();
    }
    return false;
  } catch {
    return false;
  }
}

/** Submit a quiz answer — creates a QuizAttempt record and returns result */
export async function submitQuizAnswer(exerciseId: string, userAnswer: unknown) {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) return { success: false, error: "Unauthorized" };

    const exercise = await db.exercise.findUnique({ where: { id: exerciseId } });
    if (!exercise) return { success: false, error: "Exercise not found" };

    const isCorrect = checkAnswer(
      exercise.type,
      exercise.answer as Record<string, unknown>,
      userAnswer
    );

    await db.quizAttempt.create({
      data: {
        userId: session.user.id,
        exerciseId,
        isCorrect,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        userAnswer: userAnswer as any,
      },
    });

    return {
      success: true,
      data: {
        isCorrect,
        explanation: exercise.explanation ?? null,
        correctAnswer: exercise.answer,
      },
    };
  } catch (error) {
    console.error("submitQuizAnswer error:", error);
    return { success: false, error: "Failed to submit answer" };
  }
}

/** Get exercises for a specific lesson, ordered by position */
export async function getExercisesForLesson(lessonId: string) {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) return { success: false, error: "Unauthorized", data: [] };

    const exercises = await db.exercise.findMany({
      where: { lessonId },
      orderBy: { order: "asc" },
    });

    return { success: true, data: exercises };
  } catch (error) {
    console.error("getExercisesForLesson error:", error);
    return { success: false, error: "Failed to fetch exercises", data: [] };
  }
}

/** Get random exercises by HSK level for exam simulation */
export async function getExamExercises(hskLevel: number, count: number = 30) {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) return { success: false, error: "Unauthorized", data: [] };

    // Get all exercises from lessons at this HSK level
    const exercises = await db.exercise.findMany({
      where: { lesson: { hskLevel } },
      orderBy: { order: "asc" },
    });

    // Shuffle and take `count` exercises
    const shuffled = exercises.sort(() => Math.random() - 0.5);
    return { success: true, data: shuffled.slice(0, count) };
  } catch (error) {
    console.error("getExamExercises error:", error);
    return { success: false, error: "Failed to fetch exam exercises", data: [] };
  }
}
