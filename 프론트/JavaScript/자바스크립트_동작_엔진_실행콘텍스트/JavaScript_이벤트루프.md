# JavaScript 이벤트 루프

https://velog.io/@sejinkim/JavaScript%EC%9D%98-%EC%9D%B4%EB%B2%A4%ED%8A%B8-%EB%A3%A8%ED%94%84%EB%A5%BC-%EC%A1%B0%EC%9E%91%ED%95%98%EA%B8%B0-%EC%9C%84%ED%95%9C-%EC%A0%81%EC%A0%88%ED%95%9C-%EB%8F%84%EA%B5%AC-%EC%84%A0%ED%83%9D%ED%95%98%EA%B8%B0

https://macarthur.me/posts/navigating-the-event-loop/

## 요약

setTimeout(() => {}, 0)  
높은 우선순위의 작업을 여러 이벤트 루프 차례에 걸쳐 분산시켜, 메인 스레드에서 다른 모든 작업들이 처리되는 상황을 피하려는 경우 사용합니다.

queueMicrotask(() => {})  
현재 call stack에 있는 작업보다 상대적으로 우선순위는 낮은 작업이지만, 이벤트 루프에서 다른 작업이 실행되기 전에 완료되기 원하는 경우 사용합니다.

requestAnimationFrame(() => {})  
리페인트 주기와 조화를 이루도록 작업을 수행하고 싶을 때 사용합니다. 일반적으로 리페인트가 발생한 직후나 그 직전에 사용됩니다.

requestIdleCallback(() => {})  
낮은 우선순위로 완료해야 할 작업이 있지만, 이벤트 루프에 유휴 시간이 있을 때 수행되어도 무방한 경우 사용합니다.

## Task Queue

```javascript
const clickedCallback = () => {
  // 버튼을 클릭한 이후 task queue에 추가됩니다.
  console.log('clicked!');
};

buttonNode.addEventListener('click', clickedCallback);
```

## Microtask Queue

```javascript
Promise.resolve().then(() => {
  console.log('Fired from the microtask queue!');
});

setTimeout(() => {
  console.log('Fired from the task queue!');
}, 1000);
```

microtask queue 의 특별한 점은 큐가 완전히 비워질 때까지 제어권이 이벤트 루프에게 반환되지 않는다는 것입니다.  
이는 microtask queue 가 자체적으로 더 많은 콜백을 큐에 적재할 수 있다는 점에서 문제의 소지가 있습니다.

```html
<div class="wrapper">
  <div>
    <button id="incrementButton" style="margin-bottom: 1rem;">Increment</button>

    <br />

    <span>Click Count: <span id="count">0</span></span>
  </div>

  <div>
    <button class="button-alt" id="timeoutButton" style="margin-bottom: .5rem;">
      Loop via setTimeout()
    </button>

    <br />

    <button class="button-alt" id="microtaskButton">
      Loop via queueMicrotask()
    </button>
  </div>
</div>
```

```javascript
const incrementButton = document.getElementById('incrementButton');
const microtaskButton = document.getElementById('microtaskButton');
const timeoutButton = document.getElementById('timeoutButton');

incrementButton.addEventListener('click', () => {
  count.innerText = Number(count.innerText) + 1;
});

microtaskButton.addEventListener('click', e => {
  e.target.textContent = 'Looping...';
  e.target.disabled = true;

  const start = Date.now();

  function loop() {
    console.log('Loop!');

    queueMicrotask(() => {
      if (Date.now() - start < 5000) {
        loop();
      } else {
        e.target.textContent = 'Loop via queueMicrotask()';
        e.target.disabled = false;
      }
    });
  }

  loop();
});

timeoutButton.addEventListener('click', e => {
  e.target.textContent = 'Looping...';
  e.target.disabled = true;

  const start = Date.now();

  function loop() {
    console.log('Loop!');

    setTimeout(() => {
      if (Date.now() - start < 5000) {
        loop();
      } else {
        e.target.textContent = 'Loop via setTimeout()';
        e.target.disabled = false;
      }
    });
  }

  loop();
});
```

---

1. setTimeout(() => {}, 0)

이벤트 루프에서 가능한 빨리 실행될 수 있도록 어떤 콜백을 큐에 대기시키고 싶을 때 이것을 사용할 수 있습니다.

대신, 브라우저가 콜백을 실행하기 위해 큐에 얼마나 빨리 넣을 수 있는지에 따라 달라질 수는 있습니다.  
지연 시간을 0으로 전달하더라도,  
실제 최소 지연 시간은 사용 방법에 따라 0에서 4 밀리초 사이로 다를 수 있습니다.  
https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html?ref=alex-macarthur#timers

2. queueMicrotask(() => {}, 0)

현재 작업이 완료되기 전에 코드를 실행하고, 제어가 다른 어떤 일을 위해 이벤트 루프로 다시 넘어가기 전에 약간의 코드를 실행하고 싶을 때가 있을 것입니다.  
이것이 바로 queueMicrotask()의 역할입니다.  
이벤트 루프의 동일한 반복에서 더 중요할 수 있는 작업이 마무리된 이후 '딱 한 가지만 더'를 수행하는 데에 훌륭한 도구로, 이벤트 루프의 동일한 반복에서 모든 작업을 수행할 수 있습니다.

3. requestAnimationFrame(()=> {});

이는 브라우저의 리페인트 주기에 맞춰 코드를 실행해야 할 때 유용합니다.  
이벤트 루프는 작업을 실행할 수 있는 속도로 루프를 돌지만, 대부분의 디바이스들은 초당 60회 정도로 업데이트하면서 화면을 페인트합니다.

4. requestIdleCallback(() => {})

이 방법은 브라우저가 '유휴(idle)' 상태로 간주되거나,  
MDN에서 설명하는 것처럼 '여유가 있다고 판단될 때' 이벤트 루프의 어떤 순간에서도 낮은 우선순위의 코드를 실행하는 데 가장 적합합니다.

https://developer.mozilla.org/en-US/docs/Web/API/Background_Tasks_API
