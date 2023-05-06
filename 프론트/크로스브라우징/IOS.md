# 참고

https://bangj.tistory.com/154
https://virz.net/710-2/
https://velog.io/@restarea/ios-safari-css-%EC%A0%81%EC%9A%A9

https://channel.io/ko/blog/cross_browsing_ios15

---

# 사파리 버전 13.4 이상부터 replaceAll() 지원

# 사파리(Safari) Date 에러 (Invalid Date)

```javascript
// 아래와 같이 String 포맷을 Date에 넣었을 경우 에러 발생
new Date('2021-11-15T01:00:00+0900');
new Date('2022-03-25T02:00:59.999+0900');

// 아래와 같이 해줘야 한다.
new Date('2021-11-15T01:00:00+09:00');
new Date('2022-03-25T02:00:59.999+09:00');
```

# ios body 스크롤 막는 방법

https://im-developer.tistory.com/201

UI에서 대부분 모달(팝업이라고도 부른다)이 뜨면  
모달 뒤에 body 영역을 반투명한 검정색 레이어로 덮어서 모달의 컨텐츠가 더 도드라지게 만든다.  
이 반투명한 검정색 영역을 주로 Dim 영역이라고 부른다.

보통 팝업창 내에 컨텐츠가 길어서 스크롤이 있는 경우에는  
팝업 내부에만 스크롤이 잘 되게 하기 위해서 Dim 영역 뒤에 있는 body의 scroll은 막는 경우가 많다.

```javascript
export const withScrollLock = <P extends {}>(
  Feature: React.FC<P>,
): React.FC<P> => (props: P) => {
    const body = document.querySelector('body') as HTMLElement;
    const scrollPosition = window.pageYOffset;

    useEffect(() => {
      body.style.overflow = 'hidden'; // 일반적으로 많이 사용되는 방식이나 IOS에서 해결안됨
      body.style.pointerEvents = 'none';
      body.style.position = 'fixed';
      body.style.top = `-${scrollPosition}px`;
      body.style.left = '0';
      body.style.right= '0';

      return () => {
        body.style.removeProperty('overflow');
        body.style.removeProperty('pointer-events');
        body.style.removeProperty('position');
        body.style.removeProperty('top');
        body.style.removeProperty('left');
        body.style.removeProperty('right');

        window.scrollTo(0, scrollPosition);
      };
    }, []);

    return <Feature { ...props } />;
  };
```

# ios 스크롤 영역 지정

스크롤이 부드럽지 못하고 뚝뚝 끊기는 느낌

```css
.box {
  overflow: hidden;
  overflow-y: hidden;
  overflow-x: scroll;
  -webkit-overflow-scrolling: touch;
}
.box .inbox {
  width: auto;
}
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

# visualViewport의 resize이벤트

https://channel.io/ko/blog/cross_browsing_ios15

```javascript
let prevVisualViewport = 0;

function handleVisualViewportResize() {
  const currentVisualViewport = window.visualViewport.height;

  if (prevVisualViewport - 30 > currentVisualViewport && prevVisualViewport - 100 < currentVisualViewport) {
    const scrollHeight = window.document.scrollingElement.scrollHeight;
    const scrollTop = scrollHeight - window.visualViewport.height;

    window.scrollTo(0, scrollTop); // 입력창이 키보드에 가려지지 않도록 조절
  }

  prevVisualViewport = window.visualViewport.height;
}

window.visualViewport.onresize = handleVisualViewportResize;
```

window.visualViewport의 onresize에 handler를 등록하면 visualViewport가 변경될 때마다 handler가 호출됩니다. 이 handler안에서 입력창이 키보드에 가려지지 않도록 처리했습니다.

# Safari inline-flex

https://stackoverflow.com/questions/21772825/display-inline-flex-property-not-working-in-safari-browser

```

display: -webkit-inline-flex;
display: -ms-inline-flexbox;
display: inline-flex;

```

# Safari visibility 버그

https://developer.apple.com/forums/thread/71979
https://bugs.webkit.org/show_bug.cgi?id=45399
-webkit-line-clamp and visibility hidden issue

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
document.documentElement.style.setProperty('--vh', `${vh}px`);
```

```css
.my-element {
  height: 100vh; /* Fallback for browsers that do not support Custom Properties */
  height: calc(var(--vh, 1vh) * 100);
}
```

# 플렉스 레이아웃 이슈

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

# 상태바 컬러 제어

https://useyourloaf.com/blog/safari-15-theme-color/

# -webkit-overflow-scrolling 문제

사파리에서 레이어 팝업을 띄웠을 때,  
레이어 내부 스크롤 영역에 -webkit-overflow-scrolling: touch; 설정할 경우, 해당 overflow scroll 발생시 스크롤이 작동한다.  
그러나 해당 레이어의 overflow scroll 영역외 터치 후 다시 스크롤 -webkit-overflow-scrolling 영역을 터치할 경우 스크롤이 정상적으로 작동하지 않을 수 있다.  
(스크롤 최하단이나 최상단에서 레이어 스크롤 영역이 아닌 부분을 터치했을 때 더욱 자주 발생)

이 경우, 레이어 팝업 전체 영역을 overflow-y: auto; height: 100%; -webkit-overflow-scrolling: touch; 를 설정하여, 레이어 전체영역에 대해 터치 스크롤영역으로 잡아주는 것이 안정적이다. 또한, body 부분은 fixed로 설정해 터치 스크롤에 따라 body영역이 움직이지 않도록 잡아줘야 한다.

# getBoundingClientRect 문제

하위 UI웹뷰 또는 일부 사파리에서 스크롤에 따른 element.getBoundingClientRect(); 값을 구할 때, 실제 화면상에 보이는 것과 다른 위치값을 가져올 수 있다.

offsetLeft/offsetTop, offsetWidth/offsetHeight, offsetParent
패딩과 보더 포함 (일반적으로 element 크기 등을 구할 떄 사용)

offsetWidth/offsetHeight -> display: none 되어 있는 것에 주의! (visibility: hidden 경우는 값 반환가능)

# iOS UIWebView와 WKWebView의 차이에 따른 성능이슈

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

# safari target="\_blank" 문제

https://medium.com/sedeo/how-to-fix-target-blank-a-security-and-performance-issue-in-web-pages-2118eba1ce2f

```html
<a href=”https://sedeo.net” target=”_blank” rel=”noopener noreferrer”>이동</a>
```

https://developer.apple.com/documentation/safari_release_notes/safari_12_1_release_notes#3130296
Updated the link behavior for "target=\_blank" to include rel="noopener" implicitly.
a 태그에 target 속성이 \_blank면 암묵적으로 rel 속성을 noopener 로 세팅한다. (보안패치)  
rel 속성이 noopener면, 자식 창에서 window.opener를 참조하면 null 이 리턴된다.  
해결을 위해선 주소 검색 팝업을 여는 부모 페이지 a 태그에 rel="opener"를 추가한다.

```html
<!-- 수정 전 -->
<a href="/search_address.html" target="_blank">주소 검색</a>
<!-- 수정 후 -->
<a href="/search_address.html" target="_blank" rel="opener noreferrer">주소 검색</a>
```

rel 속성값 참고  
https://developer.mozilla.org/en-US/docs/Web/HTML/Link_types

# IOS 15 대응 - 주소창 하단 이동

https://channel.io/ko/blog/cross_browsing_ios15

# Safari CSS transition 관련 문제

https://kimbiyam.me/posts/front-end/safari-css-transition-problem  
https://milooy.wordpress.com/2015/09/09/css-transition-flickering-error-in-safari/

safari transition bug 혹은 safari transition flicker 등으로 검색

> -webkit-backface-visibility 속성을 hidden 으로 설정
> -webkit-transform 속성을 translate3d(0, 0, 0) 으로 설정(강제로 하드웨어 가속을 사용)
> will-change 속성을 지정
> all 형태(transition: .8s;)가 아니라 명확하게 지정(transition: transform .8s, opacity .8s, top .8s;)

## transition 으로 열리는 레이어(div) 내부 overflow scroll 영역에서, 일부 이미지 미노출 현상도 동일문제

- backface-visibility 추가  
  요소의 뒷쪽에서 앞면이 보이게 할지 정하는 속성입니다.

- 가상요소 제거  
  :after : before 요소 제거

- transform: translate3d(0, 0, 0); 추가  
  translate3d(tx, ty, tz)는 x y z 축 속성을 줄 수 있고 z축에 1px 추가 값을 줬습니다.
  예시 : transform: translate3d(0, 0, 1px);
