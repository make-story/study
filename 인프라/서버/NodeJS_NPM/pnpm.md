# pnpm

https://pnpm.io/ko/

## Yarn Berry 에서 pnpm 으로

https://engineering.ab180.co/stories/yarn-to-pnpm

npm v9.4부터 pnpm 방식의 Isolated node_modules를 지원하는 기능이 추가  
https://twitter.com/ZoltanKochan/status/1621190036078067712

## pnpm 의 기본적인 모듈 설치 과정

https://jeonghwan-kim.github.io/2023/10/20/pnpm

pnpm은 스토어에 패키지를 다운로드하고 각 프로젝트에서 하드 링크로 가져다 사용한다.  
하드 링크는 소프트 링크와 달리 inode 값이 같다.  
파일을 다시 만들지 않고 같은 inode를 가리키기 때문에 하드 링크를 여러 개 만들더라도 디스크 용량을 더 차지하지 않는다.  
pnpm 스토어에 원본 패키지를 유지한 채 각 프로젝트 폴더에서 이를 하드 링크로 구성하기 때문에 용량의 변화가 없다.

pnpm은 두 가지 측면에서 지금의 npm보다 성능이 좋다.

- 디스크 용량을 적게 사용한다. 패키지를 한 번만 다운로드해 놓은 저장소를 관리하면서 각 사용처에서는 하드 링크로 연결해서 사용한다.
- 평탄하지 않은 node_modules 폴더를 유지하면서 발생할수 있는 문제를 해결한다. 연관된 패키지만 묶기 때문에 관련 없는 패키지지로의 접근을 차단할 수 있다. 평탄 작업을 위한 복잡한 작업도 필요없다. 모든 패키지를 일관적인 폴더 구조로 유지할 수 있다.

## Node.js 버전관리

https://news.hada.io/topic?id=14788

- NPM이나 Yarn의 대안으로 여겨지지만, Node.js 버전도 관리할 수 있음
- 크로스 플랫폼이며, 모든 플랫폼에서 동일한 Node.js 버전 관리 경험을 제공함
- Node 버전 관리가 핵심 기능이 아니므로, NPM이나 Yarn과 함께 사용하기 어려움
- PNPM으로 설치한 Node.js는 Corepack이 포함되지 않음
- Node.js 버전을 전역으로만 관리할 수 있으며, 쉘마다 설정할 수 없음
- 프로젝트 간 이동 시 Node.js 버전을 동적으로 전환하지 않으므로, 직접 추적해야 함

## pnpm 모노레포

https://pnpm.io/ko/next/workspaces