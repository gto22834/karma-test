const path = require('path')
const merge = require('webpack-merge')
const webpackStyleConfig = require('./webpack.config.style.js')

const webpackConfig = merge({
  output: {
    // This does not produce a real file. It's just the virtual path that is
    // served by WebpackDevServer in development. This is the JS bundle
    // containing code from all our entry points, and the Webpack runtime.
    filename: 'ku-karma-test.js',
    // Not used in dev but WebpackDevServer crashes without it:
    path: path.join(process.cwd(), 'dist'),
    // The URL that app is served from. We use "/" in development.
    publicPath: '/',
    library: 'KuKarmaTest',
    libraryTarget: 'umd',
    libraryExport: 'default',
    // To make UMD build available on both browsers and Node.js, set output.globalObject option to 'this'.
    // https://webpack.js.org/configuration/output/#outputglobalobject
    globalObject: 'this',
  },
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
        include: path.join(process.cwd(), 'src'),
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
