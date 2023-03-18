https://heropy.blog/2018/01/31/sass/

# Sass와 SCSS는 차이점은 뭔가요?

Sass(Syntactically Awesome Style Sheets)의 3버전에서 새롭게 등장한 SCSS는  
CSS 구문과 완전히 호환되도록 새로운 구문을 도입해 만든 Sass의 모든 기능을 지원하는 CSS의 상위집합(Superset) 입니다.  
즉, SCSS 는 CSS와 거의 같은 문법으로 Sass 기능을 지원한다는 말입니다.

더 쉽고 간단한 차이는 {}(중괄호)와 ;(세미콜론)의 유무입니다.

```sass
.list
  width: 100px
  float: left
  li
    color: red
    background: url("./image.jpg")
    &:last-child
      margin-right: -10px
```

```scss
.list {
  width: 100px;
  float: left;
  li {
    color: red;
    background: url('./image.jpg');
    &:last-child {
      margin-right: -10px;
    }
  }
}
```
