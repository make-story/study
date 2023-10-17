`모르는 것`

CSS 코드 작성 기법  
https://mytory.net/archives/8982

# 웹사이트 제작 과정

완성된 웹사이트로 배우는 HTML & CSS 웹 디자인

1. 웹사이트 기획
2. 와이어 프레임 작성
   와이어 프레임은 어디에 어떤 컨텐츠가 들어가는가를 텍스트나 각 칸을 구분하는 간단한 선 및 박스로 작성한 웹사이트 설계도 입니다.
   예를 들어, 헤더 / 메인 비주얼(메인 배너 또는 슬라이드) / 컨텐츠(모듈 또는 컴포넌트) / 푸터
3. 디자인
4. 코드 작성

# 공통값

- inherit  
  프로퍼티 값을 부모 요소에서 강제로 상속합니다.  
  부모 요소에서 값을 복사한다고 생각해도 됩니다.

- initial  
  `프로퍼티 값을 관련 CSS 모듈에서 정의하는 초깃값으로 정합니다.`

또는

```css
& * {
  all: revert;
}
```

- unset
  inherit 와 initial 의 효과를 섞습니다.  
  color 처럼 상속되는 프로퍼티에서 unset 은 initial 와 같은 의미 입니다,  
  background-image 처럼 상속되지 않는 프로퍼티에서 unset 의 효과는 initial 과 같습니다.

# 자동 마진(예: margin-left: auto)을 사용한 배치

같은 줄에 있는 플렉스 아이템 중 하나만 다른 방식으로 배치하고 싶을 때가 있는데, 바로 자동 마진을 사용

`자동 마진을 사용하면 1개의 플랙스 아이템만 오른쪽 끝에 배치할 수 있습니다.`

```css
.cards {
  display: flex;
}
.cards li:last-child {
  margin-left: auto;
}
```
