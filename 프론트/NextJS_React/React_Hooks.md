# Hooks

리액트 컴포넌트에서 외부 데이터를 가져오려면  
useState 와 useEffect 훅을 함께 사용해야 한다.  
useState 훅을 사용해 fetch 의 응답을 상태에 저장하고, useEffect 훅을 사용해 fetch 요청을 만든다.

## React Hook은 실제로 어떻게 동작할까?

`study.git/프론트/JavaScript/JavaScript_스코프_클로저.md` 참고!!

https://hewonjeong.github.io/deep-dive-how-do-react-hooks-really-work-ko/

https://medium.com/@ryardley/react-hooks-not-magic-just-arrays-cd4f1857236e

Rudi Yardley의 글,  
React Hooks는 마법이 아니라 배열일 뿐

## 훅 사용 시 지켜야 할 규칙

`실전 리액트 프로그래밍` 책 내용 중

- 규칙 1 : 하나의 컴포넌트에서 훅을 호출하는 순서는 항상 같아야 한다.
- 규칙 2 : 훅은 함수형 컴포넌트 또는 커스텀 훅 안에서만 호출되어야 한다.

```javascript
import React, { useReducer } from 'react';

function reducer(state, action) {
  return {
    ...state,
    [action.name]: action.value, // <input name="" value="" />
  };
}

// 커스텀 Hooks
export default function useInputs(initialForm) {
  const [state, dispatch] = useReducer(reducer, initialForm);
  const onChange = e => {
    dispatch(e.target);
  };
  return [state, onChange];
}
```

```javascript
import React from 'react';
import useInputs from './customHook/useInputs';

const getAverage = numbers => {
  console.log('평균값 계산 실행');
  if (numbers.length === 0) return 0;
  const sum = numbers.reduce((a, b) => a + b);
  return sum / numbers.length;
};

function reducer(state, action) {
  console.log('reducer 실행');
  // action.type 에 따라 다른 작업 수행
  switch (action.type) {
    case 'INCREMENT':
      return { value: state.value + 1 };
    case 'DECREMENT':
      return { value: state.value - 1 };
    default:
      // 아무것도 해당되지 않을 때 기존 상태 반환
      return state;
  }
}

// 컴포넌트
const Hook = () => {
  /**
   * useState
   */
  // 가변적인 상태를 지닐 수 있게 해줍니다.
  // useState 함수의 파라미터에는 상태의 '기본값'을 넣어 줍니다.
  // 이 함수가 호출되면 배열을 반환하는 데요. 그 배열의 첫 번째 원소는 '상태값', 두 번째 원소는 상태를 설정하는 '함수(세터함수)'입니다.
  // 이 함수에 파라미터를 넣어서 호출하면 전달받은 파라미터로 값이 바뀌고 컴포넌트가 정상적으로 '리렌더링'됩니다.
  // 하나의 useState 함수는 하나의 상태값만 관리할 수 있습니다.
  const [list, setList] = useState([]);
  const [number, setNumber] = useState('');

  // 데이터를 로컬 스토리지에 저장하기
  const loadJSON = key => key && JSON.parse(localStorage.getItem(key));
  const saveJSON = (key, data) =>
    key && localStorage.setItem(key, JSON.stringify(data));
  const [data, setData] = useState(loadJSON(`use:${number}`));

  /**
   * useEffect
   */
  // useEffect 는 리액트 '컴포넌트가 렌더링될 때마다 특정 작업을 수행하도록 설정'할 수 있는 Hook
  useEffect(() => {
    console.log('--- --- useEffect');
    console.log('렌더링 되었습니다.');
    console.log('list', list);
    console.log('number', number);
    console.log('--- ---');
  });

  // 마운트 될 때만 실행하고 싶을 때
  // useEffect 에서 설정한 함수를 컴포넌트가 화면에 맨 처음 렌더링될 때만 실행하고,
  // '업데이트될 때는 실행하지 않으려면 함수의 두번째 파라미터로 비어 있는 배열'을 넣어 주면 된다.
  useEffect(() => {
    console.log('--- --- useEffect');
    console.log('마운트될 때만 실행됩니다.');
    console.log('--- ---');
  }, []);

  // 특정 값이 업데이트될 때만 실행하고 싶을 때 - useState 를 통해 특정 상태 값 업데이트가 발생했을 때, 실행될 수 있도록 할 수 있다. (useState 상태값 업데이트 모니터링)
  // useEffect 를 사용할 때, 특정 값이 변경될 때만 호출하고 싶을 경우도 있겠지요?
  // useEffect 의 두 번째 파리미터로 전달되는 배열 안에 검사하고 싶은 값을 넣어주면, '해당 값이 바뀔때만 실행'
  useEffect(() => {
    console.log('--- --- useEffect');
    console.log('number 값 변경 발생', number);
    console.log('--- ---');
  }, [number]);

  // 뒷정리하기
  // useEffect 는 '기본적으로 렌더링되고 난 직후마다 실행'되며, 두 번째 파라미터 배열에 무엇을 넣는지에 따라 실행되는 조건이 달라집니다.
  // 컴포넌트가 '언마운트되기 전이나 업데이트되기 직전에 어떠한 작업을 수행하고 싶다면, useEffect 에서 뒷정리(cleanup) 함수를 반환'해 주어야 합니다.
  // '오직 언마운트될 때만 뒷정리 함수를 호출하고 싶다면, useEffect 함수의 두 번째 파라미터에 비어있는 배열'을 넣으면 됩니다.
  useEffect(() => {
    console.log('--- --- useEffect');
    console.log('effect (렌더링 되었습니다.)');
    console.log('--- ---');
    return () => {
      console.log('--- --- useEffect');
      console.log('cleanup (리렌더링하기 전 입니다.)');
      console.log('--- ---');
    };
  });

  // 의존 관계 배열 (배열 내 값의 변경이 있을 때만 useEffect 실행)
  useEffect(() => {
    //
  }, [list, number]); // list 또는 number 값의 변경이 있을 때 실행

  // async 함수는 promise 객체를 리턴하기 때문에
  // useEffect 함수 자체를 async 함수로 사용할 수는 없다
  /*useEffect(async () => { 
		const result = await axios.get();
	}, []);*/
  /*useEffect(() => { 
		// async 는 내부에서 만들어줘야 한다.
		const fetchArticles = async () => {
			try {
				const result = await axios.get();
				setArticles(result.data);
			}catch (error) {
			
			}
		}
		fetchArticles();
	}, []);*/

  /**
   * useLayoutEffect
   */
  // useEffect와 동일하긴 한데, 모든 DOM 변경 후에 동기적으로 발생
  // 이것은 DOM에서 레이아웃을 읽고 동기적으로 리렌더링하는 경우에 사용
  // useLayoutEffect의 내부에 예정된 갱신은 브라우저가 화면을 그리기 이전 시점에 동기적으로 수행

  /**
   * useReducer
   */
  // useReducer 는 useState 보다 더 다양한 컴포넌트 상황에 따라 상태를 다른 값으로 업데이트해 주고 싶을 때 사용하는 Hook 입니다.
  // 리듀서는 현재 상태, 그리고 업데이트를 위해 필요한 정보를 담은 액션(action) 값을 전달받아 새로운 상태를 반환하는 함수입니다.
  // 리듀서 함수에서 새로운 상태를 만들 때는 반드시 '불변성'을 지켜주어야 합니다.
  // useReducer 의 첫 번째 파라미터에는 리듀서 함수를 넣고, 두 번째 파라미터에는 해당 리듀서의 기본값을 넣어 줍니다.
  // 이 Hook 을 사용하면 state 값과 dispatch 함수를 받아 오는데요. 여기서 state 는 현재 가지키고 있는 상태고, dispatch 는 액션을 발생시키는 함수입니다.
  // dispatch(action) 과 같은 형태로, 함수 안에 파라미터로 액션 값을 넣어주면 리듀서 함수가 호출되는 구조입니다.
  // useReducer 를 사용했을 때의 가장 큰 장점은 컴포넌트 업데이트 로직을 컴포넌트 바깥으로 빼낼 수 있다는 것입니다.
  const [state, dispatch] = useReducer(reducer, { value: 0 });
  const [stateCustom, dispatchCustom] = useInputs({
    // 커스텀 Hook - 내부 useReducer 사용
    name: '',
    nickname: '',
  });
  const { name, nickname } = stateCustom;

  /**
   * useMemo
   */
  // useMeno 를 사용하면 함수형 컴포넌트 내부에서 발생하는 연산을 최적화 할 수 있습니다.
  // useMemo 는 렌더링하는 과정에서 특정 값이 바뀌었을 때만 연산을 실행하고, '원하는 값이 바뀌지 않았다면 이전에 연산 했던 결과를 다시 사용하는 방식'입니다.
  const avg = useMemo(() => getAverage(list), [list]);

  /**
   * useRef
   */
  // useRef 를 사용하여 ref 를 설정하면, useRef 를 통해 만든 객체 안의 current 값이 실제 엘리먼트룰 가리킵니다.
  // useRef 를 사용하여 렌더링과 무관한 값(타임아웃, 인터벌 등 타임 관련 고유값 / 클래스 인스턴스 값 / 스크롤 위치 값)을 저장할 때도 사용한다.
  const inputElement = useRef(null);

  /**
   * useCallback
   */
  // useCallback 은 useMemo와 상당히 비슷한 함수입니다.
  // 주로 렌더링 성능을 최적화해야 하는 상황에서 사용하는데요.
  // 이 Hook 을 사용하면 '이벤트 핸들러 함수를 필요할 때만 생성'할 수 있습니다. (컴포넌트가 리렌더링될 때마다 이벤트 핸들러 함수가 새로 생성되는 것 방지)
  // useCallback 의 첫 번째 파라미터에는 생성하고 싶은 함수를 넣고, 두 번째 파라미터에는 배열을 넣으면 됩니다.
  // 이 배열에는 어떤 값이 바뀌었을 때 함수를 새로 생성해야 하는지 명시해야 합니다.
  // '비어 있는 배열을 넣게 되면 컴포넌트가 렌더링될 때 단 한번만 함수가 생성'
  // '함수 내부에서 상태값에 의존해야 할 때는 그 값을 반드시 두 번째 파라미터 안에 포함'시켜 주어야 합니다. (의존값이 파라미터로 받는 값이 아닌, 외부 상태 또는 변수값 의존될 때)
  const onChange = useCallback(e => {
    console.log('--- --- useCallback');
    console.log('렌더링될 때만 함수 생성 / 이벤트 핸들러 실행 onChange');
    setNumber(e.target.value);
    console.log('--- ---');
  }, []); // 컴포넌트가 처음 렌더링될 때만 함수 생성 (두번째 파리미터에 빈 [] 배열)
  const onInsert = useCallback(() => {
    console.log('--- --- useCallback');
    console.log('number 혹은 list 값 변경 발생 / 이벤트 핸들러 실행 onInsert');
    const nextList = list.concat(parseInt(number));
    setList(nextList);
    setNumber('');
    inputElement.current.focus();
    console.log('--- ---');
  }, [number, list]); // number 혹은 list 가 바뀌었을 때만 함수 생성
  const onIncrease = useCallback(
    // useState 의 함수형 업데이트
    // prevNumber 는 현재 number 값을 가리킵니다.
    () => setNumber(prevNumber => prevNumber + 1),
    [],
  );

  return (
    <div>
      <input value={number} onChange={onChange} ref={inputElement} />
      <button onClick={onInsert}>등록</button>
      <button onClick={onIncrease}>함수형 +1</button>

      <p>
        {name} ({nickname})
      </p>
      <input name='name' value={name} onChange={dispatchCustom} />
      <input name='nickname' value={nickname} onChange={dispatchCustom} />

      <ul>
        {list.map((value, index) => (
          <li key={index}>{value}</li>
        ))}
      </ul>
      <div>평균값: {avg}</div>

      <p>현재 카운터 값은 {state.value} 입니다.</p>
      <button onClick={() => dispatch({ type: 'INCREMENT' })}>+1</button>
      <button onClick={() => dispatch({ type: 'DECREMENT' })}>-1</button>
    </div>
  );
};

export default Hook;
```

---

## 상태값 추가하기 : useState

`useState 상태값 변경 함수는 기본 비동기로 동작`

```javascript
const [count, setCount] = useState(0);

setCount(count + 1); // 1
setCount(count + 1); // 1
```

`상태값 변경 함수의 인수로 함수를 입력할 수 있음`

```javascript
const [count, setCount] = useState(0);

setCount(prev => prev + 1); // 1
setCount(prev => prev + 1); // 2
```

`상태값 변경 함수는 비동기로 처리되지만 그 순서가 보장`

```javascript
const [count1, setCount1] = useState(0);
const [count2, setCount2] = useState(0);

function onClick() {
  // count1 상태값을 먼저 증가하고 count2 상태값은 나중에 증가 한다.
  setCount1(count1 + 1);
  setCount1(count2 + 1);
}

// 상태값 변경 함수의 호출 순서대로 상태값이 변경되기 때문에 result 변수는 항상 참이다.
const result = count1 >= count2;
```

`하나의 useState 훅으로 여러 상태값 관리하기`

```javascript
const [state, setState] = useState({ name: '', age: 0 });

setState({ ...state, name: 'a' });
setState({ ...state, age: 1 });
```

`useState 동기(sync) 실행`

https://stackoverflow.com/questions/54119678/is-usestate-synchronous

```jsx
// useState 는 비동기 처리방식으로 아래 코드 처럼 실행은 불가!
const [value, setValue] = useState(0);
setValue(42, () => console.log('hi callback');
```

```jsx
// useEffect 활용하여 처리 필요!
useEffect(() => {
  console.log(state1, state2);
}, [state1]);
```

---

## 컴포넌트에서 부수 효과 처리하기 : useEffect

함수 실행 시 함수 외부의 상태를 변경하는 연산을 부수 효과라고 부른다.  
특별한 이유가 없다면 모든 부수 효과는 useEffect 훅에서 처리하는 게 좋다.  
API를 호출하는 것과 이벤트 처리 함수를 등록하고 해제하는 것 등이 부수 효과의 구체적인 예다.

`useEffect 훅에 입력하는 함수를 부수 효과 함수라고 한다.`  
`부수 효과 함수는 렌더링 결과가 실제 돔에 반영된 후 호출되고, 컴포넌트가 사라지기 직전에 마지막으로 호출된다.`

### useEffect 함수에서 API를 호출하는 경우

의존성 배열로 API호출 횟수를 최적화하기

```javascript
const [user, setUser] = useState();
useEffect(() => {
  // userId 가 변경될 때만 fetchUser 함수 호출
  fetchUser(userId).then(data => setUser(data));
  return () => {
    // abort 를 해주는 것이 좋다!
  };
}, [userId]);
```

의존성 배열을 잘못 관리한 경우

```javascript
const [needDetail, setNeedDetail] = useState(false);
useEffect(() => {
  // needDetail 변수를 함수 내부에서 사용 중이다. needDetail 을 의존성 배열에 추가하지 않으면 문제가 발생한다.
  fetchUser(userId, needDetail).then(data => setUser(data));
}, [userId]);
```

`리액트 팀에서는 이러한 문제를 해결하기 위해 eslint 에서 사용할 수 있는 exhaustive-deps 규칙을 만들어서 제공`한다.  
exhaustive-deps 는 잘못 사용된 의존성 배열을 찾아서 알려 준다.

### useEffect 훅에서 async await 함수(Promise) 사용하기

> React version <= 17

useEffect 훅에서 async await 함수를 사용하기 위해 부수 효과 함수를 async await 함수로 만들면 에러가 난다.  
`useEffect 사용의 함수 반환값은 항상 함수 타입이어야 하기 때문`이다. (프로미스 객체 반환 안됨)

```javascript
useEffect(() => {
  async function fetchAndSetUser() {
    const data = await fetchUser(userId);
    setUser(data);
  }
  fetchAndSetUser();
}, [userId]);
```

```javascript
// fetchAndSetUser 함수 재사용하기
function Profile({ userId }) {
  const [user, setUser] = useState();
  async function fetchAndSetUser(needDetail) {
    const data = await fetchUser(userId, needDetail);
    setUser(data);
  }
  useEffect(() => {
    fetchAndSetUser(false);
  }, [fetchAndSetUser]);
  // ...

  // 위와 같이 구성할 경우,
  // fetchAndSetUser 함수는 렌더링을 할 때마다 갱신되므로 결과적으로 fetchAndSetUser 함수는 렌더링을 할 때마다 호출된다.
  // 이 문제를 해결하려면 fetchAndSetUser 함수가 필요할 때만 갱신되도록 만들어야 한다.
}
```

```javascript
// userId 가 변경될 때만 fetchAndSetUser 함수 갱신
// useCallback 훅을 이용해서 userId 가 변경될 때만 fetchAndSetUser 함수가 갱신된다.
function Profile({ userId }) {
  const [user, setUser] = useState();
  // fetchAndSetUser 함수는 userId 가 변경될 때만 호출된다.
  const fetchAndSetUser = useCallback(
    async needDetail => {
      const data = await fetchUser(userId, needDetail);
      setUser(data);
    },
    [userId],
  );
  useEffect(() => {
    fetchAndSetUser(false);
  }, [fetchAndSetUser]);
  // ...
}
```

> React version >= 18

https://stackoverflow.com/questions/53332321/react-hook-warnings-for-async-function-in-useeffect-useeffect-function-must-ret

https://www.daleseo.com/react-suspense/

```javascript
// fetchData.js
function fetchUser(userId) {
  let user = null;
  const suspender = fetch(
    `https://jsonplaceholder.typicode.com/users/${userId}`,
  )
    .then(response => response.json())
    .then(data => {
      setTimeout(() => {
        user = data;
      }, 3000);
    });
  return {
    read() {
      if (user === null) {
        throw suspender;
      } else {
        return user;
      }
    },
  };
}

function fetchPosts(userId) {
  let posts = null;
  const suspender = fetch(
    `https://jsonplaceholder.typicode.com/posts?userId=${userId}`,
  )
    .then(response => response.json())
    .then(data => {
      setTimeout(() => {
        posts = data;
      }, 3000);
    });
  return {
    read() {
      if (posts === null) {
        throw suspender;
      } else {
        return posts;
      }
    },
  };
}

function fetchData(userId) {
  return {
    user: fetchUser(userId),
    posts: fetchPosts(userId),
  };
}

export default fetchData;
```

```jsx
// Main.jsx
import { Suspense } from 'react';
import User from './User';
import fetchData from './fetchData';

function Main() {
  return (
    <main>
      <h2>Suspense 사용</h2>
      <Suspense fallback={<p>사용자 정보 로딩중...</p>}>
        <User resource={fetchData('1')} />
      </Suspense>
    </main>
  );
}

export default Main;
```

```jsx
// User.jsx
import React, { Suspense } from 'react';
import Posts from './Posts';

function User({ resource }) {
  const user = resource.user.read();

  return (
    <div>
      <p>
        {user.name}({user.email}) 님이 작성한 글
      </p>
      <Suspense fallback={<p>글목록 로딩중...</p>}>
        <Posts resource={resource} />
      </Suspense>
    </div>
  );
}

export default User;
```

```jsx
// Posts.jsx
function Posts({ resource }) {
  const posts = resource.posts.read();

  return (
    <ul>
      {posts.map(post => (
        <li key={post.id}>
          {post.id}. {post.title}
        </li>
      ))}
    </ul>
  );
}

export default Posts;
```

### useEffect 의 첫 번째 인수에 함수명을 부여하라

`모던 리액트 Deep Dive` 책 내용 중 - p205

useEffect 를 사용하는 많은 코드에서 useEffect 의 첫 번째 인수로 익명 함수를 넘겨준다.  
이는 리액트 공식 문서도 마찬가지다.

useEffect 의 코드가 복잡하고 많아질수록 무슨 일을 하는 useEffect 코드인지 파악하기 어려워진다.  
이때 이 useEffect 의 인수를 익명 함수가 아닌 적절한 이름을 사용한 기명함수로 바꾸는 것이 좋다.  
우리가 변수에 적절한 이름을 붙이는 이유는 해당 변수가 왜 만들어졌는지 파악하기 위함이다.  
useEffect 마찬가지로 적절한 이름을 붙이면 해당 useEffect 의 목적을 파악하기 쉬워진다.

```jsx
useEffect(
  function logActiveUser() {
    logging(user.id);
  },
  [user.id],
);
```

### `useEffect dependency`

useEffect, useCallback, useMemo 등  
의존성 배열을 파라미터로 받는 React Hooks 은  
의존성 배열의 모든 값들의 종속성(참조 값)을 비교해서 다르다면 첫번째 파라미터로 받은 함수를 동작시킨다고 한다.

리액트 공식페이지 가이드 - 객체 또는 함수 의존성을 피하세요.

https://react-ko.dev/learn/removing-effect-dependencies#does-some-reactive-value-change-unintentionally
`https://ko.react.dev/learn/removing-effect-dependencies#read-primitive-values-from-objects`

리액트는 dependency 비교로 Object.is() 사용  
https://legacy.reactjs.org/docs/hooks-reference.html#bailing-out-of-a-state-update

- useEffect는 기본적으로 매 렌더링 마다 실행된다.
- dependency array에 primitive types를 넣으면 값이 변경될 때 마다 실행된다.
- dependency array에 object를 넣으면 object의 reference가 변경될 때 마다 실행된다.
- dependency array에 object를 넣고, object의 값이 변경될 때 마다 실행시키기를 원한다면, use-deep-compare-effect 의 useDeepCompareEffect 를 useEffect 대신에 사용하자.

```jsx
function ChatRoom({ options }) {
  const [message, setMessage] = useState('');

  // 컴포넌트가 재런더링되면 객체의 변수값 다시 만들어 질 수 있음
  // (즉, 재렌더링에 따라 재 생성되는 객차를 의존성배열에 객체 그대로 추가할 경우, 불필요한 useEffect 함수 실행 발생!)

  const { roomId, serverUrl } = options;
  useEffect(() => {
    const connection = createConnection({
      roomId: roomId,
      serverUrl: serverUrl
    });
    connection.connect();
    return () => connection.disconnect();
  }, [roomId, serverUrl]); // ✅ All dependencies declared
  // ...
```

---

## 렌더링과 무관한 값 저장히기 : useRef

`useRef 는 렌더링에 필요하지 않은 값을 참조할 수 있는 React Hook` 입니다.

`study.git/프론트/NextJS_React/React_Ref.md` 참고!

https://ko.react.dev/reference/react/useRef

리액트 공식페이지 내용 중

https://ko.legacy.reactjs.org/docs/hooks-reference.html#useref

```
useRef() Hook 은 DOM ref 만을 위한 것이 아닙니다.
본질적으로 useRef 는 .current 프로퍼티에 변경 가능한 값을 담고 있는 “상자”와 같습니다.
만약 <div ref={myRef} />를 사용하여 React로 ref 객체를 전달한다면, React는 모드가 변경될 때마다 변경된 DOM 노드에 그것의 .current 프로퍼티를 설정할 것입니다.
useRef 는 내용이 변경될 때 그것을 알려주지는 않는다는 것을 유념하세요.
.current 프로퍼티를 변형하는 것이 리렌더링을 발생시키지는 않습니다.
```

예를 들어, setTimeout 이 반환하는 값은 어딘가에 저장해 두었다가 적절한 시점에서 clearTimeout 을 호출할 때 사용해야 한다.

`돔 요소 접근`

```javascript
function TextInput() {
  const inputRef = useRef();

  useEffect(() => {
    // ref 객체의 current 속성을 이용하여 접근
    inputRef.current.focus();
  }, []);

  return (
    <div>
      <input type='text' ref={inputRef} />
      <button>저장</button>
    </div>
  );
}
```

`forwardRef 함수로 ref 속성값을 직접 처리하기`
// https://ko.reactjs.org/docs/forwarding-refs.html

```javascript
// forwardRef 함수를 이용하면 부모 컴포넌트에서 넘어온 ref 속성값을 직접 처리할 수 있다.
const TextInput = React.forwardRef((props, ref) => (
  <div>
    <input type='text' ref={ref} />
    <button>저장</button>
  </div>
));

function Form() {
  const inputRef = useRef();
  return (
    <div>
      <TextInput ref={inputRef} />
      <button onClick={() => inputRef.current.focus()}>텍스트로 이동</button>
    </div>
  );
}
```

```javascript
// 타잆스크립트 사용할 경우
const TextInput = React.forwardRef<any, any>((props, ref) => (
	<div>
		<input type="text" ref={ref} />
		<button>저장</button>
	</div>
);

function Form() {
	const inputRef = useRef<HTMLElement>();
	return (
		<div>
			<TextInput ref={inputRef} />
			<button onClick={() => inputRef.current.focus()}>텍스트로 이동</button>
		</div>
	);
}
```

`ref 속성값으로 함수 사용하기`
ref 속성값에 함수를 입력하면 자식 요소가 생성되거나 제거되는 시점에 호출된다.

```javascript
function Form() {
  const [text, setText] = useState(INITIAL_TEXT);
  const [showText, setShowText] = useState(true);

  const setInitialText = useCallback(ref => ref && setText(INITIAL_TEXT), []);
  return (
    <div>
      {showText && (
        <input
          text='text'
          ref={setInitialText}
          value={text}
          onChange={e => setText(e.target.value)}
        />
      )}
      <button onClick={() => setShow(!showText)}>보이기/가리기</button>
    </div>
  );
}

const INITIAL_TEXT = '안녕하세요';
```

`렌더링과 무관한 값 저장히기: useRef`

```javascript
function Profile() {
  const [age, setAge] = useState(20);
  const prevAgeRef = useRef(20);

  // 렌더링 끝나면 실행
  useEffect(() => {
    // age 값이 변경되면 그 값을 prevAgeRef 에 저장한다.
    prevAgeRef.current = age;
  }, [age]);

  // age 의 이전 상태값을 이용한다.
  const prevAge = prevAgeRef.current;
  const text = age === prevAge ? 'same' : age > prevAge ? 'older' : 'younger';

  return (
    <div>
      <p>
        `${age} ${text} ${prevAge}`
      </p>
      <button
        onClick={() => {
          const age = Math.floor(Math.random() * 50 + 1);
          // age 가 변경되어 다시 렌더링할 때 prevAge 는 age 의 이전 상태값,
          // 렌더링이 끝나면 useEffect 에 의해, prevAgeRef 는 age 의 최신 상태값으로 변경된다.
          setAge(age);
        }}
      >
        나이변경
      </button>
    </div>
  );
}
```

```javascript
// useRef 훅으로 부수 효과 함수가 자주 호출되지 않도록 개선
function MyComponent({ onClick }) {
  const onClickRef = useRef();
  useEffect(() => {
    onClickRef.current = onClick;
  });
  useEffect(() => {
    window.addEventListener('click', () => {
      onClickRef.current();
      // ...
    });
    // ...
  });
  // ...
}
```

### 상태 변경 -> 컴포넌트 재 랜더링

React 컴포넌트는 기본적으로 내부 상태(state)가 변할 때 마다 다시 랜더링(rendering)이 됩니다.

```javascript
import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  console.log(`랜더링... count: ${count}`);

  return (
    <>
      <p>{count}번 클릭하셨습니다.</p>
      <button onClick={() => setCount(count + 1)}>클릭</button>
    </>
  );
}
```

브라우저 콘솔을 확인해보면, 5번의 로그가 찍히는 것을 볼 수 있는데요.
이를 통해, `<Counter/>` 컴포넌트 함수는 count 상태가 바뀔 때 마다 호출되는 것을 알 수 있습니다.

```
랜더링... count: 1
랜더링... count: 2
랜더링... count: 3
랜더링... count: 4
랜더링... count: 5
```

### 다시 랜더링 되어도 동일한 참조값을 유지하려면?

우리는 대부분의 경우, 위와 같이 상태가 변할 때 마다 React 컴포넌트 함수가 호출되어 화면이 갱신되기를 바랍니다.  
하지만 그에 따른 부작용으로 함수 내부의 변수들이 기존에 저장하고 있는 값들을 잃어버리고 초기화되는데요.  
간혹 `다시 랜더링이 되더라도 기존에 참조하고 있던 컴포넌트 함수 내의 값이 그대로 보존되야 하는 경우`가 있습니다.

useRef 함수는 current 속성을 가지고 있는 객체를 반환하는데, 인자로 넘어온 초기값을 current 속성에 할당합니다.  
이 `current 속성은 값을 변경해도 상태를 변경할 때 처럼 React 컴포넌트가 다시 랜더링되지 않습니다.`  
`React 컴포넌트가 다시 랜더링될 때도 마찬가지로 이 current 속성의 값이 유실되지 않습니다.`

```javascript
import React, { useState, useRef } from 'react';

function ManualCounter() {
  const [count, setCount] = useState(0);
  const intervalId = useRef(null);
  console.log(`랜더링... count: ${count}`);

  const startCounter = () => {
    intervalId.current = setInterval(() => setCount(count => count + 1), 1000);
    console.log(`시작... intervalId: ${intervalId.current}`);
  };

  const stopCounter = () => {
    clearInterval(intervalId.current);
    console.log(`정지... intervalId: ${intervalId.current}`);
  };

  return (
    <>
      <p>자동 카운트: {count}</p>
      <button onClick={startCounter}>시작</button>
      <button onClick={stopCounter}>정지</button>
    </>
  );
}
```

---

## 컴포넌트의 상태값을 리덕스 처럼 관리하기 : useReducer

```javascript
import React, { useReducer } from 'react';

const INITIAL_STATE = { name: 'empty', age: 0 };
function reducer(state, action) {
  switch (action.type) {
    case 'setName':
      return { ...state, name: action.name };
    case 'setAge':
      return { ...state, age: action.age };
    default:
      return state;
  }
}

function Profile() {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  return (
    <div>
      <p>{`name is ${state.name}`}</p>
      <p>{`age is ${state.age}`}</p>
      <input
        type='text'
        value={state.name}
        onChange={e => dispatch({ type: 'setAge', age: e.currentTarget.value })}
      />
    </div>
  );
}
```

`트리의 깊은 곳으로 이벤트 처리 함수 전달하기` - 최상위 전역보다는 좀 더 작은 단위, 특정 컴포넌트 하위 한정된 상태괸리

보통 상위 컴포넌트에서 다수의 상태값을 관리한다.  
이때 자식 컴포넌트로 부터 발생한 이벤트에서 상위 컴포넌트의 상탯값을 변경해야 하는 경우가 많다.  
이를 위해 상위 컴포넌트에서 트리의 깊은 곳까지 이벤트 처리 함수를 전달한다.  
이 작업은 상당히 손이 많이 가고, 코드의 가독성도 떨어진다.

useReducer 훅과 콘텍스트 API를 이용하면 다음과 같이 상위 컴포넌트에서 트리의 깊은 곳으로 이벤트 처리 함수를 쉽게 전달할 수 있다.

```javascript
// ...
export const ProfileDispatch = React.createContext(null); // dispatch 함수를 전달해 주는 콘텍스트 객체를 생성한다.
// ...
function Profile() {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  return (
    <div>
      <p>{`name is ${state.name}`}</p>
      <p>{`age is ${state.age}`}</p>
      {/* Provider 를 통해서 dispatch 함수를 데이터로 전달한다. SomeComponent 하위에 있는 모든 컴포넌트에서는 콘텍스트를 통해서 dispatch 함수를 호출할 수 있다. */}
      <ProfileDispatch.Provider value={dispatch}>
        <SomeComponent />
      </ProfileDispatch.Provider>
    </div>
  );
}
```

---

## useCallback

`모던 리액트 Deep Dive` 책 내용 중 - p210, p214

useCallback 은 특정 함수를 새로 만들지 않고 다시 재사용한다는 의미다.

useCallback 을 추가하면 해당 의존성이 변경됐을 때만 함수가 재성성되는 것을 볼 수 있다.  
이처럼 함수의 재생성을 막아 불필요한 리소스 또는 리렌더링을 방지하고 싶을 때 useCallback 을 사용해 볼 수 있다.

### 왜 useCallback 에 기명함수를 넘겨주었나요?

`모던 리액트 Deep Dive` 책 내용 중 - p14

일반적으로 useCallback 이나 useMemo 를 사용할 때 useEffect 와 마찬가지로 많은 코드가 익명 함수로 첫 번쨰 인수를 넘겨 준다.

기명함수를 작성할 경우,  
이는 `크롬 메모리 탬에서 디버깅을 용이하게 하기 위함이다.` (자바스크립트 매모리 스냅샷, 크롬 리액트 개발 도구에서도 기명함수의 경우 유용)  
익명 함수는 말 그대로 이름이 없어 함수를 추적하기 어렵기 때문이다.

(기명 함수로 선언한 함수를 크롬 개발자 도구에서 디버깅하는 방법은 '크롬 개발자 도구를 활용한 애플리케이션 분석 - p432' 에서 확인!)

#### 참고 - 과거 가이드에서는 기명함수로 예제 제공, 현재 가이드에서는 익명함수(화살표 함수)로 예제 제공

과거 리액트 공식 가이드 사이트 - 일반 함수를 사용!
https://legacy.reactjs.org/docs/hooks-rules.html#explanation

현재 리액트 공식 가이드 사이트 - 익명 함수를 사용!
https://react.dev/reference/react/useCallback

---

## useContext

`모던 리액트 Deep Dive` 책 내용 중 - p220, p222

useContext 는 상위 컴포넌트에서 만들어진 Context 를 함수형 컴포넌트에서 사용할 수 있도록 만들어진 훅이다.  
useContext 를 사용하면 상위 컴포넌트 어딘가에서 선언된 <Context.Provider /> 에서 제공하는 값을 사용할 수 있게 된다.  
만약 여러개의 Provider 가 있다면 가장 가까운 Provider 의 값을 가져오게 된다.

### useContext 를 사용할 때 주의할 점

useContext 를 함수형 컴포넌트 내부에서 사용할 때는 항상 컴포넌트 재활용이 어려워진다는 점을 염주에 둬야 한다.  
useContext 가 선언돼 있으면 Provider 에 의존성을 가지고 있는 셈이 되므로 아무데서나 재활용하기에는 어려운 컴포넌트가 된다.

---

## useImperativeHandle

`모던 리액트 Deep Dive` 책 내용 중 - p231

useImperativeHandle 은 부모에게서 넘겨받은 ref 를 원하는 대로 수정할 수 있는 훅이다.

---

## useLayoutEffect

`모던 리액트 Deep Dive` 책 내용 중 - p232, p233

useEffect 와 동일하나, 모든 DOM 의 변경 후에 동기적으로 발생한다.

1. 리액트가 DOM 을 업데이트
2. useLayoutEffect 를 실행
3. 브라우저에 변경 사항을 반영
4. useEffect 를 실행

---

## useDebugValue

`모던 리액트 Deep Dive` 책 내용 중 - p234

useDebugValue 는 일반적으로 프로덕션 웹서비스에서 사용하는 훅이 아니다.

디버깅하고 싶은 정보를 이 훅에다 사용하면 리액트 개발자 도구에서 볼 수 있다.
