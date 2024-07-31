# AWS SQS, Amazon Simple Queue Service

https://docs.aws.amazon.com/ko_kr/AWSSimpleQueueService/latest/SQSDeveloperGuide/welcome.html

## AWS SQS를 도입하면서 했던 고민

https://channel.io/ko/blog/tech-backend-aws-sqs-introduction

SQS 는 publisher 와 consumer 입장에서 사용하게 됩니다. 각각의 입장에서 SQS를 사용하는 interface 는 아래와 같아요.

Publisher:

메시지 발행하기 (SendMessage)
Consumer:

메시지 가져오기 (ReceiveMessage)
메시지 삭제하기 (DeleteMessage)
메시지 가져오기 취소 (ChangeMessageVisibility(visibilityTimeout=0))

## Amazon SQS, Amazon MQ 및 Amazon SNS 간의 차이점

https://docs.aws.amazon.com/ko_kr/AWSSimpleQueueService/latest/SQSDeveloperGuide/welcome.html

Amazon SQS는 분산 소프트웨어 시스템과 구성 요소를 대기열 서비스로서 분리하고 확장합니다.  
일반적으로 단일 구독자를 통해 메시지를 처리하므로 주문 및 손실 방지가 중요한 워크플로에 적합합니다.  
더 넓은 배포를 위해 Amazon SQS를 Amazon SNS와 통합하면 팬아웃 메시징 패턴이 구현되어 한 번에 여러 구독자에게 메시지를 효과적으로 푸시할 수 있습니다.

Amazon SNS를 사용하면 게시자가 주제를 통해 여러 구독자에게 메시지를 보낼 수 있으며, 이는 커뮤니케이션 채널 역할을 합니다.  
구독자는 Amazon SQS, Lambda, HTTP, 이메일 Amazon Data Firehose, 모바일 푸시 알림, 모바일 문자 메시지 (SMS) 등 지원되는 엔드포인트 유형을 사용하여 게시된 메시지를 수신합니다.  
이 서비스는 실시간 사용자 참여 또는 경보 시스템과 같이 즉각적인 알림이 필요한 시나리오에 적합합니다.  
구독자가 오프라인 상태일 때 메시지 손실을 방지하기 위해 Amazon SNS를 Amazon SQS 대기열 메시지와 통합하면 일관된 전송이 보장됩니다.

Amazon MQ는 Apache ActiveMQ 및 RabbitMQ와 함께 AMQP 및 MQTT와 같은 표준 메시징 프로토콜을 지원하여 기존 메시지 브로커에서 마이그레이션하려는 기업에 가장 적합합니다.  
대폭적인 재구성 없이 안정적이고 신뢰할 수 있는 메시징이 필요한 레거시 시스템과의 호환성을 제공합니다.

Amazon SQS와 Amazon SNS는 무제한에 가까운 확장성과 간편한 API를 활용할 수 있는 새로운 애플리케이션에 사용하면 좋습니다.  
이들은 일반적으로 가격 면에서도 대용량 애플리케이션을 위한 더 비용 효율적인 솔루션을 제공합니다.  
pay-as-you-go JMS와 같은 API 또는 고급 메시지 큐 프로토콜 (AMQP), MQTT, OpenWire 단순 텍스트 지향 메시지 프로토콜 (STOMP) 과 같은 프로토콜과의 호환성을 사용하는 기존 메시지 브로커에서 애플리케이션을 마이그레이션할 때는 Amazon MQ를 사용하는 것이 좋습니다.
