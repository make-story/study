# 문서
https://expressjs.com/ko/4x/api.html   

# 프록시 설정
```javascript
const proxy = require('express-http-proxy');

// 프록시 동작시킬 URL 경로
const proxyList = [
    '/api/*',
    '/test/address',
];

// 실제 요청할 URL
const host = 'http://localhost:8080'; 

// 예를 들어, 로컬호스트(http://localhost/api/*)에서 요청할 경우, 프록시가 동작하여 실제 요청서버(http://localhost:8080)로 요청
server.all(proxyList, proxy(host));
```

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
const accessLogStream = fs.createWriteStream(
    `${__dirname}/../log/access.log`,
    { flags: 'a' }
);

app.use(morgan('dev'), { stream : accessLogStream });
```