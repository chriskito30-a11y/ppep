const { BONUS_ITEMS, CORE_MODULES } = require('./module-content');

const STATE_LABELS = {
  disponible: 'Disponible',
  courant: 'Courant',
  termine: 'Termine',
  verrouille: 'Verrouille',
};

function getDefaultProgress(learnerId, now = new Date()) {
  return {
    learnerId,
    currentModuleId: CORE_MODULES[0].id,
    completedModuleIds: [],
    lastActivityAt: now.toISOString(),
  };
}

function normalizeProgress(progress) {
  const completed = Array.isArray(progress?.completedModuleIds)
    ? progress.completedModuleIds.filter((id) => CORE_MODULES.some((module) => module.id === id))
    : [];

  let currentModuleId = progress?.currentModuleId;

  if (!CORE_MODULES.some((module) => module.id === currentModuleId)) {
    currentModuleId = CORE_MODULES.find((module) => !completed.includes(module.id))?.id || CORE_MODULES[0].id;
  }

  if (completed.includes(currentModuleId)) {
    currentModuleId = CORE_MODULES.find((module) => !completed.includes(module.id))?.id || currentModuleId;
  }

  return {
    ...progress,
    currentModuleId,
    completedModuleIds: [...new Set(completed)],
    moduleValidations: normalizeValidations(progress?.moduleValidations),
  };
}

function normalizeValidations(validations) {
  if (!Array.isArray(validations)) {
    return [];
  }

  return validations
    .filter((validation) => CORE_MODULES.some((module) => module.id === validation?.moduleId))
    .map((validation) => ({
      moduleId: validation.moduleId,
      validatedAt: validation.validatedAt,
      confidence: validation.confidence,
    }));
}

function buildModuleStates(progress) {
  const normalized = normalizeProgress(progress);
  const completed = new Set(normalized.completedModuleIds);
  const currentIndex = CORE_MODULES.findIndex((module) => module.id === normalized.currentModuleId);

  return CORE_MODULES.map((module, index) => {
    let state = 'verrouille';

    if (completed.has(module.id)) {
      state = 'termine';
    } else if (module.id === normalized.currentModuleId) {
      state = 'courant';
    } else if (index < currentIndex) {
      state = 'disponible';
    }

    return {
      ...module,
      number: index,
      state,
      stateLabel: STATE_LABELS[state],
    };
  });
}

function getCurrentModule(moduleStates) {
  return moduleStates.find((module) => module.state === 'courant')
    || moduleStates.find((module) => module.state === 'disponible')
    || moduleStates.at(-1);
}

function getProgressSummary(progress) {
  const normalized = normalizeProgress(progress);
  return {
    completedCount: normalized.completedModuleIds.length,
    totalCount: CORE_MODULES.length,
  };
}

function areBonusesUnlocked(progress) {
  const completed = new Set(normalizeProgress(progress).completedModuleIds);
  return CORE_MODULES.every((module) => completed.has(module.id));
}

function getModuleById(moduleId) {
  return CORE_MODULES.find((module) => module.id === moduleId) || null;
}

function getBonusById(bonusId) {
  return BONUS_ITEMS.find((bonus) => bonus.id === bonusId) || null;
}

function getModuleState(progress, moduleId) {
  return buildModuleStates(progress).find((module) => module.id === moduleId) || null;
}

function isModuleAccessible(progress, moduleId) {
  const module = getModuleState(progress, moduleId);
  return Boolean(module && module.state !== 'verrouille');
}

function completeModule(progress, moduleId, input = {}, now = new Date()) {
  const module = getModuleById(moduleId);

  if (!module) {
    throw new Error('MODULE_NOT_FOUND');
  }

  if (!isModuleAccessible(progress, moduleId)) {
    throw new Error('MODULE_LOCKED');
  }

  const confidence = String(input.confidence || '').trim();
  const allowedConfidence = new Set(module.selfAssessment.options.map((option) => option.value));

  if (!allowedConfidence.has(confidence)) {
    throw new Error('SELF_ASSESSMENT_REQUIRED');
  }

  const normalized = normalizeProgress(progress);
  const completed = new Set(normalized.completedModuleIds);
  completed.add(moduleId);

  const nextModule = CORE_MODULES.find((item) => !completed.has(item.id));
  const timestamp = now.toISOString();

  progress.currentModuleId = nextModule?.id || moduleId;
  progress.completedModuleIds = CORE_MODULES
    .filter((item) => completed.has(item.id))
    .map((item) => item.id);
  progress.moduleValidations = [
    ...normalized.moduleValidations.filter((validation) => validation.moduleId !== moduleId),
    {
      moduleId,
      validatedAt: timestamp,
      confidence,
    },
  ];
  progress.lastActivityAt = timestamp;

  return progress;
}

module.exports = {
  BONUS_ITEMS,
  CORE_MODULES,
  STATE_LABELS,
  areBonusesUnlocked,
  buildModuleStates,
  completeModule,
  getBonusById,
  getCurrentModule,
  getDefaultProgress,
  getModuleById,
  getModuleState,
  getProgressSummary,
  isModuleAccessible,
  normalizeProgress,
};
