# jQuery position() / offset() 의 top, left 차이점

- offset : 브라우저 좌측, 상단 기준 위치 값을 반환
- position : 부모 element 기준 위치 값을 반환

# Viewport의 시작지점을 기준으로한 상대좌표

Viewport의 시작지점 기준

```javascript
const target = document.getElementById('target'); // 요소의 id 값이 target이라 가정
const clientRect = target.getBoundingClientRect(); // DomRect 구하기 (각종 좌표값이 들어있는 객체)
```

# 부모요소의 시작지점을 기준으로한 상대좌표

```javascript
function getAbsoluteTop(element) {
  return window.pageYOffset + element.getBoundingClientRect().top;
}

const target = document.getElementById('target'); // 요소의 id 값이 target이라 가정
const parentElement = target.parentElement;
const parentAbsoluteTop = getAbsoluteTop(parentElement);
const absoulteTop = getAbsoluteTop(target);

const relativeTop = absoluteTop - parentAbsoluteTop;
```

# 절대좌표

```javascript
const target = document.getElementById('target'); // 요소의 id 값이 target이라 가정

const clientRect = target.getBoundingClientRect(); // DomRect 구하기 (각종 좌표값이 들어있는 객체)
const relativeTop = clientRect.top; // Viewport의 시작지점을 기준으로한 상대좌표 Y 값.
const scrolledTopLength = window.pageYOffset; // 스크롤된 길이
const absoluteTop = scrolledTopLength + relativeTop; // 절대좌표

//const absoluteTop = window.pageYOffset + element.getBoundingClientRect().top;
```

# 포인터 위치값

- screenX/screenY : screen in device pixels. (모니터 화면 기준)
- pageX/pageY : <html> element in CSS pixels. (html 기준 스크롤값 포함 위치)
- clientX/clientY : viewport in CSS pixels. (브라우저 기준 스크롤값 제외 위치)

# elementFromPoint(x, y)

document.elementFromPoint(x, y)을 호출하면 창 기준 좌표 (x, y)에서 가장 가까운 중첩 요소를 반환

창 정중앙에 있는 요소의 태그가 얼럿창에 출력되고, 해당 요소가 붉은색으로 강조 예

```javascript
let centerX = document.documentElement.clientWidth / 2;
let centerY = document.documentElement.clientHeight / 2;

let elem = document.elementFromPoint(centerX, centerY);

elem.style.background = 'red';
alert(elem.tagName);
```

---

# offsetLeft/offsetTop, offsetWidth/offsetHeight, offsetParent

패딩과 보더 포함 (일반적으로 element 크기 등을 구할 떄 사용)
offsetWidth/offsetHeight -> display: none 되어 있는 것에 주의! (visibility: hidden 경우는 값 반환가능)

# clientLeft/clientTop, clientWidth/clientHeight

패딩 포함 (실제로 보여지고 있는 컨텐츠가 얼마만큼의 공간을 차지하고 있는지 확인)

# scrollLeft/scrollTop, scrollWidth/scrollHeight

보이는 것과 상관 없이 실제 컨텐츠 영역 (전체 스크롤바를 사용하게 되어 숨겨진 영역까지 포함)

# window(브라우저창) 크기

## XHTML : 표준이 없다

// 가로길이
document.body.offsetWidth
document.body.scrollWidth // (문서 전체의 크기)
document.body.clientWidth // (창의 크기)

// 세로길이
document.body.offsetHeight
document.body.scrollHeight //(문서 전체의 크기)
document.body.clientHeight // (창의 크기)

## HTML5 : 표준이 정해져 있다.

// 가로 길이
window.innerWidth // 브라우저 윈도우 두께를 제외한 실질적 가로 길이
window.outerWidth // 브라우저 윈도우 두께를 포함한 브라우저 전체 가로 길이

//세로길이
window.innerHeight // 브라우저 윈도우 두께를 제외한 실질적 세로 길이
window.outerHeight // 브라우저 윈도우 두께를 포함한 브라우저 전체 세로 길이

```javascript
window.innerWidth || document.body.clientWidth || document.documentElement.clientWidth;
window.innerHeight || document.body.clientHeight || document.documentElement.clientHeight;
```

# document(body) 크기

```javascript
Math.max(
  document.body.scrollWidth,
  document.documentElement.scrollWidth,

  document.body.offsetWidth,
  document.documentElement.offsetWidth,

  document.documentElement.clientWidth,
);

Math.max(
  document.body.scrollHeight,
  document.documentElement.scrollHeight,

  document.body.offsetHeight,
  document.documentElement.offsetHeight,

  document.documentElement.clientHeight,
);
```

# 렌더링된 크기

```javascript
x.getBoundingClientRect(); // top, bottom, left, right, [width, height (IE9 이상)]
```

`문서의 스크롤값 미포함`
정확한 계산을 위해 스크롤값 'window.pageYOffset' 또는 'window.scrollY' 을 더해줘야 한다.  
일부 오래된 브라우저는 scrollY 대신 pageYOffset만 지원하는 경우가 있지만, 노후 환경을 신경쓰지 않아도 된다면 둘 중 아무거나 사용해도 괜찮습니다.

```javascript
document.documentElement; // <html> element // 표준
```

# 브라우저 스크롤 값

https://developer.mozilla.org/ko/docs/Web/API/Window/scrollY

브라우저간 호환성을 위해서는 window.scrollY 대신 window.pageYOffset을 사용하세요

```javascript
(window.pageYOffset || document.documentElement.scrollTop) - (document.documentElement.clientTop || 0);

(window.pageXOffset || document.documentElement.scrollLeft) - (document.documentElement.clientLeft || 0);
```

# getBoundingClientRect() 와 offsetWidth, offsetHeight 차이

대부분의 경우엔 `getBoundingClientRect()은 offsetWidth, offsetHeight와 거의 같은 값을 리턴`한다.

하지만, `transform이 적용되어 있다면 조금 달라진다.`

offsetWidth와 offsetHeight 속성은 엘리먼트의 레이아웃 크기를 리턴하는 반면,  
getBoundingClientRect()는 렌더링된 크기를 리턴한다.

예를 들어, 엘리먼트에 다음과 같은 속성이 적용되어 있다고 가정해보자.
width: 100px;
transform: scale(0.5);

이 경우, offsetWidth는 100을 리턴하지만, getBoundingClientRect()는 50을 리턴한다.  
offsetWidth 뿐 아니라, 위에서 언급한, clientWidth, scrollWidth 모두 tranform에 의해 변경된 값은 적용되지 않는다.  
따라서, `최종 렌더링된 값을 가져오고 싶다면, offsetWidth 대신 getBoundingClientRect()를 사용하는 것이 좋다.`

---

# 미디어쿼리

```javascript
window.matchMedia;

window.matchMedia('(min-width: 760px)').matches; // true or false
```

---

# sticky

```javascript
const navbar = document.querySelector('.navbar');
let sticky = navbar.offsetTop;
const navbarScroll = () => {
  if (window.pageYOffset >= sticky) {
    navbar.classList.add('sticky');
  } else {
    navbar.classList.remove('sticky');
  }
};

window.onscroll = navbarScroll;
```

```javascript
const stickyElm = document.querySelector('header');

const observer = new IntersectionObserver(([e]) => e.target.classList.toggle('isSticky', e.intersectionRatio < 1), {
  threshold: [1],
});

observer.observe(stickyElm);
```

# 특정 element 화면 노출영역 위치여부

```javascript
function isInViewport(element) {
  const viewportHeight = document.documentElement.clientHeight;
  const viewportWidth = document.documentElement.clientWidth;
  const rect = element.getBoundingClientRect();

  if (!rect.width || !rect.height) {
    return false;
  }

  let top = rect.top >= 0 && rect.top < viewportHeight;
  let bottom = rect.bottom >= 0 && rect.bottom < viewportHeight;
  let left = rect.left >= 0 && rect.left < viewportWidth;
  let right = rect.right >= 0 && rect.right < viewportWidth;

  return (top || bottom) && (left || right);
}
```
