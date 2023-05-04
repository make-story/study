# 참고

https://lakelouise.tistory.com/188

https://inpa.tistory.com/entry/TS-%F0%9F%93%98-%ED%83%80%EC%9E%85%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-Generic-%ED%83%80%EC%9E%85-%EC%A0%95%EB%B3%B5%ED%95%98%EA%B8%B0

# 제네릭(Generic) 방식 타입 - 타입을 인수로 받아서 사용

`사용 시점에 타입을 선언할 수 있는 방법을 제공`  
타입을 `T 와 같은 일종의 변수(타입 변수)로 취급하는 것`을 `제네릭(generics)타입`이라고 합니다.

> <u>컴파일러는 T 의 의미를 알 수 있어야 합니다.  
> 즉, T 가 타입 변수(type variable)라고 알려줘야 합니다.</u>  
> const 함수이름 = `<타입변수>`(매개변수: 타입변수): 타입변수 => {};

> T 는 Type의 약자로 다른 언어에서도 제네릭을 선언할 때 관용적으로 많이 사용된다.  
> 이 부분에는 식별자로 사용할 수 있는 것이라면 무엇이든 들어갈 수 있다. 이를테면 $나 \_도 가능하다는 의미다.  
> 하지만 대개의 경우 T를 사용한다. 여기에서 T를 타입 변수(Type variables)라고 한다.

```typescript
function toArray<T>(a: T, b: T): T[] {
  return [a, b];
}

toArray<number>(1, 2);
toArray<string>('1', '2');
toArray<string | number>(1, '2');
toArray<number>(1, '2'); // Error
```

`generic을 함수에서 사용하기`
함수 자체의 Type

```typescript
function logText<T>(text: T): T {
  return text;
}
let str: <T>(text: T) => T = logText;

console.log(logText<number>(123));
console.log(str<string>('ABC'));
```

`제네릭 인터페이스`

```typescript
interface GenericLogTextFn {
  <T>(text: T): T;
}
function logText<T>(text: T): T {
  return text;
}
let myString: GenericLogTextFn = logText; // Okay

// 인터페이스에 인자 타입을 강조
interface GenericLogTextFn<T> {
  (text: T): T;
}
function logText<T>(text: T): T {
  return text;
}
let myString: GenericLogTextFn<string> = logText;
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
> 제네릭 함수나 클래스에서는 두 개 이상의 타입 변수도 사용할 수 있다.

```typescript
function toPair<T, U>(a: T, b: U): [T, U] {
  return [a, b];
}
toPair<string, number>('1', 1); // [ '1', 1 ]
```

## 제약 조건(Constraints / keyof)

`특정 타입들로만 동작하는 generic 함수를 만들 때 사용한다.`  
인터페이스나 타입 별칭을 사용하는 제네릭을 작성할 수도 있습니다.

제약조건 설정 전

```typescript
interface MyType<T> {
  name: string;
  value: T;
}

const dataA: MyType<string> = {
  name: 'Data A',
  value: 'Hello world', // string
};
const dataB: MyType<number> = {
  name: 'Data B',
  value: 1234, // number
};
const dataC: MyType<boolean> = {
  name: 'Data C',
  value: true, // boolean
};
const dataD: MyType<number[]> = {
  name: 'Data D',
  value: [1, 2, 3, 4], // number[]
};
```

제약조건 설정 후

```typescript
interface MyType<T extends string | number> {
  name: string;
  value: T;
}

const dataA: MyType<string> = {
  name: 'Data A',
  value: 'Hello world',
};
const dataB: MyType<number> = {
  name: 'Data B',
  value: 1234,
};
const dataC: MyType<boolean> = {
  // TS2344: Type 'boolean' does not satisfy the constraint 'string | number'.
  name: 'Data C',
  value: true,
};
const dataD: MyType<number[]> = {
  // TS2344: Type 'number[]' does not satisfy the constraint 'string | number'.
  name: 'Data D',
  value: [1, 2, 3, 4],
};
```

```typescript
interface Lengthwise {
  length: number;
}

function identity<T extends Lengthwise>(arg: T): T {
  console.log(arg.length);
  return arg;
}

identity('string');
identity({ length: 10, value: 3 });
```

```typescript
const printMessage = <T extends string | number>(message: T): T => {
  return message;
};

printMessage<string>('1');
printMessage<number>(1);
printMessage<boolean>(false); // error : Type 'boolean' does not satisfy the constraint 'string | number'.
```

### keyof

```typescript
const getProperty = <T extends object, U extends keyof T>(obj: T, key: U) => {
  return obj[key];
};

getProperty({ a: 1, b: 2, c: 3 }, 'a');
getProperty({ a: 1, b: 2, c: 3 }, 'z'); // error : Argument of type '"z"' is not assignable to parameter of type '"a" | "b" | "c"'.
```

### infer

`infer 키워드를 사용해 타입 변수의 타입 추론(Inference) 여부를 확인할 수 있음`  
U 가 추론 가능한 타입이면 참, 아니면 거짓 `T extends infer U ? X : Y`

```typescript
// 타입 변수 R은 MyType<number>에서 받은 타입 number가 되고 infer 키워드를 통해 타입 추론이 가능한지 확인
// number 타입은 당연히 타입 추론이 가능하니 R을 반환하게 됩니다.(만약 R을 타입 추론할 수 없다면 null이 반환됩니다)
// 결과적으로 MyType<number>는 number를 반환하고 변수 a는 123을 할당할 수 있습니다.
type MyType<T> = T extends infer R ? R : null;
const a: MyType<number> = 123;
```

### never

어떤 값도 할당할 수 없습니다.

```javascript
const fetchFriendsOfUser = (username: string): never => {
  throw new Error('Not Implemented');
}

// never를 사용하여 특정 타입 값을 할당받지 않도록 하는것도 가능합니다
// NonString 타입은 어떤 타입이든 될 수 있지만 string 타입인 경우는 never로 추론하여 string 타입의 값이 할당되지 못하도록 할 수 있습니다.
type NonString<T> = T extends string ? never : T;
```

### 생성자 제한

```typescript
// 매개변수 x 는 생성자 타입만 올수 있게 제네릭 제한
function add<T extends abstract new (...args: any) => any>(x: T): T {
  return x;
}

class A {}
add(A);
```

### JSX에서 arrow function으로 제네릭 사용하기

```typescript
const foo = <T extends {}>(x: T): T => x;
```

다이아몬드 연산자가 HTML태그가 아니라 제네릭이라는 힌트를 주기 위해 extends {}를 사용한다.
다만 이 경우, T가 object에 제한되기 때문에 type-safety를 위해 extends unknown을 사용할 수 있다.

```typescript
const foo = <T extends unknown>(x: T) => x;
```

---

## 제네릭 함수의 타입 추론

`제네릭 형태로 구현된 함수는 원칙적으로는 타입변수를 명시`해줘야 합니다.

```typescript
const identoty = <T>(n: T): T => n;
console.log(identoty<boolean>(true)); // true - 타입 변수 명시
console.log(identoty(true)); // true - 타입 추론 방식
```

하지만 이런 코드는 번거로워서 `타입스크립트는 타입 변수 부분을 생략할 수 있게 합니다.`  
타입스크립트는 타입 변수가 생략된 제네릭 함수를 만나면 타입 추론을 통해 생략된 타입을 찾아냅니다.

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
function g1<T>(a: T): void {}
function g2<T, Q>(a: T, b: Q): void {}
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
