import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 20,                     // 최대 커넥션 수
  idleTimeoutMillis: 30000,   // 유휴 커넥션 대기 시간
  connectionTimeoutMillis: 60000, // 커넥션 생성 타임아웃
});

/**
 * 일반 쿼리 실행 함수
 * @param {string} text - SQL 쿼리
 * @param {array} params - 파라미터 배열
 */
export async function query(text, params) {
  const res = await pool.query(text, params);
  return res;
}

/**
 * 트랜잭션 처리용 헬퍼
 * @param {function} callback - (client) => Promise 를 반환하는 콜백
 */
export async function withTransaction(callback) {
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    const result = await callback(client); // 비즈니스 로직 실행

    await client.query('COMMIT');

    return result;
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
}
