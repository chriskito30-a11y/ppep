const path = require('node:path');

const DEFAULT_DATA_FILE = path.join(__dirname, '..', 'data', 'learners.json');

const DEFAULT_PRODUCT_CONFIG = {
  name: 'Level Up',
  methodName: 'Méthode Level Up',
  audienceLabel: 'Formation prise de parole en public',
  mainStatement: "La méthode guidée transmet la méthode. L’accompagnement individuel transforme la personne.",
  autonomous: {
    label: 'Méthode guidée',
    priceLabel: '149 euros',
    description: 'Méthode pas à pas, exercices guidés, fiches, validations déclaratives, vidéo de départ, vidéo finale, auto-évaluation et plan d’action final.',
  },
  accompanied: {
    label: 'Parcours accompagné',
    priceLabel: '390 a 690 euros',
    description: 'Accès à la méthode guidée, rendez-vous externe, partage de vidéo externe et regard professionnel simple.',
  },
  cpf: {
    label: 'Accompagnement individuel et personnalisé',
    priceLabel: '1600 euros',
    description: 'Travail individuel approfondi, diagnostic fin, entraînement live et adaptation à une situation réelle.',
  },
  defaultAccessMonths: 12,
  accompanimentBookingUrl: 'https://tidycal.com/levelup/accompagnement',
  supportText: 'Contactez le formateur si votre accès ou votre réservation pose problème.',
  paymentUrl: '/achat',
  loginUrl: '/login',
  commercialWording: 'Une méthode guidée pour préparer une prise de parole claire, structurée et rassurante.',
  offerDistinctionMessage: 'La méthode guidée transmet la méthode. L’accompagnement ajoute un regard professionnel. L’accompagnement individuel personnalisé permet un travail plus profond sur une situation réelle.',
};

function readPositiveInteger(value, fallback) {
  const parsed = Number.parseInt(value, 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

function buildProductConfig(env = process.env) {
  return {
    ...DEFAULT_PRODUCT_CONFIG,
    name: env.LEVELUP_PRODUCT_NAME || DEFAULT_PRODUCT_CONFIG.name,
    accompanimentBookingUrl: env.LEVELUP_TIDYCAL_URL || DEFAULT_PRODUCT_CONFIG.accompanimentBookingUrl,
    defaultAccessMonths: readPositiveInteger(
      env.LEVELUP_DEFAULT_ACCESS_MONTHS,
      DEFAULT_PRODUCT_CONFIG.defaultAccessMonths,
    ),
    supportText: env.LEVELUP_SUPPORT_TEXT || DEFAULT_PRODUCT_CONFIG.supportText,
    paymentUrl: env.LEVELUP_PAYMENT_URL || DEFAULT_PRODUCT_CONFIG.paymentUrl,
    loginUrl: env.LEVELUP_LOGIN_URL || DEFAULT_PRODUCT_CONFIG.loginUrl,
  };
}

function getConfig(env = process.env) {
  const product = buildProductConfig(env);

  return {
    port: Number.parseInt(env.PORT || '3000', 10),
    storageBackend: env.PPEP_STORAGE_BACKEND || 'json',
    dataFile: env.PPEP_DATA_FILE || DEFAULT_DATA_FILE,
    firebaseDatabaseUrl: env.PPEP_FIREBASE_DATABASE_URL || '',
    firebaseServiceAccountJson: env.PPEP_FIREBASE_SERVICE_ACCOUNT_JSON || '',
    firebaseServiceAccountFile: env.PPEP_FIREBASE_SERVICE_ACCOUNT_FILE || '',
    firebaseServiceAccountBase64: env.PPEP_FIREBASE_SERVICE_ACCOUNT_BASE64 || '',
    firebaseStorePath: env.PPEP_FIREBASE_STORE_PATH || 'levelup/learners-store',
    sessionSecret: env.PPEP_SESSION_SECRET || 'ppep-local-dev-secret-change-me',
    adminSecret: env.PPEP_ADMIN_SECRET || '',
    product,
    accompanimentBookingUrl: product.accompanimentBookingUrl,
    defaultAccessMonths: product.defaultAccessMonths,
  };
}

module.exports = {
  DEFAULT_DATA_FILE,
  DEFAULT_PRODUCT_CONFIG,
  buildProductConfig,
  getConfig,
};
