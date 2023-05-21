# 모듈(module)

https://it-eldorado.tistory.com/127

import 또는 export가 있는 파일은 모듈(Module)로 취급이 된다.

TypeScript `컴파일러가 모듈 로더를 통해 실제로 불러오는 건 오로지 타입 정보뿐`이다.

```typescript
// TypeScript
namespace N1 {
  export let a: string = 'a';
  let b: string = 'b';
  console.log(a);
  console.log(b);

  export namespace N2 {
    export let c: string = 'c';
    let d: string = 'd';
    console.log(c);
    console.log(d);
  }
}

// Compiled JavaScript
('use strict');
var N1;
(function (N1) {
  N1.a = 'a';
  let b = 'b';
  console.log(N1.a);
  console.log(b);

  let N2;
  (function (N2) {
    N2.c = 'c';
    let d = 'd';
    console.log(N2.c);
    console.log(d);
  })((N2 = N1.N2 || (N1.N2 = {})));
})(N1 || (N1 = {}));
```

# declare 키워드

변수, 상수, 함수, 또는 클래스가 어딘가에 이미 선언되어 있음을 알린다.  
즉, `JS 코드로는 컴파일 되지 않고, TypeScript 컴파일러에게 타입 정보를 알리기만 한다.`

# .d.ts 파일 (선언 코드만 담긴 파일)

https://it-eldorado.tistory.com/127

https://www.typescriptlang.org/docs/handbook/declaration-files/templates/module-d-ts.html

- 구현부가 아닌 선언부만을 작성하는 용도의 파일을 의미한다.
- JS 코드로 컴파일 되지 않는다.
- skipLibCheck 프로퍼티가 false라면 다음 규칙들을 강제한다. (true여도 지키는 것이 좋다.)
  - 선언 코드만 작성이 가능하고, 일반 코드는 작성할 수 없다.
  - 따라서 최상위에 존재하는 변수, 상수, 함수, 클래스, 네임스페이스의 선언 앞에는 반드시 declare 혹은 export가 붙어야 한다.
- 이 파일에 작성되는 declare namespace 블록과 declare module 블록의 필드들에는 export 키워드가 기본으로 붙는다. 즉 굳이 또 붙여줄 필요가 없다.

`JavaScript 로 작성된 모듈 사용할 경우`
`임의파일명.d.ts` 파일 생성

```typescript
declare module 'react-scroll';
declare module 'react-slick';
declare namespace JSX {
  interface IntrinsicElements {
    'lottie-player': any;
  }
}
```

---

https://velog.io/@kmp1007s/Typescript-%EB%AA%A8%EB%93%88%EA%B3%BC-%EA%B4%80%EB%A0%A8%EB%90%9C-%EC%9D%B4%EC%95%BC%EA%B8%B0

Typescript의 모듈 방식은 `Internal Module(내부 모듈)`과 `External Module(외부 모듈)` 두가지의 모듈이 존재한다.  
두 모듈화 방식의 차이는 module-loader의 의존성 여부이다.

Internal Module은 TS만의 특유한 모듈 방법으로써 다른 module-loader에 의존하지 않고 TS를 컴파일 할 때 이름이 명명된 JS 오브젝트를 생성함으로써 모듈화한다.  
말 그대로 이름을 붙이는 네임스페이스를 생성한다고 볼 수 있다.

반면에 External Module은 다른 module-loader에 의존하여 모듈화하는 방법이다.  
External Module에는 ES Module, CommonJS(Node), Require.js(AMD)와 같이 따로 module-loader를 사용하는 모듈방법이 해당된다.

## 내부 모듈과 외부 모듈의 차이?

외부 모듈은 CommonJS/Require.js/ES Module과 같은 module-loaer에 의존성을 가지게 된다.

```typescript
/* module-loader를 이용하는 외부모듈 */
/* 컴파일 된 js, ESModule에 의존하고 있는 것을 볼 수 있다.*/
import * as express from 'express';
```

내부 모듈은 TS파일을 컴파일하고 난 후의 JS파일로 의존성을 해소한다.

```typescript
/* script 태그로 의존성을 해소하는 내부모듈 */
/* namespace를 참조하는 TS 파일 */
/// <reference path="Validation.ts" />
/// <reference path="LettersOnlyValidator.ts" />
/// <reference path="ZipCodeValidator.ts" />
```

```html
<!-- something.html 컴파일된 Javascript에 의존하고 있음 -->
<script src="Validation.js" type="text/javascript" />
<script src="LettersOnlyValidator.js" type="text/javascript" />
<script src="ZipCodeValidator.js" type="text/javascript" />
<script src="Test.js" type="text/javascript" />
```

## Typescript의 Namespace

`Typescript 1.5부터 Internal Module의 명칭이 Namespace로 변경되었다.`

Typescript의 Namespace는 네임스페이스를 이용하는 모듈 방법(Internal Module)을 제공한다.

Namespace는 다음과 같이 사용한다.

```typescript
namespace MyConsole {
  export function log(msg) {
    console.log(msg);
  }
}

MyConsole.log('MyConsole');
```

https://www.typescriptlang.org/docs/handbook/triple-slash-directives.html

## declare module 과 declare namespace

declare 키워드는 `타입스크립트 컴파일러에게 특정한 변수가 있다고 선언하는 키워드`로 전역변수를 사용하거나 .d.ts 파일을 만들때 사용한다.

TS에는 두 가지의 모듈 선언 방법이 있다.

1. declare module "buffer" {}
2. declare module buffer {}

전자는 외부 모듈(External Module)을 정의하는 방법이며  
후자는 내부 모듈(Internal Module)을 정의하는 방법이다.  
후자는 namespace가 생기고나서부터 declare namespace buffer {}로 교체되었다.  
모듈명이 문자열로 감싸져있다면 외부 모듈(ES6)에 대해 정의하는 것이고 문자열로 감싸져있지않다면 내부모듈을 정의하는 것이다.

---

# Declaration Reference

https://www.typescriptlang.org/ko/docs/handbook/declaration-files/by-example.html
