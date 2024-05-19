# 메모리 (memory)

https://developer.mozilla.org/ko/docs/Web/JavaScript/Memory_management

https://velog.io/@sejinkim/%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8%EC%9D%98-%EB%A9%94%EB%AA%A8%EB%A6%AC-%EA%B4%80%EB%A6%AC-%EC%84%A4%EB%AA%85

# 스택(Stack) 메모리와 힙(Heap) 메모리

https://ui.toast.com/posts/ko_20210611

자바스크립트 메모리는  
`단순 변수에 사용되는 스택 메모리`와  
`복잡한 객체에 사용되는 힙 메모리`로 구분된다.

- 단순 변수들은 원시타입이라고 불리며, String, Number, Boolean, Null, Undefined, Symbol, Bigint 등이 있다.
- 복잡한 객체는 참조 데이터 타입이라고 불리며, Object, Array, Function 등이 있다.

# JS의 값은 스택과 힙 중 어디에 저장되는가?

https://witch.work/posts/javascript-trip-of-js-value-where-value-stored

JavaScript 의 값은 원시값과 객체로 나뉜다.  
원시값은 숫자, 문자열, 불리언, null, undefined, 심볼이 있고 객체는 함수, 배열, Map 등 원시값을 제외한 모든 것이다.

일반적으로 널리 퍼진 설명은 원시값들은 스택에 값 그대로 저장되며 객체는 힙에 저장된다고 이야기한다.

`JavaScript 에서는 원시값을 포함한 모든 것이 원칙적으로 힙에 저장되고 그걸 가리키는 포인터를 통해 사용된다.`  
물론 엔진마다 약간씩 다른 최적화 기법들이 있고 여기에 따라 몇몇 값들이 스택에 직접 저장되기도 한다.

## 메모리 할당 문제

스택에 어떤 값을 저장하기 위해서는 해당 값이 얼만큼의 크기를 가지고 있는지를 미리 알아야 한다.  
그런데 JavaScript는 동적 타입 언어이기 때문에 변수에 할당되는 값의 타입이 언제든지 바뀔 수 있으며 변수 생성 시점에 이 타입을 알 수도 없다.

JavaScript 의 값들은 원래 모두 힙에 저장되어야 하고 참조를 통해 다루어져야 한다.  
원시값은 스택에 그대로 저장된다는 흔한 설명은 물론 엔진의 최적화를 고려할 경우 맞는 경우가 있을 수 있지만 대부분의 경우에는 틀린 설명이다.
