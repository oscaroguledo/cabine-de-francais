// Run with: npm test   (Node's built-in test runner; no extra dependencies)
import { test } from "node:test";
import assert from "node:assert/strict";
import { normalize, similarity, scoreAnswer } from "../src/utils/match.js";

test("normalize keeps accents and drops punctuation and case", () => {
  assert.equal(normalize("  Où, es-tu ?  "), "où es tu");
  assert.equal(normalize("C’est"), "c'est");
});

test("an exact match scores 1", () => {
  assert.equal(scoreAnswer("bonjour", "bonjour"), 1);
  assert.equal(scoreAnswer("Je suis là.", "je suis là"), 1);
});

test("a wrong accent is a small deduction, not a miss (accents are mostly written, not spoken)", () => {
  // "ou" and "où" sound the same: a learner who says it right should not fail
  const s = similarity("ou", "où");
  assert.ok(s >= 0.8 && s < 1, `ou vs où scored ${s}`);
  assert.ok(similarity("je suis la", "je suis là") >= 0.9);
});

test("a wrong letter is a full miss", () => {
  assert.ok(similarity("bonsoir", "bonjour") < 0.75);
  assert.ok(scoreAnswer("merci", "bonjour") < 0.3);
});

test("the old 1.05 boost is gone: a near-miss does not get lifted over the pass mark", () => {
  const raw = similarity("bonjours", "bonjour");
  assert.equal(scoreAnswer("bonjours", "bonjour"), raw);
  assert.ok(raw < 1);
});

test("alternatives separated by / are credited for the closest one", () => {
  assert.equal(scoreAnswer("au revoir", "bonjour / au revoir"), 1);
});

test("empty input scores 0", () => {
  assert.equal(scoreAnswer("", "bonjour"), 0);
  assert.equal(scoreAnswer("   ", "bonjour"), 0);
});
