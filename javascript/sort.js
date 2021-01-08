
// 소수 구하기
// https://velog.io/@dosanahnchangho/%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%A8%B8%EC%8A%A4-%EC%86%8C%EC%88%98-%EA%B5%AC%ED%95%98%EA%B8%B0-JavaScript
// ** 연산 : 거듭제곱 (https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/Assignment_Operators#Exponentiation_assignment)

// ---------- ---------- ---------- ---------- ---------- 
// 데이터 교환
// index 1의 값을 index 2에 넣고, index2의 값을 index1에 넣는다.
function swap(arr, index1, index2) {
	var temp = arr[index1];
	arr[index1] = arr[index2];
	arr[index2] = temp;
}
// ---------- ---------- ---------- ---------- ---------- 

/*
-
버블정렬 (뒤에서 부터 완성해간다.)
가장 느린 정렬 알고리즘 가운데 하나지만 가장 구현하기 쉽다.
어떤 데이터 집합을 오른차순으로 정렬하면 큰 값은 배열의 오른쪽으로 이동해야 하고, 작은 값은 배열의 왼쪽으로 이동해야 한다.
따라서 배열의 데이터를 여러 번 반복적으로 탐색하면서 인접한 값을 서로 비교해 왼쪽 값이 오른쪽 값보다 크다면 두 값을 서로 바꿔야 한다.
*/
function bubbleSort(data) {
	var numElement = data.length;
	var temp;

	// 큰값을 뒤로 보낸다.
	// 배열의 끝에서 부터 정렬을 완성해 간다.
	for(var outer=numElement; outer>=2; --outer) { // 전체 배열 크기에서 작아지며 검사
		for(var inner=0; inner<=outer-1; ++inner) { // 첫번째 배열부터 비교해 간다.
			// 비교 index 순서: 0 <-> 1 비교, 1 <-> 2 비교, 2 <-> 3 비교, 3 <-> 4 비교 ...
			if(data[inner] > data[inner+1]) {
				swap(data, inner, inner+1);
			}
		}
	}
} 

[].sort(function(current, next) {
	if(current > next) {
		return -1;
	}else if(current < next) {
		return 1;
	}
	return 0;
});
	
// 정렬
let list = [1, 6, -3, 2, 45, 2].sort((current, next) => {
	if(current > next) {
		return 1;
	}else if(current < next) {
		return -1;
	}
	return 0;
});

// 뒤에서 하나빼고, 앞에서 하나 뺀다.
let arr = [];
while(list.length) {
	// pop
	if(list.length) {
		arr.push(list.pop());
	}
	// shift
	if(list.length) {
		arr.push(list.shift());
	}
}
console.log(arr);



/*
-
선택정렬 (앞에서 부터 완성해 간다.)
배열의 처음 요소부터 차례로 값을 비교한다.
모든 요소의 비교가 끝난 시점에는 가장 작은 요소가 배열의 첫 번째로 온다. 
다음에는 두 번째 자리에 올 요소를 정렬하는 식이다.
*/
function selectionSort(data) {
	var min; // 비교해 가며 최소값에 해당하는 index

	// 작은값을 앞으로 보낸다.
	// 배열의 앞부터 정렬해가며 완성한다.
	for(var outer=0; outer<=data.length-2; ++outer) {
		min = outer;
		console.log('min: ' + min);
		for(var inner=outer+1; inner<=data.length-1; ++inner) { // 첫번째 인덱스 다음부터 비교해간다.
			console.log('inner: ' + inner);
			if(data[inner] < data[min]) {
				min = inner;
			}
		}
		swap(data, outer, min);
	}
} 



/*
-
삽입정렬 (자신의 앞값을 비교해 완성해 간다)
자신의 위치에 요소를 넣어가며 정렬하는 방식
*/
function insertionSort(data) {
	var temp;
	var inner;

	// 배열의 두번째 인덱스 부터
	// 자신의 앞에 있는 값들과 비교하여, 자신이 들어가야 할 곳에 삽입된다.
	for(var outer=1; outer<=data.length-1; ++outer) {
		temp = data[outer]; // 값을 임시로 가지고 있다.
		inner = outer;

		console.log('outer: ' + outer);
		console.log('inner: ' + inner);

		// 현재 자신의 위치 앞에 자신보다 큰값이 없을 때 까지 검사
		while(inner > 0 && (data[inner-1] >= temp)) {
			// 자신의 앞에 있는 값이 자신보다 크면, 그 값을 현재 자신의 위치와 바꾼다.
			data[inner] = data[inner-1];
			--inner;
		}

		// 내가 들어가야 할 위치에 삽입된다.
		data[inner] = temp; 
	}
} 



/*
-
퀵 정렬 알고리즘 (기준값을 두고 작은값은 왼쪽, 큰값은 오른쪽에 위치한다) - 기준값을 피벗이라 한다
큰 데이터 집합을 가장 빨리 정렬할 수 있는 알고리즘
분할 정복 알고리즘으로 데이터 리스트를 작은 요소와 큰 요소로 구분하는 작은 하위목록으로 나눈다.
하위목록으로 나누는 작업을 모든 데이터가 정렬될 때가지 반복한다.

리스트의 한 요소를 피벗(기준값)으로 선정한 다음, 피벗보다 작은 요소는 하위 리스트로 피벗보다 큰 요소는 상위 리스트로 이동한다. 
-
사용예
var a = [];
for(var i=0; i<10; ++i) {
	a[i] = Math.floor((Math.ramdom() * 100) + 1);
}
console.log(a);
console.log(qSort(a));
*/
function qSort(arr) {
	if(arr.length == 0) {
		return [];
	}
	var left = [];
	var right = [];
	var pivot = arr[0]; // 왼쪽 배열 오른쪽 배열으로 분류할 비교값(기준)

	// 특정 기분값(pivot) 을 정하고, 그 값보다 작은 값은 왼쪽, 큰값을 오른쪽으로 보내며 정렬한다.
	// 특정 값을 0번째 index 로 잡고 1번째 인덱스와 비교해가며 검사한다.
	for(var i=1; i<arr.length; i++) {
		if(arr[i] < pivot) {
			// 피벗보다 작은 값은 왼쪽
			left.push(arr[i]);
		}else {
			// 피벗보다 큰 값은 오른쪽
			right.push(arr[i]);
		}
	}
	return qSort(left).concat(pivot, qSort(right)); // 재귀호출 / 배열합치기
} 


/*
피보나치 숫자 계산
1 1 2 3 5 8 13 21 34....

앞에 있는 숫자와 그 앞에 있는 숫자와 더한 것을 나열하는 것이다.
1+1 = 2
2+3 = 5
3+5 = 8
5+8 = 13
...
*/
// 문제: 피보나치 수열을 입력 받은 숫자 개수만큼 출력하라
function fibonacci(n) {
    if(n < 2) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
}

var input = 8;
for(var i=1; i<=input; i++) {
	fibonacci(i);
} 


// ---------- ---------- ---------- ---------- ---------- 

// 합병 정렬 (모두 조각낸 후 정렬해 간다.)
// 셀 정렬
// 머지 정렬
// 힙 정렬

