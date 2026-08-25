const TITLES = ["Nicely done.", "Bien joué.", "Solid session.", "Keep going."];

export default function Summary({ result, scoreBefore, scoreAfter, onHome, onRetryMissed, onViewReadiness }) {
  const { total, correctCount, missed } = result;
  const isPerfect = correctCount === total;
  const title = isPerfect ? "Parfait — perfect score." : TITLES[total % TITLES.length];
  const delta = typeof scoreBefore === "number" && typeof scoreAfter === "number" ? scoreAfter - scoreBefore : null;

  return (
    <div className="summary active">
      <div className="section-label centered">Session complete</div>
      <h2>{title}</h2>
      <div className="score mono">
        {correctCount}
        <small>/{total} correct</small>
      </div>
      {typeof scoreAfter === "number" && (
        <div className="summary-score-delta">
          Foundation Score: <b>{scoreAfter}</b>
          {delta !== null && delta !== 0 && (
            <span> ({delta > 0 ? "+" : ""}{delta} this session)</span>
          )}
          {" · "}
          <button className="readiness-link" onClick={onViewReadiness} style={{ marginLeft: 4 }}>
            View full report
          </button>
        </div>
      )}
      <div className="miss-list">
        {missed.length ? (
          missed.map((m, i) => (
            <div className="row" key={`${m.n}-${i}`}>
              <span className="en">{m.en}</span>
              <span className="fr">{m.fr}</span>
            </div>
          ))
        ) : (
          <div className="row">
            <span className="en">Nothing missed this round.</span>
          </div>
        )}
      </div>
      <div className="summary-controls">
        <button className="ctrl-btn" onClick={onHome}>
          Back to chapters
        </button>
        <button className="ctrl-btn primary" onClick={onRetryMissed} disabled={!missed.length}>
          Practice the missed words
        </button>
      </div>
    </div>
  );
}
