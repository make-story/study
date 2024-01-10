# `AWS 교과서` 책 정리

p32

AWS 클라우드 컴퓨팅 서비스의 자원을 관리하는 방법은 크게 세 가지가 있습니다.  
첫 번쨰는 AWS 관리 콘솔(menagement console)을 이용한 방법으로, 웹 기반으로 손쉽게 AWS 클라우드 자원을 관리할 수 있습니다.  
두 번쨰는 AWS CLI(Command Line Interface)를 이용한 방법으로, 쉘 프로그램을 사용한 명령어 기반으로 AWS 클라우드 자원을 관리할 수 있습니다.  
마지막은 AWS IaC(Infrastructure as Code)로, 코드 기반으로 AWS 클라우드 자원을 관리할 수 있습니다.

# AWS 컴퓨팅 서비스 - p38

AWS 컴퓨팅 서비스는 퍼블릭 클라우드에서 컴퓨팅 자원을 활용하여 다양한 워크로드를 수행할 수 있는 서비스입니다.

- EC2(Elastic Compute Cloud)  
  클라우드 환경에서 서버 자원을 인스턴스(instance)라는 가상 머신(Virtual Machine, VM) 형태로 제공하는 가장 기본적인 AWS 컴퓨팅 서비스

- ECS(Elastic Container Service)  
  EC2 기반 관리형 클러스터에서 실행되는 컨테이너 형태의 자원에 대해 배포, 스케줄링(scheduling), 스케일링(scaling) 등을 관리하는 서비스

- Lambda  
  서버리스(serverless) 컴퓨팅 서비스로, 서버리스라는 말 그대로 별도의 서버 설정이 없는 환경을 제공하여 코드만 실행해 주는 서비스

- Lightsail  
  독립적인 환경을 제공하며, 최소한의 설정만으로도 손쉽게 사용 가능한 컴퓨팅 서비스

# Amazon EC2 인스턴스 - p40

Amazon EC2 인스턴스는 가상의 컴퓨팅 환경으로 CPU, 메모리, 스토리지, 네트워킹 용량을 결정하는 다양한 인스턴스 유형을 제공합니다.

## 인스턴스 유형

Amazon EC2 는 500개가 넘는 인스턴스 유형을 제공하여 사용자 목적과 비즈니스 환경에 맞게 최적화된 선택을 할 수 있습니다.

https://aws.amazon.com/ko/ec2/instance-types/

## 인스턴스 상태

어떤 행위에 최종적으로 도달하는 상태와 진행 과정에 따른 상태로 나눌 수 있습니다.

최종적으로 도달하는 상태는 '실행중(running)', '중지됨(stopped)', '종료됨(terminated)' 상태이며,  
진행 과정에 따른 상태는 '대기중(pending)', '중지중(stopping)', '재부팅(rebooting)', '종료 중(shutting-down)' 상태입니다.

# AMI - p42

AMI(Amazon Machine Image) 는 인스턴스를 시작할 때 필요한 정보를 제공하는 것으로 운영 체제와 소프트웨어를 적절히 구성한 상태로 제공되는 템플릿(template) 입니다.
인스턴스를 생성할 경우 AMI 를 지정해야 하며, 하나의 AMI 로 동일한 구성의 여러 인스턴스를 손쉽게 생성할 수 있습니다.

# Amazon EC2 네트워킹 - p45

## Amazon VPC

## 네트워크 인터페이스

## IP 주소

# Amazon EC2 모니터링 - p47

## 수동 모니터링 도구

## 자동 모니터링 도구

---

# AWS 네트워킹 서비스 - p72
