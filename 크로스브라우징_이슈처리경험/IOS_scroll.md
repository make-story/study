# IOS 스크롤(scroll) 관련

## ios 스크롤 영역 지정

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

## ios body 스크롤 막는 방법

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
