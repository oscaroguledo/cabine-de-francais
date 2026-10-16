// Lower-case, unify apostrophes and spacing, and drop punctuation. Accents are KEPT: in French "ou" and "où",
// "a" and "à", are different words, and a learner who drops them should not be credited.
export function normalize(s) {
  return s
    .normalize("NFC")
    .toLowerCase()
    .replace(/[’']/g, "'")
    .replace(/[^\p{L}\p{N}' ]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

// The letter with its accent removed, so "é" and "e" are recognised as the same letter with a different accent.
const base = (ch) => ch.normalize("NFD").replace(/[̀-ͯ]/g, "");

// Cost of turning one character into another. In French many accents are written, not spoken: "ou" and "où" sound
// the same. So a wrong accent is a small deduction (a quarter of an error), while a different letter is a full error.
const ACCENT_COST = 0.25;
function substitutionCost(a, b) {
  if (a === b) return 0;
  return base(a) === base(b) ? ACCENT_COST : 1;
}

// Weighted edit distance: insertions and deletions cost 1, substitutions cost substitutionCost().
function distance(a, b) {
  const m = a.length;
  const n = b.length;
  if (!m) return n;
  if (!n) return m;
  let prev = Array.from({ length: n + 1 }, (_, j) => j);
  for (let i = 1; i <= m; i++) {
    const row = [i];
    for (let j = 1; j <= n; j++) {
      row[j] = Math.min(prev[j] + 1, row[j - 1] + 1, prev[j - 1] + substitutionCost(a[i - 1], b[j - 1]));
    }
    prev = row;
  }
  return prev[n];
}

// 1 = identical after normalizing; 0 = nothing in common.
export function similarity(a, b) {
  const na = normalize(a);
  const nb = normalize(b);
  if (!na.length || !nb.length) return 0;
  return 1 - distance(na, nb) / Math.max(na.length, nb.length);
}

// expected French may contain "opt1 / opt2" alternatives: the learner is credited for the closest one.
// (The old 1.05 "boost" for speech errors is gone: it lifted near-misses over the pass mark.)
export function scoreAnswer(spoken, expectedFr) {
  const options = expectedFr
    .split("/")
    .map((s) => s.trim())
    .filter(Boolean);
  let best = 0;
  for (const opt of options) {
    best = Math.max(best, similarity(spoken, opt));
  }
  return best;
}
