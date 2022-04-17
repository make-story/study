
## Next.js 필요한 것만 빨리 배우기  
https://velog.io/@jakeseo_me/Next.js-%EB%B9%A8%EB%A6%AC-%EB%B0%B0%EC%9A%B0%EA%B8%B0-y0jz9oebn0  


## next-redux-wrapper가 필요한 이유  
https://simsimjae.medium.com/next-redux-wrapper%EA%B0%80-%ED%95%84%EC%9A%94%ED%95%9C-%EC%9D%B4%EC%9C%A0-5d0176209d14  


## hydration  
https://wonit.tistory.com/362  
initial load 에서 html 을 로드한 뒤 js 파일을 서버로부터 받아 html을 연결시키는 과정이다.  
여기서 js랑 html이랑 연결한다.  
해당 과정에서 react 컴포넌트는 초기화되고 사용자와 상호작용할 준비를 마친다.  


## Next.js pre-rendering 정리  
https://helloinyong.tistory.com/306  


## Next.js 의 서버사이드 렌더링에 Redux 적용하기  
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
import { AnyAction, CombinedState, combineReducers } from "redux";
import { HYDRATE } from "next-redux-wrapper";
import counter, { ICounterState,  } from "./counter";

const rootReducer = (state: IState | undefined, action: AnyAction): CombinedState<IState> => {
  switch (action.type) {
    // 서버 사이드 데이터를 클라이언트 사이드 Store에 통합.
    case HYDRATE:
      return { ...action.payload }
    default: {
      const combineReducer = combineReducers({
        counter
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
import { applyMiddleware, createStore, compose } from "redux";
import { createWrapper } from "next-redux-wrapper";
import { composeWithDevTools } from "redux-devtools-extension";
import reducer from "./modules";

const configureStore = () => {
  const middlewares = [YOUR_MIDDLEWARES];
  const enhancer =
    process.env.NODE_ENV === "production"
      ? compose(applyMiddleware(...middlewares))
      : composeWithDevTools(applyMiddleware(...middlewares));
  const store = createStore(reducer, enhancer);
  return store;
};

const wrapper = createWrapper(configureStore, {
  debug: process.env.NODE_ENV !== "production"
});

export default wrapper;
```
위 작업을 통하여 스토어 구성은 끝이 났습니다.  
하지만 이렇게 할 시 계속해서 Server Side Store가 Client Side Store를 덮어 써버리는 일이 발생합니다.  

이 일을 해결하려면 server 모듈을 생성하여 HYDRATE 에서 store를 덮어 썼다면 state로 저장하고,  
만약 이미 덮어 쓴 state가 있으면 `return { ...state }`를 활용하여 더 이상 덮어 쓰지 않도록 구성하면 최초 1회 만 HYDRATE 가 실행되는 효과를 볼 수 있습니다.   


## Server Side Generation (Static Generation)
https://nextjs.org/docs/basic-features/pages#static-generation-recommended  
`getStaticProps`  
```javascript
function Blog({ posts }) {
  // Render posts...
}

// This function gets called at build time
export async function getStaticProps() {
  // Call an external API endpoint to get posts
  const res = await fetch('https://.../posts');
  const posts = await res.json();

  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      posts,
    },
  };
}

export default Blog;
```


## Server Side Rendering (Server-side Rendering)
https://nextjs.org/docs/basic-features/pages#server-side-rendering  
`getServerSideProps`  
```javascript
function Page({ data }) {
  // Render data...
}

// This gets called on every request
export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(`https://.../data`);
  const data = await res.json();

  // Pass data to the page via props
  return { props: { data } };
}

export default Page;
```


## Script 로드 우선순위  
https://nextjs.org/docs/basic-features/script  
https://themarketer.tistory.com/82   

'next/script' 를 사용하면, 'strategy' 속성을 정의할 수 있고,   
Next.js가 스크립트 로딩을 최적화합니다.   

- 'beforeInteractive'   
페이지가 상호작용하기 전에 가져오고 실행되어야 할 필요가 있는 중요한 스크립트의 경우 사용합니다.   
- 'afterInteractive' (default)   
해당 페이지의 상호작용 이후에 가져오고 실행되는 스크립트의 경우 사용합니다.   
- 'lazyOnload'   
유휴 시간동안 로드를 기다릴 수 있는 스크립트의 경우에 사용합니다.   

## 이제는 Next.js 페이지의 본문(body) 안에서 'next/script' 를 사용합니다.   
```javascript
import Script from 'next/script'

export default function Home() {
  return (
    <>
      <Script src="https://www.google-analytics.com/analytics.js" />  
      <Script src="https://connect.facebook.net/en_US/sdk.js" strategy="lazyOnload" />  
      <Script
        src="https://cdn.jsdelivr.net/npm/cookieconsent@3/build/cookieconsent.min.js"
        strategy="beforeInteractive"
      />
    </>
  )
}
```