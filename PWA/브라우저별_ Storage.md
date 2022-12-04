# 브라우저별 스토리지 최대 허용 용량

https://stackoverflow.com/questions/35242869/what-is-the-storage-limit-for-a-service-worker

https://jakearchibald.com/2014/offline-cookbook/#cache-persistence

https://love2dev.com/blog/what-is-the-service-worker-cache-storage-limit/

`추천자료`  
https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API/Browser_storage_limits_and_eviction_criteria#storage_limits

https://developer.mozilla.org/en-US/docs/Web/API/Storage_API
https://developer.mozilla.org/en-US/docs/Web/API/StorageManager
https://developer.chrome.com/blog/estimating-available-storage-space/

```javascript
if ('storage' in navigator && 'estimate' in navigator.storage) {
  navigator.storage
    .estimate()
    .then(({ usage, quota }) =>
      console.log(`Using ${usage} out of ${quota} bytes. ${(usage / quota) * 100} % ${quota - usage} bytes`),
    )
    .catch(error => console.log('Loading storage estimate failed', error));
}
```

---

# HTTP Cache 신뢰

https://engineering.fb.com/2015/04/13/web/web-performance-cache-efficiency-exercise/

---

https://antsitvlad.medium.com/how-we-store-data-on-client-browser-improve-performance-reliability-and-user-experience-93d23721aa23

쿠키 는 브라우저에 저장되는 매우 작은 데이터로 최대 4KB를 저장할 수있으며 해당 도메인에서 브라우저가 보내는 모든 HTTP 요청과 함께 전송되는 유일한 저장소입니다.

LocalStorage 는 브라우저용 로컬 저장소라고 하며 최대 10MB를 저장할 수 있습니다.
localStorage 는 동기식이고 성능 문제를 일으키기 때문에 사용 을 피해야 합니다. 또한 보안 또는 민감한 데이터를 저장해서는 안됩니다.

SessionStorage 도 같은 작업을 수행하지만 이름에서 알 수 있듯이 세션 기반이며 브라우저를 닫으면 삭제되며 최대 5MB와 같이 LocalStorage보다 적게 저장할 수 있습니다.

IndexedDB 는 비관계형 데이터베이스입니다. JS 개체, 파일, blob 등과 같은 모든 종류의 데이터를 저장하는 데 적합 합니다. 트랜잭션을 통해 비동기식으로 작동하며 이벤트를 기반으로 합니다.

CacheStorage API 는 강력한 도구입니다. HTML , CSS 및 JavaScript 와 같은 정적 앱 리소스를 캐시할 수 있습니다.
Cache Storage API 를 사용 하여 장치에서 자산을 다운로드, 저장, 삭제 또는 업데이트할 수 있습니다. 그런 다음 이러한 자산은 네트워크 요청 없이 장치에서 제공될 수 있습니다.
