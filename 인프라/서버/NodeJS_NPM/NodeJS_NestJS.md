# NestJS

`NestJS 로 배우는 백엔드 프로그래밍` 책 내용 정리

NestJS 는 Node.js 에 기반을 둔 웹 API 프레임워크로서  
Express 또는 Fastify 프레임워크를 래핑하여 동작합니다.

NestJS 는 기본 설치 시 Express 를 사용합니다.  
Fastify 는 Express 와의 벤치마크 결과 2배 정도 빠른 속도를 자랑합니다.
그럼에도 NestJS 가 기본으로 Fastify 를 사용하지 않는 이유는 Express 가 가장 널리 사용되고 있고  
수많은 미들웨어가 NestJS 와 호환되기 때문입니다.

## 데커레이터 - p32

각 요소의 선언부 앞에 @ 로 시작하는 데커레이터를 선언하면 데커레이터로 구현된 코드를 함께 실행합니다.
