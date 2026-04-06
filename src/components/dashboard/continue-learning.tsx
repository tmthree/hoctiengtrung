// Server Component — smart suggestion card for continuing learning
import Link from "next/link";
import { ArrowRight, BookOpen, RotateCcw } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getTranslations } from "next-intl/server";

interface ContinueLearningProps {
  locale: string;
  dueReviewCount: number;
  nextLessonId?: string;
  nextLessonTitle?: string;
}

// Styled link that looks like a secondary button (no asChild since Button uses @base-ui)
const actionLinkClass =
  "inline-flex items-center gap-1 rounded-lg bg-secondary px-2.5 py-1.5 text-xs font-medium text-secondary-foreground hover:bg-secondary/80 shrink-0";

export async function ContinueLearning({
  locale,
  dueReviewCount,
  nextLessonId,
  nextLessonTitle,
}: ContinueLearningProps) {
  const t = await getTranslations("dashboard");
  const hasReviews = dueReviewCount > 0;

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base">{t("continueLearning")}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {hasReviews && (
          <div className="flex items-center justify-between gap-3 rounded-lg bg-muted p-3">
            <div className="flex items-center gap-2">
              <RotateCcw className="h-4 w-4 text-orange-500" />
              <span className="text-sm">{t("reviewDue", { count: dueReviewCount })}</span>
            </div>
            <Link href={`/${locale}/practice/flashcards`} className={actionLinkClass}>
              Ôn ngay
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        )}

        {nextLessonId && nextLessonTitle && (
          <div className="flex items-center justify-between gap-3 rounded-lg bg-muted p-3">
            <div className="flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-blue-500" />
              <span className="truncate text-sm">{nextLessonTitle}</span>
            </div>
            <Link href={`/${locale}/lessons/${nextLessonId}`} className={actionLinkClass}>
              {t("nextLesson")}
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        )}

        {!hasReviews && !nextLessonId && (
          <div className="flex items-center justify-between gap-3 rounded-lg bg-muted p-3">
            <div className="flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-blue-500" />
              <span className="text-sm">Khám phá bài học mới</span>
            </div>
            <Link href={`/${locale}/lessons`} className={actionLinkClass}>
              Xem bài học
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
