# Node.js cli 명령

https://nodejs.org/api/cli.html

## -e

https://nodejs.org/api/cli.html#-e---eval-script

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
  console.log("\x1b[31m%s\x1b[0m", "[clitest Start] 시작합니다.");

  console.log("\x1b[32m%s\x1b[0m", "process.argv[0]: " + process.argv[0]);
  console.log("\x1b[33m%s\x1b[0m", "process.argv[1]: " + process.argv[1]);

  let result = Number(process.argv[2]) + Number(process.argv[3]);

  console.log("\x1b[34m%s\x1b[0m", "[Result] arg1 + arg2 = ", result);
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
