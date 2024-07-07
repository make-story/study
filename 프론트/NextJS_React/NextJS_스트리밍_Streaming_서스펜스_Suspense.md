# Next.js 스트리밍 (Streaming)

Loading UI and Streaming  
https://nextjs.org/docs/app/building-your-application/routing/loading-ui-and-streaming
https://nextjs.org/learn/dashboard-app/streaming

스트리밍은 더 작은 "UI 조각"으로 나누고  
데이터가 준비되면 서버에서 클라이언트로 점진적으로 스트리밍(SSR 페이지 단위가 아닌 페이지 내부 준비된 UI 단위)할 수 있는 데이터 전송 기술입니다.

스트리밍을 통해 느린 데이터 요청이 전체 페이지를 차단하는 것을 방지할 수 있습니다.  
이를 통해 사용자는 UI를 사용자에게 표시하기 전에 모든 데이터가 로드될 때까지 기다리지 않고도 페이지의 일부를 보고 상호 작용할 수 있습니다.

# Next.js 서스팬스 (Suspense)

`study.git/프론트/NextJS_React/React_서스펜스_Suspense.md` 참고!

https://stackoverflow.com/questions/69433673/nextjs-reactdomserver-does-not-yet-support-suspense  
Next js 12 이하 버전에서는 Suspense를 지원하지 않음

## `Error: ReactDOMServer does not yet support Suspense.` 에러 원인

https://velog.io/@devstone/React-Error-ReactDOMServer-does-not-yet-support-Suspense
React로 SSR을 구현하기 위해 사용한 ReactDOMServer.renderToString 에서 Suspense 컴포넌트를 지원하지 않았기 때문

SSRCompatibleSuspense.jsx

```javascript
import React, { Suspense } from 'react';
import useMounted from 'hooks/useMounted';

export default function SSRCompatibleSuspense(props) {
  const isMounted = useMounted();

  if (isMounted) {
    return <Suspense {...props} />;
  }
  return <>{props.fallback}</>;
}
```

useMounted.js

```javascript
import React from 'react';

function useMounted() {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  return mounted;
}

export default useMounted;
```

AsyncTest.jsx

```javascript
import React, { useState } from 'react';
import styles from './style.scss';
import GetData from './components/GetData';
import ErrorBoundary from './asyncHandler/ErrorBoundary';
import ErrorComponent from './asyncHandler/ErrorComponent';
import LoadingComponent from './asyncHandler/LoadingComponent';
import SSRCompatibleSuspense from './asyncHandler/SSRCompatibleSuspense';

function AsyncTest() {
  return (
    <ErrorBoundary
      renderFallback={({ error }) => <ErrorComponent error={error} />}
      resetKey={resetKey}
    >
      <SSRCompatibleSuspense fallback={<LoadingComponent />}>
        <GetData />
      </SSRCompatibleSuspense>
    </ErrorBoundary>
  );
}

export default AsyncTest;
```
