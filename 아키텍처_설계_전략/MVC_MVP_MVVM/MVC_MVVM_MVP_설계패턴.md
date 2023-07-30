# MV\* (MVC, MVVM, MVP)

http://makestory.net/media/#/view/493

https://whales.tistory.com/137  
https://velog.io/@pica_pica/%EB%94%94%EC%9E%90%EC%9D%B8%ED%8C%A8%ED%84%B4-mvc-mvp-mvvm-%EA%B7%B8%EB%A6%AC%EA%B3%A0-flux

## MVC

- Model : 데이터(데이터 베이스), 애플리케이션에서 사용되는 데이터와 그를 처리하는 부분
- View : 모델에 포함된 데이터의 시각화(화면), 모델을 이용하여 화면을 나타냄
- Controller : 사용자의 입력(input)을 받아 처리하는 부분

### 장점

동시다발적 개발이 가능(프런트엔드와 백엔드)
높은 응집도
개발용이성 (책임이 구분되어 있어 코드 수정이 용이)

### 단점

컨트롤러가 다수의 뷰를 선택할 수 있어서 하는 일이 너무 많아질 수 있음(복잡도 증가, 유지보수의 어려움)
코드 일관성 유지에 노력이 필요함.
뷰와 모델 사이의 의존성이 높음. (높은 의존성은 규모가 커질수록 유지보수가 어려움)

## MVP

- Model : 데이터를 저장하고, 처리하는 역할을 함(비즈니스 로직).
- View : 화면을 담당함, Presenter를 이용해 데이터를 주고받기 때문에 매우 의존적임.
- Presenter : model과 view사이의 중개자 역할, 컨트롤러와 유사하지만 view에 직접 연결되어 1:1로 매칭되는점이 다름.

### 장점

model과 view간의 결합도를 낮추면 새로 추가 및 수정에 대해 해당 부분만 코드 수정하면 되기 때문에 확장성이 좋아지고, 유닛테스트시 테스트 코드를 작성하기 편리해짐.
UI, Data각각 파트가 나눠지기 때문에 동시에 쉽고 빠르게 코딩이 가능.

### 단점

애플리케이션이 복잡해질수록 view와 presenter사이의 의존성이 강해지는 단점이 존재.
mvc의 controller처럼 presenter도 어느 정도 시간이 지나면 비즈니스 로직이 집중되는 경향이 있음.
MVC 패턴의 단점인 View와 Model 사이의 의존성은 해결되었지만, `View와 Presenter가 1:1로 매칭되기때문에 뷰가 많아짐에 따라서 Presenter도 따라서 같이 생성`되게 됨.

## MVVM

- Model : 도메인 특화 데이터를 처리
- View : 유저 인터페이스(UI), HTML/CSS/XML 등으로 작성
- ViewModel : 상태와 연산 View의 실제 논리 및 데이터 흐름을 담당, 상태 데이터를 변경하면 즉시 View에 반영. (데이터 요소를 바꿈! 그리는 건 신경 쓰지 않음.)

### 장점

MVVM 패턴은 View와 Model 사이의 의존성이 없습니다.(MVP와 같음)
Command패턴과 Data Binding을 사용하여 View와 ViewModel 사이의 의존성 또한 없앤 디자인 패턴

### 단점

ViewModel의 설계가 쉽지 않습니다.

---

# Flux

https://whales.tistory.com/137

https://bestalign.github.io/translation/cartoon-guide-to-flux/

Flux는 MVC 모델의 단점을 보안하기 위해 페이스북에서 발표한 아키텍처입니다.

---

# 리액트 에서의 설계 패턴

https://darrengwon.tistory.com/1477

## MVC

1. redux에 데이터를 쌓아놓고
2. 필요할 때 useSelector로 container 컴포넌트에서 store값을 불러오고
3. presenter 컴포넌트에서 해당 값을 사용한다.

## MVVM

1. 우선 데이터는 store에 쌓인다. M(model)
2. useSelector로 불러오는 데이터들을 가공하는 VM(View Model)이 중간에 존재한다.
   VM의 예시로, 단순힌 유틸 함수 모음집일 수도 있고, 커스텀 훅이 VM 역할을 한다.
   (커스텀 훅은 반드시 React가 제공하는 훅이 필요할 때만 사용해야 하며, memoization을 적극적으로 활용하도록 하자.)

3. Container에서는 VM에서 필요한 로직을 불러와 사용한다.

4. Presenter는 container에서 들어와 사용한다.
