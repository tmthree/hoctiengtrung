"use client";

// Contact form — UI only, no backend. Handles local submit state.
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";

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

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // UI only — no backend
    setSubmitted(true);
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
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="space-y-1.5">
        <Label htmlFor="contact-name">{namePlaceholder}</Label>
        <Input id="contact-name" type="text" placeholder={namePlaceholder} required />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="contact-email">{emailPlaceholder}</Label>
        <Input id="contact-email" type="email" placeholder={emailPlaceholder} required />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="contact-message">{messagePlaceholder}</Label>
        <textarea
          id="contact-message"
          rows={5}
          placeholder={messagePlaceholder}
          required
          className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
        />
      </div>
      <Button type="submit" size="lg" className="w-full rounded-full bg-primary text-white hover:bg-primary/90">
        {submitLabel}
      </Button>
    </form>
  );
}
