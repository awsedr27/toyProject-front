import { query } from '@/lib/db';
import bcrypt from 'bcrypt';
import resultCodes from '@/lib/resultCode';


export async function POST(req) {
  try {
    const body = await req.json();
    const { userId, password } = body;

    if (!userId || !password) {
      return new Response(JSON.stringify({
        ...resultCodes.BAD_REQUEST
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    // 1. 사용자 조회
    const result = await query('SELECT * FROM users WHERE user_id = $1', [userId]);
    const user = result.rows[0];

    // 2. 비밀번호 검증
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return Response.json({ error: '비밀번호가 일치하지 않습니다.' }, { status: 401 });
    }

    return new Response(JSON.stringify({
      ...resultCodes.SUCCESS,
      data: {
        userId: user.user_id
      }
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    })
  } catch (err) {
    console.error('[POST /api/user/valid/password]', err)
    return new Response(JSON.stringify({
      ...resultCodes.UNKNOWN
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}