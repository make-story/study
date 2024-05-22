# MySQL 상태점검

https://minervadb.xyz/comprehensive-mysql-health-check-guide-scripts-and-strategies-for-optimal-database-performance/

1. 데이터베이스 성능 지표 모니터링

리소스 활용 스크립트 : CPU, 메모리, 디스크 I/O, 네트워크 사용량을 모니터링하는 스크립트를 사용합니다.

```
#!/bin/bash
top -n 1
iostat
free -m
```

느린 쿼리 로그 분석 : 느린 쿼리 로그를 확인하고 분석합니다.

```
SHOW VARIABLES LIKE 'slow_query_log';
SHOW VARIABLES LIKE 'long_query_time';
```

2. 데이터베이스 구성 확인

구성 검토 스크립트 : my.cnf또는 my.ini파일을 정기적으로 검토합니다.

```
cat /etc/mysql/my.cnf
```

서버 변수 분석

```
SHOW GLOBAL VARIABLES;
```

3. 데이터 무결성 및 일관성 확인

테이블 확인 스크립트

```
CHECK TABLE tablename;
```

pt-table-checksum을 사용한 일관성 검사

```
pt-table-checksum --host=localhost --user=root --password=yourpassword
```

4. 보안 설정 검토

사용자 계정 및 권한 감사

```
SELECT user, host, authentication_string FROM mysql.user;
```

5. 백업 및 복구 절차 검토

백업 확인 스크립트

```
mysqlcheck --all-databases --check-backup
```

6. 스토리지 및 디스크 공간 분석

디스크 공간 사용량 스크립트

```
df -h
```

테이블 및 인덱스 크기 쿼리

```
SELECT
    table_schema AS 'Database',
    table_name AS 'Table',
    round(((data_length + index_length) / 1024 / 1024), 2) 'Size in MB'
FROM information_schema.TABLES
ORDER BY (data_length + index_length) DESC;
```

7. 복제 상태 확인

복제 상태 스크립트

```
SHOW SLAVE STATUS\\\\G;
```

8. 네트워크 성능 평가

네트워크 대기 시간 테스트 스크립트

```
ping your-database-host
```

9. 업그레이드 및 패치 관리

MySQL 버전 확인

```
SELECT VERSION();
```

10. 상태 점검 자동화

자동 모니터링 설정 : 자동 모니터링을 위해 Nagios, Zabbix 또는 Percona Monitoring and Management(PMM)와 같은 도구를 사용합니다.
