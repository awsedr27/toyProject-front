import { query } from '@/lib/db'
import resultCodes from '@/lib/resultCode'

export async function POST(req) {
  try {
    const body = await req.json()
    const { userId, email } = body

    if (!userId || !email) {
      return new Response(JSON.stringify({
        ...resultCodes.BAD_REQUEST
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    const result = await query(
        `SELECT user_id FROM users WHERE user_Id = $1 AND email = $2`,
        [userId, email]
    )

    if (result.rows.length === 0) {
      return new Response(JSON.stringify({
        ...resultCodes.USER_NOT_FOUND
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    const user = result.rows[0]

    return new Response(JSON.stringify({
      ...resultCodes.SUCCESS
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    })
  } catch (err) {
    console.error('[POST /api/user/find/id]', err)
    return new Response(JSON.stringify({
      ...resultCodes.UNKNOWN
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}
