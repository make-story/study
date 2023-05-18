# IOS 애니메이션(animation, transition) 관련

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
