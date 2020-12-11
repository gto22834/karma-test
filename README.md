# 2020 Test review
https://medium.com/welldone-software/an-overview-of-javascript-testing-7ce7298b9870

## Update to webpack 5

### Issue

- `development` 環境下，Webpack configuration 的變動

```js

// webpack.config.js
module.export = {
  mode: 'development', // 這個一定要添加
  entry: [  // entry: './src/main.js' 一定要設定 webpack-dev-server 的 entry 不然無法吃到監聽及變數
    // Include an alternative client for WebpackDevServer. A client's job is to
    // connect to WebpackDevServer by a socket and get notified about changes.
    // When you save a file, the client will either apply hot updates (in case
    // of CSS changes), or refresh the page (in case of JS changes). When you
    // make a syntax error, this client will display a syntax error overlay.
    // Note: instead of the default WebpackDevServer client, we use a custom one
    // to bring better experience from Create React App users. You can replace
    // the line below with these two lines if you prefer the stock client:
    require.resolve('webpack-dev-server/client') + '?/', // 必要
    // NOTE: Use 'webpack/hot/dev-server' to avoid `sockjs-node/info?t=1486292316677 404 Error`
    require.resolve('webpack/hot/dev-server'), // 必要
    // Your app's code
    path.join(process.cwd(), 'path', 'to', 'src', 'index.js'), // 入口 index.js 必要
  ],
  devServer: {
    // https://github.com/webpack/webpack-dev-server/issues/2484
    injectClient: false, // 必要，不設定會無法吃入 library 設定的變數
    compress: true,
    // contentBase: false // By default it will use your current working directory to serve content.
    // watchContentBase: true,
    open: false,
    openPage: '',
    port: 9999,
    hot: true,
    // inline: true, // 设置为true，当源文件改变时会自动刷新页面
    historyApiFallback: true, // 在开发单页应用时非常有用，它依赖于HTML5 history API，如果设置为true，所有的跳转将指向index.html
    publicPath: '/',
  },
  output: {
    // This does not produce a real file. It's just the virtual path that is
    // served by WebpackDevServer in development. This is the JS bundle
    // containing code from all our entry points, and the Webpack runtime.
    filename: 'ge-test.js',
    // Not used in dev but WebpackDevServer crashes without it:
    path: path.join(process.cwd(), 'dist'), // 打包後要放入的位置 （通常都是 dist）
    // The URL that app is served from. We use "/" in development.
    publicPath: '/',
    library: 'GeTest', // Library 名稱
    libraryTarget: 'umd', // 一定是 umd
    libraryExport: 'default', // 一定是 default 因為 Library 是 export default xxx
    // To make UMD build available on both browsers and Node.js, set output.globalObject option to 'this'.
    // https://webpack.js.org/configuration/output/#outputglobalobject
    globalObject: 'this',
  },
  devtool: 'inline-source-map', // `development` 用 `inline-source-map` 就好，才能看 error 行數 debug
}
```
