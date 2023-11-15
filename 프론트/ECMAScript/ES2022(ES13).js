// ES2022 카카오 FE 정리내용 
// https://fe-developers.kakaoent.com/2022/220728-es2022/


/**
 * Top-level Await Operator
 * 처음에는 생성자 내에서만 클래스 필드를 선언할 수 있었지만 
 * 이제는 4단계의 제안을 사용하여 생성자를 호출할 필요없이 클래스 자체에서 선언할 수 있다.
 */
class hello {
    fields = 0;
    title;
}

/**
 * Top-level await
 */
// [기존 비동기 모듈 export 처리를 위한 방식]
// todoList.mjs
let todoList1;

export default (async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/todos/1");
  todoList1 = await response.json();
})();

export { todoList1 };

// index.mjs
import promise, { todoList1 } from "./todoList.mjs";

promise.then(() => {
  console.log(todoList1); // {userId: 1, id: 1, title: 'delectus aut autem', completed: false}
});

// [비동기 반환값이 있는 모듈을 Top-level await를 활용]
// todoList.mjs
let todoList2;

const response = await fetch("https://jsonplaceholder.typicode.com/todos/1");
todoList2 = await response.json();

export { todoList2 };

// index.mjs
import { todoList2 } from "./todoList.mjs";

console.log(todoList2); // {userId: 1, id: 1, title: 'delectus aut autem', completed: false}


/**
 * Array.prototype.at()
 * Negative Indexing을 통해 배열의 뒤에서부터 원소를 가져오는 방법
 */
const KakaoEnt = ["Melon", "KakaoPage", "KakaoWebtoon"];
console.log(KakaoEnt.at(-1)); // KakaoWebtoon
console.log(KakaoEnt.at(-4)); // undefined


/**
 * Object.hasOwn()
 * Object.hasOwn() 은 Object.prototype.hasOwnProperty() 의 문제점을 해결하고 보다 간결하게 사용하기 위해 고안된 기능
 */
const person = {
    firstName: "east",
    hasOwnProperty() {
        return false;
    },
};
  
person.hasOwnProperty("fistName"); // return false

// 해결을 위한 기존 방식
const hasOwnProperty = Object.prototype.hasOwnProperty;
hasOwnProperty.call(person, "firstName"); // return true

// Object.hasOwn() 방식
Object.hasOwn(person, "firstName"); // return true


/**
 * Private Methods and Fields
 * '#' 기호를 접두사로 사용하여 private 클래스 필드를 직접 선언할 수 있다.
 * 동일한 기호를 사용하여 메서드와 접근자를 비공개로 설정할 수 있으며 동시에 getter 및 setter 메서드를 사용할 수도 있다.
 */
class hello {
    fields = 0;
    #title;
    
    get #title() { return #title; }
    set #title() { #title = null; }
}


/**
 * Static Class Fields and Private Static Methods
 * static 키워드를 사용하여 정적 클래스 필드와 개인 정적 메서드를 선언하는 방법을 제공
 */
class hello {
    name;
    static title = 'here';
    static get title() { return title; }
}


/**
 * Regexp Match Indices
 * 'd' 
 * 문자를 활용하여 일치하는 문자열의 시작 및 끝 인덱스가 있는 배열을 얻을 수 있다.
 */
const re1 = /a+(?<Z>z)?/d;

// indices are relative to start of the input string:
const s1 = "xaaaz";
const m1 = re1.exec(s1);
m1.indices[0][0] === 1;
m1.indices[0][1] === 5;
s1.slice(...m1.indices[0]) === "aaaz";


/**
 * Ergonomic Brand Checks for Private Fields
 * 'in' 연산자를 사용하여 특정 클래스에 필드가 있는지 여부를 간단히 확인할 수 있다.
 */
class hello{
    name;
    #title;
        get #title() {
        return #title;
    }
    set #title() {
        #title = null;
    }
    static hasTitle(obj1) {
        return #title in obj1;
    }
}


/**
 * at() Function for Indexing
 * 'at()' 함수를 사용하여 양수 및 음수 인덱스를 모두 사용하여 문자열을 인덱싱할 수 있다.
 */
let array= [1, 2, 4, 5];
console.log(array[array.length-1]);
console.log(array.at(-1)); 


/**
 * Scalable Object.prototype.hasOwnProperty()
 * Object.prototype.hasOwnProperty.call()과 동일한 hasOwn() 추가
 */
const obj1={ hello:'Hi' }
let hasHello1 = Object.prototype.hasOwnProperty.call(obj1, 'hello');
let hasHello = obj1.hasOwn(obj1, 'hello'); // 
console.log(hasHello);
console.log(hasHello1);


/**
 * Temporal Function (stage 3)
 * Temporal은 ECMAScript 언어에 최신 날짜/시간 API를 제공하는 최상위 네임스페이스 역할을 하는 전역 개체 제공
 * https://tc39.es/proposal-temporal/docs/index.html
 */


