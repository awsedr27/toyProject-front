import { query } from '@/lib/db';
import resultCodes from '@/lib/resultCode';
import { withAuth } from '@/lib/withAuth';

async function handler(req, userId, client) {
  try {
    const body = await req.json();
    const { profileId, profileName, profilePic, language, status } = body;

    // 필수값 검사
    if (!profileId) {
      return new Response(
        JSON.stringify({
          ...resultCodes.BAD_REQUEST,
          message: 'profileId는 필수입니다.',
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // 프로필 존재 여부 및 소유자 검증
    const existing = await client.query(
      `SELECT 1 FROM profiles WHERE profile_id = $1 AND user_id = $2`,
      [profileId, userId]
    );

    if (existing.rows.length === 0) {
      return new Response(
        JSON.stringify({
          ...resultCodes.PROFILE_NOT_FOUND,
          message: '해당 프로필을 찾을 수 없습니다.',
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const fieldMap = {
      profile_name: profileName,
      profile_pic: profilePic,
      '"language"': language, 
      status: status,
    };

    const setClauses = [];
    const values = [];
    let paramIdx = 1;

    for (const [column, value] of Object.entries(fieldMap)) {
      if (value !== undefined) {
        setClauses.push(`${column} = $${paramIdx++}`);
        values.push(value);
      }
    }

    // 변경할 필드가 없을 경우
    if (setClauses.length === 0) {
      return new Response(
        JSON.stringify({
          ...resultCodes.SUCCESS,
          message: '변경할 필드가 없습니다.',
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // updated_at 자동 추가
    setClauses.push(`updated_at = NOW()`);

    // WHERE 조건 파라미터 추가
    values.push(profileId);
    values.push(userId);

    const updateQuery = `
      UPDATE profiles
      SET ${setClauses.join(', ')}
      WHERE profile_id = $${paramIdx++} AND user_id = $${paramIdx}
      RETURNING profile_id, user_id, profile_name, profile_pic, "language", status, created_at, updated_at
    `;

    const result = await client.query(updateQuery, values);
    const updated = result.rows[0];

    return new Response(
      JSON.stringify({
        ...resultCodes.SUCCESS,
        data: {
          profileId: updated.profile_id,
          userId: updated.user_id,
          profileName: updated.profile_name,
          profilePic: updated.profile_pic,
          language: updated.language,
          status: updated.status,
          createdAt: updated.created_at,
          updatedAt: updated.updated_at,
        },
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err) {
    console.error('[POST /api/profile/update]', err);
    const code = resultCodes.UNKNOWN;
    return new Response(
      JSON.stringify({
        code: code.code,
        message: code.title,
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

export const POST = withAuth(handler);
