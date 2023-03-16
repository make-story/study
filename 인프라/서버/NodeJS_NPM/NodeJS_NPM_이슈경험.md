# NodeJS

Node.js 12에서 16로 한번에 업데이트 적용후기
`12버전은 2022년 4월 30일을 끝으로 유지보수 기간이 만료`  
https://velog.io/@djunnni/Node.js-12%EC%97%90%EC%84%9C-16%EB%A1%9C-%ED%95%9C%EB%B2%88%EC%97%90-%EC%97%85%EB%8D%B0%EC%9D%B4%ED%8A%B8-%EC%A0%81%EC%9A%A9%ED%9B%84%EA%B8%B0-%ED%99%98%EA%B2%BD-%EC%84%B8%ED%8C%85%ED%8E%B8

`특정 packages에서 gcc와 python에 대해 최소버전 명시됨`

## Node.js 버전 일정

https://github.com/nodejs/release#release-schedule

## node버전을 올리는 방법은 nvm, n도 있지만 해당 방법으로 올리는 걸 비추천

n을 통해 올렸을 경우, 아래와 같은 문제가 발생할 수 있다.
n, nvm으로 올리면 node로 명령어를 실행했을 경우와 /usr/local/bin/node 간의 명령어가 꼬이는 경우가 발생할 수 있다. 이 경우, EACCES 가 발생할 수 있다.
`기존에 있던 node와 관련해 전부 지우고 curl로 node를 직접 받는 편이 좋다.`

```
$ sudo npm uninstall npm -g

$ sudo rm -rf /usr/local/lib/node /usr/local/lib/node_modules /var/db/receipts/org.nodejs.*
$ sudo rm -rf /usr/local/include/node /Users/$USER/.npm

$ sudo rm -rf /usr/local/bin/npm
$ sudo rm -rf /usr/local/bin/node

$ sudo rm /usr/local/share/man/man1/node.1
$ sudo rm /usr/local/lib/dtrace/node.d

$ brew uninstall node
```

---

# NPM

## ERESOLVE unable to resolve dependency tree 해결하기

https://www.korecmblog.com/ERESOLVE-unable-to-resolve-dependency-tree/

## 해결 방법

1.

```
$ npm install --force
```

로컬에 다운로드 복제본이 존재하더라도 다시 온라인에서 다운로드 받는다.

2.

```
$ npm install --legacy-peer-deps
```

마치 6버전 이하에서 동작하던 것처럼 peerDependencies를 무시한다.

3.

```
$ npm config set legacy-peer-deps true
```

모든 npm install에서 legacy-peer-deps로 동작하도록 설정한다. npm에서 권장하지 않는 방법이다.

4.

```
$ yarn install
```
