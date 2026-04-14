"use client";

// Forgot-password form.
// Better Auth's forgetPassword requires a sendResetPassword email handler
// which is not yet configured (no email service set up). Until Resend/SMTP
// is wired into src/lib/auth.ts, we show an honest message directing the
// user to the contact page rather than silently doing nothing.

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function ForgotPasswordForm() {
  const t = useTranslations("auth");

  return (
    <div className="space-y-4 text-center">
      <p className="text-sm text-muted-foreground leading-relaxed">
        {t("resetPasswordUnavailable")}
      </p>
      <Link
        href="/contact"
        className={cn(buttonVariants({ variant: "default" }), "w-full rounded-full")}
      >
        {t("goToContact")}
      </Link>
    </div>
  );
}
