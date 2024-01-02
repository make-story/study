# `NEXT_PUBLIC_`

https://nextjs.org/docs/basic-features/environment-variables#exposing-environment-variables-to-the-browser

클라이언트 사이드에서도 접근하고 싶은 값에 대해서는 환경 변수 이름 앞에 `NEXT_PUBLIC_` 을 붙입니다.

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
    mySecret: 'secret',
    secondSecret: process.env.SECOND_SECRET, // Pass through env variables
  },
  publicRuntimeConfig: {
    // Will be available on both server and client
    staticFolder: '/static',
  },
};
```

# ENV

'실전 웹 애플리케이션 개발' 책 내용 중 - p159
Next.js 는 내부적으로 환경 변수를 위한 .env 파일을 처리할 수 있습니다.  
`프로젝트 루트에 위치한 환경변수 파일 .env 는 자동으로 로딩되어 코드상에서 참조할 수 있습니다.`

.env 를 포함해 다음 형식의 파일을 참조할 수 있습니다.

- .env
- .env.local
- .env.${환경명}
- .env.${환경명}.local

.local 이 붙은 것은 .gitignore 에 추가되는 것을 의도한 것으로  
API 키 등의 공개하고 싶지 않은 값을 저장하기 위해 사용합니다.

`.env 와 .env.local 은 환경에 관계없이 항상 사용할 수 있습니다.`

.env.development 와 .env.development.local 은 개발 서버를 작동시킬 때,  
.env.production 과 .env.production.local 은 빌드 시 또는 프로덕션 환경에서 (서버를) 작동시킬 때 사용합니다.
