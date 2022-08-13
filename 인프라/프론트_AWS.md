# 서버리스

서버 셋업(하드웨어, 소프트웨어 구성)을 직접하지 않고,
클라우드(직접 물리적 서버를 관리하거나 자체 서버에서 소프트웨어 응용 프로그램을 실행하지 않아도 됩니다.) 서비스를 활용하는 것

# 프론트 AWS 구성

- EC2 클라우드 가상서버
  EC2 (Amazon Elastic Compute Cloud) 인스턴스  
  c5.xlarge 서버 성능 서비스형태 선택  
  Front Node.js 구성

- S3  
  정적 웹 호스팅 (정적 리소스)

- CloudFront  
  S3의 내용을 세계에 분포되있는 엣지 서버에 캐싱 (CDN)

- CodeDeploy
  코드 배포 자동화  
  appspec.yml 파일

- Certificate Manager  
  SSL/TLS 인증서 프로비저닝, 관리, 배포 서비스  
  도메인에 대한 HTTPS 인증서를 생성

- WAF  
  애플리케이션 방화벽  
  Dos, SQL Injection 과 같은 웹 보안 공격을 예방

- Route 53  
  DNS 서비스  
  AWS 인프라 구축 시에는 도메인을 발급받은 기관의 네임서버를 사용하는 것 보다 AWS의 네임서버를 사용함으로써 통일성을 유지

- CloudWatch
  로그 관리, 서버 모니터링

---

# S3 생성

├── 파일(index.html) 업로드
├── 버킷 엑세스 권한 퍼블릭 설정
├── 객체 엑세스 권한 '모든 사람 읽기' 허용
└── 객체 URL 확인

# S3 정적 웹 사이트 호스팅 기능 활성화

└── 버킷 웹 사이트 엔드포인트 URL 확인

# CloudFront 생성

├── Origin domain: S3 endpoint
└── Default root object: index.html

# Certificate Manager 에서 SSL/TLS 인증서 발급

└── 발급 완료 후, CloudFront 에서 CNAME & 발급된 인증서 설정

# WAF 생성

├── Resource type: CloudFront distributions
├── Add AWS resources: CloudFront
└── Configure metrics: Enabled sampled requests

# IP 차단 룰 추가 (Block rule)

├── IP sets 생성
├── WAF > Web ACLs > Rules > Add rules(Add my own rules and rule groups)
└── Rule type: IP set

# SQL 인젝션 룰 추가 (Block rule)

├── WAF > Web ACLs > Rules > Add rules(Add my own rules and rule groups)
├── Rule type: Rule builder
└── Statement
├── Inspect: All query parameters
├── Match type: Contains SQL injection attacks
└── Text transformation: URL decode, Lowercase

# Route53 생성 - DNS 이전, from 가비아 to Route53

├── 호스팅 영역 생성
├── 도메인 이름: abc.com
└── 유형: 퍼블릭 호스팅 영역

# Route53 레코드 추가

├── 레코드 이름: www.abc.com
├── 레코드 유형: CNAME
└── 값: CloudFront 도메인 이름
