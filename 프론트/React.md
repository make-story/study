# 기본
https://ko.reactjs.org/docs/hello-world.html  


# 컴포넌트 구성 요소
- 프로퍼티  
상위 컴포넌트에서 하위 컴포넌트로 전달되는 읽기 전용 데이터 입니다.  

- state  
컴포넌트의 상태를 저장하고 변경할 수 있는 데이터 입니다.  

- 컨텍스트  
부모 컴포넌트에서 생성하여 모든 자식 컴포넌트에 전달하는 데이터 입니다.  


-----


# map 반복문 렌더시 key 값 - 리렌더링 주의!
문제 : 데이터 리스트 추가에 따라 컴포넌트가 append 되는 부분만 렌더하는 것이 아닌, 전체 리스트를 다시 렌더링 하는 경우가 있다.
원인 : 반복문 React key 속성값 랜덤인 경우 재렌더링 발생!


# 리액트 컴포넌트 내부 변수선언 주의! (리렌더링에 따라 초기화가 안되어야 하는 값)
useRef 를 사용
- 타임아웃, 인터벌 등 타임 관련 고유값
- 클래스 인스턴스 값
- 스크롤 위치 값 


## && 연산자 사용 시 주의할 점
<div>
	{!!value && <p>출력</p>}
</div>


## DOM 앨리먼트 (HTML 기본 속성 -> 리액트 사용법)
- https://ko.reactjs.org/docs/dom-elements.html  


-----


## 클래스형 컴포넌트와 함수형 컴포넌트
리액트 16.8 이전 버전의 함수형 컴포넌트가 할 수 없는 일은 다음과 같다.  
- 상태값을 가질 수 없다.
- 리액트 컴포넌트의 생명 주기 함수를 작성할 수 없다.
`리액트 버전 16.8 부터 훅(Hook)이라는 기능이 추가되면서 함수형 컴포넌트에서도 상태값과 생명 주기 함수 코드를 작성할 수 있게 되었다.`  


-----


## Hooks
리액트 컴포넌트에서 외부 데이터를 가져오려면  
useState 와 useEffect 훅을 함께 사용해야 한다.  
useState 훅을 사용해 fetch 의 응답을 상태에 저장하고, useEffect 훅을 사용해 fetch 요청을 만든다.  


### useState
`useState 상태값 변경 함수는 기본 비동기로 동작`  
```javascript
const [count, setCount] = useState(0);

setCount(count + 1); // 1
setCount(count + 1); // 1
```


`상태값 변경 함수의 인수로 함수를 입력할 수 있음`
```javascript
const [count, setCount] = useState(0);

setCount(prev => prev + 1); // 1
setCount(prev => prev + 1); // 2
```


`상태값 변경 함수는 비동기로 처리되지만 그 순서가 보장`  
```javascript
const [count1, setCount1] = useState(0);
const [count2, setCount2] = useState(0);

function onClick() {
	// count1 상태값을 먼저 증가하고 count2 상태값은 나중에 증가 한다.
	setCount1(count1 + 1);
	setCount1(count2 + 1);
}

// 상태값 변경 함수의 호출 순서대로 상태값이 변경되기 때문에 result 변수는 항상 참이다.
const result = count1 >= count2;
```


`하나의 useState 훅으로 여러 상태값 관리하기`  
```javascript
const [state, setState] = useState({ name: '', age: 0 });

setState({ ...state, name: 'a' });
setState({ ...state, age: 1 });
```


### useRef
`돔 요소 접근`
```javascript
function TextInput() {
	const inputRef = useRef();

	useEffect(() => {
		// ref 객체의 current 속성을 이용하여 접근
		inputRef.current.focus();
	}, []);

	return (
		<div>
			<input type="text" ref={inputRef} />
			<button>저장</button>
		</div>
	);
}
```


`forwardRef 함수로 ref 속성값을 직접 처리하기`
// https://ko.reactjs.org/docs/forwarding-refs.html
```javascript
// forwardRef 함수를 이용하면 부모 컴포넌트에서 넘어온 ref 속성값을 직접 처리할 수 있다.
const TextInput = React.forwardRef((props, ref) => (
	<div>
		<input type="text" ref={ref} />
		<button>저장</button>
	</div>
));

function Form() {
	const inputRef = useRef();
	return (
		<div>
			<TextInput ref={inputRef} />
			<button onClick={() => inputRef.current.focus()}>텍스트로 이동</button>
		</div>
	);
}
```
```javascript
// 타잆스크립트 사용할 경우
const TextInput = React.forwardRef<any, any>((props, ref) => (
	<div>
		<input type="text" ref={ref} />
		<button>저장</button>
	</div>
);

function Form() {
	const inputRef = useRef<HTMLElement>();
	return (
		<div>
			<TextInput ref={inputRef} />
			<button onClick={() => inputRef.current.focus()}>텍스트로 이동</button>
		</div>
	);
}
```


`ref 속성값으로 함수 사용하기`
ref 속성값에 함수를 입력하면 자식 요소가 생성되거나 제거되는 시점에 호출된다.
```javascript 
function Form() {
	const [text, setText] = useState(INITIAL_TEXT);
	const [showText, setShowText] = useState(true);

	const setInitialText = useCallback(ref => ref && setText(INITIAL_TEXT), []);
	return (
		<div>
			{showText && (
				<input
					text="text"
					ref={setInitialText}
					value={text}
					onChange={e => setText(e.target.value)}	
				/>
			)}
			<button onClick={() => setShow(!showText)}>
				보이기/가리기
			</button>
		</div>
	);
}

const INITIAL_TEXT = '안녕하세요';
```


`렌더링과 무관한 값 저장히기: useRef`
```javascript
function Profile() {
	const [age, setAge] = useState(20);
	const prevAgeRef = useRef(20);

	// 렌더링 끝나면 실행
	useEffect(() => {
		// age 값이 변경되면 그 값을 prevAgeRef 에 저장한다.
		prevAgeRef.current = age;
	}, [age]);

	// age 의 이전 상태값을 이용한다.
	const prevAge = prevAgeRef.current;
	const text = age === prevAge ? 'same' : age > prevAge ? 'older' : 'younger';

	return (
		<div>
			<p>`${age} ${text} ${prevAge}`</p>
			<button 
				onClick={() => {
					const age = Math.floor(Math.random() * 50 + 1);
					// age 가 변경되어 다시 렌더링할 때 prevAge 는 age 의 이전 상태값,
					// 렌더링이 끝나면 useEffect 에 의해, prevAgeRef 는 age 의 최신 상태값으로 변경된다.
					setAge(age);
				}}
			>
				나이변경
			</button>
		</div>
	);
}
```


-----


```javascript
const getAverage = numbers => {
	console.log('평균값 계산 실행');
	if(numbers.length === 0) return 0;
	const sum = numbers.reduce((a, b) => a + b);
	return sum / numbers.length;
};

function reducer(state, action) {
	console.log('reducer 실행');
	// action.type 에 따라 다른 작업 수행
	switch(action.type) {
		case 'INCREMENT':
			return { value: state.value + 1 };
		case 'DECREMENT':
			return { value: state.value - 1 };
		default:
			// 아무것도 해당되지 않을 때 기존 상태 반환
			return state;
	}
}


// 컴포넌트
const Hook = () => {   
	/**
	 * useState
	 */
	// 가변적인 상태를 지닐 수 있게 해줍니다.
	// useState 함수의 파라미터에는 상태의 '기본값'을 넣어 줍니다.
	// 이 함수가 호출되면 배열을 반환하는 데요. 그 배열의 첫 번째 원소는 '상태값', 두 번째 원소는 상태를 설정하는 '함수(세터함수)'입니다.
	// 이 함수에 파라미터를 넣어서 호출하면 전달받은 파라미터로 값이 바뀌고 컴포넌트가 정상적으로 '리렌더링'됩니다.
	// 하나의 useState 함수는 하나의 상태값만 관리할 수 있습니다.
	const [list, setList] = useState([]);
	const [number, setNumber] = useState('');

	// 데이터를 로컬 스토리지에 저장하기
	const loadJSON = key => key && JSON.parse(localStorage.getItem(key));
	const saveJSON = (key, data) => key && localStorage.setItem(key, JSON.stringify(data));
	const [data, setData] = useState(loadJSON(`use:${number}`));


	/**
	 * useEffect
	 */
	// useEffect 는 리액트 '컴포넌트가 렌더링될 때마다 특정 작업을 수행하도록 설정'할 수 있는 Hook
	useEffect(() => {
		console.log('--- --- useEffect');
		console.log('렌더링 되었습니다.');
		console.log('list', list);
		console.log('number', number);
		console.log('--- ---');
	});

	// 마운트 될 때만 실행하고 싶을 때
	// useEffect 에서 설정한 함수를 컴포넌트가 화면에 맨 처음 렌더링될 때만 실행하고, 
	// '업데이트될 때는 실행하지 않으려면 함수의 두번째 파라미터로 비어 있는 배열'을 넣어 주면 된다.
	useEffect(() => {
		console.log('--- --- useEffect');
		console.log('마운트될 때만 실행됩니다.');
		console.log('--- ---');
	}, []);

	// 특정 값이 업데이트될 때만 실행하고 싶을 때 - useState 를 통해 특정 상태 값 업데이트가 발생했을 때, 실행될 수 있도록 할 수 있다. (useState 상태값 업데이트 모니터링)
	// useEffect 를 사용할 때, 특정 값이 변경될 때만 호출하고 싶을 경우도 있겠지요?
	// useEffect 의 두 번째 파리미터로 전달되는 배열 안에 검사하고 싶은 값을 넣어주면, '해당 값이 바뀔때만 실행'
	useEffect(() => {
		console.log('--- --- useEffect');
		console.log('number 값 변경 발생', number);
		console.log('--- ---');
	}, [number]);

	// 뒷정리하기
	// useEffect 는 '기본적으로 렌더링되고 난 직후마다 실행'되며, 두 번째 파라미터 배열에 무엇을 넣는지에 따라 실행되는 조건이 달라집니다.
	// 컴포넌트가 '언마운트되기 전이나 업데이트되기 직전에 어떠한 작업을 수행하고 싶다면, useEffect 에서 뒷정리(cleanup) 함수를 반환'해 주어야 합니다.
	// '오직 언마운트될 때만 뒷정리 함수를 호출하고 싶다면, useEffect 함수의 두 번째 파라미터에 비어있는 배열'을 넣으면 됩니다.
	useEffect(() => {
		console.log('--- --- useEffect');
		console.log('effect (렌더링 되었습니다.)');
		console.log('--- ---');
		return () => {
			console.log('--- --- useEffect');
			console.log('cleanup (리렌더링하기 전 입니다.)');
			console.log('--- ---');
		};
	});

	// 의존 관계 배열 (배열 내 값의 변경이 있을 때만 useEffect 실행)
	useEffect(() => {
		//
	}, [list, number]); // list 또는 number 값의 변경이 있을 때 실행

	// async 함수는 promise 객체를 리턴하기 때문에
	// useEffect 함수 자체를 async 함수로 사용할 수는 없다
	/*useEffect(async () => { 
		const result = await axios.get();
	}, []);*/
	/*useEffect(() => { 
		// async 는 내부에서 만들어줘야 한다.
		const fetchArticles = async () => {
			try {
				const result = await axios.get();
				setArticles(result.data);
			}catch (error) {
			
			}
		}
		fetchArticles();
	}, []);*/


	/**
	 * useLayoutEffect
	 */
	// useEffect와 동일하긴 한데, 모든 DOM 변경 후에 동기적으로 발생
	// 이것은 DOM에서 레이아웃을 읽고 동기적으로 리렌더링하는 경우에 사용
	// useLayoutEffect의 내부에 예정된 갱신은 브라우저가 화면을 그리기 이전 시점에 동기적으로 수행


	/**
	 * useReducer
	 */
	// useReducer 는 useState 보다 더 다양한 컴포넌트 상황에 따라 상태를 다른 값으로 업데이트해 주고 싶을 때 사용하는 Hook 입니다.
	// 리듀서는 현재 상태, 그리고 업데이트를 위해 필요한 정보를 담은 액션(action) 값을 전달받아 새로운 상태를 반환하는 함수입니다.
	// 리듀서 함수에서 새로운 상태를 만들 때는 반드시 '불변성'을 지켜주어야 합니다.
	// useReducer 의 첫 번째 파라미터에는 리듀서 함수를 넣고, 두 번째 파라미터에는 해당 리듀서의 기본값을 넣어 줍니다.
	// 이 Hook 을 사용하면 state 값과 dispatch 함수를 받아 오는데요. 여기서 state 는 현재 가지키고 있는 상태고, dispatch 는 액션을 발생시키는 함수입니다.
	// dispatch(action) 과 같은 형태로, 함수 안에 파라미터로 액션 값을 넣어주면 리듀서 함수가 호출되는 구조입니다.
	// useReducer 를 사용했을 때의 가장 큰 장점은 컴포넌트 업데이트 로직을 컴포넌트 바깥으로 빼낼 수 있다는 것입니다.
	const [state, dispatch] = useReducer(reducer, { value: 0 });
	const [stateCustom, dispatchCustom] = useInputs({ // 커스텀 Hook - 내부 useReducer 사용
		name: '',
		nickname: '',
	});
	const { name, nickname } = stateCustom;


	/**
	 * useMemo
	 */
	// useMeno 를 사용하면 함수형 컴포넌트 내부에서 발생하는 연산을 최적화 할 수 있습니다.
	// useMemo 는 렌더링하는 과정에서 특정 값이 바뀌었을 때만 연산을 실행하고, '원하는 값이 바뀌지 않았다면 이전에 연산 했던 결과를 다시 사용하는 방식'입니다.
	const avg = useMemo(() => getAverage(list), [list]);


	/**
	 * useRef
	 */
	// useRef 를 사용하여 ref 를 설정하면, useRef 를 통해 만든 객체 안의 current 값이 실제 엘리먼트룰 가리킵니다.
	const inputElement = useRef(null);


	/**
	 * useCallback
	 */
	// useCallback 은 useMemo와 상당히 비슷한 함수입니다. 
	// 주로 렌더링 성능을 최적화해야 하는 상황에서 사용하는데요.
	// 이 Hook 을 사용하면 '이벤트 핸들러 함수를 필요할 때만 생성'할 수 있습니다. (컴포넌트가 리렌더링될 때마다 이벤트 핸들러 함수가 새로 생성되는 것 방지)
	// useCallback 의 첫 번째 파라미터에는 생성하고 싶은 함수를 넣고, 두 번째 파라미터에는 배열을 넣으면 됩니다.
	// 이 배열에는 어떤 값이 바뀌었을 때 함수를 새로 생성해야 하는지 명시해야 합니다.
	// '비어 있는 배열을 넣게 되면 컴포넌트가 렌더링될 때 단 한번만 함수가 생성'
	// '함수 내부에서 상태값에 의존해야 할 때는 그 값을 반드시 두 번째 파라미터 안에 포함'시켜 주어야 합니다. (의존값이 파라미터로 받는 값이 아닌, 외부 상태 또는 변수값 의존될 때)
	const onChange = useCallback(e => {
		console.log('--- --- useCallback');
		console.log('렌더링될 때만 함수 생성 / 이벤트 핸들러 실행 onChange');
		setNumber(e.target.value);
		console.log('--- ---');
	}, []); // 컴포넌트가 처음 렌더링될 때만 함수 생성 (두번째 파리미터에 빈 [] 배열)
	const onInsert = useCallback(() => {
		console.log('--- --- useCallback');
		console.log('number 혹은 list 값 변경 발생 / 이벤트 핸들러 실행 onInsert');
		const nextList = list.concat(parseInt(number));
		setList(nextList);
		setNumber('');
		inputElement.current.focus();
		console.log('--- ---');
	}, [number, list]); // number 혹은 list 가 바뀌었을 때만 함수 생성
	const onIncrease = useCallback( // useState 의 함수형 업데이트
		// prevNumber 는 현재 number 값을 가리킵니다.
		() => setNumber(prevNumber => prevNumber + 1),
		[]
	);


	return (
		<div>
			<input value={number} onChange={onChange} ref={inputElement} />
			<button onClick={onInsert}>등록</button>
			<button onClick={onIncrease}>함수형 +1</button>
			
			<p>{name} ({nickname})</p>
			<input name="name" value={name} onChange={dispatchCustom} />
			<input name="nickname" value={nickname} onChange={dispatchCustom} />
			
			<ul>
				{list.map((value, index) => (
					<li key={index}>{value}</li>
				))}
			</ul>
			<div>
				평균값: {avg}
			</div>

			<p>현재 카운터 값은 {state.value} 입니다.</p>
			<button onClick={() => dispatch({ type: 'INCREMENT' })}>+1</button>
			<button onClick={() => dispatch({ type: 'DECREMENT' })}>-1</button>
		</div>
	);
};

export default Hook;
```


-----


## 렌더 프롭(render props)
```javascript
/*
렌더 프롭(render props)은 말 그대로 렌더링되는 프로퍼티를 뜻한다.  
이 말은 컴포넌트나 렌더링할 컴포넌트를 반환할 함수 컴포넌트인데 프로퍼티로 전달되는 컴포넌트를 가리킨다.  
이런 컴포넌트는 특정 조건을 만족할 때 런더링 할 수 있다.  
함수 렌더 프롭의 경우 함수이기 때문에(프로퍼티를 포함하는) 컴포넌트가 렌더링될 때 데이터를 함수에 인자로 넘겨서 반환되는 컴포넌트를 렌더링에 사용할 수 있다.
*/

function List({ data=[], renderItem, renderEmpty }) {
    /*if(!data.length) {
        return renderEmpty;
    }
    return <p>{data.length} items</p>;*/

    return !data.length ? (
        renderEmpty
    ) : (
        <ul>
            {data.map((item, index) => {
                <li key={index}>
                    {renderItem(item)}
                </li>
            })}
        </ul>
    );
}

export default function App() {
    return (
        <List 
            data={[]}
            renderEmpty={<p>This list is empty</p>} 
            renderItem={item => {
                <>
                    {item.name} / {item.date}
                </>
            }}
        />
    );
};
```


-----


## Create React App (CRA)  
https://create-react-app.dev/  

create-react-app은 React App의 개발 환경을 한 줄의 커맨드로 구성해주는 boilerplate이다.   
(보일러 플레이트는 변경 없이 계속해서 재 사용할 수 있는 저작물)  

React와 함께 facebook에서 만들었고 npm과 yarn 패키지로 제공된다.  
하는 일은 크게 3가지라고 할 수 있다.  
- index.html, index.js를 포함한 웹페이지에 필요한 기본 디렉토리 구성  
- react, react-dom, react-scripts 및 dependency 라이브러리 설치  
- react-scripts를 사용하여 package.json에 npm command 정의  


## react-scripts  
react-scripts/scripts/start.js  

- npm start  
start.js 스크립트에서는 webpack으로 src/index.js를 엔트리로 하는 소스파일들을 번들링하고 그것을 webpack-dev-server와 react-dev-utils를 사용해 browser에 띄운다.   

- npm run build  
build.js 스크립트에서는 start.js에서와 마찬가지로 번들링을 하고, 다른 점은 build/ 디렉토리에 번들링한 결과를 저장한다.  
이것으로 배포할 수 있고 배포 스크립트는 따로 작성해야 한다.  

- npm run eject  
하나의 dependency로 묶여있는 webpack, babel, eslint 등을 eject(꺼내다)하는 것이다.  
이는 one-way operation으로 한 번 실행하면 이전으로 돌아갈 수 없다.  


-----


## 합성 이벤트 (SyntheticEvent)
https://ko.reactjs.org/docs/events.html  


-----


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
	const onPurchase = (product) => {
		/* 결제 로직 ... */
	};

	return (
		<div>{/* UI ... */}</div>
	);
}
```


-----


## 코드 스플리팅  
- dynamic import  
import 를 상단에서 하지 않고 `import() 함수 형태로 메서드 안에서 사용`하면, 파일을 따로 분리시켜 저장합니다.  
그리고 실제 함수가 필요한 지점에 파일을 불러와서 함수를 사용할 수 있습니다.  
이 함수를 통해 모듈을 불러올 때 모듈에서 default 로 내보낸 것은 result.default 를 참조해야 사용할 수 있습니다.  
```javascript
// notify.js
export default function notify() {
	alert('안녕!');
};
```
```javascript
// App.js
import React from 'react';

function App() {
	const onClick = () => {
		import('./notify')
		.then(result => result.default());
	};
	return (
		<>
			<button onClick={onClick}>Dynamin Import!</button>
		</>
	);
}

export default App;
```


- React.lazy 와 Suspense 사용  
React.lazy 는 컴포넌트를 렌더링하는 시점에서 비동기적으로 로딩할 수 있게 해 주는 유틸 함수 입니다.
```javascript 
const SplitMe = React.lazy(() => import('./SplitMe'));
```

Suspense 는 리액트 내장 컴포넌트로서 코드 스플리팅된 컴포넌트를 로딩하도록 발동시킬 수 있고, 로딩이 끝나지 않았을 때 보여 줄 UI를 설정할 수 있습니다.   
```javascript 
import React, { Suspense } from 'react';

function App() {
	const SplitMe = React.lazy(() => import('./SplitMe'));
	return (
		<Suspense fallback={<div>loading...</div>}>
			<SplitMe />
		</Suspense>
	);
}

export default App;
```


- Loadable Components 를 통한 코드 스플리팅  
Loadable Components 는 `코드 스플리팅을 편하게 하도록 도와주는 서드파티 라이브러리` 입니다.  
이 라이브러리의 이점은 서버 사이트 렌더링을 지원한다는 것입니다. 또한, 렌더링하기 전에 필요할 때 스플리팅된 파일을 미리 불러올 수 있는 기능도 있습니다.  
```javascript 
import React from 'react';
import loadable from '@loadable/component';

const SplitMe = loadable(() => import('./SplitMe'), {
	fallback: <div>loading...</div>
});

// 컴포넌트 미리 불러오기(preload)
//SplitMe.preload();

function App() {
	return (
		<SplitMe />
	);
}
```


-----


# React에서 Stateful 대 Stateless 함수형 컴포넌트
## Props와 State
- props  
```javascript
const Counter = (props) => {
	// props : 부모 컴포넌트로 부터 전달되는 값 (읽기전용)
};
```
```javascript
// typescript  
import React from "react";

type TitleProps = {
	color?: string;
};
const Title: React.FC<TitleProps> = props => {
  	const { color, children } = props; 
	return <h1 style={{ color }}>{children}</h1>;
};

export default Title;
```
```javascript
// typescript
import React, { FC } from "react";

type GreetingProps = {
	name: string;
}

const Greeting:FC<GreetingProps> = ({ name }) => {
	return <h1>Hello {name}</h1>
};

export default Greeting;
```
```javascript
// typescript - FC를 사용하지 않는 방법
import React from "react";

type GreetingProps = {
	name: string;
};

function Greeting(props: GreetingProps) {
  return <p>Hi {props.name}</p>
}

export default Greeting;
```


- state  
```javascript  
class App extends Component {
	constructor(props) {
		// 클래스 component는 props와 함께 기본 생성자를 호출해야 합니다.
		super(props);
		
		// 클래스 컴포넌트를 선택하는 주된 이유는 state를 넣을 수 있다는 것
		this.state = { count: 1 };
	}

	handleCount(value) {
		// React 컴포넌트에는 state를 업데이트하기 위해  setState라는 메서드가 있습니다.
		this.setState({count: this.state.count+ value});
	}
	
	render() {
		return <div></div>;
	}
}
```
```javascript
// typescript 
interface CounterProps {
	name: string
}

interface CounterState {
	count: number
}

class Counter extends React.Component<CounterProps, CounterState> {
	constructor(props: CounterProps) {
		super(props)
		this.state = {
			count: 0,
		}
	}

	componentDidMount() {
		setInterval(this.increase, 1000)
	}

	increase = () => {
		const { count } = this.state
		this.setState({ count: count + 1 })
	}

	render() {
		const { name } = this.props
		const { count } = this.state

		return (
			<React.Fragment>
				<h1>{name} counter</h1>
				<div>count value: {count}</div>
			</React.Fragment>
		);
	}
}
```


- Stateful 컴포넌트  
Stateful 컴포넌트는 늘 클래스 컴포넌트입니다.  
(stateful 컴포넌트에는 생성자에서 초기화되는 state가 있습니다.)  

- Stateless 컴포넌트  
Stateless 컴포넌트를 만드는 데 함수형이나 클래스를 사용하면 됩니다.  


-----


# PureComponent란?
`React.PureComponent`  
동일한 props와 state라는 전제 하에 동일한 결과 값이 확실히 반환된다면 컴포넌트를 순수하다고(pure) 말합니다.  
```javascript 
const HelloWorld = ({name}) => (
	<div>{`Hi ${name}`}</div>
);
```
클래스 컴포넌트도 props와 state가 변하지 않는 한 순수(pure)할 수 있습니다.  
React.PureComponent는 성능을 최적화하는 데 활용됩니다.   
(성능상의 이슈에 맞닥뜨리지 않는 한 이 컴포넌트를 사용해야 하는지 고려해 볼 이유는 없습니다.)


-----


## React 서버 렌더링

```
$ yran create react-app ssr-recipe
$ cd ssr-recipe
```

```
$ yarn add react-router-dom
```

CRA로 만든 프로젝트에서는 웹팩 관련 설정이 기본적으로 모두 숨겨져 있으니 yarn eject 명령어를 실행
```
$ yarn eject
```

서버에서 리액트 컴포넌트를 렌더링할 때는 ReactDOMServer 의 renderToString 이라는 함수를 사용합니다.  
```javascript
import React from 'react';
import ReactDOMServer from 'react-dom/server';

const html = ReactDOMServer.renderToString(
	<div>Hello Server Side Rendering!</div>
);

console.log(html);
```


## webpack-node-extenals
서버를 위해 번들링할 때는 node_modules에서 불러오는 것을 제외하고 번들링하는 것이 좋습니다.  
이를 위해 webpack-node-externals 라는 라이브러리를 사용해야 합니다.  
```
$ yarn add webpack-node-externals
```

```javascript
const nodeExternals = require('webpack-node-externals');

module.exports = {
	resolve: {
		modules: ['node_modules']
	},
	externals: [nodeExternals()]
};
```


## Next.js
리액트 라우터와 호환되지 않음  
파일 시스템에 기반하여 라우트를 설정  
복잡한 작업들을 모두 Next.js가 대신해 주기 때문에 실제 작동 원리를 파악하기 힘듦
코드 스플리팅, 데이터 로딩, 서버 사이드 렌더링을 가장 쉽게 적용하고 싶다면 Next.js 사용  


## Razzle  
프로젝트 구성이 CRA와 매우 유사하다는 장점  
리액트 라우터와도 잘 호환  
코드 스플리팅 시 발생하는 깜박임 현상(2019년 4월 기준)


-----


## 쓰로들링(throttle) / 디바운싱(Debouncing) / XHR호출 재시도(Retrying XHR calls)  
https://mskims.github.io/redux-saga-in-korean/recipes/  


-----


## 리액트 훅스 컴포넌트에서 setInterval 사용 시의 문제점
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
