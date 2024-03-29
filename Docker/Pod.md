https://kubernetes.io/ko/docs/tutorials/kubernetes-basics/explore/explore-intro/

# Pod(파드, 포드, 팟)

https://computing-jhson.tistory.com/102

Pod(파드, 포드, 팟)는 쿠버네티스가 생성하고 관리하는 가장 작은 컴퓨팅 단위

파드는 한 개 이상의 리눅스 컨테이너로 구성되며, 애플리케이션(의 인스턴스)이 실행되는 논리적 호스트

리눅스 컨테이너, 쿠버네티스가 대중화되기 이전에, 이러한 애플리케이션은 작은 프로세스(DB, 웹서버, 로거 등) 단위로 개발 및 운영되었다.  
도커가 대중화되면서 개발자들은 리눅스 컨테이너 단위로 애플리케이션을 쪼개서 개발 및 운영하게 되었다.  
쿠버네티스는 이들과 마찬가지로 파드 단위로 애플리케이션을 운영한다.  
`개발자는 애플리케이션을 이루는 파드(웹로직 파드들, DB 파드 등)들을 개발하고 이를 쿠버네티스에 이들 운영을 명령`한다.

## Pod 와 Container

파드는 한 개 이상의 리눅스 컨테이너로 구성된다.  
앞서 말했듯 애플리케이션 종류에 따라서 한 애플리케이션이 여러 개의 컨테이너로 구성되게 개발하는 경우도 많다.  
이때 이 컨테이너들을 하나의 파드에 묶어서 쿠버네티스에 실행을 명령할 수도 있고,  
각각 다른 파드로 만들어 여러 개의 파드들을 쿠버네티스에 실행시켜달라고 명령할 수도 있다.  
두 가지 방법 모두 사용되고 있는 개발 방식으로 각기 장단점이 존재하기에 자신의 애플리케이션에 어울리는 방식으로 개발하여야한다.

## Pod 실행

쿠버네티스에서 애플리케이션 실행을 위해 개발자가 해야할 역할은 크게 두 가지이다.  
애플리케이션을 개발하는 것과 파드들을 어떻게 운영할 지를 쿠버네티스에게 구체적으로 알려주는 것.

개발자는 애플리케이션을 파드 단위로 개발하고 이를 쿠버네티스에 실행시켜달라고 요청한다.  
이때 개발자는 쿠버네티스에 파드들을 어떻게 배포해야 하는지 구체적으로 알려줘야 한다.  
쿠버네티스는 개발자의 실행 요청에 따라 클러스터 내에서 안정적이고 효율적으로 파드들을 스케쥴링(해당 파드를 어떤 워커 노드에서 실행 시킬 지 결정)한다.  
클러스터의 개별 노드는 자신에게 할당된 파드들을 실행시킨다.
