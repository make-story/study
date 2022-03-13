https://ui.toast.com/weekly-pick/ko_20220106
https://developer.mozilla.org/en-US/docs/Web/API/Pointer_events#event_order

```javascript
function createParagraph(text) {
  const el = document.createElement('p');
  el.innerText = text;

  return el;
}

const printEl = document.getElementById('print');

['touchstart', 'touchmove', 'touchend', 'mousedown', 'mousemove', 'mouseup', 'click'].forEach(eventType => {
  document.addEventListener(eventType, () => {
    printEl.appendChild(createParagraph(eventType));

    // 스크롤을 최하단으로 이동시켜준다.
    window.scrollTo(0, document.body.scrollHeight);
  });
});
```

![마우스_터치_이벤트_발생순서](https://user-images.githubusercontent.com/10363214/158058963-a386c6c5-af4b-4f7d-8900-9d824b79e1eb.png)

```javascript
/*
 * 딜레이를 확인하기 위해 console.time과 console.timeEnd를 사용했다. 자세한 설명은 아래 링크를 확인하자.
 * https://developer.mozilla.org/ko/docs/Web/API/Console/time
 * performance.now를 이용해 측정할 수도 있다.
 * https://developer.mozilla.org/ko/docs/Web/API/Performance/now
 */

document.addEventListener('touchstart', () => {
  console.time('touch-click delay');
});

document.addEventListener('click', () => {
  console.timeEnd('touch-click delay');
});
```

위 코드는 touchstart 이벤트의 발생과 click 이벤트의 발생 간의 딜레이를 확인하기 위한 코드다.  
이를 실행해보니 touchstart 이벤트 발생 이후 click 이벤트의 발생까지 약 300ms의 딜레이가 있는 것을 알 수 있다.  
그러나 사용자가 즉각적이라고 느끼는 최대 지연 시간은 100ms이다.

딜레이 제거  
일반적으로 모바일 기기에 보여줄 페이지는 모바일 기기에 최적화해 만든다.

```html
<meta name="viewport" content="width=device-width" />
```
