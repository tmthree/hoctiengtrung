"use client";
// Quiz orchestrator — manages exercise rendering, progress, and completion
import { useParams } from "next/navigation";
import { useQuizState, type Exercise } from "@/hooks/use-quiz-state";
import { QuizResults } from "./quiz-results";
import { ExerciseMultipleChoice } from "./exercise-multiple-choice";
import { ExerciseFillBlank } from "./exercise-fill-blank";
import { ExerciseTone } from "./exercise-tone";
import { ExercisePinyin } from "./exercise-pinyin";
import { ExerciseMatching } from "./exercise-matching";
import { ExerciseListening } from "./exercise-listening";

interface QuizFlowProps {
  exercises: Exercise[];
  lessonId: string;
}

export function QuizFlow({ exercises, lessonId }: QuizFlowProps) {
  const params = useParams();
  const locale = (params?.locale as string) ?? "vi";

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

  if (isComplete) {
    return (
      <QuizResults
        score={score}
        stats={stats}
        answerResults={answerResults}
        lessonId={lessonId}
        locale={locale}
        onRetry={restart}
      />
    );
  }

  if (!currentExercise) return null;

  const progress = Math.round(((currentIndex) / exercises.length) * 100);

  function renderExercise() {
    if (!currentExercise) return null;
    const q = currentExercise.question as Record<string, unknown>;
    const commonProps = {
      result: currentResult,
      isSubmitting,
      onNext: nextQuestion,
    };

    switch (currentExercise.type) {
      case "MULTIPLE_CHOICE":
        return (
          <ExerciseMultipleChoice
            question={q as { text: string; options: string[] }}
            onSubmit={(a) => submitAnswer(a)}
            {...commonProps}
          />
        );
      case "FILL_BLANK":
        return (
          <ExerciseFillBlank
            question={q as { text: string }}
            onSubmit={(a) => submitAnswer(a)}
            {...commonProps}
          />
        );
      case "TONE":
        return (
          <ExerciseTone
            question={q as { text: string; character?: string }}
            onSubmit={(a) => submitAnswer(a)}
            {...commonProps}
          />
        );
      case "PINYIN":
        return (
          <ExercisePinyin
            question={q as { text: string; character?: string }}
            onSubmit={(a) => submitAnswer(a)}
            {...commonProps}
          />
        );
      case "MATCHING":
        return (
          <ExerciseMatching
            question={q as { pairs: { left: string; right: string }[] }}
            onSubmit={(a) => submitAnswer(a)}
            {...commonProps}
          />
        );
      case "LISTENING":
        return (
          <ExerciseListening
            question={q as { text: string; options?: string[]; hint?: string }}
            onSubmit={(a) => submitAnswer(a)}
            {...commonProps}
          />
        );
      default:
        return (
          <ExerciseFillBlank
            question={q as { text: string }}
            onSubmit={(a) => submitAnswer(a)}
            {...commonProps}
          />
        );
    }
  }

  return (
    <div className="max-w-xl mx-auto space-y-6">
      {/* Progress */}
      <div>
        <div className="flex justify-between text-sm text-muted-foreground mb-1">
          <span>Câu {currentIndex + 1} / {exercises.length}</span>
          <span>{stats.correct} đúng</span>
        </div>
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-primary transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
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

      {/* Skip button when not yet answered */}
      {!hasAnswered && !isSubmitting && (
        <button
          onClick={nextQuestion}
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          Bỏ qua câu này
        </button>
      )}
    </div>
  );
}
