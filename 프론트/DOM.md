# DOM은 정확히 무엇일까?

https://wit.nts-corp.com/2019/02/14/5522

## DOM은 HTML 문서에 대한 인터페이스입니다.

첫째로 뷰 포트에 무엇을 렌더링 할지 결정하기 위해 사용되며,  
둘째로는 페이지의 콘텐츠 및 구조, 그리고 스타일이 자바스크립트 프로그램에 의해 수정되기 위해 사용됩니다.  
DOM은 원본 HTML 문서 형태와 비슷하지만 몇 가지 차이점이 있습니다.

- 항상 유효한 HTML 형식입니다.
- 자바스크립트에 수정될 수 있는 동적 모델이어야 합니다.
- 가상 요소를 포함하지 않습니다. (Ex. ::after)
- 보이지 않는 요소를 포함합니다. (Ex. display: none)

## 참고 문서

MDN – DOM 소개  
https://developer.mozilla.org/ko/docs/Gecko_DOM_Reference/소개

NAVER D2 – 브라우저는 어떻게 동작하는가?  
https://d2.naver.com/helloworld/59361
