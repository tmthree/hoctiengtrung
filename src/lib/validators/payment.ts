// Zod validation schemas for payment and checkout operations
import { z } from "zod";

export const createCheckoutSchema = z.object({
  courseId: z.string().cuid("ID khóa học không hợp lệ"),
});

export type CreateCheckoutInput = z.infer<typeof createCheckoutSchema>;
