// Server Component — full word detail: large character, pinyin, meaning, example, stroke order placeholder
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getHskLevel } from "@/lib/constants/hsk-levels";
import type { Vocabulary } from "@prisma/client";

interface WordDetailProps {
  word: Vocabulary;
}

export function WordDetail({ word }: WordDetailProps) {
  const hsk = getHskLevel(word.hskLevel);

  return (
    <div className="space-y-6">
      {/* Main character display */}
      <div className="flex flex-col items-center gap-3 py-8">
        <span
          className="text-7xl font-normal text-foreground leading-none"
          style={{ fontFamily: "'Noto Sans SC', sans-serif" }}
        >
          {word.simplified}
        </span>
        {word.traditional && word.traditional !== word.simplified && (
          <span className="text-2xl text-muted-foreground" style={{ fontFamily: "'Noto Sans SC', sans-serif" }}>
            {word.traditional}
          </span>
        )}
        <span className="text-2xl text-muted-foreground">{word.pinyin}</span>
        <span className="text-xl text-foreground font-medium">{word.meaning}</span>
        <Badge
          variant="secondary"
          className={`${hsk.bgColor} ${hsk.color} border ${hsk.borderColor}`}
        >
          {hsk.label} · {hsk.labelVi}
        </Badge>
      </div>

      {/* Example sentence */}
      {word.exampleSentence && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Ví dụ</CardTitle>
          </CardHeader>
          <CardContent className="space-y-1">
            <p
              className="text-lg text-foreground"
              style={{ fontFamily: "'Noto Sans SC', sans-serif" }}
            >
              {word.exampleSentence}
            </p>
            {word.examplePinyin && (
              <p className="text-sm text-muted-foreground">{word.examplePinyin}</p>
            )}
            {word.exampleMeaning && (
              <p className="text-sm text-foreground">{word.exampleMeaning}</p>
            )}
          </CardContent>
        </Card>
      )}

      {/* Stroke order placeholder */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Thứ tự nét</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground italic">Sắp có</p>
        </CardContent>
      </Card>
    </div>
  );
}
