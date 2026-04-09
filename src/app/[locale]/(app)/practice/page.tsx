// Practice hub page — entry point for flashcards, quizzes, and exam simulation
import Link from "next/link";
import { BrainCircuit, BookOpen, Layers, Timer } from "lucide-react";
import { getLessons } from "@/lib/queries/lessons";

interface PracticePageProps {
  params: Promise<{ locale: string }>;
}

export default async function PracticePage({ params }: PracticePageProps) {
  const { locale } = await params;
  const { lessons } = await getLessons({ limit: 10 });

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Luyện tập</h1>
        <p className="text-muted-foreground mt-1">Ôn từ vựng và làm bài tập theo bài học</p>
      </div>

      {/* Flashcards section */}
      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <Layers className="w-5 h-5 text-primary" />
          Ôn tập từ vựng
        </h2>
        <div className="rounded-2xl border bg-card shadow-sm p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
            <BrainCircuit className="w-6 h-6 text-primary" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-foreground">Flashcard thông minh</h3>
            <p className="text-sm text-muted-foreground mt-0.5">
              Hệ thống lặp lại ngắt quãng SM-2 — ôn đúng lúc, nhớ lâu hơn
            </p>
          </div>
          <Link
            href={`/${locale}/practice/flashcards`}
            className="flex-shrink-0 px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-lg hover:bg-primary/80 transition-colors"
          >
            Bắt đầu ôn
          </Link>
        </div>
      </section>

      {/* Quizzes section */}
      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-primary" />
          Bài kiểm tra theo bài học
        </h2>

        {lessons.length === 0 ? (
          <div className="rounded-2xl border bg-card p-6 text-center text-muted-foreground text-sm">
            Chưa có bài học nào. Hãy quay lại sau.
          </div>
        ) : (
          <div className="rounded-2xl border bg-card shadow-sm overflow-hidden divide-y divide-border">
            {lessons.map((lesson) => (
              <div key={lesson.id} className="flex items-center gap-4 px-6 py-4">
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-foreground truncate">{lesson.title}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">HSK {lesson.hskLevel}</p>
                </div>
                <Link
                  href={`/${locale}/practice/quiz/${lesson.id}`}
                  className="flex-shrink-0 px-3 py-1.5 border border-primary text-primary text-sm font-medium rounded-lg hover:bg-primary/5 transition-colors"
                >
                  Làm bài tập
                </Link>
              </div>
            ))}
          </div>
        )}
      </section>
      {/* Exam simulation section */}
      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <Timer className="w-5 h-5 text-primary" />
          Thi thử HSK
        </h2>
        <p className="text-sm text-muted-foreground">
          Mô phỏng bài thi HSK thật với giới hạn thời gian. Chọn cấp độ để bắt đầu.
        </p>
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((level) => (
            <Link
              key={level}
              href={`/${locale}/practice/exam/${level}`}
              className="flex flex-col items-center gap-1 rounded-xl border bg-card p-4 hover:border-primary hover:bg-primary/5 transition-colors text-center"
            >
              <span className="text-lg font-bold text-foreground">HSK {level}</span>
              <span className="text-xs text-muted-foreground">
                {level <= 3 ? "Sơ cấp" : level <= 6 ? "Trung cấp" : "Cao cấp"}
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
