# CDN
`콘텐츠를 사용자 가까운 곳으로 캐싱하기`  
- 서버 아키텍처는 어래동안 잘 동작했지만, 90년대말 부터 웹이 커지면서 문제가 발생하기 시작
- Akamai 가 1998년 첫 번째로 CDN 을 소개
- 아카마이의 CDN 은 콘텐츠를 서버들의 분산 시스템에서 캐싱
- CDN 은 모던 웹의 중요한 조각이 되어 있음

# 잼스택 (정적페이지 생성)
https://medium.com/@pks2974/jam-stack-%EA%B0%9C%EB%85%90-%EC%A0%95%EB%A6%AC%ED%95%98%EA%B8%B0-17dd5c34edf7
SSR은 재사용이 어렵다.
CSR은 초기 빠른 렌더링이 가능(의미있는 콘텐츠까지는 오래걸림), 재사용성 향상 (REST api), 각 역할 분리 가능

NextJS 등은 첫페이지는 정적페이지로 보여주면서, 이 후 렌더는 CSR형태

잼스택
JavaScriptClient 의 모든 처리는 Javascript 에게 맞긴다.
API모든 기능 및 비즈니스 로직은 재사용 가능한 API 로 추상화한다.
MarkupSSG (Static Site Generator) 나 Template Engine (Webpack 등) 을 이용하여 Markup 을 미리 생성한다.
Static HTML 을 CDN 을 통해 Cache 하고 배포하여, 빠른 속도 를 유지
중요한 것은 최대한 HTML Build 을 빌드하여, Cache 하고 사용자를 위한 First meaningful paint 의 속도를 높히자는 점