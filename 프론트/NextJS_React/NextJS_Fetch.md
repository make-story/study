# Next.js Fetch (Next.js 13 이상)

Data Fetching, Caching, and Revalidating(재검증)

https://nextjs.org/docs/app/building-your-application/data-fetching/fetching-caching-and-revalidating

https://nextjs.org/docs/app/building-your-application/caching

https://github.com/XionWCFM/Nextjs-docs-Korean-translation/blob/main/nextjsdocs/BuildingYourApplication/DataFetching/Fetching.md  
React는 fetch를 확장하여 자동 요청 중복 제거 기능을 제공하며, Next.js는 fetch 옵션 객체를 확장하여 각 요청이 자체적으로 캐싱과 유효성 재검증을 설정할 수 있게 합니다.

## Next.js 공식페이지

https://nextjs.org/docs/app/building-your-application/caching#request-memoization

`React 컴포넌트 트리의 여러 위치에서 동일한 데이터에 대한 가져오기 함수를 한 번만 실행하면서 호출할 수 있음을 의미`

예를 들어, 경로 전체(예: 레이아웃, 페이지 및 여러 구성 요소)에서 동일한 데이터를 사용해야 하는 경우 트리 상단에서 데이터를 가져오고 구성 요소 간에 prop을 전달할 필요가 없습니다.  
대신 동일한 데이터에 대해 네트워크를 통해 여러 번 요청하는 경우 성능에 미치는 영향을 걱정하지 않고 필요한 구성 요소에서 데이터를 가져올 수 있습니다.

`캐싱 Fetch 은 Next.js 기능이 아닌 React 기능`

## Next.js 공식페이지 - 캐싱 동작 흐름

1. 경로를 렌더링하는 동안 특정 요청이 처음 호출될 때 그 결과는 메모리에 저장되지 않고 캐시가 됩니다 MISS.
2. 따라서 함수가 실행되고 외부 소스에서 데이터를 가져와 결과가 메모리에 저장됩니다.
3. 동일한 렌더 패스에서 요청의 후속 함수 호출은 캐시가 되며 HIT데이터는 함수를 실행하지 않고 메모리에서 반환됩니다.
4. 경로가 렌더링되고 렌더링 패스가 완료되면 메모리가 "재설정"되고 모든 요청 메모 항목이 지워집니다.

https://nextjs.org/docs/app/building-your-application/caching#data-cache

## 표준 API Fetch - 모던 리액트 Deep Dive 책 내용 중 (p741)

`study.git/프론트/NextJS_React/NextJS_13.md` 참고!

과거 Next.js 의 서버 사이드 렌더링과 정적 패이지 제공을 위해 이용되던 getServerSideProps, getStaticProps, getInitialProps 가 /app 디렉터리 내부에서는 삭제됐다.  
그 대신 모든 데이터 요청은 웹에서 제공하는 표준 API 인 fetch 를 기반으로 이뤄진다.

이에 추가로 `리액트팀은 이 fetch API를 확장해 같은 서버 컴포넌트 트리 내에서 동일한 요청이 있다면 재요청이 발생하지 않도록 요청 중복을 방지했다.`

요즘 인기를 끌고 있는 SWR 과 React Query 와 비슷하게,  
해당 fetch 요청에 대한 내용을 서버에서는 렌더링이 한 번 끝날 떄까지 캐싱하며,  
클라이언트에서는 별도의 지시자나 요청이 없는 이상 해당 데이터를 최대한 캐싱해서 중복된 요청을 방지한다.

## Next.js 13 이상에서 React-Query 가 필요할까?

`study.git/프론트/상태관리/서버상태관리_DataFetching/React_Query.md` 참고!
