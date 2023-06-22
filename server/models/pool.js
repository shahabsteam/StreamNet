import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'stream',
  password: 'your_password',
  port: 5432, // default PostgreSQL port
});


export default pool;