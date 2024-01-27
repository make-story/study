# 리액트 훅스 컴포넌트에서 setInterval 사용 시의 문제점

https://velog.io/@jakeseo_me/%EB%B2%88%EC%97%AD-%EB%A6%AC%EC%95%A1%ED%8A%B8-%ED%9B%85%EC%8A%A4-%EC%BB%B4%ED%8F%AC%EB%84%8C%ED%8A%B8%EC%97%90%EC%84%9C-setInterval-%EC%82%AC%EC%9A%A9-%EC%8B%9C%EC%9D%98-%EB%AC%B8%EC%A0%9C%EC%A0%90

```javascript
const savedCallback = useRef<any>();
function callback() {
	setStateOffset(stateOffset + 1);
}
useEffect(() => {
	savedCallback.current = callback;
});
useEffect(() => {
	const id = setInterval(tick, 10000);
	function tick() {
		savedCallback.current();
	}
	return () => clearInterval(id);
}, []);
useEffect(() => {
	console.log('stateOffset', stateOffset);
	dispatch(
		getOnlineProductsReviewType({
			offset: stateOffset,
		}),
	);
}, [offset]);
```

# Hook 익명함수(arrow function) 사용하지 않는 이유

https://dev.to/deckstar/react-pro-tip-1-name-your-useeffect-54ck

- 기명함수로 다른 개발자에게 해당 함수의 기능을 명확하게 제공
- 해당 함수(코드) 오류발생 시 함수이름으로 추적이 쉬워짐

## 참고 - 과거 가이드에서는 기명함수로 예제 제공, 현재 가이드에서는 익명함수(화살표 함수)로 예제 제공

과거 리액트 공식 가이드 사이트 - 일반 함수를 사용!
https://legacy.reactjs.org/docs/hooks-rules.html#explanation

현재 리액트 공식 가이드 사이트 - 익명 함수를 사용!
https://react.dev/reference/react/useCallback
