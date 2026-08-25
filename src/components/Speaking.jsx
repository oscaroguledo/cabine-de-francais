import { useEffect, useRef, useState } from "react";
import { SPEAKING_TASKS } from "../data/speakingPrompts";
import { useRecorder } from "../hooks/useRecorder";

const RUBRIC = [
  { key: "coherence", t: "Coherence of argument", d: "Does your response follow a clear line — thesis, then support?" },
  { key: "vocab", t: "Vocabulary richness", d: "Varied words, not the same handful repeated" },
  { key: "structure", t: "Ability to structure", d: "Intro → arguments → example → conclusion, where relevant" },
  { key: "clarity", t: "Clarity", d: "Would a stranger follow this without re-listening?" },
  { key: "pronunciation", t: "Pronunciation & fluency", d: "Smooth pacing, minimal hesitation, intelligible sounds" },
];

function fmt(s) {
  const m = String(Math.floor(s / 60)).padStart(2, "0");
  const ss = String(s % 60).padStart(2, "0");
  return `${m}:${ss}`;
}

export default function Speaking({ onBack }) {
  const [taskId, setTaskId] = useState(null);
  const [promptIdx, setPromptIdx] = useState(0);
  const [phase, setPhase] = useState("idle"); // "idle" | "prep" | "speak" | "review"
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [checks, setChecks] = useState({});
  const intervalRef = useRef(null);
  const recorder = useRecorder();

  const task = SPEAKING_TASKS.find((t) => t.id === taskId);

  useEffect(() => {
    if (phase !== "prep" && phase !== "speak") return;
    intervalRef.current = setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          clearInterval(intervalRef.current);
          if (phase === "prep") {
            beginSpeaking();
          } else {
            recorder.stop();
            setPhase("review");
          }
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(intervalRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  function startTask(t) {
    setTaskId(t.id);
    setPromptIdx(Math.floor(Math.random() * t.prompts.length));
    setChecks({});
    recorder.reset();
    if (t.prepSeconds > 0) {
      setPhase("prep");
      setSecondsLeft(t.prepSeconds);
    } else {
      setPhase("speak");
      setSecondsLeft(t.speakSeconds);
      recorder.start();
    }
  }

  function beginSpeaking() {
    setPhase("speak");
    setSecondsLeft(task.speakSeconds);
    recorder.start();
  }

  function stopEarly() {
    clearInterval(intervalRef.current);
    recorder.stop();
    setPhase("review");
  }

  function reset() {
    setTaskId(null);
    setPhase("idle");
    recorder.reset();
  }

  if (!task) {
    return (
      <div className="mode-select">
        <div className="session-head">
          <button className="back-btn" onClick={onBack}>
            ← Chapters
          </button>
        </div>
        <div className="section-label">Speaking tasks</div>
        <p style={{ color: "var(--ink-dim)", fontSize: 14, marginBottom: 20, lineHeight: 1.5 }}>
          Matches the real prep/speaking timing for each TCF and TEF Canada task. Records your
          answer locally so you can play it back and self-assess — there's no reliable way for this
          app to auto-grade spontaneous argumentation, so honest self-review (or a tutor's) is what
          closes this gap.
        </p>
        {!recorder.supported && (
          <p className="notice" style={{ marginBottom: 16 }}>
            Your browser doesn't support audio recording — you can still practice with the timer, just without playback.
          </p>
        )}
        <div className="mode-select-grid">
          {SPEAKING_TASKS.map((t) => (
            <button key={t.id} className="mode-select-card" onClick={() => startTask(t)}>
              <div className="stage">
                {t.exam} · {t.task}
              </div>
              <div className="t">{t.title}</div>
              <div className="d">
                {t.prepSeconds > 0 ? `${t.prepSeconds / 60} min prep + ` : "No prep — "}
                {Math.round(t.speakSeconds / 60)} min speaking
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (phase === "review") {
    return (
      <div className="task-card">
        <div className="task-kicker">
          {task.exam} · {task.task} — review
        </div>
        <h2 className="task-title">{task.title}</h2>
        <div className="task-prompt">{task.prompts[promptIdx]}</div>

        {recorder.audioUrl && (
          <div className="record-panel">
            <audio className="playback-audio" src={recorder.audioUrl} controls />
          </div>
        )}

        <div className="rubric">
          <div className="section-label">Self-assess against the real grading criteria</div>
          {RUBRIC.map((r) => (
            <label className="rubric-item" key={r.key}>
              <input
                type="checkbox"
                checked={!!checks[r.key]}
                onChange={(e) => setChecks((c) => ({ ...c, [r.key]: e.target.checked }))}
              />
              <span>
                <div className="rt">{r.t}</div>
                <div className="rd">{r.d}</div>
              </span>
            </label>
          ))}
        </div>

        <div className="summary-controls" style={{ marginTop: 20 }}>
          <button className="ctrl-btn" onClick={reset}>
            Choose another task
          </button>
          <button className="ctrl-btn primary" onClick={() => startTask(task)}>
            Try again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="task-card">
      <div className="task-kicker">
        {task.exam} · {task.task} {phase === "prep" ? "— preparing" : "— speak now"}
      </div>
      <h2 className="task-title">{task.title}</h2>
      <div className="task-prompt">{task.prompts[promptIdx]}</div>
      <div className="task-meta">
        <span className={`exam-timer ${secondsLeft < 15 ? "low" : ""}`}>⏱ {fmt(secondsLeft)}</span>
        {phase === "speak" && recorder.recording && <span style={{ color: "var(--bad)" }}>● recording</span>}
      </div>

      <div className="record-panel">
        <div className="record-btn" data-recording={recorder.recording}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M12 2a3 3 0 0 0-3 3v6a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
            <path d="M19 10v1a7 7 0 0 1-14 0v-1" />
          </svg>
        </div>
        <div className="mic-caption">
          {phase === "prep" ? "Preparing — speaking starts automatically" : "Speak your answer now"}
        </div>
      </div>

      <div className="summary-controls">
        <button className="ctrl-btn" onClick={reset}>
          Cancel
        </button>
        {phase === "speak" && (
          <button className="ctrl-btn primary" onClick={stopEarly}>
            Finish now
          </button>
        )}
      </div>
    </div>
  );
}
