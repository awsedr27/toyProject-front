import { NextResponse } from 'next/server';
import { verifyToken } from '@/lib/jwt';

export function middleware(request) {
  const accessToken = request.cookies.get('accessToken')?.value;

  if (!accessToken) {
    // 토큰 없으면 로그인 페이지로 리다이렉트
    return NextResponse.redirect(new URL('/login', request.url));
  }

  const payload = verifyToken(accessToken);
  if (!payload) {
    // 유효하지 않은 토큰일 경우 로그인 페이지로 리다이렉트
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // 토큰이 유효하면 요청 계속 진행
  return NextResponse.next();
}

// 미들웨어가 동작할 경로 설정 
export const config = {
  matcher: [
    '/api/auth/refresh',
    '/api/auth/logout',
    '/api/auth/login',
    '/api/auth/signup'
  ],
};
