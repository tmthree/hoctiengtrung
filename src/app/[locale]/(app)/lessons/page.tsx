// Lessons list page — Server Component with URL-based filtering
import { BookOpen } from "lucide-react";
import { HskLevelFilter } from "@/components/shared/hsk-level-filter";
import { SearchInput } from "@/components/shared/search-input";
import { Pagination } from "@/components/shared/pagination";
import { EmptyState } from "@/components/shared/empty-state";
import { LessonCard } from "@/components/lessons/lesson-card";
import { getLessons } from "@/lib/queries/lessons";

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

  const { lessons, totalPages } = await getLessons({ hskLevel, search, page });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-foreground">Bài học</h1>

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
            <LessonCard key={lesson.id} lesson={lesson} locale={locale} />
          ))}
        </div>
      )}

      <Pagination currentPage={page} totalPages={totalPages} />
    </div>
  );
}
