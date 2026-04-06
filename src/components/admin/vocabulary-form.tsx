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
import { createVocabularySchema, type CreateVocabularyInput } from "@/lib/validators/admin";
import { createVocabulary, updateVocabulary } from "@/lib/actions/admin-vocabulary-actions";
import { hskLevels } from "@/lib/constants/hsk-levels";
import { useState } from "react";

interface VocabData {
  id?: string;
  simplified?: string;
  traditional?: string | null;
  pinyin?: string;
  meaning?: string;
  exampleSentence?: string | null;
  examplePinyin?: string | null;
  exampleMeaning?: string | null;
  hskLevel?: number;
  category?: string | null;
}

interface Props {
  mode: "create" | "edit";
  vocabulary?: VocabData;
}

export function VocabularyForm({ mode, vocabulary }: Props) {
  const router = useRouter();
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<CreateVocabularyInput>({
    resolver: zodResolver(createVocabularySchema),
    defaultValues: {
      simplified: vocabulary?.simplified ?? "",
      traditional: vocabulary?.traditional ?? "",
      pinyin: vocabulary?.pinyin ?? "",
      meaning: vocabulary?.meaning ?? "",
      exampleSentence: vocabulary?.exampleSentence ?? "",
      examplePinyin: vocabulary?.examplePinyin ?? "",
      exampleMeaning: vocabulary?.exampleMeaning ?? "",
      hskLevel: vocabulary?.hskLevel ?? 1,
      category: vocabulary?.category ?? "",
    },
  });

  async function onSubmit(data: CreateVocabularyInput) {
    setServerError("");
    const result =
      mode === "create"
        ? await createVocabulary(data)
        : await updateVocabulary(vocabulary!.id!, data);

    if (!result.success) {
      setServerError(result.error ?? "Đã xảy ra lỗi");
      return;
    }
    router.push("/admin/vocabulary");
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 max-w-2xl">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="simplified">Chữ giản thể *</Label>
          <Input id="simplified" {...register("simplified")} />
          {errors.simplified && <p className="text-xs text-destructive">{errors.simplified.message}</p>}
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="traditional">Chữ phồn thể</Label>
          <Input id="traditional" {...register("traditional")} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="pinyin">Pinyin *</Label>
          <Input id="pinyin" {...register("pinyin")} />
          {errors.pinyin && <p className="text-xs text-destructive">{errors.pinyin.message}</p>}
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="meaning">Nghĩa *</Label>
          <Input id="meaning" {...register("meaning")} />
          {errors.meaning && <p className="text-xs text-destructive">{errors.meaning.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label>HSK Cấp độ</Label>
          <Select defaultValue={String(vocabulary?.hskLevel ?? 1)} onValueChange={(v) => setValue("hskLevel", Number(v))}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              {hskLevels.map((h) => (
                <SelectItem key={h.level} value={String(h.level)}>{h.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="category">Danh mục</Label>
          <Input id="category" {...register("category")} placeholder="VD: đồ vật, động từ..." />
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="exampleSentence">Câu ví dụ</Label>
        <Input id="exampleSentence" {...register("exampleSentence")} />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="examplePinyin">Pinyin ví dụ</Label>
          <Input id="examplePinyin" {...register("examplePinyin")} />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="exampleMeaning">Nghĩa ví dụ</Label>
          <Input id="exampleMeaning" {...register("exampleMeaning")} />
        </div>
      </div>

      {serverError && <p className="text-sm text-destructive">{serverError}</p>}

      <div className="flex gap-3">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Đang lưu..." : "Lưu từ vựng"}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.push("/admin/vocabulary")}>
          Hủy
        </Button>
      </div>
    </form>
  );
}
