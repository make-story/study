# `컴포넌트 패턴`

https://fe-developers.kakaoent.com/2022/221110-ioc-pattern/

- Render Props 패턴
  - 컴포넌트가 렌더링 함수를 프로퍼티(props)로 전달받아 사용하는 방법
- 합성 컴포넌트 패턴 (Compound Component Pattern)
  - 리액트의 Context/Provider를 사용하여 여러 종류의 컴포넌트가 하나의 로직을 공유할 수 있게 하는 방법
  - https://fe-developers.kakaoent.com/2022/220731-composition-component/
- 제어 컴포넌트 패턴 (Controlled Props Pattern)
  - 제어 컴포넌트 패턴은 컴포넌트 내부에 정의된 state나 useState 상태 값과 해당 상태 값을 변경하는 로직들을 사용하지 않고, 프로퍼티를 통해 외부에서 들어온 상태 값과 콜백 함수를 사용함으로써 외부에서 컴포넌트의 상태를 컨트롤할 수 있게 합니다.
  - 프레젠테이션(Presentational), 컨테이너(Container, 비즈니스로직) 컴포넌트로 분리하는 패턴과 유사
- Props Getter 패턴
  - 제어 컴포넌트 패턴에서는 상태 값 프로퍼티와 해당 값을 컨트롤하는 콜백 함수 프로퍼티들을 ‘같이’넘겨주어야 하는 문제가 있음
  - 컴포넌트 내부에서 사용하는 콜백 함수들을 외부로 전달
- State Reducer 패턴
  - useReducer 훅을 통해 reducer를 사용하여 컴포넌트의 상태 관리

# 상속 보다는 조합 (공식페이지)

리액트는 조합에 특화된 설계를 갖고 있습니다.

https://legacy.reactjs.org/docs/composition-vs-inheritance.html

## 합성 컴포넌트 패턴 (Compound Component Pattern)

```jsx
/** CompoundCounter.tsx */
interface ICounterContextValue {
  count?: number;
  onChange?: (count: number) => void;
  onIncrement?: () => void;
  onDecrement?: () => void;
}

// CounterContext
const CounterContext =
  (createContext < ICounterContextValue) |
  (undefined >
    {
      count: 0,
    });

// Counter 컴포넌트는 단순히 children을 CounterContext.Provider로 래핑
const Counter = function ({ children }: { children?: ReactNode }) {
  const [count, setCount] = useState(0);

  const onChange = function (value: number) {
    setCount(value);
  };

  const onIncrement = function () {
    setCount(prev => prev + 1);
  };

  const onDecrement = function () {
    setCount(prev => prev - 1);
  };

  return (
    <CounterContext.Provider
      value={{
        count,
        onChange,
        onIncrement,
        onDecrement,
      }}
    >
      {children}
    </CounterContext.Provider>
  );
};

/** Counter.Input */
export const Input: React.FC<InputHTMLAttributes<HTMLInputElement>> =
  function ({ value, ...others }) {
    // CounterContext를 사용하여 Counter 관련 로직을 공유
    const counterContext = useContext(CounterContext);
    const isCompounded = counterContext !== undefined;

    return (
      <input value={isCompounded ? counterContext?.count : value} {...others} />
    );
  };
Counter.Input = Input;

/** Counter.CountButton */
export const CountButton: React.FC<
  ButtonHTMLAttributes<HTMLButtonElement> & { countType: 'plus' | 'minus' },
> = function ({ onClick, countType = 'plus', ...others }) {
  // CounterContext를 사용하여 Counter 관련 로직을 공유
  const counterContext = useContext(CounterContext);
  const isCompounded = counterContext !== undefined;

  const onClickButton: MouseEventHandler<HTMLButtonElement> = function (event) {
    if (isCompounded) {
      if (countType === 'plus') {
        counterContext.onIncrement?.();
      } else {
        counterContext.onDecrement?.();
      }
    } else {
      onClick?.(event);
    }
  };

  return (
    <button onClick={onClickButton} {...others}>
      +
    </button>
  );
};
Counter.CountButton = CountButton;
```

```jsx
/** App.tsx */
function App1() {
  return (
    <div>
      <CompoundedCounter>
        <CompoundedCounter.CountButton countType='plus' />
        <CompoundedCounter.Input />
        <CompoundedCounter.CountButton countType='minus' />
      </CompoundedCounter>
    </div>
  );
}

function App2() {
  return (
    <div>
      <CompoundedCounter>
        <CompoundedCounter.CountButton countType='plus' />
        <CompoundedCounter.CountButton countType='minus' />
        <CompoundedCounter.Input />
      </CompoundedCounter>
    </div>
  );
}
```

각각의 분리된 컴포넌트들은 Counter라는 도메인에 더 이상 종속되지 않고  
각각 본연의 기능과 역할(SRP: Single Responsibility Principle)로도 사용할 수 있게 되었습니다.

## 조합과 제어의 역전 IoC - props 가 많아지고 복잡해지는 문제 해결 방안

https://brunch.co.kr/@finda/556

https://www.youtube.com/watch?v=hEGg-3pIHlE&feature=youtu.be

https://www.youtube.com/watch?v=BcVAq3YFiuc&feature=youtu.be

https://kentcdodds.com/blog/inversion-of-control

https://speakerdeck.com/jenncreighton/the-how-and-why-of-flexible-react-components-289aa486-464a-4dea-b89a-6f92d0af6606

`API를 사용하는 쪽으로 특정 역할을 넘기는 패턴을 제어역전(Inversion of Control, IoC)`

`개발된 컴포넌트가 기획 요건 변경 또는 추가에 따른 복잡도 증가 상황`  
`props 를 변경 또는 추가해가며 확장하는 상황`  
위와 같은 상황에서는 컴포넌트 사용이 점차 어려워 짐

props 가 많아지는 경우 발생하는 문제

- 개발자가 각 props가 어떤 역할을 하는지 파악하기 어려워진다.
- 파악하기 어려운 props를 설명해주기 위한 주석이나 문서 작성 및 관리 필요
- 요구사항이 복잡해질수록 기괴한 props명이 나올 확률 증가, 작명 센스 필요
- 위와 같은 이유들로 인해 컴포넌트를 변경하기가 어렵고 두려워짐

즉, 재사용성은 갖추었지만, 유연성은 부족해진다.

이를 해결하기 위해서는  
`우리는 비즈니스 로직을 밖으로 꺼내어야 합니다!`

`리액트는 상속보다는 조합!`

props 기반 컴포넌트

```javascript
// 자이언트 컴포넌트
function Page() {
  return (
    <Dialog
      iconAboveTitle='fancy-icon'
      title='안내'
      description='이것은 멋진 내용을 담고 있는 안내입니다.'
      buttonPosition='bottom'
      buttonAlign='vertical'
      buttons={[
        {
          label: '확인',
          onClick: doSomething,
          type: 'cta',
        },
        {
          label: '취소',
          onClick: doSomethingElse,
          type: 'secondary',
        },
      ]}
    />
  );
}
```

조합 기반 컴포넌트

```javascript
// 조합기반 컴포넌트
function Page() {
  return (
    <Dialog>
      <Dialog.Title>
        안내
      </Dialog.Title>
      <Dialog.Description>
        이것은 멋진 내용을 담고 있는 안내입니다.
      </Dialog.Description>
      <Dialog.ButtonContainer align="vertical">
        <Dialog.Button type="secondary" onClick={doSomethingElse}>
          취소
        </Dialog.Button>
        <Dialog.Button type="primary" onClick={doSomething}>
          확인
        </Dialog.Button>
      </Dialog.ButtonContainer>
    <Dialog>
  );
}
```

위와 같이 페이지 개발 시 컴포넌트를 조합하여 만드는 것도 제어역전의 한 형태라고 볼 수 있습니다.

사실 이러한 제어역전 패턴은 우리 주변에서 이미 흔하게 사용되고 있습니다.  
JS Array 의 map, forEach, filter 가 대표적인 예입니다.

```javascript
// 제어역전 filter
const dogs = animals.filter(animal => animal.species === 'dog');
```

필터링 기능만 제공하고 어떻게 필터링할지는 사용자에게 맡기고 있습니다.  
따라서 필터링 로직에 어떠한 변화가 생기든 기존 filter 함수는 그대로 남아있을 수 있습니다.

## Vue slot 와 같은 React 사용

https://medium.com/@srph/react-imitating-vue-slots-eab8393f96fd

BaseLayout

```vue
<template>
  <base-layout>
    <template slot="header">
      <h1>Here might be a page title</h1>
    </template>

    <p>A paragraph for the main content.</p>
    <p>And another one.</p>

    <template slot="footer">
      <p>Here's some contact info</p>
    </template>
  </base-layout>
</template>
```

```vue
<template>
  <div class="container">
    <header>
      <slot name="header"></slot>
    </header>
    <main>
      <slot></slot>
    </main>
    <footer>
      <slot name="footer"></slot>
    </footer>
  </div>
</template>
```

```jsx
function Header() {
  return null;
}

function Body() {
  return null;
}

function Footer() {
  return null;
}

class BaseLayout extends React.Component {
  static Header = Header;
  static Body = Body;
  static Footer = Footer;

  render() {
    const { children } = this.props;
    const header = children.find(child => child.type === Header);
    const body = children.find(child => child.type === Body);
    const footer = children.find(child => child.type === Footer);

    return (
      <div class='container'>
        <header>{header ? header.props.children : null}</header>
        <main>{body ? body.props.children : null}</main>
        <footer>{footer ? footer.props.children : null}</footer>
      </div>
    );
  }
}

export default BaseLayout;
```

```jsx
const layout = (
  <BaseLayout>
    <BaseLayout.Header>
      <h1>Here might be a page title</h1>
    </BaseLayout.Header>

    <BaseLayout.Body>
      <p>A paragraph for the main content.</p>
      <p>And another one.</p>
    </BaseLayout.Body>

    <BaseLayout.Footer>
      <p>Place some contact info here.</p>
    </BaseLayout.Footer>
  </BaseLayout>
);
```

## 조합의 대표적인 사례

https://brunch.co.kr/@finda/556

https://www.youtube.com/watch?v=hEGg-3pIHlE&feature=youtu.be

react-router, remix 를 만든 것으로 유명한 라이언 플로런스 씨가 자주 언급하는 패턴 중 하나인 Compound Components 는 조합의 대표적인 사례입니다.

```javascript
function Page() {
  return (
    <Tabs>
      {tabItems.map(tabItem => (
        <Tabs.Item value={tabItem}>{tabItem}</Tabs.Item>
      ))}
    </Tabs>
  );
}
```

```javascript
// Tabs.js
import React from 'react';

function Tabs({ children }) {
  const [selectedTab, setTab] = React.useState(initialTab);

  return (
    <ul className='tab-container'>
      {React.Children.map(children, child =>
        React.cloneElement(child, {
          isSelected: child.props.value === selectedTab,
          onSelect: () => setTab(child.props.value),
        }),
      )}
    </ul>
  );
}

Tabs.Item = ({ isSelected, onSelect, children }) => (
  <li onClick={onSelect} className={`tab-item ${isSelected ? 'selected' : ''}`}>
    {children}
  </li>
);
```
