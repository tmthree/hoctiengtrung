// Exam results — shows score, time, and comparison with exam standards
import Link from "next/link";
import { Clock, Target, Trophy } from "lucide-react";

interface ExamResultsProps {
  score: number;
  stats: { correct: number; total: number };
  hskLevel: number;
  locale: string;
  elapsed: number;
  timeUp: boolean;
  onRetry: () => void;
}

// HSK passing scores (standard is ~60%)
const PASS_SCORE = 60;

export function ExamResults({ score, stats, hskLevel, locale, elapsed, timeUp, onRetry }: ExamResultsProps) {
  const passed = score >= PASS_SCORE;
  const minutes = Math.floor(elapsed / 60);
  const seconds = elapsed % 60;
  const timeFormatted = `${minutes} phút ${seconds} giây`;

  return (
    <div className="flex flex-col items-center gap-6 max-w-md mx-auto text-center py-8">
      {/* Pass/Fail badge */}
      <div className={`w-36 h-36 rounded-full border-4 flex flex-col items-center justify-center ${passed ? "bg-green-50 border-green-300" : "bg-red-50 border-red-300"}`}>
        <Trophy className={`w-8 h-8 mb-1 ${passed ? "text-green-600" : "text-red-400"}`} />
        <span className={`text-3xl font-bold ${passed ? "text-green-600" : "text-red-600"}`}>{score}%</span>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-foreground mb-1">
          {passed ? "Chúc mừng! Đạt yêu cầu!" : "Chưa đạt yêu cầu"}
        </h2>
        <p className="text-sm text-muted-foreground">
          Mô phỏng thi HSK {hskLevel} · Cần {PASS_SCORE}% để đạt
        </p>
        {timeUp && (
          <p className="text-sm text-red-600 font-medium mt-1">Hết giờ làm bài!</p>
        )}
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-3 gap-3 w-full">
        <div className="rounded-xl border bg-card p-3">
          <Target className="w-5 h-5 text-green-600 mx-auto mb-1" />
          <p className="text-xl font-bold text-green-600">{stats.correct}</p>
          <p className="text-xs text-muted-foreground">Đúng</p>
        </div>
        <div className="rounded-xl border bg-card p-3">
          <Target className="w-5 h-5 text-red-500 mx-auto mb-1" />
          <p className="text-xl font-bold text-red-500">{stats.total - stats.correct}</p>
          <p className="text-xs text-muted-foreground">Sai</p>
        </div>
        <div className="rounded-xl border bg-card p-3">
          <Clock className="w-5 h-5 text-primary mx-auto mb-1" />
          <p className="text-xl font-bold text-foreground">{minutes}:{seconds.toString().padStart(2, "0")}</p>
          <p className="text-xs text-muted-foreground">Thời gian</p>
        </div>
      </div>

      {/* Summary */}
      <p className="text-sm text-muted-foreground">
        Hoàn thành {stats.correct}/{stats.total} câu trong {timeFormatted}
      </p>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3 w-full">
        <button
          onClick={onRetry}
          className="flex-1 py-2 px-4 rounded-lg border border-border hover:bg-muted text-sm font-medium transition-colors"
        >
          Thi lại
        </button>
        <Link
          href={`/${locale}/practice`}
          className="flex-1 py-2 px-4 rounded-lg bg-primary text-primary-foreground text-sm font-medium text-center hover:bg-primary/80 transition-colors"
        >
          Quay lại luyện tập
        </Link>
      </div>
    </div>
  );
}
