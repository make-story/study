# Node.js 는 CommonJs 모듈 시스템을 표준 시스템으로 사용하고 있다.

```javascript
// CommonJs
const gulp = require('gulp');
const babel = require('gulp-babel');

// ESModule
import gulp from 'gulp';
import babel from 'gulp-babel';
```

CommonJS (CJS)

```javascript
// add.js
module.exports.add = (x, y) => x + y;

// main.js
const { add } = require('./add');

add(1, 2);
```

ECMAScript Modules (ESM)

```javascript
// add.js
export function add(x, y) {
  return x + y;
}

// main.js
import { add } from './add.js';

add(1, 2);
```

## ESM 에서는 CommonJS 를 import 할 수 있지만, CommonJS 에서 ESM 을 require 할 수는 없다.

Node.js 12 부터 ECMAScript Modules 라는 새로운 Module System 이 추가되면서,  
기존의 CommonJS 라는 Module System 까지, 라이브러리는 두 가지 Module System 을 지원해야 하게 되었습니다.  
(ESM 지원 자체는 v8.5.0 부터 지원하지만, 안정성을 위해 v12 LTS 이상이 권장된다고 한다.)

https://pozafly.github.io/typescript/typescript-env/#module

https://toss.tech/article/commonjs-esm-exports-field

- CJS 는 require / module.exports 를 사용하고, ESM 은 import / export 문을 사용합니다.
- `CJS module loader 는 동기적으로 작동하고, ESM module loader 는 비동기적으로 작동합니다.`
  - ESM 은 Top-level Await 을 지원하기 때문에 비동기적으로 동작합니다.
- 따라서 ESM 에서 CJS 를 import 할 수는 있지만, CJS 에서 ESM 을 require 할 수는 없습니다. 왜냐하면 CJS 는 Top-level Await 을 지원하지 않기 때문입니다.
- 이 외에도 두 Module System 은 기본적으로 동작이 다릅니다.

따라서 두 Module System 은 서로 호환되기 어렵습니다.

## `로딩방식과 분석시점`

https://velog.io/@pengoose_dev/CJS%EC%99%80-ESM

- ESM (ECMAScript Modules)

로딩 방식
ESM 은 정적 로딩 방식을 채택한다. 이는 import 와 export 구문이 소스 코드의 상단에 미리 정의되어 있기 때문이다.

분석 시점
`코드가 번들링되는 시점에 ESM 의 import 와 export 구문을 분석한다. 번들러는 이 정보를 사용하여 모듈 간의 의존성을 파악하고 번들링 단계에서 트리쉐이킹에 활용한다.`

- CJS (CommonJS)

로딩 방식
CJS 는 동적 로딩 방식을 채택한다. require() 함수를 통해 필요한 시점에 모듈을 로드해야 하기 때문이다. (즉, 함수나 조건문을 통해 require 로 모듈 import 가능)

분석 시점
`실행단계(런타임)에 CJS 의 require() 는 모듈을 로드하기 때문에, 의존성을 미리 파악하기 어렵기 때문에 트리 쉐이킹이 비효율적이다.`

## 참고: 과거 CJS 에서 ES 모듈을 동적으로 가져오는 방식

https://ui.toast.com/weekly-pick/ko_20190805

Domenic Denicola 는 다양한 방법으로 import() 함수를 통해 ES 모듈을 동적으로 가져오는 방식을 제안했다.
(이 방식은 Node 10+ 부터 사용 가능하다.)

https://github.com/tc39/proposal-dynamic-import

```javascript
async function myFunc() {
  const { itsMine } = await import('./myESTest.mjs');
}
myFunc();
```

또는

-experimental-module 플래그를 통해 실험적으로 ESM 을 지원

## ESM 삽질기

https://devblog.kakaostyle.com/ko/2022-04-09-1-esm-problem/

```javascript
// a.js
console.log('a1');
console.log(require('./b').b);
console.log('a2');
exports.a = 1;

// b.js
console.log('b1');
console.log(require('./a').a);
console.log('b2');
exports.b = 2;
```

```
$ node a.js
a1
b1
undefined
b2
2
a2
```

require 는 그 줄에 다다를 때 실행됩니다.  
순환 참조가 발생하는 경우(require('./a')) 모듈을 다시 읽지는 않습니다.

TypeScript의 import문은 사실 require로 변환되는 코드

```typescript
// a.ts
console.log('a1');
import { b } from './b';
console.log(b);
console.log('a2');
export const a = 1;

// b.ts
console.log('b1');
import { a } from './a';
console.log(a);
console.log('b2');
export const b = 2;
```

```
$ ts-node a.ts
a1
b1
undefined
b2
2
a2
```

## 파일이 CJS 인지 ESM 인지 어떻게 알아요?

https://toss.tech/article/commonjs-esm-exports-field

package.json의 type field 또는 확장자를 보고 알 수 있습니다.

- .js 파일의 Module System은 package.json의 type field에 따라 결정됩니다.
  - type field의 기본값은 "commonjs" 이고, 이 때 .js 는 CJS로 해석됩니다.
  - 다른 하나는 "module" 입니다. 이 때 .js 는 ESM으로 해석됩니다.
- .cjs 는 항상 CJS로 해석됩니다.
- .mjs 는 항상 ESM으로 해석됩니다.

`TypeScript 도 4.7 부터 tsconfig.json 의 moduleResolution 이 nodenext 또는 node16 으로 설정`된 경우,  
위 규칙이 똑같이 적용됩니다.

- type field가 "commonjs" 인 경우, .ts 는 CJS로 해석됩니다.
- type field가 "module" 인 경우, .ts 는 ESM으로 해석됩니다.
- .cts 는 항상 CJS로 해석됩니다.
- .mts 는 항상 ESM으로 해석됩니다.

## CommonJS -> ESM 방식 사용

`Node.js 에서 ES모듈 시스템을 활용하려면 Babel 이라는 별도의 도구가 필요했는데,`
`Node.js 13.2 버전(2019-11-21) 부터 손쉽게 ES모듈을 활용할 수 있게 되었다.`

ECMAScript 모듈 (ESM)에 대한 지원을 계속 확장하고 개선  
Node.js 13.2에서 ESM 모듈 시스템은 CommonJS와 함께 사용할 수 있습니다.

https://nodejs.org/docs/latest-v13.x/api/esm.html#esm_ecmascript_modules

1. package.json 파일에 type 항목을 module로 설정하면 바로 활용 가능하다.

```json
{
  //...
  "type": "module"
  //...
}
```

2. .eslintrc.js 에 관련 설정 추가

```json
{
  "env": {
    "browser": true,
    "commonjs": true,
    "es6": true,
    "node": true
  }
}
```

3. import 로 .js 파일 할 때, 필히 확장자까지 입력 (예: import './test.js')

## import 에서 확장자까지 명확하게 쓰는 것 중요?

Relative import paths need explicit file extensions in EcmaScript imports when '--moduleResolution' is 'node16' or 'nodenext'

번들러 입장에서도 확장자까지 기입하는 것이 중요하다고 함
https://main.vitejs.dev/guide/performance.html#reduce-resolve-operations

## 두 모듈 시스템 지원하기

https://youthfulhps.dev/javascript/nodejs-module-system/#conditional-exports

node.js는 CommonJS와 ESM을 함께 지원하기 위해 exports 기능을 추가했다.  
패키지를 사용하는 쪽에서 해당 패키지를 불러올 때 CommonJS의 require 혹은 ESM의 import 중 어느 구문을 통해 모듈을 불러왔는지에 따라 해당 패키지의 번들을 조건적으로 제공할 수 있게 된다.

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
// commonjs, ./dist/lib.cjs 를 불러온다.
const myPackage = require('my-package');
​
// esm, ./dist/lib.mjs
import myPackage from 'my-package';
```

webpack5 에서는 package.json 에 type: "module"가 명시되어 있거나,  
모듈 파일의 확장자를 .mjs로 설정하여 ESM 모듈 시스템을 사용하는 번들을 생성해낼 수 있다.

https://webpack.kr/guides/ecma-script-modules/#flagging-modules-as-esm

또 다른 예시로 vite는 build.lib.formats 설정을 통해 명시한 각각의 모듈 시스템에 대한 번들을 생성해낸다.

https://vitejs.dev/config/build-options.html#build-lib

```javascript
// vite.config.js
{
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/main.ts'),
      name: pascalCase(pkg.name.split('/').pop() ?? ''),
      fileName: 'lib',
      formats: ['cjs', 'es', 'umd']
    }
  }
}
```

라이브러리가 사용되는 환경에 따라 이를 제공할 수도 있다.

```javascript
// package.json
{
  // 패키지를 사용할 때 진입되는 경로
  "main": "./dist/lib.js",
  // ES6가 호환되는 환경에서의 진입 경로
  "module": "./dist/lib.mjs",
  // 클라이언트 사이드 (브라우저) 환경에서 사용할 때 진입 경로
  "browser": "./dist/lib.js"
}
```

여기서 main 은 node.js 10 버전 이하에서 사용되는 필드이며,  
`11 이상에서는 main 과 exports 가 함께 명시되어 있는 경우 exports 가 먼저 적용`된다.

# Node.js 에서 바벨횔용 ES6 코드 실행

```
$ yarn add @babel/core @babel/cli @babel/preset-env @babel/node
$ npx babel-node --presets @babel/env index.js
```

- @babel/cli
  바벨 커맨드 라인 실행 도구

- @babel/preset-env
  프리셋은 미리 준비된 묶음
  env 프리셋은 ES2015 이상의 최신 자바스크립트 문법으로 작성된 코드를 해석

- @babel/node
  babel-node 커맨드는 @babel/node 패키지를 설치하면 사용할 수 있음

- 명령에서 '--presets' 욥션 제거방법
  .babelrc 또는 babel.config.js 바벨 설정 파일에 `"presets": ["@babel/env"],` 형태 설정 추가

# Node.js `'node:' imports`

https://nodejs.org/api/esm.html#node-imports

https://2ality.com/2021/12/node-protocol-imports.html

v16.0.0, v14.18.0 지원 (import, require 방식)

node 내부 모듈 구분

```javascript
import fs from 'node:fs';
import http from 'node:http';
import https from 'node:https';
import path from 'node:path';
import { parse } from 'node:url';
import os from 'node:os';
import cluster from 'node:cluster';
```
