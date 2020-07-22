var debug = require('debug')('restapi:server');
import pool from '../../db/commonDB';
import Web3 from 'web3';
const DEFAULT_CONNINFO_LIMIT = 3;

const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));

const getConnInfo = async (req, res, next) => {
  try {
    const conn = await pool.getConnection();
    let args = [];
    let limit = DEFAULT_CONNINFO_LIMIT;
    let  query = 'select * from connect_info ';

    // txid
    //////////////////////////////////////////////////////////////////////////
    if (typeof req.query.txid !== 'undefined') {
      query += 'where txid ';
      if (req.query.txid === 'null') {
        query += 'is null ';
      } else {
        query += '= ? ';
        args.push(req.query.txid)
      }
    }
    //////////////////////////////////////////////////////////////////////////

    // sort
    if (typeof req.query.sort !== 'undefined' || req.query.sort === 'asc') {
      query += 'order by seq ASC ';
    } else {
      query += 'order by seq DESC ';
    }    
    //////////////////////////////////////////////////////////////////////////

    // limit
    //////////////////////////////////////////////////////////////////////////
    if (typeof req.query.limit !== 'undefined') {
      limit = Math.min(DEFAULT_CONNINFO_LIMIT, parseInt(req.query.limit));
    }
    query += 'limit ? ';
    args.push(limit);
    //////////////////////////////////////////////////////////////////////////
    const rows = await conn.query(query, args);
    res.json(rows);
    conn.release();
  } catch (err) {
      throw err;
  } finally {
  }
}

const getConnInfoWithUser = async (req, res, next) => {
  try {
    const conn = await pool.getConnection();  
    let query = 'select * from connect_info where seq = ?';
    const rows = await conn.query(query, [req.params.id]);
    res.json(rows);
    conn.release();
  } catch (err) {
    throw err;
  } finally {
  }
}

const putConnInfo = async (req, res, next) => {
  try {
    console.log(req.query);
    const conn = await pool.getConnection();
    const seq = req.params.seq;
    const txid = req.query.txid;  
    const hash = req.query.hash;
    let query = 'update connect_info set txid = ?, hashvalue = ? where seq = ?';
    const ret = await conn.query(query, [txid, hash, seq]);
    res.json(ret);
    conn.release();
  } catch (err) {
    throw err;
  } finally {
  }
}

export {
  getConnInfo,
  getConnInfoWithUser,
  putConnInfo
}