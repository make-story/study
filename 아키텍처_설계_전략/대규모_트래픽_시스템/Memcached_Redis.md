`대용량 서버 구축을 위한 Memcached 와 Redis` 책 내용중

사용자가 늘어나면 웹 서버나 DB에서 병목현상이 발생합니다. CPU Load, Memory 사용량, I/O wait, log 수 등을 모니터링 지표로 이용해서 병목 지점을 찾아야 합니다.

- 웹 서버 쪽에 병목현상이 발생하면 어떻게 해야 할까요? 일반적으로 웹 서버는 정보를 요청만 하고, 자신이 따로 데이터를 저장하지는 않습니다.
  즉, Stateless 한 구조입니다. 이런 종류는 단순히 장비만 추가하면 해결할 수 있습니다.

* Stateless 한 구조는 왜 확장하기 편할까?
  Stateful 과 Stateless 라는 두 용어가 있습니다. Stateful 은 웹 서버에 클라이언트가 연결되면, 웹서버에 모든 진행 정보가 들어 있습니다. 이 경우, 어떤 요청을 처리하는 중 웹 서버에 이상이 생기면 해당 클라이언트의 요청이 어디까지 처리됐는지 알 수 없습니다.
  반대로 Stateless 는 웹서버에 어떤 정보도 저장하지 않고, DB 서버나 클라이언트에 해당 진행정보가 모두 들어 있습니다. 이 경우, 웹 서버에 문제가 생겨서 다른 웹 서버에서 요청이 오더라도 현재까지의 진행 상황을 모두 알고 있으므로 문제가 되지 않습니다.

- 성능 향상을 위해서 고민해야 할 것이 'Scale Up'과 'Scale Out' 입니다.
  예를 들어, 기존 서버가 1Ghz CPU와 메모리 2G로 서비스하고 있었다면, Scale Up은 성능을 세 배 높이기 위해서 3Ghz CPU와 메모리 6G를 장착한 장비를 이용해야 합니다. 전체 장비의 수는 같지만, 장비 하나의 성능을 세 배 높인 것입니다.
  Scale Up 은 기존의 아키텍처를 그대로 사용할 수 있어서 돈만 있다면 가장 적용하기 쉬운 모델입니다.
  Scale Out 은 같은 장비를 세 대 사서 서비스에 투입하는 것입니다. 이때는 장비를 투입할 때마다 선형으로 성능이 늘어날 수 있는 아키텍처를 만드는 것이 중요합니다.

- Read가 많으면 Read와 Write를 분리하자
  일반적인 서비스에서 Read/Write 의 비율을 분석해보면 대략 7:3 또는 8:2 정도로 Read 의 비율이 높습니다.
  위 통계에 따르면 전체적인 DB의 부하를 떨어뜨리려고 Read를 분산시키면, DB서버의 부하를 줄일 수 있다는 결론에 이르게 됩니다.
  즉 One Master, Multi Slave 구성으로 Read 와 Write 를 다른 DB 서버로 분리하면 성능을 향상시킬 수 있습니다.
  Read 성능이 필요할 때마다 Read 용 DB를 추가함으로써 DB서버의 Read 의 부하를 낮추고 마스터 DB의 전체 부하를 줄일 수 있습니다.

* 슬레이브 DB 서버 수는 최소 몇 대가 되어야 할까요?
  멀티 슬레이브(Multi slave)를 이용해서 Read를 분리하려면 DB 서버는 최소한 몇 대가 있어야 할까?
  기본적으로 네 대가 필요합니다. 당연히 한 대는 Write를 처리할 마스터 DB고, 나머지는 Read를 분리하는 슬레이브 DB입니다.
  왜 슬레이브가 세 대나 필요할까요?
  장애 처리를 해야 하므로 세 대가 필요합니다. 슬레이브에 장애가 발생했을 때 리부팅으로 해당 장비의 장애를 해결할 수도 있지만, 최악의 경우에는 디스크가 깨지거나 장비를 변경해야 합니다. 이때 DB 서버가 세 대 미만이면 한 대에 장애가 발생하고 한 대만 서비스되는 상황이므로 새로운 장비를 셋팅할 때 데이터를 복구할 수 있는 서버가 없습니다(서비스 중인 DB에서 복사하면 부하가 가중됩니다). 그러므로 최소한 슬레이브가 세 대 있어야 한 대에 장애가 발생하면 다른 한 대로 서비스를 하고, 남은 한 대를 이용해서 복구할 수 있습니다.

* Read를 분리하는 것은 성능을 향상시키는 데 도움이 되지만, 항상 적용할 수 있는 것은 아닙니다.
  특히 데이터의 일관성(Consistency)이 중요한 경우에 문제가 발생할 수 있습니다.

- Write가 증가하면 파티셔닝하자
  장비 하나의 I/O성능은 정해져 있습니다.
  I/O의 총 성능 = Read 성능 + Write 성능
  전체적인 Request가 증가해 Write가 늘어나게 되면, 슬레이브 장비들은 해당 Write를 리플리케이션 받기 위해서 일정 수 이상의 Write를 항상 처리해야 합니다. 그로 인해 Read를 분리하더라도 성능의 증가 폭은 점점 줄어듭니다.
  한정된 I/O를 Write가 대부분 처리해서, 결국 Read의 성능도 줄어듭니다. 이럴 경우에는 전체적인 Write를 줄이는 파티셔닝(partitioning)해야 합니다.

* 수직분할과 수평분할
  데이터베이스의 파티셔닝에는 크게 두 가지 개념, 수직 분할(Vertical Partitioning)과 수평 분할(Horizontal Partitioning)이 있습니다.
  Vertical과 Horizontal 은 DB의 Column 을 기준으로 설명하는 단어입니다. 즉, 수직 분할이라는 것은 테이블의 Column 에 A, B가 있다면 A는 A1 서버, B는 B1 서버 등으로 파티션하는 방법입니다. 수평 분할은 하나의 테이블에 있는 데이터를 특정 Row는 A1 서버 다른 Row는 B1 서버 등으로 나누는 것입니다. 흔히 말하는 Sharding이라는 것이 수평분할을 의미합니다.
  간단하게 정리하면 테이블 스키마가 같으면 수평분할, 스키마가 서로 다르면 수직 분할이라고 할 수 있습니다.

파티셔닝하면 '전체 request/N(파티션 수)'부하가 감소하는 효과가 발생합니다. 규모가 어느 정도 이상이 되면, 적당한 파티셔닝을 통해서 전체적인 Request를 제어합니다.

파티셔닝하면 성능은 향상되지만, 파티션이 늘어날수록 관리 포인트도 늘어납니다. 이에 따라 장비도 늘어나면서 비용도 증가하게 됩니다.
결국 파티셔닝의 규모나 시기는 서비스의 부하를 보고 적절히 결정할 수밖에 없습니다.

- 분산 캐시를 구현하는 핵심기술: Consistent Hashing
  캐시를 사용하면 각 단계의 이동 속도를 늦출 수 있습니다. 간단하게 말하면 더 적은 장비나 비용으로 더 효과적으로 성능을 낼 수 있습니다.
  캐시는 '이미 요청됐거나, 나중에 요청될 결과를 미리 저장해 두었다가 이를 빠르게 서비스해 주는 것'을 의미합니다.
  일반적으로 캐시는 디스크의 접근이 아닌 메모리의 접근을 의미합니다. 메모리에 접근하는 것이 디스크에 접근하는 것보다 훨씬 빠르기 때문입니다.

Consistent Hashing은 MIT의 David Karger 라는 사람이 웹 서버 수가 변화하는 상황에서 분산 리퀘스트(Request)를 처리하려고 고안했습니다.
Consistent Hashing은 서버의 수, 즉 슬롯의 개수가 변하더라도 전체 데이터를 재분배할 필요가 없고 K/N개의 아이템만 재분배합니다.
