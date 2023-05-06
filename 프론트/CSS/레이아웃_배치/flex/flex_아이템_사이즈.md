https://studiomeal.com/archives/197

# 유연하게 늘리기

flex-grow

```css
.item {
  flex-grow: 1;
  /* flex-grow: 0; */ /* 기본값 */
}

/* 1:2:1의 비율로 세팅할 경우 */
.item:nth-child(1) {
  flex-grow: 1;
}
.item:nth-child(2) {
  flex-grow: 2;
}
.item:nth-child(3) {
  flex-grow: 1;
}
```

# 유연하게 줄이기

flex-shrink

```css
.container {
  display: flex;
}
.item:nth-child(1) {
  /* flex-shrink: 0; 덕분에 컨테이너가 아무리 작아져도 첫번째 아이템은 찌그러지지 않고 폭이 100px로 유지된다. */
  flex-shrink: 0;
  width: 100px;
}
.item:nth-child(2) {
  flex-grow: 1;
}
```

# flex

flex-grow, flex-shrink, flex-basis를 한 번에 쓸 수 있는 축약형 속성입니다.

```css
.item {
  flex: 1;
  /* flex-grow: 1; flex-shrink: 1; flex-basis: 0%; */
  flex: 1 1 auto;
  /* flex-grow: 1; flex-shrink: 1; flex-basis: auto; */
  flex: 1 500px;
  /* flex-grow: 1; flex-shrink: 1; flex-basis: 500px; */
}
```
