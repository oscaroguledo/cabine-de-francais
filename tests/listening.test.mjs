// Run with: npm test
import { test } from "node:test";
import assert from "node:assert/strict";
import { buildListeningSet } from "../src/utils/listening.js";

// A vocabulary where several words share an English meaning, which is exactly what used to break the questions.
const vocab = [
  { n: 1, ch: 1, fr: "chat", en: "cat", ex: [] },
  { n: 2, ch: 1, fr: "chatte", en: "cat", ex: [] },
  { n: 3, ch: 1, fr: "chien", en: "dog", ex: [] },
  { n: 4, ch: 1, fr: "chiot", en: "dog", ex: [] },
  { n: 5, ch: 1, fr: "oiseau", en: "bird", ex: [] },
  { n: 6, ch: 1, fr: "poisson", en: "fish", ex: [] },
  { n: 7, ch: 1, fr: "vache", en: "cow", ex: [] },
];
const byChapter = { 1: vocab };

test("every question has four different options, one of them the right answer", () => {
  for (let run = 0; run < 200; run++) {
    for (const q of buildListeningSet(vocab, byChapter, 7)) {
      assert.equal(q.options.length, 4, `question ${q.n}`);
      assert.equal(new Set(q.options).size, 4, `duplicate option in question ${q.n}: ${q.options}`);
      assert.ok(q.options.includes(q.correctAnswer), `answer missing for question ${q.n}`);
    }
  }
});
