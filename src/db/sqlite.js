import initSqlJs from "sql.js";
import { loadBlob, saveBlob } from "./idbBlobStore.js";

const DB_KEY = "cabine_progress.sqlite";
const LOCALSTORAGE_LEGACY_KEY = "cabine_progress_v1";
const LOCALSTORAGE_STREAK_KEY = "cabine_best_streak";

const SCHEMA = `
CREATE TABLE IF NOT EXISTS progress (
  word_number INTEGER PRIMARY KEY,
  correct     INTEGER NOT NULL DEFAULT 0,
  wrong       INTEGER NOT NULL DEFAULT 0,
  mastered    INTEGER NOT NULL DEFAULT 0,
  avg_score   REAL,
  updated_at  TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS meta (
  key   TEXT PRIMARY KEY,
  value TEXT
);
-- Every answer and every finished step, across all activities (quizzes, reading, listening, writing, speaking).
CREATE TABLE IF NOT EXISTS activity (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  kind       TEXT NOT NULL,
  item       TEXT NOT NULL,
  correct    INTEGER,
  score      REAL,
  answer     TEXT,
  created_at TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_activity_kind ON activity (kind, item);
-- Unfinished work, saved as it is typed, so it survives closing the page. One draft per activity item.
CREATE TABLE IF NOT EXISTS drafts (
  kind       TEXT NOT NULL,
  item       TEXT NOT NULL,
  body       TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  PRIMARY KEY (kind, item)
);
-- Where the learner is in each chapter (opened, quiz started, quiz finished) and their best quiz score.
CREATE TABLE IF NOT EXISTS chapter_status (
  kind       TEXT NOT NULL,
  chapter    TEXT NOT NULL,
  status     TEXT NOT NULL,
  best_score REAL,
  updated_at TEXT NOT NULL,
  PRIMARY KEY (kind, chapter)
);
`;

let dbPromise = null;
let saveTimer = null;

function scheduleSave(db) {
  // debounce so rapid-fire answers during a session don't each trigger a
  // full IndexedDB write of the whole (small, but non-zero) DB blob
  clearTimeout(saveTimer);
  saveTimer = setTimeout(() => {
    const bytes = db.export();
    saveBlob(DB_KEY, bytes);
  }, 400);
}

function migrateFromLocalStorage(db) {
  try {
    const raw = localStorage.getItem(LOCALSTORAGE_LEGACY_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      const now = new Date().toISOString();
      const stmt = db.prepare(
        "INSERT OR REPLACE INTO progress (word_number, correct, wrong, mastered, avg_score, updated_at) VALUES (?, ?, ?, ?, ?, ?)"
      );
      for (const [wordNumber, entry] of Object.entries(parsed)) {
        stmt.run([
          Number(wordNumber),
          entry.correct || 0,
          entry.wrong || 0,
          entry.mastered ? 1 : 0,
          typeof entry.avgScore === "number" ? entry.avgScore : null,
          now,
        ]);
      }
      stmt.free();
    }
    const streak = localStorage.getItem(LOCALSTORAGE_STREAK_KEY);
    if (streak) {
      db.run("INSERT OR REPLACE INTO meta (key, value) VALUES ('best_streak', ?)", [streak]);
    }
  } catch (e) {
    /* nothing to migrate, or malformed legacy data — safe to skip */
  }
}

export function getDb() {
  if (!dbPromise) {
    dbPromise = (async () => {
      const SQL = await initSqlJs({ locateFile: (file) => `/${file}` });
      const existing = await loadBlob(DB_KEY);
      const db = existing ? new SQL.Database(new Uint8Array(existing)) : new SQL.Database();
      db.run(SCHEMA);
      if (!existing) {
        migrateFromLocalStorage(db);
        scheduleSave(db);
      }
      return db;
    })();
  }
  return dbPromise;
}

export function persist(db) {
  scheduleSave(db);
}

/** Forces an immediate (non-debounced) save — used before exporting/closing. */
export function persistNow(db) {
  clearTimeout(saveTimer);
  const bytes = db.export();
  return saveBlob(DB_KEY, bytes);
}

/** Save one answer. Written to disk straight away, not after a delay. */
export function recordActivity(db, { kind, item, correct = null, score = null, answer = null }) {
  db.run(
    "INSERT INTO activity (kind, item, correct, score, answer, created_at) VALUES (?, ?, ?, ?, ?, ?)",
    [kind, String(item), correct === null ? null : correct ? 1 : 0, score, answer, new Date().toISOString()]
  );
  return persistNow(db);
}

/** Save where the learner is in a chapter. The best score is kept, never lowered by a weaker retry. */
export function setChapterStatus(db, kind, chapterNo, status, score = null) {
  db.run(
    `INSERT INTO chapter_status (kind, chapter, status, best_score, updated_at) VALUES (?, ?, ?, ?, ?)
     ON CONFLICT(kind, chapter) DO UPDATE SET
       status = excluded.status,
       best_score = CASE
         WHEN excluded.best_score IS NULL THEN chapter_status.best_score
         WHEN chapter_status.best_score IS NULL THEN excluded.best_score
         ELSE MAX(chapter_status.best_score, excluded.best_score) END,
       updated_at = excluded.updated_at`,
    [kind, String(chapterNo), status, score, new Date().toISOString()]
  );
  return persistNow(db);
}

/** Save unfinished work (the text being written). Replaces the previous draft for the same item. */
export function saveDraft(db, kind, item, body) {
  db.run(
    "INSERT OR REPLACE INTO drafts (kind, item, body, updated_at) VALUES (?, ?, ?, ?)",
    [kind, String(item), JSON.stringify(body), new Date().toISOString()]
  );
  return persistNow(db);
}

/** The saved draft for an item, or null. */
export function loadDraft(db, kind, item) {
  const res = db.exec("SELECT body FROM drafts WHERE kind = ? AND item = ?", [kind, String(item)]);
  return res.length && res[0].values.length ? JSON.parse(res[0].values[0][0]) : null;
}

export function clearDraft(db, kind, item) {
  db.run("DELETE FROM drafts WHERE kind = ? AND item = ?", [kind, String(item)]);
  return persistNow(db);
}

/** Everything the History screen shows, read in one go. */
export function readHistory(db) {
  const rows = (sql, params = []) => {
    const res = db.exec(sql, params);
    return res.length ? res[0].values : [];
  };
  return {
    totals: rows(`SELECT kind, COUNT(*), SUM(CASE WHEN correct = 1 THEN 1 ELSE 0 END), SUM(CASE WHEN correct IS NOT NULL THEN 1 ELSE 0 END)
                  FROM activity GROUP BY kind ORDER BY kind`).map(([kind, count, right, graded]) => ({ kind, count, right, graded })),
    chapters: rows("SELECT kind, chapter, status, best_score, updated_at FROM chapter_status ORDER BY kind, CAST(chapter AS INTEGER)")
      .map(([kind, chapter, status, best, updatedAt]) => ({ kind, chapter, status, best, updatedAt })),
    recent: rows("SELECT id, kind, item, correct, answer, created_at FROM activity ORDER BY id DESC LIMIT 200")
      .map(([id, kind, item, correct, answer, at]) => ({ id, kind, item, correct: correct === null ? null : correct === 1, answer, at })),
    writing: rows("SELECT id, item, answer, created_at FROM activity WHERE kind = 'writing' ORDER BY id DESC LIMIT 50")
      .map(([id, item, text, at]) => ({ id, item, text, at })),
    drafts: rows("SELECT kind, item, body, updated_at FROM drafts ORDER BY updated_at DESC")
      .map(([kind, item, body, at]) => ({ kind, item, body: JSON.parse(body), at })),
  };
}

/** A small setting (theme, and so on), kept in the database. */
export function setSetting(db, key, value) {
  db.run("INSERT OR REPLACE INTO meta (key, value) VALUES (?, ?)", [key, String(value)]);
  return persistNow(db);
}

export function getSetting(db, key) {
  const res = db.exec("SELECT value FROM meta WHERE key = ?", [key]);
  return res.length && res[0].values.length ? res[0].values[0][0] : null;
}

export function exportDbFile(db) {
  const bytes = db.export();
  return new Blob([bytes], { type: "application/x-sqlite3" });
}

export async function importDbFile(file) {
  const buf = new Uint8Array(await file.arrayBuffer());
  await saveBlob(DB_KEY, buf);
}
