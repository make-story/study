# env 환경변수 우선순위

## Node.js (dotenv-flow)

https://www.npmjs.com/package/dotenv-flow#variables-overwritingpriority

## Next.js

https://nextjs.org/docs/pages/building-your-application/configuring/environment-variables#environment-variable-load-order

---

# dotenv

파일(예 .env)에 설정된 환경변수를 process.env 에 주입해 주는 라이브러리

# cross-env

OS별 다른 환경변수 주입 대응 라이브러리

리눅스 또는 맥의 경우 "export 키=값", 윈도우의 경우 "SET 키=값"의 형태로 사용

# dotenv / cross-env 차이

- dotenv 는 환경변수가 설정된 특정 파일을 읽어서 process.env 에 주입
- cross-env 는 명령줄(CLI)에서 환경변수를 OS 별 대응없이 사용가능하도록 주입
