import { NextResponse } from 'next/server';
import { verifyToken, signAccessToken } from '@/lib/jwt';

export function middleware(request) {
  const { pathname } = request.nextUrl
  console.log('미들웨어 진입');
  // ✅ 특정 경로 예외 처리
  const publicPaths = ['/api/auth']
  if (publicPaths.some(path => pathname.startsWith(path))) {
    return NextResponse.next()
  }

  const accessToken = request.cookies.get('accessToken')?.value;
  const refreshToken = request.cookies.get('refreshToken')?.value;
  // 토큰 없으면 쿠키 삭제 후 로그인 페이지로 리다이렉트
  console.log('미들웨어 통과');
  if (!accessToken) {
    const res = NextResponse.json(
      { error: 'No access token', code: 'NO_ACCESS_TOKEN' ,routeUrl : '/login'},
      { status: 401 }
    );

    // 쿠키 삭제
    res.cookies.set('accessToken', '', { maxAge: 0, path: '/' });
    res.cookies.set('refreshToken', '', { maxAge: 0, path: '/' });

    return res;
  }

  const payload = verifyToken(accessToken);

  if (payload === 'expired') {
    // 액세스 토큰 만료 시 리프레시 토큰 검사
    if (!refreshToken) {
    const res = NextResponse.json(
      { error: 'No refresh token', code: 'NO_REFRESH_TOKEN' ,routeUrl : '/login'},
      { status: 401 }
    );

    // 쿠키 삭제
    res.cookies.set('accessToken', '', { maxAge: 0, path: '/' });
    res.cookies.set('refreshToken', '', { maxAge: 0, path: '/' });

    return res;
    }

    const refreshPayload = verifyToken(refreshToken);
    if (!refreshPayload || refreshPayload === 'expired') {
    const res = NextResponse.json(
      { error: 'expired refresh token', code: 'NO_REFRESH_TOKEN' ,routeUrl : '/login'},
      { status: 401 }
    );

    // 쿠키 삭제
    res.cookies.set('accessToken', '', { maxAge: 0, path: '/' });
    res.cookies.set('refreshToken', '', { maxAge: 0, path: '/' });

    return res;
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
    const res = NextResponse.json(
        { error: 'No refresh token', code: 'NO_REFRESH_TOKEN' ,routeUrl : '/login'},
        { status: 401 }
    );

    // 쿠키 삭제
    res.cookies.set('accessToken', '', { maxAge: 0, path: '/' });
    res.cookies.set('refreshToken', '', { maxAge: 0, path: '/' });

    return res;
  }

  // 정상 토큰일 경우 요청 계속 진행
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/api/:path*'
  ],
}

