# 비즈니스 로직

코딩컨벤션

`study.git/구조화_표준화_체계화_프로세스화/가이드_비즈니스_로직.md` 참고!

- 추천방법1:

  - 댄 아브라모프(Dan Abramov)의 프레젠테이션(Presentational), 컨테이너(Container, 비즈니스로직) 컴포넌트로 분리
    - 특정 컨테이너 내부 여러 컴포넌트에서의 공통 비즈니스 로직
      - 이벤트 처리, 데이터 호출, 데이터 가공 등
    - https://patterns-dev-kr.github.io/design-patterns/container-presentational-pattern/

- 추천방법2:

  - useXXX 사용자 Hooks 로 분리
    - 여러 컨테이너 또는 여러 컴포넌트에서의 공통 비즈니스 로직
      - 이벤트 처리, 데이터 호출, 데이터 가공 등
  - https://usehooks.com/
  - https://github.com/streamich/react-use
  - https://usehooks-ts.com/
  - https://blog.bitsrc.io/11-useful-custom-react-hooks-for-your-next-app-c66307cf0f0c

- 추천방법3:

  - withXXX 고차 컴포넌트(HOC)로 분리 (사용자 Hook 방식을 우선 고민)
    - 전반적으로 재사용 가능한 로직을 prop으로 컴포넌트에게 제공
    - 또는 특정 컨테이너 또는 컴포넌트 실행을 위한 선행조건 적용
    - 리액트 공식페이지 참고 (내용 중, 기존 믹스인 방식의 어려움)
      - https://reactjs-kr.firebaseapp.com/docs/higher-order-components.html
      - https://patterns-dev-kr.github.io/design-patterns/hoc-pattern/

- 추천방법4:

  - GraphQL 서버에서 작업
    - 데이터 호출이 동기적으로 필요할 때
    - 매쉬업이 필요할 때

- RSC(React Server Component):

  - Next.js "/app" 폴더 내부에는 RSC 관련 코드(서버단 Fetch, 서버단 렌더 프레젠테이션 컴포넌트) 외 비즈니스 로직 존재 불가
  - https://nextjs.org/docs/app/building-your-application/routing#component-hierarchy

## 관심사 분리를 위한 프레젠테이션(Presentational), 컨테이너(Container) 컴포넌트 구분하기

https://www.patterns.dev/posts/presentational-container-pattern/

댄 아브라모프(Dan Abramov)의 블로그 포스트로 잘 알려진 컴포넌트 구분법이 있다.  
UI 처리, API 호출, DB 관리 등의 코드가 같은 곳에 있으면 복잡하기 때문에 이들은 서로 관심사가 다르다로 보고 분리해서 관리하는 게 좋다.

프레젠테이션 컴포넌트의 정의는 다음과 같다.

- 비즈니스 로직이 없다.
- 상태값이 없다. 단, 마우스 오버(mouse over)와 같은 UI효과를 위한 상태값은 제외한다.

### `Presentational 컴포넌트에서 전역상태 접근 가능할까?`

https://lunit.gitbook.io/redux-in-korean/basics/usagewithreact#presentational-container

|                      | Presentational 컴포넌트           | Container 컴포넌트                                |
| -------------------- | --------------------------------- | ------------------------------------------------- |
| 목적                 | 어떻게 보여질 지 (마크업, 스타일) | 어떻게 동작할 지 (데이터 불러오기, 상태 변경하기) |
| Redux와 연관됨       | 아니오                            | 예                                                |
| 데이터를 읽기 위해   | props에서 데이터를 읽음           | Redux 상태를 구독                                 |
| 데이터를 바꾸기 위해 | props에서 콜백을 호출             | Redux 액션을 보냄                                 |

### `Presentational & Container 분리는 이제 그만?`

Dan Abramov  
https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0

```javascript
export default function ShopProducts() {
  const loading = useSelector(state => state.shop.loading);
  const products = useSelector(state => state.shop.products);
  const dispatch = useDispatch();

  useEffect(() => {
    // products 조회 로직 ...
  }, [dispatch]);
  const onPurchase = product => {
    /* 결제 로직 ... */
  };

  return <div>{/* UI ... */}</div>;
}
```

## `useHook 사용` MVVM 모델

https://www.youtube.com/watch?v=bjVAVm3t5cQ

- 컨테이너에는 useHook(사용자훅) 을 import
- useHook(사용자훅) 내부에서는 API Fetch 및 데이터 가공하여 제공
- 컨테이너는 useHook(사용자훅) 상태를 하위 View 에 제공

## 컴포지션 (합성, Composition)

리액트 공식 페이지 글  
`React는 강력한 합성 모델을 가지고 있으며, 상속 대신 합성을 사용하여 컴포넌트 간에 코드를 재사용하는 것이 좋습니다.`

https://ko.legacy.reactjs.org/docs/composition-vs-inheritance.html

children prop을 사용하여 자식 엘리먼트를 출력에 그대로 전달하는 것이 좋습니다.

```jsx
function FancyBorder(props) {
  return (
    <div className={'FancyBorder FancyBorder-' + props.color}>
      {props.children}
    </div>
  );
}
```

```jsx
function WelcomeDialog() {
  return (
    <FancyBorder color='blue'>
      <h1 className='Dialog-title'>Welcome</h1>
      <p className='Dialog-message'>Thank you for visiting our spacecraft!</p>
    </FancyBorder>
  );
}
```

또는

```jsx
function SplitPane(props) {
  return (
    <div className='SplitPane'>
      <div className='SplitPane-left'>{props.left}</div>
      <div className='SplitPane-right'>{props.right}</div>
    </div>
  );
}

function App() {
  return <SplitPane left={<Contacts />} right={<Chat />} />;
}
```

---

## Module Pattern

https://www.patterns.dev/posts/module-pattern/

---

## Hooks Pattern

https://www.patterns.dev/posts/hooks-pattern/

```javascript
function useKeyPress(targetKey) {
  const [keyPressed, setKeyPressed] = React.useState(false);

  function handleDown({ key }) {
    if (key === targetKey) {
      setKeyPressed(true);
    }
  }

  function handleUp({ key }) {
    if (key === targetKey) {
      setKeyPressed(false);
    }
  }

  React.useEffect(() => {
    window.addEventListener('keydown', handleDown);
    window.addEventListener('keyup', handleUp);

    return () => {
      window.removeEventListener('keydown', handleDown);
      window.removeEventListener('keyup', handleUp);
    };
  }, []);

  return keyPressed;
}
```

---

# 공통 로직

## 개인적 생각: 하위 여러 컴포넌트에 적용시킬 공통 로직

```javascript
// CommonLogic.jsx
import React, { useEffect } from 'react';

const CommonLogic = ({ children }) => {
  // 공통 실행 로직
  useEffect(() => {
    // ...
  }, []);

  return (
    <>
      <div>공통적용 UI</div>
      {children}
    </>
  );
};

export default CommonLogic;
```

```javascript
// index.jsx
import React from 'react';
import CommonLogic from '@/CommonLogic';

const Index = () => {
  return (
    <CommonLogic>
      <div>UI</div>
    </CommonLogic>
  );
};

export default Index;
```

---

# 사용자 정의 훅과 고차 컴포넌트 중 무엇을 써야 할까? `모던 리액트 Deep Dive` 책 내용 중 - p239

리액트에서는 재활용할 수 있는 로직을 관리할 수 있는 두 가지 방법이 있다.  
사용자 정의 훅(custom hook) 과 고차 컴포넌트(higher order component) 다.

## 사용자 정의 훅

서로 다른 컴포넌트 내부에서 같은 로직을 공유하고자 할 때 주로 사용되는 것이 바로 사용자 정의 훅이다.

이 사용자 정의 훅의 규칙 중 하나는 이름이 반드시 use 로 시작하는 함수를 만들어야 한다는 것이다.  
리액트 훅의 이름은 use 로 시작한다는 규칙이 있으며, 사용자 정의 훅도 이러한 규칙을 준수함으로써 개발 시 해당 함수가 리액트 훅이라는 것을 바로 인식할 수 있다는 장점도 있다.

유명한 저장소

- use-Hooks
- react-use
- ahooks

## 고차 컴포넌트

고차 컴포넌트(HOC, Higher Order Component) 는 컴포넌트 자체의 로직을 재활용하기 위한 방법이다.  
사용자 정의 훅은 리액트 훅을 기반으로 하므로 리액트에서만 사용할 수 있는 기술이지만 고차 컴포넌트는 고차 함수(Higher Order Function) 의 일종으로,  
자바스크립트의 일급 객체, 함수의 특징을 이용하므로 굳이 리액트가 아니더라도 자바스크립트 환경에서 널리 쓰일 수 있다.

- 일급 객체
  일급 객체는 함수의 인자로 넘겨받을 수도 있으며, 함수의 결과값으로 리턴할 수도 있고, 변수에 값을 할당할 수도 있다는 것을 말한다.

리액트에서 가장 유명한 고차 컴포넌트는 리액트에서 제공하는 API 중 하나인 React.memo 다.

고차 함수의 사전적인 정의를 살펴보면 '함수를 인자로 받거나 결과로 반환하는 함수'라고 정의돼 있다.

## 사용자 정의 훅과 고차 컴포넌트 중 무엇을 써야 할까? - p249

### 사용자 정의 훅이 필요한 경우

단순히 useEffect, useState 와 같이 리액트에서 제공하는 훅으로만 공통 로직을 격리할 수 있다면 사용자 정의 훅을 사용하는 것이 좋다.  
사용자 정의 훅은 그 자체로는 렌더링에 영향을 미치지 못하기 때문에 사용이 제한적이므로 반환하는 값을 바탕으로 무엇을 할지는 개발자에게 달려 있다.  
따라서 컴포넌트 내부에 미치는 영향을 최소화해 개발자가 훅을 원하는 방향으로만 사용할 수 있다는 장점이 있다.

```jsx
// 사용자 정의 훅을 사용하는 경우
function HookComponent() {
  const { loggedIn } = useLogin();

  useEffect(() => {
    if (!loggedIn) {
      // ...
    }
  }, [loggedIn]);
}

// 고차 컴포넌트를 사용하는 경우
const HOCComponent = withLoginComponent(() => {
  // ...
});
```

로그인 정보를 가지고 있는 훅인 useLogin 은 단순히 loggedIn 에 대한 값만 제공할 뿐, 이에 대한 처리는 사용하는 쪽에서 원하는 대로 사용 가능하다.  
따라서 부수 효과가 비교적 제한적이라고 볼 수 있다.

반면 withLoginComponent 는 고차컴포넌트가 어떤일을 하는지, 어떤 결과물을 반환할지는 고차 컴포넌트를 직접 보거나 실행하기 전까지는 알 수 없다.  
대부분의 고차 컴포넌트는 렌더링에 영향을 미치는 로직이 존재 하므로 사용자 정의 훅에 비해 예측하기가 어렵다.  
따라서 `단순히 컴포넌트 전반에 걸쳐 동일한 로직으로 값을 제공하거나 특정한 훅의 작동을 취하게 하고 싶다면 사용자 정의 훅을 사용하는 것이 좋다.`

### 고차 컴포넌트를 사용하는 경우

만약 로그인되지 않은 어떤 사용자가 컴포넌트에 접근하려 할 때 애플리케이션 관점에서 컴포넌트를 감추고 로그인을 요구하는 공통 컴포넌트를 노출하는 것이 좋을 수 있다.  
혹은 에러 바운더리와 비슷하게 특정 에러가 발생했을 때 현재 컴포넌트 대신 에러가 발생했음을 알릴 수 있는 컴포넌트를 노출하는 경우도 있을 것이다.

`함수형 컴포넌트의 반환값, 즉 렌더링의 결과물에도 영향을 미치는 공통 로직이라면 고차 컴포넌트를 사용하자.`  
고차 컴포넌트는 이처럼 공통화된 렌더링 로직을 처리하기에 매우 훌륭한 방법이다.  
물론 앞서 이야기한 것처럼 고차 컴포넌트가 많아질수록 복잡성이 기하급수적으로 증가하므로 신중하게 사용해야 한다.
