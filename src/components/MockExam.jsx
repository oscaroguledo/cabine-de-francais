import { useState } from "react";
import Reading from "./Reading";
import Listening from "./Listening";
import Writing from "./Writing";
import Speaking from "./Speaking";
import { QUICK_SET, FULL_SET, FULL_SET_QUESTION_COUNT } from "../data/readingPassages";

const STAGES = ["intro", "reading", "listening", "writing", "speaking", "results"];

export default function MockExam({ byChapter, onBack, full = false }) {
  const [stageIdx, setStageIdx] = useState(0);
  const [readingResult, setReadingResult] = useState(null);
  const [listeningResult, setListeningResult] = useState(null);
  const stage = STAGES[stageIdx];

  function advance() {
    setStageIdx((i) => Math.min(i + 1, STAGES.length - 1));
  }

  if (stage === "intro") {
    return (
      <div className="mode-select">
        <div className="session-head">
          <button className="back-btn" onClick={onBack}>
            ← Chapters
          </button>
        </div>
        <div className="section-label">{full ? "Official-length mock exam" : "Mock exam"}</div>
        <div className="task-card">
          <div className="task-kicker">{full ? "40-question Reading & Listening" : "Full-sequence practice"}</div>
          <h2 className="task-title">A complete run, in exam order</h2>
          <p className="task-prompt">
            Reading → Listening → Writing → Speaking, back to back, matching the real running order.
            Reading and Listening are auto-scored; Writing and Speaking end in self-review, since
            open-ended production can't be reliably auto-graded here.
          </p>
          <p className="notice" style={{ textAlign: "left", marginTop: 14 }}>
            {full
              ? `Reading and Listening are each ${FULL_SET_QUESTION_COUNT} questions — matching the real TCF/TEF question count. Writing and Speaking give you one full-length task each; the real exam's multi-task structure is what the standalone Writing/Speaking modes cover in full. This is still an original practice set, not an official past paper — use official sample exams for your final pre-booking check.`
              : "This is a compact original practice set (6 reading passages, 10 listening items, one writing task, one speaking task) — a quick full-sequence run-through. For the official 40-question scale, use the full-length mock exam from the home screen."}
          </p>
          <button className="ctrl-btn primary" onClick={advance} style={{ marginTop: 18 }}>
            Begin {full ? "official-length" : "mock"} exam
          </button>
        </div>
      </div>
    );
  }

  const stageOrder = ["reading", "listening", "writing", "speaking"];
  const currentStageNum = stageOrder.indexOf(stage);

  const trackBar = (
    <div className="exam-stage-track">
      {stageOrder.map((s, i) => (
        <div key={s} className={i < currentStageNum ? "done" : i === currentStageNum ? "active" : ""} />
      ))}
    </div>
  );

  if (stage === "reading") {
    return (
      <div>
        {trackBar}
        <Reading
          onBack={onBack}
          passages={full ? FULL_SET : QUICK_SET}
          official={full}
          onComplete={(res) => {
            setReadingResult(res);
            advance();
          }}
        />
      </div>
    );
  }

  if (stage === "listening") {
    return (
      <div>
        {trackBar}
        <Listening
          byChapter={byChapter}
          onBack={advance}
          count={full ? 40 : 10}
          official={full}
          onComplete={(res) => setListeningResult(res)}
        />
        <div className="exam-nav">
          <span />
          <button className="ctrl-btn primary" onClick={advance}>
            Continue to Writing →
          </button>
        </div>
      </div>
    );
  }

  if (stage === "writing") {
    return (
      <div>
        {trackBar}
        <MockWritingWrap onBack={onBack} onNext={advance} />
      </div>
    );
  }

  if (stage === "speaking") {
    return (
      <div>
        {trackBar}
        <Speaking onBack={onBack} />
        <div className="exam-nav">
          <span />
          <button className="ctrl-btn primary" onClick={advance}>
            Finish mock exam →
          </button>
        </div>
      </div>
    );
  }

  if (stage === "results") {
    return (
      <div className="mock-results">
        <div className="section-label centered">Mock exam complete</div>
        <h2>Nicely done — that's the full sequence.</h2>
        {readingResult && (
          <div className="section-row">
            <span>Reading</span>
            <b className="mono">
              {readingResult.correct}/{readingResult.total}
            </b>
          </div>
        )}
        <div className="section-row">
          <span>Listening</span>
          {listeningResult ? (
            <b className="mono">
              {listeningResult.correct}/{listeningResult.total}
            </b>
          ) : (
            <span>Not completed</span>
          )}
        </div>
        <div className="section-row">
          <span>Writing</span>
          <span>Self-reviewed against the real rubric</span>
        </div>
        <div className="section-row">
          <span>Speaking</span>
          <span>Recorded and self-reviewed against the real rubric</span>
        </div>
        <p style={{ marginTop: 20, color: "var(--ink-dim)", fontSize: 13, maxWidth: "48ch", marginLeft: "auto", marginRight: "auto" }}>
          Check your Readiness report for how this fits into the bigger picture, and the Roadmap PDF
          for what comes next.
        </p>
        <button className="ctrl-btn primary" onClick={onBack} style={{ marginTop: 20 }}>
          Back to chapters
        </button>
      </div>
    );
  }

  return null;
}

function MockWritingWrap({ onNext, onBack }) {
  // Reuses the Writing component's task picker but auto-advances the mock sequence
  // instead of returning to its own task-selection screen.
  return (
    <div>
      <Writing onBack={onBack} />
      <div className="exam-nav">
        <span />
        <button className="ctrl-btn primary" onClick={onNext}>
          Continue to Speaking →
        </button>
      </div>
    </div>
  );
}
