import resultCodes from '@/lib/resultCode'
import { withAuth } from '@/lib/withAuth'

async function handler(req, userId, client) {
  try {
    const result = await client.query(
      `SELECT profile_id, user_id, profile_name, profile_pic, language, status, created_at, updated_at
       FROM profile WHERE user_id = $1`,
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

    const profile = result.rows[0]

    return new Response(
      JSON.stringify({
        ...resultCodes.SUCCESS,
        data: {
          profileId: profile.profile_id,
          userId: profile.user_id,
          profileName: profile.profile_name,
          profile_pic: profile.profile_pic,
          language: profile.language,
          status: profile.status,
          createdAt: profile.created_at,
          updatedAt: profile.updated_at,
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
