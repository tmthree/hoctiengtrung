// Dashboard card: shows current plan with upgrade CTA for free users
import { Sparkles, Crown } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface PlanStatusCardProps {
  plan: string;
  planExpiresAt: Date | null;
  locale: string;
}

export function PlanStatusCard({ plan, planExpiresAt, locale }: PlanStatusCardProps) {
  const isPremium = plan === "PREMIUM";

  if (isPremium) {
    const expiryStr = planExpiresAt
      ? new Date(planExpiresAt).toLocaleDateString("vi-VN")
      : null;
    return (
      <Card className="border-amber-200 bg-gradient-to-r from-amber-50 to-orange-50 dark:border-amber-800 dark:from-amber-950/30 dark:to-orange-950/30">
        <CardContent className="flex items-center gap-3 pt-4">
          <Crown className="h-5 w-5 text-amber-500 shrink-0" />
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-amber-900 dark:text-amber-100">
                Gói Premium
              </span>
              <Badge className="bg-amber-500 text-white text-[10px]">ACTIVE</Badge>
            </div>
            {expiryStr && (
              <p className="text-xs text-amber-700 dark:text-amber-300">
                Hết hạn: {expiryStr}
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-dashed">
      <CardContent className="flex flex-col gap-3 pt-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <Sparkles className="h-5 w-5 text-muted-foreground shrink-0" />
          <div>
            <p className="font-medium text-foreground">Gói Miễn phí</p>
            <p className="text-xs text-muted-foreground">
              Chỉ HSK 1 · 10 thẻ/ngày · 3 bài kiểm tra/ngày
            </p>
          </div>
        </div>
        <Link href={`/${locale}/pricing`} className="shrink-0">
          <Button size="sm" className="w-full sm:w-auto bg-primary text-white hover:bg-primary/90">
            Nâng cấp Premium
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
