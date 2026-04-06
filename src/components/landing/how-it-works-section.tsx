// How It Works section — 3 numbered steps in a row

interface Step {
  number: string;
  title: string;
  description: string;
}

interface HowItWorksSectionProps {
  badge: string;
  heading: string;
  steps: [Step, Step, Step];
}

export function HowItWorksSection({ badge, heading, steps }: HowItWorksSectionProps) {
  return (
    <section className="bg-background py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Section header */}
        <div className="mb-12 text-center">
          <div className="mb-4 inline-flex items-center rounded-full border border-primary/30 bg-primary/5 px-4 py-1.5 text-xs font-semibold text-primary tracking-wide">
            {badge}
          </div>
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl">{heading}</h2>
        </div>

        {/* Steps */}
        <div className="grid gap-8 sm:grid-cols-3">
          {steps.map((step) => (
            <div key={step.number} className="flex flex-col items-center text-center">
              {/* Large step number */}
              <div className="mb-4 text-5xl font-bold text-primary/20 select-none">
                {step.number}
              </div>
              <h3 className="mb-2 text-lg font-semibold text-foreground">{step.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
