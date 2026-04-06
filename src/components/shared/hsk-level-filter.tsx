"use client";

// Tab-based filter for HSK levels — updates URL searchParams on click
import { useRouter, useSearchParams } from "next/navigation";
import { hskLevels } from "@/lib/constants/hsk-levels";
import { cn } from "@/lib/utils";

export function HskLevelFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeLevel = searchParams.get("hskLevel");

  function handleSelect(level: string | null) {
    const params = new URLSearchParams(searchParams.toString());
    if (level) {
      params.set("hskLevel", level);
    } else {
      params.delete("hskLevel");
    }
    // Reset to page 1 when filter changes
    params.delete("page");
    router.push(`?${params.toString()}`);
  }

  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => handleSelect(null)}
        className={cn(
          "px-3 py-1.5 rounded-full text-sm font-medium border transition-colors",
          !activeLevel
            ? "bg-foreground text-background border-foreground"
            : "bg-background text-muted-foreground border-border hover:border-foreground hover:text-foreground"
        )}
      >
        Tất cả
      </button>
      {hskLevels.map((h) => (
        <button
          key={h.level}
          onClick={() => handleSelect(String(h.level))}
          className={cn(
            "px-3 py-1.5 rounded-full text-sm font-medium border transition-colors",
            activeLevel === String(h.level)
              ? `${h.bgColor} ${h.color} ${h.borderColor}`
              : "bg-background text-muted-foreground border-border hover:border-foreground hover:text-foreground"
          )}
        >
          {h.label}
        </button>
      ))}
    </div>
  );
}
