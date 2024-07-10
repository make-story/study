# Node.js 클러스터링 (cluster)

```javascript
import http from 'node:http';
import os from 'node:os';
import cluster from 'node:cluster';

/**
 * Node.js 클러스터링
 * https://nodejs.org/api/cluster.html
 *
 * cluster.isMaster 는 Node.js v16.0.0 이후 사용 중단
 * cluster.isPrimary 사용 권장
 */
const numCPUs = os.cpus().length;
if (cluster.isPrimary) {
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died!`);
  });
} else {
  http
    .createServer()
    .listen(port, () => console.log(`[server] Server running on port ${port}`));
}
```

```javascript
const cluster = require('node:cluster');
const http = require('node:http');
const numCPUs = require('node:os').availableParallelism();
const process = require('node:process');

if (cluster.isPrimary) {
  console.log(`Primary ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });
} else {
  // Workers can share any TCP connection
  // In this case it is an HTTP server
  http
    .createServer((req, res) => {
      res.writeHead(200);
      res.end('hello world\n');
    })
    .listen(8000);

  console.log(`Worker ${process.pid} started`);
}
```

## 클러스터링, 워커 스레드

https://medium.com/@manikmudholkar831995/clustering-and-pm2-multitasking-in-nodejs-c6b10249cfd4

클러스터링은 들어오는 요청을 여러 개의 Node.js 서버 사본에 분산하여 부하를 분산하는 데 사용되는 기술입니다.

반면, 워커 스레드는 단일 Node.js 프로세스가 장기 실행 함수를 별도의 스레드에 위임할 수 있도록 하여 해당 스레드가 메인 루프를 차단하는 것을 방지합니다.

어떤 접근 방식이 더 나은지 결정하는 것은 해결하려는 구체적인 문제에 따라 달라집니다.  
워커 스레드는 장기 실행 함수를 처리하는 데 적합한 반면,  
클러스터링은 서버가 병렬로 처리하여 더 많은 요청을 처리할 수 있도록 합니다.  
필요한 경우 장기 실행 함수에 대해 각 Node.js 클러스터 프로세스에 워커 스레드를 할당하여 두 가지 방법을 모두 활용할 수 있습니다.

## Node.js를 사용한 PM2 클러스터 모드

Node.js 클러스터 모듈(내장된 모듈)이 있음에도 불구하고,  
우리는 여전히 자동 재시작 및 로드 밸런싱과 같은 다양한 작업을 관리해야 합니다.  
그러나 PM2는 우리가 이러한 특정 세부 사항에 대해 걱정할 필요성을 없애줍니다.

## Node.js 클러스터(워커)간 메시지 교환

메시지 교환은 마스터를 통해서만 가능?
https://stackoverflow.com/questions/34874526/node-js-cluster-get-all-workers-info

https://betterstack.com/community/guides/scaling-nodejs/node-clustering/

`https://medium.com/@manikmudholkar831995/worker-threads-multitasking-in-nodejs-6028cdf35e9d`

```javascript
import cluster from 'node:cluster';
import { availableParallelism } from 'node:os';
import process from 'node:process';

const numCPUs = availableParallelism();

if (cluster.isPrimary) {
  console.log(`Primary ${process.pid} is running.`);
  for (let i = 0; i < numCPUs; i++) {
    const worker = cluster.fork();
    // Receive messages from workers and handle them in the Primary process.
    worker.on('message', msg => {
      console.log(
        `Primary ${process.pid} received a message from worker ${worker.process.pid}:`,
        msg,
      );
    });
  }
} else if (cluster.isWorker) {
  console.log(`Worker ${process.pid} is active.`);
  // Send a message to the Primary process.
  process.send({
    msgFromWorker: `Message sent from worker ${process.pid}.`,
  });
}
```

Node.js 서버가 스케일아웃될 경우, 메시지 브로커(레디스, 카프카 등)를 활용해야 한다!

## Next.js 의 경우

```javascript
import http from 'node:http';
import os from 'node:os';
import cluster from 'node:cluster';

import express from 'express';
import next from 'next';

/**
 * Node.js 클러스터링
 * https://nodejs.org/api/cluster.html
 *
 * cluster.isMaster 는 Node.js v16.0.0 이후 사용 중단
 * cluster.isPrimary 사용 권장
 */
const numCPUs = os.cpus().length;
if (cluster.isPrimary) {
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
} else {
  /**
   * Next.js 를 Express 와 연결 - 같은 포트에서 실행
   */
  const app = next({ dev: isDev, hostname, port });
  const handle = app.getRequestHandler();
  app.prepare().then(() => {
    // express
    const server = express();

    // http 서버실행
    http
      .createServer()
      .listen(port, () =>
        console.log(`[server] Server running on port ${port}`),
      );
    /*server.listen(port, () =>
      console.log(`[server] Server running on port ${port}`)
    );*/

    // https 서버실행 (로컬에서만 설정)
    /*if (isDev) {
      const portSSL = parseInt(process.env.PORT_SSL, 10) || 3443;
      const options = {
        key: fs.readFileSync("cert/localhost-key.pem"),
        cert: fs.readFileSync("cert/localhost.pem"),
      };
      https.createServer(options, server).listen(portSSL, (err) => {
        if (err) throw err;
        console.log(`[server] Server running on port ${portSSL}`);
      });
    }*/
  });
}
```
