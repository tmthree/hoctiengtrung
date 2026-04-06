import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

export default async function PricingPage() {
  const t = await getTranslations("pricing");

  const featureKeys = [
    "features.lessons",
    "features.flashcard",
    "features.practice",
    "features.progress",
    "features.interface",
  ] as const;

  return (
    <section className="bg-background py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="mb-4 inline-flex items-center rounded-full border border-primary/30 bg-primary/5 px-4 py-1.5 text-xs font-semibold text-primary">
            ✦ {t("badge")}
          </div>
          <h1 className="text-4xl font-bold text-foreground sm:text-5xl">{t("heading")}</h1>
          <p className="mt-4 text-lg text-muted-foreground">{t("subtitle")}</p>
        </div>

        {/* Single pricing card */}
        <div className="mx-auto max-w-md">
          <div className="rounded-2xl border-2 border-primary bg-card p-8 shadow-md text-center">
            {/* Plan label */}
            <div className="mb-2 inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
              {t("plan.label")}
            </div>
            <div className="mt-4 text-5xl font-bold text-foreground">{t("plan.price")}</div>
            <p className="mt-2 text-sm text-muted-foreground">{t("plan.period")}</p>

            {/* Features list */}
            <ul className="mt-8 space-y-3 text-left">
              {featureKeys.map((key) => (
                <li key={key} className="flex items-center gap-3">
                  <Check className="h-4 w-4 shrink-0 text-primary" />
                  <span className="text-sm text-foreground">{t(key)}</span>
                </li>
              ))}
            </ul>

            {/* CTA */}
            <Link href="/register" className="mt-8 block">
              <Button size="lg" className="w-full rounded-full bg-primary text-white hover:bg-primary/90">
                {t("cta")}
              </Button>
            </Link>
          </div>

          <p className="mt-6 text-center text-sm text-muted-foreground">{t("note")}</p>
        </div>
      </div>
    </section>
  );
}
