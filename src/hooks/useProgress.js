import { useCallback, useEffect, useRef, useState } from "react";
import { getDb, persist as persistDb } from "../db/sqlite";

function readAllProgress(db) {
  const result = {};
  const res = db.exec("SELECT word_number, correct, wrong, mastered, avg_score FROM progress");
  if (res.length) {
    for (const [wordNumber, correct, wrong, mastered, avgScore] of res[0].values) {
      result[wordNumber] = { correct, wrong, mastered: !!mastered, avgScore };
    }
  }
  return result;
}

function readBestStreak(db) {
  const res = db.exec("SELECT value FROM meta WHERE key='best_streak'");
  if (res.length && res[0].values.length) {
    return parseInt(res[0].values[0][0], 10) || 0;
  }
  return 0;
}

/**
 * Progress is backed by a real SQLite database (sql.js, WASM), persisted to
 * IndexedDB — durable across reloads/browser restarts, unlike the plain
 * localStorage this replaced. See src/db/sqlite.js for the storage layer and
 * the "Download database" control (Readiness view) for a portable .sqlite
 * export of the same data.
 */
export function useProgress() {
  const [ready, setReady] = useState(false);
  const [progress, setProgress] = useState({});
  const [bestStreak, setBestStreak] = useState(0);
  const dbRef = useRef(null);
  const pendingRef = useRef([]); // writes that arrive before the WASM DB finishes loading

  useEffect(() => {
    let cancelled = false;
    getDb().then((db) => {
      if (cancelled) return;
      dbRef.current = db;
      for (const apply of pendingRef.current) apply(db);
      pendingRef.current = [];
      setProgress(readAllProgress(db));
      setBestStreak(readBestStreak(db));
      setReady(true);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const recordAnswer = useCallback((wordNumber, isCorrect, rawScore = isCorrect ? 1 : 0) => {
    const apply = (db) => {
      const res = db.exec(`SELECT correct, wrong, avg_score FROM progress WHERE word_number = ${Number(wordNumber)}`);
      let correct = 0;
      let wrong = 0;
      let avgScore = null;
      if (res.length && res[0].values.length) {
        [correct, wrong, avgScore] = res[0].values[0];
      }
      const nextAvg = typeof avgScore === "number" ? avgScore * 0.7 + rawScore * 0.3 : rawScore;
      let nextCorrect = correct;
      let nextWrong = wrong;
      let mastered;
      if (isCorrect) {
        nextCorrect += 1;
        mastered = nextCorrect >= 3 && nextCorrect >= nextWrong * 2;
      } else {
        nextWrong += 1;
        mastered = false;
      }
      db.run(
        "INSERT OR REPLACE INTO progress (word_number, correct, wrong, mastered, avg_score, updated_at) VALUES (?, ?, ?, ?, ?, ?)",
        [Number(wordNumber), nextCorrect, nextWrong, mastered ? 1 : 0, nextAvg, new Date().toISOString()]
      );
      persistDb(db);
      setProgress((prev) => ({
        ...prev,
        [wordNumber]: { correct: nextCorrect, wrong: nextWrong, mastered, avgScore: nextAvg },
      }));
    };
    if (dbRef.current) apply(dbRef.current);
    else pendingRef.current.push(apply);
  }, []);

  const reportStreak = useCallback((streak) => {
    const apply = (db) => {
      const current = readBestStreak(db);
      if (streak > current) {
        db.run("INSERT OR REPLACE INTO meta (key, value) VALUES ('best_streak', ?)", [String(streak)]);
        persistDb(db);
        setBestStreak(streak);
      }
    };
    if (dbRef.current) apply(dbRef.current);
    else pendingRef.current.push(apply);
  }, []);

  return { progress, recordAnswer, bestStreak, reportStreak, ready, db: dbRef };
}
