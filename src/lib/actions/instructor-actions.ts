"use server";
// Server actions for instructor-specific operations (course management, stats)
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { requireRole } from "@/lib/rbac";
import { createCourseSchema, type CreateCourseInput } from "@/lib/validators/course";

/** Validate session and ensure user is INSTRUCTOR or ADMIN */
async function getInstructorSession() {
  const session = await auth.api.getSession({ headers: await headers() });
  const sessionLike = session
    ? { user: { id: session.user.id, role: (session.user as { role?: string }).role as import("@prisma/client").Role } }
    : null;
  requireRole(sessionLike, "INSTRUCTOR", "ADMIN");
  return session!;
}

/** Create a new course owned by the current instructor */
export async function createCourse(data: CreateCourseInput) {
  try {
    const session = await getInstructorSession();
    const parsed = createCourseSchema.safeParse(data);
    if (!parsed.success) {
      return { success: false, error: parsed.error.issues[0]?.message ?? "Dữ liệu không hợp lệ" };
    }

    const { thumbnail, ...rest } = parsed.data;
    const course = await db.course.create({
      data: {
        ...rest,
        thumbnail: thumbnail || null,
        instructorId: session.user.id,
      },
    });

    return { success: true, data: course };
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Không thể tạo khóa học";
    return { success: false, error: msg };
  }
}

/** Update a course — instructor must own it (ADMIN can update any) */
export async function updateCourse(id: string, data: Partial<CreateCourseInput>) {
  try {
    const session = await getInstructorSession();
    const role = (session.user as { role?: string }).role;

    const existing = await db.course.findUnique({ where: { id }, select: { instructorId: true } });
    if (!existing) return { success: false, error: "Không tìm thấy khóa học" };
    if (role !== "ADMIN" && existing.instructorId !== session.user.id) {
      return { success: false, error: "Bạn không có quyền chỉnh sửa khóa học này" };
    }

    const { thumbnail, ...rest } = data;
    const course = await db.course.update({
      where: { id },
      data: {
        ...rest,
        ...(thumbnail !== undefined ? { thumbnail: thumbnail || null } : {}),
      },
    });

    return { success: true, data: course };
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Không thể cập nhật khóa học";
    return { success: false, error: msg };
  }
}

/** Return aggregate stats for the current instructor */
export async function getInstructorStats() {
  try {
    const session = await getInstructorSession();
    const userId = session.user.id;

    const courses = await db.course.findMany({
      where: { instructorId: userId },
      select: {
        id: true,
        price: true,
        _count: { select: { enrollments: true } },
      },
    });

    const courseCount = courses.length;
    const totalEnrollments = courses.reduce((sum, c) => sum + c._count.enrollments, 0);

    // Revenue = sum of PAID orders for instructor courses
    const revenueResult = await db.order.aggregate({
      where: { courseId: { in: courses.map((c) => c.id) }, status: "PAID" },
      _sum: { amount: true },
    });
    const totalRevenue = revenueResult._sum.amount ?? 0;

    return { success: true, data: { courseCount, totalEnrollments, totalRevenue } };
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Không thể tải thống kê";
    return { success: false, error: msg };
  }
}

/** Return courses owned by the current instructor with enrollment counts */
export async function getInstructorCourses() {
  try {
    const session = await getInstructorSession();

    const courses = await db.course.findMany({
      where: { instructorId: session.user.id },
      include: { _count: { select: { enrollments: true } } },
      orderBy: { createdAt: "desc" },
    });

    return { success: true, data: courses };
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Không thể tải danh sách khóa học";
    return { success: false, error: msg };
  }
}
