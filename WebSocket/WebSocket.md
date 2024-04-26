# WebSocket Server/Client

`MDN` 참고  
https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API

`NPM Trends` 참고  
https://npmtrends.com/socket.io-vs-websocket-vs-ws

유성민 자체 개발 라이브러리  
`https://github.com/make-story/ui/tree/master/src/websocket` 참고!

- Socket.IO
  https://socket.io/
- SocketCluster
  https://socketcluster.io/
- WebSocket-Node
  https://github.com/theturtle32/WebSocket-Node
- `ws`
  https://github.com/websockets/ws

https://github.com/theturtle32/WebSocket-Node

https://www.pubnub.com/blog/nodejs-websocket-programming-examples/

https://medium.com/@PubNub/node-js-websocket-programming-examples-f6b8e15f8f85

```bash
$ yarn add ws @types/ws
```

## 101 Switching Protocols

https://developer.mozilla.org/ko/docs/Web/HTTP/Status/101

WebSocket Handshake  
먼저 HTTP 프로토콜을 통해 WebSocket을 사용할 수 있는지, 클라이언트가 서버에게 묻는데  
서버가 WebSocket을 지원하면 이 때 '101 상태코드를 통해 protocol switching' 을 하겠다고 응답한다.  
이 후 클라이언트와 서버사이에는 WebSocket 프로토콜을 통해 통신하게 된다.

Client -> Server

```
 GET /chat HTTP/1.1
        Host: server.example.com
        Upgrade: websocket
        Connection: Upgrade
        Sec-WebSocket-Key: dGhlIHNhbXBsZSBub25jZQ==
        Origin: http://example.com
        Sec-WebSocket-Protocol: chat, superchat
        Sec-WebSocket-Version: 13
```

Server -> Client

```
  HTTP/1.1 101 Switching Protocols
        Upgrade: websocket
        Connection: Upgrade
        Sec-WebSocket-Accept: s3pPLMBiTxaQ9kYGzzhZRbK+xOo=
```

'101 Switching Protocols' 가 response로 오면 Websocket 연결이 된 것이다.

### Node.js 21 버전 - WebSocket 내장

`study.git/인프라/서버/NodeJS_NPM/NodeJS_Release_Changelog.md` 참고!

https://nodejs.org/en/blog/announcements/v21-release-announce#built-in-websocket-client

https://github.com/nodejs/undici/tree/main/test/websocket

https://www.nearform.com/insights/whats-new-in-node-js-21/

```javascript
// example.js
const ws = new WebSocket('wss://echo.websocket.events/');

ws.addEventListener('message', event => {
  console.log('received:', event.data); // "echo.websocket.events sponsored by Lob.com"
});

ws.addEventListener('open', () => {
  let i = 0;
  setInterval(() => {
    const text = `hello. This is message number #${i}`;
    console.log('sending:', text);
    ws.send(text);
    i++;
  }, 1000);
});
```

```bash
$ node --experimental-websocket example.js
```
