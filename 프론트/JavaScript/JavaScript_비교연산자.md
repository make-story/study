# 비교 연산자

https://developer.mozilla.org/ko/docs/Web/JavaScript/Guide/Expressions_and_operators#%EB%B9%84%EA%B5%90_%EC%97%B0%EC%82%B0%EC%9E%90

https://ko.javascript.info/comparison

# -동등연산자(==), 일치(===)연산자

- ==연산자는 비교하려는 피연산자의 타입이 다를 경우 타입 변환을 거친 다음 비교
- ===연산자는 피연산자의 타입이 다를경우에 타입을 변경하지 않고 비교

```javascript
console.log(1 == '1'); // true
console.log(1 === '1'); // false
```

# 문자열 비교

https://codechacha.com/ko/javascript-compare-strings/

문자열의 ASCII 값을 비교하여 결과를 리턴

- 알파벳 순서가 앞에 있을 수록 더 크기가 작으며, 문자열의 앞에서 뒤의 순서대로 비교를 합니다.
- 문자열이 길어도 같은 위치(Index)의 문자의 알파벳 순서가 작다면 문자열의 크기가 작다고 계산됩니다.
- 문자열 길이가 짧아서 같은 Index에 문자가 없으면 더 작은 문자열로 계산됩니다.

```javascript
const str1 = 'abcd';
const str2 = 'ab';
const str3 = 'abd';
const str4 = 'aba';
const str5 = 'bbcd';

console.log(str1 > str2); // true
console.log(str1 < str3); // true
console.log(str1 > str4); // true
console.log(str1 < str5); // true
```

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
