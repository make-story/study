# Class

https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Classes

MDN 내용 중

```
Class는 사실 "특별한 함수"입니다.
함수를 함수 표현식과 함수 선언으로 정의할 수 있듯이 class 문법도 class 표현식 and class 선언 두 가지 방법을 제공합니다.
```

## ES5 에서 사용되던 전통적인 함수 기반의 클래스

```javascript
function Animal(name) {
  this.name = name;
}

Animal.prototype.speak = function () {
  console.log(`${this.name} makes a noise.`);
};
```

## 믹스인 (Mix-ins)

https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Classes#mix-ins

```javascript
const calculatorMixin = Base =>
  class extends Base {
    calc() {}
  };

const randomizerMixin = Base =>
  class extends Base {
    randomize() {}
  };

class Foo {}
class Bar extends calculatorMixin(randomizerMixin(Foo)) {}
```

```javascript
// 믹스인 정의
const myMixin = {
  mixinMethod() {
    console.log('This is a mixin method.');
  },
};

// 클래스 정의 및 믹스인 적용
class MyClass {
  myMethod() {
    console.log('This is a method in the main class.');
  }
}

// 믹스인을 클래스에 적용하는 함수
function applyMixin(targetClass, mixin) {
  Object.assign(targetClass.prototype, mixin);
}

// 믹스인 적용
applyMixin(MyClass, myMixin);

// 클래스 인스턴스 생성
const myInstance = new MyClass();

// 믹스인 메소드 및 클래스 메소드 호출
myInstance.myMethod(); // This is a method in the main class.
myInstance.mixinMethod(); // This is a mixin method.
```

## 상속

하나의 클래스를 상속했을 때, 공유되지 않음

```javascript
class P {
  #arr = [];
  constructor(options = {}) {
    this.#arr.push(options);
    console.log('arr', this.#arr);
  }
}

class C extends P {
  constructor(options = {}) {
    super(options);
  }
}

new C({ test: 1 }); // "arr [ { test: 1 } ]" 출력
new C({ test: 2 }); // "arr [ { test: 2 } ]" 출력"
```
