// Reusable component to display a Chinese character with pinyin annotation above
// and optional meaning below. Uses HTML <ruby>/<rt> for accessible pinyin display.

interface ChineseTextProps {
  simplified: string;
  pinyin?: string;
  meaning?: string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

const sizeMap = {
  sm: "text-lg",
  md: "text-3xl",
  lg: "text-5xl",
  xl: "text-7xl",
} as const;

const pinyinSizeMap = {
  sm: "text-[10px]",
  md: "text-xs",
  lg: "text-sm",
  xl: "text-base",
} as const;

export function ChineseText({
  simplified,
  pinyin,
  meaning,
  size = "md",
  className = "",
}: ChineseTextProps) {
  return (
    <div className={`flex flex-col items-center gap-1 ${className}`}>
      {pinyin ? (
        <ruby className={`${sizeMap[size]} font-normal text-foreground`} style={{ fontFamily: "'Noto Sans SC', sans-serif" }}>
          {simplified}
          <rt className={`${pinyinSizeMap[size]} text-muted-foreground not-italic`}>
            {pinyin}
          </rt>
        </ruby>
      ) : (
        <span
          className={`${sizeMap[size]} font-normal text-foreground`}
          style={{ fontFamily: "'Noto Sans SC', sans-serif" }}
        >
          {simplified}
        </span>
      )}
      {meaning && (
        <span className="text-xs text-muted-foreground">{meaning}</span>
      )}
    </div>
  );
}
