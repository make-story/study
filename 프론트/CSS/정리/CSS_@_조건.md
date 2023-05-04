# @charset

어떤 인코딩을 사용하는지 정의합니다.

```css
@charset "utf-8";
```

@charset 규칙을 여러 개 사용하면 첫 번째 선언만 적용됩니다.  
`이 규칙은 반드시 스타일시트의 첫 번째 행에 있어야 하며`,  
어떤 문자도 이 규칙의 앞에 올 수 없습니다.  
문서에 포함된 스타일시트에는 @charset 을 사용할 수 없습니다.

# @import

다른 스타일시트의 스타일을 가져올 수 있습니다.  
@import 규칙은 여러 개 사용할 수 있습니다.  
@import 규칙은 반드시 @charset 을 제외한 어떤 규칙보다 앞에 있어야 합니다.

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

# @container

https://mong-blog.tistory.com/entry/CSS-Container-%EC%BF%BC%EB%A6%AC%ED%8A%B9%EC%A0%95-%EC%9A%94%EC%86%8C-%ED%81%AC%EA%B8%B0%EC%97%90-%EB%94%B0%EB%9D%BC-%EC%8A%A4%ED%83%80%EC%9D%BC%EB%A7%81%ED%95%98%EA%B8%B0

- container 쿼리는 viewport기준이 아닌, 특정 요소의 크기에 따라 반응적으로 스타일링이 가능하다.
- container 쿼리를 사용하기 위해선 container-name, container-type 지정이 필요하다.
