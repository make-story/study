# MDN
https://developer.mozilla.org/ko/docs/Web/CSS

# CSS 방법론
https://wit.nts-corp.com/2015/04/16/3538

# CSS 검사기  
http://www.css-validator.org/validator.html.ko

# 반응형 계산
```javascript
const sizePercent = function(target, content) {
  // 단위 : https://developer.mozilla.org/ko/docs/Web/CSS/CSS_Values_and_Units
  // 공식 : target / content = result %
  // 공식(rem) : 사용하려는 값 / 최상단 부모값 = rem 값
  // 예제1 : 60(구하고자하는 크기) / 320(기준, 최소 해상도) = 0.1875 -> 18.75%
  // 예제2 : 10(구하고자하는 크기) / 320(기준, 최소 해상도) = 0.03125 -> 3.125%
  target = Number(target);
  content = Number(content);
  return (target / content) * 100;
};

// 비율 
const getAspectRatio = function(width, height) { 
  const result = {};
  const getGCD = function(a, b) {
    return (b == 0) ? a : getGCD(b, a % b);
  };

  result.width = width;
  result.height = height;
  result.gcd = getGCD(width, height);
  result.aspect = [width/result.gcd, height/result.gcd].join(':');

  return result;
};
```

---

문서의 내용(구조) : HTML
문서의 표현 : CSS
문서의 기능 : JavaScript
각 분리!

---

# 모르는 것 리스트업!
https://wit.nts-corp.com/?s=css

## touch-action
auto; /_ 기본 값, 모든 터치 이벤트를 활성화 _/  
none; /_ 기본 값, 모든 터치 이벤트를 비활성화 _/  
pan-x; /_ 한 손가락 수평(X축) 이동 제스처를 사용합니다. _/  
pan-y; /_ 한 손가락 수직(Y축) 이동 제스처를 사용합니다. _/  
pinch-zoom; /_ 핀치 줌(여러 손가락을 사용한 확대/축소)만 허용 _/  
pan-left; /_ 왼쪽 방향으로의 터치를 사용한 스크롤 허용 _/  
pan-right; /_ 오른쪽 방향으로의 터치를 사용한 스크롤 허용 _/  
pan-up; /_ 위쪽 방향으로의 터치를 사용한 스크롤 허용 _/  
pan-down; /_ 아래쪽 방향으로의 터치를 사용한 스크롤 허용 _/  
manipulation; /_ 터치를 사용한 스크롤, 핀치 줌만 허용하고 그 외 비표준 동작 (더블 탭으로 확대 등) 불허용 _/

## 랜더링 성능을 향상 시키는 새로운 CSS 속성 content-visibility
content-visibility는 UserAgent가 layout, painting을 포함한 요소의 렌더링 작업을 필요로할 때까지 생략할 수 있도록 합니다.  
콘텐츠의 대부분이 화면 밖에 있을 때, content-visibility을 활용해서 렌더링을 생략하게 되면 사용자의 초기 로드 시간이 훨씬 빨라집니다.  
또한, 화면 내 콘텐츠와 더 빠르게 상호작용할 수 있습니다.

## CSS 애니메이션의 성능
CSS 애니메이션은 일부 속성에 의존합니다.  
position : absolute / relative  
transform  
opacity  
left, right, top, bottom 등등…

웹 브라우저의 렌더링 방식

1. Recalculate Style  
   요소에 적용할 스타일을 계산.
2. Layout  
   요소의 레이아웃을 생성하고, 화면에 배치.
3. Paint  
   생성된 모든 레이아웃에 픽셀을 추가. GPU는 필요에 따라 생성한 레이어의 비트맵을 사용해 화면에 렌더링.
4. Composite Layers  
   생성한 레이어 계층을 합성. 이 계층을 내려다보면 모든 요소가 고유한 위치(복합 계층)를 갖는 완전한 웹 페이지로 보여집니다.

## CSS Containment Module
CSS Containment Module은 웹페이지에서 선택된 하위 트리를 문서의 나머지 영역과 분리하는 기능을 갖고 있습니다.  
selector {contain:none | strict | content | [ size || layout || style || paint ]}

## CSS Paint API
“CSS Custom Paint” 혹은 “Houdini’s paint worklet”이라고도 불리는 CSS Paint API

Houdini(후디니) ?  
Houdini(후디니) 는 “웹 개발자들이 렌더링을 핸들링 할 수 있는 인터페이스를 만들어 주자.”라는 목적으로 만들어진 프로젝트 모임이며,  
그들이 만들어낸 기술 자체를 뜻하기도 한다.  
LayoutAPI, Typed OM, AnimationWorklet 등 다양한 기술들을 만들어 내고 있는데, CSS Paint API는 그 일부일 뿐이다.

## GPU 애니메이션 장점, 단점
- 장점
  애니메이션이 빠르고 부드럽다 (60FPS).  
  적절히 신경써서 만든 애니메이션은 독립된 스레드 상에서 재생된다. 또한 이는 무거운 자바스크립트 코드 연산 때문에 방해를 받지 않는다.  
  3D 트랜스폼은 비용이 “싸다”.

- 단점
  컴포짓 레이어에 요소를 올리려면 추가적인 리페인팅 작업을 해야 한다. 때때로(추가된 것만 그리는 대신에 레이어 전체를 리페인팅 해야 할 때) 이 과정은 매우 느리게 진행된다.  
  페인팅 처리된 레이어는 GPU로 보내져야 한다. 이 레이어의 크기와 갯수에 따라 전송 과정 역시 매우 느려질 수 있다. 그 결과로 중저가 기기에서 요소 깜빡임이 발생할 수 있다.  
  모든 컴포짓 레이어는 추가적으로 메모리를 소모한다. 메모리는 모바일 기기에서 매우 귀중한 자원이다. 메모리 과다 사용은 브라우저 충돌을 일으킬 수 있다.  
  암묵적 컴포지팅을 고려사항에 넣지 않는다면, 느린 리페인팅, 초과 메모리 사용 및 브라우저 충돌이 발생할 가능성이 매우 높다.  
  사파리 텍스트 렌더링처럼 부자연스런 시각 요소가 나타날 수 있으며, 일부 경우 페이지 컨텐츠가 사라지거나 왜곡되어 나타날 가능성이 있다.

## CSS Custom Properties (커스텀속성)
CSS 커스텀 속성은 작성자가 정의한 속성의 집합입니다.  
작성자는 임의로 정한 이름의 속성에 임의의 값을 할당할 수 있습니다.  
“CSS 변수”라고 부르기도 하지만 올바른 이름은 “CSS 커스텀 속성”입니다.

## picture 요소
디스플레이 크기에 따라 적합한 이미지를 노출합니다.

```html
<picture>
  <source srcset="images/small_image.jpg" media="all and (min-width: 586px)" />
  <source srcset="images/wide_image.jpg" media="all and (min-width: 768px)" />
  <img src="images/default_image.jpg" alt="" />
</picture>
```

특정 이미지 파일 형식이 지원되지 않는 경우 대체 이미지 형식을 제공합니다.

```html
<picture>
  <source srcset="images/logo.webp" type="image/webp" />
  <img src="images/logo.png" alt="" />
</picture>
```

대역폭을 절약하고 페이지 로드 시간을 단축합니다.

```html
<picture>
  <source srcset="images/image-768.png 768w, images/image-768-1.5x.png 1.5x" />
  <source srcset="images/image-480.png, images/image-480-2x.png 2x" />
  <img src="images/image.png" alt="" />
</picture>
```

## 아이폰X 안전영역(Safe Area) 대응
https://wit.nts-corp.com/2019/10/24/5731

---

# Layer 화면 중앙정렬 방법
https://wit.nts-corp.com/2017/02/06/4123

1. position:absolute와 margin 마이너스값을 이용한 중앙 정렬  
   장점:  
   IE7 이상 모든 브라우저에서 지원 가능합니다.  
   단점:  
   width와 height값이 고정사이즈인 상태에서만 사용할 수 있습니다.

```html
<div class="layer">Layer Contents</div>
```

```css
.layer {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100px;
  height: 100px;
  background: #f00;
  margin: -50px 0 0 -50px;
}
```

2. position:absolute와 margin:auto를 이용한 중앙 정렬  
   장점:  
   IE8 이상 모든 브라우저에서 지원 가능합니다.  
   margin 마이너스 값과 달리 margin값에 대한 추가적 연산이 필요 없습니다.  
   단점:  
   width와 height값이 고정사이즈인 상태에서만 사용할 수 있습니다.

```html
<div class="layer">
  <span class="content">Layer Contents</span>
</div>
```

```css
.layer {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100px;
  height: 100px;
  background: #f00;
  margin: auto;
}
```

3. position:absolute와 inline-block을 이용한 중앙 정렬  
   장점:  
   IE7 이상 모든 브라우저에서 지원 가능합니다.  
   layer 안의 content 영역이 고정값이 아니라 가변이어도 자동으로 중앙정렬이 됩니다.  
   단점:  
   불필요한 span 태그가 하나 더 필요합니다. (IE8이상의 환경에서는 :after로 대체 가능)

```html
<div class="layer">
  <span class="content">Layer Contents</span>
  <span class="blank"></span>
</div>
```

```css
.layer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  text-align: center;
}
.layer .content {
  display: inline-block;
  background: #f00;
  vertical-align: middle;
}
.layer .blank {
  display: inline-block;
  width: 0;
  height: 100%;
  vertical-align: middle;
}
```

4. position:absolute와 tabel-cell을 이용한 중앙 정렬  
   장점:  
   IE8 이상 모든 브라우저에서 지원 가능합니다.  
   layer 안의 content 영역이 고정값이 아니라 가변이어도 자동으로 중앙정렬이 됩니다.  
   단점:  
   코드 중첩이 여러번 되어야 합니다.

```html
<div class="layer">
  <div class="layer_inner">
    <div class="content">Layer Contents</div>
  </div>
</div>
```

```css
.layer {
  position: absolute;
  display: table;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.layer .layer_inner {
  display: table-cell;
  text-align: center;
  vertical-align: middle;
}
.layer .content {
  display: inline-block;
  background: #f00;
}
```

5. `position:absolute와 transform을 이용한 중앙 정렬`  
   장점:  
   IE9 이상 모든 브라우저에서 지원 가능합니다. (모바일 작업시 적합)  
   layer 안의 content 영역이 고정값이 아니라 가변이어도 자동으로 중앙정렬이 됩니다.  
   transform 속성은 GPU가속이 가능해서 속도향상에 도움이 됩니다.  
   짧은 소스로 간결하게 만들수 있습니다.  
   단점:  
   모바일에서 사용시 기기별로 버그가 생길 가능성이 있습니다. (폰트가 희미하게 번져보이는 버그)

```html
<div class="layer">Layer Contents</div>
```

```css
.layer {
  position: absolute;
  top: 50%;
  left: 50%;
  background: #f00;
  transform: translate(-50%, -50%);
}
```

6. `position:absolute와 flex를 이용한 중앙 정렬`  
   장점:  
   IE10 이상 모든 브라우저에서 지원 가능합니다. (모바일 작업시 적합)  
   layer 안의 content 영역이 고정값이 아니라 가변이어도 자동으로 중앙정렬이 됩니다.  
   짧은 소스로 간결하게 만들수 있습니다.  
   단점:  
   구버전 브라우저에서는 display:box와 병행해야 합니다.

```html
<div class="layer">
  <span class="content">Layer Contents</span>
</div>
```

```css
.layer {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  display: -webkit-flex;
  -webkit-align-item: center;
  -webkit-justify-content: center;
}
.layer .content {
  background: #f00;
}
```

7. position:absolute와 box를 이용한 중앙 정렬

```html
<div class="layer">
  <span class="content">Layer Contents</span>
</div>
```

```css
.layer {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  align-items: center;
  justify-content: center;
  -webkit-align-items: center;
  -webkit-justify-content: center;
  -webkit-box-pack: center;
  -webkit-box-align: center;
  -moz-box-pack: center;
  -moz-box-align: center;
  -ms-box-pack: center;
  -ms-box-align: center;
}
.layer .content {
  background: #f00;
}
```

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

---
