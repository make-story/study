# event bus (이벤트 버스)

https://betterprogramming.pub/poor-mans-event-bus-with-zero-lines-of-code-d4e66fe8f56b

https://disquiet.io/@junep/makerlog/%EC%9D%B4%EB%B2%A4%ED%8A%B8-%EB%B2%84%EC%8A%A4%EB%A1%9C-%EA%B2%B0%ED%95%A9%EB%8F%84%EB%A5%BC-%EB%82%AE%EC%B6%94%EA%B8%B0-1690937941168

```javascript
// https://pineco.de/creating-a-javascript-event-bus/
// https://lwebapp.com/en/post/event-bus

export default class EventBus {
  bus: any;

  /**
   * Initialize a new event bus instance.
   */
  constructor() {
    // 커스텀 앨리먼트를 만들고(더미 엘리먼트), 해당 앨리먼트 이벤트를 활용
    this.bus = document.createElement('event-element') as HTMLElement;
  }

  /**
   * Add an event listener.
   */
  addEventListener(event: string, callback: (payload: any) => any): void {
    this.bus.addEventListener(event, callback);
  }

  /**
   * Remove an event listener.
   */
  removeEventListener(event: string, callback: (payload: any) => any): void {
    this.bus.removeEventListener(event, callback);
  }

  /**
   * Dispatch an event.
   */
  dispatchEvent(event: string, detail = {}): void {
    this.bus.dispatchEvent(new CustomEvent(event, { detail }));
  }
}

/*
사용 예

import EventBus from './EventBus';
window.EventBus = new EventBus;

document.querySelector('#native-button').addEventListener('click', event => {
  window.EventBus.dispatchEvent('open-vue-modal', { id: 'specific-modal' });
});

window.EventBus.addEventListener('open-vue-modal', event => {
  if (event.detail.id === this.id) {
    this.open();
  }
});
*/
```

# 과거 방식 - 객체({})에 이벤트를 담아놓고(key), 이를 실행

https://newstoday.io/pressroom/how-to-implement-an-event-bus-in-javascript/

```javascript
class EventBus {
  constructor() {
    // 이벤트 리스트 초기화
    this.eventObject = {};
  }
  // 이벤트 발행
  publish(eventName) {
    // 현재 이벤트의 모든 콜백함수 호출
    const callbackList = this.eventObject[eventName];

    if (!callbackList) return console.warn(eventName + ' not found!');

    // 콜백함수 실행
    for (let callback of callbackList) {
      callback();
    }
  }
  // 이벤트 구독
  subscribe(eventName, callback) {
    // 이벤트 초기화
    if (!this.eventObject[eventName]) {
      this.eventObject[eventName] = [];
    }

    // 구독자가 실행할 콜백함수 저장
    this.eventObject[eventName].push(callback);
  }
}

// 테스트
const eventBus = new EventBus();

// eventX 이벤트 구독
eventBus.subscribe('eventX', () => {
  console.log('Module A');
});
eventBus.subscribe('eventX', () => {
  console.log('Module B');
});
eventBus.subscribe('eventX', () => {
  console.log('Module C');
});

// eventX 이벤트 발행
eventBus.publish('eventX');
```
