# 확장(Extend)

```scss
.btn {
  padding: 10px;
  margin: 10px;
  background: blue;
}
.btn-danger {
  @extend .btn;
  background: red;
}
```

```css
.btn,
.btn-danger {
  padding: 10px;
  margin: 10px;
  background: blue;
}
.btn-danger {
  background: red;
}
```

extend 보다는 mixin 추천
https://sass-guidelin.es/ko/#extend
