// Server Component — full word detail with audio buttons, example sentence, stroke order
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AudioPlayButton } from "@/components/shared/audio-play-button";
import { StrokeOrderViewer } from "@/components/shared/stroke-order-viewer";
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
        <div className="flex items-center gap-2">
          <span className="text-7xl font-normal text-foreground leading-none font-chinese">
            {word.simplified}
          </span>
          <AudioPlayButton
            audioUrl={word.audioUrl}
            text={word.simplified}
            size="lg"
          />
        </div>
        {word.traditional && word.traditional !== word.simplified && (
          <span className="text-2xl text-muted-foreground font-chinese">
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
            <div className="flex items-start gap-2">
              <p className="text-lg text-foreground font-chinese">
                {word.exampleSentence}
              </p>
              <AudioPlayButton
                audioUrl={null}
                text={word.exampleSentence}
                size="sm"
              />
            </div>
            {word.examplePinyin && (
              <p className="text-sm text-muted-foreground">{word.examplePinyin}</p>
            )}
            {word.exampleMeaning && (
              <p className="text-sm text-foreground">{word.exampleMeaning}</p>
            )}
          </CardContent>
        </Card>
      )}

      {/* Stroke order */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Thứ tự nét</CardTitle>
        </CardHeader>
        <CardContent>
          <StrokeOrderViewer character={word.simplified} />
        </CardContent>
      </Card>
    </div>
  );
}
