const dotenv = require('dotenv')

dotenv.config()

const devConfig = {
  env: 'development',
  MONGOOSE_DEBUG: true,
  db: process.env.REMOTE_MONGO || 'mongodb://localhost/videostext',
  secret: 'tusamjavier',
  port: process.env.PORT || 4000,
  transcriberBaseUrl: 'http://localhost:5000'
}

module.exports = devConfig
