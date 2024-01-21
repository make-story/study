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

# Next.js + API Mock Service Worker (MSW)

https://jaypedia.tistory.com/382

https://velog.io/@minsang9735/NextJS%EC%97%90%EC%84%9C-MSW%EB%A5%BC-%EC%82%AC%EC%9A%A9%ED%95%B4%EB%B3%B4%EC%9E%90

https://velog.io/@shinhw371/Nextjs-13-MSW-Failure-Record

https://medium.com/@iamkjw/msw%EB%A1%9C-api-%EB%AA%A8%ED%82%B9%ED%95%98%EA%B8%B0-29c80bbed37b

공식홈페이지  
https://mswjs.io/docs/cli/init/
