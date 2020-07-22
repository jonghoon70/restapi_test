import express from 'express'
import { getBlockNumber, postTransaction, getCoinbase, putAccount } from '../../controllers/v1/bchain.controller'

const router = express.Router()

router.route('/blockNumber').get((req, res, next) => {
  getBlockNumber(req, res, next);
});

router.route('/mining/').get((req, res, next) => {
  getMining(req, res, next);
});

router.route('/mining/').put((req, res, next) => {
  getAccounts(req, res, next);
});

router.route('/coinbase').get((req, res, next) => {
  getCoinbase(req, res, next);
});

router.route('/account/:id').put((req, res, next) => {
  putAccount(req, res, next);
});

router.route('/transaction').post((req, res, next) => {
  postTransaction(req, res, next);
});

export default router