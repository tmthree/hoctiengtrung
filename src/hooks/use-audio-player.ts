"use client";
// Audio playback hook — plays audioUrl with Web Speech API fallback for Chinese TTS
import { useCallback, useEffect, useRef, useState } from "react";

type AudioState = "idle" | "loading" | "playing" | "error";

interface UseAudioPlayerOptions {
  audioUrl?: string | null;
  text?: string;
  rate?: number;
}

export function useAudioPlayer({ audioUrl, text, rate = 1 }: UseAudioPlayerOptions = {}) {
  const [state, setState] = useState<AudioState>("idle");
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      audioRef.current?.pause();
      if (utteranceRef.current) window.speechSynthesis?.cancel();
    };
  }, []);

  const stop = useCallback(() => {
    audioRef.current?.pause();
    if (audioRef.current) audioRef.current.currentTime = 0;
    window.speechSynthesis?.cancel();
    setState("idle");
  }, []);

  const playWithSpeechSynthesis = useCallback(
    (spokenText: string) => {
      if (!window.speechSynthesis) {
        setState("error");
        return;
      }
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(spokenText);
      utterance.lang = "zh-CN";
      utterance.rate = rate;
      utterance.onstart = () => setState("playing");
      utterance.onend = () => setState("idle");
      utterance.onerror = () => setState("error");
      utteranceRef.current = utterance;
      window.speechSynthesis.speak(utterance);
    },
    [rate],
  );

  const play = useCallback(
    (overrideText?: string) => {
      const spokenText = overrideText || text;

      // If already playing, stop first
      if (state === "playing") {
        stop();
        return;
      }

      // Try audioUrl first
      if (audioUrl) {
        setState("loading");
        const audio = new Audio(audioUrl);
        audioRef.current = audio;
        audio.oncanplay = () => {
          audio.play().catch(() => {
            // Fallback to speech synthesis if audio play fails
            if (spokenText) playWithSpeechSynthesis(spokenText);
            else setState("error");
          });
        };
        audio.onplay = () => setState("playing");
        audio.onended = () => setState("idle");
        audio.onerror = () => {
          // Fallback to speech synthesis
          if (spokenText) playWithSpeechSynthesis(spokenText);
          else setState("error");
        };
        audio.load();
        return;
      }

      // No audioUrl — use speech synthesis directly
      if (spokenText) {
        playWithSpeechSynthesis(spokenText);
        return;
      }

      setState("error");
    },
    [audioUrl, text, state, stop, playWithSpeechSynthesis],
  );

  return {
    play,
    stop,
    isPlaying: state === "playing",
    isLoading: state === "loading",
    state,
  };
}
