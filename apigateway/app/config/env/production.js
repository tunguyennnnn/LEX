console.log(process.env)
const prodConfig = {
  env: 'production',
  db: process.env.DB || 'mongodb://mongo/videostext',
  port: process.env.PORT || 4000,
  transcriberBaseUrl: 'http://transcriber'
}

module.exports = prodConfig
