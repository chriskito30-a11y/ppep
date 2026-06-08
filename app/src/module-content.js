const CORE_MODULES = [
  {
    id: 'module-0',
    title: 'Vidéo de départ et auto-évaluation initiale',
    actionLabel: 'Réaliser ma vidéo de départ',
    objective: 'Créer un point de départ observable et bienveillant avant de travailler les techniques.',
    methodOutcome: 'J’ai ma vidéo de départ et une observation simple: ce qui est clair, ce qui est confus, ce que je veux améliorer.',
    sourceMaterials: [
      'GERER LE TRAC.pptx',
      '1 Préparez votre prise de parole.pdf',
      'Exercice numéro 50 - Repetition generale.pdf',
      'PRISE DE PAROLE EN PUBLIC POSER LES BASES.pptx',
    ],
    lesson: [
      'La première vidéo n’est pas une performance: elle sert à garder une trace de votre point de départ.',
      'Je ne cherche pas à tout corriger. Je cherche un point de départ simple et observable.',
      'Un format court de 3 à 5 minutes suffit pour observer ce qui se passe quand vous prenez la parole.',
      'Le trac peut se manifester dans le corps, les pensées et les comportements; l’objectif est de le regarder sans dramatiser.',
      'La préparation commence par trois repères simples: à qui je parle, ce que je veux transmettre, comment je veux le faire passer.',
      'Votre attention doit aller vers la tâche et le message, pas uniquement vers les signes de trac.',
      'La vidéo sera utile plus tard si vous notez maintenant des critères concrets: clarté, structure, regard, voix, posture, rythme.',
      'Une observation juste combine toujours une force déjà présente et un axe de travail prioritaire.',
    ],
    keyIdeas: [
      {
        title: 'Point de départ, pas jugement',
        body: 'Vous filmez une situation de référence pour pouvoir comparer ensuite. La question n’est pas "suis-je bon ?", mais "qu’est-ce que j’observe ?".',
      },
      {
        title: 'Trac observable',
        body: 'Notez les manifestations visibles ou ressenties: respiration, mains, voix, débit, trous, auto-surveillance, envie d’aller trop vite.',
      },
      {
        title: 'Regarder la tâche',
        body: 'Quand le trac monte, revenez au prochain message à transmettre. Cette bascule est déjà un entraînement.',
      },
    ],
    exercise: {
      title: 'Filmer une présentation de 3 à 5 minutes',
      duration: '25 à 35 minutes',
      materials: ['téléphone ou webcam', 'feuille de notes', 'chronomètre'],
      steps: [
        'Choisissez un sujet simple et réel: projet, idée, retour d’expérience, présentation professionnelle.',
        'Préparez trois repères seulement: départ, message principal, fin.',
        'Installez un plan fixe, avec assez de lumière et un cadrage qui montre le haut du corps.',
        'Parlez 3 à 5 minutes sans recommencer à chaque hesitation.',
        'Regardez la vidéo une seule fois, puis arrêtez-vous pour noter les observations.',
        'Rélèvez une force, un point à travailler et une action concrète pour le module suivant.',
      ],
    },
    observableCriteria: [
      'Ce qui est clair dans ma prise de parole.',
      'Ce qui reste confus ou trop long.',
      'Le point prioritaire que je veux améliorer au prochain essai.',
    ],
    worksheet: {
      title: 'Fiche de départ papier',
      description: 'Support pour noter le contexte, le ressenti, les forces et les axes de travail observés dans la première vidéo.',
      source: 'Consigne vidéo de départ, GERER LE TRAC et Exercice numéro 50.',
      sections: [
        {
          title: 'Contexte de la vidéo',
          prompts: ['Sujet choisi', 'Public imaginé', 'Durée réalisée', 'Message que je voulais faire passer'],
        },
        {
          title: 'Observation bienveillante',
          prompts: ['Une chose qui fonctionne déjà', 'Un moment qui reste confus', 'Ce que je veux rendre plus clair au prochain essai'],
        },
        {
          title: 'Point de départ',
          prompts: ['Mon niveau de trac avant de parler', 'Le signe de trac le plus visible', 'Mon point d’appui pour continuer le parcours'],
        },
      ],
    },
    selfAssessment: {
      prompt: 'Après l’exercice, comment vous situez-vous ?',
      options: [
        { value: 'a-revoir', label: 'J’ai besoin de refaire calmement' },
        { value: 'pret', label: 'J’ai fait l’exercice et je peux avancer' },
        { value: 'solide', label: 'Je me sens déjà plus clair' },
      ],
    },
    rhythmTip: 'Laissez passer au moins une nuit avant le module suivant si possible.',
    shortChallenge: 'Avant le prochain module, observez une situation ou vous prenez la parole naturellement.',
  },
  {
    id: 'module-1',
    title: 'Me comprendre',
    actionLabel: 'Identifier mon cadre de référence',
    objective: 'Observer simplement mon rapport à l’oral pour choisir une phrase d’appui et une action concrète.',
    methodOutcome: 'J’ai repère mes phrases réflexes et choisi une phrase d’appui pour avancer sans me juger.',
    sourceMaterials: [
      'CADRE DE REFERENCE.pptx',
      'Exercice numéro 1 - Evaluez vos besoins.pdf',
      '1 Préparez votre prise de parole.pdf',
    ],
    lesson: [
      'Ce module ne cherche pas a dresser un profil psychologique. Il sert seulement a observer votre point de départ a l’oral.',
      'Avant de parler, chacun à des phrases réflexes: "je vais oublier", "je dois être parfait", "je n’ai pas le droit d hesiter".',
      'Ces phrases réflexes influencent la préparation, le trac et la façon de commencer.',
      'Le travail autonome consiste a les noter simplement, sans chercher une cause profonde.',
      'Une phrase d’appui remplace la pression par une consigne utile: "je clarifie mon message" ou "je parle une idée après l autre".',
      'Vous n’avez pas besoin de tout comprendre de vous-meme pour avancer. Vous avez besoin d’un repère concret à tester.',
      'Le résultat attendu est une petite boussole personnelle pour préparer une prise de parole simple.',
    ],
    keyIdeas: [
      {
        title: 'Phrase reflexe',
        body: 'C’est ce qui vient automatiquement avant ou pendant l’oral. On la note pour la voir, pas pour se juger.',
      },
      {
        title: 'Phrase d’appui',
        body: 'C’est une consigne courte, réaliste et actionnable qui aide a revenir a la méthode.',
      },
      {
        title: 'Observation simple',
        body: 'Dans l autonome, on observe ce que l on se dit, ce que l on ressent et ce que l on fait. Le diagnostic approfondi appartient a l accompagnement.',
      },
    ],
    exercise: {
      title: 'Observer mes phrases réflexes a l’oral',
      duration: '30 minutes',
      materials: ['fiche papier', 'souvenir d’une prise de parole réelle'],
      steps: [
        'Choisissez une prise de parole recente, meme courte.',
        'Notez ce que vous avez pense avant, pendant et après.',
        'Soulignez les phrases qui vous mettent de la pression.',
        'Choisissez une seule phrase reflexe a transformer.',
        'Transformez-la en consigne de travail réaliste.',
        'Choisissez une situation simple pour tester cette phrase d’appui dans la semaine.',
      ],
    },
    observableCriteria: [
      'Je sais nommer une phrase reflexe sans me juger.',
      'J’ai transforme une phrase de pression en phrase d’appui.',
      'J’ai choisi une action concrète à tester.',
    ],
    worksheet: {
      title: 'Fiche cadre de référence',
      description: 'Support pour observer simplement ses phrases réflexes et choisir une phrase d’appui.',
      source: 'CADRE DE REFERENCE et exercices de préparation PPEP.',
      sections: [
        {
          title: 'Mes experiences',
          prompts: ['Une prise de parole réussie', 'Une prise de parole difficile', 'Ce que ces experiences declenchent chez moi aujourd’hui'],
        },
        {
          title: 'Mes réactions',
          prompts: ['Ce que je me dis avant de parler', 'Ce que mon corps fait', 'Ce que je fais pour me protèger'],
        },
        {
          title: 'Phrase d’appui',
          prompts: ['Phrase reflexe repèree', 'Phrase d’appui plus juste', 'Premier comportement à tester'],
        },
      ],
    },
    selfAssessment: {
      prompt: 'Qu’avez-vous identifié pendant l’exercice ?',
      options: [
        { value: 'a-revoir', label: 'Je dois encore clarifier mes réactions' },
        { value: 'pret', label: 'J’ai choisi une phrase d’appui utile' },
        { value: 'solide', label: 'Je vois déjà comment ajuster ma préparation' },
      ],
    },
    rhythmTip: 'Prenez 10 minutes dans la semaine pour observer une prise de parole réelle.',
    shortChallenge: 'Reperez une phrase limitante et transformez-la en phrase d’appui.',
  },
  {
    id: 'module-2',
    title: 'Apprivoiser mon trac',
    actionLabel: 'Observer mes réactions face au trac',
    objective: 'Identifier les manifestations du trac et choisir un levier simple pour revenir au message.',
    methodOutcome: 'J’ai ma carte simple du trac et un levier court à utiliser avant de parler.',
    sourceMaterials: [
      'GERER LE TRAC.pptx',
      'Savoir gerer la pression’au travail.pdf',
      'Exercice numéro 45 - Aiguisez vos sens.pdf',
      'Exercice numéro 47a - Choisissez et polissez votre moment.pdf',
    ],
    lesson: [
      'Le trac est une reaction ponctuelle liée à un enjeu et au regard réel ou imaginé des autrès.',
      'Il peut être physique: respiration courte, coeur rapide, gorge sèche, mains moites, tension dans les épaules.',
      'Il peut être cognitif: peur de bafouiller, d être juge, d oublier, de rougir, de ne pas être intéressant.',
      'Le but n’est pas de supprimer toute anxiété: un peu d activation peut devenir une énergie utile.',
      'Le cercle vicieux commence quand toute l’attention part vers les symptômes au lieu de rester sur le contenu.',
      'Les leviers simples sont la respiration, le relâchement, la préparation, la répétition et le retour au message.',
      'Si le trac est très fort ou récurrent, le parcours autonome ne remplace pas un accompagnement adapté. Ici, vous choisissez seulement un premier levier simple.',
    ],
    keyIdeas: [
      {
        title: 'Nommer pour reprendre la main',
        body: 'Dire "je ressens du trac" aide a sortir de "je suis nul". Vous observez un phénomène, vous ne définissez pas votre valeur.',
      },
      {
        title: 'Choisir une action possible',
        body: 'Une crainte devient plus gérable quand elle est formulée simplement et reliée à une action possible.',
      },
      {
        title: 'Revenir au contenu',
        body: 'Quand l auto-surveillance arrive, revenez au prochain point à transmettre, à votre plan ou à une respiration lente.',
      },
    ],
    exercise: {
      title: 'Construire ma carte du trac et mon levier de régulation',
      duration: '30 a 40 minutes',
      materials: ['fiche papier', 'chronomètre', 'endroit calme'],
      steps: [
        'Listez les signes physiques que vous connaissez chez vous.',
        'Listez les pensées ou prédictions négatives qui apparaissent.',
        'Choisissez une seule crainte prioritaire et notez ce que vous ferez si elle arrive.',
        'Testez un levier simple pendant deux minutes: respirer, ralentir, poser les pieds ou relâcher les épaules.',
        'Associez ce levier à une phrase courte: "je reviens à mon message".',
        'Notez quand vous le pratiquerez avant la prochaine prise de parole.',
      ],
    },
    observableCriteria: [
      'Je sais reconnaitre mes trois premiers signes de trac.',
      'Je distingue une sensation physique d’une prédiction négative.',
      'J’ai choisi un levier court que je peux refaire sans matériel.',
    ],
    worksheet: {
      title: 'Fiche trac et régulation',
      description: 'Support pour identifiér les signaux du trac, questionner les craintes et choisir un levier court.',
      source: 'GERER LE TRAC, Savoir gerer la pression et exercices de relaxation.',
      sections: [
        {
          title: 'Mes signaux',
          prompts: ['Signaux physiques', 'Pensees ou craintes', 'Comportements de protection'],
        },
        {
          title: 'Ma crainte prioritaire',
          prompts: ['Ce que je crains', 'Ce qui peut vraiment arriver', 'Ce que je peux faire si cela arrive', 'Ce que je garde sous contrôle'],
        },
        {
          title: 'Mon levier',
          prompts: ['Respiration, relâchement ou ancrage choisi', 'Phrase de retour au message', 'Moment de pratique'],
        },
      ],
    },
    selfAssessment: {
      prompt: 'Quel est votre point d’appui après l’exercice ?',
      options: [
        { value: 'a-revoir', label: 'Je veux refaire l’observation' },
        { value: 'pret', label: 'J’ai choisi un levier simple' },
        { value: 'solide', label: 'Je peux utiliser ce levier avant une prise de parole' },
      ],
    },
    rhythmTip: 'Testez le levier choisi deux fois avant d’enchaîner.',
    shortChallenge: 'Pratiquez deux minutes de respiration avant une conversation ordinaire.',
  },
  {
    id: 'module-3',
    title: 'Définir mon objectif SMART',
    actionLabel: 'Clarifier mon objectif',
    objective: 'Transformer une intention vague en objectif de prise de parole concret, observable et motivant.',
    methodOutcome: 'J’ai une phrase d’objectif utilisable pour guider toute ma préparation.',
    sourceMaterials: [
      'Exercice numéro 2 - Définissez votre objectif.pdf',
      'GERER LE TRAC.pptx',
      'Exercice numéro 46 - Formulez votre objectif de façon tripale.pdf',
      '1 Préparez votre prise de parole.pdf',
    ],
    lesson: [
      'Un objectif n’est pas seulement le sujet de votre intervention: c’est le changement recherche chez votre public.',
      'Un objectif utile s’exprime avec un verbe d’action et un résultat identifiable.',
      'SMART aide a vérifier que l’objectif est spécifique, mesurable, attractif, réaliste et daté.',
      'Un objectif trop vague augmente souvent le trac parce que vous ne savez pas quoi réussir exactement.',
      'Un objectif réaliste n’est pas un objectif petit: c’est un objectif que vous pouvez préparer et observer.',
      'La formulation "à l’issue de mon intervention..." force a penser au public et au résultat, pas seulement a soi.',
      'Une fois l’objectif formulé, il devient le filtre pour choisir les idées, exemples, supports et exercices de répétition.',
    ],
    keyIdeas: [
      {
        title: 'Sujet versus objectif',
        body: 'Sujet: "je parle de mon projet". Objectif: "à l’issue de mon intervention, l équipe aura compris les trois décisions a prendre".',
      },
      {
        title: 'Mesurable sans devenir scolaire',
        body: 'Mesurable veut dire observable: décision prise, question clarifiee, action engagee, message reformulé par le public.',
      },
      {
        title: 'Objectif et trac',
        body: 'Quand l’objectif est clair, vous pouvez vous concentrer sur une mission. Cela remplace une partie de la pression vague par une direction précise.',
      },
    ],
    exercise: {
      title: 'Formuler et tester mon objectif SMART',
      duration: '30 minutes',
      materials: ['fiche papier', 'sujet de prise de parole réel'],
      steps: [
        'Ecrivez votre objectif de départ en une phrase simple.',
        'Reformuléz-le avec "à l’issue de mon intervention...".',
        'Vérifiez qu’il ne contient qu’une action principale.',
        'Ajoutez un signe observable de réussite.',
        'Vérifiez qu’il est motivant et réaliste dans le contexte.',
        'Choisissez une première décision de préparation qui découle de cet objectif.',
      ],
    },
    observableCriteria: [
      'Mon objectif parle d’un résultat chez le public.',
      'Je sais dire à quoi je verrai que l intervention a servi.',
      'Je peux retirer une idée qui ne sert pas cet objectif.',
    ],
    worksheet: {
      title: 'Fiche objectif SMART',
      description: 'Support pour cadrer une intervention concrète et transformer une intention en objectif de préparation.',
      source: 'Exercice numéro 2, GERER LE TRAC et Exercice numéro 46.',
      sections: [
        {
          title: 'Objectif de départ',
          prompts: ['Sujet de mon intervention', 'Ce que je veux obtenir ou faire changer', 'Public concerné'],
        },
        {
          title: 'Controle SMART',
          prompts: ['Spécifique: une seule action claire', 'Mesurable: signe observable', 'Attractif: pourquoi cela compte', 'Réaliste: ce qui le rend atteignable', 'Date: moment du résultat'],
        },
        {
          title: 'Formulation finale',
          prompts: ['À l’issue de mon intervention...', 'Idée à garder absolument', 'Idée à retirer car elle ne sert pas l’objectif'],
        },
      ],
    },
    selfAssessment: {
      prompt: 'Votre objectif est-il utilisable pour préparer ?',
      options: [
        { value: 'a-revoir', label: 'Je dois encore le préciser' },
        { value: 'pret', label: 'Il est assez clair pour avancer' },
        { value: 'solide', label: 'Il oriente déjà mes choix de contenu' },
      ],
    },
    rhythmTip: 'Gardez l’objectif visible pendant la préparation du module suivant.',
    shortChallenge: 'Expliquez votre objectif à voix haute en moins de 20 secondes.',
  },
  {
    id: 'module-4',
    title: 'Cadrer ma prise de parole',
    actionLabel: 'Preciser comprendre, retenir, ressentir',
    objective: 'Adapter le contenu au public avec trois repères simples: comprendre, retenir et ressentir.',
    methodOutcome: 'J’ai mes trois repères public: ce qu’il doit comprendre, retenir et ressentir.',
    sourceMaterials: [
      'Exercice numéro 3b - Parlez a tous.pdf',
      'PPEP.pptx',
      'PRISE DE PAROLE EN PUBLIC POSER LES BASES.pptx',
      
    ],
    lesson: [
      'Une intervention efficace ne se contente pas de transmettre des informations: elle tient compte de ce que le public doit saisir, mémoriser et ressentir.',
      'Comprendre concerné les explications: contexte, demarche, processus, lien logique.',
      'Retenir concerné les idées-forces: ce que le public doit garder meme s’il oublie les details.',
      'Ressentir concerné l énergie produite: confiance, motivation, curiosite, envie d agir, adhesion.',
      'Le public n’est pas uniforme: certains attendent des idées nettes, d autrès des explications, d autrès une implication émotionnelle.',
      'Si vous devez convaincre, gardez la question simple: en quoi cette information’aide-t-elle vraiment mon public ?',
      'Ce cadrage sert de filtre: une information qui ne fait ni comprendre, ni retenir, ni ressentir peut souvent être retiree.',
    ],
    keyIdeas: [
      {
        title: 'Comprendre',
        body: 'Donnez au public les informations qui lui permettent de suivre: définitions, contexte, preuves, étapes.',
      },
      {
        title: 'Retenir',
        body: 'Choisissez peu d idées-forces. En situation de strèss ou de surcharge, le public gardera surtout l essentiel.',
      },
      {
        title: 'Ressentir',
        body: 'L’oral passe aussi par l énergie, le ton, les images, les exemples et le lien’au public.',
      },
      {
        title: 'Filtre simple',
        body: 'Avant d’ajouter une information, demandez-vous si elle aide le public a comprendre, retenir ou ressentir quelque chose d utile.',
      },
    ],
    exercise: {
      title: 'Construire mon cadrage public',
      duration: '35 minutes',
      materials: ['objectif SMART', 'fiche papier', 'une personne test si possible'],
      steps: [
        'Ecrivez en une ligne qui est votre public et ce qu’il attend probablement.',
        'Notez ce qu’il doit comprendre pour suivre votre propos.',
        'Choisissez l idée-force à retenir en priorite.',
        'Nommez ce que vous voulez faire ressentir: securite, envie, urgence, confiance, fierte.',
        'Si vous devez convaincre, notez simplement en quoi une information’aide votre public.',
        'Testez le cadrage en demandant a quelqu un ce qu’il retient, comprend et ressent.',
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
      source: 'Exercice numéro 3b et supports PPEP.',
      sections: [
        {
          title: 'Public',
          prompts: ['Qui écoute ?', 'Ce qu’il sait déjà', 'Ce dont il a besoin', 'Ce qui peut le freiner'],
        },
        {
          title: 'Comprendre / retenir / ressentir',
          prompts: ['Ce que le public doit comprendre', 'Idée-force à retenir', 'Emotion ou impulsion recherchee'],
        },
        {
          title: 'Information utile',
          prompts: ['Information ou fait', 'Pourquoi c’est utile pour le public', 'Ce que je peux retirer si ce n’est pas utile'],
        },
      ],
    },
    selfAssessment: {
      prompt: 'Votre cadrage aide-t-il a choisir quoi dire ?',
      options: [
        { value: 'a-revoir', label: 'Je dois encore choisir l essentiel' },
        { value: 'pret', label: 'J’ai mes trois repères' },
        { value: 'solide', label: 'Je peux retirer ce qui ne sert pas le cadrage' },
      ],
    },
    rhythmTip: 'Relisez ce cadrage avant de structurer votre intervention.',
    shortChallenge: 'Resumez comprendre, retenir, ressentir à une personne de confiance.',
  },
  {
    id: 'module-5',
    title: 'Structurer mon intervention avec le fil rouge',
    actionLabel: 'Organiser mes idées',
    objective: 'Transformer des idées eparses en progression claire, fluide et facile a suivre.',
    methodOutcome: 'J’ai un message central, trois parties maximum et des transitions simples.',
    sourceMaterials: [
      'Exercice numéro 4 - Structurez votre intervention le fil rouge.pdf',
      'organiser ses idées.pptx',
      'Exercice numéro 6 - Et si vous ne pouviez dire que trois choses.pdf',
      '1 Préparez votre prise de parole.pdf',
    ],
    lesson: [
      'Structurer, c’est construire l epine dorsale de l intervention: le public doit sentir ou vous l emmenez.',
      'Avant de classer, il faut vider les idées: messages, exemples, anecdotes, arguments, objections, preuves.',
      'Le fil rouge relie les parties entre elles; il evite l empilement de bonnes idées sans progression.',
      'L’oral supporte mal la surcharge: si vous deviez ne dire que trois choses, lesquelles resteraient ?',
      'Les supports ne remplacent pas la structure; ils doivent servir le message et le public.',
      'Une transition fragile est souvent le signe que deux idées ne sont pas dans le bon ordre.',
      'La structure doit pouvoir se dire à voix haute en quelques phrases avant d’être developpee.',
    ],
    keyIdeas: [
      {
        title: 'Inventaire large',
        body: 'Notez d’abord tout ce qui pourrait servir: idées, exemples, chiffres, anecdotes, objections. Le tri vient après.',
      },
      {
        title: 'Trois points essentiels',
        body: 'En contexte de strèss, le public retient peu. La contrainte des trois messages oblige a choisir.',
      },
      {
        title: 'Transitions',
        body: 'Une transition explique pourquoi on passe d’une partie a l autre. Elle donne au public le sentiment d’une progression logique.',
      },
    ],
    exercise: {
      title: 'Construire mon fil rouge avec tri et transitions',
      duration: '45 minutes',
      materials: ['post-it ou morceaux de papier', 'mur ou table', 'objectif SMART', 'fiche cadrage public'],
      steps: [
        'Ecrivez une idée, preuve, exemple ou anecdote par papier.',
        'Regroupez les papiers par familles: message, preuve, exemple, objection, support.',
        'Choisissez trois messages maximum qui servent directement l’objectif.',
        'Organisez-les dans l ordre le plus naturel pour le public.',
        'Ajoutez une transition simple entre chaque partie.',
        'Dites le plan’à voix haute sans lire et deplacez les elements si vous bloquez.',
      ],
    },
    observableCriteria: [
      'Je peux annoncer mon plan en trois phrases.',
      'Chaque partie sert l’objectif SMART.',
      'Je sais quelle idée retirer si le temps diminue.',
      'Mes transitions expliquent le chemin, pas seulement le changement de slide.',
    ],
    worksheet: {
      title: 'Fiche fil rouge',
      description: 'Support pour trier les idées, garder l essentiel et tester la fluidite de la structure.',
      source: 'Exercice numéro 4, organiser ses idées et Exercice numéro 6.',
      sections: [
        {
          title: 'Inventaire des idées',
          prompts: ['Idées principales', 'Exemples ou anecdotes', 'Arguments ou preuves', 'Elements à retirer'],
        },
        {
          title: 'Mes trois messages',
          prompts: ['Message 1', 'Message 2', 'Message 3', 'Pourquoi cet ordre ?'],
        },
        {
          title: 'Transitions et test oral',
          prompts: ['Transition 1 vers 2', 'Transition 2 vers 3', 'Endroit ou je bloque', 'Reorganisation’à tester'],
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
    rhythmTip: 'Testez le fil rouge à voix haute avant de passer aux ouvertures.',
    shortChallenge: 'Dites votre plan en trois phrases maximum.',
  },
  {
    id: 'module-6',
    title: "Preparer l'introduction",
    actionLabel: 'Construire mon demarrage',
    objective: 'Preparer les premiers mots pour ouvrir l’attention, poser le sujet et annoncer le chemin.',
    methodOutcome: 'J’ai une introduction courte en quatre repères: lien, sujet, utilite, chemin.',
    sourceMaterials: [
      'Exercice numéro 5a - Soignez l introduction.pdf',
      'PPEP.pptx',
      'PRISE DE PAROLE EN PUBLIC POSER LES BASES.pptx',
      '1 Préparez votre prise de parole.pdf',
    ],
    lesson: [
      'Les premiers mots orientent l écoute: ils peuvent ouvrir l’attention ou laisser le public a distance.',
      'Une introduction n’est pas un long preambule; elle cree le lien, pose le sujet et donne envie d écouter.',
      'Dire bonjour, remercier et nommer simplement le contexte installe une presence humaine.',
      'Se présenter brievement sert la legitimite, surtout si le public ne vous connait pas.',
      'Une question declencheuse implique le public et transforme une entree froide en invitation.',
      'L accroche peut surprendre, amuser, questionner ou faire image, tant qu’elle reste utile au sujet.',
      'Preparer les premiers mots diminue les hesitations de départ et aide a traverser le pic de trac.',
    ],
    keyIdeas: [
      {
        title: 'Lien',
        body: 'Le public écoute mieux quand il comprend qui parle, pourquoi maintenant et en quoi cela le concerné.',
      },
      {
        title: 'Accroche',
        body: 'Une bonne accroche n’est pas decorative. Elle met le public dans le sujet et ouvre une question.',
      },
      {
        title: 'Annonce courte',
        body: 'Le debut doit donner assez de cadre pour rassurer, sans raconter tout le contenu.',
      },
    ],
    exercise: {
      title: 'Ecrire et tester mon introduction',
      duration: '30 minutes',
      materials: ['objectif SMART', 'fil rouge', 'chronomètre'],
      steps: [
        'Ecrivez une version brute de vos trente premières secondes.',
        'Ajoutez bonjour, remerciement ou contexte si c’est adapté.',
        'Redigez une présentation de legitimite en une phrase.',
        'Trouvez une question declencheuse ou une accroche.',
        'Annoncez le sujet et le chemin sans detailler tout le plan.',
        'Dites l introduction’à voix haute trois fois et retirez ce qui sonne lourd.',
      ],
    },
    observableCriteria: [
      'Le public sait rapidement pourquoi il écoute.',
      'L accroche ouvre le sujet au lieu de distraire.',
      'L introduction tient en moins d’une minute.',
    ],
    worksheet: {
      title: 'Fiche introduction',
      description: 'Support pour préparer les premiers mots et vérifier leur impact.',
      source: 'Exercice numéro 5a et supports de préparation PPEP.',
      sections: [
        {
          title: 'Installer le lien',
          prompts: ['Bonjour / remerciement / contexte', 'Phrase de présentation ou legitimite', 'Ce que je ressens et peux dire sobrement'],
        },
        {
          title: 'Accroche',
          prompts: ['Question declencheuse', 'Image, fait ou anecdote possible', 'Pourquoi cette accroche sert mon sujet'],
        },
        {
          title: 'Annonce',
          prompts: ['Sujet en une phrase', 'Promesse ou utilite pour le public', 'Plan’annonce en quelques mots'],
        },
      ],
    },
    selfAssessment: {
      prompt: 'Votre introduction ouvre-t-elle clairement le sujet ?',
      options: [
        { value: 'a-revoir', label: 'Je dois encore simplifier' },
        { value: 'pret', label: 'Je peux demarrer clairement' },
        { value: 'solide', label: 'Je me sens pret a capter l’attention' },
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
    methodOutcome: 'J’ai une conclusion simple: rappel essentiel, message final, prochaine étape.',
    sourceMaterials: [
      'Exercice numéro 5b - Soignez la conclusion.pdf',
      'PPEP.pptx',
      '1 Préparez votre prise de parole.pdf',
    ],
    lesson: [
      'La conclusion’est l echo final: elle influence ce que le public garde en memoire.',
      'Elle doit synthetiser les messages essentiels, pas rouvrir toutes les explications.',
      'Elle peut ouvrir sur l avenir, une décision, une question plus large ou une prochaine action.',
      'Remercier et annoncer la suite permet de fermer proprement tout en maintenant le lien.',
      'C’est aussi le moment de refaire passer l émotion principale: motivation, confiance, enthousiasme, adhesion.',
      'Une image ou une phrase forte peut aider, si elle reste sincere et reliée au sujet.',
      'Une conclusion préparee evite les fins brusques, les "voila" faibles et les derniers mots improvises sous pression.',
    ],
    keyIdeas: [
      {
        title: 'Synthese',
        body: 'Reprenez l essentiel en peu de mots: ce que le public doit garder quand là salle se vide.',
      },
      {
        title: 'Ouverture',
        body: 'Une ouverture donne une suite: action, rendez-vous, question, décision, application concrète.',
      },
      {
        title: 'Derniere émotion',
        body: 'La fin’est un moment d impact. Choisissez l émotion’a laisser et adaptéz vos mots, votre voix et votre silence.',
      },
    ],
    exercise: {
      title: 'Ecrire ma sortie et là tester',
      duration: '25 à 35 minutes',
      materials: ['fil rouge', 'objectif SMART', 'chronomètre'],
      steps: [
        'Relisez votre objectif et vos trois messages.',
        'Ecrivez une synthese en deux phrases maximum.',
        'Ajoutez une ouverture: action, décision, suite ou question.',
        'Redigez un remerciement simple et une phrase de suite ou d ouverture.',
        'Dites la conclusion’à voix haute en moins d’une minute.',
        'Vérifiez que la derniere phrase peut vraiment être votre dernier mot.',
      ],
    },
    observableCriteria: [
      'La conclusion rappelle l essentiel sans redire tout le plan.',
      'Elle donne une suite claire ou une ouverture utile.',
      'La derniere phrase est assumee et memorisable.',
    ],
    worksheet: {
      title: 'Fiche conclusion',
      description: 'Support pour préparer la fin, l ouverture et la derniere phrase.',
      source: 'Exercice numéro 5b et supports de préparation PPEP.',
      sections: [
        {
          title: 'Synthese finale',
          prompts: ['Message essentiel 1', 'Message essentiel 2', 'Phrase de synthese'],
        },
        {
          title: 'Ouverture',
          prompts: ['Action ou décision’attendue', 'Question plus large', 'Emotion’a laisser au public'],
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
        { value: 'pret', label: 'Ma conclusion’est utilisable' },
        { value: 'solide', label: 'Elle renforce l impact recherche' },
      ],
    },
    rhythmTip: 'Travaillez la conclusion’avant la fiche finale.',
    shortChallenge: 'Testez votre conclusion devant une personne ou un miroir.',
  },
  {
    id: 'module-8',
    title: 'Construire ma fiche finale de prise de parole',
    actionLabel: 'Rassembler ma préparation',
    objective: 'Rassembler tout le travail dans un support papier court qui aide a parler sans lire.',
    methodOutcome: 'J’ai ma fiche finale pour parler avec des mots cles sans lire un texte complet.',
    sourceMaterials: [
      'Exercice numéro 34 - Préparez vos fiches.pdf',
      'organiser ses idées.pptx',
      'SCRIPT avec intention.pdf',
      
    ],
    lesson: [
      'La fiche finale sert a soutenir la parole; elle ne doit jamais devenir un texte a lire.',
      'Une fiche efficace contient le plan, les mots cles, les transitions, les citations eventuelles et les signaux importants.',
      'Utiliser une fiche par grande sequence aide a ne pas se perdre.',
      'Les mots cles sont plus utiles que les phrases completes: ils relancent la pensee sans bloquer là voix.',
      'Ecrire gros, numéroter, utiliser la couleur et garder le recto seulement facilitent l usage en situation.',
      'La fiche doit reprendre l’objectif, le public, comprendre/retenir/ressentir, le fil rouge, l introduction et la conclusion.',
      'L entraînement consiste aussi a lever les yeux: la fiche est un appui, pas un refuge.',
    ],
    keyIdeas: [
      {
        title: 'Fiche bristol mentale',
        body: 'Que la fiche soit papier ou numerique, elle doit fonctionner comme un guide visuel très court.',
      },
      {
        title: 'Mots cles',
        body: 'Un mot cle declenche une idée. Une phrase complete vous pousse a lire.',
      },
      {
        title: 'Signaux de parole',
        body: 'Ajoutez des marques utiles: pause, regard, exemple, changement de rythme, question’au public.',
      },
    ],
    exercise: {
      title: 'Assembler ma fiche finale utilisable debout',
      duration: '45 minutes',
      materials: ['fiches papier ou feuille A4', 'surligneurs', 'travaux modules 3 a 7'],
      steps: [
        'Reprenez l’objectif SMART et le cadrage public.',
        'Inscrivez le fil rouge en trois grandes parties maximum.',
        'Ajoutez introduction et conclusion sous forme de repères; seules les premières et dernieres phrases peuvent être écrites completement.',
        'Ajoutez les mots cles, citations ou chiffres indispensables.',
        'Marquez les pauses, questions ou moments de regard.',
        'Testez la fiche debout: si vous lisez, reduisez encore jusqu’à garder surtout des mots cles.',
      ],
    },
    observableCriteria: [
      'La fiche tient sur une page ou quelques cartes numérotees.',
      'Elle contient surtout des mots cles.',
      'Je peux lever les yeux sans perdre le fil.',
    ],
    worksheet: {
      title: 'Fiche finale de prise de parole',
      description: 'Support final pour rassembler la préparation sans rediger le discours complet.',
      source: 'Exercice numéro 34, organiser ses idées et travaux des modules precedents.',
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
          prompts: ['Pause importante', 'Question’au public', 'Exemple ou anecdote', 'Citation ou chiffre', 'Mot qui me remet dans le fil'],
        },
      ],
    },
    selfAssessment: {
      prompt: 'Votre fiche aide-t-elle a parler sans lire ?',
      options: [
        { value: 'a-revoir', label: 'Elle est encore trop longue' },
        { value: 'pret', label: 'Elle me guide sans remplacer ma parole' },
        { value: 'solide', label: 'Je peux m’entraîner avec cette fiche' },
      ],
    },
    rhythmTip: 'Utilisez la fiche pour une répétition courte avant la vidéo finale.',
    shortChallenge: 'Reduisez votre fiche à une seule page.',
  },
  {
    id: 'module-9',
    title: 'Vidéo de progression et bilan final',
    actionLabel: 'Constater ma progression',
    objective: 'Refaire une prise de parole courte, comparer avec la vidéo de départ et choisir le prochain pas.',
    methodOutcome: 'J’ai compare mes deux vidéos, choisi mon’axe prioritaire et écrit mon plan d’action final.',
    sourceMaterials: [
      'Exercice numéro 50 - Repetition generale.pdf',
      'GERER LE TRAC.pptx',
      'PRISE DE PAROLE EN PUBLIC POSER LES BASES.pptx',
    ],
    lesson: [
      'La vidéo finale sert à mesurer un chemin parcouru, pas a chercher une perfection theatrale.',
      'La comparaison doit rester simple: clarté, structure et ressenti. Vous n’avez pas a vous corriger comme un formateur.',
      'La répétition generale permet de tester l intervention comme un tout: introduction, transitions, conclusion, temps.',
      'L auto-observation suffit pour ce parcours autonome: vous notez ce que vous voyez, puis vous choisissez un seul prochain pas.',
      'Un bon bilan identifié des progres visibles, des points encore instables et une prochaine pratique réaliste.',
      'Pour un retour personnalise sur votre vidéo, posture, voix ou regard, cela rélève du parcours accompagne.',
      'Terminér le parcours, c’est repartir avec une méthode reutilisable pour d autrès prises de parole.',
    ],
    keyIdeas: [
      {
        title: 'Comparer sans se demolir',
        body: 'Comparez des critères, pas votre personne. Cherchez ce qui est plus clair, plus pose, plus structure ou plus présent.',
      },
      {
        title: 'Auto-observation utile',
        body: 'Une auto-observation utile reste courte: ce que je vois, ce qui progresse, ce que je choisis de refaire autrement.',
      },
      {
        title: 'Suite de progression',
        body: 'Le dernier module ouvre le suivant dans la vraie vie: choisir une occasion réelle de reparler avec la méthode.',
      },
    ],
    exercise: {
      title: 'Comparer mes deux vidéos et choisir mon prochain pas',
      duration: '45 a 60 minutes',
      materials: ['téléphone ou webcam', 'fiche finale', 'vidéo de départ', 'grille de bilan'],
      steps: [
        'Préparez la meme durée que la vidéo de départ: 3 à 5 minutes.',
        'Utilisez votre fiche finale sans lire de phrases completes.',
        'Filmez en plan fixe, puis laissez passer quelques minutes avant de regarder.',
        'Comparez avec la vidéo de départ sur trois critères: clarté, structure, ressenti.',
        'Notez trois progres visibles et un axe prioritaire.',
        'Ecrivez votre plan d’action final: routine de préparation, prochain oral réel, axe prioritaire et ce que vous gardez de la méthode.',
      ],
    },
    observableCriteria: [
      'La prise de parole dure 3 à 5 minutes.',
      'Le message principal et la structure sont plus faciles a suivre.',
      'Je sais nommer trois progres visibles sans me juger.',
      'J’ai choisi un seul axe prioritaire pour la suite.',
    ],
    worksheet: {
      title: 'Grille de bilan final',
      description: 'Support pour comparer la vidéo de départ et la vidéo finale, puis repartir avec un plan d’action simple.',
      source: 'Exercice numéro 50 et supports de préparation PPEP.',
      sections: [
        {
          title: 'Comparaison',
          prompts: ['Ce qui a change depuis la vidéo de départ', 'Trois progres visibles', 'Un point encore fragile'],
        },
        {
          title: 'Criteres',
          prompts: ['Clarté du message', 'Structure', 'Ressenti pendant la prise de parole', 'Gestion du trac'],
        },
        {
          title: 'Plan d’action final',
          prompts: ['Mon prochain oral réel', 'Ma routine de préparation', 'Mon axe prioritaire', 'Ce que je garde de la méthode'],
        },
      ],
    },
    selfAssessment: {
      prompt: 'Que montre votre bilan final ?',
      options: [
        { value: 'a-revoir', label: 'Je dois refaire une comparaison plus calme' },
        { value: 'pret', label: 'J’ai identifié mes progres et mon prochain’axe' },
        { value: 'solide', label: 'Je vois clairement ce qui a change' },
      ],
    },
    rhythmTip: 'Gardez un temps de recul avant de refaire une vidéo.',
    shortChallenge: 'Choisissez une occasion réelle pour reutiliser la méthode.',
  },
];

const BONUS_ITEMS = [
  {
    id: 'respiration-express',
    title: 'Respiration express avant de parler',
    duration: '5 a 8 minutes',
    objective: 'Faire redescendre la pression juste avant une prise de parole courte.',
    simpleTip: 'Allongez legerement l expiration: inspirez naturellement, puis soufflez plus lentement que vous n inspirez.',
    shortExercise: 'Pendant trois cycles, inspirez sur 3 temps, expirez sur 5 temps, puis dites votre première phrase à voix basse.',
    action: 'Avant votre prochain oral, faites ces trois cycles puis relisez seulement votre message central.',
    reminder: 'L’objectif n’est pas de supprimer le trac, mais de retrouver assez de calme pour commencer.',
  },
  {
    id: 'voix-claire',
    title: 'Voix claire sans forcer',
    duration: '8 a 10 minutes',
    objective: 'Rendre là voix plus audible sans crier ni chercher une voix parfaite.',
    simpleTip: 'Parlez vers une personne imaginaire placee au fond de là salle, avec une phrase courte et bien’articulee.',
    shortExercise: 'Choisissez trois phrases de votre introduction. Dites-les une fois trop bas, une fois trop fort, puis une fois au niveau confortable.',
    action: 'Gardez le niveau confortable et marquez une pause après chaque phrase importante.',
    reminder: 'Une voix claire vient surtout d’une intention claire et d’un débit calme.',
  },
  {
    id: 'posture-stable',
    title: 'Posture simple et stable',
    duration: '5 a 10 minutes',
    objective: 'Trouver une position de départ rassurante avant de parler.',
    simpleTip: 'Posez les deux pieds au sol, relachez les épaules et gardez les mains disponibles au lieu de les bloquer.',
    shortExercise: 'Testez trois positions debout. Gardez celle ou vous respirez le plus facilement et dites votre message central.',
    action: 'Au debut de votre prochain oral, installez cette posture avant de prononcer la première phrase.',
    reminder: 'La posture sert a vous stabiliser, pas a fabriquer une image parfaite.',
  },
  {
    id: 'gerer-un-blanc',
    title: 'Gerer un blanc',
    duration: '5 a 12 minutes',
    objective: 'Transformer un trou ou une hesitation en pause gérable.',
    simpleTip: 'Quand’un blanc arrive, respirez, regardez votre fiche, puis repartez avec la derniere idée claire.',
    shortExercise: 'Entrainez-vous a dire volontairement une phrase, a faire deux secondes de silence, puis a reprendre avec "je reprends" ou "l idée importante est".',
    action: 'Ajoutez sur votre fiche une phrase de reprise courte que vous acceptez d utiliser.',
    reminder: 'Un blanc court parait souvent plus long pour celui qui parle que pour le public.',
  },
  {
    id: 'mots-parasites',
    title: 'Reduire les mots parasites',
    duration: '10 à 15 minutes',
    objective: 'Remplacer quelques mots parasites par des pauses utiles.',
    simpleTip: 'Ne cherchez pas à tout enlever. Reperez un seul mot parasite frequent et remplacez-le par une respiration.',
    shortExercise: 'Enregistrez une minute de parole. Notez le mot parasite le plus présent, puis refaites la minute en’acceptant deux pauses silencieuses.',
    action: 'Choisissez un mot a surveiller pendant votre prochaine répétition, pas plus.',
    reminder: 'Le but n’est pas une parole lisse, mais une parole plus claire.',
  },
  {
    id: 'supports-visuels-simples',
    title: 'Supports visuels simples',
    duration: '10 à 15 minutes',
    objective: 'Utiliser un support comme appui, sans le transformer en texte a lire.',
    simpleTip: 'Une diapositive doit aider le public a suivre une idée, pas remplacer votre parole.',
    shortExercise: 'Prenez une diapositive existante et reduisez-la à un titre, une idée forte et un exemple ou visuel.',
    action: 'Pour votre prochain support, gardez une seule idée principale par diapositive.',
    reminder: 'Un support simple sert votre message central; il ne doit pas devenir le parcours lui-meme.',
  },
];

module.exports = {
  BONUS_ITEMS,
  CORE_MODULES,
};
