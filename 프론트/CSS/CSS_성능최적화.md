https://yceffort.kr/2021/03/improve-css-performance

# CSS 압축하고 최소화 하기

# 사용하지 않는 CSS 제거

CSS-in-JS를 쓸 때 얻을 수 있는 가장 큰 이점이다.  
각 컴포넌트가 렌더링에 필요한 CSS가 js내에 포함되어 있다.  
(따라서 컴포넌트 레벨로 관리하기 때문에 편하다는 것)  
CSS-in-JS는 페이지 내부에 CSS를 인라인 처리하거나,  
외부 CSS파일로 따로 번들링 해버린다.  
CSS를 자바스크립트 내부에 포함시켜 버리면 CSS 파싱과 평가가 느려진다.

# CSS의 우선순위 정하기

Critical CSS란 화면에 보이는 컨텐츠 (above-the-fold content)의 CSS 에 대해서만 inline 처리하는 것을 의미한다.

# CSS 비동기로 불러오기

```html
<link
  rel="stylesheet"
  href="non-critical.css"
  media="print"
  onload="this.media='all'"
/>
```

또 다른 방법은 <link rel="preload">를 사용하는 것이다.

# @import 사용 자제하기
