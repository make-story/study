# 컨테이닝 블록, Containing Block, CB

https://www.w3.org/TR/CSS2/visudet.html#containing-block-details  
https://developer.mozilla.org/ko/docs/Web/CSS/Containing_block
https://medium.com/%EC%98%A4%EB%8A%98%EC%9D%98-%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%B0%8D/css-position-%EC%97%90-%EB%8C%80%ED%95%B4-%EC%95%8C%EC%95%84%EB%B3%B4%EC%95%98%EB%8B%A4-8514107d7fa5

요소의 크기와 위치는 컨테이닝 블록의 영향을 자주 받습니다.

CSS 에서 말하는 Containing Block, CB 는 특정한 가상의 영역을 가리키는데, 이는 어떤 엘리먼트의 자식 엘리먼트들이 위치나 크기 등을 결정지을 때 기준으로 사용할 참고 지표가 된다.
즉, 흔히 말하는 `부모 엘리먼트를 의미`한다.

## fixed

항상 viewport 의 CB 를 참조

## absolute

부모 엘리먼트부터 최상위 root 엘리먼트 중 현재 엘리먼트에서 position 이 static 이 아닌 가장 가까운 엘리먼트의 CB 를 참조

## relative

현재 엘리먼트가 속한 DOM flow 의 흐름에서, 자기 자신의 CB 의 왼쪽 상단 꼭지점을 (0, 0) 좌표로 인식

## sticky

부모 엘리먼트 중 scroll 이 있는 엘리먼트의 CB 를 참조

## 컨테이닝 블록 식별

컨테이닝 블록의 식별 과정은 `position 속성`에 따라 완전히 달라집니다.

position 속성이 `static, relative, sticky` 중 하나이면,  
컨테이닝 블록은 가장 가까운 조상 블록 컨테이너(inline-block, block, list-item 등의 요소),  
또는 가장 가까우면서 서식 맥락을 형성하는 조상 요소(table, flex, grid, 아니면 블록 컨테이너 자기 자신)의 콘텐츠 영역 경계를 따라 형성됩니다.

position 속성이 `absolute`인 경우,  
컨테이닝 블록은 position 속성 값이 static이 아닌(fixed, absolute, relative, sticky) 가장 가까운 조상의 내부 여백 영역입니다.

position 속성이 `fixed` 인 경우,  
컨테이닝 블록은 뷰포트나 페이지 영역(페이지로 나뉘는 매체인 경우)입니다.

position 속성이 `absolute나 fixed` 인 경우,  
다음 조건 중 하나를 만족하는 가장 가까운 조상의 내부 여백 영역이 컨테이닝 블록이 될 수도 있습니다.

- transform이나 perspective (en-US) 속성이 none이 아님.
- will-change 속성이 transform이나 perspective임.
- filter 속성이 none임. (Firefox에선 will-change가 filter일 때도 적용)
- contain 속성이 paint임.

---

# position: sticky

스크롤 시에도 적용(설정)된 위치에 고정됨

---

# float

## clip-path, shape-outside

```html
<img id="clip-path" src="http://resrc.devdic.com/img/bysize/below_200/01.png" />
<p>
  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
  standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a
  type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining
  essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum
  passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
</p>
```

```css
#clip-path {
  clip-path: circle(50%);
  shape-outside: circle(50%);
  float: left;
}
```

clip-path 기능은 원하는 이미지같은 요소의 주변을 다양한 형태로 가려주는 기능

shape-outside 기능은 주변 요소(텍스트)가 주변을 감싸게 됨

## display: flow-root;

https://jihyehwang09.github.io/2019/02/03/css-layout-float/

flow-root 는 가장 최상위 요소처럼 보여지게 하라는 뜻

float 된 요소랑 float 되지 않은 요소랑 독립되게 하려면, 자식 요소에  
display: flow-root; 를 준다.

```html
<style>
  /* .ex{display: flow-root;} */
  .cf::after {
    content: '';
    display: block;
    clear: both;
  }
</style>
<ul class="ex cf"></ul>
```

- 익스플로러 대응

```css
::after {
  content: ””;
  display: block;
  clear: both;
}
```

자식 요소 중 마지막 요소의 다음에 content가 “”(비어있는) block 요소를 만들고, clear:both를 사용해서 float를 left 또는 right 상관없이 초기화해야 한다.

- iOS 사파리 12 버전 이하에서 지원하지 않는다.
