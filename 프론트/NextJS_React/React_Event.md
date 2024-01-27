# 합성 이벤트 (SyntheticEvent)

https://ko.reactjs.org/docs/events.html

https://medium.com/crossplatformkorea/react-%EB%A6%AC%EC%95%A1%ED%8A%B8%EB%A5%BC-%EC%B2%98%EC%9D%8C%EB%B6%80%ED%84%B0-%EB%B0%B0%EC%9B%8C%EB%B3%B4%EC%9E%90-06-%ED%95%A9%EC%84%B1-%EC%9D%B4%EB%B2%A4%ED%8A%B8%EC%99%80-event-pooling-6b4a0801c9b9

React는 이벤트를 처리하기 위해 바닐라 자바스크립트와 달리 엘리먼트가 렌더링 될 때 `이벤트 리스너(Event Listener)`를 제공해 이벤트를 처리한다.  
다만 이 이벤트 핸들러는 모든 브라우저에서 동일한 처리를 보장하기 위해 React에서 제공하는 `SyntheticEvent 객체를 전달 받는다.`

> 소프트웨어에서 `래핑(Wrapping)이란 기본 기능을 감싸는 새로운 기능을 만드는 것`을 말한다. 유사 개념으로 GoF 디자인 패턴의 어댑터(Adapter), 브릿지(Bridge) 패턴이 있다.

즉, 한 단계 래핑(Wrapping)된 이벤트 객체를 통해 이벤트를 다루는 것이다.

SyntheticEvent 객체는 모든 브라우저에서 이벤트를 동일하게 처리하기 위한 래퍼 객체이다.  
대부분의 인터페이스는 브라우저 고유 이벤트와 같다.
