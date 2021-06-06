
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


## as - 타입단언
https://heropy.blog/2020/01/27/typescript/
```typescript
let val = 0;
(val as number).toFixed(2);

// <타입>변수
// JSX를 사용하는 경우 특정 구문 파싱에서 문제가 발생할 수 있으며, 결과적으로 .tsx 파일에서는 전혀 사용할 수 없습니다.
(<number>val).toFixed(2);
```

```typescript
// Type assertion
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


## keyof
인덱싱 가능 타입에서 keyof를 사용하면 속성 이름을 타입으로 사용  
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


## typeof - 타입가드 (typeof type guards)
```typescript
const test = { a: 'aaa', b: 'bbb', c: 'ccc' };
const code = 'a';

test[code as keyof typeof test];
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
