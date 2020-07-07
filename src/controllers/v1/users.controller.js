var debug = require('debug')('restapi:server');
import pool from '../../db/commonDB';
import Web3 from 'web3';

const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));

const getUser = async (req, res, next) => {
  try {
    const query = 'select * from table_test where id = ?';    
    const conn = await pool.getConnection();
    const rows = await conn.query(query, [req.params.id]);
    res.json(rows);
    if (conn) conn.release();
  } catch (err) {
    // if (conn) conn.release();
    throw err;
  } finally {
  }
}

const getUserList = async (req, res, next) => {
  try {
    console.log(req.query);
    const query = 'select * from table_test';    
    const conn = await pool.getConnection();
    const rows = await conn.query(query);
    res.json(rows);
    if (conn) conn.release();
  } catch (err) {
    // if (conn) conn.release();
    throw err;
  } finally {
  }
}

export {
  getUserList,
  getUser
}