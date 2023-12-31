# 리렌더링!

- state 가 바뀌었을 때
- props 가 바뀌었을 때
- 부모 컴포넌트가 렌더링 었을 때 하위 컴포넌트의 경우 (자식 컴포넌트란 부모 컴포넌트의 JSX 안에 사용된 모든 컴포넌트들)
  - <Parent><Child><Child></Child></Child></Parent> Parent 가 부모, Child 가 하위 컴포넌트

```jsx
import React, { useState, useCallback, PropsWithChildren } from 'react';

const ChildComponent = () => {
  console.log('ChildComponent is rendering!');
  return <div>Hello World!</div>;
};
const ChildComponentMemo = React.memo(ChildComponent);

const ChildComponentProps = ({
  onClick,
}: PropsWithChildren<{ onClick: any }>) => {
  console.log('ChildComponent is rendering!', onClick);
  return <div>Hello World!</div>;
};
const ChildComponentPropsMemo = React.memo(ChildComponentProps);

const ParentComponent = () => {
  console.log('ParentComponent is rendering!');
  const [toggle, setToggle] = useState(false);

  return (
    <div>
      {/* React.memo 사용하여 리렌더 방지 */}
      <ChildComponentMemo />
      <button
        onClick={() => {
          setToggle(!toggle);
        }}
      >
        re-render
      </button>
    </div>
  );
};

const ParentComponentChildren = ({ children }: PropsWithChildren) => {
  console.log('ParentComponent is rendering!');
  const [toggle, setToggle] = useState(false);

  return (
    <div>
      {/* React 컴포넌트를 children 로 받아 리렌더 방지 */}
      {children}
      <button
        onClick={() => {
          setToggle(!toggle);
        }}
      >
        re-render
      </button>
    </div>
  );
};

const ParentComponentProps = () => {
  console.log('ParentComponent is rendering!');
  const [toggle, setToggle] = useState(false);
  const onClick = useCallback(() => {
    console.log('Click!!!');
  }, []);

  return (
    <div>
      {/*<ChildComponentPropsMemo onClick={() => console.log('Click!!!')} />*/}
      {/* useCallback 사용하여 리렌더 방지!!!!! */}
      <ChildComponentPropsMemo onClick={onClick} />
      <button
        onClick={() => {
          setToggle(!toggle);
        }}
      >
        re-render
      </button>
    </div>
  );
};

const ParentComponentValue = ({
  value,
}: PropsWithChildren<{ value: number }>) => {
  const [toggle, setToggle] = useState(false);

  // 현재 컴포넌트가 리렌터될 때 마다, props 로 받은 value 값이 변할 것인가??
  console.log(value);

  return (
    <div>
      <button
        onClick={() => {
          setToggle(!toggle);
        }}
      >
        re-render
      </button>
    </div>
  );
};

const Index = ({ test }: any) => {
  console.log(test);
  const randomNumber = () => {
    return Math.random();
  };

  return (
    <>
      <div>
        <h1>React.memo 활용 리렌더 방지</h1>
        <ParentComponent />
        <h1>children 활용 리렌더 방지</h1>
        <ParentComponentChildren>
          <ChildComponent />
        </ParentComponentChildren>
        <h1>리렌더할 때 Porps 로 넘기는 값이 변하는지 여부</h1>
        <ParentComponentValue value={randomNumber()} />
        <h1>React.memo 활용 props 값 리렌더 방지</h1>
        <ParentComponentProps />
      </div>
    </>
  );
};
```

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

https://ko.legacy.reactjs.org/docs/lists-and-keys.html

React 공식문서에서는,  
React 에서 컴포넌트를 mapping 할 때는 unique 한 key 값을 주도록 권장된다.  
물론 각 배열의 index 값은 고유해보일 수도 있지만,  
배열이 추가되거나 삭제되는 등의 변형이 일어난다면 이 변화에 따라 하위 컴포넌트의 리렌더링이 발생할 수 있다.

https://robinpokorny.medium.com/index-as-a-key-is-an-anti-pattern-e0349aece318

> 항목의 순서가 바뀔 수 있는 경우 key에 인덱스를 사용하는 것은 권장하지 않습니다.  
> 이로 인해 성능이 저하되거나 컴포넌트의 state와 관련된 문제가 발생할 수 있습니다.
> 리스트 항목에 명시적으로 key를 지정하지 않으면 React는 기본적으로 인덱스를 key로 사용합니다.

index 를 이용해 key 값을 부여한 경우,  
`특정 값이 사라지면서 index가 다시 부여가 된다.`  
그렇기 때문에 `컴포넌트들의 key 값이 바뀜을 인지한 컴포넌트는 이에 따라 리렌더링이 발생`하게 된다.  
해당 컴포넌트의 값 자체가 바뀐 것도 없는데 key 값 때문에 리렌더링이 일어나는 것은 비효율적이다.

뿐만 아니라 반복적인 index 변경이 발생하게 되면 순간적으로 화면에서의 렌더링 오류가 발생해서 화면을 바라보는 유저로 하여금 혼란스러운 경험을 야기시킬 수도 있다.

반면에 `mapping 된 컴포넌트가 고유한 key 값을 가지고 있다면, 아무리 다른 요소가 삭제되거나 추가되었다고 하더라도 남아있는 요소들에게는 아무런 변화도 일어나지 않았기 때문에 불필요한 리렌더링이 발생하지 않는다.`

### map 반복문 렌더시 key 값 - 리렌더링 주의!

문제 : 데이터 리스트 추가에 따라 컴포넌트가 append 되는 부분만 렌더하는 것이 아닌, 전체 리스트를 다시 렌더링 하는 경우가 있다.
원인 : 반복문 React key 속성값 랜덤인 경우 재렌더링 발생!

## useCallback 은 필요한 부분만 적용

https://leetrue-log.vercel.app/react-rendering

useCallback 은 함수를 정의하는 것 뿐만 아니라 그의 의존성 배열까지 함께 정의해야하기 때문에 더 고비용이기 때문이다.  
결론적으로는 함수 컴포넌트를 실행할 때 useCallback 으로 감싸져 있다면 초기 렌더링이 더 느리거나, 렌더링 속도 개선 부분에 있어서는 유의미하지 않다.

React.memo() 적용되어 있고, props 로 함수를 받는다면, 해당 함수에 useCallback 이 적용되어 있어야, React.memo() 에서 함수 주소가 변경안되었다는 것을 알고 리렌더를 방지해 준다!

---

# children prop 에 대한 고찰

https://velog.io/@2ast/React-children-prop%EC%97%90-%EB%8C%80%ED%95%9C-%EA%B3%A0%EC%B0%B0feat.-%EB%A0%8C%EB%8D%94%EB%A7%81-%EC%B5%9C%EC%A0%81%ED%99%94

```jsx
<ParentComponent>
	<ChildComponent/>
</ParantComponent>
```

```jsx
const ParantComponent = props => {
  return <>{props.children}</>;
};
```

부모 컴포넌트 내부에서는 자식 컴포넌트 정보에 접근할 수 있는데, 바로 이때 사용되는 것이 children prop 이다.

## children prop 은 언제 사용되는 걸까?

```jsx
import React, { useState } from 'react';

const ChildComponent = () => {
  console.log('ChildComponent is rendering!');
  return <div>Hello World!</div>;
};

const ParentComponent = () => {
  console.log('ParentComponent is rendering!');
  const [toggle, setToggle] = useState(false);
  return (
    <>
      <ChildComponent />
      <button
        onClick={() => {
          setToggle(!toggle);
        }}
      >
        re-render
      </button>
    </>
  );
};

const Container = () => {
  return (
    <div>
      <ParentComponent />
    </div>
  );
};
```

Container > ParentComponent > ChildComponent 구조로 프로젝트가 구성되어 있다.  
이 상황에서 만약 re-render 버튼을 눌러 ParentComponent의 리렌더링을 유발하면 어떻게 될까?  
당연히 ParentComponent가 리렌더 되는 순간 ChildComponent도 함께 리렌더 될 것이다.

이 현상은 아주 비효율적이다.  
ParentComponent의 toggle state 변경은 ChildComponent와는 무관함에도 무의미하게 ChildComponent가 리렌더링 되는 것이기 때문이다.  
따라서 `이 문제를 해결하기 위해 React.memo를 사용`하기도 한다.

```jsx
import React, { useState } from 'react';

const ChildComponent = () => {
  console.log('ChildComponent is rendering!');
  return <div>Hello World!</div>;
};
const ChildMemo = React.memo(ChildComponent);

const ParentComponent = () => {
  console.log('ParentComponent is rendering!');
  const [toggle, setToggle] = useState(false);
  return (
    <div>
      <ChildMemo />
      <button
        onClick={() => {
          setToggle(!toggle);
        }}
      >
        re-render
      </button>
    </div>
  );
};

const Container = () => {
  return (
    <div>
      <ParentComponent />
    </div>
  );
};
```

하지만 굳이 React.memo를 사용하지 않고도 렌더링 최적화를 달성할 수 있다.  
children prop 을 활용하는 것이다.

```jsx
import React, { useState } from 'react';

const ChildComponent = () => {
  console.log('ChildComponent is rendering!');
  return <div>Hello World!</div>;
};

const ParentComponent = ({ children }) => {
  console.log('ParentComponent is rendering!');
  const [toggle, setToggle] = useState(false);
  return (
    <div>
      {children}
      <button
        onClick={() => {
          setToggle(!toggle);
        }}
      >
        re-render
      </button>
    </div>
  );
};

const Container = () => {
  return (
    <div>
      <ParentComponent>
        {/* HTML 태그가 아닌, 리액트 컴포넌트만 children 으로 사용했다는 것을 인지하고 다음글을 읽어가야 함! */}
        <ChildComponent />
      </ParentComponent>
    </div>
  );
};
```

children prop 을 사용하면 React.memo 등의 도구를 사용하지 않고도 구조적으로 렌더링 최적화를 달성할 수 있다.

## React.memo를 무효화하는 children prop ?

children 을 prop 으로 갖는 컴포넌트에는 React.memo 가 적용되지 않고 항상 렌더링 된다는 사실

```jsx
import React, { useState } from 'react';

const ParentComponent = ({ children }) => {
  console.log('ParentComponent is rendering!');
  return <div>{children}</div>;
};

const ParentMemo = React.memo(ParentComponent);

const Container = () => {
  console.log('Container is rendering!');
  const [toggle, setToggle] = useState(false);
  return (
    <>
      <ParentMemo>
        {/* children 으로 HTML 태그 사용! */}
        <div>Hello World!</div>
      </ParentMemo>
      <button
        onClick={() => {
          setToggle(!toggle);
        }}
      >
        re-redner!
      </button>
    </>
  );
};
```

Brandon Dail 이라는 분이 올린 트윗  
내용을 요약하자면 children prop은 매 렌더링마다 값이 달라지므로 React.memo가 동작하지 않는다는 것  
https://www.developerway.com/posts/react-elements-children-parents

- JSX 상의 태그 표현은 사실상 React.createElement 라는 javascript 코드의 다른 형태였고, 새로운 react element 를 생성해 반환하는 역할을 한다.
- react element 는 단지 화면 정보를 담고 있는 object 에 불과하다.
- react element 는 값이 변하지 않는 상수이며, element 의 변경은 곧 새로운 element 를 생성한다는 것을 의미한다. (re-render = re-create)

React.memo 란 무엇인가?  
props가 변하지 않는 한 component 의 렌더링을 방지하는 역할을 수행한다.  
반대로 말하면 React.memo 가 무효화되었다는 것은 props 에 변화가 생겼다는 것을 의미한다.  
즉, 매 렌더링 마다 children prop 은 다른 값으로 변경되고 있었던 것이다.

- 매 렌더링마다 react element 들은 새롭게 생성되고, 그로인해 object 의 참조값이 변경된다.
- children 으로 전달되는 react element 또한 매번 새롭게 생성되기 때문에 prop 이 변경되었다고 판단하여 memo 가 렌더링을 방지해주지 못하는 것이다.

## Parent 가 re-render될 때 children 은 렌더링 되지 않는 이유

결론부터 말하자면 react 에서 children이란 말 그대로 prop 일 뿐이며, ParentComponent 에 children 속성을 주는 것과 완전히 동일한 표현이기 때문이다.  
즉, 아래 두 표현은 완전히 동일한 의미를 갖고 있다.

```jsx
<ParentComponent>
	<ChildComponent/>
</ParentComponent>

<ParentComponent children={<ChildConponent/>}/>
```

```jsx
import React, { useState } from 'react';

const Child = () => {
	console.log("ChildComponent is rendering!");
	return <div>Hello World!</div>
};

const Parent = ({children}) => {
	console.log("ParentComponent is rendering!");
  const [toggle, setToggle] useState(false);
	return (
    <div>
 		    {children}
        <button onClick={()=>{setToggle(!toggle);}}>
        	re-render
        </button>
    </div>
  );
}

const Container = () => {
	return (
    <div>
    	<Parent children={<Child/>}/>
    </div>
  );
}
```

코드를 보면 Parent 는 children 으로 Child 를 받고 있다.  
정확히 말하면 화면 정보를 담고 있는 object 형태의 react element 를 받고 있는 것이고, 해당 element의 출처는 React.createElement 함수의 반환값이다.  
즉 Container component 가 렌더링 될 때 React.createElement(Child,null,null)을 실행하여 그 반환값을 Parent 에 children 으로 넘겨주고 있는 있는 것이다.  
쉽게 말해서 React.createElement 는 object 를 반환하는 함수, children 은 object 그 자체이다.

React.createElement(Child,null,null)이 실행되는 것은 Container 가 렌더링되며 Parent 에 props 을 넘겨줄 때 뿐이므로,  
이 상황에서 Parent 가 리렌더링 된다고 해도 이전 렌더링에서 전달받은 children 값을 그대로 사용할 뿐이다.  
즉, Parent 의 children 은 애초에 object 형태인 상수로 전달받았기 때문에 렌더링 이전과 비교해서 값이 달라질리 없고, 따라서 re-render 되지도 않는 것이다.

마지막으로 Parent 가 re-render 될 때 정말로 props 로 받은 값들이 갱신되지 않고 이전 렌더링에 받은 값을 그대로 사용하는지 알아보기 위해 random 함수를 사용해 간단한 실험을 설계해 보았다.

```jsx
import React, { useState } from 'react';

const ParentComponentValue = ({ value }) => {
  const [toggle, setToggle] = useState(false);
  console.log(value);

  return (
    <div>
      <button
        onClick={() => {
          setToggle(!toggle);
        }}
      >
        re-render
      </button>
    </div>
  );
};

const Container = () => {
  const randomNumber = () => {
    return Math.random();
  };

  return (
    <div>
      <ParentComponent value={randomNumber()} />
    </div>
  );
};
```

re-render 버튼을 몇번을 눌러도 동일한 랜덤 값이 출력되고 있음을 확인할 수 있다.

## 정리하자면

- React.createElement 는 매번 새로운 object를 반환하는 함수이며, children 은 그 결과 반환된 object 이다.
- children prop 은 말 그대로 prop 이고, 한번 전달된 prop 은 상위 컴포넌트가 리렌더 되지 않는한 갱신되지 않고 유지된다.
- 이전 렌더 시점과 비교해서 react element 가 달라지지 않았다면 그 내용이 변경되지 않았다 판단, 렌더링되지 않는다.

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
    <div className='parent'>
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
import React, { useEffect, useState, useCallback } from 'react';

export default function App() {
  return (
    <div className='App'>
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
        setValue(value => value + 1);
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

const ChildA = () => <GrandChildren color='red' />;
const ChildB = ({ value }: any) => <GrandChildren color='blue' />;
const ChildC = ({ onClick }: any) => <GrandChildren color='green' />;
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
