# Node.js 는 CommonJs 모듈 시스템을 표준 시스템으로 사용하고 있다.

```javascript
// CommonJs
const gulp = require("gulp");
const babel = require("gulp-babel");

// ESModule
import gulp from "gulp";
import babel from "gulp-babel";
```

## CommonJS -> ESM 방식 사용

`Node.js 에서 ES모듈 시스템을 활용하려면 Babel 이라는 별도의 도구가 필요했는데,`
`Node.js 13.2 버전(2019-11-21) 부터 손쉽게 ES모듈을 활용할 수 있게 되었다.`

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
import fs from "node:fs";
import http from "node:http";
import https from "node:https";
import path from "node:path";
import { parse } from "node:url";
import os from "node:os";
import cluster from "node:cluster";
```
