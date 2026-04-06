// Call-to-action banner — full-width primary background with white text + CTA button
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";

interface CtaSectionProps {
  heading: string;
  subtitle: string;
  buttonLabel: string;
}

export function CtaSection({ heading, subtitle, buttonLabel }: CtaSectionProps) {
  return (
    <section className="bg-primary py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 text-center">
        <h2 className="text-3xl font-bold text-white sm:text-4xl">{heading}</h2>
        <p className="mt-4 text-lg text-white/80">{subtitle}</p>
        <Link href="/register" className="mt-8 inline-block">
          <Button
            size="lg"
            className="rounded-full bg-white px-8 py-3 text-base font-semibold text-primary hover:bg-white/90 transition-colors"
          >
            {buttonLabel}
          </Button>
        </Link>
      </div>
    </section>
  );
}
