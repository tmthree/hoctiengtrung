// Session complete summary component for flashcard reviews
import Link from "next/link";
import { CheckCircle } from "lucide-react";

interface FlashcardStatsProps {
  stats: {
    reviewed: number;
    correct: number;
    totalRatings: number;
  };
  totalCards: number;
  onRestart?: () => void;
}

export function FlashcardStats({ stats, totalCards, onRestart }: FlashcardStatsProps) {
  const accuracy =
    stats.reviewed > 0 ? Math.round((stats.correct / stats.reviewed) * 100) : 0;
  const avgRating =
    stats.reviewed > 0
      ? (stats.totalRatings / stats.reviewed).toFixed(1)
      : "0";

  return (
    <div className="flex flex-col items-center gap-6 max-w-md mx-auto text-center py-8">
      <div className="flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600">
        <CheckCircle className="w-8 h-8" />
      </div>

      <div>
        <h2 className="text-2xl font-bold text-foreground mb-1">Hoàn thành ôn tập!</h2>
        <p className="text-muted-foreground">Bạn đã ôn xong {totalCards} thẻ từ vựng</p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-3 gap-4 w-full">
        <div className="rounded-xl border bg-card p-4">
          <p className="text-2xl font-bold text-foreground">{stats.reviewed}</p>
          <p className="text-xs text-muted-foreground mt-1">Đã ôn</p>
        </div>
        <div className="rounded-xl border bg-card p-4">
          <p className="text-2xl font-bold text-green-600">{stats.correct}</p>
          <p className="text-xs text-muted-foreground mt-1">Đúng</p>
        </div>
        <div className="rounded-xl border bg-card p-4">
          <p className="text-2xl font-bold text-primary">{accuracy}%</p>
          <p className="text-xs text-muted-foreground mt-1">Chính xác</p>
        </div>
      </div>

      <p className="text-sm text-muted-foreground">
        Điểm trung bình: <span className="font-medium text-foreground">{avgRating}/5</span>
      </p>

      {/* Action buttons */}
      <div className="flex flex-col sm:flex-row gap-3 w-full">
        {onRestart && (
          <button
            onClick={onRestart}
            className="flex-1 py-2 px-4 rounded-lg border border-border hover:bg-muted text-sm font-medium transition-colors"
          >
            Ôn tập lại
          </button>
        )}
        <Link
          href="/lessons"
          className="flex-1 py-2 px-4 rounded-lg bg-primary text-primary-foreground text-sm font-medium text-center hover:bg-primary/80 transition-colors"
        >
          Tiếp tục học
        </Link>
      </div>
    </div>
  );
}
