const crypto = require('node:crypto');
const fs = require('node:fs/promises');
const http = require('node:http');
const path = require('node:path');
const { getConfig } = require('./config');
const { CORE_MODULES, getBonusById, getProgressSummary } = require('./modules');
const {
  activateLearner,
  authenticateLearner,
  changeLearnerPassword,
  getLearnerSnapshot,
  getModuleSnapshot,
  markAccompanimentStep,
  validateModuleForLearner,
} = require('./learners');
const {
  renderAdmin,
  renderAccount,
  renderDashboard,
  renderCompletion,
  renderAccompaniment,
  renderBonus,
  renderDenied,
  renderLogin,
  renderPurchaseTunnel,
  renderSalesPage,
  renderModule,
  renderWorksheet,
} = require('./render');
const {
  SESSION_COOKIE,
  clearSessionCookie,
  createSessionToken,
  parseCookies,
  readSessionToken,
  serializeCookie,
} = require('./security');
const { readStore, writeStore } = require('./storage');

const PUBLIC_DIR = path.join(__dirname, '..', 'public');
const ADMIN_SESSION_COOKIE = 'ppep_admin_session';


function resolveRuntimeConfig(config = getConfig()) {
  const defaults = getConfig();
  const product = {
    ...defaults.product,
    ...(config.product || {}),
  };

  if (config.accompanimentBookingUrl) {
    product.accompanimentBookingUrl = config.accompanimentBookingUrl;
  }

  if (config.defaultAccessMonths) {
    product.defaultAccessMonths = config.defaultAccessMonths;
  }

  return {
    ...defaults,
    ...config,
    product,
    accompanimentBookingUrl: product.accompanimentBookingUrl,
    defaultAccessMonths: product.defaultAccessMonths,
  };
}

function send(res, statusCode, body, headers = {}) {
  res.writeHead(statusCode, headers);
  res.end(body);
}

function sendHtml(res, statusCode, html, headers = {}) {
  send(res, statusCode, html, {
    'Content-Type': 'text/html; charset=utf-8',
    ...headers,
  });
}

function redirect(res, location, headers = {}) {
  send(res, 303, '', {
    Location: location,
    ...headers,
  });
}

async function parseForm(req) {
  const chunks = [];
  let size = 0;

  for await (const chunk of req) {
    size += chunk.length;

    if (size > 100_000) {
      throw new Error('FORM_TOO_LARGE');
    }

    chunks.push(chunk);
  }

  return new URLSearchParams(Buffer.concat(chunks).toString('utf8'));
}

function getSession(req, secret) {
  const cookies = parseCookies(req.headers.cookie);
  return readSessionToken(cookies[SESSION_COOKIE], secret);
}

function getAdminSession(req, secret) {
  const cookies = parseCookies(req.headers.cookie);
  const session = readSessionToken(cookies[ADMIN_SESSION_COOKIE], secret);

  if (!session || session.learnerId !== 'admin') {
    return null;
  }

  return session;
}

function createAdminSessionCookie(secret) {
  return serializeCookie(ADMIN_SESSION_COOKIE, createSessionToken('admin', secret));
}

function clearAdminSessionCookie() {
  return serializeCookie(ADMIN_SESSION_COOKIE, '', { maxAge: 0 });
}

function isAdminSecretValid(config, secret) {
  const expected = String(config.adminSecret || '');
  const received = String(secret || '');

  if (!expected || !received) {
    return false;
  }

  const expectedBuffer = Buffer.from(expected);
  const receivedBuffer = Buffer.from(received);

  return expectedBuffer.length === receivedBuffer.length
    && crypto.timingSafeEqual(expectedBuffer, receivedBuffer);
}

function getAdminValues(form) {
  return {
    action: String(form.get('action') || 'save'),
    email: String(form.get('email') || '').trim(),
    password: String(form.get('password') || ''),
    plan: String(form.get('plan') || 'autonome'),
    status: String(form.get('status') || 'active'),
    accessEndsAt: String(form.get('accessEndsAt') || '').trim(),
  };
}

function toDateInputValue(value) {
  return String(value || '').slice(0, 10);
}

function buildAdminLearnerList(store) {
  const progressByLearnerId = new Map(
    (store.progress || []).map((progress) => [progress.learnerId, progress]),
  );

  return [...(store.learners || [])]
    .sort((a, b) => String(a.email || '').localeCompare(String(b.email || '')))
    .map((learner) => {
      const progress = progressByLearnerId.get(learner.id);
      const summary = progress ? getProgressSummary(progress) : null;

      return {
        id: learner.id,
        email: learner.email,
        plan: learner.plan,
        status: learner.status,
        accessEndsAt: toDateInputValue(learner.accessEndsAt),
        createdAt: learner.createdAt || '',
        updatedAt: learner.updatedAt || '',
        progressLabel: summary ? `${summary.completedCount}/${summary.totalCount}` : `0/${CORE_MODULES.length}`,
        lastActivityAt: progress?.lastActivityAt || '',
      };
    });
}

function getAdminErrorMessage(error) {
  const messages = {
    EMAIL_INVALID: 'Email apprenant invalide.',
    PASSWORD_REQUIRED: 'Mot de passe requis pour créer un nouvel apprenant.',
    PLAN_INVALID: 'Formule invalide. Choisissez autonome ou accompagne.',
    STATUS_INVALID: 'Statut invalide. Choisissez active, inactive ou expired.',
    ACCESS_END_REQUIRED: 'Date de fin d’accès requise.',
    ACCESS_END_INVALID: 'Date de fin d’accès invalide.',
  };

  return messages[error.message] || "Impossible d’enregistrer cet apprenant. Vérifiez les champs.";
}

async function handleAdminGet(req, res, config) {
  if (!getAdminSession(req, config.sessionSecret)) {
    sendHtml(res, 200, renderAdmin({ loginRequired: true }));
    return;
  }

  const store = await readStore(config);
  sendHtml(res, 200, renderAdmin({ learners: buildAdminLearnerList(store), isAuthenticated: true }));
}

async function handleAdminLogin(req, res, config) {
  const form = await parseForm(req);
  const secret = form.get('secret');

  if (!isAdminSecretValid(config, secret)) {
    sendHtml(res, 403, renderAdmin({
      loginRequired: true,
      error: 'Accès admin refusé : secret incorrect.',
    }));
    return;
  }

  redirect(res, '/admin', {
    'Set-Cookie': createAdminSessionCookie(config.sessionSecret),
  });
}

async function handleAdminPost(req, res, config) {
  if (!getAdminSession(req, config.sessionSecret)) {
    sendHtml(res, 403, renderAdmin({
      loginRequired: true,
      error: 'Session admin absente ou expiree. Reconnectez-vous.',
    }));
    return;
  }

  const form = await parseForm(req);
  const values = getAdminValues(form);

  const store = await readStore(config);

  try {
    const requestedAction = values.action;
    const activationInput = { ...values };

    if (requestedAction === 'deactivate') {
      activationInput.status = 'inactive';
      activationInput.password = '';
    }

    const learner = activateLearner(store, activationInput);
    await writeStore(config, store);

    const actionMessages = {
      deactivate: `Accès de ${learner.email} désactivé.`,
      reset_password: `Mot de passe de ${learner.email} reinitialise.`,
      save: `Apprenant ${learner.email} enregistré. Formule : ${learner.plan}. Statut : ${learner.status}. Fin d’accès : ${learner.accessEndsAt}.`,
    };

    sendHtml(res, 200, renderAdmin({
      isAuthenticated: true,
      message: actionMessages[requestedAction] || actionMessages.save,
      values: {
        email: learner.email,
        plan: learner.plan,
        status: learner.status,
        accessEndsAt: learner.accessEndsAt,
        isUpdate: true,
      },
      learners: buildAdminLearnerList(store),
    }));
  } catch (error) {
    sendHtml(res, 422, renderAdmin({
      isAuthenticated: true,
      error: getAdminErrorMessage(error),
      values: { ...values, password: '', isUpdate: true },
      learners: buildAdminLearnerList(store),
    }));
  }
}

async function handleDashboard(req, res, config) {
  const session = getSession(req, config.sessionSecret);

  if (!session) {
    sendHtml(res, 401, renderLogin({ message: 'Connectez-vous pour acceder a votre parcours.' }, config.product));
    return;
  }

  const store = await readStore(config);
  const snapshot = getLearnerSnapshot(store, session.learnerId);

  if (!snapshot.ok) {
    sendHtml(res, 403, renderDenied(snapshot.message), {
      'Set-Cookie': clearSessionCookie(),
    });
    return;
  }

  await writeStore(config, store);
  sendHtml(res, 200, renderDashboard(snapshot, config.product));
}

async function handleAccount(req, res, config, state = {}) {
  const session = getSession(req, config.sessionSecret);

  if (!session) {
    sendHtml(res, 401, renderLogin({ message: 'Connectez-vous pour acceder a votre compte.' }, config.product));
    return;
  }

  const store = await readStore(config);
  const snapshot = getLearnerSnapshot(store, session.learnerId);

  if (!snapshot.ok) {
    sendHtml(res, 403, renderDenied(snapshot.message), {
      'Set-Cookie': clearSessionCookie(),
    });
    return;
  }

  await writeStore(config, store);
  sendHtml(res, state.statusCode || 200, renderAccount(snapshot, state));
}

async function handlePasswordChange(req, res, config) {
  const session = getSession(req, config.sessionSecret);

  if (!session) {
    sendHtml(res, 401, renderLogin({ message: 'Connectez-vous pour modifier votre mot de passe.' }, config.product));
    return;
  }

  const form = await parseForm(req);
  const store = await readStore(config);
  const result = changeLearnerPassword(store, session.learnerId, {
    currentPassword: form.get('currentPassword'),
    newPassword: form.get('newPassword'),
    confirmPassword: form.get('confirmPassword'),
  });
  const snapshot = getLearnerSnapshot(store, session.learnerId);

  if (!snapshot.ok) {
    sendHtml(res, 403, renderDenied(snapshot.message), {
      'Set-Cookie': clearSessionCookie(),
    });
    return;
  }

  if (!result.ok) {
    sendHtml(res, 422, renderAccount(snapshot, { error: result.message }));
    return;
  }

  await writeStore(config, store);
  sendHtml(res, 200, renderAccount(snapshot, { message: result.message }));
}

async function handleCompletion(req, res, config) {
  const session = getSession(req, config.sessionSecret);

  if (!session) {
    sendHtml(res, 401, renderLogin({ message: 'Connectez-vous pour acceder a votre parcours.' }, config.product));
    return;
  }

  const store = await readStore(config);
  const snapshot = getLearnerSnapshot(store, session.learnerId);

  if (!snapshot.ok) {
    sendHtml(res, 403, renderDenied(snapshot.message), {
      'Set-Cookie': clearSessionCookie(),
    });
    return;
  }

  await writeStore(config, store);
  sendHtml(res, snapshot.bonusesUnlocked ? 200 : 403, renderCompletion(snapshot, config.product));
}

async function handleBonus(req, res, config, bonusId) {
  const session = getSession(req, config.sessionSecret);

  if (!session) {
    sendHtml(res, 401, renderLogin({ message: 'Connectez-vous pour acceder a vos bonus.' }, config.product));
    return;
  }

  const store = await readStore(config);
  const snapshot = getLearnerSnapshot(store, session.learnerId);

  if (!snapshot.ok) {
    sendHtml(res, 403, renderDenied(snapshot.message), {
      'Set-Cookie': clearSessionCookie(),
    });
    return;
  }

  const bonus = getBonusById(bonusId);
  await writeStore(config, store);
  sendHtml(res, snapshot.bonusesUnlocked && bonus ? 200 : 403, renderBonus(snapshot, bonus, config.product));
}

async function handleAccompaniment(req, res, config) {
  const session = getSession(req, config.sessionSecret);

  if (!session) {
    sendHtml(res, 401, renderLogin({ message: 'Connectez-vous pour acceder a votre parcours.' }, config.product));
    return;
  }

  const store = await readStore(config);
  const snapshot = getLearnerSnapshot(store, session.learnerId);

  if (!snapshot.ok) {
    sendHtml(res, 403, renderDenied(snapshot.message), {
      'Set-Cookie': clearSessionCookie(),
    });
    return;
  }

  await writeStore(config, store);
  sendHtml(res, 200, renderAccompaniment(snapshot, config.product));
}

async function handleAccompanimentValidation(req, res, config, step) {
  const session = getSession(req, config.sessionSecret);

  if (!session) {
    sendHtml(res, 401, renderLogin({ message: 'Connectez-vous pour acceder a votre parcours.' }, config.product));
    return;
  }

  const store = await readStore(config);
  const result = markAccompanimentStep(store, session.learnerId, step);

  if (!result.ok) {
    await writeStore(config, store);
    sendHtml(res, 403, renderDenied(result.message));
    return;
  }

  await writeStore(config, store);
  redirect(res, '/accompagnement');
}

async function handleModule(req, res, config, moduleId) {
  const session = getSession(req, config.sessionSecret);

  if (!session) {
    sendHtml(res, 401, renderLogin({ message: 'Connectez-vous pour acceder a votre parcours.' }, config.product));
    return;
  }

  const store = await readStore(config);
  const snapshot = getModuleSnapshot(store, session.learnerId, moduleId);

  if (!snapshot.ok) {
    sendHtml(res, 403, renderDenied(snapshot.message));
    return;
  }

  await writeStore(config, store);
  sendHtml(res, 200, renderModule(snapshot));
}

async function handleWorksheet(req, res, config, moduleId) {
  const session = getSession(req, config.sessionSecret);

  if (!session) {
    sendHtml(res, 401, renderLogin({ message: 'Connectez-vous pour acceder a votre parcours.' }, config.product));
    return;
  }

  const store = await readStore(config);
  const snapshot = getModuleSnapshot(store, session.learnerId, moduleId);

  if (!snapshot.ok) {
    sendHtml(res, 403, renderDenied(snapshot.message));
    return;
  }

  if (!Array.isArray(snapshot.selectedModule.worksheet.sections)) {
    sendHtml(res, 404, renderDenied("Cette fiche imprimable n'est pas encore disponible dans le parcours."));
    return;
  }

  await writeStore(config, store);
  sendHtml(res, 200, renderWorksheet(snapshot));
}

async function handleLogin(req, res, config) {
  const form = await parseForm(req);
  const email = form.get('email');
  const password = form.get('password');
  const store = await readStore(config);
  const result = authenticateLearner(store, { email, password });

  if (!result.ok) {
    await writeStore(config, store);
    sendHtml(res, 401, renderLogin({ email, message: result.message }, config.product));
    return;
  }

  await writeStore(config, store);
  redirect(res, '/dashboard', {
    'Set-Cookie': serializeCookie(
      SESSION_COOKIE,
      createSessionToken(result.learner.id, config.sessionSecret),
      { maxAge: 60 * 60 * 8 },
    ),
  });
}

async function handleModuleValidation(req, res, config, moduleId) {
  const session = getSession(req, config.sessionSecret);

  if (!session) {
    sendHtml(res, 401, renderLogin({ message: 'Connectez-vous pour acceder a votre parcours.' }, config.product));
    return;
  }

  const form = await parseForm(req);
  const store = await readStore(config);
  const result = validateModuleForLearner(store, session.learnerId, moduleId, {
    confidence: form.get('confidence'),
    exerciseDone: form.get('exerciseDone'),
  });

  if (!result.ok) {
    await writeStore(config, store);

    if (result.selectedModule) {
      sendHtml(res, 422, renderModule(result, { message: result.message }));
      return;
    }

    sendHtml(res, 403, renderDenied(result.message));
    return;
  }

  await writeStore(config, store);
  redirect(res, result.bonusesUnlocked ? '/fin-parcours' : `/modules/${result.currentModule.id}`);
}

async function handleStatic(req, res, url) {
  if (url.pathname !== '/assets/styles.css') {
    send(res, 404, 'Not found', { 'Content-Type': 'text/plain; charset=utf-8' });
    return;
  }

  const css = await fs.readFile(path.join(PUBLIC_DIR, 'styles.css'), 'utf8');
  send(res, 200, css, { 'Content-Type': 'text/css; charset=utf-8' });
}

function createServer(config = getConfig()) {
  const runtimeConfig = resolveRuntimeConfig(config);

  return http.createServer(async (req, res) => {
    try {
      const url = new URL(req.url, 'http://localhost');

      if (req.method === 'GET' && url.pathname === '/health') {
        send(res, 200, JSON.stringify({ ok: true }), { 'Content-Type': 'application/json' });
        return;
      }

      if (req.method === 'GET' && url.pathname.startsWith('/assets/')) {
        await handleStatic(req, res, url);
        return;
      }

      if (req.method === 'GET' && url.pathname === '/') {
        sendHtml(res, 200, renderSalesPage(runtimeConfig.product));
        return;
      }


      if (req.method === 'GET' && url.pathname === '/admin') {
        await handleAdminGet(req, res, runtimeConfig);
        return;
      }

      if (req.method === 'GET' && url.pathname === '/vente') {
        sendHtml(res, 200, renderSalesPage(runtimeConfig.product));
        return;
      }

      if (req.method === 'GET' && url.pathname === '/achat') {
        sendHtml(res, 200, renderPurchaseTunnel(runtimeConfig.product));
        return;
      }

      if (req.method === 'GET' && url.pathname === '/login') {
        sendHtml(res, 200, renderLogin({}, runtimeConfig.product));
        return;
      }

      if (req.method === 'GET' && url.pathname === '/dashboard') {
        await handleDashboard(req, res, runtimeConfig);
        return;
      }

      if (req.method === 'GET' && url.pathname === '/compte') {
        await handleAccount(req, res, runtimeConfig);
        return;
      }

      if (req.method === 'GET' && url.pathname === '/fin-parcours') {
        await handleCompletion(req, res, runtimeConfig);
        return;
      }

      const bonusMatch = url.pathname.match(/^\/bonus\/([^/]+)$/);

      if (req.method === 'GET' && bonusMatch) {
        await handleBonus(req, res, runtimeConfig, decodeURIComponent(bonusMatch[1]));
        return;
      }

      if (req.method === 'GET' && url.pathname === '/accompagnement') {
        await handleAccompaniment(req, res, runtimeConfig);
        return;
      }

      const worksheetMatch = url.pathname.match(/^\/modules\/([^/]+)\/fiche$/);

      if (req.method === 'GET' && worksheetMatch) {
        await handleWorksheet(req, res, runtimeConfig, decodeURIComponent(worksheetMatch[1]));
        return;
      }

      const moduleMatch = url.pathname.match(/^\/modules\/([^/]+)$/);

      if (req.method === 'GET' && moduleMatch) {
        await handleModule(req, res, runtimeConfig, decodeURIComponent(moduleMatch[1]));
        return;
      }


      if (req.method === 'POST' && url.pathname === '/admin/login') {
        await handleAdminLogin(req, res, runtimeConfig);
        return;
      }

      if (req.method === 'POST' && url.pathname === '/admin/logout') {
        redirect(res, '/admin', {
          'Set-Cookie': clearAdminSessionCookie(),
        });
        return;
      }

      if (req.method === 'POST' && url.pathname === '/admin') {
        await handleAdminPost(req, res, runtimeConfig);
        return;
      }

      if (req.method === 'POST' && url.pathname === '/login') {
        await handleLogin(req, res, runtimeConfig);
        return;
      }

      if (req.method === 'POST' && url.pathname === '/compte/mot-de-passe') {
        await handlePasswordChange(req, res, runtimeConfig);
        return;
      }

      const moduleValidationMatch = url.pathname.match(/^\/modules\/([^/]+)\/validate$/);

      if (req.method === 'POST' && moduleValidationMatch) {
        await handleModuleValidation(req, res, runtimeConfig, decodeURIComponent(moduleValidationMatch[1]));
        return;
      }

      if (req.method === 'POST' && url.pathname === '/accompagnement/reservation') {
        await handleAccompanimentValidation(req, res, runtimeConfig, 'appointmentReserved');
        return;
      }

      if (req.method === 'POST' && url.pathname === '/accompagnement/video') {
        await handleAccompanimentValidation(req, res, runtimeConfig, 'videoShared');
        return;
      }

      if (req.method === 'POST' && url.pathname === '/logout') {
        redirect(res, '/login', {
          'Set-Cookie': clearSessionCookie(),
        });
        return;
      }

      send(res, 404, 'Not found', { 'Content-Type': 'text/plain; charset=utf-8' });
    } catch (error) {
      console.error(error);
      sendHtml(res, 500, renderDenied("Une erreur est survenue. Reessayez dans un instant ou contactez le formateur.", runtimeConfig.product));
    }
  });
}

if (require.main === module) {
  const config = getConfig();
  const server = createServer(config);

  server.listen(config.port, () => {
    console.log(`Application PPEP disponible sur http://localhost:${config.port}`);
  });
}

module.exports = {
  createServer,
};
