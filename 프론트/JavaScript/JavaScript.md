
# 레퍼런스 (참고자료)  
> 전역객체(빌트인), 반복기, 흐름제어, 표현식 및 연산자, 함수 및 클레스, 에러처리, 기본식 등   
https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference  

> 코어 자바스크립트 책


# 자습서  
https://developer.mozilla.org/ko/docs/Web/JavaScript  


# 기본형 데이터, 참조형 데이터 



# window.open
Mac 환경에서, 크롬 브라우저 전체화면 모드에서는 window.open 이 '새탭'으로 열린다.  
전체회면 모드가 아닌 창 사이즈 조절이 가능한 화면에서는 window.open 이 '새창'으로 열린다.  


-----

# window.self 
https://developer.mozilla.org/ko/docs/Web/API/Window/self   
```javascript
var w1 = window;
var w2 = self;
var w3 = window.window;
var w4 = window.self;
// w1, w2, w3, w4 모두 일치. 그러나 워커에서는 w2만 작동함
```

-----

# 불변 객체 (불변성)
객체의 구조는 같으나 메모리 상의 주소는 다름
즉, 값의 메모리 주소와 구조는 변하지 않은 것
그리하여 값의 비교를 단순화 할 수 있는 것 (객체 !== 객체)


## 불변 객체
참조형 데이터는 기본형 데이터와 마찬가지로 데이터 자체를 변경하려고 한다면 데이터는 변하지 않습니다.   
하지만 참조형 데이터가 가변적이다라고 말하는 것은, 내부 프로퍼티를 변경할 때를 말합니다.

만약 `객체를 복사해서, 내부 프로퍼티를 변경하고 싶을 때, 복사한 객체를 변경하더라도, 원본 객체가 변하지 않아야 하는 경우가 생길 것`입니다.  
`이런 경우에 '불변 객체'가 필요`합니다.  
불변 객체를 만들기 위해서는 다양한 방법을 활용할 수 있습니다.

내부 프로퍼티를 변경할 필요가 있을 때마다 매번 새로운 객체를 만들어 재할당하기로 규칙을 정하거나  
자동으로 새로운 객체를 만드는 도구를 활용한다면 불변성을 확보할 수 있습니다.   
혹은 불변성을 확보할 필요가 있을 경우에는 불변 객체로 취급하고, 그렇지 않은 경우에는 기존 방식대로 사용하는 식으로  
상황에 따라 대처해도 됩니다. 

그렇다면 `불변 객체를 어떻게 만들 수 있는지` 살펴보겠습니다.
```javascript
let user = { 
    name: "const", 
    gender: "male" 
}; 

function changeName(user, newName) { 
    let newUser = user; 
    newUser.name = newName; 
    return newUser; 
} 

let user2 = changeName(user, "epitone"); 
if (user !== user2) { 
    console.log("유저 정보가 변경되었습니다."); 
} 

console.log(user.name, user2.name); // epitone epitone 
console.log(user === user2); // true
```

불변 객체를 만들기 전, 객체의 가변성으로 인해 어떤 문제가 나타날 수 있을지 알아보겠습니다.  
첫 번째 줄에서 user 객체를 생성하고 user 객체의 name 프로퍼티를 epitone으로 바꿔주는 함수를 호출해서, 그 결과를 user2 변수에 할당했습니다.   

이때 user, user2 변수 모두 name 프로퍼티가 'epitone'으로 출력되는 것을 볼 수 있습니다.  
마지막 줄에서는 user와 user2가 서로 동일하다고 나옵니다.  
만약 user2와 user가 프로퍼티가 바뀌더라도, 다른 객체가 되려면 어떻게 해야 할까요?  

```javascript 
let user = { 
    name: "const", gender: "male" 
}; 

function changeName(user, newName) { 
    return { 
        name: newName, 
        gender: user.gender 
    }; 
} 

let user2 = changeName(user, "epitone"); 
if (user !== user2) { 
    console.log("유저 정보가 변경되었습니다."); 
} 

console.log(user.name, user2.name); // const epitone 
console.log(user === user2); // false
```

첫 번째는 changeName 함수가 정말 새로운 객체를 반환하도록 수정했습니다.  
이렇게 된다면, user와 user2는 서로 다른 객체이므로 안전하게 변경 전과 후를 비교할 수 있습니다.  

하지만 문제점이 있습니다.  
changeName 함수는 새로운 객체를 만들면서 변경할 필요가 없는 기존 객체의 프로퍼티(gender)를 하드코딩으로 입력했습니다.  
지금은 gender 프로퍼티가 하나 있어서 쉬웠을 수 있지만, 만약 프로퍼티가 많은 객체였다면, 하드코딩의 양이 더욱 많아질 것입니다.  
이런 방식보다는 대상 객체의 프로퍼티 개수와 상관없이 모든 프로퍼티를 복사하는 함수를 만드는 편이 더 좋을 것입니다. 

```javascript
let user = { 
    name: "const", 
    gender: "male" 
}; 

function copyObject(target) { 
    let result = {}; 
    for(let prop in target) { 
        result[prop] = target[prop]; 
    } 
    return result; 
} 

let user2 = copyObject(user); 
user2.name = 'epitone'; 
if (user !== user2) { 
    console.log("유저 정보가 변경되었습니다."); 
} 

console.log(user.name, user2.name); // const epitone 
console.log(user === user2); // false
```

위에서 copyObject 함수를 만들었습니다.  
copyObject 함수는 for in 문법을 이용해 result 객체에 target 객체의 프로퍼티들을 복사하는 함수입니다.  
copyObject 함수를 활용해서 간단하게 객체를 복사하고 내용을 수정하는 데 성공했습니다.   

copyObject 함수는 프로토타입 체이닝 상의 모든 프로퍼티를 복사하는 점, getter/setter는 복사하지 않는 점, 얕은 복사만을 수행한다는 점에서 아쉽지만,  
문제를 모두 보완하려면 함수가 무거워질 수밖에 없지만, user 객체에 대해서는 문제가 되지 않으므로 일단 진행해보겠습니다.

copyObject 함수를 활용해서 객체를 만들었을 때, 가장 아쉬운 점은 이 함수는 '얕은 복사만을 수행한다'는 점입니다.  
그렇다면, 얕은 복사는 무엇이고, 깊은 복사는 또 무엇일까요? 이에 대해 알아보겠습니다. 

```javascript
function copyObjectDeep(target) {
    let result = {};
    if(typeof target === 'object' && target !== null) {
        for(let prop in target) {
            result[prop] = copyObjectDeep(target[prop]);
        }
    }else  {
        result = target;
    }
    return result;
}
```

깊은 복사 결과 확인
```javascript
let obj = {
    a: 1,
    b: {
        c: null,
        d: [1, 2]
    }
};
let obj2 = copyObjectDeep(obj);

obj2.a = 3;
obj2.b.c = 4;
obj.b.d[1] = 3;

console.log(obj); // { a: 1, b: { c: null, d: [1, 3] } }
console.log(obj2); // { a: 3, b: { c: 4, d: [1, 2] } }
```

객체를 JSON 문법으로 표현된 문자열로 전환했다가 다시 JSON 객체로 바꾸는 방법
주의 : 메서드(함수)나 숨겨진 프로퍼티인 __proto__ 나 getter/setter 등과 같이 JSON으로 변경할 수 없는 프로퍼티들은 모두 무시 
```javascript
function copyObjectViaJSON(target) {
    return JSON.parse(JSON.stringify(target));
}

let obj = {
    a: 1,
    b: {
        c: null,
        d: [1, 2],
        func1: function() {
            console.log(3);
        },
    },
    func2: function() {
        console.log(4);
    }
};

let obj2 = copyObjectViaJSON(obj);

obj2.a = 3;
obj.b.c = 4;
obj.b.d[1] = 3;

console.log(obj); // { a: 1, b: { c: null, d: [1, 3], func1: f() }, func2: f() }
console.log(obj2); // { a: 3, b: { c: 4, d: [1, 2] } }
```


-----


## 얕은 복사 (shallow copy)
얕은 복사는 참조형 데이터가 저장된 프로퍼티를 복사할 때 그 주솟값만 복사하는 방법입니다.  
위에서 copyObject 함수는 얕은 복사만 수행했습니다.  
copyObject는 해당 프로퍼티에 대해 원본과 사본이 모두 동일한 참조형 데이터의 주소를 가리키게 됩니다.

얕은 복사에 대해 예를 들어 살펴보겠습니다. 
```javascript
const obj = { 
    vaule: 1 
}; 

const newObj = obj; 
newObj.vaule = 2; 

console.log(obj.vaule); // 2 
console.log(obj === newObj); // true
```

obj 변수에 object를 할당하고, newObj 변수에 obj 변수의 값을 할당했습니다.  
그리고 newObj 프로퍼티인 value 값을 2로 설정하고, obj.value를 콘솔에 출력하면, 2로 변경된 것을 볼 수 있습니다.  
왜냐면, 얕은 복사 때문에, 사본의 데이터를 변경하더라도, 동일한 참조형 데이터 주소를 가리키고 있기에, 원본의 데이터도 변경되는 것입니다.  

그렇다면, 깊은 복사를 사용하려면 어떻게 해야 할까요? 이에 대해 알아보겠습니다. 


## 깊은 복사 (deep copy)
깊은 복사는 내부의 모든 값들을 하나하나 찾아서 전부 복사하는 방법입니다.  
깊은 복사에 대해 예를 들어 살펴보겠습니다.
```javascript
let a = 1; 
let b = a; 
b = 2; 

console.log(a); // 1 
console.log(b); // 2 
console.log(a === b); // false
```

만약 변수 a의 값으로 1을 할당하고, 변수 b에 a를 할당했습니다.  
그리고 변수 b에 2를 재할당하고, a와 b를 출력해보면, a는 1, b는 2가 출력됩니다.  
자바스크립트에서 원시 타입은 깊은 복사가 진행됩니다. 그렇다면, 원시 타입이 아닌, 객체에서 깊은 복사는 어떻게 이뤄지는지 알아보겠습니다.  

객체의 깊은 복사에는 다양한 방법이 있습니다. 
