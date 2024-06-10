# SSO (Single Sign On)

https://it-ist.tistory.com/251

이름 그대로 단일 로그인, 즉 한번의 로그인으로 여러개의 애플리케이션들을 이용할 수 있게해주는 서비스 입니다.

## 작동 원리

SSO를 구현하기 위한 표준은 여러가지이지만 기본 패턴은 동일합니다.  
일반적으로 두가지 모델로 구분됩니다.

1. Delegation Model

대상 서비스의 인증방식을 변경하지 않고, 사용자의 인증 정보를 Agent가 관리하여 대신 로그인 해주는 방식입니다.

2. Propagation Model

통합 인증을 수행하는 곳에서 인증을 받아 "인증 토큰"이라는 것을 발급  
유저가 서비스에 접근할 때 발급받은 인증토큰을 서비스에 같이 전달하게 되고, 서비스는 토큰정보를 통해 사용자를 인식할 수 있게 하는 방식입니다.

## 구현 방식

대표적으로 세가지 방식  
SAML (Security Assertion Markup Language) / OAuth / OIDC (OpenID Connect)
