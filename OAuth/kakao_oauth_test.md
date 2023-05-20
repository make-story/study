# 카카오(kakao) 인증 테스트 - 포스트맨

카카오 공식 REST API 테스트
https://developers.kakao.com/tool/rest-api/open/get/v2-user-me

---

https://han-py.tistory.com/415

https://developers.kakao.com/console/app/881765/product/login

https://developers.kakao.com/docs/latest/ko/kakaologin/rest-api#kakaologin

- 카카오 서버가 하는 일은 2가지다.
  카카오 서버는 로그인 시 인가 코드를 준다.  
  카카오 서버로 인가 코드를 보내면 유효 토큰을 준다.

로그인해서 인증 코드를 받는다. 받은 인증 코드로 token을 받는다. token으로 로그인을 유지를 한다.

# Auth URL

https://kauth.kakao.com/oauth/authorize

# Access Token URL

https://kauth.kakao.com/oauth/token

# Client ID

https://developers.kakao.com/console/app/881765/config/appKey
카카오 개발자 페이지 > 앱 키 > REST API 키

# Client Secret (선택적 입력)

https://developers.kakao.com/console/app/881765/product/login/security
카카오 개발자 페이지 > 카카오 로그인 > 보안 > Client Secret 코드가 있을 경우 입력!
