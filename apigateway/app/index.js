const mongoose = require('mongoose')
const util = require('util')
const dotenv = require('dotenv')

dotenv.config()
console.log(process.env)

const config = require('./config/env')
const app = require('./config/express')

const debug = require('debug')('api_server:app')
const logger = require('./config/winston')

Promise = require('bluebird')
mongoose.Promise = Promise

// connect to mongo db
mongoose.connect(config.db, { server: { socketOptions: { keepAlive: 1 } } })
mongoose.connection.on('error', () => {
  throw new Error(`unable to connect to database: ${config.db}`)
})

// print mongoose logs in dev env
if (config.MONGOOSE_DEBUG) {
  mongoose.set('debug', (collectionName, method, query, doc) => {
    debug(`${collectionName}.${method}`, util.inspect(query, false, 20), doc)
  })
}

if (!module.parent) {
  // listen on port config.port
  app.listen(config.port, () => {
    logger.info(`Server started on port ${config.port} (${config.env})`)
  })
}

module.exports = app
