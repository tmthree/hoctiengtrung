// Server Component — grid of achievements with locked/unlocked visual states
import {
  BookOpen,
  Languages,
  Trophy,
  Flame,
  Zap,
  Crown,
  Clock,
  GraduationCap,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type { Achievement } from "@/lib/constants/achievements";

// Map icon name string to Lucide component
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  BookOpen,
  Languages,
  Trophy,
  Flame,
  Zap,
  Crown,
  Clock,
  GraduationCap,
};

interface AchievementWithStatus extends Achievement {
  unlocked: boolean;
}

interface AchievementGridProps {
  achievements: AchievementWithStatus[];
  locale?: string;
}

export function AchievementGrid({ achievements, locale = "vi" }: AchievementGridProps) {
  return (
    <div className="space-y-2">
      <p className="text-sm font-medium text-foreground">Thành tích</p>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {achievements.map((achievement) => {
          const IconComponent = iconMap[achievement.icon] ?? Trophy;
          const title = locale === "vi" ? achievement.titleVi : achievement.titleEn;
          const desc = locale === "vi" ? achievement.descriptionVi : achievement.descriptionEn;

          return (
            <Card
              key={achievement.id}
              className={achievement.unlocked ? "" : "opacity-50 grayscale"}
              size="sm"
            >
              <CardContent className="flex flex-col items-center gap-2 py-4 text-center">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full ${
                    achievement.unlocked ? "bg-primary/10" : "bg-muted"
                  }`}
                >
                  <IconComponent
                    className={`h-5 w-5 ${achievement.unlocked ? "text-primary" : "text-muted-foreground"}`}
                  />
                </div>
                <div>
                  <p className="text-xs font-semibold leading-tight">{title}</p>
                  <p className="mt-0.5 text-[10px] text-muted-foreground leading-tight">{desc}</p>
                </div>
                {achievement.unlocked && (
                  <span className="text-[10px] font-medium text-green-600">Đã mở</span>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
