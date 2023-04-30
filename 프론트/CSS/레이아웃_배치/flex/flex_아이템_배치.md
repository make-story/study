`새로운 CSS 레이아웃` 책 내용 중

컨테이너에 align-items 속성을 추가하면  
다양한 값을 사용해 플렉스 항목을 배치할 수 있습니다.

flex-start 를 사용하면 요소가 컨테이너의 상단에 붙고,  
felx-end 를 사용하면 바닥에 붙습니다.  
center 는 요소를 중간으로 배치합니다.

align-items 속성은 컨테이너 내부의 모든 플렉스 아이템에 적용됩니다.  
하지만 원한다면 개별 플렉스 아이템에 align-self 속성을 사용하여  
이 값을 덮어쓸 수 있습니다.

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

flex-direction 을 column 으로 바꾸면  
교차축이 수평으로 바뀌고,
이때 플렉스 아이템을 flex-end 로 배치하면 아이템은 오른쪽 끝으로 몰려서 나타납니다.

```css
.cards {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}
```
