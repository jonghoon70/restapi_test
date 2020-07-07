var debug = require('debug')('restapi:server');
import Web3 from 'web3';

const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));

const getBlockNumber = async (req, res, next) => {
  try {
    let result = {};
    const blockNumber = await web3.eth.getBlockNumber();
    result.blockNumber = blockNumber;
    res.json(result);
  } catch (err) {
    // if (conn) conn.release();
    throw err;
  } finally {
  }
}

export {
  getBlockNumber
}