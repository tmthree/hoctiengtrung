import { Suspense } from "react";
import { AdminStats } from "@/components/admin/admin-stats";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { BookOpen, BookMarked, Users } from "lucide-react";
import { cn } from "@/lib/utils";

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Tổng quan</h1>
        <p className="mt-1 text-muted-foreground">Quản trị hệ thống Học Tiếng Trung</p>
      </div>

      <Suspense fallback={<div className="h-32 animate-pulse rounded-md bg-muted" />}>
        <AdminStats />
      </Suspense>

      <div>
        <h2 className="text-lg font-semibold mb-3">Thao tác nhanh</h2>
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-base">
                <BookOpen className="h-5 w-5 text-green-600" />
                Bài học
              </CardTitle>
            </CardHeader>
            <CardContent className="flex gap-2">
              <Link href="/admin/lessons" className={cn(buttonVariants({ size: "sm" }))}>Quản lý</Link>
              <Link href="/admin/lessons/new" className={cn(buttonVariants({ variant: "outline", size: "sm" }))}>Thêm mới</Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-base">
                <BookMarked className="h-5 w-5 text-purple-600" />
                Từ vựng
              </CardTitle>
            </CardHeader>
            <CardContent className="flex gap-2">
              <Link href="/admin/vocabulary" className={cn(buttonVariants({ size: "sm" }))}>Quản lý</Link>
              <Link href="/admin/vocabulary/new" className={cn(buttonVariants({ variant: "outline", size: "sm" }))}>Thêm mới</Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-base">
                <Users className="h-5 w-5 text-blue-600" />
                Người dùng
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Link href="/admin/users" className={cn(buttonVariants({ size: "sm" }))}>Quản lý</Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
