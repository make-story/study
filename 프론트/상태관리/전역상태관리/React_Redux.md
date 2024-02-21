# 리덕스(Redux) - 상태관리 라이브러리 (Global State Management Library)

## 리덕스 기본원칙

https://redux.js.org/understanding/thinking-in-redux/three-principles

기본 원칙을 충족하기 위해서 Redux를 사용하는데는 장황한 Boilerplate 코드가 요구됩니다.  
이러한 이슈를 해결하기 위한 redux-toolkit의 등장 이후 Boilerplate 코드가 많이 줄어들었음에도 불구하고  
Redux로 비동기 데이터를 관리하는 일에는 여전히 불필요하게 느껴지는 반복되는 Boilerplate 코드가 필요합니다.

## FSA(Flux Standard Action)

https://github.com/redux-utilities/flux-standard-action

객체는 액션을 구분할 고유한 문자열을 가진 `type` 필드가 반드시 있으며,  
`payload` 필드에 데이터를 담아 전달한다.  
그 외에 `meta`, `error` 필드를 가질 수도 있다.

```javascript
{
	type: 'number/increment',
	payload: {
		amount: 1
	}
}
```

## 리덕스 잘 사용하기

https://velog.io/@velopert/using-redux-in-2021

# Redux 에 넣을 수 있는 상태값 타입

https://ko.redux.js.org/tutorials/essentials/part-4-using-data/#storing-dates-for-posts

https://redux-toolkit.js.org/api/immutabilityMiddleware

https://redux-toolkit.js.org/api/serializabilityMiddleware

```
Redux actions and state should only contain plain JS values like objects, arrays, and primitives. Don't put class instances, functions, or other non-serializable values into Redux!.
```

`클래스 인스턴스(예: new Date()), 함수(() => {}) 또는 기타 직렬화할 수 없는 값을 Redux에 넣지 마세요!`

---

## 리덕스를 사용하여 리액트 애플리케이션 상태 관리하기

리액트 프로젝트에서 리덕스를 사용할 때 가장 많이 사용하는 패턴은  
`프레젠테이셔널 컴포넌트`와 `컨테이너 컴포넌트`를 `분리`하는 것입니다.  
여기서 `프레젠테이셔널 컴포넌트`란 주로 상태 관리가 이루어지지 않고, 그저 props 를 받아 와서 화면에 UI를 보여 주기만 하는 컴포넌트를 말합니다.  
이와 달리 `컨테이너 컴포넌트`는 리덕스와 연동되어 있는 컴포넌트로, 리덕스로부터 상태를 받아오기도 하고, 리덕스 스토어에 액션을 디스패치(액션발생시키기)하기도 합니다.

---

```bash
$ yarn add redux
```

리덕스 개발자 도구 라이브러리

```bash
$ yarn add redux-devtools-extension
```

리덕스 로그 출력 미들웨어 라이브러리

```bash
$ yarn add redux-logger
```

- 액션  
  상태에 어떠한 변화가 필요하면 액션(action)이란 것이 발생합니다.  
  `액션 객체는 type 필드를 반드시 가지고 있어야 합니다.`  
  이 값을 액션의 이름이라 생각하면 됩니다.

```javascript
{
  type: '액션의 이름';
}
```

- 액션 생성 함수  
  액션 생성 함수(action creator)는 액션 객체를 만들어 주는 함수입니다.

```javascript
const actionCrearor = () => ({
  type: '액션의 이름',
});
```

`{ type:'액션의 이름' }` 형태로 액션 객체를 만들 수 있지만, 매번 액션 객체를 직접 작성하기 번거로울 수 있고,  
만드는 과정에서 실수로 정보를 놓칠 수도 있습니다. 이러한 일을 방지하기 위해 이를 함수로 만들어서 관리합니다.

- 리듀서  
  리듀서(reducer)는 변화를 일으키는 함수입니다.  
  액션을 만들어서 발생시키면 리듀서가 현재 상태와 전달받은 액션 객체를 파라미터로 받아 옵니다. 그리고 두 값을 참고하여 새로운 상태를 만들어서 반환해 줍니다.

```javascript
function reducer(state, action) {
  switch (action.type) {
    case '액션의 이름':
      return {
        ...state, // 불변성 유지
        // ...
      };
    default:
      return state;
  }
}
```

- 스토어  
  프로젝트에 리덕스를 적용하기 위해 스토어(store)를 만듭니다.  
  한 개의 프로젝트는 단 하나의 스토어만 가질 수 있습니다.

- 디스패치  
  디스패치(dispatch)는 스토어의 내장 함수 중 하나입니다.  
  디스패치는 '액션을 발생시키는 것'이라고 이해하면 됩니다.

- 구독  
  구독(subscribe)도 스토어의 내장 함수 중 하나입니다.  
  subscribe 함수 안에 리스터 함수를 파라미터로 넣어서 호출해 주면, 이 리스너 함수가 액션이 디스패치되어 상태가 업데이트 될 떄마다 호출됩니다.

```javascript
const listener = () => {
  console.log('상태값이 변경되어 실행되었습니다!');
};
const unsubscribe = store.subscribe(listener);
unsubscribe(); // 추후 구독을 비활성화할 때 함수를 호출
```

---

- 개념 (용어설명)

1. 액션 - `액션 이름 정의`  
   상태에 어떠한 변화가 필요하면 액션(action)이란 것이 발생합니다. 이는 하나의 객체로 표현  
   액션 객체는 type 필드를 반드시 가지고 있어야 합니다.  
   이 값을 액션의 이름이라고 생각하면 됩니다.  
   그리고 그 외의 값들은 나중에 상태 업데이트를 살 때 참고해야할 값으로 넣을 수 있음

```javascript
{
  type: 'TOGGLE_VALUE';
}
```

2. 액션 생성 함수 - `액션 객체 생성`  
   액션 생성 함수(action creator)는 액션 객체를 만들어 주는 함수입니다.  
   어떤 변화를 일으켜야 할 때마다 액션 객체를 만들어야 하는데 매번 액션 객체를 직접 작성하기 번거로울 수도 있고, 만드는 과정에서 실수로 정보를 놓칠 수도 있습니다.  
   이러한 일을 방지하기 위해 이를 함수로 만들어서 관리합니다.

```javascript
const toggleValue = () => ({ type: 'TOGGLE_VALUE ' });
```

3. 리듀서 - `상태 값 변경`  
   리듀서(reducer)는 변화를 일으키는 함수입니다.  
   액션을 만들어서 발생시키면 리듀서가 현재 상태와 전달받은 액션 객체를 파라미터로 받아옵니다.  
   그리고 두 값을 참고하여 새로운 상태를 만들어서 반환해 줍니다.

```javascript
const reducer = (state, action) => {
  switch (action.type) {
    case 'TOGGLE_VALUE':
      return {
        ...state,
        // 변경
      };
  }
};
```

4. 스토어  
   프로젝트에 리덕스를 적용하기 위해 스토어(store)를 만듭니다.
   `한 개의 프로젝트는 단 하나의 스토어`만 가질 수 있습니다.

5. 디스패치 - `리듀서 함수 실행`  
   디스패치(dispatch, 보내다/해치우다)는 스토어의 내장 함수 중 하나입니다.
   디스패치는 `액션을 발생시키는 것`이라고 이해하면 됩니다.
   이 함수는 dispatch(action) 과 같은 형태로 액션 객체를 파라미터로 넣어서 호출합니다.
   이 함수가 호출되면 스토어는 리듀서 함수를 실행시켜서 새로운 상태를 만들어 줍니다.

6. 구독  
   구독(subscribe)도 스토어의 내장 함수 중 하나입니다.
   subscribe 함수 안에 리스너 함수를 파라미터로 넣어서 호출해 주면,
   이 리스너 함수가 액션이 디스패치되어 `상태가 업데이트될 때마다 호출`됩니다.

```javascript
const listener = () => console.log('상태변경됨');
const unsubscribe = store.subscribe(listener);
unsubscribe(); // 추후 구독을 비활성화할 때 함수를 호출
```

---

# 리덕스에서 불변성

리덕스에서 불변성을 유지해야 하는 이유는 내부적으로 데이터가 변경되는 것을 감지하기 위해 얕은 비교(shallow equality) 검사를 하기 때문입니다.  
객체의 변화를 감지할 때 객체의 깊숙한 안쪽까지 비교하는 것이 아니라 겉핥기 식으로 비교하여 좋은 성능을 유지할 수 있는 것이죠.

# 프레젠테이셔널 컴포넌트

주로 상태 관리가 이루어지지 않고, 그저 props 를 받아 와서 화면에 UI를 보여주기만 하는 컴포넌트

# 컨테이너 컴포넌트 만들기

리덕스 스토어와 연동된 컴포넌트를 컨테이너 컴포넌트라고 부릅니다.  
컨테이너 컴포넌트는 리덕스와 연동되어 있는 컴포넌트로, 리덕스로부터 상태를 받아오기도 하고 리덕스 스토어에 액션을 디스패치하기도 합니다.

# Ducks 패턴

액션 타입, 액션 생성 함수, 리듀서 함수를 기능별로 파일 하나에 몰아서 다 작성하는 방식입니다.

# `리덕스 설계 순서`

1. modules/counter 리덕스 모듈 만들기
   - 상태 정의
2. modules/index 루트 리듀서 만들기
   - 각 리듀스 모듈 하나로 합침
3. index.js 에 스토어를 생성한 후, Provider 로 리액트 프로젝트에 리덕스를 적용
   - createStore 통해 스토어 생성
   ```javascript
   <Provider store={store}>
     <App />
   </Provider>
   ```
4. components/Counter 프레젠케이셔널 컴포넌트 만들기
   - 그저 props 를 받아 와서 화면에 UI를 보여주기만 하는 컴포넌트
5. containers/CounterContainer 컨테이너 컴포넌트 만들기
   - 리덕스 스토어와 연동된 컴포넌트
6. App 에서 CounterContainer 를 렌더링

# 폴더/파일 구조

- redux-tutorial
  - components
    - Counter.js
  - containers
    - CounterContainer.js
  - modules
    - counter.js
    - index.js
  - App.js
- index-redux-tutorial.js

---

# 불변성의 중요성

기존의 값을 직접 수정하지 않으면서 새로운 값을 만들어 내는 것을 '불변성을 지킨다'라고 합니다.

```javascript
const array = [1, 2, 3, 4, 5];

const nextArrayBad = array; // 배열을 복사하는 것이 아니라 똑같은 배열을 가리킵니다.
nextArrayBad[0] = 100;
console.log(array === nextArrayBad); // 완전히 똑같은 배열이기 때문에 true

const nextArrayGood = [...array]; // 배열 내부의 값을 모두 복사합니다.
nextArrayGood[0] = 100;
console.log(array === nextArrayGood); // 다른 배열이기 때문에 false

const object = {
  foo: 'bar',
  value: 1,
};

const nextObjectBad = object; // 객체가 복사되지 않고, 똑같은 객체를 가리킵니다.
nextObjectBad.value = nextObjectBad.value + 1;
console.log(object === nextObjectBad); // 같은 객체이기 때문에 true

const nextObjectGood = {
  ...object, // 기존에 있던 내용을 모두 복사해서 넣습니다.
  value: object.value + 1, // 새로운 값을 덮어 씁니다.
};
console.log(object === nextObjectGood); // 다른 객체이기 때문에 false
```

`불변성이 지켜지지 않으면 객체 내부의 값이 새로워져도 바뀐 것을 감지하지 못합니다.`

전개 연산자(...문법)를 사용하여 객체나 배열 내부의 값을 복사할 떄는 얕은 복사(shallow copy)를 하게 됩니다.  
즉, 내부의 값이 완전히 새로 복사되는 것이 아니라 가장 바깥쪽에 있는 값만 복사됩니다.  
따라서 `내부의 값이 객체 혹은 배열이라면 내부의 값 또한 따로 복사해주어야 합니다.`

```javascript
const todos = [
  { id: 1, checked: true },
  { id: 2, checked: false },
];
const nextTodos = [...todos];

nextTodos[0].checked = false;
console.log(todos[0] === nextTodos[0]); // 아직까지는 똑같은 객체를 가리키고 있기 때문에 true

nextTodos[0] = {
  ...nextTodos[0],
  checked: false,
};
console.log(todos[0] === nextTodos[0]); // 새로운 객체를 할당해 주었기에 false
```

## immer 를 사용하여 더 쉽게 불변성 유지하기

객채의 구조가 엄청나게 깊어지면 불변성을 유지하면서 이를 업데이트하는 것이 매우 힘듭니다.

```javascript
const object = {
  somewhere: {
    deep: {
      inside: 3,
      array: [1, 2, 3, 4],
    },
    bar: 2,
  },
  foo: 1,
};

// somewhere.deep.inside 값을 4로 바꾸기 (불변성을 유지하면서 변경)
let nextObject = {
  ...object,
  somewhere: {
    ...object.somewhere,
    deep: {
      ...object.somewhere.deep,
      inside: 4,
    },
  },
};

// somewhere.deep.array 에 5 추가하기
let nextObject = {
  ...object,
  somewhere: {
    ...object.somewhere,
    deep: {
      ...object.somewhere.deep,
      array: object.somewhere.deep.array.concat(5),
    },
  },
};
```

이러한 상황에 immer 라는 라이브러리를 사용하면, 구조가 복잡한 객체도 매우 쉽고 짧은 코드를 사용하여 불변성을 유지하면서 업데이트해 줄 수 있습니다.

```bash
$ yarn add immer
```

```javascript
import produce from 'immer';

const nextState = produce(originalState, draft => {
  // 바꾸고 싶은 값 바꾸기
  draft.somewhere.deep.inside = 5;
});
```

> produce 라는 함수는 두 가지 파라미터를 받습니다.  
> 첫 번째 파라미터는 수정하고 싶은 상태이고,  
> 두 번째 파라미터는 상태를 어떻게 업데이트할지 정의하는 함수입니다.  
> 두 번째 파라미터로 전달되는 함수 내부에서 원하는 값을 변경하면, produce 함수가 불변성 유지를 대신해 주면서 새로운 상태를 생성해 줍니다.

1. useState 에서 사용 예

```javascript
import produce from 'immer';

const originalState = [
  {
    id: 1,
    todo: 'test1',
    checked: true,
  },
  {
    id: 2,
    todo: 'test2',
    checked: false,
  },
];

// useState 의 함수형 업데이트와 immer 함께 쓰기
// immer 에서 제공하는 produce 함수를 호출할 때, 첫 번째 파라미터가 함수형태라면 업데이트 함수를 반환합니다.
const nextState = produce(originalState, draft => {
  // id 가 2 인 항목의 checked 값을 true 로 설정
  const todo = draft.find(value => value.id === 2); // id 로 항목 찾기
  todo.checked = true;

  // 배열에 새로운 데이터 추가
  draft.push({
    id: 3,
    todo: 'test3',
    checked: false,
  });

  // id === 1 인 항목을 제거하기
  draft.splice(
    draft.findIndex(t => t.id === 1),
    1,
  );
});
```

2. redux 에서 사용 예

```javascript
import { createAction, handleActions } from 'redux-actions';
import produce from 'immer'; // 불변성 관리 라이브러리

// immer 사용하여 쉽게 불변성 관리 (... 연산자를 사용하는 방식이 아닌 produce 사용)
// immer 를 사용한다고 해서 모든 업데이트 함수에 immer를 적용할 필요는 없습니다.
const todos = handleActions(
  {
    [CHANGE_INPUT]: (state, { payload: input }) =>
      produce(state, draft => {
        draft.input = input;
      }),
    [INSERT]: (state, { payload: todo }) =>
      produce(state, draft => {
        draft.todos.push(todo);
      }),
    [TOGGLE]: (state, { payload: id }) =>
      produce(state, draft => {
        const todo = draft.todos.find(todo => todo.id === id);
        todo.done = !todo.done;
      }),
    [REMOVE]: (state, { payload: id }) =>
      produce(state, draft => {
        const index = draft.todos.findIndex(todo => todo.id === id);
        draft.todos.splice(index, 1);
      }),
  },
  initialState,
);
```

---

### 컨테이너 컴포넌트 만들기

> 리덕스 스토어와 연동된 컴포넌트를 `컨테이너 컴포넌트`라고 부릅니다.

`컨테이너 컴포넌트`는 리덕스와 연동되어 있는 컴포넌트로,  
리덕스로부터 `상태`를 받아오기도 하고 리덕스 `스토어`에 `액션`을 `디스패치`하기도 합니다.

> `컨테이너 컴포넌트` --> 상태값/디스패치 props 통해 넘겨줌 --> `프레젠테이션 컴포넌트`

- Hooks 를 사용하여 컨테이너 컴포넌트 만들기  
  리덕스 스토어와 연동된 컨테이너 컴포넌트를 만들 때 connect 함수를 사용하는 대신  
  react-redux 에서 제공하는 Hooks 를 사용할 수 있습니다.

- useSelector 로 상태 조회하기  
  useSelector Hook 을 사용하면 connect 함수를 사용하지 않고도 리덕스의 상태를 조회할 수 있습니다.  
  const 결과 = useSelector(상태 선택 함수);

- useDispatch 를 사용하여 액션 디스패치하기  
  이 Hook 은 컴포넌트 내부에서 스토어의 내장 함수 dispatch 를 사용할 수 있게 해줍니다.  
  컨테이너 컴포넌트에서 액션을 디스패치해야 한다면 이 Hook 을 사용하면 됩니다.

```javascript
const dispatch = useDispatch();
duspatch({ type: ‘SAMPLE_ACTION’ });
```

- useStore 를 사용하여 리덕스 스토어 사용하기  
  useStore Hook 을 사용하면 컴포넌트 내부에서 리덕스 스토어 객체를 직접 사용할 수 있습니다.

```javascript
const store = useStore();
store.dispatch({ type: ’SAMPLE_ACTION’ });
store.getState();
```

useStore 는 컴포넌트에서 정말 어쩌다가 스토어에 직접 접근해야 하는 상환에만 사용해야 합니다.  
이를 사용해야 하는 상황은 흔치 않을 것입니다.

- connect 함수와의 주요 차이점
  > (Hooks 를 사용하여 컨테이너 컴포넌트 만드는 방식과의 차이)  
  > 컨테이너 컴포넌트를 만들 때 connect 함수를 사용해도 좋고, useSelector 와 useDispatch 를 사용해도 좋습니다.  
  > 하지만 Hooks 를 사용하여 컨테이너 컴포넌트를 만들 대 잘 알아 두어야 할 차이점이 있습니다.

connect 함수를 사용하여 컨테이너 컴포넌트를 만들었을 경우,  
해당 컨테이너 컴포넌트의 부모 컴포넌트가 리렌더링될 때 해당 컨테이너 컴포넌트의 props 가 바뀌지 않았다면 리렌더링이 자동으로 방지해서 성능이 최적화 됩니다.

반면 useSelector 를 사용하여 리덕스 상태를 조회했을 때는 이 최적화 작업이 자동으로 이루어지지 않으므로, 성능 최적화를 위해서는 React.memo 를 컨테이너 컴포넌트에 사용해 주어야 합니다.

```javascript
export default React.memo(컨테이너 컴포넌트);
```

---

# redux-actions

https://redux-actions.js.org/api

`redux-actions 를 사용하면 액션 생성 함수를 더 짧은 코드로 작성할 수 있습니다.`  
(TypeScript 지원을 위해서는 typesafe-actions 를 사용)  
그리고 리듀서를 작성할 때도 switch/case 문이 아닌 handleActions 라는 함수를 사용하여 각 액션마다 업데이트 함수를 설정하는 형식으로 작성해 줄 수 있습니다.

```
$ yarn add redux-actions
```

(Typescript - https://github.com/piotrwitek/typesafe-actions)

```javascript
// modules/counter.js
import { createAction, handleActions } from 'redux-actions'; // redux-actions 라이브러리 활용 (리덕스를 좀 더 편하게 사용하는 방법)

// 1. 액션 타입 정의하기 - 상태관리가 필요한 것의 이름
// '모듈이름/액션이름' 과 같은 형태로 작성 (나중에 프로젝트가 커졌을 때 액션의 이름이 출돌되지 않도록)
const INCREASE = 'counter/INCREASE';
const DECREASE = 'counter/DECREASE';
const TEST = 'counter/TEST';

// 2. 액션 생성 함수 만들기 - 액션 객체를 만들어 주는 함수입니다.
/*
-
createAction 으로 액션을 만들면,
액션에 필요한 추가 데이터는 payload 라는 이름을 사용합니다.

const MY_ACTION = 'sample/MY_ACTION';
const myAction = createAction(MY_ACTION);
const action = myAction('hello world'); 
// 결과 : 
{ 
	type: MY_ACTION, // 액션 객체는 type 필드를 반드시 가지고 있어야 합니다.
	payload: 'hello world' 
}


-
액션 생성 함수에서 받아 온 파라미터를 그대로 payload 에 넣는 것이 아니라 변형을 주어서 넣고 싶다면,
createAction 의 두 번째 파라미터에 payload 를 정의하는 함수를 따로 선언해서 넣어 주면 됩니다.

const MY_ACTION = 'sample/MY_ACTION';
const myAction = createAction(MY_ACTION, text => `${text}!`);
const action = myAction('hello world'); 
// 결과 : 
{ 
	type: MY_ACTION, 
	payload: 'hello world!' 
}


action.payload 접근
const initialState = {
	text: 'initial state'
};
handleActions(
	{
		[MY_ACTION]: (state, action) => {
			return {
				...state,
				text: action.payload
			};
		}
	},
	initialState
)
*/
export const increase = createAction(INCREASE);
export const decrease = createAction(DECREASE);
export const test = createAction(TEST, value => {
  // payload
  // dispatch(test('값')); 디스패치 호출시 파라미터로 넘기는 값을 handleActions 에서 payload 값으로 받음
  /*
	import { useSelector, useDispatch } from 'react-redux'; 
	import { increase, decrease, test } from '../modules/counter';
	
	const dispatch = useDispatch();
	dispatch(test('payload value!'));
	*/
  return value;
});

// 3. 초기 상태 값 (상태는 꼭 객체일 필요가 없습니다. initialState = 0 처럼 숫자값도 작동합니다.)
const initialState = {
  number: 0,
};

// 4. 리듀서 함수 만들기 - 리듀서(reducer)는 변화를 일으키는 함수입니다. (상태값 변경)
const counter = handleActions(
  // 각 액션에 대한 업데이트 함수
  // 각 액션 타입에 따라 상태 변경
  {
    [INCREASE]: (state, action) => {
      // action.payload
      return {
        ...state,
        number: state.number + 1,
      };
    },
    [DECREASE]: (state, action) => {
      // action.payload
      return {
        ...state,
        number: state.number - 1,
      };
    },
    [TEST]: (state, { payload: value }) => {
      console.log('dispatch 호출시 넘겨주는 값', value);
      return {
        ...state,
      };
    },
  },
  // 초기 상태 값
  initialState,
);

export default counter;
```

```javascript
// modules/index.js
import { combineReducers } from 'redux';
import counter from './counter';
import todos from './todos';

// 루트 리듀서 만들기 - combineReducers 이용해 리듀서를 하나로 합쳐주는 것
const rootReducer = combineReducers({
  counter,
  todos,
});

export default rootReducer;
```

```javascript
// index.js
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension'; // Redux DevTools

import App from './App';
import rootReducer from './modules'; // modules/index.js 호출

// 리덕스 스토어 (프로젝트당 하나의 단일스토어 원칙!)
//const store = createStore(rootReducer);
const store = createStore(rootReducer, composeWithDevTools());

// Provider 컴포넌트를 사용하여 프로젝트에 리덕스 적용하기
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
```

```javascript
// components/Counter.js
import React from 'react';

// 프레젠테이셔널 컴포넌트 - 주로 상태 관리가 이루어지지 않고, 그저 props 를 받아 와서 화면에 UI를 보여주기만 하는 컴포넌트
const Counter = ({ number, onIncrease, onDecrease, onTest }) => {
  return (
    <div>
      <h1>{number}</h1>
      <div>
        <button onClick={onIncrease}>+1</button>
        <button onClick={onDecrease}>-1</button>
        <button onClick={onTest}>테스트</button>
      </div>
    </div>
  );
};

export default Counter;
```

```javascript
// containers/CounterContainer
import React, { useCallback } from 'react';
import { connect, useSelector, useDispatch } from 'react-redux';
import Counter from '../components/Counter';
import { increase, decrease, test } from '../modules/counter';

// 컨테이너 컴포넌트 만들기 - 리덕스 스토어와 연동된 컴포넌트를 컨테이너 컴포넌트라고 부릅니다.
const CounterContainer = () => {
  // 상태조회
  // useSelector Hook 을 사용하면 connect 함수를 사용하지 않고도 리덕스의 상태를 조회할 수 있습니다.
  const number = useSelector(state => state.counter.number);
  // 디스패치
  // useDispatch Hook 은 컴포넌트 내부에서 스토어의 내장 함수 dispatch 를 사용할 수 있게 해줍니다.
  const dispatch = useDispatch();

  // 성능최적화 전
  /*return (
		<Counter number={number} onIncrease={() => dispatch(increase())} onDecrease={() => dispatch(decrease())}
		/>
	);*/

  // useCallback 를 통해 성능 최적화 가능
  // 숫자가 바뀌어서 컴포넌트가 리렌더링될 때마다 onIncrease 함수와 onDecrease 함수가 새롭게 만들어지고 있으므로 최적화 필요
  const onIncrease = useCallback(() => dispatch(increase()), [dispatch]);
  const onDecrease = useCallback(() => dispatch(decrease()), [dispatch]);
  const onTest = useCallback(() => dispatch(test('YSM TEST!!!')), [dispatch]);
  return (
    <Counter
      number={number}
      onIncrease={onIncrease}
      onDecrease={onDecrease}
      onTest={onTest}
    />
  );
};

// connect 함수를 활용하여 컴포넌트 연동하는 방식 참고 (비추천) - Redux 상태와 React 컴포넌트간 연결
/*
connect(
	리덕스 스토어 안의 상태를 컴포넌트의 props로 넘겨주지 위해 설정하는 함수,
	액션 생성 함수를 컴포넌트의 props로 넘겨조기 위해 사용하는 함수
)(연동할 컴포넌트)

const mapStateToProps = state => ({number: state.counter.number});
const mapDispatchToProps = dispatch => {
	return {
		increase: () => {
			console.log('increase');
			dispatch(increase());
		},
		decrease: () => {
			console.log('decrease');
			dispatch(decrease());
		},
	};
};
export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(CounterContainer);
*/

export default CounterContainer;
```

```javascript
// App.js
import React from 'react';
import CounterContainer from './containers/CounterContainer';

const App = () => {
  return (
    <div>
      <CounterContainer />
    </div>
  );
};

export default App;
```

---

`index-redux-tutorial.js`

```javascript
// index-redux-tutorial.js

import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension'; // Redux DevTools

import ReduxApp from './redux-tutorial/App';
import rootReducer from './redux-tutorial/modules'; // modules/index.js 호출

import '../css/index.css';

// 리덕스 스토어
//const store = createStore(rootReducer);
const store = createStore(rootReducer, composeWithDevTools());

// Provider 컴포넌트를 사용하여 프로젝트에 리덕스 적용하기
ReactDOM.render(
  <Provider store={store}>
    <ReduxApp />
  </Provider>,
  document.getElementById('root'),
);
```

---

`redux-tutorial/App.js`

```javascript
// redux-tutorial/App

import React from 'react';
//import Counter from './components/Counter'; // 프레젠테이셔널 컴포넌트
import CounterContainer from './containers/CounterContainer'; // 컨테이너 컴포넌트

/*const App = () => {
    return (
        <div>
            <Counter number={0} />
        </div>
    );
};*/
const App = () => {
  return (
    <div>
      <CounterContainer />
    </div>
  );
};

export default App;
```

`redux-tutorial/containers/CounterContainer`

# Redux와 React의 연결

https://code.tutsplus.com/ko/tutorials/getting-started-with-redux-connecting-redux-with-react--cms-30352

```javascript
// redux-tutorial/containers/CounterContainer

import React, { useCallback } from 'react';
import { connect, useSelector, useDispatch } from 'react-redux';
import Counter from '../components/Counter'; // 프레젠테이셔널 컴포넌트
import { increase, decrease } from '../modules/counter'; // 리덕스 모듈

/*
1. Redux와 React의 연결
컨테이너 컴포넌트 - connect 함수 사용 방식  (React 스토어 상태와 React 컴포넌트간 연결)
*/
// 이 컴포넌트를 리덕스와 연동하려면 react-redux 에서 제공하는 connect 함수를 사용
/*const CounterContainer = ({ number, increase, decrease }) => {
	return (
		<Counter number={number} onIncrease={increase} onDecrease={decrease} />
	);
};*/

// 리덕스 스토어 안의
// 상태를 컴포넌트의 props 로 넘겨주기 위해 설정하는 함수
/*const mapStateToProps = state => ({
	number: state.counter.number,
});*/
// 액션 생성 함수를 컴포넌트의 props 로 넘겨주기 위해 사용하는 함수
/*const mapDispatchToProps = dispatch => ({
	increase: () => {
		console.log('increase');
		dispatch(increase());
	},
	decrease: () => {
		console.log('decrease');
		dispatch(decrease());
	},
});*/

// connect(mapStateToProps, mapDispatchToProps)(연동할 컴포넌트)
/*export default connect(
	// CounterContainer 에 props 로 넘겨주는 값 (함수의 경우 실행 반환 값)
	mapStateToProps,
	mapDispatchToProps,
)(CounterContainer);*/

// mapStateToProps / mapDispatchToProps 함수를 별도 선언하지 않고, 바로 사용 방법
/*export default connect(
	state => ({
		number: state.counter.number,
	}),
	displatch => ({
		increase: () => displatch(increase()),
		decrease: () => displatch(decrease()),
	}),
)(CounterContainer);*/

// mapDispatchToProps 에 해당하는 파라미터를 함수 형태가 아닌 액션 생성 함수로 이루어진 객체 형태로 넣어 주는 방법
// connect 함수가 내부적으로 bindActionCreators 작업을 대신해 준다.
/*export default connect(
	// 상태를 컴포넌트의 props 로 넘겨주기 위해 설정하는 함수
	state => ({
		number: state.counter.number,
	}),
	// 액션 생성 함수를 컴포넌트의 props 로 넘겨주기 위해 사용하는 함수 (객체 형태로 넣어주면 connect 함수가 내부적으로 대신 작업)
	{
		increase,
		decrease,
	},
	// 연동할 컨테이너 컴포넌트
)(CounterContainer);*/

/*
2. Redux와 React의 연결
connect 함수가 아닌, useSelector, useDispatch Hook 사용 방식 
*/
// useSelector Hook 을 사용하면 connect 함수를 사용하지 않고도 리덕스의 상태를 조회할 수 있습니다.
// useDispatch Hook 은 컴포넌트 내부에서 스토어의 내장 함수 dispatch 를 사용할 수 있게 해줍니다.
const CounterContainer = () => {
  const number = useSelector(state => state.counter.number);
  const dispatch = useDispatch();

  /*return (
		<Counter 
			number={number} 
			onIncrease={() => dispatch(increase())}
			onDecrease={() => dispatch(decrease())}
		/>
	);*/

  // useCallback 를 통해 성능 최적화 가능
  // 숫자가 바뀌어서 컴포넌트가 리렌더링될 때마다 onIncrease 함수와 onDecrease 함수가 새롭게 만들어지고 있으므로 최적화 필요
  const onIncrease = useCallback(() => dispatch(increase()), [dispatch]);
  const onDecrease = useCallback(() => dispatch(decrease()), [dispatch]);
  return (
    <Counter number={number} onIncrease={onIncrease} onDecrease={onDecrease} />
  );
};

// connect 함수가 아닌 useSelector Hook 를 사용할 경우는 바로 반환
export default CounterContainer;
```

`redux-tutorial/components/Counter`

```javascript
// redux-tutorial/components/Counter

// 프레젠테이셔널 컴포넌트 - 주로 상태 관리가 이루어지지 않고, 그저 props 를 받아 와서 화면에 UI를 보여주기만 하는 컴포넌트
import React from 'react';

const Counter = ({ number, onIncrease, onDecrease }) => {
  return (
    <div>
      <h1>{number}</h1>
      <div>
        <button onClick={onIncrease}>+1</button>
        <button onClick={onDecrease}>-1</button>
      </div>
    </div>
  );
};

export default Counter;
```

---

`redux-tutorial/modules/index.js`

```javascript
// redux-tutorial/modules/index.js

/*
루트 리듀서 만들기 - combineReducers 이용해 리듀서를 하나로 합쳐주는 것

-
프로젝트에서 여러 리듀서를 만들었을 경우,
나중에 crateStore 함수를 사용하여 스토어를 만들 때는 리듀서를 하나만 사용해야 합니다.
그렇기 때문에 기존에 만들었던 리듀서를 하나로 합쳐주어야 하는데요.
이 작업은 리덕스에서 제공하는 combineReducers 라는 유틸 함수를 사용하면 쉽게 처리할 수 있습니다.

-
이 루트 리듀서를 index.js 에서,
const store = creteStore(루트 리듀서); 
스토어를 생성한 후,
<Provider store={store}>
    <App />
</Provider>
Provider 로 리액트 프로젝트에 리덕스 적용!
*/
import { combineReducers } from 'redux';
import counter from './counter';

const rootReducer = combineReducers({
  counter,
  // ... 모듈 추가
});

export default rootReducer;
```

---

`redux-tutorial/modules/counter.js`

```javascript
// redux-tutorial/modules/counter.js

/*
리덕스 모듈 만들기 - 상태(action) 정의


> redux-actions
redux-actions 를 사용하면 액션 생성 함수를 더 짧은 코드로 작성할 수 있습니다.
그리고 리듀서를 작성할 때도 switch/case이 아닌 handleActions 라는 함수를 사용하여 각 액션마다 업데이트 함수를 설정하는 형식으로 작성해 줄 수 있습니다.


> createAction - payload
createAction 으로 액션을 만들면,
액션에 필요한 추가 데이터는 payload 라는 이름을 사용합니다.
const MY_ACTION = 'sample/MY_ACTION';
const myAction = createAction(MY_ACTION);
const action = myAction('hello world'); 
결과 : { type: MY_ACTION, payload: 'hello world' }

액션 생성 함수에서 받아 온 파라미터를 그대로 payload 에 넣는 것이 아니라 변형을 주어서 넣고 싶다면,
createAction 의 두 번째 파라미터에 payload 를 정의하는 함수를 따로 선언해서 넣어 주면 됩니다.
const MY_ACTION = 'sample/MY_ACTION';
const myAction = createAction(MY_ACTION, text => `${text}!`);
const action = myAction('hello world'); 
결과 : { type: MY_ACTION, payload: 'hello world!' }
*/
import { createAction, handleActions } from 'redux-actions';

// 1. 액션 타입 정의하기 - 상태관리가 필요한 것의 이름
// '모듈이름/액션이름' 과 같은 형태로 작성 (나중에 프로젝트가 커졌을 때 액션의 이름이 출돌되지 않도록)
const INCREASE = 'counter/INCREASE';
const DECREASE = 'counter/DECREASE';

// 2. 액션 생성 함수 만들기 - 액션 객체를 만들어 주는 함수입니다.
/*
액션 객체는 type 필드를 가지고 있음
{
	type: 'INCREASE', // 필수 - type: 액션이름
	사용자추가 데이터키: 값, // 선택적 - 키: 값
}
어떤 변화가 일으켜야 할 때마다 위와 같은 액션 객체를 만들어야 하는데,
매번 액션 객체를 직접 작성하기 번거로울 수도 있고, 만드는 과정에서 실수로 정보를 놓칠 수도 있습니다.
이러한 일을 방지하기 위해 이를 함수로 만들어서 관리합니다.
*/
//export const increase = () => ({type: INCREASE});
//export const decrease = () => ({type: DECREASE});
export const increase = createAction(INCREASE);
export const decrease = createAction(DECREASE);

// 3. 초기 상태 값 (상태는 꼭 객체일 필요가 없습니다. initialState = 0 처럼 숫자값도 작동합니다.)
const initialState = {
  number: 0,
};

// 4. 리듀서 함수 만들기 - 리듀서(reducer)는 변화를 일으키는 함수입니다. (상태값 변경)
/*function counter(state=initialState, action) {
	switch(action.type) {
		case INCREASE:
			return {
				number: state.number + 1
			};
		case DECREASE:
			return {
				number: state.number - 1
			};
		default:
			return state;
	}
}*/
// handleActions
const counter = handleActions(
  // 각 액션에 대한 업데이트 함수
  {
    [INCREASE]: (state, action) => ({ number: state.number + 1 }),
    [DECREASE]: (state, action) => ({ number: state.number - 1 }),
  },
  // 초기 상태 값
  initialState,
);

export default counter;
```
