"use client";
import { useState } from "react";
import { VocabularyTable } from "@/components/admin/vocabulary-table";
import { VocabularyBulkImport } from "@/components/admin/vocabulary-bulk-import";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link } from "@/i18n/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Plus, Upload } from "lucide-react";

interface Vocab {
  id: string;
  simplified: string;
  pinyin: string;
  meaning: string;
  hskLevel: number;
  category: string | null;
}

interface Props {
  vocabulary: Vocab[];
  total: number;
  totalPages: number;
  page: number;
  search?: string;
  hskLevel?: string;
}

export function VocabularyPageClient(props: Props) {
  const [showImport, setShowImport] = useState(false);

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <h1 className="text-2xl font-bold">Quản lý từ vựng</h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setShowImport(true)}>
            <Upload className="h-4 w-4 mr-1" />
            Nhập CSV
          </Button>
          <Link href="/admin/vocabulary/new" className={cn(buttonVariants())}>
            <Plus className="h-4 w-4 mr-1" />
            Thêm từ
          </Link>
        </div>
      </div>

      <VocabularyTable {...props} />

      <Dialog open={showImport} onOpenChange={setShowImport}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Nhập từ vựng từ CSV</DialogTitle>
          </DialogHeader>
          <VocabularyBulkImport onClose={() => setShowImport(false)} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
