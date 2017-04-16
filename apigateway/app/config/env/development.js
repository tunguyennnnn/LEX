const dotenv = require('dotenv')

dotenv.config()

const devConfig = {
  env: 'development',
  MONGOOSE_DEBUG: true,
  db: process.env.REMOTE_MONGO || 'mongodb://localhost/videostext',
  secret: 'tusamjavier',
  port: process.env.PORT || 4000,
  queueClientBaseUrl: 'http://localhost:8005'
}

module.exports = devConfig
