const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'production',
  devServer: {
    contentBase: path.join(__dirname, 'public/'),
    publicPath: 'dist/',
  },
});