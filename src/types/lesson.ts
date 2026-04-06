// Types for structured lesson content blocks stored as JSON in Lesson.content
export interface TextBlock {
  type: "text";
  content: string;
}

export interface VocabularyHighlight {
  type: "vocabulary";
  simplified: string;
  pinyin: string;
  meaning: string;
}

export interface GrammarNote {
  type: "grammar";
  title: string;
  explanation: string;
  examples: string[];
}

export type LessonContentBlock = TextBlock | VocabularyHighlight | GrammarNote;
