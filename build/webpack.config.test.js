const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpackStyleConfig = require('./webpack.config.style.js')

// Paths to be used for webpack configuration
const paths = {
  appSrc: path.join(process.cwd(), 'src'),
  appIndex: path.join(process.cwd(), 'src', 'index.js'),
  appBuild: path.join(process.cwd(), 'dist'),
  public: '/',
  templateHtml: path.join(process.cwd(), 'public', 'index.html'),
  appTest: path.join(process.cwd(), 'test'),
}

const webpackConfig = merge(webpackStyleConfig, {
  resolve: {
    alias: {
      '~': path.join(process.cwd()),
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
  plugins: [
    // Makes environment variables available to the JS code, fallback to 'production'
    new webpack.DefinePlugin({
      TEST: JSON.stringify(process.env.NODE_ENV === 'test'),
    }),
    // Generates an `index.html` file with the <script> injected.
    new HtmlWebpackPlugin({
      template: paths.templateHtml,
      inject: true,
      hash: true,
    }),
  ],
  devtool: 'cheap-module-source-map',
})

module.exports = webpackConfig
