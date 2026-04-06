// Server Component — card displaying a lesson summary with HSK badge
import Link from "next/link";
import { BookOpen, MessageCircle, FileText, Globe, Briefcase } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { getHskLevel } from "@/lib/constants/hsk-levels";
import type { Lesson } from "@prisma/client";

// Map LessonType enum values to icons and Vietnamese labels
const lessonTypeMap = {
  GRAMMAR: { icon: BookOpen, label: "Ngữ pháp" },
  CONVERSATION: { icon: MessageCircle, label: "Hội thoại" },
  READING: { icon: FileText, label: "Đọc hiểu" },
  CULTURE: { icon: Globe, label: "Văn hoá" },
  BUSINESS: { icon: Briefcase, label: "Thương mại" },
} as const;

interface LessonCardProps {
  lesson: Lesson;
  locale: string;
}

export function LessonCard({ lesson, locale }: LessonCardProps) {
  const hsk = getHskLevel(lesson.hskLevel);
  const typeInfo = lessonTypeMap[lesson.type] ?? lessonTypeMap.GRAMMAR;
  const TypeIcon = typeInfo.icon;

  return (
    <Link href={`/${locale}/lessons/${lesson.id}`} className="group block">
      <Card className="h-full transition-shadow group-hover:shadow-md">
        <CardHeader className="pb-2">
          <div className="flex items-start justify-between gap-2">
            <Badge
              variant="secondary"
              className={`${hsk.bgColor} ${hsk.color} border ${hsk.borderColor} text-xs font-semibold`}
            >
              {hsk.label}
            </Badge>
            <span className="flex items-center gap-1 text-xs text-muted-foreground shrink-0">
              <TypeIcon className="h-3.5 w-3.5" />
              {typeInfo.label}
            </span>
          </div>
          <h3 className="font-semibold text-foreground leading-snug mt-2 line-clamp-2">
            {lesson.title}
          </h3>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {lesson.description}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}
