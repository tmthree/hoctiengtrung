// Courses list page — Server Component with level filter, search, and enrollment badges
import { headers } from "next/headers";
import { BookOpen } from "lucide-react";
import { auth } from "@/lib/auth";
import { HskLevelFilter } from "@/components/shared/hsk-level-filter";
import { SearchInput } from "@/components/shared/search-input";
import { Pagination } from "@/components/shared/pagination";
import { EmptyState } from "@/components/shared/empty-state";
import { CourseCard } from "@/components/courses/course-card";
import { getCourses } from "@/lib/queries/courses";
import { db } from "@/lib/db";

interface CoursesPageProps {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ [key: string]: string | undefined }>;
}

export default async function CoursesPage({ searchParams }: CoursesPageProps) {
  const sp = await searchParams;

  const level = sp.hskLevel ? parseInt(sp.hskLevel) : undefined;
  const search = sp.search;
  const page = sp.page ? parseInt(sp.page) : 1;

  // Parallel: auth + courses query
  const [session, coursesData] = await Promise.all([
    auth.api.getSession({ headers: await headers() }),
    getCourses({ level, search, page }),
  ]);

  // Fetch enrolled course IDs for the current user
  let enrolledCourseIds = new Set<string>();
  if (session?.user?.id) {
    const enrollments = await db.enrollment.findMany({
      where: { userId: session.user.id, status: "ACTIVE" },
      select: { courseId: true },
    });
    enrolledCourseIds = new Set(enrollments.map((e) => e.courseId));
  }

  const { courses, totalPages } = coursesData;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-foreground">Khóa học</h1>

      {/* Filters */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <HskLevelFilter />
        <div className="sm:ml-auto sm:w-64">
          <SearchInput placeholder="Tìm kiếm khóa học..." />
        </div>
      </div>

      {/* Course grid */}
      {courses.length === 0 ? (
        <EmptyState
          icon={BookOpen}
          title="Không có khóa học nào"
          description="Chưa có khóa học nào cho bộ lọc này"
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              enrolled={enrolledCourseIds.has(course.id)}
            />
          ))}
        </div>
      )}

      <Pagination currentPage={page} totalPages={totalPages} />
    </div>
  );
}
