# ESLint (코드 품질, 코드 문법, 검사)
`JavaScript linter, 잠재적인 오류나 버그를 예방`  
ESLint는 코드를 정적으로 분석하여 문제를 빠르게 찾음  
ESLint가 발견한 많은 문제는 자동으로 수정될 수 있음  
코드를 사전 처리하고, 사용자 정의 파서를 사용하고, ESLint의 기본 제공 규칙과 함께 작동하는 고유한 규칙을 작성    
(코드의 가독성을 높이고 잠재적인 오류와 버그를 제거해 단단한 코드를 만드는 것이 목적)  
(과거 JSLint, JSHint에 이어서 최근에는 ESLint를 많이 사용하는 편)  

`포맷팅`
포맷팅은 일관된 코드 스타일을 유지하도록 하고 개발자로 하여금 쉽게 읽히는 코드를 만들어 준다. 이를 테면 "들여쓰기 규칙", "코드 라인의 최대 너비 규칙"을 따르는 코드가 가독성이 더 좋다.  


# ESLint 설치
https://eslint.org/docs/user-guide/getting-started  
```
$ npm install -g eslint   
$ npm install -D eslint-config-airbnb-base eslint-plugin-import  
```
- eslint: ESLint 코어  
- eslint-config-airbnb: Airbnb의 eslint 스타일 가이드  
- eslint-plugin-import: ES2015+의 import/export 구문을 지원  


# ESLint + Typescript (TSLint 프로젝트가 deprecated 상태가 되고 ESLint에 통합)
https://pravusid.kr/typescript/2020/07/19/typescript-eslint-prettier.html  
https://github.com/typescript-eslint/typescript-eslint#packages-included-in-this-project  
```
$ npm install -D @typescript-eslint/parser @typescript-eslint/eslint-plugin
```


# ESLint + React
https://github.com/yannickcr/eslint-plugin-react#configuration  
```
$ npm install -D eslint-plugin-react 
```


# 웹팩에서 로더로 실행
```
$ npm install -D eslint-loader
```


# 초기 설정파일 생성  
```
$ eslint --init  
```
.eslintrc.js 파일 생성됨  


----------


# Prettier (코드 스타일, 코드 컨벤션, 자동 변경)
Prettier는 코드를 읽어들여서 사용자 옵션에 따라 코드를 다시 포맷팅하는 코드 포맷터
정해진 규칙에 따라 자동으로 코드 스타일을 정리해 주는 코드 포멧터  


## ESLint 와 다른 점
ESLint 의 역할 중 포매팅과 겹치는 부분이 있지만, 프리티터는 좀 더 일관적인 스타일로 코드를 다듬는다. 
(반면 코드 품질과 관련된 기능은 하지 않는 것이 ESLint와 다른 점)


# Prettier 설치 
https://prettier.io/docs/en/integrating-with-linters.html  
https://prettier.io/docs/en/configuration.html  
https://prettier.io/docs/en/options.html  
```
$ npm install -D prettier 
```


# ESLint + Prettier 함께 사용 (typescript-eslint + prettier 함께 사용)
https://pravusid.kr/typescript/2020/07/19/typescript-eslint-prettier.html  
```
$ npm install -D eslint-plugin-prettier eslint-config-prettier
```

- plugin이나 config 중 하나만을 사용할 수도 있다  
    - plugin만 사용: 포맷 관련 오류가 두 번 출력된다(eslint + prettier)  
    - config만 사용: eslint에서 포맷 관련 오류가 출력되지 않는다  

plugin 사용만으로는 eslint formatting rules와 prettier rules가 충돌하므로, eslint-config-prettier를 함께 사용한다   
(공식문서에서도 둘을 함께 사용하기를 권장한다)  


.eslintrc.json 또는 .eslintrc.js  
{
    ...
    "extends": ["eslint:recommended", "prettier"],
    ...
}