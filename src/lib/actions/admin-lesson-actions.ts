"use server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import {
  createLessonSchema,
  updateLessonSchema,
  type CreateLessonInput,
} from "@/lib/validators/admin";

async function requireAdmin() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session || (session.user as { role?: string }).role !== "ADMIN") {
    throw new Error("Unauthorized");
  }
  return session;
}

function revalidateLessons() {
  revalidatePath("/admin/lessons");
  revalidatePath("/lessons");
}

export async function createLesson(data: CreateLessonInput) {
  await requireAdmin();
  const parsed = createLessonSchema.safeParse(data);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0].message };
  }

  try {
    const lesson = await db.lesson.create({
      data: {
        ...parsed.data,
        content: parsed.data.content
          ? JSON.parse(parsed.data.content)
          : [],
      },
    });
    revalidateLessons();
    return { success: true, data: lesson };
  } catch {
    return { success: false, error: "Không thể tạo bài học" };
  }
}

export async function updateLesson(
  id: string,
  data: Partial<CreateLessonInput>
) {
  await requireAdmin();
  const parsed = updateLessonSchema.safeParse({ ...data, id });
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0].message };
  }

  try {
    const { id: _, ...updateData } = parsed.data;
    const lesson = await db.lesson.update({
      where: { id },
      data: {
        ...updateData,
        ...(updateData.content !== undefined
          ? { content: JSON.parse(updateData.content as string) }
          : {}),
      },
    });
    revalidateLessons();
    return { success: true, data: lesson };
  } catch {
    return { success: false, error: "Không thể cập nhật bài học" };
  }
}

export async function deleteLesson(id: string) {
  await requireAdmin();
  try {
    await db.lesson.delete({ where: { id } });
    revalidateLessons();
    return { success: true };
  } catch {
    return { success: false, error: "Không thể xóa bài học" };
  }
}

export async function toggleLessonPublish(id: string) {
  await requireAdmin();
  try {
    const lesson = await db.lesson.findUnique({
      where: { id },
      select: { isPublished: true },
    });
    if (!lesson) return { success: false, error: "Không tìm thấy bài học" };

    const updated = await db.lesson.update({
      where: { id },
      data: { isPublished: !lesson.isPublished },
    });
    revalidateLessons();
    return { success: true, data: updated };
  } catch {
    return { success: false, error: "Không thể cập nhật trạng thái" };
  }
}
