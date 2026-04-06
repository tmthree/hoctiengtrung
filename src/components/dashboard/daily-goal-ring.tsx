"use client";
// Client Component — SVG circular progress ring for daily study goal
interface DailyGoalRingProps {
  minutesStudied: number;
  goalMinutes: number;
  title?: string;
}

const RADIUS = 40;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export function DailyGoalRing({
  minutesStudied,
  goalMinutes,
  title = "Mục tiêu hôm nay",
}: DailyGoalRingProps) {
  const pct = goalMinutes > 0 ? Math.min(minutesStudied / goalMinutes, 1) : 0;
  const dashOffset = CIRCUMFERENCE * (1 - pct);
  const reached = pct >= 1;
  const strokeColor = reached ? "#16a34a" : "hsl(var(--primary))";
  const displayPct = Math.round(pct * 100);

  return (
    <div className="space-y-2">
      <p className="text-sm font-medium text-foreground">{title}</p>
      <div className="flex items-center gap-4">
        <svg width="100" height="100" viewBox="0 0 100 100" className="shrink-0">
          {/* Background track */}
          <circle
            cx="50"
            cy="50"
            r={RADIUS}
            fill="none"
            stroke="hsl(var(--muted))"
            strokeWidth="10"
          />
          {/* Progress arc — starts at top (rotate -90deg) */}
          <circle
            cx="50"
            cy="50"
            r={RADIUS}
            fill="none"
            stroke={strokeColor}
            strokeWidth="10"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={dashOffset}
            strokeLinecap="round"
            transform="rotate(-90 50 50)"
            style={{ transition: "stroke-dashoffset 0.5s ease" }}
          />
          <text
            x="50"
            y="55"
            textAnchor="middle"
            fontSize="16"
            fontWeight="bold"
            fill={strokeColor}
          >
            {displayPct}%
          </text>
        </svg>
        <div className="space-y-1 text-sm">
          <p className="text-muted-foreground">
            <span className="font-semibold text-foreground">{minutesStudied}</span> / {goalMinutes} phút
          </p>
          {reached && (
            <p className="text-xs font-medium text-green-600">Hoàn thành mục tiêu!</p>
          )}
        </div>
      </div>
    </div>
  );
}
