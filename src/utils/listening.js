// Builds "listen to French audio, choose the correct English meaning" MCQ sets.
// Distractors are drawn from the SAME chapter so they're plausible confusors,
// not random unrelated words.
export function buildListeningSet(vocab, byChapter, count = 10, chapterFilter = null) {
  const pool = chapterFilter ? vocab.filter((w) => w.ch === chapterFilter) : vocab;
  const shuffled = pool.slice().sort(() => Math.random() - 0.5).slice(0, count);

  return shuffled.map((w) => {
    const useExample = w.ex.length && Math.random() < 0.4;
    const prompt = useExample ? { en: w.ex[0][0], fr: w.ex[0][1] } : { en: w.en, fr: w.fr };
    const clipType = useExample ? "ex1" : "word";

    // Three wrong answers that are different from the right one AND from each other. Two words can share an English
    // meaning, so a plain pick could show the right answer twice (or the same wrong answer twice): that is unfair to the
    // learner and breaks the question on screen.
    const chapterPeers = (byChapter[w.ch] || []).filter((p) => p.n !== w.n);
    const candidates = [...chapterPeers, ...vocab].filter((p) => p.n !== w.n);
    const distractors = [];
    for (const p of candidates.slice().sort(() => Math.random() - 0.5)) {
      if (distractors.length === 3) break;
      if (p.en !== prompt.en && !distractors.includes(p.en)) distractors.push(p.en);
    }

    const options = [prompt.en, ...distractors].sort(() => Math.random() - 0.5);
    return {
      n: w.n,
      clipType,
      fr: prompt.fr,
      correctAnswer: prompt.en,
      options,
    };
  });
}
