const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const webpackBaseConfig = require('./webpack.config.base.js')

// Paths to be used for webpack configuration
const paths = {
  appSrc: path.join(process.cwd(), 'src'),
  appIndex: path.join(process.cwd(), 'src', 'index.js'),
  appBuild: path.join(process.cwd(), 'dist'),
  public: '/',
}

const webpackConfig = merge(webpackBaseConfig, {
  mode: 'production',
  entry: {
    main: [
      // Your app's code
      paths.appIndex,
    ],
  },
  output: {
    // This is the productin JS bundle containing code from all our entry points.
    filename: 'ge-design.js',
    // The output path where webpack will write the bundle
    path: paths.appBuild,
    library: 'GeDesign',
    libraryTarget: 'umd',
    libraryExport: 'default',
  },
  plugins: [
    // Makes environment variables available to the JS code, fallback to 'production'
    new webpack.DefinePlugin({
      PRODUCTION: JSON.stringify(process.env.NODE_ENV === 'production'),
    }),
  ],
  devtool: 'cheap-module-source-map',
})

module.exports = webpackConfig
