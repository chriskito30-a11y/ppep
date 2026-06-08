const { randomUUID } = require('node:crypto');
const {
  areBonusesUnlocked,
  buildModuleStates,
  completeModule,
  getCurrentModule,
  getDefaultProgress,
  getModuleById,
  getProgressSummary,
} = require('./modules');
const {
  hashPassword,
  normalizeEmail,
  verifyPassword,
} = require('./security');

const ACCESS_STATUSES = ['active', 'inactive', 'expired'];
const PLAN_OPTIONS = ['autonome', 'accompagne'];
const PLAN_ALIASES = {
  accompagnee: 'accompagne',
};

function normalizePlan(plan = 'autonome') {
  const value = String(plan || 'autonome').trim().toLowerCase();
  return PLAN_ALIASES[value] || value;
}

function isAccompaniedPlan(plan) {
  return normalizePlan(plan) === 'accompagne';
}

function getAccompanimentState(progress = {}) {
  return {
    appointmentReserved: progress.accompaniment?.appointmentReserved === true,
    videoShared: progress.accompaniment?.videoShared === true,
    updatedAt: progress.accompaniment?.updatedAt || null,
  };
}

function parseAccessEnd(accessEndsAt) {
  const value = String(accessEndsAt || '').trim();

  if (!value) {
    throw new Error('ACCESS_END_REQUIRED');
  }

  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return new Date(`${value}T23:59:59.999Z`);
  }

  const parsed = new Date(value);

  if (Number.isNaN(parsed.getTime())) {
    throw new Error('ACCESS_END_INVALID');
  }

  return parsed;
}

function isAccessExpired(accessEndsAt, now = new Date()) {
  return parseAccessEnd(accessEndsAt).getTime() < now.getTime();
}

function findLearnerByEmail(store, email) {
  const normalized = normalizeEmail(email);
  return store.learners.find((learner) => learner.email === normalized) || null;
}

function findLearnerById(store, learnerId) {
  return store.learners.find((learner) => learner.id === learnerId) || null;
}

function ensureProgress(store, learnerId, now = new Date()) {
  let progress = store.progress.find((item) => item.learnerId === learnerId);

  if (!progress) {
    progress = getDefaultProgress(learnerId, now);
    store.progress.push(progress);
  }

  return progress;
}

function validateActivationInput(input) {
  const email = normalizeEmail(input.email);
  const plan = normalizePlan(input.plan || 'autonome');
  const status = input.status || 'active';

  if (!email || !email.includes('@')) {
    throw new Error('EMAIL_INVALID');
  }

  if (!PLAN_OPTIONS.includes(plan)) {
    throw new Error('PLAN_INVALID');
  }

  if (!ACCESS_STATUSES.includes(status)) {
    throw new Error('STATUS_INVALID');
  }

  parseAccessEnd(input.accessEndsAt);

  return { email, plan, status };
}

function activateLearner(store, input, now = new Date()) {
  const { email, plan, status } = validateActivationInput(input);
  const existing = findLearnerByEmail(store, email);
  const passwordHash = input.password
    ? hashPassword(input.password)
    : existing?.passwordHash;

  if (!passwordHash) {
    throw new Error('PASSWORD_REQUIRED');
  }

  const timestamp = now.toISOString();
  const learner = existing || {
    id: randomUUID(),
    email,
    createdAt: timestamp,
  };

  learner.status = status;
  learner.plan = plan;
  learner.accessStartsAt = learner.accessStartsAt || timestamp;
  learner.accessEndsAt = input.accessEndsAt;
  learner.passwordHash = passwordHash;
  learner.updatedAt = timestamp;

  if (!existing) {
    store.learners.push(learner);
  }

  ensureProgress(store, learner.id, now);
  return learner;
}

function evaluateLearnerAccess(learner, now = new Date()) {
  if (!learner) {
    return {
      allowed: false,
      reason: 'missing',
      message: "Aucun accès actif ne correspond à cet email.",
    };
  }

  if (learner.status === 'inactive') {
    return {
      allowed: false,
      reason: 'inactive',
      message: "Cet accès n’est pas activé. Contactez le formateur pour le vérifier.",
    };
  }

  if (learner.status === 'expired' || isAccessExpired(learner.accessEndsAt, now)) {
    return {
      allowed: false,
      reason: 'expired',
      message: 'Cet accès est arrivé à expiration. Contactez le formateur pour le renouveler.',
    };
  }

  if (learner.status !== 'active') {
    return {
      allowed: false,
      reason: 'inactive',
      message: "Cet accès n’est pas disponible pour le moment.",
    };
  }

  return {
    allowed: true,
    reason: 'active',
    message: '',
  };
}

function authenticateLearner(store, input, now = new Date()) {
  const learner = findLearnerByEmail(store, input.email);
  const access = evaluateLearnerAccess(learner, now);

  if (!access.allowed) {
    return { ok: false, ...access };
  }

  if (!verifyPassword(input.password, learner.passwordHash)) {
    return {
      ok: false,
      reason: 'bad_credentials',
      message: 'Email ou mot de passe incorrect.',
    };
  }

  const progress = ensureProgress(store, learner.id, now);
  progress.lastActivityAt = now.toISOString();

  return {
    ok: true,
    learner,
    progress,
    message: '',
  };
}

function getLearnerSnapshot(store, learnerId, now = new Date()) {
  const learner = findLearnerById(store, learnerId);
  const access = evaluateLearnerAccess(learner, now);

  if (!access.allowed) {
    return { ok: false, ...access };
  }

  const progress = ensureProgress(store, learner.id, now);
  const modules = buildModuleStates(progress);
  const currentModule = getCurrentModule(modules);

  return {
    ok: true,
    learner,
    progress,
    modules,
    currentModule,
    summary: getProgressSummary(progress),
    bonusesUnlocked: areBonusesUnlocked(progress),
    accompaniment: getAccompanimentState(progress),
  };
}

function markAccompanimentStep(store, learnerId, step, now = new Date()) {
  const snapshot = getLearnerSnapshot(store, learnerId, now);

  if (!snapshot.ok) {
    return snapshot;
  }

  if (!isAccompaniedPlan(snapshot.learner.plan)) {
    return {
      ...snapshot,
      ok: false,
      reason: 'plan_not_accompanied',
      message: "Cette section est réservée aux apprenants du parcours accompagné.",
    };
  }

  if (!['appointmentReserved', 'videoShared'].includes(step)) {
    throw new Error('ACCOMPANIMENT_STEP_INVALID');
  }

  const progress = ensureProgress(store, learnerId, now);
  progress.accompaniment = {
    ...getAccompanimentState(progress),
    [step]: true,
    updatedAt: now.toISOString(),
  };
  progress.lastActivityAt = now.toISOString();

  return getLearnerSnapshot(store, learnerId, now);
}

function getModuleSnapshot(store, learnerId, moduleId, now = new Date()) {
  const snapshot = getLearnerSnapshot(store, learnerId, now);

  if (!snapshot.ok) {
    return snapshot;
  }

  const selectedModule = getModuleById(moduleId);

  if (!selectedModule) {
    return {
      ok: false,
      reason: 'module_missing',
      message: "Ce module n'existe pas dans le parcours.",
    };
  }

  const moduleState = snapshot.modules.find((module) => module.id === moduleId);

  if (!moduleState || moduleState.state === 'verrouille') {
    return {
      ok: false,
      reason: 'module_locked',
      message: "Ce module est encore verrouillé. Validez d’abord le module courant.",
    };
  }

  return {
    ...snapshot,
    selectedModule,
    moduleState,
  };
}

function validateModuleForLearner(store, learnerId, moduleId, input = {}, now = new Date()) {
  const moduleSnapshot = getModuleSnapshot(store, learnerId, moduleId, now);

  if (!moduleSnapshot.ok) {
    return moduleSnapshot;
  }

  if (input.exerciseDone !== 'yes') {
    return {
      ...moduleSnapshot,
      ok: false,
      reason: 'exercise_required',
      message: "Confirmez que vous avez réalisé l’exercice avant de valider le module.",
    };
  }

  try {
    completeModule(moduleSnapshot.progress, moduleId, input, now);
  } catch (error) {
    if (error.message === 'SELF_ASSESSMENT_REQUIRED') {
      return {
        ...moduleSnapshot,
        ok: false,
        reason: 'self_assessment_required',
        message: "Choisissez une réponse d’auto-évaluation pour valider le module.",
      };
    }

    throw error;
  }

  return {
    ...getLearnerSnapshot(store, learnerId, now),
    completedModuleId: moduleId,
  };
}

module.exports = {
  ACCESS_STATUSES,
  PLAN_OPTIONS,
  activateLearner,
  authenticateLearner,
  evaluateLearnerAccess,
  findLearnerByEmail,
  findLearnerById,
  getLearnerSnapshot,
  getModuleSnapshot,
  isAccompaniedPlan,
  markAccompanimentStep,
  normalizePlan,
  isAccessExpired,
  parseAccessEnd,
  validateModuleForLearner,
};
