import bcrypt from 'bcrypt';
import { query } from '@/lib/db';
import { signUpValidation } from '@/lib/validations';

export async function POST(req) {
  try {
    const body = await req.json();

    // 1. 유효성 검사
    const { error, value } = signUpValidation.validate(body, { abortEarly: false });
    if (error) {
      const errors = error.details.map(detail => detail.message);
      return new Response(JSON.stringify({ errors }), { status: 400 });
    }

    const { userId, password, name, email, phoneNumber } = value;

    // 2. 중복 아이디 체크
    const existing = await query('SELECT * FROM users WHERE user_id = $1', [userId]);
    if (existing.rows.length > 0) {
      return new Response(JSON.stringify({ error: '이미 존재하는 아이디입니다.' }), { status: 409 });
    }

    // 3. 비밀번호 해시
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4. 사용자 DB 저장
    await query(
        `INSERT INTO users (user_id, password, name, email, phone_number, used, created_at, updated_at)
       VALUES ($1, $2, $3, $4, $5, $6, NOW(), NOW())`,
        [userId, hashedPassword, name, email, phoneNumber, true]
    );

    // 5. 성공 응답
    return new Response(JSON.stringify({ success: true }), { status: 201 });

  } catch (err) {
    console.error('회원가입 오류:', err);
    return new Response(JSON.stringify({ error: '서버 오류가 발생했습니다.' }), {
      status: 500,
    });
  }
}
