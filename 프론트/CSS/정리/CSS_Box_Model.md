# CSS의 각 태그의 영역은 박스모델(Box Model)로 구성됩니다.

https://web.dev/learn/css/box-model?hl=ko

content : 글씨가 삽입되는 영역
border : 테두리 영역
padding : content와 border 사이
margin : border와 다른 태그 영역 사이

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
        margin: 20px;
        padding: 20px;
        border: 20px solid #dddddd;
        width: 500px;

        content-box 콘텐트 영역이 500px이고 테두리를 포함한 크기는 580px 
        */
        box-sizing: content-box;
      }
      .bb {
        /* 
        margin: 20px;
        padding: 20px;
        border: 20px solid #dddddd;
        width: 500px;

        border-box 테두리를 포함한 크기가 500px 이고, 콘텐트 영역의 크기는 420px 
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

# box-sizing: border-box 기본 적용

이 CSS 규칙은 문서와 모든 ::before 및 ::after 의사 요소에서 모든 요소를 선택하고 box-sizing: border-box를 적용합니다.

```css
*,
*::before,
*::after {
  box-sizing: border-box;
}
```
