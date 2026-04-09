// Zod validation schemas for course creation and update operations
import { z } from "zod";

export const createCourseSchema = z.object({
  title: z.string().min(3, "Tiêu đề tối thiểu 3 ký tự"),
  slug: z
    .string()
    .min(3, "Slug tối thiểu 3 ký tự")
    .regex(/^[a-z0-9-]+$/, "Slug chỉ chứa chữ thường, số và dấu gạch ngang"),
  description: z.string().min(10, "Mô tả tối thiểu 10 ký tự"),
  language: z.enum(["CHINESE", "ENGLISH"]),
  level: z.number().min(1).max(9),
  price: z.number().min(0, "Giá không được âm"),
  currency: z.string().default("VND"),
  thumbnail: z.string().url("URL ảnh không hợp lệ").optional().or(z.literal("")),
});

export type CreateCourseInput = z.infer<typeof createCourseSchema>;
