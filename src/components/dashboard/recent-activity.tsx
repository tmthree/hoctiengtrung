// Server Component — list of recent quiz attempts and vocabulary reviews
import { Badge } from "@/components/ui/badge";
import { getTranslations } from "next-intl/server";

interface QuizAttemptItem {
  id: string;
  isCorrect: boolean;
  attemptedAt: Date;
  exercise: {
    lesson: {
      title: string;
    };
  };
}

interface ReviewItem {
  id: string;
  lastReview: Date | null;
  vocabulary: {
    simplified: string;
  };
}

interface RecentActivityProps {
  quizAttempts: QuizAttemptItem[];
  reviews: ReviewItem[];
}

function formatDate(date: Date | null): string {
  if (!date) return "";
  return new Intl.DateTimeFormat("vi-VN", { day: "2-digit", month: "2-digit" }).format(
    new Date(date)
  );
}

export async function RecentActivity({ quizAttempts, reviews }: RecentActivityProps) {
  const t = await getTranslations("dashboard");

  // Merge and sort by date descending — take top 10
  type ActivityItem =
    | { type: "quiz"; data: QuizAttemptItem; time: Date }
    | { type: "review"; data: ReviewItem; time: Date };

  const items: ActivityItem[] = [
    ...quizAttempts.map((q) => ({ type: "quiz" as const, data: q, time: new Date(q.attemptedAt) })),
    ...reviews
      .filter((r) => r.lastReview !== null)
      .map((r) => ({ type: "review" as const, data: r, time: new Date(r.lastReview!) })),
  ]
    .sort((a, b) => b.time.getTime() - a.time.getTime())
    .slice(0, 10);

  if (items.length === 0) {
    return (
      <div>
        <h3 className="mb-3 text-sm font-semibold">{t("recentActivity")}</h3>
        <p className="text-sm text-muted-foreground">{t("noActivity")}</p>
      </div>
    );
  }

  return (
    <div>
      <h3 className="mb-3 text-sm font-semibold">{t("recentActivity")}</h3>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={`${item.type}-${item.data.id}`} className="flex items-center justify-between gap-2 text-sm">
            {item.type === "quiz" ? (
              <>
                <span className="truncate text-foreground">
                  {t("quizCompleted")}: {item.data.exercise.lesson.title}
                </span>
                <div className="flex shrink-0 items-center gap-2">
                  <Badge variant={item.data.isCorrect ? "default" : "destructive"} className="text-xs">
                    {item.data.isCorrect ? "Đúng" : "Sai"}
                  </Badge>
                  <span className="text-xs text-muted-foreground">{formatDate(item.time)}</span>
                </div>
              </>
            ) : (
              <>
                <span className="truncate text-foreground">
                  {t("wordReviewed")}: {item.data.vocabulary.simplified}
                </span>
                <span className="shrink-0 text-xs text-muted-foreground">{formatDate(item.time)}</span>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
