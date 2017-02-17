const devConfig = {
  env: 'development',
  MONGOOSE_DEBUG: true,
  db: process.env.DB || 'mongodb://localhost/api_server',
  port: 4000
}

module.exports = devConfig

