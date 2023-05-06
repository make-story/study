# text-transform

텍스트를 대소 문자 또는 전각 문자로 변환한다.

# text-indent

들여쓰기와 내어쓰기는 text-indent 속성으로 만듭니다.  
값이 양수이면 들여쓰기, 값이 음수이면 내어쓰기가 됩니다.

`웹접근성을 위한 화면 미노출 문구에 활용 가능`

```css
.screen-reader {
  position: absolute;
  /*left: -5000px;*/
  overflow: hidden;
  top: 0;
  left: 0;
  width: 0;
  height: 0;
  font-size: 0;
  line-height: 0;
  text-indent: -9999px;
}
```

---

# line-height

https://mygumi.tistory.com/366

line-height 속성은 line-box 의 높이를 지정한다.  
주로 텍스트간의 줄 간격을 조절할 때 사용한다.

---

# letter-spacing

글자 사이의 간격

# word-spacing

단어 사이의 간격

---

# white-space

공백문자를 어떻게 할 것인지 설정 (띄어쓰기나 줄바꿈, 탭으로 인한 공백 부분 등등)

white-space 속성이 normal (기본값)로 설정된 요소 안에서는  
연속된 띄어쓰기, 들여쓰기 그리고 줄바꿈 문자가 모두 무시  
뿐만 아니라 normal 속성값은 텍스트가 너무 길어서 부모 요소의 가로폭을 넘어갈 때는 자동으로 줄바꿈

- `텍스트가 길어서 부모 요소 안의 가로폭을 넘어가더라도 자동으로 줄바꿈이 일어나게 하고 싶지 않은 경우 white-space 속성을 nowrap 으로 설정`
- `텍스트에 포함된 연속된 띄어쓰기, 들여쓰기, 줄바꿈과 같은 공백 문자들이 HTML 문서 안에 붙여넣은 그대로 나타나게 하고 싶다면 white-space 속성을 pre 로 설정`
- pre-wrap 속성값은 pre 속성값과 동일하게 연속된 띄어쓰기와 들여쓰기, 줄바꿈을 있는 그대로 보존해주는데요. 유일한 차이점은 텍스트 안에 긴 행이 있을 때 해당 행에서 자동으로 줄바꿈
- pre-line 속성값은 말 그대로 라인(line), 즉 줄바꿈 문자만 있는 그대로 처리해주고 연속된 띄어쓰기와 들여쓰기는 무시하고 모두 띄어쓰기 한 번으로 처리

# word-break, word-wrap

텍스트가 들어가는 블록요소의 가로 사이즈에 맞춰 줄바꿈 설정 (강제줄바꿈 방지, 텍스트 길이제한)

https://wit.nts-corp.com/2017/07/25/4675  
https://ahribori.com/article/5a0994626c9eef13d882e379

- word-break : 아래 예제와 같이 단어의 분리를 어떻게 할 것인지 결정한다.
  (공백/띄어쓰기) 날씨가·좋아요  
  (음절) 날·씨·가·좋·아·요·
  `word-break 속성은 단어의 분리를 결정하여 줄 바꿈에 관여`

- word-wrap : 박스의 가로 영역을 넘친 단어 내에서 임의의 분리 여부를 결정한다.  
  단어의 길이가 길어서 영역을 벗어난 텍스트의 처리 방법을 정의 apple, banana 등은 단어의 길이가 짧지만 asdkfjaklsdjfklasdjfklasjdfkljasdlfjsadlfdsaklfjfklsadjf 같은 단어는 길이가 매우 길다.  
  `word-wrap 속성은 박스의 가로 영역을 넘친 단어 내에서 임의의 분리 여부를 결정하여 줄바꿈에 관여`

# overflow-wrap ( = word-wrap)

https://developer.mozilla.org/ko/docs/Web/CSS/overflow-wrap

overflow-wrap 속성은 인라인(inline) 요소에 적용되며,  
텍스트가 박스 요소를 넘치지 않도록 문자열 내에 줄바꿈을 삽입해야 하는지의 여부를 설정한다.

다시 말해, 공백이 없는 긴 문자열이 텍스트박스를 넘어갈 경우, 그냥 넘어가게 둘 것인지, 아니면 해당 문자열을 자르고 줄바꿈을 할 것인지 결정한다.

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

# text-overflow

요소에서 삐져나간(자동줄바꿈이 되지 않은) 텍스트의 처리 방법을 정의. 이 속성을 사용하려면 몇 가지 조건이 충족되어야 함.

- white-space: nowrap
  (자동줄바꿈이 되지 않은 텍스트에 대해서 정의하는 속성이기 때문에)
- width 가 지정되어야 함  
  (즉, display 속성은 block or inline-block 이어야 함)
- overflow 속성이 visible 말고 다른 속성으로 지정되어야 함  
  (hidden, scroll, auto, ...등등)

위의 조건들을 충족하면 text-overflow 속성이 적용된다.

- clip : 영역을 벗어난 텍스트를 표시하지 않음 (기본값)
- ellipsis : 영역을 벗어난 텍스트를 표시하지 않고 말줄임표(...)를 뒤에 표시한다

# 텍스트 한줄 말줄임

```html
<p class="title">단 3일 주말특가 - 데일리 피부관리의 완결템! 크림 특집!</p>
```

```css
.title {
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
```

# 텍스트 여러줄 말줄임

```css
.title {
  font-size: 12px;
  /*white-space: inherit;*/

  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 15px;
  max-height: 30px;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
```

---

# ol, ul 기본 공백

ol, ul 등은 기본적으로
`리스트의 위아래 16px 의 margin`,  
`리스트의 왼쪽 60px 의 padding` 을 갖는다.

- ol
  순서가 있는 목록

- ul
  순서가 없는 목록

- dl
  용어를 설명하는 목록

- li
  목룍을 나열할 때는 li (list item) 태그 사용

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

# 제목에 형광펜을 칠한 효과 넣기

`완성된 웹사이트로 배우는 HTML & CSS 웹 디자인` 책 내용중

```html
<!DOCTYPE html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <title>Test</title>
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
    </style>
  </head>
  <body>
    <div id="text">
      <h2>text</h2>
    </div>
  </body>
</html>
```

# 텍스트를 원형 이미지에 맞춰 배치하기

`완성된 웹사이트로 배우는 HTML & CSS 웹 디자인` 책 내용중

shape-outside

```html
<!DOCTYPE html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <title>Test</title>
    <style>
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
