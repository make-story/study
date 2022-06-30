// https://velog.io/@kyusung/after-es6


/**
 * async/await
 */
async function getData() {
    const res = await api.getTableData(); // await asynchronous task 
    // do something
}


/**
 * Object.values()
 */
Object.values({a: 1, b: 2, c: 3}); // [1, 2, 3]


/**
 * Object.entries()
 */
Object.entries({a: 1, b: 2, c: 3}); // [["a", 1], ["b", 2], ["c", 3]]


/**
 * Object.getOwnPropertyDescriptors()
 * 개체의 모든 속성에 대한 설명자를 가져오거나 개체의 속성이 없는 경우 빈 개체를 반환.
 */
let user = { name: "John"};
let descriptor = Object.getOwnPropertyDescriptor(user, 'name');

console.log(JSON.stringify(descriptor, null, 2));
/* property descriptor:
{
    "value": "John",
    "writable": true,
    "enumerable": true,
    "configurable": true
}
*/


/**
 * SharedArrayBuffer object
 * 멀티 스레드간에 메모리 공유를 위해 사용. 주요 브라우저에서 기본적으로 비활성화 되어있음.
 * https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/SharedArrayBuffer
 * http://hacks.mozilla.or.kr/2017/11/a-cartoon-intro-to-arraybuffers-and-sharedarraybuffers/
 */
/** 
** @param {*} length The size of the array buffer created, in bytes. 
** @Returns {ShareDarrayBuffer} A new ShareDarrayBuffer object of specified size. Its contents are initialized to 0. */
new SharedArrayBuffer(10);


/**
 * Atomic Object
 * Atomics 개체는 ShareDarrayBuffer 개체에서 원자적 작업을 수행하는 데 사용되는 정적 메서드 집합을 제공함.
 * https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Atomics
 */


/**
 * String padding
 * 문자열 끝 부분이나 시작 부분을 다른 문자열로 채워 주어진 길이를 만족하는 새로운 문자열을 만들어낼 수 있다.
 */
"hello".padStart(6); // " hello"
"hello".padEnd(6); // "hello "
"hello".padStart(3); // "hello" // 문자열 길이보다 목표 문자열 길이가 짧다면 채워넣지 않고 그대로 반환
"hello".padEnd(20, "*"); // "hello***************" // 사용자가 지정한 값으로 채우는 것도 가능


/**
 * Trailing Comma
 * JavaScript는 초기부터 배열 리터럴에 trailing comma를 허용했으며, ECMAScript 5부터는 객체 리터럴, ECMAScript 2017부터는 함수의 매개변수에도 허용
 */
function f(p) {}
function f(p,) {}
 
(p) => {};
(p,) => {};


