import { getTranslations } from "next-intl/server";
import { ContactForm } from "@/components/shared/contact-form";
import { Mail, MessageSquare } from "lucide-react";

export default async function ContactPage() {
  const t = await getTranslations("contact");

  return (
    <section className="bg-background py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Header */}
        <div className="mb-12">
          <div className="mb-4 inline-flex items-center rounded-full border border-primary/30 bg-primary/5 px-4 py-1.5 text-xs font-semibold text-primary">
            ✦ {t("badge")}
          </div>
          <h1 className="text-4xl font-bold text-foreground sm:text-5xl">{t("heading")}</h1>
          <p className="mt-4 max-w-xl text-lg text-muted-foreground">{t("subtitle")}</p>
        </div>

        <div className="grid gap-12 lg:grid-cols-2">
          {/* Form */}
          <ContactForm
            namePlaceholder={t("form.name")}
            emailPlaceholder={t("form.email")}
            messagePlaceholder={t("form.message")}
            submitLabel={t("form.submit")}
            successMessage={t("form.success")}
          />

          {/* Contact info */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-foreground">{t("info.heading")}</h2>
            <div className="flex items-start gap-3">
              <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10">
                <Mail className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">{t("info.emailLabel")}</p>
                <p className="text-sm text-muted-foreground">support@hoctientrung.vn</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10">
                <MessageSquare className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">{t("info.socialLabel")}</p>
                <p className="text-sm text-muted-foreground">{t("info.socialValue")}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
