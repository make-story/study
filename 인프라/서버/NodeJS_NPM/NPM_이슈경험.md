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

# gyp, node-sass

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
