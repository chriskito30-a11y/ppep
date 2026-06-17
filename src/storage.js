const fs = require('node:fs/promises');
const path = require('node:path');

function createEmptyStore() {
  return {
    learners: [],
    progress: [],
  };
}

function normalizeStore(store) {
  return {
    learners: Array.isArray(store?.learners) ? store.learners : [],
    progress: Array.isArray(store?.progress) ? store.progress : [],
  };
}

function resolveStorageTarget(target) {
  if (typeof target === 'string') {
    return {
      backend: 'json',
      dataFile: target,
    };
  }

  const backend = String(target?.storageBackend || 'json').trim().toLowerCase();

  if (!['json', 'firebase'].includes(backend)) {
    throw new Error('STORAGE_BACKEND_INVALID');
  }

  return {
    backend,
    dataFile: target?.dataFile,
    firebaseDatabaseUrl: target?.firebaseDatabaseUrl,
    firebaseServiceAccountJson: target?.firebaseServiceAccountJson,
    firebaseServiceAccountFile: target?.firebaseServiceAccountFile,
    firebaseServiceAccountBase64: target?.firebaseServiceAccountBase64,
    firebaseStorePath: target?.firebaseStorePath || 'levelup/learners-store',
  };
}

async function readJsonStore(filePath) {
  try {
    const raw = await fs.readFile(filePath, 'utf8');
    return normalizeStore(JSON.parse(raw));
  } catch (error) {
    if (error.code === 'ENOENT') {
      const store = createEmptyStore();
      await writeJsonStore(filePath, store);
      return store;
    }

    throw error;
  }
}

async function writeJsonStore(filePath, store) {
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  const temporaryPath = `${filePath}.tmp`;
  await fs.writeFile(temporaryPath, `${JSON.stringify(normalizeStore(store), null, 2)}
`, 'utf8');
  await fs.rename(temporaryPath, filePath);
}

async function loadServiceAccount(target) {
  if (target.firebaseServiceAccountBase64) {
    return JSON.parse(Buffer.from(target.firebaseServiceAccountBase64, 'base64').toString('utf8'));
  }

  if (target.firebaseServiceAccountJson) {
    return JSON.parse(target.firebaseServiceAccountJson);
  }

  if (target.firebaseServiceAccountFile) {
    const raw = await fs.readFile(target.firebaseServiceAccountFile, 'utf8');
    return JSON.parse(raw);
  }

  throw new Error('FIREBASE_SERVICE_ACCOUNT_REQUIRED');
}

let firebaseDatabasePromise;

async function getFirebaseDatabase(target) {
  if (!target.firebaseDatabaseUrl) {
    throw new Error('FIREBASE_DATABASE_URL_REQUIRED');
  }

  if (!firebaseDatabasePromise) {
    firebaseDatabasePromise = (async () => {
      const { cert, getApps, initializeApp } = require('firebase-admin/app');
      const { getDatabase } = require('firebase-admin/database');
      const serviceAccount = await loadServiceAccount(target);
      const app = getApps().find((item) => item.name === 'levelup-storage') || initializeApp({
        credential: cert(serviceAccount),
        databaseURL: target.firebaseDatabaseUrl,
      }, 'levelup-storage');
      return getDatabase(app);
    })();
  }

  return firebaseDatabasePromise;
}

function getFirebaseRef(database, target) {
  return database.ref(target.firebaseStorePath || 'levelup/learners-store');
}

async function readFirebaseStore(target) {
  const database = await getFirebaseDatabase(target);
  const snapshot = await getFirebaseRef(database, target).once('value');
  const value = snapshot.val();

  if (!value) {
    const store = createEmptyStore();
    await writeFirebaseStore(target, store);
    return store;
  }

  return normalizeStore(value);
}

async function writeFirebaseStore(target, store) {
  const database = await getFirebaseDatabase(target);
  await getFirebaseRef(database, target).set(normalizeStore(store));
}

async function readStore(target) {
  const resolved = resolveStorageTarget(target);

  if (resolved.backend === 'firebase') {
    return readFirebaseStore(resolved);
  }

  return readJsonStore(resolved.dataFile);
}

async function writeStore(target, store) {
  const resolved = resolveStorageTarget(target);

  if (resolved.backend === 'firebase') {
    await writeFirebaseStore(resolved, store);
    return;
  }

  await writeJsonStore(resolved.dataFile, store);
}

async function updateStore(target, updater) {
  const store = await readStore(target);
  const result = await updater(store);
  await writeStore(target, store);
  return result;
}

module.exports = {
  createEmptyStore,
  normalizeStore,
  readStore,
  resolveStorageTarget,
  updateStore,
  writeStore,
};
