`모르는 것`

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

- unset
  inherit 와 initial 의 효과를 섞습니다.  
  color 처럼 상속되는 프로퍼티에서 unset 은 initial 와 같은 의미 입니다,  
  background-image 처럼 상속되지 않는 프로퍼티에서 unset 의 효과는 initial 과 같습니다.

# line-height

https://mygumi.tistory.com/366

line-height 속성은 line-box 의 높이를 지정한다.  
주로 텍스트간의 줄 간격을 조절할 때 사용한다.

# letter-spacing

글자 사이의 간격

# word-spacing

단어 사이의 간격

# white-space

# word-break, word-wrap

https://wit.nts-corp.com/2017/07/25/4675

오버플로우 시 줄바꿈 옵션

# overflow-wrap

# box-sizing

```html
<!DOCTYPE html>
<html lang="ko">
  <head>
    <meta charset="utf-8" />
    <title>CSS</title>
    <style>
      body {
        margin: 0px;
      }
      div {
        margin: 20px;
        padding: 20px;
        border: 20px solid #dddddd;
        width: 500px;
      }
      .cb {
        /* 
        width: 500px; border: 20px solid #dddddd; 의 경우, 
        콘텐트 영역이 500px이고 테두리를 포함한 크기는 580px 
        */
        box-sizing: content-box;
      }
      .bb {
        /* 
        width: 500px; border: 20px solid #dddddd; 의 경우, 
        테두리를 포함한 크기가 500px 이고, 콘텐트 영역의 크기는 420px 
        */
        box-sizing: border-box;
      }
    </style>
  </head>
  <body>
    <div class="cb">
      <p>content-box</p>
    </div>
    <div class="bb">
      <p>border-box</p>
    </div>
  </body>
</html>
```

브라우저 전체 100%

```html
<style>
  .container1 {
    width: 300px;
    border: 5px solid black;
    background-color: white;
  }
  .container1 > div {
    padding: 20px;
    background-color: #ddd;
    margin-bottom: 20px;
    border: 3px solid #2e88b5;
  }
  .container1 .child1 {
    width: 100%; /* 문제! */
  }
  .container1 .child2 {
    width: 100%;
    box-sizing: border-box; /* 해결방법 1 */
  }
  .container1 .child3 {
    width: auto; /* 해결방법 2 */
  }
  .container1 .child4 {
    /* width의 기본 값: auto */
  }
</style>
<div class="container1">
  <div class="child1"></div>
  <div class="child2"></div>
  <div class="child3"></div>
  <div class="child4"></div>
</div>
```

# text-indent

들여쓰기와 내어쓰기는 text-indent 속성으로 만듭니다.  
값이 양수이면 들여쓰기, 값이 음수이면 내어쓰기가 됩니다.
