// Original prompts matching the REAL TCF Canada / TEF Canada speaking task structures.
export const SPEAKING_TASKS = [
  {
    id: "tcfS1",
    exam: "TCF Canada",
    task: "Task 1",
    title: "Structured interview",
    prepSeconds: 0,
    speakSeconds: 120,
    prompts: [
      "The examiner asks you to introduce yourself: your name, where you're from, what you do, and why you're learning French.",
      "The examiner asks about your daily routine: describe a typical day from morning to evening.",
      "The examiner asks about your family and where you live.",
    ],
  },
  {
    id: "tcfS2",
    exam: "TCF Canada",
    task: "Task 2",
    title: "Role-play",
    prepSeconds: 120,
    speakSeconds: 210,
    prompts: [
      "You're calling a clinic to book a doctor's appointment. Explain why you need one and negotiate a time that works for you.",
      "Your flight was cancelled and you're at the airline counter trying to resolve it. Explain the situation and ask for a solution.",
      "You want to return a defective product to a store without the receipt. Make your case to the clerk.",
    ],
  },
  {
    id: "tcfS3",
    exam: "TCF Canada",
    task: "Task 3",
    title: "Argued monologue",
    prepSeconds: 0,
    speakSeconds: 270,
    prompts: [
      "Should companies require employees to return to the office full-time? Present your opinion, arguments, an example, and a conclusion.",
      "Is it better for cities to invest in public transit or in roads for cars? Argue your position.",
      "Should students be allowed to use AI tools for their homework? Give your opinion with reasoning and an example.",
    ],
  },
  {
    id: "tefSA",
    exam: "TEF Canada",
    task: "Section A",
    title: "Gather information",
    prepSeconds: 60,
    speakSeconds: 300,
    prompts: [
      "You want to book a hotel room for a weekend trip. Ask the examiner (playing the hotel clerk) the questions you need to make your booking.",
      "You're planning a birthday party and need to ask a venue's staff about availability, cost, and catering options.",
      "You're enrolling in a language course and need to ask the school's staff about schedule, cost, and level placement.",
    ],
  },
  {
    id: "tefSB",
    exam: "TEF Canada",
    task: "Section B",
    title: "Defend a position",
    prepSeconds: 60,
    speakSeconds: 600,
    prompts: [
      "The examiner will challenge your view that working from home is better than working in an office. Defend your position.",
      "The examiner will push back on your opinion that social media should be more heavily regulated. Hold your ground with arguments.",
      "The examiner will disagree with your view that university should be free. Defend and refine your position under challenge.",
    ],
  },
];
