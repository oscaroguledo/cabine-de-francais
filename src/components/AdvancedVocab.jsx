import advancedVocab from "../data/advancedVocab.json";

export default function AdvancedVocab({ progress, onBack, onStartWords }) {
  const chapterMastery = (words) => {
    if (!words.length) return 0;
    const masteredCount = words.filter((w) => progress[w.n]?.mastered).length;
    return masteredCount / words.length;
  };

  return (
    <div className="mode-select">
      <div className="session-head">
        <button className="back-btn" onClick={onBack}>
          ← Chapters
        </button>
      </div>
      <div className="section-label">Advanced track — 120 words, C1-level</div>
      <p style={{ color: "var(--ink-dim)", fontSize: 14, marginBottom: 20, lineHeight: 1.5 }}>
        Formal connectors, professional/business vocabulary, abstract and academic terms, and
        idiomatic expressions — paired with the grammar that goes with each (subjunctive,
        conditional, passive voice, relative pronouns). This is what's actually different at C1
        vs. B1: not more everyday words, but the vocabulary that lets you argue, qualify, and
        write formally.
      </p>

      <div className="chapters">
        {advancedVocab.map((ch) => {
          const pct = Math.round(chapterMastery(ch.words) * 100);
          return (
            <button key={ch.achapter} className="chapter-card" onClick={() => onStartWords(ch.words)}>
              <span className="pct mono">{pct}%</span>
              <div className="num mono">ADV {String(ch.achapter).padStart(2, "0")}</div>
              <div className="name">{ch.title}</div>
              <div className="bar">
                <i style={{ width: `${pct}%` }} />
              </div>
            </button>
          );
        })}
      </div>

      <button
        className="practice-all"
        onClick={() => {
          const all = advancedVocab.flatMap((c) => c.words);
          const shuffled = all.slice().sort(() => Math.random() - 0.5).slice(0, 20);
          onStartWords(shuffled);
        }}
      >
        Practice a mixed advanced session — 20 words across all 6 chapters
      </button>
    </div>
  );
}
