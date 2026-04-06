// Vocabulary list page — Server Component with plan-aware content gating
import { headers } from "next/headers";
import { BookMarked } from "lucide-react";
import { auth } from "@/lib/auth";
import { HskLevelFilter } from "@/components/shared/hsk-level-filter";
import { SearchInput } from "@/components/shared/search-input";
import { Pagination } from "@/components/shared/pagination";
import { EmptyState } from "@/components/shared/empty-state";
import { VocabularyCard } from "@/components/vocabulary/vocabulary-card";
import { UpgradeBanner } from "@/components/shared/upgrade-banner";
import { getVocabulary } from "@/lib/queries/vocabulary";
import { isPremium, FREE_LIMITS } from "@/lib/access-control";
import { db } from "@/lib/db";

interface VocabularyPageProps {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ [key: string]: string | undefined }>;
}

export default async function VocabularyPage({ params, searchParams }: VocabularyPageProps) {
  const { locale } = await params;
  const sp = await searchParams;

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

  // Free users: restrict to HSK 1 only; respect URL param for premium users
  const hskLevelParam = sp.hskLevel ? parseInt(sp.hskLevel) : undefined;
  const hskLevel = userIsPremium ? hskLevelParam : FREE_LIMITS.maxHskLevel;

  const { vocabulary, totalPages } = await getVocabulary({ hskLevel, search, page });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-foreground">Từ vựng</h1>

      {!userIsPremium && (
        <UpgradeBanner
          title="Chỉ hiển thị từ vựng HSK 1"
          description="Nâng cấp Premium để xem toàn bộ từ vựng HSK 1-6 (hơn 5,000 từ)."
          locale={locale}
        />
      )}

      {/* Filters — hide HSK level filter for free users (forced to HSK 1) */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        {userIsPremium && <HskLevelFilter />}
        <div className={userIsPremium ? "sm:ml-auto sm:w-64" : "w-full sm:max-w-xs"}>
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
