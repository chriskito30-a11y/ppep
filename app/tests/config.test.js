const assert = require('node:assert/strict');
const test = require('node:test');
const { buildProductConfig, getConfig } = require('../src/config');
const { getDefaultAccessEndDate, toActivationInput } = require('../src/admin-cli');

test('la configuration produit centralise les valeurs commerciales principales', () => {
  const product = buildProductConfig({
    LEVELUP_TIDYCAL_URL: 'https://tidycal.test/levelup',
    LEVELUP_DEFAULT_ACCESS_MONTHS: '6',
    LEVELUP_SUPPORT_TEXT: 'support test',
  });

  assert.equal(product.name, 'Level Up');
  assert.equal(product.autonomous.priceLabel, '149 euros');
  assert.equal(product.accompanied.priceLabel, '390 a 690 euros');
  assert.equal(product.cpf.priceLabel, '1600 euros');
  assert.equal(product.accompanimentBookingUrl, 'https://tidycal.test/levelup');
  assert.equal(product.defaultAccessMonths, 6);
  assert.equal(product.supportText, 'support test');
  assert.match(product.mainStatement, /autonome transmet la méthode/);
});

test('getConfig expose les anciens alias utiles sans dupliquer les valeurs', () => {
  const config = getConfig({
    PORT: '4000',
    PPEP_DATA_FILE: '/tmp/learners.json',
    PPEP_SESSION_SECRET: 'secret',
    PPEP_ADMIN_SECRET: 'admin-secret',
    LEVELUP_TIDYCAL_URL: 'https://tidycal.test/custom',
  });

  assert.equal(config.port, 4000);
  assert.equal(config.product.accompanimentBookingUrl, 'https://tidycal.test/custom');
  assert.equal(config.accompanimentBookingUrl, config.product.accompanimentBookingUrl);
  assert.equal(config.defaultAccessMonths, config.product.defaultAccessMonths);
  assert.equal(config.adminSecret, 'admin-secret');
});

test('le CLI admin peut appliquer la duree d acces par defaut configuree', () => {
  const accessEndsAt = getDefaultAccessEndDate(2, new Date('2026-06-08T12:00:00.000Z'));
  const input = toActivationInput({ email: 'lea@example.com', password: 'motdepasse-test' }, {
    defaultAccessMonths: 2,
  });

  assert.equal(accessEndsAt, '2026-08-08');
  assert.match(input.accessEndsAt, /^\d{4}-\d{2}-\d{2}$/);
});

const { resolveStorageTarget } = require('../src/storage');

test('getConfig expose le choix de backend de stockage sans casser le JSON local', () => {
  const jsonConfig = getConfig({ PPEP_DATA_FILE: '/tmp/local-learners.json' });
  assert.equal(jsonConfig.storageBackend, 'json');
  assert.equal(jsonConfig.dataFile, '/tmp/local-learners.json');

  const firebaseConfig = getConfig({
    PPEP_STORAGE_BACKEND: 'firebase',
    PPEP_FIREBASE_DATABASE_URL: 'https://levelup-test.firebaseio.com',
    PPEP_FIREBASE_SERVICE_ACCOUNT_JSON: '{"project_id":"levelup-test"}',
    PPEP_FIREBASE_STORE_PATH: 'beta/learners-store',
  });

  assert.equal(firebaseConfig.storageBackend, 'firebase');
  assert.equal(firebaseConfig.firebaseDatabaseUrl, 'https://levelup-test.firebaseio.com');
  assert.equal(firebaseConfig.firebaseServiceAccountJson, '{"project_id":"levelup-test"}');
  assert.equal(firebaseConfig.firebaseStorePath, 'beta/learners-store');
});

test('resolveStorageTarget conserve la compatibilite avec les appels historiques par chemin fichier', () => {
  assert.deepEqual(resolveStorageTarget('/tmp/learners.json'), {
    backend: 'json',
    dataFile: '/tmp/learners.json',
  });

  assert.deepEqual(resolveStorageTarget({
    storageBackend: 'firebase',
    firebaseDatabaseUrl: 'https://levelup-test.firebaseio.com',
    firebaseStorePath: 'beta/learners-store',
  }), {
    backend: 'firebase',
    dataFile: undefined,
    firebaseDatabaseUrl: 'https://levelup-test.firebaseio.com',
    firebaseServiceAccountJson: undefined,
    firebaseServiceAccountFile: undefined,
    firebaseServiceAccountBase64: undefined,
    firebaseStorePath: 'beta/learners-store',
  });
});
