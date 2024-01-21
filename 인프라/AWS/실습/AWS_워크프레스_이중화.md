`AWS 교과서` 책 내용 중

# 워크프레스 이중화 - p438

`성능과 확장성, 안정성을 고려한 두 가지 형태의 워드프레스 환경을 구성`

첫 번쨰는 성능을 높이는 형태로  
정적인 컨텐츠인 이미지와 첨부 파일은 워드프레스 가상 머신이 아닌 Amazon S3 에서 처리하고,  
그 외 요청은 CloudFront 로 워드프레스 가상 머신에서 하는 형태입니다.

```
       |> CloudFront > AWS ALB > Amazon EC2 (워드프레스)
사용자 >|
       |> Amazon S3 (이미지, 첨부파일)
```

두 번째는 확장성과 안정성을 확보하는 형태로  
워드프레스 가상 머신을 EC2 오토 스케일링 서비스로 처리하는 형태입니다.  
워드프레스 파일 시스템은 Amazon EFS 를 사용하여 확장성을 제공하며, 데이터베이스는 Amazon RDS 관리형 서비스를 사용하여 서비스 안정성을 확보합니다.

```
                     |> AWS ALB (EC2 오토스케일링) > Amazon EC2 (워드프레스) > Amazon RDS (Primary)
                     |                                    |
사용자 > CloudFront  >|                                  AWS EFS
                     |                                    |
                     |> AWS ALB (EC2 오토스케일링) > Amazon EC2 (워드프레스) > Amazon RDS (Secondary)
```
