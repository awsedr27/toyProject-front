import pkg from 'pg'
const { Pool } = pkg

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 20,                    
  idleTimeoutMillis: 30000,  
  connectionTimeoutMillis: 60000,
})

export async function query(text, params) {
  const res = await pool.query(text, params)
  return res
}
