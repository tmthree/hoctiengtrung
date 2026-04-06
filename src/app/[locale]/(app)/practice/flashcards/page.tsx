// Flashcard session page — loads due cards and renders the FlashcardDeck
export const dynamic = "force-dynamic";

import { ArrowLeft, BookOpen } from "lucide-react";
import Link from "next/link";
import { FlashcardDeck } from "@/components/vocabulary/flashcard-deck";
import { getDueReviewCards } from "@/lib/actions/vocabulary-actions";

interface FlashcardsPageProps {
  params: Promise<{ locale: string }>;
}

export default async function FlashcardsPage({ params }: FlashcardsPageProps) {
  const { locale } = await params;
  const result = await getDueReviewCards();

  const cards = result.data ?? [];

  return (
    <div className="max-w-lg mx-auto space-y-6">
      {/* Back button */}
      <Link
        href={`/${locale}/practice`}
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground -ml-2 px-2 py-1 rounded transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Quay lại luyện tập
      </Link>

      <div>
        <h1 className="text-xl font-bold text-foreground">Ôn tập từ vựng</h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          {cards.length > 0
            ? `${cards.length} thẻ cần ôn hôm nay`
            : "Không có thẻ nào cần ôn"}
        </p>
      </div>

      {cards.length === 0 ? (
        <div className="flex flex-col items-center gap-4 py-16 text-center">
          <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center">
            <BookOpen className="w-7 h-7 text-green-600" />
          </div>
          <div>
            <p className="font-semibold text-foreground">Không có từ nào cần ôn</p>
            <p className="text-sm text-muted-foreground mt-1">
              Hãy quay lại sau hoặc học thêm từ mới
            </p>
          </div>
          <Link
            href={`/${locale}/lessons`}
            className="px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-lg hover:bg-primary/80 transition-colors"
          >
            Học thêm từ mới
          </Link>
        </div>
      ) : (
        <FlashcardDeck cards={cards} />
      )}
    </div>
  );
}
