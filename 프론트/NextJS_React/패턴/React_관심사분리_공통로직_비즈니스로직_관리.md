# 비즈니스 로직

코딩컨벤션

`study.git/구조화_표준화_체계화_프로세스화/가이드_코딩스타일_JavaScript.md` 참고!

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
    - https://patterns-dev-kr.github.io/design-patterns/hoc-pattern/

- 추천방법4:

  - GraphQL 서버에서 작업
    - 데이터 호출이 동기적으로 필요할 때
    - 매쉬업이 필요할 때

## 관심사 분리를 위한 프레젠테이션(Presentational), 컨테이너(Container) 컴포넌트 구분하기

https://www.patterns.dev/posts/presentational-container-pattern/

댄 아브라모프(Dan Abramov)의 블로그 포스트로 잘 알려진 컴포넌트 구분법이 있다.  
UI 처리, API 호출, DB 관리 등의 코드가 같은 곳에 있으면 복잡하기 때문에 이들은 서로 관심사가 다르다로 보고 분리해서 관리하는 게 좋다.

프레젠테이션 컴포넌트의 정의는 다음과 같다.

- 비즈니스 로직이 없다.
- 상태값이 없다. 단, 마우스 오버(mouse over)와 같은 UI효과를 위한 상태값은 제외한다.

### Presentational & Container 분리는 이제 그만?

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
