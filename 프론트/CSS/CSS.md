# MDN

https://developer.mozilla.org/ko/docs/Web/CSS

https://developer.mozilla.org/en-US/docs/Web/CSS/Reference

# CSS 방법론

https://wit.nts-corp.com/2015/04/16/3538

# CSS 검사기

http://www.css-validator.org/validator.html.ko

---

문서의 내용(구조) : HTML
문서의 표현 : CSS
문서의 기능 : JavaScript
각 분리!

---

# 공통값

- inherit  
  프로퍼티 값을 부모 요소에서 강제로 상속합니다.  
  부모 요소에서 값을 복사한다고 생각해도 됩니다.

- initial  
  `프로퍼티 값을 관련 CSS 모듈에서 정의하는 초깃값으로 정합니다.`

- unset
  inherit 와 initial 의 효과를 섞습니다.  
  color 처럼 상속되는 프로퍼티에서 unset 은 initial 와 같은 의미 입니다,  
  background-image 처럼 상속되지 않는 프로퍼티에서 unset 의 효과는 initial 과 같습니다.

---

# 상속

상속 개념을 사용하면 어떤 앨리먼트의 모든 하위 앨리먼트에 동일한 스타일을 일일이 지정하지 않아도 되어 편리합니다.  
하위 앨리먼트가 상속해야 할 속성이 있다면 부모 앨리먼트에만 지정하면 됩니다.

# 스타일 가이드

스타일 가이드란 사이트를 구성하는 코드와 디자인 요소에 대해 설명해 놓은 문서 혹은 웹페이지나 작은 사이트를 일컫는 말입니다.  
좋은 스타일 가이드는 먼저 사이트 구조 개요에 대한 설명을 합니다.  
그리고 코딩 표준에 대한 상세한 정보를 제공해서 디자이너, 개발자, 기획자가 높은 품질의 코드를 작성할 수 있도록 합니다.

# 박스 모델

https://web.dev/learn/css/box-model?hl=ko

마진(margin) - 테두리선(border) - 패딩(padding) - 내용 영역(content)

# 마진 겹침 현상

두 개 이상의 마진값이 세로 방향으로 만났을 떄 하나의 마진으로 합쳐지는 현상을 말합니다.  
마진이 하나로 합칠 때 두 개의 마진값 중에서 큰 값이 이 마진의 높이값이 됩니다.

# 화면 표시 모델

CSS에서 위치와 관련된 포지셔닝 방식에는 일반 흐름(normal flow)방식, 플로트(float)방식, 절대 위치(absolute) 방식 이렇게 3가지가 있습니다.  
포지셔닝 방식을 지정하지 않으면 모든 박으세는 일반흐름 방식이 적용됩니다.

---

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

## 아이폰X 안전영역(Safe Area) 대응

https://wit.nts-corp.com/2019/10/24/5731
