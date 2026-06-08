const { DEFAULT_PRODUCT_CONFIG } = require('./config');
const { BONUS_ITEMS } = require('./modules');
const { escapeHtml } = require('./security');

function formatDate(value) {
  return new Intl.DateTimeFormat('fr-FR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(new Date(value));
}

function layout(title, body) {
  return `<!doctype html>
<html lang="fr">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(title)}</title>
  <link rel="stylesheet" href="/assets/styles.css">
</head>
<body>
  ${body}
</body>
</html>`;
}

function renderLogin({ email = '', message = '' } = {}, product = DEFAULT_PRODUCT_CONFIG) {
  return layout('Connexion apprenant', `
<main class="auth-shell">
  <section class="auth-panel" aria-labelledby="login-title">
    <p class="eyebrow">${escapeHtml(product.audienceLabel)}</p>
    <h1 id="login-title">Connexion apprenant</h1>
    <p class="intro">Retrouvez votre module courant et reprenez votre parcours la ou vous l'avez laisse.</p>
    ${message ? `<p class="message" role="alert">${escapeHtml(message)}</p>` : ''}
    <form class="login-form" method="post" action="/login">
      <label>
        Email
        <input name="email" type="email" autocomplete="email" value="${escapeHtml(email)}" required>
      </label>
      <label>
        Mot de passe
        <input name="password" type="password" autocomplete="current-password" required>
      </label>
      <button type="submit">Entrer dans mon parcours</button>
    </form>
  </section>
</main>`);
}

function renderDenied(message, product = DEFAULT_PRODUCT_CONFIG) {
  return layout('Acces indisponible', `
<main class="auth-shell">
  <section class="auth-panel" aria-labelledby="denied-title">
    <p class="eyebrow">${escapeHtml(product.name)} - acces apprenant</p>
    <h1 id="denied-title">Acces indisponible</h1>
    <p class="message" role="alert">${escapeHtml(message)}</p>
    <a class="button-link" href="/">Revenir a la connexion</a>
  </section>
</main>`);
}

function renderInlineList(items, className = '') {
  if (!Array.isArray(items) || items.length === 0) {
    return '';
  }

  return `<ul class="${className}">
    ${items.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}
  </ul>`;
}

function renderKeyIdeas(ideas) {
  if (!Array.isArray(ideas) || ideas.length === 0) {
    return '';
  }

  return `<article class="wide-card">
    <p class="section-label">Notions cles</p>
    <div class="idea-list">
      ${ideas.map((idea) => `
        <section class="idea-card">
          <h3>${escapeHtml(idea.title)}</h3>
          <p>${escapeHtml(idea.body)}</p>
        </section>
      `).join('')}
    </div>
  </article>`;
}

const FINAL_DELIVERABLES = [
  'Video de depart',
  'Objectif personnel',
  'Profil simple de prise de parole',
  'Routine anti-trac',
  'Fiche objectif',
  'Fiche public',
  'Message central',
  'Plan de prise de parole',
  'Introduction',
  'Conclusion',
  'Fiche finale',
  'Checklist de repetition',
  'Video finale',
  'Auto-evaluation finale',
  'Plan d action personnel',
];

function renderCompletionLinks() {
  return `<div class="completion-links">
    <a class="secondary-link" href="/modules/module-8/fiche">Ouvrir ma fiche finale</a>
    <a class="secondary-link" href="/modules/module-9/fiche">Ouvrir ma grille de bilan final</a>
    <a class="secondary-link" href="/dashboard#bonus-title">Voir les bonus debloques</a>
  </div>`;
}

function renderBonusList(bonusesUnlocked) {
  return `<div class="bonus-card-list">
    ${BONUS_ITEMS.map((bonus) => `
      <article class="bonus-card">
        <h3>${escapeHtml(bonus.title)}</h3>
        <p>${escapeHtml(bonus.objective)}</p>
        <p class="bonus-duration">Duree : ${escapeHtml(bonus.duration)}</p>
        ${bonusesUnlocked
          ? `<a class="secondary-link" href="/bonus/${escapeHtml(bonus.id)}">Ouvrir ce bonus</a>`
          : '<span class="locked-label">Debloque apres le parcours principal</span>'}
      </article>
    `).join('')}
  </div>`;
}

function renderCompletionBonusBlock(bonusesUnlocked) {
  return `<section class="completion-card" aria-labelledby="completion-bonus-title">
    <p class="section-label">Bonus courts</p>
    <h2 id="completion-bonus-title">Des pratiques rapides, pas de nouveaux modules</h2>
    <p>Ces bonus restent secondaires : ils donnent une astuce simple a tester en 5 a 15 minutes, sans analyse personnalisee ni progression lourde.</p>
    ${renderBonusList(bonusesUnlocked)}
  </section>`;
}

function isAccompaniedPlan(plan) {
  return ['accompagne', 'accompagnee'].includes(String(plan || '').toLowerCase());
}

function formatPlan(plan) {
  return isAccompaniedPlan(plan) ? 'accompagne' : 'autonome';
}

function renderAccompanimentDashboardBlock(snapshot, product = DEFAULT_PRODUCT_CONFIG) {
  if (!isAccompaniedPlan(snapshot.learner.plan)) {
    return '';
  }

  const state = snapshot.accompaniment || {};
  const appointmentLabel = state.appointmentReserved ? 'Rendez-vous reserve' : 'Rendez-vous a reserver';
  const videoLabel = state.videoShared ? 'Video partagee' : 'Video a partager';

  return `<section class="accompaniment-section" aria-labelledby="accompaniment-dashboard-title">
    <div class="section-heading">
      <p class="section-label">${escapeHtml(product.accompanied.label)}</p>
      <h2 id="accompaniment-dashboard-title">Mon accompagnement</h2>
    </div>
    <p><strong>Methode autonome + regard professionnel :</strong> ${escapeHtml(product.offerDistinctionMessage)}</p>
    <div class="accompaniment-status" aria-label="Etat accompagnement">
      <span>${escapeHtml(appointmentLabel)}</span>
      <span>${escapeHtml(videoLabel)}</span>
    </div>
    <a class="button-link" href="/accompagnement">Ouvrir mon accompagnement</a>
  </section>`;
}

function renderDashboard(snapshot, product = DEFAULT_PRODUCT_CONFIG) {
  const { learner, currentModule, modules, summary, bonusesUnlocked } = snapshot;
  const bonusState = bonusesUnlocked ? 'Disponible' : 'Verrouille';
  const isPathCompleted = summary.completedCount === summary.totalCount;

  return layout('Accueil apprenant', `
<header class="topbar">
  <div>
    <p class="eyebrow">${escapeHtml(product.methodName)}</p>
    <h1>Bonjour</h1>
  </div>
  <form method="post" action="/logout">
    <button class="secondary-button" type="submit">Deconnexion</button>
  </form>
</header>

<main class="dashboard">
  <section class="focus-panel" aria-labelledby="current-module-title">
    <div>
      <p class="section-label">${isPathCompleted ? 'Parcours termine' : 'A faire maintenant'}</p>
      <h2 id="current-module-title">${isPathCompleted ? 'Bravo, vous avez termine la methode autonome' : `Module ${currentModule.number} - ${escapeHtml(currentModule.title)}`}</h2>
      <p>${isPathCompleted ? 'Votre parcours principal est valide. Vous pouvez maintenant relire votre bilan final, reutiliser la methode pour un nouvel oral et acceder aux bonus.' : escapeHtml(currentModule.actionLabel)}</p>
    </div>
    <a class="button-link" href="${isPathCompleted ? '/fin-parcours' : `/modules/${escapeHtml(currentModule.id)}`}">${isPathCompleted ? 'Voir mon bilan final' : 'Continuer le module'}</a>
  </section>

  <section class="rhythm-panel" aria-labelledby="rhythm-title">
    <div>
      <p class="section-label">Rythme conseille</p>
      <h2 id="rhythm-title">Avancer sans tout consommer d'un coup</h2>
    </div>
    <p>${escapeHtml(currentModule.rhythmTip)}</p>
    <p class="challenge"><strong>Defi court :</strong> ${escapeHtml(currentModule.shortChallenge)}</p>
  </section>

  <section class="status-grid" aria-label="Synthese du parcours">
    <div class="status-item">
      <span class="status-value">${summary.completedCount}/${summary.totalCount}</span>
      <span class="status-label">modules termines</span>
    </div>
    <div class="status-item">
      <span class="status-value">${formatDate(learner.accessEndsAt)}</span>
      <span class="status-label">fin d'acces</span>
    </div>
    <div class="status-item">
      <span class="status-value">${escapeHtml(formatPlan(learner.plan))}</span>
      <span class="status-label">formule</span>
    </div>
  </section>

  <section id="parcours" class="path-section" aria-labelledby="path-title">
    <div class="section-heading">
      <p class="section-label">Progression rattachee au compte</p>
      <h2 id="path-title">Modules du parcours MVP</h2>
    </div>
    <ol class="module-list">
      ${modules.map((module) => `
        <li class="module-row module-${module.state}">
          <span class="module-number">${module.number}</span>
          <span class="module-title">
            ${module.state === 'verrouille'
              ? escapeHtml(module.title)
              : `<a href="/modules/${escapeHtml(module.id)}">${escapeHtml(module.title)}</a>`}
          </span>
          <span class="module-state">${escapeHtml(module.stateLabel)}</span>
        </li>
      `).join('')}
    </ol>


  ${renderAccompanimentDashboardBlock(snapshot, product)}

  <section class="bonus-section" aria-labelledby="bonus-title">
    <div class="section-heading">
      <p class="section-label">Bonus</p>
      <h2 id="bonus-title">Pour aller plus loin</h2>
    </div>
    <p class="bonus-state">${bonusState} jusqu'a la fin du parcours principal.</p>
    <p>Ces bonus sont volontairement courts : une astuce, un exercice et une action concrete. Ils ne remplacent pas un feedback accompagne.</p>
    ${renderBonusList(bonusesUnlocked)}
  </section>
</main>`);
}


const FEEDBACK_GRID = [
  ['Clarite du message', 'Le message central est identifiable en une phrase.', 'A clarifier / Correct / Clair'],
  ['Structure', 'L introduction, le chemin et la conclusion sont faciles a suivre.', 'A simplifier / Correct / Fluide'],
  ['Preparation', 'La fiche de prise de parole aide vraiment a parler sans tout lire.', 'Fragile / Utilisable / Solide'],
  ['Presence', 'La personne semble plus preparee, posee et disponible.', 'A travailler / En progres / Stable'],
  ['Prochaine action', 'Un axe simple est choisi pour la prise de parole suivante.', 'Trop vague / Clair / Prioritaire'],
];

function renderAccompaniment(snapshot, product = DEFAULT_PRODUCT_CONFIG) {
  const accompanimentBookingUrl = product.accompanimentBookingUrl;
  const isAccompanied = isAccompaniedPlan(snapshot.learner.plan);
  const state = snapshot.accompaniment || {};

  return layout('Mon accompagnement', `
<header class="topbar">
  <div>
    <p class="eyebrow">${escapeHtml(product.name)} accompagne</p>
    <h1>Mon accompagnement</h1>
  </div>
  <nav class="top-actions" aria-label="Navigation apprenant">
    <a class="secondary-link" href="/dashboard">Mon parcours</a>
    <form method="post" action="/logout">
      <button class="secondary-button" type="submit">Deconnexion</button>
    </form>
  </nav>
</header>

<main class="accompaniment-shell">
  <section class="accompaniment-hero" aria-labelledby="accompaniment-title">
    <p class="section-label">${escapeHtml(product.commercialWording)}</p>
    <h2 id="accompaniment-title">${escapeHtml(product.mainStatement)}</h2>
    <p><strong>${escapeHtml(product.autonomous.label)} (${escapeHtml(product.autonomous.priceLabel)}) :</strong> ${escapeHtml(product.autonomous.description)} <strong>${escapeHtml(product.accompanied.label)} (${escapeHtml(product.accompanied.priceLabel)}) :</strong> ${escapeHtml(product.accompanied.description)} <strong>${escapeHtml(product.cpf.label)} (${escapeHtml(product.cpf.priceLabel)}) :</strong> ${escapeHtml(product.cpf.description)}</p>
    <p>Cette page reste volontairement simple : pas de messagerie, pas de calendrier interne, pas d upload video et pas d analyse automatique.</p>
  </section>

  ${isAccompanied ? `<section class="accompaniment-card" aria-labelledby="booking-title">
    <p class="section-label">Rendez-vous</p>
    <h2 id="booking-title">Reserver mon rendez-vous</h2>
    <p>Utilisez le lien de reservation centralise. Une fois le rendez-vous pris, validez simplement l etape ici.</p>
    <div class="completion-links">
      <a class="button-link" href="${escapeHtml(accompanimentBookingUrl)}" target="_blank" rel="noopener noreferrer">Reserver via TidyCal</a>
    </div>
    <form class="validation-form compact-validation" method="post" action="/accompagnement/reservation">
      <button type="submit">J ai reserve mon rendez-vous</button>
      <p class="form-state">Etat : ${state.appointmentReserved ? 'rendez-vous declare reserve.' : 'a declarer apres reservation.'}</p>
    </form>
  </section>

  <section class="accompaniment-card" aria-labelledby="video-share-title">
    <p class="section-label">Video externe</p>
    <h2 id="video-share-title">Partager ma video pour le retour formateur</h2>
    <p>Filmez une prise de parole courte de 3 a 5 minutes, puis partagez-la via un service externe : lien non liste YouTube, Google Drive, Dropbox, WeTransfer ou autre solution habituelle.</p>
    <ol>
      <li>Verifiez que le lien est accessible au formateur.</li>
      <li>Ajoutez votre fiche finale ou vos notes principales si necessaire.</li>
      <li>Envoyez le lien par le canal indique lors de la reservation.</li>
    </ol>
    <form class="validation-form compact-validation" method="post" action="/accompagnement/video">
      <button type="submit">J ai partage ma video</button>
      <p class="form-state">Etat : ${state.videoShared ? 'video declaree partagee.' : 'a declarer apres partage externe.'}</p>
    </form>
  </section>` : `<section class="accompaniment-card" aria-labelledby="autonomous-title">
    <p class="section-label">Votre formule actuelle</p>
    <h2 id="autonomous-title">Vous etes en methode autonome.</h2>
    <p>Vous avez acces au parcours pas a pas, aux exercices, aux fiches et aux auto-evaluations. Le regard professionnel sur video appartient a ${escapeHtml(product.accompanied.label)}.</p>
  </section>`}

  <section class="accompaniment-card" aria-labelledby="feedback-grid-title">
    <p class="section-label">Grille formateur simple</p>
    <h2 id="feedback-grid-title">Grille de feedback imprimable</h2>
    <p>Cette grille sert de support de retour professionnel simple. Elle aide a orienter l apprenant sans entrer dans un diagnostic CPF complet.</p>
    <div class="feedback-grid" role="table" aria-label="Grille simple de feedback formateur">
      <div class="feedback-row feedback-head" role="row">
        <span role="columnheader">Point observe</span>
        <span role="columnheader">Question de feedback</span>
        <span role="columnheader">Repere simple</span>
      </div>
      ${FEEDBACK_GRID.map(([point, question, scale]) => `<div class="feedback-row" role="row">
        <span role="cell">${escapeHtml(point)}</span>
        <span role="cell">${escapeHtml(question)}</span>
        <span role="cell">${escapeHtml(scale)}</span>
      </div>`).join('')}
    </div>
    <button class="secondary-button" type="button" onclick="window.print()">Imprimer la grille</button>
  </section>

  <section class="accompaniment-card" aria-labelledby="cpf-orientation-title">
    <p class="section-label">Orientation</p>
    <h2 id="cpf-orientation-title">Quand envisager le CPF individuel ?</h2>
    <p>Le CPF devient pertinent si la difficulte demande un travail plus profond : enjeu professionnel fort, blocage persistant, besoin d entrainement live, correction fine ou adaptation a une situation reelle complexe.</p>
    <p>${escapeHtml(product.offerDistinctionMessage)}</p>
    <p class="form-state">${escapeHtml(product.supportText)}</p>
  </section>
</main>`);
}


function renderCompletion(snapshot, product = DEFAULT_PRODUCT_CONFIG) {
  const { summary, bonusesUnlocked } = snapshot;

  if (summary.completedCount !== summary.totalCount) {
    return renderDenied("La fin de parcours sera disponible apres validation du dernier module.", product);
  }

  return layout('Fin de parcours autonome', `
<header class="topbar">
  <div>
    <p class="eyebrow">${escapeHtml(product.methodName)}</p>
    <h1>Fin de parcours</h1>
  </div>
  <nav class="top-actions" aria-label="Navigation apprenant">
    <a class="secondary-link" href="/dashboard">Mon parcours</a>
    <form method="post" action="/logout">
      <button class="secondary-button" type="submit">Deconnexion</button>
    </form>
  </nav>
</header>

<main class="completion-shell">
  <section class="completion-hero" aria-labelledby="completion-title">
    <p class="section-label">Parcours autonome termine</p>
    <h2 id="completion-title">Bravo, vous avez construit votre methode de prise de parole.</h2>
    <p>Vous n avez pas cherche a devenir parfait. Vous avez prepare, teste, observe et clarifie une prise de parole simple de 3 a 5 minutes.</p>
    <p class="method-outcome"><strong>Ce que vous repartez avec :</strong> une methode reutilisable pour preparer un oral plus clair, plus structure et plus rassurant.</p>
  </section>

  <section class="completion-card" aria-labelledby="productions-title">
    <p class="section-label">Synthese de vos productions</p>
    <h2 id="productions-title">Ce que vous avez produit pendant le parcours</h2>
    <ul class="deliverable-list">
      ${FINAL_DELIVERABLES.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}
    </ul>
  </section>

  <section class="completion-card" aria-labelledby="comparison-title">
    <p class="section-label">Comparaison guidee</p>
    <h2 id="comparison-title">Video de depart / video finale</h2>
    <p>Comparez vos deux videos avec trois questions simples. La plateforme ne les analyse pas et ne les stocke pas.</p>
    <ol>
      <li>Qu est-ce qui est plus clair dans ma video finale ?</li>
      <li>Ma structure est-elle plus facile a suivre ?</li>
      <li>Quel signe montre que je suis plus prepare ou plus present ?</li>
    </ol>
    <p>Gardez trois progres visibles et un seul axe prioritaire pour la prochaine prise de parole.</p>
  </section>

  <section class="completion-card" aria-labelledby="action-title">
    <p class="section-label">Plan d action personnel</p>
    <h2 id="action-title">Votre prochaine etape</h2>
    <ol>
      <li>Choisissez une prochaine prise de parole reelle, meme courte.</li>
      <li>Reprenez votre fiche finale et adaptez-la au nouveau contexte.</li>
      <li>Gardez votre routine anti-trac avant de parler.</li>
      <li>Apres l oral, notez une reussite, un point a simplifier et une action pour la fois suivante.</li>
    </ol>
    ${renderCompletionLinks()}
  </section>

  ${renderCompletionBonusBlock(bonusesUnlocked)}

  <section class="completion-card" aria-labelledby="next-title">
    <p class="section-label">Et maintenant ?</p>
    <h2 id="next-title">Continuer au bon niveau</h2>
    <div class="next-step-grid">
      <article>
        <h3>Continuer seul</h3>
        <p>Refaites la methode sur un nouvel oral pour consolider vos reperes.</p>
      </article>
      <article>
        <h3>Refaire une prise de parole</h3>
        <p>Gardez le meme format court, puis augmentez progressivement l enjeu.</p>
      </article>
      <article>
        <h3>Envisager l accompagne</h3>
        <p>Utile si vous voulez un regard professionnel sur votre video, votre posture, votre voix ou votre regard.</p>
      </article>
      <article>
        <h3>CPF individuel</h3>
        <p>Reserve a un travail profond, personnalise et lie a un cas professionnel reel.</p>
      </article>
    </div>
    <p class="bonus-state">Bonus : ${bonusesUnlocked ? 'debloques apres validation du parcours principal.' : 'verrouilles jusqu a la fin du parcours principal.'}</p>
  </section>
</main>`);
}

function renderBonus(snapshot, bonus, product = DEFAULT_PRODUCT_CONFIG) {
  if (!snapshot.bonusesUnlocked) {
    return renderDenied('Les bonus sont disponibles apres validation du parcours principal.', product);
  }

  if (!bonus) {
    return renderDenied('Ce bonus n existe pas dans le parcours autonome.', product);
  }

  return layout(bonus.title, `
<header class="topbar">
  <div>
    <p class="eyebrow">Bonus court - ${escapeHtml(product.methodName)}</p>
    <h1>${escapeHtml(bonus.title)}</h1>
  </div>
  <nav class="top-actions" aria-label="Navigation apprenant">
    <a class="secondary-link" href="/dashboard#bonus-title">Tous les bonus</a>
    <form method="post" action="/logout">
      <button class="secondary-button" type="submit">Deconnexion</button>
    </form>
  </nav>
</header>

<main class="completion-shell">
  <section class="completion-hero" aria-labelledby="bonus-page-title">
    <p class="section-label">5 a 15 minutes</p>
    <h2 id="bonus-page-title">Une pratique simple a tester</h2>
    <p>${escapeHtml(bonus.objective)}</p>
    <p class="method-outcome"><strong>Rappel :</strong> ce bonus donne une astuce autonome. Il ne remplace pas un retour personnalise ni un travail CPF.</p>
  </section>

  <section class="completion-card bonus-detail" aria-labelledby="bonus-detail-title">
    <p class="section-label">Bonus actionnable</p>
    <h2 id="bonus-detail-title">Votre mini-fiche</h2>
    <dl>
      <div>
        <dt>Objectif</dt>
        <dd>${escapeHtml(bonus.objective)}</dd>
      </div>
      <div>
        <dt>Astuce simple</dt>
        <dd>${escapeHtml(bonus.simpleTip)}</dd>
      </div>
      <div>
        <dt>Exercice court</dt>
        <dd>${escapeHtml(bonus.shortExercise)}</dd>
      </div>
      <div>
        <dt>Action a faire</dt>
        <dd>${escapeHtml(bonus.action)}</dd>
      </div>
      <div>
        <dt>Duree</dt>
        <dd>${escapeHtml(bonus.duration)}</dd>
      </div>
    </dl>
    <p class="completion-note"><strong>On ne cherche pas la perfection :</strong> ${escapeHtml(bonus.reminder)}</p>
  </section>
</main>`);
}

function renderModule(snapshot, { message = '' } = {}) {
  const { selectedModule, moduleState } = snapshot;
  const isCompleted = moduleState.state === 'termine';
  const hasPrintableWorksheet = Array.isArray(selectedModule.worksheet.sections)
    && selectedModule.worksheet.sections.length > 0;
  const form = isCompleted
    ? `<div class="completion-note">
        <p>Module deja valide. Vous pouvez le relire quand vous voulez.</p>
        <a class="button-link" href="/dashboard">Retour a mon parcours</a>
      </div>`
    : `<form class="validation-form" method="post" action="/modules/${escapeHtml(selectedModule.id)}/validate">
        <fieldset>
          <legend>Auto-evaluation courte</legend>
          <p>${escapeHtml(selectedModule.selfAssessment.prompt)}</p>
          ${selectedModule.selfAssessment.options.map((option) => `
            <label class="choice">
              <input type="radio" name="confidence" value="${escapeHtml(option.value)}" required>
              <span>${escapeHtml(option.label)}</span>
            </label>
          `).join('')}
        </fieldset>
        <label class="choice confirmation">
          <input type="checkbox" name="exerciseDone" value="yes" required>
          <span>Je confirme avoir realise l'exercice avec mon support papier ou mes notes.</span>
        </label>
        <button type="submit">Valider ce module et debloquer la suite</button>
      </form>`;

  return layout(`Module ${moduleState.number}`, `
<header class="topbar">
  <div>
    <p class="eyebrow">${escapeHtml(DEFAULT_PRODUCT_CONFIG.methodName)}</p>
    <h1>Module ${moduleState.number}</h1>
  </div>
  <nav class="top-actions" aria-label="Navigation apprenant">
    <a class="secondary-link" href="/dashboard">Mon parcours</a>
    <form method="post" action="/logout">
      <button class="secondary-button" type="submit">Deconnexion</button>
    </form>
  </nav>
</header>

<main class="module-shell">
  <section class="module-hero" aria-labelledby="module-title">
    <p class="section-label">Module ${moduleState.number} - ${escapeHtml(moduleState.stateLabel)}</p>
    <h2 id="module-title">${escapeHtml(selectedModule.title)}</h2>
    <p>${escapeHtml(selectedModule.objective)}</p>
    ${selectedModule.methodOutcome
      ? `<p class="method-outcome"><strong>A la fin de ce module, j'obtiens :</strong> ${escapeHtml(selectedModule.methodOutcome)}</p>`
      : ''}
    ${Array.isArray(selectedModule.sourceMaterials)
      ? `<div class="source-strip" aria-label="Sources de reference">
          <span>Sources de reference</span>
          ${selectedModule.sourceMaterials.map((source) => `<strong>${escapeHtml(source)}</strong>`).join('')}
        </div>`
      : ''}
  </section>

  ${message ? `<p class="message" role="alert">${escapeHtml(message)}</p>` : ''}

  <section class="module-template" aria-labelledby="template-title">
    <h2 id="template-title">Gabarit du module</h2>
    <div class="template-grid">
      <article>
        <p class="section-label">Apport</p>
        <ul>
          ${selectedModule.lesson.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}
        </ul>
      </article>
      ${renderKeyIdeas(selectedModule.keyIdeas)}
      <article>
        <p class="section-label">Exercice</p>
        <h3>${escapeHtml(selectedModule.exercise.title)}</h3>
        ${selectedModule.exercise.duration
          ? `<p class="module-meta"><strong>Duree :</strong> ${escapeHtml(selectedModule.exercise.duration)}</p>`
          : ''}
        ${Array.isArray(selectedModule.exercise.materials)
          ? `<p class="module-meta"><strong>Materiel :</strong></p>${renderInlineList(selectedModule.exercise.materials, 'compact-list')}`
          : ''}
        <ol>
          ${selectedModule.exercise.steps.map((step) => `<li>${escapeHtml(step)}</li>`).join('')}
        </ol>
      </article>
      <article>
        <p class="section-label">Fiche associee</p>
        <h3>${escapeHtml(selectedModule.worksheet.title)}</h3>
        <p>${escapeHtml(selectedModule.worksheet.description)}</p>
        ${hasPrintableWorksheet
          ? `<a class="secondary-link worksheet-link" href="/modules/${escapeHtml(selectedModule.id)}/fiche">Ouvrir la fiche imprimable</a>`
          : ''}
      </article>
      ${Array.isArray(selectedModule.observableCriteria)
        ? `<article>
            <p class="section-label">Points d observation</p>
            ${renderInlineList(selectedModule.observableCriteria)}
          </article>`
        : ''}
      <article>
        <p class="section-label">Rythme et defi</p>
        <p>${escapeHtml(selectedModule.rhythmTip)}</p>
        <p class="challenge">${escapeHtml(selectedModule.shortChallenge)}</p>
      </article>
    </div>
  </section>

  <section class="validation-section" aria-labelledby="validation-title">
    <h2 id="validation-title">Validation declarative</h2>
    <p>Cette validation memorise seulement l'etat du module et une reponse courte. Les notes longues restent sur votre fiche papier.</p>
    ${selectedModule.id === 'module-9'
      ? `<p class="completion-note">Ce bilan termine le parcours autonome : vous repartez avec une methode reutilisable. Pour un retour personnalise sur une video, choisissez le parcours accompagne.</p>`
      : ''}
    ${form}
  </section>
</main>`);
}

function renderWorksheet(snapshot) {
  const { selectedModule, moduleState } = snapshot;
  const sections = Array.isArray(selectedModule.worksheet.sections)
    ? selectedModule.worksheet.sections
    : [];

  return layout(`Fiche module ${moduleState.number}`, `
<header class="topbar">
  <div>
    <p class="eyebrow">Fiche imprimable ${escapeHtml(DEFAULT_PRODUCT_CONFIG.name)}</p>
    <h1>Module ${moduleState.number}</h1>
  </div>
  <nav class="top-actions print-actions" aria-label="Actions fiche">
    <a class="secondary-link" href="/modules/${escapeHtml(selectedModule.id)}">Retour au module</a>
    <button class="secondary-button" type="button" onclick="window.print()">Imprimer</button>
  </nav>
</header>

<main class="worksheet-shell">
  <section class="worksheet-page" aria-labelledby="worksheet-title">
    <p class="section-label">Fiche de travail</p>
    <h2 id="worksheet-title">${escapeHtml(selectedModule.worksheet.title)}</h2>
    <p>${escapeHtml(selectedModule.worksheet.description)}</p>
    ${selectedModule.worksheet.source ? `<p class="worksheet-source">Source modernisee : ${escapeHtml(selectedModule.worksheet.source)}</p>` : ''}
    <p class="worksheet-note">Completez cette fiche sur papier ou apres impression. La plateforme ne stocke pas vos reponses longues.</p>

    ${sections.map((section) => `
      <article class="worksheet-section">
        <h3>${escapeHtml(section.title)}</h3>
        ${section.prompts.map((prompt) => `
          <div class="worksheet-prompt">
            <p>${escapeHtml(prompt)}</p>
            <div class="answer-box" aria-hidden="true"></div>
          </div>
        `).join('')}
      </article>
    `).join('')}
  </section>
</main>`);
}

function renderAdmin({ message = '', error = '', values = {} } = {}) {
  const today = new Date().toISOString().slice(0, 10);
  const accessEndsAt = values.accessEndsAt || today;
  const plan = values.plan || 'autonome';
  const status = values.status || 'active';

  return layout('Administration apprenants', `
<main class="auth-shell">
  <section class="auth-panel" aria-labelledby="admin-title">
    <p class="eyebrow">Administration Level Up</p>
    <h1 id="admin-title">Creer ou mettre a jour un apprenant</h1>
    <p class="intro">Cette page minimale sert a activer un acces apprenant sans terminal. Le secret admin est verifie cote serveur a chaque envoi et n'est pas conserve dans la page.</p>
    ${message ? `<p class="message success-message" role="status">${escapeHtml(message)}</p>` : ''}
    ${error ? `<p class="message" role="alert">${escapeHtml(error)}</p>` : ''}
    <form class="login-form" method="post" action="/admin" autocomplete="off">
      <label>
        Secret admin
        <input name="secret" type="password" autocomplete="off" required>
      </label>
      <label>
        Email apprenant
        <input name="email" type="email" autocomplete="email" value="${escapeHtml(values.email || '')}" required>
      </label>
      <label>
        Mot de passe initial ou nouveau mot de passe
        <input name="password" type="password" autocomplete="new-password" ${values.isUpdate ? '' : 'required'}>
      </label>
      <label>
        Formule
        <select name="plan" required>
          <option value="autonome" ${plan === 'autonome' ? 'selected' : ''}>autonome</option>
          <option value="accompagne" ${plan === 'accompagne' ? 'selected' : ''}>accompagne</option>
        </select>
      </label>
      <label>
        Statut
        <select name="status" required>
          <option value="active" ${status === 'active' ? 'selected' : ''}>active</option>
          <option value="inactive" ${status === 'inactive' ? 'selected' : ''}>inactive</option>
          <option value="expired" ${status === 'expired' ? 'selected' : ''}>expired</option>
        </select>
      </label>
      <label>
        Date de fin d'acces
        <input name="accessEndsAt" type="date" value="${escapeHtml(accessEndsAt)}" required>
      </label>
      <button type="submit">Creer / mettre a jour</button>
    </form>
  </section>
</main>`);
}

module.exports = {
  renderDashboard,
  renderDenied,
  renderLogin,
  renderAdmin,
  renderCompletion,
  renderAccompaniment,
  renderBonus,
  renderModule,
  renderWorksheet,
};
