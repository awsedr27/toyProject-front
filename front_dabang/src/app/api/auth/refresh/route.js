import { query } from '@/lib/db';
import { verifyToken, signAccessToken, signRefreshToken } from '@/lib/jwt';
import { cookies } from 'next/headers';

export async function POST(req) {
  try {
    const cookieStore = cookies();
    const refreshToken = cookieStore.get('refreshToken')?.value;

    if (!refreshToken) {
      return new Response(JSON.stringify({ error: '리프레시 토큰이 없습니다.' }), { status: 401 });
    }

    // 1. 리프레시 토큰 검증
    const payload = verifyToken(refreshToken);
    if (!payload) {
      return new Response(JSON.stringify({ error: '유효하지 않은 리프레시 토큰입니다.' }), { status: 401 });
    }

    const userId = payload.userId;

    // 2. DB에서 저장된 리프레시 토큰 조회
    const storedTokenRes = await query(
      'SELECT * FROM refresh_tokens WHERE user_id = $1',
      [userId]
    );

    if (storedTokenRes.rows.length === 0) {
      return new Response(JSON.stringify({ error: '등록되지 않은 리프레시 토큰입니다.' }), { status: 401 });
    }

    const storedRefreshToken = storedTokenRes.rows[0].refresh_token;

    // 3. 토큰 일치 여부 체크
    if (storedRefreshToken !== refreshToken) {
      return new Response(JSON.stringify({ error: '잘못된 리프레시 토큰입니다.' }), { status: 401 });
    }

    // 4. 새 리프레시 토큰 생성 및 DB 갱신
    const newRefreshToken = signRefreshToken({ userId });

    await query(
      'UPDATE refresh_tokens SET refresh_token = $1, updated_at = NOW() WHERE user_id = $2',
      [newRefreshToken, userId]
    );

    // 5. 새 액세스 토큰 생성
    const newAccessToken = signAccessToken({ userId });

    // 6. 쿠키 덮어쓰기
    cookieStore.set('refreshToken', newRefreshToken, {
      httpOnly: true,
      path: '/api/auth/refresh',
      maxAge: 60 * 60 * 24 * 7, // 7일
    });

    cookieStore.set('accessToken', newAccessToken, {
      httpOnly: true,
      path: '/',
      maxAge: 60 * 30, // 30분
    });

    // 7. 응답 
    return new Response(
      JSON.stringify({ success: true }),
      { status: 200 }
    );
  } catch (error) {
    console.error('[REFRESH TOKEN ERROR]', error);
    return new Response(JSON.stringify({ error: '토큰 재발급 실패' }), { status: 401 });
  }
}
