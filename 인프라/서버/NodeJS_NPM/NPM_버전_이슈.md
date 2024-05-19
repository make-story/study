# 의존 패키지의 버저닝 이슈

https://disco-biscuit.tistory.com/68

`ERESOLVE unable to resolve dependency tree`

```
npm ERR! code ERESOLVE
npm ERR! ERESOLVE unable to resolve dependency tree
npm ERR!
npm ERR! While resolving: react-redux-tutorial@0.0.0
npm ERR! Found: redux@5.0.0
npm ERR! node_modules/redux
npm ERR!   redux@"^5.0.0" from the root project
npm ERR!
npm ERR! Could not resolve dependency:
npm ERR! peer redux@"^3.1.0 || ^4.0.0" from redux-devtools-extension@2.13.9
npm ERR! node_modules/redux-devtools-extension
npm ERR!   redux-devtools-extension@"^2.13.9" from the root project
npm ERR!
npm ERR! Fix the upstream dependency conflict, or retry
npm ERR! this command with --force or --legacy-peer-deps
npm ERR! to accept an incorrect (and potentially broken) dependency resolution.
```

redux-devtools-extension 패키지가 redux 패키지의 특정 버전에 의존하고 있는데, 그 버전이 ^3.1.0 || ^4.0.0와 같이 지정

# 라이브러리들의 호환성이 유지되는 범위에서 각각의 버전을 최신화

npm-check-updates 라이브러리를 사용해서 각 라이브러리들의 호환성이 유지되는 범위에서 각각의 버전을 최신화

https://www.npmjs.com/package/npm-check-updates
