import { getClearSessionCookieHeader, sendJson } from '../_lib/adminAuth.js';

export default function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return sendJson(res, 405, { message: 'Method not allowed' });
  }

  res.setHeader('Set-Cookie', getClearSessionCookieHeader());
  return sendJson(res, 200, { authenticated: false });
}
