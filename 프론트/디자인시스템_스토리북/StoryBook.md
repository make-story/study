# UI 컴포넌트 개발 도구

## @storybook/react vs bit vs catalog vs mondorepo vs react-styleguidist

https://www.npmtrends.com/bit-vs-mondorepo-vs-react-styleguidist-vs-catalog-vs-@storybook/react  
https://velog.io/@seonja/Build-an-Ui-Library-feat.%EC%8B%A0%EC%9E%85-%EA%B0%9C%EB%B0%9C%EC%9E%90

## storybook(스토리북)

https://www.daleseo.com/storybook/

사용목적에 따라, 다양하게 사용되고 있는 UI라이브러리  
UI 라이브러리를 내부 개발자들을 위해 문서화(documentation)하기 위해서 사용할 수 있고,  
외부 공개용 디자인 시스템(Design System)을 개발하기 위한 기본 플랫폼으로도 사용할 수 있습니다.  
스토리북(Storybook)을 기본 구성 단위는 스토리(Story)이며 하나의 UI 컴포넌트는 보통 하나 이상의 Story를 가지게 됩니다.

---

## 설치

### Storybook은 고유 커맨드를 가지고 있어 라이브러리를 설치하는 것만으로는 프로젝트에 적용되지 않는다.

```
$ yarn global add @storybook/cli
```

### 설치가 되었나 버전을 확인

```
$ getstorybook -V
```

### 설치 실행

```
$ getstorybook init
```

현재 설치된 라이브러리(리액트, 뷰, 스벨트 등)을 환경을 확인하여 설치  
라이브러리 종속 없이 `순수 HTML 환경에 설치하려면 수동선택 질문에서 'y' 입력`

```
Do you want to manually choose a Storybook project type to install? (y/N)
```

---

### Storybook 사용

package.json

```json
{
  "scripts": {
    // ...
    "storybook": "start-storybook -p 6006",
    "build-storybook": "build-storybook"
    // ...
  },
  "devDependencies": {
    // ...
    "@storybook/addon-essentials": "^6.4.19",
    "@storybook/addon-interactions": "^6.4.19",
    "@storybook/addon-links": "^6.4.19",
    "@storybook/addon-storysource": "^6.4.19",
    "@storybook/react": "^6.4.19",
    "@storybook/testing-library": "^0.0.9"
    // ...
  }
}
```

### Storybook 설정

.storybook 디렉터리를 열어보시면 Storybook 관련 2개의 설정 파일이 있을 것입니다.

- addons.js 파일은 Storybook 애드온을 추가할 때 사용하고,
- config.js 파일은 그 밖에 다른 설정을 할 때 사용됩니다.

.storybook/config.js 파일을 열고,  
src 디렉터리 내부에 \*.stories.js 로 끝나는 모든 파일이 Story 로 인식되도록 설정해줍니다.  
(기본 설정은 src/stories 디렉터리 하위만 탐색하므로 주석 처리가 하거나 삭제합니다.)

---

# React 18 환경 이슈

```
ERROR in ./node_modules/@storybook/react/dist/esm/client/preview/render.js
Module not found: Error: Can't resolve 'react-dom/client' ...
```

또는

```
ERROR in ./src/index.tsx
webpack compiled with 1 error
Module not found: Error: Can't resolve 'react-dom/client'

Uncaught Error: Cannot find module 'react-dom/client'
```

react-dom/client 모듈을 찾을 수 없기 때문에 발생한 문제  
react-dom/client 는 v18에서 새로 생긴 모듈  
React v18 버전부터는 이 모듈을 이용해 DOM을 렌더링

React v18 이전 버전은 다른 모듈(react-dom)을 사용

```javascript
// import ReactDOM from 'react-dom/client'; // react v18 버전용
import ReactDOM from 'react-dom'; // react v17 버전용
```

```javascript
// react v 18 버전 용
// const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
// root.render(
//   <React.StrictMode>
//         <App />
//   </React.StrictMode>
// );

// react v 17 버전용
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);
```
