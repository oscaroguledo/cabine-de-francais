import { CHAPTER_NAMES } from "../data/chapters";
import { TCF_CLB_TABLE, TEF_CLB_TABLE } from "../data/clb";

const METRIC_INFO = [
  { key: "coveragePct", label: "Coverage", d: "% of the 784-word corpus you've attempted at least once" },
  { key: "masteryPct", label: "Mastery", d: "% you've mastered (3+ correct, at least 2:1 correct-to-wrong)" },
  { key: "balancePct", label: "Balance", d: "Average mastery spread evenly across all 15 chapters, not just the easy ones" },
  { key: "accuracyPct", label: "Accuracy", d: "Rolling average of how closely your spoken answers matched, across attempts" },
];

export default function Readiness({ report, onBack }) {
  const { score, band, perChapter } = report;

  return (
    <div className="readiness">
      <div className="session-head">
        <button className="back-btn" onClick={onBack}>
          ← Chapters
        </button>
      </div>

      <div className="score-panel">
        <div className="section-label">Foundation Score</div>
        <div className="score-dial">
          <div className="score-dial-ring" style={{ "--pct": score }}>
            <div className="score-dial-value mono">{score}</div>
          </div>
          <div className="score-dial-meta">
            <div className="band-label">{band.label}</div>
            <div className="band-clb mono">{band.clbHint}</div>
            <p className="band-note">{band.note}</p>
          </div>
        </div>
      </div>

      <div className="metric-row">
        {METRIC_INFO.map((m) => (
          <div className="metric" key={m.key}>
            <div className="metric-value mono">{report[m.key]}%</div>
            <div className="metric-label">{m.label}</div>
            <div className="metric-d">{m.d}</div>
          </div>
        ))}
      </div>

      <div className="scope-panel">
        <div className="scope-col good-col">
          <div className="scope-title">What this score measures</div>
          <ul>
            <li>Vocabulary breadth across your 784-word course</li>
            <li>Recall speed and correctness under prompt</li>
            <li>Isolated-word and short-sentence pronunciation accuracy</li>
          </ul>
        </div>
        <div className="scope-col bad-col">
          <div className="scope-title">What it does NOT measure</div>
          <ul>
            <li>Listening comprehension of natural, continuous speech</li>
            <li>Reading comprehension of authentic texts</li>
            <li>Writing composition</li>
            <li>Spontaneous conversation, argumentation, or role-play — the actual Speaking task format</li>
          </ul>
        </div>
      </div>
      <p className="disclaimer">
        This is a self-assessment aid, not a prediction of your official TCF or TEF Canada result.
        CLB is only ever assigned by IRCC from an actual test score. See the full multi-skill
        Roadmap for what closes the rest of the gap.
      </p>

      <div className="section-label">By chapter</div>
      <div className="chapter-breakdown">
        {perChapter.map((c) => (
          <div className="chapter-row" key={c.chapter}>
            <div className="chapter-row-name">
              CH {String(c.chapter).padStart(2, "0")} · {CHAPTER_NAMES[c.chapter - 1]}
            </div>
            <div className="chapter-row-bar">
              <i style={{ width: `${c.pct}%` }} />
            </div>
            <div className="chapter-row-pct mono">{c.pct}%</div>
          </div>
        ))}
      </div>

      <div className="section-label">Official CLB reference — TCF Canada</div>
      <div className="clb-table-wrap">
        <table className="clb-table">
          <thead>
            <tr>
              <th>CLB</th>
              <th>Listening /699</th>
              <th>Reading /699</th>
              <th>Writing /20</th>
              <th>Speaking /20</th>
            </tr>
          </thead>
          <tbody>
            {TCF_CLB_TABLE.map((row) => (
              <tr key={row.clb} className={row.clb === "7" ? "highlight" : ""}>
                <td className="mono">{row.clb}</td>
                <td className="mono">{row.listening}</td>
                <td className="mono">{row.reading}</td>
                <td className="mono">{row.writing}</td>
                <td className="mono">{row.speaking}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="section-label">Official CLB reference — TEF Canada (per-skill scale)</div>
      <div className="clb-table-wrap">
        <table className="clb-table">
          <thead>
            <tr>
              <th>CLB</th>
              <th>Listening /360</th>
              <th>Reading /300</th>
              <th>Writing /450</th>
              <th>Speaking /450</th>
            </tr>
          </thead>
          <tbody>
            {TEF_CLB_TABLE.map((row) => (
              <tr key={row.clb} className={row.clb === "7" ? "highlight" : ""}>
                <td className="mono">{row.clb}</td>
                <td className="mono">{row.listening}</td>
                <td className="mono">{row.reading}</td>
                <td className="mono">{row.writing}</td>
                <td className="mono">{row.speaking}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="disclaimer">
        TEF Canada certificates also print a harmonized "/699" score — IRCC does not accept that
        column for Express Entry. Always use the per-skill numbers above. Verify current figures
        on IRCC's official Express Entry language-test page before relying on them for an application.
      </p>
    </div>
  );
}
