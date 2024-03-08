`study.git/프론트/NextJS_React/React_Children.md` 내용 참고

# Ref (references)

https://react.dev/learn/referencing-values-with-refs

https://react.dev/learn/manipulating-the-dom-with-refs

https://react.dev/reference/react/useRef

https://react.dev/reference/react/forwardRef

https://ko.legacy.reactjs.org/docs/refs-and-the-dom.html

공식 문서 내용 중  
`본질적으로 useRef는 .current 프로퍼티에 변경 가능한 값을 담고 있는 “상자”와 같습니다.`  
.current 프로퍼티를 변형하는 것이 리렌더링을 발생시키지는 않습니다.

## callback ref

https://ko.legacy.reactjs.org/docs/refs-and-the-dom.html#callback-refs

https://mycodings.fly.dev/blog/2023-11-22-complete-understanding-of-react-refs-useref-and-createref

```jsx
import React, { useRef, useEffect } from 'react';

function MyComponent() {
  const myRef = useRef(null);

  // callback refs 함수
  const handleRef = element => {
    if (element) {
      // DOM 요소에 접근
      console.log('DOM 요소에 접근:', element);

      // 마운트 시 동작 수행
      console.log('컴포넌트 마운트됨');
    } else {
      // 언마운트 시 동작 수행
      console.log('컴포넌트 언마운트됨');
    }
  };

  return (
    <div>
      {/* 콜백 ref를 연결 */}
      <div ref={handleRef}>이것은 DOM 요소입니다.</div>
    </div>
  );
}

export default MyComponent;
```

## Dom 높이 확인 - callback ref 활용

https://ko.legacy.reactjs.org/docs/hooks-faq.html#how-can-i-measure-a-dom-node

```jsx
function MeasureExample() {
  const [height, setHeight] = useState(0);

  const measuredRef = useCallback(node => {
    if (node !== null) {
      setHeight(node.getBoundingClientRect().height);
    }
  }, []);

  return (
    <>
      <h1 ref={measuredRef}>Hello, world</h1>
      <h2>The above header is {Math.round(height)}px tall</h2>
    </>
  );
}
```

사용자 훅을 만들어 사용할 때

```jsx
function MeasureExample() {
  const [rect, ref] = useClientRect();
  return (
    <>
      <h1 ref={ref}>Hello, world</h1>
      {rect !== null && (
        <h2>The above header is {Math.round(rect.height)}px tall</h2>
      )}
    </>
  );
}

function useClientRect() {
  const [rect, setRect] = useState(null);
  const ref = useCallback(node => {
    if (node !== null) {
      setRect(node.getBoundingClientRect());
    }
  }, []);
  return [rect, ref];
}
```

## createRef / useRef

- Class 컴포넌트에서는 createRef()
- Functional 컴포넌트에서는 useRef()

https://mycodings.fly.dev/blog/2023-11-22-complete-understanding-of-react-refs-useref-and-createref

createRef 는 호출될 때마다 새로운 ref 객체를 반환하지만,  
useRef 는 각 렌더링 사이클마다 동일한 ref 객체를 유지

createRef 가 초기 세팅 값을 받지 않아서 ref 의 현재 속성이 처음에는 무조건 null 로 설정  
useRef 는 초기값을 받을 수 있으며, ref 의 현재 속성은 개발자가 지정한 값으로 초기화

## Ref 전달하기 (상위 컴포넌트에 ref 전달, ref forwarding)

https://react.dev/reference/react/forwardRef

```jsx
// MyInput
import { forwardRef } from 'react';

const MyInput = forwardRef((props, ref) => {
  const { label, ...otherProps } = props;
  return (
    <label>
      {label}
      <input {...otherProps} ref={ref} />
    </label>
  );
});

export default MyInput;
```

```jsx
// FormField
import { forwardRef, useState } from 'react';
import MyInput from './MyInput.js';

const FormField = forwardRef(function FormField({ label, isRequired }, ref) {
  const [value, setValue] = useState('');
  return (
    <>
      <MyInput
        ref={ref}
        label={label}
        value={value}
        onChange={e => setValue(e.target.value)}
      />
      {isRequired && value === '' && <i>Required</i>}
    </>
  );
});

export default FormField;
```

```jsx
// App
import { useRef } from 'react';
import FormField from './FormField.js';

export default function Form() {
  const ref = useRef(null);

  function handleClick() {
    ref.current.focus();
  }

  return (
    <form>
      <FormField label='Enter your name:' ref={ref} isRequired={true} />
      <button type='button' onClick={handleClick}>
        Edit
      </button>
    </form>
  );
}
```

## Ref 주의

https://mycodings.fly.dev/blog/2023-11-22-complete-understanding-of-react-refs-useref-and-createref

```jsx
import React, { useRef, useEffect } from 'react';

function MyComponent() {
  const myRef = useRef();

  useEffect(() => {
    // 컴포넌트가 마운트 해제될 때 정리
    return () => {
      myRef.current = null;
    };
  }, []);

  return (
    <div>
      <h1>My Component</h1>
      <div ref={myRef}>이것은 DOM 요소입니다.</div>
    </div>
  );
}

export default MyComponent;
```
