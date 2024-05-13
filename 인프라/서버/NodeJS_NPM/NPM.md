# NPM

npm 은 자바스크립트 프로그래밍 언어를 위한 패키지 관리자

- https://docs.npmjs.com/
- https://docs.npmjs.com/about-npm

## 참고

- https://outofbedlam.gitbooks.io/npm-handbook/content/
- https://www.hamadevelop.me/packagelock/?fbclid=IwAR1y3fmMaOrHqAE9L9JbQit80yMjiI6KjRxIdB6UhGwTp_PG94tK7rfgQTs

---

# 패키지 저장소 지정 install

```
$ npm set registry "http://registry.npmjs.org/"
$ npm config get registry
```

# npm install / npm ci

## devDependencies

devDependencies 에 명시된 의존성 모듈은  
운영환경에서는 "--production" 플래그를 사용하여 설치되지 않도록 할 수 있음  
("--production" 플래그를 붙이면 devDependencies 를 제외한 의존성 파일만을 내려받게 됩니다.)

```bash
$ npm install --production
```

## npm ci (Continuous Integration, 지속적 통합) 의 특징은 다음과 같다.

v6.14.18 부터 지원

https://docs.npmjs.com/cli/v10/commands/npm-ci

- package-lock.json 이 무조건 존재해야하만 하고, 만약 없으면 에러를 낸다.
- package-lock.json 파일을 기반으로 의존성을 설치하고, package.json 은 버전 매칭 밸리데이션 용도로 사용한다.  
  즉, package-lock.json 과 package.json 사이의 버전이 매칭이 안되면 에러를 낸다.
- `npm ci 실행하면 먼저 node_modules 삭제한 후, 의존성을 한번에 설치한다.` (즉, node_modules 존재하는 상태에서의 사용환경이라면 npm ci 가 더 비효율적일 수 있음)

오직 package-lock.json 을 읽고 의존성 목록을 설치  
이러한 흐름으로써, `개발 환경이 아닌 CI 환경에서는 npm install 보다는 적합한 방안`으로 여겨진다.

```bash
# npm install 로 했을 경우, 10초 소요
$ npm install
added 154 packages in 10s
```

```bash
$ ls | grep package-lock
# npm ci 로 했을 경우, 5초 소요
$ npm ci
added 154 packages in 5s
```

yarn 에서도 npm ci 와 같은 기능을 제공

```bash
$ yarn install --frozen-lockfile
```

https://github.com/yarnpkg/yarn/issues/4147

# NPM 의 기본적인 모듈 설치 과정

npm은 하나의 패키지를 설치하면 의존하는 모든 패키지를 node_modules 폴더에 다운로드 한다.  
패키지가 중복되면 하나만 설치해서 공유한다.  
버전이 다르면 폴더 이름이 같아서 설치할 수 없는데 이 때는 node_modules에 하나의 버전만 남기고 나머지 버전은 사용하는 패키지 하위의 node_modules에 다운로드 하는 방식을 취한다.

express를 설치한다면 node_modules 폴더에 다운로드 한다.  
의존하는 패키지(이중 cookie도 포함)도 이 디렉토리에 평탄하게 위치할 것이다.  
msw를 하나 더 추가하면 의존하는 모든 패키지를 마찬가지로 node_modules 폴더에 설치한다.  
msw도 cookie를 사용하는데 express가 사용하는 것과 버전이 다르다.  
이 경우 각 버전의 패키지를 각 각 분리해서 다운로드 할 것이다.

```
node_modules
  - express
  - cookie # express가 사용하는 버전
  - msw
    - node_modules
      - cookie # msw가 사용하는 버전
```

이처럼 npm은 프로젝트마다 사용하는 패키지를 자신의 node_modules 폴더에 관리한다.  
의존 패키지가 같으면 하나의 폴더에 관리해 용량을 약간 줄일 수 있기는 하다.  
그러나 프로젝트 간에 중복 패키지까지는 관리하지 못한다.  
프로젝트마다 express를 사용한다면 각 node_modules 하위에 이 패키지를 매번 설치할 것이다.
