# Javascript에서도 SOLID 원칙이 통할까? (객체지향 5 원칙)

https://velog.io/@teo/Javascript%EC%97%90%EC%84%9C%EB%8F%84-SOLID-%EC%9B%90%EC%B9%99%EC%9D%B4-%ED%86%B5%ED%95%A0%EA%B9%8C?fbclid=IwAR3Q9yeXJNSYNOqMWF-CBqtZHNpf8FSZ9BspxCLRPFYzdouJ2EvySeyzFRc

## `객체지향 5원칙 (SOLID)은 구시대의 유물 ?`

https://mangsby.com/blog/programming/%EA%B0%9D%EC%B2%B4%EC%A7%80%ED%96%A5-5%EC%9B%90%EC%B9%99-solid%EC%9D%80-%EA%B5%AC%EC%8B%9C%EB%8C%80%EC%9D%98-%EC%9C%A0%EB%AC%BC%EC%9D%B8%EA%B0%80/

https://blog.cleancoder.com/uncle-bob/2020/10/18/Solid-Relevance.html

## `타입스크립트(TypeScript) SOLID`

https://github.com/labs42io/clean-code-typescript#solid

## SOLID

컴퓨터 프로그래밍에서 SOLID란 로버트 마틴이 2000년대 초반에 명명한 객체 지향 프로그래밍 및 설계의 다섯 가지 기본 원칙을 마이클 페더스가 두문자어 기억술로 소개한 것이다. 프로그래머가 시간이 지나도 유지 보수와 확장이 쉬운 시스템을 만들고자 할 때 이 원칙들을 함께 적용할 수 있다. SOLID 원칙들은 소프트웨어 작업에서 프로그래머가 소스 코드가 읽기 쉽고 확장하기 쉽게 될 때까지 소프트웨어 소스 코드를 리팩터링하여 코드 냄새를 제거하기 위해 적용할 수 있는 지침이다. 이 원칙들은 애자일 소프트웨어 개발과 적응적 소프트웨어 개발의 전반적 전략의 일부다.

https://ko.wikipedia.org/wiki/SOLID_(%EA%B0%9D%EC%B2%B4_%EC%A7%80%ED%96%A5_%EC%84%A4%EA%B3%84)

https://github.com/labs42io/clean-code-typescript#solid

## S - SRP / 단일 책임 원칙 (Single responsibility principle)

핵심: 순수함수는 너무나도 SRP의 원칙에 들어맞는 모양 (같은 이유로 변경될 코드들은 모으고. 다른 이유로 변경될 코드들은 흩어라.)

"객체(함수)는 오직 하나의 책임을 가져야 한다. (함수는 오직 하나의 변경의 이유만을 가져야 한다.)"  
"같은 이유로 변경될 코드들은 모으고. 다른 이유로 변경될 코드들은 흩어라."

### 1개의 함수는 1개의 역할만 수행하자!

https://github.com/labs42io/clean-code-typescript#functions-should-do-one-thing

```javascript
// Bad:
function emailClients(clients: Client[]) {
  clients.forEach(client => {
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

### 무조건 함수단위로 쪼개기(재활용)보다 실제 확장가능성을 고려할 것!

(무조건적 분리 보다는 캡슐화 및 확장 가능한 설계를 고민하는 것!)

1. 재사용이나 변경의 여지가 있는가?
2. 함수명이 표현식보다 훨씬 더 가독성이 있는가?
3. 반대로 함수표현으로 인해 전체 파이프라인을 왔다 갔다 하게 되어 이해하는데 방해가 되는가?
4. 하나의 파이프 라인에 속한 함수들이 각각의 모듈로 쪼개어져 있어 응집도가 떨어지는가?

가독성과 응집도를 기준으로 적절히 inline을 사용하시는 것도 필요합니다.  
가독성의 기준은 본인이 아니라 이 코드를 읽는 다른 사람이므로 잘 모르겠다면 주위 동료에게 물어보시면 좋을 것 같아요.

### One more Thing! 순수함수로 작성해보자!

클래스를 쓰지 않고 함수만 사용한다고 함수형 프로그래밍이라고 할 수는 없습니다. 함수형 프로그래밍이 되기 위해서는 순수함수와 부수효과를 분리하는 구조가 되어야 합니다.

https://maxkim-j.github.io/posts/js-pure-function

순수함수란?

1. 1개의 반환값이 반드시 존재한다.
2. 같은 인자를 넣었을때에는 항상 같은 값을 반환한다.
3. 함수 외부의 어떠한 값을 변화시켜서는 안된다.

`순수함수는 너무나도 SRP의 원칙에 들어맞는 모양`이 되게 됩니다.

## O - OCP / 개방-폐쇄 원칙 (Open/Closed Principle)

핵심: 새로운 기능의 추가가 일어 났을때에는 기존코드의 수정 없이 추가가 되어야 하고, 내부 매커니즘이 변경이 되어야 할때에는 외부의 코드 변화가 없어야 한다 (모듈은 확장에 열려있고, 변경에는 닫혀있어야 한다.)

“소프트웨어 요소는 확장에는 열려 있으나 변경에는 닫혀 있어야 한다.”

https://levelup.gitconnected.com/the-open-closed-principle-made-simple-cc3d0ed70553

트럭이라는 운송수단과 뒤에 달리는 기구를 분리/결합 할 수 있는 구조를 만들어 두면 새로운 목적이 필요한 도구를 만들어야 할때 트럭 전체를 다시 만들지 않고서 뒤에 달리는 장치만 새롭게 만들어서 붙일 수 있게 됩니다.

OCP의 원칙의 의미는 `새로운 기능의 추가가 일어 났을때에는 기존코드의 수정 없이 추가가 되어야 하고, 내부 매커니즘이 변경이 되어야 할때에는 외부의 코드 변화가 없어야 한다` 라는 것입니다.

함수형 프로그래밍에서 이 OCP를 가장 잘 느낄 수 있는 것은 바로 `map, filter, reduce와 같은 Higer order Function(or Method)`와 `webpack loader와 같은 플러그인 또는 middleware 개념`입니다.

```javascript
// Bad:
function getMutipledArray(array, option) {
  const result = [];
  for (let i = 0; i < array.length; i++) {
    if (option === 'doubled') {
      result[i] = array[i] * 2; // 새로운 방식으로 만들기 위해서는 수정이 필요하다.
    }
    if (option === 'tripled') {
      result[i] = array[i] * 3; // 옵션으로 분기는 가능하나
    }
    if (option === 'half') {
      result[i] = array[i] / 2; // 새로운 기능을 추가하려면 함수 내에서 변경이 되어야 한다.
    }
  }
  return result;
}

// Good:
// option을 받는게 아니라 fn을 받아보자.
// 이제 새로운 array를 만든다는 매커니즘은 닫혀있으나 방식에 대해서는 열려있다.
function map(array, fn) {
  const result = [];
  for (let i = 0; i < array.length; i++) {
    result[i] = fn(array[i], i, array); // 내부 값을 외부로 전달하고 결과를 받아서 사용한다.
  }
  return result;
}

// 얼마든지 새로운 기능을 만들어도 map코드에는 영향이 없다.
const getDoubledArray = array => map(array, x => x * 2);
const getTripledArray = array => map(array, x => x * 3);
const getHalfArray = array => map(array, x => x / 2);
```

하나의 함수의 기능이 여러가지 옵션들로 인해 내부에서 분기가 많이 발생하고 있다면 OCP와 SRP의 원칙에 맞게 `함수를 매개 변수`로 받는 방법을 통해서 `공통 매커니즘의 코드와 새로운 기능에 대한 코드를 분리`해서 다룰 수 있게 할 수 있습니다.

실전에서는 Redux의 middleware, Webpack의 loader, vite의 plugin과 같이 아주 많은 곳에서 이러한 원칙을 잘 지켜 유연한 확장과 견고한 매커니즘을 유지하는 좋은 설계를 가지고 있습니다.

`버그 수정이 아닌 새로운 기능을 개발할때 기존에 개발된 함수를 수정하면서 코드를 개발하고 있다면 OCP 원칙을 위배한 코드를 작성하고 있을 확률이 엄청 높습니다!`

## L - LSP / 리스코프 치환 원칙 (Liskov substitution principle)

핵심: 상속을 기반하므로 함수형 프로그래밍에게 바로 적용하기는 힘들 것 (어떤 인터페이스를 사용하는 프로그램은 그 인터페이스의 구현체(implementation)에 의해 동작이 오락가락하면 안된다.)

“프로그램의 객체는 프로그램의 정확성을 깨뜨리지 않으면서 하위 타입의 인스턴스로 바꿀 수 있어야 한다.”  
계약에 의한 설계를 참고하라.

많은 분이 SRP와 OCP는 쉽게 이해하다가 LSP부터 이게 무슨말이야? 하고 헷갈려합니다.

치환이라고 하면 상호변경을 의미합니다.  
이 원칙에서는 뭘 치환하는 걸까요? 상속을 받은 하위 타입과 상위타입입니다.  
이 둘을 치환을 해도 프로그램에서는 문제가 없어야 한다 라는 것이 이 원칙입니다.

https://www.cnblogs.com/charon922/p/8643454.html

https://github.com/labs42io/clean-code-typescript#liskov-substitution-principle-lsp

리스코프 치환 원칙은 상속을 받아 만든 하위타입의 제약조건들이 상위 타입에서 먼저 선언한 조건들과 충돌이 날 경우 유지보수가 힘들어 진다는 문제점이 있기 때문에 만들어진 것입니다.  
따라서 `계층도간의 is-a 관계를 만족한다고 하더라도 하위 타입에서 가변성을 가지면서 상위 타입에서 정의한 조건과 일치하지 않는다면 상속을 받지 말아야 합니다.`

### 함수형 프로그래밍에서는요?

이 원칙은 상속을 기반하므로 함수형 프로그래밍에게 바로 적용하기는 힘들것 같습니다.  
하지만 `먼저 선언된 조건들과 나중에 선언된 조건들이 서로 충돌이 나는 것을 방지해야한다는 원칙`으로 접근을 한다면 `선언형 함수형 프로그래밍에서 발생하는 순환 종속성을 만들어내는 infinite Cycle을 만들지 않아야 한다 원칙`으로 대체를 할 수 있을 것 같습니다.

```javascript
let [num1, setNum1] = useState(5);
let [num2, setNum2] = useState(10);
let [ratio, setRatio] = useState();

let [calc1, setCalc1] = useState();
let [calc2, setCalc2] = useState();

useEffect(() => {
  setRatio(num2 / num1);
}, [num1, num2]);
useEffect(() => {
  setCalc1(calc2 / ratio);
}, [calc2, ratio]);
useEffect(() => {
  setCalc2(calc1 * ratio);
}, [calc1, ratio]);
```

이와 같이 서로가 서로의 종속성과 순환참조를 만들어 무한루프에 빠지지 않을 수 있도록 하는 원칙을 기억하시고 프로그래밍을 하시면 좋을 것 같습니다.

## I - ISP / 인터페이스 분리 원칙 (Interface segregation principle)

핵심: 필요한 것만 선언, 작게 유지, Tree shaking 가능한 모듈 (사용자가 필요하지 않은 것들에 의존하게 되지 않도록, 인터페이스를 작게 유지하라.)

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

왜 예시를 객체지향(class)으로 들고 왔을까요?  
함수형에서는 사실 interface 당 함수가 1:1 의 관계이기에 ISP 의 원칙을 위배하기란 쉽지 않습니다.

## D - DIP / 의존관계 역전 원칙 (Dependency inversion principle)

핵심: 리액트 컴포넌트 내부에서 데이터를 반환하는 커스텀훅(추상화)을 만들고, 세부 내용은 커스텀훅 내부에서 axios 호출 (추상화하는 방향으로 의존하라.)

프로그래머는 “추상화에 의존해야지, 구체화에 의존하면 안된다.” 의존성 주입은 이 원칙을 따르는 방법 중 하나다.

우리가 전기기구를 사용하기 위해서는 콘센트에 플러그를 꽃는 방법만 알면됩니다.  
실제로 전기의 배선을 붙여가며 전기기구를 사용하지 않죠.  
`"전기를 이용하기 위해서는 플러그를 꽃으면 된다."(추상화)` 라는 추상화된 방법만 전달을 하고 있다면,  
`플러그에서 실제 전기 배선이 어떻게 되던간에(구체화)` 사용자는 관여하지 않아도 됩니다.  
`우리가 필요한것은 전기이며 실제로 전기를 얻기 위한 구체적인 방법`이 아니니까요.

https://doublem.org/SOLID_LSP_ISP_DIP/

보통 우리가 보편적으로 많이 사용하고 있는 React Component와 custom hook과 axios API 정도로 생각을 해보았습니다.

잘 만들어진 구조로 인해서 컴포넌트에서 서버의 데이터를 조작하기 위해서는 적절한 수준의 추상화와 레이어가 존재를 하게 됩니다.

axios의 레이어를 통해서 서버와의 데이터를 주고 받습니다.  
`custom hook 을 통해서 Component 에서는 서버에 직접 호출하는 구체화보다는 그저 필요한 데이터를 요청하는 형식의 추상화된 layer 계층인 hook을 사용할 수 있습니다.`

이렇게 `추상화된 레이어를 두는 이유는 컴포넌트 입장에서는 데이터가 필요한거지 그게 반드시 서버의 데이터일 필요는 없기 때문`입니다.  
이러한 레이어를 통해서 언제든 서버가 아니라 로컬의 mock 데이터나 다른 방식으로도 사용하는 쪽의 코드를 변화없이 변경할 수 있게 됩니다.

만약 Component에서 axios를 호출하거나 fetch를 바로 호출을 한다면 구체적인 부분에 의존을 하면 안된다는 DIP 원칙에 어긋나기에 좋은 설계가 아닐 수 있겠지요.

또한 레이어를 벗어나 axios를 다루는 모듈에서 컴포넌트의 props을 조작하는 등 레이어의 범위를 벗어나는 코드 역시 DIP에 어긋나는 설계입니다.
