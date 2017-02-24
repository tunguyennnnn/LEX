const devConfig = {
  env: 'development',
  MONGOOSE_DEBUG: true,
  db: process.env.REMOTE_MONGO,
  secret: 'tusamjavier',
}

module.exports = devConfig
