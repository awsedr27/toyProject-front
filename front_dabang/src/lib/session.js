import 'server-only'
import { cookies } from 'next/headers'

const SESSION_COOKIE_NAME = 'userPrefs'

export async function createSession(userInfo) {
  const sessionData = {
    userId: userInfo.userId,
    profileName: userInfo.profileName,
    language: userInfo.language,
    createdAt: new Date().toISOString()
  };
  
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, JSON.stringify(sessionData), {
    httpOnly: false, // 클라이언트에서 접근 가능
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 30, // 30일
    sameSite: 'lax',
    path: '/'
  });
}

export async function getSession() {
  const cookieStore = await cookies();
  const sessionValue = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  
  if (!sessionValue) {
    return null;
  }

  try {
    return JSON.parse(sessionValue);
  } catch (error) {
    console.error('Session parse error:', error);
    return null;
  }
}

export async function updateSession(updates) {
  const currentSession = await getSession();
  if (!currentSession) return null;
  
  const updatedSession = { ...currentSession, ...updates };
  const cookieStore = await cookies();
  
  cookieStore.set(SESSION_COOKIE_NAME, JSON.stringify(updatedSession), {
    httpOnly: false,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 30,
    sameSite: 'lax',
    path: '/'
  });
  
  return updatedSession;
}

export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
}