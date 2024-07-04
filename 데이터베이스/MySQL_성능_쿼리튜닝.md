# MySQL 대용량 처리, 설계

`study.git/인프라/Memcached_Redis.md` 참고

`실무 예제로 다가가는 MySQL 쿼리 작성, MySQL 퍼포먼스 최적화` 책 참고!

# MySQL 쿼리 튜닝

https://monday9pm.com/mysql-%EC%BF%BC%EB%A6%AC-%ED%8A%9C%EB%8B%9D%EC%9D%98-%EC%B2%AB%EA%B1%B8%EC%9D%8C-3ff0e5e1c964

## 인덱스 (index)

인덱스는 데이터를 빠르게 검색할 수 있도록 해주는 것입니다.  
(책의 인덱스 페이지와 유사)

### MySQL 인덱스 유형

- Primary key(기본 키): 각 테이블은 기본 키를 가져야 합니다 (자신이 무엇을 하는지 알고 있다면 제외). 기본 키는 여러 열을 포함할 수 있으며 데이터가 고유하다는 것을 보장합니다.

- Spatial index(공간 인덱스): 이 인덱스는 기하학적 값에 사용되며 지도 및 GIS 관련 작업에 사용됩니다. 저는 이 분야에서 작업한 적이 없으며 이 인덱스를 사용한 적도 없습니다.

- Unique index(고유 인덱스): 이 인덱스는 기본 키와 마찬가지로 인덱스에 포함된 열들이 고유하다는 것을 보장합니다. 하지만 기본 키와 달리 이 인덱스의 관리는 공간과 메모리를 필요로 합니다. 큰 인덱스의 경우 메모리를 충분히 확보해야 할 수도 있습니다. 한번 16GB 인스턴스를 사용한 적이 있었는데, 인덱스에 2억개의 행이 있었고, 한 테이블에서 다른 테이블로 복사하려고 시도하니 MySQL이 충돌했습니다.

- Regular index(일반 인덱스): 이 인덱스는 동일한 값을 가진 다중 값들을 허용하며 고유 인덱스와 유사하게 관리됩니다.

- Full text index(전체 텍스트 인덱스): 이 인덱스는 문자열 열 내의 하위 문자열을 인덱싱할 수 있습니다. 와일드카드 문자열 검색에 유용합니다.

- Descending indexes(내림차순 인덱스): 이는 일반 인덱스와 동일하지만 정렬 순서가 반대입니다. 이것은 MySQL 8에서 지원되며 새로운 데이터를 먼저 처리하는 데 유용합니다.

## EXPLAIN - The query execution plan, 실행 계획으로 쿼리 성능 최적화하기

MySQL을 다루시는 대부분의 DBA(DataBase Administrator)나 백엔드 개발자분들은 익숙할 것으로 생각되는 명령어입니다.  
MySQL에서 데이터를 찾는 과정을 결과 셋으로 보여주는 명령어인데요.  
이를 통해 Slow Query의 발생 지점을 체크할 수 있고,  
이 결과를 가지고 Index 구성에 대한 고민을 해보며 쿼리 튜닝을 통한 성능 향상을 꾀할 수 있는 중요한 명령어입니다.

```
EXPLAIN [EXTENDED] SELECT ... FROM ... WHERE ...
```

전체 테이블 스캔(full table scan)을 수행하는 경우, 최적화 필요 쿼리!

하나 이상의 테이블을 조인(내부 조인, 왼쪽 조인, 오른쪽 조인 등)할 때,  
조인하는 열에 인덱스가 있는지 확인해야 합니다.  
그렇지 않으면 MySQL은 적절한 조인을 수행하기 위해 전체 테이블 스캔을 해야 합니다.

## EXPLAIN ANALYZE (MySQL 8.0.18 이상 지원)

실행 계획뿐만 아니라 쿼리 수행 시간과 관련된 성능 통계 정보를 함께 제공합니다.  
이를 통해 보다 상세하고 정확한 정보를 알 수 있습니다.

```
EXPLAIN ANALYZE SELECT ... FROM ... WHERE ...
```

- EXPLAIN 명령어 -> 통계정보 테이블을 기반으로 유추하여 결과 반환
- EXPLAIN ANALYZE 명령어 -> 실제 쿼리를 실행하여 결과 반환

## MySQL 데이터베이스를 조정하는 팁

https://kkeolmusae.tistory.com/94

https://seo-explorer.io/blog/five-ways-to-improve-mysql-select-speed-part-1/#Server_and_hardware_selection_for_MySQL_server_database

### innodb_buffer_pool_size

개인적으로 이것은 가장 중요한 MySQL 설정이라고 생각하며, 이 설정은 MySQL이 테이블과 인덱스 데이터를 캐시하는 데 사용하는 메모리 양을 설정합니다. 이 설정은 고정된 크기가 아니며, MySQL은 설정된 크기의 10% 더 많은 메모리를 할당할 수도 있습니다.  
또한 다른 애플리케이션들이 실행되고 있을 수 있으므로, 그들을 위해 메모리를 예약해야 합니다.

### innodb-buffer-pool-instances

버퍼 풀이 나눠지는 인스턴스의 수를 의미하며, 이는 스레드와의 더 나은 동시성을 위해 사용됩니다. 버퍼 풀이 1.3GB 이상인 경우에만 적용됩니다.  
Windows 32비트에서는 기본값이 버퍼 풀 크기를 128MB로 나눈 것입니다. 다른 모든 시스템에서는 기본값이 8입니다.

### join_buffer_size

이 설정은 조인을 생성하는 동안 사용되는 조인 버퍼에 할당할 메모리 양을 MySQL에 지시합니다.
조인 데이터가 너무 큰 경우, MySQL은 하드 드라이브에 임시 테이블을 사용합니다.  
기본값은 256KB이며, 이 값을 높이면 모든 MySQL 스레드의 값을 증가시킬 것입니다.
