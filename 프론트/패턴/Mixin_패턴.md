# 상속 없이 객체에 기능을 추가한다

https://patterns-dev-kr.github.io/design-patterns/mixin-pattern/  
https://www.patterns.dev/posts/mixin-pattern/

Mixin은 상속 없이 어떤 객체나 클래스에 재사용 가능한 기능을 추가할 수 있는 객체이다.

Object.assign 메서드를 이용해 dogFuncionality 믹스인의 기능을 Dog 프로토타입에 추가할 수 있다.  
아래 예시에서는 Dot.prototype에 프로퍼티들을 추가하고 있다.  
이 경우 새로 만들어지는 Dog 클래스의 인스턴스들은 Dog 의 프로토타입 객체에 추가된 dogFunctionality의 기능들을 사용할 수 있다.

```javascript
class Dog {
  constructor(name) {
    this.name = name;
  }
}

const dogFunctionality = {
  bark: () => console.log('Woof!'),
  wagTail: () => console.log('Wagging my tail!'),
  play: () => console.log('Playing!'),
};

Object.assign(Dog.prototype, dogFunctionality);

const pet1 = new Dog('Daisy');

pet1.name; // Daisy
pet1.bark(); // Woof!
pet1.play(); // Playing!
```

---

# React (ES6 이전)

ES6 클래스 문법이 소개되기 전에 믹스인은 React에서 컴포넌트에 기능을 추가하기 위해 종종 사용되었다.  
React개발팀은 `mixin을 사용하지 말아 주세요.` 라는 글과 함께 컴포넌트의 믹스인이 복잡도를 증가시키고 재사용하기 어렵게 만든다고 이야기했다.  
대신 React개발팀은 지금은 훅에 의해 대체 가능하지만 `고차 컴포넌트를 사용하길 권장`했었다.

https://reactjs.org/blog/2016/07/13/mixins-considered-harmful.html  
https://www.notion.so/Mixin-Pattern-d410bf6197b0441c998535a58f5bd30d
