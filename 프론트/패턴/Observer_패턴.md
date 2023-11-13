# Observable 을 활용해 Subscriber에게 이벤트 발생을 알린다 (옵져버)

https://patterns-dev-kr.github.io/design-patterns/observer-pattern/  
https://www.patterns.dev/posts/observer-pattern/

Observer 패턴에서 특정 객체를 구독할 수 있는데. 구독하는 주체를 Observer라 하고. 구독 가능한 객체를 Observable이라 한다.  
`이벤트가 발생할 때 마다 Observable은 모든 Observer에게 이벤트를 전파`한다.

Observable 객체는 보통 3가지 주요 특징을 포함한다

- observers : 이벤트가 발생할때마다 전파할 Observer들의 배열
- subscribe() : Observer를 Observer 배열에 추가한다
- unsubscribe() : Observer 배열에서 Observer를 제거한다
- notify() : 등록된 모든 Observer들에게 이벤트를 전파한다

ES6 클래스를 사용하여 Observable을 구현한 예제

```javascript
class Observable {
  constructor() {
    this.observers = [];
  }

  subscribe(func) {
    this.observers.push(func);
  }

  unsubscribe(func) {
    this.observers = this.observers.filter((observer) => observer !== func);
  }

  notify(data) {
    this.observers.forEach((observer) => observer(data));
  }
}
```

subscribe메서드를 통해 Observer를 등록하고 반대로 unsubscribe를 통해 등록 해지할 수 있다.  
그리고 notify메서드를 통해 모든 Observer에게 이벤트를 전파할 수 있다.

```javascript
import React from "react";
import { Button, Switch, FormControlLabel } from "@material-ui/core";
import { ToastContainer, toast } from "react-toastify";
import observable from "./Observable";

function handleClick() {
  observable.notify("User clicked button!");
}

function handleToggle() {
  observable.notify("User toggled switch!");
}

function logger(data) {
  console.log(`${Date.now()} ${data}`);
}

function toastify(data) {
  toast(data, {
    position: toast.POSITION.BOTTOM_RIGHT,
    closeButton: false,
    autoClose: 2000,
  });
}

observable.subscribe(logger);
observable.subscribe(toastify);

export default function App() {
  return (
    <div className="App">
      <Button variant="contained" onClick={handleClick}>
        Click me!
      </Button>
      <FormControlLabel
        control={<Switch name="" onChange={handleToggle} />}
        label="Toggle me!"
      />
      <ToastContainer />
    </div>
  );
}
```

handleClick 과 handleToggle 이 Observable의 notify 를 호출하고. 뒤이어 이를 구독하고 있던 Observer logger 와 toastify 함수는 이 이벤트를 받아 특정 동작을 수행한다.
앱 내에서 인터렉션이 발생하는 동안 logger 와 toastify 는 notify 의 호출로부터 이벤트를 계속 받을 수 있다.

Observer 패턴은 다양하게 활용할 수 있지만 비동기 호출 혹은 이벤트 기반 데이터를 처리할 때 매우 유용하다.
