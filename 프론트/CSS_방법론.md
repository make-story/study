# Using CSS Module Scripts to import stylesheets

https://web.dev/css-module-scripts/

# CSS 방법론

https://wit.nts-corp.com/2015/04/16/3538  
https://blog.toycrane.xyz/css%EC%9D%98-%EC%A7%84%ED%99%94-%EA%B3%BC%EC%A0%95-f7c9b4310ff7

CSS -> SCSS -> BEM -> CSS Modules -> Styled-Component  
https://medium.com/@perezpriego7/css-evolution-from-css-sass-bem-css-modules-to-styled-components-d4c1da3a659b

https://dongwoo.blog/2017/02/07/%EB%B2%88%EC%97%AD-css%EC%9D%98-%EC%A7%84%ED%99%94-css-%EB%B6%80%ED%84%B0-sass-bem-css-%EB%AA%A8%EB%93%88-%EC%8A%A4%ED%83%80%EC%9D%BC%EB%93%9C-%EC%BB%B4%ED%8F%AC%EB%84%8C%ED%8A%B8-%EA%B9%8C/

## BEM

CSS 내에서 이름이 중복되지 않도록 CSS 아이디와 클래스를 명명하는 방법론입니다.

- Block  
  블럭은 재사용이 가능한 기능적으로 독립적인 컴포넌트
- Element  
  엘리먼트는 블럭을 구성하는 한 부분
- Modifier  
  블록이나 엘리먼트에 변화를 줄 수 있는 값으로, 생김새가 다르거나 다른 행동을 해야할 때 사용

## CSS Modules

SASS나 BEM 같은 경우, 손수 개발자가 클래스가 겹치지 않도록 관리 해야 하는 불편함이 있었습니다.  
이러한 단점을 극복하고자 나온 것이 CSS Modules입니다.  
CSS Modules은 모든 스타일에 동적으로 파일에 선언된 CSS 선택자에 고유한 해시 문자열을 추가하여 CSS 속성이 겹치지 않게 만드는 방식

[파일이름].module.css
