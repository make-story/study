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
