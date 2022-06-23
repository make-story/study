
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