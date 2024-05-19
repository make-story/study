# 패키지 관리자 (NPM, Yarn, PNPM 차이)

## NPM / Yarn

https://www.geeksforgeeks.org/difference-between-npm-and-yarn/

https://velog.io/@kysung95/%EA%B0%9C%EB%B0%9C%EC%83%81%EC%8B%9D-npm%EA%B3%BC-yarn

- Fetching packages
  - npm
    npm 은 모든 npm install 명렁을 통해 npm 레지스트리에서 종속성을 가져온다.
  - yarn
    yarn은 종속성을 로컬에 저장하고 yarn add 명령을 통해 디스크에서 가져온다.
    종속성이 로컬에 있다고 가정한다.

### Workspaces

Yarn 에서 Workspaces 먼저 추가된 후 NPM 에도 추가됨

npm v7 이 정식으로 나오면서 모노레포를 지원!

### 속도(perfomance)

yarn 은 다운받은 패키지 데이터를 캐시(cache)에 저장하여,  
중복된 데이터는 다운로드하지않고,  
캐시에 저장된 파일을 활용함으로써 이론적으로 npm에 비해 패키지 설치속도가 매우 빠릅니다.  
또한 여러개의 패키지를 설치할 때 병렬로 처리하기 때문에 performance와 speed가 증가 됩니다. (npm 은 순차적)

npm 개선!  
npm 5.0 버전은 그 아래 버전들보다 5배는 더 빠르다고 npm 개발자들이 언급  
그리고 그 이후 npm V6.10.1과 yarn V1.17.3 으로 install 속도 실험을 하였는데, yarn 이 승리하였지만 그 차이는 아주 근소한 차이

### 안정성(stability)

npm 대비 Yarn 의 큰 장점은 yarn.lock 파일을 통해 패키지 버전 잠금을 지원하는 것으로  
이를 통해 프로젝트에서 의존하는 모든 패키지를 어느 환경에서든 항상 동일한 버전으로 설치할 수 있게 만들어주었다.

package-lock 파일 등장하게된 계기  
`study.git/인프라/서버/NodeJS_NPM/NPM_package-lock.json.md` 참고!

## 보안성(security)

npm은 패키지가 설치될 때 자동으로 코드와 의존성을 실행할 수 있도록 허용했습니다.  
(npm은 자동으로 패키지에 포함된 다른 패키지 코드를 실행)  
이 특징은 편리한 기능이지만 안정성을 위협할 수 있습니다.  
특히나 보장된 정책 없이 등록한 패키지가 존재할 수 있다는 점에서 더욱 위험도가 높습니다.
반면 yarn 은 yarn.lock 이나 package.json 으로 부터 설치만 하며,  
yarn.lock 은 모든 디바이스에 같은 패키지를 설치하는 것을 보장하기 때문에 버전의 차이로 인해 생기는 버그를 방지해줄 수 있습니다.

하지만!!  
최근 npm 의 업데이트에서 npm 의 보안 업데이트도 크게 향상되었습니다.

### 결론

yarn 의 병렬적 패키지 설치로 인한 가벼움,  
또한 yarn.lock 의 버전의 차이로 인한 버그 방지 등의 기능은 yarn이 npm 보다 더 좋은 툴이라고 설명하기 충분한 점

https://portfolioexpert.github.io/blog/npm%20vs%20yarn/

1. npm 장단점

- 유용한 패키지들을 받아서 쉽게 사용 가능
- 의존 패키지의 버저닝 이슈
- 패키지가 많아짐에 따라 빌드 성능이 좋지 않다

2. yarn 장단점

- 다운로드한 패키지를 캐싱하므로 재다운로드가 필요없다
- 운영을 병렬화하여 리소스 활용 극대화
- 체크섬을 통해 코드 실행 전 설치된 패키지의 무결성을 확인
- 한 시스템에 작동하는 설치가 다른 시스템에서 동일한 방식으로 작동하는 것을 보장
- Yarn.lock 파일의 버전 관리로 인해 기존 모듈이 최신화로 업데이트 될 수 있는데, 이 경우 하위 호환을 보장하지 않는 모듈의 경우는 에러 발생할 가능성이 존재

## PNPM

`study.git/인프라/서버/NodeJS_NPM/pnpm.md` 참고!
