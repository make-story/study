
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