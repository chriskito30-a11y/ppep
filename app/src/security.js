const crypto = require('node:crypto');

const PASSWORD_ALGORITHM = 'scrypt';
const SESSION_COOKIE = 'ppep_session';
const SESSION_MAX_AGE_MS = 1000 * 60 * 60 * 8;

function normalizeEmail(email) {
  return String(email || '').trim().toLowerCase();
}

function hashPassword(password, salt = crypto.randomBytes(16).toString('hex')) {
  const value = String(password || '');

  if (value.length < 8) {
    throw new Error('PASSWORD_TOO_SHORT');
  }

  const hash = crypto.scryptSync(value, salt, 64).toString('hex');
  return `${PASSWORD_ALGORITHM}$${salt}$${hash}`;
}

function verifyPassword(password, storedPassword) {
  const [algorithm, salt, hash] = String(storedPassword || '').split('$');

  if (algorithm !== PASSWORD_ALGORITHM || !salt || !hash) {
    return false;
  }

  const candidate = crypto.scryptSync(String(password || ''), salt, 64);
  const stored = Buffer.from(hash, 'hex');

  if (candidate.length !== stored.length) {
    return false;
  }

  return crypto.timingSafeEqual(candidate, stored);
}

function sign(value, secret) {
  return crypto.createHmac('sha256', secret).update(value).digest('base64url');
}

function createSessionToken(learnerId, secret, issuedAt = Date.now()) {
  const payload = Buffer.from(JSON.stringify({ learnerId, issuedAt })).toString('base64url');
  return `${payload}.${sign(payload, secret)}`;
}

function readSessionToken(token, secret, now = Date.now()) {
  const [payload, signature] = String(token || '').split('.');

  if (!payload || !signature || sign(payload, secret) !== signature) {
    return null;
  }

  try {
    const session = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'));

    if (!session.learnerId || !session.issuedAt) {
      return null;
    }

    if (now - Number(session.issuedAt) > SESSION_MAX_AGE_MS) {
      return null;
    }

    return session;
  } catch {
    return null;
  }
}

function parseCookies(cookieHeader) {
  return String(cookieHeader || '')
    .split(';')
    .map((part) => part.trim())
    .filter(Boolean)
    .reduce((cookies, part) => {
      const separator = part.indexOf('=');

      if (separator === -1) {
        return cookies;
      }

      const name = part.slice(0, separator);
      const value = part.slice(separator + 1);
      cookies[name] = decodeURIComponent(value);
      return cookies;
    }, {});
}

function serializeCookie(name, value, options = {}) {
  const segments = [`${name}=${encodeURIComponent(value)}`];

  if (options.maxAge !== undefined) {
    segments.push(`Max-Age=${options.maxAge}`);
  }

  segments.push('Path=/');
  segments.push('HttpOnly');
  segments.push('SameSite=Lax');

  return segments.join('; ');
}

function clearSessionCookie() {
  return serializeCookie(SESSION_COOKIE, '', { maxAge: 0 });
}

function escapeHtml(value) {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

module.exports = {
  SESSION_COOKIE,
  clearSessionCookie,
  createSessionToken,
  escapeHtml,
  hashPassword,
  normalizeEmail,
  parseCookies,
  readSessionToken,
  serializeCookie,
  verifyPassword,
};
