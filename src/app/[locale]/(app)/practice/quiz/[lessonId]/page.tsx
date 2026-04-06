// Quiz page — loads exercises for a lesson and renders the QuizFlow
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { QuizFlow } from "@/components/practice/quiz-flow";
import { getLessonById } from "@/lib/queries/lessons";
import { getExercisesForLesson } from "@/lib/actions/quiz-actions";

interface QuizPageProps {
  params: Promise<{ locale: string; lessonId: string }>;
}

export default async function QuizPage({ params }: QuizPageProps) {
  const { locale, lessonId } = await params;

  const [lesson, exercisesResult] = await Promise.all([
    getLessonById(lessonId),
    getExercisesForLesson(lessonId),
  ]);

  if (!lesson) notFound();

  const exercises = exercisesResult.data ?? [];

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Back button */}
      <Link
        href={`/${locale}/lessons/${lessonId}`}
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground -ml-2 px-2 py-1 rounded transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Quay lại bài học
      </Link>

      {/* Header */}
      <div>
        <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium mb-1">
          Bài kiểm tra · HSK {lesson.hskLevel}
        </p>
        <h1 className="text-xl font-bold text-foreground">{lesson.title}</h1>
      </div>

      {exercises.length === 0 ? (
        <div className="flex flex-col items-center gap-4 py-16 text-center">
          <p className="font-semibold text-foreground">Chưa có bài tập nào</p>
          <p className="text-sm text-muted-foreground">
            Bài học này chưa có bài tập. Hãy thử bài học khác.
          </p>
          <Link
            href={`/${locale}/practice`}
            className="px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-lg hover:bg-primary/80 transition-colors"
          >
            Quay lại luyện tập
          </Link>
        </div>
      ) : (
        <QuizFlow exercises={exercises} lessonId={lessonId} />
      )}
    </div>
  );
}
