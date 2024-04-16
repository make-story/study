# 타입추론

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
let hello = 'world'; // let hello: string
const hello = 'world'; // const hello: 'world'
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

## let, const 선언의 타입 추론

```typescript
// Type assertion
// TypeScript 3.4에 추가된 const assertion 기능을 사용하면, let 변수에 대해서도 const 변수를 사용할 때와 같은 타입 추론 규칙을 적용할 수 있습니다.
let user = {
  name: 'Neo',
  age: 36,
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
  products: [] as (typeof Product)[],
};
```

---

# 타입스크립트 타입 추론과 타입 단언

https://kimyang-sun.tistory.com/entry/TypeScript-%ED%83%80%EC%9E%85%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-inference-assertion-%ED%83%80%EC%9E%85-%EC%B6%94%EB%A1%A0-%ED%83%80%EC%9E%85-%EB%8B%A8%EC%96%B8

## inference : 타입 추론으로서 타입을 따로 지정해주지 않아도 타입스크립트에서 똑똑하게 타입을 추론해줍니다.

```javascript
// Type Inference
// 타입을 명시하지 않아도 처음 생성시 문자열로 생성이 되어 string으로 타입 추론이 됩니다.
let string = 'We are the world!';
string = 100; // 문자열 타입에 숫자를 할당하여 오류가 발생합니다.

// 함수의 인자도 마찬가지로 기본값 매개변수가 숫자라면 숫자로 선언됩니다.
function write(number = 1000) {
  return number; // 1000
}
write('number'); // 숫자가 아닌 문자열을 넣으면 오류가 발생합니다.
```

## assertion : 타입 단언으로서 타입을 강제로 강요하여 선언합니다. (타입을 확신할때 사용)

```javascript
// Type Assertion
let anything; // 타입 추론에 의해 any로 선언됩니다.

anything = 100;
anything = 'baby'

let anything2 = anything // anything2는 anything과 같은 any 타입입니다.
let anything2 = 10; // any 타입이어서 10으로 변화합니다.

let anything3 = anything as string; // string으로 타입 단언을 해줍니다.
anything3 = 100; // 문자열로 단언하여 숫자를 할당하니까 오류가 발생합니다.
```

```typescript
// Type assertion
// TypeScript 3.4에 추가된 const assertion 기능을 사용하면, let 변수에 대해서도 const 변수를 사용할 때와 같은 타입 추론 규칙을 적용할 수 있습니다.
let user = {
  name: 'Neo',
  age: 36,
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
  products: [] as (typeof Product)[],
};
```

> 타입 단언 문법은 `<Type>` 과 `as Type` 으로 두 종류  
> JSX 를 사용하는 경우 `<Type>` 키워드는 JSX 의 문법과 겹치기 때문에 불편
