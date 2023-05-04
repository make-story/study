# `완성된 웹사이트로 배우는 HTML & CSS 웹 디자인` 책 내용중

## 풀사이즈 배경 이미지

```css
section {
  height: 100vh;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
}
```

## 배경 이미지를 여러개 지정

```css
body {
  background-image: url(images/bg1.png), url(images/bg2.png);
  background-position: left top, right top;
  background-repeat: no-repeat;
}
```

## background 속성으로 구현할 때 주의할 점 (p205)

배경과 관련된 스타일을 전체적으로 설정할 수 있는 CSS 의 background 속성을 한 번에 모아서 사용하면  
브라우저에 따라 제대로 동작하지 않기도 합니다.  
코드가 조금 길어지더라도 하나하나 따로 작성하는 것이 좋습니다.

```css
#hero {
  background: #4db1ec url('../images/hero.jpg') no-repeat center / cover;
  background-blend-mode: screen;
  height: 100vh;
  display: flex;
  align-items: center;
}
```

예시 코드처럼 작성하면 브라우저에 따라 이미지가 표시되지 않습니다.

# 배경에 동영상 넣기(p260)
