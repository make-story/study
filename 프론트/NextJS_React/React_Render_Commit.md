# React 렌더링 프로세스, Render / Commit

https://pozafly.github.io/react/declarative-meaning-of-react-rendering-process/#Rendering

https://react-ko.dev/learn/render-and-commit

https://velog.io/@superlipbalm/blogged-answers-a-mostly-complete-guide-to-react-rendering-behavior

단계

1. Trigger - 렌더링 촉발
2. Rendering - 컴포넌트 렌더링
3. Commit - DOM에 커밋

Trigger는 state가 변경되었을 때 일어난다.  
Trigger 되면, Rendering이 일어나는데, 이 때 화면에 표시될 DOM이 생성된다.  
Commit이 일어나면 Rendering에서 생성된 DOM이 브라우저의 DOM으로 그려진다.

## 라이프 사이클 실행 과정

https://github.com/Wavez/react-hooks-lifecycle

https://github.com/wojtekmaj/react-lifecycle-methods-diagram

https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/
