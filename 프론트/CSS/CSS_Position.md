https://medium.com/%EC%98%A4%EB%8A%98%EC%9D%98-%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%B0%8D/css-position-%EC%97%90-%EB%8C%80%ED%95%B4-%EC%95%8C%EC%95%84%EB%B3%B4%EC%95%98%EB%8B%A4-8514107d7fa5

# Containing Block, CB

https://www.w3.org/TR/CSS2/visudet.html#containing-block-details  
https://developer.mozilla.org/en-US/docs/Web/CSS/Containing_block

CSS 에서 말하는 Containing Block, CB 는 특정한 가상의 영역을 가리키는데, 이는 어떤 엘리먼트의 자식 엘리먼트들이 위치나 크기 등을 결정지을 때 기준으로 사용할 참고 지표가 된다.
즉, 흔히 말하는 `부모 엘리먼트를 의미`한다.

- fixed 는 항상 viewport 의 CB 를 참조
- absolute 는 부모 엘리먼트부터 최상위 root 엘리먼트 중 현재 엘리먼트에서 position 이 static 이 아닌 가장 가까운 엘리먼트의 CB 를 참조
- relative 는 현재 엘리먼트가 속한 DOM flow 의 흐름에서, 자기 자신의 CB 의 왼쪽 상단 꼭지점을 (0, 0) 좌표로 인식
- sticky 는 부모 엘리먼트 중 scroll 이 있는 엘리먼트의 CB 를 참조
