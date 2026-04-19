import crypto from 'node:crypto';

const SESSION_COOKIE_NAME = 'zeltro_admin_session';
const SESSION_MAX_AGE_SECONDS = 60 * 60 * 12;

const parseCookieHeader = (cookieHeader) => {
  if (!cookieHeader) return {};

  return cookieHeader.split(';').reduce((acc, part) => {
    const [rawKey, ...rawValue] = part.trim().split('=');
    if (!rawKey) return acc;

    acc[rawKey] = decodeURIComponent(rawValue.join('='));
    return acc;
  }, {});
};

const decodePayload = (payloadBase64) => {
  try {
    const payloadString = Buffer.from(payloadBase64, 'base64url').toString('utf8');
    return JSON.parse(payloadString);
  } catch {
    return null;
  }
};

const getSignature = (payload, secret) =>
  crypto.createHmac('sha256', secret).update(payload).digest('base64url');

export const createSessionToken = (secret) => {
  const payload = {
    exp: Date.now() + SESSION_MAX_AGE_SECONDS * 1000,
  };
  const payloadBase64 = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const signature = getSignature(payloadBase64, secret);
  return `${payloadBase64}.${signature}`;
};

export const isValidSessionToken = (token, secret) => {
  if (!token || !secret) return false;
  const [payloadBase64, signature] = token.split('.');
  if (!payloadBase64 || !signature) return false;

  const expectedSignature = getSignature(payloadBase64, secret);
  if (signature.length !== expectedSignature.length) return false;

  const signatureBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expectedSignature);
  if (!crypto.timingSafeEqual(signatureBuffer, expectedBuffer)) return false;

  const payload = decodePayload(payloadBase64);
  if (!payload?.exp) return false;

  return Number(payload.exp) > Date.now();
};

export const readSessionTokenFromRequest = (req) => {
  const cookies = parseCookieHeader(req.headers.cookie);
  return cookies[SESSION_COOKIE_NAME] ?? null;
};

export const getSessionCookieHeader = (token) =>
  `${SESSION_COOKIE_NAME}=${encodeURIComponent(token)}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=${SESSION_MAX_AGE_SECONDS}`;

export const getClearSessionCookieHeader = () =>
  `${SESSION_COOKIE_NAME}=; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=0`;

export const sendJson = (res, statusCode, payload) => {
  res.statusCode = statusCode;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.end(JSON.stringify(payload));
};
