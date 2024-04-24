# Domain Driven Design, DDD

https://martinfowler.com/bliki/DomainDrivenDesign.html

https://en.wikipedia.org/wiki/Domain-driven_design

https://steemit.com/kr/@frontalnh/domain-driven-design

도메인의 사전적 의미는 "정보와 활동의 영역" 을 말하며,  
흔히 프로그래머들에게는 어플리케이션 내의 로직들이 관여하는 정보와 활동의 영역이라고 받아들여집니다.
가령, `어떤 웹 서비스를 만들 때 회원을 가입하고, 회원을 탈퇴하는 일련의 작업은 "회원" 과 관련된 일련의 작업들이며 여기서 "회원" 이라는 도메인이 있다`고 볼 수 있습니다.

또 다른 용어로써 "domain layer" 와 "domain login" 이라는 용어가 있습니다.  
이는 개발자들에게 일종의 "business logic" 과 동등한 것으로 받아들여져 왔습니다.  
이러한 business login 은 비즈니스 주체들(가령 회원, 결제 등) 이 어떤 모델링 된 데이터를 생성하거나 변경하기 위해 서로간에 약속한 높은 수준의 규칙들을 의미합니다.

---

https://incheol-jung.gitbook.io/docs/q-and-a/architecture/ddd

도메인?  
`일반적인 요구사항, 소프트웨어로 해결하고자 하는 문제 영역`

---

# 카카오 DDD

TDD vs BDD vs DDD

https://kakaoentertainment-tech.tistory.com/95

- 자동화된 테스트와 반복적인 설계 수정을 중점으로 수행하는 TDD
- 비즈니스와의 협업과 자동화된 테스트를 중점으로 수행하는 BDD
- 반복적인 설계 수정을 기반으로 비즈니스와의 협업을 중심으로 하는 DDD

DDD?  
각각의 기능적인 문제 영역들을 도메인이라고 정의하고, 그렇게 정의된 도메인에 대한 로직을 중심으로 설계하는 것을 말합니다.

https://tech.kakao.com/2022/12/12/ddd-of-recommender-team/

`https://brunch.co.kr/@cg4jins/7`

유지보수가 쉬운 시스템이 갖추어야 할 요소 중에서 가장 중요한 2가지는 바로 Loosed Coupling 과 High Cohesion 입니다.  
Loosed Coupling 은 모듈 간의 연관관계가 interface 로 되어 있어서 느슨해야 한다는 것이고  
`High Cohesion 은 어떤 목적을 위해 연관된 기능들이 모여서 구현되어 있고 지나치게 많은 일을 하지 않는 것`을 말합니다.  
카카오헤어샵 프로젝트는 Loosed Coupling 과 High Cohesion 을 갖기 위해 DDD(Domain Driven Design)의 몇 가지 원칙을 적용했습니다.

# 컬리 DDD

https://helloworld.kurly.com/blog/road-to-ddd/

`https://helloworld.kurly.com/blog/ddd-msa-service-development/`

DDD를 한다는 것은 "도메인 중심으로 사고"한다는 것이고,  
이는 결국 문제 해결을 위해 "모든 수단과 방법을 제대로" 고려하는 것입니다.  
이런 사고는 자연스럽게 클린 코드, 소프트웨어, 아키텍처를 고려하는 질문의 연쇄를 불러오게 됩니다.

DDD(Domain-Driven Development )는 2003년 에릭 에반스가 Domain-Driven Design 이라는 책을 처음 출간하면서 소개한 개발 방법론으로,  
"훌륭한 소프트웨어를 개발하고 싶다면 서비스 도메인에 귀를 기울여라"라는 슬로건으로부터 시작되었고,  
현재는 서비스 개발에 가장 큰 주류를 이루고 있는 개발 방법입니다.

오늘날 가장 보편화된 시스템 아키텍처인 MSA(Micro Service Architecture)를 구현하는 필수 개념들은 DDD로부터 왔는데,  
DDD 에서 좋은 서비스를 개발하기 위한 핵심 기본 요소인 Loose Coupling(느슨한 결합)과 High Cohesion(높은 응집)은 MSA를 설계할 때 꼭 기억해야 할 설계 원칙입니다.

`DDD의 주요 설계 원칙: Loose Coupling(느슨한 결합)과 High Cohesion(높은 응집)`

그럼 무엇을 Loose Coupling하고 무엇을 High Cohesion 해야 할까요? 바로 도메인입니다.  
도메인들 간에는 Loose Coupling하고 도메인 내에서는 High Cohesion 해야 합니다.  
도메인은 소프트웨어로 해결하고자 하는 문제의 영역, 즉 개발하고자 하는 전체 서비스를 잘라낸 단위를 가리키는데요, 도메인을 잘못 나누면 DDD나 MSA 입장에서는 많은 혼란이 가중됩니다.  
왜냐하면, Loose Coupling 해야 하는 연동 인터페이스를 High Cohesion 하게 되어 시스템 복잡도를 높이거나, High Cohesion 해야 할 서비스들 간을 Loose Coupling 해서 예상하지 못한 시스템 문제를 야기할 수 있기 때문입니다.

따라서, 도메인을 잘게 나누는 것, 즉 Loose Coupling 시키는 것만이 능사가 아니라, 어떤 서비스들을 하나의 도메인으로 잘 묶어서 High Cohesion 하게 할지 설계하는 것까지가 DDD나 MSA가 추구하는 지향점이 되어야 합니다.  
즉, 도메인을 Loose Coupling과 High Cohesion 관점에서 잘 나누는 것이 DDD와 MSA에서 가장 중요하다 할 수 있습니다.  
비즈니스 문제를 잘 투영한 서비스 도메인을 잘 나누는 것에서부터 시작하며, 각 도메인 서비스들이 Loose Coupling과 High Cohesion 각각을 지원할 수 있는 기술적 또는 아키텍처적 설계 원칙을 준수하는 것이 좋은 서비스 시스템을 개발하는 기본 원칙입니다.
