# JSX

`모던 리액트 Deep Dive` 책 내용 중 - p116

JSX 는 리액트가 등장하면서 페이스북(현 메타)에서 소개한 새로운 구문이지만 반드시 리액트에서만 사용하라는 법은 없다.  
JSX 는 흔히 개발자들이 알고 있는 XML 과 유사한 내장형 구문이며, 리액트에 종속적이지 않은 독자적인 문법으로 보는 것이 옳다.  
그리고 페이스북에서 독자적으로 개발했다는 사실에서 미루어 알 수 있듯이 JSX 는 이른바 ECMAScript 라고 불리는 자바스크립트 표준의 일부는 아니다.

JSX 는 자바스크립트 표준 코드가 아닌 페이스북이 임의로 만든 새로운 문법이기 때문에 JSX 는 반드시 트랜스파일러를 거쳐야 비로소 자바스크립트 런타임이 이해할 수 있는 의미 있는 자바스크립트 코드로 변환된다.

`JSX 의 설계 목적은 다양한 트렌스파일러에서 다양한 속성을 거진 트리 구조를 토큰화해 ECMAScript 로 변환하는 데 초점을 두고 있다.`
https://facebook.github.io/jsx/#sec-intro

조금 더 쉽게 이야기하자면 JSX 내부에 트리 구조로 표현하고 싶은 다양한 것들을 작성해 두고,  
이 JSX 를 트랜스파일이라는 과정을 거쳐  
자바스크립트(ECMAScript)가 이해할 수 있는 코드로 변경하는 것이 목표라고 볼 수 있다.  
즉, JSX 가 주로 사용되는 곳은 리액트 내부에서 반환하는 HTML 과 자바스크립트 코드이지만 꼭 그것에 한정돼 있는 것은 아니다.

## JSX 정의 - p117

JSX 는 기본적으로 JSXElement, JSXAttributes, JSXChildren, JSXStrings 라는 4가지 컴포넌트를 기반으로 구성돼 있다.

## JSX 는 어떻게 자바스크립트에서 변환될까? - p124

`JSX 반환값이 결국 React.createElement 로 귀결된다는 사실`을 파악한다면  
쉽게 리팩터링할 수 있다.

---

# JSX는 왜 루트 요소가 하나여야만 할까?

https://velog.io/@eunjios/React-JSX%EB%8A%94-%EC%99%9C-%EB%A3%A8%ED%8A%B8-%EC%9A%94%EC%86%8C%EA%B0%80-%ED%95%98%EB%82%98%EC%97%AC%EC%95%BC%EB%A7%8C-%ED%95%A0%EA%B9%8C

JSX 문법을 React 객체로 트랜스파일링 하는 과정 때문

```jsx
// JSX
return (
  <div>
    <h2>Title</h2>
    <MyComponent data={data} />
  </div>
);
```

```javascript
// React 객체
// React.createElement(요소 이름, props 정보, 내부 요소1, 내부 요소2, ...)
return React.createElement(
  'div',
  {},
  React.createElement('h2', {}, 'Title'),
  React.createElement(MyComponent, { data: data }),
);
```

다음과 같이 React 객체 여러 개를 반환하게 된다. 함수의 반환값은 여러 개의 객체일 수 없다.

```jsx
// JSX
return (
  <div><div>
  <h2>Title</h2>
  <MyComponent data={data} />
);
```

```javascript
// React 객체
return (
  React.createElement('div', {})
  React.createElement('h2', {}, 'Title')
  React.createElement(MyComponent, { data: data })
);
```

## `ReactNode 여부 검사 - isValidElement`

```tsx
import {
  PropsWithChildren,
  ReactElement,
  ReactNode,
  UIEvent,
  useCallback,
  useMemo,
  useState,
  isValidElement,
  cloneElement,
} from 'react';

interface Props extends PropsWithChildren {
  bar: ReactNode;
}

export default function TestReactNode({ bar }: Props): ReactElement {
  const Navigation = useMemo((): ReactNode => {
    if (isValidElement(bar)) {
      const props = { title: 'test!!!' };
      return cloneElement(bar, props);
    }
    return bar;
  }, [bar]);

  return <>{Navigation && <>{Navigation}</>}TEST</>;
}
```
