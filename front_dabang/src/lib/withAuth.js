import { getResultCode } from '@/lib/resultCode'
import { verifyToken } from '@/lib/jwt'

function clearAuthCookies() {
  return [
    'accessToken=; Path=/; HttpOnly; Secure; Max-Age=0',
    'refreshToken=; Path=/; HttpOnly; Secure; Max-Age=0',
  ].join(', ')
}

function createErrorResponse(resultCodeKey, extra = {}, clearCookies = true) {
  const result = getResultCode(resultCodeKey)
  const body = {
    code: result.code,
    status: result.status,
    title: result.title,
    ...extra,
  }
  const headers = { 'Content-Type': 'application/json' }
  if (clearCookies) {
    headers['Set-Cookie'] = clearAuthCookies()
  }
  return new Response(JSON.stringify(body), {
    status: result.status,
    headers,
  })
}


export function withAuth(handler) {
  return async (req) => {
    // 쿠키에서 토큰 읽기
    const accessToken = req.cookies.get('accessToken')?.value
    const refreshToken = req.cookies.get('refreshToken')?.value

    // 1. accessToken 없으면 인증 실패
    if (!accessToken) {
      return createErrorResponse('ACCESS_TOKEN_NOT_FOUND', { routeUrl: '/login' })
    }

    // 2. accessToken 검증
    const accessPayload = verifyToken(accessToken)

    // 3. accessToken 만료 시
    if (accessPayload === 'expired') {
      // refreshToken 없으면 인증 실패
      if (!refreshToken) {
        return createErrorResponse('REFRESH_TOKEN_NOT_FOUND', { routeUrl: '/login' })
      }

      // refreshToken 검증
      const refreshPayload = verifyToken(refreshToken)

      // refreshToken 만료 혹은 무효면 인증 실패
      if (!refreshPayload || refreshPayload === 'expired') {
        return createErrorResponse('AUTH_INVALID', { routeUrl: '/login' })
      }

      // refreshToken 유효하면 액세스 토큰 재발급 필요 응답
      return createErrorResponse('ACCESS_TOKEN_EXPIRED',{ message: 'Access token expired. Please refresh token.' },
        false // 쿠키 초기화는 하지 않음
      )
    }

    // 4. accessToken 검증 실패 (유효하지 않은 토큰)
    if (!accessPayload) {
      return createErrorResponse('AUTH_INVALID', { routeUrl: '/login' })
    }

    // 5. 인증 성공: 실제 핸들러에 userId 전달해서 실행
    return handler(req, accessPayload.userId)
  }
}
