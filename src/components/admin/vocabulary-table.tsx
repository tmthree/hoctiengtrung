"use client";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { deleteVocabulary } from "@/lib/actions/admin-vocabulary-actions";
import { buttonVariants } from "@/components/ui/button";
import { hskLevels } from "@/lib/constants/hsk-levels";
import { cn } from "@/lib/utils";
import { Pencil, Trash2 } from "lucide-react";
import { Link } from "@/i18n/navigation";

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

export function VocabularyTable({ vocabulary, total, totalPages, page, search = "", hskLevel = "" }: Props) {
  const router = useRouter();
  const [, startTransition] = useTransition();
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [searchVal, setSearchVal] = useState(search);
  const [hskVal, setHskVal] = useState(hskLevel);

  function applyFilter(newSearch?: string, newHsk?: string) {
    const params = new URLSearchParams();
    const s = newSearch ?? searchVal;
    const h = newHsk ?? hskVal;
    if (s) params.set("search", s);
    if (h && h !== "all") params.set("hskLevel", h);
    params.set("page", "1");
    router.push(`/admin/vocabulary?${params.toString()}`);
  }

  function changePage(p: number) {
    const params = new URLSearchParams();
    if (searchVal) params.set("search", searchVal);
    if (hskVal && hskVal !== "all") params.set("hskLevel", hskVal);
    params.set("page", String(p));
    router.push(`/admin/vocabulary?${params.toString()}`);
  }

  function handleDelete(id: string) {
    startTransition(async () => {
      await deleteVocabulary(id);
      setDeleteId(null);
    });
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-2 flex-wrap">
        <Input
          placeholder="Tìm kiếm từ vựng..."
          value={searchVal}
          onChange={(e) => setSearchVal(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && applyFilter()}
          className="max-w-xs"
        />
        <Select value={hskVal || "all"} onValueChange={(v) => { const val = v ?? ""; setHskVal(val); applyFilter(undefined, val); }}>
          <SelectTrigger className="w-36">
            <SelectValue placeholder="HSK cấp" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tất cả</SelectItem>
            {hskLevels.map((h) => (
              <SelectItem key={h.level} value={String(h.level)}>{h.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button variant="outline" onClick={() => applyFilter()}>Tìm</Button>
      </div>

      <p className="text-sm text-muted-foreground">Tổng: {total} từ vựng</p>

      <div className="rounded-md border overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-muted/50">
            <tr>
              <th className="text-left px-4 py-3 font-medium">Chữ Hán</th>
              <th className="text-left px-4 py-3 font-medium">Pinyin</th>
              <th className="text-left px-4 py-3 font-medium">Nghĩa</th>
              <th className="text-left px-4 py-3 font-medium">HSK</th>
              <th className="text-left px-4 py-3 font-medium">Danh mục</th>
              <th className="text-right px-4 py-3 font-medium">Thao tác</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {vocabulary.length === 0 && (
              <tr><td colSpan={6} className="text-center py-8 text-muted-foreground">Chưa có dữ liệu</td></tr>
            )}
            {vocabulary.map((word) => (
              <tr key={word.id} className="hover:bg-muted/30">
                <td className="px-4 py-3 text-lg font-chinese">{word.simplified}</td>
                <td className="px-4 py-3 text-muted-foreground">{word.pinyin}</td>
                <td className="px-4 py-3">{word.meaning}</td>
                <td className="px-4 py-3">
                  <Badge variant="outline">HSK {word.hskLevel}</Badge>
                </td>
                <td className="px-4 py-3 text-muted-foreground">{word.category ?? "—"}</td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-1">
                    <Link href={`/admin/vocabulary/${word.id}/edit`} className={cn(buttonVariants({ size: "icon", variant: "ghost" }))}><Pencil className="h-4 w-4" /></Link>
                    <Button size="icon" variant="ghost" className="text-destructive" onClick={() => setDeleteId(word.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex gap-2 justify-center">
          <Button variant="outline" size="sm" disabled={page <= 1} onClick={() => changePage(page - 1)}>Trước</Button>
          <span className="flex items-center text-sm px-2">{page} / {totalPages}</span>
          <Button variant="outline" size="sm" disabled={page >= totalPages} onClick={() => changePage(page + 1)}>Sau</Button>
        </div>
      )}

      <Dialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Bạn có chắc muốn xóa?</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">Hành động này không thể hoàn tác.</p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteId(null)}>Hủy</Button>
            <Button variant="destructive" onClick={() => deleteId && handleDelete(deleteId)}>Xóa</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
