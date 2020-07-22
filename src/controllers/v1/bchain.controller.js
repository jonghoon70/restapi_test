require('dotenv').config();
var debug = require('debug')('restapi:server');

import crypto from 'crypto';
import net from 'net'
import Web3 from 'web3';

const padding_zero = '000000000000000000';

const web3 = new Web3(new Web3.providers.IpcProvider(process.env.GETH_IPC, net));
const getBlockNumber = async (req, res, next) => {
  try {
    let result = {};    
    const blockNumber = await web3.eth.getBlockNumber();
    result.blockNumber = blockNumber;
    res.json(result);
  } catch (err) {
    throw err;
  } finally {}
}

const getMining = async (req, res, next) => {
  try {
    let result = {};    
    const isMining = await web3.eth.isMining();
    result.isMining = isMining;
    res.json(result);
  } catch (err) {
    throw err;
  } finally {}
}

const putMining = async (req, res, next) => {
  try {
    let result = {};    
    const isMining = await web3.eth.isMining();
    result.isMining = isMining;
    res.json(result);
  } catch (err) {
    throw err;
  } finally {}
}

const getCoinbase = async (req, res, next) => {
  try {
    let result = {};
    const coinbase = await web3.eth.getCoinbase();
    result.coinbase = coinbase;
    res.json(result);
  } catch (err) {
    throw e;
  }
}

const putAccount = async (req, res, next) => {
  try {
    let result = {};
    if (req.query.command === 'unlock') {
      const isUnlock = await web3.eth.personal.unlockAccount(req.params.id, '1243', 1);
      result.isUnlock = isUnlock;
    }
    res.json(result);
  } catch (err) {
    throw err;
  }
}

const postTransaction = async (req, res, next) => {
  try {
    let result = {};
    console.log(req.query)
    const seq = (padding_zero+req.query.seq).slice(padding_zero.length*(-1));
    const hash = crypto.createHash('md5').update(req.query.data).digest('hex');
    const coinbase = await web3.eth.getCoinbase();
    const txid = await web3.eth.sendTransaction({
      from: coinbase,
      to: '0x0000000000000000000000000000000000000000',
      value: 0,
      data: seq + hash
    }).on('transactionHash', transactionhash => {
      result.txid = transactionhash;
      result.hash = hash;
      res.json(result);
    }).on('error', error => {
      result.errMsg = error.message;
      res.json(result);
    })
  } catch (e) {
    throw e;
  }
}

export {
  getBlockNumber,
  getCoinbase,
  putAccount,
  postTransaction
}