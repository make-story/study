# React Query

https://react-query.tanstack.com/reference/useQuery

https://tech.osci.kr/2022/07/13/react-query/

https://tech.kakao.com/2022/06/13/react-query/

## 기존 전통적 방식: Redux 와 Redux-Saga 데이터 통신을 위한, 많은 Boilerplate 코드 존재

`Redux dispatch - Redux-Saga(Asynchronous Middleware) 에서 Data Fetch - Data 받은 후 Store 에 put`

리액트 개발자들은 서버에서 데이터를 받아오는 작업을 리덕스에서 처리하기 위해  
redux-thunk, redux-saga 등을 이용해서 비동기 작업을 수행하고  
데이터를 리덕스 스토어에 저장한 뒤  
그 데이터를 각 컴포넌트에서 사용

## 대체: React Query 가 Redux 를 대체할까?

Redux 는 전역상태 관리 도구,  
React Query 는 서버와 클라이언트 간의 상태(캐싱 등) 관리 도구  
즉, 각 도구의 역할이 다르다!

## 브라우저에서 사용자가 최신 데이터를 바라봐야 하는 상황은 ?

https://tech.osci.kr/react-query/

- 근본적으로 화면을 보고 있을 때
- 페이지가 전환 될 때 (새로운 페이지를 마주 했을 때)
- 페이지 전환 없이 뭔가의 데이터를 요청할 때 (예를 들면 클릭 이벤트)

즉, 위 세 가지 경우를 제외하고는 데이터는 사용자 입장에서는 신선한(fresh) 상태가 아니어도 된다는 뜻입니다.  
아래는 React-Query 가 기본적으로 제공하고 있는 옵션들 입니다.

React-Query v3.39.1 기준

```
refetchOnWindowFocus, //default: true
refetchOnMount, //default: true
refetchOnReconnect, //default: true
staleTime, //default: 0
cacheTime, //default: 5분 (60 * 5 * 1000)
```

## React-Query 가 데이터를 Refetching 해오는 상황은 ?

React-Query v3.39.1 기준

- 브라우저에 포커스가 들어왔을 경우 (refetchOnWindowFocus)
- 새로 마운트가 되었을 경우 (refetchOnMount)
- 네트워크가 끊어졌다가 다시 연결된 경우 (refetchOnReconnect)
- React-Query 는 캐싱 된 데이터는 항상 stale 하다고 판단하며, stale 상태인 데이터를 Refetching

결국 서버 데이터를 패칭해 온 데이터를 캐싱했어도,  
사용자가 화면을 바라보고 있을 때는 그 시점에 있어서 가장 최신의 데이터를 바라보고 있는 상황이며,  
페이지가 전환이 되었을 경우에도 해당 데이터의 상태가 stale 하다고 판단하여 리패칭 하며,  
페이지에서 어떤 이벤트가 발생했을 경우엔 개발자가 트리거 를 심어줌으로 써 데이터를 리패칭 할 수 있습니다.

즉, 위와 같은 React-Query 의 컨셉으로 인해서 사용자는 항상 신선한 (fresh) 데이터를 바라볼 수 있습니다.

# Next.js 13 이상에서의 React Query (SSR 적용방법)

- initialdata 방식
- hydrate 방식

https://velog.io/@ckstn0777/Next.js-13%EC%97%90%EC%84%9C-React-Query-SSR-%EC%A0%81%EC%9A%A9%ED%95%98%EB%8A%94-%EB%B0%A9%EB%B2%95

---

https://tech.kakaopay.com/post/react-query-1/

React Query 는 React Application 에서 서버의 상태를 불러오고, 캐싱하며, 지속적으로 동기화하고 업데이트 하는 작업을 도와주는 라이브러리입니다.  
React Query는 우리에게 친숙한 Hook을 사용하여 React Component 내부에서 자연스럽게 서버(또는 비동기적인 요청이 필요한 Source)의 데이터를 사용할 수 있는 방법을 제안합니다.

```javascript
import axios from 'axios';
import {
  QueryClient,
  QueryClientProvider,
  useMutation,
  useQuery,
  useQueryClient,
} from 'react-query';

// React Query는 내부적으로 queryClient를 사용하여
// 각종 상태를 저장하고, 부가 기능을 제공합니다.
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Menus />
    </QueryClientProvider>
  );
}

function Menus() {
  const queryClient = useQueryClient();

  // "/menu" API에 Get 요청을 보내 서버의 데이터를 가져옵니다.
  const { isLoading, error, data } = useQuery('getMenu', () =>
    axios.get('/menu').then(({ data }) => data),
  );

  // "/menu" API에 Post 요청을 보내 서버에 데이터를 저장합니다.
  const { mutate } = useMutation(suggest => axios.post('/menu', { suggest }), {
    // Post 요청이 성공하면 위 useQuery의 데이터를 초기화합니다.
    // 데이터가 초기화되면 useQuery는 서버의 데이터를 다시 불러옵니다.
    onSuccess: () => queryClient.invalidateQueries('getMenu'),
  });

  return (
    <div>
      <h1> Tomorrow's Lunch Candidates! </h1>
      <ul>
        {data.map(item => (
          <li key={item.id}> {item.title} </li>
        ))}
      </ul>

      <button
        onClick={() =>
          mutate({
            id: Date.now(),
            title: 'Toowoomba Pasta',
          })
        }
      >
        Suggest Tomorrow's Menu
      </button>
    </div>
  );
}
```

React Query는 API 요청을 `Query` 그리고 `Mutation` 이라는 두 가지 유형으로 나누어 생각합니다.

## React Query의 Query 요청

```javascript
// 가장 기본적인 형태의 React Query useQuery Hook 사용 예시
const { data } = useQuery(
  queryKey, // 이 Query 요청에 대한 응답 데이터를 캐시할 때 사용할 Unique Key (required)
  fetchFn, // 이 Query 요청을 수행하기 위한 Promise를 Return 하는 함수 (required)
  options, // useQuery에서 사용되는 Option 객체 (optional)
);
```

useQuery Hook으로 수행되는 Query 요청은 HTTP METHOD GET 요청과 같이 서버에 저장되어 있는 “상태”를 불러와 사용할 때 사용합니다.

React Query의 useQuery Hook은 요청마다 (API마다) 구분되는 **Unique Key (aka. Query Key)**를 필요로 합니다.  
React Query는 이 Unique Key로 서버 상태 (aka. API Response)를 로컬에 캐시하고 관리합니다.

## React Query의 Mutation 요청

```javascript
// 가장 기본적인 형태의 React Query useMutation Hook 사용 예시
const { mutate } = useMutation(
  mutationFn, // 이 Mutation 요청을 수행하기 위한 Promise를 Return 하는 함수 (required)
  options, // useMutation에서 사용되는 Option 객체 (optional)
);
```

useMutation Hook으로 수행되는 Mutation 요청은 HTTP METHOD POST, PUT, DELETE 요청과 같이 서버에 Side Effect를 발생시켜 서버의 상태를 변경시킬 때 사용합니다.
