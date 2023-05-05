# overflow-wrap

오버플로우가 일어날 때 단어 내 줄바꿈 처리

```html
<div class="example-container">
  <div style="width: 200px; border: 1px solid black; word-break: keep-all; overflow-wrap: break-word;">
    굉장히길고엄청나게길면서굉장히길고엄청나게길면서굉장히길고엄청나게길면서굉장히길고엄청나게길면서의미는없는문자열
  </div>
</div>
```

```css
overflow-wrap: normal; /* 기본 */
overflow-wrap: break-word; /* 오버플로우가 일어나면 단어를 쪼개서 줄바꿈 */
```

---

# list-style-position

리스트 마커 위치 지정  
리스트 아이템 앞에 따라오는 리스트 마커는 기본적으로 li 태그 바깥에 위치한다.  
list-style-position 속성의 값으로 inside를 줘서 마커가 li 태그 안로 들어오도록 설정할 수 있다.

```html
<ul style="padding-left: 20px; list-style-position: inside;">
  <li>1</li>
  <li>2</li>
  <li>3</li>
</ul>
```

```css
list-style-position: inside; /* 마커가 `li` 태그 안에 위치 */
list-style-position: outside; /* 마커가 `li` 태그 바깥에 위치 */
```

---

# shape-outside

`완성된 웹사이트로 배우는 HTML & CSS 웹 디자인` 책 내용중

텍스트를 원형 이미지에 맞춰 배치하기

```html
<!DOCTYPE html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <title>HTML Live Test</title>
    <link rel="stylesheet" href="../reset.css" />
    <link rel="stylesheet" href="../common.css" />
    <style>
      /* 제목에 형광펜을 칠한 효과 넣기 */
      #text h2 {
        font-size: 2rem;
        font-family: sans-serif;
        font-weight: bold;
        display: inline-block;
        /* CSS 그라데이션 기능을 사용 */
        background-image: linear-gradient(transparent 50%, #ff6 50%);
        /* padding-bottom 을 추가하면 글자 베이스라인보다 조금 아래에 선을 그릴 수 있습니다. */
        padding-bottom: 0.25rem;
      }

      #text .clip-path {
        clip-path: circle(50%);
        shape-outside: circle(50%);
        float: left;
      }
    </style>
  </head>
  <body>
    <div id="text">
      <h2>text</h2>
      <img class="clip-path" src="http://resrc.devdic.com/img/bysize/below_200/01.png" />
      <p>
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
        standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make
        a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting,
        remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing
        Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions
        of Lorem Ipsum.
      </p>
    </div>
  </body>
</html>
```
