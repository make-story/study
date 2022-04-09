# `CSS 설계 실전 가이드` 책 정리  


## browserslist
https://github.com/browserslist/browserslist

## Autoprefixer
https://autoprefixer.github.io/  

## postcss
https://github.com/webpack-contrib/postcss-loader

## csscomb
https://www.npmjs.com/package/csscomb


-----


# CSS 설계 방법
- 추상화 한다.  
대략 '다른 스타일 상이에서 공통화할 수 있는 것은 무엇인가?', '공통된 부분을 추출해서 하나로 모을 수는 있는가?' 를 이지화하는 작업이라고 생각하면 보다 이해하기 쉬울 것  
- 나눈다.  
'파일을 나눈다.', '부품 크기를 나눈다.', '역할에 따라 이름을 나눈다'  

# 디자인 시스템
브래드 프로스트(Brad Frost)가 '아토믹 디자인(Atomic Design)'이라는 방법론을 제창  
아토믹 디자인은 간단히 설명하면, 디자인 시스템을 구축하고 운영하기 위한 사고방식 혹은 지침  

아토믹 디자인에서는 '아토믹 디자인 방법론(Atomic Design Methodology)'을 활용해 사용자 인터페이스(User Interface)를 다음의 다섯 가지로 나눠 재정리  
- Atoms
원자는 아토믹 디자인 방법론 중에서 가장 작은 단위가 되는 모듈입니다.  
모든 웹페이지에서 사용하는 것으로 버튼이나 입력 필드, 제목 등이 여기에 해당 됩니다.  
'더 이상 분리할 수 없을 정도로 작은 UI'라고 생각하면 이해하기 쉽습니다.  

- Molecules
원자가 모여 그룹을 만들명 분자가 됩니다.  
각기 흩어져 있던 원자가 그룹을 형성함으로써 하나의 모듈이 된 것이라고 생각하면 이해하기 쉽습니다.  

- Organisms
유기체는 분자뿐만 아니라 원자와 다른 유기체를 포함할 수 있습니다.  
예를 들어, 로고(원자), 메뉴(분자), 검색 폼(분자)이 모여 유기체를 형성  

- Templates
템플릿은 지금까지 소개한 요소들을 조합해 만든 레이아웃을 의미합니다.  
실제 사용하는 이미지나 텍스트 등의 콘텐츠는 고려하지 않은 상태에서 레이아웃이나 구조를 정의한 것입니다.  
(요소 배치, 레이아웃 구성, 틀)  

- Pages  
템플릿에 실제 이미지나 텍스트 등의 콘텐츠를 적용한 것으로서 그대로 공개해도 문제없는 웹페이지 형태를 갖추고 있습니다.  
(템플릿에 데이터를 포함한 컴포넌트, 라우터)  

아토믹 디자인 방법론 자체는  
CSS 설계를 염두에 둔 것이 아니라 어디까지나 디자인 시스템을 구현하기 위한 것입니다.  
하지만 실제로 아토믹 디자인에서 정의한 다섯 가지 UI 분류는 CSS 설계와 상당히 친화성이 있으며, 특히 PRECSS를 이해하는 데 도움이 됩니다.  


-----

# 영단어를 결합하는 방식의 이름
- sub-title 
하이픈 케이스(Hyphen Case) 또는 케밥 케이스(Kebab Case)
- sub_title
스테이크 케이스(Snake Case)
- subTitle
로워 캐멀 케이스(Lowser Camel Case) 또는 캐멀 캐이스(Camel Case)
- SubTitle
어퍼 캐멀 케이스(Upper Camel Case) 또는 파스칼 케이스(Pascal Case)  

# 좋은 CSS 설계의 네 가지 목표
- 예측 가능하다.
- 재사용 가능하다.
- 유지 보수 가능하다.
- 확장 가능하다.  

- 사이트 전체를 적용해야 할 스타일은 `베이스 그룹`  
- 레이아웃과 관련 있는 스타일은 `레이아웃 그룹`
- 사이트 내 페이지들에서 재사용할 수 있는 것은 `모듈 그룹`  

## 레이아웃과 관련된 지정
- position (static, relative 제외)
- z-index
- top / right / bottom / left
- float
- width
- margin  

