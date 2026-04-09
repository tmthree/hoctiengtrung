// Exam simulation page — timed HSK exam with random exercises
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { ExamFlow } from "@/components/practice/exam-flow";
import { getExamExercises } from "@/lib/actions/quiz-actions";

interface ExamPageProps {
  params: Promise<{ locale: string; hskLevel: string }>;
}

// Time per HSK level (minutes): lower levels get less time
const EXAM_TIME: Record<number, number> = {
  1: 15, 2: 20, 3: 25, 4: 30, 5: 40, 6: 45, 7: 50, 8: 55, 9: 60,
};

// Number of questions per exam
const EXAM_QUESTIONS: Record<number, number> = {
  1: 15, 2: 20, 3: 25, 4: 30, 5: 30, 6: 30, 7: 30, 8: 30, 9: 30,
};

export default async function ExamPage({ params }: ExamPageProps) {
  const { locale, hskLevel: hskStr } = await params;
  const hskLevel = parseInt(hskStr, 10);

  if (isNaN(hskLevel) || hskLevel < 1 || hskLevel > 9) notFound();

  const result = await getExamExercises(hskLevel, EXAM_QUESTIONS[hskLevel] ?? 30);
  const exercises = result.data ?? [];
  const timeMinutes = EXAM_TIME[hskLevel] ?? 30;

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Link
        href={`/${locale}/practice`}
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground -ml-2 px-2 py-1 rounded transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Quay lại luyện tập
      </Link>

      <div>
        <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium mb-1">
          Mô phỏng thi · {timeMinutes} phút
        </p>
        <h1 className="text-xl font-bold text-foreground">Thi thử HSK {hskLevel}</h1>
      </div>

      {exercises.length === 0 ? (
        <div className="flex flex-col items-center gap-4 py-16 text-center">
          <p className="font-semibold text-foreground">Chưa có đề thi</p>
          <p className="text-sm text-muted-foreground">
            Cần thêm bài tập cho HSK {hskLevel} để tạo đề thi mô phỏng.
          </p>
          <Link
            href={`/${locale}/practice`}
            className="px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-lg hover:bg-primary/80 transition-colors"
          >
            Quay lại
          </Link>
        </div>
      ) : (
        <ExamFlow exercises={exercises} hskLevel={hskLevel} timeMinutes={timeMinutes} />
      )}
    </div>
  );
}
