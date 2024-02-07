# NPM package.json `scripts`

https://docs.npmjs.com/cli/v9/using-npm/scripts

https://docs.npmjs.com/cli/v9/using-npm/scripts#pre--post-scripts

특정 scripts 명령 이전 또는 이후 자동 실행을 원한다면,  
`"pre" or "post"` 를 추가!

예를 들어,

```json
{
  "scripts": {
    "precompress": "echo precompress",
    "compress": "echo compress",
    "postcompress": "echo postcompress"
  }
}
```

```
$ npm run compress
```

명령을 실행하면, 자동으로 precompress 먼저 실행 -> compress 실행 -> postcompress 이후 실행 됨.

아래와 같은 package.json 파일에서 "scripts" 프로퍼티를 사용할 수 있습니다.

- prepublish: 팩키지를 퍼블리쉬하기전에 실행됩니다. (또한 로컬에서 다른 인자 없이 npm install를 실행할 때에도 적용됩니다.)
  publish, postpublish: 팩키지를 퍼블리쉬한 후에 실행됩니다.
- preinstall: 팩키지를 인스톨하기 전에 실행됩니다.
- install, postinstall: 팩키지를 인스톨한 후에 실행됩니다.
- preuninstall, uninstall: 팩키지를 언인스톨하기 전에 실행됩니다.
- postuninstall: 팩키지를 언이스톨한 후에 실행됩니다.
- preversion, version: Run BEFORE bump the package version.
- postversion: Run AFTER bump the package version.
- pretest, test, posttest: Run by the npm test command.
- prestop, stop, poststop: Run by the npm stop command.
- prestart, start, poststart: Run by the npm start command.
- prerestart, restart, postrestart: Run by the npm restart command. 주의: npm restart 시에 restart 스크립트를 지정하지 않으면 stop과 start 스크립트가 실행됩니다.

## 예시

```json
{
  "preinstall": "node -e \"if(process.env.npm_execpath.indexOf('yarn') === -1) throw new Error('use Yarn, no NPM')\"",
  "prebuild": "node -e \"if(process.versions.node.split('.').shift() !== '16') throw new Error('Node.js 버전 확인 필요!')\""
}
```

# 라이프 사이클 스크립트 종류

https://docs.npmjs.com/cli/v10/using-npm/scripts#life-cycle-scripts
https://yarnpkg.com/advanced/lifecycle-scripts

NPM 은 Pre/Post 스크립트 뿐만 아니라,  
prepare, prepublish, prepublishOnly, prepack, postpack, dependencies 6개의 라이프 사이클 스크립트가 있습니다.

반면에 Yarn 2+ 는 Pre/Post 스크립트를 지원하지 않고,  
prepack, postpack, prepublish, postintall 4개의 라이프 사이클 스트립트만 존재합니다.

## prepare (NPM)

prepare 스크립트는 패키지가 패킹 되기 전에 실행되는 스크립트로 npm publish, npm pack 의 스크립트가 실행될 때, 로컬에서 파라이터 없이 npm install 스크립트가 실행될 때 호출됩니다.

## prepublish (DEPRECATED)

prepublish 스크립트는 지원 중단 되었습니다. npm publish 스크립트가 실행될 때는 호출되지 않고, npm ci, npm install 스크립트가 실행될 때 호출됩니다.

## prepublishOnly (NPM)

prepublishOnly 스크립트는 패키지가 준비(prepared), 압축(packed) 되기 전에 실행되는 스크립트로 npm publish 스크립트가 실행될 때만 호출됩니다.

## prepack (NPM, Yarn 2+)

prepack 스크립트는 패키자가 압축되기 전에 호출되는 스크립트입니다. npm pack, npm publish 스크립트가 실행될 때 호출됩니다.

## postpack (NPM, Yarn 2+)

postpack 스크립트는 압축 파일이 생성되고, 최종 목적지(예를 들어 NPM 배포)에 이동하기 전에 호출됩니다.

## dependencies (NPM)

dependencies 스크립트는 node_modules 디렉토리가 수정되었을 때 호출됩니다.

# 명령어별 라이프 사이클 실행 순서

npm cache add

- prepare

npm ci

- preinstall
- install
- postinstall
- prepublish
- preprepare
- prepare
- postprepare

npm diff

- prepare

npm install
npm install -g

- preinstall
- install
- postinstall
- prepublish
- preprepare
- prepare
- postprepare

npm pack

- prepack
- prepare
- postpack

npm publish

- prepublishOnly
- prepack
- prepare
- postpack
- publish
- postpublish

--dry-run 파라미터를 주게되면 prepare 스크립트가 호출되지 않습니다.

npm rebuild

- preinstall
- install
- postinstall
- prepare

npm restart

- prerestart
- restart
- postrestart

---

# NPM package.json scripts 여러 명령을 동시에 실행

## 기본적인 방식

```
$ npm run watch-js & npm run watch-css
```

## 도구 활용

https://www.npmjs.com/package/concurrently
