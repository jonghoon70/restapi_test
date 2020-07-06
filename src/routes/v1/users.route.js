import express from 'express'
import { get } from '../../controllers/v1/users.controller'

const router = express.Router()

router.route('/').get((req, res, next) => {
  get(req, res, next);
});

export default router