const fs = require('node:fs/promises');
const http = require('node:http');
const path = require('node:path');
const { getConfig } = require('./config');
const { getBonusById } = require('./modules');
const {
  authenticateLearner,
  getLearnerSnapshot,
  getModuleSnapshot,
  markAccompanimentStep,
  validateModuleForLearner,
} = require('./learners');
const {
  renderDashboard,
  renderCompletion,
  renderAccompaniment,
  renderBonus,
  renderDenied,
  renderLogin,
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
        redirect(res, '/dashboard');
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

      if (req.method === 'POST' && url.pathname === '/login') {
        await handleLogin(req, res, runtimeConfig);
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
