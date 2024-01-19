# Node.js 환경에서 TypeScript 실행 - "ts-node"

https://velog.io/@woongbeee/Typescript%EB%A5%BC-Node.js-%EC%97%90%EC%84%9C-%EC%8B%A4%ED%96%89%ED%95%A0-%EB%95%8C-ts-node-%EC%98%A4%EB%A5%98

Node.js + Express + Typescript + GraphQL 환경

ts-node 설치 및 서버 실행

```
$ yarn add ts-node
$ ts-node server.ts
```

nodemin 으로 node 실행할 경우

```
$ nodemon --exec ts-node ./index.ts
```

## path alias

https://blog.naver.com/PostView.naver?blogId=psj9102&logNo=222653630355&parentCategoryNo=&categoryNo=66&viewDate=&isShowPopularPosts=true&from=search

alias 선언 후 에러가 발생할 경우

```
$ yarn add tsconfig-paths
```

package.json

```
"scripts": {
    "dev": "nodemon --exec ts-node -r tsconfig-paths/register ./main.ts"
}
```

## tsc 빌드

```
$ npx tsc -p tsconfig.json
```

에러가 발생할 경우

```
$ yarn add tsc-alias
```

```
$ npx tsc && tsc-alias
```

---

## TypeScript 실행관련 연관된 패키지 버전 중요!

```json
{
  "name": "server-graphql",
  "version": "1.0.0",
  "description": "",
  "main": "server.js",
  "scripts": {
    "help-inspect": "echo \"node --inspect server.js 실행 후, 크롬브라우저 chrome://inspect/#devices 접속, Remote Target 목록에서 해당 'inspect' 링크 클릭\"",
    "typecheck": "tsc --project ./tsconfig.json --noEmit",
    "server": "cross-env NODE_ENV=development nodemon --exec ts-node -r tsconfig-paths/register server.ts"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "@apollo/server": "^4.1.1",
    "@apollo/server-plugin-landing-page-graphql-playground": "^4.0.0",
    "axios": "^0.27.2",
    "body-parser": "^1.20.1",
    "cors": "^2.8.5",
    "cross-env": "^7.0.3",
    "express": "^4.18.1",
    "graphql": "^16.5.0",
    "graphql-modules": "^2.1.2"
  },
  "devDependencies": {
    "@types/cors": "^2.8.12",
    "@types/node": "^17.0.23",
    "nodemon": "^2.0.15",
    "ts-node": "^10.7.0",
    "tsc-alias": "^1.6.6",
    "tsconfig-paths": "^3.14.1",
    "typescript": "^4.9.5"
  }
}
```

## `ERR_UNKNOWN_FILE_EXTENSION` 에러

tsconfig.json

```
"target":"ES2017",
"module":"ESNext",
"moduleResolution":"Node",
```

package.json

```
"type:"module"
```

tsconfig.json

```
"ts-node":{
    "esm":true
}
```

---

# tsx 활용 TypeScript 컴파일!!

https://www.npmjs.com/package/tsx
