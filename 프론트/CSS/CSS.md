# MDN

https://developer.mozilla.org/ko/docs/Web/CSS

# CSS 검사기

http://www.css-validator.org/validator.html.ko

---

문서의 내용(구조) : HTML
문서의 표현 : CSS
문서의 기능 : JavaScript
각 분리!

---

# 셀렉터

## 단순 셀렉터

- 요소형 셀렉터

```css
p {
}
```

- 전체 셀렉터

```css
* {
}
```

- 속성 셀렉터

```css
a[href"http://www.w3c.org/"]
{
}
```

- 클래스 셀렉터

```css
.my-class {
}
```

- ID 셀렉터

```css
#my-id {
}
```

- 의사 클래스(pseudo-class)

```css
a:visited {
}
```

## 의사 요소(pseudo-element)

클론을 두 개 사용한 것은 모두 '의사 요소'

```css
a::before {
}
```

## 결합자

- 손자 결합자(Decendant Combinator)

```css
div p {
}
```

- 자녀 결합자

```css
div > p {
}
```

- 형제 결합자

```css
div + p {
}
```

```css
div ~ p {
}
```

---

# 캐스케이드 (cascade)

캐스케이드는 각 규칙마다 우선순위를 부여하는 방식으로 동작

style 속성을 사용한 규칙은 어떤 규칙보다도 우선 순위가 높습니다.  
그리고 ID를 사용한 규칙은 ID를 사용하지 않은 규치보다 우선순위가 높습니다.  
또한 클래스 선택자를 사용한 규칙은 타입 선택자만 사용한 규칙보다 우선순위가 높습니다.  
마지막으로 동일한 지정순위를 갖는 규칙일 경우 나중에 나온 규칙이 적용됩니다.

# 상속

상속 개념을 사용하면 어떤 앨리먼트의 모든 하위 앨리먼트에 동일한 스타일을 일일이 지정하지 않아도 되어 편리합니다.  
하위 앨리먼트가 상속해야 할 속성이 있다면 부모 앨리먼트에만 지정하면 됩니다.

# 스타일 가이드

스타일 가이드란 사이트를 구성하는 코드와 디자인 요소에 대해 설명해 놓은 문서 혹은 웹페이지나 작은 사이트를 일컫는 말입니다.  
좋은 스타일 가이드는 먼저 사이트 구조 개요에 대한 설명을 합니다.  
그리고 코딩 표준에 대한 상세한 정보를 제공해서 디자이너, 개발자, 기획자가 높은 품질의 코드를 작성할 수 있도록 합니다.

# 박스 모델

마진(margin) - 테두리선(border) - 패딩(padding) - 내용 영역

# 마진 겹침 현상

두 개 이상의 마진값이 세로 방향으로 만났을 떄 하나의 마진으로 합쳐지는 현상을 말합니다.  
마진이 하나로 합칠 때 두 개의 마진값 중에서 큰 값이 이 마진의 높이값이 됩니다.

# 화면 표시 모델

CSS에서 위치와 관련된 포지셔닝 방식에는 일반 흐름(normal flow)방식, 플로트(float)방식, 절대 위치(absolute) 방식 이렇게 3가지가 있습니다.  
포지셔닝 방식을 지정하지 않으면 모든 박으세는 일반흐름 방식이 적용됩니다.

---

# 가로 중간에 배치하기

- auto 마진을 이용 방법

```css
#wrapper {
  width: 720px;
  margin: 0 auto;
}
```

- 포지셔닝과 음수 마진값 이용 방법
  먼저 래퍼 엘리먼트에 너비 폭을 지정합니다.  
  그 대음 position 속성값을 relative 로 지정하고, left 속성에 50%로 지정합니다.

```css
#wrapper {
  width: 720px;
  position: relative;
  left: 50%;
  margin-left: -360px;
}
```

# 플로트(float) 기반의 레이아웃

플로트 기반 레이아웃이라는 이름이 말해주듯이 위치를 지정할 엘리먼트의 너비값을 지정하고,  
플로트로 왼쪽이나 오른쪽으로 띄우기만 하면 됩니다.

```css
#wrapper #content {
  width: 520px;
  float: right;
}
#wrapper #nav {
  width: 180px;
  float: left;
}
#wrapper #footer {
  clear: both;
}
```
