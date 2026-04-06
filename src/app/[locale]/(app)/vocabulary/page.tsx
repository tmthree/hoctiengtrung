// Vocabulary list page — Server Component with URL-based filtering
import { BookMarked } from "lucide-react";
import { HskLevelFilter } from "@/components/shared/hsk-level-filter";
import { SearchInput } from "@/components/shared/search-input";
import { Pagination } from "@/components/shared/pagination";
import { EmptyState } from "@/components/shared/empty-state";
import { VocabularyCard } from "@/components/vocabulary/vocabulary-card";
import { getVocabulary } from "@/lib/queries/vocabulary";

interface VocabularyPageProps {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ [key: string]: string | undefined }>;
}

export default async function VocabularyPage({ params, searchParams }: VocabularyPageProps) {
  const { locale } = await params;
  const sp = await searchParams;

  const hskLevel = sp.hskLevel ? parseInt(sp.hskLevel) : undefined;
  const search = sp.search;
  const page = sp.page ? parseInt(sp.page) : 1;

  const { vocabulary, totalPages } = await getVocabulary({ hskLevel, search, page });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-foreground">Từ vựng</h1>

      {/* Filters */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <HskLevelFilter />
        <div className="sm:ml-auto sm:w-64">
          <SearchInput placeholder="Tìm kiếm từ vựng..." />
        </div>
      </div>

      {/* Vocabulary grid */}
      {vocabulary.length === 0 ? (
        <EmptyState
          icon={BookMarked}
          title="Không có từ vựng nào"
          description="Chưa có từ vựng nào cho bộ lọc này"
        />
      ) : (
        <div className="grid gap-3 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {vocabulary.map((word) => (
            <VocabularyCard key={word.id} word={word} locale={locale} />
          ))}
        </div>
      )}

      <Pagination currentPage={page} totalPages={totalPages} />
    </div>
  );
}
