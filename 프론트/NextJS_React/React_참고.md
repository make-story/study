# props.children 에 ref 주입하기

https://stackoverflow.com/questions/63654496/is-it-possible-to-add-ref-to-the-props-children-elements

`React.Children and React.cloneElement`

```javascript
const FunctionComponentForward = React.forwardRef((props, ref) => <div ref={ref}>Function Component Forward</div>);

const Form = ({ children }) => {
  const childrenRef = useRef([]);

  useEffect(() => {
    console.log('Form Children', childrenRef.current);
  }, []);

  return (
    <>
      {React.Children.map(children, (child, index) =>
        React.cloneElement(child, {
          ref: ref => (childrenRef.current[index] = ref),
        }),
      )}
    </>
  );
};

const App = () => {
  return (
    <Form>
      <div>Hello</div>
      <FunctionComponentForward />
    </Form>
  );
};
```

---

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

---

# 합성 이벤트 (SyntheticEvent)

https://ko.reactjs.org/docs/events.html
