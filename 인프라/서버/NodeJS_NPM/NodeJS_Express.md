# 문서

https://expressjs.com/ko/4x/api.html

# app.listen 과 server.listen의 차이점

https://velog.io/@yogjin/express-app.listen-%EA%B3%BC-server.listen%EC%9D%98-%EC%B0%A8%EC%9D%B4%EC%A0%90

https://stackoverflow.com/questions/17696801/express-js-app-listen-vs-server-listen

```javascript
const express = require('express');
const app = express();
// ...
app.listen(8080);
```

```javascript
const express = require('express');
const http = require('http');
const app = express();
const server = http.createServer(app);

server.listen(8080);
```

app.listen() 내부에서 http 모듈로 감싸서 return 해주고 있음

Doit Nodejs 프로그래밍 책에서는 반드시 http 모듈을 감싸주어야 한다고 되어있음

---

# 프록시 설정

```javascript
const proxy = require('express-http-proxy');

// 프록시 동작시킬 URL 경로
const proxyList = ['/api/*', '/test/address'];

// 실제 요청할 URL
const host = 'http://localhost:8080';

// 예를 들어, 로컬호스트(http://localhost/api/*)에서 요청할 경우, 프록시가 동작하여 실제 요청서버(http://localhost:8080)로 요청
server.all(proxyList, proxy(host));
```

---

# 로그

## morgan

morgan은 로깅(logging)에 도움을 주는 미들웨어  
https://www.npmjs.com/package/morgan

morgan은 미리 정의된 포멧을 제공하고 이를 이용해서 다음과 같은 방식으로 설정

```javascript
// combined
// :remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"

// common
// :remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length]

// dev
// :method :url :status :response-time ms - :res[content-length]

// short
// :remote-addr :remote-user :method :url HTTP/:http-version :status :res[content-length] - :response-time ms

// tiny
// :method :url :status :res[content-length] - :response-time ms

morgan('dev');
```

로그 파일 출력
로그 내용을 콘솔에 출력하는 것이 아니라, 파일에 저장해두고 싶다면 아래와 같이 작성

```javascript
const fs = require('fs');
const accessLogStream = fs.createWriteStream(`${__dirname}/../log/access.log`, { flags: 'a' });

app.use(morgan('dev'), { stream: accessLogStream });
```

---
