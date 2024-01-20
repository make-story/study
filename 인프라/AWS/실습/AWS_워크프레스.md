`AWS 교과서` 책 내용 중

# 워크프레스 - p418

첫 번째 실습은 한 대의 EC2 인스턴스에 웹 서버와 웹 애플리케이션 서버, 데이터베이스 서버를 모두 구성하는 `단일 구성의 실습 환경`

> EC2(웹 서버 + 웹 애플리케이션 서버 + 데이터베이스 서버) x 한 대

두 번째 실습은 한 대의 EC2 인스턴스와 Amazon EFS 에 웹 서버와 웹 애플리케이션 서버를 구성하고,  
Amazon RDS 에 데이터베이스 서버를 구성하는 `복합 구성의 실습 환경`  
'웹 서버 + 웹 애플리케이션 서버'와 '데이터베이스 서버'를 별도로 구성하는 방법이며,  
추가로 '웹 서버 관련 파일 시스템'을 별도의 무제한 저장소를 사용하여 안정성을 높일 수 있습니다.

> EC2(웹서버 + 웹 애플리케이션 서버) + Amazon EFS(웹 관련 데이터 저자소)/RDS(데이터베이스 서버)

저장소가 꽉 차서 서버가 동작하지 못하는 문제가 발생하지 않도록 현업에서는 보통 복합 구성 방법을 사용합니다.

---

p421

실습을 위한 기본 인프라를 CloudFormation (템플릿을 이용한 리소스 생성 및 관리)으로 배포합니다.

'Amazon S3 URL' 입력  
https://cloudneta-aws-book.s3.ap-northeast-2.amazonaws.com/chapter10/wplabs.yaml

위 URL 로 템플릿을 생성할 경우, 'AllInOne', 'WebSrv' EC2 인스턴스 등 생성됨

## 워드프레스의 단일 구성 환경 구성하기 - p424

웹 서버 + 웹 애플리케이션 서버 + 데이터베이스 서버 구성하기

웹 서버를 설치

```bash
# AllInOne 의 SSH 터미널
# apache 웹 서버 설치
yum install httpd -y

# 서비스 실행
systemctl start httpd && systemctl enable httpd

# 웹 서버 버전 확인
httpd -v

# 웹 서버에 접속
curl http://10.1.1.100
```

웹 애플리케이션 서버를 설치

```bash
# AllInOne 의 SSH 터미널
# php 설치
amazon-linux-extras install php8.2 -y

# php 버전 확인
php -v

# php Extensions 설치 후 적용
yum install -y php-xml php-mbstring ImageMagick ImageMagick-devel php-pear php-devel

printf "\n" | pecl install imagick

echo "extension = imagick.so" > /etc/php.d/40-imagick.ini

# php Extensions 정보 확인
php --ini

# php 정보를 출력하는 웹 페이지 생성 및 확인
echo "<?php phpinfo(); ?>" > /var/www/html/info.php

ls /var/www/html

# info.php 웹에 접속해서 확인
curl http://10.1.1.100/info.php
```

데이터베이스 서버를 설치

```bash
# AllInOne 의 SSH 터미널
# mariadb 설치
amazon-linux-extras install mariadb10.5 -y

# mariadb 서비스 시작
systemctl start mariadb && systemctl enable mariadb

# mariadb 계정 관련 초기화 설정
echo -e "\n n\n n\n Y\n n\n Y\n Y\n" | /usr/bin/mysql_secure_installation

# mariadb root 계정 암호 설정 : qwe123
mysql -e "set password = password('qwe123');"

# mariadb root 계정을 원격에서도 접속 가능하게 설정
mysql -e "GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' IDENTIFIED BY 'qwe123';"

# mariadb 에 워드프레스가 사용할 wordpressdb 데이터베이스 생성 및 확인
mysql -e "CREATE DATABASE wordpressdb"
mysql -e "show databases;"

# mariasb 서비스 재시작
systemctl restart mariadb

# mariadb 버전 확인
mysql --version
```

워드프레스 설치하고 초기 설정하기

```bash
# AllInOne 의 SSH 터미널
# 워드프레스 내려받기
wget https://wordpress.org/wordpress-6.2.zip

# 압축 풀기
unzip wordpress-6.2.zip

# 워드프레스 설정 파일 복사: wp-config.php
cp wordpress/wp-config-sample.php wordpress/wp-config.php

# 워드프레스 설정 파일에 mariadb 접속을 위한 정보 입력: 데이터베이스 이름, 계정 이름, 계정 암호
sed -i "s/database_name_here/wordpressdb/g" wordpress/wp-config.php
sed -i "s/username_here/root/g" wordpress/wp-config.php
sed -i "s/password_here/qwe123/g" wordpress/wp-config.php

# 정보가 입력된 워드프레스 설정 파일 확인
grep 'Database settings -' wordpress/wp-config.php -A15

# 압축 푼 wordpress 파일을 apache 웹 디렉토리에 복사
cp -r wordpress/* /var/www/html/

# 웹 사용자와 권한 설정
chown -R apache /var/www
chgrp -R apache /var/www
chmod 2775 /var/www
find /var/www -type d -exec chmod 2775 {} \;
find /var/www -type f -exec chmod 0664 {} \;

# 웹 서비스 재시작
systemctl restart httpd
```

워드프레스 설치 URL 접속  
<퍼블릭 EC2 URL>/wp-admin/install.php

## 워드프레스의 복합 구성 환경 구성하기 -p432

WebSrv 인스턴스의 기본 설정 정보 확인

```bash
# WebSrv 의 SSH 터미널
# EFS 저장소 마운트 확인: EFS 저장소에 워드프레스 관련 파일이 저장됨 (CloudFormation 템플릿)
df -hT --type nfs4

# 워드프레스 관련 파일 확인
ls /var/www/wordpress

# EFS 파일 시스템 확인: WebSrv 인스턴스에 마운트된 EFS 파일 시스템 정보 확인
aws efs describe-file-systems --output table --region ap-northeast-2

# Amazon RDS 인스턴스 정보 확인
aws rds describe-db-instances --region ap-northeast-2 --output table

# RDS 인스턴스 접속 주소 확인: Endpoint
aws rds describe-db-instances --region ap-northeast-2 --query 'DBInstances[*].Endpoint.Address' --output text
```

WebSrv 인스턴스에서 워드프레스를 사용할 수 있게 설정

```bash
# WebSrv 의 SSH 터미널
# RDS 인스턴스의 접속 주소를 변수에 지정
RDS=$(aws rds describe-db-instances --region ap-northeast-2 --query 'DBInstances[*].Endpoint.Address' --output text)
echo $RDS

# 워드프레스 설정 파일에 mariadb 접속을 위한 정보 확인
grep 'Database settings -' /var/www/wordpress/wp-config.php -A15

# 워드프레스 설정 파일에 mariadb 접속 주소 설정을 변경하고 확인
sed -i "s/localhost/$RDS/g" /var/www/wordpress/wp-config.php
grep 'Database settings -' /var/www/wordpress/wp-config.php -A15

# 워드프레스가 사용할 wordpressdb 데이터베이스 생성
mysql -h $RDS -uroot -pqwe12345 -e 'CREATE DATABASE wordpressdb;'

# 생성된 데이터베이스 확인
mysql -h $RDS -uroot -pqwe12345 -e 'show databases;'
```

워드프레스 설치 URL 접속  
<퍼블릭 EC2 URL>/wp-admin/install.php

## 실습을 위해 생성된 모든 자원 삭제 - p435

'CloudFormation > 스택 메뉴'에서 'wplab' 스택을 체크한 후 '삭제'를 누릅니다.  
이후 열린 창에서 '스택 삭제'를 누릅니다.
