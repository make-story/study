# 참고 자료

https://www.ibm.com/docs/en/tfim/6.2.2.7?topic=configuring-identity-provider-service-provider-roles

https://www.cloudflare.com/ko-kr/learning/access-management/what-is-an-identity-provider/

# Identity Provider (IdP)

사용자를 인증하고 서비스 공급자(Service Provider)에게 인증 토큰 (즉, 사용자의 신뢰성을 확인하는 정보)을 제공

ID 공급자(IdP)는 사용자 ID를 저장하고 확인하는 서비스입니다. IdP는 일반적으로 클라우드 호스팅 서비스이며 SSO(Single Sign-On) 공급자와 협력하여 사용자를 인증하는 경우가 많습니다.

해당 서비스를 사용해 내부 사용자가 필요한 리소스에 접속할 수 있도록 지원합니다.

- 대표적으로 구글이나 페이스북 로그인을 사용해서 특정 서비스에 로그인한 경험이 있다면 IdP를 이미 사용해본 것입니다.
- 사용자는 계정 정보만 입력하여 서비스에 로그인할 뿐 다른 작업은 없습니다.

## Identity Provider (IdP) 어떻게 동작하나?

일반적으로 아래와 같이 진행되며 사용자는 해당 동작 방식을 알지 못해도 됩니다.

- 요청: 사용자가 로그인(구글, 페이스북등)할 때 계정 정보를 입력합니다.
- 인증(Authentication): IdP 가 해당 사용자가 특정 서비스에 접근(로그인) 권한이 있는지 그리고 어떤 작업 권한을 갖고있는지 확인합니다.
- 인가(Authorization): 사용자에게 접근(로그인) 권한과 작업 권한이 확인되면 허용됩니다.

대표적인 솔류션
okta: 요즘 기업에서 가장 많이 도입하여 사용하고 있는 솔루션입니다.

# Service Provider

일반적으로 서비스 공급자는 사용자를 인증하지 않고 대신 ID 공급자에게 인증 결정을 요청
