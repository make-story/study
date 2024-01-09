# API Mocking, 더미데이터, 목데이터

참고: 테스트 데이터 API  
https://jsonplaceholder.typicode.com/todos/1

## MSW (Mock Service Worker)

https://mswjs.io/

https://mswjs.io/docs/integrations/browser

https://blog.rhostem.com/posts/2021-03-20-mock-service-worker

커맨드 라인에서 아래의 명령어를 실행하면 서비스 워커 등록을 위한 파일이 public 폴더에 추가된다.
보통 build, public, dist 등의 이름을 사용하는데 create-react-app, next.js를 사용하고 있다면 프로젝트 소스 최상위에 있는 public 폴더가 그것에 해당한다.

```
$ npx msw init public/ --save
```

index.js

```javascript
// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// 개발 환경에서만 실행되도록 환경 변수를 확인하는 과정이 필요하다.
if (process.env.NODE_ENV === 'development') {
  const { worker } = require('./mocks/worker');
  worker.start();
}

ReactDOM.render(<App />, document.getElementById('root'));
```
