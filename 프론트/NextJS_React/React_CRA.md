# Create React App (CRA) - 2016년 Create React App을 출시

https://create-react-app.dev/  
https://create-react-app.dev/docs/getting-started

https://github.com/facebook/create-react-app

create-react-app은 React App의 개발 환경을 한 줄의 커맨드로 구성해주는 boilerplate이다.  
(보일러 플레이트는 변경 없이 계속해서 재 사용할 수 있는 저작물)

React와 함께 facebook에서 만들었고 npm과 yarn 패키지로 제공된다.  
하는 일은 크게 3가지라고 할 수 있다.

- index.html, index.js를 포함한 웹페이지에 필요한 기본 디렉토리 구성
- react, react-dom, react-scripts 및 dependency 라이브러리 설치
- react-scripts를 사용하여 package.json에 npm command 정의

```
$ yarn create react-app <<프로젝트 폴더명>>
```

## CRA 버전 지정 설치

https://www.npmjs.com/package/react-scripts/v/3.4.4?activeTab=versions

```
$ yarn global remove create-react-app
$ yarn create react-app ./apps/client --scripts-version 4.0.1 --template typescript
```

---

## 리액트 프레임워크의 부상 `신규 리액트 공식 사이트에서는 CRA 가이드를 하지 않음`

Next.js 등 다른 방법들을 가이드

https://react.dev/learn/start-a-new-react-project

### 관련된 의견

https://junghan92.medium.com/%EB%B2%88%EC%97%AD-create-react-app-%EA%B6%8C%EC%9E%A5%EC%9D%84-vite%EB%A1%9C-%EB%8C%80%EC%B2%B4-pr-%EB%8C%80%ED%95%9C-dan-abramov%EC%9D%98-%EB%8B%B5%EB%B3%80-3050b5678ac8

원문
https://github.com/reactjs/react.dev/pull/5487
https://github.com/reactjs/react.dev/pull/5487#issue-1551949585

Dan Abramov의 답변
https://github.com/reactjs/react.dev/pull/5487#issuecomment-1409720741

---

## serviceWorker.js

serviceWorker.js 파일에는 PWA(Progressive web app)와 관련된 코드가 들어 있다.  
PWA는 오프라인에서도 잘 동작하는 웹 애플리케이션을 만들기 위한 기술이다.  
create-react-app 으로 프로젝트를 생성하면 PWA 기능은 기본적으로 꺼져 있는 상태다.  
PWA 기능을 원한다면 index.js 파일에 serviceWorker.register(); 코드를 넣으면 된다.

## NODE_ENV

create-react-app 에서는 NODE_ENV 환경 변수를 기본으로 제공한다. (process.env.NODE_ENV 설정값 존재)  
NODE_ENV 환경 변수의 값은 다음과 같이 결정된다.

- npm start 로 실행하면 development
- npm test 로 실행하면 test
- npm run build 로 실행하면 production

## react-scripts

react-scripts/scripts/start.js

- npm start  
  start.js 스크립트에서는 webpack으로 src/index.js를 엔트리로 하는 소스파일들을 번들링하고 그것을 webpack-dev-server와 react-dev-utils를 사용해 browser에 띄운다.

- npm run build  
  build.js 스크립트에서는 start.js에서와 마찬가지로 번들링을 하고, 다른 점은 build/ 디렉토리에 번들링한 결과를 저장한다.  
  이것으로 배포할 수 있고 배포 스크립트는 따로 작성해야 한다.

- npm run eject  
  하나의 dependency로 묶여있는 webpack, babel, eslint 등을 eject(꺼내다)하는 것이다.  
  이는 one-way operation으로 한 번 실행하면 이전으로 돌아갈 수 없다.

---

# CRA -> Next.js 전환

https://alexrider94.tistory.com/59

https://nextjs.org/docs
