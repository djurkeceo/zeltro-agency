import { isValidSessionToken, readSessionTokenFromRequest, sendJson } from '../_lib/adminAuth.js';

export default function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return sendJson(res, 405, { message: 'Method not allowed' });
  }

  const adminSecret = process.env.ADMIN_SESSION_SECRET;
  if (!adminSecret) {
    return sendJson(res, 200, { authenticated: false });
  }

  const sessionToken = readSessionTokenFromRequest(req);
  const isAuthenticated = isValidSessionToken(sessionToken, adminSecret);
  return sendJson(res, 200, { authenticated: isAuthenticated });
}
