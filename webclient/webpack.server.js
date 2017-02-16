var Server = require('webpack-dev-server')
var config = require('./webpack.config.js')
var webpack = require('webpack')
var _ = require('lodash')
var HtmlWebpackPlugin = require('html-webpack-plugin')

var devConfig = _.extend(config, {
  watch: true,
  port: 8080
})

devConfig.plugins.push(new HtmlWebpackPlugin({
  title: 'lex',
  template: 'dist/index.html',
  inject: 'head'
}))

var compiler = webpack(devConfig)

const webserver = new Server(compiler, {
  historyApiFallback: true,
  stats: {colors: true}
})

webserver.listen(devConfig.port, '0.0.0.0', () => {})

console.log('Running on port ' + devConfig.port)
