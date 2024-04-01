# 환경 변수 (environment variable, env)

## 환경변수 주입

window

```bash
$ SET NODE_ENV=development
```

mac

```bash
$ export NODE_ENV=development
```

dotenv 도구를 활용한 방법  
https://www.npmjs.com/package/dotenv

## env 파일로 주입 및 실행

https://stackoverflow.com/questions/25112510/how-to-set-environment-variables-from-within-package-json

.test

```
TEST=12345
```

```json
{
  "scripts": {
    "env:start": "echo $TEST",
    "env:linux": "export $(cat .test | xargs) && env",
    "env:linux:start": "export $(cat .test | xargs) && yarn env:start",
    "env:windows": "(for /F \"tokens=*\" %i in (.test) do set %i)",
    "env:windows:start": "(for /F \"tokens=*\" %i in (.test) do set %i) && yarn env:start"
  }
}
```

`dotenv-cli`
https://github.com/entropitor/dotenv-cli

```bash
$ dotenv -e .env2 -- <command with arguments>
```

## env 리스트

```bash
$ env
```

## NODE_ENV

https://nodejs.org/en/learn/getting-started/nodejs-the-difference-between-development-and-production

https://nextjs.org/docs/messages/non-standard-node-env

https://ko.vitejs.dev/guide/env-and-mode.html#node-env-and-modes

## dotenv, Node.js v20 내장됨

https://dev.to/cjreads665/nodejs-2060-say-goodbye-to-dotenv-2ijl

```
$ node --env-file .env
```
