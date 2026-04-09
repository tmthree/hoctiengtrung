"use client";
// Course creation/edit form for instructors — handles slug auto-gen and Zod validation
import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useRouter } from "@/i18n/navigation";
import { createCourseSchema, type CreateCourseInput } from "@/lib/validators/course";
import { createCourse } from "@/lib/actions/instructor-actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

interface CourseFormProps {
  defaultValues?: Partial<CreateCourseInput>;
  courseId?: string;
}

export function CourseForm({ defaultValues }: CourseFormProps) {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  type FormValues = {
    title: string;
    slug: string;
    description: string;
    language: "CHINESE" | "ENGLISH";
    level: number;
    price: number;
    currency: string;
    thumbnail: string;
  };

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      language: "CHINESE",
      level: 1,
      price: 0,
      currency: "VND",
      thumbnail: "",
      ...defaultValues,
    },
  });

  // Auto-generate slug from title
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue("title", e.target.value);
    setValue("slug", slugify(e.target.value));
  };

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    // Validate through Zod before sending
    const parsed = createCourseSchema.safeParse(data);
    if (!parsed.success) {
      setServerError(parsed.error.issues[0]?.message ?? "Dữ liệu không hợp lệ");
      return;
    }
    setIsSubmitting(true);
    setServerError(null);
    try {
      const result = await createCourse(parsed.data);
      if (!result.success) {
        setServerError(result.error ?? "Đã xảy ra lỗi");
      } else {
        router.push("/instructor");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 max-w-xl">
      {/* Title */}
      <div className="space-y-1.5">
        <Label htmlFor="title">Tiêu đề *</Label>
        <Input
          id="title"
          {...register("title")}
          onChange={handleTitleChange}
          placeholder="Ví dụ: HSK 3 Nâng cao"
        />
        {errors.title && <p className="text-sm text-destructive">{errors.title.message}</p>}
      </div>

      {/* Slug */}
      <div className="space-y-1.5">
        <Label htmlFor="slug">Slug *</Label>
        <Input id="slug" {...register("slug")} placeholder="hsk-3-nang-cao" />
        {errors.slug && <p className="text-sm text-destructive">{errors.slug.message}</p>}
      </div>

      {/* Description */}
      <div className="space-y-1.5">
        <Label htmlFor="description">Mô tả *</Label>
        <textarea
          id="description"
          {...register("description")}
          placeholder="Mô tả ngắn gọn về khóa học"
          rows={3}
          className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        />
        {errors.description && <p className="text-sm text-destructive">{errors.description.message}</p>}
      </div>

      {/* Language + Level */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label>Ngôn ngữ *</Label>
          <Select
            defaultValue={defaultValues?.language ?? "CHINESE"}
            onValueChange={(v) => setValue("language", v as "CHINESE" | "ENGLISH")}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="CHINESE">Tiếng Trung</SelectItem>
              <SelectItem value="ENGLISH">Tiếng Anh</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="level">Cấp độ (1-9) *</Label>
          <Input
            id="level"
            type="number"
            min={1}
            max={9}
            {...register("level", { valueAsNumber: true })}
          />
          {errors.level && <p className="text-sm text-destructive">{errors.level.message}</p>}
        </div>
      </div>

      {/* Price */}
      <div className="space-y-1.5">
        <Label htmlFor="price">Giá (VND) *</Label>
        <Input
          id="price"
          type="number"
          min={0}
          {...register("price", { valueAsNumber: true })}
          placeholder="0 = miễn phí"
        />
        {errors.price && <p className="text-sm text-destructive">{errors.price.message}</p>}
      </div>

      {/* Thumbnail */}
      <div className="space-y-1.5">
        <Label htmlFor="thumbnail">URL ảnh đại diện</Label>
        <Input
          id="thumbnail"
          {...register("thumbnail")}
          placeholder="https://example.com/image.jpg"
        />
        {errors.thumbnail && <p className="text-sm text-destructive">{errors.thumbnail.message}</p>}
      </div>

      {serverError && (
        <p className="text-sm text-destructive bg-destructive/10 rounded-md p-3">{serverError}</p>
      )}

      <div className="flex gap-3">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Đang lưu..." : "Tạo khóa học"}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.push("/instructor")}>
          Hủy
        </Button>
      </div>
    </form>
  );
}
