"use server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import {
  createVocabularySchema,
  updateVocabularySchema,
  bulkImportRowSchema,
  type CreateVocabularyInput,
  type BulkImportRow,
} from "@/lib/validators/admin";

async function requireAdmin() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session || (session.user as { role?: string }).role !== "ADMIN") {
    throw new Error("Unauthorized");
  }
  return session;
}

function revalidateVocabulary() {
  revalidatePath("/admin/vocabulary");
  revalidatePath("/vocabulary");
}

export async function createVocabulary(data: CreateVocabularyInput) {
  await requireAdmin();
  const parsed = createVocabularySchema.safeParse(data);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0].message };
  }

  try {
    const vocab = await db.vocabulary.create({ data: parsed.data });
    revalidateVocabulary();
    return { success: true, data: vocab };
  } catch {
    return { success: false, error: "Không thể tạo từ vựng" };
  }
}

export async function updateVocabulary(
  id: string,
  data: Partial<CreateVocabularyInput>
) {
  await requireAdmin();
  const parsed = updateVocabularySchema.safeParse({ ...data, id });
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0].message };
  }

  try {
    const { id: _, ...updateData } = parsed.data;
    const vocab = await db.vocabulary.update({ where: { id }, data: updateData });
    revalidateVocabulary();
    return { success: true, data: vocab };
  } catch {
    return { success: false, error: "Không thể cập nhật từ vựng" };
  }
}

export async function deleteVocabulary(id: string) {
  await requireAdmin();
  try {
    await db.vocabulary.delete({ where: { id } });
    revalidateVocabulary();
    return { success: true };
  } catch {
    return { success: false, error: "Không thể xóa từ vựng" };
  }
}

export async function bulkImportVocabulary(rows: BulkImportRow[]) {
  await requireAdmin();

  const valid: CreateVocabularyInput[] = [];
  const errors: string[] = [];

  rows.forEach((row, i) => {
    const parsed = bulkImportRowSchema.safeParse(row);
    if (parsed.success) {
      valid.push(parsed.data);
    } else {
      errors.push(`Hàng ${i + 1}: ${parsed.error.issues[0].message}`);
    }
  });

  if (valid.length === 0) {
    return { success: false, error: "Không có dữ liệu hợp lệ", errors };
  }

  try {
    const result = await db.vocabulary.createMany({
      data: valid,
      skipDuplicates: true,
    });
    revalidateVocabulary();
    return {
      success: true,
      count: result.count,
      errors: errors.length > 0 ? errors : undefined,
    };
  } catch {
    return { success: false, error: "Lỗi khi nhập dữ liệu" };
  }
}
