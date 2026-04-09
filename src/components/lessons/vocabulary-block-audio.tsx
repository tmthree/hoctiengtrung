"use client";
// Thin client wrapper — audio play button for vocabulary blocks in lesson content
import { AudioPlayButton } from "@/components/shared/audio-play-button";

interface VocabularyBlockAudioProps {
  text: string;
}

export function VocabularyBlockAudio({ text }: VocabularyBlockAudioProps) {
  return <AudioPlayButton text={text} size="sm" />;
}
