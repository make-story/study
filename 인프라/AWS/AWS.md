# `그림으로 이해하는 AWS 구조와 기술` 책 정리

# 클라우드 컴퓨팅 서비스

https://aws.amazon.com/ko/what-is-cloud-computing/

컴퓨팅 리소스를 인터넷을 통해 서비스로 사용할 수 있는 주문형 서비스입니다.
서버 및 네트워크 등을 인터넷으로 빌려주는 서비스로, 언제 어디서든지 사용할 수 있다.
기업에서 직접 리소스를 조달하거나 구성, 관리할 필요가 없으며 사용한 만큼만 비용을 지불하면 됩니다.

물리적 데이터 센터와 서버를 구입, 소유 및 유지 관리하는 대신,
Amazon Web Services(AWS)와 같은 클라우드 공급자로부터 필요에 따라 컴퓨팅 파워, 스토리지, 데이터베이스와 같은 기술 서비스에 액세스할 수 있습니다.

## Infrastructure as a Service(IaaS)

인터넷을 통해 확장성이 뛰어난 컴퓨팅 리소스를 서비스로서 제공하는 주문형 가용성 서비스입니다.

일반적으로 네트워킹 기능, 컴퓨터(가상 또는 전용 하드웨어) 및 데이터 스토리지 공간에 대한 액세스를 제공합니다.
IaaS는 IT 리소스에 대한 최고 수준의 유연성과 관리 제어 기능을 제공합니다.  
이는 많은 IT 부서 및 개발자에게 익숙한 기존 IT 리소스와 가장 유사합니다.

## Platform as a Service(PaaS)

PaaS 모델은 애플리케이션 개발에 필요한 모든 소프트웨어 기능 및 도구를 제공합니다.  
여전히 사용자가 코드를 작성하고 앱 및 데이터를 관리해야 하지만 소프트웨어 개발 플랫폼의 관리 및 유지보수는 걱정할 필요가 없습니다.

## Software as a service(SaaS)

서비스 제공업체가 전체 애플리케이션과 이를 제공하는 데 필요한 모든 인프라까지 전체 애플리케이션 스택을 제공합니다.  
고객이 인터넷을 통해 앱만 연결하면 제공업체가 다른 모든 작업을 수행합니다.

# 웹 서버를 구축하고 싶을 때 (AWS 서비스명 기준)

- 서버 : EC2
- 서버 OS : AMI
- IP 주소 : Elastic IP
- 스토리지 : S3
- 도메인 : Route 53
- DB 서버 : RDS

# 중간규모 EC 사이트 예

VPC(가상 네트워크) - ELB(로그 밸런서) - EC2(웹 서버)
CloudFront(CDN, Edge Server) - S3(정적 리소스, Origin Server)

# 온프레미스

"온프레미스"는 기업이 자체 시설에서 보유하고 직접 유지 관리하는 프라이빗 데이터 센터를 말합니다.

# 가상화

컴퓨터가 어떤 작업을 하려면 물리적인 메모리와 하드 디스크, OS 등 다양한 부품이 필요하다.  
이를 소프트웨어로 대체하는 것이 가상화 기술이다.

서버를 예로 들어 생각해 보자. 가상 서버는 물리 서버 1대 위에 게스트가 되는 서버 여러 대를 가상으로 생성한다.  
본래 서버에 필요한 물리적인 부품을 가상으로 생성하여 가상 서버로 만드는 것이다.

네트워크의 경우도 마찬가지이다.  
물리적 배선 1개를 가상으로 분할하여 다른 네트워크와 통합하거나 그 즉시 연결을 바꿀 수도 있다.

---

# AWS 람다

https://www.44bits.io/ko/keyword/aws-lambda

AWS 람다AWS Lambda는 아마존 웹 서비스Amazon Web Services에서 제공하는 서비리스 컴퓨팅 서비스입니다.  
2014년 11월 AWS 리인벤트AWS re:Invent에서 처음 발표 되었습니다.  
서버리스 컴퓨팅은 애플리케이션을 실행하기 위한 별도의 서버 셋업 없이 곧바로 코드를 실행해주는 서비스를 의미하며,  
고정 비용 없이 사용 시간에 대해서만 비용이 발생합니다.  
아마존 EC2Amazon EC2는 현재 초 단위로 비용을 계산하는 반면 람다는 1ms당 요금을 계산해 정확히 사용한만큼만 비용이 발생합니다.

# AWS 람다, EC2 차이

https://m.blog.naver.com/ljk041180/221967258214

## EC2

https://docs.aws.amazon.com/ko_kr/AWSEC2/latest/UserGuide/concepts.html
독립된 컴퓨터를 임대해주는 서비스로 그 컴퓨터에 가상서버를 구축해서 그 공간을 제 공간인 것처럼 네트워크 구성이나 스토리지 관리 등등 이용하는 서비스입니다.

## Lambda

EC2와 다르게 별도의 서버 세팅 없이 곧바로 코드를 함수로 실행하게 해주는 서비스입니다.

## Fargate

EC2처럼 기본 인프라를 관리할 필요없이(서버리스) 컨테이너를 배포하고 관리할 수 있는 기능입니다.  
(도커 컨테이너)

# AWS 무료 체험 (프리티어)

https://aws.amazon.com/ko/free/?all-free-tier.sort-by=item.additionalFields.SortRank&all-free-tier.sort-order=asc&awsf.Free%20Tier%20Types=*all&awsf.Free%20Tier%20Categories=*all

# EC2 SSH 접속

https://docs.aws.amazon.com/ko_kr/AWSEC2/latest/UserGuide/AccessingInstancesLinux.html

1. 키페어 권한부여

```
$ chmod 400 KeyPair.pem
```

2. 원격접속

```
$ ssh -i {YOUR_KEY_PAIR_FILE.pem} {USER_NAME}@{AWS_PUBLIC_DNS_}
$ ssh -i "~/Downloads/ec2-key-pair.pem" ec2-user@ec2-3-34-192-17.ap-northeast-2.compute.amazonaws.com
```

# Bastion Host

https://err-bzz.oopy.io/f5616e26-79ca-4167-b2eb-140de69b9b54

Bastion Host 란 보안을 위해 고안된 Host로 외부 네트워크와 내부 네트워크 사이에서 일종의 `게이트웨이 역할을 수행하는 호스트`를 뜻한다.  
특히 Private IP로만 접근이 허용된 서버를 외부에서 접속하고자 할 경우, Bastion Host를 경유하여 Private IP 서버에 접근하도록 설계되곤 한다.

이렇게 관리할 경우, Bastion Host에서 특정 IP로의 접근만 허용하거나, 통신 로그를 일괄적으로 관리할 수 있는 편리함이 보장된다.

# CloudFront

https://inpa.tistory.com/entry/AWS-%F0%9F%93%9A-CloudFront-%EA%B0%9C%EB%85%90-%EC%9B%90%EB%A6%AC-%EC%82%AC%EC%9A%A9-%EC%84%B8%ED%8C%85-%F0%9F%92%AF-%EC%A0%95%EB%A6%AC

---

# AWS 인스턴스명 확인하는 방법

## 1

AWS 접속 ->
EC2 클릭 ->
인스턴스 (실행중) 클릭 ->
검색어(돋보기 부분) 입력 (AWS NAME) ->
검색결과 중 선택 ->
하단 탭 중 ‘Tag’ 정보 확인

## 2

젠킨스 접속 ->
Deploy Job 설정 확인 ->
‘Deploy an application to AWS CodeDeploy’ 설정값 확인 ->
‘AWS CodeDeploy Application Name’ 항목 값 확인 ->
AWS 접속 ->
CodeDeploy 접속 ->
왼쪽 메뉴 중 ‘배포’ 펼침 ->
‘애플리케이션’ 항목 선택 ->
애플리케이션 검색어 입력 >
검색결과 중 선택 ->
확인

---

# 아마존 인터랙티브 비디오 서비스(Amazon IVS)

아마존 IVS는 AWS의 쌍방향 쇼핑 경험을 지원하는 관리형 라이브 스트리밍 솔루션  
CJ ENM의 경우, 기존 30초였던 라이브커머스 방송의 지연시간은 3초로 줄임

https://www.bloter.net/newsView/blt202208310005
