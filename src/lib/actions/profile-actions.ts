"use server";
// Server actions for updating user profile and daily goal settings
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { db } from "@/lib/db";
import { updateProfileSchema, updateDailyGoalSchema } from "@/lib/validators/profile";

/** Update user display name */
export async function updateProfile(data: { name: string }) {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) return { success: false, error: "Unauthorized" };

    const parsed = updateProfileSchema.safeParse(data);
    if (!parsed.success) {
      return { success: false, error: parsed.error.issues[0]?.message ?? "Invalid input" };
    }

    await db.user.update({
      where: { id: session.user.id },
      data: { name: parsed.data.name },
    });

    return { success: true };
  } catch (error) {
    console.error("updateProfile error:", error);
    return { success: false, error: "Failed to update profile" };
  }
}

/** Update user daily study goal in minutes */
export async function updateDailyGoal(minutesPerDay: number) {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) return { success: false, error: "Unauthorized" };

    const parsed = updateDailyGoalSchema.safeParse({ minutesPerDay });
    if (!parsed.success) {
      return { success: false, error: parsed.error.issues[0]?.message ?? "Invalid input" };
    }

    await db.user.update({
      where: { id: session.user.id },
      data: { dailyGoalMinutes: parsed.data.minutesPerDay },
    });

    return { success: true };
  } catch (error) {
    console.error("updateDailyGoal error:", error);
    return { success: false, error: "Failed to update daily goal" };
  }
}
