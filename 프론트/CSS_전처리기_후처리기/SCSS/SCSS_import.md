# 가져오기(Import)

@import로 외부에서 가져온 Sass 파일은 모두 단일 CSS 출력 파일로 병합됩니다.  
또한, 가져온 파일에 정의된 모든 변수 또는 Mixins 등을 주 파일에서 사용할 수 있습니다.

Sass @import는 기본적으로 Sass 파일을 가져오는데, CSS @import 규칙으로 컴파일되는 몇 가지 상황이 있습니다.

- 파일 확장자가 .css일 때
- 파일 이름이 http://로 시작하는 경우
- url()이 붙었을 경우
- 미디어쿼리가 있는 경우

```scss
@import 'hello.css';
@import 'http://hello.com/hello';
@import url(hello);
@import 'hello' screen;
```

## 여러 파일 가져오기

```scss
@import 'header', 'footer';
```
