
# flexbox
## flexbox로 만들 수 있는 10가지 레이아웃
https://d2.naver.com/helloworld/8540176   
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

