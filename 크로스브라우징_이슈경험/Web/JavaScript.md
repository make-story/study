# JavaScript : 키보드 이벤트 keyCode 값은 비표준 방식

https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/keyCode

'code' 권장  
https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/code

# CSS: CSS코드로 PC/Mobile 구분 (hover와 pointer 쿼리)

https://codepen.io/paperblock/pen/wvzrezj

```html
<h3 class="pc-view">PC 사용중!</h3>
<h3 class="mobile-view">모바일 사용중</h3>
<h4>Media Query Test:</h4>

<div class="output">
  <div>
    <div class="demo hover--none">hover: none</div>
    <div class="demo hover--hover">hover: hover</div>
  </div>

  <div>
    <div class="demo pointer--none">pointer: none</div>
    <div class="demo pointer--coarse">pointer: coarse</div>
    <div class="demo pointer--fine">pointer: fine</div>
  </div>

  <div>
    <div class="demo any-hover--none">any-hover: none</div>
    <div class="demo any-hover--hover">any-hover: hover</div>
  </div>

  <div>
    <div class="demo any-pointer--none">any-pointer: none</div>
    <div class="demo any-pointer--coarse">any-pointer: coarse</div>
    <div class="demo any-pointer--fine">any-pointer: fine</div>
  </div>
</div>
```

```css
.pc-view,
.mobile-view {
  color: blue;
}

@media (hover: none) {
  .pc-view {
    display: none;
  }
}
@media (hover: hover) {
  .mobile-view {
    display: none;
  }
}

.demo {
  display: inline-block;
  width: 200px;
  height: 100px;
  line-height: 100px;
  background: #aaa;
  text-align: center;
  opacity: 0.4;
  margin: 4px;
  border-radius: 1px;
  text-decoration: line-through;
  -webkit-user-select: none;
  user-select: none;
}
.demo:hover {
  background: #c00;
  color: white;
}

/** hover options */

@media (hover: none) {
  .demo.hover--none {
    opacity: 1;
    text-decoration: none;
  }
}
@media (hover: hover) {
  .demo.hover--hover {
    opacity: 1;
    text-decoration: none;
  }
}

/** pointer options */

@media (pointer: none) {
  .demo.pointer--none {
    opacity: 1;
    text-decoration: none;
  }
}
@media (pointer: coarse) {
  .demo.pointer--coarse {
    opacity: 1;
    text-decoration: none;
  }
}
@media (pointer: fine) {
  .demo.pointer--fine {
    opacity: 1;
    text-decoration: none;
  }
}

/** any-hover options */
@media (any-hover) {
  .demo.any-hover {
    opacity: 1;
    text-decoration: none;
  }
}
@media (any-hover: none) {
  .demo.any-hover--none {
    opacity: 1;
    text-decoration: none;
  }
}
@media (any-hover: hover) {
  .demo.any-hover--hover {
    opacity: 1;
    text-decoration: none;
  }
}

/** any-pointer options */
@media (any-pointer) {
  .demo.any-pointer {
    opacity: 1;
    text-decoration: none;
  }
}
@media (any-pointer: none) {
  .demo.any-pointer--none {
    opacity: 1;
    text-decoration: none;
  }
}
@media (any-pointer: coarse) {
  .demo.any-pointer--coarse {
    opacity: 1;
    text-decoration: none;
  }
}
@media (any-pointer: fine) {
  .demo.any-pointer--fine {
    opacity: 1;
    text-decoration: none;
  }
}
```

# CSS : 텍스트 셀렉트, 모바일 도구상자 노출방지

```css
.select-none {
  outline: none;

  /* PC에서의 셀렉트, mobile에서의 복사/붙여넣기 툴팁 사용정지 */
  -khtml-user-select: none;
  -ms-user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  user-select: none; /* 텍스트 선택 불가 */

  -webkit-touch-callout: none; /* 기본 팝업창(툴팁, 도구) 차단하기 */
  -webkit-touch-select: none; /* 복사막기 */
  -webkit-text-size-adjust: none;
  -webkit-tap-highlight-color: rgba(
    0,
    0,
    0,
    0
  ); /* 링크를 터치했을때 나오는 기본 영역의 색상을 제어, 레이어 영역 터치했을 때 회색으로 변경되는 것 방지 */
  -webkit-tap-highlight-color: transparent;
}
```

레이어 내부 컨텐츠에 적용할 경우, 레이어 바닥에 엤는 컨텐츠(body) 가 IOS 일부 사파리에서 선택될 수 있다.
이 경우 레이어를 열 때 body 에 셀렉트가 잡히지 않는 클래스를 넣고, 레이어를 닫을 때 빼주는 class 토글을 해주는 것으로 해결가능하다.

---

# JavaScript -> CSS 로 구현 가능한 것 (기능구현, 이슈처리 등)

## 랜더링 성능을 향상 시키는 새로운 CSS 속성 content-visibility

https://wit.nts-corp.com/2020/09/11/6223

## 사용자가 터치, 휠 스크롤 조작을 마쳤을 때의 오프셋을 설정

https://wit.nts-corp.com/2018/08/28/5317

## 하위 스크롤 컨테이너가 스크롤 포트의 끝에 도달했을 때, 상위 스크롤이 움직이는 것을 비활성화

https://www.bram.us/2017/12/10/customizing-pull-to-refresh-and-overflow-effects-with-css-overscroll-behavior/

```scss
input[type='checkbox'] {
  &:checked + label + .scroll {
    overscroll-behavior: contain;
  }
}
```

## touch-action 속성의 값으로 auto 이외의 값을 줄 경우, 해당 속성에 명시해준 터치 액션만이 브라우저에 의해 처리

https://wit.nts-corp.com/2018/08/28/5317

---

# JavaScript: 스와이프(swiper) 터치 민감도, 스와이프 내부 배너 클릭 등

슬라이드 내부 컨텐츠가 배너 형태의 링크가 적용된 경우,  
스와이퍼 라이브러리가 슬라이드 동작(기능)을 우선시 하므로,  
터치가 위아래 또는 슬라이드 이동시키려는 제스처 등이 있을 때,  
슬라이드 내부 링크 클릭 이벤트 실행을 정지시키는 경우가 있음

https://developer.mozilla.org/en-US/docs/Web/API/Pointer_events#event_order  
https://ui.toast.com/posts/ko_20220106  
'touchstart' -> 'touchmove' -> 'touchend' -> 'mousedown' -> 'mousemove' -> 'mouseup' -> 'click'

```javascript
function createParagraph(text) {
  const el = document.createElement('p');
  el.innerText = text;

  return el;
}

const printEl = document.getElementById('print');

[
  'touchstart',
  'touchmove',
  'touchend',
  'mousedown',
  'mousemove',
  'mouseup',
  'click',
].forEach(eventType => {
  document.addEventListener(eventType, () => {
    printEl.appendChild(createParagraph(eventType));

    // 스크롤을 최하단으로 이동시켜준다.
    window.scrollTo(0, document.body.scrollHeight);
  });
});
```

해당 이벤트 순서로 실행됨 (브라우저에 따라 다를 수 있음)

그렇기 때문에,

```
allowTouchMove : true, // (false-스와이핑안됨)버튼으로만 슬라이드 조작이 가능
```

옵션으로 사용자 터치 동작(Touch Gestures, 터치 제스처)에 따라 슬라이드가 동작하지 않도록 한 다음,  
`touchStart` 이벤트에서 터치시작 위치 `touchEnd` 이벤트에서 터치끝 위치 값을 통해,  
touchEnd 에서 최종적으로 이전슬라이드 또는 다음슬라이드 함수(기능)을 호출하도록 한다.  
swiper.slideNext(speed, runCallbacks)  
swiper.slidePrev(speed, runCallbacks)

https://swiperjs.com/swiper-api#events  
https://swiperjs.com/swiper-api#methods--properties

## 참고: 터치 클릭 지연 제거

```css
* {
  touch-action: manipulation;
}
```

# a 태그 링크 이동 전 onclick 이벤트 실행

https://duckracoon.tistory.com/entry/%EC%82%AC%ED%8C%8C%EB%A6%AC%EC%97%90%EC%84%9C-%EB%B0%9C%EC%83%9D%ED%95%98%EB%8A%94-ajax%EC%99%80-XHR%EC%9D%98-%EC%97%90%EB%9F%AC%EC%BD%9C%EB%B0%B1

onclick 핸들러 내부에 ajax 호출이 있을 경우,  
사파리는 ajax 호출하지 않고, a 태그의 href 의 링크 이동이 실행됨.  
즉, a 태그에 적용되어 동작하는 onclick 이벤트 내 ajax 가 실행되지 않음.

이 경우 a 태그의 onclick 에 기본 이벤트 정지 및 ajax 실행 후 href 페이지 이동(window.location.href 로 코드삽입 및 이동)  
또는  
페이지 실행 시 특정 이벤트 강제 실행

```javascript
const sendLogsBeforeRouting = async (
  e: React.MouseEvent | null,
  url: string,
  callbackSendLogs: (() => void | Promise<void>) | undefined,
  callbackBeforeRouting?: (...args: any[]) => any,
) => {
  e?.preventDefault();

  const UA = window.navigator.userAgent.toLowerCase();
  const hasSafari = UA.includes('safari');
  const hasChrome = UA.includes('chrome');
  try {
    // safari 에서 클릭으로 링크 이동할 경우 로그 쌓이지 않는 현상 방어 처리
    // iOS '모바일 크롬'에서도 '사파리'브라우저 처럼 동기처리 필요. (현재 '모바일 크롬' userAgent에선 'chrome' 문자열 없음)
    if (hasSafari && !hasChrome) {
      await callbackSendLogs?.();
    } else {
      callbackSendLogs?.();
    }
  } catch (error) {
    console.debug('send log error:', error);
  } finally {
    callbackBeforeRouting?.();
    // url 이 없으나 리액팅로그 수집하는 케이스가 있다. 배너 BO세팅시 링크에 #을 입력하면 이동하지 않는다.
    if (url && url !== '#') {
      router.push(url);
    }
  }
};
```
