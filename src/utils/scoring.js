import { bandFor } from "../data/clb";

const CHAPTER_COUNT = 15;

/**
 * Foundation Score = weighted composite of:
 *  - coverage:   how much of the 784-word corpus has been attempted at least once
 *  - mastery:    how much has reached the "mastered" threshold (recordAnswer in useProgress)
 *  - balance:    mean of PER-CHAPTER mastery %, not pooled — rewards practicing every
 *                chapter instead of just the easy/short ones inflating a pooled average
 *  - accuracy:   rolling EMA of production-accuracy scores across attempted words
 *
 * This intentionally measures only vocabulary breadth + isolated pronunciation accuracy —
 * see FOUNDATION_BANDS / the Readiness view's scope panel for what it does NOT measure.
 */
export function computeFoundationScore(vocab, progress) {
  const total = vocab.length;
  const attempted = [];
  const mastered = [];
  const chapterTotals = {};
  const chapterMastered = {};

  for (const w of vocab) {
    chapterTotals[w.ch] = (chapterTotals[w.ch] || 0) + 1;
    const entry = progress[w.n];
    if (entry && entry.correct + entry.wrong > 0) {
      attempted.push(w.n);
      if (entry.mastered) {
        mastered.push(w.n);
        chapterMastered[w.ch] = (chapterMastered[w.ch] || 0) + 1;
      }
    }
  }

  const coveragePct = attempted.length / total;
  const masteryPct = mastered.length / total;

  let chapterSum = 0;
  let chaptersWithData = 0;
  for (let ch = 1; ch <= CHAPTER_COUNT; ch++) {
    const chTotal = chapterTotals[ch] || 0;
    if (!chTotal) continue;
    chaptersWithData++;
    chapterSum += (chapterMastered[ch] || 0) / chTotal;
  }
  const balancePct = chaptersWithData ? chapterSum / chaptersWithData : 0;

  let accuracySum = 0;
  let accuracyCount = 0;
  for (const n of attempted) {
    const e = progress[n];
    if (typeof e.avgScore === "number") {
      accuracySum += e.avgScore;
      accuracyCount++;
    }
  }
  const accuracyPct = accuracyCount ? accuracySum / accuracyCount : 0;

  const score = Math.round(
    100 * (0.25 * coveragePct + 0.4 * masteryPct + 0.2 * balancePct + 0.15 * accuracyPct)
  );

  const perChapter = [];
  for (let ch = 1; ch <= CHAPTER_COUNT; ch++) {
    const chTotal = chapterTotals[ch] || 0;
    perChapter.push({
      chapter: ch,
      total: chTotal,
      mastered: chapterMastered[ch] || 0,
      pct: chTotal ? Math.round((100 * (chapterMastered[ch] || 0)) / chTotal) : 0,
    });
  }

  return {
    score: Math.max(0, Math.min(100, score)),
    band: bandFor(Math.max(0, Math.min(100, score))),
    coveragePct: Math.round(coveragePct * 100),
    masteryPct: Math.round(masteryPct * 100),
    balancePct: Math.round(balancePct * 100),
    accuracyPct: Math.round(accuracyPct * 100),
    attemptedCount: attempted.length,
    masteredCount: mastered.length,
    total,
    perChapter,
  };
}
