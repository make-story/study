# 타입가드 (Guards)

타입 가드는 `NAME is TYPE 형태의 타입` 술부(Predicate)를 반환 타입으로 명시한 함수

타입 단언을 여러 번 사용하게 되는 경우 유용

```typescript
// 일반적 타입 단언 사용 방식
function someFunc(val: string | number, isNumber: boolean) {
  if (isNumber) {
    (val as number).toFixed(2);
    isNaN(val as number);
  } else {
    (val as string).split('');
    (val as string).toUpperCase();
    (val as string).length;
  }
}
```

```typescript
// 타입 가드 함수 사용 방식
function isNumber(val: string | number): val is number {
  // 타입 가드 함수
  // typeof, in 그리고 instanceof 연산자 등 사용
  return typeof val === 'number';
}
function someFunc(val: string | number) {
  if (isNumber(val)) {
    val.toFixed(2);
    isNaN(val);
  } else {
    val.split('');
    val.toUpperCase();
    val.length;
  }
}
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
  return { name: 'd', age: 33, skill: 'c' };
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
