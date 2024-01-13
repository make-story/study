`AWS 교과서` 책 내용 중

1. EC2 페이지 접속
   https://ap-northeast-2.console.aws.amazon.com/ec2/home
2. 실행중 또는 접근하려는 인스턴스 선택
   https://ap-northeast-2.console.aws.amazon.com/ec2/home?region=ap-northeast-2#Instances:instanceState=running
3. 우측 상단 "연결" 버튼 클릭
4. 탭 메뉴 중 "SSH 클라이언트 선택"
5. 설명된 가이드에 따라 진행

# 'Resolver error: Error: Permission denied (publickey,gssapi-keyex,gssapi-with-mic).' 이슈

`pem 키 페어 파일 권한이 너무 많이 들어가 있거나, 잘 못 들어간 경우 발생`

AWS 가이드에 따라 해당 파일 권한 수정

```bash
$ chmod 400 "키 페어 파일.pem"
```
