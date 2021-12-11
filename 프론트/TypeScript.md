
> 참고페이지  
https://typescript-kr.github.io/  

- 핸드북  
https://joshua1988.github.io/ts/guide/enums.html#%EB%AC%B8%EC%9E%90%ED%98%95-%EC%9D%B4%EB%84%98  
https://typescript-kr.github.io/pages/tutorials/typescript-in-5-minutes.html  

- 한눈에 보는 타입스크립트  
https://heropy.blog/2020/01/27/typescript/  

- 타입스크립트 고급  
https://typescript-kr.github.io/pages/advanced-types.html  
https://velog.io/@zeros0623/TypeScript-%EA%B3%A0%EA%B8%89-%ED%83%80%EC%9E%85  

- 타입스크립트 + 리덕스  
https://react-etc.vlpt.us/07.typescript-redux.html  


-----


# 타입스크립트 프로젝트 생성
```bash
$ npm install -g typescript
$ mkdir <프로젝트명>
$ cd <프로젝트명>
$ tsc --init
```


## Webpack
https://webpack.js.org/guides/typescript/
```bash
$ yarn add --dev webpack webpack-cli webpack-dev-server 
$ yarn add --dev babel-loader ts-loader @babel/preset-env @babel/preset-typescript
```


## Babel
.babelrc 있다면 해당 파일을 먼저 참조 하며,  
없을 경우 webpack options에 부여한 presets plugins 을 참조한다. (babel-loader의 typescript preset을 사용)   
(webpack 설정 중, @babel/preset-env 의미는 자동으로 브라우저 polyfill 을 맞춘다는 의미)  


## Webpack 3 부터는 기본적으로 json-loader 를 포함하고 있다.
import data from 'data.json' 으로 쓰면되는데, typescript 를 같이 쓸 경우 typescript에 내에서 해당 내역을 처리하지 못한다.    
(json type을 typescript에 알려주어야 함)  

```typescript
// tsconfig.json
{
	//...
	"typeRoots": [
		"typings.d.ts"
	],
}
```
```typescript
// typings.d.ts
declare module "json!*" {
	const json: any;
	export = json;
}
```


## webpack-dev-server 실행시 오류 'Error: Cannot find module 'webpack-cli/bin/config-yargs'
webpack 과 webpack-dev-server 버전이 서로간 충돌  
```
"webpack": "4.41.2",
"webpack-cli": "3.3.10",
"webpack-dev-server": "^3.11.0",
```


## eslint
이전에는 TS로 작업할 때 tslint를 썼지만, eslint로 커버가 가능하기 때문에 tslint는 deprecated 될 예정   
```bash
$ yarn add eslint eslint-plugin-import @typescript-eslint/parser
```


-----


## DOM Type 
https://typescript-kr.github.io/pages/tutorials/dom-manipulation.html  

https://microsoft.github.io/PowerBI-JavaScript/modules/_node_modules_typedoc_node_modules_typescript_lib_lib_dom_d_.html


## Element Type   
https://microsoft.github.io/PowerBI-JavaScript/interfaces/_node_modules_typedoc_node_modules_typescript_lib_lib_dom_d_.htmlelement.html  
```typescript
const content: HTMLElement = document.querySelector('#content');
```


# 유틸리티
https://www.typescriptlang.org/docs/handbook/utility-types.html  
> TypeScript는 공통 타입 변환을 용이하게 하기 위해 몇 가지 유틸리티 타입을 제공  
* `Partial<T>` : T의 모든 프로퍼티를 선택적으로 만드는 타입을 구성
* `Readonly<T>` : T의 모든 프로퍼티를 읽기 전용(readonly)으로 설정한 타입을 구성
* `Record<K,T>` : 타입 T의 프로퍼티의 집합 K로 타입을 구성
* `Pick<T,K>` : T에서 프로퍼티 K의 집합을 선택해 타입을 구성
* `Omit<T,K>` : T에서 모든 프로퍼티를 선택한 다음 K를 제거한 타입을 구성
* `Exclude<T,U>` : T에서 U에 할당할 수 있는 모든 속성을 제외한 타입을 구성
* `Extract<T,U>` : T에서 U에 할당 할 수 있는 모든 속성을 추출하여 타입을 구성
* `NonNullable<T>` : T에서 null 과 undefined를 제외한 타입을 구성
* `Parameters<T>` : 함수 타입 T의 매개변수 타입들의 튜플 타입을 구성
* `ConstructorParameters<T>`
* `ReturnType<T>`
* `InstanceType<T>`
* `Required<T>`
* `ThisParameterType`
* `OmitThisParameter`
* `ThisType<T>`


-----


## 타입스크립트 참고
- intersectionobserver TypeScript 의 기본 타입을 재정의할 경우 에러
`Type 'string' is not assignable to type 'number'` 
`Type error: Type 'Document | Element | null' is not assignable to type 'Element | null | undefined'.`
`Type 'Document' is missing the following properties from type 'Element': assignedSlot, attributes, classList, className, and 58 more.`
https://microsoft.github.io/PowerBI-JavaScript/interfaces/_node_modules_typedoc_node_modules_typescript_lib_lib_dom_d_.intersectionobserver.html  


# cli 타입 체크 명령
```
tsc --noemit
```


-----


## 타입주석 - 타입선언
타입스크립트는 자바스크립트 변수 선언문을 확장해 다음과 같은 형태로 `타입을 명시`할 수 있습니다.  
이를 `타입주석(type annoration)`이라고 합니다.  
```
let 변수이름: 타입 [= 초깃값]
const 변수이름: 타입 = 초깃값
```

```typescript
// 불린: Boolean
let isBoolean: boolean;
let isDone: boolean = false;

// 숫자: Number
let num: number;
let integer: number = 6;
let float: number = 3.14;
let hex: number = 0xf00d; // 61453
let binary: number = 0b1010; // 10
let octal: number = 0o744; // 484
let infinity: number = Infinity;
let nan: number = NaN;

// 문자열: String
let str: string;
let red: string = 'Red';
let green: string = "Green";
let myColor: string = `My color is ${red}.`;
let yourColor: string = 'Your color is' + green;

// Array
let arr1: number[] = [1,2,3];
// 또는
let arr2: Array<number> = [1,2,3];

// Tuple
// (튜플은 배열의 길이가 고정되고 각 요소의 타입이 지정되어 있는 배열 형식을 의미)  
let tuple: [string, number] = ['hi', 10];

// Void
// (변수에는 undefined와 null만 할당하고, 함수에는 반환 값을 설정할 수 없는 타입) 
let unuseful: void = undefined;
function notuse(): void {
	console.log('sth');
}

// Element
const content: HTMLElement = document.querySelector('#content');
```


-----


## 타입추론
`명시적으로 타입 선언이 되어있지 않은 경우, 타입스크립트는 타입을 추론해 제공`  
타입스크립트는 `자바스크립트와 호환성을 위해 타입 주석 부분을 생략`할 수 있습니다.  
타입스크립트 컴파일러는 다음과 같은 코드를 만나면 대입 연산자 = 오른쪽 값에 따라 변수의 타입을 지정합니다.  
이를 `타입 추론(type inference)`이라고 합니다.
```typescript
let n = 1; // n의 타입을 number로 판단
let b = true; // b의 타입을 boolean으로 판단
let s = 'hello'; // s의 타입을 string으로 판단
let o = {}; // o의 타입을 object로 판단
```
```typescript
// 변수 num을 초기화하면서 숫자 12를 할당해 Number 타입으로 추론되었고, 
let num = 12;
// 따라서 'Hello type!'이라는 String 타입의 값은 할당할 수 없기 때문에 에러가 발생
num = 'Hello type!'; // TS2322: Type '"Hello type!"' is not assignable to type 'number'.
```

`타입스크립트가 타입을 추론하는 경우`
- 초기화된 변수  
- 기본값이 설정된 매개 변수  
- 반환 값이 있는 함수  

타입 추론이 엄격하지 않은 타입 선언을 의미하는 것은 아닙니다.  
따라서 이를 활용해 모든 곳에 타입을 명시할 필요는 없으며, 많은 경우 더 좋은 코드 가독성을 제공할 수 있습니다.


## 타입변환 (타입스크립트는 '타입단언'이라는 용어로 사용)
`타입 추론을 통해 판단할 수 있는 타입의 범주를 넘는 경우, 더 이상 추론하지 않도록 지시할 수 있음`  
타입이 있는 언어들은 특정 타입의 변숫값을 `다른 타입의 값으로 변환할 수 있는 기능`을 제공합니다.   
이를 `타입변환(type conversion)`이라고 합니다.
```typescript
let person: object = { name: 'test' };
console.log(person.name); // 'object' 형식에 'name' 속성이 없습니다. 에러!
```
```typescript
function someFunc(val: string | number, isNumber: boolean) {
	// some logics
	if(isNumber) {
		// 1. '변수 as 타입' 방식
		(val as number).toFixed(2);
		// 2. '<타입>변수' 방식
		// (<number>val).toFixed(2);
	}
}
```

인터페이스 사용을 추천
```typescript
interface personObject {
	name: string,
};
let person: personObject = { name: 'test' };
console.log(person.name);
```

타입변환 방식
```typescript
let person: object = { name: 'test' };
(<{name: string}>person).name;
```

`타입스크립트는 독특하게 타입 변환이 아닌 타입 단언(type assertion)이라는 용어를 사용`합니다.
```
(<타입>객체)
또는
(객체 as 타입)
```

이들은 모두 ES5 자바스크립트 구문이 아닙니다.  
따라서 `자바스크립트의 타입 변환 구문과 구분하기 위해 타입 단언이라는 용어를 사용`합니다.  
```typescript
interface INameable {
	name: string
};
let obj: object = { name: 'YSM' };
let name1 = (<INameable>obj).name;
let name2 = (obj as INameable).name;
console.log(name1, name2); // YSM YSM
```


## Non-null 단언 연산자 - 특히 컴파일 환경에서 체크하기 어려운 DOM 사용에서 유용
`!`를 사용하는 Non-null 단언 연산자(Non-null assertion operator)를 통해  
피연산자가 `Nullish(null이나 undefined) 값이 아님을 단언`할 수 있는데,  
변수나 속성에서 간단하게 사용할 수 있기 때문에 유용  
```typescript
// Error - TS2533: Object is possibly 'null' or 'undefined'.
function fnA(x: number | null | undefined) {
	return x.toFixed(2);
}

// if statement
function fnD(x: number | null | undefined) {
	if(x) {
		return x.toFixed(2);
	}
}

// Type assertion
function fnB(x: number | null | undefined) {
	return (x as number).toFixed(2);
}
function fnC(x: number | null | undefined) {
	return (<number>x).toFixed(2);
}

// Non-null assertion operator
function fnE(x: number | null | undefined) {
	return x!.toFixed(2); 
}
```

```typescript
// Error - TS2531: Object is possibly 'null'.
document.querySelector('.menu-item').innerHTML;

// Type assertion
(document.querySelector('.menu-item') as HTMLDivElement).innerHTML;
(<HTMLDivElement>document.querySelector('.menu-item')).innerHTML;

// Non-null assertion operator
document.querySelector('.menu-item')!.innerHTML;
```


## 타입 가드 (Guards) - 타입 단언을 여러 번 사용하게 되는 경우 유용  
`타입 가드는 NAME is TYPE 형태의 타입 술부(Predicate)를 반환 타입으로 명시한 함수`  
```typescript
// 일반적 타입 단언 사용 방식
function someFunc(val: string | number, isNumber: boolean) {
	if(isNumber) {
		(val as number).toFixed(2);
		isNaN(val as number);
	}else {
		(val as string).split('');
		(val as string).toUpperCase();
		(val as string).length;
	}
}
```
```typescript
// 타입 가드 함수 사용 방식
function isNumber(val: string | number): val is number { // 타입 가드 함수
	// typeof, in 그리고 instanceof 연산자 등 사용
	return typeof val === 'number';
}
function someFunc(val: string | number) {
	if(isNumber(val)) {
		val.toFixed(2);
		isNaN(val);
	}else {
		val.split('');
		val.toUpperCase();
		val.length;
	}
}
```


-----


## Null과 Undefined  
`기본적으로 Null과 Undefined는 모든 타입의 하위 타입으로, 각 타입에 할당할 수 있음`   
```typescript
let num: number = undefined;
let str: string = null;
let obj: { a: 1, b: false } = undefined;
let arr: any[] = null;
let und: undefined = null;
let nul: null = undefined;
let voi: void = null;
```


## Any  
`값의 타입과 무관하게 어떤 종류의 값도 저장`할 수 있음
```typescript
let any: any = 123;
any = 'Hello world';
any = {};
any = null;
let any2: any[] = [0, 1, {}, [], 'str', false];
```


## Unknown (알 수 없는 타입)
`Unknown은 알 수 없는 타입을 의미`  
일반적인 경우 Unknown은 타입 단언(Assertions)이나 타입 가드(Guards)를 필요  
```typescript
let a: any = 123;
let u: unknown = 123;

let v1: boolean = a; // 모든 타입(any)은 어디든 할당할 수 있습니다.
let v2: number = u; // 알 수 없는 타입(unknown)은 모든 타입(any)을 제외한 다른 타입에 할당할 수 없습니다.
let v3: any = u; // OK!
let v4: number = u as number; // 타입을 단언하면 할당할 수 있습니다.
```
`다양한 타입을 반환할 수 있는 API에서 유용`  
```typescript
type Result = {
	success: true,
	value: unknown
} | {
	success: false,
	error: Error
}
export default function getItems(user: IUser): Result {
	// Some logic...
	if(id.isValid) {
		return {
			success: true,
			value: ['Apple', 'Banana'] // unknown
		};
	}else {
		return {
			success: false,
			error: new Error('Invalid user.')
		}
	}
}
```


# `<Type>` 과 `as Type`
> 타입 단언, 타입 캐스팅, 다운 캐스팅, 강제형변환  
> 타입 단언 문법은 `<Type>` 과 `as Type` 으로 두 종류  
> JSX 를 사용하는 경우 `<Type>` 키워드는 JSX 의 문법과 겹치기 때문에 불편  

```typescript
let hello: number = 1;

(hello as unknown as string).substr(1, 2); 
// (<string>hello).substr(1, 2); 
// hello의 타입을 string으로 바꾸고 substr 메소드를 실행한다.
// unknown : number와 string은 명확히 다른 타입이기 때문에 unknown을 생략할 수 없다.
```


## array  
```typescript
// 문자열만 가지는 배열
let fruits1: string[] = ['Apple', 'Banana', 'Mango'];
let fruits2: Array<string> = ['Apple', 'Banana', 'Mango'];

// 숫자만 가지는 배열
let oneToSeven1: number[] = [1, 2, 3, 4, 5, 6, 7];
let oneToSeven2: Array<number> = [1, 2, 3, 4, 5, 6, 7];

// 유니언 타입(다중 타입)
let array1: (string | number)[] = ['Apple', 1, 2, 'Banana', 'Mango', 3];
let array2: Array<string | number> = ['Apple', 1, 2, 'Banana', 'Mango', 3];

// any
let someArr: any[] = [0, 1, {}, [], 'str', false];
```


## 인덱싱 가능 타입 (Indexable types)
arr[2]와 같이 ‘숫자’로 인덱싱하거나 obj['name']과 같이 ‘문자’로 인덱싱하는, 인덱싱 가능 타입(Indexable types)  
`인덱싱에 사용할 인덱서(Indexer)의 이름과 타입 그리고 인덱싱 결과의 반환 값을 지정`  
`인덱서의 타입은 string과 number만 지정할 수 있음`  
```typescript
interface IItem {
	[itemIndex: number]: string // Index signature
}
let item1: IItem = ['a', 'b', 'c']; // Indexable type

console.log(item1[0]); // 'a' is string.
console.log(item1[1]); // 'b' is string.
console.log(item1['0']); // Error - TS7015: Element implicitly has an 'any' type because index expression is not of type 'number'.


// 유니온 (union) 활용
interface IItemUnion {
	[itemIndex: number]: string | boolean | number[]
}
let item2: IItemUnion = ['Hello', false, [1, 2, 3]];
console.log(item2[0]); // Hello
console.log(item2[1]); // false
console.log(item2[2]); // [1, 2, 3]
```


## Tuple  
Tuple 타입은 배열과 매우 유사  
차이점이라면 `정해진 타입의 고정된 길이(length) 배열을 표현`   
```typescript
let tuple: [string, number];
tuple = ['a', 1];
tuple = ['a', 1, 2]; // Error - TS2322
tuple = [1, 'a']; // Error - TS2322

// 데이터를 개별 변수로 지정하지 않고, 단일 Tuple 타입으로 지정해 사용
let user: [number, string, boolean] = [1234, 'HEROPY', true];
console.log(user[0]); // 1234
console.log(user[1]); // 'HEROPY'
console.log(user[2]); // true

// Tuple 타입의 배열(2차원 배열)을 사용
let users: [number, string, boolean][];
users = [[1, 'Neo', true], [2, 'Evan', false], [3, 'Lewis', true]];

// 값으로 타입을 대신
let tuple: [1, number];
tuple = [1, 2];
tuple = [1, 3];
tuple = [2, 3]; // Error - TS2322: Type '2' is not assignable to type '1'.

// readonly 키워드를 사용해 읽기 전용 튜플을 생성
let a: readonly [string, number] = ['Hello', 123];
a[0] = 'World'; // Error - TS2540: Cannot assign to '0' because it is a read-only property.
```


## object    
`typeof 연산자 실행 결과로 "object" 반환하는 모든 타입이 해당 됨`  
컴파일러 옵션에서 엄격한 타입 검사(strict)를 true로 설정하면, null은 포함하지 않음  
```typescript
let obj: object = {}; 
let arr: object = [];
let func: object = function () {};
let nullValue: object = null;
let date: object = new Date();

// 보다 정확하게 타입 지정을 하기 위해 다음과 같이 객체 속성(Properties)들에 대한 타입을 개별적으로 지정
let userA: { name: string, age: number } = {
	name: 'HEROPY',
	age: 123
};

// interface나 type을 사용하는 것을 추천
interface IUser {
	name: string,
 	age: number
}
let userA: IUser = {
	name: 'HEROPY',
	age: 123
};
let userB: IUser = {
	name: 'HEROPY',
	age: false, // Error
	email: 'thesecon@gmail.com' // Error
};
```


## Enum (열거형)
숫자 혹은 문자열 값 집합에 이름(Member)을 부여할 수 있는 타입  
`값의 종류가 일정한 범위로 정해져 있는 경우 유용`  
`기본적으로 0부터 시작하며 값은 1씩 증가`  
```typescript
enum Week {
	Sun,
	Mon,
	Tue,
	Wed,
	Thu,
	Fri,
	Sat
}
console.log(Week.Mon); // 1
console.log(Week.Tue); // 2
```
`수동으로 값을 변경할 수 있으며, 값을 변경한 부분부터 다시 1씩 증가`  
```typescript
enum Week {
	Sun, // 0
	Mon = 22,
	Tue, // 23
	Wed, // 24
	Thu, // 25
	Fri, // 26
	Sat // 27
}
console.log(Week.Mon); // 22
console.log(Week.Tue); // 23
```
`Enum은 숫자 값 열거뿐만아니라 문자열 값으로 초기화할 수 있음`  
```typescript
enum Color {
	Red = 'red',
	Green = 'green',
	Blue = 'blue'
}
console.log(Color.Red); // red
console.log(Color['Green']); // green
```


## Void  
`Void는 일반적으로 값을 반환하지 않는 함수에서 사용`  
```typescript
function hello(msg: string): void {
	console.log(`Hello ${msg}`);
}
```


## Never
`절대 발생하지 않을 값을 나타내며, 어떠한 타입도 적용할 수 없음`  
```typescript
function error(message: string): never {
	throw new Error(message);
}
```


-----


## 유니온 (Union) - 'OR' - '|'
`2개 이상의 타입을 허용하는 경우` 
```typescript
let union: (string | number);
union = 'Hello type!';
union = 123;
union = false; // Error - TS2322: Type 'false' is not assignable to type 'string | number'.
```


## 인터섹션 (Intersection) - 'AND' - '&'
` 2개 이상의 타입을 조합` (자주 사용하는 방법은 아님)
```typescript
// 기존 타입들이 조합 가능하다면 인터섹션을 활용할 수 있습니다.
interface IUser {
	name: string,
	age: number
}
interface IValidation {
	isValid: boolean
}
const neo: IUser & IValidation = {
	name: 'Neo',
	age: 85,
	isValid: true
};
```


-----


## readonly    
```typescript
let arr1: readonly number[] = [1, 2, 3, 4];
let arr2: ReadonlyArray<number> = [0, 9, 8, 7];

arrA[0] = 123; // Error - TS2542: Index signature in type 'readonly number[]' only permits reading.
arrA.push(123); // Error - TS2339: Property 'push' does not exist on type 'readonly number[]'.

arrB[0] = 123; // Error - TS2542: Index signature in type 'readonly number[]' only permits reading.
arrB.push(123); // Error - TS2339: Property 'push' does not exist on type 'readonly number[]'.
```


-----


## interface   
```typescript
interface IUser {
	name: string,
	age: number,
	// 속성에 ?를 사용하면 선택적 속성으로 정의
	isAdmin?: boolean,
}
let userArr: IUser[] = [
	{
		name: 'name1',
		age: 10,
		isAdmin: true,
	},
	{
		name: 'name1',
		age: 20,
	}
];

// 모든 속성이 readonly일 경우, 유틸리티(Utility)나 단언(Assertion) 타입을 활용
// Readonly Utility
let user1: Readonly<IUser> = {
	name: 'Neo',
	age: 36
};
user1.age = 85; // Error
user1.name = 'Evan'; // Error

// 타입 단언 (Type assertion)
let user2 = {
	name: 'Neo',
	age: 36
} as const;
user2.age = 85; // Error
user2.name = 'Evan'; // Error
```


## 인터페이스 확장
`인터페이스도 클래스처럼 extends 키워드를 활용해 상속` 
또는 `같은 이름의 인터페이스를 여러 개 만들어 기존에 만들어진 인터페이스에 내용을 추가`하는 경우
```typescript
interface IAnimal {
	name: string
}
interface ICat extends IAnimal {
	meow(): string
}

class Cat implements ICat { // Error - TS2420: Class 'Cat' incorrectly implements interface 'ICat'. Property 'name' is missing in type 'Cat' but required in type 'ICat'.
	meow() {
		return 'MEOW~'
	}
}
```
```typescript
interface IFullName {
	firstName: string,
	lastName: string
}
interface IFullName {
	middleName: string
}

const fullName: IFullName = {
	firstName: 'Tomas',
	middleName: 'Sean',
	lastName: 'Connery'
};
```


## keyof
`인덱싱 가능 타입에서 keyof를 사용하면 속성 이름을 타입으로 사용`  
인덱싱 가능 타입의 속성 이름들이 유니온 타입으로 적용  
```typescript
interface ICountries {
  KR: '대한민국',
  US: '미국',
  CP: '중국'
}
// key 로 접근
let country1: keyof ICountries; // 'KR' | 'US' | 'CP'
country1 = 'KR'; // ok
country1 = 'RU'; // Error - TS2322: Type '"RU"' is not assignable to type '"KR" | "US" | "CP"'.

// value 로 접근
let country2: ICountries[keyof ICountries]; // ICountries['KR' | 'US' | 'CP']
country2 = '대한민국';
country2 = '러시아'; // Error - TS2322: Type '"러시아"' is not assignable to type '"대한민국" | "미국" | "중국"'.
```


-----


## 타입 별칭 (Type Aliases)
`type 키워드를 사용해 새로운 타입 조합`  
`일반적인 경우 둘 이상의 조합으로 구성하기 위해 유니온을 많이 사용`  
```typescript
type MyType = string;
type YourType = string | number | boolean;
type TUser = { name: string, age: number, isValid: boolean } | [ string, number, boolean ]; // { ... } 또는 [ ... ]

// TUser에서 T는 Type를 의미하는 별칭으로 사용
let userA: TUser = {
	name: 'Neo',
	age: 85,
	isValid: true
};
let userB: TUser = [
	'Evan', 
	36, 
	false
];

function someFunc(arg: MyType): YourType {
	switch (arg) {
		case 's':
			return arg.toString(); // string
		case 'n':
			return parseInt(arg); // number
		default:
			return true; // boolean
	}
}
```


-----


## function   
`화살표 함수를 이용해 타입을 지정`   
```typescript
// myFunc는 2개의 숫자 타입 인수를 가지고, 숫자 타입을 반환하는 함수.
let myFunc: (arg1: number, arg2: number) => number;

myFunc = function (x, y) {
	return x + y;
};
```
`함수 타입을 인터페이스로 정의하는 경우, 호출 시그니처(Call signature)라는 것을 사용`   
```typescript
interface IUser {
	name: string
}
interface IGetUser {
	(name: string): IUser
}

// 매개 변수 이름이 인터페이스와 일치할 필요가 없습니다.
// 또한 타입 추론을 통해 매개 변수를 순서에 맞게 암시적 타입으로 제공할 수 있습니다.
const getUser: IGetUser = function (n) { // n is name: string
	// Find user logic..
	// ...
	return user;
};
getUser('Heropy');
```


## 타입 주석 (함수 선언문에서 매개변수, 반환값)
타입스크립트 함수 선언문은 자바스크립트 `함수 선언문에서 매개변수와 함수 반환값(return type)에 타입 주석`을 붙이는 다음 형태로 구성됩니다.  
```
function 함수이름(매개변수1: 타입1, 매개변수2: 타입2[, ...]): 반환타입 {
	// 함수몸통...
}
```
```typescript
function add(a: number, b: number): number {
	return a + b;
}
```


## 함수 시그니처 (함수의 타입)
변수에 타입이 있듯이 함수 또한 타입이 있는데, `함수의 타입을 함수 시그니처(function signature)`라고 합니다.  
함수의 시그니처는 다음과 같은 형태로 표현합니다.
```
(매개변수1 타입, 매개변수2 타입[, ...]) => 반환값 타입
```
```typescript
let printMe: (string, number) => void = function(name: string, age: number): void {
	// ...
};
```
```typescript
type stringNumberFunc = (string, number) => void; // type 키워드로 타입 별칭 만들기

let f: stringNumberFunc = function(a: string, b: number): void {}
let g: stringNumberFunc = function(c: string, d: number): void {}
```


-----


## Class  
`인터페이스로 클래스를 정의하는 경우, implements 키워드를 사용`  
```typescript
interface IUser {
	name: string,
	getName(): string
}

class User implements IUser {
	constructor(public name: string) {

	}
	getName() {
		return this.name;
	}
}

const neo = new User('Neo');
neo.getName(); // Neo
```
Construct signature  
`new 키워드를 사용해야 하는 경우`  
```typescript
interface ICat {
	name: string
}
interface ICatConstructor {
	new (name: string): ICat; // Construct signature
}

class Cat implements ICat {
	constructor(public name: string) {}
}
function makeKitten(c: ICatConstructor, n: string) {
	return new c(n); // ok
}

const kitten = makeKitten(Cat, 'Lucy');
console.log(kitten);
```


-----


## 제네릭 방식 타입 - 타입을 인수로 받아서 사용
`사용 시점에 타입을 선언할 수 있는 방법을 제공`  
타입을 `T 와 같은 일종의 변수(타입 변수)로 취급하는 것`을 `제네릭(generics)타입`이라고 합니다.  

> <u>컴파일러는 T 의 의미를 알 수 있어야 합니다.  
즉, T 가 타입 변수(type variable)라고 알려줘야 합니다.</u>  
const 함수이름 = `<타입변수>`(매개변수: 타입변수): 타입변수 => {};  

> T 는 Type의 약자로 다른 언어에서도 제네릭을 선언할 때 관용적으로 많이 사용된다.  
이 부분에는 식별자로 사용할 수 있는 것이라면 무엇이든 들어갈 수 있다. 이를테면 $나 _도 가능하다는 의미다.  
하지만 대개의 경우 T를 사용한다. 여기에서 T를 타입 변수(Type variables)라고 한다.   

```typescript
function toArray<T>(a: T, b: T): T[] {
	return [a, b];
}

toArray<number>(1, 2);
toArray<string>('1', '2');
toArray<string | number>(1, '2');
toArray<number>(1, '2'); // Error
```

`타입 추론을 활용해, 사용 시점에 타입을 제공하지 않을 수 있음`  
```typescript
const arrayLength = <T>(array: T[]): number => array.length;
const isEmpty = <T>(array: T[]): boolean => arrayLength<T>(array) == 0;

let numArray: number[] = [1, 2, 3];
let strArray: string[] = ['Hello', 'World'];

arrayLength(numArray); // 타입 추론
isEmpty([]); // 타입 추론
```

> 두 개 이상의 타입 변수  
제네릭 함수나 클래스에서는 두 개 이상의 타입 변수도 사용할 수 있다.   
```typescript
function toPair<T, U>(a: T, b: U): [ T, U ] {
	return [ a, b ];
}
toPair<string, number>('1', 1); // [ '1', 1 ]
```
<br>


## 제네릭 함수의 타입 추론
`제네릭 형태로 구현된 함수는 원칙적으로는 타입변수를 명시`해줘야 합니다.
```typescript
const identoty = <T>(n: T): T => n;
console.log(identoty<boolean>(true)); // true - 타입 변수 명시
console.log(identoty(true)); // true - 타입 추론 방식
```
하지만 이런 코드는 번거로워서 `타입스크립트는 타입 변수 부분을 생략할 수 있게 합니다.`   
타입스크립트는 타입 변수가 생략된 제네릭 함수를 만나면 타입 추론을 통해 생략된 타입을 찾아냅니다.  
<br>


## 제네릭 함수의 함수 시그니처
타입스크립트는 어떤 경우 `함수 시그니처의 매개변수 부분에 변수 이름을 기입하라고 요구`합니다.  
```typescript
// callback 라는 이름의 매개변수에 함수 시그니처를 사용
const func = (callback: (a: number, number?) => number): void => {}; // 오류발생! - 타입만 있고 변수명은 없음!
```
이런 오류가 발생하면 타입스크립트가 해석하지 못하는 부분에 변수를 삽입하고 이 변수에 타입을 명시해 해결합니다.    
```typescript
const func = (callback: (a: number, i?: number) => number): void => {};
```
```typescript
const func = <T>(callback: (arg: T, i?: number) => number): void => {};
```


```typescript
// function 키워드 (함수선언식)
function g1<T>(a: T): void {};
function g2<T, Q>(a: T, b: Q): void {};
```
```typescript
// 화살표 함수
const g3 = <T>(a: T): void => {};
const g4 = <T, Q>(a: T, b: Q): void => {};
```
```typescript
// 타입 별칭(type-alias)
type Type1Func<T> = (T) => void;
type Type2Func<T, Q> = (T, Q) = > void;
type Type3Func<T, Q, R> = (T, Q) => R; // T와 Q타입 값을 입력 받아 R타입 값을 반환
```


-----


## infer
`infer 키워드를 사용해 타입 변수의 타입 추론(Inference) 여부를 확인할 수 있음`  
U가 추론 가능한 타입이면 참, 아니면 거짓 `T extends infer U ? X : Y`   
```typescript
// 타입 변수 R은 MyType<number>에서 받은 타입 number가 되고 infer 키워드를 통해 타입 추론이 가능한지 확인
// number 타입은 당연히 타입 추론이 가능하니 R을 반환하게 됩니다.(만약 R을 타입 추론할 수 없다면 null이 반환됩니다)
// 결과적으로 MyType<number>는 number를 반환하고 변수 a는 123을 할당할 수 있습니다.
type MyType<T> = T extends infer R ? R : null;
const a: MyType<number> = 123;
```


============================================================


## 타입추론
```typescript
let hello = 'world'; // let hello: string
const hello = 'world'; // const hello: 'world'
```


## Never 
Never은 절대 발생하지 않을 값을 나타내며, 어떠한 타입도 적용할 수 없습니다.  
```typescript
// 빈 배열을 타입으로 잘못 선언한 경우, Never를 볼 수 있습니다.
const never: [] = [];
never.push(3); // Error - TS2345: Argument of type '3' is not assignable to parameter of type 'never'.
```


-----

https://iancoding.tistory.com/160  


# 타입단언
```
// 타입 단언에는 두 가지 종류가 있다.
1: <Fish>pet 
2: (pet as Fish)
```
1 번은 런타임과 컴파일 단계에서 모두 돌아가고  
2 번은 컴파일 때만 돌아간다.  
리액트로 개발할 시 꺽쇠(<>)로 타입캐스팅 하는 것은 TSX 태그 문법이랑 비슷하기 때문에 as 를 추천한다.  


## as - 타입단언
`as 를 사용해 최종적으로 확실하게 타입을 단언`  
https://heropy.blog/2020/01/27/typescript/
```typescript
let val = 0;
(val as number).toFixed(2);

// <타입>변수
// JSX를 사용하는 경우 특정 구문 파싱에서 문제가 발생할 수 있으며, 결과적으로 .tsx 파일에서는 전혀 사용할 수 없습니다.
(<number>val).toFixed(2);
```

```typescript
//let div = document.querySelector('div'); // let div: HTMLDivElement | null
// 타입을 지정해주기 전 div는 HTMLDivElement | null 일수 가 있어 오류가 생길수 있다.

// 타입 단언
let div = document.querySelector('div') as HTMLDivElement;
```


## let, const 선언의 타입 추론
```typescript
// Type assertion
// TypeScript 3.4에 추가된 const assertion 기능을 사용하면, let 변수에 대해서도 const 변수를 사용할 때와 같은 타입 추론 규칙을 적용할 수 있습니다.
let user = {
  name: 'Neo',
  age: 36
} as const;
user.age = 85; // Error
user.name = 'Evan'; // Error
```

```typescript
const Product = {
  bgImg: `/public/images/@temp_img_discount.png`,
  title: '헤라 루즈 홀릭 런칭',
  tags: '#NEW CLASSIC #NEW COLOR',
  prodImg: `/public/images/@temp_img_prod_s.png`,
  isSoldout: false,
  brandName: '헤라',
  prodName: '헤라 루즈 홀릭 매트 립',
  discountPrice: 38000,
  originalPrice: 50000,
  discountRate: 10,
  prodLink: 'naver.com',
};
const Mock = {
  products: [] as typeof Product[],
};
```


## is - 타입가드
```
typeof 같은 걸로 타입 따져서 분기 처리 하는 역할을 TS 에선 is 이다.

if (isFish(Fish 타입 인 애)) { // isFish에서 Fish 타입이면 타입 가드에 의해서 조건문 통과
  console.log(Fish 타입인 애); // OK
  console.log(Bird 타입인 애); // Error
} else { // Bird 타입인 애가 들어가면 여기로!
  console.log(Fish 타입); // Error
  console.log(Bird 타입); // OK
}
```

```typescript
interface Dev {
  name: string;
  skill: string;
}
interface Person {
  name: string;
  age: number;
}

function introduce(): Dev | Person {
  return { name: "d", age: 33, skill: "c" };
}
const tony = introduce(); // Dev | Person 으로 공통된 속성만 사용가능. 즉, tony.skill 불가

// skill을 빼고 싶다면? -> type assertion으로 사용 가능
if ((tony as Dev).skill) {
  console.log((tony as Dev).skill);
} else if ((tony as Person).age) {
  console.log((tony as Person).age);
}
// 너무 assertion을 많이 씀으로 타입 가드 함수를 만든다.

// 타입 가드 정의
// target is Dev -> 넘겨 받은 파라미터가 해당 타입인지를 확인
function isDev(target: Dev | Person): target is Dev {
  // skill이 있다면 Dev이다
  return (target as Dev).skill !== undefined;
}
if (isDev(tony)) {
  // name, skill 사용 가능
  console.log(tony.skill);
} else {
  // name, age 사용 가능
  console.log(tony.age);
}
```

```javascript
function isNumber(x: any): x is number {
  return typeof x === "number";
}

function isString(x: any): x is string {
  return typeof x === "string";
}
```


## typeof - 타입가드 (typeof type guards)
```typescript
const test = { a: 'aaa', b: 'bbb', c: 'ccc' };
const code = 'a';

test[code as keyof typeof test];
```

```typescript
const object = {
  a: 1,
  b: 2,
  c: 3,
}

type objectShape = typeof object
// objectShape는 아래와 같을 것
/*type objectShape = {
  a: number
  b: number
  c: number
}*/
```
```typescript
const object = {
  a: 1,
  b: 2,
  c: 3,
} as const

type objectShape = typeof object
// objectShape는 아래와 같을 것
/*type objectShape = {
  readonly a: 1
  readonly b: 2
  readonly c: 3
}*/
```


## keyof - 속성 이름을 타입으로 사용
`인덱싱 가능 타입에서 keyof를 사용하면 속성 이름을 타입으로 사용`  
```typescript
interface ICountries {
  KR: '대한민국',
  US: '미국',
  CP: '중국'
}
// key 로 접근
type TKeys = keyof ICountries; // 'KR' | 'US' | 'CP'
let country1: TKeys; 
country1 = 'KR'; // ok
country1 = 'RU'; // Error - TS2322: Type '"RU"' is not assignable to type '"KR" | "US" | "CP"'.

// value 로 접근
type TValues = ICountries[keyof ICountries]; // ICountries['KR' | 'US' | 'CP']
let country2: TValues; 
country2 = '대한민국';
country2 = '러시아'; // Error - TS2322: Type '"러시아"' is not assignable to type '"대한민국" | "미국" | "중국"'.
```

`const - readonly`
```typescript
export const TAB = {
  HOME: 'home', // 홈
  INTRODUCE: 'introduce', // 소개
  RESERVE: 'reserve', // 예약
  NOTICE: 'notice', // 소식
} as const;

// object 로 접근
export type TTab = typeof TAB;

// key 로 접근
export type TTabKey = keyof typeof TAB; // TAB 의 key 

// value 로 접근
export type TTab = typeof TAB[keyof typeof TAB]; // TAB 의 key 의 value
```

`enum`
```typescript
enum sample_keys {
  TypeScript,
  JavaScript,
  ExpressJS,
  NodeJS,
  NextJS
}

type keyofEnum = keyof typeof sample_keys;
```



## value! - Non-null 단언 연산자  
https://heropy.blog/2020/01/27/typescript/  
`변수!.`를 사용하는 Non-null 단언 연산자(Non-null assertion operator)를 통해 피연산자가 Nullish(null이나 undefined) 값이 아님을 단언할 수 있는데,   
변수나 속성에서 간단하게 사용할 수 있기 때문에 유용  
```typescript
// Error - TS2533: Object is possibly 'null' or 'undefined'.
function fnA(x: number | null | undefined) {
  return x.toFixed(2);
}

// if statement
function fnD(x: number | null | undefined) {
  if (x) {
    return x.toFixed(2);
  }
}

// Type assertion
function fnB(x: number | null | undefined) {
  return (x as number).toFixed(2);
}
function fnC(x: number | null | undefined) {
  return (<number>x).toFixed(2);
}

// Non-null assertion operator
function fnE(x: number | null | undefined) {
  return x!.toFixed(2);
}
```


-----


## unknown과 any의 차이, 그리고  never
unknown은 TypeScript의 탑 타입(Top Type)입니다.  
TypeScript에 존재하고, 존재 할 수 있는 모든 타입들을 포함하여 어떤 값이든 가질 수 있지만,  
그로 인해 모든 타입이 공통적으로 할 수 있는 연산 외에는 할 수 있는 것이 아무것도 없습니다.   
그래서 이름 그대로 값이 어떤 타입인지 알 수 없는(unknown) 타입이기 때문에 `unknown 타입 변수는 사용할 때 어떤 타입인지 다시 한번 명시를 해주어야 합니다.`  

`unknown 타입 변수에 대해 타입 검사가 된 후에는 타입을 명시해주지 않아도 됩니다.`  
```javascript
const flag: unknown = true;
if (flag === true) {
    // if 조건문에서 엄격한 비교를 통해 boolean 값인지 확인했으므로
    // 새 boolean 변수에 대입을 할 때에는 타입을 명시하지 않아도 됨
    const something: boolean = flag;
    
    // ...
}

if (typeof maybe === 'string') {
  // typeof 연산자를 사용하여 타입을 확인한 뒤에도 타입을 명시하지 않아도 됨
  const text: string = maybe;
}
```

`any`
JavaScript로 작성된 모듈을 최소한의 수정으로 사용하거나,  
혹은 기존의 JavaScript 코드를 TypeScript로 재작성하는 작업을 할 때 이 any라는 마법 같은 타입을 사용하면 별다른 작업 없이 코드가 동작하지만,  
반대로 타입 검사를 항상 만족하므로 의도치 않은 형 변환이나 전혀 예상하지 못한 의도되지 않은 타입의 값이 대입되는 등 여러 사이드 이펙트를 일으켜 안전성이 낮아지기 때문에 조심해야 합니다.  

`never`
```javascript
// never 변수에는 어떤 값도 할당할 수 없습니다.
// 그래서 아래의 두 코드는 TypeScript에서 컴파일 오류가 발생합니다.
const first: never = 42;
const second: never = 'some text';
```
아래와 같이 어떠한 값도 반환하지 않는 함수라면 반환 타입을 never로 명시하여 어떠한 값도 반환하지 않음을 알려줄 수 있습니다.
```javascript
const fetchFriendsOfUser = (username: string): never => {
  throw new Error('Not Implemented');
}

// never를 사용하여 특정 타입 값을 할당받지 않도록 하는것도 가능합니다
// NonString 타입은 어떤 타입이든 될 수 있지만 string 타입인 경우는 never로 추론하여 string 타입의 값이 할당되지 못하도록 할 수 있습니다.
type NonString<T> = T extends string ? never : T;
```


-----


## enum
enum은 열거형 변수로 정수를 하나로 합칠 때 편리한 기능입니다.  
임의의 숫자나 문자열을 할당할 수 있으며 하나의 유형으로 사용해서 버그를 줄일 수 있습니다.
enum은 TypeScript가 자체적으로 구현하는 기능입니다.   

```typescript
// 아무것도 지정하지 않은 경우에는 0부터 숫자를 매깁니다. 
enum MOBILE_OS {
  IOS, // 0
  ANDROID // 1
}
// 임의의 숫자나 문자열을 할당할 수도 있습니다
enum MOBILE_OS {
  IOS = 'iOS',
  ANDROID = 'Android'
}
// 아래와 같이 유형으로 사용할 수도 있습니다 
const os: MOBILE_OS = MOBILE_OS.IOS
function detectOSType(userAgent: string): MOBILE_OS {
    // 생략
}
```

`TypeScript에서 enum을 사용하면 Tree-shaking이 되지 않습니다`  
https://engineering.linecorp.com/ko/blog/typescript-enum-tree-shaking/  
`그렇다면 enum 말고 어떤 것을 사용하면 좋을까요?`  
```typescript
const MOBILE_OS = {
  IOS: 'iOS',
  Android: 'Android'
} as const;
type MOBILE_OS = typeof MOBILE_OS[keyof typeof MOBILE_OS]; // 'iOS' | 'Android'
```

-----


## Union Type
유니온 타입(Union Type)이란 자바스크립트의 OR 연산자(||)와 같이 'A' 이거나 'B'이다 라는 의미의 타입이다.  
```typescript
function logText(text: string | number) {
  // ...
}
```
주의점
```typescript
interface Person {
  name: string;
  age: number;
}
interface Developer {
  name: string;
  skill: string;
}
function introduce(someone: Person | Developer) {
  someone.name; // O 정상 동작
  someone.age; // X 타입 오류
  someone.skill; // X 타입 오류
}
```

## Intersection Type
인터섹션 타입(Intersection Type)은 여러 타입을 모두 만족하는 하나의 타입을 의미한다.
```typescript
interface Person {
    name: string;
    age: number;
}

interface Developer {
    name: string;
    skill: number;
}

type Capt = Person & Developer;
```


-----


## 제네릭(Generic)  
```typescript 
function toArray<T>(a: T, b: T): T[] {
  return [a, b];
}

toArray<number>(1, 2);
toArray<string>('1', '2');
toArray<string | number>(1, '2');
toArray<number>(1, '2'); // Error

// 타입 추론을 활용해, 사용 시점에 타입을 제공하지 않을 수 있습니다.
toArray(1, 2);
toArray('1', '2');
toArray(1, '2'); // Error
```


## 제약 조건(Constraints)  
인터페이스나 타입 별칭을 사용하는 제네릭을 작성할 수도 있습니다.  
```typescript
interface MyType<T> {
  name: string,
  value: T
}

const dataA: MyType<string> = {
  name: 'Data A',
  value: 'Hello world'
};
const dataB: MyType<number> = {
  name: 'Data B',
  value: 1234
};
const dataC: MyType<boolean> = {
  name: 'Data C',
  value: true
};
const dataD: MyType<number[]> = {
  name: 'Data D',
  value: [1, 2, 3, 4]
};
```

```typescript
interface MyType<T extends string | number> {
  name: string,
  value: T
}

const dataA: MyType<string> = {
  name: 'Data A',
  value: 'Hello world'
};
const dataB: MyType<number> = {
  name: 'Data B',
  value: 1234
};
const dataC: MyType<boolean> = { // TS2344: Type 'boolean' does not satisfy the constraint 'string | number'.
  name: 'Data C',
  value: true
};
const dataD: MyType<number[]> = { // TS2344: Type 'number[]' does not satisfy the constraint 'string | number'.
  name: 'Data D',
  value: [1, 2, 3, 4]
};
```
