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

## app/

(beta)

https://nextjs.org/docs/app/building-your-application/routing#the-app-router

Next.js 13에서는 app 경로를 이용해서 페이지 구성과 라우팅 기능을 구현할 수 있다.

https://nextjs.org/docs/app/building-your-application/rendering/server-components

`React Server Components, RSC 사용가능!!!`

> 기존 Pages 단위 서버렌더링이 아닌 컴포넌트 단위(/app/\*) 서버 렌더 컴포넌트 구성가능

### 리액트 서버 컴포넌트 (RSC)

https://patterns-dev-kr.github.io/rendering-patterns/react-server-components/#%EC%84%9C%EB%B2%84-%EC%BB%B4%ED%8F%AC%EB%84%8C%ED%8A%B8

- 서버 컴포넌트의 코드는 클라이언트에 전송되지 않는다.
  대부분 React SSR구현들은 컴포넌트 코드가 자바스크립트 번들에 포함되 클라이언트에 전송된다. 이는 인터렉션을 지연시킨다.
- 서버 컴포넌트는 컴포넌트 트리 내 아무 곳이라도 백엔드에 접근할 수 있다.
  Next.js를 사용할때는 getServerProps()를 통하여 백엔드에 접근했지만 이 것은 페이지 단위로만 제한되어 있었다. npm에 올라간 모든 컴포넌트는 이렇게 할 수 없다.
- 서버 컴포넌트는 클라이언트 컴포넌트 트리의 상태를 유지한채로 서버로부터 다시 받아올 수 있다.
  이는 주요 전송 메커니즘이 HTML보다 더 다양한 케이스르 커버할 수 있기 때문이다. 따라서 검색 결과 텍스트, 포커스, 텍스트 선택 등의 클라이언트 상태를 날리지 않은 상태로 검색 결과 목록과 같은 서버렌더링 영역이 리패칭될 수 있다.

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

### Data Fetching

https://github.com/XionWCFM/Nextjs-docs-Korean-translation/blob/main/nextjsdocs/BuildingYourApplication/DataFetching/Fetching.md

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
