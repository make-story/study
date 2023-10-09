# 서비스워커

브라우저가 백그라운드에서 실행하는 스크립트로, 웹페이지와는 별개로 작동
푸시알림, 백그라운드 동기화, 주기적 동기화 또는 지오펜싱, 응답캐시
https://caniuse.com/#feat=serviceworkers

# 서비스워커 소개

https://developers.google.com/web/fundamentals/primers/service-workers/
https://developer.mozilla.org/ko/docs/Web/Progressive_web_apps/Offline_Service_workers

# 서비스워커 라이프사이클

https://developers.google.com/web/fundamentals/primers/service-workers/lifecycle

# gloal 변수는 web worker 동일한 self

https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerGlobalScope

# 서비스워커 업데이트가 발생할 때

> navigator.serviceWorker.register() 신규 호출
> 브라우저에 의한 자동 Update - 기존 등록된 서비스워커와 다른 파일내부 변경이력, HTTP Header Cache-Control max-age(최대24시간), 개발자도구 Service Workers 탭의 'Update on Reload' 페이지 새로고침시 업데이트 체크 등
> client request 처리시 - fetch
> 24시간내(Cache-Control max-age) 업데이트 확인이 없는 상태에서 push 및 sync 이벤트 발생시
> registration.update(), registration.unregister() 명시적 호출시

https://web.dev/learn/pwa/service-workers/#updating-a-service-worker

https://developers.google.com/web/fundamentals/primers/service-workers/lifecycle
https://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.9
https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/http-caching

라이브러리 참고

https://www.npmjs.com/package/livereload-js

## 업데이트 감지

https://web.dev/learn/pwa/update/

```javascript
async function detectSWUpdate() {
  const registration = await navigator.serviceWorker.ready;

  registration.addEventListener("updatefound", (event) => {
    const newSW = registration.installing;
    newSW.addEventListener("statechange", (event) => {
      if (newSW.state == "installed") {
        // New service worker is installed, but waiting activation
      }
    });
  });
}
```

## 업데이트 후 대기상태 건너뛰기

https://web.dev/learn/pwa/update/#force-override

```javascript
self.addEventListener("install", (event) => {
  // forces a service worker to activate immediately
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  // when this SW becomes activated, we claim all the opened clients
  // they can be standalone PWA windows or browser tabs
  event.waitUntil(clients.claim());
});
```

```javascript
navigator.serviceWorker.addEventListener("controllerchange", (event) => {
  // The service worker controller has changed
});
```

# 서비스워커는 프로미스 기반 동작 event.waitUntil(promise)

## waitUntil()

브라우저에 waitUntil(promise) 이 완료될 때까지,
서비스 워커를 종료해서는 안 된다고 알려줍니다.

waitUntil() 사용하지 않을 경우, 서비스 워커는 언제든지 promise 완료전 중지될 수 있습니다.  
https://www.w3.org/TR/service-workers/#service-worker-lifetime

`waitUntil(promise) 해결되거나 거부될 때까지, 서비스 작업자를 종료하지 않도록 브라우저에 지시하는 데 사용`

`install(설치) -> activate(활성화) 단계내에서 사용 시, 다음단계 실행을 promise 완료전까지 지연시킬 수 있음`

https://developer.mozilla.org/ko/docs/Web/API/Service_Worker_API
install 과 activate 이벤트 처리는 시간이 꽤 걸릴 수도 있기에, 서비스 워커 명세는 waitUntil() 메서드를 제공합니다.  
install 이나 activate 에서 waitUntil() 을 호출하면서 매개변수로 프로미스를 제공하면, 성공적으로 이행하기 전까지는 기능 이벤트가 발생하지 않습니다.

```javascript
addEventListener("install", (event) => {
  const preCache = async () => {
    const cache = await caches.open("static-v1");
    return cache.addAll(["/", "/about/", "/static/styles.css"]);
  };
  event.waitUntil(preCache());
});
```

# Speed up service worker with navigation preloads

https://web.dev/navigation-preload/

# 서비스워커 코드 또는 버전 변경, 재설치 후 테스트 할 때

테스트하려는 브라우저는 종료 후(탭 등에서 사이트 작동되고 있을 가능성 있음) 테스트 하는 것이 좋다.

# 실행 단계 (라이프 사이클)

1. 등록 (브라우저에서 서비스워커 파일 등록)
   navigator.serviceWorker.register('/sw.js')
2. 설치 - 캐시 리스트 등록가능
   self.addEventListener('install', function(event) {})
3. 설치완료 또는 변경(update) 활성화 - 기존 캐시리스트 정리가능
   정상적으로 설치(install)되었을 때 실행됨, 서비스워커 update시 기본적으로 대기(waiting)상태이기 때문에 바로 활성화되지 않음(기존 캐시 유지하기 위함), 그러나 설치(install)에서 대기상태 건너뛰기(skipWaiting)실행될 경우 바로 활성화 실행됨
   self.addEventListener('activate', function(event) {})
4. 리소스 요청시 - 리소스 관리(캐시의 데이터 반환, 캐시에 데이터 추가 등)
   self.addEventListener('fetch', function(event) {})

# 서비스워커 캐싱전략

https://developer.chrome.com/docs/workbox/modules/workbox-strategies/

https://web.dev/learn/pwa/serving/

https://jakearchibald.com/2014/offline-cookbook/

staleWhileRevalidate 방식 (많이 사용)
캐시에 있는 데이터를 먼저 브라우저에 반환해주고,
네트워크에 리소스를 요청해 캐시에 저장하여, 기존 캐시 리소스를 업데이트 한다.
이런 식으로 캐시에 있는 파일은 최신 버전을 유지한다.

Cache then network 방식
페이지가 두 개의 요청(캐시에 요청, 네트워크에 요청)을 동시에 하고
캐시된 데이터를 먼저 표시한 다음 네트워크 데이터가 도착하면
페이지를 업데이트를 한다.

## cacheFirst 전략 사용시 일부 리소스 의도와 다르게 저장안되는 현상

응답 상태(Response-Type) 값이 opaque(불투명) 값인 경우  
https://stackoverflow.com/questions/39109789/what-limitations-apply-to-opaque-responses  
https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy#cross-origin_network_access

Cache Storage API 는 기본적으로 2XX 범위에 없는 상태코드는 모두 거부
https://fetch.spec.whatwg.org/#ok-status

# Chrome 75 Webview에서 서비스워커의 fetch request 가 실패하는 문제

UA 에 android, wv 값이 있는 경우 서비스워커를 설치하지 않을 뿐 아니라 설치된 서비스워커를 제거해주는 로직 필요
Chrome 75.0.3770.67 ~ 75.0.3770.101 버전의 모든 안드로이드 웹뷰에서 서비스워커 설치를 차단, 이미 설치가 되어있다면 삭제

# 사파리 (safari)

https://webkit.org/blog/8090/workers-at-your-service/
