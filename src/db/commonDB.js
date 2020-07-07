import mariadb from 'mariadb';

const pool = mariadb.createPool({
  host: process.env.DB_HOST, 
  user: process.env.DB_USER, 
  password: process.env.DB_PW,
  database: process.env.DB_NAME,
  connectionLimit: 5});

export default pool;