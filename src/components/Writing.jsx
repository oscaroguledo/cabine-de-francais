import { useEffect, useRef, useState } from "react";
import { WRITING_TASKS } from "../data/writingPrompts";

const RUBRIC = [
  { key: "completion", t: "Task completion", d: "Did you address everything the prompt asked for, within the word range?" },
  { key: "vocab", t: "Vocabulary", d: "Varied word choice, not the same 5 words repeated" },
  { key: "grammar", t: "Grammar", d: "Correct conjugation, agreement, articles" },
  { key: "organization", t: "Organization", d: "Clear structure — intro, body, conclusion for argumentative tasks" },
  { key: "register", t: "Register", d: "Appropriately formal/informal tone for the task" },
];

function countWords(text) {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

export default function Writing({ onBack }) {
  const [taskId, setTaskId] = useState(null);
  const [promptIdx, setPromptIdx] = useState(0);
  const [text, setText] = useState("");
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [running, setRunning] = useState(false);
  const [reviewing, setReviewing] = useState(false);
  const [checks, setChecks] = useState({});
  const intervalRef = useRef(null);

  const task = WRITING_TASKS.find((t) => t.id === taskId);

  useEffect(() => {
    if (!running) return;
    intervalRef.current = setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          clearInterval(intervalRef.current);
          setRunning(false);
          setReviewing(true);
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(intervalRef.current);
  }, [running]);

  function startTask(t) {
    setTaskId(t.id);
    setPromptIdx(Math.floor(Math.random() * t.prompts.length));
    setText("");
    setSecondsLeft(t.minutes * 60);
    setRunning(true);
    setReviewing(false);
    setChecks({});
  }

  function finishNow() {
    clearInterval(intervalRef.current);
    setRunning(false);
    setReviewing(true);
  }

  function reset() {
    setTaskId(null);
    setReviewing(false);
  }

  if (!task) {
    return (
      <div className="mode-select">
        <div className="session-head">
          <button className="back-btn" onClick={onBack}>
            ← Chapters
          </button>
        </div>
        <div className="section-label">Writing tasks</div>
        <p className="hero p" style={{ color: "var(--ink-dim)", fontSize: 14, marginBottom: 20 }}>
          Matches the real TCF and TEF Canada task structures — timed, word-count tracked, with the
          official grading criteria as a self-check at the end. Not auto-graded: there's no reliable
          way for this app to score open-ended writing quality, so honest self- or tutor-review matters here.
        </p>
        <div className="mode-select-grid">
          {WRITING_TASKS.map((t) => (
            <button key={t.id} className="mode-select-card" onClick={() => startTask(t)}>
              <div className="stage">
                {t.exam} · {t.task}
              </div>
              <div className="t">{t.title}</div>
              <div className="d">
                {t.minWords}–{t.maxWords} words · {t.minutes} min
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  const wc = countWords(text);
  const wcOk = wc >= task.minWords && wc <= task.maxWords;
  const mins = String(Math.floor(secondsLeft / 60)).padStart(2, "0");
  const secs = String(secondsLeft % 60).padStart(2, "0");

  if (reviewing) {
    return (
      <div className="task-card">
        <div className="task-kicker">
          {task.exam} · {task.task} — review
        </div>
        <h2 className="task-title">{task.title}</h2>
        <div className="word-count mono" style={{ marginTop: 10 }}>
          {wc} words {wcOk ? "— in range" : `(target ${task.minWords}–${task.maxWords})`}
        </div>
        <textarea className="writing-textarea" value={text} onChange={(e) => setText(e.target.value)} style={{ marginTop: 12 }} />

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
            Try this task again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="task-card">
      <div className="task-kicker">
        {task.exam} · {task.task}
      </div>
      <h2 className="task-title">{task.title}</h2>
      <div className="task-prompt">{task.prompts[promptIdx]}</div>
      <div className="task-meta">
        <span>
          Target: <b>{task.minWords}–{task.maxWords} words</b>
        </span>
        <span className={`exam-timer ${secondsLeft < 60 ? "low" : ""}`}>⏱ {mins}:{secs}</span>
      </div>

      <textarea
        className="writing-textarea"
        style={{ marginTop: 18 }}
        placeholder="Écrivez votre réponse ici…"
        value={text}
        onChange={(e) => setText(e.target.value)}
        autoFocus
      />
      <div className={`word-count mono ${wcOk ? "ok" : ""}`}>{wc} words</div>

      <div className="summary-controls" style={{ marginTop: 16 }}>
        <button className="ctrl-btn" onClick={reset}>
          Cancel
        </button>
        <button className="ctrl-btn primary" onClick={finishNow}>
          Finish &amp; review
        </button>
      </div>
    </div>
  );
}
