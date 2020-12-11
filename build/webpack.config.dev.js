'use strict'

// Silence webpack2 deprecation warnings
// https://github.com/vuejs/vue-loader/issues/666
process.noDeprecation = true

const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// Base
const webpackBaseConfig = require('./webpack.config.base.js')

// Paths to be used for webpack configuration
const paths = {
  appSrc: path.join(process.cwd(), 'src'),
  appIndex: path.join(process.cwd(), 'src', 'index.js'),
  appBuild: path.join(process.cwd(), 'dist'),
  public: '/',
  templateHtml: path.join(process.cwd(), 'public', 'index.html'),
  appTest: path.join(process.cwd(), 'test'),

  // static files
  static: path.join(process.cwd(), 'static'),
}

const env = process.env.NODE_ENV || 'development'
const port = process.env.PORT || 9800

const webpackConfig = merge(webpackBaseConfig, {
  mode: env,
  // https://webpack.js.org/configuration/dev-server/
  devServer: {
    // https://github.com/webpack/webpack-dev-server/issues/2484
    injectClient: false,
    compress: true,
    // contentBase: false // By default it will use your current working directory to serve content.
    // watchContentBase: true,
    open: false,
    openPage: '',
    port,
    hot: true,
    // inline: true, // 设置为true，当源文件改变时会自动刷新页面
    historyApiFallback: true, // 在开发单页应用时非常有用，它依赖于HTML5 history API，如果设置为true，所有的跳转将指向index.html
    publicPath: '/',
  },
  entry: {
    main: [
      // Include an alternative client for WebpackDevServer. A client's job is to
      // connect to WebpackDevServer by a socket and get notified about changes.
      // When you save a file, the client will either apply hot updates (in case
      // of CSS changes), or refresh the page (in case of JS changes). When you
      // make a syntax error, this client will display a syntax error overlay.
      // Note: instead of the default WebpackDevServer client, we use a custom one
      // to bring better experience from Create React App users. You can replace
      // the line below with these two lines if you prefer the stock client:
      require.resolve('webpack-dev-server/client') + '?/',
      // NOTE: Use 'webpack/hot/dev-server' to avoid `sockjs-node/info?t=1486292316677 404 Error`
      require.resolve('webpack/hot/dev-server'),
      // require.resolve('react-dev-utils/webpackHotDevClient'),
      // Your app's code
      paths.appIndex,
    ],
  },
  plugins: [
    // Makes environment variables available to the JS code, fallback to 'development'
    new webpack.DefinePlugin({
      DEVELOPMENT: JSON.stringify(process.env.NODE_ENV === 'development'),
    }),
    // This is necessary to emit hot updates (currently CSS only):
    new webpack.HotModuleReplacementPlugin(),
    // Generates an `index.html` file with the <script> injected.
    new HtmlWebpackPlugin({
      template: paths.templateHtml,
      inject: true,
      hash: true,
    }),
  ],
  devtool: 'inline-source-map',
})

module.exports = webpackConfig
