// Zod validation schemas for profile update forms
import { z } from "zod";

export const updateProfileSchema = z.object({
  name: z.string().min(2, "Tên tối thiểu 2 ký tự").max(100, "Tên tối đa 100 ký tự"),
});

export const updateDailyGoalSchema = z.object({
  minutesPerDay: z
    .number()
    .int("Phải là số nguyên")
    .min(5, "Tối thiểu 5 phút")
    .max(120, "Tối đa 120 phút"),
});

export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
export type UpdateDailyGoalInput = z.infer<typeof updateDailyGoalSchema>;
