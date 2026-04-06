"use client";
// Fill in the blank exercise component
import { useState } from "react";
import type { AnswerResult } from "@/hooks/use-quiz-state";

interface FillBlankQuestion {
  text: string; // contains _____ for the blank
}

interface ExerciseFillBlankProps {
  question: FillBlankQuestion;
  result: AnswerResult | null;
  isSubmitting: boolean;
  onSubmit: (answer: string) => void;
  onNext: () => void;
}

export function ExerciseFillBlank({
  question,
  result,
  isSubmitting,
  onSubmit,
  onNext,
}: ExerciseFillBlankProps) {
  const [input, setInput] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (result || isSubmitting || !input.trim()) return;
    onSubmit(input.trim());
  }

  const correctAnswer = result
    ? (result.correctAnswer as { correct: string }).correct
    : null;

  const inputClass = result
    ? result.isCorrect
      ? "border-green-500 bg-green-50 text-green-700"
      : "border-red-500 bg-red-50 text-red-700"
    : "border-border focus:border-primary";

  return (
    <div className="space-y-4">
      <p className="text-base font-medium text-foreground">{question.text}</p>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Điền vào chỗ trống..."
          disabled={!!result || isSubmitting}
          className={`w-full px-4 py-2 rounded-lg border text-sm outline-none transition-colors ${inputClass}`}
        />

        {!result && (
          <button
            type="submit"
            disabled={isSubmitting || !input.trim()}
            className="w-full py-2 px-4 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/80 disabled:opacity-50 transition-colors"
          >
            {isSubmitting ? "Đang kiểm tra..." : "Kiểm tra"}
          </button>
        )}
      </form>

      {result && (
        <div
          className={`rounded-lg p-3 text-sm ${result.isCorrect ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}
        >
          {result.isCorrect ? "Đúng rồi!" : `Chưa đúng. Đáp án: "${correctAnswer}"`}
          {result.explanation && (
            <p className="mt-1 text-muted-foreground">{result.explanation}</p>
          )}
        </div>
      )}

      {result && (
        <button
          onClick={onNext}
          className="w-full py-2 px-4 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/80 transition-colors"
        >
          Tiếp theo
        </button>
      )}
    </div>
  );
}
