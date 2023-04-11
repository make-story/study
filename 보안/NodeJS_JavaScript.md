# 보안

http://makestory.net/media/#/view/877

## AWS

### WAF

애플리케이션 방화벽  
Dos, SQL Injection 과 같은 웹 보안 공격을 예방

---

## NodeJS

### helmet

잘 알려진 몇몇 보안 대응 관련 미들웨어  
https://www.npmjs.com/package/helmet

```javascript
const express = require('express');
const helmet = require('helmet');

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

xssFilter : X-XSS-Protection 설정. 대부분의 최신 웹 브라우저에서 XSS(Cross-site scripting) 필터를 사용.  
https://github.com/helmetjs/x-xss-protection

noSniff : X-Content-Type-Options 설정하여, 선언된 콘텐츠 유형으로부터 벗어난 응답에 대한 브라우저의 MIME 가로채기를 방지.  
https://github.com/helmetjs/dont-sniff-mimetype

# 자바스크립트에서 안전하게 난수 생성하는 방법

Math.random() 의 보안 취약점  
MDN의 문서에 따르면 Math.random()는 암호학적으로 안전한 난수를 생성해주지 않는다. 따라서 프로그램의 보안과 관련된 로직에서는 Math.random()을 사용하지 않는 것이 좋다.

Web Crypto API는 window.crypto를 통해 엑세스할 수 있는 다양한 암호화 관련 메소드와 함수를 제공한다.  
브라우저에서는, crypto.getRandomValues(Int32Array)를 사용하여 암호학적인 난수를 생성할 수 있다.

Nodejs에서는 표준 web crypto api가 제공된다.  
require('crypto').randomBytes(size)를 사용하면, node에 있는 native 암호화 모듈을 사용하여 난수를 생성할 수 있다.
