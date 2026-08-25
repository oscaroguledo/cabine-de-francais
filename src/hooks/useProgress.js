import { useCallback, useRef, useState } from "react";

const STORAGE_KEY = "cabine_progress_v1";
const STREAK_KEY = "cabine_best_streak";

function loadProgress() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    return {};
  }
}

export function useProgress() {
  const [progress, setProgress] = useState(loadProgress);
  const progressRef = useRef(progress);
  progressRef.current = progress;

  const persist = useCallback((next) => {
    setProgress(next);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch (e) {
      /* private mode / storage disabled — practice still works, just not saved */
    }
  }, []);

  const recordAnswer = useCallback(
    (wordNumber, isCorrect, rawScore = isCorrect ? 1 : 0) => {
      const current = progressRef.current;
      const entry = current[wordNumber] || { correct: 0, wrong: 0, mastered: false, avgScore: null };
      const nextEntry = { ...entry };
      // exponential moving average — bounded storage, recent attempts weighted higher
      nextEntry.avgScore =
        typeof entry.avgScore === "number" ? entry.avgScore * 0.7 + rawScore * 0.3 : rawScore;
      if (isCorrect) {
        nextEntry.correct += 1;
        nextEntry.mastered = nextEntry.correct >= 3 && nextEntry.correct >= nextEntry.wrong * 2;
      } else {
        nextEntry.wrong += 1;
        nextEntry.mastered = false;
      }
      persist({ ...current, [wordNumber]: nextEntry });
    },
    [persist]
  );

  const getBestStreak = useCallback(() => {
    try {
      return parseInt(localStorage.getItem(STREAK_KEY) || "0", 10);
    } catch (e) {
      return 0;
    }
  }, []);

  const reportStreak = useCallback(
    (streak) => {
      const best = getBestStreak();
      if (streak > best) {
        try {
          localStorage.setItem(STREAK_KEY, String(streak));
        } catch (e) {}
      }
    },
    [getBestStreak]
  );

  return { progress, recordAnswer, getBestStreak, reportStreak };
}
