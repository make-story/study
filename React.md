

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

