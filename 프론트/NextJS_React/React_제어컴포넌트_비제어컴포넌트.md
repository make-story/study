# 제어 컴포넌트 (Controlled Component) / 비제어 컴포넌트

리액트는 <input>, <textarea>, <select> 와 같이 입력받을 수 있는 HTML 폼 요소들을  
제어 컴포넌트와 비제어 컴포넌트 두 가지의 개념으로 구분하고 있다.

제어 컴포넌트는 상태(state)에 의해 값과 동작을 제어하고, 상태 변경에 따라 UI를 업데이트하는 컴포넌트입니다.  
비제어 컴포넌트는 상태에 의존하지 않고 자체적으로 동작하며, UI 변경을 자동으로 처리하지 않고 개발자가 직접 처리해야 합니다.

https://ko.legacy.reactjs.org/docs/forms.html#controlled-components

https://ko.legacy.reactjs.org/docs/uncontrolled-components.html

`제어 컴포넌트에서 폼 데이터는 React 컴포넌트에서 다루어집니다. 대안인 비제어 컴포넌트는 DOM 자체에서 폼 데이터가 다루어집니다.`

모든 state 업데이트에 대한 이벤트 핸들러를 작성하는 대신 비제어 컴포넌트를 만들려면 ref를 사용하여 DOM에서 폼 값을 가져올 수 있습니다.

리액트 공식페이지 내용 중  
`“대부분 경우에 폼을 구현하는데 제어 컴포넌트를 사용하는 것이 좋습니다.”`
