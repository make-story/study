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

- 기명함수로 다른 개발자에게 해당 함수의 기능을 명확하게 제공 (함수가 왜 만들어 졌는지)
- 해당 함수(코드) 오류발생 시 함수이름으로 추적이 쉬워짐

## 왜 useCallback 에 기명함수를 넘겨주었나요? - p214

일반적으로 useCallback 이나 useMemo 를 사용할 때 useEffect 와 마찬가지로 많은 코드가 익명 함수로 첫 번쨰 인수를 넘겨 준다.

기명함수를 작성할 경우,  
이는 `크롬 메모리 탬에서 디버깅을 용이하게 하기 위함이다.` (자바스크립트 매모리 스냅샷, 크롬 리액트 개발 도구에서도 기명함수의 경우 유용)  
익명 함수는 말 그대로 이름이 없어 함수를 추적하기 어렵기 때문이다.

(기명 함수로 선언한 함수를 크롬 개발자 도구에서 디버깅하는 방법은 '크롬 개발자 도구를 활용한 애플리케이션 분석 - p432' 에서 확인!)

## 참고 - 과거 가이드에서는 기명함수로 예제 제공, 현재 가이드에서는 익명함수(화살표 함수)로 예제 제공

과거 리액트 공식 가이드 사이트 - 일반 함수를 사용!
https://legacy.reactjs.org/docs/hooks-rules.html#explanation

현재 리액트 공식 가이드 사이트 - 익명 함수를 사용!
https://react.dev/reference/react/useCallback
