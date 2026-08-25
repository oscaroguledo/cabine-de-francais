# Cabine de Français

A French speaking-practice app built around real vocabulary, real audio, and real speech
recognition — not just flashcards. Built with React + Vite.

## What it does

- **989 vocabulary entries** across three tiers: an 784-word everyday-French base course (15
  chapters), a 120-word C1/Advanced track (subjunctive, conditional, passive voice, professional
  register), and an 85-word C2 track (literary tenses, precise near-synonyms, register-switching,
  proverbs, elite rhetorical connectors).
- **Real audio** — every word and example sentence has a pre-rendered Canadian French clip
  (`public/audio/`), not just live browser text-to-speech.
- **Speech recognition scoring** — practice sessions use the Web Speech API to check your spoken
  answers against the target, with fuzzy matching for accented/alternate phrasing.
- **Full grammar course** — 15 base chapters plus 6 Advanced and 5 C2 grammar chapters, each with
  a self-check quiz, sourced from the same generator as the companion textbook.
- **TCF Canada / TEF Canada exam-format practice** — Reading, Listening, Writing, and Speaking
  modes matching the real task structures and timing, plus a full official-length 40-question
  Reading/Listening mock exam.
- **A CLB-aware Readiness dashboard** — tracks a Foundation Score against IRCC's official CLB
  conversion tables for both TCF and TEF Canada, with an explicit, honest breakdown of what the
  score does and doesn't measure.

## Running it

```
npm install
npm run dev
```

## Project structure

```
src/
  components/   — views: Home, Session, Grammar/AdvancedGrammar/C2Grammar,
                  Listening, Reading, Writing, Speaking, MockExam, Readiness
  hooks/        — speech recognition/synthesis, local audio playback, progress
                  tracking (localStorage), recorder (for self-review speaking practice)
  data/         — vocabulary, grammar lessons, and exam-practice content
  utils/        — fuzzy-matching, scoring, listening-set generation
scripts/        — generators for the textbook and audio assets
public/audio/   — pre-rendered pronunciation clips, organized by tier/chapter
```

## Related

This app is meant to be used alongside a companion grammar textbook (PDF) and a study
roadmap that maps app progress to real TCF/TEF Canada CLB score bands.
