# 스코프

```javascript
// 스코프 퀴즈 - var
(function () {
  var a = 'bbb';
  console.log('A: ' + a); // bbb
  function test1() {
    console.log('B: ' + a); // undefined
    (function () {
      console.log('C: ' + a); // undefuned
      a = 'ccc';
    })();
    var a;
    console.log('D: ' + a); // ccc
  }
  function test2() {
    console.log('E: ' + a); // ddd
  }
  test1();
  a = 'ddd';
  test2();
})();
```

```javascript
// 클로저 방식에서의 스코프 생성시점 증명 예제
// 함수객체가 실행될때 상위 스코프리스트 기반으로 내부스코프를 연결리스트로 붙여 스코프리스트 만듦
var test = 'test';
function a(c) {
  // a 함수객체가 실행되는 시점에 글로벌 스코프와 test 변수 스코프정보 담고 있음
  var b = 'a';
  return function () {
    // 무명함수객체가 실행되는 시점에 상위 함수 스코프기반으로 연결리스트 형태로 내부스코프 b변수 정보를 추가하여 스코프리스트 만듦
    alert(test);
    return c();
  };
}
function e() {
  // a함수의 파라미터로 e 함수를 넘겼지만, e 함수객체가 실행되는 시점에 b 변수는 없다. (즉, 함수가 실행되는 시점의 스코프체이닝에는 b변수가 없다.)
  alert(b); // 렉시컬 환경에 따라 실행 안된다.
}
var hi = a(e);
hi();
```

# 반복문 작동원리 - 스코프 개념 이해 필요

```
for(초기화(순서1); 반복조건(순서2); 반복이 될 때마다 실행되는 코드(순서4, 이후 2,3,4반복)) {
    반복해서 실행될 코드(순서3)
    break 문을 만나면 '반복이 될 때마다 실행되는 코드'를 거치지 않고 for문을 바로 빠져나간다.
}
```

```javascript
for (var i = 1; i <= 5; i++) {
  setTimeout(function () {
    console.log(i);
  }, i * 1000);
}
```

우리는 이 코드가 실행되기 전에 1초마다 하나씩 증가하면서 1,2,3,4,5 이렇게 출력한다고 생각한다.  
하지만 실제로 돌려보면 6만 1초에 한 번씩 출력한다. 왜 6이 나오는 것일까?

반복문이 끝나는 조건은 i<=5 를 벗어났을 때이다.  
timeout 함수 콜백은 반복문이 끝나고 나서 작동한다.  
따라서 i가 5를 초과하는 가장 작은 자연수인 6일 때 실행이 되는 것이다.

이 코드를 우리가 예상한 대로 동작하게 하려면 각각의 i에 대한 복제본을 잡아두어야 한다.  
`현재 반복문 안 5개의 함수들은 반복마다 따로 정의되었음에도 모두 같이 글로벌 스코프 클로저를 공유해 해당 스코프 안에는 하나의 i만이 존재한다.`  
`따라서 모든 함수는 당연하게도 같은 i에 대한 참조를 공유한다.`

여기서 필요한 것은 더 많은 닫힌(closed) 스코프이다. 매 반복문이 돌 때마다 하나의 새로운 닫힌 스코프가 필요하다.

```javascript
for (var i = 1; i <= 5; i++) {
  (function (j) {
    setTimeout(function () {
      console.log(j);
    }, j * 1000);
  })(i);
}
```

ES6에서 적용된 let 선언문을 사용해서도 해결할 수 있다.  
`let은 블록 스코프로 변수를 선언한다.`  
반복문 시작에서 let으로 선언된 변수는 한 번만 선언되는 것이 아니라 반복할 때마다 선언된다.  
따라서 해당 변수는 편리하게도 반복마다 이전 반복이 끝난 이후의 값으로 초기화된다.

```javascript
for (let i = 1; i <= 5; i++) {
  setTimeout(() => console.log(i), i * 1000);
}
```

# 클로저

`study.git/프로그래밍_개발방법론_패턴/함수형_자바스크립트/고차함수_클로저.md` 참고!

You Don’t Know JS의 저자로 유명한 카일 심슨(Kyle Simpson)은 클로저를 다음과 같이 정의

`클로저는 함수가 속한 렉시컬 스코프를 기억하여 함수가 렉시컬 스코프 밖에서 실행될 때에도 이 스코프에 접근할 수 있게 하는 기능`을 뜻한다.

https://github.com/getify/You-Dont-Know-JS/blob/2nd-ed/scope-closures/ch6.md#modules

## 유성민 개인적 클로저 활용

- 정보 은닉
- 공통(반복) 코드 추상화 (E2E 테스트 개밝간 testcase 작성함수, monorepo-nodejs20.git/apps/e2e-test/testcase/modules/index.ts)

## 리액트 Hook 클로저 활용

https://hewonjeong.github.io/deep-dive-how-do-react-hooks-really-work-ko/

```javascript
// 버그 있음 주의!
function useState(initialValue) {
  var _val = initialValue;
  // state() 함수 없음
  function setState(newVal) {
    _val = newVal;
  }
  return [_val, setState]; // _val를 그대로 노출
}
var [foo, setFoo] = useState(0);
console.log(foo); // 함수 호출 할 필요 없이 0 출력
setFoo(1); // useState의 스코프 내부에 있는 _val를 변경합니다.
console.log(foo); // 0 출력 - 헐!!
```

```javascript
// 수정된 코드! - 이 또한 버그가 있음!
const React = (() => {
  let _value = null;
  let _deps = [];
  const setState = update => {
    _value = update;
  };

  return {
    // 리액트의 재렌더링 효과를 내기 위함
    render(Component) {
      const C = Component();
      C.render();
      return C;
    },
    useState(initial) {
      _value = _value || initial;
      return [_value, setState];
    },
    useEffect(callback, depArray) {
      const hasNoDeps = !depArray;
      const hasChangedDeps = _deps?.length
        ? !depArray.every((item, i) => item === _deps[i])
        : true;
      if (hasNoDeps || hasChangedDeps) {
        callback();
        _deps = depArray;
      }
    },
  };
})();

function Counter() {
  const [count, setCount] = React.useState(0);
  React.useEffect(() => {
    console.log('effect', count);
  }, [count]);
  return {
    click: () => setCount(count + 1),
    noop: () => setCount(count),
    render: () => console.log('render:', { count }),
  };
}

let App = React.render(Counter); // render: { count: 0 }
App.click();
App = React.render(Counter); // render: { count: 1 }
App.noop();
App = React.render(Counter); // render: { count: 1 }
```

위 코도는 잘못 구현된 싱글톤 형태입니다. (useState 또는 useEffect 가 각각 하나 이상이 존재하면 버그가 발생합니다.)

```javascript
const React = (function () {
  let hooks = [],
    currentHook = 0; // Hook 배열과 반복자(iterator)!
  return {
    render(Component) {
      const Comp = Component(); // 이펙트들이 실행된다.
      Comp.render();
      currentHook = 0; // 다음 렌더를 위해 초기화
      return Comp;
    },
    useEffect(callback, depArray) {
      const hasNoDeps = !depArray;
      const deps = hooks[currentHook]; // type: array | undefined
      const hasChangedDeps = deps
        ? !depArray.every((el, i) => el === deps[i])
        : true;
      if (hasNoDeps || hasChangedDeps) {
        callback();
        hooks[currentHook] = depArray;
      }
      currentHook++; // 이 Hook에 대한 작업 완료
    },
    useState(initialValue) {
      hooks[currentHook] = hooks[currentHook] || initialValue; // type: any
      const setStateHookIndex = currentHook; // setState의 클로저를 위해!
      const setState = newState => (hooks[setStateHookIndex] = newState);
      return [hooks[currentHook++], setState];
    },
  };
})();

function Counter() {
  const [count, setCount] = React.useState(0);
  const [text, setText] = React.useState('foo'); // 두번 째 상태 Hook!
  React.useEffect(() => {
    console.log('effect', count, text);
  }, [count, text]);
  return {
    click: () => setCount(count + 1),
    type: txt => setText(txt),
    noop: () => setCount(count),
    render: () => console.log('render', { count, text }),
  };
}
let App;
App = React.render(Counter);
// 이펙트 0 foo
// render {count: 0, text: 'foo'}
App.click();
App = React.render(Counter);
// 이펙트 1 foo
// render {count: 1, text: 'foo'}
App.type('bar');
App = React.render(Counter);
// 이펙트 1 bar
// render {count: 1, text: 'bar'}
App.noop();
App = React.render(Counter);
// // 이펙트가 실행되지 않음
// render {count: 1, text: 'bar'}
App.click();
App = React.render(Counter);
// 이펙트 2 bar
// render {count: 2, text: 'bar'}
```

커스텀 훅까지!!

```javascript
function useSplitURL(str) {
  const [text, setText] = React.useState(str);
  const masked = text.split('.');
  return [masked, setText];
}
function Component() {
  const [text, setText] = useSplitURL('www.netlify.com');
  return {
    type: txt => setText(txt),
    render: () => console.log({ text }),
  };
}

let App;
App = React.render(Component);
// { text: [ 'www', 'netlify', 'com' ] }
App.type('www.reactjs.org');
App = React.render(Component);
// { text: [ 'www', 'reactjs', 'org' ] }}
```

# `모던 리액트 Deep Dive` 책 내용 중

## 클로저를 사용할 때 주의할 점 - p65

```javascript
for (var i = 0; i < 5; i++) {
  setTimeout(function () {
    console.log(i);
  }, i * 1000);
}
```

실제로 위 코드를 실행하면 0, 1, 2, 3, 4초 뒤에 5만 출력된다.

그 이유는 i 가 전역 변수로 작동하기 때문이다.  
자바스크립트는 기본적으로 함수 레벨 스코프를 따르고 있기 때문에 var 는 for 문의 존재와 상관없이  
해당 구문이 선언된 함수 레벨 스코프를 바라보고 있으므로  
함수 내부 실행이 아니라면 전역 스코프에 var i 가 등록돼 있을 것이다.

for 문을 다 순회한 이후, 태스크 큐에 있는 setTimeout 을 실행하려고 했을 때,  
이미 전역 레벨에 있는 i 는 5 로 업데이트가 완료돼 있다.

이를 올바르게 수정하는 방법은  
첫째, 함수 레벨 스코프가 아닌 블록 레벨 스코프를 갖는 let 으로 수정하는 것이다.  
두 번째로는 클로저를 제대로 활용하는 것이다.

```javascript
for (var i = 0; i < 5; i++) {
  setTimeout(
    (function (sec) {
      return function () {
        console.log(sec);
      };
    })(i),
    i * 1000,
  );
}
```

`클로저의 기본 개념, "함수와 함수가 선언된 어휘적 환경의 조합"을 주의깊게 살표봐야 클로저를 제대로 활용할 수 있다.`  
(유성민 생각: 클로저는 함수 선언시점의 스코프체인 정보를 가지고 반환되는 함수를 말한다.)
