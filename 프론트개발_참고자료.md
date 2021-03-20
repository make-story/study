
## RIDI 참고 (리덕스를 사용할 때 고려하면 유용한 정보)  
> https://ridicorp.com/story/how-to-use-redux-in-ridi/?utm_source=twitter&utm_medium=velopert&utm_campaign=how-to-use-redux-in-ridi


-----

## classnames  
classnames 는 CSS 클래스를 조건부로 설정할 때 매우 유용한 라이브러리입니다.  
또한, CSS Module을 사용할 때 이 라이브러리를 사용하면 여러 클래스를 적용할 때 매우 편리합니다.  
```
$ yarn add classnames
```
```javascript
import classNames from 'classnames';

classNames('one', 'two'); // = 'one two'
classNames('one', { two: true }); // = 'one two'
classNames('one', { two: false }); // = 'one'
classNames('one', ['two', 'three']); // = 'one two three'

const myClass = 'hello';
classNames('one', 'myClass', { myCondition: true }); // = 'one hello myCondition'
```


-----

## react-virtualized 를 활용하여 화면에 보여지는 부분만 렌더링 (최적화)  
> react-virtualized 의 List 이 함수는 파라미터에 index, key, style 값을 객체 타입으로 받아 와서 사용합니다.


-----


## 쿼리 문자열(URL 쿼리) 객체로 변환할 때는 qs라는 라이브러리를 사용  
```
$ yarn add qs
```
```javascript
import qs from 'qs';

const query = qs.parse(location.search, {
	ignoreQueryPrefix: true, // 이 설정을 통해 문자열 맨 앞의 ?를 생략합니다.
});
// http://localhost:3000/about?detail=true
query.detail === 'true'; // 쿼리의 파싱 결과 값은 문자열 입니다.
```


-----


## sanitize-html
XSS(크로스 사이트 스크립팅) 사용자 페이지 악의적 script, html 방지  


-----


## quill  
Rich Text Editor  


-----


## react-query
https://github.com/tannerlinsley/react-query
API 요청 관련  


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

# 서버렌더링
> First Paint: 화면에 어떤 요소가 페인트된 시점  
> First Contentful Paint: 화면에 이미지나 텍스트가 나타난 시점  
> First Meaningful Paint: 화면에 사용자에게 의미있는 컨텐츠가 나타난 시점  
> Time To Interactive: 자바스크립트 초기 실행이 완료되고, 사용자가 인터렉션할 수 있는 시점  

## 장점
- 검색엔진 SEO
- 초기 렌더링 성능(FMP)

## 단점
- 웹브라우저 보다(스크립트) 서버가 처리하는 일이 많아 지므로 서버 리소스가 사용된다는 단점  
- 캐싱과 로드 밸런싱을 통해 성능 최적화 필수  
- 프로젝트의 구조 복잡도 상승, 코드 스플리킹 등 고려사항 증가(서버 사이드 렌더링과 코드 스클리팅을 함께 적용하면 작업이 꽤 까다로움)  

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


## 디바운스와 스로틀
`디바운스 - 지연 처리`  
디바운스(debounce)는 어떤 내용을 입력하다가 특정 시간 동안 대기하고 있으면 마지막에 입력된 내용을 바탕으로 서버 요청을 하는 방법입니다. (자동완성, 서그제스트 등)  
연관 검색어 창을 떠올리면 이해하기 쉬울 것입니다. 네이버나 구글의 검색창에 내용을 입력할 때는 검색창 하단에 아무 내용도 나오지 않다가 입력을 멈추면 검색창 하단에 연관 검색어 목록이 나타납니다. 바로 이것이 디바운스로 구현한 기능입니다.  

```javascript
export function debounce(func, delay) {
	let inDebounce;
	return function(...args) {
		if(inDebounce) {
			clearTimeout(inDebounce);
		}
		inDebounce = setTimeout(
			() => func(...args),
			delay
		);
	}
}

const run = debounce(val => console.log(val), 100);
run('a');
run('b');
run(2);
// 100ms 이후
// 2
```

`스로틀`  
스로틀(throttle)은 디바운스 개념과 비슷하지만 '입력되는 동안에도 바로 이전에 요청한 작업을 주기적으로 실행한다는 점'이 다릅니다.  
이 방식도 흔히 사용하는 앱에서 볼 수 있습니다.  
예를 들어 페이스북의 타임라인은 스크롤을 내리는 동안 계속해서 다음 내용이 출력되는 일명 '무한 스크롤' 기능이 구현되어 있습니다.  
만약 이 기능이 디바운스로 구현되어 있다면 '스크롤링'이 멈추지 않은 한 '다음 타임라인 로딩'은 진행되지 않겠지요?  
디바운스와 다르게 스로틀은 첫 번째 요청이 지연 실행되는 동안에는 중복된 요청을 무시하고 실행 이후에 첫 번째로 호출되는 요청을 동일하게 지연 실행하여 구간 내에서는 중복 요청 과정을 생략합니다.  

```javascript
function throttle(func/*스크롤이 이동할 때 호출되는 서버요청*/, delay/*호출 생략 시간*/) {
	let lastFunc;
	let lastRan;
	return function(...args) {
		const context = this;
		if(!lastRan) {
			func.call(context, ...args);
			lastRan = Date.now();
		}else {
			if(lastFunc) {
				clearTimeout(lastFunc);
			}
			lastFunc = setTimeout(function() {
				if((Date.now() - lastRan) >= delay) {
					// 지연 시간을 계산(Date.now() - lastRan)하고 이 값이 delay 보다 커야만 실행
					func.call(context, ...args);
					lastRan = Date.now();
				}
			}, delay - (Date.now() - lastRan));
		}
	}
}

const checkPosition = () => {
	const offset = 500;
	const currentScrollPosition = window.pageYOffset;
	const pageBottomPosition = document.body.offsetHeight - window.innerHeight - offset;
	if(currentScrollPosition >= pageBottomPosition) {
		// fetch('/page/next');
		console.log('다음 페이지 로딩');
	}
};
const infiniteScroll = throttle(checkPosition, 300);
window.addEventListener('scroll', infiniteScroll);
```


