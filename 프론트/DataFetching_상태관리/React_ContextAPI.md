# Context API

Context API 는 리액트 프로젝트에서 전역적으로 사용할 데이터가 있을 때 유용한 기능입니다.  
(Context API 는 리액트 v16.3 부터 사용하기 쉽게 많이 개선되었습니다.)

2018년 공개된 리액트 버전 16.3 부터는 콘텍스트 API 를 공식적을 사용할 수 있습니다.

`리액트를 다루는 기술 책`

## 1. 새 Context 만들기 (Context, Provider)

Context : 기본 상태 지정
Provider : Context 상태값 수정

```javascript
// contexts/color.js
import React, { createContext, useState } from 'react';

// Context 기본 상태 지정
// 기본값은 Provider 를 사용하지 않았을 때만 사용됩니다.
// (만약 Provider 를 사용했는데 value 값을 명시하지 않았다면, 이 기본값을 사용하지 않기 떄문에 오류가 발생합니다.)
const ColorContext = createContext({
  state: {
    color: 'block',
    subcolor: 'red',
  },
  actions: {
    setColor: () => {},
    setSubcolor: () => {},
  },
});

// Provider 를 사용하면 Context 값을 변경할 수 있습니다.
// Context API 를 사용할 컴포넌트에 값 주입
const ColorProvider = ({ children /*props.children*/ }) => {
  const [color, setColor] = useState('black');
  const [subcolor, setSubcolor] = useState('red'); // Consumer 내부에서 상태 변경이 가능하도록 합니다.

  const value = {
    state: { color, subcolor },
    actions: { setColor, setSubcolor },
  };

  // Context 와 컴포넌트 연결 (값 변경)
  // Provider 를 사용할 떄는 value 값을 명시해 주어야 제대로 작동!!
  return <ColorContext.Provider value={value}>{children}</ColorContext.Provider>;
};

const ColorConsumer = ColorContext.Consumer;
//const { Consumer: ColorConsumer } = ColorContext;

// ColorProvider, ColorConsumer 내보내기
export { ColorProvider, ColorConsumer };

export default ColorContext;
```

## 2. Consumer 사용하기

Context 를 사용할 컴포넌트

```javascript
// components/ColorBox.js
import React, { useContext } from 'react';
import ColorContext from '../contexts/color';

const ColorBox = () => {
  const { state } = useContext(ColorContext); // Context 사용하기
  const style = {
    width: '20px',
    height: '20px',
  };

  return (
    <>
      <div
        style={{
          ...style,
          background: state.color,
        }}
      ></div>
      <div
        style={{
          ...style,
          background: state.subcolor,
        }}
      ></div>
    </>
  );
};

export default ColorBox;
```

```javascript
// components/SelectColors.js
import React from 'react';
import { ColorConsumer } from '../contexts/color';

const colors = ['red', 'orange', 'yellow', 'green', 'blue'];

const SelectColors = () => {
  return (
    <ColorConsumer>
      {({ actions /* Context 값 */ }) => (
        <div>
          {colors.map((color, index) => (
            <div
              key={index}
              style={{ background: color, width: '20px', height: '20px' }}
              onClick={() => actions.setColor(color)}
              onContextMenu={event => {
                // 마우스 오른쪽 클릭
                event.preventDefault();
                actions.setSubcolor(color);
              }}
            ></div>
          ))}
        </div>
      )}
    </ColorConsumer>
  );
};

export default SelectColors;
```

## 3. Provider

Context 의 값 변경

```javascript
// App.js
import React from 'react';
import ColorBox from './components/ColorBox';
import { ColorProvider } from './contexts/color';
import SelectColors from './components/SelectColors';

const App = () => {
  return (
    <ColorProvider>
      <div>
        <SelectColors />
        <ColorBox />
      </div>
    </ColorProvider>
  );
};

export default App;
```

---

# Context API 문제

부모 컴포넌트 쪽에 Context.Provider 컴포넌트를 선언하고  
Context로 전달되는 값이 변경될 때  
해당 Context를 사용하는 모든 자손 컴포넌트는 리랜더링된다.

```javascript
const SomeObjectContext = React.createContext({ input: '', count: 0 });
const SetSomeObjectConteext = React.createContext();

const Provider = ({ children }) => {
  const [someObj, setSomeObj] = React.useState({ input: '', count: 0 });

  return (
    <SetSomeObjectConteext.Provider value={setSomeObj}>
      <SomeObjectContext.Provider value={someObj}>{children}</SomeObjectContext.Provider>
    </SetSomeObjectConteext.Provider>
  );
};
```

```javascript
const InputConsumer = () => {
  const { input } = useContext(SomeObjectContext);
  // ...
};

const CountConsumer = () => {
  const { count } = useContext(SomeObjectContext);
  // ...
};

const App = () => (
  <Provider>
    <DeepChildren>
      <SomeOtherChildren>
        <AnotherChildren>
          {/* input 값만 사용하려 함 */}
          <InputConsumer />
        </AnotherChildren>
        {/* count 값만 사용하려 함 */}
        <CountConsumer />
      </SomeOtherChildren>
    </DeepChildren>
    <IDontCareContextChild />
    {/* SomeObject 값을 비꾸는 역할을 함 */}
    <ContextSetter />
  </Provider>
);
```

이렇게 선언된 컴포넌트 트리의 경우  
ContextSetter 컴포넌트에서 Context 값의 일부만 바꾸는 동작을 실행하더라도,  
InputConsumer, CounterConsumer 모두 리랜더링이 일어나게 된다.

결국 객체 형태로 Context를 관리하면서 Context를 소비하는 컴포넌트가 많아질 경우 불필요한 리랜더링이 많이 일어나 애플리케이션의 성능 문제가 생길 수 있다.

이 문제를 해결하기 위한 방법 여러가지  
https://github.com/facebook/react/issues/15156#issuecomment-474590693

1. 하나의 거대한 값을 가진 Context를 만들지 말고 여럿으로 분리하여 필요한 부분만 사용하기
2. 컴포넌트를 쪼개고 React.memo 를 활용하기
3. useMemo 훅을 사용하여 컴포넌트 랜더링 부분을 감싸기
