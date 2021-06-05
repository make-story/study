/**
 * ES Next (문법 정리파일)
 * https://junhobaik.github.io/es2016-es2020/ 
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Language_Resources
 * 
 * https://backbencher.dev/javascript/es2021-new-features
 */


// - Optional chaining   
// ?. 연산자는 . 체이닝 연산자와 유사하게 작동하지만, 만약 참조가 nullish (null 또는 undefined)이라면, 에러가 발생하는 것 대신에 표현식의 리턴 값은 undefined로 단락된다.
const adventurer = {
    name: 'Alice',
    cat: {
        name: 'Dinah'
    }
};

const dogName = adventurer.dog?.name;
console.log(dogName);
// expected output: undefined

console.log(adventurer.someNonExistentMethod?.());
// expected output: undefined
 

// ----------


// - Nullish 병합 연산자  
// 일반적으로 논리 연산자 ||를 사용해 Falsy 체크(0, "", NaN, null, undefined를 확인)하는 경우가 많습니다.  
// 여기서 0이나 "" 값을 유효 값으로 사용하는 경우 원치 않는 결과가 발생할 수 있는데, 이럴 때 유용한 Nullish 병합(Nullish Coalescing) 연산자 ??를 사용합니다.  
const foo = null ?? 'Hello nullish.';
console.log(foo); // Hello nullish.

const bar = false ?? true;
console.log(bar); // false

const baz = 0 ?? 12;
console.log(baz); // 0


// ----------


// - Logical assignment operators (논리 할당 연산자)
// before
obj.prop = obj.prop || foo(); // obj.prop이 잘못된 값일 경우 할당
obj.prop = obj.prop && foo(); // obj.prop이 올바른 값일 경우 할당
obj.prop = obj.prop ?? foo(); // obj.prop이 null이나 undefined일 경우 할당

// after
obj.prop ||= foo();
obj.prop &&= foo();
obj.prop ??= foo();