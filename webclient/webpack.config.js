const path = require('path')
const webpack = require('webpack')

module.exports = {
  devtool: 'source-map',
  entry: {
    lex: ['./app/index.js']
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
    }]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin()
  ]
}
