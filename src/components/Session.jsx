import { useEffect, useMemo, useRef, useState } from "react";
import Waveform from "./Waveform";
import { useWhisperRecognition } from "../hooks/useWhisperRecognition";
import { useLocalAudio } from "../hooks/useLocalAudio";
import { scoreAnswer } from "../utils/match";

function pickPair(word) {
  const useExample = word.ex.length && Math.random() < 0.35;
  if (useExample) {
    const exIdx = Math.floor(Math.random() * word.ex.length);
    const ex = word.ex[exIdx];
    return { n: word.n, en: ex[0], fr: ex[1], isSentence: true, clipType: `ex${exIdx + 1}` };
  }
  return { n: word.n, en: word.en, fr: word.fr, isSentence: false, clipType: "word" };
}

export default function Session({ items, mode, recordAnswer, reportStreak, onSkipItem, onFinish, onBack }) {
  const { play: playClip } = useLocalAudio();
  const [idx, setIdx] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [streak, setStreak] = useState(0);
  const [current, setCurrent] = useState(() => pickPair(items[0]));
  const [heardText, setHeardText] = useState("");
  const [interimText, setInterimText] = useState("");
  const [verdict, setVerdict] = useState(null); // null | "good" | "bad"
  const [typedValue, setTypedValue] = useState("");
  const [micNotice, setMicNotice] = useState("");
  const missedRef = useRef([]);

  const recognition = useWhisperRecognition({
    onFinalResult: (text) => {
      setHeardText(text);
      setInterimText("");
      judge(text);
    },
    onNoResult: () => {
      setMicNotice("Didn't catch a clear answer — tap the mic and try again, speaking right after you tap.");
    },
    onError: (err) => {
      if (err === "not-allowed") {
        setMicNotice("Microphone access was blocked — allow it in your browser to speak your answers, or type instead below.");
      } else if (err === "model-loading") {
        setMicNotice("Still finishing the one-time speech model download — try again in a few seconds.");
      } else {
        setMicNotice(`Speech recognition hit an error (${err}) — try again, or type your answer below.`);
      }
    },
  });

  useEffect(() => {
    if (!recognition.supported) {
      setMicNotice("Your browser doesn't support the microphone/audio APIs this needs — typing mode is active instead.");
    } else {
      // Start the one-time model download as soon as the booth opens, so
      // it's likely ready by the time the learner actually taps the mic.
      recognition.preload();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recognition.supported]);

  useEffect(() => {
    const w = items[idx];
    const pair = pickPair(w);
    setCurrent(pair);
    setHeardText("");
    setInterimText("");
    setVerdict(null);
    setTypedValue("");
    if (mode === "repeat") {
      const t = setTimeout(() => playClip(pair.n, pair.clipType, pair.fr), 250);
      return () => clearTimeout(t);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idx, items]);

  function judge(spokenText) {
    const score = scoreAnswer(spokenText, current.fr);
    const isGood = score >= (current.isSentence ? 0.62 : 0.75);
    setVerdict(isGood ? "good" : "bad");
    recordAnswer(current.n, isGood, score);
    if (isGood) {
      setCorrectCount((c) => c + 1);
      setStreak((s) => {
        const next = s + 1;
        reportStreak(next);
        return next;
      });
    } else {
      setStreak(0);
      missedRef.current.push(current);
    }
  }

  function handleTypeSubmit() {
    const val = typedValue.trim();
    if (!val) return;
    setHeardText(val);
    judge(val);
  }

  function goNext() {
    if (idx + 1 >= items.length) {
      onFinish({ total: items.length, correctCount: verdict ? correctCount : correctCount, missed: missedRef.current });
    } else {
      setIdx((i) => i + 1);
    }
  }

  function handleSkip() {
    missedRef.current.push(current);
    onSkipItem?.(current);
    if (idx + 1 >= items.length) {
      onFinish({ total: items.length, correctCount, missed: missedRef.current });
    } else {
      setIdx((i) => i + 1);
    }
  }

  const progressPct = useMemo(() => (100 * idx) / items.length, [idx, items.length]);

  return (
    <div className="session active">
      <div className="session-head">
        <button className="back-btn" onClick={onBack}>
          ← Chapters
        </button>
        <div className="progress-track">
          <i style={{ width: `${progressPct}%` }} />
        </div>
        <div className="streak mono">
          <b>{correctCount}</b>/{items.length}
        </div>
      </div>

      <div className="booth">
        <div className="prompt-label">
          {mode === "translate"
            ? current.isSentence
              ? "Say this sentence in French"
              : "Say this in French"
            : "Listen, then repeat it back"}
        </div>
        <div className={`prompt-text${mode === "repeat" ? " fr" : ""}`}>
          {mode === "translate" ? current.en : "( tap “Hear it” )"}
        </div>
        <button className="hear-btn" onClick={() => playClip(current.n, current.clipType, current.fr)}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M11 5 6 9H2v6h4l5 4V5Z" />
            <path d="M15.5 8.5a5 5 0 0 1 0 7" />
          </svg>
          Hear it
        </button>

        <div className="mic-wrap">
          <div className="mic-ring">
            <Waveform active={recognition.listening} />
            <button
              className="mic-btn"
              data-state={
                !recognition.supported || recognition.processing || recognition.modelState !== "ready"
                  ? "disabled"
                  : recognition.listening
                  ? "listening"
                  : "idle"
              }
              aria-label={recognition.listening ? "Stop and check my answer" : "Tap to speak"}
              onClick={() => {
                if (recognition.listening) {
                  recognition.stop();
                } else {
                  setMicNotice("");
                  setHeardText("");
                  recognition.start();
                }
              }}
              disabled={!recognition.supported || recognition.processing || recognition.modelState !== "ready"}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M12 2a3 3 0 0 0-3 3v6a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
                <path d="M19 10v1a7 7 0 0 1-14 0v-1" />
                <path d="M12 18v4" />
                <path d="M8 22h8" />
              </svg>
            </button>
          </div>
          <div className="mic-caption">
            {recognition.listening
              ? "Listening — tap the mic again when you're done"
              : recognition.processing
              ? "Transcribing…"
              : recognition.modelState === "ready"
              ? mode === "translate"
                ? "Tap the mic, then say it in French"
                : "Play it, then tap the mic and repeat what you heard"
              : recognition.modelState === "error"
              ? "Speech model failed to load — type your answer below instead."
              : recognition.modelProgress > 0
              ? `Loading the speech model — one-time download, ${recognition.modelProgress}%…`
              : "Preparing speech recognition…"}
          </div>
          <div className="heard mono">
            {interimText ? (
              <>
                <b>{interimText}</b>…
              </>
            ) : heardText ? (
              <>
                You said: <b>{heardText}</b>
              </>
            ) : null}
          </div>
        </div>

        {!recognition.supported && (
          <div className="type-fallback show">
            <input
              type="text"
              placeholder="Type the French answer…"
              value={typedValue}
              onChange={(e) => setTypedValue(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleTypeSubmit()}
              autoComplete="off"
            />
            <button onClick={handleTypeSubmit}>Check</button>
          </div>
        )}

        {verdict && (
          <div className={`feedback show ${verdict}`}>
            <div className="verdict">{verdict === "good" ? "Bien joué — that's right." : "Not quite."}</div>
            <div className="answer">
              Correct: <i>{current.fr}</i>
            </div>
          </div>
        )}
      </div>

      <div className="session-controls">
        <button className="ctrl-btn" onClick={handleSkip}>
          Skip
        </button>
        <button className="ctrl-btn primary" onClick={goNext} disabled={!verdict}>
          Next word
        </button>
      </div>
      <div className="notice">{micNotice}</div>
    </div>
  );
}
