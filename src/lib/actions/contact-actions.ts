"use server";

// Server action for contact form submissions.
// Messages are validated, logged to console (visible in Vercel logs),
// and returned with a typed result. When Resend is configured,
// add email forwarding here — no other files need changing.

import { contactSchema, type ContactInput } from "@/lib/validators/contact";

type ContactResult =
  | { success: true }
  | { success: false; error: string };

export async function submitContactMessage(
  data: ContactInput
): Promise<ContactResult> {
  const parsed = contactSchema.safeParse(data);

  if (!parsed.success) {
    const firstError = parsed.error.issues[0]?.message ?? "Dữ liệu không hợp lệ";
    return { success: false, error: firstError };
  }

  const { name, email, message } = parsed.data;

  // Log to server console — visible in Vercel Function Logs
  console.log("[contact-form] Tin nhắn mới:", {
    name,
    email,
    message: message.slice(0, 200),
    receivedAt: new Date().toISOString(),
  });

  // TODO: When Resend is configured, send email to admin:
  // await resend.emails.send({
  //   from: "no-reply@hoctiengtrung.app",
  //   to: process.env.ADMIN_EMAIL!,
  //   subject: `[Liên hệ] ${name}`,
  //   text: `Từ: ${name} <${email}>\n\n${message}`,
  // });

  return { success: true };
}
