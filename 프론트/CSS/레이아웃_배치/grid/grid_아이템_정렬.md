# `새로운 CSS 레이아웃` 책 내용 중

수평축 또는 수직축에 따라 `그리드 아이템을 정렬하고 싶다면 justify-items 속성을 사용`합니다.
이 속성은 `개별 그리드 아이템에 justify-self 를 설정하는 것과 같은 효과`를 보여줍니다.

그리드 레이아웃에서 justify-item 의 초기값은 stretch 이므로  
그리그 아이템은 기본적으로 할당된 영역의 크기를 꽉 채웁니다.  
이 값을 end 로 바꾸면 그리드 아이템은 각 자신의 영역의 끝  
다시 말해 LTR 언어에서라면 오른쪽으로 이동합니다.

```css
.cards {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(3, 100px);
  grid-template-areas:
    "a a a b"
    "a a a b"
    "c d d d";
  grid-gap: 20px;
  justify-items: end;
}
```

`개별 그리드 아이템의 justify-self 속성을 설정하면 justify-items 속성 각 그리드 아이템을 원하는 대로 정렬`할 수 있습니다.  
justify-self 속성에 사용할 수 있는 값은 justify-items 속성과 동일합니다.

```css
.cards {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(3, 100px);
  grid-template-areas:
    "a a a b"
    "a a a b"
    "c d d d";
  grid-gap: 20px;
  justify-items: end;
}

.cards li:nth-child(1) {
  grid-area: a;
}
.cards li:nth-child(2) {
  grid-area: b;
  justify-self: stretch;
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
