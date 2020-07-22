import express from 'express'
import { getConnInfo, getConnInfoWithUser, putConnInfo } from '../../controllers/v1/db.controller'

const router = express.Router()

router.route('/conninfo').get((req, res, next) => {
  getConnInfo(req, res, next);
});

router.route('/conninfo/:seq').get((req, res, next) => {
  getConnInfoWithUser(req, res, next);
});

router.route('/conninfo/:seq').put((req, res, next) => {
  putConnInfo(req, res, next);
});

export default router