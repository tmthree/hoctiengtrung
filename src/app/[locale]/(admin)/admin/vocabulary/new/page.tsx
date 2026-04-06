import { VocabularyForm } from "@/components/admin/vocabulary-form";
import { buttonVariants } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { ChevronLeft } from "lucide-react";

export default function NewVocabularyPage() {
  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3">
        <Link href="/admin/vocabulary" className={cn(buttonVariants({ variant: "ghost", size: "sm" }))}>
          <ChevronLeft className="h-4 w-4" />
          Quay lại
        </Link>
        <h1 className="text-2xl font-bold">Thêm từ vựng mới</h1>
      </div>
      <VocabularyForm mode="create" />
    </div>
  );
}
