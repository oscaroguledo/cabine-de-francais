import { useCallback, useEffect, useRef, useState } from "react";
import { scoreAnswer } from "../utils/match";

const SpeechRecognitionCtor =
  typeof window !== "undefined" && (window.SpeechRecognition || window.webkitSpeechRecognition);

export function useSpeechRecognition({ onFinalResult, onInterim, onError }) {
  const supported = !!SpeechRecognitionCtor;
  const recognitionRef = useRef(null);
  const [listening, setListening] = useState(false);
  const expectedRef = useRef("");

  useEffect(() => {
    if (!supported) return;
    const recognition = new SpeechRecognitionCtor();
    recognition.lang = "fr-CA";
    recognition.interimResults = true;
    recognition.maxAlternatives = 3;
    recognition.continuous = false;

    recognition.onresult = (event) => {
      let finalText = "";
      let bestAlt = "";
      let bestScore = -1;
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const res = event.results[i];
        if (res.isFinal) {
          for (let a = 0; a < res.length; a++) {
            const s = scoreAnswer(res[a].transcript, expectedRef.current);
            if (s > bestScore) {
              bestScore = s;
              bestAlt = res[a].transcript;
            }
          }
          finalText = bestAlt;
        } else if (onInterim) {
          onInterim(res[0].transcript);
        }
      }
      if (finalText && onFinalResult) onFinalResult(finalText);
    };

    recognition.onerror = (event) => {
      setListening(false);
      if (onError) onError(event.error);
    };

    recognition.onend = () => setListening(false);

    recognitionRef.current = recognition;
    return () => {
      recognition.onresult = null;
      recognition.onerror = null;
      recognition.onend = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [supported]);

  const start = useCallback(
    (expectedAnswer) => {
      if (!supported || listening) return;
      expectedRef.current = expectedAnswer;
      setListening(true);
      try {
        recognitionRef.current.start();
      } catch (e) {
        /* already started */
      }
    },
    [supported, listening]
  );

  const stop = useCallback(() => {
    if (!supported) return;
    try {
      recognitionRef.current.stop();
    } catch (e) {}
    setListening(false);
  }, [supported]);

  return { supported, listening, start, stop };
}
