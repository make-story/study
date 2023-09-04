# Next.js 13 신규 기능

https://helloinyong.tistory.com/345

## app/

(beta)

https://nextjs.org/docs/app/building-your-application/routing#the-app-router

Next.js 13에서는 app 경로를 이용해서 페이지 구성과 라우팅 기능을 구현할 수 있다.

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
import { use } from "react";

async function getData() {
  const res = await fetch("...");
  const name: string = await res.json();
  return name;
}

export default function Page() {
  // This value is fully typed
  // The return value is *not* serialized
  // so you can return Date, Map, Set, etc.
  const name = use(getData());

  return "...";
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
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Clone the request headers and set a new header `x-version`
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-version", "13");

  // You can also set request headers in NextResponse.rewrite
  const response = NextResponse.next({
    request: {
      // New request headers
      headers: requestHeaders,
    },
  });

  // Set a new response header `x-version`
  response.headers.set("x-version", "13");
  return response;
}
```

또한, Auth 인증 실패 등으로 리다이렉트가 필요할 때, 더 이상 rewrite, redirect를 쓰지 않고, 바로 response 선언 부분에서 Json 형태로 Response를 처리할 수 있다.

```javascript
// middleware.ts
import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@lib/auth";

// Limit the middleware to paths starting with `/api/`
export const config = {
  matcher: "/api/:function*",
};

export function middleware(request: NextRequest) {
  // Call our authentication function to check the request
  if (!isAuthenticated(request)) {
    // Respond with JSON indicating an error message
    return NextResponse.json(
      {
        success: false,
        message: "Auth failed",
      },
      {
        status: 401,
      }
    );
  }
}
```

현재는 Middleware로부터 response 보내는 부분은 experimental 단계에서 next.config.js에서 experimental.allowMiddlewareResponseBody 설정을 별도로 해주어야 한다.

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
