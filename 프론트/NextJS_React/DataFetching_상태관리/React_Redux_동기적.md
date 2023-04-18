```javascript
/**
 * 스토어 dispatch 후 동기적 실행
 */
export const fetchAndWaitStore = (store: Store, actionCreator: any, params = []) =>
  new Promise(resolve => {
    store.dispatch(actionCreator);
    // subscribe : store에 변화가 일어날 때(state값이 변경될 때) 자동으로 실행됨(리스너).
    // 반환값 : 변경 리스너를 구독 해지하는 함수.
    const unsubscribe = store.subscribe(() => {
      const state = store.getState();
      unsubscribe();
      return resolve(state);
    });
  });
```

```javascript
export const getServerSideProps = wrapper.getServerSideProps(async context => {
  const { store, req, res, params, query /* ?a=b 파라미터값 */ } = context;
  const { headers, method } = req;
  const {} = query;

  // dispatch (fetch, 데이터 호출)
  await fetchAndWaitStore(store, 액션함수); // dispatch 동기적 실행
  // ...
  store.dispatch(END);
  await (store as SagaStore).sagaTask?.toPromise();

  return {
    props: {
      referer: headers?.referer || '',
    },
  };
});
```