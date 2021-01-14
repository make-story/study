
var fruits = ['사과', '바나나'];

// 배열의 항목 각각에 대해 반복하기
fruits.forEach(function (item, index, array) { // 기존 for문과 다르게 스코프가 지역
	console.log(item, index);
});
// 사과 0
// 바나나 1



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



// 배열 안 항목의 인덱스 찾기
fruits.push("망고");
// ["딸기", "바나나", "망고"]
var pos = fruits.indexOf("바나나");
// 1



// 배열 복사하기
var shallowCopy = fruits.slice(); // 사본을 만드는 방법
// ["딸기", "망고"]



// 배경 length 값 설정/주입
// 현재 배열의 값이 3개 있을 때, length 값을 임의로 2개로 감소시키면 넘치는 요소(element)를 지웁니다.
// (배열의 length 속성을 그에 맞춰 업데이트)

// 배열 크기 설정
new Array(10/*크기*/);



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



// 펼침연산자
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