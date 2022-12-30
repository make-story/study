# NextJS 이슈 슈팅

## 현재 위치한 페이지 URL 로 Link 실행했을 때, 해당 페이지 일부 비동기 데이터 로드 안되는 문제

`<Link />`로 동일화면 이동 시 Redux state는 rehydration 되는 데,  
컴포넌트는 remount 되지 않아 화면진입 시 호출되던 dispatch 들이 실행되지 않는 문제  
link에 shallow 옵션을 주면 rehydration이 되어 데이터가 소실되는 것을 막을 수 있음

```javascript
<Link href={urlMain} shallow={router.asPath.startsWith(urlMain)}>
```

# The ref value containerRef.current will likely have changed by the time this effect cleanup function runs.

https://stackoverflow.com/questions/67069827/cleanup-ref-issues-in-react

```javascript
useEffect(() => {
  let element: any = null;
  const ready = (event: any) => {
    console.log('!!!!', event);
  };
  if (refLottiePlayer?.current) {
    refLottiePlayer?.current?.addEventListener('ready', ready);
    element = refLottiePlayer?.current;
  }
  return () => {
    if (element) {
      element?.removeEventListener('ready', ready);
    }
  };
}, [refLottiePlayer]);
```

---

# React

---

# Redux

## 리덕스 상태값 JOSN 형태에서 값이 undefined 인 필드(key)는 결과값에서 제외될 수 있음

```javascript
const initialState = {
  gnbLogo: null,
  gnbData: {
    header: null,
    menus: [],
  },
  gnbError: null,
};

export default function reducer(state: IProps = initialState, action: AnyAction) {
  switch (action.type) {
    // ...

    case headerAction.SET_GNB_LOGO:
      return {
        ...state,
        gnbLogo: action.payload, // payload 값이 undefined 이면, gnbLogo 는 redux state 에서 제거된 상태로 노출될 수 있음
      };

    case headerAction.SET_GNB_ERROR:
      return {
        ...state,
        gnbError: action.payload,
      };

    // ...

    default:
      return state;
  }
}
```
