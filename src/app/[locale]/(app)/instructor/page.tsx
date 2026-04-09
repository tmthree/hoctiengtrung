// Instructor dashboard — only accessible by INSTRUCTOR or ADMIN roles
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { redirect } from "@/i18n/navigation";
import { Link } from "@/i18n/navigation";
import { getInstructorStats, getInstructorCourses } from "@/lib/actions/instructor-actions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PlusCircle, BookOpen, Users, CircleDollarSign } from "lucide-react";

interface InstructorPageProps {
  params: Promise<{ locale: string }>;
}

function formatVND(amount: number): string {
  return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(amount);
}

export default async function InstructorPage({ params }: InstructorPageProps) {
  const { locale } = await params;
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    redirect({ href: "/login", locale });
    return null;
  }

  const role = (session.user as { role?: string }).role;
  if (role !== "INSTRUCTOR" && role !== "ADMIN") {
    redirect({ href: "/dashboard", locale });
    return null;
  }

  const [statsResult, coursesResult] = await Promise.all([
    getInstructorStats(),
    getInstructorCourses(),
  ]);

  const stats = statsResult.success ? statsResult.data : { courseCount: 0, totalEnrollments: 0, totalRevenue: 0 };
  const courses = coursesResult.success ? coursesResult.data ?? [] : [];

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Quản lý khóa học</h1>
          <p className="text-muted-foreground">Tổng quan hoạt động giảng dạy của bạn</p>
        </div>
        <Link href="/instructor/courses/new">
          <Button>
            <PlusCircle className="h-4 w-4 mr-2" />
            Tạo khóa học mới
          </Button>
        </Link>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Khóa học</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stats?.courseCount ?? 0}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Học viên</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stats?.totalEnrollments ?? 0}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Doanh thu (₫)</CardTitle>
            <CircleDollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{formatVND(stats?.totalRevenue ?? 0)}</p>
          </CardContent>
        </Card>
      </div>

      {/* Course list */}
      <div className="space-y-3">
        <h2 className="text-lg font-semibold">Danh sách khóa học</h2>
        {courses.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center text-muted-foreground">
              Bạn chưa có khóa học nào.{" "}
              <Link href="/instructor/courses/new" className="text-primary hover:underline">
                Tạo khóa học đầu tiên
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-3">
            {courses.map((course) => (
              <Card key={course.id}>
                <CardContent className="flex items-center gap-4 py-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-semibold truncate">{course.title}</p>
                      <Badge variant={course.isPublished ? "default" : "secondary"}>
                        {course.isPublished ? "Đã xuất bản" : "Nháp"}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-0.5">
                      Cấp độ {course.level} · {course._count.enrollments} học viên
                    </p>
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <Link href={`/courses/${course.slug}`}>
                      <Button variant="outline" size="sm">Xem</Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
