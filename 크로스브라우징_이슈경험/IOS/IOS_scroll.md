# IOS 스크롤(scroll) 관련

## ios 스크롤 영역 지정

웹 페이지 내 overflow: scroll 속성을 적용한 스크롤 컴포넌트에 부드러운 스크롤을 적용하려면  
-webkit-overflow-scrolling: touch 라고 CSS를 적용

`2019년 9월 출시된 iOS 13, iPasOS 13부터, 해당 CSS 없이도 부드러운 스크롤 가능해짐!`
https://mytory.net/archives/15221

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

## ios body 스크롤 막는 방법

https://im-developer.tistory.com/201

UI에서 대부분 모달(팝업이라고도 부른다)이 뜨면  
모달 뒤에 body 영역을 반투명한 검정색 레이어로 덮어서 모달의 컨텐츠가 더 도드라지게 만든다.  
이 반투명한 검정색 영역을 주로 Dim 영역이라고 부른다.

보통 팝업창 내에 컨텐츠가 길어서 스크롤이 있는 경우에는  
팝업 내부에만 스크롤이 잘 되게 하기 위해서 Dim 영역 뒤에 있는 body의 scroll은 막는 경우가 많다.

### 1. body 태그, overflow: hidden;

```css
body::-webkit-scrollbar {
  display: none;
}
body {
  overflow-x: hidden;
  overflow-y: hidden;
  -ms-overflow-style: none;
}
```

또는 HOC

```javascript
// 스크롤 lock HOC
export const withScrollLock = <P extends {}>(
  Feature: React.FC<P>,
): React.FC<P> => (props: P) => {
    const body = document.querySelector('body') as HTMLElement;

    useEffect(() => {
      body.style.overflow = 'hidden';

      return () => {
        body.style.removeProperty('overflow');
      };
    }, []);

    return <Feature { ...props } />;
  };
```

```javascript
// 사용 예
import { withScrollLock } from "@/helpers";

const Modal = () => {
  // ...
};

export default withScrollLock(Modal);
```

### 2. pointer-events: none;

```css
body {
  overflow: hidden;
  pointer-events: none;
}
```

### 3. touchmove eventListener

touchmove 이벤트 리스너를 달아서 e.preventDefault();로 기본 터치 동작을 막아버리는 것

```javascript
export const withScrollLock = <P extends {}>(
  Feature: React.FC<P>,
): React.FC<P> => (props: P) => {
    const body = document.querySelector('body') as HTMLElement;
    const lockScroll = e => e.preventDefault();

    useEffect(() => {
      body.addEventListener('touchmove', lockScroll, { passive: false });
      body.style.overflow = 'hidden';

      return () => {
        body.removeEventListener('touchmove', lockScroll, { passive: false });
        body.style.removeProperty('overflow');
      };
    }, []);

    return <Feature { ...props } />;
  };
```

### 4. 'body-scroll-lock' NPM 패키지 활용

### 5. position: fixed;

이 방식은  
body 태그에 position: fixed를 걸기 때문에  
사용자가 body 스크롤을 어느 정도 내린 상태에서 모달 창을 켰을 때  
body 스크롤이 맨 위로 가버린다는 문제

이 방법을 해결하기 위해 window.pageYOffset 속성을 이용해서  
모달 창이 화면에 보여진 시점의 스크롤 위치를 기억해두고,  
top 속성에 음수 값으로 적용  
그리고 모달 창이 꺼졌을 때에도 여전히 그 위치에 스크롤이 된 상태여야 하기 때문에  
window.scrollTo() 메소드를 이용해 스크롤 위치를 이동

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

## -webkit-overflow-scrolling 문제

사파리에서 레이어 팝업을 띄웠을 때,  
레이어 내부 스크롤 영역에 -webkit-overflow-scrolling: touch; 설정할 경우,  
해당 overflow scroll 발생시 스크롤이 작동한다.

그러나 해당 레이어의 overflow scroll 영역외 터치 후 다시 스크롤 -webkit-overflow-scrolling 영역을 터치할 경우  
스크롤이 정상적으로 작동하지 않을 수 있다.  
(스크롤 최하단이나 최상단에서 레이어 스크롤 영역이 아닌 부분을 터치했을 때 더욱 자주 발생)

이 경우, 레이어 팝업 전체 영역을 overflow-y: auto; height: 100%; -webkit-overflow-scrolling: touch; 를 설정하여,  
레이어 전체영역에 대해 터치 스크롤영역으로 잡아주는 것이 안정적이다.  
또한, body 부분은 fixed로 설정해 터치 스크롤에 따라 body영역이 움직이지 않도록 잡아줘야 한다.

## iOS Safari browser bounce effect 제거

스크롤을 최상단, 최하단 했을 때, 컨텐츠 보다 그 이상, 그 이하로 좀 더 스크롤 되었다가,
시작과 끝으로 이동하는 현상

https://github.com/lazd/iNoBounce/

https://greensock.com/forums/topic/35468-scrolltrigger-breaks-when-stop-ios-safari-from-resizing-the-window-on-scroll-fix-is-applied/

```css
body,
html {
  height: 100vh;
  width: 100vw;
  overscroll-behavior: none;
  overflow: hidden !important;
}
#viewport {
  position: fixed;
  overflow-x: hidden;
  overflow-y: scroll;
  height: 100vh;
  width: 100vw;
  -webkit-overscroll-behavior: none;
  overscroll-behavior: none;
  -webkit-overflow-scrolling: touch;
}
```
