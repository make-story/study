
# flexbox
## flexbox로 만들 수 있는 10가지 레이아웃
https://d2.naver.com/helloworld/8540176   
https://css-tricks.com/snippets/css/a-guide-to-flexbox/  
https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout/Typical_Use_Cases_of_Flexbox  

> 레이아웃 1 - 스크롤 없는 100% 레이아웃  
> 레이아웃 2 - 내비게이션 영역  
> 레이아웃 3 - 브라우저 화면 아래에 붙는 푸터  
> 레이아웃 4 - 정렬이 다른 메뉴  
> 레이아웃 5 - 폼 레이블 수직 중앙 정렬  
> 레이아웃 6 - 중앙 정렬 아이콘  
> 레이아웃 7 - 유동 너비 박스  
> 레이아웃 8 - 말줄임과 아이콘  
> 레이아웃 9 - 위아래로 흐르는 목록  
> 레이아웃 10 - 가로세로 비율을 유지하는 반응형 박스  

flexbox는 뷰포트나 요소의 크기가 불명확하거나 동적으로 변할 때에도 효율적으로 요소를 배치, 정렬, 분산할 수 있는 방법을 제공하는 CSS3의 새로운 레이아웃 방식  
flexbox의 장점을 한 마디로 표현하면 '복잡한 계산 없이 요소의 크기와 순서를 유연하게 배치할 수 있다'라고 할 수 있다.  
정렬, 방향, 순서, 크기 등을 유연하게 조절할 수 있기 때문에 별도의 분기 처리를 줄일 수 있고, CSS만으로 다양한 레이아웃을 구현할 수 있다.  

`flexbox를 만드는 방법은 간단하다. 정렬하려는 요소의 부모 요소에 다음과 같이 display: flex 속성을 선언하면 된다.` 
```css
.flex_container {
  display: flex;
}
```

### 부모 요소와 자식 요소에 정의하는 속성 구분
flexbox에서 사용하는 속성은 부모 요소인 flex container에 정의하는 속성과 자식 요소인 flex item에 정의하는 속성으로 나누어진다.  
전체적인 정렬이나 흐름에 관련된 속성은 flex container에 정의하고, 자식 요소의 크기나 순서에 관련된 속성은 flex item에 정의한다.   
이를 분리해 적용하는 것이 중요하다.  
- flex container 속성:  
    - flex-direction
    - flex-wrap
    - justify-content
    - align-items
    - align-content
- flex item 속성: 
    - flex
    - flex-grow
    - flex-shrink
    - flex-basis
    - order  

-----

- flex-direction 으로 수평(row), 수직(column) 방향 정렬 설정  
  
- `flex: 1 1 0` 속성은 `flex-grow: 1 속성과 flex-shrink: 1 속성, flex-basis: 0 속성을 줄인 표현`  
  
- `flex item을 수평으로 배치`할 때 다음과 같이 'auto' 속성값을 사용할 수 있다.  
  - margin-right: auto: 바깥 여백이 오른쪽의 모든 공간을 차지하기 위해 flex item을 오른쪽에서 왼쪽으로 민다.
  - margin: 0 auto: 바깥 여백이 flex item을 양쪽에서 밀기 때문에 flex item이 수평 중앙에 위치한다.
  - margin-left: auto: 바깥 여백이 왼쪽의 모든 공간을 차지하기 위해 flex item을 왼쪽에서 오른쪽으로 민다.

- `flex item을 수직으로 배치`할 때 다음과 같이 'auto' 속성값을 사용할 수 있다.
  - margin-bottom: auto: 바깥 여백이 아래쪽의 모든 공간을 차지하기 위해 flex item을 아래쪽에서 위쪽으로 민다.
  - margin: auto 0: 바깥 여백이 flex item을 위아래로 밀기 때문에 flex item이 수직 중앙에 위치한다.
  - margin-top: auto: 바깥 여백이 위쪽의 모든 공간을 차지하기 위해 flex item을 위쪽에서 아래쪽으로 민다.

- justify-content 속성은 주축을 기준으로 `flex item을 수평으로 정렬`
  - flex-start(기본값): 주축의 시작 부분을 기준으로 flex item을 정렬한다.
  - center: 주축의 중앙을 기준으로 flex item을 정렬한다.
  - flex-end: 주축의 끝부분을 기준으로 flex item을 정렬한다.
  - space-around: 주축을 기준으로 flex item을 일정한 간격으로 정렬한다.
  - space-between: 첫 번째와 마지막 flex item은 주축의 시작 부분과 끝부분에 정렬하고 나머지 flex item을 일정한 간격으로 정렬한다.  

- align-items 속성은 주축을 기준으로 `flex item을 수직으로 정렬`  
  - stretch(기본값): flex item의 높이를 늘려 flex container의 전체 높이를 채운다.
  - flex-start: 교차축의 시작 부분을 기준으로 flex item을 정렬한다.
  - center: 교차축의 중앙을 기준으로 flex item을 정렬한다.
  - baseline: 글꼴의 기준선인 baseline을 기준으로 flex item을 정렬한다.
  - flex-end: 교차축의 끝부분을 기준으로 flex item을 정렬한다.

