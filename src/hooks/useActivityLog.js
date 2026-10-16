import { useCallback } from "react";
import { clearDraft, getDb, loadDraft, recordActivity, saveDraft, setChapterStatus } from "../db/sqlite";

/**
 * Every answer and every finished step is written to the local database the moment it happens, so nothing is lost
 * when the tab closes or the page reloads. Saving never blocks the screen: a failed write is logged to the console.
 */
export function useActivityLog() {
  const log = useCallback((row) => {
    getDb()
      .then((db) => recordActivity(db, row))
      .catch((e) => console.error("Could not save activity", e));
  }, []);

  const chapter = useCallback((kind, chapterNo, status, score = null) => {
    getDb()
      .then((db) => setChapterStatus(db, kind, chapterNo, status, score))
      .catch((e) => console.error("Could not save chapter progress", e));
  }, []);

  // Unfinished work. save() replaces the previous draft for the same item.
  const draft = {
    save: useCallback((kind, item, body) => getDb().then((db) => saveDraft(db, kind, item, body)).catch((e) => console.error("Could not save draft", e)), []),
    load: useCallback((kind, item) => getDb().then((db) => loadDraft(db, kind, item)).catch(() => null), []),
    clear: useCallback((kind, item) => getDb().then((db) => clearDraft(db, kind, item)).catch(() => undefined), []),
  };

  return { log, chapter, draft };
}
