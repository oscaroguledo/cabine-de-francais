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

    const chapterPeers = (byChapter[w.ch] || []).filter((p) => p.n !== w.n);
    const distractorPool = chapterPeers.length >= 3 ? chapterPeers : vocab.filter((p) => p.n !== w.n);
    const distractors = distractorPool
      .slice()
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)
      .map((p) => p.en);

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
