"use client";
// Client-side state machine for quiz flow
import { useState, useCallback } from "react";
import { submitQuizAnswer } from "@/lib/actions/quiz-actions";

export interface Exercise {
  id: string;
  type: string;
  question: unknown;
  answer: unknown;
  explanation?: string | null;
  order: number;
  difficulty: number;
}

export interface AnswerResult {
  isCorrect: boolean;
  explanation: string | null;
  correctAnswer: unknown;
}

interface QuizStats {
  correct: number;
  total: number;
}

export function useQuizState(initialExercises: Exercise[]) {
  const [exercises] = useState<Exercise[]>(initialExercises);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answerResults, setAnswerResults] = useState<(AnswerResult | null)[]>(
    () => new Array(initialExercises.length).fill(null)
  );
  const [isComplete, setIsComplete] = useState(initialExercises.length === 0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const currentExercise = exercises[currentIndex] ?? null;
  const currentResult = answerResults[currentIndex] ?? null;
  const hasAnswered = currentResult !== null;

  const stats: QuizStats = {
    correct: answerResults.filter((r) => r?.isCorrect).length,
    total: exercises.length,
  };

  const score =
    stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0;

  const submitAnswer = useCallback(
    async (userAnswer: unknown) => {
      if (!currentExercise || hasAnswered || isSubmitting) return;

      setIsSubmitting(true);
      try {
        const res = await submitQuizAnswer(currentExercise.id, userAnswer);
        if (res.success && res.data) {
          setAnswerResults((prev) => {
            const updated = [...prev];
            updated[currentIndex] = res.data as AnswerResult;
            return updated;
          });
        }
      } catch (error) {
        console.error("submitAnswer error:", error);
      } finally {
        setIsSubmitting(false);
      }
    },
    [currentExercise, currentIndex, hasAnswered, isSubmitting]
  );

  const nextQuestion = useCallback(() => {
    const nextIndex = currentIndex + 1;
    if (nextIndex >= exercises.length) {
      setIsComplete(true);
    } else {
      setCurrentIndex(nextIndex);
    }
  }, [currentIndex, exercises.length]);

  const restart = useCallback(() => {
    setCurrentIndex(0);
    setAnswerResults(new Array(exercises.length).fill(null));
    setIsComplete(false);
  }, [exercises.length]);

  return {
    currentExercise,
    currentResult,
    currentIndex,
    hasAnswered,
    isComplete,
    isSubmitting,
    stats,
    score,
    answerResults,
    submitAnswer,
    nextQuestion,
    restart,
  };
}
