import { useCallback, useEffect, useRef, useState } from "react";
import { scoreAnswer } from "../utils/match";

const SpeechRecognitionCtor =
  typeof window !== "undefined" && (window.SpeechRecognition || window.webkitSpeechRecognition);

// Safety net: if the browser never naturally ends the session (rare, but
// happens), force a stop so the mic doesn't appear to hang forever.
const MAX_LISTEN_MS = 12000;

export function useSpeechRecognition({ onFinalResult, onInterim, onNoResult, onError }) {
  const supported = !!SpeechRecognitionCtor;
  const recognitionRef = useRef(null);
  const [listening, setListening] = useState(false);
  const expectedRef = useRef("");
  const gotResultRef = useRef(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (!supported) return;
    const recognition = new SpeechRecognitionCtor();
    recognition.lang = "fr-CA";
    recognition.interimResults = true;
    recognition.maxAlternatives = 3;
    // continuous:true + explicit tap-to-stop, rather than continuous:false +
    // hold-to-talk — letting the recognizer's own silence-detection decide
    // when you're "done" (continuous:false) races against how long a user
    // actually takes to speak, and a session can end with no result at all
    // if that race is lost. continuous:true waits for an explicit stop.
    recognition.continuous = true;

    recognition.onresult = (event) => {
      let finalText = "";
      let bestAlt = "";
      let bestScore = -1;
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const res = event.results[i];
        if (res.isFinal) {
          gotResultRef.current = true;
          for (let a = 0; a < res.length; a++) {
            const s = scoreAnswer(res[a].transcript, expectedRef.current);
            if (s > bestScore) {
              bestScore = s;
              bestAlt = res[a].transcript;
            }
          }
          finalText = bestAlt;
        } else if (onInterim) {
          gotResultRef.current = true;
          onInterim(res[0].transcript);
        }
      }
      if (finalText && onFinalResult) {
        onFinalResult(finalText);
        stopInternal();
      }
    };

    recognition.onerror = (event) => {
      clearTimeout(timeoutRef.current);
      setListening(false);
      if (onError) onError(event.error);
    };

    recognition.onend = () => {
      clearTimeout(timeoutRef.current);
      setListening(false);
      // The browser stopped listening without ever giving us a usable
      // result — distinguish this explicitly rather than going silent,
      // since it's a completely different situation from "not supported"
      // or a hard error.
      if (!gotResultRef.current && onNoResult) onNoResult();
    };

    function stopInternal() {
      try {
        recognition.stop();
      } catch (e) {}
    }

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
      gotResultRef.current = false;
      setListening(true);
      try {
        recognitionRef.current.start();
        timeoutRef.current = setTimeout(() => {
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
    clearTimeout(timeoutRef.current);
    try {
      recognitionRef.current.stop();
    } catch (e) {}
    // onend will fire asynchronously and flip `listening` off; setting it
    // here too keeps the UI responsive to an immediate manual stop tap.
    setListening(false);
  }, [supported]);

  return { supported, listening, start, stop };
}
