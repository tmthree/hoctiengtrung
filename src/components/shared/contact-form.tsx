"use client";

// Contact form — validates input, calls submitContactMessage server action,
// and shows success/error feedback.
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { CheckCircle2 } from "lucide-react";
import { contactSchema, type ContactInput } from "@/lib/validators/contact";
import { submitContactMessage } from "@/lib/actions/contact-actions";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface ContactFormProps {
  namePlaceholder: string;
  emailPlaceholder: string;
  messagePlaceholder: string;
  submitLabel: string;
  successMessage: string;
}

export function ContactForm({
  namePlaceholder,
  emailPlaceholder,
  messagePlaceholder,
  submitLabel,
  successMessage,
}: ContactFormProps) {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
  });

  async function onSubmit(data: ContactInput) {
    const result = await submitContactMessage(data);
    if (result.success) {
      setSubmitted(true);
    } else {
      toast.error(result.error ?? "Gửi thất bại, vui lòng thử lại.");
    }
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 rounded-xl border border-border bg-card p-10 text-center">
        <CheckCircle2 className="h-10 w-10 text-primary" />
        <p className="text-base font-medium text-foreground">{successMessage}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="space-y-1.5">
        <Label htmlFor="contact-name">{namePlaceholder}</Label>
        <Input
          id="contact-name"
          type="text"
          placeholder={namePlaceholder}
          {...register("name")}
        />
        {errors.name && (
          <p className="text-sm text-destructive">{errors.name.message}</p>
        )}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="contact-email">{emailPlaceholder}</Label>
        <Input
          id="contact-email"
          type="email"
          placeholder={emailPlaceholder}
          {...register("email")}
        />
        {errors.email && (
          <p className="text-sm text-destructive">{errors.email.message}</p>
        )}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="contact-message">{messagePlaceholder}</Label>
        <textarea
          id="contact-message"
          rows={5}
          placeholder={messagePlaceholder}
          {...register("message")}
          className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
        />
        {errors.message && (
          <p className="text-sm text-destructive">{errors.message.message}</p>
        )}
      </div>

      <Button
        type="submit"
        size="lg"
        className="w-full rounded-full bg-primary text-white hover:bg-primary/90"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Đang gửi..." : submitLabel}
      </Button>
    </form>
  );
}
