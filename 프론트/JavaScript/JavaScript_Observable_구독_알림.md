# Observable - RxJS

https://reactivex.io/documentation/ko/observable.html

Observable 은 데이터의 흐름에 맞게 알림을 보내 구독자가 데이터 처리를 할 수 있도록 만든다.

```javascript
// Observable 클래스 정의
class Observable {
  constructor() {
    this.observers = []; // 옵저버를 저장할 배열
  }

  // 옵저버를 추가하는 메서드
  addObserver(observer) {
    this.observers.push(observer);
  }

  // 변화를 알리는 메서드
  notify(data) {
    this.observers.forEach(observer => {
      observer(data);
    });
  }
}

// 테스트용 예시
const observable = new Observable();

// 옵저버 추가
observable.addObserver(data => {
  console.log('첫 번째 옵저버:', data);
});

observable.addObserver(data => {
  console.log('두 번째 옵저버:', data);
});

// 변화 알림
observable.notify('안녕하세요!');
```

```javascript
let handlers = Symbol('handlers');

function makeObservable(target) {
  // 1. 핸들러를 저장할 곳을 초기화합니다.
  target[handlers] = [];

  // 나중에 호출될 것을 대비하여 핸들러 함수를 배열에 저장합니다.
  target.observe = function (handler) {
    this[handlers].push(handler);
  };

  // 2. 변경을 처리할 프락시를 만듭니다.
  return new Proxy(target, {
    set(target, property, value, receiver) {
      let success = Reflect.set(...arguments); // 동작을 객체에 전달합니다.
      if (success) {
        // 에러 없이 프로퍼티를 제대로 설정했으면
        // 모든 핸들러를 호출합니다.
        target[handlers].forEach(handler => handler(property, value));
      }
      return success;
    },
  });
}

let user = {};
user = makeObservable(user);
user.observe((key, value) => {
  alert(`SET ${key}=${value}`);
});
user.name = 'John';
```
