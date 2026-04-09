"use server";
// Server actions for checking and listing user course enrollments
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";

/**
 * Check if the authenticated user is enrolled in a course.
 * Used by lesson pages to gate paid content access.
 */
export async function checkEnrollment(courseId: string): Promise<boolean> {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) return false;

    const enrollment = await db.enrollment.findUnique({
      where: { userId_courseId: { userId: session.user.id, courseId } },
      select: { status: true },
    });

    return enrollment?.status === "ACTIVE";
  } catch (error) {
    console.error("checkEnrollment error:", error);
    return false;
  }
}

/** Get all active enrollments for the authenticated user with course info */
export async function getUserEnrollments() {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) return { success: false, error: "Unauthorized" };

    const enrollments = await db.enrollment.findMany({
      where: { userId: session.user.id, status: "ACTIVE" },
      include: {
        course: {
          select: {
            id: true,
            title: true,
            slug: true,
            thumbnail: true,
            level: true,
            enrollCount: true,
          },
        },
      },
      orderBy: { enrolledAt: "desc" },
    });

    return { success: true, data: enrollments };
  } catch (error) {
    console.error("getUserEnrollments error:", error);
    return { success: false, error: "Không thể tải danh sách khóa học đã đăng ký" };
  }
}
