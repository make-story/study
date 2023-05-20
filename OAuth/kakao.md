# 카카오 (kakao) OAuth

카카오 로그인은 OAuth 2.0 기반의 소셜 로그인 서비스 - 23.05 기준

https://developers.kakao.com/docs/latest/ko/kakaologin/common

https://developers.kakao.com/docs/latest/ko/kakaologin/rest-api

---

# 인증(Authentication)

- ID와 비밀번호로 사용자 신원을 확인
- 각 서비스에 사용자가 카카오계정으로 로그인할 수 있는 기능 지원
- 서비스에서 각 사용자를 식별할 수 있는 고유한 회원번호 제공

참고: OpenID Connect 지원, 로그인 세션 대신 사용 가능한 ID 토큰 제공 가능

# 인가(Authorization)

- 사용자 개인정보와 같은 `자원(Resource)에 대한 접근 권한` 획득
- 사용자 동의를 바탕으로 사용자 정보나 기능에 대한 접근 권한을 `토큰 형태`로 서비스에 부여

# 참고: 토큰

토큰은 사용자의 카카오 로그인 인증 및 인가 정보를 담은 권한 증명으로, 카카오 API 호출에 사용됩니다.  
카카오 로그인은 `OAuth 2.0 표준 규격에 따라 액세스 토큰(Access token), 리프레시 토큰(Refresh token) 두 종류의 토큰을 발급`합니다.

## 액세스 토큰 (Access token) - 23.05 기준

사용자 인증, 카카오 API 호출 권한 부여

- 만료시간  
  Android, iOS : 12시간  
  JavaScript: 2 시간  
  REST API : 6시간

## 리프레시 토큰 (Refresh token) - 23.05 기준

액세스 토큰 재발급에 사용  
유효한 리프레시 토큰이 있다면 사용자가 매번 카카오계정 정보를 입력하거나 카카오톡으로 로그인하는 인증 절차를 거치지 않아도 액세스 토큰 재발급 가능

- 만료시간  
  2달  
  만료 시간 1달 남은 시점부터 갱신 가능

## ID 토큰 (ID token) - 23.05 기준

카카오 로그인 사용자의 인증 정보를 제공하는 토큰

- 만료시간  
  액세스 토큰과 동일
