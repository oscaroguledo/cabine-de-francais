import initSqlJs from "sql.js";
import { loadBlob, saveBlob } from "./idbBlobStore";

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

export function exportDbFile(db) {
  const bytes = db.export();
  return new Blob([bytes], { type: "application/x-sqlite3" });
}

export async function importDbFile(file) {
  const buf = new Uint8Array(await file.arrayBuffer());
  await saveBlob(DB_KEY, buf);
}
