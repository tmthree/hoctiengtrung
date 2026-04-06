import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";

export default async function AboutPage() {
  const t = await getTranslations("about");

  const hskLevels = [
    { level: "HSK 1", color: "#22C55E", desc: t("hsk.level1") },
    { level: "HSK 2", color: "#3B82F6", desc: t("hsk.level2") },
    { level: "HSK 3", color: "#8B5CF6", desc: t("hsk.level3") },
    { level: "HSK 4", color: "#F59E0B", desc: t("hsk.level4") },
    { level: "HSK 5", color: "#EF4444", desc: t("hsk.level5") },
    { level: "HSK 6", color: "#CF2562", desc: t("hsk.level6") },
  ];

  return (
    <>
      {/* Header */}
      <section className="bg-background py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="max-w-3xl">
            <div className="mb-4 inline-flex items-center rounded-full border border-primary/30 bg-primary/5 px-4 py-1.5 text-xs font-semibold text-primary">
              ✦ {t("badge")}
            </div>
            <h1 className="text-4xl font-bold text-foreground sm:text-5xl">{t("heading")}</h1>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">{t("intro")}</p>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="bg-muted py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <h2 className="mb-4 text-2xl font-bold text-foreground">{t("mission.heading")}</h2>
          <p className="max-w-2xl text-muted-foreground leading-relaxed">{t("mission.body")}</p>
        </div>
      </section>

      {/* Methodology */}
      <section className="bg-background py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <h2 className="mb-8 text-2xl font-bold text-foreground">{t("method.heading")}</h2>
          <div className="grid gap-6 sm:grid-cols-3">
            {[
              { title: t("method.spaced.title"), body: t("method.spaced.body") },
              { title: t("method.hsk.title"), body: t("method.hsk.body") },
              { title: t("method.viet.title"), body: t("method.viet.body") },
            ].map((item) => (
              <div key={item.title} className="rounded-xl border border-border bg-card p-6 shadow-sm">
                <h3 className="mb-2 font-semibold text-foreground">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HSK System */}
      <section className="bg-muted py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <h2 className="mb-4 text-2xl font-bold text-foreground">{t("hsk.heading")}</h2>
          <p className="mb-8 max-w-2xl text-muted-foreground">{t("hsk.intro")}</p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {hskLevels.map((lvl) => (
              <div
                key={lvl.level}
                className="rounded-xl border border-border bg-card p-5 shadow-sm"
                style={{ borderLeftWidth: "4px", borderLeftColor: lvl.color }}
              >
                <div className="font-bold" style={{ color: lvl.color }}>{lvl.level}</div>
                <p className="mt-1 text-sm text-muted-foreground">{lvl.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 text-center">
          <h2 className="mb-4 text-2xl font-bold text-white">{t("cta.heading")}</h2>
          <Link href="/register">
            <Button size="lg" className="rounded-full bg-white px-8 text-primary hover:bg-white/90">
              {t("cta.button")}
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
}
