# Node.js 버전관리 도구

`study.git/인프라/서버/NodeJS_NPM/pnpm.md` 참고

https://news.hada.io/topic?id=14788

- NPM이나 Yarn의 대안으로 여겨지지만, Node.js 버전도 관리할 수 있음
- 크로스 플랫폼이며, 모든 플랫폼에서 동일한 Node.js 버전 관리 경험을 제공함
- Node 버전 관리가 핵심 기능이 아니므로, NPM이나 Yarn과 함께 사용하기 어려움
- PNPM으로 설치한 Node.js는 Corepack이 포함되지 않음
- Node.js 버전을 전역으로만 관리할 수 있으며, 쉘마다 설정할 수 없음
- 프로젝트 간 이동 시 Node.js 버전을 동적으로 전환하지 않으므로, 직접 추적해야 함

# 버전 변경

젠킨스 노드 버전도 같이 변경해야 함.
AWS 노드 버전 변경 시 필히 재시작 해주어야 변경된 버전 적용됨. (process.versions.node)

## 방법 1

기존 Node 완전 제거 후 다시 설치

https://nodejs.org/dist/

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

## 방법 2

NPM n 모듈을 활용

https://www.npmjs.com/package/n

```
# MAC 환경
$ brew install n

$ sudo n 14.20.1
```

## 방법 3

NVM 활용

https://github.com/nvm-sh/nvm
