# 사용자 이벤트

```javascript
// 이벤트 타입
export const EVENT_TYPE = {
  EVENT_TEST: 'EVENT_TEST', // test
};

// 이벤트 청취
// const listener = ({ detail }: any = {}) => console.log(detail);
// eventOn('EVENT_TYPE', listener);
export const eventOn = (type, listener, options = false) => {
  //if (Object.values(EVENT_TYPE).includes(type)) {
  document.addEventListener(type, listener, options);
  //} else {
  //throw 'event type error';
  //}
};

// 이벤트 해제
// const listener = ({ detail }: any = {}) => console.log(detail);
// eventOff('EVENT_TYPE', listener);
export const eventOff = (type, listener, options = false) => {
  //if (Object.values(EVENT_TYPE).includes(type)) {
  document.removeEventListener(type, listener, options);
  //} else {
  //throw 'event type error';
  //}
};

// 이벤트 실행
// eventDispatch('EVENT_TYPE', 'TEST');
// TODO: datail 에 대한, 이벤트 타입별 규격화가 필요하다. (같은 이벤트라도 파라미터가 종류가 다를 수 있는 위험성 제거 필요)
export const eventDispatch = (type, ...detail) => {
  //if (Object.values(EVENT_TYPE).includes(type)) {
  // https://developer.mozilla.org/ko/docs/Web/API/CustomEvent/CustomEvent
  document.dispatchEvent(new CustomEvent(type, { detail }));
  //} else {
  //throw 'event type error';
  //}
};
```

```javascript
const eventName = 'testEvent';
const eventOptions = null;
const setTestEvent = (...detail) => {
  document.dispatchEvent(new CustomEvent(eventName, { detail }));
};

// 사용자 이벤트 실행
const setLog = ({ detail }) => console.log('사용자 이벤트 로그', detail);

// 기존 이벤트 정지
document.removeEventListener(eventName, setLog, eventOptions);

// 신규 이벤트 주입
document.addEventListener(eventName, setLog, eventOptions);

// 테스트 실행
setTestEvent(1, 2, 3); // 사용자 이벤트 로그 [1, 2, 3]
```
