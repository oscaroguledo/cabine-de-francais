import { useState } from "react";
import { marked } from "marked";
import { ADVANCED_GRAMMAR } from "../data/advancedGrammar";

export default function AdvancedGrammar({ onBack }) {
  const [activeChapter, setActiveChapter] = useState(1);
  const [showQuiz, setShowQuiz] = useState(false);
  const data = ADVANCED_GRAMMAR.find((c) => c.achapter === activeChapter);

  function goToChapter(ch) {
    setActiveChapter(ch);
    setShowQuiz(false);
  }

  return (
    <div className="grammar-view">
      <div className="session-head">
        <button className="back-btn" onClick={onBack}>
          ← Chapters
        </button>
        <div className="grammar-nav-label mono">
          ADV {String(activeChapter).padStart(2, "0")} / 6
        </div>
      </div>

      <div className="grammar-layout">
        <nav className="grammar-rail">
          {ADVANCED_GRAMMAR.map((c) => (
            <button
              key={c.achapter}
              className={`grammar-rail-item${c.achapter === activeChapter ? " active" : ""}`}
              onClick={() => goToChapter(c.achapter)}
            >
              <span className="mono">{String(c.achapter).padStart(2, "0")}</span>
              {c.title}
            </button>
          ))}
        </nav>

        <div className="grammar-content">
          <h2>{data.title}</h2>
          <p className="grammar-intro">{data.intro}</p>

          {!showQuiz ? (
            <>
              <div
                className="grammar-body"
                dangerouslySetInnerHTML={{ __html: marked.parse(data.grammar) }}
              />
              <button className="ctrl-btn primary" onClick={() => setShowQuiz(true)}>
                Self-check this chapter
              </button>
            </>
          ) : (
            <AdvancedQuiz
              questions={data.quiz}
              onDone={() => {
                if (activeChapter < 6) goToChapter(activeChapter + 1);
                else setShowQuiz(false);
              }}
              onBackToLesson={() => setShowQuiz(false)}
            />
          )}
        </div>
      </div>
    </div>
  );
}

function AdvancedQuiz({ questions, onDone, onBackToLesson }) {
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [finished, setFinished] = useState(false);

  const q = questions[idx];

  function choose(i) {
    if (selected !== null) return;
    setSelected(i);
    if (i === q.answer) setCorrectCount((c) => c + 1);
  }

  function next() {
    if (idx + 1 >= questions.length) {
      setFinished(true);
    } else {
      setIdx((i) => i + 1);
      setSelected(null);
    }
  }

  if (finished) {
    return (
      <div className="quiz-result">
        <div className="quiz-result-score mono">
          {correctCount}/{questions.length}
        </div>
        <p>
          {correctCount === questions.length
            ? "Perfect — this is genuinely C1-level grammar, solid work."
            : "Worth re-reading the Grammar Focus above before moving on."}
        </p>
        <div className="summary-controls">
          <button className="ctrl-btn" onClick={onBackToLesson}>
            Review lesson
          </button>
          <button className="ctrl-btn primary" onClick={onDone}>
            Next chapter →
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="quiz">
      <div className="quiz-progress mono">
        Question {idx + 1} / {questions.length}
      </div>
      <div className="quiz-q">{q.q}</div>
      <div className="quiz-options">
        {q.options.map((opt, i) => {
          let cls = "quiz-option";
          if (selected !== null) {
            if (i === q.answer) cls += " correct";
            else if (i === selected) cls += " wrong";
          }
          return (
            <button key={i} className={cls} onClick={() => choose(i)} disabled={selected !== null}>
              {opt}
            </button>
          );
        })}
      </div>
      {selected !== null && (
        <div className="quiz-explain">
          <p>{q.explain}</p>
          <button className="ctrl-btn primary" onClick={next}>
            {idx + 1 >= questions.length ? "See results" : "Next question"}
          </button>
        </div>
      )}
    </div>
  );
}
