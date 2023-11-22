# 문서

https://expressjs.com/ko/4x/api.html

# Express

## express 미들웨어

미들웨어는 app.use 와 함께 사용됩니다. app.use(미들웨어)  
app.use 에 매개변수가 request, response, next 인 함수를 넣으면 됩니다.  
미들웨어는 위에서부터 아래로 순서대로 실행되면서 요청과 응답 사이에 특별한 기능을 추가할 수 있습니다.  
next 라는 세변째 매개변수는, 다음 미들웨어로 넘어가는 함수입니다. next 를 실행하지 않으면 다음 미들웨어가 실행되지 않습니다.  
첫 번째 매체변수(인수)로 주소를 넣어주지 않는다면, 미들웨어는 모든 요청에서 실행되고, 주소를 넣는다면 해당하는 요청에서만 실행된다고 보면 됩니다.

```
app.use(미들웨어)
app.use('/abc', 미들웨어)
app.use('/abc', 미들웨어, 미들웨어, 미들웨어...)
app.post('/abc/', 미들웨어)
```

## express use / get 차이

'/' 를 "마운트"경로로 지정하면 app.use() 는 '/' 로 시작하는 모든 경로에 응답합니다.

app.use('/', ...); 경우

GET /
PUT /foo
POST /foo/bar

위 경로 모두 응답 합니다.

반면 app.get() 는 HTTP GET 요청 될 때, 특정 경로를 일치시키고 처리하기위한 것 입니다.

## express next

next 함수에 인수를 넣을 수 있습니다. 단, 인수를 넣는다면 특수한 동작을 합니다.  
route 라는 문자열을 넣으면 다음 라우터의 미들웨어로 바로 이동하고,  
그 외의 인수를 넣는다면 바로 에러 처리 미들웨어로 이동합니다. 이때의 인수는 에러 처리 미들웨어의 err 매개변수가 됩니다. 라우터에서 에러가 발생할 때 에러를 next(err)을 통해 에러 처리 미들웨어로 넘깁니다.  
next(err)  
(err, req, res, next) => {}

## 미들웨어 간에 데이터를 전달하는 방법도 있습니다.

세션을 사용한다면 req.session 객체에 데이터를 넣어도 되지만, 세션이 유지되는 동안에 데이터도 계속 유지된다는 단점이 있습니다.  
만약 요청이 끝날 때까지만 데이터를 유지하고 싶다면 req 객체에 데이터를 넣어두면 됩니다.

```javascript
app.use(
  (request, response, next) => {
    request.data = "데이터 넣기"; // 새로운 요청이 오면 request.data 는 초기화됩니다.
    next();
  },
  (request, response, next) => {
    console.log(request.data);
    next();
  }
);
app.use((request, response, next) => {
  console.log(request.data);
  next();
});
```

---

# app.listen 과 server.listen의 차이점

https://velog.io/@yogjin/express-app.listen-%EA%B3%BC-server.listen%EC%9D%98-%EC%B0%A8%EC%9D%B4%EC%A0%90

https://stackoverflow.com/questions/17696801/express-js-app-listen-vs-server-listen

```javascript
const express = require("express");
const app = express();
// ...
app.listen(8080);
```

```javascript
const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);

server.listen(8080);
```

app.listen() 내부에서 http 모듈로 감싸서 return 해주고 있음

Doit Nodejs 프로그래밍 책에서는 반드시 http 모듈을 감싸주어야 한다고 되어있음

---

# 프록시 설정

```javascript
const proxy = require("express-http-proxy");

// 프록시 동작시킬 URL 경로
const proxyList = ["/api/*", "/test/address"];

// 실제 요청할 URL
const host = "http://localhost:8080";

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

morgan("dev");
```

로그 파일 출력
로그 내용을 콘솔에 출력하는 것이 아니라, 파일에 저장해두고 싶다면 아래와 같이 작성

```javascript
const fs = require("fs");
const accessLogStream = fs.createWriteStream(`${__dirname}/../log/access.log`, {
  flags: "a",
});

app.use(morgan("dev"), { stream: accessLogStream });
```

---
