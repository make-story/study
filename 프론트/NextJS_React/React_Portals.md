# Portals

https://ko.reactjs.org/docs/portals.html

Portal은 부모 컴포넌트의  
DOM 계층 구조 바깥에 있는 DOM 노드로  
자식을 렌더링하는 최고의 방법을 제공

```javascript
ReactDOM.createPortal(child, container);
```

첫 번째 인자(child)는 엘리먼트, 문자열, 혹은 fragment와 같은 어떤 종류이든 렌더링할 수 있는 React 자식입니다.  
두 번째 인자(container)는 DOM 엘리먼트입니다.
