# 자식프로세스 (Child Process)

https://nodejs.org/api/child_process.html

https://stackoverflow.com/questions/48698234/node-js-spawn-vs-execute

https://stackoverflow.com/questions/17861362/node-js-child-process-difference-between-spawn-fork

https://one-armed-boy.tistory.com/entry/NodeJS-Childprocess%EC%9D%98-spawn-exec-fork?category=1127910

https://www.freecodecamp.org/korean/news/node-js-child-processes-everything-you-need-to-know-e69498fe970a/

자식 프로세스는 Node.js child_process 모듈을 통해 쉽게 만들어질 수 있으며  
그 자식 프로세스들은 메시징 시스템(messaging system)을 통해 서로 쉽게 소통할 수 있습니다.

Node 에서 자식 프로세스를 생성하는 방법은 다음과 같이 4개가 있습니다.  
spawn(), fork(), exec(), execFile()

## 시스템 콜

시스템 콜이란 유저 모드에서 작동하는 프로세스들이 운영체제의 권한이 필요한 작업을 운영체제에 요청하기 위해 호출되는 인터페이스를 의미한다.

파일 입출력이나 프로세스의 생성 및 실행 등의 작업에 대한 권한이 프로세스들에게 있을 경우  
컴퓨터는 외부 공격으로부터 매우 취약해지기 때문에,  
해당 작업들에 대한 권한은 운영체제에게 있으며 프로세스들은 운영체제에 이를 요청하는 방식으로 작동한다.

## spawn

spawn 메서드는 명령어와 인자들을 입력 받고 이를 이용하여 새로운 프로세스를 생성한다.

해당 메서드는 ChildProcess 객체를 반환하고,  
이후 표준 입출력을 통해 부모와 자식 간 데이터 전송(IPC)이 가능하다.

```javascript
// spawn
const { spawn } = require('node:child_process');
const ls = spawn('ls', ['-lh', '/usr']);

ls.stdout.on('data', data => {
  console.log(`stdout: ${data}`);
});

ls.stderr.on('data', data => {
  console.error(`stderr: ${data}`);
});

ls.on('close', code => {
  console.log(`child process exited with code ${code}`);
});
```

## exec

exec() 는 fork()와는 달리 새로운 프로세스를 생성하는 시스템 콜이 아니다.

exec() 이 호출되면 기존 프로세스를 새로운 프로세스로 완전히 대체한다.  
따라서 새로운 코드 흐름이 작동하기는 하지만 기존 프로세스는 완전히 사라지게 된다.

리눅스에서는 fork()와 exec()의 조합을 통해 쉘을 구현하고 있다.

```javascript
// exec
const { exec } = require('node:child_process');
exec('cat *.js missing_file | wc -l', (error, stdout, stderr) => {
  if (error) {
    console.error(`exec error: ${error}`);
    return;
  }
  console.log(`stdout: ${stdout}`);
  console.error(`stderr: ${stderr}`);
});
```

## fork

fork() 는 프로세스를 생성하는 시스템 콜로, 부모 프로세스를 복사하는 방식으로 작동한다.

fork() 가 호출된 시점의 실행 컨텍스트를 완전히 복사하기 때문에,  
자식 프로세스는 부모 프로세스 코드의 시작 지점부터 실행되는 것이 아닌 fork() 호출 이후의 코드 흐름이 실행된다.

fork() 의 반환 값은 부모와 자식에서 서로 다른데, 부모 프로세스에서는 자식 프로세스의 Id가 반환되고 자식 프로세스에서는 0이 반환된다.  
따라서 fork() 호출 이후 if 분기를 통해 다른 코드 흐름이 실행되도록 코드를 구성할 수 있다.

```javascript
// parent.js
const { fork } = require('child_process');
const path = require('path');

const child = fork(path.join(__dirname, 'child.js'));

child.on('message', msg => {
  console.log(`Parent process received message: ${msg}`);
});

child.send('Hello from parent process!');
```

```javascript
// child.js
process.on('message', msg => {
  console.log(`Child process received message: ${msg}`);
  process.send('Hello from child process!');
});
```

## spawn() vs exec()

두 메서드의 차이는 크게 2가지이다.

- 명령어 전달 방식
- 부모 자식 간의 통신 구현 방식
