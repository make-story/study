# OAuth

> https://hwannny.tistory.com/92  
> https://blog.naver.com/mds_datasecurity/222182943542

OAuth 2.0(Open Authorization 2.0, OAuth2)은 인증을 위한 개방형 표준 프로토콜입니다.  
이 프로토콜에서는 Third-Party 프로그램에게 리소스 소유자를 대신하여 리소스 서버에서 제공하는 자원에 대한 접근 권한을 위임하는 방식을 제공합니다.

## OAuth 2.0 주요 용어

### Authentication

인증, 접근 자격이 있는지 검증하는 단계를 말합니다.

### Authorization

인가, 자원에 접근할 권한을 부여하는 것입니다. 인가가 완료되면 리소스 접근 권한이 담긴 Access Token이 클라이언트에게 부여됩니다.

### Access Token

리소스 서버에게서 리소스 소유자의 보호된 자원을 획득할 때 사용되는 만료 기간이 있는 Token입니다.

### Refresh Token

Access Token 만료시 이를 갱신하기 위한 용도로 사용하는 Token입니다. Refresh Token은 일반적으로 Access Token보다 만료 기간이 깁니다.

## Roles - OAuth 2.0의 4가지 역할

### Resource Owner

리소스 소유자 또는 사용자.  
보호된 자원에 접근할 수 있는 자격을 부여해 주는 주체.  
OAuth2 프로토콜 흐름에서 클라이언트를 인증(Authorize)하는 역할을 수행합니다.  
인증이 완료되면 권한 획득 자격(Authorization Grant)을 클라이언트에게 부여합니다.  
개념적으로는 리소스 소유자가 자격을 부여하는 것이지만 일반적으로 권한 서버가 리소스 소유자와 클라이언트 사이에서 중개 역할을 수행하게 됩니다.

### Client

보호된 자원을 사용하려고 접근 요청을 하는 애플리케이션입니다.

### Resource Server

사용자의 보호된 자원을 호스팅하는 서버입니다.

### Authorization Server

권한 서버. 인증/인가를 수행하는 서버로 클라이언트의 접근 자격을 확인하고 Access Token을 발급하여 권한을 부여하는 역할을 수행합니다.

## OAuth2 프로토콜에서는 다양한 클라이언트 환경에 적합하도록 권한 부여 방식에 따른 프로토콜을 4가지 종류로 구분하여 제공하고 있습니다.

1. Authorization Code Grant│ 권한 부여 승인 코드 방식
2. Implicit Grant │ 암묵적 승인 방식
3. Resource Owner Password Credentials Grant │ 자원 소유자 자격증명 승인 방식
4. Client Credentials Grant │클라이언트 자격증명 승인 방식

---

# Request and Response Examples

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

# JWT와 OAuth 2.0의 명확한 차이는 뭘까?

JWT와 OAuth 2.0 둘 다 인증 관점에서 비교하여 생각할 수 있겠지만 서로가 추구하는 목적이 다르다.

OAuth 2.0는 하나의 플랫폼의 권한(아무 의미없는 무작위 문자열 토큰)으로 다양한 플랫폼에서 권한을 행사할 수 있게 해줌으로써 리소스 접근이 가능하게 하는데 목적을 두고있다.  
JWT는 Cookie, Session을 대신하여 의미있는 문자열 토큰으로써 권한을 행사할 수 있는 토큰의 한 형식이다. (로그인 세션이나 주고받는 값이 유효한지 검증할 때 주로 쓰인다.)

OAuth 2.0 에서 의미없는 정보를 가지는 토큰이 의미있는 정보를 가져야한다면 두 기술을 혼합하여 access token 을 JWT 형식으로 구현할 수도 있다.
