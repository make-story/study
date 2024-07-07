# React Suspense (서스펜스)

`study.git/프론트/NextJS_React/NextJS_스트리밍_Streaming_서스펜스_Suspense.md` 참고!

React v16.6 실험적인 기능으로 포함, React v18.0 공식 포함

Suspense 는 리액트 내장 컴포넌트로서  
코드 스플리팅된 컴포넌트를 로딩하도록 발동시킬 수 있고,  
로딩이 끝나지 않았을 때 보여 줄 UI를 설정할 수 있습니다.  
(렌더링 진행중 상태일 때, Suspense 폴백 컴포넌트가 노출 됨)

`Suspense는 아직 렌더링이 준비되지 않은 컴포넌트가 있을때, 로딩 화면을 보여주고 로딩이 완료되면 해당 컴포넌트를 보여주는 React에 내장되어 있는 기능`  
https://ko.reactjs.org/docs/react-api.html#reactsuspense

## `React.lazy 및 서스펜스(Suspense)` 를 사용한 코드 분할

`study.git/프론트/NextJS_React/React_성능_최적화.md` 참고!

Suspense 적용만으로 코드 스플리팅(Code Splitting, 청크, 코드분할)되는 것이 아닌,  
React.lazy 가 핵심

React.lazy() 를 통해 컴포넌트를 코드 분할할 수 있어 필요한 시점에 컴포넌트를 로드할 수 있고,  
Suspense 는 로딩 중인 컴포넌트를 처리하기 위해 사용한다.

https://ko.legacy.reactjs.org/docs/code-splitting.html

https://web.dev/articles/code-splitting-suspense?hl=ko
https://web.dev/code-splitting-suspense/?utm_source=lighthouse&utm_medium=lr

# SWR (데이터 페칭 도구, Data Fetching) 에서의 서스펜스(Suspense)

https://swr.vercel.app/ko/docs/suspense

24년 4월 기준, SWR 데이터 패칭 도구에서는 서스펜스 사용권장 안함

> "리액트는 여전히 SWR(추가 정보) 과 같은 데이터 프레임워크에서 서스펜스를 사용하는 것을 권장하지 않습니다." 공식사이트 내용

React 서스펜스를 SWR과 함께 사용하려면 suspense 옵션을 활성화하세요.

```jsx
import { Suspense } from 'react';
import useSWR from 'swr';

function Profile() {
  const { data } = useSWR('/api/user', fetcher, { suspense: true });
  return <div>hello, {data.name}</div>;
}

function App() {
  return (
    <Suspense fallback={<div>loading...</div>}>
      <Profile />
    </Suspense>
  );
}
```
