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

# 실행 콘텍스트 생성 기준

1. 함수코드 (function code)
2. 글로벌코드 (global code)
3. eval코드 (eval code)

ECMA 에서는 실행컨텐스트가 형성되는 경우를 세가지로 규정  
1 전역코드, 2 eval함수, 3 함수안의 코드를 실행

# 자바스크립트 함수 실행단계

1. 실행 콘텍스트 환경을 설정
2. 함수 안의 전체코드에서 함수선언문의 함수를 Function Object로 생성합니다.
3. 다시 함수의 처음으로 올라가 변수를 바인딩 합니다.
4. 다시 함수의 처음으로 돌아가 코드를 실행합니다.

# 호이스팅

함수 호이스팅은 자바스크립트의 변수생성(Instantiation)과 초기화 (Initialization)의 작업이 분리되어 진행되기 때문에 발생

# 스코프

```javascript
// 스코프 퀴즈 - var
(function () {
  var a = 'bbb';
  console.log('A: ' + a); // bbb
  function test1() {
    console.log('B: ' + a); // undefined
    (function () {
      console.log('C: ' + a); // undefuned
      a = 'ccc';
    })();
    var a;
    console.log('D: ' + a); // ccc
  }
  function test2() {
    console.log('E: ' + a); // ddd
  }
  test1();
  a = 'ddd';
  test2();
})();
```

```javascript
// 클로저 방식에서의 스코프 생성시점 증명 예제
// 함수객체가 실행될때 상위 스코프리스트 기반으로 내부스코프를 연결리스트로 붙여 스코프리스트 만듦
var test = 'test';
function a(c) {
  // a 함수객체가 실행되는 시점에 글로벌 스코프와 test 변수 스코프정보 담고 있음
  var b = 'a';
  return function () {
    // 무명함수객체가 실행되는 시점에 상위 함수 스코프기반으로 연결리스트 형태로 내부스코프 b변수 정보를 추가하여 스코프리스트 만듦
    alert(test);
    return c();
  };
}
function e() {
  // a함수의 파라미터로 e 함수를 넘겼지만, e 함수객체가 실행되는 시점에 b 변수는 없다. (즉, 함수가 실행되는 시점의 스코프체이닝에는 b변수가 없다.)
  alert(b); // 렉시컬 환경에 따라 실행 안된다.
}
var hi = a(e);
hi();
```

# 반복문 작동원리 - 스코프 개념 이해 필요

```
for(초기화(순서1); 반복조건(순서2); 반복이 될 때마다 실행되는 코드(순서4, 이후 2,3,4반복)) {
    반복해서 실행될 코드(순서3)
    break 문을 만나면 '반복이 될 때마다 실행되는 코드'를 거치지 않고 for문을 바로 빠져나간다.
}
```

```javascript
for (var i = 1; i <= 5; i++) {
  setTimeout(function () {
    console.log(i);
  }, i * 1000);
}
```

우리는 이 코드가 실행되기 전에 1초마다 하나씩 증가하면서 1,2,3,4,5 이렇게 출력한다고 생각한다.  
하지만 실제로 돌려보면 6만 1초에 한 번씩 출력한다. 왜 6이 나오는 것일까?

반복문이 끝나는 조건은 i<=5 를 벗어났을 때이다.  
timeout 함수 콜백은 반복문이 끝나고 나서 작동한다.  
따라서 i가 5를 초과하는 가장 작은 자연수인 6일 때 실행이 되는 것이다.

이 코드를 우리가 예상한 대로 동작하게 하려면 각각의 i에 대한 복제본을 잡아두어야 한다.  
`현재 반복문 안 5개의 함수들은 반복마다 따로 정의되었음에도 모두 같이 글로벌 스코프 클로저를 공유해 해당 스코프 안에는 하나의 i만이 존재한다.`  
`따라서 모든 함수는 당연하게도 같은 i에 대한 참조를 공유한다.`

여기서 필요한 것은 더 많은 닫힌(closed) 스코프이다. 매 반복문이 돌 때마다 하나의 새로운 닫힌 스코프가 필요하다.

```javascript
for (var i = 1; i <= 5; i++) {
  (function (j) {
    setTimeout(function () {
      console.log(j);
    }, j * 1000);
  })(i);
}
```

ES6에서 적용된 let 선언문을 사용해서도 해결할 수 있다.  
`let은 블록 스코프로 변수를 선언한다.`  
반복문 시작에서 let으로 선언된 변수는 한 번만 선언되는 것이 아니라 반복할 때마다 선언된다.  
따라서 해당 변수는 편리하게도 반복마다 이전 반복이 끝난 이후의 값으로 초기화된다.

```javascript
for (let i = 1; i <= 5; i++) {
  setTimeout(() => console.log(i), i * 1000);
}
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

## 클로저를 사용할 때 주의할 점 - p65

```javascript
for (var i = 0; i < 5; i++) {
  setTimeout(function () {
    console.log(i);
  }, i * 1000);
}
```

실제로 위 코드를 실행하면 0, 1, 2, 3, 4초 뒤에 5만 출력된다.

그 이유는 i 가 전역 변수로 작동하기 때문이다.  
자바스크립트는 기본적으로 함수 레벨 스코프를 따르고 있기 때문에 var 는 for 문의 존재와 상관없이  
해당 구문이 선언된 함수 레벨 스코프를 바라보고 있으므로  
함수 내부 실행이 아니라면 전역 스코프에 var i 가 등록돼 있을 것이다.

for 문을 다 순회한 이후, 태스크 큐에 있는 setTimeout 을 실행하려고 했을 때,  
이미 전역 레벨에 있는 i 는 5 로 업데이트가 완료돼 있다.

이를 올바르게 수정하는 방법은  
첫째, 함수 레벨 스코프가 아닌 블록 레벨 스코프를 갖는 let 으로 수정하는 것이다.  
두 번째로는 클로저를 제대로 활용하는 것이다.

```javascript
for (var i = 0; i < 5; i++) {
  setTimeout(
    (function (sec) {
      return function () {
        console.log(sec);
      };
    })(i),
    i * 1000,
  );
}
```

`클로저의 기본 개념, "함수와 함수가 선언된 어휘적 환경의 조합"을 주의깊게 살표봐야 클로저를 제대로 활용할 수 있다.`  
(유성민 생각: 클로저는 함수 선언시점의 스코프체인 정보를 가지고 반환되는 함수를 말한다.)

## 태스크 큐와 마이크로 태스크 큐 - p76

## 타입 기반 라이브러리 사용을 위해 @types 모듈 설치하기 - p114
