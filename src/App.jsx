import { useMemo, useState } from "react";
import "./App.css";
import vocab from "./data/vocab.json";
import { useProgress } from "./hooks/useProgress";
import { useTheme } from "./hooks/useTheme";
import { useSpeechSynthesis } from "./hooks/useSpeechSynthesis";
import { computeFoundationScore } from "./utils/scoring";
import Home from "./components/Home";
import Session from "./components/Session";
import Summary from "./components/Summary";
import Readiness from "./components/Readiness";
import Grammar from "./components/Grammar";
import Listening from "./components/Listening";
import Writing from "./components/Writing";
import Speaking from "./components/Speaking";
import MockExam from "./components/MockExam";
import AdvancedVocab from "./components/AdvancedVocab";
import AdvancedGrammar from "./components/AdvancedGrammar";
import C2Vocab from "./components/C2Vocab";
import C2Grammar from "./components/C2Grammar";

const THEMES = ["auto", "light", "dark"];

export default function App() {
  const { progress, recordAnswer, getBestStreak, reportStreak } = useProgress();
  const { mode: themeMode, setTheme } = useTheme();
  const { speak } = useSpeechSynthesis();

  const [mode, setMode] = useState("translate");
  const [view, setView] = useState("home"); // "home" | "session" | "summary" | "readiness" | "grammar" | "listening" | "writing" | "speaking" | "exam"
  const [sessionItems, setSessionItems] = useState([]);
  const [sessionKey, setSessionKey] = useState(0);
  const [result, setResult] = useState(null);
  const [scoreBeforeSession, setScoreBeforeSession] = useState(null);

  const byChapter = useMemo(() => {
    const map = {};
    for (const w of vocab) {
      (map[w.ch] ||= []).push(w);
    }
    return map;
  }, []);

  const report = useMemo(() => computeFoundationScore(vocab, progress), [progress]);

  function startSession(items) {
    setScoreBeforeSession(report.score);
    setSessionItems(items);
    setSessionKey((k) => k + 1);
    setView("session");
  }

  function startChapter(items) {
    startSession(items.slice());
  }

  function startMixed() {
    const shuffled = vocab.slice().sort(() => Math.random() - 0.5).slice(0, 20);
    startSession(shuffled);
  }

  function finishSession(res) {
    setResult(res);
    setView("summary");
  }

  function retryMissed() {
    if (!result?.missed?.length) return;
    const items = result.missed
      .map((m) => vocab.find((w) => w.n === m.n))
      .filter(Boolean);
    startSession(items);
  }

  function handleNavigate(stageId) {
    if (stageId === "vocab") return;
    setView(stageId);
  }

  function startAdvancedWords(words) {
    startSession(words.slice());
  }

  function startC2Words(words) {
    startSession(words.slice());
  }

  return (
    <div className="app">
      <div className="topbar">
        <div className="wordmark">
          <span className="mic">
            Cabine <span className="accent-word">de Français</span>
          </span>
        </div>
        <div className="topbar-controls">
          {view !== "readiness" && (
            <button className="readiness-link" onClick={() => setView("readiness")}>
              <span className="readiness-link-full">Readiness report — {report.score}</span>
              <span className="readiness-link-short">Score: {report.score}</span>
            </button>
          )}
          <div className="theme-toggle" role="group" aria-label="Theme">
            {THEMES.map((t) => (
              <button key={t} aria-pressed={themeMode === t} onClick={() => setTheme(t)}>
                {t[0].toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {view === "home" && (
        <Home
          vocab={vocab}
          byChapter={byChapter}
          progress={progress}
          mode={mode}
          setMode={setMode}
          bestStreak={getBestStreak()}
          onStartChapter={startChapter}
          onStartMixed={startMixed}
          onNavigate={handleNavigate}
        />
      )}

      {view === "session" && (
        <Session
          key={sessionKey}
          items={sessionItems}
          mode={mode}
          speak={speak}
          recordAnswer={recordAnswer}
          reportStreak={reportStreak}
          onFinish={finishSession}
          onBack={() => setView("home")}
        />
      )}

      {view === "summary" && result && (
        <Summary
          result={result}
          scoreBefore={scoreBeforeSession}
          scoreAfter={report.score}
          onHome={() => setView("home")}
          onRetryMissed={retryMissed}
          onViewReadiness={() => setView("readiness")}
        />
      )}

      {view === "readiness" && <Readiness report={report} onBack={() => setView("home")} />}

      {view === "grammar" && <Grammar onBack={() => setView("home")} />}

      {view === "listening" && <Listening byChapter={byChapter} onBack={() => setView("home")} />}

      {view === "writing" && <Writing onBack={() => setView("home")} />}

      {view === "speaking" && <Speaking onBack={() => setView("home")} />}

      {view === "exam" && <MockExam byChapter={byChapter} onBack={() => setView("home")} />}

      {view === "fullexam" && <MockExam byChapter={byChapter} onBack={() => setView("home")} full />}

      {view === "advancedVocab" && (
        <AdvancedVocab progress={progress} onBack={() => setView("home")} onStartWords={startAdvancedWords} />
      )}

      {view === "advancedGrammar" && <AdvancedGrammar onBack={() => setView("home")} />}

      {view === "c2Vocab" && (
        <C2Vocab progress={progress} onBack={() => setView("home")} onStartWords={startC2Words} />
      )}

      {view === "c2Grammar" && <C2Grammar onBack={() => setView("home")} />}
    </div>
  );
}
