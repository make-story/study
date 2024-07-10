# 캐싱 (Caching)

https://medium.com/@surksha8/10-proven-strategies-to-boost-your-next-js-app-performance-2de166dcff50

`Next.js 13 이상 캐싱 메커니즘`  
https://nextjs.org/docs/app/building-your-application/caching

## 서버에 적용되는 캐시 매커니즘

https://fe-developers.kakaoent.com/2024/240418-optimizing-nextjs-cache/

- Request Memoization

웹 서버로 페이지 요청이 들어오면 페이지에 필요한 데이터들을 fetch하게 되는데, 이때 동일한 endpoint로의 API fetch를 여러 컴포넌트에서 수행할 필요가 있다면 Request Memoization이 동작합니다. (React가 fetch 함수를 확장해놓았기 때문에 별도 설정은 필요 없습니다.)
상위 컴포넌트에서 API fetch 결과를 prop drilling 하는것 대신, 각 컴포넌트에서 fetch를 수행하도록 구현해도 실제 API 요청은 최초 1회만 전송되고 나머지는 응답값을 재사용합니다.

Request Memoization은 서버에서 호출되는 GET 메서드에만 적용되므로, POST나 DELETE API 또는 클라이언트에서 호출되는 API에는 적용되지 않습니다. 그리고 한 번의 서버 렌더링 동안만 유효하기 때문에 따로 revalidate 할 필요가 없을 뿐 아니라 할 수도 없습니다.

- Data Cache

우리가 일반적으로 생각할 수 있는 API 캐싱입니다.

```javascript
// Revalidate at most every hour
fetch('https://...', { next: { revalidate: 3600 } });
```

Next.js가 확장해놓은 fetch 함수에 next.revalidate 옵션을 넘기면 Data Cache가 동작합니다. 성공적으로 데이터를 가져왔다면 그 응답값을 저장해두었다가 동일한 경로로 fetch 함수를 실행할 때 실제 API 호출은 건너뛰고 저장해놓은 응답값을 반환합니다.

하나의 요청 동안만 유효한 Request Memoization과 다르게 Data Cache는 일정 시간 동안에 웹 서버로 들어오는 모든 요청에 대해 동작합니다. 만약 next.revalidate를 1초로 설정했다면, 1초에 1000명의 사용자가 접속해도 실제 API 요청은 1회 전송됩니다.

- Full Route Cache

`웹 서버의 성능을 눈에 띄게 향상시키려면 Full Route Cache를 적용해야 합니다.`  
서버 렌더링 과정에서 웹 서버의 리소스(특히 CPU)를 대부분 사용하게 되는데, Full Route Cache는 서버 렌더링 결과를 재사용함으로써 이를 줄일 수 있습니다.

Full Route Cache를 적용하려면 페이지를 Static 렌더링 되도록 구성해야 합니다.  
https://nextjs.org/docs/app/building-your-application/caching#full-route-cache

`Dynamic Function을 사용하지 않아야함!`  
https://nextjs.org/docs/app/building-your-application/caching#dynamic-functions

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

## SSR 캐시

https://github.com/vercel/next.js/blob/canary/examples/ssr-caching/pages/index.tsx

```tsx
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';

export default function Index({
  time,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <main>
      <h1>SSR Caching with Next.js</h1>
      <time dateTime={time}>{time}</time>
    </main>
  );
}

export const getServerSideProps: GetServerSideProps<{ time: string }> = async ({
  res,
}) => {
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=10, stale-while-revalidate=59',
  );

  return {
    props: {
      time: new Date().toISOString(),
    },
  };
};
```

## SSR 스트리밍

`study.git/프론트/NextJS_React/NextJS_스트리밍_Streaming_서스펜스_Suspense.md` 참고!

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
