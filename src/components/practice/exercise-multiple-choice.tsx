"use client";
// Multiple choice exercise component
import { useState } from "react";
import type { AnswerResult } from "@/hooks/use-quiz-state";

interface MultipleChoiceQuestion {
  text: string;
  options: string[];
}

interface ExerciseMultipleChoiceProps {
  question: MultipleChoiceQuestion;
  result: AnswerResult | null;
  isSubmitting: boolean;
  onSubmit: (answer: number) => void;
  onNext: () => void;
}

export function ExerciseMultipleChoice({
  question,
  result,
  isSubmitting,
  onSubmit,
  onNext,
}: ExerciseMultipleChoiceProps) {
  const [selected, setSelected] = useState<number | null>(null);
  const correctIndex = result
    ? (result.correctAnswer as { correct: number }).correct
    : null;

  function handleSelect(index: number) {
    if (result || isSubmitting) return;
    setSelected(index);
    onSubmit(index);
  }

  function getButtonClass(index: number) {
    const base =
      "w-full text-left px-4 py-3 rounded-lg border text-sm transition-colors";
    if (!result) {
      return `${base} hover:border-primary hover:bg-primary/5 border-border cursor-pointer`;
    }
    if (index === correctIndex) return `${base} border-green-500 bg-green-50 text-green-700`;
    if (index === selected && !result.isCorrect) {
      return `${base} border-red-500 bg-red-50 text-red-700`;
    }
    return `${base} border-border opacity-60`;
  }

  return (
    <div className="space-y-4">
      <p className="text-base font-medium text-foreground">{question.text}</p>

      <div className="space-y-2">
        {question.options.map((option, index) => (
          <button
            key={index}
            className={getButtonClass(index)}
            onClick={() => handleSelect(index)}
            disabled={!!result || isSubmitting}
          >
            <span className="mr-2 font-medium text-muted-foreground">
              {String.fromCharCode(65 + index)}.
            </span>
            {option}
          </button>
        ))}
      </div>

      {result && (
        <div
          className={`rounded-lg p-3 text-sm ${result.isCorrect ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}
        >
          {result.isCorrect ? "Đúng rồi!" : "Chưa đúng."}
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
