"use client";
// Timed exam simulation — wraps quiz exercises with countdown timer
import { useState, useCallback } from "react";
import { useParams } from "next/navigation";
import { Clock, AlertTriangle } from "lucide-react";
import { useQuizState, type Exercise } from "@/hooks/use-quiz-state";
import { useExamTimer } from "@/hooks/use-exam-timer";
import { ExamResults } from "./exam-results";
import { ExerciseMultipleChoice } from "./exercise-multiple-choice";
import { ExerciseFillBlank } from "./exercise-fill-blank";
import { ExerciseTone } from "./exercise-tone";
import { ExercisePinyin } from "./exercise-pinyin";
import { ExerciseMatching } from "./exercise-matching";
import { ExerciseListening } from "./exercise-listening";

interface ExamFlowProps {
  exercises: Exercise[];
  hskLevel: number;
  timeMinutes: number;
}

export function ExamFlow({ exercises, hskLevel, timeMinutes }: ExamFlowProps) {
  const params = useParams();
  const locale = (params?.locale as string) ?? "vi";
  const [timeUpForced, setTimeUpForced] = useState(false);

  const {
    currentExercise,
    currentResult,
    currentIndex,
    hasAnswered,
    isComplete,
    isSubmitting,
    stats,
    score,
    answerResults,
    submitAnswer,
    nextQuestion,
    restart,
  } = useQuizState(exercises);

  const handleTimeUp = useCallback(() => {
    setTimeUpForced(true);
  }, []);

  const timer = useExamTimer({
    totalSeconds: timeMinutes * 60,
    onTimeUp: handleTimeUp,
  });

  const isDone = isComplete || timeUpForced;

  if (isDone) {
    timer.stop();
    return (
      <ExamResults
        score={score}
        stats={stats}
        hskLevel={hskLevel}
        locale={locale}
        elapsed={timer.elapsed}
        timeUp={timeUpForced && !isComplete}
        onRetry={() => {
          setTimeUpForced(false);
          restart();
        }}
      />
    );
  }

  if (!currentExercise) return null;

  const progress = Math.round((currentIndex / exercises.length) * 100);

  function renderExercise() {
    if (!currentExercise) return null;
    const q = currentExercise.question as Record<string, unknown>;
    const commonProps = { result: currentResult, isSubmitting, onNext: nextQuestion };

    switch (currentExercise.type) {
      case "MULTIPLE_CHOICE":
        return <ExerciseMultipleChoice question={q as { text: string; options: string[] }} onSubmit={(a) => submitAnswer(a)} {...commonProps} />;
      case "FILL_BLANK":
        return <ExerciseFillBlank question={q as { text: string }} onSubmit={(a) => submitAnswer(a)} {...commonProps} />;
      case "TONE":
        return <ExerciseTone question={q as { text: string; character?: string }} onSubmit={(a) => submitAnswer(a)} {...commonProps} />;
      case "PINYIN":
        return <ExercisePinyin question={q as { text: string; character?: string }} onSubmit={(a) => submitAnswer(a)} {...commonProps} />;
      case "MATCHING":
        return <ExerciseMatching question={q as { pairs: { left: string; right: string }[] }} onSubmit={(a) => submitAnswer(a)} {...commonProps} />;
      case "LISTENING":
        return <ExerciseListening question={q as { text: string; options?: string[]; hint?: string }} onSubmit={(a) => submitAnswer(a)} {...commonProps} />;
      default:
        return <ExerciseFillBlank question={q as { text: string }} onSubmit={(a) => submitAnswer(a)} {...commonProps} />;
    }
  }

  return (
    <div className="max-w-xl mx-auto space-y-4">
      {/* Timer bar */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur pb-2 pt-1">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Câu {currentIndex + 1} / {exercises.length}</span>
            <span>· {stats.correct} đúng</span>
          </div>
          <div className={`flex items-center gap-1.5 text-sm font-mono font-semibold ${timer.isLow ? "text-red-600 animate-pulse" : "text-foreground"}`}>
            {timer.isLow && <AlertTriangle className="w-4 h-4" />}
            <Clock className="w-4 h-4" />
            {timer.formatted}
          </div>
        </div>
        {/* Combined progress bar: quiz progress + timer */}
        <div className="h-2 bg-muted rounded-full overflow-hidden relative">
          <div className="absolute inset-0 h-full bg-primary/20 transition-all duration-1000" style={{ width: `${timer.progress}%` }} />
          <div className="absolute inset-0 h-full bg-primary transition-all duration-300" style={{ width: `${progress}%` }} />
        </div>
      </div>

      {/* Exercise card */}
      <div className="rounded-2xl border bg-card shadow-sm p-6">
        <div className="mb-1 flex items-center gap-2">
          <span className="text-xs text-muted-foreground uppercase tracking-wide font-medium">
            {currentExercise.type.replace("_", " ")}
          </span>
          <span className="text-xs text-muted-foreground">· Độ khó {currentExercise.difficulty}</span>
        </div>
        {renderExercise()}
      </div>

      {/* Skip */}
      {!hasAnswered && !isSubmitting && (
        <button onClick={nextQuestion} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
          Bỏ qua câu này
        </button>
      )}
    </div>
  );
}
