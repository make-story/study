/**
 * Dynamic Import
 * ES2020 부터는 필요할 때 모듈을 동적으로 가져올 수 있다.
 */
if (condition1 && condition2) {
  const module = await import('./path/to/module.js');
  module.doSomething();
}

/**
 * Optional Chaning (옵셔널 체이닝)
 * ?. 연산자는 . 체이닝 연산자와 유사하게 작동하지만,
 * 만약 참조가 nullish(null 또는 undefined)이라면,
 * 에러가 발생하는 것 대신에 표현식의 리턴 값은 undefined로 단락된다.
 * 함수 호출에서 사용될 때, 만약 주어진 함수가 존재하지 않는다면, undefined를 리턴한다.
 */
const adventurer = {
  name: 'Alice',
  cat: {
    name: 'Dinah',
  },
};

null?.test; // undefined
undefined?.test; // undefined
const catName = adventurer.cat?.name; // 'Dinah'
const dogName = adventurer.dog?.name; // undefined

/**
 * Promise.allSettled
 * Promise.allSettled() 메서드는 주어진 모든 프로미스를 이행하거나 거부한 후, 각 프로미스에 대한 결과를 나타내는 객체 배열을 반환한다.
 */
const promiseArr = [
  new Promise((resolve, reject) => setTimeout(resolve, 1000, 'abc')),
  new Promise((resolve, reject) => setTimeout(reject, 2000)),
  new Promise((resolve, reject) => setTimeout(resolve, 3000)),
];

Promise.allSettled(promiseArr).then(data => console.log(data));
/*[
    {
        "status": "fulfilled",
        "value": "abc"
    },
    {
        "status": "rejected"
    },
    {
        "status": "fulfilled"
    }
]*/

/**
 * Nullish Coalescing Operator
 * 널 병합 연산자 (??) 는 왼쪽 피연산자가 null 또는 undefined일 때 오른쪽 피연산자를 반환하고, 그렇지 않으면 왼쪽 피연산자를 반환하는 논리 연산자이다.
 */
let user = { u1: 0, u2: false, u3: null, u4: undefined, u5: '' };
let u1 = user.u1 ?? 'user 1'; // 0
let u2 = user.u2 ?? 'user 2'; // false
let u3 = user.u3 ?? 'user 3'; // user 3
let u4 = user.u4 ?? 'user 4'; // user 4
let u5 = user.u5 ?? 'User 5'; // ''

/**
 * String.protype.matchAll
 * matchAll 메서드는 지정된 정규식에 대해 문자열과 일치하는 모든 결과의 iterator를 반환하는 메서드입니다.(캡쳐링 그룹 포함) 정규 표현식 뒤에 g flag를 사용해주어야 합니다.
 */
const regexp = /t(e)(st(\d?))/g;
const str = 'test1test2';
const array = [...str.matchAll(regexp)];

console.log(array[0]); // expected output: Array ["test1", "e", "st1", "1"]
console.log(array[1]); // expected output: Array ["test2", "e", "st2", "2"]

/**
 * Module Namespace Exports
 */
export * as A from './moduleA';
export * as B from './moduleA';

import { A, B } from './modules';
console.log(A.a); // 1
console.log(A.b); // 2
console.log(B.b); // 3
console.log(B.c); // 4

/**
 * import.meta
 * 현재 모듈파일의 메타정보를 가져올 수 있다.
 */
// <script type="module" src="my-module.js">
console.log(import.meta); // { url: "file:///home/user/my-module.js" }

/**
 * globalThis
 * globalThis는 환경에 관계없이 전역객체를 통일된 방법으로 참조할 수 있는 방법이다.
 */
// browser environment
console.log(globalThis); // => Window {...}

// node.js environment
console.log(globalThis); // => Object [global] {...}

// web worker environment
console.log(globalThis); // => DedicatedWorkerGlobalScope {...}
