# MySQL 이슈경험

## MySql/MariaDB에서 발생하는 Connection 끊김 문제 해결하기

https://engineering-skcc.github.io/cloud/tomcat/apache/performancetest/MySqlDBWaitTimeOut/

## Too many connections

"최대 커넥션 개수"

- max_connections - 최대 동시 접속 가능 수 기본값=100
- wait_timeout - 종료전까지 요청이 없이 기다리는 시간

max_connections = {DBInstanceClassMemory/12582880}

```
$ show variables like 'max_connections';
```

https://lion-king.tistory.com/entry/MySQL-MariaDB-max-connections-Too-many-connections-%EC%98%A4%EB%A5%98-%ED%95%B4%EA%B2%B0

그러면 단순히 max_connections 변수의 값을 늘려서 해결 하면될까요?

정답은 No 입니다.

1. 최대 커넥션 갯수를 늘린다고 해서 처리 가능한 메모리 용량이 느는것이 아니기 때문에
   연결을 허용한다해도 과부하가 걸려 처리를 못할 수 있습니다.

2. 최대 커넥션 수가 또 증가하지 말라는 법은 없습니다.
   또 "Too Many Connections" 오류가 발생했을 때 다시 더늘려주고 하는것은 비효율적입니다.

그렇다면 어떻게 해결할까요?  
DB에서 커넥션 갯수를 관리하도록 설정해주는 방식으로 해결하기로 했습니다.

1. 일정시간 요청이 없는 커넥션을 끊음
2. 커넥션이 닫히기 전 기다리는 시간을 짧게 설정함

```
$ $ show variables like '%timeout%';
```

interactive_timeout= 28800  
(interactive 모드에서 time out 을 말합니다.  
interactive 모드는 'mysql>' 과 같은 프롬프트 있는 콘솔이나 터미널 모드를 말합니다)

wait_itmeout = 28800  
(interactive 모드가 아닌 경우에 해당되며,  
mysqld 와 mysql client 가 연결을 맺은 후, 다음 쿼리까지 기다리는 최대 시간을 의미합니다)

중요! 초 단위 입니다. (28800 -> 28800초 8시간)

1. 명령어를 통해 설정 ( 서버 재시작시 설정이 초기화됨)

```
set global interactive_timeout = 180;
set global wait_timeout = 180;
```

2. 환경변수 파일 변경 (AWS가 제공하는 웹페이지에서 쉽게 환경변수 설정 가능)

/etc/mysql/mariadb.conf.d/50-server.cnf  
wait_timeout = 180
interactive_timeout = 180
