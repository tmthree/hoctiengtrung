// Small badge/lock overlay marking premium-only content
import { Lock } from "lucide-react";

interface PremiumBadgeProps {
  /** If true, render as a full overlay on the parent (parent must be relative) */
  overlay?: boolean;
}

export function PremiumBadge({ overlay = false }: PremiumBadgeProps) {
  if (overlay) {
    return (
      <div className="absolute inset-0 z-10 flex items-center justify-center rounded-lg bg-black/40 backdrop-blur-[2px]">
        <div className="flex items-center gap-1.5 rounded-full bg-amber-500 px-3 py-1.5 text-xs font-semibold text-white shadow-md">
          <Lock className="h-3.5 w-3.5" />
          Premium
        </div>
      </div>
    );
  }

  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-semibold text-amber-700 dark:bg-amber-900 dark:text-amber-300">
      <Lock className="h-2.5 w-2.5" />
      Premium
    </span>
  );
}
