# 웹접근성용 본문 바로가기

```css
.skip {
  position: absolute;
  left: 0;
  top: -100;
  width: 100%;
  height: 50px;
  line-height: 50%;
  background-color: #000;
  color: #fff;
  text-align: center;
}
.skip:focus {
  top: 0;
}
```

# 웹접근성용 텍스트 (스크린 리더 전용 텍스트)

```css
.hide {
  position: absolute;
  left: -5000px;
}

.screen-reader {
  overflow: hidden;
  position: absolute;
  top: 0;
  left: 0;
  width: 0;
  height: 0;
  font-size: 0;
  line-height: 0;
  text-indent: -9999px;
}
```

# 웹접근성용 글자 화면 미노출하기

글자색을 투명하게 처리

```css
.hide-text {
  color: transparent;
  overflow: hidden;
}
```
