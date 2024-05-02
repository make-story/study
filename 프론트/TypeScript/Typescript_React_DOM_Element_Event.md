# DOM Type

https://typescript-kr.github.io/pages/tutorials/dom-manipulation.html

https://microsoft.github.io/PowerBI-JavaScript/modules/_node_modules_typedoc_node_modules_typescript_lib_lib_dom_d_.html

# `Element Type`

https://microsoft.github.io/PowerBI-JavaScript/interfaces/_node_modules_typedoc_node_modules_typescript_lib_lib_dom_d_.htmlelement.html

```typescript
const content: HTMLElement = document.querySelector('#content');
```

# Element 속성

```typescript
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}
```

```typescript
type ArrayElement<ArrayType extends readonly unknown[]> =
  ArrayType extends readonly (infer ElementType)[] ? ElementType : never;

type A = ArrayElement<string[]>; // string
type B = ArrayElement<readonly string[]>; // string
type C = ArrayElement<[string, number]>; // string | number
type D = ArrayElement<['foo', 'bar']>; // "foo" | "bar"
type E = ArrayElement<(P | (Q | R))[]>; // P | Q | R
```

# `JavaScript Event` - React Event Handler Cheat Sheet

https://developer.mozilla.org/ko/docs/Web/API#%EC%9D%B8%ED%84%B0%ED%8E%98%EC%9D%B4%EC%8A%A4

https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/forms_and_events/

```tsx
// MouseEvent
const Test = () => (
  <button onClick={(event: MouseEvent<HTMLButtonElement>) => {}}>test</button>
);
```

```tsx
// FormEvent
import React, { useCallback } from 'react';

function Component() {
  const onClickSubmit = useCallback(function onClickSubmit(
    event: FormEvent<HTMLElement>,
  ) {
    // ...
  },
  []);

  return (
    <button disabled={false} onClick={onClickSubmit}>
      실행
    </button>
  );
}
```

```tsx
// scroll

function Component() {
  useEffect(() => {
    // WheelEvent
    const handlerScroll = (event: Event) => {
      // ...
    };
    document.addEventListener('scroll', handlerScroll);
    return () => {
      document.removeEventListener('scroll', handlerScroll);
    };
  }, []);
  return <></>;
}
```

## 이벤트 유형에 신경 쓰지 않는다면 React.SyntheticEvent 를 사용할 수 있습니다.

```tsx
// SyntheticEvent
import React from 'react';

function Component() {
  const onSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
  };

  return (
    <form ref={formRef} onSubmit={onSubmit}>
      <div>
        <label>
          Email:
          <input type='email' name='email' />
        </label>
      </div>
      <div>
        <label>
          Password:
          <input type='password' name='password' />
        </label>
      </div>
      <div>
        <input type='submit' value='Log in' />
      </div>
    </form>
  );
}
```

https://velog.io/@leehaeun0/TypeScript-%EC%9D%B4%EB%B2%A4%ED%8A%B8-%ED%95%B8%EB%93%A4%EB%9F%AC-%ED%83%80%EC%9E%85-%EA%B0%84%EB%8B%A8%ED%95%98%EA%B2%8C-%EC%93%B0%EA%B8%B0

https://x.com/sebastienlorber/status/1512420374201446405?s=20

기존방식  
(이벤트 별 핸들러 타입 이름과 HTMLElement의 이름을 매번 떠올려야 하는 점)

```typescript
// ChangeEventHandler
import React from 'react';

function Component() {
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = e => {
    console.log(e.target.value);
  };

  return <input onChange={handleChange} />;
}
```

간단한 방법  
(ComponentProps)

```typescript
// ComponentProps
import { ComponentProps } from 'react';

function Component() {
  const handleChange: ComponentProps<'input'>['onChange'] = e => {
    console.log(e.target.value);
  };
  const onStop = useCallback<
    (event: ComponentProps<'button'>['onClick']) => void
  >(event => {
    // ...
  }, []);

  return <input onChange={handleChange} />;
}
```

또는

```typescript
// type 만들어 사용
import { ComponentProps, DOMAttributes } from 'react';

type EventHandlers<T> = Omit<
  DOMAttributes<T>,
  'children' | 'dangerouslySetInnerHTML'
>;

export type Event<
  TElement extends keyof JSX.IntrinsicElements,
  TEventHandler extends keyof EventHandlers<TElement>,
> = ComponentProps<TElement>[TEventHandler];

function Component() {
  const handleChange: Event<'input', 'onChange'> = e => {
    console.log(e.target.value);
  };

  return <input onChange={handleChange} />;
}
```

## 참고

```typescript
const [filter, setFilter, setFilterReset] = useKeyValueState<{
  device: string;
  category: string;
  testcase: string;
  url?: string;
}>({
  device: '',
  category: '',
  testcase: '',
  url: '',
});

const onChangeFilter = useCallback<ChangeEventHandler<HTMLSelectElement>>(
  function onChangeFilter(event) {
    const { name, value } = event?.currentTarget;
    setFilter(name as any, value);
  },
  [filter],
);
```

# forwardRef 사용간 DOM 타입!

```typescript
import { forwardRef, InputHTMLAttributes } from 'react';

import { cn } from '@/common/utils/style/index';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = 'Input';

export { Input };
```
