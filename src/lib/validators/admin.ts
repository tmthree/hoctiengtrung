// Zod validation schemas for admin forms
import { z } from "zod";

export const createLessonSchema = z.object({
  title: z.string().min(1, "Tiêu đề bắt buộc"),
  description: z.string().min(1, "Mô tả bắt buộc"),
  hskLevel: z.number().min(1).max(9),
  type: z.enum(["GRAMMAR", "CONVERSATION", "READING", "CULTURE", "BUSINESS"]),
  content: z.string().default("[]"),
  order: z.number().default(0),
  isPublished: z.boolean().default(false),
});

export const updateLessonSchema = createLessonSchema.partial().extend({
  id: z.string().min(1),
});

export const createVocabularySchema = z.object({
  simplified: z.string().min(1, "Chữ giản thể bắt buộc"),
  traditional: z.string().optional(),
  pinyin: z.string().min(1, "Pinyin bắt buộc"),
  meaning: z.string().min(1, "Nghĩa bắt buộc"),
  exampleSentence: z.string().optional(),
  examplePinyin: z.string().optional(),
  exampleMeaning: z.string().optional(),
  hskLevel: z.number().min(1).max(9),
  category: z.string().optional(),
});

export const updateVocabularySchema = createVocabularySchema.partial().extend({
  id: z.string().min(1),
});

export const bulkImportRowSchema = z.object({
  simplified: z.string().min(1, "Chữ giản thể bắt buộc"),
  traditional: z.string().optional(),
  pinyin: z.string().min(1, "Pinyin bắt buộc"),
  meaning: z.string().min(1, "Nghĩa bắt buộc"),
  hskLevel: z.coerce.number().min(1).max(9).pipe(z.number()),
  category: z.string().optional(),
  exampleSentence: z.string().optional(),
  examplePinyin: z.string().optional(),
  exampleMeaning: z.string().optional(),
});

export const updateUserRoleSchema = z.object({
  userId: z.string().min(1),
  role: z.enum(["LEARNER", "ADMIN"]),
});

export type CreateLessonInput = z.output<typeof createLessonSchema>;
export type UpdateLessonInput = z.infer<typeof updateLessonSchema>;
export type CreateVocabularyInput = z.infer<typeof createVocabularySchema>;
export type UpdateVocabularyInput = z.infer<typeof updateVocabularySchema>;
export type BulkImportRow = z.infer<typeof bulkImportRowSchema>;
export type UpdateUserRoleInput = z.infer<typeof updateUserRoleSchema>;
