# Vite

https://yozm.wishket.com/magazine/detail/1620/

https://github.com/taowen/vite-howto

에반 유는 Snowpack 단점을 놓치지 않았고, 이를 개선해서 Vite를 만들었습니다.  
뷰(Vue.js)를 개발한 에반 유의 특기는 기존 쓰던 제품을 더 간결하고 사용하기 편하게 만드는 것이었습니다.  
angaulrjs의 단점을 개선해 더 간결하고 쓰기 쉬운 Vue.js를 만들었고, Redux를 보고 Vuex를 만들었으며, Next를 통해 Nuxt를 만들었습니다.  
그리고, Snowpack을 통해 Vite를 세상에 선보였습니다.

`Vite는 esbuild와 브라우저 모듈을 이용한 개발모드, 개발 서버, 프록시 서버, 번들툴, 코드 스프리팅, HMR 등` 지금까지 나왔던 Snowpack의 컨셉과  
`다른 번들 도구에서 제공하는 기능을 하나로 모은 프론트엔드 번들 도구`였습니다.

https://techblog.woowahan.com/16910/

- Vite는 개발 서버를 구동할 때에는 esbuild를 사용하여 개발자에게 매우 빠른 콜드 스타트와 코드 변경에 대한 갱신을 가능하게 하고,
- 실제 production 빌드 시에는 rollup을 번들러로 사용하여 빠른 성능과 함께 유연한 설정과 확장성을 제공합니다.

## 트랜스파일링

- @vitejs/plugin-react 를 사용하면 Babel을 통해 트랜스파일을 수행하게 되고,
- @vitejs/plugin-react-swc 를 사용하면 SWC(Speedy Web Compiler)를 통해 작업을 수행

## 구현한 기능을 바로 확인하는 방법 - 웹 애플리케이션 페이지를 패키지로 개발

https://techblog.woowahan.com/16910/

웹 페이지를 패키지로 구성하여 컴포넌트를 제공하기 때문에 패키지만으로는 애플리케이션으로 실행해 볼 수 없습니다.  
때문에 기능의 구현 및 수정사항을 확인하기 위해서는 페이지를 구동할 기본적인 애플리케이션을 마련해야 했습니다.

명령어의 인수를 변경하면 패키지의 페이지를 포함한 간단한 SPA를 빌드하여 빠르게 확인할 수 있도록 구성하였습니다.

이를 위해서 vite.config.ts 파일 내에 아래와 같이 빌드 관련 설정을 추가해 주었고  
이 스크립트는 Vite 설정에서 기본으로 제공하는 모드(--mode)를 전달인자로 받아 처리하도록 구성하였습니다.  
https://ko.vitejs.dev/guide/env-and-mode.html#modes

```bash
$ vite build --mode spa
```

SPA 빌드 시 index.html 이 생성됩니다.

이렇게 빌드된 산출물을 정적 웹 배포 파이프라인에 제공하거나 로컬 서버에서 구동하면 구현된 내용을 실제 환경에서 빠르게 테스트할 수 있습니다.

### 패키지 내에서의 실행 환경에 대한 처리

패키지로 구성하여 배포한 기능의 경우 사용처의 실행 환경에 대하여 런타임에 알 수 있는 방법이 없습니다.

패키지는 빌드되어 저장소에 올라가는 순간 이미 운영 배포가 완료된 것이 됩니다.  
하지만 이 프로젝트로 구현되는 기능은 하나의 온전한 지면으로 그 안에서 서버 API 호출을 통한 통신을 하고 있었습니다.  
사용처가 되는 호스트 애플리케이션에서 베타 환경 실행을 하여 베타 환경의 API 엔드 포인트를 호출하게 되더라도 패키지로 구성된 본 기능에서는 이미 운영 환경 배포가 완료되었기 때문에  
현재 호스트 애플리케이션이 베타 환경에서 실행되었다는 것을 알 수 없어 운영 환경의 API 엔드 포인트를 호출하게 되는 문제가 있었습니다.  
그래서 실행 환경을 prop으로 전달받아 그에 맞는 API 엔드 포인트를 호출할 수 있도록 구성하였습니다.

당시 이 기능을 사용할 사용처에서는 개발(dev), 베타(beta), 운영(prod), 카나리(canary) 환경을 구성하여 활용하고 있었고,  
아래와 같이 엔드 포인트를 나누어서 구성하였습니다.

```typescript
type Env = 'dev' | 'beta' | 'prod' | 'canary';

export const BASE_URL: Record<Env, string> = {
  dev: `${DEV_환경_엔드_포인트_URL}`,
  beta: `${BETA_환경_엔드_포인트_URL}`,
  prod: `${PROD_환경_엔드_포인트_URL}`,
  canary: `${CANARY_환경_엔드_포인트_URL}`,
};
```

실제 API 호출 시에는 사용처에서 앱을 구동하는 때에 prop으로 전달해 주는 값을 이용하여 런타임에 엔드 포인트를 각기 다르게 호출하게 됩니다.

위와 같이 구현된 컴포넌트는 패키지 빌드 시 하나의 엔트리 포인트만을 제공하기 때문에 사용처에서 일반 컴포넌트를 가져와 사용하듯이 구현할 수 있습니다.

## esbuild

무려 100배나 esbuild가 더 빠른데 왜 다들 Webpack를 쓰고 있는 걸까요?  
esbuild 가 나올 당시 웹팩(Webpack)은 단순한 빌드 도구가 아니었습니다.  
DevServer, 각종 Loader를 통한 트랜스 파일, 코드 스프리팅, 트리셰이킹, HMR, CSS, HTML, asset 지원 등 빌드 도구를 넘어서서  
개발을 할 수 있게 해주는 통합 툴이었습니다.  
그에 반해 esbuild는 그저 빌드 도구일 뿐입니다.

## esbuild + Snowpack

Snowpack은 esbuild를 통해서 개발 모드를 지원하고,  
실제 번들은 Webpack을 통해 제공하는 방식으로 편리함과 속도라는 두 마리 토끼를 잡을 수 있게 되었습니다.

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
