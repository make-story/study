# Node.js cli 명령

https://nodejs.org/api/cli.html

## -e

https://nodejs.org/api/cli.html#-e---eval-script

```bash
# 노드 버전 확인 ($ node -v 가능하나 아래는 예시)
$ node -e "console.log(+process.versions.node.split('.')[0])"
```

## package.json 에서 "bin" 항목 활요

package.json

```json
{
  "name": "clitest",
  "version": "1.0.0",
  "main": "cli.js",
  "bin": {
    "clitest": "./cli.js"
  },
  "scripts": {
    "start": "node ./cli.js"
  }
}
```

cli.js

```javascript
#!/usr/bin/env node

(() => {
  console.log('\x1b[31m%s\x1b[0m', '[clitest Start] 시작합니다.');

  console.log('\x1b[32m%s\x1b[0m', 'process.argv[0]: ' + process.argv[0]);
  console.log('\x1b[33m%s\x1b[0m', 'process.argv[1]: ' + process.argv[1]);

  let result = Number(process.argv[2]) + Number(process.argv[3]);

  console.log('\x1b[34m%s\x1b[0m', '[Result] arg1 + arg2 = ', result);
})();
```

#!/usr/bin/env node  
윈도우 OS에서는 불필요하지만, 리눅스 등에서 CLI 프로그램에서 node 위치를 지정하기 위한 필수 문구입니다.

기존 방식

```bash
node .\cli.js 1 2
```

전역 설치 (npm install -g) 후 방식

```bash
clitest 1 2
```

## .bin

이 폴더는 이름에서도 유추할수있다시피 바이너리 파일들이 저장되는 곳이다.  
(바이너리 파일이란 1과 0으로만 이루어진 파일이다.)

`npm 의 bin 폴더를 출력`

```bash
$ npm bin [-g|--global]
```

## node 명령어와 npm scripts (package.json scripts) 의 차이

node 라는것은 결국 자바스크립트 실행기(자바스크립트 런타임)이므로  
node 명령어로 이 node_modules 아래에 있는 외부 모듈을 실행 시킬 수 있다.

또 다른 방법으로, npm scripts 를 통해서 외부 모듈을 실행시킬 수 있다.  
이 방법으로 모듈을 실행시킨다는것은 node_modules/.bin 폴더에 있는 실행파일을 직접 실행하는것이다.  
실행파일은 0과 1로 구성된 바이너리 파일이므로 그 자체로 실행이 가능하다.  
node 가 필요하지 않다.

## pm2 글로벌이 아닌, 로컬로 설치했을 경우

```bash
$ yarn add pm2
```

예시로 pm2 롤 통해 index.js 실행

```bash
$ pm2 index.js
```

로컬 설치로 위 처럼 터미널에서 pm2 모듈을 실행시키려고하면 에러가 난다.  
(운영체제 환경변수에 등록되지 않아서 운영체제가 해당 pm2 파일이 어디에 있는지 못찾는다.)

1. package.json 의 scripts부분에 다음과 같은 npm 스크립트를 추가하고 실행

```json
{
  "scripts": {
    "start": "pm2 index.js"
  }
}
```

2. npm 모듈의 bin 파일을 직접 지정하여 node 명령어로 실행

```bash
$ node node_modules/pm2/bin/pm2.js index.js
```

3. 바이너리 파일로 변환 후 실행

- 모듈을 바이너리로 컴파일한다.
- 바이너리 파일을 node_modules/.bin 에 복사한다.
