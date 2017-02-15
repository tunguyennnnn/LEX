const prodConfig = {
  env: 'production',
  db: 'mongodb://mongo/api_server',
  port: process.env.PORT || 4000
}

module.exports = prodConfig
