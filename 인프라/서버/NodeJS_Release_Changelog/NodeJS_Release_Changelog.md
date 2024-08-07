# Node.js 릴리즈 (Release, 버전변경, ChangeLog) 중 참고사항 기록!

NodeJS 는 짝수버전으로 LTS 가 나오고  
일반적이로 짝수버전을 따라 버전 업데이트를 한다.

`study.git/프론트/ECMAScript/ESNext_Changelog.md` 참고!

## Release Schedule

https://nodejs.org/en/about/previous-releases

https://nodejs.org/en/blog

## 2024년부터 사용할 최신 Node.js 런타임 기능들

https://news.hada.io/topic?id=15139

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

https://toss.tech/article/commonjs-esm-exports-field

`Node.js 12 부터 ECMAScript Modules 라는 새로운 Module System 이 추가`되면서,  
기존의 CommonJS 라는 Module System 까지, 라이브러리는 두 가지 Module System 을 지원해야 하게 되었습니다.  
(ESM 지원 자체는 v8.5.0 부터 지원하지만, 안정성을 위해 v12 LTS 이상이 권장된다고 한다.)
https://nodejs.org/docs/latest-v8.x/api/esm.html  
https://nodejs.org/docs/latest-v12.x/api/esm.html

https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-7.html

Node.js 21은 기본 모듈 시스템으로서 ESM을 CommonJS보다 선호하는 경향을 보이며,  
.cjs 또는 .js 확장자를 가진 파일은 CommonJS로 취급되지만,  
새로운 실험적 플래그는 .js 파일을 ESM으로 취급하도록 변경합니다.  
https://www.codenary.co.kr/latest-news/711

## File

경로의 하위 디렉토리까지 생성

```javascript
fs.mkdirSync(logDirectory, { recursive: true }); // Node.js 10.12부터 recursive 옵션 지원
```

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

## Node.js v14 이상

Optional Chaining / Nullish / Intl.DIsplayNames / Intl.DateTimeFormat

https://grepper.tistory.com/23

### Intl.DisplayNames

Intl.DisplayNames 객체는 언어, 지역 및 스크립트 표시 이름을 일관되게 번역 가능하게 하는 객체의 생성자

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DisplayNames

### Intl.DateTimeFormat

Intl.DateTimeFormat 객체는 언어에 따라 날짜 및 시간 형식을 사용 가능하게 하는 객체의 생성자

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat

## Corepack

16.10 부터 모든 Node.js 릴리스와 함께 제공되는 새로운 바이너리 인 Corepack

https://nodejs.org/dist/latest/docs/api/corepack.html

https://v3.yarnpkg.com/getting-started/install

```bash
$ corepack install --global yarn@x.y.z
```

## watch

Node.js의 18.11.0 버전부터 런타임 중 코드 변경 사항이 있을 때 자동으로 프로세스를 재시작해주는 `watch` 기능이 활성화

https://nodejs.org/en/blog/release/v18.11.0

https://pawelgrzybek.com/til-node-v18-11-0-comes-with-a-watch-mode-so-you-might-not-need-nodemon/

https://nodejs.org/en/blog/announcements/v22-release-announce#watch-mode-node---watch

`File Watch`  
https://nodejs.org/docs/latest/api/fs.html#fswatchfilename-options-listener

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

https://nodejs.org/en/blog/announcements/v21-release-announce#built-in-websocket-client

https://github.com/nodejs/undici/tree/main/test/websocket

https://www.nearform.com/insights/whats-new-in-node-js-21/

```bash
$ node --experimental-websocket example.js
```

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

## Express 4.x 이상 body-parser 기능 내장

https://expressjs.com/ko/4x/api.html#req.body

```javascript
var express = require('express');

var app = express();

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.post('/profile', function (req, res, next) {
  console.log(req.body);
  res.json(req.body);
});
```
