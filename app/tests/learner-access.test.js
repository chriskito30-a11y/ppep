const assert = require('node:assert/strict');
const test = require('node:test');
const {
  activateLearner,
  authenticateLearner,
  getLearnerSnapshot,
  validateModuleForLearner,
} = require('../src/learners');
const { BONUS_ITEMS, CORE_MODULES } = require('../src/modules');
const { createEmptyStore } = require('../src/storage');

const NOW = new Date('2026-06-08T12:00:00.000Z');

function activateDefault(store, overrides = {}) {
  return activateLearner(store, {
    email: 'lea@example.com',
    password: 'motdepasse-test',
    plan: 'autonome',
    accessEndsAt: '2026-12-31',
    ...overrides,
  }, NOW);
}

test('activation manuelle cree un acces apprenant et une progression initiale', () => {
  const store = createEmptyStore();
  const learner = activateDefault(store);

  assert.equal(learner.email, 'lea@example.com');
  assert.equal(learner.status, 'active');
  assert.equal(learner.plan, 'autonome');
  assert.equal(store.progress.length, 1);
  assert.equal(store.progress[0].learnerId, learner.id);
  assert.equal(store.progress[0].currentModuleId, 'module-0');
  assert.deepEqual(store.progress[0].completedModuleIds, []);
});

test('un apprenant actif peut se connecter avec son compte individuel', () => {
  const store = createEmptyStore();
  activateDefault(store);

  const result = authenticateLearner(store, {
    email: 'LEA@example.com',
    password: 'motdepasse-test',
  }, NOW);

  assert.equal(result.ok, true);
  assert.equal(result.learner.email, 'lea@example.com');
});

test('un acces absent, inactif ou expire est refuse avec un message clair', () => {
  const missingStore = createEmptyStore();
  const missing = authenticateLearner(missingStore, {
    email: 'personne@example.com',
    password: 'motdepasse-test',
  }, NOW);
  assert.equal(missing.ok, false);
  assert.equal(missing.reason, 'missing');
  assert.match(missing.message, /Aucun acces actif/);

  const inactiveStore = createEmptyStore();
  activateDefault(inactiveStore, { status: 'inactive' });
  const inactive = authenticateLearner(inactiveStore, {
    email: 'lea@example.com',
    password: 'motdepasse-test',
  }, NOW);
  assert.equal(inactive.ok, false);
  assert.equal(inactive.reason, 'inactive');
  assert.match(inactive.message, /pas active/);

  const expiredStore = createEmptyStore();
  activateDefault(expiredStore, { accessEndsAt: '2026-01-01' });
  const expired = authenticateLearner(expiredStore, {
    email: 'lea@example.com',
    password: 'motdepasse-test',
  }, NOW);
  assert.equal(expired.ok, false);
  assert.equal(expired.reason, 'expired');
  assert.match(expired.message, /expiration/);
});

test('la progression existante est retrouvee apres reconnexion', () => {
  const store = createEmptyStore();
  const learner = activateDefault(store);
  const progress = store.progress.find((item) => item.learnerId === learner.id);
  progress.completedModuleIds = ['module-0'];
  progress.currentModuleId = 'module-1';

  const firstLogin = authenticateLearner(store, {
    email: 'lea@example.com',
    password: 'motdepasse-test',
  }, NOW);
  const secondLogin = authenticateLearner(store, {
    email: 'lea@example.com',
    password: 'motdepasse-test',
  }, NOW);

  assert.equal(firstLogin.progress.currentModuleId, 'module-1');
  assert.equal(secondLogin.progress.currentModuleId, 'module-1');
  assert.deepEqual(secondLogin.progress.completedModuleIds, ['module-0']);
});

test('les modules futurs et les bonus restent verrouilles au demarrage', () => {
  const store = createEmptyStore();
  const learner = activateDefault(store);
  const snapshot = getLearnerSnapshot(store, learner.id, NOW);

  assert.equal(snapshot.ok, true);
  assert.equal(snapshot.currentModule.id, 'module-0');
  assert.equal(snapshot.modules[0].state, 'courant');
  assert.equal(snapshot.modules[1].state, 'verrouille');
  assert.equal(snapshot.summary.completedCount, 0);
  assert.equal(snapshot.bonusesUnlocked, false);
});

test('la validation declarative termine le module courant et debloque le suivant', () => {
  const store = createEmptyStore();
  const learner = activateDefault(store);
  const result = validateModuleForLearner(store, learner.id, 'module-0', {
    exerciseDone: 'yes',
    confidence: 'pret',
  }, NOW);
  const progress = store.progress.find((item) => item.learnerId === learner.id);

  assert.equal(result.ok, true);
  assert.deepEqual(progress.completedModuleIds, ['module-0']);
  assert.equal(progress.currentModuleId, 'module-1');
  assert.equal(progress.moduleValidations.length, 1);
  assert.equal(progress.moduleValidations[0].moduleId, 'module-0');
  assert.equal(progress.moduleValidations[0].confidence, 'pret');
  assert.equal(progress.moduleValidations[0].notes, undefined);
});

test('un module verrouille ne peut pas etre valide directement', () => {
  const store = createEmptyStore();
  const learner = activateDefault(store);
  const result = validateModuleForLearner(store, learner.id, 'module-2', {
    exerciseDone: 'yes',
    confidence: 'pret',
  }, NOW);
  const snapshot = getLearnerSnapshot(store, learner.id, NOW);

  assert.equal(result.ok, false);
  assert.equal(result.reason, 'module_locked');
  assert.equal(snapshot.currentModule.id, 'module-0');
  assert.deepEqual(snapshot.progress.completedModuleIds, []);
});

test('les modules MVP portent un contenu pedagogique substantiel et une fiche contextualisee', () => {
  assert.equal(CORE_MODULES.length, 10);

  for (const module of CORE_MODULES) {
    assert.ok(Array.isArray(module.sourceMaterials), module.id);
    assert.ok(module.sourceMaterials.length >= 2, module.id);
    assert.ok(Array.isArray(module.lesson), module.id);
    assert.ok(module.lesson.length >= 6, module.id);
    assert.ok(Array.isArray(module.keyIdeas), module.id);
    assert.ok(module.keyIdeas.length >= 3, module.id);
    assert.ok(module.worksheet);
    assert.ok(Array.isArray(module.worksheet.sections), module.id);
    assert.ok(module.worksheet.sections.length >= 2, module.id);
    assert.ok(module.worksheet.sections.every((section) => section.prompts.length >= 2), module.id);
    assert.ok(Array.isArray(module.observableCriteria), module.id);
    assert.ok(module.observableCriteria.length >= 3, module.id);
  }
});


test('chaque module produit un resultat actionnable de methode autonome', () => {
  for (const module of CORE_MODULES) {
    assert.equal(typeof module.methodOutcome, 'string', module.id);
    assert.ok(module.methodOutcome.length >= 20, module.id);
    assert.doesNotMatch(module.methodOutcome, /feedback personnalise|diagnostic complet|CPF/i, module.id);
  }
});


test('les bonus courts restent actionnables et secondaires', () => {
  assert.ok(BONUS_ITEMS.length >= 4);
  assert.ok(BONUS_ITEMS.length <= 6);

  for (const bonus of BONUS_ITEMS) {
    assert.equal(typeof bonus.id, 'string');
    assert.equal(typeof bonus.title, 'string');
    assert.match(bonus.duration, /minutes/);
    assert.equal(typeof bonus.objective, 'string');
    assert.equal(typeof bonus.simpleTip, 'string');
    assert.equal(typeof bonus.shortExercise, 'string');
    assert.equal(typeof bonus.action, 'string');
    assert.equal(typeof bonus.reminder, 'string');
    assert.doesNotMatch(`${bonus.objective} ${bonus.simpleTip} ${bonus.shortExercise} ${bonus.action}`, /diagnostic complet|feedback personnalise|CPF individuel|analyse automatique/i);
  }
});

test('le chemin nominal valide les modules 0 a 9 puis debloque les bonus', () => {
  const store = createEmptyStore();
  const learner = activateDefault(store);

  for (const module of CORE_MODULES) {
    const before = getLearnerSnapshot(store, learner.id, NOW);
    assert.equal(before.bonusesUnlocked, module.id === 'module-0' ? false : before.bonusesUnlocked);
    const result = validateModuleForLearner(store, learner.id, module.id, {
      exerciseDone: 'yes',
      confidence: 'pret',
    }, NOW);
    assert.equal(result.ok, true, module.id);
  }

  const snapshot = getLearnerSnapshot(store, learner.id, NOW);
  assert.equal(snapshot.summary.completedCount, 10);
  assert.equal(snapshot.bonusesUnlocked, true);
  assert.deepEqual(snapshot.progress.completedModuleIds, CORE_MODULES.map((module) => module.id));
});

test('les bonus restent verrouilles avant validation du module final', () => {
  const store = createEmptyStore();
  const learner = activateDefault(store);

  for (const module of CORE_MODULES.slice(0, -1)) {
    const result = validateModuleForLearner(store, learner.id, module.id, {
      exerciseDone: 'yes',
      confidence: 'pret',
    }, NOW);
    assert.equal(result.ok, true, module.id);
  }

  const snapshot = getLearnerSnapshot(store, learner.id, NOW);
  assert.equal(snapshot.currentModule.id, 'module-9');
  assert.equal(snapshot.bonusesUnlocked, false);
});

test('le module final contient un plan d action autonome', () => {
  const finalModule = CORE_MODULES.find((module) => module.id === 'module-9');
  const sectionTitles = finalModule.worksheet.sections.map((section) => section.title);
  const prompts = finalModule.worksheet.sections.flatMap((section) => section.prompts);

  assert.ok(sectionTitles.includes('Plan d action final'));
  assert.ok(prompts.includes('Mon prochain oral reel'));
  assert.ok(prompts.includes('Ma routine de preparation'));
  assert.ok(prompts.includes('Mon axe prioritaire'));
  assert.ok(prompts.includes('Ce que je garde de la methode'));
});

test('la formule accompagnee historique est normalisee en accompagne', () => {
  const store = createEmptyStore();
  const learner = activateDefault(store, { plan: 'accompagnee' });

  assert.equal(learner.plan, 'accompagne');
});

test('un apprenant accompagne peut declarer reservation et partage video', () => {
  const store = createEmptyStore();
  const learner = activateDefault(store, { plan: 'accompagne' });
  const { markAccompanimentStep } = require('../src/learners');

  const appointment = markAccompanimentStep(store, learner.id, 'appointmentReserved', NOW);
  const video = markAccompanimentStep(store, learner.id, 'videoShared', NOW);

  assert.equal(appointment.ok, true);
  assert.equal(video.ok, true);
  assert.equal(video.accompaniment.appointmentReserved, true);
  assert.equal(video.accompaniment.videoShared, true);
});
