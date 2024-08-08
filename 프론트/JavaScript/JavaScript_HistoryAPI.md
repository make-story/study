# History API

https://developer.mozilla.org/ko/docs/Web/API/History

https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/history

`study.git/크로스브라우징_이슈경험/BFCache/history.ts` 참고!

```html
<button class="js-button-push-state" data-url="?page=1">1</button>
<button class="js-button-push-state" data-url="?page=2">2</button>
<button class="js-button-push-state" data-url="?page=3">3</button>
<button class="js-button-replace-state" data-url="?replace-state=0">
  replace-state
</button>
<button class="js-button-back">back</button>
<script>
  window.onpopstate = function (event) {
    console.log(
      `location: ${document.location}, state: ${JSON.stringify(event.state)}`,
    );
  };

  // pushState
  const [$buttonPushState1, $buttonPushState2, $buttonPushState3] = [
    ...document.querySelectorAll('.js-button-push-state'),
  ];
  const handlerHistoryPushState = event => {
    const $target = event.currentTarget;
    const url = $target.dataset.url || '';
    history.pushState({ state: url }, 'title', url);
    console.log('History.length', history.length);
    console.log('History.state', history.state);
  };
  $buttonPushState1.removeEventListener('click', handlerHistoryPushState);
  $buttonPushState1.addEventListener('click', handlerHistoryPushState);
  $buttonPushState2.removeEventListener('click', handlerHistoryPushState);
  $buttonPushState2.addEventListener('click', handlerHistoryPushState);
  $buttonPushState3.removeEventListener('click', handlerHistoryPushState);
  $buttonPushState3.addEventListener('click', handlerHistoryPushState);

  // replaceState
  const $buttonReplaceState = document.querySelector(
    '.js-button-replace-state',
  );
  const handlerHistoryReplaceState = event => {
    const $target = event.currentTarget;
    const url = $target.dataset.url || '';
    history.replaceState({ state: url }, 'title', url);
    console.log('History.length', history.length);
    console.log('History.state', history.state);
  };
  $buttonReplaceState.removeEventListener('click', handlerHistoryReplaceState);
  $buttonReplaceState.addEventListener('click', handlerHistoryReplaceState);

  // back
  const $buttonBack = document.querySelector('.js-button-back');
  const handlerHistoryBack = event => {
    history.back();
  };
  $buttonBack.removeEventListener('click', handlerHistoryBack);
  $buttonBack.addEventListener('click', handlerHistoryBack);
</script>
```

## 브라우저 스크롤 히스토리 관리

```typescript
/**
 * Page Lifecycle
 * https://developers.google.com/web/updates/2018/07/page-lifecycle-api
 * https://wd.imgix.net/image/kheDArv5csY6rvQUJDbWRscckLr1/Hs3H9gK98YT0pvvU3k25.png
 * pageshow > beforeunload > pagehide > unload > bfcache
 */

/**
 * 스크롤 위치 복원 기능 값 설정
 */
export const setScrollRestoration = (value: 'manual' | 'auto' = 'manual') => {
  if (typeof window !== 'undefined' && window.history.scrollRestoration) {
    window.history.scrollRestoration = value;
  }
};

/**
 * BFCache
 * pageshow, pagebeforeshow, pagebeforehide, pagehide 이벤트
 * https://developer.mozilla.org/en-US/docs/Web/Events/pagehide
 * https://developer.mozilla.org/en-US/docs/Web/Events/pageshow
 */
// isBFCache 는 BFCache 로 페이지 진입했을 때,
// 자바스크립트 코드 캐싱방지를 위해 페이지 새로고침을 실행하며,
// 새로고침된 후 페이지가 BFCache 에 의해 새로고침되었는지 확인하기 위한 값
let isBFCache: boolean | null = null;

// BFCache 여부 저장 키
const HISTORY_BFCACHE_KEY = 'HISTORY_BFCACHE';

// BFCache 여부 확인 이벤트 (pageshow 이벤트 활용)
window.addEventListener('pageshow', (event: PageTransitionEvent) => {
  //console.log('event', event);
  //console.log('referrer', document.referrer);
  if (event.persisted) {
    //console.log('BFCache');
    // ...
  } else {
    //console.log('페이지 신규 진입');
    // ...
  }
});

// BFCache 된 페이지 였는지 이력 브라우저 스토리지에 저장
const setHistoryBFCache = (
  isBFCache: null | boolean,
  { key = `${HISTORY_BFCACHE_KEY}_${getPageURL()}` }: { key?: string } = {},
) => {
  window.sessionStorage.setItem(key, String(isBFCache));
};

// BFCache 페이지 이력 브라우저 스토리지에서 불러오기
const getHistoryBFCache = ({
  key = `${HISTORY_BFCACHE_KEY}_${getPageURL()}`,
}: { key?: string } = {}) => {
  return window.sessionStorage.getItem(key);
};

/**
 * DOM Ready
 */
document.addEventListener('DOMContentLoaded', (event: any) => {
  // ...
});

/**
 * 페이지 정보
 */
// 스크롤 저장 키
const HISTORY_SCROLL_KEY = 'HISTORY_SCROLL';

// 현재 페이지 URL 정보
const getPageURL = () => {
  return window.location.href.split('?')?.shift() || '';
};

// window 스크롤 값 반환
// TODO: 오버플로우 스크롤 설정된 element 의 경우 대응필요
export const getScroll = (element?: any) => {
  // https://developer.mozilla.org/en-US/docs/Web/API/Window/scrollY
  // The pageYOffset property is an alias for the scrollY property.
  return {
    left: window.pageXOffset || window.scrollX,
    top: window.pageYOffset || window.scrollY,
  };
};

// window 스크롤 값 브라우저 스토리지에 저장
export const setHistoryWindowScroll = (
  { left, top }: { left: number; top: number } = getScroll(),
  { key = `${HISTORY_SCROLL_KEY}_${getPageURL()}` }: { key: string } = {},
) => {
  //console.log(`scroll left: ${left}, top: ${top}`);
  // https://developer.mozilla.org/en-US/docs/Web/API/Storage/setItem
  // setItem 은 string 저장만 지원!
  window.sessionStorage.setItem(key, JSON.stringify({ left, top }));
};

// window 스크롤 값 브라우저 스토리지에서 불러오기
export const getHistoryWindowScroll = ({
  key = `${HISTORY_SCROLL_KEY}_${getPageURL()}`,
}: { key?: string } = {}): IScrollLeftTop => {
  //window.pageYOffset || window.scrollY || document.documentElement.scrollTop
  let scroll: any = window.sessionStorage.getItem(key);
  if (scroll) {
    scroll = JSON.parse(scroll) || {};
    return { left: Number(scroll.left) || 0, top: Number(scroll.top) || 0 };
  } else {
    return { left: 0, top: 0 };
  }
};

// pagehide
// unload (beforeunload 이벤트는 제외) 사용하지 않은 이유 : 브라우저는 페이지에 unload 이벤트 리스너가 추가되어 있는 경우, bfcache에 적합하지 않은 페이지로 판단하는 경우가 많다.
window.addEventListener('pagehide', (event: PageTransitionEvent) => {
  console.log('history > pagehide');
  // BFCache reload 여부 확인용
  setHistoryBFCache(isBFCache);
  // 콜백 초기화
  setPageShowCallbackClear();
  //setDOMReadyCallbackClear();
});

/**
 * 사용자 화면제어 확인 (UX)
 */
// 사용자가 페이지를 떠날 때
export const setPageHideEvent = (listener: any) => {
  // unload (beforeunload 이벤트는 제외) 사용하지 않은 이유 : 브라우저는 페이지에 unload 이벤트 리스너가 추가되어 있는 경우, bfcache에 적합하지 않은 페이지로 판단하는 경우가 많다.
  window.removeEventListener('pagehide', listener);
  window.addEventListener('pagehide', listener), { once: true };
};

// 사용자 터치가 발생하면, 히스토리 스크롤 이동 등 정지
export const setUserTouchEvent = (listener: any) => {
  window.document?.body?.removeEventListener('touchstart', listener);
  window.document?.body?.removeEventListener('touchmove', listener);
  window.document?.body?.addEventListener('touchstart', listener, {
    once: true,
  });
  window.document?.body?.addEventListener('touchmove', listener, {
    once: true,
  });
};

/**
 * popstate 이벤트
 * popstate 이벤트는 브라우저의 백 버튼이나 (history.back() 호출) 등을 통해서만 발생 (history.pushState, history.replaceState 의해 추가/변경된 state 값 확인)
 * popstate 이벤트의 state 속성은 히스토리 엔트리 state 객체의 복사본을 갖게 됩니다.
 * state 객체의 직렬화 결과 크기는 최대 640k로 제한됩니다.
 * 브라우저는 popstate 이벤트를 페이지 로딩시에 다르게 처리합니다. Chrome(v34 이전버전) 와 Safari는 popstate 이벤트를 페이지 로딩시에 발생시킵니다. 하지만 Firefox 는 그렇지 않습니다.
 * https://developer.mozilla.org/ko/docs/Web/API/History_API
 */
/*window.onpopstate = function(event) {
	console.log("location: ", document.location);
	console.log("state: ", event.state);
};*/

/**
 * 페이지 진입 방식 확인 (NavigationType)
 * window.performance.navigation 스팩아웃 (Level 2 스팩 사용 권장)
 * https://www.w3.org/TR/navigation-timing-2/#sec-performance-navigation-types
 */
export type TNavigationType =
  | 'navigate'
  | 'reload'
  | 'back_forward'
  | 'prerender'
  | 'bfcache'
  | 'reload_bfcache'
  | 'referrer_login'
  | '';
export const getNavigationType = (
  callback?: Function /* options: any = {}*/,
): TNavigationType => {
  if (typeof window === 'undefined') {
    return '';
  }

  // navigation
  const getType = () => {
    let type: TNavigationType = '';

    if (
      typeof window.performance?.getEntriesByType === 'function' &&
      window.performance.getEntriesByType('navigation')?.length
    ) {
      const timing: any =
        window.performance.getEntriesByType('navigation')[0] || {};
      type = timing?.type || '';
    } else {
      switch (window.performance?.navigation?.type) {
        case 0:
          type = 'navigate';
          break;
        case 1:
          type = 'reload';
          break;
        case 2:
          type = 'back_forward';
          break;
        default:
          type = '';
          break;
      }
    }

    // BFCache, referrer 확인
    if (['navigate', 'reload'].includes(type)) {
      if (getHistoryBFCache() === 'true') {
        type = 'reload_bfcache'; // 이전 BFCache 상태에서 페이지 새로고침 됨
      } else if (
        document?.referrer &&
        document?.referrer?.split('?')?.shift()?.split('/')?.pop() === 'login'
      ) {
        type = 'referrer_login';
      }
    }

    return type;
  };

  // callback 으로 확인하는 경우 (bfcache 여부)
  if (typeof callback === 'function') {
    setPageShowCallback((isBFCache: boolean | null) =>
      callback(isBFCache ? 'bfcache' : getType()),
    );
  }

  return getType();
};
```

## referrer, 레퍼러

```javascript
// history
// IE10 이상이면 history.replaceState 저장, 이하이면 IE8 이상 지원하는 sessionStorage 저장
// IOS 등에서 터치(플리킹)로 뒤로가기를 했을 경우 BFCache 활용됨
// (IOS nitro엔진 WKWebview는 히스토리백시 BFCache를 사용)

// popstate 이벤트
// popstate 이벤트는 브라우저의 백 버튼이나 (history.back() 호출) 등을 통해서만 발생 (history.pushState, history.replaceState 의해 추가/변경된 state 값 확인)
// popstate 이벤트의 state 속성은 히스토리 엔트리 state 객체의 복사본을 갖게 됩니다.
// state 객체의 직렬화 결과 크기는 최대 640k로 제한됩니다.
// 브라우저는 popstate 이벤트를 페이지 로딩시에 다르게 처리합니다. Chrome(v34 이전버전) 와 Safari는 popstate 이벤트를 페이지 로딩시에 발생시킵니다. 하지만 Firefox 는 그렇지 않습니다.
// https://developer.mozilla.org/ko/docs/Web/API/History_API
window.onpopstate = function (event) {
  console.log('location: ', document.location);
  console.log('state: ', event.state);
};

// pageshow, pagebeforeshow, pagebeforehide, pagehide 이벤트
// https://developer.mozilla.org/en-US/docs/Web/Events/pagehide
// https://developer.mozilla.org/en-US/docs/Web/Events/pageshow
window.onpageshow = function (event) {
  console.log('event', event);
  console.log('navigation', window.performance.navigation);
  console.log('referrer', document.referrer);

  if (event.persisted) {
    console.log('BFCache');
  } else {
    console.log('새로 진입');
  }
};

// IOS BFCache 대응
// 일반적 대응. 페이지 로드가 끝났을 때 페이지쇼 이벤트를 등록해 둔다. 그리고 뒤로가기로 BF캐시가 되었을 때, 등록했던 페이지쇼 이벤트가 실행되도록 한다.
// (페이지 이동 후 뒤로가기, 다시 페이지 이동 후 뒤로가기로 했을 때, 즉 링크이동 다시 뒤로가기를 반복했을 때 pageshow가 이벤트가 실행되지 않을 수 있다.)
window.onpageshow = function (event) {
  if (event.persisted) {
    // 페이지 새로고침
  }
};
```
