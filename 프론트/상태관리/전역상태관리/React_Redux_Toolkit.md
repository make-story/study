# Redux Toolkit (TypeScript 지원)

https://redux-toolkit.js.org/

```
$ npm install react-redux @reduxjs/toolkit
```

- Redux 와 비교
  - Redux Toolkit을 사용하면 `리듀서, 액션타입, 액션 생성함수, 초기상태를 하나의 함수로 편하게 선언`
  - `Typescript 지원`
  - `Immer 가 내장`되어있기 때문에, 불변성을 유지하기 위하여 번거로운 코드들을 작성하지 않고 원하는 값을 직접 변경하면 알아서 불변셩 유지되면서 상태가 업데이트

```javascript
import { createSlice } from '@reduxjs/toolkit';

// 리듀서와 액션 생성 함수를 한방에 만들 수 있음
const msgboxSlice = createSlice({
  name: 'msgbox',
  initialState: {
    open: false,
    message: '',
  },
  reducers: {
    open(state, action) {
      state.open = true;
      state.message = action.payload;
    },
    close(state) {
      state.open = false;
    },
  },
});

export default msgboxSlice;
```

> 리덕스를 사용 할 때, TypeScript를 사용하지 않으면,  
> 우리가 컴포넌트에서 상태를 조회할때, 그리고 액션생성 함수를 사용 할 때 자동완성이 되지 않으므로 실수하기가 쉽습니다.

```javascript
// Typescript 사용
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type MsgboxState = {
  open: boolean,
  message: string,
};

const initialState: MsgboxState = {
  open: false,
  message: '',
};

const msgboxSlice = createSlice({
  name: 'msgbox',
  initialState,
  reducers: {
    open(state, action: PayloadAction<string>) {
      state.open = true;
      state.message = action.payload;
    },
    close(state) {
      state.open = false;
    },
  },
});

export default msgboxSlice;
```

## Redux 와 Redux Toolkit 차이점

https://velog.io/@inwoong100/Redux-toolkit%EA%B3%BC-Redux%EC%9D%98-%EC%B0%A8%EC%9D%B4%EC%A0%90  
https://redux-toolkit.js.org/introduction/getting-started

immer, redux, redux-devtools-extension 자체 내장

## 사용하는 이유

https://kyounghwan01.github.io/blog/React/redux/redux-toolkit

`redux`를 아무 라이브러리 없이 사용할 때 (actionType 정의 -> 액션 함수 정의 -> 리듀서 정의) 1개의 액션을 생성합니다.  
이렇게 필요하지만 너무 많은 코드가 생성되니 `redux-actons`라는 것을 사용하게 되었고,  
불변성을 지켜야하는 원칙 때문에 `immer`를 사용하게되고,  
store 값을 효율적으로 핸들링하여 불필요 리렌더링을 막기 위해 `reselect`를 쓰게 되었으며,  
비동기를 수월하게 하기위해, `thunk나 saga`를 설치하여 redux를 더 효율적으로 사용하게 됩니다.  
지금 말한 것만 총 4~5개의 라이브러리를 설치하여야 위처럼 사용할 수 있습니다.

그런데, `redux-toolkit은 redux가 공식적으로 만든 라이브러리`로, `saga를 제외한 위 기능 모두 지원`합니다.  
또한 typeScript 사용자를 위해 action type, state type 등 TypeScript를 사용할 때 필요한 Type Definition을 공식 지원합니다.

## 지원하는 기능

- redux-action
- reselect
- immer의 produce
- redux-thunk
- Flux Standard Action 강제화
- Type Definition

---

# redux-toolkit 은 redux-thunk 를 기반으로 함

https://yrnana.dev/post/2021-08-29-redux-saga/#redux-toolkit%EC%9D%80-redux-thunk%EB%A5%BC-%EA%B8%B0%EB%B0%98%EC%9C%BC%EB%A1%9C-%ED%95%A8

redux를 사용할때 가능한 redux-toolkit을 사용하고 비동기 처리가 필요하다면 툴킷에 내장된 redux-thunk를 사용하자.

## 서버 데이터 처리나 비동기 처리 만을 한다면!! 서버 state 를 관리하기 위한 라이브러리인 react-query나 swr을 도입 검토가 좋음!

서버에서 받아오는 데이터를 무조건 redux에 저장할 필요가 없고,  
isLoading 나 error 나 데이터 캐싱 등 서버 상태를 다루기 위해  
매번 서버 상태와 관련된 프로퍼티를 redux store 에 추가하던 비용을 생각하면  
서버 상태 관리는 클라이언트 전역 상태 관리와 분리할 필요가 있다

---

# 예제

https://velog.io/@760kry/Redux-Toolkit

## 1. `CreateSlice` 를 통해 Action 과 Reducer 를 한 번에 정의할 수 있다.

문자열 이름(name), 초기 상태 값(initialState), 상태 업데이트 방법(reducers)을 정의

store/slice/user.ts

```typescript
import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  name: null,
  isLogin: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserName: (state, action) => {
      state.name = action.payload;
    },
    setUserLogin: (state, action) => {
      state.isLogin = action.payload;
    },
  },
});

export const { setUser, setUserLoading } = userSlice.actions;

export default userSlice.reducer;
```

## 2. `combineReducers` 는 Reducer 들을 모두 합쳐주는 것이다.

이것이 중요한 이유는 store에서 reducer를 단 1개만 받을 수 있기 때문이다.  
따라서 combineReducers에서 Reducer들을 모두 합쳐주고 store에서 모두 합쳐진 reducer를 사용하면 된다.

rootReducer.ts

```typescript
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from './store/slice/user';

/*
 * combineReducers 를 사용하여 사용할 리듀서를 사용할 키값과 함께 정의한다.
 */
const rootReducer = combineReducers({
  userReducer: userReducer,
});

export default rootReducer;
```

## 3. `configureStore` 는 슬라이스에서 리듀서 함수를 가져와서 스토어에 추가한다.

store.ts

```typescript
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';

import rootReducer from './rootReducer';

//const sagaMiddleware = createSagaMiddleware();

/*
 * configureStore를 실행하여 옵션과 함께 스토어를 생성한다.
 */
const store = configureStore({
  reducer: rootReducer,
  devTools: true,
  middleware: getDefaultMiddleware =>
    // 기본 미들웨어 설정
    // 공식문서: https://redux-toolkit.js.org/api/getDefaultMiddleware
    //
    // thunk는 사용하지 않기로 함에 따라 false로 설정한다.
    // immutableCheck, serializableCheck는 개발을 돕는 도구로, true로 설정하여도 production에서는 활성화 되지 않는다.
    // 모두 true 설정 시 기본값은 아래와 같다.
    // - node env production: [thunk]
    // - node env development: [thunk, immutableCheck, serializableCheck]
    getDefaultMiddleware({
      thunk: false,
      // Immutability Middleware 활성화 여부
      // https://redux-toolkit.js.org/api/immutabilityMiddleware
      //
      // 주의! Redux state는 불변성을 유지해야 한다.
      // https://ko.redux.js.org/tutorials/fundamentals/part-1-overview/#the-redux-store
      // - You must never directly modify or change the state that is kept inside the Redux store
      // - Instead, the only way to cause an update to the state is to create a plain action object that describes "something that happened in the application", and then dispatch the action to the store to tell it what happened.
      immutableCheck: true,
      // Serializability Middleware 활성화 여부
      // https://redux-toolkit.js.org/api/serializabilityMiddleware
      //
      // 주의! Redux action 과 state는 직렬화 가능한 값만 포함해야 한다.
      // https://ko.redux.js.org/tutorials/essentials/part-4-using-data/#storing-dates-for-posts
      // - Redux actions and state should only contain plain JS values like objects, arrays, and primitives.
      // - Don't put class instances, functions, or other non-serializable values into Redux!
      serializableCheck: true,
    })
      // 추가 미들웨어 설정
      .concat([/*injectAxiosMiddleware, sagaMiddleware, */ logger]),
  // preloadedState: (서버 사이드 렌더링 전용)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export default store;
```

## 4. React 에 `Redux 스토어 전달`하기

`<Provider>를 감싸 생성된 저장소(store)를 전달`한다.

src/index.tsx

```typescript
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import store from 'src/services/store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
);

reportWebVitals();
```

## 5. 상태 변경 및 확인

react-redux에서 제공하는 useDispatch, useSelector로 상태 관리를 한다.

```typescript
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'src/services/store';
import { setUserName } from 'src/services/store/slice/user';

const MainPage = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.userReducer);

  console.log(user);

  return (
    <div>
      <button onClick={() => dispatch(setUserName('raeyoung'))}>test</button>
    </div>
  );
};

export default MainPage;
```

---

# RTK Query

https://redux-toolkit.js.org/rtk-query/overview

RTK 쿼리는 강력한 데이터 가져오기 및 캐싱 도구입니다.

# Next.js 13 이상 대응

일반적인 실수는 서버 컴포넌트와 Context 를 함께 쓰려고 하는 것과  
App Router 에 Provider 를 배치하는 것입니다.

`클라이언트 컴포넌트 트리에 Provider 를 배치하고, 서버 컴포넌트 트리에 해당 클라이언트 컴포넌트를 포함해야 한다!`

https://hackernoon.com/how-to-manage-state-in-nextjs-13-using-redux-toolkit
