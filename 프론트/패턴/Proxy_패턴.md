https://patterns-dev-kr.github.io/design-patterns/proxy-pattern/

일반적으로 Proxy는 어떤 이의 대리인을 뜻한다.  
그 사람과 직접이야기하는 것 대신. 이야기를 원하는 사람의 대리인에게 이야기하는것이다.  
JavaScript에서도 해당 객체를 직접 다루는 것이 아니고 Proxy 객체와 인터렉션하게 된다.

```javascript
const person = {
  name: 'John Doe',
  age: 42,
  nationality: 'American',
};
```

person 객체와 직접 인터렉션하는 것 대신 personProxy 객체와 인터렉션하게 된다.

```javascript
const personProxy = new Proxy(person, {
  get: (obj, prop) => {
    console.log(`The value of ${prop} is ${obj[prop]}`);
  },
  set: (obj, prop, value) => {
    console.log(`Changed ${prop} from ${obj[prop]} to ${value}`);
    obj[prop] = value;
  },
});
```

```javascript
personProxy.name; // The value of name is John Doe
personProxy.age = 43; // Changed age from 42 to 43
```

Proxy는 유효성 검사를 구현할 때 유용하다.  
사용자는 person 객체의 age 프로퍼티를 문자열로 수장할 수 없고 또는 name 프로퍼티를 빈 문자열로 초기화할 수 없다.  
그리고 사용자가 person 객체에 존재하지 않는 프로퍼티에 접근하려 하면. 알려줄 수 있다.

```javascript
const personProxy = new Proxy(person, {
  get: (obj, prop) => {
    if (!obj[prop]) {
      console.log(`Hmm.. this property doesn't seem to exist on the target object`);
    } else {
      console.log(`The value of ${prop} is ${obj[prop]}`);
    }
  },
  set: (obj, prop, value) => {
    if (prop === 'age' && typeof value !== 'number') {
      console.log(`Sorry, you can only pass numeric values for age.`);
    } else if (prop === 'name' && value.length < 2) {
      console.log(`You need to provide a valid name.`);
    } else {
      console.log(`Changed ${prop} from ${obj[prop]} to ${value}.`);
      obj[prop] = value;
    }
  },
});
```

---

# Reflect

JavaScript는 Reflect라는 빌트인 객체를 제공하는데 Proxy와 함께 사용하면 대상 객체를 쉽게 조작할 수 있다.

```javascript
const person = {
  name: 'John Doe',
  age: 42,
  nationality: 'American',
};

const personProxy = new Proxy(person, {
  get: (obj, prop) => {
    console.log(`The value of ${prop} is ${Reflect.get(obj, prop)}`);
  },
  set: (obj, prop, value) => {
    console.log(`Changed ${prop} from ${obj[prop]} to ${value}`);
    return Reflect.set(obj, prop, value);
  },
});

personProxy.name;
personProxy.age = 43;
personProxy.name = 'Jane Doe';
```
