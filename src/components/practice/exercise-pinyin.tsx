"use client";
// Pinyin input exercise — user types pinyin for a Chinese character
import { useState } from "react";
import type { AnswerResult } from "@/hooks/use-quiz-state";

interface PinyinQuestion {
  text: string; // The Chinese character
  character?: string;
}

interface ExercisePinyinProps {
  question: PinyinQuestion;
  result: AnswerResult | null;
  isSubmitting: boolean;
  onSubmit: (answer: string) => void;
  onNext: () => void;
}

export function ExercisePinyin({
  question,
  result,
  isSubmitting,
  onSubmit,
  onNext,
}: ExercisePinyinProps) {
  const [input, setInput] = useState("");
  const character = question.character ?? question.text;
  const correctAnswer = result
    ? (result.correctAnswer as { correct: string }).correct
    : null;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (result || isSubmitting || !input.trim()) return;
    onSubmit(input.trim());
  }

  const inputClass = result
    ? result.isCorrect
      ? "border-green-500 bg-green-50 text-green-700"
      : "border-red-500 bg-red-50 text-red-700"
    : "border-border focus:border-primary";

  return (
    <div className="space-y-6">
      <div className="text-center">
        <p className="text-sm text-muted-foreground mb-2">Gõ pinyin cho ký tự này</p>
        <p className="text-7xl font-normal text-foreground font-chinese">
          {character}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Gõ pinyin..."
          disabled={!!result || isSubmitting}
          className={`w-full px-4 py-2 rounded-lg border text-sm outline-none transition-colors text-center ${inputClass}`}
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
