"use server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { updateUserRoleSchema } from "@/lib/validators/admin";
import { z } from "zod";

async function requireAdmin() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session || (session.user as { role?: string }).role !== "ADMIN") {
    throw new Error("Unauthorized");
  }
  return session;
}

export async function updateUserRole(userId: string, role: "LEARNER" | "ADMIN") {
  const session = await requireAdmin();
  const parsed = updateUserRoleSchema.safeParse({ userId, role });
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0].message };
  }

  // Prevent demoting yourself
  if (session.user.id === userId && role !== "ADMIN") {
    return { success: false, error: "Không thể thay đổi vai trò của chính mình" };
  }

  try {
    await db.user.update({
      where: { id: userId },
      data: { role },
    });
    revalidatePath("/admin/users");
    return { success: true };
  } catch {
    return { success: false, error: "Không thể cập nhật vai trò" };
  }
}

const updateUserPlanSchema = z.object({
  userId: z.string().min(1),
  plan: z.enum(["FREE", "PREMIUM"]),
  months: z.number().int().min(1).max(24).optional(),
});

/** Admin-only: upgrade or downgrade a user's subscription plan. */
export async function updateUserPlan(
  userId: string,
  plan: "FREE" | "PREMIUM",
  months?: number,
) {
  await requireAdmin();
  const parsed = updateUserPlanSchema.safeParse({ userId, plan, months });
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0].message };
  }

  const planExpiresAt =
    plan === "PREMIUM" && months
      ? new Date(Date.now() + months * 30 * 24 * 60 * 60 * 1000)
      : plan === "FREE"
        ? null
        : null;

  try {
    await db.user.update({
      where: { id: userId },
      data: { plan, planExpiresAt },
    });
    revalidatePath("/admin/users");
    return { success: true };
  } catch {
    return { success: false, error: "Không thể cập nhật gói" };
  }
}
