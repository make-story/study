# JavaScript 이슈 슈팅 (트러블슈팅, 이슈경험)

`study.git/크로스브라우징_이슈경험` 참고!

## Uncaught SyntaxError: Unexpected token '<'

https://stackoverflow.com/questions/3143698/uncaught-syntaxerror-unexpected-token

js 파일 경로가 잘못 들어가 있거나,  
js 파일내 JavaScript 코드가 아닌, HTML 을 반환하고 있을 경우 발생!

가장 발생하기 쉬운 예시는  
404 오류가 발생했을 때, 특정 에러페이지를 반환하는 HTML 페이지가 있고,  
JavaScript(js 파일) 경로가 잘못들어 갔을 때, 이 404 에러(HTML) 페이지가 반환되기 때문!

## IntersectionObserver

https://developer.mozilla.org/ko/docs/Web/API/IntersectionObserver

IntersectionObserver 사용할 경우,

`disconnect() 또는 unobserve() 꼭 할 것!`

또한, React / Vue 컴포넌트에서 활용할 경우,  
컴포넌트 노출 분기에 따라,  
IntersectionObserver 가 계속 실행될 수 있다.

- IntersectionObserver 존재하는 컴포넌트 렌더링
- 특정 조건에 따라 해당 컴포넌트 미노출
- 다시 조건에 따라 숨겼던 해당 컴포넌트 노출
- 위와 같이 `HTML 에서 IntersectionObserver 존재하는 컴포넌트가 노출(태그삽입)/미노출(태그제거) 되며, IntersectionObserver 의 isIntersecting 값이 조건에 따라 true 가 되면서 무한 반복 실행될 수 있음`
- 인피니티 스크롤 UI 같은 곳에서 사용 시 주의!
