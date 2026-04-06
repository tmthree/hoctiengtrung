// Pricing page — free vs premium comparison with monthly/yearly toggle
"use client";
import { useState } from "react";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, X, Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";

interface FeatureRow {
  label: string;
  free: boolean | string;
  premium: boolean | string;
}

export default function PricingPage() {
  const t = useTranslations("pricing");
  const [yearly, setYearly] = useState(false);

  const features: FeatureRow[] = [
    { label: t("features.hsk1"), free: true, premium: true },
    { label: t("features.allHsk"), free: false, premium: true },
    { label: t("features.vocabHsk1"), free: true, premium: true },
    { label: t("features.vocabAll"), free: false, premium: true },
    { label: t("features.flashcardsLimited"), free: true, premium: false },
    { label: t("features.flashcardsUnlimited"), free: false, premium: true },
    { label: t("features.quizLimited"), free: true, premium: false },
    { label: t("features.quizUnlimited"), free: false, premium: true },
    { label: t("features.progress"), free: true, premium: true },
    { label: t("features.achievements"), free: false, premium: true },
    { label: t("features.support"), free: false, premium: true },
  ];

  const premiumPrice = yearly ? t("priceYear") : t("price");
  const premiumPer = yearly ? t("perYear") : t("perMonth");

  return (
    <section className="bg-background py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        {/* Header */}
        <div className="mb-10 text-center">
          <div className="mb-4 inline-flex items-center rounded-full border border-primary/30 bg-primary/5 px-4 py-1.5 text-xs font-semibold text-primary">
            ✦ {t("badge")}
          </div>
          <h1 className="text-4xl font-bold text-foreground sm:text-5xl">{t("heading")}</h1>
          <p className="mt-4 text-lg text-muted-foreground">{t("subtitle")}</p>
        </div>

        {/* Monthly / Yearly toggle */}
        <div className="mb-10 flex items-center justify-center gap-3">
          <span className={`text-sm font-medium ${!yearly ? "text-foreground" : "text-muted-foreground"}`}>
            {t("monthly")}
          </span>
          <button
            onClick={() => setYearly((v) => !v)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
              yearly ? "bg-primary" : "bg-muted"
            }`}
            role="switch"
            aria-checked={yearly}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${
                yearly ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
          <span className={`flex items-center gap-1.5 text-sm font-medium ${yearly ? "text-foreground" : "text-muted-foreground"}`}>
            {t("yearly")}
            <Badge className="bg-green-100 text-green-700 border-green-200 text-[10px]">
              {t("save")}
            </Badge>
          </span>
        </div>

        {/* Plan cards */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Free card */}
          <div className="flex flex-col rounded-2xl border bg-card p-8">
            <div className="mb-6">
              <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                {t("free")}
              </p>
              <div className="mt-2 flex items-end gap-1">
                <span className="text-5xl font-bold text-foreground">0₫</span>
                <span className="mb-1.5 text-muted-foreground">{t("perMonth")}</span>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">{t("forever")}</p>
            </div>
            <Link href="/register" className="mb-8">
              <Button variant="outline" size="lg" className="w-full rounded-full">
                {t("startFree")}
              </Button>
            </Link>
            <FeatureList features={features} tier="free" />
          </div>

          {/* Premium card */}
          <div className="relative flex flex-col rounded-2xl border-2 border-primary bg-card p-8 shadow-lg">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
              <Badge className="bg-primary text-primary-foreground px-3 py-1 text-xs font-semibold shadow">
                <Sparkles className="mr-1.5 h-3 w-3" />
                Phổ biến nhất
              </Badge>
            </div>
            <div className="mb-6">
              <p className="text-sm font-semibold uppercase tracking-wide text-primary">
                {t("premium")}
              </p>
              <div className="mt-2 flex items-end gap-1">
                <span className="text-5xl font-bold text-foreground">{premiumPrice}</span>
                <span className="mb-1.5 text-muted-foreground">{premiumPer}</span>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">
                {yearly ? "Thanh toán hàng năm" : "Thanh toán hàng tháng"}
              </p>
            </div>
            <Link href="/contact" className="mb-8">
              <Button size="lg" className="w-full rounded-full bg-primary text-white hover:bg-primary/90">
                {t("contactUpgrade")}
              </Button>
            </Link>
            <FeatureList features={features} tier="premium" />
          </div>
        </div>

        {/* FAQ note */}
        <p className="mt-8 text-center text-sm text-muted-foreground">
          Để nâng cấp gói, vui lòng liên hệ qua trang{" "}
          <Link href="/contact" className="text-primary underline-offset-4 hover:underline">
            Liên hệ
          </Link>
          . Chúng tôi sẽ kích hoạt gói cho bạn trong vòng 24 giờ.
        </p>
      </div>
    </section>
  );
}

function FeatureList({
  features,
  tier,
}: {
  features: FeatureRow[];
  tier: "free" | "premium";
}) {
  return (
    <ul className="space-y-3">
      {features.map((f) => {
        const val = tier === "free" ? f.free : f.premium;
        const active = val === true || typeof val === "string";
        return (
          <li key={f.label} className="flex items-center gap-3">
            {active ? (
              <Check className="h-4 w-4 shrink-0 text-primary" />
            ) : (
              <X className="h-4 w-4 shrink-0 text-muted-foreground/40" />
            )}
            <span className={`text-sm ${active ? "text-foreground" : "text-muted-foreground/60"}`}>
              {typeof val === "string" ? val : f.label}
            </span>
          </li>
        );
      })}
    </ul>
  );
}
