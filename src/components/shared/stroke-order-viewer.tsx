"use client";
// Stroke order viewer — animated stroke order using HanziWriter library
import { useEffect, useRef, useState, useCallback } from "react";

interface StrokeOrderViewerProps {
  character: string;
  size?: number;
}

export function StrokeOrderViewer({ character, size = 150 }: StrokeOrderViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const writerRef = useRef<HanziWriterInstance | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isQuizMode, setIsQuizMode] = useState(false);

  // Only animate the first character if multi-char word
  const firstChar = character.charAt(0);

  useEffect(() => {
    let cancelled = false;

    async function loadWriter() {
      if (!containerRef.current) return;

      try {
        // Dynamic import to avoid SSR issues
        const HanziWriter = (await import("hanzi-writer")).default;

        if (cancelled || !containerRef.current) return;

        // Clear previous
        containerRef.current.innerHTML = "";
        writerRef.current = null;

        const writer = HanziWriter.create(containerRef.current, firstChar, {
          width: size,
          height: size,
          padding: 5,
          strokeAnimationSpeed: 1,
          delayBetweenStrokes: 200,
          showOutline: true,
          showCharacter: true,
          strokeColor: "#333",
          outlineColor: "#ddd",
          radicalColor: "#168f16",
        });

        writerRef.current = writer;
        setIsLoaded(true);
        setError(false);
      } catch {
        if (!cancelled) setError(true);
      }
    }

    setIsLoaded(false);
    setError(false);
    setIsAnimating(false);
    setIsQuizMode(false);
    loadWriter();

    return () => {
      cancelled = true;
    };
  }, [firstChar, size]);

  const animateStrokes = useCallback(() => {
    if (!writerRef.current || isAnimating) return;
    setIsAnimating(true);
    setIsQuizMode(false);
    writerRef.current.animateCharacter({
      onComplete: () => setIsAnimating(false),
    });
  }, [isAnimating]);

  const startQuiz = useCallback(() => {
    if (!writerRef.current) return;
    setIsQuizMode(true);
    setIsAnimating(false);
    writerRef.current.quiz({
      onComplete: () => setIsQuizMode(false),
    });
  }, []);

  if (error) {
    return <p className="text-sm text-muted-foreground italic">Không có dữ liệu nét cho ký tự này</p>;
  }

  return (
    <div className="flex flex-col items-center gap-3">
      {character.length > 1 && (
        <p className="text-xs text-muted-foreground">Hiển thị nét cho: {firstChar}</p>
      )}
      <div
        ref={containerRef}
        className="border rounded-lg bg-white"
        style={{ width: size, height: size }}
      />
      {isLoaded && (
        <div className="flex gap-2">
          <button
            onClick={animateStrokes}
            disabled={isAnimating}
            className="px-3 py-1.5 text-xs rounded-md bg-primary/10 text-primary hover:bg-primary/20 transition-colors disabled:opacity-50"
          >
            {isAnimating ? "Đang viết..." : "Xem nét"}
          </button>
          <button
            onClick={startQuiz}
            disabled={isQuizMode}
            className="px-3 py-1.5 text-xs rounded-md bg-green-100 text-green-700 hover:bg-green-200 transition-colors disabled:opacity-50"
          >
            {isQuizMode ? "Đang luyện..." : "Luyện viết"}
          </button>
        </div>
      )}
      {!isLoaded && !error && (
        <p className="text-xs text-muted-foreground animate-pulse">Đang tải...</p>
      )}
    </div>
  );
}

// Type for HanziWriter instance
interface HanziWriterInstance {
  animateCharacter: (options?: { onComplete?: () => void }) => void;
  quiz: (options?: { onComplete?: () => void }) => void;
}
