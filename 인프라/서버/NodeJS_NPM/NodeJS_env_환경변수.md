# 환경 변수 (environment variable, env)

`study.git/프론트/NextJS_React/NextJS_환경변수.md` 참고!

## 비밀번호, 패스워드(password)

비밀번호(또는 패스워드) 는 ENV 파일에 저장하지 않는다.  
실수로 Git (버전관리프로그램) 을 통해 공유될 수 있으며, Next.js 등 env 설정 실수로 public 하게 사이트에 노출될 가능성이 있음.

서버 내부 파일형태로 저장하고, 해당 파일을 읽어서 사용

## NODE_ENV 값 종류

https://nextjs.org/docs/messages/non-standard-node-env

https://nodejs.org/en/learn/getting-started/nodejs-the-difference-between-development-and-production

https://ko.vitejs.dev/guide/env-and-mode.html#node-env-and-modes

- production
- development
- test

## 우선순위

Next.js 참고!

https://nextjs.org/docs/pages/building-your-application/configuring/environment-variables#environment-variable-load-order

## 명령어로 환경변수 주입

window

```bash
$ SET NODE_ENV=development
```

mac

```bash
$ export NODE_ENV=development
```

## 파일(.env)로 환경변수 주입 및 실행

https://stackoverflow.com/questions/25112510/how-to-set-environment-variables-from-within-package-json

'.test' 파일생성 및 환경변수 추가

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

## 설정된 환경변수 리스트 확인

```bash
$ env
```

## dotenv 도구를 활용한 방법

파일(예 .env)에 설정된 환경변수를 process.env 에 주입해 주는 라이브러리

https://www.npmjs.com/package/dotenv

### `dotenv-cli`

https://github.com/entropitor/dotenv-cli

터보레포 설정에서 연동가능  
https://turbo.build/repo/docs/handbook/environment-variables

```bash
$ dotenv -e .env2 -- <command with arguments>
```

## cross-env

OS별 다른 환경변수 주입 대응 라이브러리

리눅스 또는 맥의 경우 "export 키=값", 윈도우의 경우 "SET 키=값"의 형태로 사용

## dotenv / cross-env 차이

- dotenv 는 환경변수가 설정된 특정 파일을 읽어서 process.env 에 주입
- cross-env 는 명령줄(CLI)에서 환경변수를 OS 별 대응없이 사용가능하도록 주입

## dotenv / dotenv-flow 차이

https://www.npmjs.com/package/dotenv-flow

dotenv-flow는 dotenv를 확장

## dotenv, Node.js v20 내장됨

https://dev.to/cjreads665/nodejs-2060-say-goodbye-to-dotenv-2ijl

```
$ node --env-file .env
```
