# ENV

'실전 웹 애플리케이션 개발' 책 내용 중 - p159
Next.js 는 내부적으로 환경 변수를 위한 .env 파일을 처리할 수 있습니다.  
`프로젝트 루트에 위치한 환경변수 파일 .env 는 자동으로 로딩되어 코드상에서 참조할 수 있습니다.`

.env 를 포함해 다음 형식의 파일을 참조할 수 있습니다.

## 우선순위

- pages 방식
  https://nextjs.org/docs/pages/building-your-application/configuring/environment-variables#environment-variable-load-order
- app 방식
  https://nextjs.org/docs/app/building-your-application/configuring/environment-variables#environment-variable-load-order

- process.env
- .env.$(NODE_ENV).local
- .env.local (Not checked when NODE_ENV is test.)
- .env.$(NODE_ENV)
- .env

## React > Next.js 마이그레이션 환경변수 고려사항

기존 사용하던 환경변수 Next.js (브라우저 환경에서 변수 접근가능)에서도 사용가능하도록 next.config.js 설정  
고려해야 할 점은 Node.js 의 dotenv-flow 라이브러리 우선순위와 Next.js 우선순위 확인 해야한다!

- dotenv-flow
  https://www.npmjs.com/package/dotenv-flow#variables-overwritingpriority
- Next.js
  https://nextjs.org/docs/pages/building-your-application/configuring/environment-variables#environment-variable-load-order

## NODE_ENV

`study.git/인프라/서버/NodeJS_NPM/NodeJS_env_환경변수.md` 참고!

NODE_ENV 값 종류

- production
- development
- test

## ENV local

.local 이 붙은 것은 .gitignore 에 추가되는 것을 의도한 것으로  
API 키 등의 공개하고 싶지 않은 값을 저장하기 위해 사용합니다.

`.env 와 .env.local 은 환경에 관계없이 항상 사용할 수 있습니다.`

.env.development 와 .env.development.local 은 개발 서버를 작동시킬 때,  
.env.production 과 .env.production.local 은 빌드 시 또는 프로덕션 환경에서 (서버를) 작동시킬 때 사용합니다.

## Next.js NODE_ENV 기본 설정 값

https://nextjs.org/docs/messages/non-standard-node-env

- production: When your application is built with next build
- development: When your application is run with next dev
- test: When your application is being tested (e.g. jest)

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

# Next.js build 명령은 NODE_ENV=production 고정?

package.json

```json
{
  "scripts": {
    "build": "NODE_ENV=${NODE_ENV:=development} next build"
  }
}
```

위와 같이 실행할 경우,

You are using a non-standard "NODE_ENV" value in your environment.  
This creates inconsistencies in the project and is strongly advised against.  
Read more: https://nextjs.org/docs/messages/non-standard-node-env

에러가 발생하며, SSG 빌드간 에러가 발생할 수 있다.

참고  
https://github.com/vercel/next.js/issues/3605#issuecomment-370255754

development 환경에서 실행이 필요한 경우  
https://nextjs.org/docs/pages/api-reference/next-cli#development

```
$ next dev
```

## `NODE_ENV=test 로 next build 정상 실행가능!`

```json
{
  "scripts": {
    "build": "NODE_ENV=${NODE_ENV:=test} next build"
  }
}
```
