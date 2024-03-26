# Node.js 릴리즈 (Release, 버전변경, ChangeLog) 중 참고사항 기록!

NodeJS 는 짝수버전으로 LTS 가 나오고  
일반적이로 짝수버전을 따라 버전 업데이트를 한다.

## Release Schedule

https://nodejs.org/en/about/previous-releases

https://nodejs.org/en/blog

## dotenv

Node.js v20 내장됨  
https://dev.to/cjreads665/nodejs-2060-say-goodbye-to-dotenv-2ijl

## 'node:' imports

https://nodejs.org/api/esm.html#node-imports

https://2ality.com/2021/12/node-protocol-imports.html

v16.0.0 이상, v14.18.0 지원 (import, require 방식)

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

## ESM

Node.js 12 부터 ECMAScript Modules 라는 새로운 Module System 이 추가되면서,  
기존의 CommonJS 라는 Module System 까지, 라이브러리는 두 가지 Module System 을 지원해야 하게 되었습니다.  
(ESM 지원 자체는 v8.5.0 부터 지원하지만, 안정성을 위해 v12 LTS 이상이 권장된다고 한다.)
https://nodejs.org/docs/latest-v8.x/api/esm.html  
https://nodejs.org/docs/latest-v12.x/api/esm.html

https://toss.tech/article/commonjs-esm-exports-field

https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-7.html

Node.js 21은 기본 모듈 시스템으로서 ESM을 CommonJS보다 선호하는 경향을 보이며,  
.cjs 또는 .js 확장자를 가진 파일은 CommonJS로 취급되지만,  
새로운 실험적 플래그는 .js 파일을 ESM으로 취급하도록 변경합니다.  
https://www.codenary.co.kr/latest-news/711

## Top-level await

Node.js v14.8 이상지원

```javascript
// Top-level await 활용
//console.time('duration-time');
const response = await fetch(
  'https://7otte-test-winesoft-autoscaling.s3.ap-northeast-2.amazonaws.com/heic.list',
);
const body = await response.text();
const list = body.split('\n');
// 동기식 처리
for await (let metaPath of list) {
  await setConvertImage(metaPath);
}
```

## Corepack

16.10 부터 모든 Node.js 릴리스와 함께 제공되는 새로운 바이너리 인 Corepack

https://nodejs.org/dist/latest/docs/api/corepack.html

https://v3.yarnpkg.com/getting-started/install

```bash
$ corepack install --global yarn@x.y.z
```

## fetch

Node.js v18 지원 (실험적 지원)

https://nodejs.org/en/blog/announcements/v18-release-announce  
https://nodejs.org/dist/latest-v18.x/docs/api/globals.html#fetch  
https://dev.to/andrewbaisden/the-nodejs-18-fetch-api-72m

Node.js v21 안정화된 버전 내장  
https://blog.logrocket.com/fetch-api-node-js/

안정적인 fetch 와 WebStreams
https://www.codenary.co.kr/latest-news/711

## WebSocket 클라이언트

https://www.codenary.co.kr/latest-news/711

Node.js 21에서 WebSocket 클라이언트에 대한 실험적 지원

## Node.js Test runner에서 globs를 지원

Node.js 21

https://kyungyeon.dev/posts/105

https://nodejs.org/en/blog/announcements/v21-release-announce

테스트 러너에는 --test 매개변수를 지정해서 glob 표현식을 지원

예를들어 node --test \*_/_.test.ts 와 같은 명령을 사용해서 여러 디렉토리에 있는 모든 .test.ts 확장자 파일을 실행할 수 있다.

## Node.js 20

Node.js 20이 출시되었고, 많은 개선이 이뤄졌다.

결론적으론, Node.js 20은 이전 버전과 비교해 큰 성능 향상을 보여주었다.

https://github.com/RafaelGSS/state-of-nodejs-performance-2023
