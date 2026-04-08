"use client";
// Listening exercise — shows character as hint (no real audio yet) with answer input
import { useState } from "react";
import { Volume2 } from "lucide-react";
import type { AnswerResult } from "@/hooks/use-quiz-state";

interface ListeningQuestion {
  text: string; // Character or sentence to listen to
  options?: string[]; // Optional — if provided, multiple choice; otherwise text input
  hint?: string;
}

interface ExerciseListeningProps {
  question: ListeningQuestion;
  result: AnswerResult | null;
  isSubmitting: boolean;
  onSubmit: (answer: number | string) => void;
  onNext: () => void;
}

export function ExerciseListening({
  question,
  result,
  isSubmitting,
  onSubmit,
  onNext,
}: ExerciseListeningProps) {
  const [input, setInput] = useState("");
  const [selected, setSelected] = useState<number | null>(null);
  const isMultipleChoice = Array.isArray(question.options) && question.options.length > 0;
  const correctAnswer = result?.correctAnswer as { correct: number | string } | null;

  function handleTextSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (result || isSubmitting || !input.trim()) return;
    onSubmit(input.trim());
  }

  function handleSelect(index: number) {
    if (result || isSubmitting) return;
    setSelected(index);
    onSubmit(index);
  }

  function getOptionClass(index: number) {
    const base = "w-full text-left px-4 py-3 rounded-lg border text-sm transition-colors";
    if (!result) return `${base} hover:border-primary hover:bg-primary/5 border-border cursor-pointer`;
    if (index === correctAnswer?.correct) return `${base} border-green-500 bg-green-50 text-green-700`;
    if (index === selected && !result.isCorrect) return `${base} border-red-500 bg-red-50 text-red-700`;
    return `${base} border-border opacity-60`;
  }

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">Nghe và trả lời</p>

      {/* Audio placeholder — shows character as visual hint */}
      <div className="flex flex-col items-center gap-3 p-6 rounded-xl border bg-muted/30">
        <button
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 text-primary text-sm hover:bg-primary/20 transition-colors"
          onClick={() => {/* placeholder — no real audio */}}
        >
          <Volume2 className="w-4 h-4" />
          Phát âm
        </button>
        <p className="text-5xl font-normal text-foreground font-chinese">
          {question.text}
        </p>
        {question.hint && (
          <p className="text-xs text-muted-foreground">{question.hint}</p>
        )}
      </div>

      {isMultipleChoice ? (
        <div className="space-y-2">
          {question.options!.map((option, index) => (
            <button
              key={index}
              className={getOptionClass(index)}
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
      ) : (
        <form onSubmit={handleTextSubmit} className="space-y-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Nhập câu trả lời..."
            disabled={!!result || isSubmitting}
            className={`w-full px-4 py-2 rounded-lg border text-sm outline-none transition-colors ${
              result
                ? result.isCorrect
                  ? "border-green-500 bg-green-50"
                  : "border-red-500 bg-red-50"
                : "border-border focus:border-primary"
            }`}
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
      )}

      {result && (
        <div className={`rounded-lg p-3 text-sm ${result.isCorrect ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}>
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
