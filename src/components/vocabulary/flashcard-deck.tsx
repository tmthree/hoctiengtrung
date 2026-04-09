"use client";
// Flashcard deck component with CSS 3D flip animation and SM-2 rating buttons
import { FlashcardStats } from "./flashcard-stats";
import { AudioPlayButton } from "@/components/shared/audio-play-button";
import { useFlashcardSession } from "@/hooks/use-flashcard-session";

interface VocabularyCard {
  id: string;
  simplified: string;
  pinyin: string;
  meaning: string;
  exampleSentence?: string | null;
  examplePinyin?: string | null;
  exampleMeaning?: string | null;
}

interface FlashcardDeckProps {
  cards: VocabularyCard[];
}

const ratingButtons = [
  { label: "Lại", quality: 1, color: "bg-red-500 hover:bg-red-600 text-white" },
  { label: "Khó", quality: 2, color: "bg-orange-500 hover:bg-orange-600 text-white" },
  { label: "Tốt", quality: 3, color: "bg-green-500 hover:bg-green-600 text-white" },
  { label: "Dễ", quality: 5, color: "bg-blue-500 hover:bg-blue-600 text-white" },
] as const;

export function FlashcardDeck({ cards }: FlashcardDeckProps) {
  const { currentCard, currentIndex, totalCards, isFlipped, isComplete, isSubmitting, stats, flip, rate, restart } =
    useFlashcardSession(cards);

  if (isComplete) {
    return <FlashcardStats stats={stats} totalCards={totalCards} onRestart={restart} />;
  }

  if (!currentCard) return null;

  const progress = Math.round((currentIndex / totalCards) * 100);

  return (
    <div className="flex flex-col items-center gap-6 max-w-lg mx-auto w-full">
      {/* Progress bar */}
      <div className="w-full">
        <div className="flex justify-between text-sm text-muted-foreground mb-1">
          <span>{currentIndex} / {totalCards} thẻ</span>
          <span>{stats.correct} đúng</span>
        </div>
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-primary transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* 3D Flip Card */}
      <div
        className="w-full cursor-pointer"
        style={{ perspective: "1000px" }}
        onClick={flip}
      >
        <div
          className="relative w-full transition-transform duration-500"
          style={{
            transformStyle: "preserve-3d",
            transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
            minHeight: "280px",
          }}
        >
          {/* Front face */}
          <div
            className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl border bg-card shadow-md p-8"
            style={{ backfaceVisibility: "hidden" }}
          >
            <div className="flex items-center gap-2 mb-4">
              <p className="text-7xl font-normal text-foreground font-chinese">
                {currentCard.simplified}
              </p>
              <AudioPlayButton text={currentCard.simplified} size="lg" />
            </div>
            <p className="text-sm text-muted-foreground">Nhấn để lật thẻ</p>
          </div>

          {/* Back face */}
          <div
            className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl border bg-card shadow-md p-8 gap-3"
            style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
          >
            <div className="flex items-center gap-2">
              <p className="text-5xl font-normal text-foreground font-chinese">
                {currentCard.simplified}
              </p>
              <AudioPlayButton text={currentCard.simplified} size="md" />
            </div>
            <p className="text-lg text-primary font-medium">{currentCard.pinyin}</p>
            <p className="text-base text-foreground font-medium">{currentCard.meaning}</p>
            {currentCard.exampleSentence && (
              <div className="text-center border-t pt-3 mt-1 w-full">
                <div className="flex items-start justify-center gap-1">
                  <p className="text-sm text-muted-foreground font-chinese">
                    {currentCard.exampleSentence}
                  </p>
                  <AudioPlayButton text={currentCard.exampleSentence} size="sm" />
                </div>
                {currentCard.examplePinyin && (
                  <p className="text-xs text-muted-foreground mt-0.5">{currentCard.examplePinyin}</p>
                )}
                {currentCard.exampleMeaning && (
                  <p className="text-xs text-muted-foreground">{currentCard.exampleMeaning}</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Rating buttons — shown only when flipped */}
      {isFlipped && (
        <div className="grid grid-cols-4 gap-2 w-full">
          {ratingButtons.map(({ label, quality, color }) => (
            <button
              key={quality}
              onClick={() => rate(quality)}
              disabled={isSubmitting}
              className={`${color} py-2 px-3 rounded-lg text-sm font-medium transition-colors disabled:opacity-50`}
            >
              {label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
