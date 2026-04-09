// Stripe webhook endpoint — handles payment events with 3-layer idempotency
import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { db } from "@/lib/db";
import { processCheckoutCompleted, processRefund } from "./stripe-webhook-handlers";

const WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(req: NextRequest) {
  // Read raw body — required for Stripe signature verification
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");

  if (!sig) {
    return NextResponse.json({ error: "Missing stripe-signature header" }, { status: 400 });
  }

  if (!WEBHOOK_SECRET) {
    console.error("[stripe-webhook] STRIPE_WEBHOOK_SECRET is not configured");
    return NextResponse.json({ error: "Webhook secret not configured" }, { status: 500 });
  }

  let event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, WEBHOOK_SECRET);
  } catch (err) {
    console.error("[stripe-webhook] Signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  // Layer 2 idempotency: check if this Stripe event was already processed
  const existing = await db.webhookEvent.findUnique({ where: { stripeEventId: event.id } });

  if (existing) {
    if (existing.processedAt) {
      // Already processed — return 200 so Stripe stops retrying
      return NextResponse.json({ received: true, skipped: true });
    }
    // Previously recorded but not processed (e.g. server crashed mid-process) — continue
  }

  // Record the event for idempotency tracking (upsert handles race conditions)
  let webhookRecord;
  try {
    webhookRecord = await db.webhookEvent.upsert({
      where: { stripeEventId: event.id },
      create: { stripeEventId: event.id, type: event.type, payload: event as object },
      update: {},
    });
  } catch (err) {
    console.error("[stripe-webhook] Failed to record webhook event:", err);
    // Return 500 so Stripe retries — we haven't processed anything yet
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }

  // Dispatch to handler — ALWAYS return 200 after this point so Stripe doesn't retry forever
  try {
    switch (event.type) {
      case "checkout.session.completed":
        await processCheckoutCompleted(event.data.object, webhookRecord.id);
        break;

      case "checkout.session.expired":
        await handleSessionExpired(event.data.object);
        break;

      case "charge.refunded":
        await processRefund(event.data.object, webhookRecord.id);
        break;

      default:
        // Unhandled event type — acknowledge and move on
        break;
    }

    // Mark as successfully processed
    await db.webhookEvent.update({
      where: { id: webhookRecord.id },
      data: { processedAt: new Date() },
    });
  } catch (err) {
    // Error already logged in handler; return 200 to prevent infinite Stripe retries
    console.error(`[stripe-webhook] Error processing event ${event.type}:`, err);
    await db.webhookEvent.update({
      where: { id: webhookRecord.id },
      data: { error: err instanceof Error ? err.message : String(err) },
    }).catch(() => {}); // Ignore secondary DB errors
  }

  return NextResponse.json({ received: true });
}

/** Mark the associated Order as CANCELLED when checkout session expires */
async function handleSessionExpired(session: { id: string }) {
  await db.order.updateMany({
    where: { stripeSessionId: session.id, status: "PENDING" },
    data: { status: "CANCELLED" },
  });
}
