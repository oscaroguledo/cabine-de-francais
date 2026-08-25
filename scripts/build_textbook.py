# -*- coding: utf-8 -*-
import json, re

DATA_PATH = "/private/tmp/claude-501/-Users-oscaroguledo-Documents-untitled-folder/4d4fe2d1-5403-4dad-b3a4-d03f493bb278/scratchpad/french_textbook/data.json"
OUT_MD = "/private/tmp/claude-501/-Users-oscaroguledo-Documents-untitled-folder/4d4fe2d1-5403-4dad-b3a4-d03f493bb278/scratchpad/french_textbook/textbook.md"

data = json.load(open(DATA_PATH, encoding="utf-8"))
WORDS = {int(k): v for k, v in data["words"].items()}
SENTENCES = {int(k): v for k, v in data["sentences"].items()}
CATS_ORDER = data["categories_order"]

# word-number lookup by category, preserving original order
cat_to_nums = {c: [] for c in CATS_ORDER}
for n in sorted(WORDS):
    cat_to_nums[WORDS[n]["category"]].append(n)

CHAPTERS = [
    dict(title="Greetings, Politeness & Meeting People", cats=["Greetings, Politeness & Basic Expressions"],
         grammar=r"""
**Formal vs. informal "you": *tu* vs. *vous*.** French has two words for "you," and choosing the wrong one is one of the most common beginner mistakes.

- Use **tu** with: family, close friends, children, peers your own age, and anyone who invites you to ("On peut se tutoyer" = "we can use *tu*").
- Use **vous** with: strangers, older people, anyone in a professional or formal context, and *always* when speaking to more than one person (its other job is as the plural "you").
- When in doubt, start with **vous** — switching from *vous* to *tu* uninvited can come across as overly familiar. Native speakers will usually invite you to switch.

**Bonjour vs. bonsoir.** *Bonjour* covers "hello" and "good morning/afternoon"; switch to *bonsoir* once it's evening (roughly after 6 p.m., earlier in winter). *Salut* is "hi/bye" — casual, *tu*-register only.

**"Ça va?"** is the single most common way to ask "how are you?" in spoken French — more common in daily conversation than the more formal "Comment allez-vous?" The reply is often just "Ça va" (I'm fine) or "Ça va bien" (I'm doing well), and it's normal to bounce the question back: "Ça va, et toi?"
""",
         intro="Every French course starts here for a reason: greetings are the words you'll use in literally every conversation, and they teach the *tu/vous* distinction that shapes the rest of the grammar in this book."),

    dict(title="Pronouns, Articles & the Verb *Être*", cats=["Pronouns & Determiners", "Articles & Conjunctions"],
         grammar=r"""
**Subject pronouns.**

| Person | Pronoun | Meaning |
|---|---|---|
| 1st singular | je (j' before a vowel) | I |
| 2nd singular | tu | you (informal) |
| 3rd singular | il / elle / on | he / she / "we" (informal) or "one" |
| 1st plural | nous | we |
| 2nd plural | vous | you (formal or plural) |
| 3rd plural | ils / elles | they (masc./mixed / fem.) |

**A note on gender.** Every French noun is either masculine or feminine — there's no neutral "it" the way English has one. This isn't optional or logical; it has to be memorized *with* the noun. The best habit to build immediately: always learn a noun together with its article (**le** stylo, not just "stylo"), so the gender comes for free.

**Articles.**

| | Masculine | Feminine | Before a vowel/silent *h* | Plural |
|---|---|---|---|---|
| Definite ("the") | le | la | l' | les |
| Indefinite ("a/an") | un | une | un/une (unchanged) | des ("some") |

**The verb *être* (to be) — irregular, and the single most important verb to memorize first:**

| | | | |
|---|---|---|---|
| je **suis** | I am | nous **sommes** | we are |
| tu **es** | you are | vous **êtes** | you are |
| il/elle/on **est** | he/she/one is | ils/elles **sont** | they are |

**Negation.** Wrap the conjugated verb in **ne ... pas** (ne becomes n' before a vowel): *je ne suis pas fatigué* (I am not tired). This same ne...pas frame will apply to every verb in this book, not just être.

**Basic questions.** The simplest way to ask a yes/no question in spoken French is just rising intonation: *"Tu es prêt?"* ("You're ready?"). More formally, add **est-ce que** at the front: *"Est-ce que tu es prêt?"*
""",
         intro="This chapter is the load-bearing wall of French grammar: pronouns, articles, gender, and the verb être all show up in nearly every sentence you'll ever build."),

    dict(title="Prepositions & Building a Sentence", cats=["Prepositions"],
         grammar=r"""
**Basic word order.** French sentence order is Subject–Verb–Object, same as English, which is genuinely good news: *"Je mange une pomme"* is word-for-word "I eat an apple."

**Contractions with à and de.** Two prepositions, *à* ("to/at") and *de* ("of/from"), **contract** with the definite articles *le* and *les* — this is not optional, using the uncontracted form is a real grammar error:

| | + le | + la | + l' | + les |
|---|---|---|---|---|
| à | **au** | à la (no change) | à l' (no change) | **aux** |
| de | **du** | de la (no change) | de l' (no change) | **des** |

Example: *"Je vais au marché"* (not *"à le marché"*) — "I'm going to the market."

**Prepositions of place** (dans, sur, sous, devant, derrière, entre...) work much like their English equivalents, but a few don't map 1:1 — *chez* has no direct English translation and means "at/to [someone]'s place" (*chez moi* = "at my place"), and is worth learning as its own concept rather than translating word-by-word.
""",
         intro="With pronouns, articles, and être in place, prepositions are what let you start connecting ideas — where things are, where you're going, who they belong to."),

    dict(title="Core Verbs — Regular Patterns & the Big Three", cats=["Common Verbs", "More Common Verbs"],
         grammar=r"""
French verbs fall into three families by their infinitive ending, and the first two are almost entirely predictable once you learn the pattern.

**-er verbs** (the largest group — most new verbs entering French are -er verbs). Model: **parler** (to speak):

| | | | |
|---|---|---|---|
| je parl**e** | tu parl**es** | il/elle/on parl**e** | nous parl**ons** |
| vous parl**ez** | ils/elles parl**ent** | | |

**-ir verbs.** Model: **finir** (to finish):

| | | | |
|---|---|---|---|
| je fin**is** | tu fin**is** | il/elle/on fin**it** | nous finiss**ons** |
| vous finiss**ez** | ils/elles finiss**ent** | | |

**-re verbs.** Model: **vendre** (to sell):

| | | | |
|---|---|---|---|
| je vend**s** | tu vend**s** | il/elle/on vend | nous vend**ons** |
| vous vend**ez** | ils/elles vend**ent** | | |

**The three irregular verbs you'll use constantly** — none follow the patterns above, and all three must simply be memorized:

| | avoir (to have) | aller (to go) | faire (to do/make) |
|---|---|---|---|
| je | ai | vais | fais |
| tu | as | vas | fais |
| il/elle/on | a | va | fait |
| nous | avons | allons | faisons |
| vous | avez | allez | faites |
| ils/elles | ont | vont | font |

**The near future (*futur proche*).** One of the most useful constructions in French: **aller** (conjugated) + infinitive = "going to ___." *"Je vais manger"* = "I am going to eat." This is how most spoken French expresses future plans, well before learners tackle the "true" future tense.

*A heads-up: many extremely common verbs — vouloir (to want), pouvoir (to be able to), devoir (to have to), venir (to come) — are irregular in their own individual ways and don't fit any of the three patterns above. You'll meet them as vocabulary through this book; treat each one's conjugation as its own small memorization task.*
""",
         intro="This is the biggest grammar chapter in the book on purpose — verbs are where most of the actual work of learning French grammar lives, and this chapter's three patterns plus three irregulars cover a large share of everyday sentences."),

    dict(title="People, Family & Time", cats=["People & Family", "Time"],
         grammar=r"""
**Possessive adjectives** — the trickiest thing about these for English speakers is that they agree with the noun being *possessed*, not with the gender of the person who possesses it:

| Possessor | Masc. noun | Fem. noun | Plural noun |
|---|---|---|---|
| my | mon | ma | mes |
| your (tu) | ton | ta | tes |
| his/her/its | son | sa | ses |
| our | notre | notre | nos |
| your (vous) | votre | votre | vos |
| their | leur | leur | leurs |

So *"son livre"* can mean "his book" **or** "her book" — French doesn't distinguish; you rely on context. One irregularity worth knowing: before a *feminine* noun that starts with a vowel sound, French swaps in the masculine possessive purely for smoother pronunciation — *"mon amie"* (my friend, feminine), not the expected *"ma amie."*

**Telling time.** *"Quelle heure est-il?"* ("What time is it?") is answered with *"Il est ... heure(s)."* Key building blocks: **et quart** (quarter past), **et demie** (half past), **moins le quart** (quarter to). Official/written French (transit schedules, TV listings) commonly uses the 24-hour clock, so *20h30* means 8:30 p.m.
""",
         intro="Family vocabulary is where possessives become unavoidable — you can't talk about 'my sister' or 'his father' without them — and time vocabulary comes packaged with its own small, self-contained grammar system."),

    dict(title="Places, Directions & Transportation", cats=["Places", "Directions & Locations", "Transportation"],
         grammar=r"""
**Prepositions with place names follow the gender of the place, not general logic** — this trips up nearly every English-speaking learner at some point:

| Rule | Example |
|---|---|
| **à** + city | *Je vais à Paris.* (I'm going to Paris.) |
| **en** + feminine country | *Je vais en France.* |
| **au** + masculine country | *Je vais au Canada.* |
| **aux** + plural-named country | *Je vais aux États-Unis.* |

**Transportation: *en* vs. *à*.** Most vehicles you sit *inside* take **en** (en voiture, en train, en bus, en avion); things you sit *astride*, plus going on foot, take **à** (à vélo = by bike, à pied = on foot).

**Directions.** Vocabulary like *tout droit* (straight ahead), *à gauche* (to the left), *à droite* (to the right) combines directly with the verb **aller** or the imperative (*Tournez à gauche* = "Turn left").
""",
         intro="Movement vocabulary is where French prepositions get genuinely idiosyncratic — the rules below aren't guessable from English, so they're worth learning as fixed patterns."),

    dict(title="Food, Drink, Shopping & Money", cats=["Food & Drink", "Shopping & Money"],
         grammar=r"""
**The partitive article — "some/any."** French can't just drop the article the way English says "I'd like bread"; it uses a dedicated article for an unspecified quantity of something:

| Masculine | Feminine | Before a vowel | Plural |
|---|---|---|---|
| du | de la | de l' | des |

*"Je voudrais du pain"* = "I'd like (some) bread." *"Elle boit de l'eau"* = "She's drinking (some) water."

**Important exception: after a negation**, the partitive/indefinite article collapses to a plain **de** (or **d'** before a vowel), regardless of gender: *"Je n'ai pas de pain"* (I don't have any bread) — not *"pas du pain."*

**Expressions of quantity also take a plain *de*, with no article at all**: *un peu de* (a little), *beaucoup de* (a lot of), *assez de* (enough), *un kilo de* (a kilo of) — *"beaucoup de pain,"* never *"beaucoup du pain."*

**Shopping phrases.** *"Combien ça coûte?"* / *"C'est combien?"* (How much does it cost?); *"Je voudrais..."* (I would like...) is the standard polite way to ask for something in a shop, more natural than *"Je veux"* (I want), which can sound blunt.
""",
         intro="Food and shopping vocabulary is the natural home of one of French's most distinctive grammar features — the partitive article — because you constantly need to talk about *some* amount of something."),

    dict(title="Body, Health & Emotions", cats=["Body & Health", "Health & Wellness", "Emotions & Personality"],
         grammar=r"""
**Avoir expressions.** English uses "to be" for many states that French expresses with **avoir** (to have) — a direct translation trap:

| French (literal: "to have...") | Meaning |
|---|---|
| avoir faim | to be hungry |
| avoir soif | to be thirsty |
| avoir chaud / avoir froid | to be hot / to be cold |
| avoir peur (de) | to be afraid (of) |
| avoir raison / avoir tort | to be right / to be wrong |
| avoir ... ans | to be ... years old |

*"J'ai vingt ans"* is literally "I have twenty years" — never *"je suis vingt ans."*

**Feelings: être vs. avoir.** Straightforward emotional states generally use **être + adjective**: *je suis content* (I'm happy), *je suis fatigué* (I'm tired), *je suis triste* (I'm sad).

**Reflexive verbs — a first look.** Some very common verbs need a reflexive pronoun that matches the subject: *je **me** sens bien* (I feel well), *il **s'**appelle Marc* (his name is Marc, literally "he calls himself"). The pattern is: subject + matching reflexive pronoun (me/te/se/nous/vous/se) + verb. This is a large topic in French; this book introduces just the handful of reflexive verbs that appear in the vocabulary ahead.
""",
         intro="This chapter's vocabulary constantly bumps into a real grammar trap for English speakers: French uses avoir (to have), not être (to be), for states like hunger, age, and fear."),

    dict(title="Descriptions — Adjectives & Colors", cats=["Adjectives", "More Adjectives", "Colors"],
         grammar=r"""
**Adjective agreement.** French adjectives change form to match the gender and number of the noun they describe:

- Regular feminine: add **-e** (*grand → grande*), unless it already ends in *-e*.
- Regular plural: add **-s** (*grand → grands*), unless it already ends in *-s* or *-x*.
- Common irregular feminine patterns: **-eux → -euse** (heureux → heureuse), **-if → -ive** (actif → active), **-on/-en → -onne/-enne** (bon → bonne), **-er → -ère** (premier → première).

**Placement: most adjectives go *after* the noun** (*une voiture rouge*) — this is the opposite of English and the single biggest word-order habit to build. A short list of very common adjectives go *before* the noun instead, often summarized with the acronym **BAGS**: **B**eauty (beau, joli), **A**ge (jeune, vieux, nouveau), **G**oodness (bon, mauvais), **S**ize (grand, petit, gros) — *une **belle** maison*, *un **petit** chat*.

**Colors** behave like regular adjectives and agree with the noun (*une robe **rouge**, des chaussures **rouges***) — with one exception worth flagging: colors that are also nouns for real objects (*orange*, *marron* = chestnut-brown) stay **invariable**, never changing form: *des yeux **marron*** (never *marrons*).
""",
         intro="Description is where French grammar becomes most visibly different from English on the page — not just agreement, but sentence word order itself changes for most adjectives."),

    dict(title="Numbers, Quantities & Measurements", cats=["Numbers", "Quantities & Measurements"],
         grammar=r"""
**Counting past 60 gets arithmetical.** Standard (France) French doesn't have single words for 70, 80, or 90 — it builds them from smaller numbers:

| Number | French | Literal breakdown |
|---|---|---|
| 70 | soixante-dix | "sixty-ten" |
| 80 | quatre-vingts | "four-twenties" |
| 90 | quatre-vingt-dix | "four-twenty-ten" |
| 71 | soixante et onze | "sixty and eleven" |
| 81 | quatre-vingt-un | "four-twenty-one" |

*(Belgian and Swiss French instead use septante, octante/huitante, and nonante — simpler, but not what you'll hear in France or in most Canadian French.)*

**When does *vingt* and *cent* take an -s?** Only when they're multiplied by a preceding number **and** not followed by another number: *quatre-vingt**s*** (80) but *quatre-vingt-un* (81, no -s); *deux cent**s*** (200) but *deux cent un* (201, no -s).

**Numbers + nouns need no extra article**: *"J'ai trois chats"* (I have three cats) — just the number directly before the noun.
""",
         intro="Numbers look like pure memorization, and mostly are — but the 70/80/90 construction and the vingt/cent agreement rule are genuine grammar points worth understanding rather than just rote-learning."),

    dict(title="Everyday Objects & Technology", cats=["Common Nouns", "More Common Nouns", "Household Items & Furniture", "Clothing & Accessories", "Technology & Communication"],
         grammar=r"""
**Plural formation.**

| Rule | Example |
|---|---|
| Regular: add **-s** (silent) | livre → livres |
| Already ends in -s/-x/-z: unchanged | prix → prix |
| Ends in **-eau/-eu**: add **-x**, not -s | bureau → bureaux |
| Ends in **-al**: often becomes **-aux** | animal → animaux |

**Guessing gender from the ending.** There's no rule without exceptions, but these patterns are reliable often enough to be useful as a first guess (never a substitute for learning the article with the word):

- Tend **masculine**: endings **-age**, **-ment**, **-eau**, **-isme**, **-phone**
- Tend **feminine**: endings **-tion**, **-sion**, **-té**, **-ette**, **-ure**, **-ance/-ence**

This chapter's vocabulary — household objects, clothing, and tech terms — is a good place to practice this pattern-spotting, since it spans a wide mix of both.
""",
         intro="This is the largest vocabulary chapter in the book by word count, so it's paired with the two grammar points that scale best across a big, varied noun list: how plurals form, and how to make an educated guess at gender."),

    dict(title="Nature, Animals & Weather", cats=["Animals", "Weather & Nature", "Nature (Extras)"],
         grammar=r"""
**Talking about the weather** uses two different impersonal constructions, both built on the subject *il* ("it") with no real-world referent:

- **Il fait** + adjective: *il fait beau* (it's nice out), *il fait chaud/froid* (it's hot/cold).
- **Il y a** + noun: *il y a du soleil* (it's sunny — literally "there is sun"), *il y a du vent* (it's windy).
- A few weather verbs stand alone, conjugated only in the *il* form: **il pleut** (it's raining), **il neige** (it's snowing).

**Animal gender.** Some animals have entirely separate masculine/feminine nouns for male vs. female (*le chat* / *la chatte*), while others use a single grammatical gender regardless of the animal's actual sex (*la souris* is always feminine, whether the mouse is male or female). There's no shortcut here beyond learning each noun's article.
""",
         intro="Weather is one of the few topics in French with its own small, self-contained impersonal grammar — worth isolating and drilling on its own."),

    dict(title="Work, School & Materials", cats=["Education & School", "Professions (Additional)", "Materials & Tools"],
         grammar=r"""
**Professions after *être* drop the article** — a genuine exception to the normal noun-needs-an-article rule: *"Je suis professeur"* (I am a teacher), not *"Je suis **un** professeur."* The article comes back, though, the moment the profession is modified by an adjective, or introduced with *c'est* instead of *je suis*: *"C'est **un** bon professeur"* (He's a good teacher).

**Describing materials** uses **en** or **de** + the material, placed after the noun: *une table **en bois*** (a wooden table), *un sac **en cuir*** (a leather bag).
""",
         intro="Professions are one of the cleanest illustrations in French of a noun-phrase rule that has a real exception — worth calling out explicitly rather than letting it hide as an inconsistency."),

    dict(title="Sports, Arts & Entertainment", cats=["Sports & Hobbies", "Arts & Entertainment"],
         grammar=r"""
**Jouer à vs. jouer de.** The verb *jouer* ("to play") takes a different preposition depending on *what* you're playing:

- **jouer à** + game or sport: *jouer **au** football, jouer **aux** cartes* (note the à+le / à+les contractions from Chapter 3).
- **jouer de** + musical instrument: *jouer **du** piano, jouer **de la** guitare*.

**Faire de + activity** is the other major pattern for hobbies and sports, especially ones without a ball or opponent: *faire **du** sport, faire **de la** natation* (to swim/do swimming), *faire **du** vélo*.
""",
         intro="Hobby vocabulary comes with one of French's sharpest little grammar traps: the same verb, jouer, splits into two completely different preposition patterns depending on whether you're naming a game or an instrument."),

    dict(title="Expressions & Adverbs", cats=["Common Expressions & Adverbs", "More Adverbs & Quantifiers"],
         grammar=r"""
**Forming adverbs.** Most French adverbs are built from an adjective plus **-ment** (roughly parallel to English "-ly"):

- Feminine adjective form + **-ment**: *lente* (slow, fem.) → *lentement* (slowly).
- Adjectives already ending in a vowel use the masculine form + **-ment**: *vrai* → *vraiment* (truly/really).
- Adjectives ending in **-ant/-ent** swap to **-amment/-emment**: *courant* → *couramment* (fluently).

**Where adverbs go.** With a simple conjugated verb, the adverb usually comes right after it: *"Il parle **bien** français"* (He speaks French well) — not at the end of the sentence, as in English. Before an adjective or another adverb, it comes directly in front: *"très **bien**,"* *"assez **rapide**."*

This closing chapter's vocabulary is also where a lot of everyday connector words and set expressions live — the small words that make sentences sound natural rather than just grammatically correct.
""",
         intro="A fitting last stop: adverbs and set expressions are what turn grammatically-correct sentences (everything from Chapters 1-14) into natural-sounding ones."),
]

# sanity: every category used exactly once
used = [c for ch in CHAPTERS for c in ch["cats"]]
assert sorted(used) == sorted(CATS_ORDER), (set(CATS_ORDER) - set(used), set(used) - set(CATS_ORDER))
assert len(used) == 36

def esc_md(s):
    # minimal escaping for pandoc/latex: protect literal # and _ and $ and % and &
    return re.sub(r'([#_$%&])', r'\\\1', s)

md = []
md.append("---\ntitle: \"Complete French Textbook\"\nsubtitle: \"784 words · 15 chapters · full grammar course, built from a curated 7,840-sentence example bank\"\n---\n")

md.append("# How to Use This Book\n")
md.append(
"This book is built around 784 English–French words, organized into 36 themed vocabulary groups, "
"which this book arranges into **15 chapters** in a deliberate learning order — starting with the "
"grammar every sentence depends on (pronouns, articles, the verb *être*), then building outward into "
"vocabulary-rich, real-world topics. Each chapter has three parts:\n\n"
"1. **Grammar Focus** — the rule(s) that matter most for that chapter's vocabulary, explained in plain terms.\n"
"2. **Vocabulary** — every word in the chapter's theme, in a clean reference table.\n"
"3. **Vocabulary in Context** — two real example sentences per word (drawn from a bank of 10 per word), so you see each word used naturally, not just translated in isolation.\n"
"4. **Practice** — a short translation exercise using sentences held back from the example bank; answers are in the Appendix.\n\n"
"At the back: a quick-reference verb conjugation table, a full alphabetized glossary of all 784 words, and the exercise answer key.\n"
)

md.append("\\newpage\n")
md.append("# Introduction: The Sounds of French\n")
md.append(
"French spelling looks intimidating before you learn a handful of consistent patterns. This page is worth "
"re-reading after Chapter 1 once you've heard some of the vocabulary out loud.\n\n"
"**Vowels.** *a* (\"ah\"), *i/y* (\"ee\"), *ou* (\"oo\"), *u* (a tight, rounded sound with no real English "
"equivalent — say \"ee\" with rounded lips), *e/eu/œu* (a neutral \"uh\"/\"eu\" sound), *é* (closed, like the "
"\"ay\" in \"day\" but shorter), *è/ê* (open, like \"eh\" in \"bed\"), *oi* (\"wah\").\n\n"
"**Nasal vowels** — vowel + *n/m* at the end of a syllable often nasalizes the vowel instead of pronouncing "
"the *n/m* as a consonant: **an/en/am/em** (a nasalized \"ah\"), **in/im/ain/ein** (a nasalized \"eh\"), "
"**on/om** (a nasalized \"oh\"), **un/um** (a nasalized \"uh\").\n\n"
"**Silent final consonants.** Most consonants at the end of a French word are silent — *petit* is "
"pronounced \"puh-TEE,\" not \"puh-TEET.\" A useful exception mnemonic is **CaReFuL**: the consonants "
"**c, r, f, l** are usually still pronounced at the end of a word (*avec, pour, chef, animal*).\n\n"
"**Liaison.** When a word ending in a normally-silent consonant is followed by a word starting with a vowel "
"sound, that consonant is often pronounced, linking the two words: *les amis* is said as \"lez-ami,\" not "
"\"lay-ami.\"\n\n"
"**Accent marks** aren't decorative — they change pronunciation and sometimes meaning: **é** (closed *e*), "
"**è / ê** (open *e*), **ç** (makes *c* soft — an \"s\" sound — before *a/o/u*, where *c* would otherwise be "
"hard), and the **¨** diaeresis (tréma), which forces two adjacent vowels to be pronounced separately rather "
"than blended, as in *No\u00ebl*.\n"
)

# ---- Chapters ----
chapter_word_ranges = []  # (chapter_index, [nums]) for exercise sampling later
for idx, ch in enumerate(CHAPTERS, 1):
    md.append("\\newpage\n")
    md.append(f"# Chapter {idx}: {ch['title']}\n")
    md.append(f"*{ch['intro']}*\n")
    md.append("## Grammar Focus\n")
    md.append(ch["grammar"] + "\n")

    nums = []
    for cat in ch["cats"]:
        nums.extend(cat_to_nums[cat])
    chapter_word_ranges.append(nums)

    md.append("## Vocabulary\n")
    table_lines = ["| English | French |", "|---|---|"]
    for n in nums:
        w = WORDS[n]
        table_lines.append(f"| {esc_md(w['en'])} | {esc_md(w['fr'])} |")
    md.append("\n".join(table_lines) + "\n")

    md.append("## Vocabulary in Context\n")
    for n in nums:
        w = WORDS[n]
        pairs = SENTENCES[n][:2]
        md.append(f"**{esc_md(w['en'])} = {esc_md(w['fr'])}**\n\n")
        for en, fr in pairs:
            md.append(f"> {esc_md(en)}\n> *{esc_md(fr)}*\n>\n")
        md.append("\n")

    md.append("## Practice\n")
    md.append("Translate the following sentences into French. (These use words from this chapter, but the exact sentence is one you haven't seen above.) Answers are in the Appendix.\n\n")
    sample = nums[2::max(1, len(nums)//8)][:8] if len(nums) > 8 else nums
    for i, n in enumerate(sample, 1):
        en, fr = SENTENCES[n][2]  # 3rd sentence, held out from the "in context" pair above
        md.append(f"{idx}.{i}. {esc_md(en)}\n")
    md.append("\n")

# ---- Appendix A: verb reference ----
md.append("\\newpage\n")
md.append("# Appendix A: Verb Conjugation Quick Reference\n")
md.append(
"| | être (to be) | avoir (to have) | aller (to go) | faire (to do/make) | parler (-er model) | finir (-ir model) | vendre (-re model) |\n"
"|---|---|---|---|---|---|---|---|\n"
"| je | suis | ai | vais | fais | parle | finis | vends |\n"
"| tu | es | as | vas | fais | parles | finis | vends |\n"
"| il/elle/on | est | a | va | fait | parle | finit | vend |\n"
"| nous | sommes | avons | allons | faisons | parlons | finissons | vendons |\n"
"| vous | êtes | avez | allez | faites | parlez | finissez | vendez |\n"
"| ils/elles | sont | ont | vont | font | parlent | finissent | vendent |\n"
)

# ---- Appendix B: full glossary, alphabetized by English ----
md.append("\\newpage\n")
md.append("# Appendix B: Full Glossary (Alphabetical by English)\n")
md.append("All 784 words in this book, sorted alphabetically for dictionary-style lookup. The chapter number shows where each word's vocabulary-in-context and practice sentences live.\n\n")
num_to_chapter = {}
for ci, nums in enumerate(chapter_word_ranges, 1):
    for n in nums:
        num_to_chapter[n] = ci
glossary_lines = ["| English | French | Chapter |", "|---|---|---|"]
for n in sorted(WORDS, key=lambda n: WORDS[n]["en"].lower()):
    w = WORDS[n]
    glossary_lines.append(f"| {esc_md(w['en'])} | {esc_md(w['fr'])} | {num_to_chapter[n]} |")
md.append("\n".join(glossary_lines) + "\n")

# ---- Appendix C: exercise answer key ----
md.append("\\newpage\n")
md.append("# Appendix C: Practice Exercise Answer Key\n")
for idx, nums in enumerate(chapter_word_ranges, 1):
    sample = nums[2::max(1, len(nums)//8)][:8] if len(nums) > 8 else nums
    md.append(f"**Chapter {idx}**\n\n")
    for i, n in enumerate(sample, 1):
        en, fr = SENTENCES[n][2]
        md.append(f"{idx}.{i}. {esc_md(fr)}\n")
    md.append("\n")

with open(OUT_MD, "w", encoding="utf-8") as f:
    f.write("\n".join(md))

total_vocab_lines = sum(len(nums) for nums in chapter_word_ranges)
print(f"Chapters: {len(CHAPTERS)}, total vocab entries placed: {total_vocab_lines}")
print(f"Wrote {OUT_MD}")
