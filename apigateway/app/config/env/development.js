const devConfig = {
  env: 'development',
  MONGOOSE_DEBUG: true,
  db: process.env.REMOTE_MONGO || 'mongodb://localhost/videostext',
  secret: 'tusamjavier',
}

module.exports = devConfig
