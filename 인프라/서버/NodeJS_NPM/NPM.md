# NPM

npm 은 자바스크립트 프로그래밍 언어를 위한 패키지 관리자

- https://docs.npmjs.com/
- https://docs.npmjs.com/about-npm

## 참고

- https://outofbedlam.gitbooks.io/npm-handbook/content/
- https://www.hamadevelop.me/packagelock/?fbclid=IwAR1y3fmMaOrHqAE9L9JbQit80yMjiI6KjRxIdB6UhGwTp_PG94tK7rfgQTs

---

# package.json

노드 프로젝트에 대한 정보, 설정, 사용중인 패키지를 기록하는 파일  
패키지에 대한 정보(의존성 등)를 명시

https://docs.npmjs.com/cli/v9/configuring-npm/package-json#dependencies

```json
{
  "dependencies": {
    "foo": "1.0.0 - 2.9999.9999",
    "bar": ">=1.0.2 <2.1.2",
    "baz": ">1.0.2 <=2.3.4",
    "boo": "2.0.1",
    "qux": "<1.0.0 || >=2.3.1 <2.4.5 || >=2.5.2 <3.0.0",
    "asd": "http://asdf.com/asdf.tar.gz",
    "til": "~1.2",
    "elf": "~1.2.3",
    "two": "2.x",
    "thr": "3.3.x",
    "lat": "latest",
    "dyl": "file:../dyl"
  }
}
```

## 버전 범위(의존성) 지정 종류

참고: 종속성은 tarball 또는 git URL로도 저장소 지정 가능 (install url)  
https://docs.npmjs.com/cli/v8/configuring-npm/package-json#dependencies

### Git URLs as Dependencies

```
{
  "dependencies": {
    "bar": "<protocol>://[<user>[:<password>]@]<hostname>[:<port>][:][/]<path>[#<commit-ish> | #semver:<semver>]"
  }
}
```

### Local Paths

```
{
  "dependencies": {
    "bar": "file:../foo/bar"
  }
}
```

# package.json 생성

```
$ npm init -y
```

-y를 입력하지 않으면 package.json에 들어가 값들을 직접 입력하면서 package.json을 생성할 수 있으며 -y를 입력할 경우 기본값으로 설정

# package.json 수정

```json
{
  "name": "패키지명",
  "version": "1.0.0",
  "description": "패키지설명",
  "author": "",
  "license": "MIT",
  "keywords": ["npm 저장소 검색 키워드"],
  "files": [
    "npm에 배포할 경우 실제로 패지키에 포함될 파일들, 폴더 이름을 지정하면 폴더안의 파일을 포함"
  ],
  "dependencies": {}
}
```

# 패키지 저장소 지정 install

```
$ npm set registry "http://registry.npmjs.org/"
$ npm config get registry
```

## npm의 의존성 관리

- dependencies
  프로젝트에서 실제로 의존하고 호출하는 의존성들

- devDependencies
  개발할 때만 의존하는 의존성들(예를 들면 코드 포맷팅을 예쁘게 해주는 라이브러리)

```
$ npm install -production
```

플래그를 붙이면 devDependencies 를 제외한 의존성 파일만을 내려받게 됩니다.

- peerDependencies
  내 패키지가 다른 패키지로부터 직접 불려지는(require) 것은 아니지만 특정 버전의 패키지와 호환된다는 것을 명시
  즉, 내가 다른 패키지의 특정 버전과 호환된다는 것을 뜻한다
  https://medium.com/angular-in-depth/npm-peer-dependencies-f843f3ac4e7f

- optionalDependencies
  선택적인 의존성으로 없거나 설치에 실패해도 npm 패키지 설치 과정이 중단되지 않아 다른 라이브러리 설치에 영향을 주지 않는 의존성들

- bundledDependencies
  내 패키지와 함께 제공되는 일련의 패키지들. 타사 라이브러리가 NPM에 없거나 일부 프로젝트를 모듈에 포함하려는 경우 사용할 수 있다.

`npm 3 버전부터 npm 6 버전까지는 npm install 과정에서 peerDependencies를 무시`하고 버전이 일치하지 않으면 경고 메시지만 보여줬지만,  
`npm 7 버전부터는 실제로 peerDependencies를 설치`한다. 그리고 버전이 일치하지 않으면 에러를 낸다.

---

# package-lock.json

노드 패키지 간의 의존 관계를 고정시켜둔 파일

- npm 패키지를 설치하거나 수정, 삭제 등의 작업을 진행할 때 생성
- 패키지(모듈)내 다른 모듈의 의존성등 각 패키지에 대한 의존성 관리
- 하나의 패키지를 여러 패키지에서 사용할 수 있고 하나의 패키지는 여러 개의 버전을 가지며 또 이 여러 버전을 다른 패키지에서 사용할 수 있음.
- 이렇게 되면 패키지 버전 간의 충돌과 호환이 되지 않는 경우가 있는데 이를 미연에 방지하기 위한 것
- 하나의 패키지에 dependencies(종속)가 어떤 패키지인지 버전 정보와 이름이 나열되어 있고 dependencies에 명시된 특정 패키지를 - 다시 검색 및 추적하다 보면 여러 패키지에서 사용하는 것을 볼 수 있음

## 패키지 잠금 파일 (package-lock.json, yarn.lock)

- https://docs.npmjs.com/cli/v7/configuring-npm/package-lock-json
- https://classic.yarnpkg.com/en/docs/yarn-lock/

패키지를 프로젝트에 설치하거나 갱신 또는 삭제하는데 사용되는 도구를 패키지 매니저(npm yarn 등)  
npm 은 package-lock.json 파일을, yarn 은 yarn.lock 파일을 패키지 잠금 파일로 사용

## 설치 시점에 따라 달라지는 패키지 버전 (package-lock.json 또는 yarn.lock 파일이 필요한 이유)

`모든 개발자가 정확히 같은 시각 동시에 패키지를 설치하지 않는 이상 개발자들은 서로 상이한 버전의 패키지를 설치할 확률이 발생`  
`가장 큰 이유는 package.json 파일에 등록된 패키지의 버전이 ^나 ~ 등을 이용해서 범위로 지정된 경우가 많기 때문`

예를 들어,  
package.json: ^16.8.2  
개발자 A의 PC: 16.8.2  
개발자 B의 PC: 16.8.3  
개발자 C의 PC: 16.9.1  
개발/상용 서버: 16.10.0

## 패키지 잠금 (작업자 모두 동일한 패키지 버전 사용이 가능)

`package.json 파일을 사용해도 시간과 장소에 따라서 서로 다른 버전의 패키지가 설치되는 문제는 패키지 잠금을 통해 해결`  
`package-lock.json 이나 yarn.lock 과 같은 패키지 잠금 파일에는 프로젝트에 패키지에 최초로 추가될 당시에 정확히 어떤 버전이 설치가 되었는지를 기록`

## 주의 사항

프로젝트를 최초 셋업하는 개발자는 패키지 잠금 파일을 Git 저장소에 반드시 올려서 다른 개발자들이 패키지 잠금 파일을 기준으로 패키지를 설치할 수 있도록 해야 함  
패키지 잠금 파일은 패키지 매니저가 신규 패키지를 설치하거나 기존 패키지를 갱신/제거할 때마다 package.json과 자동으로 동기를 맞춰주기 때문에 개발자가 이 파일을 직접 수정해야 할 필요는 없으며 해서도 안 됨  
신규 패키지를 설치하거나 기존 패키지를 갱신/제거한 개발자는 package.json과 더불어 함께 업데이트된 패키지 잠금 파일을 반드시 커밋

---

# NPM 설치 항목 리스트 조회

-g 옵션은 글로벌 설치 리스트

```
$ npm ls -g
$ npm list -g
$ npm list -global
$ npm ls -g --depth=0
```

글로벌(global) 설치 경로(path) 확인

```
$ npm root -g
```

## 명령어 처리 결과 파일로 저장

일반 출력 리다이렉션

- (명령) > (파일명) : 새로운 파일 생성, 기존 파일 내용 사라짐
- (명령) >> (파일명) : 기존 파일 끝에 내용 추가

```
$ ls -al > directory.txt
$ npm list --depth=0 > npm-list.txt
```

---
