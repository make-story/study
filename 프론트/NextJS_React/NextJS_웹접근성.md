# next-route-announcer

https://nuli.navercorp.com/community/forum

Next.js는 React-Router와 유사한 라우팅 기능이 내장되어 있어서, 페이지 폴더 내에 리액트 컴포넌트 파일을 작성하면 페이지로 인식합니다. 그 페이지에 접속하려면, 개발자가 만든 그 페이지 컴포넌트 파일명을 주소 파라미터로 입력하면 되지요.

Next.js는 이러한 라우팅 기능에 기존 React-Router와 다른 좋은 점이 하나 있는데, 페이지 로드 시, 타이틀을 지정했을 때, 스크린리더가 페이지 열림s을 인지할 수 있도록, aria-live로 알려주는 컴포넌트가 기본으로 적용되어 있다는 점입니다.

Next.js로 만들어진 페이지에 들어가서 렌더링된 태그를 뜯어보면 next-route-announcer라는 커스텀 태그가 있을 것입니다. 이 영역에서 스크린리더 사용자에게 페이지 변경을 안내하는 것이지요.
