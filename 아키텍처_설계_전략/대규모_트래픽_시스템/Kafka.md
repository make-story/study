# 카프카(Kafka)

https://velog.io/@holicme7/Apache-Kafka-%EC%B9%B4%ED%94%84%EC%B9%B4%EB%9E%80-%EB%AC%B4%EC%97%87%EC%9D%B8%EA%B0%80

메시지 발행 구독 시스템 (메시지 브로커)

카프카(Kafka)는 파이프라인, 스트리밍 분석, 데이터 통합 및 미션 크리티컬 애플리케이션을 위해 설계된 고성능 분산 이벤트 스트리밍 플랫폼이다.

Pub-Sub 모델의 메시지 큐 형태로 동작하며 분산환경에 특화되어 있다.

## Kafka 소개

https://velog.io/@ggingmin/Node.js%EC%99%80-Kafka%EB%A5%BC-%ED%99%9C%EC%9A%A9%ED%95%9C-%EB%8D%B0%EC%9D%B4%ED%84%B0-%EC%8A%A4%ED%8A%B8%EB%A6%AC%EB%B0%8D-%EC%8B%9C%EC%8A%A4%ED%85%9C-%EA%B5%AC%EC%84%B1%ED%95%98%EA%B8%B0

Kafka의 공식 홈페이지의 서비스 소개 페이지에 따르면 이벤트 스트리밍을 인체의 중추신경계에 해당하는 디지털 시스템이라고 설명하고 있습니다. 외부의 자극을 신체의 감각으로 수용하여 뇌로 전달하는 중추신경계와 같이 Kafka 역시 실시간으로 발생하는 다양한 이벤트를 전달 받아 적재적소에 맞게 활용할 수 있도록 하는 것이죠.

Kafka에서 이벤트를 수집하거나 Kafka에 수집된 이벤트에 접근할 때에는 TCP 프로토콜을 기반으로 통신이 일어나게 됩니다. 데이터가 모이는 Kafka 서버인 브로커는 단일 혹은 복수로 구성된 클러스터 형태를 띄고 있으며, 재해 혹은 기타 불가항력의 상황에 처해 특정 서버가 불능 상태에 빠지더라도 클러스터 내 다른 서버가 이를 처리할 수 있도록 구성할 수 있습니다.

## Node.js + Kafka

https://f-lab.kr/insight/nodejs-kafka-data-processing-20240709
