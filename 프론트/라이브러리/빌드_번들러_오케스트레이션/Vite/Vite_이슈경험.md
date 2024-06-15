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

# 브라우저에서 Node.js 모듈 사용 가능성이 있는 경우 경고! - 예를 들어 crypto 모듈

https://vitejs.dev/guide/troubleshooting.html#module-externalized-for-browser-compatibility

https://github.com/vitejs/vite/issues/792

`https://github.com/davidmyersdev/vite-plugin-node-polyfills`

```javascript
import { defineConfig } from 'vite';
import { nodePolyfills } from 'vite-plugin-node-polyfills';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [nodePolyfills()],
});
```

`Next.js - jwtwebtoken 라이브러리 에러!`  
https://velog.io/@sssssssssy/Next.js-13ver-%EC%97%90%EC%84%9C-%EB%A1%9C%EA%B7%B8%EC%9D%B8-%EC%9C%A0%EC%A7%80%ED%95%98%EA%B8%B0

```
JWT verification error: The edge runtime does not support Node.js 'crypto' module.
Learn More: https://nextjs.org/docs/messages/node-module-in-edge-runtime
```
