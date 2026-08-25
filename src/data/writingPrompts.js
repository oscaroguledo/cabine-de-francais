// Original prompts, written to match the REAL TCF Canada / TEF Canada task structures
// documented in french/2026/01 and 02 of this project — not reproductions of any
// official or third-party exam material.
export const WRITING_TASKS = [
  {
    id: "tcf1",
    exam: "TCF Canada",
    task: "Task 1",
    title: "Everyday message",
    minutes: 12,
    minWords: 60,
    maxWords: 120,
    prompts: [
      "Write a short message to a friend inviting them to your birthday dinner this weekend. Mention the day, time, and place.",
      "Reply to a colleague's email asking if you can swap a work shift with them next week. Explain why and propose an alternative.",
      "Write a short note to your neighbour asking them to water your plants while you're away for a few days.",
    ],
  },
  {
    id: "tcf2",
    exam: "TCF Canada",
    task: "Task 2",
    title: "Informative text",
    minutes: 18,
    minWords: 120,
    maxWords: 150,
    prompts: [
      "Write a short text for a community newsletter describing a local event you recently attended.",
      "Describe, for new residents in your building, how the recycling and garbage collection schedule works.",
      "Write an informative text explaining the steps someone needs to take to open a bank account in Canada.",
    ],
  },
  {
    id: "tcf3",
    exam: "TCF Canada",
    task: "Task 3",
    title: "Structured argumentative text",
    minutes: 28,
    minWords: 120,
    maxWords: 180,
    prompts: [
      "Some people think remote work should become the default for office jobs. Give your opinion, with arguments and an example, and conclude.",
      "Should university education be free in Canada? Present your position with supporting arguments and a concrete example.",
      "Is social media doing more harm than good to teenagers? Argue your position clearly, with examples, and conclude.",
    ],
  },
  {
    id: "tefA",
    exam: "TEF Canada",
    task: "Section A",
    title: "Continue a short article",
    minutes: 25,
    minWords: 80,
    maxWords: 200,
    prompts: [
      "A local newspaper published the opening lines of a story about a small business that recently opened downtown. Continue the article in a realistic, newspaper-style tone.",
      "Continue this short article opening: \"City council announced yesterday a new plan to expand cycling paths across the downtown core...\"",
      "Continue this article opening: \"A record number of newcomers settled in the city last year, according to a report released this week...\"",
    ],
  },
  {
    id: "tefB",
    exam: "TEF Canada",
    task: "Section B",
    title: "Express and justify a point of view",
    minutes: 35,
    minWords: 200,
    maxWords: 300,
    prompts: [
      "Do you think artificial intelligence will create more jobs than it eliminates? Justify your opinion with clear arguments.",
      "Is it better to live in a big city or a small town? Defend your position with reasoning and examples.",
      "Should governments do more to regulate how much time young people spend online? Argue your view.",
    ],
  },
];
