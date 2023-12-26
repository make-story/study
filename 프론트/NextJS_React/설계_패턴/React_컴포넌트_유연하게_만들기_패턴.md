# 컴포넌트 고민

`https://leetrue-log.vercel.app/react-component-gomin`

## 컴포넌트 설계 고민

- 컴포넌트가 한 가지 일만 하는가?
  - 데이터로드는 사용자훅
  - 비즈니스로직은 상위 컨테이너 컴포넌트
  - 화면을 그리는 용도의 프레젠테이셔널 컴포넌트
- 재사용성이 있는 컴포넌트인가? (진짜 재활용 목적)
  - 확장성을 올리는 방법을 고려하면, 컴포넌트 내부에서 값을 분기하여 처리하지 않고, 외부에서 주입하는 방식을 고려
- 컴포넌트의 props 가 무한 증가하고 있는가?
- 사용하기가 편한 컴포넌트인가?
  - 코딩컨벤션 등 문서화
  - 이해되는 네이밍
  - 한눈에 파악 가능한 컴포넌트 코드

## 명령형 컴포넌트

로딩이면 스피너 보여주고, 에러면 에러 보여주고 성공하면 이 컴포넌트 보여주라.

## 선언형 컴포넌트

로딩 또는 에러 상태에 따른 렌더링 제어권을 부모 컴포넌트에 전가하고, 현재의 컴포넌트는 본인이 보여주는 것에만 집중하는 방법이다.

---

# React 컴포넌트 유연하게 만들기

https://disquiet.io/@junep/makerlog/%EB%A6%AC%EC%95%A1%ED%8A%B8-%EC%BB%B4%ED%8F%AC%EB%84%8C%ED%8A%B8%EB%A5%BC-%EC%9C%A0%EC%97%B0%ED%95%98%EA%B2%8C-%EB%A7%8C%EB%93%A4%EA%B8%B0

## 컴포넌트의 책임과 역할, 도메인 정보와 결합되지 않는 컴포넌트, 응집도 있는 컴포넌트 등 컴포넌트를 만드는 데 고려하면 좋은 여러 개념

https://jbee.io/web/components-should-be-flexible/

## 우리가 컴포넌트를 개발하면서 빈번하게 마주하는 케이스

https://kentcdodds.com/blog/inversion-of-control

## Compound Component (합성 컴포넌트) 라는 개념

https://kentcdodds.com/blog/compound-components-with-react-hooks

## 컴포넌트를 props로 전달하기

https://react.dev/learn/passing-props-to-a-component#passing-jsx-as-children

## 컴포넌트를 언제 분리하면 좋을지와 관련된 글

https://medium.com/@shinbaek89/%ED%94%84%EB%A1%A0%ED%8A%B8%EC%97%94%EB%93%9C-%EC%95%84%ED%82%A4%ED%85%8D%EC%B2%98-%EC%BB%B4%ED%8F%AC%EB%84%8C%ED%8A%B8%EB%A5%BC-%EB%B6%84%EB%A6%AC%ED%95%98%EB%8A%94-%EA%B8%B0%EC%A4%80%EA%B3%BC-%EB%B0%A9%EB%B2%95-e7cf16bb157a
