import { getTranslations } from "next-intl/server";
import { HeroSection } from "@/components/landing/hero-section";
import { FeaturesSection } from "@/components/landing/features-section";
import { HowItWorksSection } from "@/components/landing/how-it-works-section";
import { HskLevelsSection } from "@/components/landing/hsk-levels-section";
import { CtaSection } from "@/components/landing/cta-section";

export default async function HomePage() {
  const t = await getTranslations("landing");

  return (
    <>
      <HeroSection
        badge={t("hero.badge")}
        heading={t("hero.heading")}
        subtitle={t("hero.subtitle")}
        primaryCta={t("hero.primaryCta")}
        secondaryCta={t("hero.secondaryCta")}
      />

      <FeaturesSection
        badge={t("features.badge")}
        heading={t("features.heading")}
        features={{
          lessons: { title: t("features.lessons.title"), desc: t("features.lessons.desc") },
          vocabulary: { title: t("features.vocabulary.title"), desc: t("features.vocabulary.desc") },
          practice: { title: t("features.practice.title"), desc: t("features.practice.desc") },
          progress: { title: t("features.progress.title"), desc: t("features.progress.desc") },
          vietnamese: { title: t("features.vietnamese.title"), desc: t("features.vietnamese.desc") },
          anytime: { title: t("features.anytime.title"), desc: t("features.anytime.desc") },
        }}
      />

      <HowItWorksSection
        badge={t("howItWorks.badge")}
        heading={t("howItWorks.heading")}
        steps={[
          { number: "01", title: t("howItWorks.step1.title"), description: t("howItWorks.step1.desc") },
          { number: "02", title: t("howItWorks.step2.title"), description: t("howItWorks.step2.desc") },
          { number: "03", title: t("howItWorks.step3.title"), description: t("howItWorks.step3.desc") },
        ]}
      />

      <HskLevelsSection
        badge={t("hsk.badge")}
        heading={t("hsk.heading")}
      />

      <CtaSection
        heading={t("cta.heading")}
        subtitle={t("cta.subtitle")}
        buttonLabel={t("cta.button")}
      />
    </>
  );
}
