# 기본

https://ko.reactjs.org/docs/hello-world.html

---

`실전 리액트 프로그래밍` 책 내용 중

# 상탯값과 속성으로 관리하는 UI 데이터

UI 라이브러리인 리액트는 UI데이터를 관리하는 방법을 제공한다.  
UI 데이터는 컴포넌트 내부에서 관리하는 상탯값과 부모 컴포넌트에서 내려 주는 속성값으로 구성된다.  
리덕스와 같이 전역 데이터를 관리해 주는 라이브러리를 리액트에 적용할 때도 결국 컴포넌트의 상탯값과 속성값을 이용해서 구현한다.

UI 데이터가 변경되면 화면을 다시 그려야 한다.  
리액트와 같은 UI 라이브러리를 사용하지 않는다면 UI 데이터가 변경될 때마다 돔 요소를 직접 수정해야 한다.  
그런데 돔 요소를 직접 수정하다 보면 비즈니스 로직과 UI 를 수정하는 코드가 뒤썪여지고, 코드가 복잡해진다.  
그래서 리액트는 화면을 그리는 모든 코드를 컴포넌트 함수에 선언형으로 작성하도록 했다.  
`UI 데이터가 변경되면 리액트가 컴포넌트 함수를 이용해서 화면을 자동으로 갱신해 주며, 이것이 리액트의 가장 중요한 역할`이다.

---

# 리액트 요소와 가상 돔

리액트 요소(element)는 리액트가 UI를 표현하는 수단이다.  
보통 우리는 JSX 문법을 사용하기 때문에 리액트 요소의 존재를 잘 모른다.  
하지만 리액트 요소를 이해한다면 리액트가 내부적으로 어떻게 동작하는지 알 수 있다.  
(JSX문법으로 작성된 코드는 리액트의 createElement 함수로 변경된다. 이름에서 알 수 있듯이 createElement 함수는 리액트 요소를 반환한다.)

리액트는 렌더링 성능을 위해 가상돔을 활용한다.  
브라우저에서 돔을 변경하는 것은 비교적 오래 걸리는 작업이다.  
따라서 빠른 렌더링을 위해서는 돔 변경을 최소화 해야 한다.  
그래서 `리액트는 메모리에 가상 돔을 올려 놓고 이전과 이후의 가상 돔을 비교해서 변경된 부분만 실제 돔에 반영하는 전략을 채택`했다.

# 리액트 요소가 돔 요소로 만들어지는 과정

리액트에서 데이터 변경에 의한 화면 업데이트는 렌더 단계(render phase, reconciliation phase라고도 불린다)와  
커밋 단계(commit phase)를 거친다.  
`렌더는 실제 돔에 반영할 변경 사항을 파악하는 단계이고, 커밋은 파악된 변경 사항을 실제 돔에 반영하는 단계`이다.  
`렌더 단계에서는 변경사항을 파악하기 위해 가상 돔을 이용`한다.

---

# 컴포넌트 구성 요소

- 프로퍼티  
  상위 컴포넌트에서 하위 컴포넌트로 전달되는 읽기 전용 데이터 입니다.

- state  
  컴포넌트의 상태를 저장하고 변경할 수 있는 데이터 입니다.

- 컨텍스트  
  부모 컴포넌트에서 생성하여 모든 자식 컴포넌트에 전달하는 데이터 입니다.

---

# map 반복문 렌더시 key 값 - 리렌더링 주의!

문제 : 데이터 리스트 추가에 따라 컴포넌트가 append 되는 부분만 렌더하는 것이 아닌, 전체 리스트를 다시 렌더링 하는 경우가 있다.
원인 : 반복문 React key 속성값 랜덤인 경우 재렌더링 발생!

# 리액트 컴포넌트 내부 변수선언 주의! (리렌더링에 따라 초기화가 안되어야 하는 값)

useRef 를 사용

- 타임아웃, 인터벌 등 타임 관련 고유값
- 클래스 인스턴스 값
- 스크롤 위치 값

# && 연산자 사용 시 주의할 점

<div>
	{!!value && <p>출력</p>}
</div>

# DOM 앨리먼트 (HTML 기본 속성 -> 리액트 사용법)

- https://ko.reactjs.org/docs/dom-elements.html

---

# 클래스형 컴포넌트와 함수형 컴포넌트

리액트 16.8 이전 버전의 함수형 컴포넌트가 할 수 없는 일은 다음과 같다.

- 상태값을 가질 수 없다.
- 리액트 컴포넌트의 생명 주기 함수를 작성할 수 없다.
  `리액트 버전 16.8 부터 훅(Hook)이라는 기능이 추가되면서 함수형 컴포넌트에서도 상태값과 생명 주기 함수 코드를 작성할 수 있게 되었다.`

---

# 렌더 프롭(render props)

```javascript
/*
렌더 프롭(render props)은 말 그대로 렌더링되는 프로퍼티를 뜻한다.  
이 말은 컴포넌트나 렌더링할 컴포넌트를 반환할 함수 컴포넌트인데 프로퍼티로 전달되는 컴포넌트를 가리킨다.  
이런 컴포넌트는 특정 조건을 만족할 때 런더링 할 수 있다.  
함수 렌더 프롭의 경우 함수이기 때문에(프로퍼티를 포함하는) 컴포넌트가 렌더링될 때 데이터를 함수에 인자로 넘겨서 반환되는 컴포넌트를 렌더링에 사용할 수 있다.
*/

function List({ data = [], renderItem, renderEmpty }) {
  /*if(!data.length) {
        return renderEmpty;
    }
    return <p>{data.length} items</p>;*/

  return !data.length ? (
    renderEmpty
  ) : (
    <ul>
      {data.map((item, index) => {
        <li key={index}>{renderItem(item)}</li>;
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
        </>;
      }}
    />
  );
}
```

---

# Create React App (CRA)

https://create-react-app.dev/

create-react-app은 React App의 개발 환경을 한 줄의 커맨드로 구성해주는 boilerplate이다.  
(보일러 플레이트는 변경 없이 계속해서 재 사용할 수 있는 저작물)

React와 함께 facebook에서 만들었고 npm과 yarn 패키지로 제공된다.  
하는 일은 크게 3가지라고 할 수 있다.

- index.html, index.js를 포함한 웹페이지에 필요한 기본 디렉토리 구성
- react, react-dom, react-scripts 및 dependency 라이브러리 설치
- react-scripts를 사용하여 package.json에 npm command 정의

## serviceWorker.js

serviceWorker.js 파일에는 PWA(Progressive web app)와 관련된 코드가 들어 있다.  
PWA는 오프라인에서도 잘 동작하는 웹 애플리케이션을 만들기 위한 기술이다.  
create-react-app 으로 프로젝트를 생성하면 PWA 기능은 기본적으로 꺼져 있는 상태다.  
PWA 기능을 원한다면 index.js 파일에 serviceWorker.register(); 코드를 넣으면 된다.

## NODE_ENV

create-react-app 에서는 NODE_ENV 환경 변수를 기본으로 제공한다. (process.env.NODE_ENV 설정값 존재)  
NODE_ENV 환경 변수의 값은 다음과 같이 결정된다.

- npm start 로 실행하면 development
- npm test 로 실행하면 test
- npm run build 로 실행하면 production

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

---

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

---

# 코드 스플리팅

- dynamic import  
  import 를 상단에서 하지 않고 `import() 함수 형태로 메서드 안에서 사용`하면, 파일을 따로 분리시켜 저장합니다.  
  그리고 실제 함수가 필요한 지점에 파일을 불러와서 함수를 사용할 수 있습니다.  
  이 함수를 통해 모듈을 불러올 때 모듈에서 default 로 내보낸 것은 result.default 를 참조해야 사용할 수 있습니다.

```javascript
// notify.js
export default function notify() {
  alert('안녕!');
}
```

```javascript
// App.js
import React from 'react';

function App() {
  const onClick = () => {
    import('./notify').then(result => result.default());
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
  fallback: <div>loading...</div>,
});

// 컴포넌트 미리 불러오기(preload)
//SplitMe.preload();

function App() {
  return <SplitMe />;
}
```

---

# React에서 Stateful 대 Stateless 함수형 컴포넌트

## Props와 State

- props

```javascript
const Counter = props => {
  // props : 부모 컴포넌트로 부터 전달되는 값 (읽기전용)
};
```

```javascript
// typescript
import React from 'react';

type TitleProps = {
  color?: string,
};
const Title: React.FC<TitleProps> = props => {
  const { color, children } = props;
  return <h1 style={{ color }}>{children}</h1>;
};

export default Title;
```

```javascript
// typescript
import React, { FC } from 'react';

type GreetingProps = {
  name: string,
};

const Greeting: FC<GreetingProps> = ({ name }) => {
  return <h1>Hello {name}</h1>;
};

export default Greeting;
```

```javascript
// typescript - FC를 사용하지 않는 방법
import React from 'react';

type GreetingProps = {
  name: string,
};

function Greeting(props: GreetingProps) {
  return <p>Hi {props.name}</p>;
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
    this.setState({ count: this.state.count + value });
  }

  render() {
    return <div></div>;
  }
}
```

```javascript
// typescript
interface CounterProps {
  name: string;
}

interface CounterState {
  count: number;
}

class Counter extends React.Component<CounterProps, CounterState> {
  constructor(props: CounterProps) {
    super(props);
    this.state = {
      count: 0,
    };
  }

  componentDidMount() {
    setInterval(this.increase, 1000);
  }

  increase = () => {
    const { count } = this.state;
    this.setState({ count: count + 1 });
  };

  render() {
    const { name } = this.props;
    const { count } = this.state;

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

---

# PureComponent란?

`React.PureComponent`  
동일한 props와 state라는 전제 하에 동일한 결과 값이 확실히 반환된다면 컴포넌트를 순수하다고(pure) 말합니다.

```javascript
const HelloWorld = ({ name }) => <div>{`Hi ${name}`}</div>;
```

클래스 컴포넌트도 props와 state가 변하지 않는 한 순수(pure)할 수 있습니다.  
React.PureComponent는 성능을 최적화하는 데 활용됩니다.  
(성능상의 이슈에 맞닥뜨리지 않는 한 이 컴포넌트를 사용해야 하는지 고려해 볼 이유는 없습니다.)

---

# React 서버 렌더링

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

const html = ReactDOMServer.renderToString(<div>Hello Server Side Rendering!</div>);

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
    modules: ['node_modules'],
  },
  externals: [nodeExternals()],
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

---
