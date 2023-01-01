# 교착상태 deadlock

## 트랜잭션

https://d2.naver.com/helloworld/407507
http://www.yes24.com/Product/Goods/6104230

하나의 논리적 작업 단위를 구성하는 `일련의 연산들의 집합을 트랜잭션`이라고 한다.

트랜잭션의 예로 계좌 간의 자금 이체가 많이 언급된다.  
한 계좌에서 10만 원을 인출하여 다른 계좌로 10만 원 입금하는 이체 작업은 전체 작업이 정상적으로 완료되거나,  
만약 정상적으로 처리될 수 없는 경우에는 아무 것도 실행되지 않은 처음 상태로 되돌려져야 한다.

## MySQL

https://velog.io/@wj-dominic/MySQL-Deadlock

## 가장 간단한 해결 방법: 정렬

https://helloworld.kurly.com/blog/vsms-performance-experiment/

- 트랜잭션 단위를 상품 하나로 제한하고 Queue 도입으로 순환 대기 방지
- 인 메모리 Queue 사용
- 외부 Queue 사용
- 안전 상태일 경우에만 차감(뱅커 알고리즘 응용)
- timeout을 줄여 빠르게 실패하게 하고, 클라이언트에서 재시도하도록 유도
- Redis 도입
- Java Phaser 사용
- …
