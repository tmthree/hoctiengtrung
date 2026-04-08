// Dashboard page — main learning overview with stats, activity, and progress
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { redirect } from "@/i18n/navigation";
import {
  getUserStats,
  getStreakCalendar,
  getRecentActivity,
  getHskProgress,
  getTodayMinutes,
  getDueReviewCount,
} from "@/lib/queries/progress";
import { getLessons } from "@/lib/queries/lessons";
import { db } from "@/lib/db";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatsOverview } from "@/components/dashboard/stats-overview";
import { StreakCalendar } from "@/components/dashboard/streak-calendar";
import { DailyGoalRing } from "@/components/dashboard/daily-goal-ring";
import { RecentActivity } from "@/components/dashboard/recent-activity";
import { ContinueLearning } from "@/components/dashboard/continue-learning";
import { HskProgress } from "@/components/dashboard/hsk-progress";
import { PlanStatusCard } from "@/components/dashboard/plan-status-card";
import { getTranslations } from "next-intl/server";

interface DashboardPageProps {
  params: Promise<{ locale: string }>;
}

export default async function DashboardPage({ params }: DashboardPageProps) {
  const { locale } = await params;
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    redirect({ href: "/login", locale });
    return null;
  }

  const userId = session.user.id;
  const t = await getTranslations("dashboard");

  // All 9 queries fire in parallel — no sequential waterfalls
  const [stats, streakCalendar, activity, hskProgress, todayMinutes, dueCount, user, lessonsData, completedProgressRows] =
    await Promise.all([
      getUserStats(userId),
      getStreakCalendar(userId),
      getRecentActivity(userId),
      getHskProgress(userId),
      getTodayMinutes(userId),
      getDueReviewCount(userId),
      db.user.findUnique({
        where: { id: userId },
        select: { dailyGoalMinutes: true, name: true, plan: true, planExpiresAt: true },
      }),
      getLessons({ limit: 20 }),
      db.userProgress.findMany({
        where: { userId, status: "COMPLETED" },
        select: { lessonId: true },
      }),
    ]);

  const completedIds = new Set(completedProgressRows.map((r) => r.lessonId));
  const { lessons } = lessonsData;
  const nextLesson = lessons.find((l) => !completedIds.has(l.id));
  const dailyGoal = user?.dailyGoalMinutes ?? 15;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">{t("title")}</h1>
        <p className="text-muted-foreground">
          {t("welcome")}, {session.user.name}!
        </p>
      </div>

      {/* Plan status — upgrade CTA for free users */}
      <PlanStatusCard
        plan={user?.plan ?? "FREE"}
        planExpiresAt={user?.planExpiresAt ?? null}
        locale={locale}
      />

      <StatsOverview
        lessonsCompleted={stats.lessonsCompleted}
        wordsReviewed={stats.wordsReviewed}
        currentStreak={stats.currentStreak}
        totalMinutes={stats.totalMinutes}
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Left column: continue learning + recent activity */}
        <div className="space-y-6">
          <ContinueLearning
            locale={locale}
            dueReviewCount={dueCount}
            nextLessonId={nextLesson?.id}
            nextLessonTitle={nextLesson?.title}
          />
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">{t("recentActivity")}</CardTitle>
            </CardHeader>
            <CardContent>
              <RecentActivity
                quizAttempts={activity.quizAttempts}
                reviews={activity.reviews}
              />
            </CardContent>
          </Card>
        </div>

        {/* Right column: streak calendar + daily goal + HSK progress */}
        <div className="space-y-6">
          <Card>
            <CardContent className="space-y-6 pt-4">
              <StreakCalendar streakData={streakCalendar} title={t("streakCalendar")} />
              <DailyGoalRing
                minutesStudied={todayMinutes}
                goalMinutes={dailyGoal}
                title={t("dailyGoal")}
              />
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-4">
              <HskProgress progressByLevel={hskProgress} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
