<div align="center">

# Cabine de Français

**A speech-driven French learning platform — real vocabulary, real audio, real speech recognition.**

[![React](https://img.shields.io/badge/React-19-149ECA?logo=react&logoColor=white)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)](https://vitejs.dev)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES2022-F7DF1E?logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

</div>

---

## Overview

Cabine de Français is a full-stack front-end application for learning French through active
production, not passive recognition. Rather than a flashcard app, it puts the learner in a
"recording booth" — the app plays or prompts a phrase, the learner speaks their answer aloud, and
the Web Speech API's `SpeechRecognition` transcribes it for fuzzy-matched, real-time scoring
against the target.

The project was built to support structured preparation for Canada's official French-proficiency
exams (**TCF Canada** and **TEF Canada**), and its content and scoring are explicitly designed
around IRCC's **Canadian Language Benchmark (CLB)** framework used for Express Entry immigration.

## Features

**Vocabulary & Pronunciation**
- 989 vocabulary entries across three proficiency tiers — an 784-word everyday-French base course
  (CEFR A1–B1), a 120-word Advanced/C1 track, and an 85-word C2 track
- Every word and example sentence ships with a pre-rendered native-quality audio clip
  (`public/audio/`) rather than relying solely on the browser's TTS engine
- Live pronunciation scoring via `SpeechRecognition`, with a normalization/fuzzy-matching layer
  that tolerates accented characters and phrasing variants

**Grammar**
- 15 base grammar chapters plus 6 Advanced (subjunctive, conditional/si-clauses, passive voice,
  compound relative pronouns, professional register) and 5 C2 chapters (literary tenses,
  near-synonym precision, register-switching, proverbs, advanced rhetoric)
- Each chapter includes an interactive self-check quiz

**Exam Preparation**
- Reading, Listening, Writing, and Speaking practice modes matching the real TCF/TEF Canada task
  formats, timing, and scoring rubrics
- An official-length mock exam (40-question Reading and Listening sections)
- Self-review workflows for open-ended tasks (Writing/Speaking), since automated grading of
  free-form language production isn't reliable — the app is explicit about that limitation
  rather than faking a score

**Progress & Readiness**
- A Foundation Score computed from coverage, mastery, cross-chapter balance, and rolling
  pronunciation accuracy, persisted client-side
- A Readiness dashboard that maps progress against IRCC's published CLB conversion tables for
  both TCF and TEF Canada — with an explicit breakdown of what the score does and doesn't measure

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 + Vite 8 |
| Speech | Web Speech API (`SpeechRecognition`, `SpeechSynthesis`) |
| Audio | Pre-rendered `.m4a` clips, generated via a Python/`say`-based build script |
| State | React hooks + `localStorage` (no backend — fully client-side) |
| Markdown rendering | `marked` (for grammar-lesson content) |
| Linting | `oxlint` |

## Getting Started

```bash
npm install
npm run dev       # start the dev server
npm run build      # production build
npm run preview    # preview the production build locally
```

## Project Structure

```
src/
  components/     Home, Session, Grammar / AdvancedGrammar / C2Grammar,
                  Listening, Reading, Writing, Speaking, MockExam, Readiness
  hooks/          speech recognition & synthesis, local audio playback,
                  progress persistence, MediaRecorder-based self-review
  data/           vocabulary, grammar lessons, and exam-practice content
  utils/          fuzzy string matching, Foundation Score computation,
                  listening-set generation
scripts/          generators for the companion textbook and audio assets
public/audio/     pre-rendered pronunciation clips, organized by tier/chapter
```

## Design Notes

- **No backend.** All state (progress, mastery, theme) is stored in `localStorage`; the app is a
  static bundle deployable anywhere.
- **Graceful degradation.** Speech recognition, audio playback, and microphone recording all
  detect browser support and fall back cleanly (typed input, browser TTS, or a disabled control
  with an explanation) rather than failing silently.
- **Honesty over polish in scoring.** Where the app can't reliably auto-grade something —
  spontaneous speaking, open-ended writing — it says so explicitly and hands the learner a
  self-assessment rubric instead of a fabricated number.

## Related Materials

This app is one part of a three-piece study system: a companion grammar textbook (PDF, generated
from the same chapter source as the in-app Grammar mode) and a study roadmap that maps app
progress to real TCF/TEF Canada CLB score bands and lays out the multi-skill work the app alone
doesn't cover.

## License

Personal project — no license currently specified. All rights reserved by the author.
