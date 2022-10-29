
# next.config.js
```javascript
module.exports = withBundleAnalyzer({
  distDir: '.next',
  webpack(config) {
    console.log(config);
    const prod = process.env.MODE_ENV === 'production';
    return {
      ...config,
      mode: prod ? 'production' : 'development',
      devtool: prod ? 'hidden-source-map' : 'eval',
      // 소스코드 숨기면서 에러 시 소스맵 제공 : 빠르게 웹팩 적용
    };
  },
});
```

# development
```javascript
{
  mode: 'development',
  name: 'server',
  target: 'node',
  devtool: 'cheap-module-source-map',
  externals: undefined,
  optimization: {
    checkWasmTypes: false,
    nodeEnv: false,
    splitChunks: { cacheGroups: [Object] },
    runtimeChunk: { name: 'static/runtime/webpack.js' },
    minimize: false,
    minimizer: [ [TerserPlugin], [CssMinimizerPlugin] ]
  },
  context: '/Users/sjh/React-project/react-nodebird/ch1/front',
  node: { setImmediate: false },
  entry: [AsyncFunction: entry],
  output: {
    path: '/Users/sjh/React-project/react-nodebird/ch1/front/.next',
    filename: [Function: filename],
    libraryTarget: 'var',
    hotUpdateChunkFilename: 'static/webpack/[id].[hash].hot-update.js',
    hotUpdateMainFilename: 'static/webpack/[hash].hot-update.json',
    chunkFilename: 'static/chunks/[name].js',
    strictModuleExceptionHandling: true,
    crossOriginLoading: undefined,
    futureEmitAssets: false,
    webassemblyModuleFilename: 'static/wasm/[modulehash].wasm'
  },
  performance: false,
  resolve: {
    extensions: [ '.mjs', '.js', '.jsx', '.json', '.wasm' ],
    modules: [ 'node_modules' ],
    alias: {
      'next/head': 'next/dist/next-server/lib/head.js',
      'next/router': 'next/dist/client/router.js',
      'next/config': 'next/dist/next-server/lib/runtime-config.js',
      'next/dynamic': 'next/dist/next-server/lib/dynamic.js',
      next: '/Users/sjh/React-project/react-nodebird/ch1/front/node_modules/next',
      'private-next-pages': '/Users/sjh/React-project/react-nodebird/ch1/front/pages',
      'private-dot-next': '/Users/sjh/React-project/react-nodebird/ch1/front/.next',
      'unfetch$': '/Users/sjh/React-project/react-nodebird/ch1/front/node_modules/next/dist/build/polyfills/fetch/index.js',
      'isomorphic-unfetch$': '/Users/sjh/React-project/react-nodebird/ch1/front/node_modules/next/dist/build/polyfills/fetch/index.js',
      'whatwg-fetch$': '/Users/sjh/React-project/react-nodebird/ch1/front/node_modules/next/dist/build/polyfills/fetch/whatwg-fetch.js',
      'object-assign$': '/Users/sjh/React-project/react-nodebird/ch1/front/node_modules/next/dist/build/polyfills/object-assign.js',
      'object.assign/auto': '/Users/sjh/React-project/react-nodebird/ch1/front/node_modules/next/dist/build/polyfills/object.assign/auto.js',
      'object.assign/implementation': '/Users/sjh/React-project/react-nodebird/ch1/front/node_modules/next/dist/build/polyfills/object.assign/implementation.js',
      'object.assign$': '/Users/sjh/React-project/react-nodebird/ch1/front/node_modules/next/dist/build/polyfills/object.assign/index.js',
      'object.assign/polyfill': '/Users/sjh/React-project/react-nodebird/ch1/front/node_modules/next/dist/build/polyfills/object.assign/polyfill.js',
      'object.assign/shim': '/Users/sjh/React-project/react-nodebird/ch1/front/node_modules/next/dist/build/polyfills/object.assign/shim.js',
      url: '/Users/sjh/React-project/react-nodebird/ch1/front/node_modules/native-url/dist/index.js'
    },
    mainFields: [ 'browser', 'module', 'main' ],
    plugins: [ [Object] ]
  },
  resolveLoader: {
    alias: {
      'emit-file-loader': '/Users/sjh/React-project/react-nodebird/ch1/front/node_modules/next/dist/build/webpack/loaders/emit-file-loader',
      'error-loader': '/Users/sjh/React-project/react-nodebird/ch1/front/node_modules/next/dist/build/webpack/loaders/error-loader',
      'next-babel-loader': '/Users/sjh/React-project/react-nodebird/ch1/front/node_modules/next/dist/build/webpack/loaders/next-babel-loader',
      'next-client-pages-loader': '/Users/sjh/React-project/react-nodebird/ch1/front/node_modules/next/dist/build/webpack/loaders/next-client-pages-loader',
      'next-data-loader': '/Users/sjh/React-project/react-nodebird/ch1/front/node_modules/next/dist/build/webpack/loaders/next-data-loader',
      'next-serverless-loader': '/Users/sjh/React-project/react-nodebird/ch1/front/node_modules/next/dist/build/webpack/loaders/next-serverless-loader',
      'noop-loader': '/Users/sjh/React-project/react-nodebird/ch1/front/node_modules/next/dist/build/webpack/loaders/noop-loader',
      'next-plugin-loader': '/Users/sjh/React-project/react-nodebird/ch1/front/node_modules/next/dist/build/webpack/loaders/next-plugin-loader'
    },
    modules: [ 'node_modules' ],
    plugins: [ [Object] ]
  },
  module: { rules: [ [Object], [Object] ], strictExportPresence: true },
  plugins: [
    ChunkNamesPlugin {},
    DefinePlugin { definitions: [Object] },
    ReactLoadablePlugin { filename: 'react-loadable-manifest.json' },
    DropClientPage { ampPages: Set {} },
    UnlinkRemovedPagesPlugin { prevAssets: {} },
    NoEmitOnErrorsPlugin {},
    NextJsRequireCacheHotReloader { prevAssets: null },
    AutoDLLPlugin { _originalSettings: [Object] },
    HotModuleReplacementPlugin {
      options: {},
      multiStep: undefined,
      fullBuildTimeout: 200,
      requestTimeout: 10000
    },
    BuildManifestPlugin {
      buildId: 'development',
      clientManifest: true,
      modern: false
    }
  ],
}
```

# production
```javascript
{
  mode: 'production',
  name: 'server',
  target: 'node',
  devtool: false,
  externals: undefined,
  optimization: {
    checkWasmTypes: false,
    nodeEnv: false,
    splitChunks: {
      chunks: 'all',
      cacheGroups: [Object],
      maxInitialRequests: 25,
      minSize: 20000
    },
    runtimeChunk: { name: 'static/runtime/webpack.js' },
    minimize: true,
    minimizer: [ [TerserPlugin], [CssMinimizerPlugin] ]
  },
  context: '/Users/sjh/React-project/react-nodebird/ch1/front',
  node: { setImmediate: false },
  entry: [AsyncFunction: entry],
  output: {
    path: '/Users/sjh/React-project/react-nodebird/ch1/front/.next',
    filename: [Function: filename],
    libraryTarget: 'var',
    hotUpdateChunkFilename: 'static/webpack/[id].[hash].hot-update.js',
    hotUpdateMainFilename: 'static/webpack/[hash].hot-update.json',
    chunkFilename: 'static/chunks/[name].[contenthash].js',
    strictModuleExceptionHandling: true,
    crossOriginLoading: undefined,
    futureEmitAssets: true,
    webassemblyModuleFilename: 'static/wasm/[modulehash].wasm'
  },
  performance: false,
  resolve: {
    extensions: [ '.mjs', '.js', '.jsx', '.json', '.wasm' ],
    modules: [ 'node_modules' ],
    alias: {
      'next/head': 'next/dist/next-server/lib/head.js',
      'next/router': 'next/dist/client/router.js',
      'next/config': 'next/dist/next-server/lib/runtime-config.js',
      'next/dynamic': 'next/dist/next-server/lib/dynamic.js',
      next: '/Users/sjh/React-project/react-nodebird/ch1/front/node_modules/next',
      'private-next-pages': '/Users/sjh/React-project/react-nodebird/ch1/front/pages',
      'private-dot-next': '/Users/sjh/React-project/react-nodebird/ch1/front/.next',
      'unfetch$': '/Users/sjh/React-project/react-nodebird/ch1/front/node_modules/next/dist/build/polyfills/fetch/index.js',
      'isomorphic-unfetch$': '/Users/sjh/React-project/react-nodebird/ch1/front/node_modules/next/dist/build/polyfills/fetch/index.js',
      'whatwg-fetch$': '/Users/sjh/React-project/react-nodebird/ch1/front/node_modules/next/dist/build/polyfills/fetch/whatwg-fetch.js',
      'object-assign$': '/Users/sjh/React-project/react-nodebird/ch1/front/node_modules/next/dist/build/polyfills/object-assign.js',
      'object.assign/auto': '/Users/sjh/React-project/react-nodebird/ch1/front/node_modules/next/dist/build/polyfills/object.assign/auto.js',
      'object.assign/implementation': '/Users/sjh/React-project/react-nodebird/ch1/front/node_modules/next/dist/build/polyfills/object.assign/implementation.js',
      'object.assign$': '/Users/sjh/React-project/react-nodebird/ch1/front/node_modules/next/dist/build/polyfills/object.assign/index.js',
      'object.assign/polyfill': '/Users/sjh/React-project/react-nodebird/ch1/front/node_modules/next/dist/build/polyfills/object.assign/polyfill.js',
      'object.assign/shim': '/Users/sjh/React-project/react-nodebird/ch1/front/node_modules/next/dist/build/polyfills/object.assign/shim.js',
      url: '/Users/sjh/React-project/react-nodebird/ch1/front/node_modules/native-url/dist/index.js'
    },
    mainFields: [ 'browser', 'module', 'main' ],
    plugins: [ [Object] ]
  },
  resolveLoader: {
    alias: {
      'emit-file-loader': '/Users/sjh/React-project/react-nodebird/ch1/front/node_modules/next/dist/build/webpack/loaders/emit-file-loader',
      'error-loader': '/Users/sjh/React-project/react-nodebird/ch1/front/node_modules/next/dist/build/webpack/loaders/error-loader',
      'next-babel-loader': '/Users/sjh/React-project/react-nodebird/ch1/front/node_modules/next/dist/build/webpack/loaders/next-babel-loader',
      'next-client-pages-loader': '/Users/sjh/React-project/react-nodebird/ch1/front/node_modules/next/dist/build/webpack/loaders/next-client-pages-loader',
      'next-data-loader': '/Users/sjh/React-project/react-nodebird/ch1/front/node_modules/next/dist/build/webpack/loaders/next-data-loader',
      'next-serverless-loader': '/Users/sjh/React-project/react-nodebird/ch1/front/node_modules/next/dist/build/webpack/loaders/next-serverless-loader',
      'noop-loader': '/Users/sjh/React-project/react-nodebird/ch1/front/node_modules/next/dist/build/webpack/loaders/noop-loader',
      'next-plugin-loader': '/Users/sjh/React-project/react-nodebird/ch1/front/node_modules/next/dist/build/webpack/loaders/next-plugin-loader'
    },
    modules: [ 'node_modules' ],
    plugins: [ [Object] ]
  },
  module: { rules: [ [Object], [Object] ], strictExportPresence: true },
  plugins: [
    ChunkNamesPlugin {},
    DefinePlugin { definitions: [Object] },
    ReactLoadablePlugin { filename: 'react-loadable-manifest.json' },
    DropClientPage { ampPages: Set {} },
    HashedModuleIdsPlugin { options: [Object] },
    IgnorePlugin {
      options: [Object],
      checkIgnore: [Function: bound checkIgnore]
    },
    BuildManifestPlugin {
      buildId: 'SSRdA5nmXdIXFiOiUWAck',
      clientManifest: true,
      modern: false
    },
    NextMiniCssExtractPlugin {
      options: [Object],
      __next_css_remove: true
    },
    BundleAnalyzerPlugin {
      opts: [Object],
      server: null,
      logger: [Logger]
    }
  ],
}
```