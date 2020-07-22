require('dotenv').config();
var debug = require('debug')('restapi:server');

import { bc_getBlockNumber, bc_getMining, bc_postMining, bc_postTransaction, bc_getCoinbase, bc_putAccount } from './common';
import { db_getConnInfoList, db_putConnInfo } from './common';

async function batch_process() {
    try {      
        let result = {}
        let index = 0;
        let txid = '';
        let seq = 0;
        let data = '';
        let ret = {}
        const coinbase = await bc_getCoinbase();
        const isUnlock = await bc_putAccount(coinbase, 'unlock');
        const _connInfoList = await db_getConnInfoList();
        const connInfoList = JSON.parse(_connInfoList);
        for (index in connInfoList) {
            seq = connInfoList[index].seq;
            data = connInfoList[index].memo;
            result = await bc_postTransaction(seq, data);
            ret = await db_putConnInfo(seq, result.txid, result.hash);
        }           
    } catch (err) {
        console.log(err);
    }
};

batch_process();