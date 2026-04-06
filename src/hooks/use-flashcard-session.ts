"use client";
// Client-side state machine for flashcard review sessions
import { useState, useCallback } from "react";
import { submitReview } from "@/lib/actions/vocabulary-actions";

interface VocabularyCard {
  id: string;
  simplified: string;
  pinyin: string;
  meaning: string;
  exampleSentence?: string | null;
  examplePinyin?: string | null;
  exampleMeaning?: string | null;
}

interface SessionStats {
  reviewed: number;
  correct: number;
  totalRatings: number;
}

export function useFlashcardSession(initialCards: VocabularyCard[]) {
  const [cards] = useState<VocabularyCard[]>(initialCards);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isComplete, setIsComplete] = useState(initialCards.length === 0);
  const [stats, setStats] = useState<SessionStats>({
    reviewed: 0,
    correct: 0,
    totalRatings: 0,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const currentCard = cards[currentIndex] ?? null;

  const flip = useCallback(() => {
    setIsFlipped((prev) => !prev);
  }, []);

  const rate = useCallback(
    async (quality: number) => {
      if (!currentCard || isSubmitting) return;

      setIsSubmitting(true);
      try {
        await submitReview(currentCard.id, quality);
      } catch {
        // Continue even if network error — update UI state
      } finally {
        setIsSubmitting(false);
      }

      setStats((prev) => ({
        reviewed: prev.reviewed + 1,
        correct: quality >= 3 ? prev.correct + 1 : prev.correct,
        totalRatings: prev.totalRatings + quality,
      }));

      // Advance to next card
      const nextIndex = currentIndex + 1;
      if (nextIndex >= cards.length) {
        setIsComplete(true);
      } else {
        setCurrentIndex(nextIndex);
        setIsFlipped(false);
      }
    },
    [currentCard, currentIndex, cards.length, isSubmitting]
  );

  const restart = useCallback(() => {
    setCurrentIndex(0);
    setIsFlipped(false);
    setIsComplete(false);
    setStats({ reviewed: 0, correct: 0, totalRatings: 0 });
  }, []);

  return {
    currentCard,
    currentIndex,
    totalCards: cards.length,
    isFlipped,
    isComplete,
    isSubmitting,
    stats,
    flip,
    rate,
    restart,
  };
}
