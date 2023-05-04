`새로운 CSS 레이아웃` 책 내용 중

justify-content 속성은 주축(main axis),
즉 `flex-direction 이 row 라면 가로 줄, flex-direction 이 column 이라면 칼럼상에서 동작`합니다.

justify-content 의 초기값은 flex-start 입니다.  
반대로 flex-end 로 설정한다면 아이템이 컨테이너의 끝에 늘어섭니다.

```css
.cards {
  display: flex;
  justify-content: flex-end;
}
```

## 아이템 주변 혹은 사이에 간격 주기

주축을 따라 `플렉스 아이템을 일정한 간격으로 배치할 때도 justify-content 속성을 사용`합니다.
이 속성의 값을 `space-between 로 설정하면 아이템 사이의 공간을 똑같은 크기로 표시`하고,  
`space-around 로 설정하면 모든 아이템 양쪽에 똑같은 크기의 마진을 부여`합니다.
`space-evenly 는 모든 공백을 균등하게 배분`합니다. 따라서 아이템-아이템 사이의 간격과 컨테이너-아이템 사이의 간격은 크기가 동일합니다.

## 요소를 정중앙에 배치하는 가장 간단한 방법

어떤 플렉스 아이템에 align-item 와 justify-content 를 동시에 적용하면 이 아이템을 쉽게 정중앙에 배치할 수 있습니다.  
컨테이너에 display: flex 를 설정한 후  
`요소의 align-item 와 justify-content 속성을 모두 center 로 설정`하면 됩니다.

## 플렉스박스의 align-content 속성

플렉스박스에서 align-content 속성은 교차축 위에서 동작합니다.  
또한 다음 조건을 모두 만족하면서 여유 공간이 있을 때만 동작 합니다.

- flex-wrap 속성의 값이 wrap 일 때
- 아이템을 배치하기 위해 필요한 공간보다 컨테이너가 길 때

align-content 속성을 space-between 으로 설정하면 플렉스 아이템은 자신의 콘텐츠를 표현하기 위해 필요한 만큼의 공간을 차지합니다. 그 후 남은 공간을 아이템 사이사이에 배분합니다.  
주축 위에서 justify-content 가 작동하는 것과 같은 방식입니다.

`flex-wrap: wrap;이 설정된 상태에서, 아이템들의 행이 2줄 이상 되었을 때의 수직축 방향 정렬을 결정하는 속성입니다.`
