# Observer

https://velog.io/@longroadhome/모던JS-브라우저-Observers

## MutationObserver (옵져버)

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

## IntersectionObserver

https://developer.mozilla.org/ko/docs/Web/API/IntersectionObserver/IntersectionObserver

https://github.com/w3c/IntersectionObserver

노출 감지

```css
/* 옵져버가 diplay none 경우, 작동안함 */
div {
  display: none;
}
```

## ResizeObserver

사이즈 감지

https://developer.mozilla.org/en-US/docs/Web/API/Resize_Observer_API
