# sticky 박스

https://tech.lezhin.com/2019/03/20/css-sticky

- sticky 박스는 top, right, bottom, left 속성이 필수입니다.
- fixed 박스는 뷰포트에 고정하지만 sticky 박스는 scroll 박스에 고정합니다. 즉, scroll 박스가 offset 기준입니다.
- 뷰포트와 scroll 박스가 동일한 것처럼 보이는 경우도 있겠지만 뷰포트는 하나뿐이고 scroll 박스는 문서 안에서 더 많이 생성할 수 있어요.
- sticky 박스를 scroll 박스에 고정하는 임계점은 스크롤 위치가 결정합니다. sticky 박스 자신과 부모의 위치와 크기도 임계점에 영향을 미칩니다.
- sticky 박스의 부모 박스가 scroll 박스를 벗어나면 sticky 박스는 다시 일반적인 흐름에 따릅니다.
- sticky 박스와 scroll 박스 사이에 overflow: hidden 속성을 적용한 박스가 끼어들면 sticky 박스는 일반적인 흐름에 따릅니다.

```html
<!DOCTYPE html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <title>position sticky</title>
    <style>
      header {
        position: fixed;
        width: 100%;
        height: 57px;
        background: gray;
        z-index: 999;
        top: 0;
        left: 0;
      }
      h1 {
        font-size: 24px;
      }
      main {
        display: flex;
        justify-content: space-between;
        height: 300vh;
        /* min-height: 100%;
    padding-bottom: 150px; */
      }
      .one {
        width: 60%;
        height: 100vh;
      }
      .one img {
        width: 100%;
        height: 100%;
        display: block;
      }
      .two {
        width: 40%;
        overflow: auto;
        position: -webkit-sticky;
        position: sticky;
        height: 100vh;
        top: 0;
        padding: 70px 0 0 12px;
        text-align: center;
      }

      footer {
        position: relative;
        font-size: 24px;
        height: 150px;
        background-color: wheat;
        /* transform: translateY(-100%);  */
      }
    </style>
  </head>
  <body>
    <header>
      <h1>header area</h1>
    </header>

    <main>
      <div class="one">
        <div style="width: 100px; height: 500px; border: 1px solid;">1</div>
        <div style="width: 100px; height: 500px; border: 1px solid;">2</div>
        <div style="width: 100px; height: 500px; border: 1px solid;">3</div>
      </div>

      <div class="two">
        <h2>position sticky</h2>
        <p>scrolling</p>
      </div>
    </main>

    <footer>
      <p>footer area</p>
    </footer>
  </body>
</html>
```

# position sticky 깨지는 이슈! sticky 사용 전 필수 상식

https://blog.pumpkin-raccoon.com/119

## 원인1: 부모 컴포넌트의 overflow

보통 이런 이슈의 원인은 대부분 sticky의 부모 컴포넌트 중 한 곳에, css를 잘못 설정하였기 때문입니다.  
sticky를 사용하기 위해서는 `sticky 상단의 부모 혹은 조상 컴포넌트에 overflow 속성을 사용하면 안됩니다`

## 원인2: 위치 미설정

사소한 실수이지만 위치값 (top, left, right, bottom)을 설정하지 않아서 에러가 발생하는 경우도 있습니다.  
sticky는 기준이 되는 위치를 설정하기 위해 네 가지 값 중에서 최소한 하나는 꼭 필요하니 기억해 주세요!
