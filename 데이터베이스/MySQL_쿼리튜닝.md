# MySQL 쿼리 튜닝

https://monday9pm.com/mysql-%EC%BF%BC%EB%A6%AC-%ED%8A%9C%EB%8B%9D%EC%9D%98-%EC%B2%AB%EA%B1%B8%EC%9D%8C-3ff0e5e1c964

## EXPLAIN

MySQL을 다루시는 대부분의 DBA(DataBase Administrator)나 백엔드 개발자분들은 익숙할 것으로 생각되는 명령어입니다.  
MySQL에서 데이터를 찾는 과정을 결과 셋으로 보여주는 명령어인데요.  
이를 통해 Slow Query의 발생 지점을 체크할 수 있고,  
이 결과를 가지고 Index 구성에 대한 고민을 해보며 쿼리 튜닝을 통한 성능 향상을 꾀할 수 있는 중요한 명령어입니다.

```
EXPLAIN [EXTENDED] SELECT ... FROM ... WHERE ...
```

## EXPLAIN ANALYZE (MySQL 8.0.18 이상 지원)

실행 계획뿐만 아니라 쿼리 수행 시간과 관련된 성능 통계 정보를 함께 제공합니다.  
이를 통해 보다 상세하고 정확한 정보를 알 수 있습니다.

```
EXPLAIN ANALYZE SELECT ... FROM ... WHERE ...
```

- EXPLAIN 명령어 -> 통계정보 테이블을 기반으로 유추하여 결과 반환
- EXPLAIN ANALYZE 명령어 -> 실제 쿼리를 실행하여 결과 반환
