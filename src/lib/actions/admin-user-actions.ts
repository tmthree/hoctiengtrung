"use server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { updateUserRoleSchema } from "@/lib/validators/admin";

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
