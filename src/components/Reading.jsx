import { useState } from "react";
import { QUICK_SET } from "../data/readingPassages";

export default function Reading({ onBack, onComplete, passages = QUICK_SET, official = false }) {
  const [set] = useState(() => passages.slice().sort(() => Math.random() - 0.5));
  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState({});
  const [finished, setFinished] = useState(false);

  const passage = set[idx];

  function choose(qIdx, optIdx) {
    setAnswers((a) => ({ ...a, [`${passage.id}-${qIdx}`]: optIdx }));
  }

  function next() {
    if (idx + 1 >= set.length) {
      const correct = countCorrect();
      setFinished(true);
      onComplete?.({ correct, total: totalQuestions() });
    } else {
      setIdx((i) => i + 1);
    }
  }

  function totalQuestions() {
    return set.reduce((sum, p) => sum + p.questions.length, 0);
  }

  function countCorrect() {
    let c = 0;
    for (const p of set) {
      p.questions.forEach((q, qi) => {
        if (answers[`${p.id}-${qi}`] === q.answer) c++;
      });
    }
    return c;
  }

  const allAnswered = passage.questions.every((_, qi) => answers[`${passage.id}-${qi}`] !== undefined);

  if (finished) {
    const correct = countCorrect();
    const total = totalQuestions();
    return (
      <div className="quiz-result">
        <div className="section-label centered">Reading practice complete</div>
        <div className="quiz-result-score mono">
          {correct}/{total}
        </div>
        <p>
          {official
            ? "Official-length practice: 20 passages, 40 questions, matching the real TCF/TEF reading section's scale."
            : "A compact original practice set — try the official-length 40-question Reading exam from the home screen for the real scale."}
        </p>
        <button className="ctrl-btn primary" onClick={onBack}>
          Back to chapters
        </button>
      </div>
    );
  }

  return (
    <div className="reading-view">
      <div className="session-head">
        <button className="back-btn" onClick={onBack}>
          ← Chapters
        </button>
        <div className="progress-track">
          <i style={{ width: `${(100 * idx) / set.length}%` }} />
        </div>
        <div className="streak mono">
          {idx + 1}/{set.length}
        </div>
      </div>

      <div className="task-card">
        <div className="task-kicker">
          {passage.level} · {passage.type}
        </div>
        <h2 className="task-title">{passage.title}</h2>
        <p className="task-prompt">{passage.text}</p>

        {passage.questions.map((q, qi) => (
          <div key={qi} style={{ marginTop: 20 }}>
            <div className="quiz-q" style={{ fontSize: 15.5 }}>
              {q.q}
            </div>
            <div className="mcq-list">
              {q.options.map((opt, oi) => {
                const chosen = answers[`${passage.id}-${qi}`];
                let cls = "quiz-option";
                if (chosen !== undefined) {
                  if (oi === q.answer) cls += " correct";
                  else if (oi === chosen) cls += " wrong";
                }
                return (
                  <button key={oi} className={cls} onClick={() => choose(qi, oi)} disabled={chosen !== undefined}>
                    {opt}
                  </button>
                );
              })}
            </div>
          </div>
        ))}

        <div className="exam-nav">
          <span />
          <button className="ctrl-btn primary" onClick={next} disabled={!allAnswered}>
            {idx + 1 >= set.length ? "See results" : "Next passage"}
          </button>
        </div>
      </div>
    </div>
  );
}
