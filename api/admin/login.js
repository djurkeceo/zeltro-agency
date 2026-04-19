import {
  createSessionToken,
  getSessionCookieHeader,
  sendJson,
} from '../_lib/adminAuth.js';

const parseBody = (req) => {
  if (!req.body) return {};
  if (typeof req.body === 'string') {
    try {
      return JSON.parse(req.body);
    } catch {
      return {};
    }
  }
  return req.body;
};

export default function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return sendJson(res, 405, { message: 'Method not allowed' });
  }

  const adminUsername = process.env.ADMIN_USERNAME;
  const adminPassword = process.env.ADMIN_PASSWORD;
  const adminSecret = process.env.ADMIN_SESSION_SECRET;

  if (!adminUsername || !adminPassword || !adminSecret) {
    return sendJson(res, 500, { message: 'Admin auth is not configured.' });
  }

  const { username, password } = parseBody(req);
  if (!username || !password) {
    return sendJson(res, 400, { message: 'Korisničko ime i lozinka su obavezni.' });
  }

  if (username !== adminUsername || password !== adminPassword) {
    return sendJson(res, 401, { message: 'Pogrešno korisničko ime ili lozinka.' });
  }

  const sessionToken = createSessionToken(adminSecret);
  res.setHeader('Set-Cookie', getSessionCookieHeader(sessionToken));
  return sendJson(res, 200, { authenticated: true });
}
