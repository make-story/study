# Cluster (클러스터), 멀티 프로세스, 멀티 스레드 환경 대응

https://github.com/websockets/ws/issues/476

https://github.com/fensziii/node-ws-cluster

## Node.js 클러스터(워커)간 메시지 교환

`study.git/인프라/서버/NodeJS_NPM/NodeJS_클러스터링.md` 참고!

## Redis

https://stackoverflow.com/questions/76856909/how-to-broadcast-a-message-to-all-clients-with-different-worker-in-ws-and-expres

https://stackoverflow.com/questions/76856909/how-to-broadcast-a-message-to-all-clients-with-different-worker-in-ws-and-expres/76856959#76856959

```javascript
const server = http.createServer(application);
const wss = new WebSocket.Server({ server });
const WebSocket = require('ws');
const redis = require('redis');

// other codes ...

const redisClient = redis.createClient({
  legacyMode: true,
});
const broadcastClient = redis.createClient();
(async () => {
  await broadcastClient.connect();
  broadcastClient.subscribe('broadcast-channel', message => {
    for (const client of wss.clients) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    }
  });

  wss.on('connection', ws => {
    ws.on('message', message => {
      console.log(`Message: ${message}`);
    });
  });
})();

const run = () => {
  if (cluster.isPrimary) {
    for (let index = 0; index < numberCPUs; index++) {
      cluster.fork();
    }
    cluster.on('exit', (worker, code, signal) => {
      console.error(
        `worker ${worker.process.pid} died (${
          signal || code
        }). restarting it in a sec`,
      );
      setTimeout(() => cluster.fork(), 1000);
    });
  } else {
    server.listen(port, () => {
      console.log(`Worker ${cluster.worker.id} : started on ${port}`);
    });
  }
};
```

```javascript
const redis = require('redis');

const redisClient = redis.createClient();
await redisClient.connect();
redisClient.publish('broadcast-channel', 'Hellow world!');
```
