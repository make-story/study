/**
 * https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array
 */

// 배열 만들기 
var fruits = ['사과', '바나나'];


// Array.of()
Array.of(7);       // [7]
Array.of(1, 2, 3); // [1, 2, 3]

Array(7);          // [ , , , , , , ]
Array(1, 2, 3);    // [1, 2, 3]


// 시작 인덱스 부터 끝 인덱스 이전까지 값 채움
const array1 = [1, 2, 3, 4];
console.log(array1.fill(0, 2, 4));
// expected output: [1, 2, 0, 0]

console.log(array1.fill(5, 1));
// expected output: [1, 5, 5, 5]

console.log(array1.fill(6));
// expected output: [6, 6, 6, 6]


// 지정한 하위 깊이 까지 하나로 이어붙인 배열 만들기
const arr1 = [1, 2, [3, 4]];
arr1.flat();
// [1, 2, 3, 4]
const arr2 = [1, 2, [3, 4, [5, 6]]];
arr2.flat();
// [1, 2, 3, 4, [5, 6]]
const arr3 = [1, 2, [3, 4, [5, 6]]];
arr3.flat(2);
// [1, 2, 3, 4, 5, 6]
const arr4 = [1, 2, [3, 4, [5, 6, [7, 8, [9, 10]]]]];
arr4.flat(Infinity);
// [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]


// 배열 구멍 제거
const arr5 = [1, 2, , 4, 5];
arr5.flat();
// [1, 2, 4, 5]



// ----------


// 배열의 항목 각각에 대해 반복하기
fruits.forEach(function (item, index, array) { // 기존 for문과 다르게 스코프가 지역
	console.log(item, index);
});
// 사과 0
// 바나나 1


// for...of (배열순환)
const array1 = ['a', 'b', 'c'];
for (const element of array1) {
	console.log(element);
}
// expected output: "a"
// expected output: "b"
// expected output: "c"


// for...in (객체순환)
const object = { a: 1, b: 2, c: 3 };
for (const property in object) {
  console.log(`${property}: ${object[property]}`);
}
// expected output:
// "a: 1"
// "b: 2"
// "c: 3"


// 반복기
let data = [1, 2, 3, 4];
let dataObject = data.map((currnet, index, list) => {
	return { data: currnet, index, };
});
/*
[
	{ data: 1, index: 0 },
	{ data: 2, index: 1 },
	{ data: 3, index: 2 },
	{ data: 4, index: 3 },
]
*/

let dataReduce = data.reduce((acc, current, index, list) => {
	return acc + current;
}, 0);
// 1 + 2 + 3 + 4 = 10;

const array1 = ['a', 'b', 'c'];
array1.forEach(element => console.log(element));
// expected output: "a"
// expected output: "b"
// expected output: "c"


// some 을 활용한 반복 break
[1,2,3,4,5].some(function(v) {
	if(v == 2) console.log(v);
	return (v ==2);
 });

// ----------


// 배열 '뒤' 항목 추가하기
var newLength = fruits.push("오렌지"); // push("오렌지", "포도") 처럼 여러개 가능
// ["사과", "바나나", "오렌지"]



// 배열 '뒤' 항목 제거하기
var last = fruits.pop(); // 뒤에서 오렌지를 제거
// ["사과", "바나나"];



// 배열 '앞' 항목 추가하기
var newLength = fruits.unshift("딸기") // 앞에 추가
// ["딸기", "바나나"];



// 배열 '앞' 항목 제거하기
var first = fruits.shift(); // 앞에서 사과를 제거
// ["바나나"];



// 배열 '인덱스 위치' 항목 제거하기
var removedItem = fruits.splice(pos, 1); // 항목을 제거하는 방법 (제거하고자 하는 인덱스 값)
// ["딸기", "망고"]


// ----------


// 배열 안 항목의 인덱스 찾기
fruits.push("망고");
// ["딸기", "바나나", "망고"]
var pos = fruits.indexOf("바나나");
// 1

const array1 = [5, 12, 8, 130, 44];
const isLargeNumber = (element) => element > 13;
console.log(array1.findIndex(isLargeNumber));
// expected output: 3


// 배열 안 특정 값 찾기
const array1 = [5, 12, 8, 130, 44];
const found = array1.find(element => element > 10);
console.log(found);
// expected output: 12

let dataFilter = data.filter((current, index, list) => {
	return current % 2 === 0; // 짝수 분류
});
// [2, 4]


// 특정 요소 포함여부 
const array1 = [1, 2, 3];
console.log(array1.includes(2));
// expected output: true
const pets = ['cat', 'dog', 'bat'];
console.log(pets.includes('cat'));
// expected output: true
console.log(pets.includes('at'));
// expected output: false


// 배열 요소 모두 참 여부 검사
const isBelowThreshold = (currentValue) => currentValue < 40;
const array1 = [1, 30, 39, 29, 10, 13];
console.log(array1.every(isBelowThreshold));
// expected output: true


// ----------


// 배열 복사하기
var shallowCopy = fruits.slice(); // 사본을 만드는 방법
// ["딸기", "망고"]


// ----------


// 배열 합치기
var list1 = [1, 2, 3];
var list2 = [4, 5, 6];
var list3 = list1.concat(list2, [7, 8, 9]);
// [1, 2, 3, 4, 5, 6, 7, 8, 9]


// ----------


// 배경 length 값 설정/주입
// 현재 배열의 값이 3개 있을 때, length 값을 임의로 2개로 감소시키면 넘치는 요소(element)를 지웁니다.
// (배열의 length 속성을 그에 맞춰 업데이트)

// 배열 크기 설정
new Array(10/*크기*/);


// ----------


// 자료구조
// 스택 (후입선출)
var stack = [];
stack.push(1);
stack.push(2);
stack.pop();
// 큐 (선입선출)
var queue = [];
queue.push(1); // enqueue
queue.push(2); // enqueue
queue.shift(); // dequeue


// ----------


// 펼침연산자 활용
// 기존
function removeItem(items, removable) {
	const index = items.indexOf(removable);
	return items.slice(0, index).concat(items.slice(index + 1));
}
// 변경
function removeItem(items, removable) {
	const index = items.indexOf(removable);
	return [ ...items.slice(0, index), ...items.slice(index + 1) ];
}
// 파라미터
const book = ['A', 'B', 99.90];
function formatBook(title, author, price) {
	return `${title} by ${author} $${price}`;
}
formatBook(...book);



// 펼침연산자 정렬
const staff = [
	{ 
		years: 10
	},
	{ 
		years: 5
	},
	{ 
		years: 10
	}
];
[ ...staff ].sort(function(a, b) { // 사본 형태로 조작
	if(a.years === b.years) {
		return 0;
	}
	return a.years - b.years; // 오름차순
});