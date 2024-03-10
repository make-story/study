# 실행 콘텍스트 생성 기준

1. 함수코드 (function code)
2. 글로벌코드 (global code)
3. eval코드 (eval code)

ECMA 에서는 실행컨텐스트가 형성되는 경우를 세가지로 규정  
1 전역코드, 2 eval함수, 3 함수안의 코드를 실행

# 자바스크립트 함수 실행단계

1. 실행 콘텍스트 환경을 설정
2. 함수 안의 전체코드에서 함수선언문의 함수를 Function Object로 생성합니다.
3. 다시 함수의 처음으로 올라가 변수를 바인딩 합니다.
4. 다시 함수의 처음으로 돌아가 코드를 실행합니다.

# 호이스팅

함수 호이스팅은 자바스크립트의 변수생성(Instantiation)과 초기화 (Initialization)의 작업이 분리되어 진행되기 때문에 발생

```javascript
var a = 1;
function abc() {
  if (a) {
    var a = 0; // 함수 abc 는 실행콘텍스트 생성간 a 변수 초기화 (undefined)
    console.log(a);
  }
  console.log(a);
}
abc();
// undefined 출력!
```

## MDN 호이스팅 페이지 내용 중

https://developer.mozilla.org/ko/docs/Glossary/Hoisting  
`호이스팅은 ECMAScript 사양에서 규범적으로 정의된 용어가 아닙니다.`

JavaScript 호이스팅은 인터프리터가 코드를 실행하기 전에 함수, 변수, 클래스 또는 임포트(import)의 선언문을 해당 범위의 맨 위로 끌어올리는 것처럼 보이는 현상

let, const 및 class를 호이스트되지 않는 것으로 보는 것을 선호하는데,  
그 이유는 temporal dead zone이 선언 이전의 변수 사용을 엄격하게 금지하고 있기 때문입니다.  
https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Statements/let#temporal_dead_zone_tdz
