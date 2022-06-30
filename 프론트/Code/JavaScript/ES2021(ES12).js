
/**
 * String.prototype.replaceAll()
 * 정규식에 g옵션을 통해 전역으로 적용하지 않고도 문자열의 지정한 모든 문자열을 특정 문자열의 값으로 변경한다.
 */
const str = 'hello world';
str.replaceAll('l', ''); // "heo word"


/**
 * Promise.any()
 * Promise 반복 가능 객체를 수신하고 Promise 중 하나가 성공할 때마다 성공한 Promise를 반환한다. iterable 객체의 Promise 중 어느 것도 성공하지 못하면(즉, 모든 Promise가 실패/거부됨) 실패한 Promise가 반환된다.
 */
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


/**
 * WeakRefs
 * WeakRef개체를 사용하면 해당 개체가 가비지 수집되는 것을 방지하지 않고 다른 개체에 대한 약한 참조를 유지할 수 있다.
 * https://blog.shiren.dev/2021-08-30/
 * https://ui.toast.com/weekly-pick/ko_20210624
 */
class Counter {
    constructor(element) {
        // Remember a weak reference to the DOM element
        this.ref = new WeakRef(element);
        this.start();
    }

    start() {
        if (this.timer) {
        return;
        }

        this.count = 0;

        const tick = () => {
        // Get the element from the weak reference, if it still exists
        const element = this.ref.deref();
        if (element) {
            element.textContent = ++this.count;
        } else {
            // The element doesn't exist anymore
            console.log("The element is gone.");
            this.stop();
            this.ref = null;
        }
        };

        tick();
        this.timer = setInterval(tick, 1000);
    }

    stop() {
        if (this.timer) {
        clearInterval(this.timer);
        this.timer = 0;
        }
    }
}

const counter = new Counter(document.getElementById("counter"));
setTimeout(() => {
    document.getElementById("counter").remove();
}, 5000);


/**
 * Logical assignment operators (논리 할당 연산자)
 */
// before
obj.prop = obj.prop || foo(); // obj.prop이 잘못된 값일 경우 할당
obj.prop = obj.prop && foo(); // obj.prop이 올바른 값일 경우 할당
obj.prop = obj.prop ?? foo(); // obj.prop이 null이나 undefined일 경우 할당

// after
obj.prop ||= foo();
obj.prop &&= foo();
obj.prop ??= foo();


/**
 * Numeric separators (숫자 구분 기호)
 */
// before
10000000000 // 100억
// after
10_000_000_000 // 100억
console.log(10_000_000_000); // 10000000000


/**
 * Array.prototype.sort 개선
 * sort는 implementation-defined로 기본적인 스펙만 제공하고 나머지는 브라우저에게 맡겼기 때문에 브라우저마다 구현이 달라서 정렬 결과가 다른 문제가 있었다.
 * 이 스펙을 좀 더 정교하게 정의해서 브라우저마다 다를 수 있는 경우의 수를 줄였다.
 */

