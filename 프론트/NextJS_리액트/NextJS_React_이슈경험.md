
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