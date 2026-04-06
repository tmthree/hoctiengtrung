// Zod schemas for practice-related validation (flashcard reviews and quiz answers)
import { z } from "zod";

// Quality rating for SM-2 flashcard review (0-5)
export const reviewQualitySchema = z.number().int().min(0).max(5);

export const submitReviewSchema = z.object({
  vocabularyId: z.string().min(1, "Vocabulary ID is required"),
  quality: reviewQualitySchema,
});

export const submitQuizAnswerSchema = z.object({
  exerciseId: z.string().min(1, "Exercise ID is required"),
  userAnswer: z.unknown(),
});

export const recordActivitySchema = z.object({
  minutes: z.number().int().min(0),
  wordsLearned: z.number().int().min(0),
  exercisesCompleted: z.number().int().min(0),
});

export type SubmitReviewInput = z.infer<typeof submitReviewSchema>;
export type SubmitQuizAnswerInput = z.infer<typeof submitQuizAnswerSchema>;
export type RecordActivityInput = z.infer<typeof recordActivitySchema>;
