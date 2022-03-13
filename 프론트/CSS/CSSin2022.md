https://wit.nts-corp.com/2022/02/24/6490  
https://www.bram.us/2021/12/27/css-in-2022/

## 1. Container Queries

https://www.bram.us/2021/03/28/css-container-queries-a-first-look-and-demo/  
반응형 페이지를 제작할 때 일반적으로 미디어쿼리를 사용해서 뷰포트의 크기에 따라 스타일이 달라지게끔 제작하였는데,  
컨테이너 쿼리를 사용하면 컨테이너의 사이즈에 따라 스타일이 변경됩니다.

## 2. Cascade Layers

https://www.bram.us/2021/09/15/the-future-of-css-cascade-layers-css-at-layer/  
CSS코드의 우선순위를 결정하는 요인들이 있습니다. (나중에 선언, 선택자가 더 구체적 등등)  
Cascade Layer는 @layer를 사용해서 layer단위로 우선순위를 지정해주는 것이 가능합니다.

## 3. Color Functions

https://dev.to/fabiogiolito/create-a-color-theme-with-these-upcoming-css-features-4o83  
Relative color syntax과 이에 관련한 color-mix(), color-contrast() 두가지 기능이 추가됩니다.

## 4. New Viewport Units

https://www.bram.us/2021/07/08/the-large-small-and-dynamic-viewports/  
새로운 뷰포트 단위

- svh / svw : Short viewport 높이 / 너비의 1%
  Short Viewport : 확장하기 위해 동적으로 확장되고 접히는 모든 UA 인터페이스(예: 주소 표시줄)를 가정한 뷰포트 크기
- lvh / lvw : Large viewport 높이 / 너비의 1%
  Large Viewport : 접기 위해 동적으로 확장 및 접히는 UA 인터페이스(예: 주소 표시줄)를 가정한 뷰포트 크기
- dvh / dvw : Dynamic viewport 높이 / 너비의 1%
  Dynamic Viewport : 모든 UA 인터페이스를 동적으로 고려하는 뷰포트 크기입니다. 표시되는 UA 인터페이스 요소에 따라 자동으로 조정됩니다. 값은 100lvh(최대) 및 100svh(최소)의 내에 있습니다.

## 5. :has()

https://www.bram.us/2021/12/21/the-css-has-selector-is-way-more-than-a-parent-selector/  
특정 자식이 있는 부모 요소를 선택 가능한 선택자

## 6. overscroll Behavior

https://www.bram.us/2017/12/10/customizing-pull-to-refresh-and-overflow-effects-with-css-overscroll-behavior/  
overscroll-behavior CSS속성을 사용하면 컨테이너에서 overscroll 할 때의 동작을 제어할 수 있습니다.  
`하위 스크롤 컨테이너가 스크롤 포트의 끝에 도달했을 때, 상위 스크롤이 움직이는 것을 비활성화`

## 7. Subgrid

https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout/Subgrid  
그리드를 중첩할 때 중첩된 그리드 항목을 기본 그리드와 나란히 정렬되게 하기 어렵습니다.  
하위 그리드 값에 subgrid값을 사용하면 부모 그리드와 같이 정렬됩니다.

## 8. Accent Color

https://web.dev/accent-color/  
accent color를 사용해서 input요소에 색상을 지정할 수 있습니다.  
checkbox, radio, range, progress가 이에 해당합니다.

## 9. Media Query Ranges

https://www.bram.us/2021/10/26/media-queries-level-4-media-query-range-contexts/  
미디어 쿼리의 최대 / 최소 너비 지정이 간편해집니다.
