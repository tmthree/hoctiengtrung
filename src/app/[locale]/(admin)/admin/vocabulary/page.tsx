import { getAllVocabularyAdmin } from "@/lib/queries/admin";
import { VocabularyPageClient } from "@/components/admin/vocabulary-page-client";

interface Props {
  searchParams: Promise<{ page?: string; search?: string; hskLevel?: string }>;
}

export default async function AdminVocabularyPage({ searchParams }: Props) {
  const params = await searchParams;
  const page = Number(params.page ?? 1);
  const search = params.search ?? "";
  const hskLevel = params.hskLevel ? Number(params.hskLevel) : undefined;

  const { vocabulary, total, totalPages } = await getAllVocabularyAdmin({ page, search, hskLevel });

  return (
    <VocabularyPageClient
      vocabulary={vocabulary}
      total={total}
      totalPages={totalPages}
      page={page}
      search={search}
      hskLevel={params.hskLevel ?? ""}
    />
  );
}
