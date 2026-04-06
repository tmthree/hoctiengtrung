// Server Component — horizontal progress bars for each HSK level word count
import { getTranslations } from "next-intl/server";
import { hskLevels } from "@/lib/constants/hsk-levels";

interface HskProgressProps {
  progressByLevel: Record<number, number>;
}

// Map HSK level to a progress bar fill color
const hskBarColors: Record<number, string> = {
  1: "bg-green-500",
  2: "bg-blue-500",
  3: "bg-purple-500",
  4: "bg-orange-500",
  5: "bg-red-500",
  6: "bg-rose-600",
};

export async function HskProgress({ progressByLevel }: HskProgressProps) {
  const t = await getTranslations("dashboard");

  return (
    <div className="space-y-2">
      <p className="text-sm font-medium text-foreground">{t("hskProgress")}</p>
      <div className="space-y-3">
        {hskLevels.map((hsk) => {
          const reviewed = progressByLevel[hsk.level] ?? 0;
          const pct = Math.min((reviewed / hsk.wordCount) * 100, 100);
          const barColor = hskBarColors[hsk.level] ?? "bg-primary";

          return (
            <div key={hsk.level} className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className={`font-semibold ${hsk.color}`}>{hsk.label}</span>
                <span className="text-muted-foreground">
                  {reviewed}/{hsk.wordCount} {t("wordsOf")}
                </span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                <div
                  className={`h-full rounded-full transition-all ${barColor}`}
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
