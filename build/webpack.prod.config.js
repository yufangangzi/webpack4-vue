const path = require('path')
const webpackDevConfig = require('./webpack.base.config')
const CleanWebpackPlaugin = require('clean-webpack-plugin') // 清空dist 文件
const merge = require('webpack-merge');
const uglify = require('uglifyjs-webpack-plugin')
const webpack = require('webpack')
const extractTextPlugin = require('mini-css-extract-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
module.exports = merge(webpackDevConfig, {
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.less$/,
        use: [
          {loader: extractTextPlugin.loader},
          {loader: 'css-loader'},
          {loader: 'less-loader'}
        ]
      },
      {
        test: /\.css$/,
        use: [
          {loader: extractTextPlugin.loader},
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
            publicPath: '/shianmanage/image' // 可以问到图片的引用路径
          }
        }
      },
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': require('../config/prod.env.js')
    }),
    new CleanWebpackPlaugin(['dist/*'], {
      root: path.resolve(__dirname, '../')
    }),
    new uglify({
      uglifyOptions: {
        mangle: true,
        output: {
            beautify: false,
        },
      }
    }),
    new extractTextPlugin({
      filename: './style/[name].css'
    }),
    new OptimizeCSSPlugin({
      cssProcessorOptions:{
        safe: true
      }
    }),
    // new BundleAnalyzerPlugin()
  ],
  optimization: {
    splitChunks: {
        cacheGroups: {
            common: {
                chunks: "initial",
                name: "common",
                enforce: true,
                minChunks: 2,       //表示提取公共部分最少的文件数
                minSize: 0          //表示提取公共部分最小的大小
            }
        }
    }
  },
  performance: {
    hints: "warning", // 枚举
    maxAssetSize: 30000000, // 整数类型（以字节为单位）
    maxEntrypointSize: 50000000, // 整数类型（以字节为单位）
    assetFilter: function(assetFilename) {
    // 提供资源文件名的断言函数
    return assetFilename.endsWith('.css') || assetFilename.endsWith('.js');
    
    }
},
})