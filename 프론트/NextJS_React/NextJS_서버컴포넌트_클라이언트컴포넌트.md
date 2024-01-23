# Next.js 13 이상, 서버 컴포넌트 / 클라이언트 컴포넌트

https://nextjs.org/docs/app/building-your-application/rendering/composition-patterns#interleaving-server-and-client-components  
https://nextjs.org/docs/app/building-your-application/rendering/composition-patterns

## `클라이언트 컴포넌트 내부에 서버 컴포넌트 선언하면 안됨!`

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
