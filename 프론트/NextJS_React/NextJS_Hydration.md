# hydrate, hydration

https://helloinyong.tistory.com/315

화면에 보여줄 document 페이지를 서버 단에서 먼저 렌더링 후 브라우저로 전송한 뒤,  
이후에 해당 DOM 요소에 필요로 한 Script 코드들을 바로 브라우저로 전송한다.  
그리고 각 DOM 요소와 Script 코드가 매칭이 되면서 정상적으로 웹 페이지가 동작하게 된다.

1. Next.js는 클라이언트에게 웹 페이지를 보내기 전에 Server Side 단에서 미리 웹 페이지를 Pre-Rendering 한다.
   그리고 Pre-Redering으로 인해 생성된 HTML document를 클라이언트에게 전송한다.  
   현재 클라이언트가 받은 웹 페이지는 단순히 웹 화면만 보여주는 HTML일 뿐이고, 자바스크립트 요소들이 하나도 없는 상태이다.

2. Next.js Server에서는 Pre-Rendering된 웹 페이지를 클라이언트에게 보내고 나서, 바로 리액트가 번들링 된 자바스크립트 코드들을 클라이언트에게 전송한다.  
   그리고 이 자바스크립트 코드들이 이전에 보내진 HTML DOM 요소 위에서 한번 더 렌더링을 하면서, 각자 자기 자리를 찾아가며 매칭이 된다.

## dehydrate와 hydrate

https://seogeurim.tistory.com/19

서버 사이드에서 먼저 정적인 페이지(HTML)를 렌더링하고,  
클라이언트에서 HTML을 받아오고,  
JS 코드가 모두 로드되면,  
이 HTML에 이벤트 핸들러 등을 붙여 동적인 페이지를 만드는 과정을 hydration 이라 말한다.
hydration을 직역하면 '수분 공급'이라는 뜻인데, 즉 건조한 HTML에 수분(인터랙션, 이벤트 핸들러 등)을 공급하여 동적인 페이지를 만들어나가는 과정을 말한다.

# Next.js pre-rendering 정리

https://nextjs.org/docs/basic-features/pages#pre-rendering

https://helloinyong.tistory.com/306

---

# 이슈

## Router 통해 이동 시 Hydrate가 첫번째 렌더링 후에 실행되는 문제

next-redux-wrapper v6에는 [컴포넌트가 마운트 된 후 hydrate action이 발생하는 문제](https://github.com/kirill-konshin/next-redux-wrapper/issues/280)를 가지고 있다.

| Page Lifecycle       | v6      | v7 (fixed) |
| -------------------- | ------- | ---------- |
| constructor          |         | hydrate    |
| render               |         |            |
| componentDidMount    | hydrate |            |
| componentWillUnmount |         |            |

v6에서는 hydrate 액션이 실행되는 시점이 componentDidMount로, 이때문에 SSR의 State가 클라이언트의 첫 렌더링 시점에 화면에 반영되지 않는 문제가 발생한다. 이로인해 각종 오류처리에 문제가 생길 수 있다.

예를 들면, 라우터를 통해 상품상세 진입시 오류 등이 이에 해당한다. 또한 withLoggedIn등 클라이언트의 방어코드가 제대로 동작하지 않을 수 있다.

이는 [v7에서 fix](https://github.com/kirill-konshin/next-redux-wrapper/pull/295)되었고, 따라서 v7 이상으로 업데이트 하면 해결이 된다.

현재시점 최신 버전은 v8이지만, v8은 스토어 생성 방식이 크게 달라짐에 따라, 현재 직시 적용해볼 수 있는 v7을 우선 적용하기로 한다.

## hydration 스타일 이슈

https://fourwingsy.medium.com/next-js-hydration-%EC%8A%A4%ED%83%80%EC%9D%BC-%EC%9D%B4%EC%8A%88-%ED%94%BC%ED%95%B4%EA%B0%80%EA%B8%B0-988ce0d939e7
