# @supports

https://developer.mozilla.org/ko/docs/Web/CSS/@supports

@supports (조건) { 적용할 css내용 } 을 입력

```css
@supports (display: flex) {
  .contents {
    display: flex;
    margin: 0 5px;
    align-items: center;
    justify-content: space-between;
  }
  .contents div {
    flex-grow: 1;
  }
}

@supports not (display: flex) {
  .contents {
    overflow: hidden;
  }
  .contents div {
    float: left;
    margin: 0 5px;
  }
}
```

직계 자손 셀렉터 지원하는 경우 스타일 적용 예

```css
@supports selector(A > B) {
  .contents > .box {
    background: #000;
  }
}
```
