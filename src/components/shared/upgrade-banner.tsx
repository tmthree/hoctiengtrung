// Client component — upgrade CTA banner shown to free users hitting a limit
"use client";
import { Sparkles } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";

interface UpgradeBannerProps {
  title?: string;
  description?: string;
  locale?: string;
}

export function UpgradeBanner({
  title = "Nâng cấp Premium",
  description = "Mở khóa tất cả bài học HSK 1-9, từ vựng và luyện tập không giới hạn.",
  locale,
}: UpgradeBannerProps) {
  const pricingHref = "/pricing";

  return (
    <div className="rounded-xl border border-amber-200 bg-gradient-to-r from-amber-50 to-orange-50 p-5 dark:border-amber-800 dark:from-amber-950/30 dark:to-orange-950/30">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-900">
            <Sparkles className="h-4 w-4 text-amber-600 dark:text-amber-400" />
          </div>
          <div>
            <p className="font-semibold text-amber-900 dark:text-amber-100">{title}</p>
            <p className="mt-0.5 text-sm text-amber-700 dark:text-amber-300">{description}</p>
          </div>
        </div>
        <Link href={pricingHref} className="shrink-0">
          <Button
            size="sm"
            className="w-full bg-amber-500 text-white hover:bg-amber-600 sm:w-auto dark:bg-amber-600 dark:hover:bg-amber-700"
          >
            Xem gói Premium
          </Button>
        </Link>
      </div>
    </div>
  );
}
