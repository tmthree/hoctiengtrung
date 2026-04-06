// Lessons list page — Server Component with URL-based filtering and plan-gating
import { headers } from "next/headers";
import { BookOpen } from "lucide-react";
import { auth } from "@/lib/auth";
import { HskLevelFilter } from "@/components/shared/hsk-level-filter";
import { SearchInput } from "@/components/shared/search-input";
import { Pagination } from "@/components/shared/pagination";
import { EmptyState } from "@/components/shared/empty-state";
import { LessonCardWithLock } from "@/components/lessons/lesson-card-with-lock";
import { UpgradeBanner } from "@/components/shared/upgrade-banner";
import { getLessons } from "@/lib/queries/lessons";
import { isPremium, FREE_LIMITS } from "@/lib/access-control";
import { db } from "@/lib/db";

interface LessonsPageProps {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ [key: string]: string | undefined }>;
}

export default async function LessonsPage({ params, searchParams }: LessonsPageProps) {
  const { locale } = await params;
  const sp = await searchParams;

  const hskLevel = sp.hskLevel ? parseInt(sp.hskLevel) : undefined;
  const search = sp.search;
  const page = sp.page ? parseInt(sp.page) : 1;

  // Determine user plan
  const session = await auth.api.getSession({ headers: await headers() });
  let userIsPremium = false;
  if (session?.user?.id) {
    const userPlan = await db.user.findUnique({
      where: { id: session.user.id },
      select: { plan: true, planExpiresAt: true },
    });
    if (userPlan) userIsPremium = isPremium(userPlan);
  }

  const { lessons, totalPages } = await getLessons({ hskLevel, search, page });
  const showUpgradeBanner = !userIsPremium;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-foreground">Bài học</h1>

      {showUpgradeBanner && (
        <UpgradeBanner
          title="Nâng cấp Premium để học tất cả HSK 1-6"
          description={`Gói miễn phí chỉ bao gồm HSK 1. Nâng cấp để mở khóa ${6 - FREE_LIMITS.maxHskLevel} cấp độ còn lại.`}
          locale={locale}
        />
      )}

      {/* Filters */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <HskLevelFilter />
        <div className="sm:ml-auto sm:w-64">
          <SearchInput placeholder="Tìm kiếm bài học..." />
        </div>
      </div>

      {/* Lesson grid */}
      {lessons.length === 0 ? (
        <EmptyState
          icon={BookOpen}
          title="Không có bài học nào"
          description="Chưa có bài học nào cho bộ lọc này"
        />
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {lessons.map((lesson) => (
            <LessonCardWithLock
              key={lesson.id}
              lesson={lesson}
              locale={locale}
              isLocked={!userIsPremium && lesson.hskLevel > FREE_LIMITS.maxHskLevel}
            />
          ))}
        </div>
      )}

      <Pagination currentPage={page} totalPages={totalPages} />
    </div>
  );
}
