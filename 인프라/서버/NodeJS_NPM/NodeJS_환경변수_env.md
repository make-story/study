# 환경 변수 (environment variable, env)

## 환경변수 주입

window

```bash
$ SET NODE_ENV=development
```

mac

```bash
export NODE_ENV=development
```

도구를 활용한 방법  
https://www.npmjs.com/package/dotenv

## NODE_ENV

https://nodejs.org/en/learn/getting-started/nodejs-the-difference-between-development-and-production

https://nextjs.org/docs/messages/non-standard-node-env

https://ko.vitejs.dev/guide/env-and-mode.html#node-env-and-modes

## dotenv

Node.js v20 내장됨  
https://dev.to/cjreads665/nodejs-2060-say-goodbye-to-dotenv-2ijl

```
$ node --env-file .env
```
