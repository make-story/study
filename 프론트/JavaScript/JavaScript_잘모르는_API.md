# queueMicrotask

https://developer.mozilla.org/ko/docs/Web/API/HTML_DOM_API/Microtask_guide

마이크로태스크는 현대 브라우저 기반 JavaScript 개발에서 고도로 특화된 기능으로서,  
사용자 컴퓨터에서 발생할 수많은 것들의 앞에서 다른 것보다 우선해서 실행할 코드를 예약할 수 있는 기능입니다.  
이 능력을 남용하면 성능 문제에 빠질 것입니다.

따라서, 마이크로태스크의 사용은 다른 해결책이 전혀 없거나,  
프레임워크 또는 라이브러리에서 구현하고자 하는 기능에 필요한 경우에만 사용해야 합니다.  
과거에도 마이크로태스크를 큐에 추가하는 우회 방법이 (즉시 이행하는 프로미스 생성처럼) 없지는 않았으나,  
queueMicrotask() 메서드의 추가 덕분에 마이크로태스크를 안전하고 우회 없이 추가할 수 있는 표준 방법이 생겼습니다.

# MutationObserver

https://developer.mozilla.org/ko/docs/Web/API/MutationObserver

`DOM 트리의 변경을 감지하는 기능을 제공`  
DOM 상태(변경, 추가, 삭제 등) 모니터링

```javascript
// 변경을 감지할 노드 선택
const targetNode = document.getElementById('some-id');

// 감지 옵션 (감지할 변경)
const config = { attributes: true, childList: true, subtree: true };

// 변경 감지 시 실행할 콜백 함수
const callback = (mutationList, observer) => {
  for (const mutation of mutationList) {
    if (mutation.type === 'childList') {
      console.log('자식 노드가 추가되거나 제거됐습니다.');
    } else if (mutation.type === 'attributes') {
      console.log(`${mutation.attributeName} 특성이 변경됐습니다.`);
    }
  }
};

// 콜백 함수에 연결된 감지기 인스턴스 생성
const observer = new MutationObserver(callback);

// 설정한 변경의 감지 시작
observer.observe(targetNode, config);

// 이후 감지 중단 가능
observer.disconnect();
```
