// HSK Levels Preview section — 6 level cards with colored top borders

interface HskLevel {
  level: string;
  name: string;
  description: string;
  color: string; // Tailwind border-[color] class
  textColor: string;
}

interface HskLevelsSectionProps {
  badge: string;
  heading: string;
}

const HSK_LEVELS: HskLevel[] = [
  { level: "HSK 1", name: "Sơ cấp 1", description: "~150 từ · Chào hỏi cơ bản", color: "#22C55E", textColor: "#16a34a" },
  { level: "HSK 2", name: "Sơ cấp 2", description: "~300 từ · Giao tiếp đơn giản", color: "#3B82F6", textColor: "#2563eb" },
  { level: "HSK 3", name: "Trung cấp 1", description: "~600 từ · Giao tiếp thông thường", color: "#8B5CF6", textColor: "#7c3aed" },
  { level: "HSK 4", name: "Trung cấp 2", description: "~1200 từ · Đọc hiểu cơ bản", color: "#F59E0B", textColor: "#d97706" },
  { level: "HSK 5", name: "Cao cấp 1", description: "~2500 từ · Đọc báo, xem phim", color: "#EF4444", textColor: "#dc2626" },
  { level: "HSK 6", name: "Cao cấp 2", description: "~5000 từ · Thành thạo tiếng Trung", color: "#CF2562", textColor: "#be185d" },
];

export function HskLevelsSection({ badge, heading }: HskLevelsSectionProps) {
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

        {/* Level cards grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {HSK_LEVELS.map((lvl) => (
            <div
              key={lvl.level}
              className="rounded-xl border border-border bg-card p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
              style={{ borderTopWidth: "4px", borderTopColor: lvl.color }}
            >
              <div
                className="mb-1 text-lg font-bold"
                style={{ color: lvl.textColor }}
              >
                {lvl.level}
              </div>
              <div className="mb-2 text-sm font-semibold text-foreground">{lvl.name}</div>
              <p className="text-xs text-muted-foreground leading-relaxed">{lvl.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
