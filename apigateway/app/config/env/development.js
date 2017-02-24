const devConfig = {
  env: 'development',
  MONGOOSE_DEBUG: true,
  db: process.env.REMOTE_MONGO,
  secret: 'tusamjavier',
  port: 4000
}

module.exports = devConfig
