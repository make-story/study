# ECMA스크립트(ECMAScript, 또는 ES)란,

Ecma International이 ECMA-262 기술 규격에 따라 정의하고 있는 표준화된 스크립트 프로그래밍 언어를 말한다.

https://www.mo4tech.com/new-features-for-js-syntax-es6-es7-es8-es9-es10-es11-es12.html

https://yagmurcetintas.com/journal/whats-new-in-es2022?ref=morioh.com&utm_source=morioh.com

https://velog.io/@kyusung/after-es6

## ES2020 (ES11)

### BigInt

BigInt는 정수 리터럴의 뒤에 n을 붙이거나(10n) 함수 BigInt()를 호출해 생성할 수 있다.

```javascript
const theBiggestInt = 9007199254740991n;
const bigintSum = theBiggestInt + 1n; // 9007199254740992n
const alsoHuge = BigInt(9007199254740991); // 9007199254740991n
typeof bigintSum; // "bigint"
```

### Dynamic Import

ES2020 부터는 필요할 때 모듈을 동적으로 가져올 수 있다.

```javascript
if (condition1 && condition2) {
  const module = await import('./path/to/module.js');
  module.doSomething();
}
```

### Optional Chaning

```javascript
const adventurer = {
  name: 'Alice',
  cat: { name: 'Dinah' },
};

const catName = adventurer.cat?.name; // 'Dinah'
const dogName = adventurer.dog?.name; // undefined
```

### Promise.allSettled

Promise.allSettled() 메서드는 주어진 모든 프로미스를 이행하거나 거부한 후, 각 프로미스에 대한 결과를 나타내는 객체 배열을 반환한다.

```javascript
const promiseArr = [
  new Promise((resolve, reject) => setTimeout(resolve, 1000, 'abc')),
  new Promise((resolve, reject) => setTimeout(reject, 2000)),
  new Promise((resolve, reject) => setTimeout(resolve, 3000)),
];

Promise.allSettled(promiseArr).then(data => console.log(data));
[
  {
    status: 'fulfilled',
    value: 'abc',
  },
  {
    status: 'rejected',
  },
  {
    status: 'fulfilled',
  },
];
```

### Nullish Coalescing Operator

널 병합 연산자 (??) 는 왼쪽 피연산자가 null 또는 undefined일 때 오른쪽 피연산자를 반환하고, 그렇지 않으면 왼쪽 피연산자를 반환하는 논리 연산자이다.

```javascript
let user = { u1: 0, u2: false, u3: null, u4: undefined u5: '', }
let u1 = user.u1 ?? 'user 1' // 0
let u2 = user.u2 ?? 'user 2' // false
let u3 = user.u3 ?? 'user 3' // user 3
let u4 = user.u4 ?? 'user 4' // user 4
let u5 = user.u5 ?? 'User 5' // ''
```

### String.protype.matchAll

matchAll 메서드는 지정된 정규식에 대해 문자열과 일치하는 모든 결과의 iterator를 반환하는 메서드입니다.

```javascript
const regexp = /t(e)(st(\d?))/g;
const str = 'test1test2';
const array = [...str.matchAll(regexp)];

console.log(array[0]); // expected output: Array ["test1", "e", "st1", "1"]
console.log(array[1]); // expected output: Array ["test2", "e", "st2", "2"]
```

### Module Namespace Exports

```javascript
// modules.js
export * as A from './moduleA';
export * as B from './moduleB';

//
import { A, B } from './modules';
console.log(A.a); // 1
console.log(A.b); // 2
console.log(B.b); // 3
console.log(B.c); // 4
```

### import.meta

현재 모듈파일의 메타정보를 가져올 수 있다.

```html
<script type="module" src="my-module.js">
```

```javascript
console.log(import.meta); // { url: "file:///home/user/my-module.js" }
```

### globalThis

globalThis는 환경에 관계없이 전역객체를 통일된 방법으로 참조할 수 있는 방법이다.

```javascript
// browser environment
console.log(globalThis); // => Window {...}

// node.js environment
console.log(globalThis); // => Object [global] {...}

// web worker environment
console.log(globalThis); // => DedicatedWorkerGlobalScope {...}
```

---

## ES2021 (ES12)

### String.prototype.replaceAll()

정규식에 g옵션을 통해 전역으로 적용하지 않고도 문자열의 지정한 모든 문자열을 특정 문자열의 값으로 변경한다.

```javascript
const str = 'hello world';
str.replaceAll('l', ''); // "heo word"
```

### Promise.any()

Promise 반복 가능 객체를 수신하고 Promise 중 하나가 성공할 때마다 성공한 Promise를 반환한다.
iterable 객체의 Promise 중 어느 것도 성공하지 못하면(즉, 모든 Promise가 실패/거부됨) 실패한 Promise가 반환된다.

```javascript
const anySuccessPromises = [
  new Promise((res, rej) => setTimeout(res, 200, 'first')),
  new Promise((res, rej) => setTimeout(rej, 100, 'second')),
  new Promise((res, rej) => setTimeout(res, 300, 'third')),
];

// first
Promise.any(anySuccessPromises)
  .then(value => console.log(value))
  .catch(error => console.error(error));

const allFailurePromises = [
  new Promise((res, rej) => setTimeout(rej, 100, 'first')),
  new Promise((res, rej) => setTimeout(rej, 200, 'second')),
  new Promise((res, rej) => setTimeout(rej, 300, 'third')),
];

// AggregateError: All promises were rejected
Promise.any(anySuccessPromises)
  .then(value => console.log(value))
  .catch(error => console.error(error));
```

### Logical assignment operators (논리 할당 연산자)

```javascript
// before
obj.prop = obj.prop || foo(); // obj.prop이 잘못된 값일 경우 할당
obj.prop = obj.prop && foo(); // obj.prop이 올바른 값일 경우 할당
obj.prop = obj.prop ?? foo(); // obj.prop이 null이나 undefined일 경우 할당

// after
obj.prop ||= foo();
obj.prop &&= foo();
obj.prop ??= foo();
```

### Numeric separators (숫자 구분 기호)

```javascript
// before
10000000000; // 100억
// after
10_000_000_000; // 100억
console.log(10_000_000_000); // 10000000000
```

### Array.prototype.sort 개선

- sort는 implementation-defined로 기본적인 스펙만 제공하고 나머지는 브라우저에게 맡겼기 때문에 브라우저마다 구현이 달라서 정렬 결과가 다른 문제가 있었다.
- 이 스펙을 좀 더 정교하게 정의해서 브라우저마다 다를 수 있는 경우의 수를 줄였다.

```javascript

```

```javascript

```

```javascript

```

```javascript

```
