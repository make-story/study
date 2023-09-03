https://nextjs.org/docs/api-reference/next.config.js/rewrites#header-cookie-and-query-matching

---

# Next.js 공통 실행 코드

---

# Next.js 미들웨어(middleware)

https://nextjs.org/docs/pages/building-your-application/routing/middleware

https://www.showwcase.com/show/15545/how-to-deploy-the-nextjs-project-with-multiple-subdomains-using-pm2-nginx-cloudflare

.env.local

```
APP_DOMAIN=fleezyform.com
```

pages/\_middleware.tsx

`pages 폴더와 같은 위치에 파일 존재해야함`  
https://nextjs.org/docs/pages/building-your-application/routing/middleware#convention

```javascript
import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest): NextResponse | Response {
  const domain = process.env.APP_DOMAIN;

  if (!domain) {
    return new Response('Please set "APP_DOMAIN" in your env');
  }

  const { pathname } = req.nextUrl;

  if (
    pathname.startsWith("/api") || //  exclude all API routes
    pathname.startsWith("/static") || // exclude static files
    pathname.includes(".") // exclude all files in the public folder
  ) {
    return NextResponse.next();
  }

  const hostname = req?.headers?.get("host");
  const whitelistDomain = [domain, `www.${domain}`];

  if (hostname && !whitelistDomain.includes(hostname)) {
    const subdomain = hostname?.split(".");
    const url = req.nextUrl.clone();

    req.nextUrl.pathname = `/store/${[subdomain[0], url.pathname].join("")}`;
    return NextResponse.rewrite(req.nextUrl);
  }

  return NextResponse.next();
}
```

pages/store/[subdomain]/index.tsx

```javascript
import type { NextPageContext } from "next";

import PlainLayout from "layouts/PlainLayout";

interface StoreProps {
  storeName: string;
}

function Store({ storeName }: StoreProps) {
  return (
    <PlainLayout>
      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
        <h1 className="text-6xl font-bold">
          <div>Welcome to</div>
          <a className="text-blue-600" href="https:/extjs.org">
            &quot;{storeName.replaceAll("-", " ")}&quot;
          </a>
        </h1>

        <div className="mt-10 flex max-w-4xl flex-wrap items-center justify-center gap-4 sm:w-full">
          {Array(4)
            .fill({})
            .map((_, idx) => (
              <div
                className="flex h-[100px] w-[100px] items-center justify-center rounded-md border"
                key={idx}
              >
                Product {idx + 1}
              </div>
            ))}
        </div>
      </main>
    </PlainLayout>
  );
}

Store.getInitialProps = async ({ req }: NextPageContext) => {
  const subdomain = req?.headers?.host?.split(".")[0];

  // you can add logic or validation here to check subdomain to database using API request
  const storeName = subdomain
    ? subdomain.charAt(0).toUpperCase() + subdomain.slice(1)
    : "";

  return { storeName };
};

export default Store;
```
