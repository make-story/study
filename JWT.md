# JWT?  (`리액트를 다루는 기술` 책 내용 중 토큰 발급 및 검증하기, Node.js 의 Koa 프레임워크 기반 예제)
JWT는 JSON Web Token 의 약자로,  
데이터가 JSON 으로 이루어져 있는 토큰을 의미합니다.  
(두 개체가 서로 안전하게 정보를 주고받을 수 있도록 웹 표준으로 정의된 기술)  

- https://www.npmjs.com/package/jsonwebtoken  


## Access Token, Refresh Token   
https://cotak.tistory.com/102   


-----


# 세션 기반 인증과 토큰 기반 인증의 차이  
## 세션 기반 인증 시스템  
서버가 사용자가 로그인 중임을 기억하고 있다는 뜻  

![IMG_1413](https://user-images.githubusercontent.com/10363214/137582260-d9d33490-7202-40e5-b7db-99a815063121.JPG)  

세션 기반 인증 시스템에서 사용자가 로그인을 하면, 
서버는 세션 저장소에 사용자의 정보를 조회하고 세션 ID를 발급합니다.  
발급된 ID 는 주로 ㅂ라우저의 쿠키에 저장합니다.  
그 다음에 사용자가 다른 요청을 보낼 때마다 서버는 세션 저장소에서 세션을 조회한 후 로그인 여부를 결정하여 작업을 처리하고 응답을 합니다.  
세션 저장소는 주로 메모리, 디스크, 데이터베이스 등을 사용합니다.  

세션 기반 인증의 단점을 서버를 확장하기가 번거로워질 수 있다는 점입니다.  
만약 서버의 인스턴스가 여러 개가 된다면, 모든 서버끼리 같은 세션을 공유해야 하므로 세션 전용 데이터베이스를 만들어야 할 뿐 아니라 신경 써야 할 것도 많습니다.  


## 토근 기반 인증 시스템
토큰은 로그인 이후 서버가 만들어 주는 문자열 입니다.  
해당 문자열 안에는 사용자의 로그인 정보가 들어 있고, 해당 정보가 서버에서 발급되었음을 증명하는 서명이 들어 있습니다.  

서명 데이터는 해싱 알고리즘을 통해 만들어지는데, 주로 HMAC SHA256 혹은 RSA SHA 256 알고리즘이 사용됩니다.  

![IMG_5525](https://user-images.githubusercontent.com/10363214/137582265-ddc48858-b223-439b-9050-6ce0a1aa8326.JPG)  

서버에서 만들어 준 토큰은 서명이 있기 때문에 무결성이 보장됩니다.  
(무결성이란 정보가 변경되거나 위조되지 않았음을 의미)  
사용자가 로그인을 하면 서버에서 사용자에게 해당 사용자의 정보를 지니고 있는 토큰을 발급해 주고, 추후 사용자가 다른 API를 요청하게 될 때 발급받은 토큰과 함께 요청하게 됩니다.  
그러면 서버는 해당 토큰이 유효한지 검사하고, 결과에 따라 작업을 처리하고 응답합니다.  

토큰 기반 인증 시스템의 장점은 서버에서 사용자 로그인 정보를 기억하기 위해 사용하는 리소스가 적다는 것입니다.  
사용자 쪽에서 로그인 상태를 지닌 토큰을 가지고 있으므로 서버의 확장성이 매우 높습니다.  
서버의 인스턴스가 여러 개로 늘어나도 서버끼리 사용자의 로그인 상태를 공유하고 있을 필요가 없지요.  


-----


# 토큰 발급 및 검증하기  
JWT 토큰을 만들기 위해서는 jsonwebtoken 이라는 모듈을 설치해야 합니다.  
```
$ yarn add jsonwebtoken  
```

> `참고!` 단방향 해싱 함수를 지원해 주는 bcrypt 라이브러리  
```javascript
import bcrypt from 'bcrypt';

const password = '';
const hash = await bcrypt.hash(password, 10); // 해시 생성
const result = await bcrypt.compare(password, hash); // 검증 (true/false 반환)
```


## 비밀키 설정하기  
.env 파일에 추가
```shell
JWT_SECRET=jwtkeytest
```
비밀키는 나중에 JWT 토큰의 서명을 만드는 과정에서 사용됩니다.  
비밀키는 외부에 공개되면 절대 안 됩니다. (마음대로 JWT 토큰을 발행할 수 있기 때문)  

> `참고!` 비밀키 생성
```
$ openssl rand -hex 64
51cb0e18c90cdb09ab1f3dd3fcbc46673b91479748894161d162504ef6ae24c52e777ee19dc6c02ba2bf756bc081b940f67835de7dc49d7cd58232882b83f904
```


## 토큰 발급하기
```javascript
import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// ...

UserSchema.methods.generateToken = function() {
    const token = jwt.sign(
        // 첫 번째 파라미터에는 토큰 안에 집어넣고 싶은 데이터를 넣습니다.
        {
            _id: this.id,
            username: this.username,
        },
        // 두 번째 파라미터에는 JWT 암호를 넣습니다.
        process.env.JWT_SECRET, 
        // 세 번째 파라미터에는 옵션 또는 콜백 (알고리즘 등 설정가능)
        {
            expireIn: '7d', // 7일 동안 유효함
        }
    );
    return token;
};
```

사용자가 브라우저에서 토큰을 사용할 때는 주로 두 가지 방법을 사용합니다.  
첫 번째는 브라우저의 localStorage 혹은 sessionStorage 에 담아서 사용하는 방법이고,  
두 번째는 브라우저의 쿠키에 담아서 사용하는 방법 입니다.  

쿠키를 사용할 경우, httpOnly 라는 속성을 활성화하면 자바스크립트를 통해 쿠키를 조회할 수 없으므로 악성 스크립트로 부터 안전합니다.  
그 대신 CSRF(Cross Site Request Forgery) 라는 공격에 취약해 질 수 있습니다.  
이 공격은 토큰을 쿠키에 담으면 사용자가 서버로 요청을 할 떄마다 무조건 토큰이 함께 전달되는 점을 이용해서 사용자가 모르게 원하지 않는 API 요청을 하게 만듭니다.  
예를 들어 사용자가 자신도 모르는 상황에서 어떠한 글을 작성허거나 삭제하거나, 또는 탈퇴하게 만들 수도 있습니다.  

단, CSRF는 CSRF 토큰 사용 및 Referer 검증 등의 방식으로 제대로 막을 수 있는 반면, XSS는 보안장치를 적용해 놓아도 개발자가 놓칠 수 있는 다양한 취약점을 통해 공격을 받을 수 있습니다.  

```javascript
// 회원가입 예 
export const register = async ctx => {
    // ...

    ctx.body = user.serialize();

    // JWT 토큰 발급
    const token = user.generateToken();

    // 쿠키 값 설정
    ctx.cookies.set('access_token', token, {
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7일
        httpOnly: true,
    });
};

// 로그인 예 
export const login = async ctx => {
    // ...

    ctx.body = user.serialize();

    // JWT 토큰 발급
    const token = user.generateToken();

    // 쿠키 값 설정
    ctx.cookies.set('access_token', token, {
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7일
        httpOnly: true,
    });
}
```


## 토큰 검증하기 / 재발급하기  
```javascript
// 미들웨어
import jwt from 'jsonwebtoken';

const jwtMiddleware = (ctx, next) => {
    // 쿠키 값 불러오기
    const token = ctx.cookies.get('access_token');
    // 또는
    //const token = ctx.headers.authorization;

    if(!token) {
        // 토큰 없음
        return next();
    }

    try {
        // JWT 토큰 값 확인
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decoded);

        // ctx 통해 접근 가능하도록 추가
        ctx.state.user = {
            _id: decoded._id,
            username: decoded.username,
        };

        // 토큰의 남은 유효기간이 3.5일 미민이면 재발급
        const now = Math.floor(Date.now() / 1000);
        if(decoded.exp - now < 60 * 60 * 24 * 3.5) {
            const user = await User.findById(decoded._id);
            const token = user.generateToken();
            ctx.cookies.set('access_token', token, {
                maxAge: 1000 * 60 * 60 * 24 * 7, // 7일
                httpOnly: true,
            });
        }

        return next();
    }catch(e) {
        // 토큰 검증 실패
        if (e.name === 'TokenExpiredError') {
            // 토큰 만료
            // ...
        }else {
            // 유효하지 않은 토큰
            return next();
        }
    }
}

export default jwtMiddleware;
```


## 미들웨어 적용 (Koa 환경 예)
```javascript
// main.js 예  
require('dotenv').config();
import Koa from 'koa';
import Router from 'koa-router';

import jwtMiddleware from './lib/jwtMiddleware'; // JWT 미들웨어 코드 import

// ...

const app = new Koa();
const router = new Router();

app.use(jwtMiddleware);

// ...
```


## 로그아웃  
쿠키 삭제
```javascript
export const logout = async ctx => {
    ctx.cookies.set('access_token');
    ctx.status = 204;
}

```