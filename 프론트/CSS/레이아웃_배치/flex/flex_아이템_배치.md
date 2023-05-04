`새로운 CSS 레이아웃` 책 내용 중

컨테이너에 `align-items 속성`을 추가하면  
다양한 값을 사용해 플렉스 항목을 배치할 수 있습니다.

참고: align-items 의 기본값은 stretch 입니다. (영역만큼 늘어남)

`flex-start 를 사용하면 요소가 컨테이너의 상단`에 붙고,  
`felx-end 를 사용하면 바닥`에 붙습니다.  
`center 는 요소를 중간`으로 배치합니다.

`align-items 속성은 컨테이너 내부의 모든 플렉스 아이템에 적용`됩니다.  
하지만 `원한다면 개별 플렉스 아이템에 align-self 속성을 사용하여 이 값을 덮어쓸 수 있습니다.`

```html
<style>
  .cards {
    display: flex;
    margin: 0 -10px;
    align-items: flex-start;
    height: 50vh;
  }
  .cards li:nth-child(2) {
    align-self: stretch;
  }
  .cards li:nth-child(3) {
    align-self: flex-end;
  }
  .cards li:nth-child(4) {
    align-self: center;
  }
</style>
<ul class="cards">
  <li>Item 1</li>
  <li>Item 2</li>
  <li>Item 3</li>
  <li>Item 4</li>
</ul>
```

아이템의 배치는 항상 교차축(cross axis)에서 이루어집니다.
교차축은 CSS에서는 블록축(block axis)이라고 하며,  
그리드 명세에서는 칼럼축(column axis)이라고도 부릅니다.

교차축(Cross Axis) : 위아래 수직 이동  
주축(Main Axis) : 좌우 수평 이동

만약 `flex-direction 을 column 으로 바꾸면 교차축이 수평으로` 바뀌고,
이때 플렉스 아이템을 flex-end 로 배치하면 아이템은 오른쪽 끝으로 몰려서 나타납니다.

`배치 방향 설정 flex-direction`

```css
.cards {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}
```

```css
.container {
  flex-direction: row;
  /* flex-direction: column; */
  /* flex-direction: row-reverse; */
  /* flex-direction: column-reverse; */
}
```

## 자동 마진(예: margin-left: auto)을 사용한 배치

같은 줄에 있는 플렉스 아이템 중 하나만 다른 방식으로 배치하고 싶을 때가 있는데, 바로 자동 마진을 사용

`자동 마진을 사용하면 1개의 플랙스 아이템만 오른쪽 끝에 배치할 수 있습니다.`

```css
.cards {
  display: flex;
}
.cards li:last-child {
  margin-left: auto;
}
```
