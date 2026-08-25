// Verified against IRCC's Express Entry language-test equivalency page (french/2026/01 and 02
// in this project, cross-checked June 2026). TEF Canada uses the ORIGINAL per-skill scale
// (360/300/450/450), never the harmonized /699 column — using /699 on an Express Entry
// profile can cause a refusal. Re-verify on canada.ca before relying on this for an application.

export const TCF_CLB_TABLE = [
  { clb: "10+", listening: "549–699", reading: "549–699", writing: "16–20", speaking: "16–20" },
  { clb: "9", listening: "523–548", reading: "524–548", writing: "14–15", speaking: "14–15" },
  { clb: "8", listening: "503–522", reading: "499–523", writing: "12–13", speaking: "12–13" },
  { clb: "7", listening: "458–502", reading: "453–498", writing: "10–11", speaking: "10–11" },
  { clb: "6", listening: "398–457", reading: "406–452", writing: "7–9", speaking: "7–9" },
  { clb: "5", listening: "369–397", reading: "375–405", writing: "6", speaking: "6" },
  { clb: "4", listening: "331–368", reading: "342–374", writing: "4–5", speaking: "4–5" },
];

export const TEF_CLB_TABLE = [
  { clb: "10", listening: "316–360", reading: "263–300", writing: "393–450", speaking: "393–450" },
  { clb: "9", listening: "298–315", reading: "248–262", writing: "371–392", speaking: "371–392" },
  { clb: "8", listening: "280–297", reading: "233–247", writing: "349–370", speaking: "349–370" },
  { clb: "7", listening: "249–279", reading: "207–232", writing: "310–348", speaking: "310–348" },
  { clb: "6", listening: "217–248", reading: "181–206", writing: "271–309", speaking: "271–309" },
  { clb: "5", listening: "181–216", reading: "151–180", writing: "226–270", speaking: "226–270" },
  { clb: "4", listening: "145–180", reading: "121–150", writing: "181–225", speaking: "181–225" },
];

// Foundation Score bands. These describe vocabulary breadth + isolated-word/sentence
// pronunciation accuracy ONLY — see the Readiness view's scope panel. The CLB range named
// per band is a rough, self-assessment-only correspondence to the vocabulary/pronunciation
// component of CLB speaking descriptors, not a prediction of your TCF/TEF result.
export const FOUNDATION_BANDS = [
  {
    min: 0,
    max: 19,
    label: "Just starting",
    clbHint: "pre-CLB 2",
    note: "You're at the very beginning of building a French vocabulary base.",
  },
  {
    min: 20,
    max: 39,
    label: "Building the base",
    clbHint: "CLB 1–2 range",
    note: "Survival vocabulary is forming — greetings, basic needs, simple exchanges.",
  },
  {
    min: 40,
    max: 59,
    label: "Basic everyday vocabulary",
    clbHint: "CLB 3–4 range",
    note: "You can name and recall a real slice of everyday life — family, food, time, places.",
  },
  {
    min: 60,
    max: 79,
    label: "Solid everyday vocabulary",
    clbHint: "CLB 4–5 range",
    note: "Broad, dependable recall across most everyday domains, with decent pronunciation.",
  },
  {
    min: 80,
    max: 94,
    label: "Strong foundation",
    clbHint: "CLB 5–6 range",
    note: "Full-corpus strength. This is a real vocabulary base to build CLB 7 grammar, listening, and argumentation skills on top of.",
  },
  {
    min: 95,
    max: 100,
    label: "Full corpus mastery",
    clbHint: "CLB 6 vocabulary ceiling",
    note: "You've maxed out what this 784-word corpus can measure. CLB 7 itself now depends on skills this app doesn't test — see the Roadmap.",
  },
];

export function bandFor(score) {
  return FOUNDATION_BANDS.find((b) => score >= b.min && score <= b.max) || FOUNDATION_BANDS[0];
}
