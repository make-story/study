# setTimeout / requestAnimationFrame 비교

https://velog.io/@wejaan/setTimeout%EA%B3%BC-requestAnimationFrame

자바스크립트에는 사용할 수 있는 여러가지 타이머 function이 존재한다.

- setTimeout() : 지정한 delay 시간 후에 함수를 호출하거나 식을 평가한다.
- setInterval() : 지정된 간격으로 함수를 호출하거나 식을 평가한다. setInterval() 은 clearInterval() 이 호출 될 때까지 함수를 계속 호출한다.
- requestAnimationFrame() : setTimeout 처럼 동작하지만 mozilla 에 의해 개선된 function 이다.

setTimeout() 의 delay 시간은 의도했던 것보다 더 길 수도 있다.

https://developer.mozilla.org/en-US/docs/Web/API/setTimeout#reasons_for_delays_longer_than_specified

- 브라우저는 setTimeout 호출을 5번 이상 중첩할 경우 4ms의 최소 타임아웃을 강제한다.
  - 예를 들어, 지연 시간으로 0을 지정한 setTimeout을 여러 번 중첩(동일한 delay 값 0으로 설정된 setTimeout 여러개 실행)
- 브라우저는 백그라운드 탭으로 인한 부하를 줄이기 위해, 비활성 탭에서의 최소 딜레이에 최소 값을 강제한다.
- 페이지, 운영체제, 브라우저가 다른 작업으로 바쁘다면 timeout이 예상보다 늦게 실행될 수 있다.

`setTimeout() 에서의 delay는 정확히 그 delay 시간 후에 콜백함수가 실행되는 걸 보장하는 게 아니다.`  
`delay 시간 후에 콜백 큐에 들어가는 것을 보장하는 것이다.`

requestAnimationFrame 은 콜백함수를 브라우저가 다음 repaint task 를 시작할 준비가 되었을 때 실행한다.  
setTimeout() 이 가진 성능 문제를 해결할 수 있다.

60FPS 는 초당 60 프레임을 의미한다.
그리고 60FPS -> 초당 60프레임 -> 프레임당 16ms 라는 결과를 도출할 수 있다.

즉, 프레임에 가장 적합한 시간은 16ms 인데, setTimeout 은 이 조건을 만족할 수 없다.
(또한 setInterval, setTimeout과 달리 현재 페이지가 보이지 않을 때는 콜백함수가 호출되지 않기 때문에 불필요한 동작을 하지 않습니다.)

## requestAnimationFrame 이 프레임당 16ms 를 보장할 수 있는 이유

requestAnimationFrame 은 setTimeout 과 달리 미리 지정된 간격에 애니메이션을 다시 그리는 게 아니라 브라우저가 다음에 repaint 할 때 예약한다.  
미리 지정된 간격을 지키기 위해 막무가내로 동작하지 않고, 브라우저의 상황에 맞게 동작을 예약할 수 있다.

## FPS(Frame Per Second)

FPS 가 웹 개념은 아니지만 애니메이션, 영화 등 사용자에게 지속적으로 무언가를 보여줘야 하는 상황에서 초당 가장 이상적인 프레임 수는 60 이라고 한다.  
그래야 사용자는 느리다고 느끼지 않는 것이다.

애니메이션의 매끄러움은 애니메이션의 프레임 속도에 의해 결정된다.  
프레임 속도는 초당 프레임수(FPS)로 측정한다.  
영화는 보통 24fps, 비디오는 30fps 로 실행된다.  
이 숫자가 높을 수록 애니메이션이 부드러워지지만 너무 많은 프레임은 오히려 너무 많은 처리로 인해 끊기거나 건너뛰어질 수도 있다(frame drop).  
대부분의 screens 은 60Hz 의 refresh rate 을 가지고 있으므로 60FPS 가 가장 이상적인 프레임 수라고 여겨지는 것이다.

## 자바스크립트 실행 최적화 권장사항

https://web.dev/articles/optimize-javascript-execution?hl=ko

- 시각적 업데이트를 위해 setTimeout 또는 setInterval을 사용하지 말 것. 대신 항상 requestAnimationFrame을 사용할 것.
- 오래 실행되는 JavaScript를 기본 스레드에서 Web Workers로 이동할 것.
- 마이크로 작업을 사용하여 여러 프레임에 걸쳐 DOM을 변경할 것.
- Chrome DevTools의 타임라인 및 JavaScript 프로파일러를 사용하여 JavaScript의 영향을 평가할 것.
