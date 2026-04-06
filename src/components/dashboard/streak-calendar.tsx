"use client";
// Client Component — 30-day calendar grid showing study activity per day
import { useMemo } from "react";

interface StreakDay {
  date: Date;
  minutesStudied: number;
}

interface StreakCalendarProps {
  streakData: StreakDay[];
  title?: string;
}

const DAY_LABELS = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];

export function StreakCalendar({ streakData, title = "Lịch học" }: StreakCalendarProps) {
  const calendarDays = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Build a map of date string -> minutes
    const activityMap = new Map<string, number>();
    for (const day of streakData) {
      const d = new Date(day.date);
      d.setHours(0, 0, 0, 0);
      activityMap.set(d.toISOString(), day.minutesStudied);
    }

    // Build 30-day array from 29 days ago to today
    const days = [];
    for (let i = 29; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      date.setHours(0, 0, 0, 0);
      const minutes = activityMap.get(date.toISOString()) ?? 0;
      days.push({ date, minutes, isToday: i === 0 });
    }
    return days;
  }, [streakData]);

  // Determine padding before first day so week grid aligns
  const firstDow = calendarDays[0]?.date.getDay() ?? 0; // 0=Sun

  return (
    <div className="space-y-2">
      <p className="text-sm font-medium text-foreground">{title}</p>
      {/* Day-of-week headers */}
      <div className="grid grid-cols-7 gap-1">
        {DAY_LABELS.map((label) => (
          <div key={label} className="text-center text-[10px] text-muted-foreground">
            {label}
          </div>
        ))}
      </div>
      {/* Day squares — padded to align with correct weekday column */}
      <div className="grid grid-cols-7 gap-1">
        {Array.from({ length: firstDow }).map((_, i) => (
          <div key={`pad-${i}`} />
        ))}
        {calendarDays.map((day) => (
          <div
            key={day.date.toISOString()}
            title={day.minutes > 0 ? `${day.minutes} phút` : "Không học"}
            className={[
              "h-5 w-full rounded-sm transition-colors",
              day.isToday ? "ring-2 ring-primary ring-offset-1" : "",
              day.minutes > 0
                ? "bg-primary opacity-80"
                : "bg-muted",
            ].join(" ")}
          />
        ))}
      </div>
      <p className="text-right text-[10px] text-muted-foreground">30 ngày gần đây</p>
    </div>
  );
}
