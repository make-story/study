# 토큰 (Access Token, Refresh Token)

`study.git/OAuth/OAuth.md` 참고!  
`study.git/OAuth/JWT.md` 참고!

https://cotak.tistory.com/102  
https://tuigun.tistory.com/85

## 토큰의 종류와 규격 - 네이버 웍스 참고 (24.05 기준)

https://developers.worksmobile.com/kr/docs/auth-oauth#expiry-and-count

- Authorization Code
  Authorization Code Flow에서 이용되는 인증 코드
  유효기간 10분
  이용 가능 횟수 1회
- Access Token
  용자 인증 정보와 API 이용 범위(scope) 포함
  유효기간 24시간
- Refresh Token
  Access Token이 만료되었을 때 인증 절차를 거치지 않고 Access Token을 재발급하는 데 사용
  유효기간 90일

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

## OAuth Refresh Token 참고

Refresh Token
Refresh Token의 발급 여부와 방법 및 갱신 주기 등은 OAuth를 제공하는 Resource Server마다 상이합니다.

Access Token은 만료 기간이 있으며, 만료된 Access Token으로 API를 요청하면 401 에러가 발생합니다.  
Access Token이 만료되어 재발급받을 때마다 서비스 이용자가 재 로그인하는 것은 다소 번거롭습니다.

보통 Resource Server는 Access Token을 발급할 때 Refresh Token을 함께 발급합니다.  
Client는 두 Token을 모두 저장(httpOnly 쿠키로 저장)해두고, Resource Server의 API를 호출할 때는 Access Token을 사용합니다.  
Access Token이 만료되어 401 에러가 발생하면, Client는 보관 중이던 Refresh Token을 보내 새로운 Access Token을 발급받게 됩니다.
