import { useState } from "react";
import { marked } from "marked";
import { C2_GRAMMAR } from "../data/c2Grammar";

export default function C2Grammar({ onBack }) {
  const [activeChapter, setActiveChapter] = useState(1);
  const [showQuiz, setShowQuiz] = useState(false);
  const data = C2_GRAMMAR.find((c) => c.cchapter === activeChapter);

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
        <div className="grammar-nav-label mono">C2 {String(activeChapter).padStart(2, "0")} / 5</div>
      </div>

      <div className="grammar-layout">
        <nav className="grammar-rail">
          {C2_GRAMMAR.map((c) => (
            <button
              key={c.cchapter}
              className={`grammar-rail-item${c.cchapter === activeChapter ? " active" : ""}`}
              onClick={() => goToChapter(c.cchapter)}
            >
              <span className="mono">{String(c.cchapter).padStart(2, "0")}</span>
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
            <C2Quiz
              questions={data.quiz}
              onDone={() => {
                if (activeChapter < 5) goToChapter(activeChapter + 1);
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

function C2Quiz({ questions, onDone, onBackToLesson }) {
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
            ? "Perfect — genuinely native-level territory."
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
