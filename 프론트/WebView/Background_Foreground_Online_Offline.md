# 웹뷰 환경 특성상 사용자들은 애플리케이션을 Background로 내리고 시간이 지난 뒤 Foreground로 올리는 사용 행태

https://tech.kakaopay.com/post/react-query-1/

앱이 Foreground로 올라온 시점에 데이터의 동기화가 다시 수행

```javascript
// Todo.tsx
function Todo() {
  // ...전략

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        dispatch(requestFetchTodos());
      }
    }

    // window focus 이벤트 발생시 Todo API 요청
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [dispatch]);

  return (
    // ...후략
  );
}

export default Todo;
```

사용자 경험 향상을 위한 시나리오 수행을 위해 위와 같은 코드를 개발자가 직접 구현하면 개발 리소스가 과다하게 소모되고,  
프로젝트의 규모가 커지면 코드의 복잡도까지 높아져 유지보수에 대한 부담도 커지게 될 것입니다.

---

# 참고 코드

https://developer.mozilla.org/ko/docs/Web/API/Document/visibilitychange_event

```javascript
document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "visible") {
    backgroundMusic.play();
  } else {
    backgroundMusic.pause();
  }
});
```

```javascript
/**
 * 화면 visible 이벤트
 * - 해당이벤트를 지원하지 않는 경우에는 이벤트가 발생하지 않음
 */
(function () {
  // visibilitychange 이벤트
  var state = "visibilityState";
  var visibilitychange = "visibilitychange";
  var latestTime = new Date().getTime();

  if (document.webkitVisibilityState) {
    state = "webkitVisibilityState";
    visibilitychange = "webkitvisibilitychange";
  }

  if (!document[state] || !document.addEventListener) {
    return;
  }

  document.addEventListener(visibilitychange, function (e) {
    var currentTime = new Date().getTime();
    var diffTime = currentTime - latestTime;

    switch (document[state]) {
      case "hidden":
        latestTime = currentTime;
        eventProxyManager.trigger(cjosEventProxyTypes.WINDOW_EVENT.HIDDEN, {
          diffTime: diffTime,
        });
        break;
      case "visible":
        eventProxyManager.trigger(cjosEventProxyTypes.WINDOW_EVENT.VISIBLE, {
          diffTime: diffTime,
        });
        latestTime = currentTime;
        break;
    }
  });
})();
```

```javascript
// IOS등에서는 화면노출여부에 따라 socket이 자동 종료됨
document.addEventListener(
  "visibilitychange",
  function (event) {
    /*
	-
	document.visibilityState
	'visible' : 페이지 내용은 적어도 부분적으로 보일 수 있습니다. 실제로 이는 페이지가 최소화 되지 않은 창(브라우저)에서의 선택된 탭 을 의미 합니다.
	'hidden' : 페이지 내용은 사용자에게 표시되지 않습니다. 실제로 이는 document가 background-tap(다른 탭)이거나, 최소화 된 창의 일부이거나, OS 화면 잠금이 활성 상태임을 의미합니다.
	'prerender' : 페이지 내용이 pre-rendering되어 사용자에게 보이지 않습니다 (document.hidden 목적으로 숨겨진 것으로 간주 합니다.). document는이 상태에서 시작될 수 있지만, 절대로 다른 값에서 이 값으로 전환되지는 않습니다. 참고 : 브라우저 지원은 선택 사항입니다.
	'unloaded' : 페이지가 메모리에서 로드되지 않았습니다. 참고 : 브라우저 지원은 선택 사항입니다.
	*/
    //console.log('document.visibilityState', document.visibilityState);
    if (document.visibilityState === "visible") {
      setSocketCheck();
    }
  },
  false
);
```

# 온라인 (online), 오프라인 (offline)

```javascript
// network 여부 확인
const isNetwork = (event) => {
  if (window.navigator.onLine === true) {
    setSocketCheck();
  }
};
// window, document, document.body
window.addEventListener("online", isNetwork, false);
window.addEventListener("offline", isNetwork, false);
```
