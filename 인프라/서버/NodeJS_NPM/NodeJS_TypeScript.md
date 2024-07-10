# Node.js 환경에서 TypeScript 실행

중요!!!!!!  
`24년 06월 기준, 삽질의 결과 ts-node 는 tsconfig 에서 "module": "CommonJS" 설정만 지원! "NodeNext" 등 최산의 Node.js 코드활용을 위해서는 tsx 도구 사용 권장!`

https://nodejs.org/en/learn/getting-started/nodejs-with-typescript

https://jjnooys.medium.com/node-js%EC%99%80-esm-2-typescript-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-esm%EC%9C%BC%EB%A1%9C-%EB%B3%80%ED%99%98%ED%95%98%EA%B8%B0-7266e8174906

Express  
https://velog.io/@mero/typescript-%ED%83%80%EC%9E%85%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-%EC%84%A4%EC%A0%95

https://velog.io/@woongbeee/Typescript%EB%A5%BC-Node.js-%EC%97%90%EC%84%9C-%EC%8B%A4%ED%96%89%ED%95%A0-%EB%95%8C-ts-node-%EC%98%A4%EB%A5%98

tsconfig.json

```json
{
  "compilerOptions": {
    "module": "CommonJS",
    "baseURL": "./",
    "ourDir": "dist" // 컴파일 결과물 생성 위치 지정
  },
  "include": ["server.ts"] // 컴파일할 파일의 범위를 지정
}
```

## 빌드 후 실행이 더 빠른가?

https://tom.bio/posts/should-i-precompile-typescript

## 정리: 비교

2023년 2월 1일 기준

https://stackoverflow.com/questions/37979489/how-to-watch-and-reload-ts-node-when-typescript-files-change

- nodemon 과 ts-node 는 매우 안정적이지만 명시적으로 구성해야 하며 다소 느립니다.
- node-dev 와 ts-node 는 nodemon 보다 훨씬 적은 구성이 필요하지만 여전히 느립니다.
- ts-node-dev 는 빠르지만 신뢰할 수 없습니다.

`(권장, 최소한의 구성으로 가장 빠른 속도) tsx`

## tsx 활용

https://www.npmjs.com/package/tsx

```json
{
  "extends": "@makestory/config/tsconfig.server.json",
  "compilerOptions": {
    "target": "ESNext",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "outDir": "dist",
    "esModuleInterop": true,
    "sourceMap": true,
    "noEmit": false,
    "allowJs": true,
    "checkJs": true,
    "paths": {
      "#/*": ["./*"],
      "@/*": ["./src/*"]
    }
  },
  "include": ["**/*.ts", "**/*.tsx", "**/*.d.ts", "**/*.js", "**/*.json"],
  "exclude": ["node_modules", "dist"]
}
```

package.json

```json
{
  "type": "module"
}
```

## `tsc` 활용

tsconfig.server.json

```json
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "module": "commonjs",
    "moduleResolution": "node",
    "esModuleInterop": true,
    "outDir": "_dist",
    "noEmit": false
  },
  "include": ["server.ts"]
}
```

```bash
$ tsc --project tsconfig.server.json
$ NODE_ENV=development node _dist/server.js
```

### `tsc-alias`

https://www.npmjs.com/package/tsc-alias

tsconfig.json 파일은 컴파일할 때만 참고되는 파일이기 때문에  
js 파일에는 그 path 별칭들이 적용되지 않는다.  
(즉, 컴파일된 결과물을 보면 import 경로 형태가 '@/\*' 그대로 들어가 있어, 경로를 못찾게 되면서 에러가 발생!)

tsc-alias 패키지를 깔고 컴파일 시에 옵션으로 넣어주면 해당 별칭들을 실제 경로로 바꿔서 컴파일을 해준다.

```bash
$ yarn add tsc-alias
```

```bash
$ npx tsc && tsc-alias
```

package.json

```json
{
  "scripts": {
    "build": "tsc --project tsconfig.json && tsc-alias -p tsconfig.json"
  }
}
```

또는

```json
{
  "scripts": {
    "build": "tsc && tsc-alias",
    "build:watch": "tsc && (concurrently \"tsc -w\" \"tsc-alias -w\")"
  }
}
```

## `ts-node` 활용

```bash
$ yarn add ts-node
$ ts-node server.ts
```

### `tsconfig-paths` - path alias

https://blog.naver.com/PostView.naver?blogId=psj9102&logNo=222653630355&parentCategoryNo=&categoryNo=66&viewDate=&isShowPopularPosts=true&from=search

alias 선언 후 에러가 발생할 경우

tsc-alias 과 같은 경로 별칭 문제를 해결할 때쓰는 것인데  
다른 점은 ts-node 명령어로 실행시킬 때 이 문제를 해결 시키는 패키지라는 점이다.

```bash
$ yarn add tsconfig-paths
```

package.json

```json
"scripts": {
  "dev": "nodemon --exec ts-node -r tsconfig-paths/register ./main.ts"
}
```

또는

tsconfig.json

```json
{
  "ts-node": {
    "require": ["tsconfig-paths/register"]
  }
}
```

### swc 활용

```bash
$ yarn add @swc/core @swc/helpers
```

tsconfig.json

```json
{
  "ts-node": {
    "swc": true
  }
}
```

### nodemon 으로 node 실행할 경우

```bash
$ nodemon --exec ts-node --project tsconfig.json server.ts
# 또는
$ nodemon --watch "./**" --ext "ts,json" --ignore "**/*.spec.ts" --exec "ts-node --project tsconfig.json server.ts"
```

또는 nodemon.json 파일생성 후 nodemon 명령 실행

```json
{
  "watch": ["src"],
  "ext": "ts,json",
  "ignore": ["**/*.spec.ts"],
  "exec": "ts-node --project tsconfig.json server.ts"
}
```

```bash
$ nodemon
```

### pm2 로 node 실행할 경우

```bash
$ node ./node_modules/.bin/pm2 start ts-node -- --project tsconfig.json server.ts
```

### ECMAScript Module (ESM)

https://github.com/TypeStrong/ts-node?tab=readme-ov-file#commonjs-vs-native-ecmascript-modules

package.json

```json
{
  "type": "module"
}
```

tsconfig.json

```json
{
  "compilerOptions": {
    "module": "ESNext" // or ES2015, ES2020
  },
  "ts-node": {
    // Tell ts-node CLI to install the --loader automatically, explained below
    "esm": true
  }
}
```

실행

```bash
$ node --loader ts-node/esm --inspect server.ts
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

```json
{
  "type": "module"
}
```

tsconfig.json

```json
{
  "ts-node": {
    "esm": true
  }
}
```
