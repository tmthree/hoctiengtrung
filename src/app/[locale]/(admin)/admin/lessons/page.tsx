import { getAllLessonsAdmin } from "@/lib/queries/admin";
import { LessonTable } from "@/components/admin/lesson-table";
import { buttonVariants } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";

interface Props {
  searchParams: Promise<{ page?: string; search?: string; hskLevel?: string }>;
}

export default async function AdminLessonsPage({ searchParams }: Props) {
  const params = await searchParams;
  const page = Number(params.page ?? 1);
  const search = params.search ?? "";
  const hskLevel = params.hskLevel ? Number(params.hskLevel) : undefined;

  const { lessons, total, totalPages } = await getAllLessonsAdmin({ page, search, hskLevel });

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Quản lý bài học</h1>
        <Link href="/admin/lessons/new" className={cn(buttonVariants())}>
          <Plus className="h-4 w-4 mr-1" />
          Thêm bài học
        </Link>
      </div>

      <LessonTable
        lessons={lessons}
        total={total}
        totalPages={totalPages}
        page={page}
        search={search}
        hskLevel={params.hskLevel ?? ""}
      />
    </div>
  );
}
