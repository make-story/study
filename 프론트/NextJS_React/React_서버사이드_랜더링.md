# 리액트 서버사이드 렌더링 구축

리액트

```
$ npm install react react-dom
```

바벨

```
$ npm install @babel/core @babel/preset-env @babel/preset-react
```

웹팩

```
$ npm install webpack webpack-cli babel-loader clean-webpack-plugin html-webpack-plugin
```

서버사이드 렌더링을 위한 패키지

```
$ npm install express @babel/cli @babel/plugin-transform-modules-commonjs
```

- 웹 서버를 띄우기 위해 express 패키지를 설치한다.
- @babel/cli 패키지는 서버에서 사용될 자바스크립트 파일을 컴파일할 떄 사용된다.
- 서버에서도 리액트의 JSX 문법으로 작성된 자바스크립트를 실행해야 하므로 바벨이 필요하다.
- ESM 으로 작성된 모둘 시스템을 commonJS 로 변경하기 위해 @babel/plugin-transform-modules-commonjs 패키지를 설치했다.
- 서버에서는 노드 환경에서 자바스크립트를 실행하기 때문에 commonJS 모듈 시스템이 필요하다.

```
$ npm install webpack-node-externals
```

서버 코드를 번들링할 때는 node_modules 폴더 밑에 있는 모듈까지 하나의 번들 파일로 만들 필요는 없다.

- webpack.config.js

```javascript
// webpack.config.js

// ...
const nodeExternals = require('webpack-node-externals');

function getConfig(isServer) {
  return {
    entry: isServer
      ? { server: './src/server.js' }
      : { main: './src/index.js' },
    output: {
      // 클라이언트는 브라우저의 캐싱 효과 때문에 chunkhash 를 사용하지만, 서버는 필요없다.
      filename: isServer ? '[name].bundle.js' : '[name].[chunkhash].js',
      path: path.resolve(__dirname, 'dist'),
      publicPath: '/dist/',
    },
    // 웹팩은 target 속성에 node가 입력되면 노드에 특화된 번들링 과정을 거친다.
    // (대표적으로 fs, path 모듈과 같이 노드에 내장된 모듈을 번들에 포함시키지 않는다.)
    target: isServer ? 'node' : 'web',
    externals: isServer ? [nodeExternals()] : [],
    node: {
      // 이 설정을 하지 않으면 코드에서 __dirname을 사용할 경우 절대 경로인 슬래시(/)가 입력된다.
      // false 를 입력할 경우 일반적인 노드의 __dirname 으로 동작한다.
      __dirname: false
    },
    optimization: isServer
      ? {
          // 서버 코드는 압축할 필요가 없다.
          splitChunks: false
        }
      : undefined,
    module: {
      rules: [
        {
          test: '/\.js$/,
          use: {
            loader: 'babel-loader',
            options: {
              configFile: path.resolve(
                __dirname,
                isServer ? '.babelrc.server.js' : '.babelrc.client.js',
              ),
            },
          },
        },
        {
          test: /\.(png|jpg|gif)$/,
          use: {
            loader: 'file-loader',
            options: {
              // file-loader 실행 시 한쪽에서만 파일을 복사해도 충분하다.
              emitFile: isServer ? false : true,
            }
          }
        }
      ]
    },
    plugins: isServer
      ? []
      : [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
          template: './template/index.html',
        }),
      ],
    mode: 'production',
  };
}

// 웹팩 설정 파일에서 배열을 내보내면 배열의 각 아이템 개수만큼 웹팩이 실행된다.
module.exports = [getConfig(false), getConfig(true)];
```

---

## 서버사이드 렌더링 함수

- renderToString
- renderToNodeStream
- renderToStaticMarkup
- renderToStaticNodeStream

## react hydrate 함수

`리액트에서 제공하는 hydrate 함수는 서버사이드 렌더링의 결과로 만들어진 돔 요소에 필요한 이벤트 처리 함수를 붙여준다.`

```javascript
// ...
React.hydrate(<App page='home' />, document.getElementById('root'));
```
