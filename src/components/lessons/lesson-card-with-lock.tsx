// Lesson card that shows a premium lock overlay for HSK 2+ when user is FREE
import Link from "next/link";
import { BookOpen, MessageCircle, FileText, Globe, Briefcase } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { getHskLevel } from "@/lib/constants/hsk-levels";
import { PremiumBadge } from "@/components/shared/premium-badge";
import type { Lesson } from "@prisma/client";

const lessonTypeMap = {
  GRAMMAR: { icon: BookOpen, label: "Ngữ pháp" },
  CONVERSATION: { icon: MessageCircle, label: "Hội thoại" },
  READING: { icon: FileText, label: "Đọc hiểu" },
  CULTURE: { icon: Globe, label: "Văn hoá" },
  BUSINESS: { icon: Briefcase, label: "Thương mại" },
} as const;

interface LessonCardWithLockProps {
  lesson: Lesson;
  locale: string;
  isLocked: boolean;
}

export function LessonCardWithLock({ lesson, locale, isLocked }: LessonCardWithLockProps) {
  const hsk = getHskLevel(lesson.hskLevel);
  const typeInfo = lessonTypeMap[lesson.type] ?? lessonTypeMap.GRAMMAR;
  const TypeIcon = typeInfo.icon;

  const cardContent = (
    <Card className="relative h-full transition-shadow group-hover:shadow-md">
      {isLocked && <PremiumBadge overlay />}
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-2">
          <Badge
            variant="secondary"
            className={`${hsk.bgColor} ${hsk.color} border ${hsk.borderColor} text-xs font-semibold`}
          >
            {hsk.label}
          </Badge>
          <div className="flex items-center gap-1.5 shrink-0">
            {isLocked && <PremiumBadge />}
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <TypeIcon className="h-3.5 w-3.5" />
              {typeInfo.label}
            </span>
          </div>
        </div>
        <h3 className="font-semibold text-foreground leading-snug mt-2 line-clamp-2">
          {lesson.title}
        </h3>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground line-clamp-2">{lesson.description}</p>
      </CardContent>
    </Card>
  );

  if (isLocked) {
    return (
      <Link href={`/${locale}/pricing`} className="group block">
        {cardContent}
      </Link>
    );
  }

  return (
    <Link href={`/${locale}/lessons/${lesson.id}`} className="group block">
      {cardContent}
    </Link>
  );
}
