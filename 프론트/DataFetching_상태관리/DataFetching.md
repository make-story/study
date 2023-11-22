# 서버 상태 관리 라이브러리 (data fetching)

https://fe-developers.kakaoent.com/2022/220224-data-fetching-libs/

# 상태 3가지 구분

- Local State: 리액트 컴포넌트 안에서만 사용되는 state
- Global State: Global Store에 정의되어 프로젝트 어디에서나 접근할 수 있는 state
- Server State: 서버로부터 받아오는 state

기존에는 리덕스와 같은 상태 관리 라이브러리에 Global State와 Server State를 전부 포함하는 방법으로 프로그래밍을 했었는데요,  
위와 같은 data fetching 라이브러리를 사용함으로써 상태 관리 라이브러리에서 비동기 로직을 제거하여 관심사가 분리되고 선언적으로 프로그래밍할 수 있게 되었습니다.

# SWR

https://swr.vercel.app/ko

https://fe-developers.kakaoent.com/2022/220224-data-fetching-libs/

https://www.npmjs.com/package/swr

"SWR"이라는 이름은 HTTP RFC 5861에 의해 알려진 HTTP 캐시 무효 전략인 stale-while-revalidate에서 유래되었다.

SWR은 먼저 캐시(stale)로부터 데이터를 반환한 후,  
fetch 요청(revalidate)을 하고,  
최종적으로 최신화된 데이터를 가져오는 전략이다.

SWR은 Nextjs 로 유명한 vercel 에서 만든 원격데이터 fetch 를 위한 커스텀 훅 npm 모듈입니다.  
SWR은 원격서버의 상태를 가져와서 리액트 컴포넌트에 꽂아주는 기능을 제공합니다.

# React Query

https://react-query.tanstack.com/reference/useQuery

https://tech.osci.kr/2022/07/13/react-query/

https://tech.kakao.com/2022/06/13/react-query/

## 기존 전통적 방식: Redux 와 Redux-Saga 데이터 통신을 위한, 많은 Boilerplate 코드

`Redux dispatch - Redux-Saga(Asynchronous Middleware) 에서 Data Fetch - Data 받은 후 Store 에 put`

리액트 개발자들은 서버에서 데이터를 받아오는 작업을 리덕스에서 처리하기 위해  
redux-thunk, redux-saga 등을 이용해서 비동기 작업을 수행하고  
데이터를 리덕스 스토어에 저장한 뒤  
그 데이터를 각 컴포넌트에서 사용

## 대체: React Query 가 Redux 를 대체할까?

Redux 는 전역상태 관리 도구,  
React Query 는 서버와 클라이언트 간의 상태(캐싱 등) 관리 도구  
즉, 각 도구의 역할이 다르다!

---

https://tech.kakaopay.com/post/react-query-1/

React Query는 React Application에서 서버의 상태를 불러오고, 캐싱하며, 지속적으로 동기화하고 업데이트 하는 작업을 도와주는 라이브러리입니다.  
React Query는 우리에게 친숙한 Hook을 사용하여 React Component 내부에서 자연스럽게 서버(또는 비동기적인 요청이 필요한 Source)의 데이터를 사용할 수 있는 방법을 제안합니다.

```javascript
import axios from "axios";
import {
  QueryClient,
  QueryClientProvider,
  useMutation,
  useQuery,
  useQueryClient,
} from "react-query";

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
  const { isLoading, error, data } = useQuery("getMenu", () =>
    axios.get("/menu").then(({ data }) => data)
  );

  // "/menu" API에 Post 요청을 보내 서버에 데이터를 저장합니다.
  const { mutate } = useMutation(
    (suggest) => axios.post("/menu", { suggest }),
    {
      // Post 요청이 성공하면 위 useQuery의 데이터를 초기화합니다.
      // 데이터가 초기화되면 useQuery는 서버의 데이터를 다시 불러옵니다.
      onSuccess: () => queryClient.invalidateQueries("getMenu"),
    }
  );

  return (
    <div>
      <h1> Tomorrow's Lunch Candidates! </h1>
      <ul>
        {data.map((item) => (
          <li key={item.id}> {item.title} </li>
        ))}
      </ul>

      <button
        onClick={() =>
          mutate({
            id: Date.now(),
            title: "Toowoomba Pasta",
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
  options // useQuery에서 사용되는 Option 객체 (optional)
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
  options // useMutation에서 사용되는 Option 객체 (optional)
);
```

useMutation Hook으로 수행되는 Mutation 요청은 HTTP METHOD POST, PUT, DELETE 요청과 같이 서버에 Side Effect를 발생시켜 서버의 상태를 변경시킬 때 사용합니다.
