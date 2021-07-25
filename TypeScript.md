
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


## DOM Type 
https://typescript-kr.github.io/pages/tutorials/dom-manipulation.html  

https://microsoft.github.io/PowerBI-JavaScript/modules/_node_modules_typedoc_node_modules_typescript_lib_lib_dom_d_.html


## Element Type   
https://microsoft.github.io/PowerBI-JavaScript/interfaces/_node_modules_typedoc_node_modules_typescript_lib_lib_dom_d_.htmlelement.html  


-----


## 타입스크립트 참고
- intersectionobserver TypeScript 의 기본 타입을 재정의할 경우 에러
`Type 'string' is not assignable to type 'number'` 
`Type error: Type 'Document | Element | null' is not assignable to type 'Element | null | undefined'.`
`Type 'Document' is missing the following properties from type 'Element': assignedSlot, attributes, classList, className, and 58 more.`
https://microsoft.github.io/PowerBI-JavaScript/interfaces/_node_modules_typedoc_node_modules_typescript_lib_lib_dom_d_.intersectionobserver.html  


-----


## 타입추론
```typescript
let hello = 'world'; // let hello: string
const hello = 'world'; // const hello: 'world'
```


-----


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


## keyof - 속성 이름을 타입으로 사용
`인덱싱 가능 타입에서 keyof를 사용하면 속성 이름을 타입으로 사용`  
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
