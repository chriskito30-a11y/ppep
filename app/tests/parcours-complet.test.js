const assert = require('node:assert/strict');
const fs = require('node:fs/promises');
const os = require('node:os');
const path = require('node:path');
const test = require('node:test');
const { activateLearner } = require('../src/learners');
const { BONUS_ITEMS, CORE_MODULES } = require('../src/modules');
const { createServer } = require('../src/server');
const { SESSION_COOKIE, createSessionToken } = require('../src/security');
const { createEmptyStore, writeStore } = require('../src/storage');

const ACTIVE_ACCESS_END = '2026-12-31';
const TEST_NOW = new Date('2026-06-08T12:00:00.000Z');

async function createTempStore({
  email = 'lea@example.com',
  password = 'motdepasse-test',
  plan = 'autonome',
  status = 'active',
  accessEndsAt = ACTIVE_ACCESS_END,
} = {}) {
  const dir = await fs.mkdtemp(path.join(os.tmpdir(), 'levelup-parcours-test-'));
  const dataFile = path.join(dir, 'learners.json');
  const store = createEmptyStore();
  const learner = activateLearner(store, {
    email,
    password,
    plan,
    status,
    accessEndsAt,
  }, TEST_NOW);
  await writeStore(dataFile, store);
  return { dataFile, learner, email, password };
}

function listen(server) {
  return new Promise((resolve) => {
    server.listen(0, () => resolve(server.address().port));
  });
}

async function startServer(t, options = {}, config = {}) {
  const temp = await createTempStore(options);
  const server = createServer({
    dataFile: temp.dataFile,
    port: 0,
    sessionSecret: 'test-secret',
    accompanimentBookingUrl: 'https://tidycal.test/levelup',
    ...config,
  });
  t.after(() => server.close());
  const port = await listen(server);
  return {
    ...temp,
    baseUrl: `http://127.0.0.1:${port}`,
  };
}

async function login(baseUrl, { email = 'lea@example.com', password = 'motdepasse-test' } = {}) {
  const response = await fetch(`${baseUrl}/login`, {
    method: 'POST',
    body: new URLSearchParams({ email, password }),
    redirect: 'manual',
  });
  return response;
}

async function loginAndGetCookie(baseUrl, credentials = {}) {
  const response = await login(baseUrl, credentials);
  assert.equal(response.status, 303);
  const cookie = response.headers.get('set-cookie');
  assert.match(cookie, /ppep_session=/);
  return cookie;
}

async function getHtml(url, cookie) {
  const response = await fetch(url, { headers: { cookie } });
  const html = await response.text();
  return { response, html };
}

async function postModuleValidation(baseUrl, cookie, moduleId, options = {}) {
  return fetch(`${baseUrl}/modules/${moduleId}/validate`, {
    method: 'POST',
    headers: { cookie },
    body: new URLSearchParams({
      exerciseDone: 'yes',
      confidence: 'pret',
      ...options,
    }),
    redirect: 'manual',
  });
}

test('parcours complet autonome : verrouillage initial, validation progressive, bilan final et bonus', async (t) => {
  const { baseUrl, dataFile } = await startServer(t, { plan: 'autonome' });
  const cookie = await loginAndGetCookie(baseUrl);
  const firstBonus = BONUS_ITEMS[0];

  const initialDashboard = await getHtml(`${baseUrl}/dashboard`, cookie);
  assert.equal(initialDashboard.response.status, 200);
  assert.match(initialDashboard.html, /Module 0 - Démarrage/);
  assert.match(initialDashboard.html, /0\/13/);
  assert.match(initialDashboard.html, /formule/);
  assert.match(initialDashboard.html, /autonome/);
  assert.match(initialDashboard.html, /verrouillés jusqu’à la fin du parcours principal|Verrouillé jusqu’à la fin du parcours principal/);
  assert.doesNotMatch(initialDashboard.html, /Mon accompagnement/);

  const lockedModule = await getHtml(`${baseUrl}/modules/module-1`, cookie);
  assert.equal(lockedModule.response.status, 403);
  assert.match(lockedModule.html, /encore verrouillé/);

  const lockedWorksheet = await getHtml(`${baseUrl}/modules/module-1/fiche`, cookie);
  assert.equal(lockedWorksheet.response.status, 403);
  assert.match(lockedWorksheet.html, /encore verrouillé/);

  const lockedCompletion = await getHtml(`${baseUrl}/fin-parcours`, cookie);
  assert.equal(lockedCompletion.response.status, 403);
  assert.match(lockedCompletion.html, /disponible après validation du dernier module/);

  const lockedBonus = await getHtml(`${baseUrl}/bonus/${firstBonus.id}`, cookie);
  assert.equal(lockedBonus.response.status, 403);
  assert.match(lockedBonus.html, /disponibles après validation du parcours principal|disponibles apres validation du parcours principal/);

  const refusedAccompanimentPost = await fetch(`${baseUrl}/accompagnement/reservation`, {
    method: 'POST',
    headers: { cookie },
    redirect: 'manual',
  });
  const refusedAccompanimentHtml = await refusedAccompanimentPost.text();
  assert.equal(refusedAccompanimentPost.status, 403);
  assert.match(refusedAccompanimentHtml, /réservée aux apprenants du parcours accompagné/);

  for (let index = 0; index < CORE_MODULES.length; index += 1) {
    const module = CORE_MODULES[index];
    const modulePage = await getHtml(`${baseUrl}/modules/${module.id}`, cookie);
    assert.equal(modulePage.response.status, 200, module.id);
    assert.match(modulePage.html, new RegExp(`Module ${index}`));
    assert.match(modulePage.html, /Fiche associée/);
    assert.match(modulePage.html, /Validation déclarative/);
    assert.doesNotMatch(modulePage.html, /\.pptx/);
    assert.doesNotMatch(modulePage.html, /\.pdf/);

    const worksheet = await getHtml(`${baseUrl}/modules/${module.id}/fiche`, cookie);
    assert.equal(worksheet.response.status, 200, module.id);
    assert.match(worksheet.html, /Fiche de travail/);
    assert.match(worksheet.html, /La plateforme ne stocke pas vos réponses longues/);
    assert.doesNotMatch(worksheet.html, /Source modernisée/);
    assert.doesNotMatch(worksheet.html, /\.pptx/);
    assert.doesNotMatch(worksheet.html, /\.pdf/);

    if (index + 1 < CORE_MODULES.length) {
      const futureModule = CORE_MODULES[index + 1];
      const futureModulePage = await getHtml(`${baseUrl}/modules/${futureModule.id}`, cookie);
      assert.equal(futureModulePage.response.status, 403, futureModule.id);
    }

    const validation = await postModuleValidation(baseUrl, cookie, module.id);
    assert.equal(validation.status, 303, module.id);
    assert.equal(
      validation.headers.get('location'),
      index === CORE_MODULES.length - 1 ? '/fin-parcours' : `/modules/${CORE_MODULES[index + 1].id}`,
      module.id,
    );
  }

  const finalDashboard = await getHtml(`${baseUrl}/dashboard`, cookie);
  assert.equal(finalDashboard.response.status, 200);
  assert.match(finalDashboard.html, /Parcours terminé/);
  assert.match(finalDashboard.html, /13\/13/);
  assert.match(finalDashboard.html, /Voir mon bilan final/);
  assert.match(finalDashboard.html, /Ouvrir ce bonus/);

  const completion = await getHtml(`${baseUrl}/fin-parcours`, cookie);
  assert.equal(completion.response.status, 200);
  assert.match(completion.html, /vidéo de départ|Vidéo de départ/);
  assert.match(completion.html, /Vidéo finale/);
  assert.match(completion.html, /Auto-évaluation finale/);
  assert.match(completion.html, /Plan d’action personnel/);
  assert.match(completion.html, /Voir les bonus débloqués/);

  const unlockedBonus = await getHtml(`${baseUrl}/bonus/${firstBonus.id}`, cookie);
  assert.equal(unlockedBonus.response.status, 200);
  assert.match(unlockedBonus.html, /Bonus court/);
  assert.match(unlockedBonus.html, /Astuce simple/);
  assert.match(unlockedBonus.html, /Exercice court/);
  assert.match(unlockedBonus.html, /Action à faire|Action a faire/);

  const missingBonus = await getHtml(`${baseUrl}/bonus/bonus-inconnu`, cookie);
  assert.equal(missingBonus.response.status, 403);
  assert.match(missingBonus.html, /n existe pas/);

  const rawStore = JSON.parse(await fs.readFile(dataFile, 'utf8'));
  assert.deepEqual(rawStore.progress[0].completedModuleIds, CORE_MODULES.map((module) => module.id));
  assert.equal(rawStore.progress[0].moduleValidations.length, CORE_MODULES.length);
  assert.equal(rawStore.progress[0].accompaniment, undefined);
});

test('parcours complet accompagne : bloc dedie, TidyCal, validations declarees et fin de parcours identique', async (t) => {
  const { baseUrl, dataFile } = await startServer(t, { plan: 'accompagne' });
  const cookie = await loginAndGetCookie(baseUrl);

  const dashboard = await getHtml(`${baseUrl}/dashboard`, cookie);
  assert.equal(dashboard.response.status, 200);
  assert.match(dashboard.html, /Mon accompagnement/);
  assert.match(dashboard.html, /Méthode autonome \+ regard professionnel/);
  assert.match(dashboard.html, /Rendez-vous à réserver/);
  assert.match(dashboard.html, /Vidéo à partager/);

  const accompaniment = await getHtml(`${baseUrl}/accompagnement`, cookie);
  assert.equal(accompaniment.response.status, 200);
  assert.match(accompaniment.html, /https:\/\/tidycal.test\/levelup/);
  assert.match(accompaniment.html, /J’ai réservé mon rendez-vous|J ai reserve mon rendez-vous/);
  assert.match(accompaniment.html, /J’ai partagé ma vidéo|J ai partage ma video/);
  assert.match(accompaniment.html, /Grille de feedback imprimable/);
  assert.doesNotMatch(accompaniment.html, /upload video interne|analyse video automatique/i);

  const reservation = await fetch(`${baseUrl}/accompagnement/reservation`, {
    method: 'POST',
    headers: { cookie },
    redirect: 'manual',
  });
  assert.equal(reservation.status, 303);
  assert.equal(reservation.headers.get('location'), '/accompagnement');

  const video = await fetch(`${baseUrl}/accompagnement/video`, {
    method: 'POST',
    headers: { cookie },
    redirect: 'manual',
  });
  assert.equal(video.status, 303);
  assert.equal(video.headers.get('location'), '/accompagnement');

  const updatedAccompaniment = await getHtml(`${baseUrl}/accompagnement`, cookie);
  assert.equal(updatedAccompaniment.response.status, 200);
  assert.match(updatedAccompaniment.html, /rendez-vous déclaré réservé|rendez-vous declare reserve/);
  assert.match(updatedAccompaniment.html, /vidéo déclarée partagée|video declaree partagee/);

  for (const module of CORE_MODULES) {
    const validation = await postModuleValidation(baseUrl, cookie, module.id);
    assert.equal(validation.status, 303, module.id);
  }

  const completion = await getHtml(`${baseUrl}/fin-parcours`, cookie);
  assert.equal(completion.response.status, 200);
  assert.match(completion.html, /Bravo, vous avez construit votre méthode/);
  assert.match(completion.html, /Envisager l’accompagné/);
  assert.match(completion.html, /CPF individuel/);

  const bonus = await getHtml(`${baseUrl}/bonus/${BONUS_ITEMS[0].id}`, cookie);
  assert.equal(bonus.response.status, 200);
  assert.match(bonus.html, /Bonus actionnable/);

  const finalDashboard = await getHtml(`${baseUrl}/dashboard`, cookie);
  assert.equal(finalDashboard.response.status, 200);
  assert.match(finalDashboard.html, /Parcours terminé/);
  assert.match(finalDashboard.html, /Rendez-vous réservé/);
  assert.match(finalDashboard.html, /Vidéo partagée/);

  const rawStore = JSON.parse(await fs.readFile(dataFile, 'utf8'));
  assert.equal(rawStore.learners[0].plan, 'accompagne');
  assert.equal(rawStore.progress[0].accompaniment.appointmentReserved, true);
  assert.equal(rawStore.progress[0].accompaniment.videoShared, true);
  assert.equal(rawStore.progress[0].moduleValidations.length, CORE_MODULES.length);
});

test('acces inactif ou expire : connexion refusee et ancienne session nettoyee', async (t) => {
  const inactive = await startServer(t, {
    email: 'inactive@example.com',
    password: 'motdepasse-test',
    status: 'inactive',
  });
  const inactiveLogin = await login(inactive.baseUrl, {
    email: 'inactive@example.com',
    password: 'motdepasse-test',
  });
  const inactiveLoginHtml = await inactiveLogin.text();
  assert.equal(inactiveLogin.status, 401);
  assert.match(inactiveLoginHtml, /pas activé/);

  const inactiveCookie = `${SESSION_COOKIE}=${createSessionToken(inactive.learner.id, 'test-secret')}`;
  const inactiveDashboard = await fetch(`${inactive.baseUrl}/dashboard`, {
    headers: { cookie: inactiveCookie },
  });
  const inactiveDashboardHtml = await inactiveDashboard.text();
  assert.equal(inactiveDashboard.status, 403);
  assert.match(inactiveDashboardHtml, /pas activé/);
  assert.match(inactiveDashboard.headers.get('set-cookie'), new RegExp(`${SESSION_COOKIE}=`));

  const expired = await startServer(t, {
    email: 'expired@example.com',
    password: 'motdepasse-test',
    accessEndsAt: '2020-01-01',
  });
  const expiredLogin = await login(expired.baseUrl, {
    email: 'expired@example.com',
    password: 'motdepasse-test',
  });
  const expiredLoginHtml = await expiredLogin.text();
  assert.equal(expiredLogin.status, 401);
  assert.match(expiredLoginHtml, /expiration/);

  const expiredCookie = `${SESSION_COOKIE}=${createSessionToken(expired.learner.id, 'test-secret')}`;
  const expiredDashboard = await fetch(`${expired.baseUrl}/dashboard`, {
    headers: { cookie: expiredCookie },
  });
  const expiredDashboardHtml = await expiredDashboard.text();
  assert.equal(expiredDashboard.status, 403);
  assert.match(expiredDashboardHtml, /expiration/);
  assert.match(expiredDashboard.headers.get('set-cookie'), new RegExp(`${SESSION_COOKIE}=`));
});
