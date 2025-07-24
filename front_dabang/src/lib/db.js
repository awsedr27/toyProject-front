import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 20,                     // 최대 커넥션 수
  idleTimeoutMillis: 30000,   // 커넥션이 놀고 있을 수 있는 시간 (30초)
  connectionTimeoutMillis: 60000, // 커넥션 생성 타임아웃 (1분)
});

export async function query(text, params) {
  const res = await pool.query(text, params);
  return res;
}
