import { LessonForm } from "@/components/admin/lesson-form";
import { buttonVariants } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { ChevronLeft } from "lucide-react";

export default function NewLessonPage() {
  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3">
        <Link href="/admin/lessons" className={cn(buttonVariants({ variant: "ghost", size: "sm" }))}>
          <ChevronLeft className="h-4 w-4" />
          Quay lại
        </Link>
        <h1 className="text-2xl font-bold">Thêm bài học mới</h1>
      </div>
      <LessonForm mode="create" />
    </div>
  );
}
