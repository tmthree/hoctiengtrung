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
import { deleteLesson, toggleLessonPublish } from "@/lib/actions/admin-lesson-actions";
import { buttonVariants } from "@/components/ui/button";
import { hskLevels } from "@/lib/constants/hsk-levels";
import { cn } from "@/lib/utils";
import { Pencil, Trash2, Eye, EyeOff } from "lucide-react";
import { Link } from "@/i18n/navigation";

interface Lesson {
  id: string;
  title: string;
  hskLevel: number;
  type: string;
  isPublished: boolean;
  createdAt: Date;
  order: number;
}

interface Props {
  lessons: Lesson[];
  total: number;
  totalPages: number;
  page: number;
  search?: string;
  hskLevel?: string;
}

export function LessonTable({ lessons, total, totalPages, page, search = "", hskLevel = "" }: Props) {
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
    router.push(`/admin/lessons?${params.toString()}`);
  }

  function changePage(p: number) {
    const params = new URLSearchParams();
    if (searchVal) params.set("search", searchVal);
    if (hskVal && hskVal !== "all") params.set("hskLevel", hskVal);
    params.set("page", String(p));
    router.push(`/admin/lessons?${params.toString()}`);
  }

  function handleDelete(id: string) {
    startTransition(async () => {
      await deleteLesson(id);
      setDeleteId(null);
    });
  }

  function handleToggle(id: string) {
    startTransition(async () => { await toggleLessonPublish(id); });
  }

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex gap-2 flex-wrap">
        <Input
          placeholder="Tìm kiếm bài học..."
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

      <p className="text-sm text-muted-foreground">Tổng: {total} bài học</p>

      {/* Table */}
      <div className="rounded-md border overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-muted/50">
            <tr>
              <th className="text-left px-4 py-3 font-medium">Tiêu đề</th>
              <th className="text-left px-4 py-3 font-medium">HSK</th>
              <th className="text-left px-4 py-3 font-medium">Loại</th>
              <th className="text-left px-4 py-3 font-medium">Trạng thái</th>
              <th className="text-left px-4 py-3 font-medium">Ngày tạo</th>
              <th className="text-right px-4 py-3 font-medium">Thao tác</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {lessons.length === 0 && (
              <tr><td colSpan={6} className="text-center py-8 text-muted-foreground">Chưa có dữ liệu</td></tr>
            )}
            {lessons.map((lesson) => (
              <tr key={lesson.id} className="hover:bg-muted/30">
                <td className="px-4 py-3 font-medium">{lesson.title}</td>
                <td className="px-4 py-3">
                  <Badge variant="outline">HSK {lesson.hskLevel}</Badge>
                </td>
                <td className="px-4 py-3 text-muted-foreground">{lesson.type}</td>
                <td className="px-4 py-3">
                  <Badge variant={lesson.isPublished ? "default" : "secondary"}>
                    {lesson.isPublished ? "Đã xuất bản" : "Nháp"}
                  </Badge>
                </td>
                <td className="px-4 py-3 text-muted-foreground">
                  {new Date(lesson.createdAt).toLocaleDateString("vi-VN")}
                </td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-1">
                    <Button size="icon" variant="ghost" onClick={() => handleToggle(lesson.id)} title={lesson.isPublished ? "Gỡ xuất bản" : "Xuất bản"}>
                      {lesson.isPublished ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                    <Link href={`/admin/lessons/${lesson.id}/edit`} className={cn(buttonVariants({ size: "icon", variant: "ghost" }))}><Pencil className="h-4 w-4" /></Link>
                    <Button size="icon" variant="ghost" className="text-destructive" onClick={() => setDeleteId(lesson.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex gap-2 justify-center">
          <Button variant="outline" size="sm" disabled={page <= 1} onClick={() => changePage(page - 1)}>Trước</Button>
          <span className="flex items-center text-sm px-2">{page} / {totalPages}</span>
          <Button variant="outline" size="sm" disabled={page >= totalPages} onClick={() => changePage(page + 1)}>Sau</Button>
        </div>
      )}

      {/* Delete confirm dialog */}
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
