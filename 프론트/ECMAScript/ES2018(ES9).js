/**
 * Asynchronous iteration
 */
async function process(array) {
  for await (let i of array) {
    // doSomething(i);
  }
}

/**
 * Promise.finally()
 * Promise가 처리되면 충족되거나 거부되는지 여부에 관계없이 지정된 콜백 함수가 실행됨.
 */
Promise.resolve()
  .then()
  .catch(e => e)
  .finally();

/**
 * Rest/Spread
 * Object spread properties
 */
const myObj = { a: 1, b: 3, c: 'cc', d: 100 };

const { a, b, ...z } = myObj;
console.log(z); // { "c": "cc", "d": 100 }

const spread = { ...myObj, a: 10, e: 30 };
console.log(spread); // { "a": 10, "b": 3, "c": "cc", "d": 100, "e": 0 }
