# redux-persist

리덕스의 store는 페이지를 새로고침 할 경우 state가 날아감  
localStorage 또는 session에 저장

---

reducer.ts

```tsx
import { combineReducers } from '@reduxjs/toolkit';

import common from '@/common/store/reducer';

/**
 * 각각의 reducer 를 하나로 합쳐준다.
 */
export const reducer = combineReducers({
  common,
});

export const persistReducerList = {
  whitelist: ['common'],
  blacklist: [],
};
```

store.ts

```tsx
/**
 * 리덕스 공식 가이드 (pages 라우터 방식이 아닌, app 라우터 아키텍처 기준 가이드)
 * https://redux.js.org/usage/nextjs
 *
 * 리억스 공식 가이드 내용 중 참고!
 * Next.js 애플리케이션에는 페이지 라우터 와 앱 라우터 라는 두 가지 아키텍처가 있습니다.
 * Pages Router 는 Next.js 의 원래 아키텍처입니다. (Next.js 13 버전 이전)
 * Pages Router 를 사용하는 경우, next-redux-wrapper 라이브러리 / getServerSideProps 사용하여 처리됩니다.
 */
import {
  configureStore,
  type ThunkAction,
  type Action,
} from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  Persistor,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import createWebStorage from 'redux-persist/lib/storage/createWebStorage'; // https://github.com/vercel/next.js/discussions/15687
import {
  useSelector as useReduxSelector,
  useDispatch as useReduxDispatch,
  useStore as useReduxStore,
  type TypedUseSelectorHook,
} from 'react-redux';
import { createLogger } from 'redux-logger';

import { reducer, persistReducerList } from './reducer';

/**
 * Next.js 공식 예제 방식
 * https://github.com/vercel/next.js/blob/canary/examples/with-redux/lib/redux/store.ts
 */
/*
export const reduxStore = configureStore({
  reducer,
  middleware: getDefaultMiddleware => {
    return getDefaultMiddleware().concat([]);
  },
});
export const useDispatch = () => useReduxDispatch<ReduxDispatch>();
export const useSelector: TypedUseSelectorHook<ReduxState> = useReduxSelector;
export type ReduxStore = typeof reduxStore;
export type ReduxState = ReturnType<typeof reduxStore.getState>;
export type ReduxDispatch = typeof reduxStore.dispatch;
export type ReduxThunkAction<ReturnType = void> = ThunkAction<
  ReturnType,
  ReduxState,
  unknown,
  Action
>;
*/

/**
 * Redux 공식 예제 방식
 * https://redux.js.org/usage/nextjs
 */
export const makeStore = () => {
  const createNoopStorage = () => {
    return {
      getItem(_key: any) {
        return Promise.resolve(null);
      },
      setItem(_key: any, value: any) {
        return Promise.resolve(value);
      },
      removeItem(_key: any) {
        return Promise.resolve();
      },
    };
  };

  const persistedReducer = persistReducer(
    {
      key: 'root',
      version: 1,
      /*storage:
        // redux-persist Next.js 이상 대응을 위한 코드
        typeof window === 'undefined'
          ? createNoopStorage()
          : createWebStorage('local'),*/
      storage,
      whitelist: persistReducerList.whitelist, // reducer 중 스토리지에 저장할 것
      blacklist: persistReducerList.blacklist, // reducer 중 스토리지 저장에 제외할 것
    },
    reducer,
  );

  // redux
  const store = configureStore({
    devTools: process.env.NODE_ENV !== 'production',
    reducer: persistedReducer,
    middleware: getDefaultMiddleware => {
      const middleware = getDefaultMiddleware({
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
        //serializableCheck: true,
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }).concat([
        createLogger({
          duration: true,
          timestamp: false,
          collapsed: true,
          colors: {
            title: () => '#139BFE',
            prevState: () => '#1C5FAF',
            action: () => '#149945',
            nextState: () => '#A47104',
            error: () => '#ff0005',
          },
          predicate: () => typeof window !== 'undefined',
        }),
      ]);

      if (process.env.NODE_ENV !== 'production') {
        //middleware.push(logger)
      }

      return middleware;
    },
  });

  // redux-persist
  store.__persistor = persistStore(store);

  return store;
};
export const useAppDispatch: () => AppDispatch = useReduxDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useReduxSelector;
export const useAppStore: () => AppStore = useReduxStore;
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
```

providers.ts

```tsx
/**
 * 리덕스 공식 페이지: Redux 저장소와 상호 작용(생성, 제공, 읽기 또는 쓰기)하는 모든 구성 요소는 클라이언트 구성 요소여야 합니다.
 * https://redux.js.org/usage/nextjs#providing-the-store
 *
 * https://github.com/vercel/next.js/blob/canary/examples/with-redux/lib/providers.tsx
 */
'use client';

import { useRef } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { AuthContextProvider } from '@/common/store/auth/index';
import { makeStore, AppStore } from '@/store';
import { initializeCounter } from '@/common/store/counter';

export const Providers = ({
  count,
  children,
}: React.PropsWithChildren<{ count?: number }>) => {
  const storeRef = useRef<AppStore | null>(null);
  if (!storeRef.current) {
    storeRef.current = makeStore();
    // [example]
    //storeRef.current.dispatch(initializeCounter({ value: count })); // 상위 구성 요소의 데이터로 저장소를 초기화해야 하는 경우
  }

  return (
    <>
      {/* redux */}
      <Provider store={storeRef.current}>
        {/* redux-persist - https://github.com/vercel/next.js/issues/8240 */}
        <PersistGate persistor={storeRef.current.__persistor!} loading={null}>
          {() => (
            <>
              {/* [example] */}
              <AuthContextProvider>{children}</AuthContextProvider>
            </>
          )}
        </PersistGate>
      </Provider>
    </>
  );
};
```

# State 를 읽어올 때 발생하는 Hydration 이슈

`recoil-persist` 에서 알려주는 기법 활용!

https://blog.haenu.com/10

https://github.com/polemius/recoil-persist#server-side-rendering

아래와 같이 코드를 실행하면,  
Hydration 오류가 발생한다.

redux-persist 클라이언트 브라우저 스토리지에서 값을 불러오는데,  
서버 컴포넌트(SSR)에서는 스토리지 접근이 불가하므로 갑이 없는 상태였다가  
클라이언트 렌더링 시점에 브라우저 스토리지에서 값을 불러와 렌더링 하므로  
Hydration 오류가 발생하는 것이다.

```tsx
'use client';

import { useEffect, useState } from 'react';

import { useAppSelector, useAppDispatch } from '@/store';
import {
  decrement,
  increment,
  incrementByAmount,
  selectCount,
} from '@/common/store/counter'; // redux-toolkit 사용

const Counter = () => {
  const dispatch = useAppDispatch();
  const count = useAppSelector(selectCount);
  const [incrementAmount, setIncrementAmount] = useState(2);

  return (
    <div>
      <div>
        <button
          aria-label='Decrement value'
          onClick={() => dispatch(decrement())}
        >
          -
        </button>
        <span>{count}</span>
        <button
          aria-label='Increment value'
          onClick={() => dispatch(increment())}
        >
          +
        </button>
      </div>
      <div>
        <input
          aria-label='Set increment amount'
          value={incrementAmount}
          onChange={e => setIncrementAmount(Number(e.target.value ?? 0))}
        />
        <button onClick={() => dispatch(incrementByAmount(incrementAmount))}>
          Add Amount
        </button>
      </div>
    </div>
  );
};

export default Counter;
```

해결 방법은  
Hydration 을 하지 않도록,  
다시 말해 서버에서 가져온 값을 바로 렌더링 하지 않도록  
useEffect 를 쓰면 된다.

```tsx
'use client';

import { useEffect, useState } from 'react';

import { useAppSelector, useAppDispatch } from '@/store';
import {
  decrement,
  increment,
  incrementByAmount,
  selectCount,
} from '@/common/store/counter';

const Counter = () => {
  const dispatch = useAppDispatch();
  const [count, setCount] = useState<number>();
  const countServer = useAppSelector(selectCount);
  const [incrementAmount, setIncrementAmount] = useState(2);

  // Redux State 를 읽어올 때 발생하는 Hydration 이슈 방지를 위해,
  // useEffect 로 클라이언트 시점에 상태값 주입
  useEffect(() => {
    setCount(countServer);
  }, [countServer]);

  return (
    <div>
      <div>
        <button
          aria-label='Decrement value'
          onClick={() => dispatch(decrement())}
        >
          -
        </button>
        <span>{count}</span>
        <button
          aria-label='Increment value'
          onClick={() => dispatch(increment())}
        >
          +
        </button>
      </div>
      <div>
        <input
          aria-label='Set increment amount'
          value={incrementAmount}
          onChange={e => setIncrementAmount(Number(e.target.value ?? 0))}
        />
        <button onClick={() => dispatch(incrementByAmount(incrementAmount))}>
          Add Amount
        </button>
      </div>
    </div>
  );
};

export default Counter;
```
