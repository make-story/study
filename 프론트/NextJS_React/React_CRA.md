# Create React App (CRA, create-react-app) - 2016년 Create React App을 출시

https://create-react-app.dev/  
https://create-react-app.dev/docs/getting-started

https://github.com/facebook/create-react-app

CRA(create-react-app) 는 React 의 개발 환경을 한 줄의 커맨드로 구성해주는 Boilerplate  
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

## CRA 에서 Next.js 전환 (마이그레이션, CRA Migration)

https://nextjs.org/docs/app/building-your-application/upgrading/codemods#migrate-from-cra

이슈경험  
https://bsnn.tistory.com/131

```
$ npx @next/codemod cra-to-next
```

## CRA 에서 webpack, babel, eslint 설정 가능한 커스터마이징 상태로 변경

```
$ npm run eject
```

또는

```
$ yarn eject
```

`주의! 이는 one-way operation 으로 한 번 실행하면 이전으로 돌아갈 수 없다.`

### eject 명령을 실행하지 않고 커스터마이징 가능 상태로 변경

craco 패키지 설치

```
$ yarn add @craco/craco
```

package.json

```json
{
  "scripts": {
    "start": "craco start",
    "build": "craco build",
    "test": "craco test"
  }
}
```

## CRA 에서의 env 환경변수

https://flamingotiger.github.io/frontend/react/create-react-app-environment/

```
.env: 기본 파일.
.env.local: .env를 덮어쓰는 파일. Test를 제외한 모든 환경에서 로딩됩니다.

.env.development: 개발자 환경에서 로딩
.env.test: 테스트 환경에서 로딩
.env.production: 프로덕션 환경에서 로딩

.env.development.local, .env.test.local, .env.production.local: 각각 env.* 를 덮어쓰는 파일입니다.
```

env 실행 우선순위  
왼쪽이 오른쪽보다 우선순위가 높습니다.

```
npm start: .env.development.local > .env.development > .env.local > .env
npm run build: .env.production.local > .env.production > .env.local, .env
npm test: .env.test.local > .env.test > .env (note .env.local is missing)
```

`Create react app 에서는 변수명앞에 무조건 REACT_APP_ 가 있어야 인식`을 합니다.
사용하지 않을시 변수를 무시합니다.

REACT_APP  
`환경 변수는 빌드에 포함되므로 누구나 앱 파일을 검사하여 볼 수 있습니다.`

CRA 공식 문서에서의 주의 사항  
'WARNING: Do not store any secrets (such as private API keys) in your React app'

https://create-react-app.dev/docs/adding-custom-environment-variables/

https://github.com/facebook/create-react-app/issues/865

```
// .env.development
REACT_APP_URL= "http://localhost:3000"

// .env.production
REACT_APP_URL= "http://localhost:4000"
```

## CRA 에서의 Proxy

package.json 에서 proxy 를 하나만 설정할 수 있고, 여러개 설정할 수도 있음

```json
{
  "proxy": "http://localhost:8000"
}
```

```json
{
  "proxy": {
    "/api": {
      "target": "http://localhost:8000"
    },
    "/auth": {
      "target": "http://localhost:8080"
    }
  }
}
```

// http://localhost:3000/api/posts => http://localhost:8000/api/posts
// http://localhost:3000/auth/login => http://localhost:8080/auth/login

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
