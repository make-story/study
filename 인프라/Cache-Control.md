# 캐시(Cache-Control)

https://jakearchibald.com/2016/caching-best-practices/

HTTP 캐시 신뢰성
https://engineering.fb.com/2015/04/13/web/web-performance-cache-efficiency-exercise/  

## 불변 콘텐츠 + 최대 수명
1년 동안 캐시
```
Cache-Control: max-age=31536000
```

## 변경 가능한 콘텐츠, 항상 서버 재검증
캐시된 리소스를 사용하기 전에 서버에서 확인(또는 "재검증")해야 함을 의미
```
Cache-Control: no-cache
```

## 서비스워커
```javascript
const version = '2';

self.addEventListener('install', (event) => {
  // 스크립트와 스타일을 미리 캐시
  // Cache-Control max-age 확인(경합)하지 않고 바로 캐싱
  event.waitUntil(
    caches
      .open(`static-${version}`)
      .then((cache) => cache.addAll(['/styles.css', '/script.js'])),
  );
});

self.addEventListener('activate', (event) => {
  // …delete old caches…
});

self.addEventListener('fetch', (event) => {
  // 일치하는 항목이 있으면 캐시에서 제공하고 그렇지 않으면 네트워크 사용
  event.respondWith(
    caches
      .match(event.request)
      .then((response) => response || fetch(event.request)),
  );
});
```

서비스 워커에서 캐시(Cache-Control)를 우회할 수 있음 
```javascript
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(`static-${version}`)
      .then((cache) =>
        cache.addAll([
          new Request('/styles.css', { cache: 'no-cache' }),
          new Request('/script.js', { cache: 'no-cache' }),
        ]),
      ),
  );
});
```

캐시회피
```javascript
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(`static-${version}`).then((cache) =>
      Promise.all(
        ['/styles.css', '/script.js'].map((url) => {
          // cache-bust using a random query string
          return fetch(`${url}?${Math.random()}`).then((response) => {
            // fail on 404, 500 etc
            if (!response.ok) throw Error('Not ok');
            return cache.put(url, response);
          });
        }),
      ),
    ),
  );
});
```

-----

# 서비스 워커와 HTTP 캐시는 함께 잘 작동함  
https://stackoverflow.com/questions/42466473/if-you-are-using-service-workers-do-you-still-need-cache-control-headers  

서비스 워커 내부에서도 fetch 존재 
(서비스 워커 fetch HTTP 요청이 발생하면, Cache-Control 설정에 따른 HTTP 캐시사용)
즉, HTTP 캐시는 네트워크와 서비스 워커 사이에 존재함

리소스 요청 > 서비스워커 > cache 스토리지에 없음 > fetch > HTTP Cache 확인 > 브라우저 캐시에 없음 > 서버 > 반환  

리소스 요청 > 서비스워커 > cache 스토리지에 있음 > 반환