const webpackDevConfig = require('./webpack.base.config')
const merge = require('webpack-merge');
const webpack = require('webpack')
module.exports = merge(webpackDevConfig, {
  module: {
    rules: [
      {
        test: /\.less$/,
        use: [
          {loader: 'style-loader'},
          {loader: 'css-loader'},
          {loader: 'less-loader'}
        ]
      },
      {
        test: /\.css$/,
        use: [
          {loader: 'style-loader'},
          {loader: 'css-loader'}
        ]
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 1024*8, // 8k 以下的 base64 内联，不产生图片
            fallback: 'file-loader',
            name: '[name].[ext]?[hash]',
            outputPath: 'image/', // 输出路径
            publicPath: '../image' // 可以问到图片的引用路径
          }
        }
      },
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env': require('../config/dev.env.js')
    }),
  ],
  devServer: {
    host: 'localhost',
    port: 3000,
    hot: true
  } // webpack-dev-derver
})