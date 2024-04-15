# CSS Scroll Snap

https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Scroll_Snap

https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Scroll_Snap/Basic_concepts

```html
<!DOCTYPE html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <title>Test</title>
    <style>
      .container {
        overflow: auto;
        /* 
        부모 요소에서 scroll-snap-type 속성을 설정해서 어느 위치에서 스크롤할 것인지 축을 설정합니다. 
        항상 스크롤 스냅이 동작하도록 설정(mandatory)을 추가혀면 현재 표시되는 영역이나 다음 영역 등 어느 한 부분만이 표시됩니다. 
        */
        scroll-snap-type: y mandatory;
        height: 100vh;
      }
      .container section {
        width: 100vw;
        height: 100vh;
        /*
        부모 요소의 어느 위치에서 멈출지 결정(scroll-snap-align)
        영역 시작점(start) 입력하면 시작점에서 스크롤을 멈춥니다.
        */
        scroll-snap-align: start;
      }
      .container .hero {
        background-color: darkcyan;
      }
      .container .menu {
        background-color: darkolivegreen;
      }
      .container .content {
        /*
        부모 요소의 어느 위치에서 멈출지 결정(scroll-snap-align)
        영역 종료 지점(end) 입력하면 영역이 끝나는 지점에서 스크롤이 멈춥니다.
        */
        scroll-snap-align: end;
        background-color: maroon;
      }
    </style>
  </head>
  <body>
    <div id="scroll">
      <h2>scroll</h2>
      <div class="container">
        <section class="hero"></section>
        <section class="menu"></section>
        <section class="content"></section>
      </div>
    </div>
  </body>
</html>
```

## scroll-snap-type

https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-snap-type

## scroll-snap-stop

https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-snap-stop

## scroll-padding-top

https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-padding-top

## scroll-snap-align

https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-snap-align

---

# scroll-behavior

책갈피 위치 애니메이션 이동  
https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-behavior

```html
<nav>
  <a href="#page-1">1</a>
  <a href="#page-2">2</a>
  <a href="#page-3">3</a>
</nav>
<div class="scroll-container">
  <div class="scroll-page" id="page-1">1</div>
  <div class="scroll-page" id="page-2">2</div>
  <div class="scroll-page" id="page-3">3</div>
</div>
```

```css
a {
  display: inline-block;
  width: 50px;
  text-decoration: none;
}
nav,
.scroll-container {
  display: block;
  margin: 0 auto;
  text-align: center;
}
nav {
  width: 339px;
  padding: 5px;
  border: 1px solid black;
}
.scroll-container {
  width: 350px;
  height: 200px;
  overflow-y: scroll;
  scroll-behavior: smooth;
}
.scroll-page {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  font-size: 5em;
}
```
