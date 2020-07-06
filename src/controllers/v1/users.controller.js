var debug = require('debug')('restapi:server');

const mariadb = require('mariadb');
const pool = mariadb.createPool({
  host: process.env.DB_HOST, 
  user: process.env.DB_USER, 
  password: process.env.DB_PW,
  database: process.env.DB_NAME,
  connectionLimit: 5});

const get = async (req, res, next) => {
  try {
    const query = 'select * from table_test';    
    const conn = await pool.getConnection();
    const rows = await conn.query(query);
    res.json(rows);
    if (conn) conn.release();
  } catch(err) {
    if (conn) conn.release();
    throw err;
  } finally {
  }
}

export {
  get
}