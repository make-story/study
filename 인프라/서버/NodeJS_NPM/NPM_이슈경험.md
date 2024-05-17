# NPM (트러블슈팅, 이슈경험)

# ERESOLVE unable to resolve dependency tree

https://www.korecmblog.com/ERESOLVE-unable-to-resolve-dependency-tree/

## 해결 방법

1. npm install --force
   로컬에 다운로드 복제본이 존재하더라도 다시 온라인에서 다운로드 받는다.

2. npm install --legacy-peer-deps
   마치 6버전 이하에서 동작하던 것처럼 peerDependencies를 무시한다.

3. npm config set legacy-peer-deps true
   모든 npm install에서 legacy-peer-deps로 동작하도록 설정한다. npm에서 권장하지 않는 방법이다.

4. yarn install

`peerDependencies 항목은 현재 NPM 패키지가 명학환 버전의 패키지가 필요하고 설치한다는 것 의미! 그에 따라 npm 또는 yarn 이 peerDependencies 항목의 의존성 모듈 설치함!`

# node-gyp, node-sass

```
gyp verb `which` failed Error: not found: python2
gyp verb `which` failed Error: not found: python
```

Node.js 설치된 버전 확인!
python 에 맞는, 환경에 필요한 python 이 설치되어야 한다.

```
$ brew install pyenv
$ pyenv install 2.7.18
$ pyenv global 2.7.18
$ export PATH="${HOME}/.pyenv/shims:${PATH}"

$ npm install sqlite3
```

## node-sass 의 Node.js 지원 버전확인

https://velog.io/@somangoi/node-sass-node-gyp-%EC%97%90%EB%9F%AC%EB%A1%9C-%EC%9D%B8%ED%95%B4-npm-install%EC%9D%B4-%EC%95%88%EB%90%9C%EB%8B%A4%EB%A9%B4

```bash
make: *** [Release/obj.target/binding/src/binding.o] Error 1
gyp ERR! build error
gyp ERR! stack Error: `make` failed with exit code: 2
gyp ERR! stack     at ChildProcess.onExit (/Users/lotte/github/webpagetest.git/node_modules/node-sass/node_modules/node-gyp/lib/build.js:262:23)
gyp ERR! stack     at ChildProcess.emit (node:events:526:28)
gyp ERR! stack     at Process.ChildProcess._handle.onexit (node:internal/child_process:291:12)
gyp ERR! System Darwin 22.6.0
gyp ERR! command "/usr/local/bin/node" "/Users/lotte/github/webpagetest.git/node_modules/node-sass/node_modules/node-gyp/bin/node-gyp.js" "rebuild" "--verbose" "--libsass_ext=" "--libsass_cflags=" "--libsass_ldflags=" "--libsass_library="
gyp ERR! cwd /Users/lotte/github/webpagetest.git/node_modules/node-sass
gyp ERR! node -v v16.14.2
gyp ERR! node-gyp -v v3.8.0
```

https://www.npmjs.com/package/node-sass

node-sass 가 버전별로 지원하는 Node.js 버전 필히 확인해야 한다!

또는 package.json 에 명시된 'node-gyp', 'node-sass' 목록에서 삭제하고, 나머지 package 들 설치!

---

# sharp 설치 오류

## 1

```
Output:
info sharp Downloading https://github.com/lovell/sharp-libvips/releases/download/v8.10.0/libvips-8.10.0-darwin-arm64v8.tar.br
ERR! sharp Prebuilt libvips 8.10.0 binaries are not yet available for darwin-arm64v8
```

회사 보안 등 이슈로 설치 불가

https://velog.io/@juyoung810/npm-install-sharp-error

https://github.com/lovell/sharp/issues/3115

```
npm view sharp dist-tags.latest 명령어로 가장 최신의 sharp 버전 확인
npm install sharp@0.30.7 이렇게 최신 버전 설치
```

## 2

```
ERR! sharp Prebuilt libvips 8.10.0 binaries are not yet available for darwin-arm64v8
```

https://github.com/nuxt/image/issues/204

```
$ brew install --build-from-source gcc
$ xcode-select install
$ brew install vips
```

## 3

```
$ rm -r node_modules/sharp
$ yarn install --check-files
```

---

# UNMET PEER DEPENDENCY - peerDependencies

https://blog.outsider.ne.kr/1230

npm v3에서는 이전처럼 자동으로 설치하지 않고(peerDependencies가 꼬이면 피곤하다.)  
peerDependencies가 충족되지 않으면 다은과 같이 경고가 나타난다.

```bash
$ npm ls
/Users/outsider/peer
├── UNMET PEER DEPENDENCY chai@>= 2.1.2 < 4
└── chai-as-promised@5.3.0

npm ERR! peer dep missing: chai@>= 2.1.2 < 4, required by chai-as-promised@5.3.0
```

npm 3 버전부터 npm 6 버전까지는 npm install 과정에서 peerDependencies를 무시  
npm 7 버전부터는 실제로 peerDependencies를 설치

# invalid

"dependencies" and "devDependencies" with different versions

dependencies 와 devDependencies 명시된 서로 다른 버전  
또는 해당 패키지에서 유효하지 않은 버전 설치한 경우

# npm ERR! code ETARGET

https://stackabuse.com/bytes/solving-npm-err-code-etarget-no-matching-version-found-error/

가장 일반적으로는 패키지 이름, 버전 관리 구문 유형에 오타가 있거나 npm 캐시에 문제가 있을 때 발생합니다.

## 사용 가능한 모듈 버전 확인

```bash
$ npm show express versions

[
  '0.14.0',        '0.14.1',        '1.0.0-beta',    '1.0.0-beta2',
  '1.0.0-rc',      '1.0.0-rc2',     '1.0.0-rc3',     '1.0.0-rc4',
  '1.0.0',         '1.0.1',         '1.0.2',         '1.0.3',
  ...
  '4.17.2',        '4.17.3',        '4.18.0',        '4.18.1',
  '4.18.2',        '5.0.0-alpha.1', '5.0.0-alpha.2', '5.0.0-alpha.3',
  '5.0.0-alpha.4', '5.0.0-alpha.5', '5.0.0-alpha.6', '5.0.0-alpha.7',
  '5.0.0-alpha.8', '5.0.0-beta.1'
]
```

## npm 캐시 지우기

버전이 npm show명령에 있는 경우 다음 단계는 npm 캐시를 지우는 것입니다.

```bash
$ npm cache clean --force
```

## 패키지 업데이트

설치하려는 버전이 존재 하지만 여전히 오류가 발생하는 경우 패키지를 업데이트해야 할 수도 있습니다.

```bash
$ npm update express
```
