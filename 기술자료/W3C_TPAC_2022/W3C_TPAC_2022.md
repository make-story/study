
# W3C 웹표준 회의
W3C 핵심 멤버들이 모여서 회의하는 모임. 연 1회, 약 400명
향후 웹의 방향, 현재 웹의 문제점을 논의
W3C 그룹별(워킹그룹) 회의진행 (다른 그룹과의 회의도 진행됨)
예를 들어, HTTP3 표준화에 대한 논의(아이디어, 합의 등)

1. 웹 페이먼트
생체인식 추가됨 (웹 브라우저에서 얼굴인식이 된다는 것, 구글 크롬은 지원)
웹페이먼트는 중요한 것중 하나, 대부분 결제는 서비스에서 중요한 역할

2. Developing more APIs
Progressive Programmers (충분한 웹 APIs 지원을 위한 노력)
웹 API 지원이 부족하다. 네이티브앱에 비해 웹이 기본 제공해주는 API가 부족하다.
디바이스를 제어하거나 정보를 가져올 수 있는 API를 추가하는 것 

몇몇 API 스팩 소개 (아시는 것 처럼, 구글 Fugu 프로젝트에서 정말 많은 API 논의 진행중)
Image Resource 스팩 : 서비스워커 등 이미지를 컨트롤 할 수 없는 영역에서 제어 가능하도록 추가
Pointer Lock API : 마우스 포인터를 숨김. 마우스는 안보이나 정보(위치 등)는 읽을 수 있음
Device Posture API : 삼성 폴더블폰(삼성에서 주도), 디바이스 변경에 따른 처리 (CSS 미디어쿼리 : device-posture 추가될 예정)

3. Web Advertising
최근의 웹에서 광고는 문제가 되고 있다. (쿠키사용 제한)
디지털 광고시장은 매년 성장하고 있으며, 쿠키(프라이버시) 이슈도 계속 커짐
크롬 브라우저 2023년에 제 3자 쿠키 지원 종료 예정

브라우저 fingerprinting (핑거프링팅 구글 검색해보면 내용 나온다)

관련된 워킹 그룹만 4개가 존재한다. (구글, 애플, 페이스북 등 대부분 기업이 들어와 있으며, 광고를 주수입으로 하는 업체 대부분 들어와 있음)

4. DIDs and VCs
VC : Verifiable Credentials
DID : Decentralized Identifiers

DID 웹표준 승인됨 (메이저 기업 대부분이 반대했지만, W3C 의장이 표준 선포)
운전면허(증명서)나 인증기반 API VC 표준(현재 2.0 버전 개발중)
VC는 많은 곳에서 사용될 것으로 예정

5. Data on the Web
W3C가 계속 노력했던 것 중 하나가 시맨틱 데이터 검증 및 확장
정보(데이터)를 잘 구조화해서 활용하자 (블록체인 활용 워킹그룹도 존재)
(시멘틱이라고 말한 것은 태그가 아닌 데이터 관점을 말함)
예를 들어, Automotive Working Group 처럼 자동차에서 발생되는 엄청난 데이터를 구조화하여 관리/재사용

6. Immersive Web
WebXR
모든 디바이스에서 WebXR이 실행(사용) 가능 하도록 함
사용자가 느낄 수 있는 Immersive Web 의 UX 는 달라짐

——

# 웹 오디오 API와 디바이스 API, Fugu 프로젝트 소개
Web 에서 디바이스를 통제하는게 과연 좋은 방향인가? 대부분 의문점을 가지고 있음
크로미움을 제외한 브라우저 개발팀 간의 의견 충돌로 표준화 작업 난항

웹 오디오 API를 활용한 사이트 중 하나
https://wavacity.com/
개인이 혼자 만들었음

# 프로젝트 Fugu
파일저장시스템, PWA, 설치가능 웹앱, 윈도우 관련 기능 등
기존의 웹의 통념을 깨고 플랫폼의 경쟁력 향상

https://developer.chrome.com/ko/blog/fugu-status/
https://fugu-tracker.web.app/#shipped
https://developer.chrome.com/blog/fugu-showcase/




