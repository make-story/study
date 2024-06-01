# 웹팩(Webpack) 빌드 성능개선 (최적화)

## 토스, 자바스크립트 번들 다이어트

https://toss.im/slash-21/sessions/3-2

---

## 빌드 캐시

https://npmtrends.com/cache-loader-vs-happypack-vs-hard-source-webpack-plugin

### hard-source-webpack-plugin

Hard Source Webpack Plugin은 웹팩 내부 모듈 처리의 중간 결과를 캐싱하도록 설계된 플러그인  
웹팩이 다시 외부 모듈들을 탐색하는 등의 작업을 캐시내역으로 읽기 때문에 빠른 빌드를 수행

2018 년 이후 업데으트 중단됨!
https://velog.io/@crackco/Webpack-Hard-Source-Webpack-Plugin-%EC%A0%81%EC%9A%A9-%EC%8B%A4%ED%8C%A8%EA%B8%B0

### hard-source-webpack-plugin-fixed-hashbug

hard-source-webpack-plugin 개선버전

### cache-loader

cache-loader  
또는  
https://webpack.kr/configuration/cache/

---

## 웹팩 런타임을 인라인으로 처리해서 http request 를 절약하기

HTML 에 스크립트 포함

https://yceffort.kr/2020/07/make-use-of-long-term-caching

HtmlWebpackPlugin 을 활용하여 html을 만든다면, InlineSourcePlugin 을 활용

```javascript
// webpack.config.js
const HtmlWebpackPlugin = require("html-webpack-plugin");
const InlineSourcePlugin = require("html-webpack-inline-source-plugin");

module.exports = {
  plugins: [
    new HtmlWebpackPlugin({
      // Inline all files which names start with "runtime~" and end with ".js".
      // That’s the default naming of runtime chunks
      inlineSource: "runtime~.+\\.js",
    }),
    // This plugin enables the "inlineSource" option
    new InlineSourcePlugin(),
  ],
};
```

1. WebpackManifestPlugin 을 추가하여 생성된 런타임 chunk 의 이름을 알아낸다.

```javascript
// webpack.config.js (for webpack 4)
const ManifestPlugin = require("webpack-manifest-plugin");

module.exports = {
  plugins: [new ManifestPlugin()],
};
```

예를 들어, 만들어진 json 파일

```javascript
// manifest.json
{
  "runtime~main.js": "runtime~main.8e0d62a03.js"
}
```

2. 런타임 chunk 의 내용을 편한대로 인라인으로 적어둔다.

```javascript
// server.js
const fs = require("fs");
const manifest = require("./manifest.json");

const runtimeContent = fs.readFileSync(manifest["runtime~main.js"], "utf-8");

app.get("/", (req, res) => {
  res.send(`
    …
    <script>${runtimeContent}</script>
    …
  `);
});
```

# 당장 필요하지 않은 코드는 레이지 로딩으로 처리하기

https://yceffort.kr/2020/07/make-use-of-long-term-caching#%EB%8B%B9%EC%9E%A5-%ED%95%84%EC%9A%94%ED%95%98%EC%A7%80-%EC%95%8A%EC%9D%80-%EC%BD%94%EB%93%9C%EB%8A%94-%EB%A0%88%EC%9D%B4%EC%A7%80-%EB%A1%9C%EB%94%A9%EC%9C%BC%EB%A1%9C-%EC%B2%98%EB%A6%AC%ED%95%98%EA%B8%B0

더 중요한 요소를 먼저 다운로드 하고, 덜 중요한 것은 나중에 다운로드 하여 페이지 성능 향상에 도움을 줄 수 있다.  
`import()` 함수와 `code-splitting` 을 아래와 같이 활용하자.

```javascript
// videoPlayer.js
export function renderVideoPlayer() { … }

// comments.js
export function renderComments() { … }

// index.js
import {renderVideoPlayer} from './videoPlayer';
renderVideoPlayer();

// …Custom event listener
onShowCommentsClick(() => {
  import('./comments').then((comments) => {
    comments.renderComments();
  });
});
```

`import()`를 활용하여 다이나믹 로딩을 할 모듈을 지정해둔다.  
웹팩이 해당 코드를 만나게 되면, 이를 별도의 chunk 로 분리하게 된다.

그리고 해당 코드를 import() 함수를 만날 때만 실행하게 된다.

## 참고: 바벨

만약 바벨을 사용한다면, syntax-dynamic-import를 사용해야 해당 코드를 사용할 수 있다.  
(@babel/preset-env 프리셋에는 포함된 기능!)  
https://babeljs.io/docs/babel-plugin-syntax-dynamic-import
