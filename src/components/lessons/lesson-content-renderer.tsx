// Server Component — renders lesson content JSON blocks into React elements
import { ChineseText } from "@/components/shared/chinese-text";
import { VocabularyBlockAudio } from "./vocabulary-block-audio";
import type { LessonContentBlock } from "@/types/lesson";

interface LessonContentRendererProps {
  content: LessonContentBlock[];
}

export function LessonContentRenderer({ content }: LessonContentRendererProps) {
  if (!content || content.length === 0) {
    return (
      <p className="text-muted-foreground italic text-sm">
        Nội dung bài học chưa có.
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {content.map((block, index) => {
        if (block.type === "text") {
          return (
            <p key={index} className="text-foreground leading-relaxed">
              {block.content}
            </p>
          );
        }

        if (block.type === "vocabulary") {
          return (
            <span key={index} className="inline-flex items-center gap-0.5 mx-2 my-1">
              <ChineseText
                simplified={block.simplified}
                pinyin={block.pinyin}
                meaning={block.meaning}
                size="sm"
              />
              <VocabularyBlockAudio text={block.simplified} />
            </span>
          );
        }

        if (block.type === "grammar") {
          return (
            <div
              key={index}
              className="rounded-lg border border-blue-200 bg-blue-50 p-4 space-y-2"
            >
              <h4 className="font-semibold text-blue-900 text-sm">{block.title}</h4>
              <p className="text-sm text-blue-800">{block.explanation}</p>
              {block.examples.length > 0 && (
                <ul className="space-y-1 mt-2">
                  {block.examples.map((ex, i) => (
                    <li
                      key={i}
                      className="text-sm text-blue-700 font-chinese"
                    >
                      · {ex}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          );
        }

        return null;
      })}
    </div>
  );
}
