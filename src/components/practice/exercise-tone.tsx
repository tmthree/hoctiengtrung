"use client";
// Tone selection exercise — user picks the correct tone for a Chinese character
import type { AnswerResult } from "@/hooks/use-quiz-state";

interface ToneQuestion {
  text: string; // The Chinese character
  character?: string;
}

interface ExerciseToneProps {
  question: ToneQuestion;
  result: AnswerResult | null;
  isSubmitting: boolean;
  onSubmit: (answer: number) => void;
  onNext: () => void;
}

// Tone marks displayed on buttons (1st–4th + neutral)
const TONES = [
  { label: "1st ˉ", value: 1 },
  { label: "2nd ˊ", value: 2 },
  { label: "3rd ˇ", value: 3 },
  { label: "4th ˋ", value: 4 },
] as const;

export function ExerciseTone({
  question,
  result,
  isSubmitting,
  onSubmit,
  onNext,
}: ExerciseToneProps) {
  const character = question.character ?? question.text;
  const correctTone = result
    ? (result.correctAnswer as { correct: number }).correct
    : null;

  function getButtonClass(value: number) {
    const base = "py-3 px-4 rounded-lg border text-sm font-medium transition-colors";
    if (!result) return `${base} hover:border-primary hover:bg-primary/5 border-border cursor-pointer`;
    if (value === correctTone) return `${base} border-green-500 bg-green-50 text-green-700`;
    return `${base} border-border opacity-60`;
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <p className="text-sm text-muted-foreground mb-2">Chọn thanh điệu đúng</p>
        <p className="text-7xl font-normal text-foreground font-chinese">
          {character}
        </p>
      </div>

      <div className="grid grid-cols-4 gap-2">
        {TONES.map(({ label, value }) => (
          <button
            key={value}
            className={getButtonClass(value)}
            onClick={() => onSubmit(value)}
            disabled={!!result || isSubmitting}
          >
            {label}
          </button>
        ))}
      </div>

      {result && (
        <div
          className={`rounded-lg p-3 text-sm ${result.isCorrect ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}
        >
          {result.isCorrect ? "Đúng rồi!" : `Chưa đúng. Thanh điệu đúng: ${correctTone}${["ˉ","ˊ","ˇ","ˋ"][((correctTone as number) - 1)] ?? ""}`}
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
