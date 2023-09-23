# 하이드레이션 (hydrate, hydration)

`https://velog.io/@leehyunho2001/Hydrate`

https://helloinyong.tistory.com/315

화면에 보여줄 document 페이지를 서버 단에서 먼저 렌더링 후 브라우저로 전송한 뒤,  
이후에 해당 DOM 요소에 필요로 한 Script 코드들을 바로 브라우저로 전송한다.  
그리고 각 DOM 요소와 Script 코드가 매칭이 되면서 정상적으로 웹 페이지가 동작하게 된다.

1. Next.js는 클라이언트에게 웹 페이지를 보내기 전에 Server Side 단에서 미리 웹 페이지를 Pre-Rendering 한다.
   그리고 Pre-Redering으로 인해 생성된 HTML document를 클라이언트에게 전송한다.  
   현재 클라이언트가 받은 웹 페이지는 단순히 웹 화면만 보여주는 HTML일 뿐이고, 자바스크립트 요소들이 하나도 없는 상태이다.

2. Next.js Server에서는 Pre-Rendering된 웹 페이지를 클라이언트에게 보내고 나서, 바로 리액트가 번들링 된 자바스크립트 코드들을 클라이언트에게 전송한다.  
   그리고 이 자바스크립트 코드들이 이전에 보내진 HTML DOM 요소 위에서 한번 더 렌더링을 하면서, 각자 자기 자리를 찾아가며 매칭이 된다.

## "타입스크립트, 리액트, Next.js 로 배우는 실전 웹애플리케이션 개발" 책 내용 중...

SSR, SSG 에서는 리액트 컴포넌트의 렌더링은 브라우저에 반환되기 전, 즉 서버 사이드에서 실행됩니다.  
클라이언트 측에서는 인터랙티브한 리액트 애플리케이션으로서 작동하도록 하기 위해 서버 측에서 미리 생성된 정적인 HTML 을 다운로드한 뒤, 동적인 리액트 컴포넌트로 복원합니다.

그 프로세스를 하이드레이션(Hydration)이라 부릅니다. 수분 공급이라는 의미를 가진 용어입니다. 일단 리액트 컴포넌트로써 전개되어 정적으로 된 것을 동적인 것으로 되돌린다는 이미지에서, 수분을 공급한다는 형태를 연상할 수 있어 이런 용어를 사용합니다.

SSR/SSG 로 미리 생성된 HTML 이 브라우저에 로딩되면 즉시 화면에 UI가 표시됩니다.

한편, 하이드레이션을 하려면 자바스크립트를 로딩해야 합니다. 따라서 페이지 초기화 시 HTML 표시와 자바스크립트 실행 시점에 차이가 발생하는 점에 주의해야 합니다.  
하이드레이션을 제공하지 않는 순수한 SPA 의 경우, 자바스크립트 로딩이 완료될 때까지 화면에는 아무것도 표시되지 않는 상태가 됩니다. 그에 비해 하이드레이션을 제공하면 사용자 경험이 그만큼 좋아집니다.

하이드레이션 실행은 ReactDOM 이라는 모듈의 hydeate() 라는 API 로 제공됩니다.

https://ko.reactjs.org/docs/react-dom.html#hydrate  
https://react.dev/reference/react-dom/hydrate

## 하이드레이션 에러 관련

https://nextjs.org/docs/messages/react-hydration-error

## dehydrate 와 hydrate

https://seogeurim.tistory.com/19

서버 사이드에서 먼저 정적인 페이지(HTML)를 렌더링하고,  
클라이언트에서 HTML을 받아오고,  
JS 코드가 모두 로드되면,  
이 HTML에 이벤트 핸들러 등을 붙여 동적인 페이지를 만드는 과정을 hydration 이라 말한다.
hydration을 직역하면 '수분 공급'이라는 뜻인데, 즉 건조한 HTML에 수분(인터랙션, 이벤트 핸들러 등)을 공급하여 동적인 페이지를 만들어나가는 과정을 말한다.

---

# Hydration Mismatch

https://toss.tech/article/isomorphic-javascript

서버에서 생성한 HTML은 단순 마크업이므로 사용자 인터랙션이 불가능합니다.  
따라서 React 는 이벤트 리스너, 상태 관리와 같은 클라이언트 로직(JavaScript 빌드 파일)을 전달받고  
HTML과 통합하여 애플리케이션으로 작동할 수 있도록 합니다.  
이 과정을 Hydration 이라고 합니다.

여기서 주의깊게 봐야할 점은 로직 연결 과정입니다.  
React 는 요소(Element)와 로직 정보가 담긴 가상 DOM을 생성한 뒤, 이를 전달받은 HTML과 비교합니다.  
따라서, 서버와 클라이언트의 렌더링 결과가 같은 경우에만 Hydration 을 수행합니다.

예를 들어,
서버상에서 특정 변수의 값이 null 이였다면, 클라이언트로 전달된 HTML 에서도 해당 값은 null 이 되어야 합니다.

---
