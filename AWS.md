# `그림으로 이해하는 AWS 구조와 기술` 책 정리 

-----

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
EC2처럼  기본 인프라를 관리할 필요없이(서버리스) 컨테이너를 배포하고 관리할 수 있는 기능입니다.  
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


-----