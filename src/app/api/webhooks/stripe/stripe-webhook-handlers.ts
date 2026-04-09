// Business logic for Stripe webhook event processing
import Stripe from "stripe";
import { db } from "@/lib/db";

/**
 * Process a completed checkout session.
 * Creates Payment, updates Order to PAID, creates Enrollment, increments enrollCount.
 * Idempotent: skips if Order is already PAID.
 */
export async function processCheckoutCompleted(
  session: Stripe.Checkout.Session,
  webhookEventId: string,
): Promise<void> {
  const orderId = session.metadata?.orderId;
  if (!orderId) throw new Error("Missing orderId in session metadata");

  const order = await db.order.findUnique({ where: { id: orderId } });
  if (!order) throw new Error(`Order not found: ${orderId}`);

  // Layer 3 guard: skip if already processed (idempotent)
  if (order.status === "PAID") return;

  const stripePaymentId = session.payment_intent as string;
  if (!stripePaymentId) throw new Error("Missing payment_intent in session");

  const now = new Date();

  try {
    await db.$transaction([
      db.payment.create({
        data: {
          orderId: order.id,
          stripePaymentId,
          amount: order.amount,
          currency: order.currency,
          status: "SUCCEEDED",
          paidAt: now,
        },
      }),
      db.order.update({ where: { id: order.id }, data: { status: "PAID" } }),
      db.enrollment.create({
        data: {
          userId: order.userId,
          courseId: order.courseId,
          status: "ACTIVE",
        },
      }),
      db.course.update({
        where: { id: order.courseId },
        data: { enrollCount: { increment: 1 } },
      }),
    ]);
  } catch (error) {
    // Log error into WebhookEvent so we can inspect later — Stripe will retry
    await db.webhookEvent.update({
      where: { id: webhookEventId },
      data: { error: error instanceof Error ? error.message : String(error) },
    });
    throw error;
  }
}

/**
 * Process a charge refund.
 * Updates Payment, Order, and Enrollment to REFUNDED; decrements enrollCount.
 * Idempotent: skips if Payment is already REFUNDED.
 */
export async function processRefund(charge: Stripe.Charge, webhookEventId: string): Promise<void> {
  const stripePaymentId = charge.payment_intent as string;
  if (!stripePaymentId) throw new Error("Missing payment_intent in charge");

  const payment = await db.payment.findUnique({ where: { stripePaymentId } });
  if (!payment) throw new Error(`Payment not found for stripePaymentId: ${stripePaymentId}`);

  // Idempotent: skip if already refunded
  if (payment.status === "REFUNDED") return;

  const order = await db.order.findUnique({ where: { id: payment.orderId } });
  if (!order) throw new Error(`Order not found: ${payment.orderId}`);

  const now = new Date();

  try {
    await db.$transaction([
      db.payment.update({ where: { id: payment.id }, data: { status: "REFUNDED", refundedAt: now } }),
      db.order.update({ where: { id: order.id }, data: { status: "REFUNDED" } }),
      db.enrollment.updateMany({
        where: { userId: order.userId, courseId: order.courseId },
        data: { status: "REFUNDED" },
      }),
      db.course.update({
        where: { id: order.courseId },
        data: { enrollCount: { decrement: 1 } },
      }),
    ]);
  } catch (error) {
    await db.webhookEvent.update({
      where: { id: webhookEventId },
      data: { error: error instanceof Error ? error.message : String(error) },
    });
    throw error;
  }
}
