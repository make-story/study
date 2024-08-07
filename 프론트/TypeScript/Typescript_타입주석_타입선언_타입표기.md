# 타입주석 또는 타입선언 또는 타입표기

타입스크립트는 자바스크립트 변수 선언문을 확장해 다음과 같은 형태로 `타입을 명시`할 수 있습니다.  
이를 `타입주석(type annoration)`이라고 합니다.

타입표기 라고도 함
타입표기는 변수를 선언할 때 그 변수의 타입을 명시하는데 사용합니다.

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
let green: string = 'Green';
let myColor: string = `My color is ${red}.`;
let yourColor: string = 'Your color is' + green;

// Array
let arr1: number[] = [1, 2, 3];
// 또는
let arr2: Array<number> = [1, 2, 3];

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
