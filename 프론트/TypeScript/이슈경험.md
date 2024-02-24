# TypeScript 이슈 슈팅 (트러블슈팅, 이슈경험)

## @type/react 버전 관련 이슈

https://stackoverflow.com/questions/71842787/next-js-typescript-error-you-do-not-have-the-required-packages-installed

### NPM 의존성 버전이 맞지 않을 경우, 에러 발생함

```
It looks like you're trying to use TypeScript but do not have the required package(s) installed.

Please install @types/react by running:

        npm install --save-dev @types/react

If you are not trying to use TypeScript, please remove the tsconfig.json file from your package root (and any TypeScript files in your pages directory).
```

즉, yarn.lock 파일 중요함!! 성공한 lock 파일 가지고 의존성 모듈 설치 및 서버 실행해야 함!

`react 버전과 서로 호환되는 @types/react 설치필요!`
`@types/react 도 설치된 TypeScript 버전에 따른 호환성 확인 필요`  
https://www.npmjs.com/package/@types/react?activeTab=versions
