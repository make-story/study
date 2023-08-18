# Node.js 클러스터링 (cluster)

```javascript
import http from "node:http";
import os from "node:os";
import cluster from "node:cluster";

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
  http
    .createServer()
    .listen(port, () => console.log(`[server] Server running on port ${port}`));
}
```

## Next.js 의 경우

```javascript
import http from "node:http";
import os from "node:os";
import cluster from "node:cluster";

import express from "express";
import next from "next";

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
        console.log(`[server] Server running on port ${port}`)
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
