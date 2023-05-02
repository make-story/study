# Typescript + React 가이드

https://fettblog.eu/typescript-react/

- 추가 참고자료  
  https://fettblog.eu/typescript-react/further-reading/

---

## Components

### Functional components

https://fettblog.eu/typescript-react/components/#functional-components

```javascript
type CardProps = {
  title: string,
  paragraph?: string,
};

export const Card: FunctionComponent<CardProps> = ({ title, paragraph = 'Default', children }) => (
  <aside>
    <h2>{title}</h2>
    <p>{paragraph}</p>
    {children}
  </aside>
);
```

### Class components

https://fettblog.eu/typescript-react/components/#class-components

```javascript
import React, { Component } from 'react';

type NoticeProps = {
  msg: string,
};
type ClockState = {
  time: Date,
};

// Component<props, state> { }
export class Clock extends Component<NoticeProps, ClockState> {
  static defaultProps = {
    msg: 'Hello everyone!',
  };

  constructor(props: SampleProps) {
    super(props);
    console.log(this.props.msg);
  }

  tick() {
    this.setState({
      time: new Date(),
    });
  }

  // Before the component mounts, we initialise our state
  componentWillMount() {
    this.tick();
  }

  // After the component did mount, we set the state each second.
  componentDidMount() {
    setInterval(() => this.tick(), 1000);
  }

  // render will know everything!
  render() {
    return <p>The current time is {this.state.time.toLocaleTimeString()}</p>;
  }
}
```

---

## Children

https://fettblog.eu/typescript-react/children/

### Functional

```javascript
import React, { FunctionComponent } from 'react';

type CardProps = {
  title: string,
  paragraph: string,
};

export const Card: FunctionComponent<CardProps> = ({ title, paragraph, children }) => (
  <aside>
    <h2>{title}</h2>
    <p>{paragraph}</p>
    {children}
  </aside>
);
```

### Class

```typescript
import React, { Component } from 'react';

export class Wrapper extends Component {
  render() {
    return <div style={{ display: 'flex' }}>{this.props.children}</div>;
  }
}
```

---

## Events

https://developer.mozilla.org/en-US/docs/Web/API

- AnimationEvent  
  https://developer.mozilla.org/en-US/docs/Web/API/AnimationEvent

- ChangeEvent  
  https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/change_event

- ClipboardEvent  
  https://developer.mozilla.org/en-US/docs/Web/API/ClipboardEvent

- CompositionEvent  
  https://developer.mozilla.org/en-US/docs/Web/API/CompositionEvent

- DragEvent  
  https://developer.mozilla.org/en-US/docs/Web/API/DragEvent

- FocusEvent  
  https://developer.mozilla.org/en-US/docs/Web/API/FocusEvent

- FormEvent  
  https://developer.mozilla.org/ko/docs/Web/API/HTMLFormElement

- KeyboardEvent  
  https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent

- MouseEvent  
  https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent

- PointerEvent  
  https://developer.mozilla.org/en-US/docs/Web/API/PointerEvent

- TouchEvent  
  https://developer.mozilla.org/en-US/docs/Web/API/TouchEvent

- TransitionEvent  
  https://developer.mozilla.org/en-US/docs/Web/API/TransitionEvent

- WheelEvent  
  https://developer.mozilla.org/en-US/docs/Web/API/WheelEvent

### 기본

```javascript
import React, { Component, MouseEvent } from 'react';

export class Button extends Component {
  handleClick(event: MouseEvent) {
    event.preventDefault();
    alert(event.currentTarget.tagName); // alerts BUTTON
  }

  render() {
    return <button onClick={this.handleClick}>{this.props.children}</button>;
  }
}
```

### 제한적인 이벤트 처리

https://fettblog.eu/typescript-react/events/#restrictive-event-handling

> 제네릭 사용해서 이벤트 제한

```javascript
import React, { Component, MouseEvent } from 'react';

export class Button extends Component {
  /*
	Here we restrict all handleClicks to be exclusively on 
	HTMLButton Elements
	*/
  handleClick(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    alert(event.currentTarget.tagName); // alerts BUTTON
  }

  /* 
	Generics support union types. This event handler works on
	HTMLButtonElement and HTMLAnchorElement (links).
	*/
  handleAnotherClick(event: MouseEvent<HTMLButtonElement | HTMLAnchorElement>) {
    event.preventDefault();
    alert('Yeah!');
  }

  render() {
    return <button onClick={this.handleClick}>{this.props.children}</button>;
  }
}
```

### 합성이벤트 (SyntheticEvent)

https://fettblog.eu/typescript-react/events/#where%E2%80%99s-inputevent  
https://ko.reactjs.org/docs/events.html

> 이벤트 핸들러는 모든 브라우저에서 이벤트를 동일하게 처리하기 위한 이벤트 래퍼 SyntheticEvent 객체를 전달받습니다.  
> stopPropagation() 와 preventDefault()를 포함해서 인터페이스는 브라우저의 고유 이벤트와 같지만 모든 브라우저에서 동일하게 동작합니다.

```javascript
import React, { Component, SyntheticEvent } from 'react';

export class Input extends Component {
  handleInput(event: SyntheticEvent) {
    event.preventDefault();
    // ...
  }

  render() {
    return (
      <>
        <input type='text' onInput={this.handleInput} />
      </>
    );
  }
}
```

---

## Prop Types

https://fettblog.eu/typescript-react/prop-types/

```bash
$ npm install --save prop-types
$ npm install --save-dev @types/prop-types
```

```javascript
import React from 'react';
import PropTypes from 'prop-types';

export function Article({ title, price }) {
  return (
    <div className='article'>
      <h1>{title}</h1>
      <span>Priced at (incl VAT): {price * 1.2}</span>
    </div>
  );
}

// Prop Types
Article.propTypes = {
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
};
```

```javascript
const book = <Article title='TypeScript and React' price={10} />;
const video = <Article title='TypeScript Videos' price='1000' />; // Type Error
```

### Prop Types 추론

https://fettblog.eu/typescript-react/prop-types/#inferring-prop-types

> InferProps

```javascript
import PropTypes, { InferProps } from 'prop-types';

export function Article({ title, price }: InferProps<typeof Article.propTypes>) {
  return (
    <div className='article'>
      <h1>{title}</h1>
      <span>Priced at (incl VAT): {price * 1.2}</span>
    </div>
  );
}

Article.propTypes = {
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
};
```

### defaultProps

```javascript
Article.propTypes = {
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
};

Article.defaultProps = {
  price: 20,
};
```

### Children

https://fettblog.eu/typescript-react/prop-types/#children

```javascript
export function ArticleList({ children }: InferProps<typeof ArticleList.propTypes>) {
  return <div className='list'>{children}</div>;
}

ArticleList.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};
```

---

## Hooks

https://fettblog.eu/typescript-react/hooks/  
https://reactjs.org/docs/hooks-intro.html

### useState

```javascript
import React, { FunctionComponent, useState } from 'react';

// props
const Counter: FunctionComponent<{ initial?: number }> = ({ initial = 0 }) => {
  const [clicks, setClicks] = useState(initial);
  return (
    <>
      <p>Clicks: {clicks}</p>
      <button onClick={() => setClicks(clicks + 1)}>+</button>
      <button onClick={() => setClicks(clicks - 1)}>-</button>
    </>
  );
};
```

### useEffect

```javascript
// Standard use case.
const [name, setName] = useState('Stefan');
useEffect(() => {
  document.title = `Hello ${name}`;
}, [name]);
```

```javascript
useEffect(() => {
  const handler = () => {
    document.title = window.width;
  };
  window.addEventListener('resize', handler);

  // won't compile
  return true;

  // compiles
  return () => {
    window.removeEventListener('resize', handler);
  };
});
```

### useContext

```javascript
import React, { useContext } from 'react';

// our context sets a property of type string
export const LanguageContext = React.createContext({ lang: 'en' });

const Display = () => {
  // lang will be of type string
  const { lang } = useContext(LanguageContext);
  return (
    <>
      <p>Your selected language: {lang}</p>
    </>
  );
};
```

### useRef

```javascript
function TextInputWithFocusButton() {
  const inputEl = useRef < HTMLInputElement > null;
  const onButtonClick = () => {
    // 값이 null 일수 있으므로 필수적으로 유효성 검사!
    if (inputEl && inputEl.current) {
      inputEl.current.focus();
    }
  };
  return (
    <>
      {/* in addition, inputEl only can be used with input elements. Yay! */}
      <input ref={inputEl} type='text' />
      <button onClick={onButtonClick}>Focus the input</button>
    </>
  );
}
```

### useMemo

복잡한 연산 값 `메모이제이션`

```javascript
function getHistogram(image: ImageData): number[] {
  // ...
  return histogram;
}

function Histogram() {
  // ...
  const histogram = useMemo(() => getHistogram(imageData), [imageData]);
}
```

이벤트 등 함수 `메모이제이션`

```javascript
const memoCallback = useCallback(
  (a: number) => {
    // doSomething
  },
  [a],
);

// Won't compile, as the callback needs a number
memoCallback();

// compiles
memoCallback(3);
```

### useReducer

https://fettblog.eu/typescript-react/hooks/#usereducer

```javascript
type StateType = {
  count: number,
};
type ActionType = {
  type: 'reset' | 'decrement' | 'increment',
};

const initialState = { count: 0 };

function reducer(state: StateType, action: ActionType) {
  switch (action.type) {
    case 'reset':
      return initialState;
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    default:
      return state;
  }
}

function Counter({ initialCount = 0 }) {
  const [state, dispatch] = useReducer(reducer, { count: initialCount });

  return (
    <>
      Count: {state.count}
      {/* and can dispatch certain events here */}
      <button onClick={() => dispatch({ type: 'reset' })}>Reset</button>
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
    </>
  );
}
```

---

## Context

https://fettblog.eu/typescript-react/context/

### Create a context

```javascript
import React from 'react';

export const AppContext = React.createContext({
  authenticated: true,
  lang: 'en',
  theme: 'dark',
});
```

### Provide context

```javascript
const App = () => {
  return (
    <AppContext.Provider
      value={
        // 누락된 프로퍼티가 있을 경우 컴파일 오류 발생! - compile error! Missing properties
        {
          lang: 'de',
          authenticated: true,
          theme: 'light',
        }
      }
    >
      <Header />
    </AppContext.Provider>
  );
};
```

### Consume context

```javascript
const Header = () => {
  return (
    <AppContext.Consumer>
      {({ authenticated }) => {
        // Context 에서 전달된 값
        if (authenticated) {
          return <h1>Logged in!</h1>;
        }
        return <h1>You need to sign in</h1>;
      }}
    </AppContext.Consumer>
  );
};
```

### 기본값이 없는 컨텍스트

https://fettblog.eu/typescript-react/context/#context-without-default-values

> Generics for createContext 및 Partial

```javascript
import React from 'react';

// We define our type for the context properties right here
type ContextProps = {
  authenticated: boolean,
  lang: string,
  theme: string,
};

// we initialise them without default values, to make that happen, we
// apply the Partial helper type.
export const AppContext = React.createContext < Partial < ContextProps >> {};

const Header = () => {
  return (
    <AppContext.Consumer>
      {({ authenticated }) => {
        if (authenticated) {
          return <h1>Logged in!</h1>;
        }
        return <h1>You need to sign in</h1>;
      }}
    </AppContext.Consumer>
  );
};

// Now, we can set only the properties we really need
const App = () => {
  return (
    <AppContext.Provider
      value={{
        authenticated: true,
      }}
    >
      <Header />
    </AppContext.Provider>
  );
};
```

---

## Styles and CSS

https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleDeclaration

### inline styles

```javascript
const h1Styles = {
  backgroundColor: 'rgba(255, 255, 255, 0.85)',
  position: 'absolute',
  right: 0,
  bottom: '2rem',
  padding: '0.5rem',
  fontFamily: 'sans-serif',
  fontSize: '1.5rem',
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
};
```

> csstype 활용

```bash
$ npm install csstype
```

```javascript
import CSS from 'csstype';

const h1Styles: CSS.Properties = {
  backgroundColor: 'rgba(255, 255, 255, 0.85)',
  position: 'absolute',
  right: 0,
  bottom: '2rem',
  padding: '0.5rem',
  fontFamily: 'sans-serif',
  fontSize: '1.5rem',
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
};
```

### Emotion

https://emotion.sh/docs/typescript

```bash
$ npm install --save @emotion/core
$ npm install --save @emotion/styled
```

```javascript
/** @jsx jsx */
// the line above activates the jsx factory by emotion
import { css, jsx } from '@emotion/core';

const h1Style = css({
  backgroundColor: 'rgba(255, 255, 255, 0.85)',
  position: 'absolute',
  right: 0,
  bottom: '2rem',
  padding: '0.5rem',
  fontFamily: 'sans-serif',
  fontSize: '1.5rem',
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
});

export function Heading({ title }: { title: string }) {
  return <h1 css={h1Style}>{title}</h1>;
}
```

확장

```javascript
const h1Style = css({
  ...originalStyles,
  ...maybeMixedWithOtherStyles,
});
```

styled

```javascript
/** @jsx jsx */
import styled from '@emotion/styled';
import { jsx } from '@emotion/core';

const LayoutWrapper = styled('div')`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-gap: 1rem;
`;

type LayoutProps = {
  children: React.ReactNode,
};

export function Layout({ children }: LayoutProps) {
  return <LayoutWrapper>{children}</LayoutWrapper>;
}
```

### Styled Components

https://styled-components.com/

```bash
$ npm install @types/styled-components
```

```javascript
import styled from 'styled-components';

export const Heading = styled.h1`
  font-weight: normal;
  font-style: italic;
`;
```

> CSS 속성을 특정 값으로 제한하거나 사용자 지정 속성을 일반 CSS 속성에 전달  
> https://styled-components.com/docs/api#typescript

```javascript
type FlexProps = {
  direction?: 'row' | 'column',
};

export const Flex =
  styled.div <
  FlexProps >
  `
	display: flex;
	flex-direction: ${props => props.direction};
`;

// use it like that:
const el = <Flex direction='row'></Flex>;
```

---
