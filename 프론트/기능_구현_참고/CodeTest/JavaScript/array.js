/**
 * https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array
 */

/**
 * 배열 만들기
 */
var fruits = ['사과', '바나나'];

const clone1 = arr => arr.slice(0);
const clone2 = arr => [...arr];
const clone3 = arr => arr.map(x => x);
const clone4 = arr => JSON.parse(JSON.stringify(arr));
const clone5 = arr => arr.concat({});

// Array.of()
Array.of(7); // [7]
Array.of(1, 2, 3); // [1, 2, 3]

Array(7); // [ , , , , , , ]
Array(1, 2, 3); // [1, 2, 3]

// Array.from
Array.from({ length: 3 });

// 더미 데이터
const posts = [...Array(40).keys()].map(i => ({
  title: `포스트${i}`,
  body: '',
}));

// ----------

// https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/map
const newItems = [].map((item, index, list) => {});
const filterItems = [].filter((item, index, list) => {});
const findItem = [].find((item, index, list) => {
  // 조건만족하는 첫번쨰 아이템 반환
});
const findItemIndex = [].findIndex((item, index, list) => {
  // 주어진 판별 함수를 만족하는 배열의 첫 번째 요소에 대한 인덱스를 반환
});
const fillItems = [].fill(
  (value /*배열을 채울 값*/, start /*시작 인덱스*/, end /*끝 인덱스*/) => {},
);

// some : 조건 중 하나라도 맞으면 참
// every : 조건에 다 맞아야 참
const someBool = [].some((item, index, list) => {
  // 배열 안의 어떤 요소라도 주어진 판별 함수를 통과하는지 테스트
  // callback이 참(불린으로 변환했을 때 true가 되는 값)을 반환하는 요소를 찾을 때까지 배열에 있는 각 요소에 대해 한 번씩 callback 함수를 실행
  // 해당하는 요소를 발견한 경우 some은 즉시 true를 반환합니다. 그렇지 않으면, 즉 모든 값에서 거짓을 반환하면 false를 반환
});
const everyBool = [].every((item, index, list) => {
  // 배열 안의 모든 요소가 주어진 판별 함수를 통과하는지 테스트
  // callback이 거짓을 반환하는 요소를 찾을 때까지 배열에 있는 각 요소에 대해 한 번씩 callback 함수를 실행
  // 해당하는 요소를 발견한 경우 every는 즉시 false를 반환합니다. 그렇지 않으면, 즉 모든 값에서 참을 반환하면 true를 반환
});

console.log(Array.from('foo'));
// Expected output: Array ["f", "o", "o"]

console.log(Array.from([1, 2, 3], x => x + x));
// Expected output: Array [2, 4, 6]

// ----------

/**
 * 배열 구조 분해 할당
 * https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
 */
var a, b, rest;
[a, b] = [10, 20];
console.log(a); // 10
console.log(b); // 20

[a, b, ...rest] = [10, 20, 30, 40, 50];

// ----------

/**
 * 채우기
 */
// 시작 인덱스 부터 끝 인덱스 이전까지 값 채움
const array1 = [1, 2, 3, 4];
console.log(array1.fill(0, 2, 4));
// expected output: [1, 2, 0, 0]
console.log(array1.fill(5, 1));
// expected output: [1, 5, 5, 5]
console.log(array1.fill(6));
// expected output: [6, 6, 6, 6]

/**
 * 중첩 배열 구조를 평탄화
 */
// 지정한 하위 깊이 까지 하나로 이어붙인 배열 만들기
const arr133 = [1, 2, [3, 4]];
arr133.flat();
// [1, 2, 3, 4]

const arr244 = [1, 2, [3, 4, [5, 6]]];
arr244.flat();
// [1, 2, 3, 4, [5, 6]]

const arr355 = [1, 2, [3, 4, [5, 6]]];
arr355.flat(2);
// [1, 2, 3, 4, 5, 6]

const arr466 = [1, 2, [3, 4, [5, 6, [7, 8, [9, 10]]]]];
arr466.flat(Infinity);
// [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

// 배열 구멍 제거
const arr577 = [1, 2, , 4, 5];
arr577.flat();
// [1, 2, 4, 5]

// 배경 length 값 설정/주입
// 현재 배열의 값이 3개 있을 때, length 값을 임의로 2개로 감소시키면 넘치는 요소(element)를 지웁니다.
// (배열의 length 속성을 그에 맞춰 업데이트)

// 배열 크기 설정
new Array(10 /*크기*/);

/**
 * 빈값 제거
 */
[1, 2, 0, null, 'ysm', ''].filter(item => item);
// [1, 2, 'ysm']

// 또는
[1, 2, 0, null, 'ysm', ''].filter(Boolean);

// nullish
[1, 2, 0, null, 'ysm', ''].filter(
  item =>
    item !== null && item !== undefined && item !== '' && !Number.isNaN(item),
);
// [1, 2, 0, 'ysm']

// ----------

/**
 * 반복
 */
// 배열의 항목 각각에 대해 반복하기
fruits.forEach(function (item, index, array) {
  // 기존 for문과 다르게 스코프가 지역
  console.log(item, index);
});
// 사과 0
// 바나나 1

// for...of (배열순환)
const array100 = ['a', 'b', 'c'];
for (const element of array100) {
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
  return { data: currnet, index };
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

const array122 = ['a', 'b', 'c'];
array122.forEach(element => console.log(element));
// expected output: "a"
// expected output: "b"
// expected output: "c"

// some 을 활용한 반복 break - forEach break
// https://blog.outsider.ne.kr/847
[1, 2, 3, 4, 5].some(function (v) {
  if (v === 2) console.log(v);
  return v === 2; // true 조건의 경우 반복문 중단! break; 효과
});

/**
 * break
 */
loop1: for (var i in set1) {
  loop2: for (var j in set2) {
    loop3: for (var k in set3) {
      break loop2; // breaks out of loop3 and loop2
    }
  }
}

// ----------

/**
 * 아이템 추가 / 제거
 */

// 배열 '뒤' 항목 추가하기
var newLength = fruits.push('오렌지'); // push("오렌지", "포도") 처럼 여러개 가능
// ["사과", "바나나", "오렌지"]

// 배열 '뒤' 항목 제거하기
var last = fruits.pop(); // 뒤에서 오렌지를 제거
// ["사과", "바나나"];

// 배열 '앞' 항목 추가하기
var newLength = fruits.unshift('딸기'); // 앞에 추가
// ["딸기", "바나나"];

// 배열 '앞' 항목 제거하기
var first = fruits.shift(); // 앞에서 사과를 제거
// ["바나나"];

// 배열 '인덱스 위치' 항목 제거하기 - 제거된 아이템이 반환된다!!!
// 배열 원본값을 수정한다. - slice 는 복제본을 만들어 반환!!!
var removedItem = fruits.splice(pos, 1); // 항목을 제거하는 방법 (제거하고자 하는 인덱스 값)
// ["딸기", "망고"]

// 배열 내부 JSON 찾아서 제거
var index = fruits.findIndex(value => value.key === key);
fruits.splice(index, 0 <= index ? 1 : 0); // 제거 됨 - splice 는 반환값을 다시 해당 배열에 바인딩 안한다! splice는 원본 배열을 바로 수정한다!

// ----------

/**
 * 자르기
 */
// slice(start[, end])
// slice() 메소드는 begin부터 end 전까지의 복사본을 새로운 배열 객체로 반환한다.
// 즉, 원본 배열은 수정되지 않는다.

// splice(start[, deleteCount[, item1[, item2[, ...]]]])
// splice() 메소드는 배열의 기존 요소를 삭제 또는 교체하거나 새 요소를 추가하여 배열의 내용을 변경한다.
// 이 메소드는 원본 배열 자체를 수정한다.

// 배열 자르기
// slice(start, [, end]) : 복사본을 새로운 배열 객체로 반환 (즉, 원본 배열은 수정되지 않는다.)
var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
var arr1 = arr.slice(3, 5); // [4, 5]
var arr2 = arr.slice(undefined, 5); // [1, 2, 3, 4, 5]
var arr3 = arr.slice(-3); // [8, 9, 10]
var arr4 = arr.slice(-3, 9); // [8, 9]
var arr5 = arr.slice(10); // []
var arr6 = arr.slice(4); // [5, 6, 7, 8, 9, 10]
var arr7 = arr.slice(undefined); // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
var arr8 = arr.slice(5, -4); // [6]
var arr9 = arr.slice(2, 15); // [3, 4, 5, 6, 7, 8, 9, 10]

// splice(start [, length]) : 배열의 기존 요소를 삭제 또는 교체하거나 새 요소를 추가하여 배열의 내용을 변경 (즉, 원본 배열을 수정한다.)
var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
var arr16 = arr.splice(10, 2, 'a', 'b', 'c');
console.log(arr); // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, "a", "b", "c"]
console.log(arr16); // [11, 12]

var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
var arr17 = arr.splice(-6, 4);
console.log(arr); // [1, 2, 3, 4, 5, 6, 11, 12]
console.log(arr17); // [7, 8, 9, 10]

// ----------

/**
 * 아이템 검색
 */
// 배열 안 항목의 인덱스 찾기
fruits.push('망고');
// ["딸기", "바나나", "망고"]
var pos = fruits.indexOf('바나나');
// 1

const array11 = [5, 12, 8, 130, 44];
const isLargeNumber = element => element > 13;
console.log(array11.findIndex(isLargeNumber));
// expected output: 3

// 배열 안 특정 값 찾기
const array12 = [5, 12, 8, 130, 44];
const found = array12.find(element => element > 10);
console.log(found);
// expected output: 12

let dataFilter = data.filter((current, index, list) => {
  return current % 2 === 0; // 짝수 분류
});
// [2, 4]

// 특정 요소 포함여부
const array13 = [1, 2, 3];
console.log(array13.includes(2));
// expected output: true
const pets = ['cat', 'dog', 'bat'];
console.log(pets.includes('cat'));
// expected output: true
console.log(pets.includes('at'));
// expected output: false

// 배열 요소 모두 참 여부 검사
const isBelowThreshold = currentValue => currentValue < 40;
const array14 = [1, 30, 39, 29, 10, 13];
console.log(array14.every(isBelowThreshold));
// expected output: true

// 배열 요소가 객체의 경우
[{ id: 1 }, { id: 2 }].findIndex(item => item?.id === 2); // 또는 .findLastIndex(), 없으면 -1

// ----------

/**
 * 비교
 * 두 배열 또는 객체에 동일한 값 또는 다른값 존재여부 및 값반환
 */
let forDeletion = [2, 3, 5];
let arr = [1, 2, 3, 4, 5, 3];
arr = arr.filter(item => !forDeletion.includes(item));
console.log(arr); // [ 1, 4 ]

const checkboxes = [
  { name: 'boxes', color: 'red' },
  { name: 'boxes', color: 'orange' },
  { name: 'tree', color: 'green' },
  { name: 'tree', color: 'red' },
  { name: 'tree', color: 'yellow' },
];
const finalArray = [
  { name: 'tree', color: 'green' },
  { name: 'tree', color: 'red' },
  { name: 'tree', color: 'yellow' },
];
const checks = checkboxes.filter(
  item1 =>
    !finalArray.find(
      item2 => item2.name === item1.name && item2.color === item1.color,
    ),
);

// ----------

/**
 * 복사
 */
// 배열 복사하기
var shallowCopy = fruits.slice(); // 사본을 만드는 방법
// ["딸기", "망고"]

// ----------

/**
 * 합치기
 */
// 배열 합치기
var list1 = [1, 2, 3];
var list2 = [4, 5, 6];
var list3 = list1.concat(list2, [7, 8, 9]);
// [1, 2, 3, 4, 5, 6, 7, 8, 9]

// ----------

/**
 * 자료구조
 */
// 스택 (후입선출)
var stack = [];
stack.push(1);
stack.push(2);
stack.pop();

// 큐 (선입선출)
var queue = [];
queue.push(1); // enqueue
queue.push(2); // enqueue
queue.shift(); // dequeue

// ----------

/**
 * 펼침연산자 활용
 */
// 기존
function removeItem(items, removable) {
  const index = items.indexOf(removable);
  return items.slice(0, index).concat(items.slice(index + 1));
}
// 변경
function removeItem(items, removable) {
  const index = items.indexOf(removable);
  return [...items.slice(0, index), ...items.slice(index + 1)];
}

// 파라미터
const book = ['A', 'B', 99.9];
function formatBook(title, author, price) {
  return `${title} by ${author} $${price}`;
}
formatBook(...book);

// 정렬
const staff = [
  {
    years: 10,
  },
  {
    years: 5,
  },
  {
    years: 10,
  },
];
[...staff].sort(function (a, b) {
  // 사본 형태로 조작
  if (a.years === b.years) {
    return 0;
  }
  return a.years - b.years; // 오름차순
});

/**
 * 특정 아이템 값 변경
 */
var item = { id: 1 };
var items = [{ id: 2 }, { id: 2 }, { id: 2 }];

var foundIndex = items.findIndex(x => x.id == item.id);
items[foundIndex] = item;
