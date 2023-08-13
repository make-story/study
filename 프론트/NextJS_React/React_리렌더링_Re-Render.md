# 리렌더링!

- state 가 바뀌었을 때
- props 가 바뀌었을 때
- 부모 컴포넌트가 렌더링 었을 때 하위 컴포넌트의 경우

---

# React 렌더링 최적화 기법

`https://leetrue-log.vercel.app/react-rendering`

## React.memo

React.memo 가 적용상태에서,
props 값이 객체(object, josn)이며,
객체의 형태(객체 구조)가 동일하나 객체의 주소가 변경된 새로운 객체라면  
리렌더가 일어난다.

즉, 값 형태의 props 를 받아서 내부에서 객체를 호출하는 형태로 가는 방법 등 고민이 필요함

## 반복문 고유값을 index 부여한 경우

React 공식문서에서는,  
React 에서 컴포넌트를 mapping 할 때는 unique 한 key 값을 주도록 권장된다.  
물론 각 배열의 index 값은 고유해보일 수도 있지만,  
배열이 추가되거나 삭제되는 등의 변형이 일어난다면 이 변화에 따라 하위 컴포넌트의 리렌더링이 발생할 수 있다.

index 를 이용해 key 값을 부여한 경우,  
`특정 값이 사라지면서 index가 다시 부여가 된다.`  
그렇기 때문에 `컴포넌트들의 key 값이 바뀜을 인지한 컴포넌트는 이에 따라 리렌더링이 발생`하게 된다.  
해당 컴포넌트의 값 자체가 바뀐 것도 없는데 key 값 때문에 리렌더링이 일어나는 것은 비효율적이다.

뿐만 아니라 반복적인 index 변경이 발생하게 되면 순간적으로 화면에서의 렌더링 오류가 발생해서 화면을 바라보는 유저로 하여금 혼란스러운 경험을 야기시킬 수도 있다.

반면에 `mapping 된 컴포넌트가 고유한 key 값을 가지고 있다면, 아무리 다른 요소가 삭제되거나 추가되었다고 하더라도 남아있는 요소들에게는 아무런 변화도 일어나지 않았기 때문에 불필요한 리렌더링이 발생하지 않는다.`

## useCallback 은 필요한 부분만 적용

https://leetrue-log.vercel.app/react-rendering

useCallback 은 함수를 정의하는 것 뿐만 아니라 그의 의존성 배열까지 함께 정의해야하기 때문에 더 고비용이기 때문이다.  
결론적으로는 함수 컴포넌트를 실행할 때 useCallback 으로 감싸져 있다면 초기 렌더링이 더 느리거나, 렌더링 속도 개선 부분에 있어서는 유의미하지 않다.

React.memo() 적용되어 있고, props 로 함수를 받는다면, 해당 함수에 useCallback 이 적용되어 있어야, React.memo() 에서 함수 주소가 변경안되었다는 것을 알고 리렌더를 방지해 준다!

---

# React는 컴포넌트를 언제 다시 리렌더링 할까요? - 리렌더링 조건

https://www.joshwcomeau.com/react/why-react-re-renders/

https://velog.io/@mogulist/understanding-react-rerender-easily

https://velog.io/@surim014/react-rerender

https://codepen.io/fgerschau/pen/wvKdrdM

공식문서  
https://react.dev/learn/preserving-and-resetting-state

## state 변경 - useState

상태를 변경한다는 것은 setState 함수(React hooks에서는 useState)를 실행할 때,  
React 트리거가 업데이트된다는 것을 의미합니다.  
이는 컴포넌트의 render 함수가 호출된다는 것을 의미할 뿐만 아니라,  
props 변경 여부와 관계없이 모든 하위 컴포넌트들이 리렌더링 된다는 것을 의미합니다.

상위 노드를 업데이트하면 모든 자식들의 render 함수를 실행해야 하기 때문에 예상보다 훨씬 더 많은 자바스크립트를 실행하게 될 수 있습니다.

## props 변경 - { ...props }

부모 컴포넌트로부터 받은 props 값이 변경됐다면 리렌더링

## `부모 컴포넌트가 리렌더링 될 때 - 중요! (자식 컴포넌트의 props나 state에 변경 사항이 있었느냐는 무관)`

https://velog.io/@mogulist/understanding-react-rerender-easily

새로운 prop 이 들어오지 않더라고 부모컴포넌트가 리렌더링 된다면 자식컴포넌트 역시 리렌더링

```javascript
const Parent = () => {
  return (
    <Child1>
      <Child2>
        <Child3 />
      </Child2>
    </Child1>
  );
};

const Child1 = ({ children }) => <div>{children}</div>;
const Child2 = ({ children }) => <div>{children}</div>;
const Child3 = () => <div>저는 막내예요</div>;
```

Parent 컴포넌트가 리렌더링되면 Child1, Child2, Child3 는 모두 리렌더링

- 부모 컴포넌트가 리렌더링되면 자식 컴포넌트들도 리렌더링됨
- 자식 컴포넌트란 부모 컴포넌트의 JSX 안에서 사용된 모든 컴포넌트들
  - "JSX 안에서 사용된 컴포넌트"란 <Component /> 형태로 사용된 컴포넌트
  - props, children으로 받은 컴포넌트는 자식 컴포넌트가 아님
- 자식 컴포넌트들끼리는 형제임
  - 형제 관계(Child1, Child2, Child3)인 컴포넌트들끼리는 서로 리렌더링에 영향을 미치지 않음

원본  
https://www.zhenghao.io/posts/react-rerender

번역  
https://velog.io/@eunbinn/when-does-react-render-your-component#%ED%9D%90%EB%A6%84%EB%8F%84

```javascript
function App() {
  return (
    <Parent lastChild={<ChildC />}>
      <ChildB />
    </Parent>
  );
}

function Parent({ children, lastChild }) {
  return (
    <div className="parent">
      <ChildA />
      {children}
      {lastChild}
    </div>
  );
}
```

Parent 컴포넌트가 리렌더링되면 ChildA, ChildB, ChildC 중 어떤 컴포넌트가 리렌더링될까요?  
`ChildA 컴포넌트만 Parent 컴포넌트와 함께 리렌더링`

`"자식 컴포넌트란 부모 컴포넌트의 JSX 안에 사용된 모든 컴포넌트들"이라고 정의했으므로 ChildB 와 ChildC 는 App 의 자식 컴포넌트입니다.`  
App 컴포넌트가 리턴하는 JSX에는 Parent, ChildB, ChildC 가 있습니다.  
즉, Parent, ChildB, ChildC 는 App 의 자식 컴포넌트들입니다.  
ChildC 는 App 컴포넌트가 렌더링하여 Parent 의 lastChild props 으로 전달해주는 것이고,  
ChildB 도 App 컴포넌트가 렌더링하여 Parent 의 children props 으로 전달해줍니다.

## 강제 업데이트(forceUpdate)가 실행될 때

props 나 state 가 아닌 다른 값이 변경되었을 때 리렌더링을 하고 싶다면 그때 사용할수 있는 메서드

---

# 리렌더링 피하는 방법

https://sangcho.tistory.com/entry/%EC%BB%B4%ED%8F%AC%EB%84%8C%ED%8A%B8-Re-rendering%EC%9D%84-%ED%94%BC%ED%95%98%EB%8A%94-5%EA%B0%80%EC%A7%80-%EB%B0%A9%EB%B2%95

---

# 리액트의 공식 문서에 의하면 리액트의 렌더링은 2가지 렌더링으로 구분

https://velog.io/@mogulist/understanding-react-rerender-easily

## 컴포넌트 렌더링

https://ko.reactjs.org/docs/components-and-props.html#rendering-a-component

컴포넌트를 실행하여 리액트 엘리먼트(ReactElement)를 리턴하는 것

## 엘리먼트 렌더링

https://ko.reactjs.org/docs/rendering-elements.html

https://beta.reactjs.org/learn/render-and-commit

엘리먼트를 DOM에 반영하는 것.  
이 과정에서 fiber(React V15 이전에는 Virtual DOM)를 구성 및 업데이트하고,  
재조정(Reconciliation) 과정을 거쳐서 변경된 부분만 DOM을 업데이트합니다.

# 리액트에는 렌더 단계(render phase)와 커밋 단계(commit phase)의 두 단계가 있습니다.

## Render 단계

컴포넌트 렌더링부터 엘리먼트 렌더링의 재조정까지입니다.

즉 이전 렌더링과 비교하여 변경된 부분을 파악까지만 합니다.

## Commit 단계

DOM을 업데이트합니다.  
변경된 부분만.

Commit 단계에서 DOM을 업데이트한 후에는 라이프사이클 메소드와 useEffect가 실행됩니다.

---

# 컴포넌트 렌더링 최적화에 대한 오해

https://velog.io/@mogulist/understanding-react-rerender-easily

흔히 자식 컴포넌트의 리렌더링을 줄이기 위하여  
자식 컴포넌트에게 props 로 전달하는 이벤트 핸들러 같은 함수를 useCallback()으로 감싸주고 최적화했다고 안도하곤 합니다.  
그런데, 과연 실제로 효과가 있는 것일까요?

```javascript
import React, { useEffect, useState, useCallback } from "react";

export default function App() {
  return (
    <div className="App">
      <h2>Rerendering Example</h2>
      <Parent />
    </div>
  );
}

const useValue = () => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    value < 3 &&
      setTimeout(() => {
        setValue((value) => value + 1);
      }, 1500);
  }, [value]);

  return value;
};

const Parent = () => {
  const value = useValue();
  const handleClick = () => {};
  const memoizedHandleClick = useCallback(() => handleClick, []);

  return (
    <>
      <div>value: {value}</div>
      {/* React.ment 사용 */}
      {/*<ChildA />*/}
      <MemoizedChildA />

      <ChildB value={value} />

      {/* useCallback 을 사용했음에도 */}
      {/* ChildC는 props.onClick 이 동일한지 여부는 체크하지 않고, 그저 부모 컴포넌트가 리렌더링되었기 때문에 리렌더링되는 것입니다. */}
      {/* 이렇게 useCallback()을 사용한다면 원하는 최적화 효과가 발생하지 않을 뿐만 아니라 오히려 useCallback()의 dependency를 체크하는데 CPU를 낭비하게 되는 셈입니다. */}
      {/*<ChildC onClick={handleClick} />*/}
      {/*<ChildC onClick={memoizedHandleClick} />*/}

      {/* 함수를 자식 컴포넌트에게 전달할 때 불필요한 리렌더링이 많이 발생하는 것을 줄이려면, */}
      {/* useCallback()과 memo()를 함께 사용해주어야 효과가 있다는 것을 알 수 있습니다. */}
      <MemoizedChildC onClick={memoizedHandleClick} />
    </>
  );
};

const ChildA = () => <GrandChildren color="red" />;
const ChildB = ({ value }: any) => <GrandChildren color="blue" />;
const ChildC = ({ onClick }: any) => <GrandChildren color="green" />;
const MemoizedChildA = React.memo(ChildA);
const MemoizedChildC = React.memo(ChildC);

const GrandChildren = ({ color }: any) => (
  <div>
    {Array.from({ length: 3 }).map((_, i) => (
      <GrandGrandChild key={i + 1} order={i} color={color} />
    ))}
  </div>
);

const GrandGrandChild = ({ order, color }: any) => (
  <div style={{ color }}>GrandGrandChild {order}</div>
);
```

"A (Mostly) Complete Guide to React Rendering Behavior" 의 Memoize Everything? 섹션을 보면,  
https://blog.isquaredsoftware.com/2020/05/blogged-answers-a-mostly-complete-guide-to-react-rendering-behavior/#memoize-everything  
차라리 모든 함수 컴포넌트를 React.memo() 로 감싸면 안되느냐는 의견에 대하여 (아마도 이런 이야기가 꽤나 많았던 모양입니다),  
Dan Abramove는 "모든 JS 함수에 대하여 Lodash의 memoize()를 사용하면 성능이 나아지겠는가?"라고 트윗했었다고 하는군요.  
https://twitter.com/dan_abramov/status/1083897065263034368
