# NextJS 이슈 슈팅 (트러블슈팅, 이슈경험)

## Next.js 관련 패키지 버전 확인 필요

Next.js 버전에 따라  
React, next-transpile-modules 등 의존 버전 확인 필수!!!

## src/pages/\_app.tsx 내부 코드 타입에러!

`<Component /> 타입 에러`가 발생하는 경우, package.json 선언된 react, react-dom, @types/react, @types/react-dom 등 버전이 맞지 않다는 것이다.

- 의존성 종속관계 성공한 버전 yarn.lock 파일 필요
- 또는 package.json 의존성 하나하나 각각 설치 시도
- 대부분 node_modules/@types 하위로 설치된 모듈들의 버전 문제 (마지막 성공한 @types/하위 모듈들 버전 확인필요)

## Provider' cannot be used as a JSX component.

이 또한 의존성 파일간 버전이 다른 문제!

https://github.com/facebook/react/issues/24304#issuecomment-1094565891

## npm ERR! code ENOWORKSPACES

npm ERR! This command does not support workspaces.

https://github.com/vercel/next.js/issues/47121#issuecomment-1499044345

```
$ npx next telemetry disable
```

## getServerSideProps 페이지별 공통 로직

'import a single getServerSideProps method to multiple pages in Nextjs'

https://stackoverflow.com/questions/70233905/import-a-single-getserversideprops-method-to-multiple-pages-in-nextjs

https://stackoverflow.com/questions/71812273/how-to-combine-multiple-getserversideprops-function

https://www.frontend-devops.com/blog/pipe-serverside-props-in-nextjs

## parsing error cannot find module 'next/babel'

Next.js 13 또는 14  
Babel 이 아닌, SWC 를 사용하려는 환경  
(프로젝트 루트에 .babelrc 같은 바벨 설정파일이 있다면 SWC가 동작하지 않는다. 23.12 기준)

https://velog.io/@pyotato/Error-Issues-Parsing-error-Cannot-find-module-nextbabel

기존 'create-next-app' 으로 생성한 프로젝트의 '.eslintrc.json' 파일 수정

```json
{
  "extends": ["next/babel", "next/core-web-vitals"]
}
```

## 마이그레이션간 이슈 해결경험

https://bsnn.tistory.com/131

## 현재 위치한 페이지 URL 로 Link 실행했을 때, 해당 페이지 일부 비동기 데이터 로드 안되는 문제

`<Link />`로 동일화면 이동 시 Redux state는 rehydration 되는 데,  
컴포넌트는 remount 되지 않아 화면진입 시 호출되던 dispatch 들이 실행되지 않는 문제  
link에 shallow 옵션을 주면 rehydration이 되어 데이터가 소실되는 것을 막을 수 있음

```javascript
<Link href={urlMain} shallow={router.asPath.startsWith(urlMain)}>
```

# The ref value containerRef.current will likely have changed by the time this effect cleanup function runs.

https://stackoverflow.com/questions/67069827/cleanup-ref-issues-in-react

```javascript
useEffect(() => {
  let element: any = null;
  const ready = (event: any) => {
    console.log('!!!!', event);
  };
  if (refLottiePlayer?.current) {
    refLottiePlayer?.current?.addEventListener('ready', ready);
    element = refLottiePlayer?.current;
  }
  return () => {
    if (element) {
      element?.removeEventListener('ready', ready);
    }
  };
}, [refLottiePlayer]);
```

## redux-persist SSR 이슈

서바사이드 렌더링 안되는 이슈

https://github.com/vercel/next.js/issues/8240

참고  
https://stackoverflow.com/questions/72966026/issue-with-meta-tags-when-using-redux-persist-in-next-js

\_app.tsx

```javascript
/**
 * 서버로 요청이 들어왔을 때 가장 먼저 실행되는 컴포넌트 (페이지에 적용할 공통 레이아웃의 역할)
 * 모든 컴포넌트에 공통으로 적용할 속성 관리
 */
import React, { useEffect } from 'react';
import { NextComponentType } from 'next';
import { AppContext, AppInitialProps, AppProps } from 'next/app';
import { ApolloProvider, ApolloClient } from '@apollo/client';
import { Provider, useStore } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { Global, css } from '@emotion/react';

import { webviewGlobalStyle } from '@/common/styles/global';
import { wrapper } from '@/store';
import { useApollo } from '@/common/apollo/client/apolloClient';

// https://nextjs.org/docs/basic-features/typescript#custom-app
const App: NextComponentType<AppContext, AppInitialProps, AppProps> = ({
  Component,
  ...rest
}: AppProps) => {
  // 'next-redux-wrapper' 버전 8.x 이상의 경우 'useWrappedStore' 방식 사용 (그 이하 버전에서는 wrapper.withRedux(App) 방식 사용)
  // https://velog.io/@mangojang/error-next-redux-wrapper-%EC%82%AC%EC%9A%A9-%EC%8B%9C-Use-createWrapper
  const { store, props } = wrapper.useWrappedStore(rest);
  // https://blog.soaresdev.com/configurando-apollo-client-no-nextjs/
  const apolloClient = useApollo(rest);

  return (
    <>
      {/* redux */}
      <Provider store={store}>
        {/* redux-persist - https://github.com/vercel/next.js/issues/8240*/}
        <PersistGate persistor={store.__persistor} loading={null}>
          {() => (
            <>
              {/* apollo */}
              <ApolloProvider client={apolloClient}>
                <Global styles={webviewGlobalStyle} />
                <Component {...props.pageProps} />
              </ApolloProvider>
            </>
          )}
        </PersistGate>
      </Provider>
    </>
  );
};

export default App;
```

`Function as Child Component`  
https://reactpatterns.js.org/docs/function-as-child-component/

`Warning: Text content did not match. Server: "..서버사이드에서의 값.." Client: "..클라이언트사이드에서의 값.."`

주의! redux-persist (Redux State) 활용해 저장된 값을 읽어올 때 발생하는 Hydration 이슈 방지를 위해,
useEffect 로 클라이언트 시점에 상태값 주입
(redux-persist 는 클라이언트 브라우저 스토리지 기본 사용)

```tsx
import { useEffect, useState } from 'react';

import { useAppSelector, useAppDispatch } from '@/store';
import { selectCountValue } from '@/example/store/counter';

const Counter = () => {
  const [status, setStatus] = useState<number>(0);
  const count = useAppSelector(selectCountValue);

  // 주의! redux-persist (Redux State) 활용해 저장된 값을 읽어올 때 발생하는 Hydration 이슈 방지를 위해,
  // useEffect 로 클라이언트 시점에 상태값 주입
  // (redux-persist 는 클라이언트 브라우저 스토리지 기본 사용)
  // Warning: Text content did not match. Server: "..서버사이드에서의 값.." Client: "..클라이언트사이드에서의 값.."
  useEffect(() => {
    setStatus(count);
  }, [count]);

  // count 값을 바로 출력할 경우 'Warning: Text content did not match. Server' 에러 발생
  //return <span>{count}</span>;

  // 클라이언트 사이드에서 상태값 변경해 줌
  return <span>{status}</span>;
};
```

## Next.js SWC - Parsing error: Cannot find module 'next/babel'

루트 경로에 있는 `ESLint 설정(예: .eslintrc.json) 파일의 extends 부분에 'next/babel' 추가!`

```json
{ "extends": ["next/babel"] }
```

```json
{ "extends": ["next"] }
```

## Next.js 13 'TypeError: trace.getSpan is not a function'

https://github.com/vercel/next.js/issues/46632

```
yarn add @opentelemetry/api @opentelemetry/resources @opentelemetry/semantic-conventions @opentelemetry/sdk-trace-node @opentelemetry/instrumentation
```

## Next.js 13 이상 next/font 에러

https://velog.io/@fo_rdang/Next.js-Next.js%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-build-%ED%95%98%EA%B8%B0

## Next.js 13 이상 useEffect 두번(반복) 렌더링되는 현상

https://youngme92.vercel.app/blog/nextjs-useEffect

https://stackoverflow.com/questions/60618844/react-hooks-useeffect-is-called-twice-even-if-an-empty-array-is-used-as-an-ar

https://ko.reactjs.org/docs/strict-mode.html

```jsx
import { useEffect } from "react";

export default const Home = () => {
  useEffect(() => {
    console.log('useEffect 호출.');
  }, []);
  return <>TEST<>;
};
```

이와 같이 useEffect를 사용하면 해당 컴포넌트가 렌더링 될때 처음 한번만 실행되어야 하지만  
두번 실행되었고 `원인은 react의 strictMode 가 활성화 되어있으면 개발모드에선 구성요소를 두번 렌더링하기 때문`

해결방법은 next.config.js 에서 reactStrictMode 값을 비활성화 하면 됩니다.

## 'async/await is not yet supported in Client Components, only Server Components. This error is often caused by accidentally adding 'use client' to a module that was originally written for the server.'

https://stackoverflow.com/questions/77078222/error-async-await-is-not-yet-supported-in-client-components-in-next-js

컴포넌트 async/await 비동기는 서버컴포넌트에서만 지원  
클라이언트에서의 경우는 useEffect 로 감싸고 async/await 실행

```tsx
'use client';

import { getProviders } from 'next-auth/react';

// async/await 컴포넌트는 Next.js 에서 서버컴포넌트에서만 사용할 수 있으나, 'use client' 가 선언된 상황
// 이 경우 에러 발생!!
export default async function Page() {
  const providers = await getProviders();

  // ...
}
```

```tsx
'use client';

import { getProviders } from 'next-auth/react';

// 클라이언트(use client) 컴포넌트에서는 async/await 미사용
// useEffect 사용해 비동기 호출!!
export default function Page() {
  const [providers, setProviders] = useState<Record<
    string,
    ClientSafeProvider
  > | null>(null);

  useEffect(() => {
    (async () => {
      setProviders(await getProviders());
    })();
  }, []);

  // ...
}
```

https://nextjs.org/docs/app/building-your-application/routing/loading-ui-and-streaming#example

# TypeError: Cannot read properties of undefined (reading 'length')

모노레포 환경(Monorepo)

`monorepo-nodejs20.git/apps/nextjs14/src/example/containers/test/TestContainer.tsx`

```
TypeError: Cannot read properties of undefined (reading 'length')
    at WasmHash._updateWithBuffer (...프로젝트경로.../node_modules/next/dist/compiled/webpack/bundle5.js:28:1375509)
    at WasmHash.update (...프로젝트경로.../node_modules/next/dist/compiled/webpack/bundle5.js:28:1374844)
    at BatchedHash.update (...프로젝트경로.../node_modules/next/dist/compiled/webpack/bundle5.js:28:1371205)
    at ...프로젝트경로.../node_modules/next/dist/compiled/webpack/bundle5.js:28:295660
    at processQueue (...프로젝트경로.../node_modules/next/dist/compiled/webpack/bundle5.js:28:1388677)
    at wrapper (...프로젝트경로.../node_modules/whatap/lib/core/interceptor.js:129:27)
    at process.processTicksAndRejections (node:internal/process/task_queues:77:11)
 ⨯ uncaughtException: TypeError: Cannot read properties of undefined (reading 'length')
    at WasmHash._updateWithBuffer (...프로젝트경로.../node_modules/next/dist/compiled/webpack/bundle5.js:28:1375509)
    at WasmHash.update (...프로젝트경로.../node_modules/next/dist/compiled/webpack/bundle5.js:28:1374844)
    at BatchedHash.update (...프로젝트경로.../node_modules/next/dist/compiled/webpack/bundle5.js:28:1371205)
    at ...프로젝트경로.../node_modules/next/dist/compiled/webpack/bundle5.js:28:295660
    at processQueue (...프로젝트경로.../node_modules/next/dist/compiled/webpack/bundle5.js:28:1388677)
    at wrapper (...프로젝트경로.../node_modules/whatap/lib/core/interceptor.js:129:27)
    at process.processTicksAndRejections (node:internal/process/task_queues:77:11)
 ⨯ uncaughtException: TypeError: Cannot read properties of undefined (reading 'length')
    at WasmHash._updateWithBuffer (...프로젝트경로.../node_modules/next/dist/compiled/webpack/bundle5.js:28:1375509)
    at WasmHash.update (...프로젝트경로.../node_modules/next/dist/compiled/webpack/bundle5.js:28:1374844)
    at BatchedHash.update (...프로젝트경로.../node_modules/next/dist/compiled/webpack/bundle5.js:28:1371205)
    at ...프로젝트경로.../node_modules/next/dist/compiled/webpack/bundle5.js:28:295660
    at processQueue (...프로젝트경로.../node_modules/next/dist/compiled/webpack/bundle5.js:28:1388677)
    at wrapper (...프로젝트경로.../node_modules/whatap/lib/core/interceptor.js:129:27)
    at process.processTicksAndRejections (node:internal/process/task_queues:77:11)
```

의심: 의존관계

1. TestContainer 에서 import components/test/webview/index.tsx
2. webview/index.tsx 에서 import @makestory/utils
3. @makestory/utils 에서 import @makestory/event-manager 참조
4. @makestory/event-manager 값 중 일부 @makestory/utils 에서 export { eventBusOn as appEventOn, eventBusOff as appEventOff };

위와 같은 의존관계에서 빌드된 결과물(dist 폴더 결과물)을 사용할 경우 에러 발생!!

@makestory/utils 에서 @makestory/event-manager 를 참조하는 코드들을 모두  
@makestory/event-manager 패키지로 이동 후 @makestory/event-manager 만 import 하여 사용하면 에러 메시지 미출력...

터보팩 모두로 개발환경 실행하면 이슈 없어진다.

```bash
$ next dev --turbo
```

# preloaded

일부 리소스를 브라우저가 사전로드하도록 preload 옵션을 자동으로 설정하는데,  
preload 옵션으로 로드해오는 리소스가 즉각적으로 사용이 안되니까 이런 에러가 발생한 듯

(preload 옵션으로 로드해오는 리소스는 3초내에 실제로 '활용'이 되어야한다고 함)

https://github.com/vercel/next.js/discussions/49607

```
The resource <URL> was preloaded using link preload but not used within a few seconds from the window’s load event. Please make sure it has an appropriate as value and it is preloaded intentionally
```

# warning: extra attributes from the server

서버에서 렌더링해온 결과와 화면에 출력된 결과가 서로 일치하지 않음!  
클라이언트 사이드 렌더링을 명시하거나,  
useEffect 로 상태값 변경처리 필요!
