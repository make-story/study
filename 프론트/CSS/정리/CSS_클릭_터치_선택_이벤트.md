# pointer-events

클릭 이벤트 허용 여부

pointer-event 속성을 통해 엘리먼트가 마우스 이벤트(호버, 클릭, 드래그 등)에 어떻게 반응할지를 지정할 수 있다.  
부모 엘리먼트가 pointer-events: none 속성을 갖고 있어도 자식 중  
pointer-events: auto 를 가진 엘리먼트가 있다면,  
해당 자식 엘리먼트에 트리거 된 이벤트가 버블링 또는 캡쳐링 되는 과정에서 부모 엘리먼트의 이벤트 리스너가 호출될 수 있다.

---

# touch-action

https://wit.nts-corp.com/2021/07/16/6397

브라우저에게 맡길 터치 액션 지정

기본적으로 터치 이벤트의 처리는 브라우저가 담당하는 영역이다.  
touch-action 속성을 통해 어떤 요소 내에서 브라우저가 처리할 터치 액션의 목록을 지정할 수 있다.  
표준 터치 제스쳐로는 터치를 사용한 스크롤(panning)과 여러 손가락을 사용한 확대/축소(pinch zoom)이 존재하며,  
브라우저에 따라 더블 탭으로 확대 등 표준이 아닌 여러 제스쳐를 지원하는 경우도 있다.

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

auto;
기본 값, 모든 터치 이벤트를 활성화

none;
기본 값, 모든 터치 이벤트를 비활성화

pan-x;
한 손가락 수평(X축) 이동 제스처를 사용합니다.

pan-y;
한 손가락 수직(Y축) 이동 제스처를 사용합니다.

pinch-zoom;
핀치 줌(여러 손가락을 사용한 확대/축소)만 허용

pan-left;
왼쪽 방향으로의 터치를 사용한 스크롤 허용

pan-right;
오른쪽 방향으로의 터치를 사용한 스크롤 허용

pan-up;
위쪽 방향으로의 터치를 사용한 스크롤 허용

pan-down;
아래쪽 방향으로의 터치를 사용한 스크롤 허용

manipulation;
터치를 사용한 스크롤, 핀치 줌만 허용하고 그 외 비표준 동작 (더블 탭으로 확대 등) 불허용

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
