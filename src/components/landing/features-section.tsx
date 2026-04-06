// Features grid section — 6 feature cards 3×2 layout
import {
  BookOpen,
  Languages,
  Dumbbell,
  BarChart3,
  Globe,
  Zap,
} from "lucide-react";

interface FeatureItem {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface FeaturesSectionProps {
  badge: string;
  heading: string;
  features: {
    lessons: { title: string; desc: string };
    vocabulary: { title: string; desc: string };
    practice: { title: string; desc: string };
    progress: { title: string; desc: string };
    vietnamese: { title: string; desc: string };
    anytime: { title: string; desc: string };
  };
}

const ICON_CLASSES = "h-5 w-5 text-primary";

export function FeaturesSection({ badge, heading, features }: FeaturesSectionProps) {
  const items: FeatureItem[] = [
    { icon: <BookOpen className={ICON_CLASSES} />, title: features.lessons.title, description: features.lessons.desc },
    { icon: <Languages className={ICON_CLASSES} />, title: features.vocabulary.title, description: features.vocabulary.desc },
    { icon: <Dumbbell className={ICON_CLASSES} />, title: features.practice.title, description: features.practice.desc },
    { icon: <BarChart3 className={ICON_CLASSES} />, title: features.progress.title, description: features.progress.desc },
    { icon: <Globe className={ICON_CLASSES} />, title: features.vietnamese.title, description: features.vietnamese.desc },
    { icon: <Zap className={ICON_CLASSES} />, title: features.anytime.title, description: features.anytime.desc },
  ];

  return (
    <section className="bg-muted py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Section header */}
        <div className="mb-12 text-center">
          <div className="mb-4 inline-flex items-center rounded-full border border-primary/30 bg-primary/5 px-4 py-1.5 text-xs font-semibold text-primary tracking-wide">
            {badge}
          </div>
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl">{heading}</h2>
        </div>

        {/* Cards grid */}
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {items.map((item) => (
            <div
              key={item.title}
              className="rounded-xl border border-border bg-card p-6 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
            >
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                {item.icon}
              </div>
              <h3 className="mb-2 font-semibold text-foreground">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
