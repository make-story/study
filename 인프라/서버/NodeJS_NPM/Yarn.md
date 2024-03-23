# Yarn

Node.js 자바스크립트 런타임 환경을 위해  
페이스북이 2016년 개발한 소프트웨어 패키지 시스템

node_modules 폴더에 특정 패키지를 찾을 때  
모든 패키지를 돌아다니면서 해당 패키지가 있는지 찾아봐야 합니다.  
이 방법은 다음과 같은 이유로 비효율적입니다.

- node_modules에 많은 파일이 있을 수 있습니다.
- node_modules는 패키지 설치 시에 비용이 큰 I/O 작업을 발생시킵니다. 따라서 node_modules를 최적화에 집중하기 벅찹니다.
- Node는 패키지를 잘 알지 못하기 때문에 어떤 패키지에 접근해야 하는지 알 수 없습니다.
  package.json에 빠진 패키지의 경우 개발할 때에는 잘 동작하다가도 나중에 프로덕션에서 깨지는 경우가 발생합니다.

yarn install --check-files

# Yarn Berry

`Yarn Berry (2.x, 3.x)` - Yarn2, Yarn3, Yarn Berry 등은 Yarn 1.x 이후 불리는 표현  
Yarn workspace를 도입하려고 할 때 성능면에서 Yarn Berry를 함께 검토해 볼 수 있다.  
Yarn Berry는 yarn의 두 번째 버전으로, 2018년 9월 yarn의 RFC 저장소에서 시작되었다.  
Yarn 1.x의 주요 개발자인 Mael Nison에 의해 TypeScript로 개발되었고, 2020년 1월 25일 정식 버전이 출시되었다.  
Yarn 1.x는 v1.22.17에서 코드 프리징되었고 https://github.com/yarnpkg/berry 에서 2022.03.09 현재 v3.2.0이 출시되었다.

yarn이 설치되어 있지 않다면

```
$ npm install -g yarn
```

우선 실행해 주세요.  
(MacOS이며, brew가 설치되어 있다면 brew install yarn도 가능)

---

https://velog.io/@ragnarok_code/Yarn-berry

# Yarn berry Plug'n'Play

`Yarn berry는 node_modules 폴더 대신에 .pnp.cjs 파일을 만듭니다.`
이 파일에는 관련된 패키지 이름과 버전, 디스크에서의 위치 그리고 의존성 리스트 등이 적혀있습니다.
여기 있는 내용을 통해 Yarn berry는 Node에게 '네가 찾는 패키지는 여기에 있어"라고 바로 알려줄 수 있습니다.

Yarn berry는 수많은 파일을 설치하는 대신에 한 개의 텍스트 파일을 만들고 고치면 됩니다.  
또한 Yarn berry에서는 패키지를 zip 형태로 .yarn/cache에 저장합니다. 그래서 설치가 더 빨라집니다.

## Plug'n'Play 켜기

https://toss.tech/article/node-modules-and-yarn-berry

`버전을 Berry로 설정하면 Yarn Berry를 사용할 수 있습니다.`

```
$ npm install -g yarn
$ cd ../path/to/some-package
$ yarn set version berry
```

.yarn/cache 폴더에 의존성의 정보가 저장되고 .pnp.cjs파일에 의존성을 찾을 수 있는 정보가 기록됩니다.

Yarn은 Node.js가 제공하는 require()문의 동작을 덮어씀으로서 효율적으로 패키지를 찾을 수 있도록 합니다.  
이 때문에 PnP API를 이용하여 의존성 관리를 하고 있을 때에는 node 명령어 대신 yarn node명령어를 사용해야 합니다.
