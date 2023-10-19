/*
ECMA 6 정리

-
let, const 는 스코프 규칙이 같고(블록 스코프), 호이스팅이 불가능

-
파라미터 기본값 func(a=1, b='test')

-
펼침연산 ...arr 또는 ...['a', 'b']
나머지 파라미터 func(a, b, ...arr)

-
해체 할당 (배열, 객체)
let [a, b, c] = [1, 'test', 'ysm']
let name, age;
{name, age} = {'name': 'ysm', 'age': 34};

let x, y; // 변수 다르게 할당
{name: x, age: y} = {'name': 'ysm', 'age': 34};

-
화살표 함수
let func = (x, y) => {
	return x + y;
}

let func = (x, y) => x + y;

let obj = {
	func: () => {
		console.log(this); // this: window
	}
}

-
프라미스

-
클래스

-
모듈


*/



/*
- 
let 키워드로 블록 스코프 변수 생성
블록 스코프 변수를 선언하는 키워드
*/
// 변수 선언
let a = 12; // 전역 접근가능
function func() {
	let b = 13; // 함수 안에서 접근가능
	if(true) {
		let c = 14; // if문 안에서 접근가능
	}
}

// 변수 재선언
// let으로 선언한 변수를 다시 let으로 선언하면 TypeError 예외가 발생한다.
let a = 0;
let a = 1; // TypeError



/*
- 
const 키워드로 상수 생성
읽기 전용 변수. 즉, 값을 다시 할당할 수 없는 상수를 선언한다.
상수는 블록 스코프 변수라 let으로 선언한 변수와 스코프 규칙은 같다.
*/
const a = 12; // 전역 접근가능
function func() {
	const b = 13; // 함수 안에서 접근가능
	if(true) {
		const c = 14; // if문 안에서 접근가능
	}
}

// 상수를 통한 객체 참조
// 변수에 객체를 할당하면 객체 자신이 아닌, 참조값(reference)이 저장되므로 상수에 객체를 할당하면 이 객체의 참조값은 객체가 아닌, 상수에 대해 고정된다.
// 다시말해, 객체는 가변(mutable)상태다.
const a = {
	"name": "유성민"
};
a.name = "수지";
a = {}; // 읽기 전용 예외발생



/*
-
파라미터 기본값
파라미터 값이 undefined 이면 기본값을 할당
*/
function func1(x = 1, y = 2, z = 3) {
	console.log(x, y, z);
}
func(6, 7);
function func(x = 1, y = 2, z = 3 + 5) {
	console.log(x, y, z);	
}
func(6, 7);



/*
- 
펼침 연산자와 나머지 파라미터
이터러블 객체를 개별 값으로 나누는 펼침 연산자(spread operator)는 "..."로 표기한다.
* 이터러블(iterable)은 ES6 이터러블 규약(iterable protocol)에 따라 값을 여럿 가지며 개별 값을 순회 가능한 객체다. 배열이 대표적인 이터러블 객체다.
*/
function func(a, b) {
	return a + b;
}

let data = [1, 4];
let result = func(...data);
console.log(result); // 5

// 배열 값을 다른 배열의 일부로 만듦
let array1 = [2, 3, 4];
let array2 = [1, ...array1, 5, 6, 7];
console.log(array2); // [1, 2, 3, 4, 5, 6, 7]

// 배열 값을 다른 배열에 밀어 넣기 (배열 끝부분에 다른 배열을 통째로 밀어 넣을 때)
let array1 = [2, 3, 4];
let array2 = [1];
array2.push(...array1);
console.log(array2); // [1, 2, 3, 4]

// 여러 배열 펼침 (여러 배열을 한 줄의 표현식으로 펼치는 일)
let array1 = [1];
let array2 = [2];
let array3 = [...array1, ...array2, ...[3, 4]]; // 여러 배열로 펼친다.
let array4 = [5];
function func(a, b, c, d, e) {
	return a + b + c + d + e;
}
let result = func(...array3, ...array4);
console.log(result); // 15

// 나머지 파라미터
// 나머지 파라미터(rest parameter)는 함수의 마지막 파라미터 앞에 "..." 를 붙인 것으로, 이름 붙은 파라미터(named parameter)보다 함수 파라미터를 더 많이 포함한 배열이다.
function func(a, b, ...args) {
	console.log(args); // [3, 4, 5]
}
func(1, 2, 3, 4, 5);



/*
- 
이터러블(iterable)에서 해체 연산으로 데이터 및 객체추출
해체 할당(destructuring assignment)은 이터러블이나 객체의 값/프로퍼티를 각각 배열이나 객체 생성자 리터럴과 비슷한 구문으로 변수에 할당하는 표현식이다.
'배열 해체 할당'과 '객체 해체 할당' 두 가지 유형이 있다.
*/
// 배열 해체 할당문 (배열을 해체해 각 변수에 할당한다.)
// 해체 할당문 좌변에는 할당할 변수를 배열 리터럴 구문 같은 형식으로, 우변에는 추출할 데이터를 가진 배열(이터러블 객체)을 놓는다.
let arr = [1, 2, 3];
let a, b, c;
[a, b, c] = arr; // 배열 해체 할당 구문
// 또는
let [a, b, c] = [1, 2, 3];

// 값을 건너뛴다 (이터러블 값에서 할당 없이 건너뛰어야 할 때)
let [a, , b] = [1, 2, 3];

// 배열 해체 할당에 나머지 연산자를 사용
// 해체 할당 시 마지막 변수 앞에 "..."를 붙이면, 이터러블 값보다 변수가 모자랄 경우에만 
// 자동으로 배열 객체로 바뀌어 이터러블 객체의 나머지 값들이 할당된다.
let [a, ...b] = [1, 2, 3, 4, 5, 6];
console.log(Array.isArray(b)); // true
// 또는
let [a, , ...b] = [1, 2, 3, 4, 5, 6];

// 변수의 기본값 (해체 할당이 안된 별수의 기본값을 undefined 이외의 값으로 지정)
let [a, b, c = 3] = [1, 2];

// 중첨 배열 해체 (다차원 배열에서 값을 꺼내어 할당)
let [a, b, [c, d]] = [1, 2, [3, 4]];

// 파라미터로 배열 해체 할당 사용
// 해체 할당 표현식을 함수 파라미터 자리에 넣으면 함수에 넘긴 이터러블 객체 값을 추출할 수 있다.
function func([a, b, c = 3]) {
	console.log(a, b, c); // 1, 2, 3
}
func([1, 2]);
// 또는 (기본파라미터 방식)
function func([a, b, c = 3] = [1, 2, 3]) {
	console.log(a, b, c); // 1, 2, 3
}
func(undefined);


// 객체 해체 할당
// 객체 프로퍼티 값을 추출해서 변수에 할당한다.
// 객체 해체 할당문 좌변에 객체 리터럴 형식으로 할당할 변수를 열거하고 우변에 프로퍼티를 추출할 객체를 놓은 다음 전체 문을 ()로 감싼다.
let object = {"name": "성민", "age": 32};
let name, age;
({name, age} = object); // 배열 해체 할당 구문

// 객체 프로퍼티명과 변수명은 반드시 같아야 한다. 
// 변수명을 달리 하고 싶을 때
let object = {"name": "성민", "age": 32};
let x, y;
({name: x, age: y} = object);
// 또는
let {name: x, age: y} = {"name": "성민", "age": 32}; // 같은 줄에서 변수를 생성하니 문 전체를 ()로 감싸지 않아도 된다.

// 변수의 기본값 (객체 프로퍼티가 undefined일 경우에는 변수에 기본값을 준다.)
let {a, b, c = 3} = {a: "1", b: "2"};
console.log(c); // 3

// 조합 프로퍼티명을 해체
// 프로퍼티명을 동적으로 조합할 경우 표현식을 []로 감싼다.
let {["first" + "Name"]: x} = {"firstName": "성민"};
console.log(x); // 성민

// 중첩 객체를 해체
// 객체 속 객체의 프로퍼티는 다음과 같이 추출한다.
let {name, otherInfo: {age}} = {"name": "성민", "otherInfo": {"age": 32}};
console.log(name, age); // 성민 32

// 파라미터로 객체 해체 할당 사용
function func({name = "성민", age = 32, job = "프로그래머"} = {}) {
	console.log(name, age, job); // 성민 32 프로그래머
}
func({"name": "성민", "age": 32});



/*
- 
화살표 함수(arrow function)

화살표 함수와 일반 함수의 차이점
화살표 함수는 객체 생성자로 사용할 수 없다. 즉, new 연산자를 못쓴다.
화살표 함수는 Function 생성자의 인스턴스로, 구문, this값, new연산자를 제외하면 차이점이 없다.
*/
let func = (x, y) => {
	return x + y;
}
let result = func(1, 2);

// 문이 하나밖에 없는 화살표 함수는 {} 기호를 생략할 수 있다.
// {} 가 없기 때문에 내부의 문 값을 자동으로 반환한다.
let func = (x, y) => x + y;
let result = func(x, y);

// 화살표 함수에서의 this 값
// 화살표 함수에서 this 값은 해당 스코프(화살표 함수를 정의한 지점을 둘러싼 전역/함수스코프)의 this 값과 같다.
// 함수에서 this가 콘텍스트 객체(context object, 해당 함수를 내부 프로퍼티로 소유한 객체)를 가리키는 것과는 대조적이다.
let object = {
	f1: () => {
		console.log(this); // window (해당 함수의 object 가 아닌 window)
	}
};



/*
- 
객체 프로퍼티를 새로운 구문으로 생성
ES6는 객체 리터럴로 프로퍼티를 생성하는 새로운 구문을 제공한다. (메소드 축약 표현)
*/
// 프로퍼티 정의
let x = 1, y = 2;
let object = {x, y}; // 기존방식 object = {x: x, y: y};
console.log(object.x); // 1

// 메소드 정의
// 객체 메소드를 정의하는 새로운 구문
let object = {
	func() {
		console.log('성민');
	}
};
object.func();

// 조합 프로퍼티명
let object = {
	["first" + "Name"]: "성민"
};
console.log(object["first" + "Name"]); // 성민



/*
-
참고: __proto__ 에 의한 상속
*/
// ES5
var parent = {
	name: 'parent',
	sayHi: function() {
		console.log('Hi! ' + this.name);
	}
};
// 프로토타입 패턴 상속
var child = Object.create(parent);
child.name = 'child';
parent.sayHi(); // Hi! parent
child.sayHi();  // Hi! child

// ES6
const parent = {
	name: 'parent',
	sayHi() {
		console.log('Hi! ' + this.name);
	}
};
const child = {
	// child 객체의 프로토타입 객체에 parent 객체를 바인딩하여 상속을 구현한다.
	__proto__: parent,
	name: 'child'
};
parent.sayHi(); // Hi! parent
child.sayHi();  // Hi! child




/*
- 
숫자 상수를 2진법, 8진법으로 나타내기
*/

// 2진수
// ES6부터는 숫자 상수 앞에 0b를 붙이면 자바스크립트 엔진이 2진수로 처리
let a = 0b00001111; // 10진수 15의 2진수
let b = 15;
console.log(a === b); // true

// 8진수
// ES5 이전에는 숫자 상수를 앞에 0을 붙여 8진수로 표기
// ES6 부터는 0o로 변경
let a = 0o17; // 10진수 15의 8진수
let b = 15;
console.log(a === b); // true



/*
- 
Number 객체의 새 프로퍼티/메소드
*/

// Number.isInteger
// 자바스크립트는 모든 숫자를 64비트 부동 소수점 형태로 저장
// 정수는 소수점이 없는, 즉 소수점이 0인 부동 소수점 숫자다
// ES6부터 Number.isInteger() 라는 새 메소드가 인자의 정수 여부를 true/false로 반환
let a = 17.0;
let b = 1.2;
console.log(Number.isInteger(a)); // true
console.log(Number.isInteger(b)); // false


// Number.isNaN
// 전역 isNaN() 함수는 숫자 여부를 판별한다. 숫자 아닌 값은 true, 그 외엔 false를 반환
// ES6부터 Number.isNaN() 메소드가 NaN값 여부를 체크한다.
// NaN는 자기 자신과도 동등하지 않은 유일무이한 값으로, NaN == NaN, NaN === NaN은 모두 false 다.
let a = "NaN";
let b = NaN;
console.log(Number.isNaN(a)); // false
console.log(Number.isNaN(b)); // true

console.log(isNaN(a)); // true
console.log(isNaN(b)); // true


// Number.isFinite
// 유한 숫자(finite number) 여부를 판단
// 전역 isFinite() 함수는 유한 숫자 여부를 체크하지만 딱하게도 Number 타입으로 변환된 값들까지 true를 반환한다.
let a = null;
let b = [];
console.log(Number.isFinite(a)); // false
console.log(Number.isFinite(b)); // false

console.log(isFinite(a)); // true
console.log(isFinite(b)); // true


// Number.isSafeInteger
// 자바스크립트 숫자는 IEEE 754 국제 표준에 따라 64비트 부동 소수점 숫자로 저장된다.
// 자바스크립트에서 안전 정수(safe integer)란 IEEE 754 규격에 맞게 다른 정수로 반올림하지 않아도 되는 숫자
console.log(Number.isSafeInteger(156)); // true
console.log(Number.isSafeInteger('156')); // false
console.log(Number.isSafeInteger(Number.MAX_SAFE_INTEGER)); // true
console.log(Number.isSafeInteger(Number.MIN_SAFE_INTEGER)); // true


// Number.EPSILON
// 자바스크립트는 컴퓨터가 정확히 나타낼 수 없는 0.1, 0.2, 0.3 같은 숫자를 이진 부동 소수점 방식으로 표현한다.
// 0.1 같은 숫자는 가장 근사한 숫자로 반올림되는 탓에 결과값은 미세한 반올림 오차만큼 차이가 날 수밖에 없다.
console.log(0.1 + 0.2 === 0.3); // false
console.log(0.1 + 0.2); // 0.30000000000000004

// ES6의 Number.EPSILON 프로퍼티는 부동 소수점 숫자와 비교시 이치에 맞는 에러 한계치(margin of error)를 나타낸다. 이 숫자 이내의 미세한 반올림 오차는 무시하고 부동 소수점 숫자를 비교하는 함수를 만들어 사용
function epsilonEqual(a, b) {
	return Math.abs(a - b) < Number.EPSILON;
}
console.log(epsilonEqual(0.1 + 0.2, 0.3)); // true



/*
- 
Math 객체의 새 프로퍼티/메소드
*/

// 삼각연산
console.log(Math.sinh(0)); // 하이퍼볼릭 사인 값
console.log(Math.cosh(0)); // 하이퍼볼릭 코사인 값
console.log(Math.tanh(0)); // 하이퍼볼릭 탄젠트 값

console.log(Math.asinh(0)); // 역 하이퍼볼릭 사인 값
console.log(Math.acosh(1)); // 역 하이퍼볼릭 코사인 값
console.log(Math.atanh(0)); // 역 하이퍼볼릭 탄젠트 값

console.log(Math.hypot(2, 2, 1)); // 피타고라스 정리


// 산술연산
console.log(Math.log2(16)); // 2를 밑으로 한 로그
console.log(Math.log10(1000)); // 10을 밑으로 한 로그
console.log(Math.log1p(0)); // log(1 + value)와 동일
console.log(Math.expm1(0)); // Math.log1p(0)의 역
console.log(Math.cbrt(8)); // 세제곱근 값


// Math.imul
// 32비트 정수 2개를 받아 곱한 결과값의 하위 32비트를 반환한다.
// 자바스크립트에서 32비트 정수 곱셈을 할 수 있는 유일한 방법
console.log(Math.imul(590, 5000000)); // 32비트 정수 곱셈
console.log(590 * 5000000); // 64비트 부동 소수점 곱셈


// Math.clz32
// 32비트 숫자의 전치 제로 비트(leading zero bit)를 반환
console.log(Math.clz32(7)); // 29


// Math.sign
// 주어진 숫자가 음수, 양수, 0인지 반환
console.log(Math.sign(11)); // 1
console.log(Math.sign(-1)); // -1
console.log(Math.sign(0)); // 0


// Math.trunc
// 가수부를 덜어낸 정수부 숫자만 반환
console.log(Math.trunc(11.17)); // 11
console.log(Math.trunc(-1.112)); // -1


// Math.fround
// 32비트 부동 소수점 값으로 반올림하는 함수
console.log(Math.fround(1)); // 1
console.log(Math.fround(1.137)); // 1.1369999647140503
console.log(Math.fround(1.5)); // 1.5



/*
-
문자열

자바스크립트의 내부 캐릭터(character)인코딩과 이스케이프 무리(sequence)
유니코드(Unicode) 캐릭터 세트의 모든 캐릭터는 코드 포인트(code point)라는 10진수 숫자로 나타낸다.
코드 유닛(code unit)은 코드 포인트를 저장할 메모리상의 고정 비트 수를 말하며, 인코딩 스키마(encoding schema)에 따라 그 길이가 결정된다.
이를 테면 UTF-8의 코드 유닛은 8비트, UTF-16라면 16비트다. 코드 유잇과 맞지 않는 코드 포인트는 여러 코드 유닛으로 쪼개진다.
즉, 일련의 여러 캐릭터로 다른 캐릭터를 구성하는 것이다.

자바스크립트 소스코드는 기본적으로 UTF-16 코드 유닛으로 표현한다.
소스코드의 인코딩 스키마가 UTF-8이면 자바스크립트 엔진이 UTF-8 코드 유닛으로 해석하도록 지시한다.
자바스크립트 문자열은 언제나 UTF-16 코드 포인트로 이루어 진다.
*/
let \u0061 = "\u0061\u0062\u0063";
console.log(a); // abc


// 비트가 초과된 코드 포인트를 이스케이프 (서로게이트 페어)
/*
ES5 이전엔 저장 공간이 16비트 이상인 캐릭터를 이스케이프하려면 유니코드 2개가 필요했다.
예를 들어, \u1F691을 문자열에 추가하려면 다음과 같이 이스케이프했었다.
*/
console.log("\uD83D\uDE91");
/*
\U83D와 \uDE91 처럼 다른 하나의 캐릭터를 표현하기 위해 나란히 붙인 2개의 유니코드를 서로게이트 페어(surrogate pair)라 한다.
ES6 부터는 서로게이트 페어 없이도 쓸 수 있다.
*/
console.log("\u{1F691}");
/*
\u1F691를 \uD83D\uDE91 로 저장하므로 문자열 길이는 2다.
*/


// codePointAt(index)
// 주어진 인덱스의 캐릭터에 해당하는 코드 포인트를 음이 아닌 정수로 표현
console.log("\uD83D\uDE91".codePointAt(1)); // 56977
console.log("\u{1F691}".codePointAt(1)); // 56977
console.log("hello".codePointAt(2)); // 108


// String.fromCodePoint(number1, ..., number2)
// 코드 포인트 뭉치를 입력받아 해당 문자열을 반환
console.log(String.fromCodePoint(0x61, 0x62, 0x63)); // abc
console.log("\u0061\u0062" == String.fromCodePoint(0x61, 0x62)); // true


// repeat(count)
// 문자열을 원하는 개수만큼 복사하여 연결된 문자열을 반환
console.log("ㅋ".repeat(6)); // ㅋㅋㅋㅋㅋㅋ


// includes(string, index)
// 주어진 문자열이 있는지 찾아보고 그 결과를 true/false로 반환
// 특정 위치 다음부터 찾고 싶으면 두번째 선택 파라미터에 인덱스 값을 준다.
let str = "나는 자바스크립트 개발자!";
console.log(str.includes("자바스크립트")); // true
console.log(str.includes("자바스크립트", 13)); // false


// startsWith(string, index)
// 주어진 문자열로 시작하는지 여부를 true/false로 반환
// 두번째 파라미터에 인덱스를 넣으면 이 위치부터 조사
let str = "나는 자바스크립트 개발자!";
console.log(str.startsWith("나는")); // true
console.log(str.startsWith("나는", 7)); // false


// endsWith(string, index)
// 주어진 문자열로 끝나는지 확인
// 두번째 파라미터에 찾아볼 시작 위치를 지정할 수 있다.
let str = "나는 자바스크립트 개발자!";
console.log(str.endsWith("개발자!")); // true
console.log(str.endsWith("자바스크립트", 9)); // true



/*
-
템플릿 문자열

템플릿 문자열은 문자열을 생성하는 새로운 리터럴이다.
표현식/문자열 삽입, 여러 줄 문자열, 문자열 형식화, 문자열 태깅 등 다양한 기능을 제공
런타임 시점에 일반 자바스크립트 문자열로 처리/변환되므로 안심하고 그냥 문자열처럼 사용할 수 있다.

ES6 템플릿 문자열은 자체로 표현식을 가질 수 있기 때문에 문자열에 표현식을 쉽게 끼워 넣을 수 있다.
달러기호($)와 중괄호로 표시한 자리끼움(placeholder)위치에 표현식을 ${표현식}형태로 넣는다. 그러면 이 표현식의 귀결값(resolved value)으로 둘러싸인 텍스트는 함수로 전달되어 템플릿 문자열은 일반 문자열로 치환된다.
함수의 기본 기능은 조각들을 이어 붙여 하나의 문자열을 만드는 것이다.

문자열 처리를 전담할 함수를 따로 정의하는 경우, 템플릿 문자열을 태그드 템플릿 문자열(tagged template string)이라고 하고,
문자열 처리 함수를 태그 함수(tag function)라고 부른다.
*/
let str1 = `안녕하세요!!!`; // 템플릿 문자열
let str2 = "안녕하세요!!!";
console.log(str1 === str2); // true

let a = 20;
let b = 10;
let c = "자바스크립트";
let str = `나는 ${a+b}살이고 ${c}를 좋아해`; 
console.log(str); // 나는 30살이고 자바스크립트를 좋아해

// 태그 함수로 문자열 처리
let tag = function(strings, ...values) {
	// 첫번째 파라미터는 템플릿 문자열의 문자열 배열 리터럴
	// 두번째 파라미터는 표현식의 귀결값 배열 (인자가 여러개라서 두번째 파라미터 자리에 나머지 파라미터 사용)
	let result = "";
	for(let i=0; i<strings.length; i++) {
		result += strings[i];
		if(i < values.length) {
			result += values[i];
		}
	}
	return result;
};
let a = 20;
let b = 10;
let c = "자바스크립트";
let str = tag `나는 ${a+b}살이고 ${c}를 좋아해`;
console.log(str); // 나는 30살이고 자바스크립트를 좋아해



/*
- 
여러 줄(multiline) 문자열 생성
*/
// ES6부터는 알기 쉽게 여러 줄 문자열(multiline string) 사용 (기존에는 \n 으로 줄바꿈 처리)
console.log('1\n2\n3'); // 기존방식
console.log(`1
2
3`);


// 원래 문자열
// 이스케이프 문자를 해석하지 않은 일반 문자열
// 원래 문자열도 템플릿 문자열로 만들 수 있다. String.raw 태그 함수를 이용하면 템플릿 문자열의 원래 모습이 나온다.
let str = String.raw `xy\n${1+1}z`;
console.log(str); // xt\n2z
// 태그함수를 만들어 원래 문자열을 반환하려면 첫번째 인자의 raw 프로퍼티를 사용한다. 
// 이 프로퍼티는 첫번째 인자에 해당하는 문자열의 원래 모습을 담고 있는 배열이다.
let tag = (strings, ...values) => {
	return strings.raw[0];
};
let str = tag `안녕 \n 하세요!!!`;
console.log(str); // 안녕 \n 하세요!!!



/*
- 
Array 개개체의 새 프로퍼티/메소드
*/
// Array.from(iterable, mapFunc, this)
// 이터러블 객체에서 새 배열 인스턴스를 생성
let str = "0123";
let obj = {number: 1};
let arr = Array.from(str, function(value) {
	return parseInt(value) + this.number;
}, obj);
console.log(arr); // 1, 2, 3, 4


// Array.of(values...)
// 배열을 생성하는 Array 생성자의 대체 수단
// 기존방식 Array 생성자가 만드는 배열은 하나의 숫자 인자 값이 length 프로퍼티 값인 빈 배열이다.
// Array.of() 는 인자 값을 유일한 원소로 하는 배열을 생성
let arr1 = new Array(2);
let arr2 = new Array.of(2);
console.log(arr1[0], arr1.length); // undefined 2
console.log(arr2[0], arr2.length); // 2 1


// fill(value, startIndex, endIndex)
// startIndex 부터 endIndex까지(endIndex 는 포함되지 않음) 주어진 값으로 배열 원소를 채운다.
// startIndex, endIndex 는 선택 인자로 비워두면 배열 전체를 가득 채운다.
// startIndex 만 넣으면 endIndex의 기본값은 배열 길이 -1 이다.
// startIndex 가 음수이면 배열 길이 + startIndex로, endIndex 가 음수면 배열 길이 + endIndex로 간주한다.
let arr1 = [1, 2, 3, 4];
let arr2 = [...arr1];
let arr3 = [...arr1];
let arr4 = [...arr1];
let arr5 = [...arr1];

arr1.fill(5); // 5, 5, 5, 5
arr2.fill(5, 1, 2); // 1, 5, 3, 4
arr3.fill(5, 1, 3); // 1, 5, 5, 4
arr4.fill(5, -3, 2); // 1, 5, 3, 4
arr5.fill(5, 0, -2); // 5, 5, 3, 4


// find(testingFunc, this)
// 테스트 함수를 만족하는 배열 원소를 반환하며 만족하지 않을 땐 undefined를 반환
let x = 12;
let arr = [11, 12, 13];
let result = arr.find(function(value, index, array) {
	if(value === this) {
		return true;
	}
}, x);
console.log(result); // 12


// findIndex(restingFunc, this)
// 조건에 맞는 원소 대신 그 인덱스를 반환
let x = 32;
let arr = [11, 12, 13];
let result = arr.findIndex(function(value, index, array) {
	if(value === this) {
		return true;
	}
}, x);
console.log(result); // 1


// copyWithin(targetIndex, startIndex, endIndex)
// 배열값 무리를 다른 위치에 복사해 넣는다.
// 첫 번째 인자는 원소를 복사할 타깃 인덱스, 두 번째 인자는 복사를 시작할 인덱스, 세 번째 선택 인자는 원소 복사가 끝나는 인덱스
let arr1 = [1, 2, 3, 4, 5];
let arr2 = [...arr1];
let arr3 = [...arr1];
let arr4 = [...arr1];

arr1.copyWithin(1, 2, 4);
arr2.copyWithin(0, 1);
arr3.copyWithin(1, -2);
arr4.copyWithin(1, -2, -1);

console.log(arr1); // 1, 3, 4, 4, 5   1번째 인덱스(타겟인덱스)와 2번째 인덱스가 변경되었다.
console.log(arr2); // 2, 3, 4, 5, 5
console.log(arr3); // 1, 4, 5, 4, 5
console.log(arr4); // 1, 4, 3, 4, 5


// entries(), keys(), values()
// entries() 는 배열 각 인덱스의 키/값 쌍을 가진 이터러블 객체를 반환
// keys() 는 각 인덱스 키를 담은 이터러블 객체
// values() 는 값을 포함한 이터러블 객체
let arr = ['a', 'b', 'c'];
let entries = arr.entries();
let keys = arr.keys();
let values = arr.values();

console.log(...entries); // 0,a 1,b 2,c
console.log(...keys); // 0 1 2
console.log(...values); // a b c



/*
-
콜렉션

콜렉션은 원소 여러 개를 모아놓은 객체로, ES6에서 데이터를 저장/조직하는 더욱 개선된 다수의 콜렉션 객체가 새로 추가
예전에는 배열이 유일한 콜렉션 객체였지만, 배열 버퍼, 타입화 배열, 세트, 맵 등 다양
*/



/*
-
배열버퍼

배열은 문자열, 숫자, 객체 등 어떤 타입의 원소라도 담을 수 있고 동적으로 계속 커질 수 있는 반면, 실행 시간이 느려지고 메모리 점유율이 높아진다는 점이 문제다.
계산량이 많고 대량 데이터가 오가는 애플리케이션이라면 큰 이슈가 될 수 있다.
이런 이유때문에 배열 버퍼(array buffer)가 등장하게 되었다.

배열 버퍼는 메모리 상의 8비트 블록 콜렉션이고 블록 하나가 배열 버퍼의 원소다.
배열 버퍼의 크기는 생성 시 결정되므로 동적으로 커지지 않으며, 숫자만 저장 할 수 있고 처음에 모든 블록이 0으로 초기화된다.

배열 버퍼 객체는 ArrayBuffer 생성자로 만든다.
배열 버퍼 객체와 데이터 읽기/쓰기는 DataView 객체의 몫이다. 숫자를 꼭 8비트로만 나타내야 하는 건 아니고 8, 16, 32, 64비트로도 가능하다.

배열 버퍼 객체에 데이터를 쓰는 DataView 객체의 메소드는 3개의 인자를 받는다.
첫 번째 인자는 오프셋(offset), 즉 숫자를 써넣을 바이트, 두 번째 인자는 저장할 숫자, 세 번째 인자는 엔디안(endian)을 불린 타입으로 명시한다.

setInt8: 8비트로 숫자를 저장한다. 부호 있는 정수를 받는다.
setUint8: 8비트로 숫자를 저정한다. 부호 없는 정수를 받는다.
setInt16: 16비트로 숫자를 저장한다. 부호 있는 정수를 받는다.
setUint16: 16비트로 숫자를 저정한다. 부호 없는 정수를 받는다.
setInt32: 32비트로 숫자를 저장한다. 부호 있는 정수를 받는다.
setUint32: 32비트로 숫자를 저정한다. 부호 없는 정수를 받는다.
setFloat32: 32비트로 숫자를 저장한다. 부호 있는 소수를 받는다.
setFloat64: 64비트로 숫자를 저장한다. 부호 있는 소수를 받는다.

getInt8: 8비트를 읽는다. 부호 있는 정수를 반환한다.
getUint8: 8비트를 읽는다. 부호 없는 정수를 반환한다.
getInt16: 16비트를 읽는다. 부호 있는 정수를 반환한다.
getUint16: 16비트를 읽는다. 부호 없는 정수를 반환한다.
getInt32: 32비트를 읽는다. 부호 있는 정수를 반환한다.
getUint32: 32비트를 읽는다. 부호 없는 정수를 반환한다.
getFloat32: 32비트를 읽는다. 부호 있는 소수를 반환한다.
getFloat64: 64비트를 읽는다. 부호 있는 소수를 반환한다.
*/
let buffer = new ArrayBuffer(80);
let view = new DataView(buffer);

view.setInt32(3, 22, false);

let number = view.getInt32(8, false);
console.log(number); // 22



/*
-
타입화 배열

마치 일반 배열을 다루는 것처럼 배열 버퍼 객체에 읽기/쓰기할 수 있게 해준다.

Int8Array: 8비트 부호 있는 정수로 다룬다.
Uing8Array: 8비트 부호 없는 정수로 다룬다.
Int16Array: 16비트 부호 있는 정수로 다룬다.
Uing16Array: 16비트 부호 없는 정수로 다룬다.
Int32Array: 32비트 부호 있는 정수로 다룬다.
Uing32Array: 32비트 부호 없는 정수로 다룬다.
Float32Array: 32비트 부호 있는 소수로 다룬다.
Float64Array: 64비트 부호 이쓴 소수로 다룬다.
*/
let buffer = new ArrayBuffer(80);
let typed_array = new Float64Array(buffer);
typed_array[4] = 11;

console.log(typed_array.length); // 10
console.log(typed_array[4]); // 11



/*
-
세트

세트는 타입에 상관없이 '유일한' 값을 담은 콜렉션으로 원소들은 삽입한 순서대로 정렬된다.
중복값은 자동 삭제된다.

세트도 이터러블 규약을 따르므로 이터러블 객체로 사용할 수 있다.
세트는 어떤 값을 조회하는 용도보다는 존재 여부를 확인하기 위해 값을 묶어둘때 사용한다.
어떤 값이 있는지 알아보려고 indexOf() 를 사용하는 경우라면 배열보다는 세트가 더 적합하다.
*/
let set1 = new Set();
let set2 = new Set("안녕하세요!!!"); // 중복값(!문자)은 자동 삭제된다.

set2.add(12); // 12를 추가

console.log(set2.has("!")); // 값이 존재하는지 확인 - 결과값 true
console.log(set2.size); 

set2.delete(12); // 12를 삭제

console.log(...set2); // 안 녕 하 세 요 !

set2.clear(); // 모든 값을 삭제

// 위크세트
/*
차이점
- 세트는 원시 타입(primitive type)과 객체 참조값 모두 담을 수 있지만, 위크세트(WeakSet)는 객체 참조값만 저장할 수 있다.
- 가장 주목할 만한 위키세트 객체의 특성은 내부에 저장된 객체를 참조하는 값이 없을 땐 가비지 컬렉션 대상이 된다는 점이다.
- 위크세트 객체는 열거할 수 없어서 크기를 알 수 없고 이터러블 규칙을 따르지 않는다.
*/
let weakset = new WeakSet();
(function() {
	let a = {};
	weakset.add(a);
})();

// a 는 위크세트에서 가비지 컬렉션 대상이다.
console.log(weakset.size); // undefined
console.log(...weakset); // 예외발생
weakset.clear(); // 예외발생



/*
-
맵

맵(Map)은 키/값 쌍을 모다놓은 콜렉션으로 키/값의 타입은 제약이 없다.
삽입한 순서대로 정렬
이미 존재하는 키를 추가하면 덮어쓴다. 
맵 객체 역시 이터러블 규약을 따르므로 이터러블 객체로 쓸 수 있고 맵을 순회하면 키/값 쌍을 가진 배열을 반환한다.
*/
let map = new Map();
let o = {n: 1};

map.set(o, "A"); // 추가
map.set("2", 9);

console.log(map.has("2")); // 존재하는 키인지 확인 - 결과값 true
console.log(map.get(o)); // 키의 해당 값 조회 - 결과값 A
console.log(...map); // [object Object], A, 2, 9

map.delete("2"); // 키/값 삭제
map.clear(); // 전체 삭제

// 이터러블 객체로 부터 맵생성
let map_1 = new Map([[1, 2], [4, 5]]);
console.log(map_1.size); // 키 개수 - 결과값 2


// 위크맵
/*
차이점
- 맵의 키는 원시 타입, 객체 참조값 모두 가능하지만 위크맵 키는 오직 객체 참조값만 가능하다.
- 내부에 저장된 객체를 참조하는 값이 없을 경우 가비지 콜렉션 대싱이 된다.
- 위크맵 객체는 열거할 수 없으므로 크기를 알 수 없고, 이터러블 규약을 따르지 않는다.
*/
let weakmap = new WeakMap();
(function() {
	let o = {n: 1};
	weakmap.set(o, "A");
})();

// 키 o 는 가바지 콜렉션 대상이다.
let s = {m: 1};

weakmap.set(s, "B");

console.log(weakmap.get(s));
console.log(...weakmap); // 예외발생

weakmap.delete(s);
weakmap.clear(); // 예외발생

let weakmap_1 = new WeakMap([[{}, 2], [{}, 5]]);
console.log(weakmap_1.size); // undefined



/*
-
Object 객체의 새 프로퍼티/메소드

__proto__ 프로퍼티는 ES6 표준으로 제정되었고 전역 Object 객체에 새로운 프로퍼티가 추가됐다.

__proto__ 프로퍼티
자바스크립트 객체는 프로토타입(prototype), 즉 자신이 상속한 객체를 참조하기 위해 내부에 [[prototype]] 프로퍼티를 둔다.
[[prorotype]] 는 직접 읽거나 수정할 수 없는 이유로 이 값을 읽으로면 Object.getPrototypeOf() 를 이용하고 
동일한 [[prototype]] 으로 새 객체를 생성하려면 Object.create() 를 이용해야만 했다.

[[prototype]]는 다루기 까다로운 프로퍼티라서 일부 브로우저는 __proto__라는 특별한 프로퍼티를 객체에 두어 밖에서도 접근할 수 있게 했고
덕분에 한결 프로토티입을 다루기가 수월해졌다.
*/

// ES5
var x = {x: 12};
var y = Object.create(x, {y: {value: 13}});

console.log(y.x); // 12
console.log(y.y); // 13

// ES6
let a = {a: 12, __proto__: {b: 13}};
console.log(a.a); // 12
console.log(a.b); // 13 - 프로토타입 체이닝


// Object.is(value1, value2)
// 두 값의 동등 여부를 판단한다. === 연산자와 비슷하지만 그렇지 않은 경우도 있다.
console.log(Object.is(0, -0)); // false
console.log(0 === -0); // true

console.log(Object.is(NaN, 0/0)); // true
console.log(NaN === 0/0); // false

console.log(Object.is(NaN, NaN)); // true
console.log(NaN === NaN); // false


// Object.setPrototypeOf(object, prototype)
// 객체 [[prototype]] 프로퍼티 값을 할당하는 메소드다.
let x = {x: 12};
let y = {y: 13};

Object.setPrototypeOf(y, x);

console.log(y.x); // 12 - 프로토타입 체이닝
console.log(y.y); // 13


// Object.assign(targetObject, sourceObject...)
// 하나 또는 그 이상의 소스 객체에서 모든 열거 가능한 자기 프로퍼티들을 타긱 객체로 복사하고 이 타긱 객체를 반환한다.
/*
유의사항
- 소스의 게터(geter), 타깃의 세터(seter)를 호출한다.
- 소스 프로퍼티 값을 타깃 객체의 새로운 또는 이미 존재하는 프로퍼티에 할당하는 기능이 전부다.
- 소스의 [[prototype]] 프로퍼티는 복사하지 않는다.
- 자바스크립트에서 프로퍼티명은 문자열 아니면 심볼인데 Object.assign() 은 둘 다 복사한다.
- 소스의 프로퍼티 정의부는 복사되지 않으므로 필요 시 Object.getOwnPrototypeDescriptor(), Object.defineProperty() 를 대신 사용한다.
- null 또는 undefined 값인 키는 복사하지 않고 건너뛴다.
*/
let x = {x: 12};
let y = {y: 13, __proto__: x};
let z = {z: 14, get b() {return 2;}, q: {}};

Object.defineProperty(z, "z", {enumerable: false});

let m = {};

Object.assign(m, y, z);

console.log(m.y); // 13
console.log(m.z); // undefined
console.log(m.b); // 2
console.log(m.x); // undefined
console.log(m.q == z.q); // true






// ----------






/*
-
이터레이터
ES6 에는 새로운 이터레이션 객체 인터페이스, 루프가 도입됐고 덕분에 자바스크립트 알고리즘도 새로운 능력을 발휘할 기반이 마련되었다.
*/



/*
-
ES6 심볼

심볼은 ES6에서 처음 선보인, 완전히 새로운 원시 타입으로, 심볼값으로 유일하며 변경할 수 없다.

심볼은 리터럴 형식이 없고 Symbol() 함수로 생성한다.
심볼에 관한 서술(description) Symbol() 에 선택 인자로 줄 수 있다. 
심볼 자체에 접근하려는 의도는 아니고 단지 디버깅 용이다.
*/
let s = Symbol();

let s1 = window.Symbol("내 심볼");
let s2 = window.Symbol("내 심볼");
console.log(s1 === s2); // false


// typeof 연산자
// 심볼에 typeof 연산을 하면 결과는 'symbol' 이다
let s = Symbol();
console.log(typeof s); // symbol


// new 연산자
// Symbol() 에 new 연산자는 못 쓴다. (빌트인)
// ES6 부터는 규정 상 모든 원시 타입 생성자를 임의로 호출할 수 없다.
let s = new Symbol(); // "TypeError" 예외 발생


// 심볼을 프로퍼티 키로 사용
// 자바스크립트에서 객체의 프로퍼티 키는 보통 문자열 타입이었지만, ES6 부터는 문자열과 심볼 둘 다 가능하다.
// ES6 심볼이 등장한 가장 중요한 이유가 바로 객체 프로퍼티 키로 사용해서 예기치 않게 프로퍼티 키와 충돌하는 일을 방지하는 것이다.
var obj = null;
var s1 = null;
(function() {
	let s2 = Symbol();
	s1 = s2;
	obj = {[s2]: "내 심볼"};
	console.log(obj[s2]); // 내 심볼
	console.log(obj[s2] == obj[s1]); // true
})();
console.log(obj[s1]); // 내 심볼


// Object.getOwnPropertySymbols()
// Object.getOwnPropertyNames() 로는 심볼 프로퍼티를 조회할 수 없기 때문에 객체의 심볼 프로퍼티를 배열로 가져오는 Object.getOwnPropertySymbols() 사용
// for...in 루프, Object.getOwnPropertyNames() 로는 하위 호환성 보장 때문에 객체에서 심볼 프로퍼티를 찾을 수 없지만, in 연산자로는 가능하다.
let obj = {a: 12};
let s1 = Sumbol("내 심볼");
let s2 = Symbol("내 심볼");

Object.defineProperty(obj, s1, {
	enumerable: false
});

obj[s2] = "";
console.log(Object.getOwnPropertySymbols(obj)); // Symbol(내 심볼), Symbol(내 심볼)


// Symbol.for(string)
// Symbol 객체는 키/값 쌍의 레지스트리(registry)를 갖고 있다(키는 심볼 서술, 값은 심볼이다.)
// Symbol.for() 로 심볼을 찍어낼 때마다 레지스트리에 추가되고 이 메소드는 심볼을 반환한다.
// 이미 존재하는 서술로 심볼을 생성하면 기존 심볼을 그대로 반환한다.
// Symbol.for() 는 항상 전역 범위의 심볼을 생성하므로 Symbol() 보다 낫다.
let obj = {};

(function() {
	let s1 = Symbol("name");
	obj[s1] = "수지";
})();

// 여기서 obj[s1]은 접근 불가

(function() {
	let s2 = Symbol.for("age");
	obj[s2] = 27;
})();

console.log(obj[Symbol.for("age")]); // 27


// 상용 심볼
// ES6 에는 상용 심볼(well-known symbo) 이라는 내장 심볼 세트가 준비되어 있어서 꼭 직접 만들어 쓰지 않아도 된다.
// 상용 심볼은 보통 앞에 @@를 붙여 표기한다(예: Symbol.iterator -> @@iterator). 이렇게 하면 상용 심볼을 구별하기가 훨씬 수월하다.
Symbol.iterator
Symbol.match
Symbol.search
Symbol.replace
Symbol.split
Symbol.hasInstance
Symbol.species
Symbol.unscopables
Symbol.isContcatSpreadable
Symbol.toPrimitive
Symbol.toStringTag



/*
- 
객체에 이터레이션 규약(인터페이스)을 구현

이터레이션 규약
이터레이션 규약은 루프, 생성자가 어떤 객체의 값들을 순화하기 위한 인터페이스 구현 규칙을 정리한 것이다.
ES6는 이터러블 규약(iterable protocol)과 이터레이터 규약(iterator protocol), 두 가지로 나누어 규정한다.

이터레이터 규약
이터레이터는 이터레이터 규약을 따르는 객체로, 그 다음 요소를 반환하는 next() 메소드를 구현해야 한다.
next()를 호출할 때마다 value와 done, 두 프로퍼티로 구성된 객체를 반환한다.
> done: 이터레이터가 순회를 마치면 true 를, 아니면 false 를 반환
> value: 콜렉션의 현재 요소값으로, done 이 true 이면 생략된다.

이터러블 규약
이터러블은 이터러블 규약을 구현한 객체로, 반드시 @@iterator 메소드를 제공한다.
즉, Symbol.iterator 심볼을 프러퍼티 키로 갖고 있으며, @@iterator 메소드는 항상 이터레이터 객체를 반환한다.
*/
// 이터레이터
let obj = {
	array: [1, 2, 3, 4, 5],
	nextIndex: 0,
	next: function() {
		return this.nextIndex < this.array.length ? {value: this.array[this.nextIndex++], done: false} : {done: true};
	}
};
console.log(obj.next().value); // 1
console.log(obj.next().value); // 2
console.log(obj.next().value); // 3
console.log(obj.next().value); // 4
console.log(obj.next().value); // 5
console.log(obj.next().done); // true

// 이터러블
let obj = {
	array: [1, 2, 3, 4, 5],
	nextIndex: 0,
	[Symbol.iterator]: function() {
		// 이터레이터 객체 반환
		return {
			array: this.array,
			nextIndex: this.nextIndex,
			next: function() {
				return this.nextIndex < this.array.length ? {value: this.array[this.nextIndex++], done: false} : {done: true};
			}
		};
	}
};
let iterator = obj[Symbol.iterator]();
console.log(iterator.next().value); // 1
console.log(iterator.next().value); // 2
console.log(iterator.next().value); // 3
console.log(iterator.next().value); // 4
console.log(iterator.next().value); // 5
console.log(iterator.next().donw); // true



/*
- 
제너레이터 객체의 생성과 활용

제너레이터(generator)는 평범한 함수처럼 생겼지만, 하나의 값만 반환하는 게 아니라 한번에 하나씩 여러 값을 반환하는 함수다.
이 함수를 호출하면 즉시 바디를 실행하지 않고 제너레이터 객체(즉, 이터러블 + 이터레이터 프로토콜을 모두 구현한 객체)의 새 인스턴스를 반환한다.

제너레이터 객체는 제너레이터 함수의 새로운 실행 콘텍스트(execution context)를 갖고, 
next() 메소드를 실행하면 제너레이터 함수 바디를 실행하다가 yield 키워드를 만나면 바로 중지하고 yield 된 값을 반환한다.
그리고 다시 next() 메소드를 부르면 멈춘 지점부터 실행이 재개되고 그 다음 yield 된 값을 낸다.
제너레이터 함수에 더 이상 yield 할 값이 남아있지 않을 때 done 프로퍼티는 true 가 된다.

제너레이터 함수는 function * 으로 표기한다.
*/
function* generator_function() {
	yield 1;
	yield 2;
	yield 3;
	yield 4;
	yield 5;
}
let generator = generator_function();

console.log(generator.next().value); // 1
console.log(generator.next().value); // 2
console.log(generator.next().value); // 3
console.log(generator.next().value); // 4
console.log(generator.next().value); // 5
console.log(generator.next().done); // true

/*
제너레이터 함수는 이터러블 규약에 따라 yield 우측의 표현식에 해당하는 값을 반환한다.
표현식을 생략하면 반환값은 undefined 다.
앞서 yield 된 값이, 바로 이 표현식 값을 말한다.

next() 메소드는 선택 인자를 받아 제너레이터 함수가 멈춘 지점에서 yield 문의 반환값으로 지정할 수 있다.
*/
function* generator_function() {
	let a = yield 12;
	let b = yield a + 1;
	let c = yield b + 2;
	yield c + 3;
}
let generator = generator_function();

console.log(generator.next().value); // 12
console.log(generator.next(5).value); // 6
console.log(generator.next(11).value); // 13
console.log(generator.next(78).value); // 81
console.log(generator.next().done); // true


// return(value) 
// 제너레이터 함수는 모든 값을 반환하기 전, 제너레이터 객체의 return() 메소드에 마지막 반환값을 선택 인자로 넘겨 언제라도 도중 하차할 수 있다.
function* generator_function() {
	yield 1;
	yield 2;
	yield 3;
}
let generator = generator_function();

console.log(generator.next().value); // 1
console.log(generator.return(22).value); // 22
console.log(generator.next().done); // true


// throw(exception) 
// 제너레이터 함수 내에서 임의로 예외를 발생시키려면 제너레이터 객체의 throw() 메소드에 예외 객체를 지정한다.
function* generator_function() {
	try {
		yield 1;
	}catch(e) {
		console.log('첫 번째 예외');
	}
	try {
		yield 2;
	}catch(e) {
		console.log('두 번째 예외');
	}
}
let generator = generator_function();

// 마지막으로 제너레이터 함수가 멈춘 지점에서 예외가 발생했다. 예외 처리가 끝난 후 throw() 는 계속 실행돼서 그 다음 yield 된 값을 반환한다.
console.log(generator.next().value); // 
console.log(generator.throw("예외 문자열").value); // 
console.log(generator.throw("예외 문자열").done); //


// yield* 키워드
// 제너레이터 함수 안에서 다른 이터러블 객체를 순회한 이후 그 값을 yield 하려면 yield* 키워드에 해당 표현식을 지정한다.
function* generator_function_1() {
	yield 2;
	yield 3;
}
function* generator_function_2() {
	yield 1;
	yield* generator_function_1();
	yield* [4, 5];
}
let generator = generator_function_2();

console.log(genrator.next().value); // 1
console.log(genrator.next().value); // 2
console.log(genrator.next().value); // 3
console.log(genrator.next().value); // 4
console.log(genrator.next().value); // 5
console.log(genrator.next().done); // true



/*
- 
for...of 루프로 순회

이터러블 객체를 next()로 순회하는 건 사실 적잖이 불편하다.
ES6는 더 간편한 for...of 루프문을 제공한다.

for...of 루프는 이터러블 객체 값을 순회하는 구문이다.
*/
function* generator_function() {
	yield 1;
	yield 2;
	yield 3;
	yield 4;
	yield 5;
}
let arr = [1, 2, 3];

for(let value of generator_function()) {
	console.log(value); // 1 2 3 4 5
}

for(let value of arr) {
	console.log(value); // 1 2 3
}



/*
- 
꼬리 호출 최적화

어떤 함수를 호출하면 메모리에 실행 스택을 생성하여 함수의 변수를 저장한다.

함수 안에서 다른 함수를 호출해도 이렇게 실행 스택이 새로 생성되는데, 중첩된 내부 함수가 실행을 끝애고 자신을 호출한 함수를 재개하려면 그 주소를 어딘가 보관해야 하므로
역시 내부 함수의 실행 스택만큼 메모리를 더 점유한다는게 문제다.
그렇다고 실행 스택을 교환(switch)하여 생상하면 CPU 시간이 소비된다.
중첩수준이 몇 단계 정도면 별 문제 아니지만, 수백 단계에 이르게 되면 자바스크립트 엔진이
RangeError: Maximun call stack size exceeded 예외를 던지며 문제가 심각해 진다.

꼬리 호출(tail call)은 무조건 마수 끝(꼬리)에서 return 문을 실행하도록 함수를 호출하는 기법이다.
똑같은 함수 호출이 꼬리에 꼬리를 물고 이어지는, 꼬리 재귀(tail recursion)라는 재귀의 특수한 형태다.

꼬리 호출을 하면 실행 스택을 새로 만들지 않고 기존 스택을 재사용할 수 있기 때문에 부가적인 CPU 연산과 메모리 점유가 실제로 발생하지 않는다.
꼬리 호출 최적화(tail call optimization)는 꼬리 호출로 실행 스택을 재활용하는 것이다.

ES6 부터는 "use strict" 모드 실행하면 꼬리 호출 최적화를 자동으로 수행한다.
*/
"use strict";

function _add(x, y) {
	return x + y;
}

function add1(x, y) {
	x = parseInt(x);
	y = parseInt(y);

	// 꼬리호출
	return _add(x, y);
}
function add2(x, y) {
	x = parseInt(x);
	y = parseInt(y);

	// 꼬리호출 아님
	return 0 + _add(x, y);	
}

console.log(add1(1, '1')); // 2
console.log(add2(1, '2')); // 3

/*
_add1() 함수의 _add()는 add1() 함수의 마지막 실행 코드이므로 꼬리 호출이 맞지만,
add2() 함수는 마지막 실행부에 _add()의 결과값에 0을 더하는 연산이 있어서 꼬리 호출이 아니다. 
(실행 스택을 새로 만들어 실행 후 다시 원래 함수인 add2() 함수로 돌아와 값을 반환)

add1()의 _add()는 실행 스택을 새로 만들지 않고 add1() 함수의 실행 스택을 다시 사용한다. 즉, 꼬리 호출 최적화된 코드다.
*/


// 꼬리 호출 아닌 코드를 꼬리 호출로 전환
// 가급적 꼬리 호출 아닌 코드는 꼬리 호출로 변경하여 최적화해야 한다.
"use strict";

function _add(x, y) {
	return x + y;
}

function add(x, y) {
	x = parseInt(x);
	y = parseInt(y);

	let result = _add(x, y);
	return result;
}

console.log(add(1, '1')); // _add()는 꼬리 호출이 아니므로 스택이 2개 쌓인다.

// 꼬리호출 최적화
// 변수 result를 쓰지 말고 return 문으로 함수 호출을 즉시 반환한다. 꼬리 호출 전환 기법은 이밖에도 상당히 여러 가지다.
function add(x, y) {
	x = parseInt(x);
	y = parseInt(y);

	return _add(x, y);
}






// ----------






/*
- 
자바스크립트 실행 모델

자바스크립트 코드는 싱글 스레드(single thread)로 작동한다. 다시 말해, 2개를 동시에 실행하는 건 불가능하다.
브라우저에 접속한 각 웹사이트는 스레드 하나를 메인 스레드로 잡은 채 웹 소스 파일을 내려받고 파싱, 실행한다.

메인 스레드엔 한번에 하나씩 비동기 작업을 실행하기 위해 큐를 둔다.
이벤트 처리기, 콜백 등 어떤 유형의 작업이라도 큐에 쌓을 수 있다. AJAX 요청/응답, 이벤트 발생, 타이머 등록 등이 일어나면 큐에 새 작업을 추가한다.
실행 시간이 오래 거리는 작업이 썩이면 큐의 다른 작업들과 메인 스크립트를 멈추게 할 수도 있다.
메인 스레드는 가능할 때면 언제나 큐에 줄 선 작업들을 하나씩 꺼내어 실행한다.

HTML5는 메인 스레드와 병렬로 실행되는, 웹 워커(web worker)라는 실제 스레드를 도입했다.
웹 워커의 실행이 끝나거나 메인 스레드에 알림이 필요할 때 새 이벤트를 그냥 큐에 넣는다.

자바스크립트 코드를 비동기적으로 실행할 수 있는 건 바로 이 큐 덕분이다.
*/






// ----------






/*
-
비동기코드 작성
ES5는 이벤트와 콜백이라는, 두 가지 비동기 코드 작성 패턴을 지원한다.
보통 비동기 작업을 시작하고 이벤트 처리기를 등록하거나, 콜백을 전달해서 작업이 끝난 후 실행되도록 코딩한다.

이벤트를 포함한 비동기 코드
이벤트를 포함한 비동기 자바스크립트 API는 처리 후 성공/실패에 따른 처리기를 각각 등록한다.

콜백을 포함한 비동기 코드
콜백을 이용한 비동기 자바스크립트 API는 성공/에러 콜백을 모두 넘기고 성공 여부에 따라 어느 한쪽을 호출한다.
*/



/*
- 
비동기 코드 작성이 까다로운 점
*/



/*
- 
프라미스 생성과 작동 원리

프라미스(프라미스 객체)는 비동기 작업을 나타낸다.
프라미스가 자바스크립트에 내장된 건 처음이지만, C# 5, C++ 11, 스위프트(swift), 스칼라(scala) 등 다른 프로그래밍 언어에서는 이미 예전부터 지원해왔다.

프라미스 생성자
프라미스는 생성자는 프라미스 인스턴스를 만든다.
이 때 비동기 작업에 해당하는 실행자(executor)라는 콜백을 넘긴다.
실행자는 귀결(resolve) 콜백과 버림(reject) 콜백, 두 파라미터를 가지며,
작업이 성공하면 귀결 콜백이, 실패하면 버림 콜백이 실행된다.
성공하면 귀결 콜백에 결과값을, 실패하면 버림 콜백에 실패 사요를 각각 전달한다.

프라미스는 네 가지 상태값을 가진다.
> 이룸(Fulfilled): 귀결 콜백이 프라미스 아닌 객체를 인지로, 또는 인자 없이 실행될 때 프라미스는 이룸(이루어진) 상태다.
> 버림(Rejected): 실행자 스코프에서 예외가 발생하거나 버림 콜백이 실행될 경우 프라미스는 버림(버려진) 상태다.
> 미결(Pending): 귀결/버림 콜백 실행 전 프라미스는 미결 상태다.
> 확정(settled): 미결 상태가 아닌, 이룸/버림 중 한 쪽에 도달한 확정 상태다.
프라미스는 일단 이룸/버림 상태에 이르면 두 번 다시 돌아가지 않는다. 상태를 바꾸어도 소용없다.

프라미스 객체를 인자로 받은 상태에서 귀결 콜백이 실행되면
이 인자 객체 상태가 이룸인지, 버림인지에 따라 전체 프라미스의 이룸/버림이 확정된다.
*/
let promise = new Promise(function(resolve, reject) {
	var request = new XMLHttpRequest();
	var url = "data.json";

	request.open("GET", url);

	request.addEventListener("load", function() {
		if(request.status === 200) {
			resolve(request.responseText);
		}else {
			reject("서버 에러: " + request.status);
		}
	}, false);

	request.addEventListener("error", function() {
		reject("Ajax 요청 실패");
	}, false);

	request.send();
});


// 이룸값 (성공값)
/*
이룸값은 비동기 작업 성공시 귀결되는 이룸 프라미스의 값이다.
귀결 콜백의 인자가 다른 프라미스 객체가 아니라면, 이 인자를 프라미스 객체의 이룸값으로 간주한다.
귀결 콜백 인자가 없으면 이룸값은 undefined, 프라미스 상태는 이룸이다.

"프라미스가 어떤 값으로 귀결", "어떤 값으로 귀결된 프라미스" 같은 말은 프라미스 실행자가 실행되거나
resolve 콜백을 주어진 값으로 호출한다는 뜻이다.
*/
// B는 버림 프라미스라 A 또한 버려지고 둘은 모두 버리는 이유를 문자열 "실패"에 담는다.
var A = new Promise(function(resolve, reject) {
	var B = new Promise(function(res, rej) {
		rej("실패");
	})

	resolve(B); // 실패
});

// D는 이룸 프라미스라 C도 이룸 프라미스이고 C, D의 이룸값은 문자열 "결과"다.
var C = new Promise(function(resolve, reject) {
	var D = new Promise(function(res, rej) {
		res("결과");
	});

	resolve(D); // 결과
});


// then(onFulfilled, onRejected) 메소드 - then(성공콜백, 실패콜백)
/*
프라미스 객체의 then() 메소드에는 이룸/버림 처리 이후 수행할 작업을 넣는다.
이 작업은 또 다른 이벤트/콜백 기반의 비동기 작업이 올 수 있다.
onFulfilled 는 프라미스의 이룸값, onRejected 는 버림 사유를 각각 파라미터로 받는다.

then() 메소드는 항상 프라미스 객체를 새로 만들어 반환하고
이 객체는 콜백을 호출한 반환값으로 귀결된다.

then()이 새 프라미스 객체를 반환하는 경우
> onFulfilled 콜백이 호출되고 내부에 return 문이 없으면, 내부적으로 새 이룸 프라미스를 생성 후 반환한다.
> onFulfilled 콜백이 임의의 프라미스를 반환하면, 내부적으로 이 프라미스로 귀결된 새 프라미스 객체를 생성하여 반환한다.
> onFulfilled 콜백이 프라미스 아닌 다른 것을 반환해도 내부적으로 이 반환 값으로 귀결된 새 프라미스 객체를 만들어 반환한다.
> onFulfilled 대신 null 을 넘기면 콜백을 내부적으로 생성하여 null 로 대체한다. 내부에서 만들어진 onFulfilled 는 부모 프라미스의 이룸값으로 귀결된 새 이룸 프라미스 객체를 반환한다.
> onRejected 콜백이 호출되고 내부에 return 문이 없으면, 내부적으로 새 이룸 프라미스를 생성 후 반환한다.
> onRejected 콜백이 임의의 프라미스를 반환하면, 내부적으로 이 프라미스로 귀결된 새 프라미스 객체를 생성하여 반환한다.
> onRejected 콜백이 프라미스 아닌 다른 것을 반환해도 내부적으로 이 반환값으로 귀결된 새 프라미스 객체를 만들어 반환한다.
> onRejected 대신 null 을 넘기거나 생략하면 콜백을 내부적으로 생성하여 null 로 대체한다. 내부에서 만들어진 onRejected 는 부모 프라미스와 버림 사유와 동일한 새 버림 프라미스 객체를 반환한다.
*/
var promise = new Promise(function(resolve, reject) {
	var request = new XMLHttpRequest();
	var url = "data.json";

	request.open("GET", url);
	request.addEventListener("load", function() {
		if(request.status === 200) {
			resolve(request.responseText);
		}else {
			reject("서버 에러: " + request.status);
		}
	}, false);

	request.send();
});

// Ajax 요청이 성공하면(즉, 프라미스가 이루어지면) 응답 텍스트를 인자로 onFulfilled 콜백을 실행하여
// JSON 문자열을 자바스크립트 객체로 변환한 후 반환한다.
promise.then(function(value) {
	value = JSON.parse(value);
	return value;
}, function(reason) {
	console.log(reason);
});

// 또는 then() 체이닝 - 순서대로 실행
promise.then(function(value) {
	value = JSON.parse(value);
	return value;
}).then(function(value) {
	console.log(value.name);
	return value;
}).then(function(value) {
	console.log(value.age);
	return value;
}).then(null, function(reason) {
	console.log(reason);
});



// catch(onRejected) 메소드
/*
then() 메소드로 다른 기능 없이 에러/예외만 처리하고자 할 때는 catch() 메소드를 쓴다.
이 메소드는 onRejected 콜백을 인자로 받아 onRejected 와 같은 방식으로 호출한다.

catch() 는 언제나 새 프라미스를 반환하며, 다음 몇 가지 경우의 수가 있다.
> onRejected 콜백 내부에 return 문이 없으면, 내부적으로 이룸 프라미스를 생성 후 반환한다.
> onRejected 콜백이 호출 후 임의의 프라미스를 반환하면, 내부적으로 이 임의의 프라미스로 귀결된 새 프라미스 객체를 생성하여 반환한다.
> onRejected 콜백이 프라미스 아닌 다른 것을 반환해도 내부적으로 이 반환값으로 귀결된 새 프라미스 객체를 만들어 반환한다.
> onRejected 대신 null 을 넘기거나 생략하면 콜백을 내부적으로 생성하여 null 로 대체한다. 내부에서 만들어진 onRejected 는 부모 프라미스와 버림 사유와 동일한 새 버림 프라미스 객체를 반환한다.
> catch() 를 호출한 프라미스 객체가 이루어지면 이 메소드는 부모 프라미스와 이룸값을 가진 새 이룸 프라미스 객체를 반환하고 onRejected 콜백은 무시한다.
*/
promise.then(null, function(reason) {

});
// catch() 로 변경 - 위 코드와 동일한 의미
promise.catch(function(reason) {

});


// Promise.resolve(value) 메소드
/*
resolve() 는 주어진 값으로 귀결된 프라미스 객체를 반환하는 메소드다.

이 메소드의 기본 기능은 임의의 값을 프라미스 객체로 변환하는 것이다.
프라미스인지 아닌지 확실치 않은 값을 프라미스로 바꾸어 사용하고자 할 때 유용하다.
*/
var p1 = Promise.resolve(4);
p1.then(function(value) {
	console.log(value); // 4
});

// 프라미스 객체를 전달
Promise.resolve(p1).then(function(value) {
	console.log(value); // 4
});
Promise.resolve({name: "성민"}).then(function(value) {
	console.log(value.name); // 성민
});


// Promise.reject(value) 메소드
/*
reject() 는 주어진 값이 실패 사유인 프라미스 객체를 반환하는 메소드다.

Promise.resolve() 와 달리 reject() 는 프로미스 변환이 아닌, 
디버깅 용도로만 쓴다.
*/
var p1 = Promise.reject(4);
p1.then(null, function(value) {
	console.log(value); // 4
});
Promise.reject({name: "성민"}).then(null, function(value) {
	console.log(value); // 성민
});


// Promise.all(value) 메소드
/*
all() 은 주어진 이터러블 객체의 프라미스가 모두 이루어질 때 새 이룸 프라미스를 반환하는 메소드다.

어떤 비동기 작업들을 다 끝내고 나서 다음 작업으로 넘어갈 때 유용하다.
*/
var p1 = new Promise(function(resolve, reject) {
	setTimeout(function() {
		resolve();
	}, 1000);
});

var p2 = new Promise(function(resolve, reject) {
	setTimeout(function() {
		resolve();
	}, 2000);
});

var arr = [p1, p2];

// 이터러블 객체에 프라미스가 아닌 객체가 있으면 Promise.resolve() 를 이용하여 프라미스로 변환한다.
Promise.all(arr).then(function() {
	console.log("Done"); // 2초 후 콘솔창에 "Done"이 표시된다.
});

// 프라미스 중 하나라도 버려지면 Promise.all() 메소드는 즉시 해당 실패 사유를 지닌 새 버림 프라미스를 반환한다.
var p1 = new Promise(function(resolve, reject) {
	setTimeout(function() {
		reject("에러")
	}, 1000);
});

var p2 = new Promise(function(resolve, reject) {
	setTimeout(function() {
		resolve();
	}, 2000);
});

var arr = [p1, p2];

Promise.all(arr).then(null, function(reason) {
	console.log(reason); // 1초 후 콘솔창에 "에러"가 표시된다.
});


// Promise.race(iterable) 메소드
/*
race() 는 주어진 이터러블 객체의 프라미스 중 어느 하나라도 이루어질 때 
해당 이룸값을 지닌 새 이룸 프라미스를 반환하는 메소드다.

메소드명에서 연상되는 것처럼 프라미스들끼리 경쟁을 붙여 우승자를 뽑는 것이다.
*/
var p1 = new Promise(function(resolve, reject) {
	setTimeout(function() {
		resolve("이룸값 1");
	}, 1000);
});

var p2 = new Promise(function(resolve, reject) {
	setTimeout(function() {
		resolve("이룸값 2");
	}, 2000);
});

var arr = [p1, p2];

Promise.race(arr).then(function(value) {
	console.log(value); // 이룸값 1
}, function(reason) {
	console.log(reason);
});



/*
-
프라미스 기반의 자바스크립트 API
*/

// 배터리 상태 API
// navigator 객체의 getBattery() 메소드는 배터리 상태 데이터 조회 성공 시 이룸 프라미스를, 실패시 버림 프라미스를 반환한다.
// 이룸 프라미스의 반환값은 배터리 정보를 담고 있는 객체로, level 프로퍼티는 남아있는 배터리량을 가리킨다.
navigator.getBattery().then(function(value) {
	console.log("배터리 상태: " + (value.level * 100));
}, function(reason) {
	console.log("에러: " + reason);
});


// 웹 암호화 API
// 웹 암호화 API는 해싱(hashing), 서명 생성/검증, 암호화/복호화 기능을 제공한다.
function convertStringToArrayBufferView(str) {
	var bytes = new Uint8Array(str.length);
	for(var i=0; i<str.length; i++) {
		bytes[i] = str.charCodeAt(i);
	}
	return bytes;
}
function convertArrayBufferToHexaDecimal(buffer) {
	var data_view = new DataView(buffer);
	var i, len, hex = '', c;

	for(i=0, len=data_view.byteLength; i<len; i++) {
		c = data_view.getUint8(i).toString(16);
		if(c.length < 2) {
			c = '0' + c;
		}
		hex += c;
	}
	return hex;
}

// 주어진 문자열의 SHA-256 해시값을 찾는 코드
// window.crypto.subtle.digest 메소드는 문자열의 배열 버퍼를 바아 알고리즘 명칭을 해시한 다음 프라미스 객체를 반환한다.
// 해시값이 성공적으로 생성되면 이 값을 나타내는 배열 버퍼가 이룸값인 이룸 프라미스를 반환한다.
window.crypto.subtle.digest({name: "SHA-256"}, convertStringToArrayBufferView("ECMAScript 6")).then(function(result) {
	var hash_value = convertArrayBufferToHexaDecimal(result);
	console.log(hash_value);
});






// ----------






/*
-
리플렉트 API (변수의 타입을 체크하고, 객체의 구조를 탐색하는 과정)
ES5 시절에도 객체 리플렉션 API가 있었지만, 체계가 없는데다 실패하면 예외가 발생했다.

-
Reflect 객체
ES6 전역 Reflect 객체에는 객체 리플렉션에 관한 모든 메소드가 있다. Reflect는 함수 객체가 아니므로 호출할 수 없고
new 연산자를 붙여 사용할 수도 없다.
ES6 리플렉트 API 메소드는 모두 Reflect 객체가 감싸고 있고 잘 정돈된 모습이다.
Reflect 객체의 메소드는 상당수 기능 면에서 전역 Object 객체의 메소드와 중복된다.
*/

// Reflect.apply(function, this, args) 
/*
Reflect.apply() 는 주어진 this 값으로 타깃 함수(target function)를 호출하는 메소드로, Function.prototype.apply() 메소드와 같다.

다음 3개의 인자를 받는다.
> 첫 번째 인자는 타깃 함수다.
> 두 번째 선택인자는 타깃 함수 내부의 this 값이다.
> 세 번째 선택인자는 타깃 함수의 인자를 지정한 배열 객체다.
*/
function name(a, b, c) {
	return this.value + a + b + c;
}

console.log(Reflect.apply(name, {value: 100}, [10, 20, 30])); // 160


// Reflect.construct(constructor, args, prototype)
/*
Reflect.construct() 는 함수를 생성자로 실행하는 메소드로, new 연산자와 비슷하다.
생성자로 실행된 함수를 타깃 함수라고 한다.

굳이 new 대시 Reflect.construct() 를 써야 하는 이유는, 경우에 따라 한 생성자의 prototype과 다른 생성자의 prototype을 매치시켜야 하기 때문이다.

다음 3개의 인자를 받는다.
> 첫 번째 인자는 타깃 생성자다.
> 두 번째 선택 인자는 타깃 생성자의 인자에 해당하는 배열이다.
> 세 번째 선택 인자는 타깃 생성자의 prototype 으로 사용할 생성자다.
*/

function constructor1(a, b) {
	this.a = a;
	this.b = b;

	this.f = function() {
		return this.a + this.b + this.c;
	};
}

function constructor2() {}
constructor2.prototype.c = 100;

// constructor1 을 실행 중 constructor2 의 prototype 을 constructor1 의 prototype 으로 사용했다.
var myObject = Reflect.constructor(constructor1, [1, 2], constructor2);
console.log(myObject.f()); // 103


// Reflect.defineProperty(object, property, descriptor)
/*
Reflect.defineProperty() 는 객체에 새 프로퍼티를 정의하거나 기존 프로퍼티를 수정하는 메소드다.
작업이 끝나면 성공 여부를 불리언 값으로 반환한다.

이 메소드는 반환값을 제외하고 Object.defineProperty() 와 비슷하다.
Reflect.defineProperty() 는 불리언 값을 반환하지만, Object.defineProperty() 는 수정된 객체를 반환한다.
Object.defineProperty() 는 객체 프로퍼티를 수정/정의하다 실패하면 예외를 내지만, Reflect.defineProperty() 는 단순히 false 를 반환한다.

다음 3개의 인자를 받는다.
> 첫 번째 인자는 프로퍼티를 정의/수정할 객체다.
> 두 번째 인자는 정의/수정할 프로퍼티명 또는 심볼이다.
> 세 번째 인자는 정의/수정할 프로퍼티의 서술이다.

// 데이터 프로퍼티와 접근자 프로퍼티
ES5 부터 모든 객체의 프로퍼티는 데이터 프로퍼티(data property), 접근자 프로퍼티(accessor property) 둘 중 하나다.
데이터 프로퍼티는 쓰기 기능 또는 불가 상태의 값을 가지는 반면, 접근자 프로퍼티는 프로퍼티 값을 조회/지정하는 함수의 게터-세터 쌍을 가진다.

데이터 프로퍼티 속성으로는 value, writable, enumerable, configurable 이 있고,
접근자 프로퍼티 속성으로는 set, get, enumerable, configurable 이 있다.

서술자(descriptor) 는 프로퍼티의 속성을 서술하는 객체다. Reflect.defineProperty(), Object.defineProperty(), Object.defineProperties(), Object.create() 메소드로 프로퍼티를 생성할 때 해당 프로퍼티의 서술자를 전달한다.

데이터 프로퍼티 서술자의 속성은 다음과 같다.
> value(값): 프로퍼티에 할당된 값으로, 기본값은 undefined 다.
> writable(쓰기 가능): 이 속성이 true면 할당 연산자로 값을 변경할 수 있다. 기본값은 false 다.
> configurable(설정 가능): 이 속성이 true 면 프로퍼티 속성을 변경/삭제할 수 있다. 기본값은 false 다. configurable 이 false 이고 writable 이 true 면, 값과 쓰기가능 속성은 변경 가능하다.
> enumerable(열거 가능): 이 속성이 true 면 프로퍼티를 for...in 루프나 Object.keys() 메소드에 열거할 수 있다. 기본값은 false 다.

접근자 프로퍼티 서술자 속성은 다음과 같다.
> get(조회): 프로퍼티 값을 조회하는 함수다. 파라미터는 없으며 기본값은 undefined 다.
> set(지정): 프로퍼티 값을 지정하는 함수다. 주어진 값을 프로퍼티에 할당한다.
> configurable(설정 가능): 이 속성이 true 면 프로퍼티 서술자를 변경하거나 프로퍼티 자체를 삭제할 수 있다. 기본값은 false 다.
> enumerable(열거 가능): 이 속성이 true 면 프로퍼티를 for...in 루프나 Object.keys() 메소드에 열거할 수 있다. 기본값은 false 다.

자바스크립트 엔진은 서술자 객체의 프로퍼티를 보고 데이터 프로퍼티인지,
접근자 프로퍼티인지 판단한다.
Reflect.defineProperty(),
Object.defineProperty(),
Object.defineProperties(), 
Object.create() 를 쓰지 않고 추가한 프로퍼티는 writable, enumerable, configurable 속성이 모두 true 인 데이터 프로퍼티로 설정된다. 물론, 이 속성은 추가한 이후에 변경해도 된다.

Reflect.defineProperty(),
Object.defineProperty(),
Object.defineProperties() 메소드 호출 시 이미 객체에 동일한 이름의 프로퍼티가 있을 경우 프로퍼티를 덮어쓴다.
서술자에 따로 지정하지 않은 속성은 유지된다.

데이터/접근자 프로퍼티는 상호 변환이 가능한데, 변환을 하면 서술자에 지정하지 않은 configurable, enumerable 속성은 보존되지만 다른 속성은 기본값으로 설정된다.
*/

// 데이터 프로퍼티 생성
var obj = {};

Reflect.defineProperty(obj, "name", {
	value: "성민",
	writable: true,
	configurable: true,
	enumerable: true
});

console.log(obj.name); // 성민

// 접근자 프로퍼티 생성
var obj = {
	_name: "성민"
};

Reflect.defineProperty(obj, "name", {
	get: function() {
		return this._name;
	},
	set: function(data) {
		// 값을 변경
		this._name = data;
	},
	configurable: true,
	enumerable: true
});

obj.name = "이름";
console.log(obj.name); // 이름


// Reflect.deleteProperty(object, property)
/*
Reflect.deleteProperty() 는 객체 프로퍼티를 삭제하는 메소드로, delete 연산자와 기능이 같다.
이 메소드는 타깃 객체와 삭제할 프로퍼티명, 2개의 인자를 받는다.
문제없이 잘 삭제되면 true 를, 아니면 false 를 반환한다.
*/
var obj = {
	name: "성민"
};

console.log(obj.name); // 성민
Reflect.deleteProperty(obj, "name");
console.log(obj.name); // undefined


// Reflect.enumerate(object)
/*
Reflect.enumerate()는 주어진 객체 자신의 열거 가능한 프로퍼티와 이 객체가 상속받은 열거 가능 프로퍼티를 이터레이터 객체로 반환한다.
이 메소드는 열거 가능 프로퍼티를 순회하는 for...in 루프와 유사하다.
*/
var obj = {
	a: 1,
	b: 2,
	c: 3
};

var iterator = Reflect.enumerate(obj);

console.log(iterator.next().value); // a
console.log(iterator.next().value); // b
console.log(iterator.next().value); // c
console.log(iterator.next().done); // true


// Reflect.get(object, property, this)
/*
Reflect.get() 은 객체 프로퍼티 값을 조회하는 메소드로, 
객체와 프로퍼티명을 인자로 받고 프로퍼티가 접근자 프로퍼티일 경우 
세 번째 선택 인자에 get 함수내부의 this 값을 지정할 수 있다.
*/
var obj = {
	_name: "성민"
};

Reflect.defineProperty(obj, "name", {
	get: function() {
		return this._name;
	}
});

console.log(obj.name); // 성민
var name = Reflect.get(obj, "name", {_name: "이름"});
console.log(name); // 이름


// Reflect.set(object, property, value, this)
/*
Reflect.set() 는 객체 프로퍼티 값을 지정하는 메소드로, 객체와 프로퍼티명, 프로퍼티 값을 인자로 받는다.
접근자 프로퍼티일 경우에는 네 번째 선택 인자에 get 함수 내부의 this 값을 지정할 수 있다.

프로퍼티 값이 아무 탈 없이 잘 지정되면 true 를, 아니면 false 를 반환한다.
*/
var obj1 = {
	_name: "성민"
};

Reflect.defineProperty(obj1, "name", {
	set: function(data) {
		this._name = data;
	},
	get: function() {
		return this._name;
	}
});

var obj2 = {
	_name: "이름"
};

Reflect.set(obj1, "name", "성민", obj2);

console.log(obj1.name); // 성민
console.log(obj2._name); // 성민


// Reflect.getOwnPropertyDescriptor(object, property)
/*
Reflect.getOwnPropertyDescriptor() 는 객체 프로퍼티의 서술자를 조회하는 메소드로, 
기능 상 Object.getOwnPropertyDescriptor() 와 거의 같다.
첫 번째 인자는 타깃 객체, 두 번째 인자는 프로퍼티명이다.
*/
var obj = {
	name: "성민"
};

var descriptor = Reflect.getOwnPropertyDescriptor(obj, "name");

console.log(descriptor.value); // 성민
console.log(descriptor.writable); // true
console.log(descriptor.enumerable); // true
console.log(descriptor.configurable); // true


// Reflect.getPrototypeOf(object)
/*
Reflect.getPrototypeOf() 는 객체 프로토타입, 즉 내부 [[prototype]] 값을 조회하는 메소드로, 
Object.getPrototypeOf() 와 같다.
*/
var obj1 = {
	__proto__: {
		name: "성민"
	}
};

var obj2 = Reflect.getPrototypeOf(obj1);
console.log(obj2.name); // 성민


// Reflect.setPrototypeOf(object, prototype)
/*
Reflect.setPrototypeOf() 는 내부 [[prototype]] 값을 지정하는 메소드다.
작업 성공 여부를 true/false 로 반환한다.
*/
var obj = {};

Reflect.setPrototypeOf(obj, {
	name: "성민"
});

console.log(obj.name); // 성민


// Reflect.has(object, property)
/*
Reflect.has() 는 주어진 객체에 어떤 프로퍼티가 존재하는지 확인하는 메소드로, 
이 객체가 상속한 프로퍼티도 체크한다.
존재여부를 true/false 로 반환한다.
in 연산자와 기능 상 같다.
*/
var obj = {
	__proto__: {
		name: "성민"
	},
	age: 12
};

console.log(Reflect.has(obj, "name")); // true
console.log(Reflect.has(obj, "age")); // true


// Reflect.isExtensible(object)
/*
Reflect.isExtensible() 는 확장 가능한 객체인지, 즉 이 객체에 새로 프로퍼티를 추가할 수 있는지 확인하는 메소드다.

자바스크립트 객체는 Object.preventExtensions(), Object.freeze(), Object.seal() 메소드로 더 이상 확장할 수 없게 고정할 수 있다.
이 메소드는 Object.isExtensible() 과 같다.
*/
var obj = {
	name: "성민"
};

console.log(Reflect.isExtensible(obj)); // true

Object.preventExtensions(obj);

console.log(Reflect.isExtensible(obj)); // false


// Reflect.preventExtensions(object)
/*
Reflect.preventExtensions() 는 객체를 확장할 수 없게 하는 메소드다.
처리 결과를 true/false 로 반환한다.
이 메소드는 Object.preventExtensions() 과 같다.
*/
var obj = {
	name: "성민"
};

console.log(Reflect.isExtensible(obj)); // true

console.log(Reflect.preventExtensions(obj)); // true

console.log(Reflect.isExtensible(obj)); // false


// Reflect.ownKeys(object)
/*
Reflect.ownKeys() 는 객체 자신의 프로퍼티 키를 원소로 담은 배열을 반환한다.
상속한 프로퍼티는 무시한다.
*/
var obj = {
	a: 1,
	b: 2,
	__proto__: {
		c: 3
	}
};

var keys = Reflect.ownKeys(obj);

console.log(keys.length); // 2
console.log(keys[0]); // a
console.log(keys[1]); // b






// ----------






/*
-
프록시 
프록시는 프로퍼티 탐색(lookup) 및 할당, 생성자 호출, 열거 등 객체의 기본 동작에 사용자 임의의 로직을 넣기 위해 사용하는 일종의 객체 감싸미다.
객체를 프록시로 감싼 이후에는 해당 객체에서 일어나는 모든 일들은 프록시 객체를 대상으로 하기 때문에 원하는 작업을 넣을 수 있다.

용어 정의
타깃(target): 프록시로 감쌀 객체다.
트랩(trap): 타깃 객체의 동작을 가로채는 함수로, 사용자 임의의 동작을 부여한다.
처리기(handler): 트랩이 있는 객체로, 프록시 객체에 붙인다.

프록시 API
프록시는 Proxy 생성자로 생성하며, 다음 2개의 인자를 받는다.
타깃: 프록시로 감쌀 객체
처리기: 타깃 객체에 쓸 트랩이 있는 객체

트랩은 타깃 객체에 가능한 어떤 작업이라도 정의할 수 있으며, 정의하지 않을 경우 기본 동작을 수행한다.
*/
var target = {
	age: 12
};
var handler = {};
var proxy = new Proxy(target, handler);

proxy.name = "성민";
console.log(target.name); // 성민
console.log(proxy.name); // 성민
console.log(target.age); // 12
console.log(proxy.age); // 12

/*
target.age 프로퍼티를 proxy 객체를 통하여 접근했고
proxy에 name 프로퍼티를 추가했더니 실제로 target 객체에도 함께 추가됐다.

프로퍼티 할당 트랩이 따로 없는 관계로 proxy.name을 지정하면 프로퍼티에 값을 할당하는 기본 동작을 한다.

이와 같이 proxy는 단순히 target 객체를 감싼 것이고 기본 동작을 벗어나는 다른 변화를 일으키려면 트랩이 필요하다.

보통 프록시를 사용할 때 타킥 객체를 별도의 참조값 변수로 보관하지 않는 경우가 대부분이다.
처리기 참조값은 여러 프록시에서 해당 처리기를 재사용할 때에만 갖고 있으면 된다.
*/
var proxy = new Proxy({
	age: 12
}, {});
proxy.name = '성민';



/*
-
트랩
각양각색의 트랩을 객체에 적용할 수 있다.
값을 반환하는 트랩은 반환 시 지켜야할 규칙이 있다.
프록시는 반환값을 가로채고 필터링하여 규칙에 부합하는지 체크하며, 규칙에 맞지 않으면 TypeError 예외를 발생한다.
트랩 내부에서 this값은 항상 처리기를 가리킨다.
*/

// get(target, property, receiver) 메소드
/*
get 트랩은 점(.) 또는 중괄호 기호를 사용해서 프로퍼티 값을 조회할 때 사용한다.
타깃 객체, 프로퍼티명, 프록시, 3개의 인자를 받는다.

get 트랩 사용 규칙
> 타깃 객체 프로퍼티가 쓰기 금지, 설정 금지 데이터 프로퍼티면, 타깃 객체 프로퍼티 값과 동일한 값을 반환한다.
> 타깃 객체 프로퍼티가 [[Get]] 속성이 undefined인, 설정 금지 접근자 프로퍼티면 값은 undefined 다.
*/
var proxy = new Proxy({
	age: 12
}, 
{
	// get 트랩은 target 객체를 수색한 뒤, 찾으면 해당 프로퍼티 값을, 찾지 못하면 "찾지 못함" 문자열을 반환한다.
	get: function(target, property, receiver) {
		// receiver 는 접근하려는 프로퍼티가 위치한 객체의 참조값이다.
		if(property in target) {
			return target[property];
		}else {
			return "찾지 못함";
		}
	}
});
console.log(Reflect.get(proxy, "age")); // 12
console.log(Reflect.get(proxy, "name")); // 찾지 못함


// set(target, property, value, receiver)
/*
set 트랩은 할당 연산자, 또는 Reflect.set() 메소드로 프로퍼티 값을 지정할 때 실행된다.
타깃 객체, 프로퍼티명, 새 프로퍼티명, 수신자를 인자로 받는다.

set 트랩 사용 규칙
> 타깃 객체 프로퍼티가 쓰기 금지, 설정 금지 데이터 프로퍼티면, 값을 변경할 수 없으므로 false를 반환한다.
> 타깃 객체 프로퍼티가 [[Set]] 속성이 undefined 인, 설정 금지된 접근자 프로퍼티면, 값을 변경할 수 없으므로 false 를 반환한다.
*/
var proxy = new Proxy({}, {
	set: function(target, property, value, receiver) {
		target[property] = value;
		return true;
	}
});

Reflect.set(proxy, "name", "성민");
console.log(proxy, name); // 성민


// has(target, property)
/*
has 트랩은 in 연산자로 특정 프로퍼티가 있는지 확인할 때 실행된다.
타깃 객체, 프로퍼티명을 인자로 받아 준재 여부를 불리언 값으로 반환한다.

has 트랩 사용 규칙
> 타깃 객체 프로퍼티가 객체 자신의 프로퍼티이고 설정 금지 프로퍼티면 false 를 반환할 수 없다.
> 타긱 객체가 확장할 수 없고 프로퍼티가 객체 자신의 프로퍼티로 존재하면 false를 반환할 수 없다.
*/
var proxy = new Proxy({age: 12}, {
	has: function(target, property) {
		if(property in target) {
			return true;
		}else {
			return false;
		}
	}
});

console.log(Reflect.has(proxy, "name")); // false
console.log(Reflect.has(proxy, "age")); // true


// isExtensible(target)
/*
isExtensible 트랩은 Object.isExtensible() 메소드로 특정 프로퍼티의 확장가능 여부를 확인할 때 실행된다.
타깃 객체를 인자로 받아 확장 가능 여부를 불리언 값으로 반환한다.

isExtensible 트랩 사용 규칙
> 타깃 객체가 확장 가능하면 false 를 반환할 수 없다. 거꾸로, 확장 불가하면 true 를 반환할 수는 없다.
*/
var proxy = new Proxy({age: 12}, {
	isExtensible: function(target) {
		return Object.isExtensible(target);
	}
});

console.log(Reflect.isExtensible(proxy)); // true


// getPrototypeOf(target)
/*
getPrototypeOf 트랩은 Object.getPrototypeOf() 메소드나 __proto__ 프로퍼티로 내부 [[prototype]] 프로퍼티 값을 조회할 때 실행된다.
타깃 객체를 인자로 받는다.
이 메소드는 null 또는 객체를 반환한다. null 값은 타깃 객체가 아무 것도 상속하지 않은, 상속 체인의 끝부분에 있는 객체임을 뜻한다.

getPrototypeOf 트랩 사용 규칙
> 반환값은 반드시 객체, null 중 하나다.
> 타깃 객체가 확장 불가하면 실제 프로토타입을 반환한다.
*/
var proxy = new Proxy({age: 12, __proto__: {name: "성민"}}, {
	getPrototypeOf: function(target) {
		return Object.getPrototypeOf(target);
	}
});

console.log(Reflect.getPrototypeOf(proxy).name); // 성민


// setPrototypeOf(target, prototype)
/*
setPrototypeOf 트랩은 Object.setPrototypeOf() 메소드나 __proto__ 프로퍼티로 내부 [[prototype]] 프로퍼티 값을 지정할 때 실행된다.
타깃 객체, 할당할 프로퍼티 값을 인자로 받는다.
지정 성공 여부를 true/false로 반환한다.

setPrototypeOf 트랩 사용 규칙
> 타깃 객체가 확장 불가하면 false 를 반환한다.
*/
var proxy = new Proxy({}, {
	setPrototypeOf: function(target, value) {
		Reflect.setPrototypeOf(target, value);
		return true;
	}
});

Reflect.setPrototypeOf(proxy, {name: "성민"});

console.log(Reflect.getPrototypeOf(proxy).name); // 성민


// preventExtensions(target)
/*
preventExtensions 트랩은 Object.preventExtensions() 로 프로퍼티를 추가하지 못하게 차단할 때 실행된다.
인자는 target 객체 하나다.
확장 방지 성공 여부를 true/false 로 반환한다.

preventExtensions 트랩 사용 규칙
> 타깃이 확장 불가, 또는 그렇게 되었을 경우에만 true 를 반환한다.
*/
var proxy = new Proxy({}, {
	preventExtensions: function(target) {
		Object.preventExtensions(target);
		return true;
	}
});

Reflect.preventExtensions(proxy);

proxy.a = 12;
console.log(proxy.a); // undefined


// getOwnPropertyDescriptor(target, property)
/*
getOwnPropertyDescriptor 트랩은 Object.getOwnPropertyDescriptor() 메소드로 프로퍼티 서술자를 조회할 때 실행된다.
타깃 객체와 프로퍼티명을 인자로 받는다.
이 트랩은 서술자 객체 또는 undefined 둘 중 하나를 반환한다. 주어진 프로퍼티가 없으면 반환값은 undefined 다.

getOwnPropertyDescriptor 트랩 사용 규칙
> 객체, undefined 둘 중 하나를 반환한다.
> 주어진 프로퍼티가 타깃 객체 자신의 설정 불가한 프로퍼티라면 undefined 를 반환할 수 없다.
> 주어진 프로퍼티가 타깃 객체 자신의 프로퍼티이고 타긱 객체가 확장 불가하면 undefined 를 반환할 수 없다.
> 주어진 프로퍼티가 타긱 객체 자신의 프로퍼티가 아니고 타깃 객체가 확장 불가하면 undefined 를 반환한다.
> 주어진 프로퍼티가 타깃 객체 자신의 프로퍼티이거나, 타깃 객체 자신의 설정가능한 프로퍼티이면, 반환된 서술자 객체의 configurable 프로퍼티를 false로 바꿀 수 없다.
*/
var proxy = new Proxy({age: 12}, {
	getOwnPropertyDescriptor: function(target, property) {
		return Object.getOwnPropertyDescriptor(target, property);
	}
});

var descriptor = Reflect.getOwnPropertyDescriptor(proxy, "age");

console.log("Enumerable: " + descriptor.enumerable); // true
console.log("Writable: " + descriptor.writable); // true
console.log("Configurable: " + descriptor.configurable); // true
console.log("Value: " + descriptor.value); // 12


// defineProperty(target, property, descriptor)
/*
defineProperty 트랩은 Object.defineProperty() 메소드로 프로퍼티를 정의할 때 실행된다. 타깃 객체, 프로퍼티명, 서술자 객체를 인자로 받는다.
정의 성공 여부를 불리언 값으로 반환한다.

defineProperty 트랩 사용 규칙
> 타깃 객체가 확장 불가하고 프로퍼티가 존재하지 않을 땐 false를 반환한다.
*/
var proxy = new Proxy({}, {
	defineProperty: function(target, property, descriptor) {
		Object.defineProperty(target, property, descriptor);
		return true;
	}
});

Reflect.defineProperty(proxy, "name", {value: "성민"});

console.log(proxy.name); // 성민


// deleteProperty(target, property)
/*
deleteProperty 트랩은 Object.deleteProperty() 메소드나 delete 연산자로 프로퍼티를 삭제할 때 실행된다.
타깃 객체, 프로퍼티명을 인자로 받는다.
삭제 성공 여부를 불리언 값으로 반환한다.

deleteProperty 트랩 사용 규칙
> 주어진 프로퍼티가 타깃 객체 자신의 설정 불가 프로퍼티명 false를 반환한다.
*/
var proxy = new Proxy({age: 12}, {
	deleteProperty: function(target, property) {
		return delete target[property];
	}
});

Reflect.deleteProperty(proxy, "age");
console.log(proxy.age); // undefined


// enumerate(target)
/*
enumerate 트랩은 Reflect.enumerate() 메소드나 for...in 루프로 프로퍼티 키를 순회할 때 실행된다.
인자는 타깃 객체다.
객체의 열거 가능한 키를 담은 이터레이터 객체를 반환한다.

enumerate 트랩 사용 규칙
> 반드시 객체를 반환한다.
*/
var proxy = new Proxy({age: 12, name: "성민"}, {
	enumerate: function(target) {
		var arr = [];
		for(var p in target) {
			arr[arr.length] = p;
		}

		return arr[Symbol.iterator]();
	}
});

var iterator = Reflect.enumerate(proxy);

console.log(iterator.next().value); // age
console.log(iterator.next().value); // name
console.log(iterator.next().done); // true


// ownKeys(target)
/*
ownKeys 트랩은 Reflect.ownKeys(), Object.getOwnPropertyNames(), Object.getOwnPropertySymbols(), Object.keys() 메소드로 객체 자신의 프로퍼티 키를 조회할 때 실행된다. 이자는 타깃 객체다.
이 메소드는 Object.getOwnPropertyNames()와 비슷해서 객체의 열거 가능/열거 불가 프로퍼티 키를 반환하며 상속한 프로퍼티는 무시한다.
Reflect.ownKeys() 는 심볼, 문자열 키 둘 다 반환하지만 Object.getOwnPropertyNames()는 문자열 키만 반환한다는 점이 유일하게 다르다.

Object.getOwnPropertySymbols() 메소드는 심볼 타입의 열거 가능/열거 불가 프로퍼티를 반환하고 상속한 프로퍼티는 모두 무시한다.
이 메소드는 열거 가능 프로퍼티만 반환한다는 점을 제외하고는 Object.getOwnPropertyNames() 와 같다.
ownKeys 트랩은 객체 자신의 프로퍼티 키를 가진 배열을 반환한다.

ownKeys 트랩 사용 규칙
> 반환할 배열 원소의 타입은 문자열, 심볼 중 하나다.
> 반환할 배열은 target 객체 자신의 설정 불가 프로퍼티 키를 모두 가진다.
> 타깃 객체가 확장 불가할 경우 반환할 배열은 자신의 프로퍼티 + target 객체의 모든 키를 담고 있다.
*/
var s = Symbol();
var object = {age: 12, __proto__: {name: "성민"}, [s]: "Sumbol"};

Object.defineProperty(object, "profession", {
	enumerable: false,
	configurable: false,
	writable: false,
	value: "연예인"
});

var proxy = new Proxy(object, {
	ownKeys: function(target) {
		return Object.getOwnPropertyNames(target).concat(Object,getOwnPropertySymbols(target));
	}
});

console.log(Reflect.ownKeys(proxy)); // ["age", "profession", Symbol()]
console.log(Object.getOwnPropertyNames(proxy)); // ["age", "profession"]
console.log(Object.keys(proxy)); // ["age"]
console.log(Object.getOwnPropertySymbols(proxy)); // [Symbol()]


// apply(target, thisValue, arguments)
/*
타깃 객체가 함수면 프록시 호출 시 apply 트랩이 실행된다. 함수에서 apply(), call(), Reflect.apply() 메소드를 호출해도 실행된다.

인자는 3개다. 첫 번째 인자는 target 객체, 두 번째 인자는 타깃 함수의 this 값, 세번째 인자는 함수 호출 인자를 담은 배열이다.
타깃 함수를 프록시 없이 호출하면 결국 타깃 함수의 this 값과 동일하다.
*/
var proxy = new Proxy(function() {}, {
	apply: function(target, thisValue, arguments) {
		console.log(thisValue.name); // 성민
		return arguments[0] + arguments[1] + arguments[2];
	}
});

var obj = {
	name: "성민",
	f: proxy
};

var sum = obj.f(1, 2, 3);
console.log(sum); // 6


// construct(target, arguments)
/*
타깃 객체가 함수면 타깃을 생성자, new 연산자, Reflect.construct() 메소드를 이용하여 호출하면 construct 트랩이 실행된다.
target 객체와 생성자 호출 인자를 가진 배열을 인자로 받는다.
*/
var proxy = new Proxy(function() {}, {
	construct: function(target, arguments) {
		return {name: arguments[0]};
	}
});

var obj = new proxy("성민");
console.log(obj.name); // 성민


// Proxy.revocable(target, handler)
/*
리보커블 프록시(revocable proxy)는 도중에 취소가 가능한(즉, 스위치를 꺼버릴 수 있는)프록시다.

이 프록시를 생성하려면 Proxy.revocable() 메소드가 필요하다. 이 메소드는 생성자가 아니고 Proxy 생성자와 같은 인자를 받지만,
취소 가능 인스턴스를 직적 반환하지 않고 다음 두 프로퍼티를 지닌 객체를 반환한다.
> proxy: 취소 가능 프록시 객체
> revoke: 이 함수를 호출해야 proxy를 취소한다.

리보커블 프록시를 취소한 이후에 사용하려고 하면 TypeError 예외가 난다.
*/
var revocableProxy = Proxy.revocable({
		age: 12
	},
	{
		get: function(target, property, receiver) {
			if(property in target) {
				return target[property];
			}else {
				return "찾지 못함";
			}
		}
	}
);

console.log(revocableProxy.proxy.age); // 12

revocableProxy.revoke();

console.log(revocableProxy.proxy.name); // TypeError: proxy is revoked


// 프록시 용도
/*
> 원격 객체(remote object), 영속 객체(persistent object) 등의 가상화 객체(virtualized object) 생성
> 지연(lazy) 객체 생성
> 투명한 로깅(logging), 추적(tracion), 프로파일링(profiling) 등
> 임베디드 도메인 특정 언어(embedded domain specific language)
> 접근 통제 강화를 위한 일반적인 끼워넣기(interposing) 추상화
*/






// ----------






/*
-
클래스

자바스크립트 데이터 타입
자바스크립트 변수는 데이터(또는 값)를 가진다(저장한다). 데이터 타입(data type)은 데이터 변수의 유형이다.
자바스크립트에는 숫자, 문자, 불리언, null, undefined, 심볼, 객체의 7가지의 데이터 타입이 있다.
객체는 객체 자신이 아닌, 객체를 가리키는 참조값(메모리 주소)을 저장한다.
객체 아닌 데이터 타입은 원시 데이터 타입(primitive data type)이라고 한다.

상속
자바스크립트 객체는 내부 [[prototype]] 프로퍼티로 다른 객체의 프로토타입을 참조한다.
프로토타입 객체도 자신의 프로토타입을 갖고 있고, 프로토타입이 null이 될 때까지 체인은 이어진다.
null은 프로토타입 체인의 마지막 지점에 이르러 더 이상 참조할 프로토타입이 없을을 의미한다.

객체 프로퍼티에 접근할 때 그 프로퍼티가 객체에 있으면 객체 프로토타입에서 프로퍼티를 찾지만, 객체에 없으면 프로토타입 객체의 프로토타입을 찾아 나선다.
그리고 프로토타입 체인에서 null이 나올 때까지 샅샅이 뒤진다. 자바스크립트 상속은 이런 식으로 이루어진다.

자바스크립트 객체는 단 하나의 프로토타입을 가지므로 단일 상속만 지원한다.
객체 리터럴로 객체를 생성할 경우, 특수 프로퍼티 __proto__ 를 이용하거나 Object.setPrototypeOf() 메소드로 객체 프로토타입 자체를 할당한다.
아직 __proto__ 를 지원하지 않는 브라우저가 많고 Object.setPrototypeOf()는 좀 석연찮은 구석이 있어서
Object.create() 메소드로 주어진 프로토타입을 지닌 새 객체를 생성하는게 보통이다.
*/
var object1 = {
	name: "성민",
	__proto__: {age: 24}
};

var object2 = {
	name: "성민"
};
Object.setPrototypeOf(object2, {age: 24});

var object3 = Object.create({age: 24}, {name: {value: "성민"}});

/*
상속받은 {age: 24} 객체를 기반 객체(base object), 상위 객체(super object), 부모 객체(parent object)라고 한다.
또 다른 객체를 상속한 {name: "성민"} 같은 객체를 파생 객체(derived object), 하위 객체(sub object), 자식 객체(child object)라고 부른다.
*/
console.log(Object1.name + " " + Object1.age); // 성민 24
console.log(Object2.name + " " + Object2.age); // 성민 24
console.log(Object3.name + " " + Object3.age); // 성민 24

/*
생성자로 객체를 생성할 경우, 새 객체의 프로토타입은 함수 객체의 prototype 프로퍼티를 참조한다.
이 프로퍼티는 기본적으로 함수 자신을 가리키는 constructor 라는 프로퍼티 하나로만 구성된 객체다.
*/
function Student() {
	this.name = "성민";
}
var instance = new Student();

console.log(instance.__proto__.constructor == Student); // true
console.log(instance.__proto__ == Student.prototype); // true

/*
생성자 인스턴스에 새 메소드를 추가하려면 생성자의 prototype 프로퍼티에 메소드를 추가해야지,
생성자 비디에서 this 키워드로 메소드를 추가하면 안 된다.
모든 생성자 인스턴스가 메소드 사본을 갖고 있기 때문에 메모리 측면에서 비효율적이다.
생성자 prototype 프로퍼티에 메소드를 추가하면 모든 인스턴스가 공유하는 함수 사본 하나만 생긴다.
*/
function Student(name) {
	this.name = name;
}
Student.prototype.printName = function() {
	console.log(this.name);
};

var s1 = new Student("수지");
var s2 = new Student("민호");

function School(name) {
	this.name = name;
	this.printName = function() {
		console.log(this.name);
	}
}

var s3 = new School("이학교");
var s4 = new School("저학교");

console.log(s1.printName == s2.printName); // true
console.log(s3.printName == s4.printName); // false



/*
원시 데이터 타입 생성자
불리언, 문자열, 숫자 등의 원시 데이터 타입은 각자 생성자가 있고, 이들 생성자는 저마다 원시 타입을 감싸는 일을 한다.
예를 들어, String 생성자는 내부 [[PrimitiveValue]] 프로퍼티에 실제 원시값을 담은 문자열 객체를 생성한다.

런타임 시점에서 필요할 때 언제라도 원시값을 해당 타입의 생성자로 감싸고 그렇게 만들어진 객체가 실행에 걸림돌이 되지 않도록 마치 원시값처럼 취급한다.
*/
var s1 = "문자열";
var s2 = new String("문자열");

console.log(typeof s1); // string
console.log(typeof s2); // object

console.log(s1 == s2); // true
console.log(s1.length); // 6

/*
분명히 s1은 원시 타입, s2는 객체지만 == 연산자로 비교하면 결과는 true다.
원시 타입 s1에 프로퍼티가 있을 리 만무하지만 length 프로퍼티를 접근하고 있다.
그 비결은 런타임 시점에 다음과 같이 변환하여 실행하는 것이다.
*/
console.log(s1 == s2.valueOf());
console.log((new String(s1)).length);

/*
원시값을 해당 생성자로 감싸고 객체는 필요할 때 원시값으로 처리하므로 오류는 발생하지 않는다.
ES6 부터는 원시 타입에 해당 함수를 생성자로 호출하는 일이 금지된다. 즉, 원시 타입을 해당 객체로써 명시적으로 감싸는 건 불가능하다.

참고로 원시타입 null, undefined 는 생성자가 아예 없다.
*/



/*
클래스 다루기
자바스크립트 객체 지향 모델이 생성자/프로토타입 기반의 상속에 기초하고 있음을 깨달았을 것이다.
ES6 클래스는 기존 모델에 단지 새롭게 추가된 구문일 뿐, 전혀 새로운 객체 지향 모델이 아니다.

클래스 정의
함수를 선언과 표현식, 두 가지 방법으로 정의한듯, 클래스에도 선언과 표현식, 두 가지 정의 방법이 있다.
*/
// 클래스 선언
class Student {
	constructor(name) {
		this.name = name;
	}
}
var s1 = new Student("수지");
console.log(s1.name); // 수지

// 기존 함수 형태
function School(name) {
	this.name = name;
}
var s2 = new School("학교");
console.log(s2.name); // 학교

/*
클래스는 함수로 취급하며 내부적으로 클래스명은 함수명으로, constructor 메소드 바디는 함수 바디로 간주한다.
클래스 바디 안의 모든 코드는 기본적으로 strict 모드로 실행된다.
*/
console.log(typeof Student == typeof School); // true


// 클래스 표현식
var Student = class {
	constructor(name) {
		this.name = name;
	}
}
var s1 = new Student("성민");
console.log(s1.name); // 성민

// 프로토타입 메소드
class Person {
	constructor(name, age) {
		this.name = name;
		this.age = age;
	}

	printProfile() {
		console.log('이름: ' + this.name + ', 나이: ' + this.age);
	}
}
var p = new Person("성민", 12);
p.printProfile();

console.log("printProfile" in p.__proto__); // true
console.log("printProfile" in Person.prototype); // true



/*
get/set 메소드
ES5 이전엔 접근자 프로퍼티를 객체에 추가하는 유일한 방법은 Object.defineProperty() 뿐이었지만
ES6 부터는 메소드 앞에 get, set을 붙일 수 있고 객체 리터럴 또는 클래스에 추가하여 접근자 프로퍼티의 get/set속성을 정의할 수 있다.
*/
class Person {
	constructor(name) {
		this._name = name;
	}

	get name() {
		return this._name;
	}

	set name(name) {
		this._name = name;
	}
}

var p = new Person("성민");
console.log(p._name); // 성민
p._name = "진은";
console.log(p._name); // 진은



/*
제너레이터 메소드
객체 리터럴의 단축 메소드를 제너레이터 메소드로 다루거나, 
클래스의 메소드를 제너레이터 메소드로 취급하려면 앞에 그냥 * 기호를 달아주면 된다.
*/
class myClass {
	* generator_function() {
		yield 1;
		yield 2;
		yield 3;
		yield 4;
		yield 5;
	}
}

var obj = new myClass();
let generator = obj.generator_function();

console.log(generator.next().value); // 1
console.log(generator.next().value); // 2
console.log(generator.next().value); // 3
console.log(generator.next().value); // 4
console.log(generator.next().value); // 5
console.log(generator.next().done); // true



/*
정적 메소드
클래스 바디에서 메소드명 앞에 static 을 붙인 메소드를 정적 메소드(static method) 라고 한다.
클래스 prototype 프로퍼티가 아닌, 클래스의 자체 메소드다.
예를 들어, String.fromCharCode() 메소드는 String 생성자의 정적 메소드, 즉 String 함수 자신의 고유 프로퍼티다.
*/
class Student {
	constructor(name) {
		this.name = name;
	}

	static findName(student) {
		return student.name;
	}
}

var s = new Student("성민");
var name = Student.findName(s);

console.log(name); // 성민


// 함수 버전
function Student(name) {
	this.name = name;
}
Student.findName = function(student) {
	return student.name;
};

var s = new Student("성민");
var name = Student.findName(s);

console.log(name); // 성민



/*
클래스의 상속 구현
extends 절로 클래스가 (클래스로 정의했거나 그렇지 않을 수도 있는) 다른 생성자의 정적/비정적 프로퍼티를 상속할 수 있게 한 것이다.

super 키워드는 다음 두 가지 용도로 쓴다.
> 클래스 constructor 메소드에서 부모 생성자를 호출한다.
> 클래스 메소드 내부에서 부모 생성자의 정적/비정적 메소드를 참조한다.

자식 클래스에 constructor 메소드가 없으면 부모 클래스의 constructor 메소드가 자동으로 호출된다.
*/
function A(a) {
	this.a = a;
}
A.prototype.printA = function() {
	console.log(this.a);
}

class B extends A {
	constructor(a, b) {
		super(a);
		this.b = b;
	}

	printB() {
		console.log(this.b);
	}

	static sayHello() {
		console.log("안녕하세요.");
	}
}

class C extends B {
	constructor(a, b, c) {
		super(a, b);
		this.c = c;
	}

	printC() {
		console.log(this.c);
	}

	printAll() {
		this.printC(); // 3
		super.printB(); // 2
		super.printA(); // 1
	}
}

var obj = new C(1, 2, 3);
obj.printAll();

C.sayHello(); // 안녕하세요.



/*
조합 메소드명
정적/비정적 클래스의 메소드명, 객체 리터럴의 메소드명은 런타임 시점에 표현식으로 조합할 수 있다.
*/
class myClass {
	static ["my" + "Method"]() {
		console.log("안녕하세요.");
	}
}
myClass["my" + "Method"](); // 안녕하세요.



/*
프로퍼티 속성
클래스를 이용한 생성자의 정적/비정적 프로퍼티 속성은
함수를 사용할 때와 몇가지 차이점이 있다.
> 정적 메소드는 쓰기 가능, 설정 가능이지만 열거 불가다.
> 클래스의 prototype와 prototype.constructor 프로퍼티는 쓰기 불가, 열거 불가, 설정 불가다.
> prototype 프로퍼티의 속성은 쓰기 가능, 설정 가능이지만 열거 불가다.

클래스는 호이스팅 안된다!
함수는 자신이 정의되기 전, 즉 함수를 정의한 코드 앞부분에서도 호출이 가능하지만, 
클래스는 그렇게 하면 ReferenceError 예외가 발생한다.
*/
myFunc();
function myFunc() {}

var obj = new myClass(); // ReferenceError 예외발생
class myClass {}



/*
생성자 메소드 결과를 오버라이딩
constructor 메소드는 내부에 return 문이 없을 경우 새 인스턴스를 반환한다.
return 문이 있으면 해당 값을 반환한다.
*/
class myClass {
	constructor() {
		return Object.create(null);
	}
}

console.log(new myClass() instanceof myClass); // false



/*
정적 접근자 프로퍼티, Symbol.species
정적 접근자 프로퍼티, @@species는 부모 생성자 메소드가 새 인스턴스를 반환하면 어떤 생성자를 써야 할 지 알려줘야 할 때
자식 생성자에 선택적으로 추가한다.
자식 생성자에 @@species가 따로 없으면 부모 생성자 메소드는 기본 생성자를 이용한다.

배열 객체의 map() 메소드가 새 Array 인스턴스를 반환하는 것이 좋은 사례다. 
배열 객체를 상속한 객체의 map 메소드를 호출하면 어처구니 없게도 Array 생성자가 아닌, 자식 생성자의 새 인스턴스가 반환된다.
이런 이유로 ES6에 @@species 프로퍼티가 도입되어 이젠 기본 생성자 대신 다른 생성자를 사용하라는 신호를 보낼 수 있게 되었다.
*/
class myCustomArray1 extends Array {
	static get [Symbol.species]() {
		return Array;
	}
}
class myCustomArray2 extends Array {}


var arr1 = new myCustomArray1(0, 1, 2, 3, 4);
var arr2 = new myCustomArray2(0, 1, 2, 3, 4);
console.log(arr1 instanceof myCustomArray1); // true
console.log(arr2 instanceof myCustomArray2); // true


arr1 = arr1.map(function(value) {
	return value + 1;
});
arr2 = arr2.map(function(value) {
	return value + 1;
});
console.log(arr1 instanceof myCustomArray1); // false
console.log(arr2 instanceof myCustomArray2); // true

console.log(arr1 instanceof Array); // true
console.log(arr2 instanceof Array); // false

/*
자바스크립트 라이브러리를 제작하는 개발자라면 새 인스턴스를 반환할 때 생성자 메소드가 항상 @@species 프로퍼티를 참조하도록 작성하길 바란다.

부모 생성자에 기본 @@species 프로퍼티를 정의하고 싶지 않을 경우 if...else 조건문으로 @@species 프로퍼티의 정의 여부를 확인할 수도 있지만
위 패턴을 사용하는 것이 좋다. 내장 메소드 map() 또한 그렇게 작성되어 있다.

ES6 부터 자바스크립트 생성자의 모든 내장 메서드는 새 인스턴스 반환 시 @@species 프로퍼티를 조사한다.
이를 테면, 배열, 맵, 배열버퍼, 프라미스 등의 생성자는 인스턴스를 생성하여 반환할 때 @@species를 찾아본다.
*/

// myArray1 가 라이브러리 일부라고 가정한다.
class myArray1 {
	// 기본 @@species. 자식 클래스는 이 프로퍼티를 상속한다.
	static get [Symbol.species]() {
		// 기본 생성자
		return this;
	}

	mapping() {
		return new this.constructor[Symbol.species]();
	}
}

class myArray2 extends myArray1 {
	static get [Symbol.species]() {
		return myArray1;
	}
}

var arr = new myArray2();
console.log(arr instanceof myArray2); // true

arr = arr.mapping();
console.log(arr instanceof myArray1); // true



/*
암시적 파라미터, new.target
ES6 는 함수에 전부 new.target 파라미터를 추가했다.
중간의 점(.)도 파라미터명의 일부다.
이 파라미터의 기본값은 undefined 지만, 생성자로 함수 호출 시 다음 조건에 따라 값이 달라진다.
> 생성자를 new 키워드로 호출하면 new.target 은 이 생성자를 가리킨다.
> 생성자를 super 키워드로 호출하면 new.target 값을 super 에 해당하는 생성자의 new.target 값이다.

화살표 함수에서는 자신을 둘러싸고 있는 화살표 아닌 함수의 new.target 값을 가리킨다.
*/
function myConstructor() {
	console.log(new.target.name);
}

class myClass extends myConstructor {
	constructor() {
		super();
	}
}

var obj1 = new myClass(); // 'myClass' 출력
var obj2 = new myConstructor(); // 'myConstructor' 출력



/*
객체 리터럴에 super 사용
super 키워드는 객체 리터럴의 단축 메소드에서도 사용할 수 있다.
객체 리터럴로 정의한 객체의 [[prototype]] 프로퍼티와 같은 값이다.
객체 리터럴의 super 는 자식 객체가 오버라이드한 프로퍼티를 접근하는 용도로 쓴다.
*/
var obj1 = {
	print() {
		console.log("안녕하세요.");
	}
}

var obj2 = {
	print() {
		super.print();
	}
}

Object.setPrototypeOf(obj2, obj1);
obj2.print(); // 안녕하세요.






// ----------






/*
-
모듈러 프로그래밍

자바스크립트 모듈이란?
모듈러 프로그래밍은 프로그램과 라이브러리를 모듈 단위로 잘개 나누는 행위다.
자바스크립트에서 모듈이란 프로그램/라이브러리에서 연관된 객체, 함수, 기타 콤포넌트을 함께 말아넣은 콜렉션으로, 
나머지 프로그램/라이브러리의 스코프와는 분리되어 있다.

외부 프로그램에 특정 변수를 익스포트하여 모듈로 감싼 컴포넌트에 접근할 수 있다.
프로그램은 모듈과 이 모듈이 익스포트한 변수를 임포트하여 사용한다.

모듈은 하위 모듈(sub module)로 더 잘게 나뉘어지므로 모듈 간 계층 관계가 형성된다.

모듈러 프로그래밍은 다음과 같은 이점이 있다.
> 코드를 여러 모듈로 분리하여 깔끔하게 구획하고 조직화할 수 있다.
> 전역 스코프를 통해 인터페이스하지 않고 모듈 각자 자신의 스코프를 가지므로 전역 변수 사용을 줄일 수 있고 그로 인한 문제점을 예방할 수 있다.
> 타 프로젝트에서도 똑같은 모듈을 임포트하여 사용할 수 있으므로 코드 재사용성이 좋아진다.
> 특정 모듈에 버그가 한정되므로 디버깅이 쉽다.

모듈 구현 - 기존 방법
ES5 이전의 자바스크립트는 모듈을 자체 지원하지 않았던 까닭에 개발자들은 서드 파티 라이브러리나 자신만의 꼼수를 동원해야 했다.
즉시 실행함수 표현식(IIFE, Immediately-invoked function expression), 비동기 모듈 정의(AMD, Asynchronous Module Definition), 커먼 JS, 만능 모듈 정의(UMD, Universal Module Definition) 등
갖가지 방법이 있었지만 자바스크립트 자체의 기능은 아니어서 많은 문제점이 있었다.
*/

// 즉시 실행 함수 표현식 (IIFE)
// 이 모듈은 프로그램에 완벽하게 독립적으로 동작하면서도 소스코드를 복사하거나 별도의 파일로 간단히 임포트하면 다른 프로그램에서도 그대로 가져다 쓸 수 있다.
(function(window) {
	var sum = function(x, y) {
		return x + y;
	};

	var sub = function(x, y) {
		return x - y;
	};

	var math = {
		findSum: function(a, b) {
			return sum(a, b);
		},
		findSub: function(a, b) {
			return sub(a, b);
		}
	};
})(window);


// 비동기 모듈 정의 (AMD)
/*
AMD는 브라우저에서 모듈을 구현하기 위해 만든 명세로 
브로우저의 한계를 염두에 두고 웹 페이지 로딩을 차단하지 않고도 비동기적으로 모듈을 임포트 할 수 있게 설계됐다.
AMD는 브라우저에 내장된 기능이 아니므로 AMD 라이브러리가 필요하다.
리콰이어JS(RequireJS)는 가장 잘 알려진 AMD 라이브러리다.
*/
// math.js
define(function() {
	var sum = function(x, y) {
		return x + y;
	};

	var sub = function(x, y) {
		return x - y;
	};

	var math = {
		findSum: function(a, b) {
			return sum(a, b);
		},
		findSub: function(a, b) {
			return sub(a, b);
		}
	};
	return math;
});

// math.js 를 불러와 사용하는 index.js
require(["math"], function(math) {
	console.log(math.findSum(1, 2)); // 3
	console.log(math.findSub(1, 2)); // -1
});


// 커먼JS
// 커먼JS는 노드JS에서 모듈을 구현하는 명세다. 각 모듈은 개별 파일로 구현하며 비동기적으로 임포트 한다.

// math.js
var sum = function(x, y) {
	return x + y;
};

var sub = function(x, y) {
	return x - y;
};

var math = {
	findSum: function(a, b) {
		return sum(a, b);
	},
	findSub: function(a, b) {
		return sub(a, b);
	}
};

exports.math = math;

// math.js 를 불러와 사용하는 index.js
var math = require("./math").math;
console.log(math.findSum(1, 2)); // 3
console.log(math.findSub(1, 2)); // -1


// 만능 모듈 정의
/*
제각기 고유한 방법으로 모듈을 생성하고 임포트하는 IIFE, AMD, 커먼JS 세 가지 상이한 명세
모듈 명세에 구애 받지 않고 서드 파티 모듈을 프로그램에 임포트할 수 있게 해준다.

returnExports는 가장 많이 쓰는 UMD 기법으로 모듈별로 파일이 존재한다.
*/
// math.js
(function(root, factory) {
	// 환경 파악
	if(typeof define === 'function' && define.amd) {
		define([], factory);
	}else if(typeof exports === 'object') {
		module.exports = factory();
	}else {
		root.returnExports = factory();
	}
})(this, function() {
	// 모듈정의
	var sum = function(x, y) {
		return x + y;
	};

	var sub = function(x, y) {
		return x - y;
	};

	var math = {
		findSum: function(a, b) {
			return sum(a, b);
		},
		findSub: function(a, b) {
			return sub(a, b);
		}
	};

	return math;
});


// ES6 모듈 생성
// ES6 모듈 익스포트
/*
ES6 모듈은 모듈마다 개별 .js 파일에 자바스크립트 코드로 구현하며 원하는 개수만큼 변수를 익스포트할 수 있다.
ES6 모듈은 변수, 함수, 클래스, 기타 엔티티를 익스포트할 수 있다.
*/

// 모듈에서 변수를 익스포트시 사용하는 export 문은 다음과 같은 형식들이 있다.
export {variableName}; // 변수를 익스포트한다.
export {variableName1, variableName2, variableName3}; // 변수를 여러개 익스포트한다.
export {variableName as myvariableName}; // 변수를 다른 이름으로 익스포트한다.
export {variableName1 as myvariableName1, variableName2 as myvariableName2}; // 여러 변수를 상이한 이름으로 익스포트한다.
export {variableName as default}; // 기본 이름을 쓴다.
export {variableName as default, variableName1 as myvariableName1, variableName2}; // 여러개를 상이한 방법으로 익스포트한다.
export default function() {}; // 변수 이름 대신 표현식을 넣는다.
export {variableName1, variableName2} from "myvariableName"; // 하위 모듈에서 익스포트한 변수를 익스포트한다.
export * from "variableName"; // 하위 모듈에서 익스포트한 모든 변수를 익스포트한다.

// export 문에서 중요한 점을 간추리면 다음과 같다.
/*
> export 문은 모듈 어디에서나 쓸 수 있다. 모듈 끝에서만 써야 하는 건 아니다.
> 모듈 내에서 export 문은 무제한 사용할 수 있다.
> 그때그때 변수를 익스포트하는 건 불가능하다. 예를 들어, if...else 조건문에 export 문을 쓰면 에러가 난다. 모듈 구조는 정적이라고, 즉 익스포트는 컴파일 시점에 결정된다고 보면 된다.
> 똑같은 변수명/별명을 계속 익스포트할 수는 없지만 동일한 변수를 서로 다른 별명으로 여러 번 익스포트하는 건 가능하다.
> 모듈 코드는 엄격 모드로 실행된다.
> 익스포트한 변수값은 자신을 익스포트한 모듈 내에서 변경할 수 있다.
*/

// ES6 모듈 임포트
// 모듈을 임포트하는 import 문은 다음과 같은 형식들이 있다.
import x from "module-relative-path"; // 기본 별명을 임포트한다. x는 기본 별명의 별명이다.
import {x} from "module-relative-path"; // x를 임포트한다.
import {x1 as x2} from "module-relative-path"; // x2는 x1의 별명이다.
import {x1, x2} from "module-relative-path"; // x1, x2를 임포트한다.
import {x1, x2 as x3} from "module-relative-path"; // x1, x2를 임호트 한다. x3은 x2의 별명이다.
import x, {x1, x2} from "module-relative-path"; // x1, x2와 별명을 임포트한다. x는 기본 별명의 별명이다.
import "module-relative-path"; // 그냥 모듈을 임포트한다. 모듈에서 익스포트된 변수는 전혀 임포트하지 않는다.
import * as x from "module-relative-path"; // 변수 전체를 임포트한 뒤 x라는 객체로 감싼다. 기본 별명도 임포트한다.
import x1, * as x2 from "module-relative-path"; // 기본 별명에 별명을 줬다.

// import 문에서 중요한 점을 간추리면 다음과 같다.
/*
> 변수를 별명으로 임포트하면 해당 변수는 실제 변수명이 아닌, 별명으로 참조해야 한다. 즉, 실제 변수명은 가려지고 별명만 보이는 셈이다.
> import 문은 익스포트된 변수의 사본을 임포트하는 게 이나다. 오히려 변수를 임포트하는 프로그램의 스코프에서 쓸 수 있는 변수가 된다. 따라서 모듈 내에서 익스포트된 변수를 고치면 이 변수를 임포트한 프로그램에도 반영된다.
> 임포트한 변수는 읽기 전용이므로 이를 익스포트한 모듈의 스코프를 벗어난 위치에 할당은 불가능하다.
> 모듈은 자바스크립트 엔진의 단일 인스턴스에서 딱 한번 임포트할 수 있다. 다시 임포트하려고 하면 앞에서 임포트한 모듈 인스턴스를 재사용한다.
> 모듈은 그때그때 임포트할 수 없다. 예를 들어, if...else 조건문에 import 문을 쓰면 에러가 난다. 모듈 구조는 정적이라고, 즉 임포트는 컴파일 시점에 결정된다고 보면 된다.
> ES6 임포트는 자바스크립트 자체 기능이고 모듈 임포트와 변수 익스포트는 곧 바로 결정되지 않기 때문에 AMD, 커먼JS의 임포트보다 빠르다. 따라서 자바스크립트 엔진이 성능 최적화를 수행하기가 유리하다.
*/


/*
모듈 로더
모듈 로더는 모듈 임포트를 하는 자바스크립트 엔진 콤포넌트다.
import 문은 내장 모듈 로더로 모듈을 임포트한다.

내장 모듈 로더는 자바스크립트 환경마다 로딩 체계가 제각각이다. 가령, 브라우저에서 모듈을 임포트하면 서버에서 모듈이 로딩되지만
노드JS 환경에서는 파일 시스템에서 로딩한다.

모듈 로더는 다양한 환경에서 서로 다른 방식으로 성능을 최적화하는 방향으로 모듈을 로딩한다.
이를테면 브라우저는 모듈 로더가 로딩 도중 웹 페이지 로딩을 차단하지 않게 모듈을 비동기적으로 로딩/실행한다.

모듈 로더 API를 이용하면 모듈 로딩을 가로채고 그때그때 모듈을 가져오는 등 커스터마이징해서 내장 모듈 로더와 프로그램 연동을 할 수 있다.

직접 개발자가 모듈 로더를 작성할 수도 있다.
모듈 로더에 관한 명세는 ES6에 따로 없고 WHATWG 브라우저 표준 단체가 주도하는 별도의 표준이 있다.
자세한 내용은 http://whatwg.github.io/loader/ 를 참고하자.

ES6 명세에는 import/export 문에 대해서만 규정되어 있다.
*/


/*
브라우저에 모듈 사용
<script> 태그 안의 코드는 태그 자체의 동기적인 성격 탓에 브라우저 모듈의 비동기성과 호환되지 않아 import 문을 지원하지 않는다.
대신에 <module>이라는 새로운 태그로 모듈을 임포트한다.

<module> 태그를 쓰면 하나의 모듈로 스크립트를 정의할 수도 있고 
이 모듈은 import 문으로 다른 모듈을 임포트한다.

모듈을 <script> 태그로 임포트하려면 모듈 로더 API를 사용해야 한다.
<module> 태그 이야기는 ES6 명세에 없다.
*/


/*
eval() 함수에서 모듈 사용
import/export 문은 eval() 함수에 쓸 수 없다.
eval() 함수에서 모듈을 임포트하려면 모듈 로더 API를 써야 한다.
*/


/*
기본 익스포트 vs 명명된 익스포트
기본 별명으로 변수를 익스포트하는 걸 기본 익스포트(default export)라고 한다.
당연히 모듈 내에서 별명은 한번밖에 사용할 수 없으니 기본 익스포트는 딱 하나뿐이다.

기본 익스포트를 제외한 익스포트는 모두 명명된 익스포트(named export)다.

한 모듈 내에서는 기본 익스포트, 명명된 익스포트 둘 중 하나만 쓰는게 좋다.
섞어 쓰는 건 별로 권하고 싶지 않다.

기본 익스포트가 변수 한 개만 익스포트할 때 쓰는 반면, 명명된 익스포트는 변수 여럿을 익스포트하기 위해 쓴다.
*/


/*
종합 예제
math.js 파일을 생성한다.
math_modules 디렉터리를 만들고 그 안에 logarithm.js, trigonometry.js 두 파일을 생성한다.
math.js 는 루트 모듈, logarithm.js, trigonometry.js 는 하위 모듈이다.
*/

// logarithm.js
var LN2 = Math.LN2;
var N10 = Math.LN10;

function getLN2() {
	return LN2;
}

function getLN10() {
	return LN10;
}

// export 문으로 함수를 익스포트 했다.
export {getLN2, getLN10};


// trigonometry.js
var cos = Math.cos;
var sin = Math.sin;

function getSin(value) {
	return sin(value);
}

function getCos(value) {
	return cos(value);
}

export {getCos, getSin};

/*
프로그램에서는 라이브러리가 익스포트한 변수 중에서 하나밖에 필요하지 않을 수 있기 때문에 하위 계층의 모듈은 모든 변수를 개별적으로 익스포트해야 한다.

여기서는 프로그램이 모듈과 특정 함수를 직접 임포트할 수 있다.
모듈이 하나만 필요한데 전체 모듈을 로딩하는 건 성능 상 바람직하지 않다.
*/

// 루트모듈 math.js
import * as logarithm from "math_modules/logarithm";
import * as trigonometry from "math_modules/trigonometry";

export default {
	logarithm: logarithm,
	trigonometry: trigonometry
}

/*
라이브러리 함수는 하나도 없다.
프로그램에서 라이브러리를 완전히 임포트하기는 쉬워졌다.
하위 모듈 임포트 후 메인 프로그램으로 익스포트한 변수들을 익스포트한다.

이처럼 logarithm.js 및 trigonometry.js 스크립트가 다른 하위 모듈에 의존적일 경우,
두 하위 모듈은 이미 임포트된 상태이므로 math.js 모듈은 하위 모듈들을 임포트하면 안 된다.

다음은 프로그램에서 라이브러리를 완전히 임포트하는 코드다.
*/
import math from "math";

console.log(math.trigonometry.setSin(3));
console.log(math.logarithm.getLN2(3));


