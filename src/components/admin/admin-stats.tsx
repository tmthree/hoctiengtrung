// Admin dashboard stat cards — Server Component
import { getAdminStats } from "@/lib/queries/admin";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, BookOpen, BookMarked, Activity } from "lucide-react";

export async function AdminStats() {
  const stats = await getAdminStats();

  const cards = [
    {
      title: "Tổng người dùng",
      value: stats.totalUsers,
      icon: Users,
      color: "text-blue-600",
    },
    {
      title: "Tổng bài học",
      value: stats.totalLessons,
      icon: BookOpen,
      color: "text-green-600",
    },
    {
      title: "Tổng từ vựng",
      value: stats.totalVocabulary,
      icon: BookMarked,
      color: "text-purple-600",
    },
    {
      title: "Hoạt động hôm nay",
      value: stats.todayActiveUsers,
      icon: Activity,
      color: "text-orange-600",
    },
  ];

  return (
    <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <Card key={card.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {card.title}
              </CardTitle>
              <Icon className={`h-4 w-4 ${card.color}`} />
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{card.value.toLocaleString()}</p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
