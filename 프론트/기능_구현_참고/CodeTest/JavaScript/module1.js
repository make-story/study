var module2 = require('./module2');
console.log(module2);
module.exports = 'module1';


// 자료구조

// sort
const fruits = ['Banana', 'Orange', 'Apple'];

// ascending(오름차순)
fruits.sort();
console.log(fruits); // [ 'Apple', 'Banana', 'Orange' ]

// descending(내림차순)
fruits.reverse();
console.log(fruits); // [ 'Orange', 'Banana', 'Apple' ]

const points = [40, 100, 1, 5, 2, 25, 10];
points.sort();
console.log(points); // [ 1, 10, 100, 2, 25, 40, 5 ]


// 숫자 배열 오름차순 정렬
// 비교 함수의 반환값이 0보다 작은 경우, a를 우선하여 정렬한다.
points.sort(function (a, b) { return a - b; });
// ES6 화살표 함수
// points.sort((a, b) => a - b);
console.log(points); // [ 1, 2, 5, 10, 25, 40, 100 ]

// 숫자 배열 내림차순 정렬
// 비교 함수의 반환값이 0보다 큰 경우, b를 우선하여 정렬한다.
points.sort(function (a, b) { return b - a; });



var items = [
    { name: 'Edward', value: 21 },
    { name: 'Sharpe', value: 37 },
    { name: 'And', value: 45 },
    { name: 'The', value: -12 },
    { name: 'Magnetic' },
    { name: 'Zeros', value: 37 }
];
 
items.sort(function(a, b) {
    var nameA = a.name;
    var nameB = b.name;
	// -1, 1 앞뒤 변경 / 0 유지
    if (nameA < nameB) {
        return -1;
    }
 
    if (nameA > nameB) {
        return 1;
    }
 
    return 0;
});
