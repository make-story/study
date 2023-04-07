# 렌더링 속도를 올리기 위한 성능 최적화 방법 - 실전 리액트 프로그래밍 책 내용 중

리액트에서 최초 렌더링 이후에는 데이터 변경 시 렌더링을 하는데,  
이 때 다음과 같은 단계를 거친다.

1. 이전 렌더링 결과를 재사용할 지 판단한다.
2. 컴포넌트 함수를 호출한다.
3. 가상 돔끼리 비교해서 변경된 부분만 실제 돔에 반영한다.

- 평상시에는 성능 최적화를 고민하지 말고 편하게 코딩하기를 바란다. 대부분의 웹 페이지는 성능을 고민하지 않아도 문제없이 잘 돌아간다. 성능 이슈가 생기면 그때 고민해도 늦지 않다. (실전 리액트 프로그래밍 책 내용 중)

---

# React.memo 로 렌더링 결과 재사용하기

https://ko.reactjs.org/docs/react-api.html#reactmemo

컴포넌트의 속성값이나 상태값이 변경되면 리액트는 그 컴포넌트를 다시 그릴 준비를 한다.  
만약 React.memo 함수로 감싼 컴포넌트라면 속성값 비교 함수가 호출된다.  
이 함수는 이전 이후 속성값을 매개변수로 받아서 참 또는 거짓을 반환한다.  
참을 반환하면 렌더링을 멈추고, 거짓을 반환하면 컴포넌트 함수를 실행해서 가상 돔을 업데이트한 후 변경된 부분만 실제 돔에 반영한다.

## 속성값을 불변 객체로 관리했을 때 변경 여부 확인하기

```javascript
prevProps.todos !== nextProps.todos;
```

속성값을 불변 객체로 관리했다면 이전 이후 값의 단순 비교만으로 컴포넌트의 속성값이 변경되었는지 알 수 있다.  
따라서 속성값을 불변 객체로 관리하면 렌더링 성능에 큰 도움이 된다.

## 공식 가이드 참고

https://ko.reactjs.org/docs/react-api.html#reactmemo

```javascript
const MyComponent = React.memo(function MyComponent(props) {
  /* props를 사용하여 렌더링 */
});
```

컴포넌트가 `동일한 props로 동일한 결과를 렌더링`해낸다면,  
`React.memo를 호출하고 결과를 메모이징(Memoizing)`하도록 래핑하여 경우에 따라 성능 향상을 누릴 수 있습니다.  
즉, React는 컴포넌트를 렌더링하지 않고 마지막으로 렌더링된 결과를 재사용합니다.

`React.memo는 props 변화에만 영향을 줍니다.`  
React.memo로 감싸진 함수 컴포넌트 구현에 useState, useReducer 또는 useContext 훅을 사용한다면,  
여전히 state나 context가 변할 때 다시 렌더링됩니다.

---

# useCallback

컴포넌트가 렌더링될 때마다 `새로운 함수를 생성해서 자식 컴포넌트의 속성값으로 입력하는 경우`가 많다.  
리액트 팀에서는 최근의 브라우저에서 함수 생성이 성능에 미치는 영향은 적다고 주장한다.(실전 리액트 프로그래밍 책 내용중)  
그보다는 `속성값이 매번 변경되기 때문에 자식 컴포넌트에서 React.memo를 사용해도 불필요한 렌더링이 발생한다는 문제점`이 있다.  
리액트에서는 `이 문제를 해결하기 위해 useCallback 훅을 제공`한다.

```javascript
import React, { useCallback, useState } from 'react';

const fetchServer = (name, age) => {
  // api 통신
};
const UserEdit = ({ onSave, setName, setAge }) => {
  return <div></div>;
};

export const TestUseCallback = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState(0);

  // useMemo Hook 은 로다시 같은 라이브러리에서 제공해 주는 메모이제이션과 비슷하다.
  // 반면에 useCallback은 리액트의 렌더링 성능을 위해 제공되는 Hook 이다.
  // 컴포넌트가 렌더링될 때마다 새로운 함수를 생성해서 자식 컴포넌트의 속성 값으로 입력하는 경우가 많다.
  // 리액트 팀에서는 최근의 브라우저에서 함수 생성이 성능에 미치는 영향은 적다고 주장한다.
  // 그보다는 속성값이 매번 변경되기 때문에 자식 컴포넌트에서 React.memo 를 사용해도 불필요한 렌더링(새롭게 생성된 함수에 따른 props 변경발생)이 발행한다는 문제점이 있다.

  // useCallback Hook 이 필요한 예
  // 현재 컴포넌트가 렌더링 될 때마다 UserEdit 컴포넌트의 onSave 속성값으로 새로운 함수가 입력된다.
  // 따라서 UserEdit 컴포넌트에서 React.memo 를 사용해도 onSave 속성값이 항상 변경되고 그 때문에 불필요한 렌더링이 발생한다.
  // useCallback Hook 을 사용하면 불필요한 렌더링을 막을 수 있다.
  const onSave = useCallback(() => fetchServer(name, age), [name, age]);

  return (
    <div>
      <p>{`name is ${name}`}</p>
      <p>{`age is ${age}`}</p>
      <UserEdit
        //onSave={()=>fetchServer(name, age)} // 일반적인 경우 - 현재 컴포넌트 렌더링시 마다 함수가 새로 생성되며, UserEdit 재렌더링 발생됨
        onSave={onSave} // useCallback 사용한 경우 - 현재 컴포넌트 렌더링시 마다 새로운 함수를 생성하지 않음. onSave 속성값으로 항상 같은 함수가 전달됨.
        setName={setName}
        setAge={setAge}
      />
    </div>
  );
};
```

# useMemo

```javascript
import React, { useMemo } from 'react';

const getExpensiveJob = (value1, value2) => {
  return '복잡한 계산의 결과값';
};

export const TestUseMemo = ({ value1, value2 }) => {
  // useMemo Hook 은 계산량이 많은 함수의 반환값을 재활용하는 용도로 사용된다.
  // useMemo Hook 의 첫 번째 매개변수로 함수를 입력한다. useMemo Hook 은 이 함수가 반환한 값을 기억한다.
  // useMemo Hook 의 두 번째 매개변수는 의존성 배열이다. 의존성 배열이 변경되지 않으면 이전에 반환된 값을 재사용한다.
  const value = useMemo(() => getExpensiveJob(value1, value2), [value1, value2]);
  return <p>{`value is ${value}`}</p>;
};
```

---

# useSelector 최적화

> https://blog.woolta.com/categories/1/posts/200

- `방법1) 독립 선언`  
  각각의 값을 독립적으로 선언하게 되면 이에대한 상태변경여부를 파악할수 있어 상태가 최적화

```typescript
const { gift, onlineProducts, loading } = useSelector(({ gift, dialog, loading }: RootState) => ({
  gift,
  onlineProducts: gift?.onlineProducts,
  loading: loading[giftActionType.GET_ONLINE_PRODUCTS_REVIEW_TYPE],
}));
```

```typescript
const { count, prevCount } = useSelector((state: RootState) => ({
  count: state.countReducer.count,
  prevCount: state.countReducer.prevCount,
}));
```

```typescript
// 최적화
const count = useSelector((state: RootState) => state.countReducer.count);
const prevCount = useSelector((state: RootState) => state.countReducer.prevCount);
```

- `방법2) equalityFn`  
  useSelector 에는 선택옵션으로 equalityFn 라는 파리미터가 존재  
  equalityFn 는 이전 값(prev)과 다음 값(next)을 비교하여 true가 나오면 다시 렌더링을 하지 않고 false가 나오면 렌더링을 진행

```typescript
const { count, prevCount } = useSelector(
  (state: RootState) => ({
    count: state.countReducer.count,
    prevCount: state.countReducer.prevCount,
  }),
  // 이전 값(prev)과 다음 값(next)을 비교
  (prev, next) => {
    return prev.count === next.count && prev.prevCount === next.prevCount;
  },
);
```

- `방법3) shallowEqual`  
  shallowEqual 함수는 selector로 선언한 값의 최상위 값들의 비교여부를 대신 작업

```typescript
import { useSelector, useDispatch, shallowEqual } from 'react-redux';

const { count, prevCount } = useSelector(
  (state: RootState) => ({
    count: state.countReducer.count,
    prevCount: state.countReducer.prevCount,
  }),
  shallowEqual,
);
```

useSelector 의 두번째 파라미터는 equalityFn  
shallowEqual은 react-redux에 내장되어있는 함수로서, 객체 안의 가장 겉에 있는 값들을 모두 비교

---

# React.lazy 및 서스펜스(Suspense) 를 사용한 코드 분할

https://ko.reactjs.org/docs/code-splitting.html
https://web.dev/code-splitting-suspense/?utm_source=lighthouse&utm_medium=lr

1. 코드 분할을 도입하는 가장 좋은 방법은 동적 import() 문법을 사용하는 방법

```javascript
import('./math').then(math => {
  console.log(math.add(16, 26));
});
```

Webpack이 이 구문을 만나게 되면 앱의 코드를 분할

2. React.lazy 함수를 사용하면 동적 import를 사용해서 컴포넌트를 렌더링

`Suspense는 아직 렌더링이 준비되지 않은 컴포넌트가 있을때, 로딩 화면을 보여주고 로딩이 완료되면 해당 컴포넌트를 보여주는 React에 내장되어 있는 기능`
https://ko.reactjs.org/docs/react-api.html#reactsuspense

```javascript
const OtherComponent = React.lazy(() => import('./OtherComponent'));
```

```javascript
import React, { Suspense } from 'react';
import Tabs from './Tabs';
import Glimmer from './Glimmer';

const Comments = React.lazy(() => import('./Comments'));
const Photos = React.lazy(() => import('./Photos'));

function MyComponent() {
  const [tab, setTab] = React.useState('photos');

  function handleTabSelect(tab) {
    setTab(tab);
  }

  return (
    <div>
      <Tabs onTabSelect={handleTabSelect} />
      <Suspense fallback={<Glimmer />}>{tab === 'photos' ? <Photos /> : <Comments />}</Suspense>
    </div>
  );
}
```

React.lazy는 동적 import()를 호출하는 함수를 인자로 가집니다.

lazy 컴포넌트는 Suspense 컴포넌트 하위에서 렌더링되어야 하며,  
Suspense는 lazy 컴포넌트가 로드되길 기다리는 동안 로딩 화면과 같은 예비 컨텐츠를 보여줄 수 있게 해줍니다.

3. Route-based code splitting

React.lazy를 React Router 라이브러리를 사용해서 애플리케이션에 라우트 기반 코드 분할을 설정하는 예시입니다.

```javascript
import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const Home = lazy(() => import('./routes/Home'));
const About = lazy(() => import('./routes/About'));

const App = () => (
  <Router>
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
      </Routes>
    </Suspense>
  </Router>
);
```

---

# Next.js 스트리밍 및 서스펜스(Suspense)

https://beta.nextjs.org/docs/data-fetching/streaming-and-suspense
https://beta.reactjs.org/apis/react/Suspense

https://stackoverflow.com/questions/69433673/nextjs-reactdomserver-does-not-yet-support-suspense
Next js 12 이하 버전에서는 Suspense를 지원하지 않음

## `Error: ReactDOMServer does not yet support Suspense.` 에러 원인

https://velog.io/@devstone/React-Error-ReactDOMServer-does-not-yet-support-Suspense
React로 SSR을 구현하기 위해 사용한 ReactDOMServer.renderToString 에서 Suspense 컴포넌트를 지원하지 않았기 때문

SSRCompatibleSuspense.jsx

```javascript
import React, { Suspense } from 'react';
import useMounted from 'hooks/useMounted';

export default function SSRCompatibleSuspense(props) {
  const isMounted = useMounted();

  if (isMounted) {
    return <Suspense {...props} />;
  }
  return <>{props.fallback}</>;
}
```

useMounted.js

```javascript
import React from 'react';

function useMounted() {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  return mounted;
}

export default useMounted;
```

AsyncTest.jsx

```javascript
import React, { useState } from 'react';
import styles from './style.scss';
import GetData from './components/GetData';
import ErrorBoundary from './asyncHandler/ErrorBoundary';
import ErrorComponent from './asyncHandler/ErrorComponent';
import LoadingComponent from './asyncHandler/LoadingComponent';
import SSRCompatibleSuspense from './asyncHandler/SSRCompatibleSuspense';

function AsyncTest() {
  return (
    <ErrorBoundary renderFallback={({ error }) => <ErrorComponent error={error} />} resetKey={resetKey}>
      <SSRCompatibleSuspense fallback={<LoadingComponent />}>
        <GetData />
      </SSRCompatibleSuspense>
    </ErrorBoundary>
  );
}

export default AsyncTest;
```

---

# loadable 라이브러리

https://loadable-components.com/docs/getting-started/

```javascript
import loadable from '@loadable/component';
const OtherComponent = loadable(() => import('./OtherComponent'));
function MyComponent() {
  return (
    <div>
      <OtherComponent />
    </div>
  );
}
```

---
