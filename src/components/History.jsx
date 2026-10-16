import { useEffect, useState } from "react";
import { getDb, readHistory } from "../db/sqlite";
import { WRITING_TASKS } from "../data/writingPrompts";
import { SPEAKING_TASKS } from "../data/speakingPrompts";

const LABELS = {
  grammar_quiz: "Grammar quiz",
  advanced_grammar_quiz: "Advanced grammar quiz",
  c2_grammar_quiz: "C2 grammar quiz",
  listening: "Listening",
  mock_listening: "Mock listening",
  reading: "Reading",
  mock_reading: "Mock reading",
  writing: "Writing task",
  writing_rubric: "Writing self-check",
  speaking: "Speaking task",
  speaking_rubric: "Speaking self-check",
  vocab: "Vocabulary",
};
const CHAPTER_LABELS = { grammar: "Grammar", advanced_grammar: "Advanced grammar", c2_grammar: "C2 grammar" };
const STATUS_LABELS = { opened: "Opened", quiz_started: "Quiz started", quiz_done: "Quiz finished" };

const label = (kind) => LABELS[kind] ?? kind;

/** Turns stored item codes into words a person can read: "tcf1:1" becomes "Everyday message, prompt 2". */
function itemName(kind, item) {
  const text = String(item);
  if (kind.startsWith("writing")) {
    const [taskId, idx, key] = text.split(":");
    const task = WRITING_TASKS.find((t) => t.id === taskId);
    if (!task) return text;
    if (kind === "writing_rubric") return `${task.title}, self-check: ${key}`;
    return idx === undefined ? task.title : `${task.title}, prompt ${Number(idx) + 1}`;
  }
  if (kind.startsWith("speaking")) {
    const [taskId, idx, key] = text.split(":");
    const task = SPEAKING_TASKS.find((t) => t.id === taskId);
    if (!task) return text;
    if (kind === "speaking_rubric") return `${task.title}, self-check: ${key}`;
    return `${task.title}, prompt ${Number(idx) + 1}`;
  }
  if (kind.endsWith("grammar_quiz")) {
    const [chapter, q] = text.split(":");
    return `Chapter ${chapter}, question ${q}`;
  }
  if (kind === "listening" || kind === "mock_listening") return `Word ${text}`;
  return text;
}
const when = (iso) => new Date(iso).toLocaleString();
const percent = (right, graded) => (graded ? `${Math.round((100 * right) / graded)}%` : "—");

/** Everything saved on this device: totals, chapter progress, writing you submitted, unfinished drafts, and recent answers. */
export default function History({ onBack }) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(null);

  useEffect(() => {
    let cancelled = false;
    getDb()
      .then((db) => !cancelled && setData(readHistory(db)))
      .catch((e) => !cancelled && setError(String(e)));
    return () => { cancelled = true; };
  }, []);

  if (error) return <div className="quiz-empty"><p>Could not read your history: {error}</p><button className="ctrl-btn" onClick={onBack}>Back</button></div>;
  if (!data) return <div className="quiz-empty"><p>Loading your history…</p></div>;

  const totalAnswers = data.totals.reduce((n, t) => n + t.count, 0);
  const totalRight = data.totals.reduce((n, t) => n + t.right, 0);
  const totalGraded = data.totals.reduce((n, t) => n + t.graded, 0);

  return (
    <div className="history-view">
      <div className="session-head">
        <button className="back-btn" onClick={onBack}>← Back</button>
        <div className="grammar-nav-label mono">HISTORY</div>
      </div>
      <h2>Your history</h2>
      <p className="task-prompt">Everything you have answered or submitted on this device is kept here.</p>

      <div className="history-stats">
        <div><span className="mono">{totalAnswers}</span> answers saved</div>
        <div><span className="mono">{percent(totalRight, totalGraded)}</span> right (where it is marked)</div>
        <div><span className="mono">{data.writing.length}</span> writing submissions</div>
        <div><span className="mono">{data.drafts.length}</span> unfinished drafts</div>
      </div>

      <section>
        <h3>By activity</h3>
        {data.totals.length === 0 ? <p>Nothing saved yet.</p> : (
          <table className="history-table">
            <thead><tr><th>Activity</th><th>Answers</th><th>Right</th></tr></thead>
            <tbody>
              {data.totals.map((t) => (
                <tr key={t.kind}><td>{label(t.kind)}</td><td>{t.count}</td><td>{t.graded ? `${t.right}/${t.graded}` : "—"}</td></tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

      <section>
        <h3>Chapters</h3>
        {data.chapters.length === 0 ? <p>No chapters opened yet.</p> : (
          <table className="history-table">
            <thead><tr><th>Chapter</th><th>Status</th><th>Best quiz score</th><th>Last change</th></tr></thead>
            <tbody>
              {data.chapters.map((c) => (
                <tr key={`${c.kind}-${c.chapter}`}>
                  <td>{CHAPTER_LABELS[c.kind] ?? c.kind} {c.chapter}</td>
                  <td>{STATUS_LABELS[c.status] ?? c.status}</td>
                  <td>{c.best === null ? "—" : `${Math.round(c.best * 100)}%`}</td>
                  <td>{when(c.updatedAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

      <section>
        <h3>Writing you submitted</h3>
        {data.writing.length === 0 ? <p>No writing submitted yet.</p> : (
          <ul className="history-list">
            {data.writing.map((w) => (
              <li key={w.id}>
                <button className="history-toggle" onClick={() => setOpen(open === w.id ? null : w.id)}>
                  <span>{when(w.at)} · {itemName("writing", w.item)}</span>
                </button>
                {open === w.id && <p className="history-text">{w.text || "(empty)"}</p>}
              </li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <h3>Unfinished drafts</h3>
        {data.drafts.length === 0 ? <p>No unfinished drafts.</p> : (
          <ul className="history-list">
            {data.drafts.map((d) => (
              <li key={`${d.kind}-${d.item}`}>
                <span>{label(d.kind)} · {itemName(d.kind, d.item)} · saved {when(d.at)}</span>
                {d.body?.text && <p className="history-text">{d.body.text}</p>}
              </li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <h3>Recent answers</h3>
        {data.recent.length === 0 ? <p>Nothing yet.</p> : (
          <table className="history-table">
            <thead><tr><th>When</th><th>Activity</th><th>Item</th><th>Result</th></tr></thead>
            <tbody>
              {data.recent.map((r) => (
                <tr key={r.id}>
                  <td>{when(r.at)}</td>
                  <td>{label(r.kind)}</td>
                  <td>{itemName(r.kind, r.item)}</td>
                  <td>{r.correct === null ? (r.answer ? "submitted" : "—") : r.correct ? "right" : "wrong"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </div>
  );
}
