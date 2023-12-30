# 중재자 역할을 하는 객체 통해 컴포넌트들이 서로 통신하도록 한다

https://patterns-dev-kr.github.io/design-patterns/mediator-middleware-pattern/  
https://www.patterns.dev/posts/mediator-pattern/

`컴포넌트들이 서로 직접 통신하는 대신 중재자 역할을 하는 객체를 통하도록 한다.`  
중재가 객체가 요청을 받아 이를 필요로 하는 객체들에게 전달하는 것이다.  
중재자는 보통 객체나 함수로 구현된다.

이 패턴은 공항에서 비행기의 동선을 관리하는 관제소에 비교할 수 있다.  
비행기끼리 직접 통신하면 사고로 이어질 수 있겠지만 관제소에서 상황을 전달받아 통제를 하게 되면 서로 충돌 없이 안전하게 활주로를 이용할 수 있게 된다.

실무에서 이 중재재 패턴이 적합한 곳은 채팅을 구현할 때 이다.  
채팅 앱에서 사용자는 메시지를 직접 서로 주고 받지 않는다.  
그 대신 채팅 서버에 메시지를 전송하고 서버가 각 사용자에게 메시지를 전달하는 형태이다.

```javascript
class ChatRoom {
  logMessage(user, message) {
    const sender = user.getName();
    console.log(`${new Date().toLocaleString()} [${sender}]: ${message}`);
  }
}

class User {
  constructor(name, chatroom) {
    this.name = name;
    this.chatroom = chatroom;
  }

  getName() {
    return this.name;
  }

  send(message) {
    this.chatroom.logMessage(this, message);
  }
}

const chatroom = new ChatRoom();

const user1 = new User('John Doe', chatroom);
const user2 = new User('Jane Doe', chatroom);

user1.send('Hi there!');
user2.send('Hey!');
```

위의 예제에서 사용자는 ChatRoom과 연결되는 User를 만들어낼 수 있고. 각 인스턴스는 send메서드를 통해 다른 사용자에게 메시지를 전송할 수 있다.

---

# 사례 분석

Express.js는 많이 사용하는 웹 서버 프레임웍이다. 특정 라우팅 경로에 대해 콜백을 추가함으로써 요청을 처리할 수 있다.

'/' 경로를 요청했을 때 요청에 헤더를 추가해야 한다고 가정해 보자. 아래 예시와 같이 미들웨어를 추가하여 처리할 수 있다.

```javascript
const app = require('express')();

app.use('/', (req, res, next) => {
  req.headers['test-header'] = 1234;
  next();
});
```
