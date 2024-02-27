# `컴포넌트 패턴`

https://fe-developers.kakaoent.com/2022/221110-ioc-pattern/

IoC(Inversion of Control), 제어 역전 패턴

제어 역전 패턴을 통해 컴포넌트를 사용하는 개발자에게 컴포넌트의 제어권을 넘겨줌으로써,  
개발자가 원하는 대로 컴포넌트를 컨트롤하도록 할 수 있습니다.

- 렌더링 IoC
  - Render Props 패턴
    - 컴포넌트가 렌더링 함수를 프로퍼티(props)로 전달받아 사용하는 방법
  - 합성 컴포넌트 패턴 (Compound Component Pattern)
    - 리액트의 Context/Provider를 사용하여 여러 종류의 컴포넌트가 하나의 로직을 공유할 수 있게 하는 방법
    - https://fe-developers.kakaoent.com/2022/220731-composition-component/
- 상태 관리 IoC
  - 제어 컴포넌트 패턴 (Controlled Props Pattern)
    - 제어 컴포넌트 패턴은 컴포넌트 내부에 정의된 state 나 useState 상태 값과 해당 상태 값을 변경하는 로직들을 사용하지 않고,
      프로퍼티를 통해 외부에서 들어온 상태 값과 콜백 함수를 사용함으로써 외부에서 컴포넌트의 상태를 컨트롤할 수 있게 합니다.
    - 프레젠테이션(Presentational), 컨테이너(Container, 비즈니스로직) 컴포넌트로 분리하는 패턴과 유사
  - Props Getter 패턴
    - 제어 컴포넌트 패턴에서는 상태 값 프로퍼티와 해당 값을 컨트롤하는 콜백 함수 프로퍼티들을 ‘같이’넘겨주어야 하는 문제가 있음
    - 컴포넌트 내부에서 사용하는 콜백 함수들을 외부로 전달
  - State Reducer 패턴
    - useReducer 훅을 통해 reducer 를 사용하여 컴포넌트의 상태 관리

## 렌더링 IoC

### Render Props 패턴

```tsx
/** RenderPropsList.tsx */
interface IRenderPropsList<T> {
  renderItem?: (data: T) => ReactNode; // rendering 함수
  dataSource: Array<T>;
}

const RenderPropsList = function <T>({
  dataSource,
  renderItem,
}: IRenderPropsList<T>) {
  return (
    <div>
      <span>List Count : {totalCount}</span>
      <ul>
        {dataSource.map((data, index) => {
          if (renderItem) {
            return <li key={index}>{renderItem(data)}</li>;
          }
          return <li key={index}>{String(data)}</li>;
        })}
      </ul>
    </div>
  );
};
```

```tsx
/** App.tsx */
const App: React.FC = function () {
  const [data, setData] = useState([
    { id: 1, name: 'flower', score: 91 },
    { id: 2, name: 'geoji', score: 100 },
    { id: 3, name: 'novell', score: 73 },
    { id: 4, name: 'star', score: 84 },
  ]);

  return (
    <RenderPropsList
      dataSource={data}
      renderItem={({ name, score }) => {
        return (
          <div>
            <span>{`Name : ${name} , Score : ${score}`}</span>
          </div>
        );
      }}
    />
  );
};
```

render 프로퍼티만을 전달함으로써 컴포넌트의 렌더링 방식을 컨트롤할 수 있고,  
좀 더 유연하고 다양한 방법으로 컴포넌트를 활용할 수 있습니다.

복잡한 조건의 렌더링 방식을 표현하기에는 제한이 있으며,  
`자칫 잘못하면 render 함수가 너무 복잡해지거나 render 프로퍼티가 너무 많아지는 문제가 발생할 수 있습니다.`

또한 컴포넌트 형태의 호출(<Component/>)이 아닌  
함수 형태의 호출(() => (<Component/>))로 렌더링을 하면  
리액트에서 컴포넌트로 인식하지 않기 때문에, 훅(hook)과 같이 컴포넌트에서만 쓸 수 있는 기능을 사용할 때는 주의가 필요합니다.

https://legacy.reactjs.org/docs/hooks-rules.html#only-call-hooks-from-react-functions

### 합성 컴포넌트 패턴 (Compound Component Pattern)

```tsx
/** CompoundCounter.tsx */
import {
  ButtonHTMLAttributes,
  InputHTMLAttributes,
  MouseEventHandler,
  ReactNode,
  createContext,
  useContext,
  useState,
} from 'react';

interface ICounterContextValue {
  count?: number;
  onChange?: (count: number) => void;
  onIncrement?: () => void;
  onDecrement?: () => void;
}

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
    setCount((prev: number) => prev + 1);
  };

  const onDecrement = function () {
    setCount((prev: number) => prev - 1);
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
  ButtonHTMLAttributes<HTMLButtonElement> & { countType: 'plus' | 'minus' }
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

```tsx
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

## 상태 관리 IoC

### 제어 컴포넌트 패턴(Controlled Props Pattern)

```tsx
/** useControlled.ts */
/**
 * 프로퍼티(valueProp)가 전달되면 해당 프로퍼티 값을 사용하고,
 * 그렇지 않으면 useState로 내부의 상태를 사용하는 훅
 */
interface IUseControlledArgs<T = any> {
  valueProp?: T;
  defaultValue?: T;
}

type IUseControlledReturn<T = any> = [
  T,
  React.Dispatch<React.SetStateAction<T>>,
];

// useControlled 는 제어 컴포넌트 패턴을 사용하기 위해 만든 훅
// 외부에서 전달한 프로퍼티 값(valueProp)이 존재하면 제어 컴포넌트 상태(isControlled=true)가 되어 useState 로 만들어진 값 대신에 해당 프로퍼티 값을 사용
function useControlled<T = any>(
  args: IUseControlledArgs<T> = {},
): IUseControlledReturn {
  const { valueProp, defaultValue } = args;

  const { current: isControlled } = useRef(valueProp !== undefined);

  const [state, setState] = useState<T>(defaultValue);

  const value = isControlled ? valueProp : state;
  const setValue: React.Dispatch<React.SetStateAction<T>> = useCallback(
    newState => {
      !isControlled && setState(newState);
    },
    [],
  );

  return [value, setValue];
}
```

useControlled 훅을 사용하여 상태를 정의하고,  
해당 상태의 변경을 전달하는 콜백 함수들을 프로퍼티로 전달받을 수 있게 함으로써 제어 컴포넌트를 작성

```tsx
/** ControlledCounter.tsx */
interface ICounterProps {
  count?: number;
  onChange?: (next: number) => void;
}

const Couter: React.FC<ICounterProps> = function ({
  count: countProp,
  onChange,
}) {
  // countState - count 프로퍼티가 들어오면 해당 값 사용, 그렇지 않으면 useState 값 사용
  // setCountState - count 프로퍼티가 들어오면 동작하지 않음
  const [countState, setCountState] = useControlled({
    valueProp: countProp,
    defaultValue: 0,
  });

  const onClickIcrement = function () {
    setCountState(prev => (prev ? prev + 1 : 1));
    onChange?.(countState ? countState + 1 : 1);
  };

  const onClickDecrement = function () {
    setCountState(prev => (prev ? prev - 1 : -1));
    onChange?.(countState ? countState - 1 : -1);
  };

  const onChangeInput: ChangeEventHandler<HTMLInputElement> = function (event) {
    setCountState(Number(event.target.value));
    onChange?.(Number(event.target.value));
  };

  return (
    <div>
      <button onClick={onClickIcrement}>+</button>
      <input value={count} onChange={onChangeInput} />
      <button onClick={onClickDecrement}>-</button>
    </div>
  );
};
```

```tsx
/** App.tsx */
function App() {
  const [value, setValue] = useState(0);

  const onChange = function (count: number) {
    if (count > 10 || count < 0) {
      return;
    }

    setValue(count);
  };

  return (
    <div>
      {/* 이제부터 이 컴포넌트 제겁니다. */}
      <Counter count={value} onChange={onChange} />
    </div>
  );
}
```

이렇게 만들어진 제어 컴포넌트는 내부의 상태 값과 로직을 사용하지 않고,  
전달된 프로퍼티와 콜백 함수를 사용함으로써 외부에서 컴포넌트의 상태를 직접 컨트롤할 수 있게 됩니다.

상태 값이 여러 개고 해당 값을 컨트롤하기 위한 콜백 함수가 많아지면,  
오히려 정의해야 하는 함수와 컴포넌트의 프로퍼티가 많아져서 사용성에 문제가 발생할 수 있습니다.

### Props Getter 패턴

```tsx
/** useCounter.ts */
interface IUseCounterArgs {
  valueProp?: number;
  defaultValue?: number;
  onChange?: (next: number) => void;
  onIncrement?: () => void;
  onDecrement?: () => void;
}

export const useCounter = function ({
  valueProp,
  defaultValue,
  ...callbackProps
}: IUseCounterArgs) {
  const [count, setCount] = useControlled({ valueProp, defaultValue });

  const onIncrement = function () {
    setCount(prev => (prev ? prev + 1 : 1));
    callbackProps?.onIncrement?.();
  };

  const onDecrement = function () {
    setCount(prev => (prev ? prev - 1 : -1));
    callbackProps?.onDecrement?.();
  };

  const onChange = function (count: number) {
    setCount(count);
    callbackProps?.onChange?.(count);
  };

  return {
    count,
    onChange,
    onIncrement,
    onDecrement,
  };
};
```

```tsx
/** PropsGetterCounter.tsx */
const Counter: React.FC<ICounterProps> = function ({
  count,
  onChange,
  onIncrement,
  onDecrement,
}) {
  const counter = useCounter({
    valueProp: count,
    defaultValue: 0,
    onChange,
    onIncrement,
    onDecrement,
  });

  const onChangeInput: ChangeEventHandler<HTMLInputElement> = function (event) {
    counter?.onChange(Number(event.target.value));
  };

  return (
    <div>
      <button onClick={counter?.onIncrement}>+</button>
      <input value={counter?.count} onChange={onChangeInput} />
      <button onClick={counter?.onDecrement}>-</button>
    </div>
  );
};
```

useControlled 와 상태를 컨트롤하는 로직들을 하나로 묶어서 useCounter 라는 커스텀 훅을 만들어 사용

```tsx
/** App.tsx */
import Counter, { useCounter } from './PropsGetterCounter';

function App() {
  const { count, ...callbacks } = useCounter({ defaultValue: 10 });

  // onIncrement 콜백만 수정, 나머지는 그대로 사용
  const onIncrement = function () {
    callbacks?.onChange((count ?? 0) + 2);
  };

  return (
    <div>
      <Counter count={count} {...callbacks} onIncrement={onIncrement} />
    </div>
  );
}
```

### State Reducer 패턴

```tsx
/** StateReducerCounter.tsx */
type CounterActionType = 'INCREMENT' | 'DECREMENT' | 'CHANGE';

interface CounterAction {
  type: CounterActionType;
  value?: any;
}

const CounterReducer: Reducer<number, CounterAction> = function (
  state = 0,
  action,
) {
  switch (action?.type) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - 1;
    case 'CHANGE':
      return action.value ?? 0;
    default:
      return state;
  }
};

const Counter: React.FC<ICounterProps> = function () {
  const [count, dispatch] = useReducer(CounterReducer, 0);

  return (
    <div>
      <button onClick={() => dispatch({ type: 'INCREMENT' })}>+</button>
      <input
        value={count}
        onChange={event =>
          dispatch({ type: 'CHANGE', value: Number(event.target.value) })
        }
      />
      <button onClick={() => dispatch({ type: 'DECREMENT' })}>-</button>
    </div>
  );
};
```

이전 상태와 액션을 받아서 새로운 상태를 만들어주는 CounterReducer 와 useReducer 를 사용하여 컴포넌트의 상태를 관리

여기서 reducer 를 외부에서 다시 정의해서 프로퍼티로 넘겨줄 수 있게 된다면 어떻게 될까요?

```tsx
/** StateReducerCounter.tsx */

// 외부에서 정의할 리듀서의 형태
// state,action 처리뿐만 아니라 next 함수 호출을 통해 내부 리듀서를 사용할 수 있다.
export type OuterReducer = (
  state: number,
  action: CounterAction,
  next?: typeof CounterReducer,
) => number;

// 외부에서 정의한 리듀서와 내부 리듀서 결합 함수
function composeReducer(
  outerReducer?: OuterReducer,
): Reducer<number, CounterAction> {
  return function (prevState, action) {
    if (!outerReducer) {
      return CounterReducer(prevState, action);
    }

    return outerReducer(prevState, action, CounterReducer);
  };
}

// Counter Component
interface ICounterProps {
  reducer?: outerReducer;
}

const Counter: React.FC<ICounterProps> = function ({ reducer }) {
  // 외부 리듀서 + 내부 리듀서
  const [count, dispatch] = useReducer(composeReducer(reducer), 0);

  return (
    <div>
      <button onClick={() => dispatch({ type: 'INCREMENT' })}>+</button>
      <input
        value={count}
        onChange={event =>
          dispatch({ type: 'CHANGE', value: Number(event.target.value) })
        }
      />
      <button onClick={() => dispatch({ type: 'DECREMENT' })}>-</button>
    </div>
  );
};
```

```tsx
/** App.tsx */
import Counter, { OuterReducer } from './index';

const counterReducer: OuterReducer = function (state, action, next) {
  // INCREMENT 액션만 수정, 나머지 액션들은 내부 리듀서(next) 사용
  switch (action.type) {
    case 'INCREMENT':
      return state + 2;
    default:
      return next?.(state, action) ?? 0;
  }
};

function App() {
  return (
    <div style={{ padding: 40 }}>
      <Counter reducer={counterReducer} />
    </div>
  );
}
```

컴포넌트 사용자는 원하는 대로 동작하는 새로운 reducer 를 작성하여 프로퍼티로 넘겨줌으로써, 해당 컴포넌트를 컨트롤할 수 있습니다.  
이러한 방식을 사용하면 이제 더 이상 컴포넌트의 프로퍼티에 대해 신경 쓸 필요가 없습니다.

또한 reducer 는 useState 나 useEffect 같은 훅을 사용하지 않기 때문에 굳이 컴포넌트 내부에서 작성하지 않고 별도로 분리해서 작성할 수 있습니다!
