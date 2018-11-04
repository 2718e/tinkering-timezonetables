const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const ip = require('ip')

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
    port: 3185,
    host: ip.address() // set webpack dev server host to the local machine ip address so can browse to it from mobile device on same lan
  }
})
