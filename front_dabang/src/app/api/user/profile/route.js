import { query } from '@/lib/db'
import resultCodes from '@/lib/resultCode'
import { withAuth } from '@/lib/withAuth'

async function handler(req, userId) {
  try {
    const result = await query(
      `SELECT user_id, email, name, phone_number, used, created_at, updated_at 
       FROM users WHERE user_id = $1`,
      [userId]
    )

    if (result.rows.length === 0) {
      const code = resultCodes.USER_NOT_FOUND
      return new Response(
        JSON.stringify({
          ...resultCodes.USER_NOT_FOUND
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      )
    }

    const user = result.rows[0]

    return new Response(
      JSON.stringify({
        ...resultCodes.SUCCESS,
        data: {
          userId: user.user_id,
          email: user.email,
          name: user.name,
          phoneNumber: user.phone_number,
          used: user.used,
          createdAt: user.created_at,
          updatedAt: user.updated_at,
        },
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    )
  } catch (err) {
    console.error('[POST /api/user/profile]', err)
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

export const POST = withAuth(handler)
