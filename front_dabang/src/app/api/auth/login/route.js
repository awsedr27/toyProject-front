import { query } from '@/lib/db';
import bcrypt from 'bcrypt';
import { signAccessToken, signRefreshToken } from '@/lib/jwt';
import { cookies } from 'next/headers';
import { createSession } from '@/lib/session';

export async function POST(req) {
  try {
    const { userId, password } = await req.json();

    // 1. 사용자 조회
    const result = await query('SELECT * FROM users WHERE user_id = $1', [userId]);
    const user = result.rows[0];

    if (!user) {
      return Response.json({ error: '존재하지 않는 사용자입니다.' }, { status: 401 });
    }

    // 2. 비밀번호 검증
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return Response.json({ error: '비밀번호가 일치하지 않습니다.' }, { status: 401 });
    }

    // 3. 토큰 생성
    const accessToken = signAccessToken({ userId: user.user_id });
    const refreshToken = signRefreshToken({ userId: user.user_id });

    // 4. refresh_token 저장 또는 갱신
    await query(
      'UPDATE users SET refresh_token = $1, updated_at = NOW() WHERE user_id = $2',
      [refreshToken, user.user_id]
    );


    // 5-1. httpOnly 쿠키 설정
    const cookieStore = await cookies();

    cookieStore.set('accessToken', accessToken, {
      httpOnly: true,
      path: '/',
      maxAge: 60 * 30, // 30분
    });

    cookieStore.set('refreshToken', refreshToken, {
      httpOnly: true,
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7일
    });

    // 5-2. 프로파일 쿠키 설정
    const result2 = await query('SELECT * FROM profiles WHERE user_id = $1', [userId]);
    const profile = result2.rows[0];
    profile.userId = userId;

    await createSession(profile);


    // 6. 응답
    return Response.json({ success: true });
  } catch (err) {
    console.error('[LOGIN ERROR]', err);
    return Response.json({ error: '로그인 중 서버 오류 발생' }, { status: 500 });
  }
}
