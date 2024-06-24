# MySQL timestamp, datetime

https://velog.io/@gutenlee/F-Lab-%EC%B1%8C%EB%A6%B0%EC%A7%80-15%EC%9D%BC%EC%B0%A8-TIL-MySQL-timestamp-%EC%99%80-datetime-%EB%B9%84%EA%B5%90

`study.git/프론트/JavaScript/JavaScript_날짜_시간_유형.md` 참고!

## timestamp

- current time zone 을 UTC 기준으로 변환하고 역으로도 변환해준다. datatime 타입엔 이 기능이 없다.
- 범위 : '1970-01-01 00:00:01' UTC to '2038-01-19 03:14:07' UTC.
  범위를 보면 2038-01-09 03:14:07 까지만 표현이 가능하다. 그 이유는 timestamp 의 자료 크기는 4바이트인데 이 숫자로 표현 가능한 시간이 2038-01-09 03:14:07 인 것이다.
  그럼 2038-01-09 03:14:07 까지만 표현할 수 없는건가 ? 아니다. MySQL 은 8.x 버전에서 이를 개선했다고 한다. 특정 조건을 만족하면 8바이트로 표현 범위가 늘어난다.
  그래서 1970–01–01 00:00:00.000000 ~ 3001–01–18 23:59:59.000000 으로 확장되었다고 한다.
- `current time zone 은 서버 시간을 따른다.` (글로벌 서비스에 적합!)
  `저장할 시 셋팅된 time zone 과 이 이후에 time zone 셋팅이 변경되면 읽기 시 저정했을 때 값과 다르게 나온다.`
- 입력한 데이터가 유효한 날짜와 시간이 아니면 YYYY-MM-DD hh:mm:ss[.fraction] 세 부분 모두 0으로 셋팅된다.
- 숫자형으로 저장된다. 1970-01-01 00:00:00 을 기준으로 몇초가 지났는지를 저장한다.
- 4바이트의 저장공간을 사용한다.

## datetime

- 'YYYY-MM-DD hh:mm:ss' format
- 범위 : '1000-01-01 00:00:00' to '9999-12-31 23:59:59'
- `시스템 time zone 이 변경되어도 값이 변하지 않는다.`
- 문자형으로 저장된다.
- 8바이트의 저장공간을 사용한다.

## 타임존 설정

https://zinirun.github.io/2020/10/11/nodejs-mysql-timezone/

```sql
SET GLOBAL time_zone = 'Asia/Seoul';
```

```sql
select current_timestamp()
```
