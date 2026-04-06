// Hero section — left text block + right decorative Chinese characters illustration
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { ChineseText } from "@/components/shared/chinese-text";

interface HeroSectionProps {
  badge: string;
  heading: string;
  subtitle: string;
  primaryCta: string;
  secondaryCta: string;
}

// Decorative Chinese characters shown in the right column
const DECO_CHARS = [
  { simplified: "你", pinyin: "nǐ", meaning: "bạn" },
  { simplified: "好", pinyin: "hǎo", meaning: "tốt" },
  { simplified: "学", pinyin: "xué", meaning: "học" },
  { simplified: "文", pinyin: "wén", meaning: "văn" },
  { simplified: "中", pinyin: "zhōng", meaning: "trung" },
  { simplified: "语", pinyin: "yǔ", meaning: "ngữ" },
];

export function HeroSection({
  badge,
  heading,
  subtitle,
  primaryCta,
  secondaryCta,
}: HeroSectionProps) {
  return (
    <section className="bg-background py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Left — text block */}
          <div className="flex-1 lg:max-w-[58%]">
            {/* Badge pill */}
            <div className="mb-6 inline-flex items-center rounded-full border border-primary/30 bg-primary/5 px-4 py-1.5 text-xs font-semibold text-primary tracking-wide">
              {badge}
            </div>

            <h1 className="text-4xl font-bold leading-tight text-foreground sm:text-5xl lg:text-6xl">
              {heading}
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
              {subtitle}
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/register">
                <Button
                  size="lg"
                  className="rounded-full bg-primary px-8 py-3 text-base font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
                >
                  {primaryCta}
                </Button>
              </Link>
              <Link href="/about">
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-full border-primary px-8 py-3 text-base font-semibold text-primary hover:bg-primary/5 transition-colors"
                >
                  {secondaryCta}
                </Button>
              </Link>
            </div>
          </div>

          {/* Right — decorative character grid */}
          <div className="flex-1 flex items-center justify-center">
            <div className="relative w-full max-w-sm">
              {/* Large center character */}
              <div className="flex justify-center mb-8">
                <div className="rounded-3xl bg-primary/5 border border-primary/10 p-8 shadow-sm">
                  <ChineseText simplified="中" pinyin="zhōng" meaning="Trung" size="xl" />
                </div>
              </div>
              {/* Grid of smaller characters */}
              <div className="grid grid-cols-3 gap-4">
                {DECO_CHARS.map((char) => (
                  <div
                    key={char.simplified}
                    className="flex justify-center rounded-xl bg-muted border border-border p-3 hover:border-primary/30 hover:bg-primary/5 transition-colors"
                  >
                    <ChineseText
                      simplified={char.simplified}
                      pinyin={char.pinyin}
                      meaning={char.meaning}
                      size="sm"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
