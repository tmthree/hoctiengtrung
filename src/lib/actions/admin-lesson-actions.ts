"use server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import type { Prisma } from "@prisma/client";
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

  let content: Prisma.InputJsonValue = [];
  if (parsed.data.content) {
    try {
      content = JSON.parse(parsed.data.content);
    } catch {
      return { success: false, error: "Nội dung JSON không hợp lệ" };
    }
    if (!Array.isArray(content)) {
      return { success: false, error: "Nội dung phải là mảng JSON" };
    }
  }

  try {
    const lesson = await db.lesson.create({
      data: { ...parsed.data, content },
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
    let contentUpdate: { content?: Prisma.InputJsonValue } = {};
    if (updateData.content !== undefined) {
      try {
        const parsed = JSON.parse(updateData.content as string);
        if (!Array.isArray(parsed)) {
          return { success: false, error: "Nội dung phải là mảng JSON" };
        }
        contentUpdate = { content: parsed as Prisma.InputJsonValue };
      } catch {
        return { success: false, error: "Nội dung JSON không hợp lệ" };
      }
    }
    const lesson = await db.lesson.update({
      where: { id },
      data: { ...updateData, ...contentUpdate },
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
