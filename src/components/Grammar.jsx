import { useState } from "react";
import { marked } from "marked";
import grammarData from "../data/grammar.json";
import { CHAPTER_NAMES } from "../data/chapters";
import GrammarQuiz from "./GrammarQuiz";

export default function Grammar({ onBack }) {
  const [activeChapter, setActiveChapter] = useState(1);
  const [showQuiz, setShowQuiz] = useState(false);
  const data = grammarData.find((c) => c.chapter === activeChapter);

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
          CH {String(activeChapter).padStart(2, "0")} / 15
        </div>
      </div>

      <div className="grammar-layout">
        <nav className="grammar-rail">
          {CHAPTER_NAMES.map((name, i) => {
            const ch = i + 1;
            return (
              <button
                key={ch}
                className={`grammar-rail-item${ch === activeChapter ? " active" : ""}`}
                onClick={() => goToChapter(ch)}
              >
                <span className="mono">{String(ch).padStart(2, "0")}</span>
                {name}
              </button>
            );
          })}
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
            <GrammarQuiz
              chapter={activeChapter}
              onDone={() => {
                if (activeChapter < 15) goToChapter(activeChapter + 1);
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
