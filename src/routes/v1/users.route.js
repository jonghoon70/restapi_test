import express from 'express'
import { getUserList, getUser } from '../../controllers/v1/users.controller'

const router = express.Router()

router.route('/').get((req, res, next) => {
  getUserList(req, res, next);
});

router.route('/:id').get((req, res, next) => {
  getUser(req, res, next);
});

export default router