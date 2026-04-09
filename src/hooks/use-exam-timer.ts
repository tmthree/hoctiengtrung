"use client";
// Countdown timer hook for timed exam simulation
import { useState, useEffect, useCallback, useRef } from "react";

interface UseExamTimerOptions {
  totalSeconds: number;
  onTimeUp?: () => void;
}

export function useExamTimer({ totalSeconds, onTimeUp }: UseExamTimerOptions) {
  const [remaining, setRemaining] = useState(totalSeconds);
  const [isRunning, setIsRunning] = useState(true);
  const onTimeUpRef = useRef(onTimeUp);
  onTimeUpRef.current = onTimeUp;

  useEffect(() => {
    if (!isRunning || remaining <= 0) return;

    const interval = setInterval(() => {
      setRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setIsRunning(false);
          onTimeUpRef.current?.();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, remaining]);

  const pause = useCallback(() => setIsRunning(false), []);
  const resume = useCallback(() => setIsRunning(true), []);
  const stop = useCallback(() => {
    setIsRunning(false);
  }, []);

  const elapsed = totalSeconds - remaining;
  const minutes = Math.floor(remaining / 60);
  const seconds = remaining % 60;
  const formatted = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  const progress = totalSeconds > 0 ? (remaining / totalSeconds) * 100 : 0;
  const isLow = remaining <= 60 && remaining > 0;

  return { remaining, elapsed, formatted, progress, isLow, isRunning, pause, resume, stop };
}
