# Vite

https://yozm.wishket.com/magazine/detail/1620/

https://github.com/taowen/vite-howto

# 이슈경험

## NPM Package 관련 설정 - CommonJS / ESM 모듈시스템 지원

`study.git/인프라/서버/NodeJS_NPM/NodeJS_모듈시스템.md` 참고!

https://gusrb3164.github.io/web/2022/10/24/package-exports/

https://youthfulhps.dev/javascript/nodejs-module-system/#conditional-exports

`node.js 는 CommonJS 와 ESM 을 함께 지원하기 위해 exports 기능을 추가`했다.  
패키지를 사용하는 쪽에서 해당 패키지를 불러올 때 CommonJS 의 require 혹은 ESM의 import 중 어느 구문을 통해 모듈을 불러왔는지에 따라 해당 패키지의 번들을 조건적으로 제공할 수 있게 된다.

```javascript
// package.json
{
  "name": "my-package",
  "exports": {
    ".": {
      "import": "./dist/lib.mjs",
      "require": "./dist/lib.cjs"
    }
  }
}
```

```javascript
// package.json
{
  "files": ["**"],

  "main": "./index.js",
  "module": "./esm/index.js",
  "types": "./types/index.d.ts",

  "exports": {
    "./plugin": {
      "types": "./types/plugin/index.d.ts",
      "module": "./plugin/esm/index.js",
      "default": "./plugin/index.js"
    }
  }
}
```

## Vite tsconfig 이슈

루트 디렉토리에서 터보레포로 빌드할 경우,  
각각의 NPM 패키지(예: fetch-manager) tsconfig.json 의 extends 가 아래와 같이 설정되면  
빌드 파일이 dist/src 뿐만아니라 비정상적으로 모든 패키지 빌드파일이 들어감

```json
{
  "extends": "@ysm/config/tsconfig.base.json"
}
```

```
dist
├─ apps
├─ packages
├─ index.d.ts
└─ ...
```

아래 설정이 각 모듈의 tsconfig.json 에 설정되어야 한다!!

https://github.com/vercel/turbo/blob/main/examples/basic/packages/ui/tsconfig.json

```json
"compilerOptions": {
    "outDir": "dist"
}
```

## esbuild

무려 100배나 esbuild가 더 빠른데 왜 다들 Webpack를 쓰고 있는 걸까요?  
esbuild 가 나올 당시 웹팩(Webpack)은 단순한 빌드 도구가 아니었습니다.  
DevServer, 각종 Loader를 통한 트랜스 파일, 코드 스프리팅, 트리셰이킹, HMR, CSS, HTML, asset 지원 등 빌드 도구를 넘어서서  
개발을 할 수 있게 해주는 통합 툴이었습니다.  
그에 반해 esbuild는 그저 빌드 도구일 뿐입니다.

## esbuild + Snowpack

Snowpack은 esbuild를 통해서 개발 모드를 지원하고,  
실제 번들은 Webpack을 통해 제공하는 방식으로 편리함과 속도라는 두 마리 토끼를 잡을 수 있게 되었습니다.

## Vite

에반 유는 Snowpack 단점을 놓치지 않았고, 이를 개선해서 Vite를 만들었습니다.  
뷰(Vue.js)를 개발한 에반 유의 특기는 기존 쓰던 제품을 더 간결하고 사용하기 편하게 만드는 것이었습니다.  
angaulrjs의 단점을 개선해 더 간결하고 쓰기 쉬운 Vue.js를 만들었고, Redux를 보고 Vuex를 만들었으며, Next를 통해 Nuxt를 만들었습니다.  
그리고, Snowpack을 통해 Vite를 세상에 선보였습니다.

`Vite는 esbuild와 브라우저 모듈을 이용한 개발모드, 개발 서버, 프록시 서버, 번들툴, 코드 스프리팅, HMR 등` 지금까지 나왔던 Snowpack의 컨셉과  
`다른 번들 도구에서 제공하는 기능을 하나로 모은 프론트엔드 번들 도구`였습니다.

## Vite React

https://stackoverflow.com/questions/70519656/referenceerror-react-is-not-defined-migrating-from-cra-to-vite-and-nx

https://github.com/remix-run/remix/issues/7885

```
$ yarn add @vitejs/plugin-react
```

```javascript
// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
});
```

## Vite TypeScript

TypeScript를 Vite와 함께 사용할 때 TypeScript의 모듈을 확인하는 동작이 tsconfig.json의 baseUrl 및 paths 구성에 의존하는데, ESLint는 기본적으로 이 구성을 읽지 않는다.

ESLint가 프로젝트의 모듈 경로를 올바르게 확인하도록 하려면 Vite 구성 파일에서 vite-tsconfig-paths 플러그인을 사용할 수 있다. 이 플러그인은 tsconfig.json에서 baseUrl 및 paths 구성을 읽고 ESLint에서 사용할 수 있도록 한다.

https://velog.io/@otterji/Vite-typescript-%ED%99%98%EA%B2%BD%EC%97%90%EC%84%9C-path-%EC%84%A4%EC%A0%95%ED%95%98%EA%B8%B0

## Vite TypeScript 컴포넌트 \*.d.ts 파일 생성

https://jgjgill-blog.netlify.app/post/create-your-own-component-library/

```
$ yarn add vite-plugin-dts
```
