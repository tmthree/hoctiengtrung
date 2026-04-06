import { getLessonForEdit } from "@/lib/queries/admin";
import { LessonForm } from "@/components/admin/lesson-form";
import { buttonVariants } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { ChevronLeft } from "lucide-react";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditLessonPage({ params }: Props) {
  const { id } = await params;
  const lesson = await getLessonForEdit(id);
  if (!lesson) notFound();

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3">
        <Link href="/admin/lessons" className={cn(buttonVariants({ variant: "ghost", size: "sm" }))}>
          <ChevronLeft className="h-4 w-4" />
          Quay lại
        </Link>
        <h1 className="text-2xl font-bold">Sửa bài học</h1>
      </div>
      <LessonForm
        mode="edit"
        lesson={{
          id: lesson.id,
          title: lesson.title,
          description: lesson.description,
          hskLevel: lesson.hskLevel,
          type: lesson.type,
          content: JSON.stringify(lesson.content, null, 2),
          order: lesson.order,
          isPublished: lesson.isPublished,
        }}
      />
    </div>
  );
}
