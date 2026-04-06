"use client";
// Matching exercise — click to pair Chinese characters with their meanings
import { useState } from "react";
import type { AnswerResult } from "@/hooks/use-quiz-state";

interface MatchingQuestion {
  pairs: { left: string; right: string }[];
}

interface ExerciseMatchingProps {
  question: MatchingQuestion;
  result: AnswerResult | null;
  isSubmitting: boolean;
  onSubmit: (answer: number[][]) => void;
  onNext: () => void;
}

export function ExerciseMatching({
  question,
  result,
  isSubmitting,
  onSubmit,
  onNext,
}: ExerciseMatchingProps) {
  const [selectedLeft, setSelectedLeft] = useState<number | null>(null);
  const [matched, setMatched] = useState<Map<number, number>>(new Map());

  // Shuffle right column indices for display
  const [rightOrder] = useState(() => {
    const indices = question.pairs.map((_, i) => i);
    for (let i = indices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [indices[i], indices[j]] = [indices[j], indices[i]];
    }
    return indices;
  });

  const correctPairs = result
    ? (result.correctAnswer as { pairs: number[][] }).pairs
    : null;

  function handleLeftClick(leftIdx: number) {
    if (result || isSubmitting || matched.has(leftIdx)) return;
    setSelectedLeft(selectedLeft === leftIdx ? null : leftIdx);
  }

  function handleRightClick(rightOriginalIdx: number) {
    if (result || isSubmitting) return;
    if (selectedLeft === null) return;

    // Check not already matched to this right
    const alreadyMatched = Array.from(matched.values()).includes(rightOriginalIdx);
    if (alreadyMatched) return;

    const newMatched = new Map(matched);
    newMatched.set(selectedLeft, rightOriginalIdx);
    setMatched(newMatched);
    setSelectedLeft(null);

    // If all matched, submit
    if (newMatched.size === question.pairs.length) {
      const pairs: number[][] = Array.from(newMatched.entries());
      onSubmit(pairs);
    }
  }

  function isLeftMatched(leftIdx: number) {
    return matched.has(leftIdx);
  }

  function isRightMatched(rightOriginalIdx: number) {
    return Array.from(matched.values()).includes(rightOriginalIdx);
  }

  function getLeftClass(leftIdx: number) {
    const base = "px-4 py-2 rounded-lg border text-sm transition-colors text-center";
    if (result) {
      const isCorrectMatch = correctPairs?.some(
        ([l, r]) => l === leftIdx && matched.get(leftIdx) === r
      );
      return `${base} ${isCorrectMatch ? "border-green-500 bg-green-50 text-green-700" : "border-red-400 bg-red-50 text-red-700"}`;
    }
    if (matched.has(leftIdx)) return `${base} border-primary bg-primary/10 opacity-70 cursor-default`;
    if (selectedLeft === leftIdx) return `${base} border-primary bg-primary/10 cursor-pointer`;
    return `${base} border-border hover:border-primary cursor-pointer`;
  }

  function getRightClass(rightOriginalIdx: number) {
    const base = "px-4 py-2 rounded-lg border text-sm transition-colors text-center";
    if (isRightMatched(rightOriginalIdx)) return `${base} border-primary bg-primary/10 opacity-70 cursor-default`;
    if (selectedLeft !== null) return `${base} border-border hover:border-green-500 cursor-pointer`;
    return `${base} border-border opacity-70`;
  }

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">Nối cặp tương ứng</p>

      <div className="grid grid-cols-2 gap-3">
        {/* Left column — characters */}
        <div className="space-y-2">
          {question.pairs.map((pair, leftIdx) => (
            <button
              key={leftIdx}
              className={getLeftClass(leftIdx)}
              onClick={() => handleLeftClick(leftIdx)}
              disabled={isLeftMatched(leftIdx) || !!result}
              style={{ fontFamily: "'Noto Sans SC', sans-serif" }}
            >
              {pair.left}
            </button>
          ))}
        </div>

        {/* Right column — meanings (shuffled) */}
        <div className="space-y-2">
          {rightOrder.map((rightOriginalIdx) => (
            <button
              key={rightOriginalIdx}
              className={getRightClass(rightOriginalIdx)}
              onClick={() => handleRightClick(rightOriginalIdx)}
              disabled={isRightMatched(rightOriginalIdx) || !!result}
            >
              {question.pairs[rightOriginalIdx].right}
            </button>
          ))}
        </div>
      </div>

      {result && (
        <div className={`rounded-lg p-3 text-sm ${result.isCorrect ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}>
          {result.isCorrect ? "Xuất sắc! Tất cả các cặp đều đúng!" : "Có một số cặp chưa đúng."}
        </div>
      )}

      {result && (
        <button
          onClick={onNext}
          className="w-full py-2 px-4 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/80 transition-colors"
        >
          Tiếp theo
        </button>
      )}
    </div>
  );
}
