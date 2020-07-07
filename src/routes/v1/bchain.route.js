import express from 'express'
import { getBlockNumber, postMemo } from '../../controllers/v1/bchain.controller'

const router = express.Router()

router.route('/blockNumber').get((req, res, next) => {
  getBlockNumber(req, res, next);
});

router.route('/memo').post((req, res, next) => {
  postMemo(req, res, next);
});

export default router