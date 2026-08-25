// 4 questions per chapter, each targeting the specific grammar point taught in that
// chapter's Grammar Focus — not vocabulary recall, which the main practice mode already covers.
export const GRAMMAR_QUIZ = {
  1: [
    { q: "You're meeting your new landlord for the first time. Which do you use?", options: ["tu", "vous"], answer: 1, explain: "Vous — strangers and formal first meetings default to vous." },
    { q: "Your little cousin asks you a question. Which do you use?", options: ["tu", "vous"], answer: 0, explain: "Tu — family and children are tu-register." },
    { q: "It's 8pm and you greet a shopkeeper. What do you say?", options: ["Bonjour", "Bonsoir", "Salut"], answer: 1, explain: "Bonsoir replaces bonjour once it's evening." },
    { q: "What's the most natural spoken-French way to ask 'how are you?'", options: ["Comment allez-vous ?", "Ça va ?", "Qui êtes-vous ?"], answer: 1, explain: "\"Ça va ?\" is by far the most common everyday version." },
  ],
  2: [
    { q: "Fill in: \"Nous ___ fatigués.\" (être)", options: ["sommes", "êtes", "sont"], answer: 0, explain: "nous sommes — 1st person plural of être." },
    { q: "Which article goes with \"eau\" (water, feminine, starts with a vowel)?", options: ["la eau", "l'eau", "le eau"], answer: 1, explain: "l' replaces le/la before a vowel sound." },
    { q: "\"Je ne suis ___ prêt.\" (negation)", options: ["ne ... pas", "pas", "non"], answer: 1, explain: "Negation wraps the verb: ne + verb + pas → here just \"pas\" completes the frame already started by \"ne suis\"." },
    { q: "\"Ils ___ contents.\" (être, 3rd person plural)", options: ["est", "sont", "sommes"], answer: 1, explain: "ils/elles sont." },
  ],
  3: [
    { q: "\"Je vais ___ marché.\" (à + le)", options: ["à le", "au", "à la"], answer: 1, explain: "à + le contracts to au — never \"à le\"." },
    { q: "\"C'est la voiture ___ professeur.\" (de + le)", options: ["de le", "du", "de la"], answer: 1, explain: "de + le contracts to du." },
    { q: "Which preposition means \"at [someone]'s place\"?", options: ["chez", "dans", "avec"], answer: 0, explain: "chez has no direct English equivalent — chez moi = at my place." },
    { q: "\"Je vais ___ musées.\" (à + les)", options: ["à les", "aux", "au"], answer: 1, explain: "à + les contracts to aux." },
  ],
  4: [
    { q: "Conjugate parler for \"nous\":", options: ["parle", "parlons", "parlez"], answer: 1, explain: "-er verbs: nous → -ons." },
    { q: "Conjugate finir for \"ils\":", options: ["finit", "finissent", "finis"], answer: 1, explain: "-ir verbs: ils/elles → -issent." },
    { q: "\"J'___ vingt ans.\" (avoir)", options: ["ai", "suis", "vais"], answer: 0, explain: "Age uses avoir, not être — j'ai." },
    { q: "\"Je vais manger\" means:", options: ["I ate", "I am going to eat", "I eat often"], answer: 1, explain: "aller (conjugated) + infinitive = near future, \"going to ___.\"" },
  ],
  5: [
    { q: "\"___ amie\" (my, before a feminine vowel-starting noun)", options: ["ma", "mon", "mes"], answer: 1, explain: "mon replaces ma before a feminine noun starting with a vowel sound, for pronunciation." },
    { q: "\"C'est ___ livre.\" (his/her, masculine noun)", options: ["son", "sa", "ses"], answer: 0, explain: "son — agrees with the masculine noun livre, regardless of the owner's gender." },
    { q: "\"Il est ___ heures et quart.\" (it's quarter past)", options: ["moins le quart", "et quart", "et demie"], answer: 1, explain: "et quart = quarter past." },
    { q: "\"___ voiture\" (our)", options: ["notre", "nos", "nôtre"], answer: 0, explain: "notre for a singular noun; nos would be for a plural noun." },
  ],
  6: [
    { q: "\"Je vais ___ France.\" (feminine country)", options: ["au", "en", "à"], answer: 1, explain: "en + feminine country." },
    { q: "\"Je vais ___ Canada.\" (masculine country)", options: ["au", "en", "à"], answer: 0, explain: "au + masculine country." },
    { q: "\"Je voyage ___ train.\" (mode of transport, sit inside)", options: ["à", "en", "sur"], answer: 1, explain: "en for vehicles you sit inside." },
    { q: "\"Je vais ___ pied.\" (on foot)", options: ["en", "à", "de"], answer: 1, explain: "à pied is one of the exceptions — on foot takes à." },
  ],
  7: [
    { q: "\"Je voudrais ___ pain.\" (some bread)", options: ["le", "du", "un"], answer: 1, explain: "du — the partitive article for \"some\" with a masculine noun." },
    { q: "\"Je n'ai pas ___ pain.\" (negation)", options: ["de", "du", "un"], answer: 0, explain: "After a negation, du/des collapses to a plain de." },
    { q: "\"Beaucoup ___ pain\" (a lot of bread)", options: ["de", "du", "des"], answer: 0, explain: "Expressions of quantity + de, no article at all." },
    { q: "\"Je voudrais ___ eau.\" (some water, feminine + vowel)", options: ["de la", "de l'", "du"], answer: 1, explain: "de l' before a vowel sound, regardless of gender." },
  ],
  8: [
    { q: "\"J'___ faim.\" (to be hungry)", options: ["ai", "suis", "fais"], answer: 0, explain: "avoir faim — hunger uses avoir, not être." },
    { q: "\"Je ___ content.\" (to be happy — straightforward emotion)", options: ["ai", "suis", "fais"], answer: 1, explain: "Straightforward feelings use être + adjective." },
    { q: "\"Il ___ vingt-cinq ans.\" (age)", options: ["est", "a", "fait"], answer: 1, explain: "avoir ... ans for age, always." },
    { q: "\"Elle ___ appelle Marie.\" (reflexive, her name is)", options: ["s'", "se", "sa"], answer: 0, explain: "s'appelle — reflexive pronoun se elides to s' before a vowel." },
  ],
  9: [
    { q: "Feminine of \"heureux\" (happy)?", options: ["heureuse", "heureux", "heureuxe"], answer: 0, explain: "-eux → -euse is the standard irregular feminine pattern." },
    { q: "\"une ___ maison\" (a beautiful house — BAGS adjective)", options: ["maison belle", "belle", "bellee"], answer: 1, explain: "belle goes before the noun — Beauty is one of the BAGS categories." },
    { q: "\"des chaussures ___\" (red shoes, plural)", options: ["rouge", "rouges", "rougies"], answer: 1, explain: "Regular color adjectives agree in number: rouge → rouges." },
    { q: "\"des yeux ___\" (chestnut-brown eyes)", options: ["marron", "marrons", "marronnes"], answer: 0, explain: "marron is invariable — colors that are also object-nouns never change form." },
  ],
  10: [
    { q: "How is 80 built in standard French?", options: ["huit-dix", "quatre-vingts", "octante"], answer: 1, explain: "quatre-vingts — literally \"four-twenties.\"" },
    { q: "\"quatre-vingt___\" (81 — does it take an -s?)", options: ["s", "no -s"], answer: 1, explain: "No -s when followed by another number: quatre-vingt-un." },
    { q: "\"deux cent___\" (200 exactly)", options: ["s", "no -s"], answer: 0, explain: "-s appears when cent is multiplied and not followed by another number." },
    { q: "\"J'ai trois chats.\" — does \"trois\" need an article?", options: ["Yes", "No"], answer: 1, explain: "Numbers go directly before the noun, no extra article needed." },
  ],
  11: [
    { q: "Plural of \"bureau\" (desk)?", options: ["bureaus", "bureaux", "bureaues"], answer: 1, explain: "-eau words take -x in the plural, not -s." },
    { q: "Plural of \"animal\"?", options: ["animals", "animaux", "animales"], answer: 1, explain: "-al often becomes -aux in the plural." },
    { q: "Plural of \"prix\" (price, already ends in -x)?", options: ["prix", "prixs", "prices"], answer: 0, explain: "Words already ending in -s/-x/-z don't change in the plural." },
    { q: "Which ending tends feminine?", options: ["-age", "-tion", "-eau"], answer: 1, explain: "-tion words are reliably feminine; -age and -eau tend masculine." },
  ],
  12: [
    { q: "\"___ beau.\" (it's nice out)", options: ["Il y a", "Il fait", "Il pleut"], answer: 1, explain: "il fait + adjective for weather conditions." },
    { q: "\"___ du soleil.\" (it's sunny)", options: ["Il y a", "Il fait", "Il est"], answer: 0, explain: "il y a + noun — \"there is sun.\"" },
    { q: "\"It's raining\" in French:", options: ["Il fait la pluie", "Il pleut", "Il a pluie"], answer: 1, explain: "il pleut stands alone as its own impersonal verb." },
    { q: "\"le chat / la chatte\" shows:", options: ["A typo", "Separate male/female animal nouns", "Regional spelling"], answer: 1, explain: "Some animals have distinct nouns for male vs. female; others use one fixed gender regardless." },
  ],
  13: [
    { q: "\"Je suis ___ professeur.\" (profession after être)", options: ["un", "(no article)", "le"], answer: 1, explain: "Professions after être drop the article entirely." },
    { q: "\"C'est ___ bon professeur.\" (with an adjective)", options: ["un", "(no article)", "de"], answer: 0, explain: "The article returns once the profession is modified by an adjective or follows c'est." },
    { q: "\"une table ___ bois\" (a wooden table)", options: ["de", "en", "à"], answer: 1, explain: "en/de + material describes what something is made of." },
    { q: "Is \"médecin\" preceded by an article after je suis?", options: ["Yes", "No"], answer: 1, explain: "Same rule as professeur — no article directly after je suis." },
  ],
  14: [
    { q: "\"jouer ___ football\" (to play soccer)", options: ["à", "de", "au"], answer: 2, explain: "jouer à + le = jouer au for games/sports." },
    { q: "\"jouer ___ piano\" (to play piano)", options: ["à", "du", "au"], answer: 1, explain: "jouer de + le = jouer du for musical instruments." },
    { q: "\"faire ___ sport\" (to do sports)", options: ["de", "du", "à"], answer: 1, explain: "faire de + le = faire du for general activities." },
    { q: "Which verb changes preposition based on game vs. instrument?", options: ["faire", "jouer", "aller"], answer: 1, explain: "jouer à (games) vs. jouer de (instruments) is the key contrast." },
  ],
  15: [
    { q: "Adverb from \"lente\" (slow, feminine)?", options: ["lentement", "lentament", "lenteument"], answer: 0, explain: "feminine adjective + -ment." },
    { q: "Adverb from \"vrai\" (true — already ends in a vowel)?", options: ["vraiement", "vraiment", "vraiment e"], answer: 1, explain: "Vowel-ending adjectives use the masculine form + -ment directly." },
    { q: "Adverb from \"courant\" (fluent, ends in -ant)?", options: ["courantment", "couramment", "courantement"], answer: 1, explain: "-ant/-ent adjectives swap to -amment/-emment." },
    { q: "\"Il parle ___ français.\" (adverb placement, he speaks French well)", options: ["bien parle", "parle bien", "parle français bien"], answer: 1, explain: "The adverb goes right after a simple conjugated verb, not at the sentence's end." },
  ],
};
