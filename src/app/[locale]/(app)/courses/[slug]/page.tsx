// Course detail page — Server Component with lesson list, price card, and buy button
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { Lock, PlayCircle, Users } from "lucide-react";
import { auth } from "@/lib/auth";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { BuyCourseButton } from "@/components/courses/buy-course-button";
import { PaymentBanner } from "@/components/courses/payment-banner";
import { getCourseBySlug, getCourseById } from "@/lib/queries/courses";
import { getHskLevel } from "@/lib/constants/hsk-levels";
import { formatVND } from "@/lib/format-currency";
import { db } from "@/lib/db";

interface CourseDetailPageProps {
  params: Promise<{ locale: string; slug: string }>;
  searchParams: Promise<{ payment?: string }>;
}

export default async function CourseDetailPage({ params, searchParams }: CourseDetailPageProps) {
  const { slug } = await params;
  const sp = await searchParams;
  const paymentStatus = sp.payment; // "success" | "cancelled" | undefined

  // Try slug first, fall back to ID lookup
  let course = await getCourseBySlug(slug);
  if (!course) course = await getCourseById(slug);
  if (!course) notFound();

  const hsk = getHskLevel(course.level);

  // Parallel: session fetch
  const session = await auth.api.getSession({ headers: await headers() });

  let enrolled = false;
  if (session?.user?.id) {
    const enrollment = await db.enrollment.findUnique({
      where: { userId_courseId: { userId: session.user.id, courseId: course.id } },
      select: { status: true },
    });
    enrolled = enrollment?.status === "ACTIVE";
  }

  const priceDisplay = course.price === 0 ? "Miễn phí" : formatVND(course.price);

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Payment result banner */}
      {paymentStatus && <PaymentBanner status={paymentStatus} />}

      {/* Header */}
      <div>
        <Badge
          variant="secondary"
          className={`${hsk.bgColor} ${hsk.color} border ${hsk.borderColor} text-xs font-semibold mb-3`}
        >
          {hsk.label}
        </Badge>
        <h1 className="text-2xl font-bold text-foreground mb-1">{course.title}</h1>
        <p className="text-sm text-muted-foreground mb-3">
          bởi <span className="font-medium text-foreground">{course.instructor.name}</span>
        </p>
        <p className="text-muted-foreground">{course.description}</p>
      </div>

      {/* Two-column layout */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Lesson list — takes 2/3 width */}
        <div className="lg:col-span-2">
          <h2 className="text-lg font-semibold mb-3">
            Nội dung khóa học
            <span className="ml-2 text-sm font-normal text-muted-foreground">
              ({course.lessons.length} bài)
            </span>
          </h2>
          <Card>
            <CardContent className="p-0">
              <ul className="divide-y">
                {course.lessons.map((lesson, idx) => (
                  <li key={lesson.id} className="flex items-center gap-3 px-4 py-3">
                    <span className="text-sm text-muted-foreground w-6 shrink-0">
                      {idx + 1}
                    </span>
                    {lesson.isFree || enrolled ? (
                      <PlayCircle className="h-4 w-4 text-green-500 shrink-0" />
                    ) : (
                      <Lock className="h-4 w-4 text-muted-foreground shrink-0" />
                    )}
                    <span className="text-sm flex-1">{lesson.title}</span>
                    {lesson.isFree && !enrolled && (
                      <Badge variant="outline" className="text-xs text-green-600 border-green-300">
                        Miễn phí
                      </Badge>
                    )}
                  </li>
                ))}
                {course.lessons.length === 0 && (
                  <li className="px-4 py-6 text-center text-sm text-muted-foreground">
                    Chưa có bài học nào
                  </li>
                )}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Price card — takes 1/3 width */}
        <div className="lg:col-span-1">
          <Card className="sticky top-4">
            <CardHeader className="pb-2">
              <div className="text-3xl font-bold text-foreground">
                {priceDisplay}
              </div>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Users className="h-4 w-4" />
                {course._count.enrollments.toLocaleString("vi-VN")} học viên đã đăng ký
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <BuyCourseButton
                courseId={course.id}
                price={course.price}
                currency={course.currency}
                enrolled={enrolled}
              />
              <ul className="text-xs text-muted-foreground space-y-1">
                <li>✓ Truy cập trọn đời</li>
                <li>✓ {course.lessons.length} bài học</li>
                <li>✓ Chứng chỉ hoàn thành</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
