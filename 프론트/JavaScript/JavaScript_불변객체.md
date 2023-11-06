# 불변 객체 (불변성)

객체의 구조는 같으나 메모리 상의 주소는 다름
즉, `값의 메모리 주소와 구조는 변하지 않은 것 (메모리 영역에서 상태나 값을 변경할 수 없는 것)`
그리하여 값의 비교를 단순화 할 수 있는 것 (객체 !== 객체)

## 불변성의 중요성

기존의 값을 직접 수정하지 않으면서 새로운 값을 만들어 내는 것을 '불변성을 지킨다'라고 합니다.

```javascript
const array = [1, 2, 3, 4, 5];

const nextArrayBad = array; // 배열을 복사하는 것이 아니라 똑같은 배열을 가리킵니다.
nextArrayBad[0] = 100;
console.log(array === nextArrayBad); // 완전히 똑같은 배열이기 때문에 true

const nextArrayGood = [...array]; // 배열 내부의 값을 모두 복사합니다.
nextArrayGood[0] = 100;
console.log(array === nextArrayGood); // 다른 배열이기 때문에 false

const object = {
  foo: "bar",
  value: 1,
};

const nextObjectBad = object; // 객체가 복사되지 않고, 똑같은 객체를 가리킵니다.
nextObjectBad.value = nextObjectBad.value + 1;
console.log(object === nextObjectBad); // 같은 객체이기 때문에 true

const nextObjectGood = {
  ...object, // 기존에 있던 내용을 모두 복사해서 넣습니다.
  value: object.value + 1, // 새로운 값을 덮어 씁니다.
};
console.log(object === nextObjectGood); // 다른 객체이기 때문에 false
```

`불변성이 지켜지지 않으면 객체 내부의 값이 새로워져도 바뀐 것을 감지하지 못합니다.`

전개 연산자(...문법)를 사용하여 객체나 배열 내부의 값을 복사할 떄는 얕은 복사(shallow copy)를 하게 됩니다.  
즉, 내부의 값이 완전히 새로 복사되는 것이 아니라 가장 바깥쪽에 있는 값만 복사됩니다.  
따라서 `내부의 값이 객체 혹은 배열이라면 내부의 값 또한 따로 복사해주어야 합니다.`

```javascript
const todos = [
  { id: 1, checked: true },
  { id: 2, checked: false },
];
const nextTodos = [...todos];

nextTodos[0].checked = false;
console.log(todos[0] === nextTodos[0]); // 아직까지는 똑같은 객체를 가리키고 있기 때문에 true

nextTodos[0] = {
  ...nextTodos[0],
  checked: false,
};
console.log(todos[0] === nextTodos[0]); // 새로운 객체를 할당해 주었기에 false
```

## 리덕스에서 불변성

리덕스에서 불변성을 유지해야 하는 이유는 내부적으로 데이터가 변경되는 것을 감지하기 위해 얕은 비교(shallow equality) 검사를 하기 때문입니다.  
객체의 변화를 감지할 때 객체의 깊숙한 안쪽까지 비교하는 것이 아니라 겉핥기 식으로 비교하여 좋은 성능을 유지할 수 있는 것이죠.

## 불변성을 지켜야하는 이유

- 불변성이란, `값의 메모리 주소와 구조는 변하지 않은 것 (메모리 영역에서 상태나 값을 변경할 수 없는 것)`

불변성을 지켜야하는 이유는 redux 는 이전 state와 바뀐 state를 구분하는 방법이  
`참조값이 바뀌었는지 확인하고, 참조값이 바뀌면, state 가 바뀌었다고 redux 가 인식하여, 해당 state를 사용하는 컴포넌트에게 리렌더링을 요청하기 때문`입니다.

그렇기 때문에, state.test = action.test 와 같이 직접적으로 state를 변경하면 참조값이 변하지 않아 redux 는 값이 바뀌었다고 인식하지 않고 리렌더링 되지 않습니다.

state.test = {...test, action.test}  
또는 immer 라는 라이브러리를 사용하여 쉽게 불변성을 유지합니다.
(값의 구조는 그대로 이나, 메모리 주소는 변경하여, state 가 변경되었다는 것을 인지시킴)

---

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
  gender: "male",
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
  name: "const",
  gender: "male",
};

function changeName(user, newName) {
  return {
    name: newName,
    gender: user.gender,
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
  gender: "male",
};

function copyObject(target) {
  let result = {};
  for (let prop in target) {
    result[prop] = target[prop];
  }
  return result;
}

let user2 = copyObject(user);
user2.name = "epitone";
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
  if (typeof target === "object" && target !== null) {
    for (let prop in target) {
      result[prop] = copyObjectDeep(target[prop]);
    }
  } else {
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
    d: [1, 2],
  },
};
let obj2 = copyObjectDeep(obj);

obj2.a = 3;
obj2.b.c = 4;
obj.b.d[1] = 3;

console.log(obj); // { a: 1, b: { c: null, d: [1, 3] } }
console.log(obj2); // { a: 3, b: { c: 4, d: [1, 2] } }
```

객체를 JSON 문법으로 표현된 문자열로 전환했다가 다시 JSON 객체로 바꾸는 방법
주의 : 메서드(함수)나 숨겨진 프로퍼티인 **proto** 나 getter/setter 등과 같이 JSON으로 변경할 수 없는 프로퍼티들은 모두 무시

```javascript
function copyObjectViaJSON(target) {
  return JSON.parse(JSON.stringify(target));
}

let obj = {
  a: 1,
  b: {
    c: null,
    d: [1, 2],
    func1: function () {
      console.log(3);
    },
  },
  func2: function () {
    console.log(4);
  },
};

let obj2 = copyObjectViaJSON(obj);

obj2.a = 3;
obj.b.c = 4;
obj.b.d[1] = 3;

console.log(obj); // { a: 1, b: { c: null, d: [1, 3], func1: f() }, func2: f() }
console.log(obj2); // { a: 3, b: { c: 4, d: [1, 2] } }
```

---

# 얕은 복사 (shallow copy)

`얕은 복사는 참조형 데이터가 저장된 프로퍼티를 복사할 때 그 주솟값만 복사하는 방법`입니다.  
위에서 copyObject 함수는 얕은 복사만 수행했습니다.  
copyObject는 해당 프로퍼티에 대해 원본과 사본이 모두 동일한 참조형 데이터의 주소를 가리키게 됩니다.

얕은 복사에 대해 예를 들어 살펴보겠습니다.

```javascript
const obj = {
  vaule: 1,
};

const newObj = obj; // 얕은 복사
newObj.vaule = 2;

console.log(obj.vaule); // 2
console.log(obj === newObj); // true
```

obj 변수에 object를 할당하고, newObj 변수에 obj 변수의 값을 할당했습니다.  
그리고 newObj 프로퍼티인 value 값을 2로 설정하고, obj.value를 콘솔에 출력하면, 2로 변경된 것을 볼 수 있습니다.  
왜냐면, 얕은 복사 때문에, 사본의 데이터를 변경하더라도, 동일한 참조형 데이터 주소를 가리키고 있기에, 원본의 데이터도 변경되는 것입니다.

그렇다면, 깊은 복사를 사용하려면 어떻게 해야 할까요? 이에 대해 알아보겠습니다.

# 깊은 복사 (deep copy)

`깊은 복사는 내부의 모든 값들을 하나하나 찾아서 전부 복사하는 방법`입니다.  
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
