// Server Component — card showing a vocabulary word with character, pinyin, meaning
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { getHskLevel } from "@/lib/constants/hsk-levels";
import type { Vocabulary } from "@prisma/client";

interface VocabularyCardProps {
  word: Vocabulary;
  locale: string;
}

export function VocabularyCard({ word, locale }: VocabularyCardProps) {
  const hsk = getHskLevel(word.hskLevel);

  return (
    <Link href={`/${locale}/vocabulary/${word.id}`} className="group block">
      <Card className="h-full transition-shadow group-hover:shadow-md">
        <CardContent className="pt-4 pb-4 flex flex-col items-center gap-2 text-center">
          <span
            className="text-4xl font-normal text-foreground leading-none"
            style={{ fontFamily: "'Noto Sans SC', sans-serif" }}
          >
            {word.simplified}
          </span>
          <span className="text-sm text-muted-foreground">{word.pinyin}</span>
          <span className="text-sm text-foreground font-medium line-clamp-2">
            {word.meaning}
          </span>
          <Badge
            variant="secondary"
            className={`${hsk.bgColor} ${hsk.color} border ${hsk.borderColor} text-xs mt-1`}
          >
            {hsk.label}
          </Badge>
        </CardContent>
      </Card>
    </Link>
  );
}
