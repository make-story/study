# 비즈니스 로직

- 추천방법1:
  - 댄 아브라모프(Dan Abramov)의 프레젠테이션(Presentational), 컨테이너(Container, 비즈니스로직) 컴포넌트로 분리
- 추천방법2:
  - useQueryXXX(react-query API) 와 useXXX(비즈니스 또는 유틸) 등 사용자 Hooks 로 분리

# 관심사 분리를 위한 프레젠테이션(Presentational), 컨테이너(Container) 컴포넌트 구분하기

댄 아브라모프(Dan Abramov)의 블로그 포스트로 잘 알려진 컴포넌트 구분법이 있다.  
UI 처리, API 호출, DB 관리 등의 코드가 같은 곳에 있으면 복잡하기 때문에 이들은 서로 관심사가 다르다로 보고 분리해서 관리하는 게 좋다.

프레젠테이션 컴포넌트의 정의는 다음과 같다.

- 비즈니스 로직이 없다.
- 상태값이 없다. 단, 마우스 오버(mouse over)와 같은 UI효과를 위한 상태값은 제외한다.

## Presentational & Container 분리는 이제 그만?

Dan Abramov  
https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0

```javascript
export default function ShopProducts() {
  const loading = useSelector(state => state.shop.loading);
  const products = useSelector(state => state.shop.products);
  const dispatch = useDispatch();

  useEffect(() => {
    // products 조회 로직 ...
  }, [dispatch]);
  const onPurchase = product => {
    /* 결제 로직 ... */
  };

  return <div>{/* UI ... */}</div>;
}
```

`useHook 사용` MVVM 모델

https://www.youtube.com/watch?v=bjVAVm3t5cQ

- 컨테이너에는 useHook(사용자훅) 을 import
- useHook(사용자훅) 내부에서는 API Fetch 및 데이터 가공하여 제공
- 컨테이너는 useHook(사용자훅) 상태를 하위 View 에 제공

---

# Module Pattern

https://www.patterns.dev/posts/module-pattern/

# Container / Presentational Pattern

https://www.patterns.dev/posts/presentational-container-pattern/

# Hooks Pattern

https://www.patterns.dev/posts/hooks-pattern/

```javascript
function useKeyPress(targetKey) {
  const [keyPressed, setKeyPressed] = React.useState(false);

  function handleDown({ key }) {
    if (key === targetKey) {
      setKeyPressed(true);
    }
  }

  function handleUp({ key }) {
    if (key === targetKey) {
      setKeyPressed(false);
    }
  }

  React.useEffect(() => {
    window.addEventListener('keydown', handleDown);
    window.addEventListener('keyup', handleUp);

    return () => {
      window.removeEventListener('keydown', handleDown);
      window.removeEventListener('keyup', handleUp);
    };
  }, []);

  return keyPressed;
}
```
