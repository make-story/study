# `NEXT_PUBLIC_`

https://nextjs.org/docs/basic-features/environment-variables#exposing-environment-variables-to-the-browser

# next.config.js

https://nextjs.org/docs/pages/api-reference/next-config-js/env

```javascript
module.exports = {
  // JavaScript 번들에 환경 변수를 추가 (브라우저 환경에서도 접근할 수 있는 환경 변수)
  env: {
    REACT_APP_ENV: process.env.REACT_APP_ENV,
    REACT_APP_LOCAL_DEBUG: process.env.REACT_APP_LOCAL_DEBUG,
  },
};
```

https://nextjs.org/docs/api-reference/next.config.js/runtime-configuration

```javascript
module.exports = {
  serverRuntimeConfig: {
    // Will only be available on the server side
    mySecret: "secret",
    secondSecret: process.env.SECOND_SECRET, // Pass through env variables
  },
  publicRuntimeConfig: {
    // Will be available on both server and client
    staticFolder: "/static",
  },
};
```
