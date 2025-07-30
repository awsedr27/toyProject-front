import { NextResponse } from 'next/server';
import { verifyToken, signAccessToken } from '@/lib/jwt';

export async function middleware(request) {
  const accessToken = request.cookies.get('accessToken')?.value;
  const refreshToken = request.cookies.get('refreshToken')?.value;

  // 토큰 없으면 쿠키 삭제 후 로그인 페이지로 리다이렉트
  if (!accessToken) {
    const response = NextResponse.redirect(new URL('/login', request.url));
    response.cookies.delete('accessToken', { path: '/' });
    response.cookies.delete('refreshToken', { path: '/' });
    return response;
  }

  const payload = verifyToken(accessToken);

  if (payload === 'expired') {
    // 액세스 토큰 만료 시 리프레시 토큰 검사
    if (!refreshToken) {
      const response = NextResponse.redirect(new URL('/login', request.url));
      response.cookies.delete('accessToken', { path: '/' });
      response.cookies.delete('refreshToken', { path: '/' });
      return response;
    }

    const refreshPayload = verifyToken(refreshToken);
    if (!refreshPayload || refreshPayload === 'expired') {
      const response = NextResponse.redirect(new URL('/login', request.url));
      response.cookies.delete('accessToken', { path: '/' });
      response.cookies.delete('refreshToken', { path: '/' });
      return response;
    }

    // 리프레시 토큰이 유효하면 새 액세스 토큰 발급
    const newAccessToken = signAccessToken({ userId: refreshPayload.userId });

    const response = NextResponse.next();
    response.cookies.set('accessToken', newAccessToken, {
      httpOnly: true,
      path: '/',
      sameSite: 'lax',
      maxAge: 60 * 15, // 15분
      // secure: true, // HTTPS 사용 시 활성화
    });
    return response;
  }

  // 토큰이 유효하지 않은 경우
  if (!payload) {
    const response = NextResponse.redirect(new URL('/login', request.url));
    response.cookies.delete('accessToken', { path: '/' });
    response.cookies.delete('refreshToken', { path: '/' });
    return response;
  }

  // 정상 토큰일 경우 요청 계속 진행
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/api/auth/refresh',
    '/api/auth/logout',
    '/api/auth/login',
    '/api/auth/signup',
    '/api/protected/:path*',
    '/dashboard/:path*',
  ],
};
