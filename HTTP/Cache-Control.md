# 캐시(Cache-Control)

https://httpwg.org/specs/rfc9111.html#field.cache-control

https://jakearchibald.com/2016/caching-best-practices/

https://toss.tech/article/smart-web-service-cache

HTTP 캐시 신뢰성
https://engineering.fb.com/2015/04/13/web/web-performance-cache-efficiency-exercise/

- Cache-Control: public
  public은 모든 캐시 (브라우저, CDN 등)로 리소스를 캐시 할 수 있음을 의미

- Cache-Control: private
  private은 리소스가 브라우저에 의해서만 캐시 될 수 있음을 의미 (특정 사용자, 프록시 서버 저장안함)

- Cache-Control: no-store
  브라우저가 항상 서버에서 리소스를 요청하도록 지시 (캐시 사용안함)

- Cache-Control: no-cache
  이것은 브라우저에게 파일을 캐시하도록 지시하지만 최신 버전이 있는지 서버와 확인하기 전에는 파일을 사용하지 않습니다. 이 유효성 검사는 ETag 헤더로 수행됩니다. (효율적인 방법)

- Cache-Control: max-age=60
  리소스를 캐시해야하는 시간을 초 단위로 지정하므로 max-age = 60 은 1 분 동안 캐시해야 함을 의미
  RFC 2616의 최대 값은 1 년을 초과하지 않아야합니다 ( max-age = 31536000 ).

- Cache-Control: s-max-age=60
  CDN과 같은 중간 캐시에서만 사용

- Cache-Control: must-revalidate
  리소스의 상태를 확인하여 만료 된 리소스는 사용해서는 안된다는 것을 캐시에 알립니다.

- HTTP 1.1 은 다양한 지시자를 ,(콤마) 기준으로 다양하게 설정할 수 있습니다.
  Cache-Control: private, max-age=0, no-cache

## HTTP 요청(Request) / 응답(Response) Cache-Control

왜 HTTP Request 에 Cache-Control no-cache 가 포함되어 요청될까?

https://stackoverflow.com/questions/14541077/why-is-cache-control-attribute-sent-in-request-header-client-to-server

Cache-Control: no-cache 일반적으로 요청 헤더(웹 브라우저에서 서버로 전송)에 사용되어 중간 프록시에서 리소스의 유효성을 강제로 확인합니다.

## HTTP 캐시 엔트리 (= 캐싱하는 대상)

https://it-eldorado.tistory.com/142

`HTTP 캐시에 저장되는 데이터 뭉치 하나하나를 캐시 엔트리`라고 부른다.  
그리고 각 캐시 엔트리를 구분하는 기준은 캐시 키(Cache Key)이다.  
기본적인(Primary) 캐시 키는 HTTP 요청의 메소드와 URI의 조합으로 결정된다(일반적으로 GET 요청에 대해서만 캐싱하므로 URI로만 결정되는 경우도 있음).

즉, 간단히 생각해서 메소드와 URI가 동일한 하나의 HTTP 요청은 하나의 캐시 엔트리에 대응하는 것이다.

캐시 엔트리의 일반적인 형태를 살펴보면 다음과 같다.

- HTML 문서, 이미지, 파일 등의 리소스를 포함하는 GET 요청에 대한 `200 (OK) 응답`
- `301 (Moved Permanently) 응답`
- `404 (Not Found) 응답`
- `206 (Partial Content) 응답`
- (캐시 키로 사용하기에 적절한 무언가가 정의된 경우) GET이 아닌 HTTP 요청에 대한 HTTP 응답

이때 주의해야 할 것은,  
하나의 캐시 엔트리가 여러 개의 HTTP 응답들로 구성되어 있을 수도 있다는 것이다.  
이 경우에 해당 HTTP 응답들은 그 캐시 엔트리 내에서 두 번째(Secondary) 키에 의해 구분이 된다.  
이는 보통 그 캐시 엔트리에 대응하는 HTTP 요청이 컨텐츠 협상(Content Negotiation)의 타겟인 경우에 해당한다.

https://developer.mozilla.org/en-US/docs/Web/HTTP/Caching#varying_responses

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
const version = "2";

self.addEventListener("install", (event) => {
  // 스크립트와 스타일을 미리 캐시
  // Cache-Control max-age 확인(경합)하지 않고 바로 캐싱
  event.waitUntil(
    caches
      .open(`static-${version}`)
      .then((cache) => cache.addAll(["/styles.css", "/script.js"]))
  );
});

self.addEventListener("activate", (event) => {
  // …delete old caches…
});

self.addEventListener("fetch", (event) => {
  // 일치하는 항목이 있으면 캐시에서 제공하고 그렇지 않으면 네트워크 사용
  event.respondWith(
    caches
      .match(event.request)
      .then((response) => response || fetch(event.request))
  );
});
```

서비스 워커에서 캐시(Cache-Control)를 우회할 수 있음

```javascript
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(`static-${version}`)
      .then((cache) =>
        cache.addAll([
          new Request("/styles.css", { cache: "no-cache" }),
          new Request("/script.js", { cache: "no-cache" }),
        ])
      )
  );
});
```

캐시회피

```javascript
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(`static-${version}`).then((cache) =>
      Promise.all(
        ["/styles.css", "/script.js"].map((url) => {
          // cache-bust using a random query string
          return fetch(`${url}?${Math.random()}`).then((response) => {
            // fail on 404, 500 etc
            if (!response.ok) throw Error("Not ok");
            return cache.put(url, response);
          });
        })
      )
    )
  );
});
```

---

# 서비스 워커와 HTTP 캐시는 함께 잘 작동함

https://stackoverflow.com/questions/42466473/if-you-are-using-service-workers-do-you-still-need-cache-control-headers

https://jakearchibald.com/2016/caching-best-practices/

서비스 워커 내부에서도 fetch 존재
(서비스 워커 fetch HTTP 요청이 발생하면, Cache-Control 설정에 따른 HTTP 캐시사용)
즉, HTTP 캐시는 네트워크와 서비스 워커 사이에 존재함

리소스 요청 > 서비스워커 > cache 스토리지에 없음 > fetch > HTTP Cache 확인 > 브라우저 캐시에 없음 > 서버 > 반환

리소스 요청 > 서비스워커 > cache 스토리지에 있음 > 반환
