import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;
const ACCESS_EXPIRES = Number(process.env.JWT_ACCESS_TOKEN_EXPIRES) || 900;         // 15분
const REFRESH_EXPIRES = Number(process.env.JWT_REFRESH_TOKEN_EXPIRES) || 604800;    // 7일

export function signAccessToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: ACCESS_EXPIRES });
}

export function signRefreshToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: REFRESH_EXPIRES });
}

export function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch {
    return null;
  }
}
