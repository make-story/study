# 가이드

https://developer.chrome.com/docs/workbox/  
https://developer.chrome.com/docs/workbox/reference/  
https://developers.google.com/web/tools/workbox/reference-docs/latest/module-workbox-strategies

# WorkBox

https://github.com/GoogleChrome/workbox  
https://github.com/GoogleChrome/workbox/releases  
https://glitch.com/@philkrie/workbox-demos  
https://developers.google.com/web/tools/workbox/guides/get-started  
https://developers.google.com/web/tools/workbox/reference-docs/latest  
https://developers.google.com/web/tools/workbox/reference-docs/v4/

---

# 적용사례 / 가이드

https://web.dev/aem-with-workbox/

# WorkBox 라이센스

https://github.com/GoogleChrome/workbox/blob/master/LICENSE

# WorkBox 파일(.js) 다운로드

```
$ npx workbox-cli copyLibraries public/workbox
```

# npm 또는 yarn 으로 WorkBox 모듈(js파일)들을 직접 설치해 사용하는 방식 참고

https://developer.chrome.com/docs/workbox/modules/workbox-cli/#install-the-cli

# Workbox 모듈 import

https://developer.chrome.com/docs/workbox/modules/workbox-sw/

# WorkBox-Webpack-Plugin

https://developers.google.com/web/tools/workbox/modules/workbox-webpack-plugin

# API 문서

https://developers.google.com/web/tools/workbox/reference-docs/latest/workbox  
https://developer.chrome.com/docs/workbox/modules/

```
workbox
workbox.backgroundSync
workbox.broadcastUpdate
workbox.cacheableResponse
workbox.core
workbox.expiration
workbox.googleAnalytics
workbox.loadModule(moduleName)
workbox.navigationPreload
workbox.precaching
workbox.rangeRequests
workbox.routing
workbox.setConfig(options)
workbox.strategies
workbox.streams
workbox~ModulePathCallback(moduleName, debug)
```

# 서비스워커 업데이트가 발생할 때

> navigator.serviceWorker.register() 신규 호출
> 브라우저에 의한 자동 Update - 기존 등록된 서비스워커와 다른 파일내부 변경이력, HTTP Header Cache-Control max-age(최대24시간), 개발자도구 Service Workers 탭의 'Update on Reload' 페이지 새로고침시 업데이트 체크 등
> client request 처리시 - fetch
> 24시간내(Cache-Control max-age) 업데이트 확인이 없는 상태에서 push 및 sync 이벤트 발생시
> registration.update(), registration.unregister() 명시적 호출시

https://developers.google.com/web/fundamentals/primers/service-workers/lifecycle
https://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.9
https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/http-caching

# 캐싱 전략 - strategies

https://developer.chrome.com/docs/workbox/modules/workbox-strategies/
https://developers.google.com/web/fundamentals/instant-and-offline/offline-cookbook
https://developers.google.com/web/tools/workbox/reference-docs/latest/module-workbox-strategies

1. cacheFirst
   캐시에 있는지 우선확인하고, 없으면 네트워크에 접근해 리소스를 보여준다.

2. cacheOnly
   캐시에 있는 리소스만 사용한다.

3. networkFirst
   네트워크에 우선 접근하고, 오프라인 경우만 캐시 리소스를 확인한다.

4. networkOnly
   캐시를 사용하지 않으며, 캐시가 필요없는 GET 메소드가 아닌 다른 메소드가 주로 여기에 해당된다.

5. staleWhileRevalidate
   캐시에 있는 데이터를 먼저 브라우저에 반환해주고,
   네트워크에 리소스를 요청해 캐시에 저장하여, 기존 캐시 리소스를 업데이트 한다.

6. Cache then network
   페이지가 두 개의 요청(캐시에 요청, 네트워크에 요청)을 동시에 하고
   캐시된 데이터를 먼저 표시한 다음 네트워크 데이터가 도착하면
   페이지를 업데이트를 한다.
