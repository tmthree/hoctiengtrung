// Word detail page — Server Component
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { WordDetail } from "@/components/vocabulary/word-detail";
import { VocabularyCard } from "@/components/vocabulary/vocabulary-card";
import { getVocabularyById, getVocabulary } from "@/lib/queries/vocabulary";

interface WordDetailPageProps {
  params: Promise<{ locale: string; id: string }>;
}

export default async function WordDetailPage({ params }: WordDetailPageProps) {
  const { locale, id } = await params;
  const word = await getVocabularyById(id);

  if (!word) notFound();

  // Fetch related words from the same HSK level (exclude current)
  const { vocabulary: related } = await getVocabulary({
    hskLevel: word.hskLevel,
    limit: 7,
  });
  const relatedWords = related.filter((w) => w.id !== word.id).slice(0, 6);

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Back button */}
      <Link
        href={`/${locale}/vocabulary`}
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground -ml-2 px-2 py-1 rounded transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Quay lại từ vựng
      </Link>

      {/* Word detail */}
      <WordDetail word={word} />

      {/* Related words */}
      {relatedWords.length > 0 && (
        <div className="space-y-3 pt-2">
          <h2 className="text-lg font-semibold">Từ liên quan</h2>
          <div className="grid gap-3 grid-cols-2 sm:grid-cols-3">
            {relatedWords.map((w) => (
              <VocabularyCard key={w.id} word={w} locale={locale} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
