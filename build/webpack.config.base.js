const path = require('path')
const merge = require('webpack-merge')
const webpackStyleConfig = require('./webpack.config.style.js')

const webpackConfig = merge({
  resolve: {
    alias: {
      '~': path.join(process.cwd(), 'src'),
    },
  },
  module: {
    rules: [
      /**
       * babel loader for js
       * https://github.com/babel/babel-loader
       */
      {
        // We use babel-loader to transipile every .js or .jsx file
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: [/node_modules/],
        // Including over excluding as a whitelist is easier to maintain than a blacklist.
        // as per http://stackoverflow.com/questions/31675025/how-to-exclude-nested-node-module-folders-from-a-loader-in-webpack
        include: path.join(process.cwd(), 'test'),
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
        },
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
        },
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
        },
      },
    ],
  },
}, webpackStyleConfig)

module.exports = webpackConfig
