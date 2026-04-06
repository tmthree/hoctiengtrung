// Profile page — user settings, daily goal, and achievements
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { redirect } from "@/i18n/navigation";
import { getUserStats } from "@/lib/queries/progress";
import { db } from "@/lib/db";
import { achievements } from "@/lib/constants/achievements";
import { ProfileForm } from "@/components/profile/profile-form";
import { DailyGoalSetting } from "@/components/profile/daily-goal-setting";
import { AchievementGrid } from "@/components/profile/achievement-grid";
import { StatsOverview } from "@/components/dashboard/stats-overview";
import { getTranslations } from "next-intl/server";

interface ProfilePageProps {
  params: Promise<{ locale: string }>;
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  const { locale } = await params;
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    redirect({ href: "/login", locale });
    return null;
  }

  const userId = session.user.id;
  const t = await getTranslations("profile");

  const [stats, user] = await Promise.all([
    getUserStats(userId),
    db.user.findUnique({
      where: { id: userId },
      select: { dailyGoalMinutes: true, name: true, email: true, image: true },
    }),
  ]);

  const achievementsWithStatus = achievements.map((a) => ({
    ...a,
    unlocked: a.condition(stats),
  }));

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">{t("title")}</h1>
      </div>

      {/* Profile edit form */}
      <ProfileForm
        initialName={user?.name ?? session.user.name}
        email={user?.email ?? session.user.email}
        image={user?.image ?? session.user.image}
      />

      {/* Daily goal setting */}
      <DailyGoalSetting initialGoal={user?.dailyGoalMinutes ?? 15} />

      {/* Overall stats */}
      <div className="space-y-2">
        <p className="text-sm font-medium text-foreground">Thống kê học tập</p>
        <StatsOverview
          lessonsCompleted={stats.lessonsCompleted}
          wordsReviewed={stats.wordsReviewed}
          currentStreak={stats.currentStreak}
          totalMinutes={stats.totalMinutes}
        />
      </div>

      {/* Achievements */}
      <AchievementGrid achievements={achievementsWithStatus} locale={locale} />
    </div>
  );
}
