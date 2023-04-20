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
