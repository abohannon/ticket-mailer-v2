const webpack = require('webpack')
const merge = require('webpack-merge')
const common = require('./webpack.common.js')

module.exports = merge(common, {
  mode: 'production',
  plugins: [
    new webpack.DefinePlugin({
      NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      API_HOST: JSON.stringify(process.env.API_HOST),
      SHOPIFY_STORE_URL: JSON.stringify('https://showstubs.myshopify.com'),
    }),
  ],
})
