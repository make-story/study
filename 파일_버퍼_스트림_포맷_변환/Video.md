# 라이브, 스트리밍, 동영성(비디오, Video)

https://codediary21.tistory.com/85

# HLS

# 저지연 스트리밍

https://patents.google.com/patent/KR101803621B1/ko

---

# 스트리밍 프로토콜의 작동 방식

스트리밍 프로토콜은 웹에 멀티미디어를 전달하기 위한 방법들입니다.
즉 데이터가 전송할 때 생기는 오류를 처리를 하는 방식을 규정하는 일종의 프로토콜입니다.

## 1. 스트리밍 프로토콜은 코덱과 다르다.

코덱은 데이터를 인코딩을 통해 파일 크기를 작게 만들고 디코딩을 통해 본래의 비디오를 재생하는 것으로 기존에 데이터를 압축해서 스트리밍을 한다.  
스트리밍과 코덱의 차이점을 옷으로 표현한다면 서버를 판매자라고 생각하고 표현하자면 아래의 내용과 같습니다.

스트리밍 코덱은 공간을 절약하기 위해 옷을 묶어서 압축하는 기계와 같습니다.  
container format은 이러한 옷묶음이 내부에 포장되는 화물차같은 것 입니다.  
스트리밍 프로토콜은 이러한 화물차가 목적지까지 전달하기 위한 배송 전달 방법과 같은 것입니다.

## 2. 스트리밍 프로토콜에 대한 이해

대부분의 비디오파일은 스트리밍용으로 설계되지 않았기기 때문에 비디오를 스트리밍을 하려면 스트리밍을 할 수 있도록 파일을 변환해야한다.  
그렇기 때문에 스트리밍하기 쉽도록 한개의 파일을 작은 파트로 나누고 그러한 청크를 순차적으로 송신하고 수신이 되는 대로 재생을 하는 것이다.

## 3. 스트리밍 프로토콜의 종류

### HLS 프로토콜

HTTP Live Streaming 프로토콜이라 하고 HTS 프로토콜이라고도 불리웁니다.
Flash 가 사라지게 되면서 HLS는 가장 많이 사용되는 스트리밍 프로토콜이 되었는데
그 이유는 데스크톱 브라우저, 스마트 TV, 안드로이드 및 IOS등 다양한 환경에서 모두 HLS를 지원하며
HTML5 비디오 태그에서도 HLS 스트리밍을 지원하기 때문에 많은 사용자에게 스트리밍 서비스를 제공할 수 있기때문입니다.  
하지만 지연 시간이 상대적으로 높을 수 있다는 점이 단점입니다.

장점

- 높은 호환성: HLS는 HTML5 비디오 플레이어와 호환해서 HLS 프로토콜은 거의 모든 인터넷을 지원하는 장치에 스트리밍 하는데 있어서 적합합니다.
- 보안: HLS는 보안 스트리밍으로 유명합니다. (그 이유는 나중에 조사해서 정리하겠습니다.)
- 고품질: HLS는 가변 비트레이트 스트리밍 기술 덕분에 고화질 비디오 스트리밍을 제공합니다.

단점

- 높은 지연 시간: HLS는 다른 스트리밍 프로토콜에 비해 상대적으로 높은 지연 시간을 기다리게 됩니다.
- HLS를 사용하는 스트리밍 프로토콜을 사용하는 서버는 영상 데이터 전송 뿐만 아니라 동영상 파일을 읽고 변형키켜야하는 기능도 갖춰야 하기 때문에 도입비용이 높습니다.
- HTTP는 서로 다른 네트워크를 통해 데이터를 교환하기 때문에 방화벽이나 NAT을 사용하는 환경에서는 서비스가 원활하지 않다.

### RTMP(Real Time Message Protocol)

어도비사에서 개발한 프로토콜로 지연 시간이 매우 짦은 스트리밍을 제공하는 프로토콜이다.  
Flash 플레이어에서 지원하는 프로토콜이기 때문에 HTML5 플레이어와 호환하지 않습니다.  
이것을 웹으로 사용하려면 다른 프로토콜로 인코딩을 해줘야 하기때문에 예전 처럼 유저들이 사용하는 비디오 스트리밍에 사용 잘 되지 않습니다.

장점

- 짧은 지연 시간: 인터넷 연결이 불안정 하더라도 안정적은 비디오 스트림을 유지 할 수 있습니다. 인터넷이 불안정한 상태에서 동영상을 볼 때 지연이 줄어들고 안정화되면 다시 스트리밍을 빠르게 재생을 할 수 있습니다.
- 적응 가능: 시청자가 한 방향으로 피드를 시청하는데 고정되어 있지 않아 적응성을 통해 피드 일부를 건너 뛰고 되감아지거나 시작이 되면 실시간 스트리밍을 참여할 수 있다.
- 유연성: MP3, AAC 오디오 스트리밍 또는 MP4, FLV 및 F4V 비디오 스트리밍과 같은 다양한 채널을 변경할 수 있다.

단점

- HTML5에서 지원하지 않음: Flash 플레이어에 보안 및 전력 이슈로 인해 지원이 종료 되었고 HLS와 같은 변환해주는 기능이 없기 때문에 재생할 수 없다.
- 대역폭 문제: RTMP는 낮은 대역폭 문제에 취약해서 이로 인해 스트리밍이 자주 중단될 수도 있다.
- HTTP 비호환: RTMP를 사용하려면 Flash Media Server과 같은 특수 서버에 연결하고 타사 CDN을 사용해야 한다.

### WebRTC(Web Real-Time Communication)

실시간 컴퓨팅으로 스트리밍을 할 수 있는 오픈 소스 프로젝트입니다.  
Google의 구글 미팅 서비스를 사용하기 위해 구글에서 구매해서 사용중인 프로젝트입니다. (프로토콜 X)

WebRTC는 실시간 컴퓨팅을 사용하는 프로젝트에 관련된 설정을 많이 지원하기 때문에 다수와 스트리밍을 하는 서비스에 적합합니다.  
대표적으로 스냅샷, 페이스북, whatsApp의 화상 채팅을 지원한다.

장점

- 오픈 소스: 오픈 소스 프로젝트이므로 특정 스트리밍 요구 사항에 맞게 설정을 할 수 있습니다.
- 실시간 컴퓨팅: 동영상이 거의 실시간으로 시청자의 화면으로 전송이 된다.

단점

- 미래 지향적: 스트리밍 기술이 아직 WebRTC를 완전히 따라잡지 못해서 호환성등의 문제가 있습니다.

### SRT(Secure Reliable Transport)

온라인 스트리밍 업계의 선두 주자인 Haivision 새로운 스트리밍 프로토콜로 이 오픈소스 프로토콜은 뛰어난 보안, 안정성, 호환성 및 저 지연 스트리밍 기능으로 유명하다.  
하지만 다른 하드웨어와 소프트웨어에서 이 프로토콜을 지원하도록 개발 되지 않아서 사용하는데 있어서 제한이 있음.

장점

- 보안: 최고의 보안과 개인 정보를 보호해주는 툴을 포함하고 있기 때문에 방송사에서 스트리밍을 하는데 안전하게 유지할 수 있음
- 호환성: 장치 및 운영체제의 구애 받지 않기 때문에 대부분의 인터넷 지원을 하는 장치에 스트리밍을 전달합니다.
- 짧은 지연 로딩: 오류 수정 기술을 사용하여 짧은 지연 로딩 스트리밍을 사용하는데 편이함.

단점

- 아직 널리 지원되지 않음: WebRTC와 같이 스트리밍 업계에서 이 프로토콜이 따라잡아야 원활한 사용을 할 수 있다.

### RTSP(Real-Time Streming Protocol)

엔터테인먼트 및 통신시스템에서 스트리밍 미디어 서버를 제어하기 위해 개발 되었습니다.  
2016년에 RTSP 2.0을 사용하게 됨으로 엔드포인트 간의 미디어세션을 설정하고 제어하기 위한 프로토콜로 알려져 있다.

어떻게 보면 HLS와 유사한 면이 있는데 라이브 스트리밍 데이터를 전송하는건 RTSP가 자체적으로 하는 것이 아니라  
RTP(Real-Time-Transfer-Protocol)와 RTCP(real time transfer control protocol)과 함께 작동하면서 스트리밍을 지원한다.

RTSP는 짧은 스트리밍을 지원하도록 설계 되어서 보안 카메라, IOT장치 및 모바일 SDK와 같은 스트리밍에 사용한다.

장점

- 분할 스트리밍: 시청자가 보기 전에 비디오를 다운로드하기 전에 RTSP 스트림을 사용하면 다운로드 되기전에 콘텐츠 시청 가능하다.
- 사용자 정의: TCP 및 UDP와 같은 프로토콜을 사용하여 고유한 비디오 스트리밍 프로그램을 만들 수 있다.

단점

- 다른 스트리밍 프로토콜에 비교하면 덜 유명해서 대부분의 비디오 플레이어 및 스트리밍 서비스가 지원하지 않음
- HTTP 비호환: RTMP와 마찬가지로 직접 스트리밍은 불가능하기 때문에 RTSP를 스트리밍 웹 서비스를 하는데 어려움이 있고 보통 기업내 보안 시스템 및 사설 네트워크 비디오 스트리밍을 하도록 설계되었다.

### HTTP(MPEG-DASH)를 통한 동적 적응 스트리밍

가변 비트레이트 스트리밍 기술을 사용하여 높은 품질의 비디오를 제공할 수 있고 이것은 초단위로 변경이 되는데 MPEG-DASH는 이것을 따라갈 수 있고 전달 및 압축과 관련된 오래된 기술 이슈를 해결했습니다.  
코덱의 구애받지 않기 때문에 거의 모든 스트리밍 인코딩 형식의 사용될 수 있습니다.

브라우저 기반 DRM(디지털 권한 관리)을 위한 표준 기반 API인 EME(암호화된 미디어 확장) 및 MSE(미디어 소스 확장)를 지원합니다.

장점

- 적응형: DASH는 실시간으로 가변 비트레이트 스트리밍을 지원함으로 다양한 인터넷 속도를 가진 사용자에게 고품질의 서비스를 제공하는데 적합하다.
- 오픈 소스: 오픈 소스이기 때문에 사용자 요구에 맞게 변경해서 사용할 수 있다.

단점

- 제한된 지원: Apple과 IOS와 호환되지 않기 때문에 제한된 서비스를 지원할 수밖에 없다.
- 미래 전망: DASH가 선호하는 미래적 지향 기술에 대한 희망이 있었지만 점점 희박해지고 있습니다.
