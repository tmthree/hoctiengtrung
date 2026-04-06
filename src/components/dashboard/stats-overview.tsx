// Server Component — 4-card grid showing high-level user learning statistics
import { BookOpen, Languages, Flame, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { getTranslations } from "next-intl/server";

interface StatsOverviewProps {
  lessonsCompleted: number;
  wordsReviewed: number;
  currentStreak: number;
  totalMinutes: number;
}

interface StatCardProps {
  icon: React.ReactNode;
  value: string;
  label: string;
  iconBgClass: string;
}

function StatCard({ icon, value, label, iconBgClass }: StatCardProps) {
  return (
    <Card>
      <CardContent className="flex items-center gap-4 pt-4">
        <div className={`flex h-12 w-12 items-center justify-center rounded-full ${iconBgClass}`}>
          {icon}
        </div>
        <div>
          <p className="text-2xl font-bold text-foreground">{value}</p>
          <p className="text-sm text-muted-foreground">{label}</p>
        </div>
      </CardContent>
    </Card>
  );
}

function formatTime(minutes: number): string {
  if (minutes < 60) return `${minutes}p`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m > 0 ? `${h}g ${m}p` : `${h}g`;
}

export async function StatsOverview({
  lessonsCompleted,
  wordsReviewed,
  currentStreak,
  totalMinutes,
}: StatsOverviewProps) {
  const t = await getTranslations("dashboard");

  const stats = [
    {
      icon: <BookOpen className="h-5 w-5 text-blue-600" />,
      value: String(lessonsCompleted),
      label: t("lessonsCompleted"),
      iconBgClass: "bg-blue-100",
    },
    {
      icon: <Languages className="h-5 w-5 text-purple-600" />,
      value: String(wordsReviewed),
      label: t("wordsReviewed"),
      iconBgClass: "bg-purple-100",
    },
    {
      icon: <Flame className="h-5 w-5 text-orange-600" />,
      value: `${currentStreak} ngày`,
      label: t("streakDays"),
      iconBgClass: "bg-orange-100",
    },
    {
      icon: <Clock className="h-5 w-5 text-green-600" />,
      value: formatTime(totalMinutes),
      label: t("studyTime"),
      iconBgClass: "bg-green-100",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
      {stats.map((stat) => (
        <StatCard key={stat.label} {...stat} />
      ))}
    </div>
  );
}
