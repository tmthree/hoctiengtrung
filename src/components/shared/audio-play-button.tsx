"use client";
// Shared audio play button — plays Chinese TTS via audioUrl or Web Speech API fallback
import { Volume2, VolumeX, Loader2 } from "lucide-react";
import { useAudioPlayer } from "@/hooks/use-audio-player";

interface AudioPlayButtonProps {
  audioUrl?: string | null;
  text: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeClasses = {
  sm: "w-6 h-6 p-1",
  md: "w-8 h-8 p-1.5",
  lg: "w-10 h-10 p-2",
} as const;

const iconSizes = {
  sm: "w-3.5 h-3.5",
  md: "w-4 h-4",
  lg: "w-5 h-5",
} as const;

export function AudioPlayButton({ audioUrl, text, size = "md", className = "" }: AudioPlayButtonProps) {
  const { play, isPlaying, isLoading } = useAudioPlayer({ audioUrl, text });

  const Icon = isLoading ? Loader2 : isPlaying ? VolumeX : Volume2;

  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        play();
      }}
      disabled={isLoading}
      className={`inline-flex items-center justify-center rounded-full text-primary hover:bg-primary/10 transition-colors disabled:opacity-50 ${sizeClasses[size]} ${className}`}
      title="Phát âm"
      aria-label={`Phát âm: ${text}`}
    >
      <Icon className={`${iconSizes[size]} ${isLoading ? "animate-spin" : ""} ${isPlaying ? "animate-pulse" : ""}`} />
    </button>
  );
}
