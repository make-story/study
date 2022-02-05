
하나의 화면(page)에 비즈니스 로직, 데이터, 컴포넌트를 모두 관리하는 것이 아니라 pages, containers, components로 나누어 화면을 관리하였습니다.

## components
재사용이 가능한 요소들을 모아 컴포넌트로 구성되어 있습니다. 순수한 데이터 형태를 props로 받아오며, 다양한 container에서 사용 됩니다.

## containers
container는 화면을 구성하기 위한 영역에 해당하며 이며 여러개의 section을 가지고 있습니다. (container내 하위 폴더가 section 입니다.) 또한 section은 여러개의 component들의 조합으로 구성되어있습니다.

기본적으로 page와 container는 1:1 매칭 된 구조를 가지고 있으며 데이터를 가져오거나, 비즈니스 로직이 포함됩니다.

## pages
pages에 존재하는 파일 이름을 기준으로 서비스의 경로가 생성됩니다. 해당 파일은 경로 이름과 SEO를 위한 title, description 등을 추가하며 콘텐츠들은 모두 container에서 관리하였습니다.


-----


# Javascript에서도 SOLID 원칙이 통할까?
https://velog.io/@teo/Javascript%EC%97%90%EC%84%9C%EB%8F%84-SOLID-%EC%9B%90%EC%B9%99%EC%9D%B4-%ED%86%B5%ED%95%A0%EA%B9%8C?fbclid=IwAR3Q9yeXJNSYNOqMWF-CBqtZHNpf8FSZ9BspxCLRPFYzdouJ2EvySeyzFRc  

`객체지향 5원칙 (SOLID)은 구시대의 유물 ?`  
https://mangsby.com/blog/programming/%EA%B0%9D%EC%B2%B4%EC%A7%80%ED%96%A5-5%EC%9B%90%EC%B9%99-solid%EC%9D%80-%EA%B5%AC%EC%8B%9C%EB%8C%80%EC%9D%98-%EC%9C%A0%EB%AC%BC%EC%9D%B8%EA%B0%80/


## SOLID  
컴퓨터 프로그래밍에서 SOLID란 로버트 마틴이 2000년대 초반에 명명한 객체 지향 프로그래밍 및 설계의 다섯 가지 기본 원칙을 마이클 페더스가 두문자어 기억술로 소개한 것이다. 프로그래머가 시간이 지나도 유지 보수와 확장이 쉬운 시스템을 만들고자 할 때 이 원칙들을 함께 적용할 수 있다. SOLID 원칙들은 소프트웨어 작업에서 프로그래머가 소스 코드가 읽기 쉽고 확장하기 쉽게 될 때까지 소프트웨어 소스 코드를 리팩터링하여 코드 냄새를 제거하기 위해 적용할 수 있는 지침이다. 이 원칙들은 애자일 소프트웨어 개발과 적응적 소프트웨어 개발의 전반적 전략의 일부다.

https://ko.wikipedia.org/wiki/SOLID_(%EA%B0%9D%EC%B2%B4_%EC%A7%80%ED%96%A5_%EC%84%A4%EA%B3%84)  

https://github.com/labs42io/clean-code-typescript#solid  


## S - SRP / 단일 책임 원칙  
단일 책임 원칙 (Single responsibility principle)
- 객체(함수)는 오직 하나의 책임을 가져야 한다. (함수는 오직 하나의 변경의 이유만을 가져야 한다.)  
같은 이유로 변경될 코드들은 모으고. 다른 이유로 변경될 코드들은 흩어라.  

https://github.com/labs42io/clean-code-typescript#functions-should-do-one-thing  

### 1개의 함수는 1개의 역할만 수행하자!  
```javascript
// Bad:
function emailClients(clients: Client[]) {
  clients.forEach((client) => {
    const clientRecord = database.lookup(client);
    if (clientRecord.isActive()) {
      email(client);
    }
  });
}


// Good:
function emailClients(clients: Client[]) {
  clients.filter(isActiveClient).forEach(email);
}

function isActiveClient(client: Client) {
  const clientRecord = database.lookup(client);
  return clientRecord.isActive();
}
```

### One more Thing! 순수함수로 작성해보자!
클래스를 쓰지 않고 함수만 사용한다고 함수형 프로그래밍이라고 할 수는 없습니다. 함수형 프로그래밍이 되기 위해서는 순수함수와 부수효과를 분리하는 구조가 되어야 합니다.  

https://maxkim-j.github.io/posts/js-pure-function  

순수함수란?
1. 1개의 반환값이 반드시 존재한다.
2. 같은 인자를 넣었을때에는 항상 같은 값을 반환한다.
3. 함수 외부의 어떠한 값을 변화시켜서는 안된다.  


## O - OCP / 개방-폐쇄 원칙
개방-폐쇄 원칙 (Open/Closed Principle)  
“소프트웨어 요소는 확장에는 열려 있으나 변경에는 닫혀 있어야 한다.”  

https://levelup.gitconnected.com/the-open-closed-principle-made-simple-cc3d0ed70553  

OCP의 원칙의 의미는 새로운 기능의 추가가 일어 났을때에는 기존코드의 수정 없이 추가가 되어야 하고, 내부 매커니즘이 변경이 되어야 할때에는 외부의 코드 변화가 없어야 한다 라는 것입니다.  
  
함수형 프로그래밍에서 이 OCP를 가장 잘 느낄 수 있는 것은 바로 map, filter, reduce와 같은 Higer order Function(or Method)와 webpack loader와 같은 플러그인 또는 middleware 개념입니다.  

```javascript
// Bad:
function getMutipledArray(array, option) {
  const result = []
  for (let i = 0; i < array.length; i++) {
    if (option === "doubled") {
      result[i] = array[i] * 2 // 새로운 방식으로 만들기 위해서는 수정이 필요하다.
    }
    if (option === "tripled") {
      result[i] = array[i] * 3 // 옵션으로 분기는 가능하나
    }
    if (option === "half") {
      result[i] = array[i] / 2 // 새로운 기능을 추가하려면 함수 내에서 변경이 되어야 한다.
    }
  }
  return result
}


// Good:
// option을 받는게 아니라 fn을 받아보자.
// 이제 새로운 array를 만든다는 매커니즘은 닫혀있으나 방식에 대해서는 열려있다.
function map(array, fn) {
  const result = []
  for (let i = 0; i < array.length; i++) {
    result[i] = fn(array[i], i, array) // 내부 값을 외부로 전달하고 결과를 받아서 사용한다.
  }
  return result
}

// 얼마든지 새로운 기능을 만들어도 map코드에는 영향이 없다.
const getDoubledArray = (array) => map(array, (x) => x * 2)
const getTripledArray = (array) => map(array, (x) => x * 3)
const getHalfArray = (array) => map(array, (x) => x / 2)
```
하나의 함수의 기능이 여러가지 옵션들로 인해 내부에서 분기가 많이 발생하고 있다면 OCP와 SRP의 원칙에 맞게 함수를 매개 변수로 받는 방법을 통해서 공통 매커니즘의 코드와 새로운 기능에 대한 코드를 분리해서 다룰 수 있게 할 수 있습니다.  


## L - LSP / 리스코프 치환 원칙
리스코프 치환 원칙 (Liskov substitution principle)  
“프로그램의 객체는 프로그램의 정확성을 깨뜨리지 않으면서 하위 타입의 인스턴스로 바꿀 수 있어야 한다.” 계약에 의한 설계를 참고하라.  

https://www.cnblogs.com/charon922/p/8643454.html  

리스코프 치환 원칙은 상속을 받아 만든 하위타입의 제약조건들이 상위 타입에서 먼저 선언한(fly나 setWidth) 조건들과 충돌이 날 경우 유지보수가 힘들어 진다는 문제점이 있기 때문에 만들어진 것입니다.   
따라서 계층도간의 is-a 관계를 만족한다고 하더라도 (새-펭귄, 직사각형-정사각형) 하위 타입에서 가변성을 가지면서 상위 타입에서 정의한 조건과 일치하지 않는다면 상속을 받지 말아야 합니다.  

이 원칙은 상속을 기반하므로 함수형 프로그래밍에게 바로 적용하기는 힘들것 같습니다. 하지만 먼저 선언된 조건들과 나중에 선언된 조건들이 서로 충돌이 나는 것을 방지해야한다는 원칙으로 접근을 한다면 선언형 함수형 프로그래밍에서 발생하는 순환 종속성을 만들어내는 infinite Cycle을 만들지 않아야 한다 원칙으로 대체를 할 수 있을 것 같습니다.  


## I - ISP / 인터페이스 분리 원칙
인터페이스 분리 원칙 (Interface segregation principle)  
"사용자가 필요하지 않은 것들에 의존하게 되지 않도록, 인터페이스를 작게 유지하라."  

https://blog.ndepend.com/solid-design-the-interface-segregation-principle-isp/  

```javascript
// Bad:
interface SmartPrinter {
  print();
  fax();
  scan();
}

class AllInOnePrinter implements SmartPrinter {
  print() {
    // ...
  }  
  
  fax() {
    // ...
  }

  scan() {
    // ...
  }
}

class EconomicPrinter implements SmartPrinter {
  print() {
    // ...
  }  
  
  fax() {
    throw new Error('Fax not supported.');
  }

  scan() {
    throw new Error('Scan not supported.');
  }
}


// Good:
interface Printer {
  print();
}

interface Fax {
  fax();
}

interface Scanner {
  scan();
}

class AllInOnePrinter implements Printer, Fax, Scanner {
  print() {
    // ...
  }  
  
  fax() {
    // ...
  }

  scan() {
    // ...
  }
}

class EconomicPrinter implements Printer {
  print() {
    // ...
  }
}
```
왜 예시를 객체지향으로 들고 왔을까요? 함수형에서는 사실 interface당 함수가 1:1의 관계이기에 ISP의 원칙을 위배하기란 쉽지 않습니다.  

### Tree shaking  
https://linguinecode.com/post/reduce-css-file-size-webpack-tree-shaking  


## D - DIP / 의존관계 역전 원칙
의존관계 역전 원칙 (Dependency inversion principle)  
프로그래머는 “추상화에 의존해야지, 구체화에 의존하면 안된다.” 의존성 주입은 이 원칙을 따르는 방법 중 하나다.  

"전기를 이용하기 위해서는 플러그를 꽃으면 된다."(추상화) 라는 추상화된 방법만 전달을 하고 있다면 플러그에서 실제 전기 배선이 어떻게 되던간에(구체화) 사용자는 관여하지 않아도 됩니다. 우리가 필요한것은 전기이며 실제로 전기를 얻기 위한 구체적인 방법이 아니니까요.  

https://doublem.org/SOLID_LSP_ISP_DIP/  

