# Node.js 프로세스 관리 도구

https://engineering.linecorp.com/ko/blog/pm2-nodejs

Node.js는 기본적으로 싱글 스레드(thread)라는 점입니다.  
Node.js 애플리케이션은 단일 CPU 코어에서 실행되기 때문에 CPU의 멀티코어 시스템은 사용할 수 없습니다.  
만약 보유하고 있는 서버의 사양이 8코어이며 하이퍼스레딩을 지원한다면 최대 16개 코어를 사용 할 수 있는데요.  
모든 코어를 사용해 최대 성능을 내지 못하고 오직 한 개의 코어만 사용해야 한다면 주어진 자원을 제대로 활용하지 못하는 꼴이 됩니다.

Node.js는 이런 문제를 해결하기 위해 클러스터(Cluster) 모듈을 통해 단일 프로세스를 멀티 프로세스(Worker)로 늘릴 수 있는 방법을 제공합니다.  
그렇다면 우리는 클러스터 모듈을 사용해서 마스터 프로세스에서 CPU 코어 수만큼 워커 프로세스를 생성해서 모든 코어를 사용하게끔 개발하면 됩니다.

애플리케이션을 실행하면 처음에는 마스터 프로세스만 생성되는데요.  
이때 CPU 개수만큼 워커 프로세스를 생성하고 마스터 프로세스와 워커 프로세스가 각각 수행해야 할 일들을 정리해서 구현하면 됩니다.

예를 들어

- 워커 프로세스가 생성됐을 때 온라인 이벤트가 마스터 프로세스로 전달되면 어떻게 처리할지,
- 워커 프로세스가 메모리 제한선에 도달하거나 예상치 못한 오류로 종료되면서 종료(exit) 이벤트를 전달할 땐 어떻게 처리할지,
- 그리고 애플리케이션의 변경을 반영하기 위해 재시작해야 할 때 어떤 식으로 재시작을 처리할 지 등등 고민할 게 많습니다.

이런 것들은 직접 개발하기에 번거로운 작업입니다.  
따라서 이런 문제를 간편하게 해결할 수 있는 무언가가 있으면 좋겠다고 생각할 수 있는데요.  
다행히 이런 고민이 녹아있는 PM2라는 Node.js의 프로세스 매니저가 존재합니다.

## 하이퍼스레딩

https://ko.wikipedia.org/wiki/%ED%95%98%EC%9D%B4%ED%8D%BC%EC%8A%A4%EB%A0%88%EB%94%A9

## forever / nodemon / pm2 / supervisor / docker / systemd

https://npmtrends.com/forever-vs-nodemon-vs-pm2-vs-supervisor

https://pixeljets.com/blog/using-supervisorctl-for-node-processes-common-gotchas/

유성민 생각

- nodemon 은 로컬환경 사용 권장
- pm2 는 운영환경에서 로드벨런싱, 클러스터링, 무중단 재시작 활용
- nodemon 은 로컬환경, supervisor 은 운영환경도 추천
