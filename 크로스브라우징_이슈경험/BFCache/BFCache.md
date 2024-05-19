# BFCache

https://yceffort.kr/2020/11/back-forward-cache

https://web.dev/bfcache/

https://ui.toast.com/weekly-pick/ko_20201201

https://blog.naver.com/PostView.nhn?blogId=qls0147&logNo=222157982248&categoryNo=0&parentCategoryNo=0&viewDate=&currentPage=1&postListTopCurrentPage=1&from=postView

## PageTransitionEvent

https://velog.io/@sejinkim/BackForward-Cache-A.K.A.-bfcache

Back/Forward Cache, 즉 bfcache는 사용자의 탐색Navigation 경험을 향상시키기 위한 브라우저 레벨의 최적화 기능을 일컫습니다.  
다른 페이지로 이동하기 직전에 힙 메모리 영역까지 포함한 페이지의 전체 스냅샷을 메모리에 저장해 두고,  
페이지에 다시 되돌아오려고 할 때 캐시로 페이지를 즉시 복원하게 됩니다.

다른 페이지로 이동할 때, 그리고 페이지에 다시 돌아왔을 때 Page Lifecycle API의 PageTransitionEvent를 통해 bfcache를 관찰할 수 있습니다.

https://developer.chrome.com/docs/web-platform/page-lifecycle-api?hl=ko

```javascript
window.addEventListener('pageshow', event => {
  if (event.persisted) {
    console.log('This page was restored from the bfcache.');
  } else {
    console.log('This page was loaded normally.');
  }
});
```

```javascript
window.addEventListener('pagehide', event => {
  if (event.persisted) {
    console.log('This page *might* be entering the bfcache.');
  } else {
    console.log('This page will unload normally and be discarded.');
  }
});
```

## bfcache 비활성화하기

https://velog.io/@sejinkim/BackForward-Cache-A.K.A.-bfcache

바람직하지는 않지만, bfcache를 비활성화하는 방법은 있습니다.  
최상위 페이지의 Response header에 캐시를 거부하는 Cache-Control 디렉티브를 명시하는 것입니다.

```
Cache-Control: no-store
```

그러나 이것은 HTTP Caching 맥락에서의 디렉티브이지, 사실 bfcache와는 직접적인 연관은 없는 부분이라는 점에서 의아함을 느낄 수 있는 부분입니다.  
다만 어쨌든 현재는 Cache-Control 헤더가 bfcache까지 포괄하고 있으므로, 저렇게 설정하게 되면 다른 것들도 캐시되지 않게 될 것이므로 의도하지 않은 변경이 발생하게 됩니다.

https://chromestatus.com/feature/6705326844805120

# SSG.com 리액트 전환간 BFCache 대응

https://medium.com/ssgtech/%ED%94%84%EB%A1%A0%ED%8A%B8-%EC%84%9C%EB%B9%84%EC%8A%A4-87f13102c593

# BFCache를 위해 페이지 최적화 하는 팁

모든 페이지가 bfcache에 저장되는 것은 아니다.  
또한 bfcache에 저장되었다고 하더라도 무한정 그곳에 머무르지는 않을 것이다.  
개발자들이 캐시 적중률을 극대화하기 위해 페이지를 bfcache에 적격(eligible)하게, 혹은 부적격(ineligible)하게 만드는 이유를 이해하는 것이 중요하다.

​

1. unload 이벤트 사용하지 않기  
   모든 브라우저에서 bfcache를 최적화하는 가장 중요한 방법은 unload 이벤트를 절대로 사용하지 않는 것이다.  
   unload 이벤트는 bfcache 이전에 선행된다.  
   근데 unload 이벤트가 발생한 후에는 페이지가 더이상 존재하지 않을 것이라는 (합리적) 가정 하에 많은 페이지가 운영되기 때문에 브라우저를 개발하는 입장에서 unload가 있는 경우 bfcache를 할 지 말지가 큰 딜레마 였다고 한다.
   ​  
   그래서 브라우저는 페이지에 unload 이벤트 리스너가 추가되어 있는 경우 bfcache에 적합하지 않은 페이지로 판단하는 경우가 많다.

- firefox, safari, chrome 등등 브라우저별로 어떻게 bfcache에 넣을건지에 대한 알고리즘은 차이가 있지만 일단 unload 이벤트 리스너가 있다면, bfcache를 고려하는 부분이 있다는 것이다.
- unload 이벤트 보다는 pagehide 이벤트를 사용하도록 하자!
  - pagehide 이벤트는 unload가 불리는 모든 경우에 다 불린다.
- 심지어 Lighthouse v6.2.0 에서 no-unload-listeners-audit 까지 추가했다고 함!!
- 근데 정~ unload 이벤트 리스너를 추가해야한다면, beforeunload 이벤트 리스너를 추가하도록 해라.
  - beforeunload 이벤트 리스너는 브라우저가 bfcache에 부적격(ineligible)한 요소로 판단하지 않는다. (자세한 예시)

​

2. window.opener 참조를 피해라
   몇몇 브라우저에서는(Chrome v86 포함) window.open()이나, rel="noopener"을 사용하지 않고 target=\_blank를 통해 새 창을 여는 코드를 작성한 경우, 열린 창에는 열게한 창의 window object에 대한 참조가 있다.  
   이렇게 window.opener가 null이 아닌 참조가 되어 있는 경우 bfcache에 안전하게 넣을 수 없다.왜냐하면 보안 문제가 있을 뿐만 아니라 bfcache에 액세스를 시도하는 모든 페이지가 깨질 수 있기 때문이다.

- 즉, rel="noopener"를 사용하여 target=\_blank를 통해 새 창을 열도록 하자! (window.opener reference를 만들지 않음)
- 만약에 새창을 열고, window.postMessage()를 통해 그것을 제어하거나 window object를 직접 참조할 필요가 있다면, 열린 창이나 열게한 창 모두 bfcache할 자격이 없다.

​​

3. (navigate 하기 전에) 항상 open된 connection 닫기  
   setTimeout(), promise와 같이 아직 코드가 진행중(?) 인데, 다른 페이지로 이동한 경우에는 브라우저는 진행중인 setTimeout나 promise 코드를 일시정지하고 다시 BFCache에서 복원될 때, 진행 중이던 코드를 재개한다.

scheduled된 JavaScript task들이 단지 DOM API에 접근한다거나, 해당 페이지에만 영향을 주는 고립된 API라면 일시정지 했다가 다시 재개하는게 문제가 되지 않을 것이다.  
그러나 scheduled된 task가 same-origin의 다른 페이지에서도 엑세스 할 수 있는 API의 경우(예: IndexedDB, Web Locks, WebSockets, etc.) 작업을 일시 중지했을때, 다른 탭의 코드가 실행되지 않을 수 있기 때문에 문제가 발생할 수 있다.

그러므로 대부분 브라우저에서 아래와 같이 connection이 open된 경우에는 bfcache에 해당 페이지를 넣으려고 하지 않는다.

- Pages with an unfinished IndexedDB transaction
- Pages with in-progress fetch() or XMLHttpRequest
- Pages with an open WebSocket or WebRTC connection

pagehide나 freeze 이벤트에서 항상 connection을 close하고, observer (옵저버)를 제거하거나 연결을 끊는 것이 좋다. 이렇게 하면 다른 열린 탭에 영향을 미치지 않고 페이지를 안전하게 캐시할 수 있다.  
(당연하겠지만, pageshow나 resume 이벤트에서 bfcache로 부터 복구됬을때 커넥션을 다시 연결 해주도록 하면 된다.)
