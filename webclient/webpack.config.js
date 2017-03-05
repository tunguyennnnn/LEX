const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const env = process.env.NODE_ENV
const dev = env !== 'production'

const plugins = [
  new webpack.ProvidePlugin({
    $: 'jquery',
    jQuery: 'jquery',
    'window.videojs': 'video.js'
  }),
  new HtmlWebpackPlugin({
    hash: true,
    filename: 'index.html',
    template: 'index.ejs',
    title: `LEX (${env})`
  })
]

module.exports = {
  devtool: dev ? 'inline-sourcemap' : null,
  entry: {
    lex: ['./src/index.js']
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
    library: 'lex',
    libraryTarget: 'umd'
  },
  module: {
    loaders: [{
      test: /\.js.*$/,
      loader: 'babel',
      exclude: /node_modules/
    }, {
      test: /\.css$/,
      loader: 'style-loader!css-loader'
    }, {
      test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'file'
    }, {
      test: /\.(woff|woff2)$/,
      loader: 'url?prefix=font/&limit=5000'
    }, {
      test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'url?limit=10000&mimetype=application/octet-stream'
    }, {
      test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'url?limit=10000&mimetype=image/svg+xml'
    }]
  },
  plugins: dev ? plugins : [
    ...plugins,
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false })
  ]
}
