import { query } from '@/lib/db'
import bcrypt from 'bcrypt'
import { signUpValidation } from '@/lib/validation/signupValidation'

export async function POST(req) {
  const body = await req.json()

  // 1. 유효성 검사 (used는 아예 포함 안 함)
  const { error, value } = signUpValidation.validate(body, { abortEarly: false })
  if (error) {
    const errors = error.details.map(detail => detail.message)
    return new Response(JSON.stringify({ errors }), { status: 400 })
  }

  const { userId, password, name, email, phoneNumber } = value

  // 2. 중복 아이디 체크
  const existing = await query('SELECT * FROM users WHERE user_id = $1', [userId])
  if (existing.rows.length > 0) {
    return new Response(JSON.stringify({ error: '이미 존재하는 아이디입니다.' }), { status: 409 })
  }

  // 3. 비밀번호 해시
  const hashedPassword = await bcrypt.hash(password, 10)

  // 4. DB에 사용자 저장 (used는 무조건 true)
  await query(
    `INSERT INTO users (user_id, password, name, email, phone_number, used, created_at, updated_at)
     VALUES ($1, $2, $3, $4, $5, $6, NOW(), NOW())`,
    [userId, hashedPassword, name, email, phoneNumber, true]
  )

  // 5. 성공 응답
  return new Response(JSON.stringify({ success: true }), { status: 201 })
}
