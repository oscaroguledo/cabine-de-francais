import { useMemo, useState } from "react";
import vocab from "../data/vocab.json";
import { buildListeningSet } from "../utils/listening";
import { useLocalAudio } from "../hooks/useLocalAudio";

export default function Listening({ byChapter, onBack, count = 10, official = false, onComplete }) {
  const [set] = useState(() => buildListeningSet(vocab, byChapter, count));
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [finished, setFinished] = useState(false);
  const { play } = useLocalAudio();

  const item = set[idx];

  function replay() {
    play(item.n, item.clipType, item.fr);
  }

  function choose(opt) {
    if (selected !== null) return;
    setSelected(opt);
    if (opt === item.correctAnswer) setCorrectCount((c) => c + 1);
  }

  function next() {
    if (idx + 1 >= set.length) {
      setFinished(true);
      onComplete?.({ correct: correctCount, total: set.length });
    } else {
      setIdx((i) => i + 1);
      setSelected(null);
    }
  }

  if (finished) {
    return (
      <div className="quiz-result">
        <div className="section-label centered">Listening practice complete</div>
        <div className="quiz-result-score mono">
          {correctCount}/{set.length}
        </div>
        <p>
          {official
            ? "Official-length practice: 40 items, matching the real TCF/TEF listening section's scale. Still isolated-item recognition, not continuous dialogue — see the Roadmap for authentic-audio resources for that part."
            : "This drills recognizing known vocabulary spoken aloud — a stepping stone toward the real exam's continuous dialogues, not a substitute for them. See the Roadmap for authentic-audio resources."}
        </p>
        <button className="ctrl-btn primary" onClick={onBack}>
          Back to chapters
        </button>
      </div>
    );
  }

  return (
    <div className="listening-view">
      <div className="session-head">
        <button className="back-btn" onClick={onBack}>
          ← Chapters
        </button>
        <div className="progress-track">
          <i style={{ width: `${(100 * idx) / set.length}%` }} />
        </div>
        <div className="streak mono">
          <b>{correctCount}</b>/{set.length}
        </div>
      </div>

      <div className="booth">
        <div className="prompt-label">Listen, then choose what it means</div>
        <button className="hear-btn" style={{ marginTop: 14 }} onClick={replay}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M11 5 6 9H2v6h4l5 4V5Z" />
            <path d="M15.5 8.5a5 5 0 0 1 0 7" />
          </svg>
          Play audio
        </button>

        <div className="mcq-list">
          {item.options.map((opt) => {
            let cls = "quiz-option";
            if (selected !== null) {
              if (opt === item.correctAnswer) cls += " correct";
              else if (opt === selected) cls += " wrong";
            }
            return (
              <button key={opt} className={cls} onClick={() => choose(opt)} disabled={selected !== null}>
                {opt}
              </button>
            );
          })}
        </div>

        {selected !== null && (
          <div className="quiz-explain">
            <p>
              Correct: <i>{item.fr}</i> = {item.correctAnswer}
            </p>
            <button className="ctrl-btn primary" onClick={next}>
              {idx + 1 >= set.length ? "See results" : "Next"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
