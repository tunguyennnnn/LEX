const express = require('express')
const logger = require('morgan')
const bodyParser = require('body-parser')
const compress = require('compression')
const methodOverride = require('method-override')
const httpStatus = require('http-status')
const expressWinston = require('express-winston')
const helmet = require('helmet')

const winstonInstance = require('./winston')
const routes = require('../server/routes/index.route')
const config = require('./env')
const APIError = require('../server/helpers/APIError')
const jwt = require('jsonwebtoken')
const expressValidator = require('express-validator');

const app = express()

if (config.env === 'development') {
  app.use(logger('dev'))
}

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(expressValidator());
app.use(compress())
app.use(methodOverride())
app.use(helmet())


if (config.env === 'development') {
  expressWinston.requestWhitelist.push('body')
  expressWinston.responseWhitelist.push('body')
  app.use(expressWinston.logger({
    winstonInstance,
    meta: true,
    msg: 'HTTP {{req.method}} {{req.url}} {{res.statusCode}} {{res.responseTime}}ms',
    colorStatus: true
  }));
  app.set('superSecret', config.secret);
}

app.get('/', (req, res) =>
  res.send('hello_worldasd asdd')
)
// mount all routes on /api path
app.use('/api', routes)

// handle errors
app.use((err, req, res, next) => {
  if (!(err instanceof APIError)) {
    const apiError = new APIError(err.message, err.status, err.isPublic)
    return next(apiError)
  }
  return next(err)
})

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new APIError('API not found', httpStatus.NOT_FOUND)
  return next(err)
})

// error handler, send stacktrace only during development
app.use((err, req, res, next) => // eslint-disable-line no-unused-vars
  res.status(err.status).json({
    message: err.isPublic ? err.message : httpStatus[err.status],
    stack: config.env === 'development' ? err.stack : {}
  })
)

module.exports = app
