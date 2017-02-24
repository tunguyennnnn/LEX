const prodConfig = {
  env: 'production',
  db: process.env.DB || 'mongodb://mongo/api_server',
  port: process.env.PORT || 4000
}

module.exports = prodConfig
