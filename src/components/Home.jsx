import { CHAPTER_NAMES, MODES } from "../data/chapters";

const STAGES = [
  { id: "vocab", stage: "Stage 1", t: "Vocabulary & pronunciation", d: "Speak the words and sentences below — this is the practice you already know." },
  { id: "grammar", stage: "Stage 2", t: "Grammar lessons", d: "All 15 chapters of the textbook's Grammar Focus, with a self-check quiz each." },
  { id: "listening", stage: "Stage 3", t: "Listening practice", d: "Hear real audio, choose what it means — a stepping stone toward exam listening." },
  { id: "writing", stage: "Stage 5", t: "Writing tasks", d: "The real TCF/TEF task formats, timed, with word-count tracking and a self-rubric." },
  { id: "speaking", stage: "Stage 4", t: "Speaking tasks", d: "Prep + speak timers matching the real formats, with recording for self-review." },
  { id: "exam", stage: "Stage 6", t: "Quick mock exam", d: "Reading → Listening → Writing → Speaking, back to back, in exam order." },
  { id: "fullexam", stage: "Stage 6", t: "Official-length mock exam", d: "The full 40-question Reading and Listening sections, matching the real exam's scale." },
  { id: "advancedVocab", stage: "Stage 7", t: "Advanced vocabulary (C1)", d: "120 words: formal connectors, professional French, abstract/academic terms, idioms." },
  { id: "advancedGrammar", stage: "Stage 7", t: "Advanced grammar (C1)", d: "Subjunctive, conditional, passive voice, relative pronouns — with self-check quizzes." },
  { id: "c2Vocab", stage: "Stage 8", t: "C2 vocabulary", d: "85 words: literary tenses, precise near-synonyms, register-switching, proverbs, elite rhetoric." },
  { id: "c2Grammar", stage: "Stage 8", t: "C2 grammar", d: "Passé simple recognition, lexical nuance, register mastery, proverbs, advanced argumentation." },
];

export default function Home({ vocab, byChapter, progress, mode, setMode, bestStreak, onStartChapter, onStartMixed, onNavigate }) {
  const practicedCount = Object.values(progress).filter((e) => e.correct + e.wrong > 0).length;
  const masteredCount = Object.values(progress).filter((e) => e.mastered).length;

  const chapterMastery = (ch) => {
    const words = byChapter[ch] || [];
    if (!words.length) return 0;
    const masteredInChapter = words.filter((w) => progress[w.n]?.mastered).length;
    return masteredInChapter / words.length;
  };

  return (
    <div className="home">
      <div className="hero">
        <h1>Step into the booth. Say it out loud.</h1>
        <p>
          {vocab.length} words, drawn from your own course, spoken back at you and scored against what you say.
          Pick a chapter, hit the mic, and talk.
        </p>
      </div>

      <div className="meter-row">
        <div className="meter">
          <div className="label">Words practiced</div>
          <div className="value mono">
            {practicedCount} <small>/ {vocab.length}</small>
          </div>
        </div>
        <div className="meter">
          <div className="label">Mastered</div>
          <div className="value mono">{Math.round((100 * masteredCount) / vocab.length)}%</div>
        </div>
        <div className="meter">
          <div className="label">Best streak</div>
          <div className="value mono">{bestStreak}</div>
        </div>
      </div>

      <div className="section-label">Training stages</div>
      <div className="mode-select-grid" style={{ marginBottom: 30 }}>
        {STAGES.map((s) => (
          <button key={s.id} className="mode-select-card" onClick={() => onNavigate(s.id)}>
            <div className="stage">{s.stage}</div>
            <div className="t">{s.t}</div>
            <div className="d">{s.d}</div>
          </button>
        ))}
      </div>

      <div className="section-label">Vocabulary practice mode</div>
      <div className="mode-row" role="group" aria-label="Practice mode">
        {MODES.map((m) => (
          <button
            key={m.id}
            className="mode-card"
            aria-pressed={m.id === mode}
            onClick={() => setMode(m.id)}
          >
            <div className="t">{m.t}</div>
            <div className="d">{m.d}</div>
          </button>
        ))}
      </div>

      <div className="section-label">Chapters</div>
      <div className="chapters">
        {CHAPTER_NAMES.map((name, i) => {
          const ch = i + 1;
          const pct = Math.round(chapterMastery(ch) * 100);
          return (
            <button key={ch} className="chapter-card" onClick={() => onStartChapter(byChapter[ch] || [])}>
              <span className="pct mono">{pct}%</span>
              <div className="num mono">CH {String(ch).padStart(2, "0")}</div>
              <div className="name">{name}</div>
              <div className="bar">
                <i style={{ width: `${pct}%` }} />
              </div>
            </button>
          );
        })}
      </div>

      <button className="practice-all" onClick={onStartMixed}>
        Practice a mixed session — 20 words across all chapters
      </button>
    </div>
  );
}
