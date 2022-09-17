# 객체를 생성하는 팩토리 함수를 사용한다

https://patterns-dev-kr.github.io/design-patterns/factory-pattern/  
https://www.patterns.dev/posts/factory-pattern/

팩토리 패턴을 사용하면 함수를 호출하는 것으로 객체를 만들어낼 수 있다.  
`new 키워드를 사용하는 대신 함수 호출의 결과로 객체를 만들 수 있는 것`이다.

앱에 다수의 사용자를 추가해야 한다고 가정해 보자.  
사용자는 firstName, lastName, email 속성을 갖는다.  
이 때 팩토리 함수를 사용해 fullName 메서드를 가진 객체를 만들어 반환한다.

```javascript
const createUser = ({ firstName, lastName, email }) => ({
  firstName,
  lastName,
  email,
  fullName() {
    return `${this.firstName} ${this.lastName}`;
  },
});
```

아래 예제에서는 위에서 만든 createUser 팩토리 함수를 사용하고 있다.

```javascript
const createUser = ({ firstName, lastName, email }) => ({
  firstName,
  lastName,
  email,
  fullName() {
    return `${this.firstName} ${this.lastName}`;
  },
});

const user1 = createUser({
  firstName: 'John',
  lastName: 'Doe',
  email: 'john@doe.com',
});

const user2 = createUser({
  firstName: 'Jane',
  lastName: 'Doe',
  email: 'jane@doe.com',
});

console.log(user1);
console.log(user2);
```

---

# 장점

팩토리 패턴은 동일한 프로퍼티를 가진 여러 작은 객체를 만들어낼 때 유용하다.  
현재의 환경이나 사용자 특징적인 설정을 통해 원하는 객체를 쉽게 만들 수 있다,

# 단점

대부분의 상황에서 객체를 일일히 만드는 것 보다. 클래스를 활용하는 편이 메모리를 절약하는데 더 효과적이다.

```javascript
class User {
  constructor(firstName, lastName, email) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
  }

  fullName() {
    return `${this.firstName} ${this.lastName}`;
  }
}

const user1 = new User({
  firstName: 'John',
  lastName: 'Doe',
  email: 'john@doe.com',
});

const user2 = new User({
  firstName: 'Jane',
  lastName: 'Doe',
  email: 'jane@doe.com',
});
```
