const { DEFAULT_PRODUCT_CONFIG } = require('./config');
const { BONUS_ITEMS, CORE_MODULES } = require('./modules');
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


const SALES_MODULES = CORE_MODULES.map((module) => module.title);
const SALES_DELIVERABLES = [
  'une vidéo de départ et une vidéo finale à comparer soi-même',
  'une fiche objectif claire',
  'une fiche public',
  'un message central en une phrase',
  'un plan avec fil rouge',
  'une introduction et une conclusion prêtes à dire',
  'une fiche de prise de parole utilisable sans tout lire',
  'une routine anti-trac',
  'un plan d’action final',
];

function renderSalesPage(product = DEFAULT_PRODUCT_CONFIG) {
  return layout('Level Up - Méthode guidée prise de parole', `
<header class="sales-header">
  <nav class="sales-nav" aria-label="Navigation commerciale">
    <strong>${escapeHtml(product.name)}</strong>
    <div>
      <a href="#modules">Modules</a>
      <a href="#faq">FAQ</a>
      <a class="button-link small-button" href="${escapeHtml(product.paymentUrl)}">Commencer</a>
    </div>
  </nav>
  <section class="sales-hero" aria-labelledby="sales-title">
    <p class="eyebrow">Méthode guidée de prise de parole</p>
    <h1 id="sales-title">Préparez une prise de parole plus claire, plus structurée et plus rassurante.</h1>
    <p class="intro">Level Up vous guide pas à pas pour construire une prise de parole simple de 3 à 5 minutes, avec des exercices courts, des fiches pratiques, des vidéos intégrées et un kit final réutilisable.</p>
    <div class="sales-cta-row">
      <a class="button-link" href="${escapeHtml(product.paymentUrl)}">Accéder à la méthode — 149 €</a>
      <a class="secondary-link" href="#difference">Voir la différence avec l’accompagnement</a>
    </div>
    <p class="module-meta">Durée officielle : 420 minutes / 7h. Les exercices complémentaires sont des bonus et peuvent ajouter du temps si vous les faites tous.</p>
  </section>
</header>

<main class="sales-main">
  <section class="sales-section" aria-labelledby="problem-title">
    <p class="section-label">Le problème</p>
    <h2 id="problem-title">Savoir quoi dire ne suffit pas toujours à oser le dire clairement.</h2>
    <p>Beaucoup de personnes savent ce qu’elles veulent transmettre, mais se perdent au moment de préparer : objectif flou, public mal identifié, idées trop nombreuses, introduction hésitante, conclusion improvisée ou trac qui prend trop de place.</p>
    <p>La méthode ne promet pas de tout transformer. Elle vous aide à préparer concrètement une prise de parole courte, claire et mieux structurée.</p>
  </section>

  <section class="sales-section" aria-labelledby="transformation-title">
    <p class="section-label">Transformation réaliste</p>
    <h2 id="transformation-title">À la fin, vous avez une méthode de préparation et un support prêt à réutiliser.</h2>
    <p>On ne cherche pas à devenir parfait. On cherche à devenir plus clair, plus préparé et plus présent.</p>
    <div class="sales-grid">
      <article><h3>Avant</h3><p>Vous préparez au feeling, avec trop d’idées ou trop de texte.</p></article>
      <article><h3>Pendant</h3><p>Vous avancez module par module : objectif, public, message, structure, introduction, conclusion, fiche, répétition.</p></article>
      <article><h3>Après</h3><p>Vous repartez avec un kit final et une routine simple pour vos prochaines prises de parole.</p></article>
    </div>
  </section>

  <section id="modules" class="sales-section" aria-labelledby="modules-title">
    <p class="section-label">Programme</p>
    <h2 id="modules-title">13 modules guidés</h2>
    <ol class="sales-module-list">
      ${SALES_MODULES.map((title, index) => `<li><span>Module ${index}</span>${escapeHtml(title)}</li>`).join('')}
    </ol>
  </section>

  <section class="sales-section" aria-labelledby="deliverables-title">
    <p class="section-label">Livrables</p>
    <h2 id="deliverables-title">Ce que vous construisez</h2>
    <ul class="deliverable-list">
      ${SALES_DELIVERABLES.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}
    </ul>
    <p><strong>Kit final :</strong> votre objectif, votre public, votre message central, votre fil rouge, votre introduction, votre conclusion, votre fiche, votre routine anti-trac, votre vidéo finale, trois progrès et un prochain pas.</p>
  </section>

  <section class="sales-section" aria-labelledby="included-title">
    <p class="section-label">Format</p>
    <h2 id="included-title">Des vidéos intégrées, mais jamais seules.</h2>
    <p>Chaque vidéo est accompagnée d’une consigne, d’une question d’observation, d’un exercice et d’une action concrète. Les exercices complémentaires sont proposés comme bonus de pratique, sans changer la durée officielle de la méthode principale.</p>
  </section>

  <section id="difference" class="sales-section contrast-section" aria-labelledby="difference-title">
    <p class="section-label">Important</p>
    <h2 id="difference-title">La méthode guidée transmet une méthode. L’accompagnement individuel et personnalisé ajoute un regard humain.</h2>
    <p>Cette formule ne remplace pas un accompagnement. Elle ne propose pas d’analyse personnalisée de votre posture, de votre voix, de vos blocages ou de votre vidéo. Elle vous donne un cadre solide pour préparer seul une prise de parole simple.</p>
    <p>L’accompagnement individuel et personnalisé devient pertinent si vous voulez un retour professionnel, un entraînement live ou une adaptation fine à une situation à fort enjeu.</p>
  </section>

  <section class="sales-section price-section" aria-labelledby="price-title">
    <p class="section-label">Prix</p>
    <h2 id="price-title">Accès à la méthode guidée : 149 €</h2>
    <p>Accès conseillé : 12 mois, pour avancer à votre rythme et revenir sur les fiches avant une nouvelle prise de parole.</p>
    <a class="button-link" href="${escapeHtml(product.paymentUrl)}">Je commence la méthode guidée</a>
  </section>

  <section id="faq" class="sales-section" aria-labelledby="faq-title">
    <p class="section-label">FAQ</p>
    <h2 id="faq-title">Questions fréquentes</h2>
    <details><summary>Est-ce une bibliothèque de vidéos ?</summary><p>Non. Les vidéos servent de support à des actions précises. Le cœur de la méthode, ce sont les exercices, les fiches et la progression guidée.</p></details>
    <details><summary>Combien de temps faut-il prévoir ?</summary><p>La méthode principale dure officiellement 7h. Les bonus peuvent ajouter du temps si vous choisissez de les faire.</p></details>
    <details><summary>Dois-je déjà être à l’aise à l’oral ?</summary><p>Non. La méthode part d’une prise de parole simple de 3 à 5 minutes et avance progressivement.</p></details>
    <details><summary>Est-ce que ma vidéo est analysée ?</summary><p>Non. Les vidéos servent à votre propre comparaison. La plateforme ne les analyse pas et ne les stocke pas.</p></details>
    <details><summary>Que faire si je veux un retour personnalisé ?</summary><p>Dans ce cas, l’accompagnement individuel et personnalisé est plus adapté, car il permet un regard humain sur votre situation réelle.</p></details>
  </section>
</main>`);
}

function renderPurchaseTunnel(product = DEFAULT_PRODUCT_CONFIG) {
  return layout('Achat Level Up', `
<main class="sales-main purchase-main">
  <section class="sales-section price-section" aria-labelledby="purchase-title">
    <p class="section-label">Accès à la méthode guidée</p>
    <h1 id="purchase-title">Commencer Level Up</h1>
    <p class="lead">Vous êtes à une étape du paiement. Après votre achat, vous recevrez vos accès personnels par email pour commencer la méthode guidée à votre rythme.</p>
    <div class="purchase-summary" aria-label="Résumé de l’offre">
      <p><strong>Ce que vous obtenez :</strong> 13 modules guidés pour préparer une prise de parole claire, structurée et rassurante.</p>
      <p><strong>Durée officielle :</strong> 7h de méthode principale, avec des exercices complémentaires disponibles en bonus.</p>
      <p><strong>Accès :</strong> vos identifiants personnels vous sont envoyés par email après validation de l’achat.</p>
      <p><strong>Besoin d’aide ?</strong> Si vous ne recevez pas vos accès, il suffit de répondre à l’email de confirmation ou de contacter le support.</p>
    </div>
    <p class="price-note"><strong>Prix : 149 €</strong> — paiement sécurisé par carte bancaire.</p>
    <div class="purchase-actions">
      <a class="button-link" href="${escapeHtml(product.paymentUrl)}">Passer au paiement sécurisé</a>
      <a class="button-link secondary" href="${escapeHtml(product.loginUrl)}">J’ai déjà mes accès</a>
    </div>
    <p class="microcopy">Votre accès est personnel. La méthode ne remplace pas un accompagnement individuel et personnalisé, mais elle vous donne une structure concrète pour avancer seul.</p>
  </section>
</main>`);
}

function renderLogin({ email = '', message = '' } = {}, product = DEFAULT_PRODUCT_CONFIG) {
  return layout('Connexion apprenant', `
<main class="auth-shell">
  <section class="auth-panel" aria-labelledby="login-title">
    <p class="eyebrow">${escapeHtml(product.audienceLabel)}</p>
    <h1 id="login-title">Connexion apprenant</h1>
    <p class="intro">Retrouvez votre module courant et reprenez votre parcours là où vous l’avez laissé.</p>
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
  return layout('Accès indisponible', `
<main class="auth-shell">
  <section class="auth-panel" aria-labelledby="denied-title">
    <p class="eyebrow">${escapeHtml(product.name)} - accès apprenant</p>
    <h1 id="denied-title">Accès indisponible</h1>
    <p class="message" role="alert">${escapeHtml(message)}</p>
    <a class="button-link" href="/">Revenir à la connexion</a>
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


function renderDurationBreakdown(breakdown) {
  if (!breakdown || typeof breakdown !== 'object') {
    return '';
  }

  const rows = [
    ['Lecture guidée', breakdown.readingMinutes],
    ['Vidéos ou extraits intégrés', breakdown.videoMinutes],
    ['Questionnaire', breakdown.questionnaireMinutes],
    ['Exercice principal', breakdown.exerciseMinutes],
    ['Mise au propre / fiche', breakdown.integrationMinutes],
  ].filter(([, minutes]) => Number(minutes) > 0);

  if (rows.length === 0) {
    return '';
  }

  return `<article class="duration-card">
    <p class="section-label">Durée estimée</p>
    <h3>${escapeHtml(String(breakdown.totalMinutes || ''))} minutes</h3>
    <ul class="duration-list">
      ${rows.map(([label, minutes]) => `<li><span>${escapeHtml(label)}</span><strong>${escapeHtml(String(minutes))} min</strong></li>`).join('')}
    </ul>
    ${breakdown.justification ? `<p class="module-meta">${escapeHtml(breakdown.justification)}</p>` : ''}
  </article>`;
}

function renderKeyIdeas(ideas) {
  if (!Array.isArray(ideas) || ideas.length === 0) {
    return '';
  }

  return `<article class="wide-card">
    <p class="section-label">Notions clés</p>
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

function getYoutubeId(url = '') {
  const value = String(url || '');
  const match = value.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([A-Za-z0-9_-]{6,})/);
  return match ? match[1] : '';
}

function renderPedagogicalVideos(videos) {
  if (!Array.isArray(videos) || videos.length === 0) {
    return '';
  }

  return `<article class="wide-card video-card">
    <p class="section-label">Vidéo guidée</p>
    <p class="module-meta">La vidéo reste dans le module. Regardez-la avec une consigne précise, puis passez à l’action.</p>
    <div class="video-list">
      ${videos.map((video) => {
        const youtubeId = getYoutubeId(video.url);
        return `
        <section class="guided-video">
          <h3>${escapeHtml(video.title)}</h3>
          ${youtubeId ? `<div class="video-embed"><iframe title="${escapeHtml(video.title)}" src="https://www.youtube-nocookie.com/embed/${escapeHtml(youtubeId)}" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe></div>` : `<p><a href="${escapeHtml(video.url)}" target="_blank" rel="noopener noreferrer">Ouvrir la vidéo</a></p>`}
          <p><strong>Consigne :</strong> ${escapeHtml(video.instruction)}</p>
          <p><strong>Question d’observation :</strong> ${escapeHtml(video.observationQuestion)}</p>
          <p><strong>Exercice :</strong> ${escapeHtml(video.exercise)}</p>
          <p><strong>Action concrète :</strong> ${escapeHtml(video.action)}</p>
        </section>`;
      }).join('')}
    </div>
  </article>`;
}


function renderPracticeVariations(practiceVariations) {
  if (!Array.isArray(practiceVariations) || practiceVariations.length === 0) {
    return '';
  }

  return `<article class="wide-card practice-card">
    <p class="section-label">Entraînement complémentaire</p>
    <p class="module-meta">Ces propositions sont des variantes courtes pour pratiquer autrement. Elles ne remplacent pas l’exercice principal du module.</p>
    <div class="practice-list">
      ${practiceVariations.map((practice) => `
        <section class="practice-item">
          <h3>${escapeHtml(practice.title)}</h3>
          <p><strong>Durée indicative :</strong> ${escapeHtml(practice.duration)}</p>
          <p>${escapeHtml(practice.objective)}</p>
          ${Array.isArray(practice.steps)
            ? `<ol>${practice.steps.map((step) => `<li>${escapeHtml(step)}</li>`).join('')}</ol>`
            : ''}
          <p><strong>Action :</strong> ${escapeHtml(practice.action)}</p>
        </section>
      `).join('')}
    </div>
  </article>`;
}


function renderMethodTools(methodTools) {
  if (!Array.isArray(methodTools) || methodTools.length === 0) {
    return '';
  }

  return `<article class="wide-card method-tool-card">
    <p class="section-label">Méthode pratique</p>
    <div class="tool-list">
      ${methodTools.map((tool) => `
        <section class="tool-item">
          <h3>${escapeHtml(tool.title)}</h3>
          ${tool.intro ? `<p>${escapeHtml(tool.intro)}</p>` : ''}
          ${Array.isArray(tool.items)
            ? `<div class="tool-grid">${tool.items.map((item) => `
              <div class="tool-point">
                <strong>${escapeHtml(item.label)}</strong>
                <p>${escapeHtml(item.body)}</p>
              </div>
            `).join('')}</div>`
            : ''}
          ${tool.action ? `<p><strong>Action :</strong> ${escapeHtml(tool.action)}</p>` : ''}
        </section>
      `).join('')}
    </div>
  </article>`;
}

function renderProgressivePractice(progressivePractice) {
  if (!progressivePractice || !Array.isArray(progressivePractice.levels)) {
    return '';
  }

  return `<article class="wide-card progression-card">
    <p class="section-label">Mise en situation progressive</p>
    <h3>${escapeHtml(progressivePractice.title)}</h3>
    <p>${escapeHtml(progressivePractice.intro || '')}</p>
    <ol class="level-list">
      ${progressivePractice.levels.map((level, index) => `<li><span>Niveau ${index + 1}</span>${escapeHtml(level)}</li>`).join('')}
    </ol>
    ${progressivePractice.action ? `<p><strong>Action :</strong> ${escapeHtml(progressivePractice.action)}</p>` : ''}
  </article>`;
}

function renderFeedbackRequest(feedbackRequest) {
  if (!feedbackRequest || !Array.isArray(feedbackRequest.questions)) {
    return '';
  }

  return `<article class="wide-card feedback-card">
    <p class="section-label">Retour extérieur cadré</p>
    <h3>${escapeHtml(feedbackRequest.title)}</h3>
    <p>${escapeHtml(feedbackRequest.intro || '')}</p>
    <ul>
      ${feedbackRequest.questions.map((question) => `<li>${escapeHtml(question)}</li>`).join('')}
    </ul>
    ${feedbackRequest.action ? `<p><strong>Action :</strong> ${escapeHtml(feedbackRequest.action)}</p>` : ''}
  </article>`;
}

function renderReadinessChecklist(readinessChecklist) {
  if (!readinessChecklist || !Array.isArray(readinessChecklist.items)) {
    return '';
  }

  return `<article class="wide-card readiness-card">
    <p class="section-label">Mini-test</p>
    <h3>${escapeHtml(readinessChecklist.title)}</h3>
    <p>${escapeHtml(readinessChecklist.intro || '')}</p>
    <ul class="checklist-list">
      ${readinessChecklist.items.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}
    </ul>
    ${readinessChecklist.action ? `<p><strong>Action :</strong> ${escapeHtml(readinessChecklist.action)}</p>` : ''}
  </article>`;
}

function renderFinalKit(finalKit) {
  if (!finalKit || !Array.isArray(finalKit.items)) {
    return '';
  }

  return `<article class="wide-card final-kit-card">
    <p class="section-label">Résultat final</p>
    <h3>${escapeHtml(finalKit.title)}</h3>
    <p>${escapeHtml(finalKit.intro || '')}</p>
    <div class="final-kit-grid">
      ${finalKit.items.map((item) => `<span>${escapeHtml(item)}</span>`).join('')}
    </div>
    ${finalKit.closing ? `<p class="completion-note">${escapeHtml(finalKit.closing)}</p>` : ''}
  </article>`;
}

function renderQuestionnaire(questionnaire, moduleId) {
  if (!questionnaire || !Array.isArray(questionnaire.questions) || questionnaire.questions.length === 0) {
    return '';
  }

  const ranges = JSON.stringify(questionnaire.ranges || []);
  return `<article class="wide-card questionnaire-card" data-questionnaire data-ranges="${escapeHtml(ranges)}">
    <p class="section-label">Questionnaire guidé</p>
    <h3>${escapeHtml(questionnaire.title)}</h3>
    <p>${escapeHtml(questionnaire.intro || 'Répondez simplement, puis lisez la piste de travail proposée.')}</p>
    ${questionnaire.questions.map((question, questionIndex) => `
      <fieldset class="questionnaire-question">
        <legend>${escapeHtml(question.text)}</legend>
        ${(question.options || []).map((option, optionIndex) => `
          <label class="choice">
            <input type="radio" name="${escapeHtml(moduleId)}-question-${questionIndex}" value="${optionIndex + 1}">
            <span>${escapeHtml(option)}</span>
          </label>
        `).join('')}
      </fieldset>
    `).join('')}
    <button class="secondary-button" type="button" data-questionnaire-button>Voir ma piste de travail</button>
    <p class="questionnaire-result" data-questionnaire-result aria-live="polite">Répondez aux questions pour afficher une piste de travail.</p>
  </article>`;
}

function renderQuestionnaireScript() {
  return `<script>
    document.querySelectorAll('[data-questionnaire]').forEach((card) => {
      const button = card.querySelector('[data-questionnaire-button]');
      const result = card.querySelector('[data-questionnaire-result]');
      if (!button || !result) return;
      button.addEventListener('click', () => {
        const groups = new Map();
        card.querySelectorAll('input[type="radio"]').forEach((input) => {
          if (!groups.has(input.name)) groups.set(input.name, []);
          groups.get(input.name).push(input);
        });
        let score = 0;
        for (const inputs of groups.values()) {
          const checked = inputs.find((input) => input.checked);
          if (!checked) {
            result.textContent = 'Répondez à toutes les questions pour obtenir une piste de travail.';
            return;
          }
          score += Number(checked.value || 0);
        }
        let ranges = [];
        try { ranges = JSON.parse(card.dataset.ranges || '[]'); } catch (error) { ranges = []; }
        const range = ranges.find((item) => score <= Number(item.max));
        result.textContent = range ? range.label + ' — ' + range.advice : 'Score ' + score + ' : gardez une action simple pour le prochain exercice.';
      });
    });
  </script>`;
}

const FINAL_DELIVERABLES = [
  'Vidéo de départ',
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
  'Checklist de répétition',
  'Vidéo finale',
  'Auto-évaluation finale',
  'Plan d’action personnel',
];

function renderCompletionLinks() {
  return `<div class="completion-links">
    <a class="secondary-link" href="/modules/module-10/fiche">Ouvrir ma fiche finale</a>
    <a class="secondary-link" href="/modules/module-12/fiche">Ouvrir ma grille de bilan final</a>
    <a class="secondary-link" href="/dashboard#bonus-title">Voir les bonus débloqués</a>
  </div>`;
}

function renderBonusList(bonusesUnlocked) {
  return `<div class="bonus-card-list">
    ${BONUS_ITEMS.map((bonus) => `
      <article class="bonus-card">
        <h3>${escapeHtml(bonus.title)}</h3>
        <p>${escapeHtml(bonus.objective)}</p>
        <p class="bonus-duration">Durée : ${escapeHtml(bonus.duration)}</p>
        ${bonusesUnlocked
          ? `<a class="secondary-link" href="/bonus/${escapeHtml(bonus.id)}">Ouvrir ce bonus</a>`
          : '<span class="locked-label">Débloqué après le parcours principal</span>'}
      </article>
    `).join('')}
  </div>`;
}

function renderCompletionBonusBlock(bonusesUnlocked) {
  return `<section class="completion-card" aria-labelledby="completion-bonus-title">
    <p class="section-label">Bonus courts</p>
    <h2 id="completion-bonus-title">Des pratiques rapides, pas de nouveaux modules</h2>
    <p>Ces bonus restent secondaires : ils donnent une astuce simple à tester en 5 à 15 minutes, sans analyse personnalisée ni progression lourde.</p>
    ${renderBonusList(bonusesUnlocked)}
  </section>`;
}

function isAccompaniedPlan(plan) {
  return ['accompagne', 'accompagnee'].includes(String(plan || '').toLowerCase());
}

function formatPlan(plan) {
  return isAccompaniedPlan(plan) ? 'accompagné' : 'méthode guidée';
}

function renderAccompanimentDashboardBlock(snapshot, product = DEFAULT_PRODUCT_CONFIG) {
  if (!isAccompaniedPlan(snapshot.learner.plan)) {
    return '';
  }

  const state = snapshot.accompaniment || {};
  const appointmentLabel = state.appointmentReserved ? 'Rendez-vous réservé' : 'Rendez-vous à réserver';
  const videoLabel = state.videoShared ? 'Vidéo partagée' : 'Vidéo à partager';

  return `<section class="accompaniment-section" aria-labelledby="accompaniment-dashboard-title">
    <div class="section-heading">
      <p class="section-label">${escapeHtml(product.accompanied.label)}</p>
      <h2 id="accompaniment-dashboard-title">Mon accompagnement</h2>
    </div>
    <p><strong>Méthode guidée + regard professionnel :</strong> ${escapeHtml(product.offerDistinctionMessage)}</p>
    <div class="accompaniment-status" aria-label="État accompagnement">
      <span>${escapeHtml(appointmentLabel)}</span>
      <span>${escapeHtml(videoLabel)}</span>
    </div>
    <a class="button-link" href="/accompagnement">Ouvrir mon accompagnement</a>
  </section>`;
}

function renderDashboard(snapshot, product = DEFAULT_PRODUCT_CONFIG) {
  const { learner, currentModule, modules, summary, bonusesUnlocked } = snapshot;
  const bonusState = bonusesUnlocked ? 'Disponible' : 'Verrouillé';
  const isPathCompleted = summary.completedCount === summary.totalCount;

  return layout('Accueil apprenant', `
<header class="topbar">
  <div>
    <p class="eyebrow">${escapeHtml(product.methodName)}</p>
    <h1>Bonjour</h1>
  </div>
  <form method="post" action="/logout">
    <button class="secondary-button" type="submit">Déconnexion</button>
  </form>
</header>

<main class="dashboard">
  <section class="focus-panel" aria-labelledby="current-module-title">
    <div>
      <p class="section-label">${isPathCompleted ? 'Méthode terminée' : 'À faire maintenant'}</p>
      <h2 id="current-module-title">${isPathCompleted ? 'Bravo, vous avez terminé la méthode guidée' : `Module ${currentModule.number} - ${escapeHtml(currentModule.title)}`}</h2>
      <p>${isPathCompleted ? 'Votre méthode est validée. Vous pouvez maintenant relire votre bilan final, réutiliser la méthode pour un nouvel oral et accéder aux bonus.' : escapeHtml(currentModule.actionLabel)}</p>
    </div>
    <a class="button-link" href="${isPathCompleted ? '/fin-parcours' : `/modules/${escapeHtml(currentModule.id)}`}">${isPathCompleted ? 'Voir mon bilan final' : 'Continuer le module'}</a>
  </section>

  <section class="rhythm-panel" aria-labelledby="rhythm-title">
    <div>
      <p class="section-label">Rythme conseillé</p>
      <h2 id="rhythm-title">Avancer sans tout consommer d’un coup</h2>
    </div>
    <p>${escapeHtml(currentModule.rhythmTip)}</p>
    <p class="challenge"><strong>Défi court :</strong> ${escapeHtml(currentModule.shortChallenge)}</p>
  </section>

  <section class="status-grid" aria-label="Synthèse du parcours">
    <div class="status-item">
      <span class="status-value">${summary.completedCount}/${summary.totalCount}</span>
      <span class="status-label">modules terminés</span>
    </div>
    <div class="status-item">
      <span class="status-value">${formatDate(learner.accessEndsAt)}</span>
      <span class="status-label">fin d’accès</span>
    </div>
    <div class="status-item">
      <span class="status-value">${escapeHtml(formatPlan(learner.plan))}</span>
      <span class="status-label">formule</span>
    </div>
  </section>

  <section id="parcours" class="path-section" aria-labelledby="path-title">
    <div class="section-heading">
      <p class="section-label">Progression rattachée au compte</p>
      <h2 id="path-title">Modules de la méthode</h2>
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
    <p class="bonus-state">${bonusState} jusqu’à la fin du parcours principal.</p>
    <p>Ces bonus sont volontairement courts : une astuce, un exercice et une action concrète. Ils ne remplacent pas un feedback accompagné.</p>
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
    <p class="eyebrow">${escapeHtml(product.name)} accompagné</p>
    <h1>Mon accompagnement</h1>
  </div>
  <nav class="top-actions" aria-label="Navigation apprenant">
    <a class="secondary-link" href="/dashboard">Mon parcours</a>
    <form method="post" action="/logout">
      <button class="secondary-button" type="submit">Déconnexion</button>
    </form>
  </nav>
</header>

<main class="accompaniment-shell">
  <section class="accompaniment-hero" aria-labelledby="accompaniment-title">
    <p class="section-label">${escapeHtml(product.commercialWording)}</p>
    <h2 id="accompaniment-title">${escapeHtml(product.mainStatement)}</h2>
    <p><strong>${escapeHtml(product.autonomous.label)} (${escapeHtml(product.autonomous.priceLabel)}) :</strong> ${escapeHtml(product.autonomous.description)} <strong>${escapeHtml(product.accompanied.label)} (${escapeHtml(product.accompanied.priceLabel)}) :</strong> ${escapeHtml(product.accompanied.description)} <strong>${escapeHtml(product.cpf.label)} (${escapeHtml(product.cpf.priceLabel)}) :</strong> ${escapeHtml(product.cpf.description)}</p>
    <p>Cette page reste volontairement simple : pas de messagerie, pas de calendrier interne, pas d’upload vidéo et pas d’analyse automatique.</p>
  </section>

  ${isAccompanied ? `<section class="accompaniment-card" aria-labelledby="booking-title">
    <p class="section-label">Rendez-vous</p>
    <h2 id="booking-title">Reserver mon rendez-vous</h2>
    <p>Utilisez le lien de reservation centralise. Une fois le rendez-vous pris, validez simplement l etape ici.</p>
    <div class="completion-links">
      <a class="button-link" href="${escapeHtml(accompanimentBookingUrl)}" target="_blank" rel="noopener noreferrer">Reserver via TidyCal</a>
    </div>
    <form class="validation-form compact-validation" method="post" action="/accompagnement/reservation">
      <button type="submit">J’ai réservé mon rendez-vous</button>
      <p class="form-state">État : ${state.appointmentReserved ? 'rendez-vous déclaré réservé.' : 'à déclarer après réservation.'}</p>
    </form>
  </section>

  <section class="accompaniment-card" aria-labelledby="video-share-title">
    <p class="section-label">Video externe</p>
    <h2 id="video-share-title">Partager ma vidéo pour le retour formateur</h2>
    <p>Filmez une prise de parole courte de 3 a 5 minutes, puis partagez-la via un service externe : lien non liste YouTube, Google Drive, Dropbox, WeTransfer ou autre solution habituelle.</p>
    <ol>
      <li>Vérifiez que le lien est accessible au formateur.</li>
      <li>Ajoutez votre fiche finale ou vos notes principales si necessaire.</li>
      <li>Envoyez le lien par le canal indique lors de la reservation.</li>
    </ol>
    <form class="validation-form compact-validation" method="post" action="/accompagnement/video">
      <button type="submit">J’ai partagé ma vidéo</button>
      <p class="form-state">État : ${state.videoShared ? 'vidéo déclarée partagée.' : 'à déclarer après partage externe.'}</p>
    </form>
  </section>` : `<section class="accompaniment-card" aria-labelledby="autonomous-title">
    <p class="section-label">Votre formule actuelle</p>
    <h2 id="autonomous-title">Vous êtes en méthode guidée.</h2>
    <p>Vous avez accès au parcours pas à pas, aux exercices, aux fiches et aux auto-évaluations. Le regard professionnel sur vidéo appartient à ${escapeHtml(product.accompanied.label)}.</p>
  </section>`}

  <section class="accompaniment-card" aria-labelledby="feedback-grid-title">
    <p class="section-label">Grille formateur simple</p>
    <h2 id="feedback-grid-title">Grille de feedback imprimable</h2>
    <p>Cette grille sert de support de retour professionnel simple. Elle aide à orienter l’apprenant sans entrer dans un diagnostic complet.</p>
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
    <h2 id="cpf-orientation-title">Quand envisager l’accompagnement individuel et personnalisé ?</h2>
    <p>L’accompagnement individuel et personnalisé devient pertinent si la difficulté demande un travail plus profond : enjeu professionnel fort, blocage persistant, besoin d’entraînement live, correction fine ou adaptation à une situation réelle complexe.</p>
    <p>${escapeHtml(product.offerDistinctionMessage)}</p>
    <p class="form-state">${escapeHtml(product.supportText)}</p>
  </section>
</main>`);
}


function renderCompletion(snapshot, product = DEFAULT_PRODUCT_CONFIG) {
  const { summary, bonusesUnlocked } = snapshot;

  if (summary.completedCount !== summary.totalCount) {
    return renderDenied("La fin de parcours sera disponible après validation du dernier module.", product);
  }

  return layout('Fin de méthode guidée', `
<header class="topbar">
  <div>
    <p class="eyebrow">${escapeHtml(product.methodName)}</p>
    <h1>Fin de parcours</h1>
  </div>
  <nav class="top-actions" aria-label="Navigation apprenant">
    <a class="secondary-link" href="/dashboard">Mon parcours</a>
    <form method="post" action="/logout">
      <button class="secondary-button" type="submit">Déconnexion</button>
    </form>
  </nav>
</header>

<main class="completion-shell">
  <section class="completion-hero" aria-labelledby="completion-title">
    <p class="section-label">Méthode guidée terminée</p>
    <h2 id="completion-title">Bravo, vous avez construit votre méthode de prise de parole.</h2>
    <p>Vous n’avez pas cherché à devenir parfait. Vous avez préparé, testé, observé et clarifié une prise de parole simple de 3 à 5 minutes.</p>
    <p class="method-outcome"><strong>Ce que vous repartez avec :</strong> une méthode réutilisable pour préparer un oral plus clair, plus structuré et plus rassurant.</p>
  </section>

  <section class="completion-card" aria-labelledby="productions-title">
    <p class="section-label">Synthèse de vos productions</p>
    <h2 id="productions-title">Ce que vous avez produit pendant le parcours</h2>
    <ul class="deliverable-list">
      ${FINAL_DELIVERABLES.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}
    </ul>
  </section>

  <section class="completion-card" aria-labelledby="comparison-title">
    <p class="section-label">Comparaison guidée</p>
    <h2 id="comparison-title">Vidéo de départ / vidéo finale</h2>
    <p>Comparez vos deux vidéos avec trois questions simples. La plateforme ne les analyse pas et ne les stocke pas.</p>
    <ol>
      <li>Qu’est-ce qui est plus clair dans ma vidéo finale ?</li>
      <li>Ma structure est-elle plus facile à suivre ?</li>
      <li>Quel signe montre que je suis plus préparé ou plus présent ?</li>
    </ol>
    <p>Gardez trois progrès visibles et un seul axe prioritaire pour la prochaine prise de parole.</p>
  </section>

  <section class="completion-card" aria-labelledby="action-title">
    <p class="section-label">Plan d’action personnel</p>
    <h2 id="action-title">Votre prochaine étape</h2>
    <ol>
      <li>Choisissez une prochaine prise de parole réelle, même courte.</li>
      <li>Reprenez votre fiche finale et adaptez-la au nouveau contexte.</li>
      <li>Gardez votre routine anti-trac avant de parler.</li>
      <li>Après l’oral, notez une réussite, un point à simplifier et une action pour la fois suivante.</li>
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
        <p>Refaites la méthode sur un nouvel oral pour consolider vos repères.</p>
      </article>
      <article>
        <h3>Refaire une prise de parole</h3>
        <p>Gardez le même format court, puis augmentez progressivement l’enjeu.</p>
      </article>
      <article>
        <h3>Envisager l’accompagné</h3>
        <p>Utile si vous voulez un regard professionnel sur votre vidéo, votre posture, votre voix ou votre regard.</p>
      </article>
      <article>
        <h3>Accompagnement individuel et personnalisé</h3>
        <p>Réservé à un travail profond, personnalisé et lié à un cas professionnel réel.</p>
      </article>
    </div>
    <p class="bonus-state">Bonus : ${bonusesUnlocked ? 'débloqués après validation du parcours principal.' : 'verrouillés jusqu’à la fin du parcours principal.'}</p>
  </section>
</main>`);
}

function renderBonus(snapshot, bonus, product = DEFAULT_PRODUCT_CONFIG) {
  if (!snapshot.bonusesUnlocked) {
    return renderDenied('Les bonus sont disponibles après validation du parcours principal.', product);
  }

  if (!bonus) {
    return renderDenied('Ce bonus n existe pas dans le méthode guidée.', product);
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
      <button class="secondary-button" type="submit">Déconnexion</button>
    </form>
  </nav>
</header>

<main class="completion-shell">
  <section class="completion-hero" aria-labelledby="bonus-page-title">
    <p class="section-label">5 a 15 minutes</p>
    <h2 id="bonus-page-title">Une pratique simple a tester</h2>
    <p>${escapeHtml(bonus.objective)}</p>
    <p class="method-outcome"><strong>Rappel :</strong> ce bonus donne une astuce à pratiquer seul. Il ne remplace pas un retour personnalisé ni un travail individuel approfondi.</p>
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
        <dt>Action à faire</dt>
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
        <p>Module déjà validé. Vous pouvez le relire quand vous voulez.</p>
        <a class="button-link" href="/dashboard">Retour à mon parcours</a>
      </div>`
    : `<form class="validation-form" method="post" action="/modules/${escapeHtml(selectedModule.id)}/validate">
        <fieldset>
          <legend>Auto-évaluation courte</legend>
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
          <span>Je confirme avoir réalisé l’exercice avec mon support papier ou mes notes.</span>
        </label>
        <button type="submit">Valider ce module et débloquer la suite</button>
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
      <button class="secondary-button" type="submit">Déconnexion</button>
    </form>
  </nav>
</header>

<main class="module-shell">
  <section class="module-hero" aria-labelledby="module-title">
    <p class="section-label">Module ${moduleState.number} - ${escapeHtml(moduleState.stateLabel)}</p>
    <h2 id="module-title">${escapeHtml(selectedModule.title)}</h2>
    <p>${escapeHtml(selectedModule.objective)}</p>
    ${selectedModule.methodOutcome
      ? `<p class="method-outcome"><strong>À la fin de ce module, j’obtiens :</strong> ${escapeHtml(selectedModule.methodOutcome)}</p>`
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
      ${renderDurationBreakdown(selectedModule.durationBreakdown)}
      ${renderPedagogicalVideos(selectedModule.videos)}
      ${renderQuestionnaire(selectedModule.questionnaire, selectedModule.id)}
      ${renderMethodTools(selectedModule.methodTools)}
      ${renderProgressivePractice(selectedModule.progressivePractice)}
      ${renderFeedbackRequest(selectedModule.feedbackRequest)}
      ${renderReadinessChecklist(selectedModule.readinessChecklist)}
      ${renderFinalKit(selectedModule.finalKit)}
      ${renderPracticeVariations(selectedModule.practiceVariations)}
      <article>
        <p class="section-label">Exercice</p>
        <h3>${escapeHtml(selectedModule.exercise.title)}</h3>
        ${selectedModule.exercise.duration
          ? `<p class="module-meta"><strong>Durée :</strong> ${escapeHtml(selectedModule.exercise.duration)}</p>`
          : ''}
        ${Array.isArray(selectedModule.exercise.materials)
          ? `<p class="module-meta"><strong>Matériel :</strong></p>${renderInlineList(selectedModule.exercise.materials, 'compact-list')}`
          : ''}
        <ol>
          ${selectedModule.exercise.steps.map((step) => `<li>${escapeHtml(step)}</li>`).join('')}
        </ol>
      </article>
      <article>
        <p class="section-label">Fiche associée</p>
        <h3>${escapeHtml(selectedModule.worksheet.title)}</h3>
        <p>${escapeHtml(selectedModule.worksheet.description)}</p>
        ${hasPrintableWorksheet
          ? `<a class="secondary-link worksheet-link" href="/modules/${escapeHtml(selectedModule.id)}/fiche">Ouvrir la fiche imprimable</a>`
          : ''}
      </article>
      ${Array.isArray(selectedModule.observableCriteria)
        ? `<article>
            <p class="section-label">Points d’observation</p>
            ${renderInlineList(selectedModule.observableCriteria)}
          </article>`
        : ''}
      <article>
        <p class="section-label">Rythme et défi</p>
        <p>${escapeHtml(selectedModule.rhythmTip)}</p>
        <p class="challenge">${escapeHtml(selectedModule.shortChallenge)}</p>
      </article>
    </div>
  </section>

  <section class="validation-section" aria-labelledby="validation-title">
    <h2 id="validation-title">Validation déclarative</h2>
    <p>Cette validation mémorise seulement l’état du module et une réponse courte. Les notes longues restent sur votre fiche papier.</p>
    ${selectedModule.id === CORE_MODULES.at(-1).id
      ? `<p class="completion-note">Ce bilan termine la méthode guidée : vous repartez avec une méthode réutilisable. Pour un retour personnalisé sur une vidéo, choisissez le parcours accompagné.</p>`
      : ''}
    ${form}
  </section>
  ${renderQuestionnaireScript()}
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
    <p class="worksheet-note">Complétez cette fiche sur papier ou après impression. La plateforme ne stocke pas vos réponses longues.</p>

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

function formatAdminDateTime(value) {
  if (!value) {
    return '-';
  }

  const parsed = new Date(value);

  if (Number.isNaN(parsed.getTime())) {
    return String(value).slice(0, 10) || '-';
  }

  return new Intl.DateTimeFormat('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(parsed);
}

function buildAccessEmailText(learner) {
  return [
    'Bonjour,',
    '',
    'Votre accès à la méthode guidée Level Up est prêt.',
    '',
    `Lien de connexion : /login`,
    `Email : ${learner.email || ''}`,
    'Mot de passe : [à compléter avec le mot de passe créé dans l’administration]',
    `Fin d’accès : ${learner.accessEndsAt || ''}`,
    '',
    'Je vous conseille de commencer par le module 0 et d’avancer étape par étape.',
    '',
    'Bonne préparation,',
    'Level Up',
  ].join('\n');
}

function renderAdminLearnerRows(learners = []) {
  if (!Array.isArray(learners) || learners.length === 0) {
    return `<tr><td colspan="8">Aucun apprenant pour le moment.</td></tr>`;
  }

  return learners.map((learner) => {
    const accessEmailText = buildAccessEmailText(learner);

    return `
    <tr data-admin-learner-row data-email="${escapeHtml(learner.email || '')}" data-plan="${escapeHtml(learner.plan || '')}" data-status="${escapeHtml(learner.status || '')}">
      <td>${escapeHtml(learner.email || '')}</td>
      <td>${escapeHtml(formatPlan(learner.plan || ''))}</td>
      <td><span class="admin-status admin-status-${escapeHtml(learner.status || 'unknown')}">${escapeHtml(learner.status || '')}</span></td>
      <td>${escapeHtml(learner.accessEndsAt || '')}</td>
      <td>${escapeHtml(learner.progressLabel || '-')}</td>
      <td>${escapeHtml(formatAdminDateTime(learner.lastActivityAt))}</td>
      <td>
        <span>Création : ${escapeHtml(formatAdminDateTime(learner.createdAt))}</span><br>
        <span>Mise à jour : ${escapeHtml(formatAdminDateTime(learner.updatedAt))}</span>
      </td>
      <td class="admin-row-actions">
        <button class="secondary-button admin-edit-button" type="button"
          data-email="${escapeHtml(learner.email || '')}"
          data-plan="${escapeHtml(learner.plan || 'autonome')}"
          data-status="${escapeHtml(learner.status || 'active')}"
          data-access-ends-at="${escapeHtml(learner.accessEndsAt || '')}">
          Modifier
        </button>
        <button class="secondary-button admin-copy-access-button" type="button" data-access-email="${escapeHtml(accessEmailText)}">Copier email d’accès</button>
      </td>
    </tr>`;
  }).join('');
}

function renderAdminLogin({ error = '' } = {}) {
  return layout('Connexion administration', `
<main class="auth-shell">
  <section class="auth-panel" aria-labelledby="admin-login-title">
    <p class="eyebrow">Administration Level Up</p>
    <h1 id="admin-login-title">Connexion admin</h1>
    <p class="intro">Entrez le secret administrateur. Il est envoye uniquement dans le formulaire et n'apparait pas dans l'adresse.</p>
    ${error ? `<p class="message" role="alert">${escapeHtml(error)}</p>` : ''}
    <form class="login-form" method="post" action="/admin/login" autocomplete="off">
      <label>
        Secret admin
        <input name="secret" type="password" autocomplete="off" required autofocus>
      </label>
      <button type="submit">Accéder à l’administration</button>
    </form>
  </section>
</main>`);
}

function renderAdmin({ message = '', error = '', values = {}, learners = [], loginRequired = false, isAuthenticated = false } = {}) {
  if (loginRequired && !isAuthenticated) {
    return renderAdminLogin({ error });
  }

  const today = new Date().toISOString().slice(0, 10);
  const accessEndsAt = String(values.accessEndsAt || today).slice(0, 10);
  const plan = values.plan || 'autonome';
  const status = values.status || 'active';

  return layout('Administration apprenants', `
<main class="admin-shell">
  <section class="auth-panel admin-panel" aria-labelledby="admin-title">
    <p class="eyebrow">Administration Level Up</p>
    <h1 id="admin-title">Gestion des accès apprenants</h1>
    <p class="intro">Créer, mettre à jour, réinitialiser un mot de passe ou désactiver un accès sans terminal. L’accès est protégé par une session admin côté serveur.</p>
    <form class="admin-logout-form" method="post" action="/admin/logout">
      <button class="secondary-button" type="submit">Déconnexion admin</button>
    </form>
    ${message ? `<p class="message success-message" role="status">${escapeHtml(message)}</p>` : ''}
    ${error ? `<p class="message" role="alert">${escapeHtml(error)}</p>` : ''}

    <form class="login-form admin-form" method="post" action="/admin" autocomplete="off">
      <label>
        Email apprenant
        <input id="admin-email" name="email" type="email" autocomplete="email" value="${escapeHtml(values.email || '')}" required>
      </label>
      <label>
        Mot de passe initial ou nouveau mot de passe
        <input id="admin-password" name="password" type="password" autocomplete="new-password" ${values.isUpdate ? '' : 'required'}>
      </label>
      <label>
        Formule
        <select id="admin-plan" name="plan" required>
          <option value="autonome" ${plan === 'autonome' ? 'selected' : ''}>autonome</option>
          <option value="accompagne" ${plan === 'accompagne' ? 'selected' : ''}>accompagné</option>
        </select>
      </label>
      <label>
        Statut
        <select id="admin-status" name="status" required>
          <option value="active" ${status === 'active' ? 'selected' : ''}>active</option>
          <option value="inactive" ${status === 'inactive' ? 'selected' : ''}>inactive</option>
          <option value="expired" ${status === 'expired' ? 'selected' : ''}>expired</option>
        </select>
      </label>
      <label>
        Date de fin d’accès
        <input id="admin-access-ends-at" name="accessEndsAt" type="date" value="${escapeHtml(accessEndsAt)}" required>
      </label>
      <div class="admin-actions">
        <button type="submit" name="action" value="save">Créer / mettre à jour</button>
        <button class="secondary-button" type="submit" name="action" value="reset_password">Réinitialiser le mot de passe</button>
        <button class="danger-button" type="submit" name="action" value="deactivate">Désactiver l’accès</button>
      </div>
    </form>
  </section>

  <section class="auth-panel admin-panel admin-list-panel" aria-labelledby="admin-list-title">
    <div class="admin-list-heading">
      <div>
        <p class="eyebrow">Accès existants</p>
        <h2 id="admin-list-title">Apprenants</h2>
      </div>
      <div class="admin-tools">
        <label class="admin-search">
          Filtrer par email
          <input id="admin-email-filter" type="search" autocomplete="off" placeholder="ex. lea@example.com">
        </label>
        <label class="admin-search">
          Filtrer par statut
          <select id="admin-status-filter">
            <option value="">Tous</option>
            <option value="active">active</option>
            <option value="inactive">inactive</option>
            <option value="expired">expired</option>
          </select>
        </label>
        <label class="admin-search">
          Filtrer par formule
          <select id="admin-plan-filter">
            <option value="">Toutes</option>
            <option value="autonome">Méthode guidée</option>
            <option value="accompagne">Accompagné</option>
          </select>
        </label>
        <button class="secondary-button" id="admin-export-csv" type="button">Exporter CSV</button>
      </div>
    </div>
    <div class="admin-table-wrapper">
      <table class="admin-table">
        <thead>
          <tr>
            <th>Email</th>
            <th>Formule</th>
            <th>Statut</th>
            <th>Fin d’accès</th>
            <th>Progression</th>
            <th>Dernière activité</th>
            <th>Dates</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody id="admin-learner-rows">
          ${renderAdminLearnerRows(learners)}
        </tbody>
      </table>
    </div>
  </section>
</main>
<script>
(function () {
  var filter = document.getElementById('admin-email-filter');
  var statusFilter = document.getElementById('admin-status-filter');
  var planFilter = document.getElementById('admin-plan-filter');
  var exportButton = document.getElementById('admin-export-csv');
  var rows = Array.prototype.slice.call(document.querySelectorAll('[data-admin-learner-row]'));
  var email = document.getElementById('admin-email');
  var password = document.getElementById('admin-password');
  var plan = document.getElementById('admin-plan');
  var status = document.getElementById('admin-status');
  var accessEndsAt = document.getElementById('admin-access-ends-at');

  function applyAdminFilters() {
    var query = filter ? filter.value.trim().toLowerCase() : '';
    var statusQuery = statusFilter ? statusFilter.value : '';
    var planQuery = planFilter ? planFilter.value : '';

    rows.forEach(function (row) {
      var matchEmail = !query || String(row.dataset.email || '').toLowerCase().includes(query);
      var matchStatus = !statusQuery || row.dataset.status === statusQuery;
      var matchPlan = !planQuery || row.dataset.plan === planQuery;
      row.hidden = !(matchEmail && matchStatus && matchPlan);
    });
  }

  if (filter) filter.addEventListener('input', applyAdminFilters);
  if (statusFilter) statusFilter.addEventListener('change', applyAdminFilters);
  if (planFilter) planFilter.addEventListener('change', applyAdminFilters);

  if (exportButton) {
    exportButton.addEventListener('click', function () {
      var lines = [['email','formule','statut','fin_acces','progression','derniere_activite']];
      rows.filter(function (row) { return !row.hidden; }).forEach(function (row) {
        var cells = Array.prototype.slice.call(row.querySelectorAll('td')).slice(0, 6).map(function (cell) {
          return '"' + cell.textContent.trim().replace(/"/g, '""') + '"';
        });
        lines.push(cells);
      });
      var blob = new Blob([lines.map(function (line) { return line.join(','); }).join('\n')], { type: 'text/csv;charset=utf-8' });
      var link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'levelup-apprenants.csv';
      link.click();
      URL.revokeObjectURL(link.href);
    });
  }

  document.querySelectorAll('.admin-copy-access-button').forEach(function (button) {
    button.addEventListener('click', function () {
      var text = button.dataset.accessEmail || '';
      if (navigator.clipboard && text) {
        navigator.clipboard.writeText(text).then(function () {
          button.textContent = 'Email copié';
          setTimeout(function () { button.textContent = 'Copier email d’accès'; }, 1800);
        });
      }
    });
  });

  document.querySelectorAll('.admin-edit-button').forEach(function (button) {
    button.addEventListener('click', function () {
      email.value = button.dataset.email || '';
      plan.value = button.dataset.plan || 'autonome';
      status.value = button.dataset.status || 'active';
      accessEndsAt.value = button.dataset.accessEndsAt || '';
      password.required = false;
      password.value = '';
      email.focus();
    });
  });
}());
</script>`);
}
module.exports = {
  renderDashboard,
  renderDenied,
  renderLogin,
  renderPurchaseTunnel,
  renderSalesPage,
  renderAdmin,
  renderCompletion,
  renderAccompaniment,
  renderBonus,
  renderModule,
  renderWorksheet,
};
