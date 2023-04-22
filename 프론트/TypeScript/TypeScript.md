> 참고페이지  
> https://typescript-kr.github.io/

https://evan-moon.github.io/2021/08/22/tsconfig-compiler-options-modules/

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

- 타입스크립트에서 Type, Interface를 어떻게 사용해야 하는가?
  1 - 나는 Interface만을 사용하는 것을 선호한다. 이는 지향 객체 프로그래밍에서 우리가 무엇을 할 것인지를 명확하게 보여주기 때문.  
  2 - 다른 언어의 프로그래머의 경우 Type 대신 Interface를 사용하면 더 읽기 쉽다.  
  3 - 깨끗한 코드와 더 나은 소프트웨어 아키텍처를 위해 복제하는 대신 하나의 Interface만 사용한다.  
  https://dev.to/luizcalaca/how-to-use-in-typescript-type-or-interface-47jk

# @type/react 버전 관련 이슈

https://stackoverflow.com/questions/71842787/next-js-typescript-error-you-do-not-have-the-required-packages-installed

---

# 타입스크립트 프로젝트 생성

```bash
$ npm install -g typescript
$ mkdir <프로젝트명>
$ cd <프로젝트명>
```

## tsconfig.json

tsconfig.json 은 타입스크립트 컴파일러 설정이 담겨 있는 파일 입니다.

```bash
$ tsc --init
```

tsc --init 은 새로운 tsconfig.json 을 생성하라는 명령입니다.

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
declare module 'json!*' {
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

---

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

---

## Null과 Undefined

`기본적으로 Null과 Undefined는 모든 타입의 하위 타입으로, 각 타입에 할당할 수 있음`

```typescript
let num: number = undefined;
let str: string = null;
let obj: { a: 1; b: false } = undefined;
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
type Result =
  | {
      success: true;
      value: unknown;
    }
  | {
      success: false;
      error: Error;
    };
export default function getItems(user: IUser): Result {
  // Some logic...
  if (id.isValid) {
    return {
      success: true,
      value: ['Apple', 'Banana'], // unknown
    };
  } else {
    return {
      success: false,
      error: new Error('Invalid user.'),
    };
  }
}
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
  [itemIndex: number]: string; // Index signature
}
let item1: IItem = ['a', 'b', 'c']; // Indexable type

console.log(item1[0]); // 'a' is string.
console.log(item1[1]); // 'b' is string.
console.log(item1['0']); // Error - TS7015: Element implicitly has an 'any' type because index expression is not of type 'number'.

interface States {
  [state: string]: boolean; //indexer
}
let s: States = { enabled: true, maximized: false };
console.log(s);
console.log(s['maximized']);

// 유니온 (union) 활용
interface IItemUnion {
  [itemIndex: number]: string | boolean | number[];
}
let item2: IItemUnion = ['Hello', false, [1, 2, 3]];
console.log(item2[0]); // Hello
console.log(item2[1]); // false
console.log(item2[2]); // [1, 2, 3]
```

## 튜플 (Tuple)

Tuple 타입은 배열과 매우 유사  
차이점이라면 `정해진 타입의 고정된 길이(length) 배열을 표현`

요소의 개수가 고정된 배열 타입!

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
users = [
  [1, 'Neo', true],
  [2, 'Evan', false],
  [3, 'Lewis', true],
];

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
let userA: { name: string; age: number } = {
  name: 'HEROPY',
  age: 123,
};

// interface나 type을 사용하는 것을 추천
interface IUser {
  name: string;
  age: number;
}
let userA: IUser = {
  name: 'HEROPY',
  age: 123,
};
let userB: IUser = {
  name: 'HEROPY',
  age: false, // Error
  email: 'thesecon@gmail.com', // Error
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
  Sat,
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
  Sat, // 27
}
console.log(Week.Mon); // 22
console.log(Week.Tue); // 23
```

`Enum은 숫자 값 열거뿐만아니라 문자열 값으로 초기화할 수 있음`

```typescript
enum Color {
  Red = 'red',
  Green = 'green',
  Blue = 'blue',
}
console.log(Color.Red); // red
console.log(Color['Green']); // green
```

## Void - 반환값 없는 함수

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

---

## 유니온 (Union) - 'OR' - '|'

유니온 타입(Union Type)이란 자바스크립트의 OR 연산자(||)와 같이 'A' 이거나 'B'이다 라는 의미의 타입이다.

`2개 이상의 타입을 허용하는 경우`

```typescript
let union: string | number;
union = 'Hello type!';
union = 123;
union = false; // Error - TS2322: Type 'false' is not assignable to type 'string | number'.
```

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

## 인터섹션 (Intersection) - 'AND' - '&'

인터섹션 타입(Intersection Type)은 여러 타입을 모두 만족하는 하나의 타입을 의미한다.

` 2개 이상의 타입을 조합` (자주 사용하는 방법은 아님)

```typescript
// 기존 타입들이 조합 가능하다면 인터섹션을 활용할 수 있습니다.
interface IUser {
  name: string;
  age: number;
}
interface IValidation {
  isValid: boolean;
}
const neo: IUser & IValidation = {
  name: 'Neo',
  age: 85,
  isValid: true,
};
```

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

---

## readonly

```typescript
let arr1: readonly number[] = [1, 2, 3, 4];
let arr2: ReadonlyArray<number> = [0, 9, 8, 7];

arrA[0] = 123; // Error - TS2542: Index signature in type 'readonly number[]' only permits reading.
arrA.push(123); // Error - TS2339: Property 'push' does not exist on type 'readonly number[]'.

arrB[0] = 123; // Error - TS2542: Index signature in type 'readonly number[]' only permits reading.
arrB.push(123); // Error - TS2339: Property 'push' does not exist on type 'readonly number[]'.
```

---

## interface

```typescript
interface IUser {
  name: string;
  age: number;
  // 속성에 ?를 사용하면 선택적 속성으로 정의
  isAdmin?: boolean;
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
  },
];

// 모든 속성이 readonly일 경우, 유틸리티(Utility)나 단언(Assertion) 타입을 활용
// Readonly Utility
let user1: Readonly<IUser> = {
  name: 'Neo',
  age: 36,
};
user1.age = 85; // Error
user1.name = 'Evan'; // Error

// 타입 단언 (Type assertion)
let user2 = {
  name: 'Neo',
  age: 36,
} as const;
user2.age = 85; // Error
user2.name = 'Evan'; // Error
```

## 인터페이스 확장

`인터페이스도 클래스처럼 extends 키워드를 활용해 상속`
또는 `같은 이름의 인터페이스를 여러 개 만들어 기존에 만들어진 인터페이스에 내용을 추가`하는 경우

```typescript
interface IAnimal {
  name: string;
}
interface ICat extends IAnimal {
  meow(): string;
}

class Cat implements ICat {
  // Error - TS2420: Class 'Cat' incorrectly implements interface 'ICat'. Property 'name' is missing in type 'Cat' but required in type 'ICat'.
  meow() {
    return 'MEOW~';
  }
}
```

```typescript
interface IFullName {
  firstName: string;
  lastName: string;
}
interface IFullName {
  middleName: string;
}

const fullName: IFullName = {
  firstName: 'Tomas',
  middleName: 'Sean',
  lastName: 'Connery',
};
```

---

## typeof 키워드 또는 타입 (typeof 연산자와 다름)

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
};

type objectShape = typeof object;
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
} as const;

type objectShape = typeof object;
// objectShape는 아래와 같을 것
/*type objectShape = {
  readonly a: 1
  readonly b: 2
  readonly c: 3
}*/
```

## keyof 키워드 또는 타입 - 속성 이름을 타입으로 사용

`인덱싱 가능 타입에서 keyof를 사용하면 속성 이름을 타입으로 사용`
인덱싱 가능 타입의 속성 이름들이 유니온 타입으로 적용

```typescript
interface ICountries {
  KR: '대한민국';
  US: '미국';
  CP: '중국';
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

```typescript
// const - readonly
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
  NextJS,
}

type keyofEnum = keyof typeof sample_keys;
```

- typeof
  typeof A → A(변수/함수등)의 type을 반환

```typescript
let str = 'hello';
let str2: typeof str = 'hi';
// === let str2: string ="hi"
```

- keyof
  keyof A → A의 모든 프로퍼티의 키값을 union 형태로 반환

```typescript
interface Todo {
  id: number;
  text: string;
}

type Keys = keyof Todo;
// === type Keys = 'id' | 'text'

let a: Keys = 'id';
a = 'text';
a = 'ids'; // ERROR!
a = 'id' | 'text'; // ERROR!
```

- Mapped Type (in 연산자)
  기존 타입을 새로운 타입으로 변환

```typescript
type Test = 'A' | 'B' | 'C';
type MappedTest = {
  [key in Test]: number;
};
const data: MappedTest = { A: 1, B: 2, C: 3 };
const data1: MappedTest = { A: 1, B: 2 }; // ERROR!
```

---

## 타입 별칭 (Type Aliases)

`type 키워드를 사용해 새로운 타입 조합`  
`일반적인 경우 둘 이상의 조합으로 구성하기 위해 유니온을 많이 사용`

```typescript
type MyType = string;
type YourType = string | number | boolean;
type TUser = { name: string; age: number; isValid: boolean } | [string, number, boolean]; // { ... } 또는 [ ... ]

// TUser에서 T는 Type를 의미하는 별칭으로 사용
let userA: TUser = {
  name: 'Neo',
  age: 85,
  isValid: true,
};
let userB: TUser = ['Evan', 36, false];

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

## type 과 interface 의 공통점과 차이점 (21년 3월 기준)

https://yceffort.kr/2021/03/typescript-interface-vs-type

- `공통점`

```typescript
interface PeopleInterface {
  name: string;
  age: number;
}

const me1: PeopleInterface = {
  name: 'yc',
  age: 34,
};

type PeopleType = {
  name: string;
  age: number;
};

const me2: PeopleType = {
  name: 'yc',
  age: 31,
};
```

- `차이점`  
  확장하는 방법

```typescript
interface PeopleInterface {
  name: string;
  age: number;
}

interface StudentInterface extends PeopleInterface {
  school: string;
}
```

```typescript
type PeopleType = {
  name: string;
  age: number;
};

type StudentType = PeopleType & {
  school: string;
};
```

선언적 확장  
interface에서 할 수 있는 대부분의 기능들은 type에서 가능하지만,  
한 가지 중요한 차이점은 type은 새로운 속성을 추가하기 위해서 다시 같은 이름으로 선언할 수 없지만,  
interface는 항상 선언적 확장이 가능하다는 것이다. 그 차이에 대한 예제가 바로 밑에 있는 것이다.

```typescript
interface Window {
  title: string;
}

interface Window {
  ts: TypeScriptAPI;
}

// 같은 interface 명으로 Window를 다시 만든다면, 자동으로 확장이 된다.

const src = 'const a = "Hello World"';
window.ts.transpileModule(src, {});
```

```typescript
type Window = {
  title: string;
};

type Window = {
  ts: TypeScriptAPI;
};

// Error: Duplicate identifier 'Window'.
// 타입은 안된다.
```

---

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
  name: string;
}
interface IGetUser {
  (name: string): IUser;
}

// 매개 변수 이름이 인터페이스와 일치할 필요가 없습니다.
// 또한 타입 추론을 통해 매개 변수를 순서에 맞게 암시적 타입으로 제공할 수 있습니다.
const getUser: IGetUser = function (n) {
  // n is name: string
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
let printMe: (string, number) => void = function (name: string, age: number): void {
  // ...
};
```

```typescript
type stringNumberFunc = (string, number) => void; // type 키워드로 타입 별칭 만들기

let f: stringNumberFunc = function (a: string, b: number): void {};
let g: stringNumberFunc = function (c: string, d: number): void {};
```

---

## Class

`인터페이스로 클래스를 정의하는 경우, implements 키워드를 사용`

```typescript
interface IUser {
  name: string;
  getName(): string;
}

class User implements IUser {
  constructor(public name: string) {}
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
  name: string;
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

---

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

## Never

Never은 절대 발생하지 않을 값을 나타내며, 어떠한 타입도 적용할 수 없습니다.

```typescript
// 빈 배열을 타입으로 잘못 선언한 경우, Never를 볼 수 있습니다.
const never: [] = [];
never.push(3); // Error - TS2345: Argument of type '3' is not assignable to parameter of type 'never'.
```

---

## unknown과 any의 차이, 그리고 never

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

---

## enum

enum은 열거형 변수로 정수를 하나로 합칠 때 편리한 기능입니다.  
임의의 숫자나 문자열을 할당할 수 있으며 하나의 유형으로 사용해서 버그를 줄일 수 있습니다.
enum은 TypeScript가 자체적으로 구현하는 기능입니다.

```typescript
// 아무것도 지정하지 않은 경우에는 0부터 숫자를 매깁니다.
enum MOBILE_OS {
  IOS, // 0
  ANDROID, // 1
}
// 임의의 숫자나 문자열을 할당할 수도 있습니다
enum MOBILE_OS {
  IOS = 'iOS',
  ANDROID = 'Android',
}
// 아래와 같이 유형으로 사용할 수도 있습니다
const os: MOBILE_OS = MOBILE_OS.IOS;
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
  Android: 'Android',
} as const;
type MOBILE_OS = typeof MOBILE_OS[keyof typeof MOBILE_OS]; // 'iOS' | 'Android'
```

---

# 템플릿 리터럴 타입

```typescript
function getHelloStr(): `Hello, ${string}!` {
  return 'Hello, world!';
}
```
