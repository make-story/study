# Next.js 13 신규 기능

https://nextjs.org/blog/next-13

https://helloinyong.tistory.com/345

- app 디렉토리(beta): 더 쉽고 빠르며 더 간단한 클라이언트
  - Layout - 불필요한 리렌더링를 방지하고 복잡한 인터페이스를 쉽게 배치함
  - React Server Components - React에 Server Components를 지원
  - Streaming - UI의 렌더링을 점진적으로 렌더링
- turbopack: 최대 700배 빠른 Rust 기반의 webpack 대체
- 새로운 next/image: 더 빨라진 지연 로딩
- 새로운 @next/font(beta): 레이아웃 이동이 없는 자체 호스팅 글꼴
- 개선된 next/link: 간소화된 API

공식 블로그 내용 중
`app디렉토리는 현재 베타 버전이므로 아직 프로덕션에서는 사용하지 않는 것이 좋습니다.`

## `SSR / SSG / ISR 관련`

Next.js 13 버전부터는 모든 컴포넌트가 서버 컴포넌트이기 때문에  
12 버전에서 사용하던 getStaticProps 함수나 getServerSideProps 함수가 필요 없어졌습니다.

https://mycodings.fly.dev/blog/2022-11-16-nextjs-13-how-to-ssg-isr-and-not-found

https://nextjs.org/blog/next-13#data-fetching

https://nextjs.org/docs/app/api-reference/functions/fetch

```javascript
// Static Site Generation (SSG)
// This request should be cached until manually invalidated.
// Similar to `getStaticProps`.
// `force-cache` is the default and can be omitted.
fetch(URL, { cache: 'force-cache' }); // 'force-cache'라고 옵션을 주면 이름에서도 알 수 있듯이 캐시를 강제한다는 뜻이기 때문에 정적 사이트로 만들라는 의미

// Server-Side Rendering (SSR)
// This request should be refetched on every request.
// Similar to `getServerSideProps`.
fetch(URL, { cache: 'no-store' }); // 캐시를 만들지 말라는 뜻으로 무조건 서버사이드로 작동

// Incremental Static Regeneration (ISR)
// This request should be cached with a lifetime of 10 seconds.
// Similar to `getStaticProps` with the `revalidate` option.
fetch(URL, { next: { revalidate: 10 } }); // 10초마다 캐시를 갱신
```

```
$ npm run build
```

## app/

(beta)

https://nextjs.org/docs/app/building-your-application/routing#the-app-router

Next.js 13에서는 app 경로를 이용해서 페이지 구성과 라우팅 기능을 구현할 수 있다.

https://nextjs.org/docs/app/building-your-application/rendering/server-components

`React Server Components, RSC 사용가능!!!`

> 기존 Pages 단위 서버렌더링이 아닌 컴포넌트 단위(/app/\*) 서버 렌더 컴포넌트 구성가능

### 리액트 서버 컴포넌트 (RSC, React 18 버전부터 도입된 개념)

`study.git/프론트/NextJS_React/React_서버컴포넌트.md` 참고

https://tech.kakaopay.com/post/react-server-components/

https://patterns-dev-kr.github.io/rendering-patterns/react-server-components/#%EC%84%9C%EB%B2%84-%EC%BB%B4%ED%8F%AC%EB%84%8C%ED%8A%B8

- 서버 컴포넌트의 코드는 클라이언트로 전달되지 않습니다.  
  하지만 서버 사이드 렌더링의 모든 컴포넌트의 코드는 자바스크립트 번들에 포함되어 클라이언트로 전송됩니다.
- 서버 컴포넌트는 페이지 레벨에 상관없이 모든 컴포넌트에서 서버에 접근 가능합니다.  
  하지만 Next.js의 경우 가장 top level의 페이지에서만 getServerProps()나 getInitialProps()로 서버에 접근 가능합니다.
- 서버 컴포넌트는 클라이언트 상태를 유지하며 refetch 될 수 있습니다.
  서버 컴포넌트는 HTML이 아닌 특별한 형태로 컴포넌트를 전달하기 때문에 필요한 경우 포커스, 인풋 입력값 같은 클라이언트 상태를 유지하며 여러 번 데이터를 가져오고 리렌더링하여 전달할 수 있습니다.
  하지만 SSR의 경우 HTML로 전달되기 때문에 새로운 refetch가 필요한 경우 HTML 전체를 리렌더링 해야 하며 이로 인해 클라이언트 상태를 유지할 수 없습니다.

RSC 반환값 예

```
M1:{"id":"./src/SearchField.client.js","chunks":["client5"],"name":""}
M2:{"id":"./src/EditButton.client.js","chunks":["client1"],"name":""}
S3:"react.suspense"
J0:["$","div",null,{"className":"main","children":[["$","section",null,{"className":"col sidebar","children":[["$","section",null,{"className":"sidebar-header","children":[["$","img",null,{"className":"logo","src":"logo.svg","width":"22px","height":"20px","alt":"","role":"presentation"}],["$","strong",null,{"children":"React Notes"}]]}],["$","section",null,{"className":"sidebar-menu","role":"menubar","children":[["$","@1",null,{}],["$","@2",null,{"noteId":null,"children":"New"}]]}],["$","nav",null,{"children":["$","$3",null,{"fallback":["$","div",null,{"children":["$","ul",null,{"className":"notes-list skeleton-container","children":[["$","li",null,{"className":"v-stack","children":["$","div",null,{"className":"sidebar-note-list-item skeleton","style":{"height":"5em"}}]}],["$","li",null,{"className":"v-stack","children":["$","div",null,{"className":"sidebar-note-list-item skeleton","style":{"height":"5em"}}]}],["$","li",null,{"className":"v-stack","children":["$","div",null,{"className":"sidebar-note-list-item skeleton","style":{"height":"5em"}}]}]]}]}],"children":"@4"}]}]]}],["$","section","null",{"className":"col note-viewer","children":["$","$3",null,{"fallback":["$","div",null,{"className":"note skeleton-container","role":"progressbar","aria-busy":"true","children":[["$","div",null,{"className":"note-header","children":[["$","div",null,{"className":"note-title skeleton","style":{"height":"3rem","width":"65%","marginInline":"12px 1em"}}],["$","div",null,{"className":"skeleton skeleton--button","style":{"width":"8em","height":"2.5em"}}]]}],["$","div",null,{"className":"note-preview","children":[["$","div",null,{"className":"skeleton v-stack","style":{"height":"1.5em"}}],["$","div",null,{"className":"skeleton v-stack","style":{"height":"1.5em"}}],["$","div",null,{"className":"skeleton v-stack","style":{"height":"1.5em"}}],["$","div",null,{"className":"skeleton v-stack","style":{"height":"1.5em"}}],["$","div",null,{"className":"skeleton v-stack","style":{"height":"1.5em"}}]]}]]}],"children":["$","div",null,{"className":"note--empty-state","children":["$","span",null,{"className":"note-text--empty-state","children":"Click a note on the left to view something! 🥺"}]}]}]}]]}]
M5:{"id":"./src/SidebarNote.client.js","chunks":["client6"],"name":""}
J4:["$","ul",null,{"className":"notes-list","children":[["$","li","1",{"children":["$","@5",null,{"id":1,"title":"Meeting Notes","expandedChildren":["$","p",null,{"className":"sidebar-note-excerpt","children":"This is an example note. It contains Markdown!"}],"children":["$","header",null,{"className":"sidebar-note-header","children":[["$","strong",null,{"children":"Meeting Notes"}],["$","small",null,{"children":"12/30/20"}]]}]}]}],["$","li","2",{"children":["$","@5",null,{"id":2,"title":"A note with a very long title because sometimes you need more words","expandedChildren":["$","p",null,{"className":"sidebar-note-excerpt","children":"You can write all kinds of amazing notes in this app! These note live on the server in the notes..."}],"children":["$","header",null,{"className":"sidebar-note-header","children":[["$","strong",null,{"children":"A note with a very long title because sometimes you need more words"}],["$","small",null,{"children":"12/30/20"}]]}]}]}],["$","li","3",{"children":["$","@5",null,{"id":3,"title":"I wrote this note today","expandedChildren":["$","p",null,{"className":"sidebar-note-excerpt","children":"It was an excellent note."}],"children":["$","header",null,{"className":"sidebar-note-header","children":[["$","strong",null,{"children":"I wrote this note today"}],["$","small",null,{"children":"12/30/20"}]]}]}]}],["$","li","4",{"children":["$","@5",null,{"id":4,"title":"Make a thing","expandedChildren":["$","p",null,{"className":"sidebar-note-excerpt","children":"It's very easy to make some words bold and other words italic with Markdown. You can even link to React's..."}],"children":["$","header",null,{"className":"sidebar-note-header","children":[["$","strong",null,{"children":"Make a thing"}],["$","small",null,{"children":"12/30/20"}]]}]}]}],["$","li","6",{"children":["$","@5",null,{"id":6,"title":"Test Noteeeeeeeasd","expandedChildren":["$","p",null,{"className":"sidebar-note-excerpt","children":"Test note's text"}],"children":["$","header",null,{"className":"sidebar-note-header","children":[["$","strong",null,{"children":"Test Noteeeeeeeasd"}],["$","small",null,{"children":"11/29/22"}]]}]}]}],["$","li","7",{"children":["$","@5",null,{"id":7,"title":"asdasdasd","expandedChildren":["$","p",null,{"className":"sidebar-note-excerpt","children":"asdasdasd"}],"children":["$","header",null,{"className":"sidebar-note-header","children":[["$","strong",null,{"children":"asdasdasd"}],["$","small",null,{"children":"11/29/22"}]]}]}]}]]}]
```

M 으로 시작하는 라인은 클라이언트 번들에서 컴포넌트 함수를 조회하는 데 필요한 정보와 클라이언트 컴포넌트의 module.reference를 정의합니다.  
J 로 시작하는 라인은 앞에서 M 라인이 정의한 클라이언트 컴포넌트를 참조하는 것으로 실제 리액트 컴포넌트의 element 트리를 정의합니다.  
S 는 리액트 서스펜스에 관한 부분입니다.

RSC는 모든 데이터를 기다리는 것이 아니라 한행이 완성되면  
그 행을 즉각적으로 반영하여 작업을 하고 아직 그릴 수 없는 부분은 체크만 해두고 넘어간다는 것

### 파일명 규칙

https://nextjs.org/docs/app/building-your-application/routing#file-conventions

https://velog.io/@asdf99245/Next.js-app-router-%EA%B3%B5%EC%8B%9D%EB%AC%B8%EC%84%9C-%EC%A0%95%EB%A6%AC

- layout
  세그먼트 및 해당 하위 항목에 대한 공유 UI
- page
  경로의 고유한 UI 및 경로에 공개적으로 액세스 가능
- loading
  세그먼트 및 해당 하위 항목에 대한 UI 로드 중
- not-found
  세그먼트 및 해당 하위 항목에 대한 UI를 찾을 수 없습니다.
- error
  세그먼트 및 해당 하위 항목에 대한 오류 UI
- global-error
  전역 오류 UI
- route
  서버 측 API 엔드포인트
- template
  전문적으로 다시 렌더링된 레이아웃 UI
- default
  병렬 경로 에 대한 대체 UI

### Streaming

app/ 디렉토리 내에서 이루어지는 기능인데, 서버 사이드 단에서 컴포넌트를 점진적으로 렌더링 한 뒤 스트리밍 방식으로 클라이언트에게 전달하는 방식이다.

기존에는 서버 사이드 렌더링을 할 때, 화면에 보여줄 데이터들을 백엔드 API를 통해 fetch를 해서 가져올 때까지 기다려야 했다.
이러한 문제를 Streaming을 통해 해결할 수 있다.

고정적인 레이아웃 부분은 data fetch가 필요 없기 때문에 먼저 렌더링한 뒤 클라이언트로 보낼 수 있고, 이후 다른 부분은 data fetch가 끝나면 그 이후에 별도로 렌더링을 한 뒤 클라이언트 단으로 보내주게 된다.

추가로 data fetch가 필요로 한 부분은 가져오기 전까지는 알아서 로딩 상태로 표시가 된다.

### 리액트 서버 컴포넌트

Server Components를 사용하면, 클라이언트로 보내는 자바스크립트 양을 줄일 수 있어 빠르게 페이지 로딩이 가능하다고 설명한다.

런타임이 로드될 때, 캐시가 가능하고 사이즈를 예측할 수 있어서, 애플리케이션이 점차 커져도 런타임이 증가하지 않는다고 한다. 추가로 런타임이 async 하게 로딩되고, 서버로부터 Hydration 된 HTML이 클라이언트 쪽으로 점진적으로 향상되도록 제공된다고 한다.

app 디렉토리에서 돌아가는 모든 컴포넌트는 기본적으로 Server Component 방식이다. 따라서 별도의 서버 쪽 설정 없이 바로 Server Component를 활용하여 성능을 올릴 수 있다고 한다.

https://velog.io/@surim014/building-a-blog-with-Next.js-13-and-React-Server-Components

### Data Fetching (서버 컴포넌트, 클라이언트 컴포넌트)

https://github.com/XionWCFM/Nextjs-docs-Korean-translation/blob/main/nextjsdocs/BuildingYourApplication/DataFetching/Fetching.md

https://nextjs.org/docs/app/building-your-application/data-fetching/fetching-caching-and-revalidating#use-in-client-components

https://github.com/acdlite/rfcs/blob/first-class-promises/text/0000-first-class-support-for-promises.md

서버 컴포넌트에서 async와 await를 도입하고 클라이언트 컴포넌트를 위한 새로운 use() 훅 사용

서버 컴포넌트에서 async와 await을 사용하여 데이터를 가져올 수 있습니다.

```jsx
// app/page.tsx

async function getData() {
  const res = await fetch('https://api.example.com/...');
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

export default async function Page() {
  const data = await getData();

  return <main></main>;
}
```

app/ 에서 React Suspense 기반으로 구현된 새로운 data fetch 하는 방식이다.

```javascript
// app/page.js
import { use } from 'react';

async function getData() {
  const res = await fetch('...');
  const name: string = await res.json();
  return name;
}

export default function Page() {
  // This value is fully typed
  // The return value is *not* serialized
  // so you can return Date, Map, Set, etc.
  const name = use(getData());

  return '...';
}
```

## Turbopack

(alpha)
Rust 기반의 새로운 번들러

## next/image

## @next/font

## next/link

기존에 next 12 버전까지는 next/link를 쓰기 위해서 <a> 태그를 꼭 중첩시켜야 했다.  
next 13부터는 <a> 태그를 제외하고 사용할 수 있다.

## OG Image Generation

OpenGraph를 위한 Social card도 제공한다

## Middleware API Updates

next 12 버전에서 소개되었던 Middleware가 여러 피드백을 통해 개선된 점을 소개한다.

아래와 같이 쉽게 request의 header 값을 세팅할 수 있다.

```javascript
// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Clone the request headers and set a new header `x-version`
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-version', '13');

  // You can also set request headers in NextResponse.rewrite
  const response = NextResponse.next({
    request: {
      // New request headers
      headers: requestHeaders,
    },
  });

  // Set a new response header `x-version`
  response.headers.set('x-version', '13');
  return response;
}
```

또한, Auth 인증 실패 등으로 리다이렉트가 필요할 때, 더 이상 rewrite, redirect를 쓰지 않고, 바로 response 선언 부분에서 Json 형태로 Response를 처리할 수 있다.

```javascript
// middleware.ts
import { NextRequest, NextResponse } from 'next/server';
import { isAuthenticated } from '@lib/auth';

// Limit the middleware to paths starting with `/api/`
export const config = {
  matcher: '/api/:function*',
};

export function middleware(request: NextRequest) {
  // Call our authentication function to check the request
  if (!isAuthenticated(request)) {
    // Respond with JSON indicating an error message
    return NextResponse.json(
      {
        success: false,
        message: 'Auth failed',
      },
      {
        status: 401,
      },
    );
  }
}
```

현재는 Middleware 로부터 response 보내는 부분은 experimental 단계에서  
next.config.js 에서 experimental.allowMiddlewareResponseBody 설정을 별도로 해주어야 한다.

```javascript
const nextConfig = {
  reactStrictMode: true, // Recommended for the `pages` directory, default in `app`.
  swcMinify: true,
  experimental: {
    allowMiddlewareResponseBody: true,
  },
};

module.exports = nextConfig;
```

# Next.js App Router 쓸 때 흔한 실수 10가지

`클라이언트 컴포넌트 트리에 Provider 를 배치하고, 서버 컴포넌트 트리에 해당 클라이언트 컴포넌트를 포함해야 한다!`

- Using Route Handlers with Server Components
  - 서버 컴포넌트에서 라우트 핸들러를 호출하지 마세요.
  - 대신 라우트 핸들러 내부에 배치하려는 로직을 서버 컴포넌트에서 직접 호출하세요.
- Static or dynamic Route Handlers
  - 라우트 핸들러는 GET 메서드를 사용할 때 기본적으로 캐시됩니다.
  - GET 라우트 핸들러에서 리턴한 JSON 데이터는 다른 빌드가 일어날 때 까지 변경되지 않습니다.
- Route Handlers and Client Components
  - Form을 만들 때 라우터 핸들러 대신 Server Action을 활용할 수 있습니다.
- Using Suspense with Server Components
  - Suspense의 위치는 데이터 패칭을 수행하는 비동기 컴포넌트보다 높은 곳에 위치해야 합니다.
  - Suspense가 비동기 컴포넌트 내부에 있으면 작동하지 않습니다.
- Using the incoming request
  - 서버 컴포넌트는 들어오는 요청(Incoming Request)의 객체에 접근할 수 없습니다.
  - 대신, 서버 컴포넌트는 들어오는 요청에 접근할 수 있는 function과 props를 제공합니다.
  - `cookies()`, `headers()`, `params`, `searchParams`와 같은 옵션을 사용하세요.
- Using Context providers with App Router
  - 두 가지 일반적인 실수는 서버 컴포넌트와 Context를 함께 쓰려고 하는 것과 App Router에 Provider를 배치하는 것입니다.
  - 클라이언트 컴포넌트 트리에 Provider를 배치하고, 서버 컴포넌트 트리에 해당 클라이언트 컴포넌트를 포함하세요.
- Using Server and Client Components together
  - 서버 컴포넌트는 클라이언트 컴포넌트를 자식으로 둘 수 있습니다.
  - 클라이언트 컴포넌트는 서버 컴포넌트를 자식으로 둘 수 있습니다.
- Adding “use client” unnecessarily
  - 모든 파일에 `use client`를 추가할 필요는 없습니다.
  - 클라이언트 바운더리에 있으면, 클라이언트 컴포넌트의 형제 자매는 클라이언트 컴포넌트가 됩니다.
- Not revalidating data after mutations
  - 개발자들의 일반적인 실수 중 하나는 data를 변경(mutate)하고나서 revalidate 하는 작업을 까먹는 것입니다.
  - 데이터 변경 이후, `next/cache`의 `revalidatePath()`을 실행하세요. 그래야 화면에 보여지는 데이터가 업데이트 됩니다.
- Redirects inside of try/catch blocks
  - `return redirect()` 대신 `redirect()`를 사용하세요.
  - `redirect()` 함수는 Typescript의 `never` 타입을 사용하므로 return을 붙일 필요가 없습니다.
