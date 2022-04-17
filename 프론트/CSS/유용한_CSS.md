https://ahnheejong.name/articles/less-famous-css-properties/  


# pointer-events
클릭 이벤트 허용 여부  
pointer-event 속성을 통해 엘리먼트가 마우스 이벤트(호버, 클릭, 드래그 등)에 어떻게 반응할지를 지정할 수 있다.  
부모 엘리먼트가 pointer-events: none 속성을 갖고 있어도 자식 중pointer-events: auto를 가진 엘리먼트가 있다면,  
해당 자식 엘리먼트에 트리거 된 이벤트가 버블링 또는 캡쳐링 되는 과정에서 부모 엘리먼트의 이벤트 리스너가 호출될 수 있다.  


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


# user-select
선택 상호작용  
user-select 속성을 사용해 엘리먼트 내부에서 텍스트 선택이 일어났을 때의 동작을 설정할 수 있다. 기본 동작 이외에 선택이 불가능하게 지정할 수도 있고, 엘리먼트 내에서 선택이 일어나면 무조건 엘리먼트 전체가 선택되는 식의 동작도 설정 가능하다.  
```css
user-select: auto; /* 기본값 (::after, ::before 는 선택되지 않고, 부모의 속성을 따름) */
user-select: text; /* 선택 가능 */
user-select: none; /* 선택 불가능 */
user-select: all; /* 엘리먼트 내에서 선택이 일어나면 해당 엘리먼트 전체가 선택된다 */
```


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