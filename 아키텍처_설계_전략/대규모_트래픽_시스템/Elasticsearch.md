# 앨라스틱서치 (Elasticsearch)

https://velog.io/@shinychan95/Elasticsearch-%EA%B8%B0%EB%B3%B8-%EA%B0%9C%EB%85%90-%EB%B0%8F-%ED%8A%B9%EC%A7%95-%EC%A0%95%EB%A6%AC

- Elasticsearch - 데이터를 저장하고 쿼리를 하고 검색을 하고 분석을 하는 모든 처리 담당
- Kibana - 시각화 및 분석을 위한 클라이언트 도구
- Beats, Logstash - 데이터 수집 도구
  - Logstach - 다양한 데이터시스템들로부터 데이터를 수집하고 다시 전송할 수 있는 ETL 도구. 모든 데이터 소스가 있는 장비에 설치하여야 한다.
  - Beats - 위 모든 장비에 설치해야 하는 점을 극복한 제품. 로그 데이터 전달. 중앙화하기 위한 프로그램

## 설치

https://www.elastic.co/guide/en/elasticsearch/reference/current/docker.html

## ELK

ES (Elastic Search)
방대한 양의 데이터를 신속하게, 거의 실시간(NRT, Near Real Time)으로 저장, 검색, 분석할 수 있다.

엘라스틱서치는 검색을 위해 단독으로 사용될 수 있고  
`ELK(Elasticsearch/Logstash/Kibana) 스택`으로 사용되기도 한다.

- Elasticsearch
  logstash로부터 받은 데이터를 검색 및 집계하여 필요하거나 관심 있는 정보 획득
- Logstash
  다양한 소스(db, csv 등)의 로그 또는 트랜잭션 데이터를 수집, 집계, 파싱하여 elasticsearch로 전달
- Kibana
  elasticsearch의 빠른 검새을 통해 데이터를 시각화 및 모니터링

## ES 대안

https://velog.io/@ewoo97/ELK-%EA%B0%9C%EB%85%90-%EB%B0%8F-%EC%84%A4%EC%B9%98-%EB%B0%A9%EB%B2%95-%EC%B4%9D%EC%A0%95%EB%A6%AC

MYSQL FullText Search + N gram

데이터가 크지 않다면 mysql FullText Search로도 충분히 검색 속도를 높일 수 있다.
(elastic search는 추가적으로 인프라를 구축해야 하기 때문)
MySQL을 사용하면 항상 데이터를 인덱싱하고 검색할 수 있다.
ElasticSearch를 사용하면 하나의 단위로 색인화하는 데 더 많은 유연성이 있다.
ElasticSearch가 MySQl 검색과 가장 큰 차이점은 인덱싱을 통해 많은 양의 데이터가 있을 때 ES가 더 빠르게 작동한다는 것이다. 적은 양의 데이터의 경우 차이를 느끼지 못할 것이다.

MySQL Full-Text 검색

MySQL의 Full-Text 검색은 MySQL 데이터베이스 내에 내장된 검색 기능이다.
이 기능은 특정 테이블의 컬럼에서 텍스트 데이터를 검색할 때 사용할 수 있으며,
인덱스를 구축하여 검색 성능을 향상시킨다.

장점

별도의 검색 엔진을 설치하고 구성할 필요가 없어 구현이 간단하다.
MySQL 환경 내에서 모든 작업이 이루어지므로, 별도의 시스템 간 동기화가 필요 없다.
SQL 쿼리를 사용하여 검색을 수행할 수 있으며, 검색 조건을 SQL 문법으로 표현할 수 있다.

단점

검색 기능이 비교적 기본적이며,
Elasticsearch와 같은 전문 검색 엔진에 비해 검색 옵션이 제한적이다.
대규모 데이터셋에 대한 검색 성능이 Elasticsearch보다 떨어질 수 있다.
텍스트 분석 기능(예: 자동 언어 감지, 동의어 처리)이 제한적이다.

사용 사례

간단한 텍스트 검색 요구 사항을 가진 소규모에서 중규모 애플리케이션
검색 기능이 애플리케이션의 주 기능이 아닌 경우.
