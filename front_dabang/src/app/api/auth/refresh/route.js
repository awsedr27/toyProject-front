import { query } from '@/lib/db'
import { verifyToken, signAccessToken, signRefreshToken } from '@/lib/jwt'
import { cookies } from 'next/headers'
import { getResultCode } from '@/lib/resultCode'

export async function POST(req) {
  try {
    const cookieStore = cookies()
    const refreshToken = cookieStore.get('refreshToken')?.value

    if (!refreshToken) {
      const result = getResultCode('TOKEN_NOT_FOUND')
      return new Response(
        JSON.stringify({ code: result.code, status: result.status, title: result.title }),
        { status: result.status }
      )
    }

    // 1. 리프레시 토큰 검증
    const payload = verifyToken(refreshToken)
    if (!payload) {
      const result = getResultCode('AUTH_INVALID')
      return new Response(
        JSON.stringify({ code: result.code, status: result.status, title: result.title }),
        { status: result.status }
      )
    }

    const userId = payload.userId

    // 2. DB에서 저장된 리프레시 토큰 조회
    const storedTokenRes = await query(
      'SELECT * FROM users WHERE user_id = $1',
      [userId]
    )

    if (storedTokenRes.rows.length === 0) {
      const result = getResultCode('TOKEN_NOT_FOUND')
      return new Response(
        JSON.stringify({ code: result.code, status: result.status, title: result.title }),
        { status: result.status }
      )
    }

    const storedRefreshToken = storedTokenRes.rows[0].refresh_token

    // 3. 토큰 일치 여부 체크
    if (storedRefreshToken !== refreshToken) {
      const result = getResultCode('AUTH_INVALID')
      return new Response(
        JSON.stringify({ code: result.code, status: result.status, title: result.title }),
        { status: result.status }
      )
    }

    // 4. 새 리프레시 토큰 생성 및 DB 갱신
    const newRefreshToken = signRefreshToken({ userId })

    await query(
      'UPDATE users SET refresh_token = $1, updated_at = NOW() WHERE user_id = $2',
      [newRefreshToken, userId]
    )

    // 5. 새 액세스 토큰 생성
    const newAccessToken = signAccessToken({ userId })

    // 6. 쿠키 덮어쓰기
    cookieStore.set('refreshToken', newRefreshToken, {
      httpOnly: true,
      path: '/api/auth/refresh',
      maxAge: 60 * 60 * 24 * 7, // 7일
    })

    cookieStore.set('accessToken', newAccessToken, {
      httpOnly: true,
      path: '/',
      maxAge: 60 * 30, // 30분
    })

    // 7. 성공 응답
    const result = getResultCode('SUCCESS')
    return new Response(
      JSON.stringify({ code: result.code, status: result.status, title: result.title, success: true }),
      { status: result.status }
    )
  } catch (error) {
    console.error('[REFRESH TOKEN ERROR]', error)
    const result = getResultCode('REFRESH_FAIL')
    return new Response(
      JSON.stringify({ code: result.code, status: result.status, title: result.title }),
      { status: result.status }
    )
  }
}
