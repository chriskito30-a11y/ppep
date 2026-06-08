const CORE_MODULES = [
  {
    id: 'module-0',
    title: 'Video de depart et auto-evaluation initiale',
    actionLabel: 'Realiser ma video de depart',
    objective: 'Creer un point de depart observable et bienveillant avant de travailler les techniques.',
    methodOutcome: 'J ai ma video de depart et une observation simple: ce qui est clair, ce qui est confus, ce que je veux ameliorer.',
    sourceMaterials: [
      'GERER LE TRAC.pptx',
      '1 Preparez votre prise de parole.pdf',
      'Exercice numero 50 - Repetition generale.pdf',
      'PRISE DE PAROLE EN PUBLIC POSER LES BASES.pptx',
    ],
    lesson: [
      'La premiere video n est pas une performance: elle sert a garder une trace de votre point de depart.',
      'Je ne cherche pas a tout corriger. Je cherche un point de depart simple et observable.',
      'Un format court de 3 a 5 minutes suffit pour observer ce qui se passe quand vous prenez la parole.',
      'Le trac peut se manifester dans le corps, les pensees et les comportements; l objectif est de le regarder sans dramatiser.',
      'La preparation commence par trois reperes simples: a qui je parle, ce que je veux transmettre, comment je veux le faire passer.',
      'Votre attention doit aller vers la tache et le message, pas uniquement vers les signes de trac.',
      'La video sera utile plus tard si vous notez maintenant des criteres concrets: clarte, structure, regard, voix, posture, rythme.',
      'Une observation juste combine toujours une force deja presente et un axe de travail prioritaire.',
    ],
    keyIdeas: [
      {
        title: 'Point de depart, pas jugement',
        body: 'Vous filmez une situation de reference pour pouvoir comparer ensuite. La question n est pas "suis-je bon ?", mais "qu est-ce que j observe ?".',
      },
      {
        title: 'Trac observable',
        body: 'Notez les manifestations visibles ou ressenties: respiration, mains, voix, debit, trous, auto-surveillance, envie d aller trop vite.',
      },
      {
        title: 'Regarder la tache',
        body: 'Quand le trac monte, revenez au prochain message a transmettre. Cette bascule est deja un entrainement.',
      },
    ],
    exercise: {
      title: 'Filmer une presentation de 3 a 5 minutes',
      duration: '25 a 35 minutes',
      materials: ['telephone ou webcam', 'feuille de notes', 'chronometre'],
      steps: [
        'Choisissez un sujet simple et reel: projet, idee, retour d experience, presentation professionnelle.',
        'Preparez trois reperes seulement: depart, message principal, fin.',
        'Installez un plan fixe, avec assez de lumiere et un cadrage qui montre le haut du corps.',
        'Parlez 3 a 5 minutes sans recommencer a chaque hesitation.',
        'Regardez la video une seule fois, puis arretez-vous pour noter les observations.',
        'Relevez une force, un point a travailler et une action concrete pour le module suivant.',
      ],
    },
    observableCriteria: [
      'Ce qui est clair dans ma prise de parole.',
      'Ce qui reste confus ou trop long.',
      'Le point prioritaire que je veux ameliorer au prochain essai.',
    ],
    worksheet: {
      title: 'Fiche de depart papier',
      description: 'Support pour noter le contexte, le ressenti, les forces et les axes de travail observes dans la premiere video.',
      source: 'Consigne video de depart, GERER LE TRAC et Exercice numero 50.',
      sections: [
        {
          title: 'Contexte de la video',
          prompts: ['Sujet choisi', 'Public imagine', 'Duree realisee', 'Message que je voulais faire passer'],
        },
        {
          title: 'Observation bienveillante',
          prompts: ['Une chose qui fonctionne deja', 'Un moment qui reste confus', 'Ce que je veux rendre plus clair au prochain essai'],
        },
        {
          title: 'Point de depart',
          prompts: ['Mon niveau de trac avant de parler', 'Le signe de trac le plus visible', 'Mon point d appui pour continuer le parcours'],
        },
      ],
    },
    selfAssessment: {
      prompt: 'Apres l exercice, comment vous situez-vous ?',
      options: [
        { value: 'a-revoir', label: 'J ai besoin de refaire calmement' },
        { value: 'pret', label: 'J ai fait l exercice et je peux avancer' },
        { value: 'solide', label: 'Je me sens deja plus clair' },
      ],
    },
    rhythmTip: 'Laissez passer au moins une nuit avant le module suivant si possible.',
    shortChallenge: 'Avant le prochain module, observez une situation ou vous prenez la parole naturellement.',
  },
  {
    id: 'module-1',
    title: 'Me comprendre',
    actionLabel: 'Identifier mon cadre de reference',
    objective: 'Observer simplement mon rapport a l oral pour choisir une phrase d appui et une action concrete.',
    methodOutcome: 'J ai repere mes phrases reflexes et choisi une phrase d appui pour avancer sans me juger.',
    sourceMaterials: [
      'CADRE DE REFERENCE.pptx',
      'Exercice numero 1 - Evaluez vos besoins.pdf',
      '1 Preparez votre prise de parole.pdf',
    ],
    lesson: [
      'Ce module ne cherche pas a dresser un profil psychologique. Il sert seulement a observer votre point de depart a l oral.',
      'Avant de parler, chacun a des phrases reflexes: "je vais oublier", "je dois etre parfait", "je n ai pas le droit d hesiter".',
      'Ces phrases reflexes influencent la preparation, le trac et la facon de commencer.',
      'Le travail autonome consiste a les noter simplement, sans chercher une cause profonde.',
      'Une phrase d appui remplace la pression par une consigne utile: "je clarifie mon message" ou "je parle une idee apres l autre".',
      'Vous n avez pas besoin de tout comprendre de vous-meme pour avancer. Vous avez besoin d un repere concret a tester.',
      'Le resultat attendu est une petite boussole personnelle pour preparer une prise de parole simple.',
    ],
    keyIdeas: [
      {
        title: 'Phrase reflexe',
        body: 'C est ce qui vient automatiquement avant ou pendant l oral. On la note pour la voir, pas pour se juger.',
      },
      {
        title: 'Phrase d appui',
        body: 'C est une consigne courte, realiste et actionnable qui aide a revenir a la methode.',
      },
      {
        title: 'Observation simple',
        body: 'Dans l autonome, on observe ce que l on se dit, ce que l on ressent et ce que l on fait. Le diagnostic approfondi appartient a l accompagnement.',
      },
    ],
    exercise: {
      title: 'Observer mes phrases reflexes a l oral',
      duration: '30 minutes',
      materials: ['fiche papier', 'souvenir d une prise de parole reelle'],
      steps: [
        'Choisissez une prise de parole recente, meme courte.',
        'Notez ce que vous avez pense avant, pendant et apres.',
        'Soulignez les phrases qui vous mettent de la pression.',
        'Choisissez une seule phrase reflexe a transformer.',
        'Transformez-la en consigne de travail realiste.',
        'Choisissez une situation simple pour tester cette phrase d appui dans la semaine.',
      ],
    },
    observableCriteria: [
      'Je sais nommer une phrase reflexe sans me juger.',
      'J ai transforme une phrase de pression en phrase d appui.',
      'J ai choisi une action concrete a tester.',
    ],
    worksheet: {
      title: 'Fiche cadre de reference',
      description: 'Support pour observer simplement ses phrases reflexes et choisir une phrase d appui.',
      source: 'CADRE DE REFERENCE et exercices de preparation PPEP.',
      sections: [
        {
          title: 'Mes experiences',
          prompts: ['Une prise de parole reussie', 'Une prise de parole difficile', 'Ce que ces experiences declenchent chez moi aujourd hui'],
        },
        {
          title: 'Mes reactions',
          prompts: ['Ce que je me dis avant de parler', 'Ce que mon corps fait', 'Ce que je fais pour me proteger'],
        },
        {
          title: 'Phrase d appui',
          prompts: ['Phrase reflexe reperee', 'Phrase d appui plus juste', 'Premier comportement a tester'],
        },
      ],
    },
    selfAssessment: {
      prompt: 'Qu avez-vous identifie pendant l exercice ?',
      options: [
        { value: 'a-revoir', label: 'Je dois encore clarifier mes reactions' },
        { value: 'pret', label: 'J ai choisi une phrase d appui utile' },
        { value: 'solide', label: 'Je vois deja comment ajuster ma preparation' },
      ],
    },
    rhythmTip: 'Prenez 10 minutes dans la semaine pour observer une prise de parole reelle.',
    shortChallenge: 'Reperez une phrase limitante et transformez-la en phrase d appui.',
  },
  {
    id: 'module-2',
    title: 'Apprivoiser mon trac',
    actionLabel: 'Observer mes reactions face au trac',
    objective: 'Identifier les manifestations du trac et choisir un levier simple pour revenir au message.',
    methodOutcome: 'J ai ma carte simple du trac et un levier court a utiliser avant de parler.',
    sourceMaterials: [
      'GERER LE TRAC.pptx',
      'Savoir gerer la pression au travail.pdf',
      'Exercice numero 45 - Aiguisez vos sens.pdf',
      'Exercice numero 47a - Choisissez et polissez votre moment.pdf',
    ],
    lesson: [
      'Le trac est une reaction ponctuelle liee a un enjeu et au regard reel ou imagine des autres.',
      'Il peut etre physique: respiration courte, coeur rapide, gorge seche, mains moites, tension dans les epaules.',
      'Il peut etre cognitif: peur de bafouiller, d etre juge, d oublier, de rougir, de ne pas etre interessant.',
      'Le but n est pas de supprimer toute anxiete: un peu d activation peut devenir une energie utile.',
      'Le cercle vicieux commence quand toute l attention part vers les symptomes au lieu de rester sur le contenu.',
      'Les leviers simples sont la respiration, le relachement, la preparation, la repetition et le retour au message.',
      'Si le trac est tres fort ou recurrent, le parcours autonome ne remplace pas un accompagnement adapte. Ici, vous choisissez seulement un premier levier simple.',
    ],
    keyIdeas: [
      {
        title: 'Nommer pour reprendre la main',
        body: 'Dire "je ressens du trac" aide a sortir de "je suis nul". Vous observez un phenomene, vous ne definissez pas votre valeur.',
      },
      {
        title: 'Choisir une action possible',
        body: 'Une crainte devient plus gerable quand elle est formulee simplement et reliee a une action possible.',
      },
      {
        title: 'Revenir au contenu',
        body: 'Quand l auto-surveillance arrive, revenez au prochain point a transmettre, a votre plan ou a une respiration lente.',
      },
    ],
    exercise: {
      title: 'Construire ma carte du trac et mon levier de regulation',
      duration: '30 a 40 minutes',
      materials: ['fiche papier', 'chronometre', 'endroit calme'],
      steps: [
        'Listez les signes physiques que vous connaissez chez vous.',
        'Listez les pensees ou predictions negatives qui apparaissent.',
        'Choisissez une seule crainte prioritaire et notez ce que vous ferez si elle arrive.',
        'Testez un levier simple pendant deux minutes: respirer, ralentir, poser les pieds ou relacher les epaules.',
        'Associez ce levier a une phrase courte: "je reviens a mon message".',
        'Notez quand vous le pratiquerez avant la prochaine prise de parole.',
      ],
    },
    observableCriteria: [
      'Je sais reconnaitre mes trois premiers signes de trac.',
      'Je distingue une sensation physique d une prediction negative.',
      'J ai choisi un levier court que je peux refaire sans materiel.',
    ],
    worksheet: {
      title: 'Fiche trac et regulation',
      description: 'Support pour identifier les signaux du trac, questionner les craintes et choisir un levier court.',
      source: 'GERER LE TRAC, Savoir gerer la pression et exercices de relaxation.',
      sections: [
        {
          title: 'Mes signaux',
          prompts: ['Signaux physiques', 'Pensees ou craintes', 'Comportements de protection'],
        },
        {
          title: 'Ma crainte prioritaire',
          prompts: ['Ce que je crains', 'Ce qui peut vraiment arriver', 'Ce que je peux faire si cela arrive', 'Ce que je garde sous controle'],
        },
        {
          title: 'Mon levier',
          prompts: ['Respiration, relachement ou ancrage choisi', 'Phrase de retour au message', 'Moment de pratique'],
        },
      ],
    },
    selfAssessment: {
      prompt: 'Quel est votre point d appui apres l exercice ?',
      options: [
        { value: 'a-revoir', label: 'Je veux refaire l observation' },
        { value: 'pret', label: 'J ai choisi un levier simple' },
        { value: 'solide', label: 'Je peux utiliser ce levier avant une prise de parole' },
      ],
    },
    rhythmTip: 'Testez le levier choisi deux fois avant d enchainer.',
    shortChallenge: 'Pratiquez deux minutes de respiration avant une conversation ordinaire.',
  },
  {
    id: 'module-3',
    title: 'Definir mon objectif SMART',
    actionLabel: 'Clarifier mon objectif',
    objective: 'Transformer une intention vague en objectif de prise de parole concret, observable et motivant.',
    methodOutcome: 'J ai une phrase d objectif utilisable pour guider toute ma preparation.',
    sourceMaterials: [
      'Exercice numero 2 - Definissez votre objectif.pdf',
      'GERER LE TRAC.pptx',
      'Exercice numero 46 - Formulez votre objectif de facon tripale.pdf',
      '1 Preparez votre prise de parole.pdf',
    ],
    lesson: [
      'Un objectif n est pas seulement le sujet de votre intervention: c est le changement recherche chez votre public.',
      'Un objectif utile s exprime avec un verbe d action et un resultat identifiable.',
      'SMART aide a verifier que l objectif est specifique, mesurable, attractif, realiste et date.',
      'Un objectif trop vague augmente souvent le trac parce que vous ne savez pas quoi reussir exactement.',
      'Un objectif realiste n est pas un objectif petit: c est un objectif que vous pouvez preparer et observer.',
      'La formulation "a l issue de mon intervention..." force a penser au public et au resultat, pas seulement a soi.',
      'Une fois l objectif formule, il devient le filtre pour choisir les idees, exemples, supports et exercices de repetition.',
    ],
    keyIdeas: [
      {
        title: 'Sujet versus objectif',
        body: 'Sujet: "je parle de mon projet". Objectif: "a l issue de mon intervention, l equipe aura compris les trois decisions a prendre".',
      },
      {
        title: 'Mesurable sans devenir scolaire',
        body: 'Mesurable veut dire observable: decision prise, question clarifiee, action engagee, message reformule par le public.',
      },
      {
        title: 'Objectif et trac',
        body: 'Quand l objectif est clair, vous pouvez vous concentrer sur une mission. Cela remplace une partie de la pression vague par une direction precise.',
      },
    ],
    exercise: {
      title: 'Formuler et tester mon objectif SMART',
      duration: '30 minutes',
      materials: ['fiche papier', 'sujet de prise de parole reel'],
      steps: [
        'Ecrivez votre objectif de depart en une phrase simple.',
        'Reformulez-le avec "a l issue de mon intervention...".',
        'Verifiez qu il ne contient qu une action principale.',
        'Ajoutez un signe observable de reussite.',
        'Verifiez qu il est motivant et realiste dans le contexte.',
        'Choisissez une premiere decision de preparation qui decoule de cet objectif.',
      ],
    },
    observableCriteria: [
      'Mon objectif parle d un resultat chez le public.',
      'Je sais dire a quoi je verrai que l intervention a servi.',
      'Je peux retirer une idee qui ne sert pas cet objectif.',
    ],
    worksheet: {
      title: 'Fiche objectif SMART',
      description: 'Support pour cadrer une intervention concrete et transformer une intention en objectif de preparation.',
      source: 'Exercice numero 2, GERER LE TRAC et Exercice numero 46.',
      sections: [
        {
          title: 'Objectif de depart',
          prompts: ['Sujet de mon intervention', 'Ce que je veux obtenir ou faire changer', 'Public concerne'],
        },
        {
          title: 'Controle SMART',
          prompts: ['Specifique: une seule action claire', 'Mesurable: signe observable', 'Attractif: pourquoi cela compte', 'Realiste: ce qui le rend atteignable', 'Date: moment du resultat'],
        },
        {
          title: 'Formulation finale',
          prompts: ['A l issue de mon intervention...', 'Idee a garder absolument', 'Idee a retirer car elle ne sert pas l objectif'],
        },
      ],
    },
    selfAssessment: {
      prompt: 'Votre objectif est-il utilisable pour preparer ?',
      options: [
        { value: 'a-revoir', label: 'Je dois encore le preciser' },
        { value: 'pret', label: 'Il est assez clair pour avancer' },
        { value: 'solide', label: 'Il oriente deja mes choix de contenu' },
      ],
    },
    rhythmTip: 'Gardez l objectif visible pendant la preparation du module suivant.',
    shortChallenge: 'Expliquez votre objectif a voix haute en moins de 20 secondes.',
  },
  {
    id: 'module-4',
    title: 'Cadrer ma prise de parole',
    actionLabel: 'Preciser comprendre, retenir, ressentir',
    objective: 'Adapter le contenu au public avec trois reperes simples: comprendre, retenir et ressentir.',
    methodOutcome: 'J ai mes trois reperes public: ce qu il doit comprendre, retenir et ressentir.',
    sourceMaterials: [
      'Exercice numero 3b - Parlez a tous.pdf',
      'PPEP.pptx',
      'PRISE DE PAROLE EN PUBLIC POSER LES BASES.pptx',
      
    ],
    lesson: [
      'Une intervention efficace ne se contente pas de transmettre des informations: elle tient compte de ce que le public doit saisir, memoriser et ressentir.',
      'Comprendre concerne les explications: contexte, demarche, processus, lien logique.',
      'Retenir concerne les idees-forces: ce que le public doit garder meme s il oublie les details.',
      'Ressentir concerne l energie produite: confiance, motivation, curiosite, envie d agir, adhesion.',
      'Le public n est pas uniforme: certains attendent des idees nettes, d autres des explications, d autres une implication emotionnelle.',
      'Si vous devez convaincre, gardez la question simple: en quoi cette information aide-t-elle vraiment mon public ?',
      'Ce cadrage sert de filtre: une information qui ne fait ni comprendre, ni retenir, ni ressentir peut souvent etre retiree.',
    ],
    keyIdeas: [
      {
        title: 'Comprendre',
        body: 'Donnez au public les informations qui lui permettent de suivre: definitions, contexte, preuves, etapes.',
      },
      {
        title: 'Retenir',
        body: 'Choisissez peu d idees-forces. En situation de stress ou de surcharge, le public gardera surtout l essentiel.',
      },
      {
        title: 'Ressentir',
        body: 'L oral passe aussi par l energie, le ton, les images, les exemples et le lien au public.',
      },
      {
        title: 'Filtre simple',
        body: 'Avant d ajouter une information, demandez-vous si elle aide le public a comprendre, retenir ou ressentir quelque chose d utile.',
      },
    ],
    exercise: {
      title: 'Construire mon cadrage public',
      duration: '35 minutes',
      materials: ['objectif SMART', 'fiche papier', 'une personne test si possible'],
      steps: [
        'Ecrivez en une ligne qui est votre public et ce qu il attend probablement.',
        'Notez ce qu il doit comprendre pour suivre votre propos.',
        'Choisissez l idee-force a retenir en priorite.',
        'Nommez ce que vous voulez faire ressentir: securite, envie, urgence, confiance, fierte.',
        'Si vous devez convaincre, notez simplement en quoi une information aide votre public.',
        'Testez le cadrage en demandant a quelqu un ce qu il retient, comprend et ressent.',
      ],
    },
    observableCriteria: [
      'Je peux nommer mon public autrement que "tout le monde".',
      'Je distingue information utile et message essentiel.',
      'Je sais quel impact humain je cherche.',
    ],
    worksheet: {
      title: 'Fiche cadrage public',
      description: 'Support pour relier public, message essentiel et effet recherche.',
      source: 'Exercice numero 3b et supports PPEP.',
      sections: [
        {
          title: 'Public',
          prompts: ['Qui ecoute ?', 'Ce qu il sait deja', 'Ce dont il a besoin', 'Ce qui peut le freiner'],
        },
        {
          title: 'Comprendre / retenir / ressentir',
          prompts: ['Ce que le public doit comprendre', 'Idee-force a retenir', 'Emotion ou impulsion recherchee'],
        },
        {
          title: 'Information utile',
          prompts: ['Information ou fait', 'Pourquoi c est utile pour le public', 'Ce que je peux retirer si ce n est pas utile'],
        },
      ],
    },
    selfAssessment: {
      prompt: 'Votre cadrage aide-t-il a choisir quoi dire ?',
      options: [
        { value: 'a-revoir', label: 'Je dois encore choisir l essentiel' },
        { value: 'pret', label: 'J ai mes trois reperes' },
        { value: 'solide', label: 'Je peux retirer ce qui ne sert pas le cadrage' },
      ],
    },
    rhythmTip: 'Relisez ce cadrage avant de structurer votre intervention.',
    shortChallenge: 'Resumez comprendre, retenir, ressentir a une personne de confiance.',
  },
  {
    id: 'module-5',
    title: 'Structurer mon intervention avec le fil rouge',
    actionLabel: 'Organiser mes idees',
    objective: 'Transformer des idees eparses en progression claire, fluide et facile a suivre.',
    methodOutcome: 'J ai un message central, trois parties maximum et des transitions simples.',
    sourceMaterials: [
      'Exercice numero 4 - Structurez votre intervention le fil rouge.pdf',
      'organiser ses idees.pptx',
      'Exercice numero 6 - Et si vous ne pouviez dire que trois choses.pdf',
      '1 Preparez votre prise de parole.pdf',
    ],
    lesson: [
      'Structurer, c est construire l epine dorsale de l intervention: le public doit sentir ou vous l emmenez.',
      'Avant de classer, il faut vider les idees: messages, exemples, anecdotes, arguments, objections, preuves.',
      'Le fil rouge relie les parties entre elles; il evite l empilement de bonnes idees sans progression.',
      'L oral supporte mal la surcharge: si vous deviez ne dire que trois choses, lesquelles resteraient ?',
      'Les supports ne remplacent pas la structure; ils doivent servir le message et le public.',
      'Une transition fragile est souvent le signe que deux idees ne sont pas dans le bon ordre.',
      'La structure doit pouvoir se dire a voix haute en quelques phrases avant d etre developpee.',
    ],
    keyIdeas: [
      {
        title: 'Inventaire large',
        body: 'Notez d abord tout ce qui pourrait servir: idees, exemples, chiffres, anecdotes, objections. Le tri vient apres.',
      },
      {
        title: 'Trois points essentiels',
        body: 'En contexte de stress, le public retient peu. La contrainte des trois messages oblige a choisir.',
      },
      {
        title: 'Transitions',
        body: 'Une transition explique pourquoi on passe d une partie a l autre. Elle donne au public le sentiment d une progression logique.',
      },
    ],
    exercise: {
      title: 'Construire mon fil rouge avec tri et transitions',
      duration: '45 minutes',
      materials: ['post-it ou morceaux de papier', 'mur ou table', 'objectif SMART', 'fiche cadrage public'],
      steps: [
        'Ecrivez une idee, preuve, exemple ou anecdote par papier.',
        'Regroupez les papiers par familles: message, preuve, exemple, objection, support.',
        'Choisissez trois messages maximum qui servent directement l objectif.',
        'Organisez-les dans l ordre le plus naturel pour le public.',
        'Ajoutez une transition simple entre chaque partie.',
        'Dites le plan a voix haute sans lire et deplacez les elements si vous bloquez.',
      ],
    },
    observableCriteria: [
      'Je peux annoncer mon plan en trois phrases.',
      'Chaque partie sert l objectif SMART.',
      'Je sais quelle idee retirer si le temps diminue.',
      'Mes transitions expliquent le chemin, pas seulement le changement de slide.',
    ],
    worksheet: {
      title: 'Fiche fil rouge',
      description: 'Support pour trier les idees, garder l essentiel et tester la fluidite de la structure.',
      source: 'Exercice numero 4, organiser ses idees et Exercice numero 6.',
      sections: [
        {
          title: 'Inventaire des idees',
          prompts: ['Idees principales', 'Exemples ou anecdotes', 'Arguments ou preuves', 'Elements a retirer'],
        },
        {
          title: 'Mes trois messages',
          prompts: ['Message 1', 'Message 2', 'Message 3', 'Pourquoi cet ordre ?'],
        },
        {
          title: 'Transitions et test oral',
          prompts: ['Transition 1 vers 2', 'Transition 2 vers 3', 'Endroit ou je bloque', 'Reorganisation a tester'],
        },
      ],
    },
    selfAssessment: {
      prompt: 'Votre structure est-elle suivable ?',
      options: [
        { value: 'a-revoir', label: 'Je dois simplifier le plan' },
        { value: 'pret', label: 'Mon fil rouge est clair' },
        { value: 'solide', label: 'Je peux le dire sans lire un texte' },
      ],
    },
    rhythmTip: 'Testez le fil rouge a voix haute avant de passer aux ouvertures.',
    shortChallenge: 'Dites votre plan en trois phrases maximum.',
  },
  {
    id: 'module-6',
    title: "Preparer l'introduction",
    actionLabel: 'Construire mon demarrage',
    objective: 'Preparer les premiers mots pour ouvrir l attention, poser le sujet et annoncer le chemin.',
    methodOutcome: 'J ai une introduction courte en quatre reperes: lien, sujet, utilite, chemin.',
    sourceMaterials: [
      'Exercice numero 5a - Soignez l introduction.pdf',
      'PPEP.pptx',
      'PRISE DE PAROLE EN PUBLIC POSER LES BASES.pptx',
      '1 Preparez votre prise de parole.pdf',
    ],
    lesson: [
      'Les premiers mots orientent l ecoute: ils peuvent ouvrir l attention ou laisser le public a distance.',
      'Une introduction n est pas un long preambule; elle cree le lien, pose le sujet et donne envie d ecouter.',
      'Dire bonjour, remercier et nommer simplement le contexte installe une presence humaine.',
      'Se presenter brievement sert la legitimite, surtout si le public ne vous connait pas.',
      'Une question declencheuse implique le public et transforme une entree froide en invitation.',
      'L accroche peut surprendre, amuser, questionner ou faire image, tant qu elle reste utile au sujet.',
      'Preparer les premiers mots diminue les hesitations de depart et aide a traverser le pic de trac.',
    ],
    keyIdeas: [
      {
        title: 'Lien',
        body: 'Le public ecoute mieux quand il comprend qui parle, pourquoi maintenant et en quoi cela le concerne.',
      },
      {
        title: 'Accroche',
        body: 'Une bonne accroche n est pas decorative. Elle met le public dans le sujet et ouvre une question.',
      },
      {
        title: 'Annonce courte',
        body: 'Le debut doit donner assez de cadre pour rassurer, sans raconter tout le contenu.',
      },
    ],
    exercise: {
      title: 'Ecrire et tester mon introduction',
      duration: '30 minutes',
      materials: ['objectif SMART', 'fil rouge', 'chronometre'],
      steps: [
        'Ecrivez une version brute de vos trente premieres secondes.',
        'Ajoutez bonjour, remerciement ou contexte si c est adapte.',
        'Redigez une presentation de legitimite en une phrase.',
        'Trouvez une question declencheuse ou une accroche.',
        'Annoncez le sujet et le chemin sans detailler tout le plan.',
        'Dites l introduction a voix haute trois fois et retirez ce qui sonne lourd.',
      ],
    },
    observableCriteria: [
      'Le public sait rapidement pourquoi il ecoute.',
      'L accroche ouvre le sujet au lieu de distraire.',
      'L introduction tient en moins d une minute.',
    ],
    worksheet: {
      title: 'Fiche introduction',
      description: 'Support pour preparer les premiers mots et verifier leur impact.',
      source: 'Exercice numero 5a et supports de preparation PPEP.',
      sections: [
        {
          title: 'Installer le lien',
          prompts: ['Bonjour / remerciement / contexte', 'Phrase de presentation ou legitimite', 'Ce que je ressens et peux dire sobrement'],
        },
        {
          title: 'Accroche',
          prompts: ['Question declencheuse', 'Image, fait ou anecdote possible', 'Pourquoi cette accroche sert mon sujet'],
        },
        {
          title: 'Annonce',
          prompts: ['Sujet en une phrase', 'Promesse ou utilite pour le public', 'Plan annonce en quelques mots'],
        },
      ],
    },
    selfAssessment: {
      prompt: 'Votre introduction ouvre-t-elle clairement le sujet ?',
      options: [
        { value: 'a-revoir', label: 'Je dois encore simplifier' },
        { value: 'pret', label: 'Je peux demarrer clairement' },
        { value: 'solide', label: 'Je me sens pret a capter l attention' },
      ],
    },
    rhythmTip: 'Repetez l introduction separement, puis avec le plan.',
    shortChallenge: 'Dites votre introduction debout, sans support, une fois par jour.',
  },
  {
    id: 'module-7',
    title: 'Preparer la conclusion',
    actionLabel: 'Preparer la derniere impression',
    objective: 'Construire une fin claire qui laisse au public un message final et une suite.',
    methodOutcome: 'J ai une conclusion simple: rappel essentiel, message final, prochaine etape.',
    sourceMaterials: [
      'Exercice numero 5b - Soignez la conclusion.pdf',
      'PPEP.pptx',
      '1 Preparez votre prise de parole.pdf',
    ],
    lesson: [
      'La conclusion est l echo final: elle influence ce que le public garde en memoire.',
      'Elle doit synthetiser les messages essentiels, pas rouvrir toutes les explications.',
      'Elle peut ouvrir sur l avenir, une decision, une question plus large ou une prochaine action.',
      'Remercier et annoncer la suite permet de fermer proprement tout en maintenant le lien.',
      'C est aussi le moment de refaire passer l emotion principale: motivation, confiance, enthousiasme, adhesion.',
      'Une image ou une phrase forte peut aider, si elle reste sincere et reliee au sujet.',
      'Une conclusion preparee evite les fins brusques, les "voila" faibles et les derniers mots improvises sous pression.',
    ],
    keyIdeas: [
      {
        title: 'Synthese',
        body: 'Reprenez l essentiel en peu de mots: ce que le public doit garder quand la salle se vide.',
      },
      {
        title: 'Ouverture',
        body: 'Une ouverture donne une suite: action, rendez-vous, question, decision, application concrete.',
      },
      {
        title: 'Derniere emotion',
        body: 'La fin est un moment d impact. Choisissez l emotion a laisser et adaptez vos mots, votre voix et votre silence.',
      },
    ],
    exercise: {
      title: 'Ecrire ma sortie et la tester',
      duration: '25 a 35 minutes',
      materials: ['fil rouge', 'objectif SMART', 'chronometre'],
      steps: [
        'Relisez votre objectif et vos trois messages.',
        'Ecrivez une synthese en deux phrases maximum.',
        'Ajoutez une ouverture: action, decision, suite ou question.',
        'Redigez un remerciement simple et une phrase de suite ou d ouverture.',
        'Dites la conclusion a voix haute en moins d une minute.',
        'Verifiez que la derniere phrase peut vraiment etre votre dernier mot.',
      ],
    },
    observableCriteria: [
      'La conclusion rappelle l essentiel sans redire tout le plan.',
      'Elle donne une suite claire ou une ouverture utile.',
      'La derniere phrase est assumee et memorisable.',
    ],
    worksheet: {
      title: 'Fiche conclusion',
      description: 'Support pour preparer la fin, l ouverture et la derniere phrase.',
      source: 'Exercice numero 5b et supports de preparation PPEP.',
      sections: [
        {
          title: 'Synthese finale',
          prompts: ['Message essentiel 1', 'Message essentiel 2', 'Phrase de synthese'],
        },
        {
          title: 'Ouverture',
          prompts: ['Action ou decision attendue', 'Question plus large', 'Emotion a laisser au public'],
        },
        {
          title: 'Derniers mots',
          prompts: ['Remerciement', 'Suite ou ouverture', 'Derniere phrase exacte'],
        },
      ],
    },
    selfAssessment: {
      prompt: 'Votre conclusion laisse-t-elle une trace claire ?',
      options: [
        { value: 'a-revoir', label: 'Je dois encore choisir le message final' },
        { value: 'pret', label: 'Ma conclusion est utilisable' },
        { value: 'solide', label: 'Elle renforce l impact recherche' },
      ],
    },
    rhythmTip: 'Travaillez la conclusion avant la fiche finale.',
    shortChallenge: 'Testez votre conclusion devant une personne ou un miroir.',
  },
  {
    id: 'module-8',
    title: 'Construire ma fiche finale de prise de parole',
    actionLabel: 'Rassembler ma preparation',
    objective: 'Rassembler tout le travail dans un support papier court qui aide a parler sans lire.',
    methodOutcome: 'J ai ma fiche finale pour parler avec des mots cles sans lire un texte complet.',
    sourceMaterials: [
      'Exercice numero 34 - Preparez vos fiches.pdf',
      'organiser ses idees.pptx',
      'SCRIPT avec intention.pdf',
      
    ],
    lesson: [
      'La fiche finale sert a soutenir la parole; elle ne doit jamais devenir un texte a lire.',
      'Une fiche efficace contient le plan, les mots cles, les transitions, les citations eventuelles et les signaux importants.',
      'Utiliser une fiche par grande sequence aide a ne pas se perdre.',
      'Les mots cles sont plus utiles que les phrases completes: ils relancent la pensee sans bloquer la voix.',
      'Ecrire gros, numeroter, utiliser la couleur et garder le recto seulement facilitent l usage en situation.',
      'La fiche doit reprendre l objectif, le public, comprendre/retenir/ressentir, le fil rouge, l introduction et la conclusion.',
      'L entrainement consiste aussi a lever les yeux: la fiche est un appui, pas un refuge.',
    ],
    keyIdeas: [
      {
        title: 'Fiche bristol mentale',
        body: 'Que la fiche soit papier ou numerique, elle doit fonctionner comme un guide visuel tres court.',
      },
      {
        title: 'Mots cles',
        body: 'Un mot cle declenche une idee. Une phrase complete vous pousse a lire.',
      },
      {
        title: 'Signaux de parole',
        body: 'Ajoutez des marques utiles: pause, regard, exemple, changement de rythme, question au public.',
      },
    ],
    exercise: {
      title: 'Assembler ma fiche finale utilisable debout',
      duration: '45 minutes',
      materials: ['fiches papier ou feuille A4', 'surligneurs', 'travaux modules 3 a 7'],
      steps: [
        'Reprenez l objectif SMART et le cadrage public.',
        'Inscrivez le fil rouge en trois grandes parties maximum.',
        'Ajoutez introduction et conclusion sous forme de reperes; seules les premieres et dernieres phrases peuvent etre ecrites completement.',
        'Ajoutez les mots cles, citations ou chiffres indispensables.',
        'Marquez les pauses, questions ou moments de regard.',
        'Testez la fiche debout: si vous lisez, reduisez encore jusqu a garder surtout des mots cles.',
      ],
    },
    observableCriteria: [
      'La fiche tient sur une page ou quelques cartes numerotees.',
      'Elle contient surtout des mots cles.',
      'Je peux lever les yeux sans perdre le fil.',
    ],
    worksheet: {
      title: 'Fiche finale de prise de parole',
      description: 'Support final pour rassembler la preparation sans rediger le discours complet.',
      source: 'Exercice numero 34, organiser ses idees et travaux des modules precedents.',
      sections: [
        {
          title: 'Cadre',
          prompts: ['Objectif SMART', 'Public', 'Comprendre', 'Retenir', 'Ressentir'],
        },
        {
          title: 'Structure',
          prompts: ['Introduction en mots cles', 'Partie 1', 'Partie 2', 'Partie 3', 'Conclusion en mots cles'],
        },
        {
          title: 'Signaux utiles',
          prompts: ['Pause importante', 'Question au public', 'Exemple ou anecdote', 'Citation ou chiffre', 'Mot qui me remet dans le fil'],
        },
      ],
    },
    selfAssessment: {
      prompt: 'Votre fiche aide-t-elle a parler sans lire ?',
      options: [
        { value: 'a-revoir', label: 'Elle est encore trop longue' },
        { value: 'pret', label: 'Elle me guide sans remplacer ma parole' },
        { value: 'solide', label: 'Je peux m entrainer avec cette fiche' },
      ],
    },
    rhythmTip: 'Utilisez la fiche pour une repetition courte avant la video finale.',
    shortChallenge: 'Reduisez votre fiche a une seule page.',
  },
  {
    id: 'module-9',
    title: 'Video de progression et bilan final',
    actionLabel: 'Constater ma progression',
    objective: 'Refaire une prise de parole courte, comparer avec la video de depart et choisir le prochain pas.',
    methodOutcome: 'J ai compare mes deux videos, choisi mon axe prioritaire et ecrit mon plan d action final.',
    sourceMaterials: [
      'Exercice numero 50 - Repetition generale.pdf',
      'GERER LE TRAC.pptx',
      'PRISE DE PAROLE EN PUBLIC POSER LES BASES.pptx',
    ],
    lesson: [
      'La video finale sert a mesurer un chemin parcouru, pas a chercher une perfection theatrale.',
      'La comparaison doit rester simple: clarte, structure et ressenti. Vous n avez pas a vous corriger comme un formateur.',
      'La repetition generale permet de tester l intervention comme un tout: introduction, transitions, conclusion, temps.',
      'L auto-observation suffit pour ce parcours autonome: vous notez ce que vous voyez, puis vous choisissez un seul prochain pas.',
      'Un bon bilan identifie des progres visibles, des points encore instables et une prochaine pratique realiste.',
      'Pour un retour personnalise sur votre video, posture, voix ou regard, cela releve du parcours accompagne.',
      'Terminer le parcours, c est repartir avec une methode reutilisable pour d autres prises de parole.',
    ],
    keyIdeas: [
      {
        title: 'Comparer sans se demolir',
        body: 'Comparez des criteres, pas votre personne. Cherchez ce qui est plus clair, plus pose, plus structure ou plus present.',
      },
      {
        title: 'Auto-observation utile',
        body: 'Une auto-observation utile reste courte: ce que je vois, ce qui progresse, ce que je choisis de refaire autrement.',
      },
      {
        title: 'Suite de progression',
        body: 'Le dernier module ouvre le suivant dans la vraie vie: choisir une occasion reelle de reparler avec la methode.',
      },
    ],
    exercise: {
      title: 'Comparer mes deux videos et choisir mon prochain pas',
      duration: '45 a 60 minutes',
      materials: ['telephone ou webcam', 'fiche finale', 'video de depart', 'grille de bilan'],
      steps: [
        'Preparez la meme duree que la video de depart: 3 a 5 minutes.',
        'Utilisez votre fiche finale sans lire de phrases completes.',
        'Filmez en plan fixe, puis laissez passer quelques minutes avant de regarder.',
        'Comparez avec la video de depart sur trois criteres: clarte, structure, ressenti.',
        'Notez trois progres visibles et un axe prioritaire.',
        'Ecrivez votre plan d action final: routine de preparation, prochain oral reel, axe prioritaire et ce que vous gardez de la methode.',
      ],
    },
    observableCriteria: [
      'La prise de parole dure 3 a 5 minutes.',
      'Le message principal et la structure sont plus faciles a suivre.',
      'Je sais nommer trois progres visibles sans me juger.',
      'J ai choisi un seul axe prioritaire pour la suite.',
    ],
    worksheet: {
      title: 'Grille de bilan final',
      description: 'Support pour comparer la video de depart et la video finale, puis repartir avec un plan d action simple.',
      source: 'Exercice numero 50 et supports de preparation PPEP.',
      sections: [
        {
          title: 'Comparaison',
          prompts: ['Ce qui a change depuis la video de depart', 'Trois progres visibles', 'Un point encore fragile'],
        },
        {
          title: 'Criteres',
          prompts: ['Clarte du message', 'Structure', 'Ressenti pendant la prise de parole', 'Gestion du trac'],
        },
        {
          title: 'Plan d action final',
          prompts: ['Mon prochain oral reel', 'Ma routine de preparation', 'Mon axe prioritaire', 'Ce que je garde de la methode'],
        },
      ],
    },
    selfAssessment: {
      prompt: 'Que montre votre bilan final ?',
      options: [
        { value: 'a-revoir', label: 'Je dois refaire une comparaison plus calme' },
        { value: 'pret', label: 'J ai identifie mes progres et mon prochain axe' },
        { value: 'solide', label: 'Je vois clairement ce qui a change' },
      ],
    },
    rhythmTip: 'Gardez un temps de recul avant de refaire une video.',
    shortChallenge: 'Choisissez une occasion reelle pour reutiliser la methode.',
  },
];

const BONUS_ITEMS = [
  {
    id: 'respiration-express',
    title: 'Respiration express avant de parler',
    duration: '5 a 8 minutes',
    objective: 'Faire redescendre la pression juste avant une prise de parole courte.',
    simpleTip: 'Allongez legerement l expiration: inspirez naturellement, puis soufflez plus lentement que vous n inspirez.',
    shortExercise: 'Pendant trois cycles, inspirez sur 3 temps, expirez sur 5 temps, puis dites votre premiere phrase a voix basse.',
    action: 'Avant votre prochain oral, faites ces trois cycles puis relisez seulement votre message central.',
    reminder: 'L objectif n est pas de supprimer le trac, mais de retrouver assez de calme pour commencer.',
  },
  {
    id: 'voix-claire',
    title: 'Voix claire sans forcer',
    duration: '8 a 10 minutes',
    objective: 'Rendre la voix plus audible sans crier ni chercher une voix parfaite.',
    simpleTip: 'Parlez vers une personne imaginaire placee au fond de la salle, avec une phrase courte et bien articulee.',
    shortExercise: 'Choisissez trois phrases de votre introduction. Dites-les une fois trop bas, une fois trop fort, puis une fois au niveau confortable.',
    action: 'Gardez le niveau confortable et marquez une pause apres chaque phrase importante.',
    reminder: 'Une voix claire vient surtout d une intention claire et d un debit calme.',
  },
  {
    id: 'posture-stable',
    title: 'Posture simple et stable',
    duration: '5 a 10 minutes',
    objective: 'Trouver une position de depart rassurante avant de parler.',
    simpleTip: 'Posez les deux pieds au sol, relachez les epaules et gardez les mains disponibles au lieu de les bloquer.',
    shortExercise: 'Testez trois positions debout. Gardez celle ou vous respirez le plus facilement et dites votre message central.',
    action: 'Au debut de votre prochain oral, installez cette posture avant de prononcer la premiere phrase.',
    reminder: 'La posture sert a vous stabiliser, pas a fabriquer une image parfaite.',
  },
  {
    id: 'gerer-un-blanc',
    title: 'Gerer un blanc',
    duration: '5 a 12 minutes',
    objective: 'Transformer un trou ou une hesitation en pause gerable.',
    simpleTip: 'Quand un blanc arrive, respirez, regardez votre fiche, puis repartez avec la derniere idee claire.',
    shortExercise: 'Entrainez-vous a dire volontairement une phrase, a faire deux secondes de silence, puis a reprendre avec "je reprends" ou "l idee importante est".',
    action: 'Ajoutez sur votre fiche une phrase de reprise courte que vous acceptez d utiliser.',
    reminder: 'Un blanc court parait souvent plus long pour celui qui parle que pour le public.',
  },
  {
    id: 'mots-parasites',
    title: 'Reduire les mots parasites',
    duration: '10 a 15 minutes',
    objective: 'Remplacer quelques mots parasites par des pauses utiles.',
    simpleTip: 'Ne cherchez pas a tout enlever. Reperez un seul mot parasite frequent et remplacez-le par une respiration.',
    shortExercise: 'Enregistrez une minute de parole. Notez le mot parasite le plus present, puis refaites la minute en acceptant deux pauses silencieuses.',
    action: 'Choisissez un mot a surveiller pendant votre prochaine repetition, pas plus.',
    reminder: 'Le but n est pas une parole lisse, mais une parole plus claire.',
  },
  {
    id: 'supports-visuels-simples',
    title: 'Supports visuels simples',
    duration: '10 a 15 minutes',
    objective: 'Utiliser un support comme appui, sans le transformer en texte a lire.',
    simpleTip: 'Une diapositive doit aider le public a suivre une idee, pas remplacer votre parole.',
    shortExercise: 'Prenez une diapositive existante et reduisez-la a un titre, une idee forte et un exemple ou visuel.',
    action: 'Pour votre prochain support, gardez une seule idee principale par diapositive.',
    reminder: 'Un support simple sert votre message central; il ne doit pas devenir le parcours lui-meme.',
  },
];

module.exports = {
  BONUS_ITEMS,
  CORE_MODULES,
};
