# Proxy

https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Proxy

`한 객체에 대한 기본 작업을 가로채고 재정의`하는 프록시를 만들 수 있습니다.

`study.git/프론트/패턴/Proxy\_패턴.md` 내용 참고!

```javascript
// https://stackoverflow.com/questions/59109571/addeventlistener-on-proxied-event-target
const state = new Proxy(new EventTarget(), {
  get: function (obj, key) {
    const result = Reflect.get(obj, key);
    if (typeof result === 'function') return result.bind(obj);
    return result;
  },
});
//state.addEventListener('change', console.log);
//state.foo = 'bar'; // logs the event
```

# CustomEvent 감시

```typescript
type EventListener = (event: Event) => void;
interface EventDispatcher {
  addEventListener(
    type: string,
    listener: EventListener,
    options?: boolean | AddEventListenerOptions,
  ): void;
  removeEventListener(
    type: string,
    listener: EventListener,
    options?: boolean | AddEventListenerOptions,
  ): void;
  dispatchEvent(event: Event): boolean;
}

// CustomEvent를 감시할 대상 객체의 타입
const targetObject: EventDispatcher = document as EventDispatcher;

// Proxy 생성
const eventDispatcherProxy = new Proxy<EventDispatcher>(targetObject, {
  get: function (target, prop, receiver) {
    if (prop === 'addEventListener') {
      return function (
        type: string,
        listener: EventListener,
        options?: boolean | AddEventListenerOptions,
      ): void {
        console.log(`addEventListener 호출: type - ${type}`);
        // 실제 addEventListener 호출
        target.addEventListener(type, listener, options);
      };
    } else if (prop === 'removeEventListener') {
      return function (
        type: string,
        listener: EventListener,
        options?: boolean | AddEventListenerOptions,
      ): void {
        console.log(`removeEventListener 호출: type - ${type}`);
        // 실제 removeEventListener 호출
        target.removeEventListener(type, listener, options);
      };
    } else if (prop === 'dispatchEvent') {
      return function (event: Event): boolean {
        console.log(`dispatchEvent 호출: type - ${event.type}`);
        // 실제 dispatchEvent 호출
        return target.dispatchEvent(event);
      };
    } else {
      return Reflect.get(target, prop, receiver);
    }
  },
});

// CustomEvent를 생성하고 감시 대상 객체에서 addEventListener, dispatchEvent, removeEventListener 호출
const eventListener: EventListener = event => {
  console.log('이벤트 핸들러 호출');
};
eventDispatcherProxy.addEventListener('customEvent', eventListener);
eventDispatcherProxy.dispatchEvent(new CustomEvent('customEvent'));
eventDispatcherProxy.removeEventListener('customEvent', eventListener);
```

# `모던 웹을 위한 마이크로 프론트엔드` 책 내용 중

프락시를 사용하여 원하는 개체 액세스 및 함수 호출을 포착할 수 있다.

가장 간단한 프락시 중 하나는 사실 모든 것을 처리하는 프락시다.  
다음의 짧은 코드는 모든 스텁(sub)의 90%에 대해서는 굳건한 기초가 된다.

```javascript
const generalProxy = new Proxy(() => generalProxy, {
  get(target, name) {
    if (name === Symbol.toPrimitive) {
      return () => ({}.toString());
    } else {
      return generalProxy();
    },
  },
});
```

# `웹 개발자를 위한 자바스크립트의 모든 것` 책 내용 중

프록시에 대한 많은 사용 사례가 있다.

- 객체에서 발생하는 작업 기록
- 존재하기 않는 속성 읽기/쓰기를 오류로 만들기(undefined 를 반환하거나 속성을 생성하는 대신)
- 두 코드 영역 사이에 경계 제공(예: API 와 컨슈머)
- 변경 가능한 객체의 읽기 전용 뷰 만들기
- 객체에 정보를 숨기거나 객체나 실제보다 더 많은 정보를 갖고 있는 것처럼 보이게 하기

```javascript
const target = {
  message1: 'hello',
  message2: 'everyone',
};

const handler3 = {
  get(target, prop, receiver) {
    if (prop === 'message2') {
      return 'world';
    }
    // Reflect 는 중간에서 가로챌 수 있는 JavaScript 작업에 대한 메서드를 제공하는 내장 객체
    return Reflect.get(...arguments);
  },
};

const proxy3 = new Proxy(target, handler3);

console.log(proxy3.message1); // hello
console.log(proxy3.message2); // world
```
