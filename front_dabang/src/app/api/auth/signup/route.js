import bcrypt from 'bcrypt';
import { query } from '@/lib/db';
import { signUpValidation } from '@/lib/validation/signupValidation';
import resultCodes from "@/lib/resultCode";

export async function POST(req) {
  try {
    const body = await req.json();
    console.log(req)
    // 1. 유효성 검사
    const { error, value } = signUpValidation.validate(body, { abortEarly: false });
    if (error) {
      const errors = error.details.map(detail => detail.message);
      let code = resultCodes.USER_INFO_INVAILD
      return new Response(
          JSON.stringify({
            code: code.code,
            message: code.title,
          }),
          { status: 200, headers: { 'Content-Type': 'application/json' } }
      )
    }

    const { userId, password, name, email, phoneNumber } = value;

    // 2. 중복 아이디 체크
    const existing = await query('SELECT * FROM users WHERE user_id = $1', [userId]);
    if (existing.rows.length > 0) {
      let code = resultCodes.USER_DUPLICATE
      return new Response(
          JSON.stringify({
            code: code.code,
            message: code.title,
          }),
          { status: 200, headers: { 'Content-Type': 'application/json' } }
      )
    }

    // 3. 비밀번호 해시
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4. 사용자 DB 저장
    await query(
       `INSERT INTO users (user_id, password, user_name, email, mobile_no, used, created_at, updated_at, use_start_date, use_end_date)
       VALUES ($1, $2, $3, $4, $5, $6, NOW(), NOW(), NOW(), NOW() + INTERVAL '1 year')`,
        [userId, hashedPassword, name, email, phoneNumber, 'Y']
    );

    // 5. 성공 응답
    return new Response(
        JSON.stringify({
          ...resultCodes.SUCCESS,
          data: {
            userId: user.user_id
          },
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
    )

  } catch (err) {
    console.error('회원가입 오류:', err);
    const code = resultCodes.UNKNOWN
    return new Response(
        JSON.stringify({
          code: code.code,
          message: code.title,
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
    )
  }
}
