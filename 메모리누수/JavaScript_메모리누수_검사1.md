# 크롬 메모리 프로파일러 사용하는 방법 - 메모리 누수 탐지

https://engineering.linecorp.com/ko/blog/vue-memory-leak-analysis/?utm_source=twitter&utm_medium=devrel  
https://sematext.com/blog/nodejs-memory-leaks/

https://ajh322.tistory.com/243  
https://sculove.github.io/slides/memory/#/  
https://ui.toast.com/weekly-pick/ko_20210611/  
https://marmelab.com/blog/2018/04/03/how-to-track-and-fix-memory-leak-with-nodejs.html

## 개념

https://medium.com/naver-place-dev/%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8%EC%99%80-v8-%EC%97%94%EC%A7%84%EC%9D%98-%EB%A9%94%EB%AA%A8%EB%A6%AC-%EA%B4%80%EB%A6%AC-%ED%94%84%EB%A1%9C%EC%84%B8%EC%8A%A4-f45091e696e1  
https://velog.io/@code-bebop/JS-%EB%A9%94%EB%AA%A8%EB%A6%AC-%EA%B5%AC%EC%A1%B0

---

# 메모리 누수에는 크게 두가지 형태가 있다.

하나는 계속해서 메모리 사용량이 증가하는 것이고,  
다른 하나는 단 한번만 메모리 사용량이 증가하는 형태다.

일반적으로 전자는 찾기 쉽다.  
하지만 전자는 메모리가 늘어나면 브라우저가 느려지거나 스크립트 실행이 중단되어 성가시다.  
후자의 유형인 주기적이지 않은 누수는 다른 메모리 할당에 비해 아주 쉽게 발견할 수 있다.  
그러나 이러한 경우는 흔치 않아서, 잘 인지하지 못하고 넘어가는 경구가 많다.  
하지만 주기적 메모리 누수는 버그이기 때문에 반드시 해결해야 한다.

---

# 크롬 메모리 프로파일링 툴

`https://yceffort.kr/2020/07/memory-leaks-in-javascript`

크롬은 자바스크립트 코드 메모리 사용을 프로파일링 할 수 있는 도구를 제공한다.  
`메모리와 관련된 도구로 Performance 메뉴와 Memeory 메뉴`가 있다.

- Performance
  코드에서 비정상적인 메모리 사용 패턴을 발견하는데 필수적으로 사용
- Memory
  스냅샷을 찍을 수 있고, 자바스크립트 코드의 메모리 사용량을 볼 수도 있다.
  또한 시간에 따라 메모리 할당을 기록할 수도 있다. summary와 comparison을 사용하면 된다.

`Performance 탭으로 메모리 누수가 일어나는지 여부를 확인하고, Memory 탭에서 어디에서 일어나는지 확인`한다.

## 크롬 메모리 검사 - `Performance 탭` - 주기적으로 메모리 누수가 증가하는 케이스 (`메모리 누수가 발생하고 있는지 여부 확인!`)

크롬에서 제공하는 예제

- https://developer.chrome.com/docs/devtools/#memory
- https://developer.chrome.com/devtools/docs/demos/memory/example1

```javascript
var x = [];

function createSomeNodes() {
  var div,
    i = 100,
    frag = document.createDocumentFragment();
  for (; i > 0; i--) {
    div = document.createElement('div');
    div.appendChild(
      document.createTextNode(i + ' - ' + new Date().toTimeString()),
    );
    frag.appendChild(div);
  }
  document.getElementById('nodes').appendChild(frag);
}
function grow() {
  x.push(new Array(1000000).join('x'));
  createSomeNodes();
  setTimeout(grow, 1000); // 핵심!!! grow 재귀호출로 반복 실행 (무한 호출)
}
```

`grow`가 호출되면 `div`노드를 만들고, `DOM`에 추가시킨다.  
또한 큰 배열을 할당하고, 이를 글로벌 변수에 참조시킨다.  
이 코드는 위에서 언급한 크롬도구로 살펴볼 수 있다.

`Performance(성능) 탭에서 기록 버튼 클릭`  
메모리 누수가 있다는 것을 보여주는 요소가 두가지 있다.  
![스크린샷 2022-06-03 오후 10 26 22](https://user-images.githubusercontent.com/10363214/171863356-bed812c6-2444-41a3-b567-a29441ad4215.png)

초록선 (nodes)와 파란선 (JS Heap) 이다.  
`노드들이 꾸준히 증가하면서 감소하지 않는데, 이것이 가장 큰 징후`다.

JS Heap 그래프도 역시 메모리 사용이 증가되고 있음을 보여준다.  
![스크린샷 2022-06-03 오후 10 27 59](https://user-images.githubusercontent.com/10363214/171863588-af467907-c69c-494b-a9a0-84c9134a455b.png)  
하지만 가비지 컬렉터의 영향으로 알아채기가 쉽지 않다.  
초기 메모리가 증가하다가, 한번 크게 감소하고, 다시 증가 하다 감소하는 형태가 반복되고 있다.  
이 경우 핵심은 가비지 컬렉터에 의해 메모리 사용량이 감소할 때마다 이전보다 힙의 크기가 더 크게 유지되고 있다는 점이다.  
다시 말해, GC가 많은 양의 메모리 수집에 성공하고 있지만, 그 중 어딘가에서 일부가 누수되고 있다는 뜻이다.

`이제 메모리 누수가 있다는 것을 알았다. 다음으로, 어디에서 누수되는지 알아보자.`

## 두 개의 스냅샷 찍기 - `Memory 탭` - 어디에서 메모리 누수가 생기는지 찾는 방법 (`핵심 부분!`)

어디에서 메모리 누수가 생기는지 찾기 위해, 크롬 개발자 도구의 Memory 탭을 사용할 것이다.  
이번 단계를 수행하기 위해, 위 단계에서 크롬 예제 페이지를 새로고침하고, `힙 스냅샷 찍기(Take Heap Snapshot)` 을 수행해보자.  
그리고, `버튼을 누른 다음에 좀 기다린 후에 두번 째 스냅샷을 생성(두번 힙 스냅샷 찍기 실행한 것)`한다.

이제 비교할 수 있는 방법이 두가지 있다.

`요약(Summary)를 선택` 한 다음, 오른쪽 또 다른 선택박스(드롭다운)에서 `스냅샷 1에서 스냅샷 2 사이에 할당된 객체(Objects Allocated between Snapshot 1 and Snapshot)를 선택`하거나,  
`요약(Summary) 대신 비교(Comparison)를 선택`하면 된다.  
![스크린샷 2022-06-03 오후 10 37 36](https://user-images.githubusercontent.com/10363214/171865435-ba1a2847-f169-4a73-88e3-c6549fec13ac.png)

여기에서는 쉽게 찾을 수 있다.  
`(string)`을 살펴보면, `xxxxxxxxx....` 새로운 객체 들이 할당되어 있지만, 해제 되지 않아 많은 메모리를 잡아먹고 있음을 알 수 있다.  
![스크린샷 2022-06-03 오후 10 37 46](https://user-images.githubusercontent.com/10363214/171865460-0135ef38-e0ba-4e35-8b92-0aa08811d5bf.png)

그리고 이 배열은 `window`객체의 `x` 변수로 참조되어 있다고 나온다.  
![스크린샷 2022-06-03 오후 10 38 40](https://user-images.githubusercontent.com/10363214/171865473-6aafce58-b6e7-4c67-95d8-4e60b0da95b9.png)  
이는 수집 되지 않은 루트 (window)에 큰 사이즈의 객체가 참조되어 있음을 알려주었다.  
이렇게 메모리 누수와 그 위치를 발견했다.

위 예제에서는 DOM 노드에서의 누수 문제도 포함하고 있다.  
위 스냅샷에서는 노드들을 쉽게 찾을 수 있지만, 규모 가 큰 사이트에서는 복잡해서 찾기 쉽지 않을 것이다.

최신 버전 크롬은 이런 작업에 맞는 도구를 하나 더 제공하는데, Allocation instrumentation on Timeline (과거 Record Heap Allocations) 다.

## Recording Heap allocations to find leaks

### `힙 스냅샷 외 타임라인의 할당 계측(Allocation instrumentation on Timeline) 사용해보기`

![GC](https://github.com/make-story/study/assets/10363214/cbb52c02-65e1-41f8-a005-406a04ac1fdd)

`Memory 탭에서 '힙 스냡샷'이 아닌, '타임라인의 할당 계측' 선택`  
기록이 진행되는 동안, 상단에 파란색 기둥 모양 그래프가 생기는 것을 볼 수 있다.

타임라인 일부를 선택하면,  
해당 기간 동안에 수행되는 할당만 볼 수 있다.  
해당영역을 선택하면, 3개의 constructor 가 존재하는 것을 알 수 있다.  
이 중 하나는 메모리 누수의 원인인 (string) 이고 다른 하나는 DOM, 그리고 나머지는 Text (DOM 마지막에 존재하는 text) 요소다.

`HTMLDivElement` constructor를 선택하고,  
하단의 `Allocation Stack메뉴`를 누르면,  
`grow` 에서 `createSomeNodes`로 참조되어 할당된 요소를 볼 수 있다.  
이제 두 스냅샷을 비교하는 것으로 돌아가보면, 이 생성자가 할당은 하지만 삭제를 하지 않는다는 것,  
즉 회수를 하지 않는다는 것을 볼 수 있다.  
이는 메모리 누수의 징후이며, 이 객체가 어디에 할당되는지 알게 되었다. 이제 이 코드를 고치면 된다.

## 또다른 유용한 기능

![스크린샷 2022-06-03 오후 10 37 36](https://user-images.githubusercontent.com/10363214/183259087-c9f91da6-8af1-455a-913e-e21cd2fd8fe2.png)

요약(Summary) 대신 allocation 을 선택하면, 함수와 관련된 메모리 할당을 보여준다.  
화면에서 grow 와 createSomeNodes 함수가 있는것이 보일 것이다.  
해당 함수를 클릭하면 해당 함수와 관련된 객체 목록을 하단에서 볼 수 있다.  
여기에서는 이미 메모리 누수의 원인으로 밝혀진 (string) HTMLDivElement Text 등이 있는 것을 볼 수 있다.

---

# 크롬 메모리 프로파일러 사용하는 방법

https://yceffort.kr/2022/04/chrome-memory-profiler

```html
<html>
  <head></head>
  <body></body>
</html>
```

위 파일을 별도 html로 저장한 다음에 시크릿탭으로 페이지를 한번 열어보자.  
`꼭 시크릿탭으로 여는 것이 좋다.`

## 개발자 도구 > 메모리 탭 > `힙 스냅샷 하단에 있는 숫자값을 포함할지 여부를 꼭 선택` > 스냅샷 촬영 버튼 클릭

놀랍게도, 아무것도 없는 말그대로 빈페이지 주제에 단순히 빈 페이지를 렌더링하는데에도 많은 오브젝트가 관여되어 있는 것을 볼 수 있다.  
이 페이지가 로드된 이후, 인스턴스화된 각 자바스크립트 객체는 해당 생성자 클래스 아래에 그룹화되어 있는 것을 볼 수 있다.

괄호로 쳐져있는 그룹 `()`은 직접 호출할 수 없는 네이티브 생성자를 나타낸다. 예: `(compiled code)` `(system)`  
`Date` `String` `RangeError` 과 같은 전통적인 자바스크립트 객체도 볼 수 있다.

```html
<html>
  <head>
    <script>
      var counter = 0;
      var instances = [];

      function X() {
        this.i = counter++;
      }

      function allocate() {
        instances.push(new X());
      }
    </script>
  </head>
  <body>
    <button onclick="allocate()">Allocate</button>
  </body>
</html>
```

위 코드에서 `버튼을 클릭하고 메모리 프로파일러를 열어보자.`  
`X`라는 객체가 할당되어 있는 것을 볼 수 있다.

이를 `조금 더 찾기 쉽게 하는 방법`은,  
먼저 `첫번째 스냅샷을 찍은 뒤에`,  
`다시 동그라미 버튼(힙 스냅샷 찍기 버튼, 개발자도구 상단 좌측, 휴지통모양 좌측위치)을 눌러 두번쨰 스냅샷을 찍는 것`이다.  
그리고 선택박스(드롭다운)에서, `스냅샷 1에서 스냅샷 2 사이에 할당된 객체` 선택해 스냅샷 사이에 생성된 생성자만 보는 방법이 있다.

버튼을 클릭한 이벤트만 했을 뿐이라,  
`X`만 보였을 것이라 예상하였지만,  
몇가지 추가적인 작업이 발생했음을 알 수 있다.  
크롬의 경우 레이지 로딩 객체에 대해 최적화를 하는 작업이 있다.  
이 경우에는 HTML 버튼 엘리먼트을 클릭하기 전까지 메모리가 주어지지 않았음을 알 수 있다.  
즉 클릭이 실제로 일어났을 때 그때서야 비로소 메모리를 할당해서 작업을 한 것이다.

이를 확인해보는 방법은 버튼을 여러번 클릭해보는 것이다.  
여러번 클릭한후 스냅샷을 찍어두면,  
아까와 다르게 딱 필요한 `X`만 할당해서 작업이 이뤄지고 있음을 알 수 있다.

각 인스턴스는, 클래스 이름이 아래에 내열되고,  
실제로 그 객체를 클릭해보면 객체에 대한 상세한 정보가 나와있는 것을 알 수 있다.

여기서 주목해야할 것은 `얕은 크기`라고 작성되어 있는 열이다.  
이 `얕은 크기`라는 것은 객체가 유지하고 있는 바이트의 크기를 나타낸다.

`유지된 크기`는 객체가 참조를 보유하고 있는 객체 외에 객체 자체의 내부 메모리 때문에 이 객체가 보유하고 있는 바이트 수를 의미한다. 그리고 이 메모리는 가비지 콜렉팅 되지 않는다.

### 다음으로 살펴볼 메뉴는 타임라인 할당 계측 이다.

이 메뉴는 앞선 힙 스냅샷과 유사하다.  
한가지 차이점이라면 지속적으로 실행되어 멈추기전까지 이 메모리 스냅샷에서 일어나는 변화를 알 수 있다는 것이다.  
사용자의 인터랙션에 따른 메모리의 상황을 점검하기 위해 유용하다.
