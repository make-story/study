`새로운 CSS 레이아웃` 책 내용 중

그리드 컨테이너에 align-items 속성을 추가하고 start 로 값을 설정하면  
모든 요소가 각각 자신의 영역 상단에 붙습니다.

```css
.cards {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(3, 100px);
  grid-template-areas:
    'a a a b'
    'a a a b'
    'c d d d';
  grid-gap: 20px;
  align-items: start;
}

.cards li:nth-child(1) {
  grid-area: a;
}
.cards li:nth-child(2) {
  grid-area: b;
}
.cards li:nth-child(3) {
  grid-area: c;
}
.cards li:nth-child(4) {
  grid-area: d;
}
.cards li:nth-child(5) {
  grid-area: e;
}
```

플렉스 박스와 마찬가지로 개별 요소에 align-self 속성을 사용하면  
align-items 속성을 덮어쓸 수 있습니다.

```css
.cards {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(3, 100px);
  grid-template-areas:
    'a a a b'
    'a a a b'
    'c d d d';
  grid-gap: 20px;
  align-items: start;
}

.cards li:nth-child(1) {
  grid-area: a;
}
.cards li:nth-child(2) {
  grid-area: b;
  align-self: stretch;
}
.cards li:nth-child(3) {
  grid-area: c;
  align-self: flex-end;
}
.cards li:nth-child(4) {
  grid-area: d;
  align-self: center;
}
.cards li:nth-child(5) {
  grid-area: e;
}
```
