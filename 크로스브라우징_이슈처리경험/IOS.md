# 참고

https://bangj.tistory.com/154
https://virz.net/710-2/
https://velog.io/@restarea/ios-safari-css-%EC%A0%81%EC%9A%A9

https://channel.io/ko/blog/cross_browsing_ios15

---

#

"스키마 대신 Firebase DynamicLink를 사용하여 웹에서 앱 호출 및 앱스토어로 연결하게끔 만들어주어 해당 문제를 해결하였다."
"앱스토어 주소 대신 "itms-apps://itunes.apple.com/app/" 뒤에다 해당 앱의 앱스토어 Apple ID를 넣어서 해결하였다."

---

# 사파리 버전 13.4 이상부터 replaceAll() 지원

# 사파리가 SVG를 처리하는데 있어서 부분적으로 완벽하지 않음

https://stackoverflow.com/questions/27245673/svg-image-element-not-displaying-in-safari

```html
<object type="image/svg+xml" data="assets/images/icon/summary.svg">
  <img src="assets/images/icon/summary.svg" alt="Summary Icon" />
</object>
```

이를 해결하기 위해서는 object 또는 iframe을 사용하면 됨

참고 :  
object 태그는 click 이벤트가 무시되는 문제  
별도의 div 태그를 추가하여 object 에서 보여주는 이미지 크기와 위치를 동일하게 만들어서 object 태그보다 높은 레이어로 배치  
해당 div 태그에 click 이벤트를 추가하여 본 문제를 해결

# 사파리(Safari) Date 에러 (Invalid Date)

```javascript
// 아래와 같이 String 포맷을 Date에 넣었을 경우 에러 발생
new Date("2021-11-15T01:00:00+0900");
new Date("2022-03-25T02:00:59.999+0900");

// 아래와 같이 해줘야 한다.
new Date("2021-11-15T01:00:00+09:00");
new Date("2022-03-25T02:00:59.999+09:00");
```

# safearea, Safe Area, 노치 제어 (하단바)

https://wit.nts-corp.com/2019/10/24/5731

safe-area-inset-top이 노치, bottom이 하단영역입니다.
padding과 calc 속성을 잘 섞어서 사용하는게 좋을듯합니다.

```css
/*
// iOS 10
constant(safe-area-inset-top)
constant(safe-area-inset-right)
constant(safe-area-inset-bottom)
constant(safe-area-inset-left)
// iOS 11 이상
env(safe-area-inset-top)
env(safe-area-inset-right)
env(safe-area-inset-bottom)
env(safe-area-inset-left)
*/
.button {
  padding-bottom: calc(constant(safe-area-inset-bottom) + 10px);
  padding-bottom: calc(env(safe-area-inset-bottom) + 10px);
}
```

# 상태바 컬러 제어

https://useyourloaf.com/blog/safari-15-theme-color/

# Safari visibility 버그

`-webkit-line-clamp and visibility hidden issue`

https://developer.apple.com/forums/thread/71979
https://bugs.webkit.org/show_bug.cgi?id=45399

# background-size

일부 사파리에서 background-image 로 svg 설정하고, background-size 100% 했을 때 노출안되는 경우 발생
width, height = 아이콘과 동일한 사이즈 적용
background-size = cover (width, height 영역에 이미지가 가득차게 나오는 설정)

```css
.brandRoom .brandBanner .utilArea .btnArea .btnIr.share:after {
  background-image: url(//stg-apcp-fe-web.amoremall.com/public/apcp-css/1.8.4-stg1/images/icon_action_share.svg?31a4c7b410be88d8f54d482b3fb230a0=);
  width: 28px;
  height: 28px;
  /*background-size: 28px 28px;*/
  background-size: cover;
}
```

# 100vh 문제

https://zinee-world.tistory.com/599  
https://css-tricks.com/the-trick-to-viewport-units-on-mobile/

```javascript
// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
let vh = window.innerHeight * 0.01;
// Then we set the value in the --vh custom property to the root of the document
document.documentElement.style.setProperty("--vh", `${vh}px`);
```

```css
.my-element {
  height: 100vh; /* Fallback for browsers that do not support Custom Properties */
  height: calc(var(--vh, 1vh) * 100);
}
```

# getBoundingClientRect 문제

하위 UI웹뷰 또는 일부 사파리에서 스크롤에 따른 element.getBoundingClientRect(); 값을 구할 때, 실제 화면상에 보이는 것과 다른 위치값을 가져올 수 있다.

offsetLeft/offsetTop, offsetWidth/offsetHeight, offsetParent
패딩과 보더 포함 (일반적으로 element 크기 등을 구할 떄 사용)

offsetWidth/offsetHeight -> display: none 되어 있는 것에 주의! (visibility: hidden 경우는 값 반환가능)

# safari target="\_blank" 문제

https://medium.com/sedeo/how-to-fix-target-blank-a-security-and-performance-issue-in-web-pages-2118eba1ce2f

```html
<a href=”https://sedeo.net” target=”_blank” rel=”noopener noreferrer”>이동</a>
```

https://developer.apple.com/documentation/safari_release_notes/safari_12_1_release_notes#3130296
Updated the link behavior for "target=\_blank" to include rel="noopener" implicitly.

a 태그에 target 속성이 \_blank면 암묵적으로 rel 속성을 noopener 로 세팅한다. (보안패치)  
rel 속성이 noopener면, 자식 창에서 window.opener를 참조하면 null 이 리턴된다.

`해결을 위해선 주소 검색 팝업을 여는 부모 페이지 a 태그에 rel="opener"를 추가`한다.

```html
<!-- 수정 전 -->
<a href="/search_address.html" target="_blank">주소 검색</a>
<!-- 수정 후 -->
<a href="/search_address.html" target="_blank" rel="opener noreferrer"
  >주소 검색</a
>
```

rel 속성값 참고  
https://developer.mozilla.org/en-US/docs/Web/HTML/Link_types

---

# 레이아웃 (layout)

## Safari inline-flex

`'display: inline-flex' property not working in safari browser`

https://stackoverflow.com/questions/21772825/display-inline-flex-property-not-working-in-safari-browser

```

display: -webkit-inline-flex;
display: -ms-inline-flexbox;
display: inline-flex;

```

## 플렉스 레이아웃 이슈

https://blog.woolta.com/categories/9/posts/149  
https://sunyrora.github.io/iphone-flex/

```html
<div class="dynamic_area">
  <div class="something_content">
    <p>컨텐츠 동적 영역</p>
  </div>
</div>
```

```css
.dynamic_area {
  flex: 1 0 auto;
  /*safari bug*/
  height: 0;
}

.something_content {
  height: 100%;
  background-color: #7f828b;
}
```

---

# iOS UIWebView 와 WKWebView 의 차이에 따른 성능이슈

(UIWebView 에서 앱 종료 현상)  
https://docs.kioskproapp.com/article/840-wkwebview-supported-features-known-issues

WKWebView는 UIWebView와 비교하여 더 높고 효율적인 성능을 제공  
WKWebView는 약 8500 개의 개체를 렌더링하지만 UIWebView는 약 3500 개의 개체를 렌더링하며 WKWebView의 성능은 UIWebView와 비교하여 두 배  
WKWebView는 25% CPU를 사용하여 같은 수의 입자(particles)를 렌더링하지만 UIWebView는 동일한 작업에 대해 90% CPU를 사용  
WKWebView는 프로세스를 벗어나 실행됩니다. 즉, 메모리가 앱과 별도로 스레드됨을 의미합니다. 할당량을 초과하면 앱을 중단하지 않고 충돌합니다 (이로 인해 앱이 알림을 받고 페이지를 다시로드하려고 시도 함).

대조적으로, UIWebView는 프로세스 내에서 실행됩니다. 즉, 사용하는 메모리가 앱 사용공간(footprint)의 일부로 간주되며, iOS에서 할당하려는 값을 초과하면 앱 자체가 운영 체제에 의해 손상됩니다. (앱종료)

WKWebView - 더 빠른 자바 스크립트 엔진인 Nitro 사용  
WKWebView - JavaScript를 비동기 적으로 처리 : JavaScript와 네이티브 코드 간의 통신은 WKWebView에서 비동기 적으로 처리됩니다. 즉, 일반적으로 더 빠르게 실행

화면에 보이지 않는 상품 숨김처리  
IntersectionObserver, visibility(hidden/visible) 활용

GPU를 활용하지 못하는 환경에서 애니메이션 최소화 (CPU 사용 최소화)

---

# IOS 15 대응

https://channel.io/ko/blog/cross_browsing_ios15

## visualViewport 의 resize 이벤트

https://channel.io/ko/blog/cross_browsing_ios15

키보드 변경시 입력창이 가려지는 문제

```javascript
let prevVisualViewport = 0;

function handleVisualViewportResize() {
  const currentVisualViewport = window.visualViewport.height;

  if (
    prevVisualViewport - 30 > currentVisualViewport &&
    prevVisualViewport - 100 < currentVisualViewport
  ) {
    const scrollHeight = window.document.scrollingElement.scrollHeight;
    const scrollTop = scrollHeight - window.visualViewport.height;

    window.scrollTo(0, scrollTop); // 입력창이 키보드에 가려지지 않도록 조절
  }

  prevVisualViewport = window.visualViewport.height;
}

window.visualViewport.onresize = handleVisualViewportResize;
```

window.visualViewport의 onresize에 handler를 등록하면 visualViewport가 변경될 때마다 handler가 호출됩니다. 이 handler안에서 입력창이 키보드에 가려지지 않도록 처리했습니다.

## document가 키보드 뒤쪽으로 스크롤 되는 문제

```html
<div id="wrapper">
  <div id="content">...</div>
  <div id="make-scrollable"></div>
</div>

<style>
  #wrapper {
    position: relative;
    width: 100%;
    height: 200px;
    overflow-y: auto;
  }

  #content {
    width: 100%;
    height: auto;
  }

  #make-scrollable {
    position: absolute;
    left: 0;
    width: 1px;
    height: calc(
      100% + 1px
    ); /* height를 100%보다 1px높게 잡아 실제로 scroll이 되도록 만듭니다. */
  }
</style>
```

## 주소창 하단 이동

https://channel.io/ko/blog/cross_browsing_ios15

---

# 아이폰 하단바 - Safe areas

Safe areas 까지 화면 켄텐츠 노출영역으로 잡을 수 있는 방법

https://web.dev/learn/pwa/app-design/#safe-areas

아이폰 X의 경우 하단 검은 길다란 바와 겹치는 issue가 생길 수 있음  
상하단에 생기는 브라우저 버튼들에 가려지는 상황도 생길 수 있는데 이를 대응하는 방법

```html
<meta name="viewport" content="viewport-fit=cover" />
<style>
  .floating-button {
    padding-top: env(safe-area-inset-bottom);
  }
</style>
```

env(safe-area-inset-bottom); // IOS 11.0 이상 (신)  
constant(safe-area-inset-bottom); // IOS 11.0 버전 (구)

padding-bottom: calc(env(safe-area-inset-bottom) - 5px);  
padding-bottom: calc(constant(safe-area-inset-button) - 5px);

https://github.com/ionic-team/cordova-plugin-ionic-webview/issues/49  
https://webkit.org/blog/7929/designing-websites-for-iphone-x/
