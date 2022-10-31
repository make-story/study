# Next.js 환경구축

```
$ npm install next react react-dom
```

넥스트에서 모든 페이지 컴포넌트는 pages 폴더 밑에 만들어야 한다.

## Next.js 브라우저 지원

https://nextjs.org/docs/basic-features/supported-browsers-features

## Next.js 업그레이드 가이드

https://nextjs.org/docs/upgrading

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

## 빌드 번들파일 명

- 개발모드

```
[name].js?ts=타임스탬프값
```

예: \_next/static/chunks/pages/display/%5Bpath%5D.js?ts=1667002436060

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

```javascript
import Script from 'next/script';

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Script src='https://example.com/script.js' />
      <Component {...pageProps} />
    </>
  );
}
```

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
