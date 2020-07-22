require('dotenv').config();
var debug = require('debug')('restapi:server');

import request from 'request';

const url_bc_coinbase = process.env.API_BC_URL + '/coinbase';
const url_bc_account = process.env.API_BC_URL + '/account';
const url_bc_blocknumber = process.env.API_BC_URL + '/blockNumber';
const url_bc_mining = process.env.API_BC_URL + '/mining';
const url_bc_transaction = process.env.API_BC_URL + '/transaction';

const url_db_conninfo = process.env.API_DB_URL + '/conninfo';


const bc_getBlockNumber = async () => {
    return new Promise((resolve, reject) => {
        const options = {
            url: url_bc_blocknumber,
            method: 'GET',
            header: {
                'content-type':'application/json'
            }
        }

        try {     
            request(options, async (err, response, body) => {
                let result = JSON.parse(body);
                resolve(result.blockNumber);
            });
        } catch (err) {
            console.log('err');
            reject(err);
        }   
    });     
};

const bc_getCoinbase = async () => {
    return new Promise((resolve, reject) => {
        const options = {
            url: url_bc_coinbase,
            method: 'GET',
            header: {
                'content-type':'application/json'
            }
        }

        try {     
            request(options, async (err, response, body) => {
                let result = JSON.parse(body);
                resolve(result.coinbase);
            });
        } catch (err) {
            console.log('err');
            reject(err);
        }   
    });     
};

const bc_putAccount = async (id, cmd) => {
    return new Promise((resolve, reject) => {
        const options = {
            url: url_bc_account + '/' + id,
            method: 'PUT',
            header: {
                'content-type':'application/json'
            },
            qs: {
                command: cmd
            }
        }

        try {     
            request(options, async (err, response, body) => {
                let result = JSON.parse(body);
                resolve(result.isUnlock);
            });
        } catch (err) {
            console.log('err');
            reject(err);
        }   
    });     
};

const bc_getMining = async () => {
    return new Promise((resolve, reject) => {
        const options = {
            url: url_bc_mining,
            method: 'GET',
            header: {
                'content-type':'application/json'
            }
        }

        try {     
            request(options, async (err, response, body) => {
                let result = JSON.parse(body);
                resolve(result.isMining);
            });
        } catch (err) {
            console.log('err');
            reject(err);
        }   
    });     
};

const bc_postMining = async () => {
    return new Promise((resolve, reject) => {
        const options = {
            url: url_bc_mining,
            method: 'POST',
            header: {
                'content-type':'application/json'
            },
            qs: {
                threads: 1
            }
        }

        try {     
            request(options, async (err, response, body) => {
                let result = JSON.parse(body);
                resolve(result.isMining);
            });
        } catch (err) {
            console.log('err');
            reject(err);
        }   
    });     
};

const bc_postTransaction = async (seq, data) => {
    return new Promise((resolve, reject) => {
        const options = {
            url: url_bc_transaction,
            method: 'POST',
            header: {
                'content-type':'application/json'
            },
            qs: {
                seq: seq,
                data: data
            }
        };

        try {     
            request(options, async (err, response, body) => {
                const result = JSON.parse(body);
                resolve(result);
            });
        } catch (err) {
            console.log('err');
            reject(err);
        }   
    });
};

const db_getConnInfoList = async () =>  {
    return new Promise((resolve, reject) => {
        const options = {
            url: url_db_conninfo,
            method: 'GET',
            header: {
                "content-type":"application/json"
            }
        };

        try {     
            // get 
            request(options, async (err, response, body) => {
                resolve(body);        
            });
        } catch (err) {
            console.log(err);
            reject(err);
        }
    })
};

const db_putConnInfo = async (seq, txid, hash) =>  {
    return new Promise((resolve, reject) => {
        const options = {
            url: url_db_conninfo + '/' + seq,
            method: 'PUT',
            header: {
                "content-type":"application/json"
            },
            qs: {
                hash: hash,
                txid: txid
            }
        };

        try {     
            // get 
            request(options, async (err, response, body) => {
                const result = JSON.parse(body);
                resolve(result);        
            });
        } catch (err) {
            console.log(err);
            reject(err);
        }
    })
};

export {
    bc_getBlockNumber,
    bc_getCoinbase,
    bc_putAccount,
    bc_getMining,
    bc_postMining,
    bc_postTransaction,
    db_getConnInfoList,
    db_putConnInfo
  }