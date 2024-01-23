# Next.js 의 서버사이드 렌더링에 Redux 적용하기

https://slog.website/post/14

`예체 참고!`  
https://github.com/phryneas/ssr-experiments

Next.js 의 SSR(서버사이드 렌더링) 에 next-redux-wrapper 를 이용하여 Redux를 적용하는 방법  
Next.js 의 `getInitialProps, getServerSideProps 등에서 store 에 접근`을 하기 위해 `next-redux-wrapper` 라는 라이브러리가 필요  
또 `부가적으로 Server Side 일 때의 Redux Store 와 Client Side 일 때의 Redux Store 를 합쳐주는 역할`도 하기 때문에
Next.js에서 Redux를 적용하려면 해당 라이브러리가 필요

`23년 12월 기준, next-redux-wrapper 개발한 개발자에 따르면 Next.js 13 이상 버전에서 next-redux-wrapper 적용 가이드는 아직 없는 상황이라고 함`

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

const rootReducer = (
  state: IState | undefined,
  action: AnyAction,
): CombinedState<IState> => {
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

pages/\_app.tsx

```javascript
import wrapper from '../stores';

// ...

App.getInitialProps = async ({
  Component,
  ctx,
}: AppContext): Promise<AppInitialProps> => {
  let pageProps = {};

  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }

  return { pageProps };
};

export default wrapper.withRedux(App);
```

위 작업을 통하여 스토어 구성은 끝이 났습니다.  
하지만 이렇게하면 `계속해서 Server Side Store 가 Client Side Store 를 덮어 써버리는 일이 발생`합니다.

이 일을 해결하려면 server 모듈을 생성하여 HYDRATE 에서 store 를 덮어 썼다면 state로 저장하고,  
만약 이미 덮어 쓴 state가 있으면 `return { ...state }`를 활용하여 더 이상 덮어 쓰지 않도록 구성하면  
최초 1회 만 HYDRATE 가 실행되는 효과를 볼 수 있습니다.

---

# hydrate 시 redux state 초기화

https://hoons-up.tistory.com/68

---

## getServerSideProps 에서의 Redux, Redux-Saga 예시

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

## Redux 전역 상태 접근

https://react-redux.js.org/using-react-redux/accessing-store#using-reactreduxcontext-directly

```javascript
import React, { useContext } from 'react';
import { useStore, ReactReduxContext } from 'react-redux';

// Somewhere inside of a <Provider>
function MyConnectedComponent() {
  const store = useStore();
  //const { store } = useContext(ReactReduxContext); // 권장하지 않는 방식

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

# 이슈

## Router 통해 이동 시 Hydrate가 첫번째 렌더링 후에 실행되는 문제 - next-redux-wrapper

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
