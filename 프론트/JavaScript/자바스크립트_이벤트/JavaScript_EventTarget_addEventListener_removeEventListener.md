# EventTarget

https://developer.mozilla.org/ko/docs/Web/API/EventTarget/EventTarget

## listener? handler?

https://developer.mozilla.org/ko/docs/Web/API/EventTarget/addEventListener

https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy

## 이벤트 등록 전 해제 (중복, 메모리릭 방지)

함수 내부 이벤트 핸들러(listener) 함수를 생성하는 경우  
상위 함수를 생성하는 경우 이벤트 중복 등록

```javascript
const loggingEvent = () => {
  // 아래의 경우
  // loggingEvent 함수를 실행할 때마다
  // 새로운 listener 함수가 만들어 진다.
  // 그리고 새로운 listener 함수가 event 에 추가(등록)된다.
  const listener = event => console.log(event);

  // 리스너에 사용자 파라미터가 필요한 경우 주로 사용되는 클로저 방식도 동일
  //const listener = (params) => event => console.log(params);
  //document.removeEventListener('click', listener('test'));
  //document.addEventListener('click', listener('test'));

  // 이 경우 아래처럼 removeEventListener 로 초기화하는 것은 무의미하다
  // loggingEvent 함수를 실행할 때마다 새로운 listener 함수가 생성되기 때문에
  // 이전 listener 함수가 이벤트에서 제외(해제)되는 것이 아니기 때문
  document.removeEventListener('click', listener);
  document.addEventListener('click', listener);
};
loggingEvent();
loggingEvent();
```

```javascript
const setAssignEvent = (target, source) => {
  if (!target || !source) {
    return target;
  }
  // 함수, 오브젝트 등에 주입
  return Object.assign(target, source);
};

const loggingEvent = () => {
  // 기존 이벤트 해제
  document.removeEventListener('click', document?._customListener?.test);
  // 중복등록 방지를 위해 주입하려는 객체에 이벤트 핸들러(listener) 주입
  document?._customListener ??
    setAssignEvent(document, { _customListener: {} });
  setAssignEvent(document._customListener, {
    test: event => console.log(event),
  });
  // 이벤트 등록
  document.addEventListener('click', document._customListener.test);
};
loggingEvent();
loggingEvent();
```

## addEventListener

## removeEventListener
