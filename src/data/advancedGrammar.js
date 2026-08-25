export const ADVANCED_GRAMMAR = [
  {
    achapter: 1,
    title: "Le Subjonctif — Doute, Émotion, Nécessité",
    intro:
      "The subjunctive is the single biggest grammatical gap between B1 and C1 French — it marks the difference between stating a fact and expressing necessity, doubt, emotion, or subjectivity, and native speakers use it constantly without thinking about it.",
    grammar: `
**Formation.** For most verbs, take the *ils/elles* form of the present indicative, drop **-ent**, and add the subjunctive endings: **-e, -es, -e, -ions, -iez, -ent**.

| | parler → ils parl**ent** | finir → ils finiss**ent** |
|---|---|---|
| que je | parle | finisse |
| que tu | parles | finisses |
| qu'il/elle/on | parle | finisse |
| que nous | parlions | finissions |
| que vous | parliez | finissiez |
| qu'ils/elles | parlent | finissent |

**Key irregular subjunctives** (must be memorized individually):

| | être | avoir | aller | faire | pouvoir | vouloir | savoir |
|---|---|---|---|---|---|---|---|
| que je/j' | sois | aie | aille | fasse | puisse | veuille | sache |
| que nous | soyons | ayons | allions | fassions | puissions | voulions | sachions |

**When does French require the subjunctive?** After expressions of:
- **Necessity/obligation**: il faut que, il est nécessaire que
- **Doubt/uncertainty**: je doute que, il n'est pas certain que (note: *je suis certain que* takes the **indicative**, since certainty is a fact, not a doubt)
- **Emotion**: je regrette que, je suis content(e) que, j'ai peur que
- **Wish/desire**: je souhaite que, je veux que
- **Certain conjunctions**: bien que, avant que, pour que, à moins que, jusqu'à ce que, sans que, de peur que

**The key test**: if the main clause expresses a *fact* (je sais que, il est certain que, je pense que in the affirmative), use the **indicative**. If it expresses *necessity, doubt, emotion, or desire about* an event, use the **subjunctive**. This single distinction is worth more C1-level accuracy than almost any other grammar point.
`,
    quiz: [
      { q: "\"Il faut que tu ___ (finir) ce travail.\"", options: ["finis", "finisses", "finira"], answer: 1, explain: "il faut que triggers the subjunctive: que tu finisses." },
      { q: "\"Je pense qu'il ___ (être) en retard.\" (stating a fact/opinion, affirmative)", options: ["soit", "est", "serait"], answer: 1, explain: "je pense que (affirmative) takes the indicative, not the subjunctive — it's a stated belief, not doubt." },
      { q: "\"Bien qu'il ___ (avoir) raison, personne ne l'écoute.\"", options: ["a", "ait", "aurait"], answer: 1, explain: "bien que always triggers the subjunctive: qu'il ait raison." },
      { q: "\"Je doute qu'elle ___ (savoir) la réponse.\"", options: ["sait", "sache", "saura"], answer: 1, explain: "je doute que is a classic doubt-trigger for the subjunctive: qu'elle sache." },
    ],
  },
  {
    achapter: 2,
    title: "Le Conditionnel & Les Phrases Hypothétiques",
    intro:
      "Si-clauses are where a lot of intermediate French plateaus — the three-way split (real / hypothetical / unreal-past condition) is what separates B1 guessing from C1 precision.",
    grammar: `
**The conditional's formation is simple: infinitive + the imperfect endings** (-ais, -ais, -ait, -ions, -iez, -aient). *Je parlerais, tu finirais, nous vendrions* — the same irregular stems used for the future tense apply here too (être → ser-, avoir → aur-, faire → fer-, aller → ir-).

**The three si-clause patterns — this is the part worth memorizing as a table, since mixing them is one of the most common advanced-learner errors:**

| Type | Si-clause tense | Main-clause tense | Meaning |
|---|---|---|---|
| Real/likely | **si + présent** | présent, futur, or imperative | "If X happens (and it might), Y." *Si tu pars maintenant, tu arriveras à temps.* |
| Hypothetical/unlikely | **si + imparfait** | **conditionnel présent** | "If X were to happen (probably won't/didn't), Y would." *Si j'avais le temps, je t'aiderais.* |
| Unreal past | **si + plus-que-parfait** | **conditionnel passé** | "If X had happened (it didn't), Y would have." *Si j'avais su, je serais venu plus tôt.* |

**A very common error**: never put the conditional in the *si*-clause itself (never *si j'aurais su* — always *si j'avais su*). The conditional only ever appears in the *main* clause.

**Beyond hypotheticals**, the conditional is also the register of **politeness** (*je voudrais* vs. *je veux*), **unconfirmed information** (*il paraîtrait que...* — "it would seem that..."/"allegedly," common in journalism), and **hedged suggestions** (*il vaudrait mieux..., on pourrait...*) — all genuinely C1-level uses beyond the basic "would" translation.
`,
    quiz: [
      { q: "\"Si j'___ (avoir) le temps, je t'aiderais.\"", options: ["ai", "avais", "aurais"], answer: 1, explain: "Hypothetical: si + imparfait, main clause conditional — si j'avais." },
      { q: "\"Si tu pars maintenant, tu ___ (arriver) à temps.\"", options: ["arriverais", "arriveras", "arrives"], answer: 1, explain: "Real/likely condition: si + présent → futur in the main clause." },
      { q: "\"Si j'avais su, je ___ (venir) plus tôt.\"", options: ["viendrais", "serais venu", "venais"], answer: 1, explain: "Unreal past: si + plus-que-parfait → conditionnel passé (serais venu)." },
      { q: "Which is correct?", options: ["Si j'aurais su, je serais venu.", "Si j'avais su, je serais venu.", "Si je saurais, je viendrais."], answer: 1, explain: "The conditional never goes in the si-clause itself — only in the main clause." },
    ],
  },
  {
    achapter: 3,
    title: "La Voix Passive & Le Registre Soutenu",
    intro:
      "The passive voice and formal-register vocabulary are what make written French sound professional rather than merely correct — this is largely a register upgrade on grammar you already know.",
    grammar: `
**Passive voice formation**: **être** (conjugated in the needed tense) + **past participle** (agreeing with the subject) + **par** (+ agent, if named).

*Le budget a été approuvé par le conseil.* (The budget was approved by the board.)
*La décision sera annoncée demain.* (The decision will be announced tomorrow.)

**When French actually prefers the passive** — less often than English, in practice:
- Formal/journalistic writing where the agent is unknown, unimportant, or intentionally de-emphasized (*trois personnes ont été blessées* — three people were injured, agent irrelevant)
- Official/administrative and business documents (reports, policies, contracts) — this is exactly the register the Advanced Vocabulary above targets

**In everyday spoken French, "on" almost always replaces the passive**: *On a approuvé le budget* is far more natural in conversation than the passive version above. Knowing *when* to reach for the passive (formal writing) versus "on" (everything else) is itself a register skill, not just a grammar rule.

**Formal-register vocabulary swaps** — this is largely about learning that a "fancier" word already exists for a concept you know casually, not new grammar: *commencer → entamer/entreprendre*, *montrer → démontrer*, *dire → affirmer/déclarer*, *penser → considérer/estimer*. Using these correctly, in the right context, is one of the fastest ways written French reads as C1 rather than B1 — but overusing them in casual conversation reads as stiff, so register-matching (formal writing vs. spoken French) matters as much as the words themselves.
`,
    quiz: [
      { q: "Passive of \"Le conseil a approuvé le budget\":", options: ["Le budget a approuvé le conseil.", "Le budget a été approuvé par le conseil.", "Le budget est approuvé le conseil."], answer: 1, explain: "être + past participle (agreeing) + par + agent." },
      { q: "In casual spoken French, which is more natural?", options: ["Le budget a été approuvé par le conseil.", "On a approuvé le budget.", "Both equally natural in speech"], answer: 1, explain: "\"On\" is the everyday-spoken default; the passive is reserved mostly for formal/written register." },
      { q: "Formal-register equivalent of \"commencer\":", options: ["entamer", "finir", "montrer"], answer: 0, explain: "entamer/entreprendre are the formal-register alternatives to commencer." },
      { q: "Formal-register equivalent of \"montrer\":", options: ["affirmer", "démontrer", "établir"], answer: 1, explain: "démontrer is the formal equivalent of the everyday \"montrer.\"" },
    ],
  },
  {
    achapter: 4,
    title: "Pronoms Relatifs Composés & Connecteurs Logiques",
    intro:
      "Compound relative pronouns (dont, lequel and its forms) and formal connectors are what let you build the longer, subordinated sentences that argumentative writing and Task 3/Section B speaking actually require.",
    grammar: `
**Dont** replaces **de + noun** — used whenever the verb or expression before the relative clause takes *de* (parler de, avoir besoin de, être content de...).

*Voici le livre dont je parlais.* (Here's the book I was talking about — parler **de**.)
*C'est un projet dont je suis fier.* (It's a project I'm proud of — fier **de**.)

**Lequel and its forms** replace **preposition + noun** for anything other than *de* (à, avec, sur, pour...), and must agree in gender/number with the noun they replace:

| | Masc. sing. | Fem. sing. | Masc. pl. | Fem. pl. |
|---|---|---|---|---|
| (plain) | lequel | laquelle | lesquels | lesquelles |
| à + | **auquel** | à laquelle | **auxquels** | **auxquelles** |
| de + | **duquel** | de laquelle | **desquels** | **desquelles** |

*Le sujet **sur lequel** nous travaillons est complexe.* (The subject we're working on is complex.)
*Le problème **auquel** je faisais référence.* (The problem I was referring to — à + lequel contracts to auquel, same contraction pattern as Chapter 3's au/aux.)

**Formal connectors for argumentative writing** — these are what a TCF Task 3 or TEF Section B response needs to sound structured rather than like a string of simple sentences: **néanmoins/cependant** (nevertheless — concession), **par ailleurs/en outre** (moreover — addition), **par conséquent/donc** (consequently — result), **dans la mesure où** (insofar as — condition/scope), **étant donné que/puisque** (given that — cause). Using two or three of these correctly in a Task 3 monologue is a direct, visible signal of the "ability to structure a response" dimension examiners score.
`,
    quiz: [
      { q: "\"Voici le livre ___ je parlais.\" (parler de)", options: ["que", "dont", "lequel"], answer: 1, explain: "parler de → dont replaces de + noun." },
      { q: "\"Le sujet ___ nous travaillons est complexe.\" (travailler sur)", options: ["dont", "lequel", "sur lequel"], answer: 2, explain: "travailler sur is a preposition other than de, so it needs sur + lequel, not dont." },
      { q: "\"Le problème ___ je faisais référence.\" (faire référence à)", options: ["duquel", "auquel", "lequel"], answer: 1, explain: "faire référence à + lequel contracts to auquel." },
      { q: "Which connector signals a concession (\"nevertheless\")?", options: ["par conséquent", "néanmoins", "étant donné que"], answer: 1, explain: "néanmoins/cependant signal concession; par conséquent signals result; étant donné que signals cause." },
    ],
  },
  {
    achapter: 5,
    title: "Français Professionnel & Affaires",
    intro:
      "Professional French isn't a separate grammar system — it's mostly vocabulary precision plus a few structural habits (nominalization, formal politeness formulas) that read as workplace-fluent rather than classroom-fluent.",
    grammar: `
**Nominalization** — turning a verb into its noun form — is a real, systematic pattern in formal/professional French, and recognizing it multiplies your vocabulary efficiently: *décider → la décision*, *négocier → la négociation*, *approuver → l'approbation*, *réduire → la réduction*, *augmenter → l'augmentation*. Formal reports and emails lean on nominalized structures ("procéder à la mise en œuvre" rather than simply "mettre en œuvre") far more than casual speech does.

**Formal email/letter conventions** — a fixed set of opening and closing formulas that don't translate word-for-word from English and are worth memorizing as fixed phrases:
- Opening: *Madame, Monsieur,* (when you don't know the recipient) or *Cher Monsieur [Nom],*
- Requesting: *Je vous serais reconnaissant(e) de...* (I would be grateful if you could...), *Je me permets de vous contacter au sujet de...* (I am writing to you regarding...)
- Closing: *Je vous prie d'agréer, Madame, Monsieur, l'expression de mes salutations distinguées.* — a formal closing with no real English equivalent; the more common *Cordialement* is acceptable for most professional emails today, but the long form still appears in formal letters.

**Business vocabulary precision matters more than grammar novelty here** — the Advanced Vocabulary chapter for this lesson (chiffre d'affaires, cahier des charges, partie prenante, échéance, conformité...) is doing most of the real work; the grammar habit to build is simply defaulting to nominalized, passive, or "on"-based formal constructions when writing in a professional context, rather than the direct, personal sentence structures natural in casual spoken French.
`,
    quiz: [
      { q: "Noun form of \"décider\"?", options: ["la décision", "le décideur", "décidément"], answer: 0, explain: "décider → la décision, the standard nominalization pattern." },
      { q: "Noun form of \"réduire\"?", options: ["la réductrice", "la réduction", "le réduit"], answer: 1, explain: "réduire → la réduction." },
      { q: "Which opening is appropriate when you don't know the recipient's name?", options: ["Salut,", "Madame, Monsieur,", "Coucou,"], answer: 1, explain: "\"Madame, Monsieur,\" is the standard formal opening when the recipient is unknown." },
      { q: "Which phrase means \"I would be grateful if you could...\"?", options: ["Je veux que vous...", "Je vous serais reconnaissant(e) de...", "J'espère que tu..."], answer: 1, explain: "Je vous serais reconnaissant(e) de... is the standard formal-request formula." },
    ],
  },
  {
    achapter: 6,
    title: "Vocabulaire Abstrait, Académique & Idiomatique",
    intro:
      "Abstract/academic vocabulary and idioms pull in opposite register directions — knowing which is which, and where each belongs, is itself a C1 skill.",
    grammar: `
**Building abstract nouns from adjectives** is a productive pattern worth internalizing rather than memorizing case-by-case: adjectives ending in **-if/-ive** often produce nouns in **-ivité** (subjectif → la subjectivité, objectif → l'objectivité); many adjectives take **-té** (légitime → la légitimité, ambigu → l'ambiguïté). Recognizing the pattern lets you *guess* a plausible abstract noun from an adjective you already know, which is a real C1 reading-comprehension shortcut.

**Register warning on idioms**: expressions like *avoir le cafard*, *tourner autour du pot*, or *tirer son épingle du jeu* are genuinely advanced — a beginner won't know them — but they belong to **spoken and informal-written** register, not formal essays or professional reports. Dropping an idiom into a TCF Task 3 argumentative monologue can actually work in your favor (it signals real fluency, not textbook French), but the same idiom in a formal TEF Section B written-equivalent context, or a business email, would read as oddly casual. The skill isn't just knowing the idiom — it's knowing where it's welcome.

**Academic/analytical vocabulary** (enjeu, controverse, paradoxe, biais, prémisse, cohérence) is the opposite: appropriate in both formal writing *and* a well-structured spoken argument, and this is exactly the vocabulary that upgrades a Task 3/Section B response from "opinion with examples" to "argument that names its own structure" — explicitly saying *"le véritable enjeu ici, c'est..."* or *"cet argument repose sur une prémisse discutable"* is a visible marker of the "ability to argue" dimension examiners are trained to notice.
`,
    quiz: [
      { q: "Abstract noun from \"subjectif\"?", options: ["la subjectivité", "le subjectivisme", "la subjection"], answer: 0, explain: "-if/-ive adjectives commonly produce -ivité nouns: subjectif → la subjectivité." },
      { q: "Where does an idiom like \"avoir le cafard\" belong?", options: ["Formal business reports", "Spoken/informal register", "Legal documents only"], answer: 1, explain: "Idioms are spoken/informal register — using them in a formal report would read as oddly casual." },
      { q: "\"Cet argument repose sur une prémisse discutable\" is an example of:", options: ["An idiom", "Naming the structure of an argument (academic register)", "A si-clause"], answer: 1, explain: "This is analytical/academic vocabulary explicitly naming the argument's structure — exactly what examiners reward." },
      { q: "Abstract noun from \"ambigu\"?", options: ["l'ambiguïté", "l'ambiguïsme", "l'ambiguation"], answer: 0, explain: "ambigu → l'ambiguïté, the -té pattern." },
    ],
  },
];
