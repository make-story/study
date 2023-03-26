https://ahnheejong.name/articles/less-famous-css-properties/

https://wit.nts-corp.com/?s=css

https://developer.mozilla.org/en-US/docs/Web/CSS/Reference

---

# inline-block 공백 버그

- 아이템 태그의 줄 바꿈을 다르게 하기
- 주석문으로 공백 제거하기
- (추천) 글꼴 크기를 0px 로 지정해서 공백을 업애기

```html
<style>
  .fone-zero {
    font-size: 0;
  }
  .font-zero li {
    font-size: 1rem;
  }
</style>
<ul>
  <li>one</li>
  <li>two</li>
  <li>three</li>
</ul>
```

---

# pointer-events

클릭 이벤트 허용 여부  
pointer-event 속성을 통해 엘리먼트가 마우스 이벤트(호버, 클릭, 드래그 등)에 어떻게 반응할지를 지정할 수 있다.  
부모 엘리먼트가 pointer-events: none 속성을 갖고 있어도 자식 중pointer-events: auto를 가진 엘리먼트가 있다면,  
해당 자식 엘리먼트에 트리거 된 이벤트가 버블링 또는 캡쳐링 되는 과정에서 부모 엘리먼트의 이벤트 리스너가 호출될 수 있다.

---

# touch-action

브라우저에게 맡길 터치 액션 지정  
기본적으로 터치 이벤트의 처리는 브라우저가 담당하는 영역이다. touch-action 속성을 통해 어떤 요소 내에서 브라우저가 처리할 터치 액션의 목록을 지정할 수 있다. 표준 터치 제스쳐로는 터치를 사용한 스크롤(panning)과 여러 손가락을 사용한 확대/축소(pinch zoom)이 존재하며, 브라우저에 따라 더블 탭으로 확대 등 표준이 아닌 여러 제스쳐를 지원하는 경우도 있다.

```css
touch-action: auto; /* 기본 값 */
touch-action: none; /* 브라우저가 모든 터치 이벤트를 무시하도록 설정 */

touch-action: pan-x; /* 특정 축으로의 터치를 사용한 스크롤 허용 */
touch-action: pan-y;

touch-action: pan-left; /* 특정 방향으로의 터치를 사용한 스크롤 허용 */
touch-action: pan-right;
touch-action: pan-up;
touch-action: pan-down;

touch-action: pinch-zoom; /* 핀치 줌(여러 손가락을 사용한 확대/축소) 허용 */

touch-action: manipulation; /* 터치를 사용한 스크롤, 핀치 줌만 허용하고 그 외 비표준 동작 (더블 탭으로 확대 등) 불허용 */

touch-action: pan-y pinch-zoom; /* 동시에 여러 값 지정 가능 */
```

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

---

# user-select

선택 상호작용  
user-select 속성을 사용해 엘리먼트 내부에서 텍스트 선택이 일어났을 때의 동작을 설정할 수 있다. 기본 동작 이외에 선택이 불가능하게 지정할 수도 있고, 엘리먼트 내에서 선택이 일어나면 무조건 엘리먼트 전체가 선택되는 식의 동작도 설정 가능하다.

```css
user-select: auto; /* 기본값 (::after, ::before 는 선택되지 않고, 부모의 속성을 따름) */
user-select: text; /* 선택 가능 */
user-select: none; /* 선택 불가능 */
user-select: all; /* 엘리먼트 내에서 선택이 일어나면 해당 엘리먼트 전체가 선택된다 */
```

---

# object-fit

대체되는 엘리먼트의 내용물과 컨테이너 사이 관계 지정  
img, video 등과 같이, 내용물이 HTML 문서의 바깥에 존재하는 엘리먼트를 대체되는 엘리먼트라 부른다. 이 때, 외부에 존재하는 내용물의 크기가 컨테이너의 그것과 차이날 때, 화면에는 어떻게 나타나야 할지 지정할 필요가 생긴다.  
https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit

## fill

내용물의 가로세로비를 무시하고 컨테이너의 크기에 맞추어 늘리거나 줄인다. 원래 비율이 유지되지 않으므로, 컨테이너의 크기에 따라 내용물이 가로 혹은 세로로 늘어날 수 있다.

## contain

내용물의 가로세로비를 유지하는 채로, 내용물이 컨테이너에 포함되는 최대 크기가 되도록 늘리거나 줄인다.

## cover

내용물의 가로세로비를 유지하는 채로, 내용물이 컨테이너 전체를 덮는 최소 크기가 되도록 늘리거나 줄인다.

## none

내용물이 전혀 리사이징 되지 않는다.

## scale-down

none 과 contain 중 내용물의 크기가 더 적은 쪽과 동일하게 동작한다.

---

# overflow-wrap

오버플로우가 일어날 때 단어 내 줄바꿈 처리

```html
<div class="example-container">
  <div style="width: 200px; border: 1px solid black; word-break: keep-all; overflow-wrap: break-word;">
    굉장히길고엄청나게길면서굉장히길고엄청나게길면서굉장히길고엄청나게길면서굉장히길고엄청나게길면서의미는없는문자열
  </div>
</div>
```

```css
overflow-wrap: normal; /* 기본 */
overflow-wrap: break-word; /* 오버플로우가 일어나면 단어를 쪼개서 줄바꿈 */
```

---

# list-style-position

리스트 마커 위치 지정  
리스트 아이템 앞에 따라오는 리스트 마커는 기본적으로 li 태그 바깥에 위치한다.  
list-style-position 속성의 값으로 inside를 줘서 마커가 li 태그 안로 들어오도록 설정할 수 있다.

```html
<ul style="padding-left: 20px; list-style-position: inside;">
  <li>1</li>
  <li>2</li>
  <li>3</li>
</ul>
```

```css
list-style-position: inside; /* 마커가 `li` 태그 안에 위치 */
list-style-position: outside; /* 마커가 `li` 태그 바깥에 위치 */
```

---

# will-change

값이 변경될 속성에 대한 힌트  
웹이 정적 문서를 위한 플랫폼에서 동적으로 상호작용하는 복잡한 어플리케이션을 위한 플랫폼으로 진화함에 따라, opacity, transform 등의 CSS 속성 값이 동적으로 변화는 상황이 갈수록 자주 생긴다.  
이 때, will-change 속성을 사용해 브라우저에게 엘리먼트의 어떤 속성이 높은 확률로 변할 것인지 힌트를 줄 수 있다. 브라우저는 이 힌트를 사용해 앞으로 일어날 변화에 미리 대비해 더 매끄러운 트랜지션을 구사할 수 있다.

```css
will-change: auto; /* 기본값 */
will-change: scroll-position; /* 엘리먼트의 스크롤 위치가 바뀔 것 */
will-change: contents; /* 엘리먼트의 컨텐츠 중 일부가 바뀔 것 */

/* 혹은 특정 CSS 속성을 명시할 수 있다. */
/* transform, opacity, top, left, right, bottom 정도가 자주 사용된다. */
will-change: transform;
will-change: left, top; /* 여러 속성을 동시에 명시할 수도 있다. */
```

당연하지만, 이런 준비 작업에는 비용이 든다.  
필요하지 않은 상황에서도 will-change 속성을 너무 남발한다면 오히려 성능 저하가 일어날 수 있음을 유의하라. 기본적으로 CSS 속성 값 변경이 성능 문제 없이 잘 동작할 때는 will-change 를 직접 건드리지 않는 것이 좋다.

---

# scroll

https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Scroll_Snap

https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Scroll_Snap/Basic_concepts

https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-padding-top

# scroll-behavior

책갈피 위치 애니메이션 이동  
https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-behavior

---

# 랜더링 성능을 향상 시키는 새로운 CSS 속성 content-visibility

content-visibility는 UserAgent가 layout, painting을 포함한 요소의 렌더링 작업을 필요로할 때까지 생략할 수 있도록 합니다.  
콘텐츠의 대부분이 화면 밖에 있을 때, content-visibility을 활용해서 렌더링을 생략하게 되면 사용자의 초기 로드 시간이 훨씬 빨라집니다.  
또한, 화면 내 콘텐츠와 더 빠르게 상호작용할 수 있습니다.

---

# appearance

드롭다운 메뉴에 사용되는 <select> 요소는 웹 브라우저마다 그 모양이 많이 다르고, 스타일을 지정하기도 어려워 사용이 꺼려졌습니다.  
다행히 appearance: none;이라는 새로운 속성을 사용해 꾸미는 것이 간편해졌습니다.

https://svelte.dev/repl/cfa1173dce6a4c6a824947afc9f14355?version=3.57.0

```html
<select>
  <option>초등학생</option>
  <option>중학생</option>
  <option>고등학생</option>
</select>

<style>
  select {
    width: 12rem;
    padding: 1rem;
    border-width: 1px;
    /* Removes browser default style from the element. */
    /* https://developer.mozilla.org/en-US/docs/Web/CSS/appearance */
    appearance: none;
    /* Required in Safari */
    background-color: white;
    /* Use background image to re-implement arrow. */
    background-origin: content-box;
    background-repeat: no-repeat;
    background-position-x: 100%;
    /* chevron-up-down, https://heroicons.com/ */
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke-width='1.5' stroke='rgb(17,24,39)'%0A%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9' /%3E%3C/svg%3E");
  }
</style>
```

---

# 웹접근성용 본문 바로가기

```css
.skip {
  position: absolute;
  left: 0;
  top: -100;
  width: 100%;
  height: 50px;
  line-height: 50%;
  background-color: #000;
  color: #fff;
  text-align: center;
}
.skip:focus {
  top: 0;
}
```

# 웹접근성용 텍스트 (스크린 리더 전용 텍스트)

```css
.hide {
  position: absolute;
  left: -5000px;
}
```

# 웹접근성용 글자 화면 미노출하기

글자색을 투명하게 처리

```css
.hide-text {
  color: transparent;
  overflow: hidden;
}
```

---

# 영역의 중간에 배치하기

```css
.prev,
.next {
  display: block;
  position: absolute;
  top: 50%; /* 영역 기준 상단 50% 이동 */
  transform: translateY(-50%); /* 대상의 높이 기준 위로 50% 이동 */
}
```

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
