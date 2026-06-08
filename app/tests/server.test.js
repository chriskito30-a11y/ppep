const assert = require('node:assert/strict');
const fs = require('node:fs/promises');
const os = require('node:os');
const path = require('node:path');
const test = require('node:test');
const { activateLearner } = require('../src/learners');
const { BONUS_ITEMS, CORE_MODULES } = require('../src/modules');
const { createServer } = require('../src/server');
const { createEmptyStore, writeStore } = require('../src/storage');

async function createTempStore() {
  const dir = await fs.mkdtemp(path.join(os.tmpdir(), 'ppep-test-'));
  const dataFile = path.join(dir, 'learners.json');
  const store = createEmptyStore();
  activateLearner(store, {
    email: 'lea@example.com',
    password: 'motdepasse-test',
    plan: 'autonome',
    accessEndsAt: '2026-12-31',
  }, new Date('2026-06-08T12:00:00.000Z'));
  await writeStore(dataFile, store);
  return { dataFile };
}

async function login(baseUrl) {
  const loginResponse = await fetch(`${baseUrl}/login`, {
    method: 'POST',
    body: new URLSearchParams({
      email: 'lea@example.com',
      password: 'motdepasse-test',
    }),
    redirect: 'manual',
  });

  assert.equal(loginResponse.status, 303);
  const cookie = loginResponse.headers.get('set-cookie');
  assert.match(cookie, /ppep_session=/);
  return cookie;
}

function listen(server) {
  return new Promise((resolve) => {
    server.listen(0, () => resolve(server.address().port));
  });
}

async function loginAdmin(baseUrl, secret = 'admin-secret') {
  const response = await fetch(`${baseUrl}/admin/login`, {
    method: 'POST',
    body: new URLSearchParams({ secret }),
    redirect: 'manual',
  });

  assert.equal(response.status, 303);
  assert.equal(response.headers.get('location'), '/admin');
  const cookie = response.headers.get('set-cookie');
  assert.match(cookie, /ppep_admin_session=/);
  assert.doesNotMatch(cookie, /admin-secret/);
  return cookie;
}

test('le tableau de bord affiche module courant, progression, fin acces et bonus verrouilles', async (t) => {
  const { dataFile } = await createTempStore();
  const server = createServer({
    dataFile,
    port: 0,
    sessionSecret: 'test-secret',
  });
  t.after(() => server.close());

  const port = await listen(server);
  const baseUrl = `http://127.0.0.1:${port}`;
  const cookie = await login(baseUrl);

  const dashboardResponse = await fetch(`${baseUrl}/dashboard`, {
    headers: { cookie },
  });
  const html = await dashboardResponse.text();

  assert.equal(dashboardResponse.status, 200);
  assert.match(html, /Module 0 - Video de depart/);
  assert.match(html, /0\/10/);
  assert.match(html, /fin d'acces/);
  assert.match(html, /Verrouille jusqu'a la fin du parcours principal/);
  assert.match(html, /<meta name="viewport"/);

  const cssResponse = await fetch(`${baseUrl}/assets/styles.css`);
  const css = await cssResponse.text();

  assert.equal(cssResponse.status, 200);
  assert.match(css, /@media \(max-width: 760px\)/);
});

test('la page module affiche le gabarit complet du module courant', async (t) => {
  const { dataFile } = await createTempStore();
  const server = createServer({
    dataFile,
    port: 0,
    sessionSecret: 'test-secret',
  });
  t.after(() => server.close());

  const port = await listen(server);
  const baseUrl = `http://127.0.0.1:${port}`;
  const cookie = await login(baseUrl);
  const moduleResponse = await fetch(`${baseUrl}/modules/module-0`, {
    headers: { cookie },
  });
  const html = await moduleResponse.text();

  assert.equal(moduleResponse.status, 200);
  assert.match(html, /Gabarit du module/);
  assert.match(html, /Apport/);
  assert.match(html, /Sources de reference/);
  assert.match(html, /GERER LE TRAC\.pptx/);
  assert.match(html, /A la fin de ce module, j'obtiens/);
  assert.match(html, /Notions cles/);
  assert.match(html, /Duree :/);
  assert.match(html, /Points d observation/);
  assert.match(html, /Exercice/);
  assert.match(html, /Fiche associee/);
  assert.match(html, /href="\/modules\/module-0\/fiche"/);
  assert.match(html, /Auto-evaluation courte/);
  assert.equal((html.match(/name="confidence"/g) || []).length, 3);
  assert.match(html, /Validation declarative/);
  assert.match(html, /Rythme et defi/);
});

test('la fiche imprimable du module courant est accessible au bon moment', async (t) => {
  const { dataFile } = await createTempStore();
  const server = createServer({
    dataFile,
    port: 0,
    sessionSecret: 'test-secret',
  });
  t.after(() => server.close());

  const port = await listen(server);
  const baseUrl = `http://127.0.0.1:${port}`;
  const cookie = await login(baseUrl);
  const worksheetResponse = await fetch(`${baseUrl}/modules/module-0/fiche`, {
    headers: { cookie },
  });
  const html = await worksheetResponse.text();

  assert.equal(worksheetResponse.status, 200);
  assert.match(html, /Fiche de depart papier/);
  assert.match(html, /Sujet choisi/);
  assert.match(html, /Observation bienveillante/);
  assert.match(html, /window.print/);

  const lockedWorksheetResponse = await fetch(`${baseUrl}/modules/module-5/fiche`, {
    headers: { cookie },
  });
  const lockedHtml = await lockedWorksheetResponse.text();

  assert.equal(lockedWorksheetResponse.status, 403);
  assert.match(lockedHtml, /encore verrouille/);

  const cssResponse = await fetch(`${baseUrl}/assets/styles.css`);
  const css = await cssResponse.text();

  assert.match(css, /@media print/);
});

test('la validation d un module debloque le module suivant et persiste la progression', async (t) => {
  const { dataFile } = await createTempStore();
  const server = createServer({
    dataFile,
    port: 0,
    sessionSecret: 'test-secret',
  });
  t.after(() => server.close());

  const port = await listen(server);
  const baseUrl = `http://127.0.0.1:${port}`;
  const cookie = await login(baseUrl);
  const validationResponse = await fetch(`${baseUrl}/modules/module-0/validate`, {
    method: 'POST',
    headers: { cookie },
    body: new URLSearchParams({
      exerciseDone: 'yes',
      confidence: 'pret',
    }),
    redirect: 'manual',
  });

  assert.equal(validationResponse.status, 303);
  assert.equal(validationResponse.headers.get('location'), '/modules/module-1');

  const dashboardResponse = await fetch(`${baseUrl}/dashboard`, {
    headers: { cookie },
  });
  const html = await dashboardResponse.text();

  assert.equal(dashboardResponse.status, 200);
  assert.match(html, /Module 1 - Me comprendre/);
  assert.match(html, /1\/10/);

  const rawStore = JSON.parse(await fs.readFile(dataFile, 'utf8'));
  assert.deepEqual(rawStore.progress[0].completedModuleIds, ['module-0']);
  assert.equal(rawStore.progress[0].currentModuleId, 'module-1');
  assert.equal(rawStore.progress[0].moduleValidations[0].confidence, 'pret');
});

test('un module verrouille est refuse avec un message clair', async (t) => {
  const { dataFile } = await createTempStore();
  const server = createServer({
    dataFile,
    port: 0,
    sessionSecret: 'test-secret',
  });
  t.after(() => server.close());

  const port = await listen(server);
  const baseUrl = `http://127.0.0.1:${port}`;
  const cookie = await login(baseUrl);
  const lockedResponse = await fetch(`${baseUrl}/modules/module-2`, {
    headers: { cookie },
  });
  const html = await lockedResponse.text();

  assert.equal(lockedResponse.status, 403);
  assert.match(html, /encore verrouille/);
});


test('la fin de parcours reste inaccessible avant le dernier module', async (t) => {
  const { dataFile } = await createTempStore();
  const server = createServer({
    dataFile,
    port: 0,
    sessionSecret: 'test-secret',
  });
  t.after(() => server.close());

  const port = await listen(server);
  const baseUrl = `http://127.0.0.1:${port}`;
  const cookie = await login(baseUrl);
  const response = await fetch(`${baseUrl}/fin-parcours`, {
    headers: { cookie },
  });
  const html = await response.text();

  assert.equal(response.status, 403);
  assert.match(html, /disponible apres validation du dernier module/);
});

test('la validation du dernier module ouvre un vrai ecran de fin de parcours', async (t) => {
  const { dataFile } = await createTempStore();
  const server = createServer({
    dataFile,
    port: 0,
    sessionSecret: 'test-secret',
  });
  t.after(() => server.close());

  const port = await listen(server);
  const baseUrl = `http://127.0.0.1:${port}`;
  const cookie = await login(baseUrl);

  for (const module of CORE_MODULES) {
    const validationResponse = await fetch(`${baseUrl}/modules/${module.id}/validate`, {
      method: 'POST',
      headers: { cookie },
      body: new URLSearchParams({
        exerciseDone: 'yes',
        confidence: 'pret',
      }),
      redirect: 'manual',
    });

    assert.equal(validationResponse.status, 303, module.id);

    if (module.id === 'module-9') {
      assert.equal(validationResponse.headers.get('location'), '/fin-parcours');
    }
  }

  const completionResponse = await fetch(`${baseUrl}/fin-parcours`, {
    headers: { cookie },
  });
  const html = await completionResponse.text();

  assert.equal(completionResponse.status, 200);
  assert.match(html, /Fin de parcours/);
  assert.match(html, /Bravo, vous avez construit votre methode/);
  assert.match(html, /Video de depart/);
  assert.match(html, /Video finale/);
  assert.match(html, /Plan d action personnel/);
  assert.match(html, /La plateforme ne les analyse pas et ne les stocke pas/);
  assert.match(html, /Ouvrir ma fiche finale/);
  assert.match(html, /Voir les bonus debloques/);
  assert.match(html, /CPF individuel/);
  assert.doesNotMatch(html, /feedback personnalise automatique|analyse video automatique|upload video/i);
});


test('les bonus sont consultables uniquement apres la fin du parcours principal', async (t) => {
  const { dataFile } = await createTempStore();
  const server = createServer({
    dataFile,
    port: 0,
    sessionSecret: 'test-secret',
  });
  t.after(() => server.close());

  const port = await listen(server);
  const baseUrl = `http://127.0.0.1:${port}`;
  const cookie = await login(baseUrl);
  const firstBonus = BONUS_ITEMS[0];

  const lockedResponse = await fetch(`${baseUrl}/bonus/${firstBonus.id}`, {
    headers: { cookie },
  });
  const lockedHtml = await lockedResponse.text();

  assert.equal(lockedResponse.status, 403);
  assert.match(lockedHtml, /disponibles apres validation du parcours principal/);

  for (const module of CORE_MODULES) {
    await fetch(`${baseUrl}/modules/${module.id}/validate`, {
      method: 'POST',
      headers: { cookie },
      body: new URLSearchParams({
        exerciseDone: 'yes',
        confidence: 'pret',
      }),
      redirect: 'manual',
    });
  }

  const unlockedResponse = await fetch(`${baseUrl}/bonus/${firstBonus.id}`, {
    headers: { cookie },
  });
  const unlockedHtml = await unlockedResponse.text();

  assert.equal(unlockedResponse.status, 200);
  assert.match(unlockedHtml, new RegExp(firstBonus.title));
  assert.match(unlockedHtml, /Astuce simple/);
  assert.match(unlockedHtml, /Exercice court/);
  assert.match(unlockedHtml, /Action a faire/);
  assert.match(unlockedHtml, /ne remplace pas un retour personnalise/);
  assert.doesNotMatch(unlockedHtml, /analyse video automatique|upload video|progression du bonus/i);
});

test('le tableau de bord termine oriente vers le bilan final et affiche les bonus disponibles', async (t) => {
  const { dataFile } = await createTempStore();
  const server = createServer({
    dataFile,
    port: 0,
    sessionSecret: 'test-secret',
  });
  t.after(() => server.close());

  const port = await listen(server);
  const baseUrl = `http://127.0.0.1:${port}`;
  const cookie = await login(baseUrl);

  for (const module of CORE_MODULES) {
    await fetch(`${baseUrl}/modules/${module.id}/validate`, {
      method: 'POST',
      headers: { cookie },
      body: new URLSearchParams({
        exerciseDone: 'yes',
        confidence: 'pret',
      }),
      redirect: 'manual',
    });
  }

  const dashboardResponse = await fetch(`${baseUrl}/dashboard`, {
    headers: { cookie },
  });
  const html = await dashboardResponse.text();

  assert.equal(dashboardResponse.status, 200);
  assert.match(html, /Parcours termine/);
  assert.match(html, /Voir mon bilan final/);
  assert.match(html, /10\/10/);
  assert.match(html, /Disponible jusqu'a la fin du parcours principal/);
});

async function createTempStoreForPlan(plan) {
  const dir = await fs.mkdtemp(path.join(os.tmpdir(), 'ppep-test-'));
  const dataFile = path.join(dir, 'learners.json');
  const store = createEmptyStore();
  activateLearner(store, {
    email: 'lea@example.com',
    password: 'motdepasse-test',
    plan,
    accessEndsAt: '2026-12-31',
  }, new Date('2026-06-08T12:00:00.000Z'));
  await writeStore(dataFile, store);
  return { dataFile };
}

test('le tableau de bord affiche le bloc accompagnement uniquement pour la formule accompagne', async (t) => {
  const autonomous = await createTempStoreForPlan('autonome');
  const autonomousServer = createServer({
    dataFile: autonomous.dataFile,
    port: 0,
    sessionSecret: 'test-secret',
  });
  t.after(() => autonomousServer.close());

  const autonomousPort = await listen(autonomousServer);
  const autonomousBaseUrl = `http://127.0.0.1:${autonomousPort}`;
  const autonomousCookie = await login(autonomousBaseUrl);
  const autonomousResponse = await fetch(`${autonomousBaseUrl}/dashboard`, {
    headers: { cookie: autonomousCookie },
  });
  const autonomousHtml = await autonomousResponse.text();

  assert.equal(autonomousResponse.status, 200);
  assert.doesNotMatch(autonomousHtml, /Ouvrir mon accompagnement/);

  const accompanied = await createTempStoreForPlan('accompagne');
  const accompaniedServer = createServer({
    dataFile: accompanied.dataFile,
    port: 0,
    sessionSecret: 'test-secret',
    accompanimentBookingUrl: 'https://tidycal.test/levelup',
  });
  t.after(() => accompaniedServer.close());

  const accompaniedPort = await listen(accompaniedServer);
  const accompaniedBaseUrl = `http://127.0.0.1:${accompaniedPort}`;
  const accompaniedCookie = await login(accompaniedBaseUrl);
  const accompaniedResponse = await fetch(`${accompaniedBaseUrl}/dashboard`, {
    headers: { cookie: accompaniedCookie },
  });
  const accompaniedHtml = await accompaniedResponse.text();

  assert.equal(accompaniedResponse.status, 200);
  assert.match(accompaniedHtml, /Mon accompagnement/);
  assert.match(accompaniedHtml, /Methode autonome \+ regard professionnel/);
  assert.match(accompaniedHtml, /Ouvrir mon accompagnement/);
});

test('la page accompagnement propose TidyCal, partage video externe et grille de feedback', async (t) => {
  const { dataFile } = await createTempStoreForPlan('accompagne');
  const server = createServer({
    dataFile,
    port: 0,
    sessionSecret: 'test-secret',
    accompanimentBookingUrl: 'https://tidycal.test/levelup',
  });
  t.after(() => server.close());

  const port = await listen(server);
  const baseUrl = `http://127.0.0.1:${port}`;
  const cookie = await login(baseUrl);

  const pageResponse = await fetch(`${baseUrl}/accompagnement`, {
    headers: { cookie },
  });
  const pageHtml = await pageResponse.text();

  assert.equal(pageResponse.status, 200);
  assert.match(pageHtml, /Reserver via TidyCal/);
  assert.match(pageHtml, /https:\/\/tidycal.test\/levelup/);
  assert.match(pageHtml, /service externe/);
  assert.match(pageHtml, /J ai reserve mon rendez-vous/);
  assert.match(pageHtml, /J ai partage ma video/);
  assert.match(pageHtml, /Grille de feedback imprimable/);
  assert.match(pageHtml, /CPF/);
  assert.doesNotMatch(pageHtml, /upload video interne|analyse video automatique/i);

  const reservationResponse = await fetch(`${baseUrl}/accompagnement/reservation`, {
    method: 'POST',
    headers: { cookie },
    redirect: 'manual',
  });
  const videoResponse = await fetch(`${baseUrl}/accompagnement/video`, {
    method: 'POST',
    headers: { cookie },
    redirect: 'manual',
  });

  assert.equal(reservationResponse.status, 303);
  assert.equal(videoResponse.status, 303);

  const rawStore = JSON.parse(await fs.readFile(dataFile, 'utf8'));
  assert.equal(rawStore.progress[0].accompaniment.appointmentReserved, true);
  assert.equal(rawStore.progress[0].accompaniment.videoShared, true);
});


test('admin web : affiche la connexion admin sans secret dans l URL', async (t) => {
  const dir = await fs.mkdtemp(path.join(os.tmpdir(), 'ppep-admin-test-'));
  const dataFile = path.join(dir, 'learners.json');
  await writeStore({ storageBackend: 'json', dataFile }, createEmptyStore());
  const server = createServer({
    storageBackend: 'json',
    dataFile,
    port: 0,
    sessionSecret: 'test-secret',
    adminSecret: 'admin-secret',
  });
  t.after(() => server.close());

  const port = await listen(server);
  const response = await fetch(`http://127.0.0.1:${port}/admin`);
  const html = await response.text();

  assert.equal(response.status, 200);
  assert.match(html, /Connexion admin/);
  assert.match(html, /action="\/admin\/login"/);
  assert.match(html, /Secret admin/);
  assert.doesNotMatch(html, /admin-secret|passwordHash/);
});

test('admin web : creation apprenant avec secret valide, progression initiale et connexion', async (t) => {
  const dir = await fs.mkdtemp(path.join(os.tmpdir(), 'ppep-admin-test-'));
  const dataFile = path.join(dir, 'learners.json');
  await writeStore({ storageBackend: 'json', dataFile }, createEmptyStore());
  const server = createServer({
    storageBackend: 'json',
    dataFile,
    port: 0,
    sessionSecret: 'test-secret',
    adminSecret: 'admin-secret',
  });
  t.after(() => server.close());

  const port = await listen(server);
  const baseUrl = `http://127.0.0.1:${port}`;
  const adminCookie = await loginAdmin(baseUrl);
  const adminResponse = await fetch(`${baseUrl}/admin`, {
    method: 'POST',
    headers: { cookie: adminCookie },
    body: new URLSearchParams({
      email: 'demo@ppep.local',
      password: 'motdepasse-test',
      plan: 'autonome',
      status: 'active',
      accessEndsAt: '2026-12-31',
    }),
  });
  const adminHtml = await adminResponse.text();

  assert.equal(adminResponse.status, 200);
  assert.match(adminHtml, /Apprenant demo@ppep.local enregistre/);
  assert.doesNotMatch(adminHtml, /passwordHash|motdepasse-test/);

  const rawStore = JSON.parse(await fs.readFile(dataFile, 'utf8'));
  assert.equal(rawStore.learners.length, 1);
  assert.equal(rawStore.learners[0].email, 'demo@ppep.local');
  assert.equal(rawStore.learners[0].plan, 'autonome');
  assert.equal(rawStore.learners[0].status, 'active');
  assert.ok(rawStore.learners[0].passwordHash);
  assert.equal(rawStore.progress.length, 1);
  assert.equal(rawStore.progress[0].learnerId, rawStore.learners[0].id);
  assert.equal(rawStore.progress[0].currentModuleId, 'module-0');

  const loginResponse = await fetch(`${baseUrl}/login`, {
    method: 'POST',
    body: new URLSearchParams({
      email: 'demo@ppep.local',
      password: 'motdepasse-test',
    }),
    redirect: 'manual',
  });

  assert.equal(loginResponse.status, 303);
  assert.equal(loginResponse.headers.get('location'), '/dashboard');
});

test('admin web : action refusee sans session admin ne modifie pas le stockage configure', async (t) => {
  const dir = await fs.mkdtemp(path.join(os.tmpdir(), 'ppep-admin-test-'));
  const dataFile = path.join(dir, 'learners.json');
  await writeStore({ storageBackend: 'json', dataFile }, createEmptyStore());
  const server = createServer({
    storageBackend: 'json',
    dataFile,
    port: 0,
    sessionSecret: 'test-secret',
    adminSecret: 'admin-secret',
  });
  t.after(() => server.close());

  const port = await listen(server);
  const response = await fetch(`http://127.0.0.1:${port}/admin`, {
    method: 'POST',
    body: new URLSearchParams({
      email: 'intrus@ppep.local',
      password: 'motdepasse-test',
      plan: 'autonome',
      status: 'active',
      accessEndsAt: '2026-12-31',
    }),
  });
  const html = await response.text();
  const rawStore = JSON.parse(await fs.readFile(dataFile, 'utf8'));

  assert.equal(response.status, 403);
  assert.match(html, /Session admin absente ou expiree/);
  assert.deepEqual(rawStore, { learners: [], progress: [] });
});

test('admin web : le secret en query string ne connecte pas l admin', async (t) => {
  const dir = await fs.mkdtemp(path.join(os.tmpdir(), 'ppep-admin-test-'));
  const dataFile = path.join(dir, 'learners.json');
  await writeStore({ storageBackend: 'json', dataFile }, createEmptyStore());
  const server = createServer({
    storageBackend: 'json',
    dataFile,
    port: 0,
    sessionSecret: 'test-secret',
    adminSecret: 'admin-secret',
  });
  t.after(() => server.close());

  const port = await listen(server);
  const response = await fetch(`http://127.0.0.1:${port}/admin?secret=admin-secret`);
  const html = await response.text();

  assert.equal(response.status, 200);
  assert.match(html, /Connexion admin/);
  assert.doesNotMatch(html, /Gestion des acces apprenants/);
  assert.doesNotMatch(html, /admin-secret|passwordHash/);
});

test('admin web : mauvais secret de connexion admin est refuse', async (t) => {
  const dir = await fs.mkdtemp(path.join(os.tmpdir(), 'ppep-admin-test-'));
  const dataFile = path.join(dir, 'learners.json');
  await writeStore({ storageBackend: 'json', dataFile }, createEmptyStore());
  const server = createServer({
    storageBackend: 'json',
    dataFile,
    port: 0,
    sessionSecret: 'test-secret',
    adminSecret: 'admin-secret',
  });
  t.after(() => server.close());

  const port = await listen(server);
  const response = await fetch(`http://127.0.0.1:${port}/admin/login`, {
    method: 'POST',
    body: new URLSearchParams({ secret: 'mauvais-secret' }),
  });
  const html = await response.text();

  assert.equal(response.status, 403);
  assert.match(html, /secret incorrect/);
  assert.doesNotMatch(html, /mauvais-secret|admin-secret|passwordHash/);
});

test('admin web : deconnexion admin supprime l acces a la liste', async (t) => {
  const dir = await fs.mkdtemp(path.join(os.tmpdir(), 'ppep-admin-test-'));
  const dataFile = path.join(dir, 'learners.json');
  const store = createEmptyStore();
  activateLearner(store, {
    email: 'logout@ppep.local',
    password: 'motdepasse-test',
    plan: 'autonome',
    status: 'active',
    accessEndsAt: '2026-12-31',
  }, new Date('2026-06-08T12:00:00.000Z'));
  await writeStore({ storageBackend: 'json', dataFile }, store);
  const server = createServer({
    storageBackend: 'json',
    dataFile,
    port: 0,
    sessionSecret: 'test-secret',
    adminSecret: 'admin-secret',
  });
  t.after(() => server.close());

  const port = await listen(server);
  const baseUrl = `http://127.0.0.1:${port}`;
  const adminCookie = await loginAdmin(baseUrl);
  const logoutResponse = await fetch(`${baseUrl}/admin/logout`, {
    method: 'POST',
    headers: { cookie: adminCookie },
    redirect: 'manual',
  });

  assert.equal(logoutResponse.status, 303);
  assert.equal(logoutResponse.headers.get('location'), '/admin');
  assert.match(logoutResponse.headers.get('set-cookie'), /ppep_admin_session=; Max-Age=0/);

  const response = await fetch(`${baseUrl}/admin`);
  const html = await response.text();

  assert.equal(response.status, 200);
  assert.match(html, /Connexion admin/);
  assert.doesNotMatch(html, /logout@ppep.local|passwordHash/);
});

test('admin web : liste apprenants visible avec secret valide sans exposer les hashes', async (t) => {
  const dir = await fs.mkdtemp(path.join(os.tmpdir(), 'ppep-admin-test-'));
  const dataFile = path.join(dir, 'learners.json');
  const store = createEmptyStore();
  const learner = activateLearner(store, {
    email: 'liste@ppep.local',
    password: 'motdepasse-test',
    plan: 'accompagne',
    status: 'active',
    accessEndsAt: '2026-12-31',
  }, new Date('2026-06-08T12:00:00.000Z'));
  store.progress[0].completedModuleIds = ['module-0', 'module-1'];
  await writeStore({ storageBackend: 'json', dataFile }, store);
  const server = createServer({
    storageBackend: 'json',
    dataFile,
    port: 0,
    sessionSecret: 'test-secret',
    adminSecret: 'admin-secret',
  });
  t.after(() => server.close());

  const port = await listen(server);
  const baseUrl = `http://127.0.0.1:${port}`;
  const adminCookie = await loginAdmin(baseUrl);
  const response = await fetch(`${baseUrl}/admin`, {
    headers: { cookie: adminCookie },
  });
  const html = await response.text();

  assert.equal(response.status, 200);
  assert.match(html, /Gestion des acces apprenants/);
  assert.match(html, /liste@ppep.local/);
  assert.match(html, /accompagne/);
  assert.match(html, /active/);
  assert.match(html, /2026-12-31/);
  assert.match(html, /2\/10/);
  assert.match(html, /Filtrer par email/);
  assert.match(html, /Modifier/);
  assert.doesNotMatch(html, /passwordHash/);
  assert.doesNotMatch(html, new RegExp(learner.passwordHash.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
});

test('admin web : modification formule statut date sans changer le mot de passe', async (t) => {
  const dir = await fs.mkdtemp(path.join(os.tmpdir(), 'ppep-admin-test-'));
  const dataFile = path.join(dir, 'learners.json');
  const store = createEmptyStore();
  const learner = activateLearner(store, {
    email: 'modifier@ppep.local',
    password: 'motdepasse-test',
    plan: 'autonome',
    status: 'active',
    accessEndsAt: '2026-12-31',
  }, new Date('2026-06-08T12:00:00.000Z'));
  const originalHash = learner.passwordHash;
  await writeStore({ storageBackend: 'json', dataFile }, store);
  const server = createServer({
    storageBackend: 'json',
    dataFile,
    port: 0,
    sessionSecret: 'test-secret',
    adminSecret: 'admin-secret',
  });
  t.after(() => server.close());

  const port = await listen(server);
  const baseUrl = `http://127.0.0.1:${port}`;
  const adminCookie = await loginAdmin(baseUrl);
  const response = await fetch(`${baseUrl}/admin`, {
    method: 'POST',
    headers: { cookie: adminCookie },
    body: new URLSearchParams({
      action: 'save',
      email: 'modifier@ppep.local',
      password: '',
      plan: 'accompagne',
      status: 'expired',
      accessEndsAt: '2027-01-31',
    }),
  });
  const html = await response.text();
  const rawStore = JSON.parse(await fs.readFile(dataFile, 'utf8'));

  assert.equal(response.status, 200);
  assert.match(html, /Apprenant modifier@ppep.local enregistre/);
  assert.equal(rawStore.learners.length, 1);
  assert.equal(rawStore.learners[0].plan, 'accompagne');
  assert.equal(rawStore.learners[0].status, 'expired');
  assert.equal(rawStore.learners[0].accessEndsAt, '2027-01-31');
  assert.equal(rawStore.learners[0].passwordHash, originalHash);
});

test('admin web : desactivation d un apprenant existant', async (t) => {
  const dir = await fs.mkdtemp(path.join(os.tmpdir(), 'ppep-admin-test-'));
  const dataFile = path.join(dir, 'learners.json');
  const store = createEmptyStore();
  activateLearner(store, {
    email: 'desactiver@ppep.local',
    password: 'motdepasse-test',
    plan: 'autonome',
    status: 'active',
    accessEndsAt: '2026-12-31',
  }, new Date('2026-06-08T12:00:00.000Z'));
  await writeStore({ storageBackend: 'json', dataFile }, store);
  const server = createServer({
    storageBackend: 'json',
    dataFile,
    port: 0,
    sessionSecret: 'test-secret',
    adminSecret: 'admin-secret',
  });
  t.after(() => server.close());

  const port = await listen(server);
  const baseUrl = `http://127.0.0.1:${port}`;
  const adminCookie = await loginAdmin(baseUrl);
  const response = await fetch(`${baseUrl}/admin`, {
    method: 'POST',
    headers: { cookie: adminCookie },
    body: new URLSearchParams({
      action: 'deactivate',
      email: 'desactiver@ppep.local',
      password: '',
      plan: 'autonome',
      status: 'active',
      accessEndsAt: '2026-12-31',
    }),
  });
  const html = await response.text();
  const rawStore = JSON.parse(await fs.readFile(dataFile, 'utf8'));

  assert.equal(response.status, 200);
  assert.match(html, /Acces de desactiver@ppep.local desactive/);
  assert.equal(rawStore.learners[0].status, 'inactive');

  const loginResponse = await fetch(`${baseUrl}/login`, {
    method: 'POST',
    body: new URLSearchParams({
      email: 'desactiver@ppep.local',
      password: 'motdepasse-test',
    }),
    redirect: 'manual',
  });
  const loginHtml = await loginResponse.text();

  assert.equal(loginResponse.status, 401);
  assert.match(loginHtml, /pas active/);
});

test('admin web : reinitialisation mot de passe puis connexion avec le nouveau mot de passe', async (t) => {
  const dir = await fs.mkdtemp(path.join(os.tmpdir(), 'ppep-admin-test-'));
  const dataFile = path.join(dir, 'learners.json');
  const store = createEmptyStore();
  const learner = activateLearner(store, {
    email: 'reset@ppep.local',
    password: 'ancien-motdepasse',
    plan: 'autonome',
    status: 'active',
    accessEndsAt: '2026-12-31',
  }, new Date('2026-06-08T12:00:00.000Z'));
  const originalHash = learner.passwordHash;
  await writeStore({ storageBackend: 'json', dataFile }, store);
  const server = createServer({
    storageBackend: 'json',
    dataFile,
    port: 0,
    sessionSecret: 'test-secret',
    adminSecret: 'admin-secret',
  });
  t.after(() => server.close());

  const port = await listen(server);
  const baseUrl = `http://127.0.0.1:${port}`;
  const adminCookie = await loginAdmin(baseUrl);
  const adminResponse = await fetch(`${baseUrl}/admin`, {
    method: 'POST',
    headers: { cookie: adminCookie },
    body: new URLSearchParams({
      action: 'reset_password',
      email: 'reset@ppep.local',
      password: 'nouveau-motdepasse',
      plan: 'autonome',
      status: 'active',
      accessEndsAt: '2026-12-31',
    }),
  });
  const adminHtml = await adminResponse.text();
  const rawStore = JSON.parse(await fs.readFile(dataFile, 'utf8'));

  assert.equal(adminResponse.status, 200);
  assert.match(adminHtml, /Mot de passe de reset@ppep.local reinitialise/);
  assert.notEqual(rawStore.learners[0].passwordHash, originalHash);
  assert.doesNotMatch(adminHtml, /passwordHash|nouveau-motdepasse/);

  const oldLogin = await fetch(`${baseUrl}/login`, {
    method: 'POST',
    body: new URLSearchParams({
      email: 'reset@ppep.local',
      password: 'ancien-motdepasse',
    }),
    redirect: 'manual',
  });
  assert.equal(oldLogin.status, 401);

  const newLogin = await fetch(`${baseUrl}/login`, {
    method: 'POST',
    body: new URLSearchParams({
      email: 'reset@ppep.local',
      password: 'nouveau-motdepasse',
    }),
    redirect: 'manual',
  });
  assert.equal(newLogin.status, 303);
  assert.equal(newLogin.headers.get('location'), '/dashboard');
});
