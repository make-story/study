# Next.js 13 이상, 서버 컴포넌트 / 클라이언트 컴포넌트

서버컴포넌트 / 클라이언트 컴포넌트 패턴  
`https://nextjs.org/docs/app/building-your-application/rendering/composition-patterns#interleaving-server-and-client-components`

https://nextjs.org/docs/app/building-your-application/rendering/composition-patterns

Server component 안에서 Client component 를 import 해서 사용가능

`study.git/프론트/NextJS_React/React_서버컴포넌트_RSC.md` 참고!
`study.git/프론트/NextJS_React/NextJS_13.md` 참고! (렌더링 방식!)

- 기존(Next.js 12 이하)에는 최상위 pages 단위 서버렌더링에서 컴포넌트 단위로 변경
- Next.js 13 버전부터는 모든 컴포넌트가 서버 컴포넌트(기본)
  - https://nextjs.org/docs/app/building-your-application/rendering/server-components#using-server-components-in-nextjs
- 서버컴포넌트를 활용해 클라이언트로 전송되는 JavaScript 크기 감소
  - https://nextjs.org/blog/next-13#server-components

## `클라이언트 컴포넌트 내부에 서버 컴포넌트 선언하면 안됨!`

children 또는 prop 로 Server component 를 전달

아래 방식을 사용할 경우 이슈!

```tsx
'use client';

// You cannot import a Server Component into a Client Component.
import ServerComponent from './Server-Component';

export default function ClientComponent({
  children,
}: {
  children: React.ReactNode;
}) {
  const [count, setCount] = useState(0);

  return (
    <>
      <button onClick={() => setCount(count + 1)}>{count}</button>

      <ServerComponent />
    </>
  );
}
```

## `클라이언트 컴포넌트 props.children 으로 서버 컴포넌트 전달은 가능!`

클라이언트 컴포넌트에서 서버 컴포넌트 사용하려면,  
아래와 같이 작성해야 함!

```tsx
'use client';

import { useState } from 'react';

export default function ClientComponent({
  children,
}: {
  children: React.ReactNode;
}) {
  const [count, setCount] = useState(0);

  return (
    <>
      <button onClick={() => setCount(count + 1)}>{count}</button>
      {children}
    </>
  );
}
```

```tsx
// This pattern works:
// You can pass a Server Component as a child or prop of a
// Client Component.
import ClientComponent from './client-component';
import ServerComponent from './server-component';

// Pages in Next.js are Server Components by default
export default function Page() {
  return (
    <ClientComponent>
      <ServerComponent />
    </ClientComponent>
  );
}
```

# 성능을 향상시키고 싶다면?

https://velog.io/@timosean/Server-component-vs.-Client-Component

가능하면 Client Components를 Component Tree의 맨 아래쪽에 오도록 이동시키는 것이 좋다.  
(To improve the performance of your application, we recommend moving Client Components to the leaves of your component tree where possible.)

# Third-party packages

https://velog.io/@timosean/Server-component-vs.-Client-Component

use client 지시문은 서버 컴포넌트의 일부로 도입된 React의 새로운 기능이다.  
서버 컴포넌트 자체가 지금 너무나도 새로운 개념이기 때문에,  
서드파티 패키지들은 useState, useEffect 및 createContext와 같은 클라이언트 전용 기능을 사용하는 컴포넌트들에 use client 지시문을 추가하기 시작했다.

하지만, npm packages에 있는 클라이언트 전용 기능을 사용하는 많은 컴포넌트들은 아직까지 use client 지시문을 포함하고 있지 않다.  
그래서 이것들을 내 프로젝트의 클라이언트 컴포넌트 내부에서 import해서 사용한다면 별 문제가 없겠지만,  
서버 컴포넌트로 동작하는 곳에다가 import를 해서 사용한다면 제대로 작동하지 않고 오류를 일으킬 것이다.  
왜냐하면, Next.js가 해당 서드파티 컴포넌트가 클라이언트 전용 기능을 사용하고 있는 지 모르기 때문이다.

이를 해결할 수 있는 방법은,  
해당 클라이언트 전용 기능을 사용하는 서드파티 컴포넌트를 따로 client component를 만들어서 import한 다음에 그걸 다시 export 시켜주는 것이다.

carousel.tsx

```tsx
'use client';

import { AcmeCarousel } from 'acme-carousel';

export default AcmeCarousel;
```

app/page.tsx

```tsx
import Carousel from './carousel';

export default function Page() {
  return (
    <div>
      <p>View pictures</p>

      {/* 🟢 Works, since Carousel is a Client Component */}
      <Carousel />
    </div>
  );
}
```
