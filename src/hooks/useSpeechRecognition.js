import { useCallback, useEffect, useRef, useState } from "react";
import { scoreAnswer } from "../utils/match";

const SpeechRecognitionCtor =
  typeof window !== "undefined" && (window.SpeechRecognition || window.webkitSpeechRecognition);

// Hard ceiling regardless of restarts, so the mic can never appear to hang forever.
const MAX_LISTEN_MS = 15000;

export function useSpeechRecognition({ onFinalResult, onInterim, onNoResult, onError }) {
  const supported = !!SpeechRecognitionCtor;
  const recognitionRef = useRef(null);
  const [listening, setListening] = useState(false);
  const expectedRef = useRef("");
  const gotUsableResultRef = useRef(false);
  const wantListeningRef = useRef(false); // true from tap-to-start until the user (or a real
  // result/error/timeout) stops it — distinct from the raw browser session, which the engine
  // can end on its own well before the user is actually done.
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (!supported) return;
    const recognition = new SpeechRecognitionCtor();
    recognition.lang = "fr-CA";
    recognition.interimResults = true;
    recognition.maxAlternatives = 3;
    recognition.continuous = true;

    recognition.onresult = (event) => {
      let finalText = "";
      let bestAlt = "";
      let bestScore = -1;
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const res = event.results[i];
        if (res.isFinal) {
          for (let a = 0; a < res.length; a++) {
            const alt = res[a].transcript.trim();
            if (!alt) continue; // a low-confidence "blip" can produce an empty transcript —
            // that's not a usable result, and shouldn't be treated as one.
            const s = scoreAnswer(alt, expectedRef.current);
            if (s > bestScore) {
              bestScore = s;
              bestAlt = alt;
            }
          }
          if (bestAlt) finalText = bestAlt;
        } else if (res[0].transcript.trim()) {
          gotUsableResultRef.current = true;
          if (onInterim) onInterim(res[0].transcript);
        }
      }
      if (finalText) {
        gotUsableResultRef.current = true;
        wantListeningRef.current = false;
        clearTimeout(timeoutRef.current);
        if (onFinalResult) onFinalResult(finalText);
        try {
          recognition.stop();
        } catch (e) {}
      }
    };

    recognition.onerror = (event) => {
      // "no-speech" specifically means the engine gave up waiting, not that the user is
      // done — if they haven't tapped stop and haven't said anything usable yet, keep going
      // instead of surfacing this as a failure.
      if (event.error === "no-speech" && wantListeningRef.current && !gotUsableResultRef.current) {
        try {
          recognition.start();
        } catch (e) {}
        return;
      }
      wantListeningRef.current = false;
      clearTimeout(timeoutRef.current);
      setListening(false);
      if (onError) onError(event.error);
    };

    recognition.onend = () => {
      // The engine can end a session on its own (e.g. after the same no-speech condition,
      // depending on browser) without ever routing through onerror — auto-restart here too
      // under the same conditions, so this doesn't silently drop the user's turn.
      if (wantListeningRef.current && !gotUsableResultRef.current) {
        try {
          recognition.start();
          return;
        } catch (e) {
          /* fall through to a real stop if restarting itself fails */
        }
      }
      clearTimeout(timeoutRef.current);
      setListening(false);
      if (wantListeningRef.current && !gotUsableResultRef.current && onNoResult) onNoResult();
      wantListeningRef.current = false;
    };

    recognitionRef.current = recognition;
    return () => {
      clearTimeout(timeoutRef.current);
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
      gotUsableResultRef.current = false;
      wantListeningRef.current = true;
      setListening(true);
      try {
        recognitionRef.current.start();
        timeoutRef.current = setTimeout(() => {
          wantListeningRef.current = false;
          try {
            recognitionRef.current.stop();
          } catch (e) {}
        }, MAX_LISTEN_MS);
      } catch (e) {
        /* already started */
      }
    },
    [supported, listening]
  );

  const stop = useCallback(() => {
    if (!supported) return;
    wantListeningRef.current = false;
    clearTimeout(timeoutRef.current);
    try {
      recognitionRef.current.stop();
    } catch (e) {}
    setListening(false);
  }, [supported]);

  return { supported, listening, start, stop };
}
