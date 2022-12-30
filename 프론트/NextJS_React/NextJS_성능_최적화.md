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
   `next.js에 기본으로 적용되어 있으며. 사용자가 라우팅할 때 최초로 필요로 하는 코드들만 전송`한다.  
   나머지 코드들은 앱 내에서 페이지 이동을 할 때 추가적으로 전송한다.  
   이는 파싱하고 컴파일 해야 하는 코드량을 줄여 페이지 로드 타임을 감소시킬 수 있다.

2. 컴포넌트별
   이 코드 스플리팅은 큰 컴포넌트를 여러 코드들로 나누어 필요할 때 다운로드받을 수 있도록 해 준다.  
   `next.js는 dynamic import() 를 통해 컴포넌트 코드 스플리팅을 지원`한다.  
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
