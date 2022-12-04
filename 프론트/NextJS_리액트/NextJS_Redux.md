# Next.js 의 서버사이드 렌더링에 Redux 적용하기

https://slog.website/post/14  
Next.js의 SSR(서버사이드 렌더링) 에 next-redux-wrapper 를 이용하여 Redux를 적용하는 방법  
Next.js의 getInitialProps, getServerSideProps 등에서 store에 접근을 하기 위해 `next-redux-wrapper` 라는 라이브러리가 필요  
또 부가적으로 Server Side 일 때의 Redux Store와 Client Side 일 때의 Redux Store를 합쳐주는 역할도 하기 때문에 Next.js에서 Redux를 적용하려면 해당 라이브러리가 필요

```
$ yarn add next-redux-wrapper redux redux-devtools-extension
```

src/stores/modules/counter.ts

```javascript
export const INCREMENT = "counter/INCREMENT" as const;
export const DECREMENT = "counter/DECREMENT" as const;

export const increment = () => ({
  type: INCREMENT
});

export const decrement = () => ({
  type: DECREMENT
});

export type CounterAction = ReturnType<typeof increment | typeof decrement>;

export interface ICounterState {
  count: number;
}

export const initialState: ICounterState = {
  count: 0
};

export default (state: ICounterState = initialState, action: CounterAction) => {
  switch (action.type) {
    case INCREMENT:
      return { count: state.count + 1 };
    case DECREMENT:
      return { count: state.count - 1 };
    default:
      return state;
  }
};
```

src/stores/modules/index.ts

```javascript
import { AnyAction, CombinedState, combineReducers } from 'redux';
import { HYDRATE } from 'next-redux-wrapper';
import counter, { ICounterState } from './counter';

const rootReducer = (state: IState | undefined, action: AnyAction): CombinedState<IState> => {
  switch (action.type) {
    // 서버 사이드 데이터를 클라이언트 사이드 Store에 통합.
    case HYDRATE:
      return { ...action.payload };
    default: {
      const combineReducer = combineReducers({
        counter,
      });
      return combineReducer(state, action);
    }
  }
};

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;

interface IState {
  counter: ICounterState;
}
```

src/stores/index.ts

```javascript
import { applyMiddleware, createStore, compose } from 'redux';
import { createWrapper } from 'next-redux-wrapper';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducer from './modules';

const configureStore = () => {
  const middlewares = [YOUR_MIDDLEWARES];
  const enhancer =
    process.env.NODE_ENV === 'production'
      ? compose(applyMiddleware(...middlewares))
      : composeWithDevTools(applyMiddleware(...middlewares));
  const store = createStore(reducer, enhancer);
  return store;
};

const wrapper = createWrapper(configureStore, {
  debug: process.env.NODE_ENV !== 'production',
});

export default wrapper;
```

위 작업을 통하여 스토어 구성은 끝이 났습니다.  
하지만 이렇게 할 시 계속해서 Server Side Store가 Client Side Store를 덮어 써버리는 일이 발생합니다.

이 일을 해결하려면 server 모듈을 생성하여 HYDRATE 에서 store를 덮어 썼다면 state로 저장하고,  
만약 이미 덮어 쓴 state가 있으면 `return { ...state }`를 활용하여 더 이상 덮어 쓰지 않도록 구성하면 최초 1회 만 HYDRATE 가 실행되는 효과를 볼 수 있습니다.

## 서버사이드 Redux, Redux-Saga

```javascript
/**
 * 서버사이드 데이터 호출
 */
export const getServerSideProps = wrapper.getServerSideProps(async context => {
  const { store, req, res, params, query /* URL ?a=b 파라미터값 */ } = context;
  const { headers } = req;

  // dispatch (fetch, 데이터 호출)
  //store.dispatch(moduleActionCreator.fetchModuleTest());

  // 호출하는 환경이 서버일 경우에는는 모든 sagaTask가 완료된 상태의 스토어를 주입시켜줘야 한다.
  // https://hhyemi.github.io/2021/05/04/ssrprops.html
  // https://okky.kr/articles/1042931
  store.dispatch(END); // redux-saga 의 END 액션 이용하여 saga task 가 종료되도록 한다.
  await (store as SagaStore).sagaTask?.toPromise(); // saga task 가 모두 종료되면 resolve 된다.

  // props (컴포넌트에 전달 값)
  return {
    props: {
      referer: headers?.referer || '',
    },
  };
});
```

## Redux 전역 상태

https://react-redux.js.org/using-react-redux/accessing-store#using-reactreduxcontext-directly

```javascript
import React, { useContext } from 'react';
import { ReactReduxContext } from 'react-redux';

// Somewhere inside of a <Provider>
function MyConnectedComponent() {
  const { store } = useContext(ReactReduxContext);

  /*
  return (
    <ReactReduxContext.Consumer>
      {({ store }) => {
        // do something useful with the store, like passing it to a child
        // component where it can be used in lifecycle methods
      }}
    </ReactReduxContext.Consumer>
  )
  */
}
```

---
