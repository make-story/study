# @-규칙

https://developer.mozilla.org/ko/docs/Web/CSS/At-rule

# @charset

https://developer.mozilla.org/ko/docs/Web/CSS/@charset

어떤 인코딩을 사용하는지 정의합니다.

```css
@charset "utf-8";
```

@charset 규칙을 여러 개 사용하면 첫 번째 선언만 적용됩니다.  
`이 규칙은 반드시 스타일시트의 첫 번째 행에 있어야 하며`,  
어떤 문자도 이 규칙의 앞에 올 수 없습니다.  
문서에 포함된 스타일시트에는 @charset 을 사용할 수 없습니다.

# @import

https://developer.mozilla.org/ko/docs/Web/CSS/@import

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

iOS 대응 등

```css
@supports (-webkit-touch-callout: none) {
}
```

# @container

https://mong-blog.tistory.com/entry/CSS-Container-%EC%BF%BC%EB%A6%AC%ED%8A%B9%EC%A0%95-%EC%9A%94%EC%86%8C-%ED%81%AC%EA%B8%B0%EC%97%90-%EB%94%B0%EB%9D%BC-%EC%8A%A4%ED%83%80%EC%9D%BC%EB%A7%81%ED%95%98%EA%B8%B0

- container 쿼리는 viewport기준이 아닌, 특정 요소의 크기에 따라 반응적으로 스타일링이 가능하다.
- container 쿼리를 사용하기 위해선 container-name, container-type 지정이 필요하다.

# @font-face

https://developer.mozilla.org/ko/docs/Web/CSS/@font-face

@font-face 를 사용하여 `웹페이지 제작자가 원하는 폰트를 사용할 수 있게함으로써, 컴퓨터에 설치된 폰트만을 사용해야했던 제약이 없어지게되었다.`

문법

```css
@font-face {
    font-family: <a-remote-font-name>
    src: <source> [, <source>]*;
    [font-weight: <weight>];
    [font-style: <style>];
}
```

- <a-remote-font-name> : font 속성에서 폰트명(font face)으로 지정될 이름을 설정한다.
- <source> : 원격 폰트(remote font) 파일의 위치를 나타내는 URL 값을 지정하거나, 사용자 컴퓨터에 설치된 폰트명을 local("Font Name")형식으로 지정하는 속성이다.
- <weight> : 폰트의 굵기(font weight) 값.
- <style> : 폰트 스타일(font style) 값.

아이콘 폰트 사용 예

```css
@font-face {
  font-family: "font-icon";
  src: url("../../font/font-icon.eot");
  src: url("../../font/font-icon.eot?#iefix") format("eot"), url("../../font/font-icon.woff2")
      format("woff2"), url("../../font/font-icon.woff") format("woff"), url("../../font/font-icon.ttf")
      format("truetype"),
    url("../../font/font-icon.svg#font-icon") format("svg");
  font-weight: normal;
  font-style: normal;
}
```
