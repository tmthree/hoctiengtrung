// New course creation page — role-gated to INSTRUCTOR and ADMIN only
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { redirect } from "@/i18n/navigation";
import { CourseForm } from "@/components/instructor/course-form";

interface NewCoursePageProps {
  params: Promise<{ locale: string }>;
}

export default async function NewCoursePage({ params }: NewCoursePageProps) {
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

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Tạo khóa học mới</h1>
        <p className="text-muted-foreground">Điền thông tin để tạo khóa học của bạn</p>
      </div>
      <CourseForm />
    </div>
  );
}
