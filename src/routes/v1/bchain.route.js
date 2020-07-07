import express from 'express'
import { get } from '../../controllers/v1/bchain.controller'

const router = express.Router()

router.route('/blockNumber').get((req, res, next) => {
  get(req, res, next);
});

export default router