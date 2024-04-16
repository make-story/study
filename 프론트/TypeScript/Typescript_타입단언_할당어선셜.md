# 타입변환 (타입스크립트는 '타입단언'이라는 용어로 사용)

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
  if (isNumber) {
    // 1. '변수 as 타입' 방식
    (val as number).toFixed(2);
    // 2. '<타입>변수' 방식
    // (<number>val).toFixed(2);
  }
}
```

```typescript
let person: object = { name: 'test' };
// 타입변환
(<{ name: string }>person).name;
```

`타입스크립트는 독특하게 타입 변환이 아닌 타입 단언(type assertion)이라는 용어를 사용`합니다.

```
(<타입>객체)
또는
(객체 as 타입)
```

이들은 모두 ES5 자바스크립트 구문이 아닙니다.  
따라서 `자바스크립트의 타입 변환 구문과 구분하기 위해 타입 단언이라는 용어를 사용`합니다.

https://iancoding.tistory.com/160

```
// 타입 단언에는 두 가지 종류가 있다.
1: <Fish>pet
2: (pet as Fish)
```

1 번은 런타임과 컴파일 단계에서 모두 돌아가고  
2 번은 컴파일 때만 돌아간다.  
`리액트로 개발할 시 꺽쇠(<>)로 타입캐스팅 하는 것은 TSX 태그 문법이랑 비슷하기 때문에 as 를 추천`한다.

```typescript
interface INameable {
  name: string;
}
let obj: object = { name: 'YSM' };
let name1 = (<INameable>obj).name;
let name2 = (obj as INameable).name;
console.log(name1, name2); // YSM YSM
```

## `<Type>` 과 `as Type`

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

## Non-null 단언 연산자 (value!) - 특히 컴파일 환경에서 체크하기 어려운 DOM 사용에서 유용 - 느낌표(!) Assertion Operator (할당 어선셜)

`!`를 사용하는 Non-null 단언 연산자(Non-null assertion operator)를 통해  
피연산자가 `Nullish(null이나 undefined) 값이 아님을 단언`할 수 있는데,  
변수나 속성에서 간단하게 사용할 수 있기 때문에 유용

null 또는 undefined 일 가능성을 무시한다는 의미

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

```typescript
// Error - TS2531: Object is possibly 'null'.
document.querySelector('.menu-item').innerHTML;

// Type assertion
(document.querySelector('.menu-item') as HTMLDivElement).innerHTML;
(<HTMLDivElement>document.querySelector('.menu-item')).innerHTML;

// Non-null assertion operator
document.querySelector('.menu-item')!.innerHTML;
```

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

## 타입 단언에는 DOM에 접근할때 자주 사용됩니다.

```javascript
// 버튼이 있다면 버튼에 접근하지만 버튼이 없다면 null 이 됩니다. (오류발생 가능성)
const button = document.querySelector('button');

// 그렇기 때문에 타입 단언으로 HTMLButtonElement 타입으로 강제로 선언해줍니다.
const button = document.querySelector('button') as HTMLButtonElement;

// 이렇게도 단언해줄 수 있습니다 (값이 무조건 있다고 확신하는 방법)
const button = document.querySelector('button')!; // 끝에 ! 느낌표를 붙혀줍니다.
```

타입 단언에서 !는 무조건 이 요소는 존재한다고 확신할때 사용합니다.

타입 추론 같은 경우는 코드를 깔끔하게 만들고 싶을 때 유용할 수 있겠지만  
타입을 정확히 명시하는 것이 코드를 보며 타입을 바로바로 확인하기 편할 것 같다는 생각이 듭니다.

타입 단언은 해당 타입이 정말 무조건 확신이 있을때가 아니라면 굳이 자주 사용하진 않을 것 같습니다.

#
