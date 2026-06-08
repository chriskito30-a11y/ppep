const crypto = require('node:crypto');
const { getConfig } = require('./config');
const { activateLearner } = require('./learners');
const { updateStore } = require('./storage');

function parseArgs(argv) {
  const [command, ...rest] = argv;
  const options = { command };

  for (let index = 0; index < rest.length; index += 1) {
    const token = rest[index];

    if (!token.startsWith('--')) {
      continue;
    }

    const key = token.slice(2);
    const next = rest[index + 1];

    if (!next || next.startsWith('--')) {
      options[key] = true;
      continue;
    }

    options[key] = next;
    index += 1;
  }

  return options;
}

function printHelp(config = getConfig()) {
  console.log(`Usage:
  node src/admin-cli.js activate --email lea@example.com --password "mot-de-passe" --plan autonome --access-ends-at 2026-12-31

Options:
  --email             Email de l'apprenant.
  --password          Mot de passe initial, 8 caracteres minimum. Genere si absent.
  --plan              autonome ou accompagne. Par defaut: autonome. Ancienne valeur accompagnee acceptee.
  --access-ends-at    Date de fin d'acces, format YYYY-MM-DD. Si absent: aujourd'hui + ${config.defaultAccessMonths} mois.
  --status            active, inactive ou expired. Par defaut: active.`);
}

function getDefaultAccessEndDate(months, now = new Date()) {
  const date = new Date(now);
  date.setMonth(date.getMonth() + months);
  return date.toISOString().slice(0, 10);
}

function toActivationInput(options, config = getConfig()) {
  return {
    email: options.email,
    password: options.password || crypto.randomBytes(9).toString('base64url'),
    plan: options.plan || 'autonome',
    accessEndsAt: options['access-ends-at'] || getDefaultAccessEndDate(config.defaultAccessMonths),
    status: options.status || 'active',
  };
}

async function main(argv = process.argv.slice(2), env = process.env) {
  const options = parseArgs(argv);

  if (options.command !== 'activate' || options.help) {
    printHelp(getConfig(env));
    return;
  }

  const config = getConfig(env);
  const input = toActivationInput(options, config);
  const learner = await updateStore(config, (store) => activateLearner(store, input));

  console.log('Apprenant active avec succes.');
  console.log(`Email: ${learner.email}`);
  console.log(`Formule: ${learner.plan}`);
  console.log(`Statut: ${learner.status}`);
  console.log(`Fin d'acces: ${learner.accessEndsAt}`);

  if (!options.password) {
    console.log(`Mot de passe initial genere: ${input.password}`);
  }
}

if (require.main === module) {
  main().catch((error) => {
    const messages = {
      ACCESS_END_INVALID: "La date de fin d'acces est invalide.",
      ACCESS_END_REQUIRED: "La date de fin d'acces est obligatoire.",
      EMAIL_INVALID: "L'email est obligatoire et doit etre valide.",
      PASSWORD_REQUIRED: 'Un mot de passe initial est obligatoire.',
      PASSWORD_TOO_SHORT: 'Le mot de passe doit contenir au moins 8 caracteres.',
      PLAN_INVALID: 'La formule doit etre autonome ou accompagne.',
      STATUS_INVALID: 'Le statut doit etre active, inactive ou expired.',
    };

    console.error(messages[error.message] || "Impossible d'activer l'apprenant.");
    process.exitCode = 1;
  });
}

module.exports = {
  main,
  getDefaultAccessEndDate,
  parseArgs,
  toActivationInput,
};
