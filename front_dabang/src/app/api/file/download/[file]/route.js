import fs from 'fs/promises';
import path from 'path';

export async function GET(req) {
  const { pathname } = new URL(req.url);
  const parts = pathname.split('/');
  const fileName = parts[parts.length - 1];

  try {
    const filePath = path.join(process.cwd(), 'uploads', fileName);
    const data = await fs.readFile(filePath);

    return new Response(data, {
      status: 200,
      headers: { 'Content-Type': 'image/jpeg' }
    });
  } catch {
    return new Response('Not Found', { status: 404 });
  }
}
