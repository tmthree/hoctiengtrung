"use client";
// Client Component — editable profile form with name and avatar display
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { updateProfileSchema, type UpdateProfileInput } from "@/lib/validators/profile";
import { updateProfile } from "@/lib/actions/profile-actions";

interface ProfileFormProps {
  initialName: string;
  email: string;
  image?: string | null;
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((part) => part[0] ?? "")
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export function ProfileForm({ initialName, email, image }: ProfileFormProps) {
  const [saved, setSaved] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<UpdateProfileInput>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: { name: initialName },
  });

  const currentName = watch("name") || initialName;

  async function onSubmit(data: UpdateProfileInput) {
    setServerError(null);
    setSaved(false);
    const result = await updateProfile(data);
    if (result.success) {
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } else {
      setServerError(result.error ?? "Lỗi không xác định");
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Chỉnh sửa hồ sơ</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              {image && <AvatarImage src={image} alt={currentName} />}
              <AvatarFallback className="text-lg">{getInitials(currentName)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold text-foreground">{currentName}</p>
              <p className="text-sm text-muted-foreground">{email}</p>
            </div>
          </div>

          <div className="space-y-1">
            <Label htmlFor="name">Họ tên</Label>
            <Input id="name" {...register("name")} placeholder="Nhập họ tên" />
            {errors.name && (
              <p className="text-xs text-destructive">{errors.name.message}</p>
            )}
          </div>

          {serverError && <p className="text-xs text-destructive">{serverError}</p>}

          <Button type="submit" disabled={isSubmitting} size="sm">
            {isSubmitting ? "Đang lưu..." : saved ? "Đã lưu!" : "Lưu thay đổi"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
