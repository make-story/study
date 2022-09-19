# Next.js 환경구축

```
$ npm install next react react-dom
```

넥스트에서 모든 페이지 컴포넌트는 pages 폴더 밑에 만들어야 한다.

## Next.js 브라우저 지원

https://nextjs.org/docs/basic-features/supported-browsers-features

---

# 웹 서버 직접 띄우기

```
$ npm install express
```

server.js

```javascript
const express = require('express');
const next = require('next');

const port = 3000;
const dev = process.env.NODE_ENV !== 'production';

// 넥스트를 실행하기 위해 필요한 객체와 함수를 생성한다.
const app = next({ dev });
const handle = app.getRequestHandler();

// 넥스트의 준비 과정이 끝나면 입력된 함수를 실행한다.
app.prepare().then(() => {
  const server = express();

  server.get('/page/:id', (req, res) => {
    res.redirect(`/page${req.params.id}`);
  });
  server.get('*', (req, res) => {
    // 다른 모든 GET 요청은 handle 함수가 처리하도록 한다.
    return handle(req, res);
  });

  server.listen(port, err => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
```

운영(production)모드로 실행할 경우에는 먼저 빌드를 해야한다.

```
$ npx next build
NODE_ENV=production node server.js
```

---

## 넥스트의 번들 파일 분석하기

`넥스트는 프로젝트 루트의 .next 폴더 밑에 번들 파일을 생성`한다.
번들(빌드) 파일 CDN 분리 배포로 설정할 경우 `distDir`, `assetPrefix` next.config.js 설정 필요

## 기본 빌드(.next) 폴더 변경

https://nextjs.org/docs/api-reference/next.config.js/setting-a-custom-build-directory

```javascript
module.exports = {
  distDir: '_next',
};
```

## CDN URL 프리픽스 설정 (번들 파일을 CDN에 업로드하여 로드할 경우)

https://nextjs.org/docs/api-reference/next.config.js/cdn-support-with-asset-prefix

```javascript
const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  // Use the CDN in production and localhost for development.
  assetPrefix: isProd ? 'https://cdn.mydomain.com' : undefined,
};
```

위와 같이 설정할 경우, assetPrefix 설정 URL 하위로 /\_next/ 경로가 설정됨

## 전역 스타일 (.css 파일 import)

https://nextjs.org/docs/basic-features/built-in-css-support#adding-a-global-stylesheet

`pages/_app.js` 파일 위치에서 import  
Next.js 9.5.4 부터 CSS 파일을 가져오는 것은 node_modules애플리케이션의 모든 위치에서 허용됩니다.  
Next.js는 파일 명명 규칙 을 사용하여 CSS 모듈 을 지원합니다. ([name].module.css)

---

# 웹팩 설정 변경하기

넥스트에서는 정작 파일을 서비스하기 위해 프로젝트 루트의 static 폴더를 이용한다.

next.config.js

```javascript
module.exports = {
  webpack: config => {
    // 웹팩 설정을 변경하기 위한 함수
    config.module.rules.push({
      test: /.(png|jpg)$/,
      use: [
        {
          loader: 'file-loader',
          options: {
            name: '[path][name].[ext]?[hash]', // 쿼리 파라미터 부분에 해시를 추가해서 파일의 내용이 변경될 때마다 파알의 경로도 수정되도록 한다.
            emitFile: false, // 넥스트는 static 폴더의 정적 파일을 그대로 서비스하기 때문에 파일을 복사할 필요가 없다.
            publicPath: '/',
          },
        },
      ],
    });
    return config;
  },
};
```

---

## Next.js 필요한 것만 빨리 배우기

https://velog.io/@jakeseo_me/Next.js-%EB%B9%A8%EB%A6%AC-%EB%B0%B0%EC%9A%B0%EA%B8%B0-y0jz9oebn0

## next-redux-wrapper가 필요한 이유

https://simsimjae.medium.com/next-redux-wrapper%EA%B0%80-%ED%95%84%EC%9A%94%ED%95%9C-%EC%9D%B4%EC%9C%A0-5d0176209d14

## hydration

https://wonit.tistory.com/362  
initial load 에서 html 을 로드한 뒤 js 파일을 서버로부터 받아 html을 연결시키는 과정이다.  
여기서 js랑 html이랑 연결한다.  
해당 과정에서 react 컴포넌트는 초기화되고 사용자와 상호작용할 준비를 마친다.

### dehydrate와 hydrate

https://seogeurim.tistory.com/19  
서버 사이드에서 먼저 정적인 페이지(HTML)를 렌더링하고, 클라이언트에서 HTML을 받아오고, JS 코드가 모두 로드되면,  
이 HTML에 이벤트 핸들러 등을 붙여 동적인 페이지를 만드는 과정을 hydration이라 말한다.
hydration을 직역하면 '수분 공급'이라는 뜻인데, 즉 건조한 HTML에 수분(인터랙션, 이벤트 핸들러 등)을 공급하여 동적인 페이지를 만들어나가는 과정을 말한다.

## Next.js pre-rendering 정리

https://helloinyong.tistory.com/306

## Next.js 의 서버사이드 렌더링에 Redux 적용하기

https://slog.website/post/14  
Next.js의 SSR(서버사이드 렌더링) 에 next-redux-wrapper 를 이용하여 Redux를 적용하는 방법  
Next.js의 getInitialProps, getServerSideProps 등에서 store에 접근을 하기 위해 `next-redux-wrapper` 라는 라이브러리가 필요  
또 부가적으로 Server Side 일 때의 Redux Store와 Client Side 일 때의 Redux Store를 합쳐주는 역할도 하기 때문에 Next.js에서 Redux를 적용하려면 해당 라이브러리가 필요

```
$ yarn add next-redux-wrapper redux redux-devtools-extension
```

src/stores/modules/counter.ts

```javascript
export const INCREMENT = "counter/INCREMENT" as const;
export const DECREMENT = "counter/DECREMENT" as const;

export const increment = () => ({
  type: INCREMENT
});

export const decrement = () => ({
  type: DECREMENT
});

export type CounterAction = ReturnType<typeof increment | typeof decrement>;

export interface ICounterState {
  count: number;
}

export const initialState: ICounterState = {
  count: 0
};

export default (state: ICounterState = initialState, action: CounterAction) => {
  switch (action.type) {
    case INCREMENT:
      return { count: state.count + 1 };
    case DECREMENT:
      return { count: state.count - 1 };
    default:
      return state;
  }
};
```

src/stores/modules/index.ts

```javascript
import { AnyAction, CombinedState, combineReducers } from 'redux';
import { HYDRATE } from 'next-redux-wrapper';
import counter, { ICounterState } from './counter';

const rootReducer = (state: IState | undefined, action: AnyAction): CombinedState<IState> => {
  switch (action.type) {
    // 서버 사이드 데이터를 클라이언트 사이드 Store에 통합.
    case HYDRATE:
      return { ...action.payload };
    default: {
      const combineReducer = combineReducers({
        counter,
      });
      return combineReducer(state, action);
    }
  }
};

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;

interface IState {
  counter: ICounterState;
}
```

src/stores/index.ts

```javascript
import { applyMiddleware, createStore, compose } from 'redux';
import { createWrapper } from 'next-redux-wrapper';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducer from './modules';

const configureStore = () => {
  const middlewares = [YOUR_MIDDLEWARES];
  const enhancer =
    process.env.NODE_ENV === 'production'
      ? compose(applyMiddleware(...middlewares))
      : composeWithDevTools(applyMiddleware(...middlewares));
  const store = createStore(reducer, enhancer);
  return store;
};

const wrapper = createWrapper(configureStore, {
  debug: process.env.NODE_ENV !== 'production',
});

export default wrapper;
```

위 작업을 통하여 스토어 구성은 끝이 났습니다.  
하지만 이렇게 할 시 계속해서 Server Side Store가 Client Side Store를 덮어 써버리는 일이 발생합니다.

이 일을 해결하려면 server 모듈을 생성하여 HYDRATE 에서 store를 덮어 썼다면 state로 저장하고,  
만약 이미 덮어 쓴 state가 있으면 `return { ...state }`를 활용하여 더 이상 덮어 쓰지 않도록 구성하면 최초 1회 만 HYDRATE 가 실행되는 효과를 볼 수 있습니다.

## Server Side Generation (Static Generation)

https://nextjs.org/docs/basic-features/pages#static-generation-recommended  
`getStaticProps`

```javascript
function Blog({ posts }) {
  // Render posts...
}

// This function gets called at build time
export async function getStaticProps() {
  // Call an external API endpoint to get posts
  const res = await fetch('https://.../posts');
  const posts = await res.json();

  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      posts,
    },
  };
}

export default Blog;
```

## Server Side Rendering (Server-side Rendering)

https://nextjs.org/docs/basic-features/pages#server-side-rendering  
`getServerSideProps`

```javascript
function Page({ data }) {
  // Render data...
}

// This gets called on every request
export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(`https://.../data`);
  const data = await res.json();

  // Pass data to the page via props
  return { props: { data } };
}

export default Page;
```

## Script 로드 우선순위

https://nextjs.org/docs/basic-features/script  
https://themarketer.tistory.com/82

'next/script' 를 사용하면, 'strategy' 속성을 정의할 수 있고,  
Next.js가 스크립트 로딩을 최적화합니다.

- 'beforeInteractive'  
  페이지가 상호작용하기 전에 가져오고 실행되어야 할 필요가 있는 중요한 스크립트의 경우 사용합니다.
- 'afterInteractive' (default)  
  해당 페이지의 상호작용 이후에 가져오고 실행되는 스크립트의 경우 사용합니다.
- 'lazyOnload'  
  유휴 시간동안 로드를 기다릴 수 있는 스크립트의 경우에 사용합니다.

## 이제는 Next.js 페이지의 본문(body) 안에서 'next/script' 를 사용합니다.

```javascript
import Script from 'next/script';

export default function Home() {
  return (
    <>
      <Script src='https://www.google-analytics.com/analytics.js' />
      <Script src='https://connect.facebook.net/en_US/sdk.js' strategy='lazyOnload' />
      <Script
        src='https://cdn.jsdelivr.net/npm/cookieconsent@3/build/cookieconsent.min.js'
        strategy='beforeInteractive'
      />
    </>
  );
}
```

---

# NextJS 이슈 슈팅

## 현재 위치한 페이지 URL 로 Link 실행했을 때, 해당 페이지 일부 비동기 데이터 로드 안되는 문제

`<Link />`로 동일화면 이동 시 Redux state는 rehydration 되는 데,  
컴포넌트는 remount 되지 않아 화면진입 시 호출되던 dispatch 들이 실행되지 않는 문제  
link에 shallow 옵션을 주면 rehydration이 되어 데이터가 소실되는 것을 막을 수 있음

```javascript
<Link href={urlMain} shallow={router.asPath.startsWith(urlMain)}>
```

---

# 최적화

## 이미지 자동 최적화

https://nextjs.org/docs/basic-features/image-optimization

next.js는 이미지 자동 최적화 기능이 구현되어 사이즈를 변경하거나 퀄리티를 수정하는 등 브라우저들이 지원하는 최신 포멧의 이미지를 제공할 수 있다.  
따라서 큰 이미지라도 작은 뷰포트에서는 작게 리사이즈되어 서빙된다. 이미지 최적화 기능은 next.js 에서 Image컴포넌트를 import하여 <img> 엘리먼트를 사용하듯이 쓸 수 있다.

```javascript
import Image from 'next/image';
<Image src='/logo.png' alt='Logo' width={500} height={500} />;
```

## 코드 스플리팅

코드 스플리팅 기능을 적용하면 클라이언트 측 성능 확보를 위해 꼭 필요한 javascript만 보낼 수 있다.

next.js는 두 가지의 코드 스플리팅 기능을 지원한다.

1. 라우팅 경로 기반
   next.js에 기본으로 적용되어 있으며. 사용자가 라우팅할 때 최초로 필요로 하는 코드들만 전송한다.  
   나머지 코드들은 앱 내에서 페이지 이동을 할 때 추가적으로 전송한다.  
   이는 파싱하고 컴파일 해야 하는 코드량을 줄여 페이지 로드 타임을 감소시킬 수 있다.

2. 컴포넌트별
   이 코드 스플리팅은 큰 컴포넌트를 여러 코드들로 나누어 필요할 때 다운로드받을 수 있도록 해 준다.  
   next.js는 dynamic import() 를 통해 컴포넌트 코드 스플리팅을 지원한다.  
   따라서 react컴포넌트 포함 필요한 javascript코드들을 분리하여 동적으로 로드할 수 있게 된다.

## 서버사이드 렌더링 캐싱하기

```
$ npm install lru-cache
```

server.js

```javascript
// ...
const url = request('url');
const lruCache = request('lru-cache'); // 서버사이드 렌더링 결과를 캐싱하기 위해 lru-cache 패키지를 이용한다.

const ssrCache = new lruCache({
  // 최대 100개의 항목을 저장하고 각 항목은 60초 동안 저장한다.
  max: 100,
  maxAge: 1000 * 60,
});
// ...
app.prepare().then(() => {
  // ...('/page/:id' 를 처리하는 코드)
  server.get(/^\/page[1-9]/, (req, res) => {
    // page1, page2, page* 요청에 대해 서버사이드 렌더링 결과를 캐싱한다.
    return renderAndCache(req, res);
  });
});

async function renderAndCache(req, res) {
  const parseUrl = url.parse(req.url, true);
  const cacheKey = parseUrl.path;

  // 캐시가 존재하면 캐시에 저장된 값을 사용한다.
  if (ssrCache.has(cacheKey)) {
    console.log('캐시 사용');
    res.send(ssrCache.get(cacheKey));
    return;
  }

  // 캐시가 없으면 넥스트의 renderToHTML 메서드를 호출하고, await 키워드를 사용해서 처리가 끝날 때까지 기다린다.
  try {
    const { query, pathname } = parseUrl;
    const html = await app.renderToHTML(req, res, pathname, query);
    if (res.statusCode === 200) {
      // renderToHTML 함수가 정상적으로 처리됐으면 그 결과를 캐싱하다.
      ssrCache.set(cacheKey, html);
    } catch (err) {
      app.renderError(err, req, res, pathname, query);
    }
  }
}
```

## 기존적으로 압축(gzip) 제공

기능 사용 안할 경우

```javascript
module.exports = {
  compress: false,
};
```

## ETag

ETag(Entity Tag)는 브라우저의 캐시에 저장되어 있는 구성요소와 원본 서버의 구성요소가 일치하는지 판단하는 또 다른 방법이다.  
구성요소를 나타내는 값을 따옴표의 고유한 문자열로 응답헤더의 ETag에 지정한다.

https://nextjs.org/docs/api-reference/next.config.js/disabling-etag-generation

Next.js는 기본적으로 모든 페이지에 대해 etag 를 생성합니다.  
캐시 전략에 따라 HTML 페이지에 대한 etag 생성을 비활성화할 수 있습니다.

## Keep-Alive

Next.js는 자동으로 node-fetch 를 폴리필하고 기본적으로 HTTP Keep-Alive 를 활성화 합니다.
