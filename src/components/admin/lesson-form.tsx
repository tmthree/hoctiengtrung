"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createLessonSchema } from "@/lib/validators/admin";
import type { CreateLessonInput } from "@/lib/validators/admin";
import { createLesson, updateLesson } from "@/lib/actions/admin-lesson-actions";
import { hskLevels } from "@/lib/constants/hsk-levels";
import { useState } from "react";

// Form values type — matches Zod input (fields with defaults are optional here)
type LessonFormValues = {
  title: string;
  description: string;
  hskLevel: number;
  type: "GRAMMAR" | "CONVERSATION" | "READING" | "CULTURE" | "BUSINESS";
  content: string;
  order: number;
  isPublished: boolean;
};

interface LessonData {
  id?: string;
  title?: string;
  description?: string;
  hskLevel?: number;
  type?: string;
  content?: string;
  order?: number;
  isPublished?: boolean;
}

interface Props {
  mode: "create" | "edit";
  lesson?: LessonData;
}

const LESSON_TYPES = ["GRAMMAR", "CONVERSATION", "READING", "CULTURE", "BUSINESS"] as const;

export function LessonForm({ mode, lesson }: Props) {
  const router = useRouter();
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<LessonFormValues>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(createLessonSchema) as any,
    defaultValues: {
      title: lesson?.title ?? "",
      description: lesson?.description ?? "",
      hskLevel: lesson?.hskLevel ?? 1,
      type: (lesson?.type as LessonFormValues["type"]) ?? "GRAMMAR",
      content: typeof lesson?.content === "string"
        ? lesson.content
        : JSON.stringify(lesson?.content ?? [], null, 2),
      order: lesson?.order ?? 0,
      isPublished: lesson?.isPublished ?? false,
    },
  });

  const isPublished = watch("isPublished") ?? false;

  async function onSubmit(data: LessonFormValues) {
    setServerError("");
    const result =
      mode === "create"
        ? await createLesson(data as CreateLessonInput)
        : await updateLesson(lesson!.id!, data as CreateLessonInput);

    if (!result.success) {
      setServerError(result.error ?? "Đã xảy ra lỗi");
      return;
    }
    router.push("/admin/lessons");
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 max-w-2xl">
      <div className="space-y-1.5">
        <Label htmlFor="title">Tiêu đề</Label>
        <Input id="title" {...register("title")} />
        {errors.title && <p className="text-xs text-destructive">{errors.title.message}</p>}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="description">Mô tả</Label>
        <textarea id="description" {...register("description")} rows={3}
          className="w-full rounded-md border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
        {errors.description && <p className="text-xs text-destructive">{errors.description.message}</p>}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label>HSK Cấp độ</Label>
          <Select defaultValue={String(lesson?.hskLevel ?? 1)} onValueChange={(v) => setValue("hskLevel", Number(v))}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              {hskLevels.map((h) => (
                <SelectItem key={h.level} value={String(h.level)}>{h.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1.5">
          <Label>Loại bài</Label>
          <Select defaultValue={lesson?.type ?? "GRAMMAR"} onValueChange={(v) => setValue("type", v as LessonFormValues["type"])}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              {LESSON_TYPES.map((t) => (
                <SelectItem key={t} value={t}>{t}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="content">Nội dung (JSON)</Label>
        <textarea id="content" {...register("content")} rows={6}
          className="w-full rounded-md border bg-background px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-ring" />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="order">Thứ tự</Label>
        <Input id="order" type="number" {...register("order", { valueAsNumber: true })} className="w-32" />
      </div>

      <div className="flex items-center gap-2">
        <input type="checkbox" id="isPublished" checked={isPublished}
          onChange={(e) => setValue("isPublished", e.target.checked)} className="h-4 w-4 rounded" />
        <Label htmlFor="isPublished">Xuất bản ngay</Label>
      </div>

      {serverError && <p className="text-sm text-destructive">{serverError}</p>}

      <div className="flex gap-3">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Đang lưu..." : "Lưu bài học"}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.push("/admin/lessons")}>
          Hủy
        </Button>
      </div>
    </form>
  );
}
