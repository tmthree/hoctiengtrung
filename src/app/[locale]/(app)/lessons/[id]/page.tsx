// Lesson detail page — Server Component
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, BookOpen } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { LessonContentRenderer } from "@/components/lessons/lesson-content-renderer";
import { getLessonById } from "@/lib/queries/lessons";
import { getHskLevel } from "@/lib/constants/hsk-levels";
import type { LessonContentBlock } from "@/types/lesson";

interface LessonDetailPageProps {
  params: Promise<{ locale: string; id: string }>;
}

const lessonTypeLabels: Record<string, string> = {
  GRAMMAR: "Ngữ pháp",
  CONVERSATION: "Hội thoại",
  READING: "Đọc hiểu",
  CULTURE: "Văn hoá",
  BUSINESS: "Thương mại",
};

export default async function LessonDetailPage({ params }: LessonDetailPageProps) {
  const { locale, id } = await params;
  const lesson = await getLessonById(id);

  if (!lesson) notFound();

  const hsk = getHskLevel(lesson.hskLevel);
  const content = lesson.content as unknown as LessonContentBlock[];

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Back button */}
      <Link
        href={`/${locale}/lessons`}
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground -ml-2 px-2 py-1 rounded transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Quay lại bài học
      </Link>

      {/* Header */}
      <div className="space-y-2">
        <div className="flex flex-wrap gap-2">
          <Badge
            variant="secondary"
            className={`${hsk.bgColor} ${hsk.color} border ${hsk.borderColor}`}
          >
            {hsk.label} · {hsk.labelVi}
          </Badge>
          <Badge variant="secondary">
            <BookOpen className="h-3 w-3 mr-1" />
            {lessonTypeLabels[lesson.type] ?? lesson.type}
          </Badge>
        </div>
        <h1 className="text-2xl font-bold text-foreground">{lesson.title}</h1>
        <p className="text-muted-foreground">{lesson.description}</p>
      </div>

      {/* Lesson content */}
      <LessonContentRenderer content={content} />

      {/* Vocabulary table */}
      {lesson.vocabulary.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-lg font-semibold">Từ vựng trong bài</h2>
          <div className="rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-chinese">Chữ Hán</TableHead>
                  <TableHead>Pinyin</TableHead>
                  <TableHead>Nghĩa</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {lesson.vocabulary.map(({ vocabulary: v }) => (
                  <TableRow key={v.id}>
                    <TableCell
                      className="text-lg font-normal font-chinese"
                    >
                      {v.simplified}
                    </TableCell>
                    <TableCell className="text-muted-foreground">{v.pinyin}</TableCell>
                    <TableCell>{v.meaning}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      )}

      {/* Practice link */}
      {lesson.exercises.length > 0 && (
        <div className="pt-2">
          <Link
            href={`/${locale}/practice/quiz/${lesson.id}`}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/80 transition-colors"
          >
            Làm bài tập ({lesson.exercises.length} câu)
          </Link>
        </div>
      )}
    </div>
  );
}
