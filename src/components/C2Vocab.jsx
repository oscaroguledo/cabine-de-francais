import c2Vocab from "../data/c2Vocab.json";

export default function C2Vocab({ progress, onBack, onStartWords }) {
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
      <div className="section-label">C2 track — 85 words, native-level territory</div>
      <p style={{ color: "var(--ink-dim)", fontSize: 14, marginBottom: 20, lineHeight: 1.5 }}>
        Literary tenses you'll only ever read (never speak), the precise near-synonyms that
        separate fluent from native, register-switching between casual and formal French, cultural
        proverbs, and elite rhetorical connectors. A real, honest note: no vocabulary set — this one
        included — makes you indistinguishable from a native speaker on its own. That comes from
        volume of real use. This is the raw material for it.
      </p>

      <div className="chapters">
        {c2Vocab.map((ch) => {
          const pct = Math.round(chapterMastery(ch.words) * 100);
          return (
            <button key={ch.cchapter} className="chapter-card" onClick={() => onStartWords(ch.words)}>
              <span className="pct mono">{pct}%</span>
              <div className="num mono">C2 {String(ch.cchapter).padStart(2, "0")}</div>
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
          const all = c2Vocab.flatMap((c) => c.words);
          const shuffled = all.slice().sort(() => Math.random() - 0.5).slice(0, 20);
          onStartWords(shuffled);
        }}
      >
        Practice a mixed C2 session — 20 words across all 5 chapters
      </button>
    </div>
  );
}
