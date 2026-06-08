const path = require('node:path');

const DEFAULT_DATA_FILE = path.join(__dirname, '..', 'data', 'learners.json');

const DEFAULT_PRODUCT_CONFIG = {
  name: 'Level Up',
  methodName: 'Methode Level Up',
  audienceLabel: 'Formation prise de parole en public',
  mainStatement: "La formule autonome transmet la methode. L'accompagnement individuel transforme la personne.",
  autonomous: {
    label: 'Methode autonome',
    priceLabel: '149 euros',
    description: 'Parcours pas a pas, exercices guides, fiches, validations declaratives, video de depart, video finale, auto-evaluation et plan d action final.',
  },
  accompanied: {
    label: 'Parcours accompagne',
    priceLabel: '390 a 690 euros',
    description: 'Acces au parcours autonome, rendez-vous externe, partage de video externe et regard professionnel simple.',
  },
  cpf: {
    label: 'Formation CPF individuelle 14h',
    priceLabel: '1600 euros',
    description: 'Travail individuel approfondi, diagnostic fin, entrainement live et adaptation a un cas professionnel reel.',
  },
  defaultAccessMonths: 12,
  accompanimentBookingUrl: 'https://tidycal.com/levelup/accompagnement',
  supportText: 'Contactez le formateur si votre acces ou votre reservation pose probleme.',
  commercialWording: 'Une methode guidee pour preparer une prise de parole claire, structuree et rassurante.',
  offerDistinctionMessage: 'L autonome transmet la methode. L accompagne ajoute un regard professionnel. Le CPF travaille en profondeur sur une situation individuelle.',
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
