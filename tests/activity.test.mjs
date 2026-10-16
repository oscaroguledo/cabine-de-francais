// Run with: npm test
// Checks the activity tables and their write functions against a real SQLite engine (sql.js).
import { test } from "node:test";
import assert from "node:assert/strict";
import initSqlJs from "sql.js";
import { readFileSync } from "node:fs";
import { recordActivity, setChapterStatus } from "../src/db/sqlite.js";

const SQL = await initSqlJs({ locateFile: (f) => `node_modules/sql.js/dist/${f}` });
const schemaSource = readFileSync(new URL("../src/db/sqlite.js", import.meta.url), "utf8");
const SCHEMA = schemaSource.match(/const SCHEMA = `([\s\S]*?)`;/)[1];

function freshDb() {
  const db = new SQL.Database();
  db.run(SCHEMA);
  return db;
}

test("each answer is stored with its kind, item, result and answer", () => {
  const db = freshDb();
  recordActivity(db, { kind: "grammar_quiz", item: "1:1", correct: true, answer: "0" });
  recordActivity(db, { kind: "grammar_quiz", item: "1:2", correct: false, answer: "3" });
  const rows = db.exec("SELECT kind, item, correct, answer FROM activity ORDER BY id")[0].values;
  assert.deepEqual(rows, [["grammar_quiz", "1:1", 1, "0"], ["grammar_quiz", "1:2", 0, "3"]]);
});

test("an unanswered item is stored as unknown, not as wrong", () => {
  const db = freshDb();
  recordActivity(db, { kind: "reading", item: "p1-0", correct: null, answer: null });
  assert.deepEqual(db.exec("SELECT correct, answer FROM activity")[0].values, [[null, null]]);
});

test("chapter status moves forward and keeps the best score", () => {
  const db = freshDb();
  setChapterStatus(db, "grammar", 3, "opened");
  setChapterStatus(db, "grammar", 3, "quiz_done", 0.8);
  setChapterStatus(db, "grammar", 3, "quiz_done", 0.4);   // a weaker retry
  const [row] = db.exec("SELECT status, best_score FROM chapter_status WHERE kind='grammar' AND chapter='3'")[0].values;
  assert.deepEqual(row, ["quiz_done", 0.8]);
});

test("a stronger retry replaces the best score", () => {
  const db = freshDb();
  setChapterStatus(db, "c2_grammar", 2, "quiz_done", 0.5);
  setChapterStatus(db, "c2_grammar", 2, "quiz_done", 1);
  assert.equal(db.exec("SELECT best_score FROM chapter_status")[0].values[0][0], 1);
});

test("the tables survive a save and reload (export then open)", () => {
  const db = freshDb();
  recordActivity(db, { kind: "writing", item: "tcf1:2", answer: "Bonjour" });
  setChapterStatus(db, "grammar", 1, "quiz_done", 0.75);
  const reopened = new SQL.Database(db.export());
  reopened.run(SCHEMA);   // what the app does on every load
  assert.equal(reopened.exec("SELECT COUNT(*) FROM activity")[0].values[0][0], 1);
  assert.equal(reopened.exec("SELECT COUNT(*) FROM chapter_status")[0].values[0][0], 1);
});

// --- drafts and history (imported from the same module, so the schema is the app's own) ---
import { saveDraft, loadDraft, clearDraft, readHistory } from "../src/db/sqlite.js";

test("a draft is saved, replaced, read back and cleared", () => {
  const db = freshDb();
  assert.equal(loadDraft(db, "writing", "tcf1"), null);
  saveDraft(db, "writing", "tcf1", { promptIdx: 2, text: "Bonjour" });
  saveDraft(db, "writing", "tcf1", { promptIdx: 2, text: "Bonjour, je suis Marie" });
  assert.deepEqual(loadDraft(db, "writing", "tcf1"), { promptIdx: 2, text: "Bonjour, je suis Marie" });
  assert.equal(db.exec("SELECT COUNT(*) FROM drafts")[0].values[0][0], 1, "one draft per item");
  clearDraft(db, "writing", "tcf1");
  assert.equal(loadDraft(db, "writing", "tcf1"), null);
});

test("drafts of different tasks do not collide", () => {
  const db = freshDb();
  saveDraft(db, "writing", "tcf1", { text: "a" });
  saveDraft(db, "writing", "tcf2", { text: "b" });
  assert.equal(loadDraft(db, "writing", "tcf1").text, "a");
  assert.equal(loadDraft(db, "writing", "tcf2").text, "b");
});

test("history reports totals, marked results, chapters, writing and drafts", () => {
  const db = freshDb();
  recordActivity(db, { kind: "grammar_quiz", item: "1:1", correct: true, answer: "0" });
  recordActivity(db, { kind: "grammar_quiz", item: "1:2", correct: false, answer: "1" });
  recordActivity(db, { kind: "writing", item: "tcf1:0", answer: "Bonjour" });
  recordActivity(db, { kind: "writing_rubric", item: "tcf1:vocab", correct: true });
  setChapterStatus(db, "grammar", 1, "quiz_done", 0.5);
  saveDraft(db, "writing", "tcf2", { text: "en cours" });
  const h = readHistory(db);
  const quiz = h.totals.find((t) => t.kind === "grammar_quiz");
  assert.deepEqual([quiz.count, quiz.right, quiz.graded], [2, 1, 2]);
  const writing = h.totals.find((t) => t.kind === "writing");
  assert.deepEqual([writing.count, writing.graded], [1, 0], "a writing submission is not marked right or wrong");
  assert.equal(h.chapters[0].best, 0.5);
  assert.equal(h.writing[0].text, "Bonjour");
  assert.equal(h.drafts[0].body.text, "en cours");
  assert.equal(h.recent[0].kind, "writing_rubric");
});
