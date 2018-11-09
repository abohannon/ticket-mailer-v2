const webpack = require('webpack')
const merge = require('webpack-merge')
const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const common = require('./webpack.common.js')

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    port: 3000,
    hotOnly: true,
    historyApiFallback: true,
    proxy: {
      '/api/*': 'http://localhost:3001',
    },
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      NODE_ENV: JSON.stringify('development'),
      API_HOST: JSON.stringify('http://localhost:3000/api'),
      SHOPIFY_STORE_URL: JSON.stringify('https://ticketmailerdev.myshopify.com'),
    }),
  ],
})
