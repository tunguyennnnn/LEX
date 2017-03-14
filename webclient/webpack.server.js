const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const config = require('./webpack.config')

new WebpackDevServer(webpack(config), {
  publicPath: '/',
  hot: true,
  historyApiFallback: true,
  quiet: false,
  noInfo: false,
  stats: {
    // assets: false,
    colors: true,
    version: true,
    hash: false
    // timings: false,
    // chunks: false
    // chunkModules: false
  }
}).listen(8001, 'localhost', function (err) {
  if (err) {
    console.log(err)
  }
  console.log('Listening at localhost:8001')
})
