import { useCallback, useEffect, useRef } from "react";

export function useSpeechSynthesis() {
  const voiceRef = useRef(null);
  const supported = typeof window !== "undefined" && "speechSynthesis" in window;

  useEffect(() => {
    if (!supported) return;
    const pickVoice = () => {
      const voices = window.speechSynthesis.getVoices();
      voiceRef.current =
        voices.find((v) => v.lang === "fr-CA") ||
        voices.find((v) => v.lang && v.lang.startsWith("fr")) ||
        null;
    };
    pickVoice();
    window.speechSynthesis.onvoiceschanged = pickVoice;
    return () => {
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, [supported]);

  const speak = useCallback(
    (text) => {
      if (!supported) return;
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "fr-CA";
      if (voiceRef.current) utterance.voice = voiceRef.current;
      utterance.rate = 0.92;
      window.speechSynthesis.speak(utterance);
    },
    [supported]
  );

  return { speak, supported };
}
