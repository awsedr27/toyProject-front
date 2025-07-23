import { query } from '@/lib/db'
import { signAccessToken, signRefreshToken } from '@/lib/jwt'
import bcrypt from 'bcrypt'

export async function POST(req) {
  const body = await req.json()
  const { email, password } = body

  const result = await query('SELECT * FROM users WHERE email = $1', [email])
  const user = result.rows[0]

  if (!user) {
    return new Response(JSON.stringify({ error: 'Invalid credentials' }), { status: 401 })
  }

  const passwordMatch = await bcrypt.compare(password, user.password)
  if (!passwordMatch) {
    return new Response(JSON.stringify({ error: 'Invalid credentials' }), { status: 401 })
  }

  const accessToken = signAccessToken({ userId: user.id })
  const refreshToken = signRefreshToken({ userId: user.id })

  return new Response(JSON.stringify({ accessToken }), {
    status: 200,
    headers: {
      'Set-Cookie': [
        `refreshToken=${refreshToken}; Path=/api/auth/refresh; HttpOnly; SameSite=Lax; Secure; Max-Age=${process.env.JWT_REFRESH_TOKEN_EXPIRES}`,
      ],
      'Content-Type': 'application/json',
    },
  })
}
