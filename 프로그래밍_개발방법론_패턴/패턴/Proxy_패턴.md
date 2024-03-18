# Proxy

https://patterns-dev-kr.github.io/design-patterns/proxy-pattern/

일반적으로 Proxy는 어떤 이의 대리인을 뜻한다.  
그 사람과 직접이야기하는 것 대신. 이야기를 원하는 사람의 대리인에게 이야기하는것이다.  
JavaScript에서도 해당 객체를 직접 다루는 것이 아니고 Proxy 객체와 인터렉션하게 된다.

```javascript
const person = {
  name: 'John Doe',
  age: 42,
  nationality: 'American',
};
```

person 객체와 직접 인터렉션하는 것 대신 personProxy 객체와 인터렉션하게 된다.

```javascript
const personProxy = new Proxy(person, {
  get: (obj, prop) => {
    console.log(`The value of ${prop} is ${obj[prop]}`);
  },
  set: (obj, prop, value) => {
    console.log(`Changed ${prop} from ${obj[prop]} to ${value}`);
    obj[prop] = value;
  },
});
```

```javascript
personProxy.name; // The value of name is John Doe
personProxy.age = 43; // Changed age from 42 to 43
```

Proxy는 유효성 검사를 구현할 때 유용하다.  
사용자는 person 객체의 age 프로퍼티를 문자열로 수장할 수 없고 또는 name 프로퍼티를 빈 문자열로 초기화할 수 없다.  
그리고 사용자가 person 객체에 존재하지 않는 프로퍼티에 접근하려 하면. 알려줄 수 있다.

```javascript
const personProxy = new Proxy(person, {
  get: (obj, prop) => {
    if (!obj[prop]) {
      console.log(
        `Hmm.. this property doesn't seem to exist on the target object`,
      );
    } else {
      console.log(`The value of ${prop} is ${obj[prop]}`);
    }
  },
  set: (obj, prop, value) => {
    if (prop === 'age' && typeof value !== 'number') {
      console.log(`Sorry, you can only pass numeric values for age.`);
    } else if (prop === 'name' && value.length < 2) {
      console.log(`You need to provide a valid name.`);
    } else {
      console.log(`Changed ${prop} from ${obj[prop]} to ${value}.`);
      obj[prop] = value;
    }
  },
});
```

## 활용 예

URL 파라미터 객체({ ... }) 형태로 사용

```typescript
const urlParsed = new URL('http://localhost:3000/test/page');
const query = new Proxy(new URLSearchParams(urlParsed.search), {
  get: (searchParams, prop) => searchParams.get(prop as string),
});
```

이벤트 관리

```typescript
/**
 * EventTarget
 * https://developer.mozilla.org/ko/docs/Web/API/EventTarget
 */
export interface EventDispatcher extends EventTarget {
  addEventListener(
    type: string,
    listener: EventListener,
    options?: EventOptions,
  ): void;
  removeEventListener(
    type: string,
    listener: EventListener,
    options?: EventOptions,
  ): void;
  dispatchEvent(event: Event): boolean;
}

/**
 * CustomEvent / Event
 * https://developer.mozilla.org/ko/docs/Web/API/CustomEvent
 * https://developer.mozilla.org/ko/docs/Web/API/Event
 */
export interface CustomEventType<T = any> extends Event {
  // CustomEvent 와 Event 대응
  detail: T;
}

// targetObject: CustomEvent를 감시할 대상 객체의 타입
const eventDispatcher = new Proxy<EventDispatcher>(
  (targetObject = document as EventDispatcher),
  {
    get: function (target, prop, receiver) {
      if (prop === 'addEventListener') {
        return function (
          type: string,
          listener: EventListener,
          options?: boolean | AddEventListenerOptions,
        ): void {
          //console.log(`addEventListener 호출: type - ${type}`);
          // 실제 addEventListener 호출
          target.addEventListener(type, listener, options);
        };
      } else if (prop === 'removeEventListener') {
        return function (
          type: string,
          listener: EventListener,
          options?: boolean | AddEventListenerOptions,
        ): void {
          //console.log(`removeEventListener 호출: type - ${type}`);
          // 실제 removeEventListener 호출
          target.removeEventListener(type, listener, options);
        };
      } else if (prop === 'dispatchEvent') {
        return function (event: CustomEventType): boolean | undefined {
          // 사용자가 실행한 이벤트인지 여부: event?.isTrusted
          //console.log(`dispatchEvent 호출: type - ${event.type}`);
          // 실제 dispatchEvent 호출
          return target.dispatchEvent(event);
        };
      } else {
        return Reflect.get(target, prop, receiver);
      }
    },
  },
);

// 아래와 같이 이벤트 주입 등이 있을 경우, proxy 로 감시 가능
document.addEventListener('click', () => void);
```

---

# Reflect

JavaScript는 Reflect라는 빌트인 객체를 제공하는데 Proxy와 함께 사용하면 대상 객체를 쉽게 조작할 수 있다.

```javascript
const person = {
  name: 'John Doe',
  age: 42,
  nationality: 'American',
};

const personProxy = new Proxy(person, {
  get: (obj, prop) => {
    console.log(`The value of ${prop} is ${Reflect.get(obj, prop)}`);
  },
  set: (obj, prop, value) => {
    console.log(`Changed ${prop} from ${obj[prop]} to ${value}`);
    return Reflect.set(obj, prop, value);
  },
});

personProxy.name;
personProxy.age = 43;
personProxy.name = 'Jane Doe';
```
