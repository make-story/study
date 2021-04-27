
> 참고페이지  
https://typescript-kr.github.io/  
https://heropy.blog/2020/01/27/typescript/  

https://typescript-kr.github.io/  
https://heropy.blog/2020/01/27/typescript/  
https://joshua1988.github.io/ts/guide/enums.html#%EB%AC%B8%EC%9E%90%ED%98%95-%EC%9D%B4%EB%84%98  
http://typescript-handbook-ko.org/pages/generics.html  
https://velog.io/@zeros0623/TypeScript-%EA%B3%A0%EA%B8%89-%ED%83%80%EC%9E%85  
https://typescript-kr.github.io/pages/tutorials/typescript-in-5-minutes.html  

- 타입스크립트 고급
https://typescript-kr.github.io/pages/advanced-types.html  
  
- 타입스크립트 + 리덕스
https://react-etc.vlpt.us/07.typescript-redux.html  


-----


# 타입스크립트 타입
https://microsoft.github.io/PowerBI-JavaScript/modules/_node_modules_typedoc_node_modules_typescript_lib_lib_dom_d_.html  

- 예를 들어, intersectionobserver TypeScript 의 기본 타입을 재정의할 경우 에러
`Type 'string' is not assignable to type 'number'` 
`Type error: Type 'Document | Element | null' is not assignable to type 'Element | null | undefined'.`
`Type 'Document' is missing the following properties from type 'Element': assignedSlot, attributes, classList, className, and 58 more.`

https://microsoft.github.io/PowerBI-JavaScript/interfaces/_node_modules_typedoc_node_modules_typescript_lib_lib_dom_d_.intersectionobserver.html  


# DOM Type 
https://typescript-kr.github.io/pages/tutorials/dom-manipulation.html  
## 타입스크립트 Element Type   
https://microsoft.github.io/PowerBI-JavaScript/interfaces/_node_modules_typedoc_node_modules_typescript_lib_lib_dom_d_.htmlelement.html  


# 타입추론
```typescript
let hello = 'world'; // let hello: string
const hello = 'world'; // const hello: 'world'
```


# 타입단언
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


# enum
https://medium.com/@seungha_kim_IT/typescript-3-4-const-assertion-b50a749dd53b  

