# 레디스 (Redis)

`study.git/아키텍처_설계_전략/대규모_트래픽_시스템/동시성_제어.md` 참고!

`Redis는 데이터베이스, 캐시 또는 메시지 브로커로 사용`

Redis는 데이터베이스, 캐시 또는 메시지 브로커로 사용할 수 있는 오픈 소스 메모리 내 데이터 저장소입니다. Redis는 C로 작성되었으며 Node.js를 포함한 여러 프로그래밍 언어를 지원합니다.

Redis는 키-값 저장소입니다. 즉, 키-값 쌍의 형태로 데이터를 저장합니다. 키를 사용하여 값을 검색할 수 있습니다. Redis는 문자열, 목록, 세트 및 해시를 포함한 다양한 데이터 유형을 지원합니다.

## 레디스 구성

https://devocean.sk.com/blog/techBoardDetail.do?ID=165057

https://devocean.sk.com/blog/techBoardDetail.do?ID=165603

레디스는 구성에 따라 단일모드, Master-Slave 복제모드, Cluster 모드로 구분할 수 있습니다.

간단한 설치 및 개발에는 단일모드로 사용하고 읽기 성능 확장이 필요할 때는 Master-Slave 복제모드, 대규모 데이터를 운용하기 위한 Cluster 모드입니다.
