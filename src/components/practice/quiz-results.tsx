// Quiz results screen component — shows score, breakdown, and action buttons
import Link from "next/link";
import type { AnswerResult } from "@/hooks/use-quiz-state";

interface QuizResultsProps {
  score: number;
  stats: { correct: number; total: number };
  answerResults: (AnswerResult | null)[];
  lessonId: string;
  locale: string;
  onRetry: () => void;
}

export function QuizResults({
  score,
  stats,
  lessonId,
  locale,
  onRetry,
}: QuizResultsProps) {
  const scoreColor =
    score >= 80
      ? "text-green-600"
      : score >= 50
        ? "text-yellow-600"
        : "text-red-600";

  const scoreBg =
    score >= 80
      ? "bg-green-50 border-green-200"
      : score >= 50
        ? "bg-yellow-50 border-yellow-200"
        : "bg-red-50 border-red-200";

  const scoreMessage =
    score >= 80
      ? "Xuất sắc!"
      : score >= 50
        ? "Khá tốt!"
        : "Cần luyện tập thêm!";

  return (
    <div className="flex flex-col items-center gap-6 max-w-md mx-auto text-center py-8">
      {/* Score circle */}
      <div className={`w-32 h-32 rounded-full border-4 flex flex-col items-center justify-center ${scoreBg}`}>
        <span className={`text-4xl font-bold ${scoreColor}`}>{score}%</span>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-foreground mb-1">Hoàn thành bài kiểm tra!</h2>
        <p className={`font-medium ${scoreColor}`}>{scoreMessage}</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 w-full">
        <div className="rounded-xl border bg-card p-4">
          <p className="text-2xl font-bold text-green-600">{stats.correct}</p>
          <p className="text-xs text-muted-foreground mt-1">Câu đúng</p>
        </div>
        <div className="rounded-xl border bg-card p-4">
          <p className="text-2xl font-bold text-red-500">{stats.total - stats.correct}</p>
          <p className="text-xs text-muted-foreground mt-1">Câu sai</p>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex flex-col sm:flex-row gap-3 w-full">
        <button
          onClick={onRetry}
          className="flex-1 py-2 px-4 rounded-lg border border-border hover:bg-muted text-sm font-medium transition-colors"
        >
          Thử lại
        </button>
        <Link
          href={`/${locale}/lessons/${lessonId}`}
          className="flex-1 py-2 px-4 rounded-lg bg-primary text-primary-foreground text-sm font-medium text-center hover:bg-primary/80 transition-colors"
        >
          Quay lại bài học
        </Link>
      </div>
    </div>
  );
}
