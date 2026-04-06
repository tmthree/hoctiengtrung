import { getVocabularyForEdit } from "@/lib/queries/admin";
import { VocabularyForm } from "@/components/admin/vocabulary-form";
import { buttonVariants } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { ChevronLeft } from "lucide-react";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditVocabularyPage({ params }: Props) {
  const { id } = await params;
  const vocab = await getVocabularyForEdit(id);
  if (!vocab) notFound();

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3">
        <Link href="/admin/vocabulary" className={cn(buttonVariants({ variant: "ghost", size: "sm" }))}>
          <ChevronLeft className="h-4 w-4" />
          Quay lại
        </Link>
        <h1 className="text-2xl font-bold">Sửa từ vựng</h1>
      </div>
      <VocabularyForm
        mode="edit"
        vocabulary={{
          id: vocab.id,
          simplified: vocab.simplified,
          traditional: vocab.traditional,
          pinyin: vocab.pinyin,
          meaning: vocab.meaning,
          exampleSentence: vocab.exampleSentence,
          examplePinyin: vocab.examplePinyin,
          exampleMeaning: vocab.exampleMeaning,
          hskLevel: vocab.hskLevel,
          category: vocab.category,
        }}
      />
    </div>
  );
}
