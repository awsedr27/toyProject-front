import { query } from '@/lib/db';
import resultCodes from '@/lib/resultCode';
import { writeFile } from 'fs/promises';
import path from 'path';

async function handler(req, userId, client) {
  try {
    const formData = await req.formData();
    const file = formData.get('file');
    const metaData = formData.get('metaData');

    if (!file || !metaData) {
      return new Response(JSON.stringify({
        ...resultCodes.BAD_REQUEST
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // 파일 저장 경로
    const uploadDir = path.join(process.cwd(), 'uploads');
    const fileName = `${metaData}_${Date.now()}_${file.name}`;
    const filePath = path.join(uploadDir, fileName);

    // 파일 저장
    const buffer = Buffer.from(await file.arrayBuffer());
    await writeFile(filePath, buffer);

    // DB에 경로 업데이트
    // await query(
    //   `UPDATE users SET profile_image = $1, updated_at = NOW() WHERE user_id = $2`,
    //   [fileName, userId]
    // );

    return new Response(JSON.stringify({
      ...resultCodes.SUCCESS
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (err) {
    console.error('[POST /api/user/profile/upload]', err);
    return new Response(JSON.stringify({
      ...resultCodes.UNKNOWN
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

export const POST = withAuth(handler)