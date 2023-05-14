# 자바스크립트의 메모리 누수

가비지 컬렉팅 언어의 메모리 누수의 주된 원인은 '원치 않는 참조' (unwanted references)다.

## Mark-and-sweep

대부분의 가비지 컬렉팅 언어는 `mark-and-sweep`이라는 잘 알려진 알고리즘을 사용한다.  
이 알고리즘은 아래와 같은 방식으로 동작한다.

1. 가비지 콜렉터가 roots의 목록을 만든다.
   roots는 보통 코드내에서 참조되고 있는 전역 변수를 의미한다.  
   자바스크립트의 경우, window 객체가 대표적인 전역 변수의 예로, root로 작동한다.  
   window 객체는 항상 존재해야 하므로, 가비지 컬렉터는 window와 그 하위 자식들을 모두 항상 존재해야하는 것으로 인지한다. (가비지가 아니다.)

2. 모든 roots들은 active 한 것으로 (가비지가 아닌 것으로) 표시된다.  
   모든 자식들 또한 재귀적으로 동일하게 처리된다.  
   root에서 접근 가능한 모든 것들은 가비지가 아닌 것으로 판단된다.

3. active로 표시되지 않은 것들은 모두 가비지가 될 수 있는 것으로 판단한다.  
   따라서 콜렉터는 이들을 메모리에서 해제시켜 OS로 돌려줄 수 있다.

---

# Garbage Collection 살펴보기

https://jayconrod.com/posts/55/a-tour-of-v8-garbage-collection

메모리를 사용하는 모든 프로그램은 메모리에 대한 메카니즘을 필요로한다.  
C, C++에서는 아래 표에서 보여지는 것과 같이 malloc(), free()에 의해 이뤄진다.  
우리는 프로그래머에게 더이상 필요하지 않은 힙 메모리를 거둬들여야 한다는 책임이 있다는 것을 알고 있다.  
만약에 프로그램이 사용하지 않는 힙을 거둬들이지 않고 메모리가 고갈될 때까지 할당을 지속한다면 프로그램 충돌이 발생할 것이다. 우리는 이것을 `memory leak`이라고 부른다.

## garbage collection 실행에 대한 더 많은 정보

https://github.com/bretcope/node-gc-profiler

---

## 흔한 자바스크립트 메모리 누수 3가지

https://developer.chrome.com/docs/devtools/memory-problems/heap-snapshots/

1. 의도치 않은 전역 변수

```javascript
function setTest1() {
  // window.test1
  test1 = '123';
}
function setTest2() {
  // window.test2
  this.test2 = '456';
}
```

우리가 예상치 못한 전역 변수에 대해서 이야기 하긴했지만, 사실 많은 코드에 명시적인 전역 변수가 흩어져 있는 것이 사실이다.  
이는 정의상 메모리를 해제할 수가 없다. (null처리 또는 재할당 되지 않는 경우)  
특히 방대한 양의 정보를 임시로 저장하고, 처리하는데 전역 변수를 쓴다면 이는 고려해봐야할 문제다.
`만약 전역 변수에 큰 데이터가 들어가 있다면, 모든 작업이 끝난 이후에 null 처리 하거나 재할당 해주는 것이 필요`하다.

전역 변수와 관련하여 메모리 소비량이 증가하는 한가지 일반적인 원인은 캐시다.  
반복적으로 사용되는 저장데이터는 캐시로 처리한다.  
이것이 효율적으로 작동하기 위해서는 캐시크기에 대한 상한선이 있어야 한다.  
`한도가 없는 캐시는 메모리 해제를 할 수가 없으므로 메모리 소비 크기를 늘리는 원인`이 된다.

2. 잊혀진 타이머 또는 콜백

- 동적 DOM에 따른 중복 이벤트 지속 리스너(함수 생성)
- DOM 제거에 따라 필요 없어진 이벤트 제거하지 않음

```javascript
var someResource = getData();
var intervalTempCode = setInterval(function () {
  var node = document.getElementById('Node');
  if (node) {
    // Do stuff with node and someResource.
    node.innerHTML = JSON.stringify(someResource);
  }
}, 1000);

// '#Node' element 가 제거(removeChild 등)될 경우
// clearInterval(intervalTempCode) 실행해 주어야 한다!
```

이 예제는 타이머에서 일어날 수 있는 일, 즉 `더 이상 필요하지 않은 node 나 데이터를 참조하는 타이머의 예시`다.  
node 로 선언된 객체는 제거 될 수 있으므로, 인터벌 핸들러 내부의 전체블록을 불필요하게 만들 수 있다.  
그러나 핸들러는, 인터벌이 여전히 활성화 되어 있기 때문에 메모리 해제를 할 수가 없다.  
`인터벌이 해제가 될 수 없다면, 그 dependency 도 해제 될 수가 없다.`  
이 말인 즉슨, someResource 는, 해제가 될 수 없다는 뜻이다.

`Observer 의 경우, 더 이상 필요하지 않은 경우 (또는 관련 객체에 접근하지 못하게 하려는 경우) 해당객체를 제거하기 위해 명시적으로 호출하는 것이 중요`하다.

```javascript
// 이 element는 onClick에서 참조됨
var element = document.getElementById('button');

function onClick(event) {
  element.innerHtml = 'text';
}

element.addEventListener('click', onClick);

element.removeEventListener('click', onClick);
element.parentNode.removeChild(element); // element 제거!

// 이제 `element`는 더 이상 쓰이 지않는다.
// `element`와 `onClick` 모두 스코프에서 사라져서 모두 해제 대상이 된다.
// 오래된 브라우저에서는 이러한 순환참조를 잘 해결하지 못했다.
```

jQuery와 같은 프레임워크나 라이브러리는 `노드를 없애버리기전에 명시적으로 리스너를 제거`한다.  
이는 라이브러리에서 수행되며, 구버전 IE에서 발생할 수도 있는 브라우저의 메모리 누수가 발생 하지 않도록 구현해두었다.

3. DOM 외부에서의 참조

```javascript
//
var elements = {
  button: document.getElementById('button'),
  image: document.getElementById('image'),
  text: document.getElementById('text'),
};

function doStuff() {
  image.src = 'http://some.url/image';
  button.click();
  console.log(text.innerHTML);
}

function removeButton() {
  document.body.removeChild(document.getElementById('button')); // element.button 참조는 여전히 메모리에 남아 있음!

  // 이 시점에서도 여전히 elements 에서 button 의 참조를 가지고 있다.
  // 이 경우 button element 는 여전히 메모리에 있으며, GC 에 의해 해제 될 수 없다.

  elements.button = null; // 명시적으로 임시저장(참조)하고 있던 객체도 비움
}
```

element 가 DOM 트리에서 제거될 경우(removeChild 등에 의해 제거),  
해당 `element 를 참조(저장)하고 있는 객체(예: elements.button) 도 명시적으로 제거(null)` 해야 한다.

4. 클로저
   https://blog.meteor.com/an-interesting-kind-of-javascript-memory-leak-8b47d2e7f156

```javascript
var theThing = null;

var replaceThing = function () {
  var originalThing = theThing;
  // 상위 스코프인 originalThing을 참조하는 스코프를 갖게됨
  // 동시에 theThing 도 참조하게됨.
  var unused = function () {
    if (originalThing) console.log('hi');
  };

  //
  theThing = {
    longStr: new Array(1000000).join('*'),
    someMethod: function () {
      console.log(someMessage);
    },
  };
};
setInterval(replaceThing, 1000);
```

replaceThing 은 매번 실행 될 때 마다 길이가 큰 문자열을 생성하긴 하겠지만,  
최신 자바스크립트 엔진 (v8과 같은) 에서는 이전에 호출된 originalThing이 사용 되지 않았음을 파악하고, 이전 값을 해제하여 메모리 사용량을 유지 시킨다.

`하지만 위 코드에서는 unused 의 내부 함수로 인해 계속해서 originalThing 을 참조`하게 되고  
`unused 가 사용되지 않더라도, 이 코드가 실행 될 때마다 메모리 사용량이 꾸준히 증가하는 것`을 볼 수 있다.  
따라서 GC가 작동하더라도 메모리 사용량은 크게 줄어들지 않게 된다.  
본질적으로 클로저의 참조 목록이 생성되면 (theThing 으로 부터 생겨난 root), 이 클로저 내부에는 큰사이즈 배열에 대한 간접적인 참조도 동반하게 되므로 메모리 누수가 발생된다.
