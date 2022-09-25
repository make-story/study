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

# 보안
## helmet
잘 알려진 몇몇 보안 대응 관련 미들웨어  
https://www.npmjs.com/package/helmet
```javascript
const express = require("express");
const helmet = require("helmet");

const app = express();

app.use(helmet());

// ...
```

csp: Content-Security-Policy 헤더 설정. XSS(Cross-site scripting) 공격 및 기타 교차 사이트 인젝션 예방.   
https://github.com/helmetjs/csp  

hidePoweredBy: X-Powered-By 헤더 제거.  
https://github.com/helmetjs/hide-powered-by  

hpkp: Public Key Pinning 헤더 추가. 위조된 인증서를 이용한 중간자 공격 방지.  
https://developer.mozilla.org/en-US/docs/Web/Security/Public_Key_Pinning  

hsts: SSL/TLS를 통한 HTTP 연결을 적용하는 Strict-Transport-Security 헤더 설정.  
https://github.com/helmetjs/hsts  

noCache : Cache-Control 및 Pragma 헤더를 설정하여 클라이언트 측에서 캐싱을 사용하지 않도록 함.    
https://github.com/helmetjs/nocache   

frameguard : X-Frame-Options 헤더 설정하여 clickjacking에 대한 보호 제공.  
https://github.com/helmetjs/frameguard  

ieNoOpen : (IE8 이상) X-Download-Options 설정.  
https://github.com/helmetjs/ienoopen  

xssFilter :  X-XSS-Protection 설정. 대부분의 최신 웹 브라우저에서 XSS(Cross-site scripting) 필터를 사용.  
https://github.com/helmetjs/x-xss-protection    

noSniff : X-Content-Type-Options 설정하여, 선언된 콘텐츠 유형으로부터 벗어난 응답에 대한 브라우저의 MIME 가로채기를 방지.  
https://github.com/helmetjs/dont-sniff-mimetype  


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