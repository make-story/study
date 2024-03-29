# 컨테이닝 블록, Containing Block, CB

https://www.w3.org/TR/CSS2/visudet.html#containing-block-details  
https://developer.mozilla.org/ko/docs/Web/CSS/Containing_block
https://medium.com/%EC%98%A4%EB%8A%98%EC%9D%98-%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%B0%8D/css-position-%EC%97%90-%EB%8C%80%ED%95%B4-%EC%95%8C%EC%95%84%EB%B3%B4%EC%95%98%EB%8B%A4-8514107d7fa5

요소의 크기와 위치는 컨테이닝 블록의 영향을 자주 받습니다.

CSS 에서 말하는 Containing Block, CB 는 특정한 가상의 영역을 가리키는데, 이는 어떤 엘리먼트의 자식 엘리먼트들이 위치나 크기 등을 결정지을 때 기준으로 사용할 참고 지표가 된다.
즉, 흔히 말하는 `부모 엘리먼트를 의미`한다.

## fixed

항상 viewport 의 CB 를 참조

## absolute

`부모 엘리먼트부터 최상위 root 엘리먼트 중 현재 엘리먼트에서 position 이 static 이 아닌 가장 가까운 엘리먼트의 CB 를 참조`

position 속성이 absolute 일 때 해당 요소는 배치 기준을 자신이 아닌 상위 요소에서 찾습니다.  
DOM 트리를 따라 올라가다가 position 속성이 static이 아닌 첫 번째 상위 요소가 해당 요소의 배치 기준으로 설정되는데요.  
만약에 해당 요소 상위에 position 속성이 static이 아닌 요소가 없다면, DOM 트리에 최상위에 있는 <body> 요소가 배치 기준이 됩니다.

## relative

현재 엘리먼트가 속한 DOM flow 의 흐름에서, 자기 자신의 CB 의 왼쪽 상단 꼭지점을 (0, 0) 좌표로 인식

relative로 설정하게 되면, 요소를 원래 위치에서 벗어나게 배치할 수 있게 됩니다.
요소를 원래 위치를 기준으로 상대적(relative)으로 배치해준다고 생각하시면 이해가 쉬울 것

## sticky

부모 엘리먼트 중 scroll 이 있는 엘리먼트의 CB 를 참조

## 컨테이닝 블록 식별

컨테이닝 블록의 식별 과정은 `position 속성`에 따라 완전히 달라집니다.

position 속성이 `static, relative, sticky` 중 하나이면,  
컨테이닝 블록은 가장 가까운 조상 블록 컨테이너(inline-block, block, list-item 등의 요소),  
또는 가장 가까우면서 서식 맥락을 형성하는 조상 요소(table, flex, grid, 아니면 블록 컨테이너 자기 자신)의 콘텐츠 영역 경계를 따라 형성됩니다.

position 속성이 `absolute`인 경우,  
컨테이닝 블록은 position 속성 값이 static이 아닌(fixed, absolute, relative, sticky) 가장 가까운 조상의 내부 여백 영역입니다.

position 속성이 `fixed` 인 경우,  
컨테이닝 블록은 뷰포트나 페이지 영역(페이지로 나뉘는 매체인 경우)입니다.

position 속성이 `absolute나 fixed` 인 경우,  
다음 조건 중 하나를 만족하는 가장 가까운 조상의 내부 여백 영역이 컨테이닝 블록이 될 수도 있습니다.

- transform이나 perspective (en-US) 속성이 none이 아님.
- will-change 속성이 transform이나 perspective임.
- filter 속성이 none임. (Firefox에선 will-change가 filter일 때도 적용)
- contain 속성이 paint임.

---

# position: sticky

스크롤 시에도 적용(설정)된 위치에 고정됨

---
