import { useState } from "react";
import { GRAMMAR_QUIZ } from "../data/grammarQuiz";

export default function GrammarQuiz({ chapter, onDone, onBackToLesson }) {
  const questions = GRAMMAR_QUIZ[chapter] || [];
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [finished, setFinished] = useState(false);

  if (!questions.length) {
    return (
      <div className="quiz-empty">
        <p>No self-check written for this chapter yet.</p>
        <button className="ctrl-btn" onClick={onBackToLesson}>
          Back to lesson
        </button>
      </div>
    );
  }

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
        <p>{correctCount === questions.length ? "Perfect — this chapter's grammar is solid." : "Worth re-reading the Grammar Focus above before moving on."}</p>
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
