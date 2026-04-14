"use server";
// Server actions for Stripe checkout session creation and order management
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { stripe } from "@/lib/stripe";
import { createCheckoutSchema } from "@/lib/validators/payment";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
// Orders older than 30 minutes are considered expired for idempotency purposes
const PENDING_ORDER_TTL_MS = 30 * 60 * 1000;

/** Get or create a Stripe customer for the authenticated user */
async function getOrCreateStripeCustomer(userId: string, email: string, name: string): Promise<string> {
  const user = await db.user.findUnique({ where: { id: userId }, select: { stripeCustomerId: true } });

  if (user?.stripeCustomerId) return user.stripeCustomerId;

  const customer = await stripe.customers.create({ email, name, metadata: { userId } });

  await db.user.update({ where: { id: userId }, data: { stripeCustomerId: customer.id } });

  return customer.id;
}

/**
 * Create a Stripe Checkout Session for a course purchase.
 * Implements Layer 1 idempotency: reuses PENDING orders < 30min old.
 */
export async function createCheckoutSession(courseId: string) {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) return { success: false, error: "Vui lòng đăng nhập để tiếp tục" };

    const parsed = createCheckoutSchema.safeParse({ courseId });
    if (!parsed.success) {
      return { success: false, error: parsed.error.issues[0]?.message ?? "Dữ liệu không hợp lệ" };
    }

    const { user } = session;
    const course = await db.course.findUnique({ where: { id: courseId } });

    if (!course || !course.isPublished) return { success: false, error: "Khóa học không tồn tại" };
    if (course.price <= 0) return { success: false, error: "Khóa học này miễn phí" };

    // Check existing enrollment
    const existingEnrollment = await db.enrollment.findUnique({
      where: { userId_courseId: { userId: user.id, courseId } },
    });
    if (existingEnrollment) return { success: false, error: "Bạn đã đăng ký khóa học này" };

    // Layer 1 idempotency: reuse a recent PENDING order if one exists
    const recentCutoff = new Date(Date.now() - PENDING_ORDER_TTL_MS);
    const existingOrder = await db.order.findFirst({
      where: { userId: user.id, courseId, status: "PENDING", createdAt: { gte: recentCutoff } },
    });

    if (existingOrder?.stripeSessionId) {
      const checkoutSession = await stripe.checkout.sessions.retrieve(existingOrder.stripeSessionId);
      if (checkoutSession.url && checkoutSession.status === "open") {
        return { success: true, url: checkoutSession.url };
      }
    }

    // Create new order
    const idempotencyKey = `${user.id}_${courseId}_${Date.now()}`;
    const order = await db.order.create({
      data: {
        userId: user.id,
        courseId,
        amount: course.price,
        currency: course.currency,
        idempotencyKey,
        status: "PENDING",
      },
    });

    const customerId = await getOrCreateStripeCustomer(user.id, user.email, user.name);

    // Price is stored in VND (smallest unit, no decimals for VND)
    const checkoutSession = await stripe.checkout.sessions.create({
      customer: customerId,
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: course.currency.toLowerCase(),
            product_data: { name: course.title },
            unit_amount: course.price,
          },
          quantity: 1,
        },
      ],
      metadata: { orderId: order.id, userId: user.id, courseId },
      success_url: `${APP_URL}/courses/${courseId}?payment=success`,
      cancel_url: `${APP_URL}/courses/${courseId}?payment=cancelled`,
    });

    await db.order.update({ where: { id: order.id }, data: { stripeSessionId: checkoutSession.id } });

    return { success: true, url: checkoutSession.url };
  } catch (error) {
    console.error("createCheckoutSession error:", error);
    return { success: false, error: "Không thể tạo phiên thanh toán. Vui lòng thử lại" };
  }
}

/** Get order + payment status for the authenticated user */
export async function getOrderStatus(orderId: string) {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) return { success: false, error: "Unauthorized" };

    const order = await db.order.findFirst({
      where: { id: orderId, userId: session.user.id },
      include: { payments: true, course: { select: { title: true, slug: true } } },
    });

    if (!order) return { success: false, error: "Không tìm thấy đơn hàng" };

    return { success: true, data: order };
  } catch (error) {
    console.error("getOrderStatus error:", error);
    return { success: false, error: "Không thể tải thông tin đơn hàng" };
  }
}

/** List all orders for the authenticated user with course info */
export async function getUserOrders() {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) return { success: false, error: "Unauthorized" };

    const orders = await db.order.findMany({
      where: { userId: session.user.id },
      include: { course: { select: { id: true, title: true, slug: true, thumbnail: true } }, payments: true },
      orderBy: { createdAt: "desc" },
    });

    return { success: true, data: orders };
  } catch (error) {
    console.error("getUserOrders error:", error);
    return { success: false, error: "Không thể tải danh sách đơn hàng" };
  }
}
