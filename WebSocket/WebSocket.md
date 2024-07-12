# 웹소켓 WebSocket Server/Client

https://en.wikipedia.org/wiki/WebSocket

WebSocket 은 단일 TCP(전송 제어 프로토콜) 연결을 통해 동시 양방향 통신 채널을 제공하는 컴퓨터 통신 프로토콜 입니다.

WHATWG 에서 유지 관리

WebSocket 은 대부분의 웹페이지를 제공하는 데 사용되는 HTTP 와 다릅니다.  
서로 다르지만 RFC 6455 에서는 WebSocket 이 "HTTP 포트 443 및 80을 통해 작동하고 HTTP 프록시 및 중개자를 지원하도록 설계"되어  
HTTP와 호환된다고 명시합니다.  
호환성을 달성하기 위해 WebSocket 핸드셰이크는 HTTP/1.1 Upgrade header 를 사용하여 HTTP 프로토콜에서 WebSocket 프로토콜로 변경합니다.

핸드쉐이크 완료 시

```
HTTP/1.1 101 Switching Protocols
Connection: upgrade
Upgrade: websocket
Sec-WebSocket-Accept: 5TJpHv9RoAl7w8ytsXcWxTOZ9Q==
Sec-WebSocket-Protocol: new-chat
```

https://levelup.gitconnected.com/websockets-demystified-part-1-understanding-the-protocol-fccca2ca75eb

`MDN` 참고  
https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API

## 도구 참고

`NPM Trends` 참고  
https://npmtrends.com/socket.io-vs-websocket-vs-ws

`2023년 기준 리스트업`  
https://ably.com/blog/websocket-libraries-for-node

- Socket.IO
- WS
- SockJs
- Feathers
- µWebSockets
- Faye-WebSocket
- Primus
- SocketCluster

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

## 웹소켓 메시지 제한

https://www.rfc-editor.org/rfc/rfc6455#section-5.2

코파일 답변

`웹소켓 프로토콜 자체는 메시지 크기에 대한 명시적인 제한을 두지 않습니다.`  
그러나 실제로 웹소켓 서버와 클라이언트 구현체는 메모리 관리와 성능 최적화를 위해 메시지 크기에 제한을 둘 수 있습니다.  
예를 들어, ws 라이브러리(자바스크립트의 웹소켓 서버 구현)는 기본적으로 메시지 최대 크기를 제한할 수 있으며, 이는 구성을 통해 조정할 수 있습니다.

ws 라이브러리를 사용하는 경우,  
웹소켓 서버 인스턴스를 생성할 때 maxPayload 옵션을 통해 메시지 최대 크기를 설정할 수 있습니다.  
예를 들어, 다음과 같이 100MB로 설정할 수 있습니다

```javascript
const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080, maxPayload: 100 * 1024 * 1024 });
```

이 코드는 서버가 수신할 수 있는 메시지의 최대 크기를 100MB로 설정합니다.  
클라이언트 측에서도 비슷한 제한을 설정할 수 있으나, 이는 클라이언트 라이브러리나 브라우저에 따라 다를 수 있습니다.

따라서, 웹소켓을 통해 전송할 수 있는 메시지의 최대 사이즈는 사용하는 웹소켓 서버와 클라이언트 라이브러리의 구성에 따라 달라집니다.  
필요에 따라 이 값을 조정하여 사용해야 합니다.

## 웹소켓 URL 최대 길이

```javascript
new WebSocket(url, protocols);
```

코파일 답변

URL의 최대 길이는 웹소켓(WebSocket)을 포함하여 HTTP 요청에서 사용되는 URL과 동일하게, 공식적으로 정해진 표준은 없습니다. 그러나 실제로는 브라우저나 서버, 그리고 사용하는 네트워크 스택에 따라 제한이 있을 수 있습니다.

일반적으로 브라우저는 URL의 최대 길이를 2000~8192 문자 사이로 제한합니다. 가장 보수적인 제한은 Internet Explorer에서 약 2048자이며, 다른 현대적인 브라우저는 더 긴 URL을 지원할 수 있습니다(예: Chrome, Firefox는 8192자 이상).

웹소켓 연결에 사용되는 URL도 이러한 제한을 받습니다. 따라서 웹소켓 URL을 구성할 때는 이러한 제한을 고려해야 합니다. 서버 측에서도 URL의 길이에 대한 제한을 설정할 수 있으므로, 서버의 설정도 확인해야 합니다.

실제 사용 시에는 URL의 길이를 가능한 짧게 유지하는 것이 좋으며, 필요한 정보는 쿼리 스트링보다는 메시지 본문이나 다른 방법으로 전달하는 것이 좋습니다. URL이 너무 길어지는 경우, 연결 문제나 데이터 손실의 원인이 될 수 있습니다.
