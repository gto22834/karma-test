// Karma configuration
// Generated on Thu Dec 31 2020 15:55:37 GMT+0800 (台北標準時間)
const webpack = require("webpack");
const path = require('path')
const webpackConfig = require('./build/webpack.config.test')

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    // NOTE: webpack is necessary to run testing
    frameworks: ['webpack', 'mocha', 'chai'],


    // list of files / patterns to load in the browser
    files: [
      'src/**/*.js',
      // Load external file from url
      {
        pattern: 'https://cdn.jsdelivr.net/npm/fabric@4.2.0/dist/fabric.js',
        watched: false,
        included: true,
      },
      'test/**/*.test.js'
    ],


    // list of files / patterns to exclude
    exclude: [
      'https://cdn.jsdelivr.net/npm/fabric@4.2.0/dist/fabric.js'
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'src/**/*.js': ['webpack', 'coverage'],
      'test/**/*.test.js': ['webpack'],
    },

    // Webpack配置
    webpack: webpackConfig,
    // Webpack中介軟體
    webpackMiddleware: {
      // noInfo: true,
      stats: 'errors-only',
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['mocha', 'coverage'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: [
      'Chrome',
      // 'Firefox'
    ],

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity,

    coverageReporter: {
      // 生成报告的目录
      dir: 'coverage/',
      // 要生成的报告类型
      reporters: [
        { type: 'lcov', subdir: '.' },
        { type: 'text', subdir: '.', file: 'text.txt' },
        { type: 'text-summary', subdir: '.', file: 'text-summary.txt' }
      ]
    },

    plugins: [
      'karma-coverage',
      'karma-mocha',
      'karma-mocha-reporter',
      'karma-chai',
      'karma-webpack',
      'karma-chrome-launcher',
      'karma-firefox-launcher'
    ]
  })
}
