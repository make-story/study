# -동등연산자(==), 일치(===)연산자

- ==연산자는 비교하려는 피연산자의 타입이 다를 경우 타입 변환을 거친 다음 비교
- ===연산자는 피연산자의 타입이 다를경우에 타입을 변경하지 않고 비교

```javascript
console.log(1 == '1'); // true
console.log(1 === '1'); // false
```

# 함수객체가 가지고 있는 것

length (인자의 개수를 나타낸다)  
모든 함수는 객체로서 prototype 프로퍼티를 가지고 있다.  
ECMA 표준에서는 함수 객체의 부모 역할을 하는 프로토타입 객체를 Function. prototype 객체라고 명명하고 있으며, 이것 역시 함수 객체라고 정의하고 있다. (크롬브라우저에서는 Empty() 함수라고 명하고 있음)

# 빌트인

자바스크립트는 빌트인 덕분에 동적생성, 타입변환 등이 유동적으로 가능하다.  
빌트인은 배열, 함수, 정규식 등이 브라우저 내장된 객체를 이용해 객체인스턴스가 생성되는 개념

# `모던 리액트 Deep Dive` 책 내용 중

## 자바스크립트의 또 다른 비교 공식, Object.is - p29

Object.js 는 '===' 와 동일하게 타입이 다르면 그냥 false 다.

'===' 와도 차이가 존재

```javascript
-0 === +0; // true
Object.is(-0, +0); // false

Number.NaN ==== NaN; // false
Object.is(Number.NaN, NaN); // true

NaN === 0 / 0; // false
Object.is(NaN, 0 / 0); // true
```

한 가지 주의해야 할 점은, Object.is 를 사용한다 하더라도 객체 비교에는 별 차이가 없다는 것이다.

```javascript
Object.is({}, {}); // false
```

## 리액트에서의 동등 비교 - p30

```typescript
function is(x: any, y: any) {
  return (x === y && (x !== 0 || 1 / x === 1 / y)) || (x !== x && y !== y);
}

const objectIs: (x: any, y: any) => boolean =
  typeof Object.is === 'function' ? Object.is : is;

export default objectIs;
```

리액트에서는 이 objectIs 를 기반으로 동등 비교를 하는 shalloEqual 이라는 함수를 만들어 사용한다.

https://github.com/facebook/react/blob/main/packages/shared/shallowEqual.js

```typescript
/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import is from './objectIs';
import hasOwnProperty from './hasOwnProperty';

/**
 * Performs equality by iterating through keys on an object and returning false
 * when any key has values which are not strictly equal between the arguments.
 * Returns true when the values of all keys are strictly equal.
 */
function shallowEqual(objA: mixed, objB: mixed): boolean {
  if (is(objA, objB)) {
    return true;
  }

  if (
    typeof objA !== 'object' ||
    objA === null ||
    typeof objB !== 'object' ||
    objB === null
  ) {
    return false;
  }

  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) {
    return false;
  }

  // Test for A's keys different from B.
  for (let i = 0; i < keysA.length; i++) {
    const currentKey = keysA[i];
    if (
      !hasOwnProperty.call(objB, currentKey) ||
      // $FlowFixMe[incompatible-use] lost refinement of `objB`
      !is(objA[currentKey], objB[currentKey])
    ) {
      return false;
    }
  }

  return true;
}

export default shallowEqual;
```

## 타입 기반 라이브러리 사용을 위해 @types 모듈 설치하기 - p114
