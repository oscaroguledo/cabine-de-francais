// Original passages + MCQs, written for this app at A2–B1 difficulty to mirror
// TCF/TEF reading-section text types (notices, ads, short messages, emails, articles,
// opinion pieces). Not reproductions of any official or third-party exam material.

// QUICK_SET — the original 6-passage / 18-question practice set, used for standalone
// "Reading practice" and the compact Mock Exam.
export const QUICK_SET = [
  {
    id: "r1",
    level: "A2",
    type: "Notice",
    title: "Avis — Ascenseur en panne",
    text:
      "L'ascenseur de l'immeuble sera hors service du lundi 3 mars au mercredi 5 mars pour des réparations. " +
      "Les résidents des étages 4 à 8 sont priés d'utiliser l'escalier B pendant cette période. " +
      "Nous nous excusons pour la gêne occasionnée. Pour toute question, contactez le gérant au bureau, ouvert de 9h à 17h.",
    questions: [
      { q: "Pendant combien de jours l'ascenseur sera-t-il hors service ?", options: ["2 jours", "3 jours", "5 jours"], answer: 1 },
      { q: "Que doivent utiliser les résidents des étages 4 à 8 ?", options: ["L'escalier A", "L'escalier B", "Un autre ascenseur"], answer: 1 },
      { q: "À quelle heure le bureau du gérant ferme-t-il ?", options: ["17h", "18h", "9h"], answer: 0 },
    ],
  },
  {
    id: "r2",
    level: "A2",
    type: "Email",
    title: "E-mail — Confirmation de rendez-vous",
    text:
      "Bonjour Madame Tremblay, Ceci confirme votre rendez-vous avec le Dr. Lavoie le jeudi 14 mars à 10h30. " +
      "Merci d'arriver 15 minutes en avance pour compléter les formulaires. Si vous devez annuler ou reporter, " +
      "veuillez nous appeler au moins 24 heures à l'avance au 514-555-0192. Cordialement, la clinique Saint-Laurent.",
    questions: [
      { q: "À quelle heure est le rendez-vous ?", options: ["10h00", "10h30", "14h00"], answer: 1 },
      { q: "Combien de temps avant le rendez-vous faut-il arriver ?", options: ["5 minutes", "15 minutes", "24 heures"], answer: 1 },
      { q: "Que faut-il faire pour annuler le rendez-vous ?", options: ["Envoyer un e-mail", "Appeler au moins 24h à l'avance", "Se présenter en personne"], answer: 1 },
    ],
  },
  {
    id: "r3",
    level: "B1",
    type: "Article",
    title: "Article — Le télétravail continue de progresser",
    text:
      "Selon une étude publiée cette semaine, près de 40 % des employés canadiens travaillent désormais au moins deux jours " +
      "par semaine depuis leur domicile, une augmentation notable par rapport à il y a cinq ans. Les entreprises interrogées " +
      "expliquent ce changement par une volonté de réduire les coûts immobiliers et de répondre aux attentes des employés en " +
      "matière d'équilibre entre vie professionnelle et vie privée. Certains dirigeants restent toutefois prudents, estimant que " +
      "le travail en personne favorise davantage la collaboration et l'innovation.",
    questions: [
      { q: "Quel pourcentage d'employés télétravaille au moins deux jours par semaine ?", options: ["Environ 20 %", "Environ 40 %", "Environ 60 %"], answer: 1 },
      { q: "Pourquoi certaines entreprises encouragent-elles le télétravail ?", options: ["Pour réduire les coûts et améliorer l'équilibre de vie", "Pour augmenter les salaires", "Parce que la loi l'exige"], answer: 0 },
      { q: "Quelle est la principale réserve de certains dirigeants ?", options: ["Le télétravail coûte plus cher", "Le travail en personne favorise mieux la collaboration", "Les employés préfèrent le bureau"], answer: 1 },
    ],
  },
  {
    id: "r4",
    level: "B1",
    type: "Opinion",
    title: "Tribune — Faut-il limiter les écrans chez les jeunes ?",
    text:
      "De plus en plus de parents s'inquiètent du temps que leurs enfants passent devant un écran. Si certains experts " +
      "recommandent des limites strictes, d'autres soulignent que les écrans, utilisés à bon escient, peuvent aussi être des " +
      "outils d'apprentissage précieux. La clé, selon plusieurs psychologues, n'est pas tant la durée que la qualité du contenu " +
      "consommé et la présence d'un accompagnement parental. Interdire complètement les écrans serait, selon eux, à la fois " +
      "irréaliste et contre-productif dans le monde actuel.",
    questions: [
      { q: "Que recommandent certains experts ?", options: ["Interdire totalement les écrans", "Des limites strictes", "Aucune limite"], answer: 1 },
      { q: "Selon plusieurs psychologues, qu'est-ce qui compte le plus ?", options: ["La durée uniquement", "La qualité du contenu et l'accompagnement", "Le type d'appareil utilisé"], answer: 1 },
      { q: "Que pensent-ils d'une interdiction complète ?", options: ["C'est la meilleure solution", "C'est irréaliste et contre-productif", "C'est nécessaire pour les jeunes enfants"], answer: 1 },
    ],
  },
  {
    id: "r5",
    level: "A2",
    type: "Ad",
    title: "Annonce — Appartement à louer",
    text:
      "À louer : joli 4½ au deuxième étage, proche du métro, non meublé. Loyer : 1 250 $/mois, chauffage inclus. " +
      "Disponible à partir du 1er juillet. Animaux non acceptés. Pour visiter, contactez Marc au 438-555-0147, " +
      "de préférence en soirée après 18h.",
    questions: [
      { q: "Le loyer inclut-il le chauffage ?", options: ["Oui", "Non", "Ce n'est pas précisé"], answer: 0 },
      { q: "À partir de quelle date l'appartement est-il disponible ?", options: ["Le 1er juin", "Le 1er juillet", "Le 18 juillet"], answer: 1 },
      { q: "Quand est-il préférable d'appeler Marc ?", options: ["Le matin", "Après 18h", "Pendant l'heure du dîner"], answer: 1 },
    ],
  },
  {
    id: "r6",
    level: "B1",
    type: "Notice",
    title: "Avis municipal — Collecte des matières organiques",
    text:
      "La Ville rappelle à ses citoyens que la collecte des matières organiques passe à un rythme hebdomadaire à compter du " +
      "1er avril, contre une collecte aux deux semaines durant l'hiver. Les bacs bruns doivent être placés en bordure de rue " +
      "avant 7h le jour de collecte. Les résidents qui ne possèdent pas encore de bac brun peuvent en obtenir un gratuitement " +
      "en composant le 311 ou en se présentant à l'un des points de service municipaux.",
    questions: [
      { q: "À partir de quand la collecte devient-elle hebdomadaire ?", options: ["1er mars", "1er avril", "1er mai"], answer: 1 },
      { q: "Avant quelle heure les bacs doivent-ils être placés en bordure de rue ?", options: ["6h", "7h", "9h"], answer: 1 },
      { q: "Comment obtenir un bac brun gratuitement ?", options: ["En l'achetant en ligne", "En composant le 311", "Ce n'est pas possible"], answer: 1 },
    ],
  },
];

// Additional passages authored to bring the FULL_SET up to the official 40-question
// length (18 from QUICK_SET + 22 here = 40), mixing very short single-question notices
// with slightly longer two-question items, matching real exam composition.
const EXTRA_SHORT = [
  {
    id: "r7",
    level: "A1",
    type: "Notice",
    title: "Avis — Bibliothèque municipale",
    text: "La bibliothèque municipale sera fermée le lundi 21 avril pour un jour férié. Elle rouvrira normalement le mardi à 10h.",
    questions: [{ q: "Pourquoi la bibliothèque est-elle fermée le 21 avril ?", options: ["Rénovations", "Jour férié", "Grève du personnel"], answer: 1 }],
  },
  {
    id: "r8",
    level: "A1",
    type: "Ad",
    title: "Annonce — Vélo à vendre",
    text: "Vélo de ville en bon état à vendre, taille moyenne, avec panier et lumières. Prix : 120 $. Disponible dès maintenant, à récupérer sur place.",
    questions: [{ q: "Que comprend le vélo en plus du cadre ?", options: ["Un panier et des lumières", "Un casque", "Un cadenas"], answer: 0 }],
  },
  {
    id: "r9",
    level: "A1",
    type: "Message",
    title: "Message texte — Annulation de cours",
    text: "Salut ! Je ne pourrai pas venir au cours de yoga ce soir, je suis malade. Peux-tu prévenir le professeur ? Merci beaucoup, à bientôt.",
    questions: [{ q: "Pourquoi la personne annule-t-elle le cours ?", options: ["Elle est en voyage", "Elle est malade", "Elle a oublié"], answer: 1 }],
  },
  {
    id: "r10",
    level: "A2",
    type: "Notice",
    title: "Avis — Stationnement interdit",
    text: "En raison du déneigement, le stationnement sera interdit sur la rue Principale du 5 au 6 janvier, de minuit à 8h. Les véhicules non déplacés seront remorqués aux frais du propriétaire.",
    questions: [{ q: "Que risquent les véhicules non déplacés ?", options: ["Une amende par la poste", "Le remorquage", "Rien du tout"], answer: 1 }],
  },
  {
    id: "r11",
    level: "A2",
    type: "Ad",
    title: "Annonce d'emploi — Caissier(ère)",
    text: "Épicerie du quartier cherche caissier(ère) à temps partiel, week-ends et soirs. Expérience non requise, formation offerte. Envoyez votre CV à emploi@epicerielocale.ca.",
    questions: [{ q: "L'expérience est-elle obligatoire pour ce poste ?", options: ["Oui, deux ans minimum", "Non, une formation est offerte", "Seulement pour les soirs"], answer: 1 }],
  },
  {
    id: "r12",
    level: "A1",
    type: "Message",
    title: "Note laissée sur la table",
    text: "Coucou, il reste de la soupe au frigo pour ce soir, réchauffe-la 3 minutes au micro-ondes. Je rentre vers 20h. Bisous !",
    questions: [{ q: "À quelle heure la personne rentre-t-elle ?", options: ["18h", "20h", "22h"], answer: 1 }],
  },
];

const EXTRA_MEDIUM = [
  {
    id: "r13",
    level: "B1",
    type: "Email",
    title: "E-mail — Confirmation d'entrevue",
    text:
      "Bonjour, Nous vous remercions pour votre candidature au poste d'adjoint administratif. Nous aimerions vous rencontrer " +
      "pour une entrevue le mardi 9 mai à 13h30, dans nos bureaux du centre-ville. Merci d'apporter une pièce d'identité et " +
      "une copie de votre CV. Veuillez confirmer votre présence par retour de courriel avant vendredi.",
    questions: [
      { q: "Quel poste est concerné par cette entrevue ?", options: ["Adjoint administratif", "Caissier", "Formateur"], answer: 0 },
      { q: "Que doit apporter le candidat ?", options: ["Seulement une pièce d'identité", "Une pièce d'identité et une copie du CV", "Rien de particulier"], answer: 1 },
    ],
  },
  {
    id: "r14",
    level: "B1",
    type: "Notice",
    title: "Avis — Coupure d'eau planifiée",
    text:
      "En raison de travaux d'entretien sur le réseau, l'eau sera coupée dans le secteur Ouest le samedi 12 août, de 8h à 16h. " +
      "Nous recommandons aux résidents de faire une réserve d'eau potable avant cette date. Le retour de l'eau peut occasionner " +
      "une légère décoloration temporaire, sans danger pour la santé.",
    questions: [
      { q: "Pourquoi coupe-t-on l'eau ce jour-là ?", options: ["Une fuite d'urgence", "Des travaux d'entretien planifiés", "Une pénurie d'eau"], answer: 1 },
      { q: "Que peut-on observer au retour de l'eau ?", options: ["Une légère décoloration", "Une odeur de chlore forte", "Rien d'inhabituel"], answer: 0 },
    ],
  },
  {
    id: "r15",
    level: "B1",
    type: "Article",
    title: "Article — Un jardin communautaire voit le jour",
    text:
      "La Ville a annoncé cette semaine l'ouverture d'un nouveau jardin communautaire dans le parc des Ormes. Les résidents " +
      "intéressés pourront réserver une parcelle gratuitement à partir du 1er mai, dans la limite des places disponibles. " +
      "L'initiative vise à encourager l'agriculture urbaine et à créer un espace de rencontre pour les habitants du quartier. " +
      "Des ateliers de jardinage seront également offerts tout au long de l'été.",
    questions: [
      { q: "Où se trouve le nouveau jardin communautaire ?", options: ["Parc des Ormes", "Parc du centre-ville", "Derrière la bibliothèque"], answer: 0 },
      { q: "Combien coûte une parcelle ?", options: ["50 $ par saison", "C'est gratuit", "Le prix varie selon la taille"], answer: 1 },
    ],
  },
  {
    id: "r16",
    level: "B1",
    type: "Opinion",
    title: "Tribune — Le transport en commun devrait-il être gratuit ?",
    text:
      "Plusieurs villes dans le monde expérimentent la gratuité des transports en commun pour réduire la congestion et la " +
      "pollution. Les partisans de cette mesure soulignent qu'elle rend la mobilité plus équitable pour les ménages à faible " +
      "revenu. Les critiques, eux, s'inquiètent du financement à long terme et craignent que la qualité du service ne se " +
      "détériore sans revenus tarifaires suffisants pour l'entretien du réseau.",
    questions: [
      { q: "Quel est un argument en faveur de la gratuité ?", options: ["Elle rend la mobilité plus équitable", "Elle augmente les revenus de la ville", "Elle réduit le nombre de passagers"], answer: 0 },
      { q: "Quelle est la principale inquiétude des critiques ?", options: ["Le bruit des autobus", "Le financement à long terme", "La vitesse des trajets"], answer: 1 },
    ],
  },
  {
    id: "r17",
    level: "B1",
    type: "Notice",
    title: "Avis — Politique de gel d'abonnement au centre sportif",
    text:
      "Le centre sportif rappelle à ses membres qu'un abonnement peut être gelé pour une durée maximale de trois mois par " +
      "année, sur présentation d'un motif valable (voyage prolongé, blessure, déménagement temporaire). La demande doit être " +
      "faite par écrit au moins cinq jours ouvrables avant la date souhaitée. Aucun remboursement n'est offert pour les périodes " +
      "non gelées à l'avance.",
    questions: [
      { q: "Quelle est la durée maximale de gel par année ?", options: ["1 mois", "3 mois", "6 mois"], answer: 1 },
      { q: "Combien de jours d'avis faut-il donner ?", options: ["Aucun avis nécessaire", "Au moins 5 jours ouvrables", "30 jours"], answer: 1 },
    ],
  },
  {
    id: "r18",
    level: "B1",
    type: "Article",
    title: "Article — Le marché fermier change d'horaire",
    text:
      "Le marché fermier du centre-ville passera à un horaire estival à compter du 1er juin : il sera désormais ouvert du " +
      "mercredi au dimanche, de 9h à 18h, plutôt que seulement les fins de semaine. Les organisateurs espèrent ainsi mieux " +
      "répondre à la demande croissante des résidents et offrir davantage de débouchés aux producteurs locaux.",
    questions: [
      { q: "Quels jours le marché sera-t-il ouvert l'été ?", options: ["Seulement les fins de semaine", "Du mercredi au dimanche", "Tous les jours"], answer: 1 },
      { q: "Pourquoi ce changement d'horaire ?", options: ["Pour réduire les coûts", "Pour répondre à la demande croissante", "À cause de travaux"], answer: 1 },
    ],
  },
  {
    id: "r19",
    level: "B1",
    type: "Email",
    title: "E-mail — Rappel d'échéance de frais de scolarité",
    text:
      "Bonjour, Nous vous rappelons que la date limite de paiement des frais de scolarité du trimestre d'automne est le " +
      "15 septembre. Après cette date, des frais de retard de 50 $ s'appliqueront automatiquement. Un plan de paiement " +
      "échelonné est disponible sur demande auprès du bureau des finances étudiantes avant l'échéance.",
    questions: [
      { q: "Que se passe-t-il après le 15 septembre ?", options: ["Rien de particulier", "Des frais de retard de 50 $ s'appliquent", "L'inscription est annulée"], answer: 1 },
      { q: "Comment obtenir un plan de paiement échelonné ?", options: ["Ce n'est pas possible", "En le demandant avant l'échéance", "Automatiquement pour tous"], answer: 1 },
    ],
  },
  {
    id: "r20",
    level: "B1",
    type: "Opinion",
    title: "Tribune — La semaine de quatre jours, une bonne idée ?",
    text:
      "De plus en plus d'entreprises testent la semaine de travail de quatre jours, sans réduction de salaire. Les défenseurs " +
      "de cette formule citent des études montrant une productivité stable, voire meilleure, et une nette amélioration du " +
      "bien-être des employés. Les sceptiques, eux, doutent que cette formule soit applicable à tous les secteurs, notamment " +
      "ceux qui exigent une présence continue, comme la santé ou le commerce de détail.",
    questions: [
      { q: "Que montrent les études citées par les défenseurs ?", options: ["Une baisse de productivité", "Une productivité stable ou meilleure", "Aucun changement de bien-être"], answer: 1 },
      { q: "Quel type de secteur inquiète les sceptiques ?", options: ["Les secteurs exigeant une présence continue", "Les secteurs technologiques", "Les emplois à distance"], answer: 0 },
    ],
  },
];

export const FULL_SET = [...QUICK_SET, ...EXTRA_SHORT, ...EXTRA_MEDIUM];

export const FULL_SET_QUESTION_COUNT = FULL_SET.reduce((sum, p) => sum + p.questions.length, 0);
