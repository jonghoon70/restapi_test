require('dotenv').config()

import createError from 'http-errors'
import express from 'express'
import cookieParser from 'cookie-parser'
import logger from 'morgan'
import v1Route from './routes/v1'

const app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

app.use('/api/v1', v1Route)

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404))
})

// error handler
app.use((err, req, res, next) => {
  let apiError = err;

  if (!err.status) {
    apiError = createError(err);
  }

  res.locals.message = apiError.message
  res.locals.error = process.env.NODE_ENV === 'development' ? apiError : {}

  return res.status(apiError.status)
    .json({message: apiError.message})
})

// bin/www 를 그대로 사용하기 위해서 예외적으로 commonJs 문법을 적용
module.exports = app
