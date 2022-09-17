# 동일 타입의 여러 객체들이 프로퍼티를 공유한다

https://patterns-dev-kr.github.io/design-patterns/prototype-pattern/  
https://www.patterns.dev/posts/prototype-pattern/

Prototype 패턴은 동일 타입의 여러 객체들이 프로퍼티를 공유할 때 유용하게 사용한다.  
Prototype은 JavaScript `객체의 기본 속성이므로 Prototype 체인을 활용`할 수 있다.

```javascript
class Dog {
  constructor(name) {
    this.name = name;
  }

  bark() {
    return `Woof!`;
  }
}

const dog1 = new Dog('Daisy');
const dog2 = new Dog('Max');
const dog3 = new Dog('Spot');
```

ES6클래스를 사용하면 모든 프로퍼티는 클래스 자체에 선언되며 위의 코드에서 bark 는 자동으로 prototype 에 추가된다.

```javascript
console.log(Dog.prototype);
// constructor: ƒ Dog(name, breed) bark: ƒ bark()

console.log(dog1.__proto__);
// constructor: ƒ Dog(name, breed) bark: ƒ bark()
```

객체에 없는 프로퍼티에 접근하려 하는 경우 JavaScript는 이 프로퍼티가 나타날때 까지 prototype chain 을 거슬러 올라간다.

```javascript
class Dog {
  constructor(name) {
    this.name = name;
  }

  bark() {
    console.log('Woof!');
  }
}

class SuperDog extends Dog {
  constructor(name) {
    super(name);
  }

  fly() {
    console.log(`Flying!`);
  }
}

const dog1 = new SuperDog('Daisy');
dog1.bark();
dog1.fly();
```

dog1 -> SuperDog.prototype -> Dog.prototype

---

# Object.create

```javascript
const dog = {
  bark() {
    return `Woof!`;
  },
};

const pet1 = Object.create(dog);
```

Object.create 메서드는 Prototype으로 쓰일 객체를 인자로 받아 새로운 객체를 만들어낸다.  
`pet1 자체적으로는 아무런 프로퍼티도 없지만 dog 객체를 Prototype으로 사용하기 때문에 bark 메서드를 사용할 수 있다.`
