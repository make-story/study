# React 이슈 슈팅 (트러블슈팅, 이슈경험)

## Redux, Redux-Saga 세팅

https://github.com/kirill-konshin/next-redux-wrapper#usage-with-redux-saga

## createWrapper, Wrapper Life-Cycle

https://velog.io/@henrynoowah/Next.js-Redux-Wrapper

## 이슈 참고

https://jicjjang.github.io/posts/next-redux-wrapper-settings

## 'Hooks can only be called inside the body of a function component.'

```
Warning: Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons
1. You might have mismatching versions of React and the renderer (such as React DOM)
2. You might be breaking the Rules of Hooks
3. You might have more than one copy of React in the same app
See https://reactjs.org/link/invalid-hook-call for tips about how to debug and fix this problem.
```

1. React와 React DOM의 버전이 일치하지 않을 수 있습니다.
2. Hooks 규칙을 위반했을 수 있습니다.
3. 같은 앱에 React가 한 개 이상있을 수 있습니다.

### Hooks 규칙 위반

- 함수 컴포넌트 본문의 최상위 레벨에서 호출하세요.
- 사용자 정의 Hook 본체의 최상위 레벨에서 호출하세요.

```jsx
function Counter() {
  // ✅ 권장: 함수 컴포넌트의 최상위 레벨
  const [count, setCount] = useState(0);
  // ...
}

function useWindowWidth() {
  // ✅ 권장: 사용자 정의 Hook의 최상위 레벨
  const [width, setWidth] = useState(window.innerWidth);
  // ...
}
```
