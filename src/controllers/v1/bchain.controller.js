require('dotenv').config();

var debug = require('debug')('restapi:server');
import net from 'net'
import Web3 from 'web3';

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

const postMemo = async (req, res, next) => {
  try {
    let result = {};
    const coinbase = await web3.eth.getCoinbase();
    const isUnlock = await web3.eth.personal.unlockAccount(coinbase, '1243', 1);
    const txid = await web3.eth.sendTransaction({
      from: coinbase,
      to: '0x0000000000000000000000000000000000000000',
      value: 0,
      data: '31323334353637'
    }).on('transactionHash', transactionhash => {
      debug(new Date() + '4')
      result.txid = transactionhash;
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
  postMemo
}