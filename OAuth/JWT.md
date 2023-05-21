# JWT? (`리액트를 다루는 기술` 책 내용 중 토큰 발급 및 검증하기, Node.js 의 Koa 프레임워크 기반 예제)

JWT는 JSON Web Token 의 약자로,  
데이터가 JSON 으로 이루어져 있는 `토큰`을 의미합니다.  
(두 개체가 서로 안전하게 정보를 주고받을 수 있도록 웹 표준으로 정의된 기술)

- https://www.npmjs.com/package/jsonwebtoken
- https://covenant.tistory.com/201

---

`Oauth(인증을 위한 프로토콜) !== JWT(단순 토큰 포맷)`

# https://twitter.com/dylayed/status/1488163176399052802

## JWT가 뭐야?

JWT는 두 개체가 정보 조각들("claims")을 안전하게 통신하기 위해 만들어진 개방형 표준 (https://datatracker.ietf.org/doc/html/rfc7519) 이야.
JWT에는 3가지 정보가 담겨있어

1. 머리말 (이 토큰을 인증하는 방법)
2. 정보 조각 (JSON으로 쓴다!)
3. 인증 (이 토큰이 날조되지 않았다는 증거)

## JWT는 어떻게 쓰여지고 있어?

무상태 세션을 구현할 때 많이 쓰여. 일반적인 세션 구현은 DB에 상태 저장이 필요하지만, JWT는 토큰에 모든 정보를 담아, DB 조회가 필요가 없지!

## 보안 전문가들이 JWT를 쓰지 말라고 하던데?

JWT 표준은 보안 표준으론 질 떨어진다는 의견이야.  
몇 가지 이유를 보면:

1. JWT 머리말에 토큰 인증 방법 중 하나가 none"인데, 인증하지 않는 방법이 인증 방법이라는 게 어처구니없지. 실제 이를 악용한 공격도 있어.
2. 인증 방법을 머리말에 명시하게 됨으로 해커들에게 너무나 쉬운 취약점을 내주고 있어. 실제로 널리 쓰이는 JWT 라이브러리는 벌써 몇 번이나 취약점 패치를 해야 했지. (https://auth0.com/blog/critical-vulnerabilities-in-json-web-token-libraries/)
3. 인증된 토큰을 쉽게 차단할 방법이 없어. 토큰이 탈취된 걸 알아도, 인증이 만료가 될 때까지 기다리거나, DB에 차단된 토큰 리스트를 저장해야 하는데... 후자를 채택하면 결국 "무상태 세션"이 아니게 되니 JWT의 메리트가 떨어지지.  
   결론: JWT는 날카로운 칼 같아서 쉽게 베이는데, 사용자 인증처럼 중요한 과정에 쓰이는게 불편하다!

대부분 전문가들은 사용자 세션은 framework에 내장된 상태 세션 라이브러리를 사용하는걸 권장해.  
상태 세션으로 인해 DB 부하가 걱정될 정도로 커져서 무상태 세션이 매력적으로 보인다면, 보안 전문가와 함께 무상태 세션 구현에 도전하도록 하고.

## 그럼 JWT는 절대 쓰면 안돼?

그건 아냐! 소셜 로그인의 기반이 되는 OpenID Connect 규격은 ("Google 계정으로 로그인" 그거) JWT로 계정 정보를 통신하도록 명시돼있어.  
언어/프레임워크에 귀속되지 않은 개방형 표준이 별로 없긴해. 그중 JWT가 그나마 제일 지원이 잘 되는 편이지.

## JWT 대체자는 있어?

Paseto (https://paseto.io)  
Macaroon (https://research.google/pubs/pub41892/)  
Biscuit (https://biscuitsec.org)  
여러 시도가 있는데, 아까 말했다시피 JWT처럼 지원이 빵빵하진 않아.

## 더 자세히 알아보고 싶다면:

http://cryto.net/~joepie91/blog/2016/06/13/stop-using-jwt-for-sessions/  
https://securitycryptographywhatever.buzzsprout.com/1822302/9020991-what-do-we-do-about-jwt-feat-jonathan-rudenberg

# https://twitter.com/golbin/status/1561607005491499008

JWT 는 “인증” 정보가 아니라 “인증된 정보” 를 교환하는 기술.
사용처를 찾다보니 로그인에 사용하게 되었는데, 긴 세션의 처리에는 보안문제가 존재함.  
따라서 JWT 는 독립 서비스간 인증 정보를 전달하는데 사용하는데 적합하며 그래서 OpenID 로그인에 사용됨.

---

## Next.js JWT

https://thewidlarzgroup.com/nextjs-auth/

# 토근 기반 인증에서 bearer는 무엇일까?

https://velog.io/@cada/%ED%86%A0%EA%B7%BC-%EA%B8%B0%EB%B0%98-%EC%9D%B8%EC%A6%9D%EC%97%90%EC%84%9C-bearer%EB%8A%94-%EB%AC%B4%EC%97%87%EC%9D%BC%EA%B9%8C

일반적으로 토큰은 요청 헤더의 Authorization 필드에 담아져 보내집니다.  
`Authorization: <type> <credentials>`

우리가 궁금해하던 bearer는 위 형식에서 type에 해당합니다.  
토큰에는 많은 종류가 있고 서버는 다양한 종류의 토큰을 처리하기 위해 전송받은 type에 따라 토큰을 다르게 처리합니다.

`bearer는 JWT와 OAuth를 타나내는 인증 타입 - 토큰 포맷의 일종`

## 인증 타입

- Basic  
  사용자 아이디와 암호를 Base64로 인코딩한 값을 토큰으로 사용한다. (RFC 7617)

- Bearer  
  JWT 혹은 OAuth에 대한 토큰을 사용한다. (RFC 6750)

- Digest  
  서버에서 난수 데이터 문자열을 클라이언트에 보낸다. 클라이언트는 사용자 정보와 nonce를 포함하는 해시값을 사용하여 응답한다 (RFC 7616)

- HOBA  
  전자 서명 기반 인증 (RFC 7486)

- Mutual  
  암호를 이용한 클라이언트-서버 상호 인증 (draft-ietf-httpauth-mutual)

- AWS4-HMAC-SHA256  
  AWS 전자 서명 기반 인증

---

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

---

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

UserSchema.methods.generateToken = function () {
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
    },
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
};
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
                maxAge: (((1000 * 60) * 60) * 24) * 7, // 7일
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
};
```

---

# Access Token, Refresh Token

https://cotak.tistory.com/102  
https://tuigun.tistory.com/85

## `GraphQL 과 타입스크립트로 개발하는 웹 서비스` 책 내용 중 - p219

로그인 유지  
JWT를 사용해 로그인 기능을 제공하는 웹 서비스에서는 일반적으로 액세스 토큰 하나만을 사용하지는 않습니다.  
따라서 리프레시 토큰이라는 또 다른 토큰을 함께 발급하여 엑세스 토큰만 사용했을 때의 단점을 보완 합니다.

JWT 토큰은 서버와 독립적인 인증 매체입니다.  
한번 발급한 JWT 토큰은 서버에서 무효화하지 못하며, 발급한 JWT 토큰(액세스 토큰)이 포함된 요청은 언제나 올바른 요청으로 간주합니다.  
이런 특성 때문에 발급된 엑세스 토큰이 탈취되면 문제가 곤란해집니다.  
탈취된 토큰을 포함하기만 하면 해커로 부터의 요청에도 정상적인 응답을 보내게 되기 때문입니다.  
탈취의 위험으로 인해 엑세스 토큰은 짧은 유효 기간을 가지도록 설정합니다.  
하지만 유효 기간이 짧을수록 유저가 재로그인을 해야 하는 빈도도 짧아지므로 유저가 불편함을 느끼게됩니다.

리프레시 토큰을 사용하여  
짧은 유효 기간을 가지는 엑세스 토큰을 사용하면서도 재로그인을 할 필요가 없도록 만들 수 있습니다.  
`리프레시 토큰은 액세스 토큰을 재발급하기 위해서만 사용되는 토큰입니다.`  
리프레시 토큰이 포함된 토큰 재발급 요청이 오면 서버는 리프레시 토큰이 올바른 유저로부터 발급된 것인지 확인한 뒤,  
새로운 액세스 토큰을 발급해 줍니다.  
이 과정을 액세스 토큰이 만료될 때마다 실행되도록 구성하여, 자동으로 재로그인이 되도록 구현할 수 있습니다.

리프레시 토큰은 액세스 토큰에 비해 상대적으로 활용되는 빈도가 낮습니다.  
액세스 토큰은 언제나 GraphQL 요청이 있을 때마다 확인되지만, 리프레시 토큰은 토큰 재발급 요청이 왔을 때만 조회합니다.  
하지만 리프레시 토큰이 가지는 보안적 중요도는 낮지 않습니다.  
리프레시 토큰이 탈취되면 언제나 액세스 토큰을 재발급 받을 수 있기 때문입니다.  
리프레시 토큰이 탈취되는 상황은 절대적으로 피해야 합니다.  
`상대적으로 활용 빈도가 낮고, 보안 중요도는 높아 많은 서비스에서는 서버 측에서 리프레시 토큰을 관리할 수 있도록 전용 저장소를 마련하기도 합니다.`

### 리프레시 토큰 발급

리프레시 토큰은 로그인 시 액세스 토큰과 함꼐 발급됩니다.  
액세스 토큰과 별개로 리프레시 토큰은 React 코드내에서 접근하는 일은 없으므, httpOnly 쿠키로 저장할 수 있습니다.

---

## 리프레시 토큰이 필요한가?

https://velog.io/@park2348190/JWT%EC%97%90%EC%84%9C-Refresh-Token%EC%9D%80-%EC%99%9C-%ED%95%84%EC%9A%94%ED%95%9C%EA%B0%80

리프레시 토큰은, JWT로그인 방식에 사용되는 JWT의 보안상의 단점을 보완하기 위해 구현한다. (JWT 를 사용함에 있어, 리프세시 토큰을 필수로 꼭 사용해야 한다는 의미가 아님)
(JWT는 Stateless한 방식이기 때문에 서버측에서는 이 토큰을 갖고 있는 클라이언트가 정말 클라이언트 본인이 맞는지 확인할 수 없다는 문제점이 있다.)

리프레쉬 토큰은 사용자 인증이 아닌 새로운 액세스 토큰을 생성하는 용도로만 사용된다.  
그러면 왜 굳이 별도의 토큰을 두고 새로운 액세스 토큰을 발급받도록 한 것일까?  
이는 위의 JWT 유출 문제를 다음처럼 해결하기 위한 것이다.

리프레시 토큰이 사용되는 방식은,

1. 액세스 토큰과 리프레시 토큰의 발급
2. 액세스 토큰에 짧은 만료 주기 설정 (30분~ 등의 짧은 시간)
3. 리프레시 토큰으로 액세스 토큰을 재발급
4. 기존의 액세스 토큰은 폐기

JWT토큰의 탈취는 보통 클라이언트측에서 이루어지는것이 아니라고한다.  
클라이언트의 PC가 해킹되었다면 서버에서 더이상 할 수 있는 일은 없으며,
보통은 공유기 등의 네트워크쪽에서 탈취되기 때문에 리프레시토큰이 의미 있음

## Refresh Token의 탈취

https://velog.io/@park2348190/JWT%EC%97%90%EC%84%9C-Refresh-Token%EC%9D%80-%EC%99%9C-%ED%95%84%EC%9A%94%ED%95%9C%EA%B0%80

그런데 이 Refresh Token 자체가 탈취당한다면 어떻게 할까?  
공격자는 이 토큰의 유효 기간만큼 다시 Access Token을 생성해서 다시 정상적인 사용자인 척 위장할 수 있다.  
그렇기 때문에 여기서는 서버측의 검증 로직이 필요  
https://stackoverflow.com/questions/32060478/is-a-refresh-token-really-necessary-when-using-jwt-token-authentication

- 데이터베이스에 각 사용자에 1대1로 맵핑되는 Access Token, Refresh Token 쌍을 저장한다.
- 정상적인 사용자는 기존의 Access Token으로 접근하며 서버측에서는 데이터베이스에 저장된 Access Token과 비교하여 검증한다.
- 공격자는 탈취한 Refresh Token으로 새로 Access Token을 생성한다. 그리고 서버측에 전송하면 서버는 데이터베이스에 저장된 Access Token과 공격자에게 받은 Access Token이 다른 것을 확인한다.
- 만약 데이터베이스에 저장된 토큰이 아직 만료되지 않은 경우, 즉 굳이 Access Token을 새로 생성할 이유가 없는 경우 서버는 Refresh Token이 탈취당했다고 가정하고 두 토큰을 모두 만료시킨다.
- 이 경우 정상적인 사용자는 자신의 토큰도 만료됐으니 다시 로그인해야 한다. 하지만 공격자의 토큰 역시 만료됐기 때문에 공격자는 정상적인 사용자의 리소스에 접근할 수 없다.

중요한 것은 발급된 토큰 자체는 그냥 그 JWT 문자열 자체로 존재하는 것이기 때문에 클라이언트나 서버측에서 전역적으로 만료시킬 수 있는 개체가 아니다.  
그렇기 때문에 토큰의 유효 기간이 지나기 전까지는 만료된 토큰을 NoSQL 같은 데이터베이스에 저장하여 관리할 필요가 있다.

---

## OAuth Refresh Token 참고

Refresh Token
Refresh Token의 발급 여부와 방법 및 갱신 주기 등은 OAuth를 제공하는 Resource Server마다 상이합니다.

Access Token은 만료 기간이 있으며, 만료된 Access Token으로 API를 요청하면 401 에러가 발생합니다.  
Access Token이 만료되어 재발급받을 때마다 서비스 이용자가 재 로그인하는 것은 다소 번거롭습니다.

보통 Resource Server는 Access Token을 발급할 때 Refresh Token을 함께 발급합니다.  
Client는 두 Token을 모두 저장해두고, Resource Server의 API를 호출할 때는 Access Token을 사용합니다.  
Access Token이 만료되어 401 에러가 발생하면, Client는 보관 중이던 Refresh Token을 보내 새로운 Access Token을 발급받게 됩니다.
