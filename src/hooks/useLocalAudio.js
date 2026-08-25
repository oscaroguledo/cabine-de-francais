import { useCallback, useRef } from "react";
import audioManifest from "../data/audioManifest.json";
import { useSpeechSynthesis } from "./useSpeechSynthesis";

/**
 * Plays a pre-rendered Amélie (Canadian French) clip for a given word number and
 * clip type ("word" | "ex1" | "ex2"). Falls back to live browser TTS if the file
 * is missing or fails to load, so the app degrades gracefully rather than going silent.
 */
export function useLocalAudio() {
  const audioRef = useRef(null);
  const { speak: speakTts } = useSpeechSynthesis();

  const play = useCallback(
    (wordNumber, clipType, fallbackText) => {
      const entry = audioManifest[String(wordNumber)];
      const relPath = entry && entry[clipType];
      if (!relPath) {
        if (fallbackText) speakTts(fallbackText);
        return;
      }
      if (audioRef.current) {
        audioRef.current.pause();
      }
      const audio = new Audio(`/audio/${relPath}`);
      audioRef.current = audio;
      audio.play().catch(() => {
        if (fallbackText) speakTts(fallbackText);
      });
    },
    [speakTts]
  );

  const hasClip = useCallback((wordNumber, clipType) => {
    const entry = audioManifest[String(wordNumber)];
    return !!(entry && entry[clipType]);
  }, []);

  return { play, hasClip };
}
