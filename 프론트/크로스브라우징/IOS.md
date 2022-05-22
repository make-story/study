# 사파리 버전 13.4 이상부터 replaceAll() 지원


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
 
.something_content{
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


# 노치 제어 (하단바)
https://wit.nts-corp.com/2019/10/24/5731  

