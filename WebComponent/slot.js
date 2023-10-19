/*
-
slot

(슬롯은 사용자가 컴포넌트 내부에 원하는 마크업을 채울 수 있도록 미리 선언해놓은 자리 표시자입니다.)
(재사용을 높여주는 태그)
(웹컴포넌트 기술 항목 중 html templates 에서 사용되는 스팩)
(쉐도우 돔의 슬롯이 가진 이름에 맞는 라이트 돔의 노드가 각 슬롯에 삽입된다)

// https://wit.nts-corp.com/2019/03/27/5552
// https://developers.google.com/web/fundamentals/web-components/shadowdom?hl=ko#slots
// https://html.spec.whatwg.org/multipage/scripting.html#the-slot-element
// https://developer.mozilla.org/en-US/docs/Web/HTML/Element/slot
// https://developer.mozilla.org/ko/docs/Web/Web_Components/Using_templates_and_slots

Shadow DOM은 <slot> 요소를 사용하여 여러 DOM 트리를 함께 구성합니다. 
슬롯은 사용자가 자신의 마크업을 사용하여 채울 수 있는 구성 요소 내부의 자리표시자입니다. 
슬롯을 한 개 이상 정의하여 외부 마크업을 초대하여 구성 요소의 Shadow DOM에 렌더링합니다. 
기본적으로 '사용자의 마크업을 여기에 렌더링한다' 고 말하는 것과 같습니다.

<template>
    <div slot="test1">
        해당 내용은 < slot name="desc" >< /slot > 에 할당됨.
    </div>
</template>


예제1)
html 코드 (또는 template tag 이나 shadow dom 내부 slot 태그사용)
<div id="slot-test">
    <!-- Light DOM -->
    <span slot="title">Hello</span>
    <span slot="desc">world</span>
</div>

javascript 코드
document.querySelector('#slot-test').attachShadow({mode: 'open'}).innerHTML = `
    <h1>
        <!-- slot="title" 속성이 있는 태그를 아래 slot name="title" 위치에 위치하도록 함 //-->
        <slot name="title"></slot>
    </h1>
    <p>
        <!-- slot="desc" 속성이 있는 태그를 아래 slot name="desc" 위치에 위치하도록 함 //-->
        <slot name="desc"></slot>
    </p>
`;


예제2)
1. showdow dom 영역
#shadow-root
  <div id="tabs">
    <slot id="tabsSlot" name="title"></slot>
  </div>
  <div id="panels">
    <slot id="panelsSlot"></slot>
  </div>


2. 구성 요소 사용자는 다음과 같이 <fancy-tabs>를 선언합니다.
<fancy-tabs>
  <button slot="title">Title</button>
  <button slot="title" selected>Title 2</button>
  <button slot="title">Title 3</button>
  <section>content panel 1</section>
  <section>content panel 2</section>
  <section>content panel 3</section>
</fancy-tabs>

<fancy-tabs>
  <h2 slot="title">Title</h2>
  <section>content panel 1</section>
  <h2 slot="title" selected>Title 2</h2>
  <section>content panel 2</section>
  <h2 slot="title">Title 3</h2>
  <section>content panel 3</section>
</fancy-tabs>


3. slot 위치에 적용된 모습
<fancy-tabs>
  #shadow-root
    <div id="tabs">
      <!-- name="title" 로 지정한 slot를 여기에 넣는다 -->
      <slot id="tabsSlot" name="title">
        <button slot="title">Title</button>
        <button slot="title" selected>Title 2</button>
        <button slot="title">Title 3</button>
      </slot>
    </div>
    <div id="panels">
      <!-- slot name 속성을 설정하지 않고 넣었다는 것은, slot 매칭을 하지 않은 태그를 모두 여기에 넣겠다는 의미 -->
      <slot id="panelsSlot">
        <section>content panel 1</section>
        <section>content panel 2</section>
        <section>content panel 3</section>
      </slot>
    </div>
</fancy-tabs>
*/
