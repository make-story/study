## function

https://www.typescriptlang.org/docs/handbook/2/functions.html

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
let printMe: (string, number) => void = function (
  name: string,
  age: number,
): void {
  // ...
};
```

```typescript
type stringNumberFunc = (string, number) => void; // type 키워드로 타입 별칭 만들기

let f: stringNumberFunc = function (a: string, b: number): void {};
let g: stringNumberFunc = function (c: string, d: number): void {};
```

## Void - 반환값 없는 함수

`Void는 일반적으로 값을 반환하지 않는 함수에서 사용`

```typescript
function hello(msg: string): void {
  console.log(`Hello ${msg}`);
}
```

## 함수 this

```typescript
function curried(
  // this 타입 선언
  this: {
    level?: OptionsParam['level'] | null;
    logFunction?: OptionsParam['logFunction'] | null;
    logGroup?: OptionsParam[TypedLogGroupKey] | null;
  },
  ...args: any[]
): any {
  const options: OptionsParam | null = getListFindItem(args, findOptions, {
    isFindItemRemove: true,
  });
  const level: OptionsParam['level'] | null =
    this?.level ||
    options?.level ||
    getListFindItem(args, findLevel, { isFindItemRemove: true });
  const logFunction: OptionsParam['logFunction'] | null =
    this?.logFunction ||
    options?.logFunction ||
    getListFindItem(args, findLogFunction, { isFindItemRemove: true });
  const logGroup: OptionsParam[TypedLogGroupKey] | null =
    this?.logGroup || options?.logGroup || null;

  // 최종 조건 만족시 콜백 함수 실행
  if (
    /*callback.length <= args.length ||*/
    (level && 1 <= args.length) ||
    (logFunction && 1 <= args.length) ||
    (logGroup && 1 <= args.length) ||
    (!level && !logFunction && !logGroup && 1 <= args.length)
  ) {
    return callback?.apply(null, [level, logFunction, logGroup, ...args]);
  }

  // 클로저 함수
  return (...moreArgs: any[]): any =>
    curried.apply({ level, logFunction, logGroup }, args.concat(moreArgs));
}
```

## Promise

https://bobbyhadz.com/blog/typescript-async-function-type

```typescript
// ✅ Arrow function with Type
type GetNumber = (num: number) => Promise<number>;

const getNumber: GetNumber = async num => {
  const result = await Promise.resolve(num);

  return result;
};

// --------------------------------------------

// ✅ Arrow function with Interface
interface IGetNumber {
  (num: number): Promise<number>;
}

const getNumber2: IGetNumber = async num => {
  const result = await Promise.resolve(num);

  return result;
};
```

## function overloads 함수 오버로딩

https://wiki.yowu.dev/ko/Knowledge-base/TypeScript/Learning/034-function-overloading-in-typescript-how-to-create-functions-with-multiple-signatures

https://blog.logrocket.com/implementing-function-overloading-typescript/

```typescript
// 함수 오버로딩을 생성하려면 동일한 함수에 대해 여러 함수 시그니처를 정의
// 각 서명에는 고유한 매개변수 세트와 리턴 유형이 있어야 합니다.
function add(a: number, b: number): number;
function add(a: string, b: string): string;
function add(a: any, b: any): any {
  return a + b;
}
```

```typescript
// add 함수를 호출하면 TypeScript는 함수 서명을 사용하여 런타임에 사용할 구현을 결정합니다.
const result1 = add(1, 2); // returns 3
const result2 = add('hello', 'world'); // returns 'helloworld'
const result3 = add(true, false); // returns truefalse
```

## interface 여러 함수

```typescript
interface TestDetails {
  tag?: string | string[];
  annotation?: any;
}
interface TestFunction<TestArgs = any> {
  (
    title: string,
    details: TestArgs,
    body?: (args: any) => Promise<void> | void,
  ): void;
  (title: string, body?: (args: TestArgs) => Promise<void> | void): void;
}
const test1: TestFunction = (title, details, body = () => {}) => {};
const test2: TestFunction = (title, body = () => {}) => {};
```
