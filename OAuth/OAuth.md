# OAuth (Open Authorization)

OAuth 1.0
https://d2.naver.com/helloworld/24942

https://hwannny.tistory.com/92

https://www.oauth.com/

OAuth 2.0(Open Authorization 2.0, OAuth2)은 인증을 위한 개방형 표준 프로토콜입니다.  
이 프로토콜에서는 Third-Party 프로그램에게 리소스 소유자를 대신하여 리소스 서버에서 제공하는 자원에 대한 접근 권한을 위임하는 방식을 제공합니다.

## 흐름 요약 - Authorization Code Grant, 권한 부여 승인 코드 방식

https://stackoverflow.blog/2022/04/14/the-authorization-code-grant-in-excruciating-detail/

payco 참고!  
https://developers.payco.com/guide/development/apply/web

kakao 참고!  
https://developers.kakao.com/docs/latest/ko/kakaologin/rest-api

furo 참고!  
https://iam.furo.one/post/concept-oauth

1. 서비스 서버는 인증 요청

파라미터

- client_id=(발급받은 CLIENT ID)
- redirect_uri=(URL 인코딩 필요)
- response_type=('code' 값 고정)

2. 인증서버측 로그인 화면 페이지, 사용자는 로그인 진행 - 인증 요청
3. 로그인 후 서비스 서버는 인가코드를 전달받고, access token 요청 진행- 인가 요청

파라미터

- client_id=(발급받은 CLIENT ID)
- client_secret=(발급받은 CLIENT Secret, 토큰 발급 시 보안을 강화하기 위해 추가 확인하는 코드)
- redirect_uri=(URL 인코딩 필요)
- grant_type=('authorization_code' 값 고정)

5. access token 전달받고, 서비스 서버는 보호된 자원(사용자 정보) 요청 진행
6. 사용자 정보 전달 받고, 서비스 서버는 로그인 완료!

## OAuth 2.0 주요 용어

https://blog.naver.com/mds_datasecurity/222182943542

### Authentication

`인증`, 접근 자격이 있는지 검증하는 단계를 말합니다. (로그인, 식별 관점)

### Authorization

`인가`, 자원에 접근할 권한을 부여하는 것입니다. (권한, 접근 관점)  
인가가 완료되면 리소스 접근 권한이 담긴 Access Token 이 클라이언트에게 부여됩니다.  
(카카오의 경우 액세스 토큰과 리프레시 토큰 제공됨 - 23.05 기준)

### Access Token

리소스 서버에게서 리소스 소유자의 보호된 자원을 획득할 때 사용되는 만료 기간이 있는 Token입니다.

### Refresh Token

Access Token 만료시 이를 갱신하기 위한 용도로 사용하는 Token입니다.  
Refresh Token 은 일반적으로 Access Token 보다 만료 기간이 깁니다.  
(데이터베이스에 레프레시 토큰에 해당하는 액세스 토큰 정보를 담아두고, 리프레시 토큰 기반 액세스 토큰 갱신)

## Roles - OAuth 2.0의 4가지 역할

https://iam.furo.one/post/concept-oauth

### Resource Owner(or User)

리소스 소유자 또는 사용자.  
보호된 자원에 접근할 수 있는 자격을 부여해 주는 주체.  
OAuth2 프로토콜 흐름에서 클라이언트를 인증(Authorize)하는 역할을 수행합니다.  
인증이 완료되면 권한 획득 자격(Authorization Grant)을 클라이언트에게 부여합니다.  
개념적으로는 리소스 소유자가 자격을 부여하는 것이지만 일반적으로 권한 서버가 리소스 소유자와 클라이언트 사이에서 중개 역할을 수행하게 됩니다.

### Client(or Consumer)

보호된 자원을 사용하려고 접근 요청을 하는 애플리케이션입니다.

### Resource Server(or Provider)

사용자의 보호된 자원을 호스팅하는 서버입니다.

### Authorization Server(or Provider)

권한 서버. 인증/인가를 수행하는 서버로 클라이언트의 접근 자격을 확인하고 Access Token을 발급하여 권한을 부여하는 역할을 수행합니다.

## OAuth2 프로토콜에서는 다양한 클라이언트 환경에 적합하도록 권한 부여 방식에 따른 프로토콜을 4가지 종류로 구분하여 제공하고 있습니다.

1. Authorization Code Grant│ 권한 부여 승인 코드 방식
2. Implicit Grant │ 암묵적 승인 방식
3. Resource Owner Password Credentials Grant │ 자원 소유자 자격증명 승인 방식
4. Client Credentials Grant │클라이언트 자격증명 승인 방식

---

# Request and Response Examples

https://blog.naver.com/mds_datasecurity/222182943542

## client_id, client_secret

클라이언트 자격증명.  
클라이언트가 권한 서버에 등록하면 발급받을 수 있으며 권한 서버 연동 시 클라이언트의 검증에 사용됩니다.

## redirect_url

권한 서버가 요청에 대한 응답을 보낼 url을 설정합니다.

## response_type

권한 부여 동의 요청 시 포함되는 값으로 권한 부여 방식에 대한 설정입니다.  
아래 값 중 한 개를 사용합니다.

- code: Authorization Code Grant
- token: Implicit Grant

## state

CSRF 공격에 대비하기 위해 클라이언트가 권한서버에 요청 시 포함하는 임의의 문자열.  
필수 사항은 아니지만 클라이언트가 요청 시 state를 포함 시켰다면 권한 서버는 동일한 값을 클라이언트에게 보내야 합니다.

## grant_type

Access Token 획득 요청 시 포함되는 값으로 권한 부여 방식에 대한 설정입니다. 아래 값 중 한 개를 사용합니다.

- authorization_code: Authorization Code Grant
- password: Resource Owner Password Credentials Grant
- client_credentials: Client Credentials Grant

## code

Authorization Code Grant 방식에서 Access Token요청 시 사용됩니다.  
권한 서버에서 획득한 Authorization Code를 입력합니다.

## token_type

발행된 Token의 타입.  
대표적으로 Bearer, MAC(Message Authentication Code)가 있습니다.

## expires_in

토큰 만료 시간(단위: 초)

## example_parameter

Token 타입에 따른 추가 파라미터

> 추가로 API 요청에 포함되는 Authorization Basic 헤더는 Client 자격증명 관련 데이터로 client_id와 client_secret값을 아래와 같이 Base64 인코딩하여 생성합니다.

```
base64(client_id:client_secret)
```

---

## 프로토콜을 4가지 종류로 구분하여 제공 - 발급

`https://iam.furo.one/post/concept-oauth`

OAuth에서 가장 중요한 개념은 바로 액세스 토큰입니다.  
클라이언트는 액세스 토큰을 통해 사용자의 리소스에 접근할 수 있습니다.  
클라이언트가 액세스 토큰을 얻을 때 사용되는 자격 증명 방식으로는 아래 4가지가 있습니다.

- Authorization Code
  검증 서버가 클라이언트와 리소스 서버 간의 중재 역할을 하는 방식으로, 액세스 토큰을 바로 클라이언트로 전달하지 않아서 이점이 있습니다.
- Implicit
  액세스 토큰을 클라이언트에 바로 반환하는 방식입니다. 보안상의 우려가 있지만 브라우저나 모바일 애플리케이션에주로 사용되는 SPA(Single Page App) 클라이언트를 대상으로 사용할 수 있습니다. (서버사이드 갱신보다 클라이언트 사이드 갱신)
- Client Credentials
  클라이언트와 애플리케이션이 SPA 가 아닌 웹앱 및 네이티브인 경우, 클라이언트의 id 와 secret 을 가지고 인증하는 방식입니다.
- Resource Owner Credentials
  사용자의 아이디, 패스워드를 클라이언트에 저장해 놓고, 아이디 패스워드를 기반으로 직접 액세스 토큰을 받아오는 방식입니다. 클라이언트를 신뢰하지 않는 경우에는 권장하지 않는 방식입니다.

https://blog.naver.com/mds_datasecurity/222182943542

OAuth2 프로토콜에서는 다양한 클라이언트 환경에 적합하도록 권한 부여 방식에 따른 프로토콜을 4가지 종류로
구분하여 제공하고 있습니다.

### 1. Authorization Code Grant, 권한 부여 승인 코드 방식

`권한 부여 승인을 위해 자체 생성한 Authorization Code를 전달하는 방식으로 많이 쓰이고 기본이 되는 방식`

간편 로그인 기능에서 사용되는 방식으로  
클라이언트가 사용자를 대신하여 특정 자원에 접근을 요청할 때 사용되는 방식입니다.  
보통 타사의 클라이언트에게 보호된 자원을 제공하기 위한 인증에 사용됩니다.  
Refresh Token의 사용이 가능한 방식입니다.

`권한 부여 승인 요청 시 response_type 을 code 로 지정하여 요청합니다.`  
이후 클라이언트는 권한 서버에서 제공하는 로그인 페이지를 브라우저를 띄워 출력합니다.

이 페이지를 통해 사용자가 로그인을 하면  
`권한 서버는 권한 부여 승인 코드 요청 시 전달받은 redirect_url 로 Authorization Code 를 전달합니다.`  
Authorization Code 는 권한 서버에서 제공하는 API 를 통해 Access Token 으로 교환됩니다.

### 2. Implicit Grant, 암묵적 승인 방식

자격증명을 안전하게 저장하기 힘든 클라이언트(ex: JavaScript등의 스크립트 언어를 사용한 브라우저)에게 최적화된 방식입니다.

암시적 승인 방식에서는 권한 부여 승인 코드 없이 바로 Access Token이 발급 됩니다. Access Token이 바로 전달되므로 만료기간을 짧게 설정하여 누출의 위험을 줄일 필요가 있습니다.

Refresh Token 사용이 불가능한 방식이며, 이 방식에서 권한 서버는 client_secret를 사용해 클라이언트를 인증하지 않습니다. Access Token을 획득하기 위한 절차가 간소화되기에 응답성과 효율성은 높아지지만 Access Token이 URL로 전달된다는 단점이 있습니다.

권한 부여 승인 요청 시 response_type을 token으로 설정하여 요청합니다. 이후 클라이언트는 권한 서버에서 제공하는 로그인 페이지를 브라우저를 띄워 출력하게 되며 로그인이 완료되면 권한 서버는 Authorization Code가 아닌 Access Token를 redirect_url로 바로 전달합니다.

### 3. Resource Owner Password Credentials Grant, 자원 소유자 자격증명 승인 방식

간단하게 username, password로 Access Token을 받는 방식입니다.

클라이언트가 타사의 외부 프로그램일 경우에는 이 방식을 적용하면 안됩니다. 자신의 서비스에서 제공하는 어플리케이션일 경우에만 사용되는 인증 방식입니다. Refresh Token의 사용도 가능합니다.

제공하는 API를 통해 username, password을 전달하여 Access Token을 받는 것입니다. 중요한 점은 이 방식은 권한 서버, 리소스 서버, 클라이언트가 모두 같은 시스템에 속해 있을 때 사용되어야 하는 방식이라는 점입니다.

### 4. Client Credentials Grant, 클라이언트 자격증명 승인 방식

클라이언트의 자격증명만으로 Access Token을 획득하는 방식입니다.

OAuth2의 권한 부여 방식 중 가장 간단한 방식으로 클라이언트 자신이 관리하는 리소스 혹은 권한 서버에 해당 클라이언트를 위한 제한된 리소스 접근 권한이 설정되어 있는 경우 사용됩니다.

이 방식은 자격증명을 안전하게 보관할 수 있는 클라이언트에서만 사용되어야 하며, Refresh Token은 사용할 수 없습니다.

## 갱신

액세스 토큰은 갱신 주기가 짧기 때문에, 만료 시마다 다시 자격 증명을 통해 서버에 토큰을 요청해야 합니다.  
이를 통해 발생하는 불편을 경감시키기 위해, 서버에서는 리프레시 토큰을 추가로 발급하여, 리프레시 토큰이 유효한 경우 액세스 토큰을 재발급해 줍니다.

## OAuth 의 문제와 한계

OAuth 인터페이스에는 유저 정보에 대한 표준이 없어, 각 서비스 제공자마다 유저데이터를 다른 방식으로 넘겨주기 때문에 클라이언트가 각각의 인터페이스에 개별적으로 대응해야 한다는 불편이 있습니다.

---

# JWT 와 OAuth 2.0의 명확한 차이는 뭘까?

https://cloud.google.com/apigee/docs/api-platform/security/oauth/using-jwt-oauth?hl=ko

- JWT
  JWT는 토큰의 종류
- OAuth
  OAuth 는 토큰을 발급하고 인증하는 오픈 스탠다드 프로토콜 (개방형 인증 프로토콜)

JWT 와 OAuth 2.0 둘 다 인증 관점에서 비교하여 생각할 수 있겠지만 `서로가 추구하는 목적이 다르다.`

OAuth 2.0는  
하나의 플랫폼의 권한(아무 의미없는 무작위 문자열 토큰)으로 `다양한 플랫폼에서 권한을 행사할 수 있게 해줌으로써 리소스 접근이 가능하게 하는데 목적`을 두고있다.

JWT는  
Cookie, Session 을 대신하여 의미있는 문자열 토큰으로써 권한을 행사할 수 있는 `토큰의 한 형식`이다.  
(로그인 세션이나 주고받는 값이 유효한지 검증할 때 주로 쓰인다.)

OAuth 2.0 에서 의미없는 정보를 가지는 토큰이 의미있는 정보를 가져야한다면 두 기술을 혼합하여 access token 을 JWT 형식으로 구현할 수도 있다.
