import { mkdir, writeFile } from 'fs/promises';
import path from 'path';
import { withAuth } from '@/lib/withAuth'
import { getResultCode } from '@/lib/resultCode'
import { randomUUID } from 'crypto';
import { query } from '@/lib/db'
// .env에서 불러온 업로드 디렉토리
const uploadDir = process.env.UPLOAD_DIR;

async function handler(req, userId, client) {
  try {
    const formData = await req.formData();
    const file = formData.get('file');
    const metaData = formData.get('metaData');

    if (!file) {
      return new Response(JSON.stringify({
        ...getResultCode('BAD_REQUEST')
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // 업로드 폴더 없으면 생성
    await mkdir(uploadDir, { recursive: true });

    // 파일명 및 경로
    const fileId = randomUUID();
    const originalName = file.name;
    const mimeType = file.type;
    const size = file.size;
    const filePath = path.join(uploadDir, fileId);

    // 파일 저장
    const buffer = Buffer.from(await file.arrayBuffer());
    await writeFile(filePath, buffer);

    await query(`
    INSERT INTO files (id, original_name, mime_type, size, created_at, updated_at)
    VALUES ($1, $2, $3, $4, NOW(), NOW())`, [
      fileId,
      originalName,
      mimeType,
      size
    ]);

    return new Response(JSON.stringify({
      ...getResultCode('SUCCESS'),
      data: {
        fileId: fileId
      }
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (err) {
    console.error('[POST /api/user/profile/upload]', err);
    return new Response(JSON.stringify({
      ...getResultCode('UNKNOWN')
    }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
    });
  }
}

export const POST = withAuth(handler);
