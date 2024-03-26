# React 릴리즈 (Release, 버전변경, ChangeLog) 중 참고사항 기록!

https://legacy.reactjs.org/versions/

### 리액트 버전 16.8 부터 훅(Hook)이라는 기능이 추가

### 리액트 버전 17 이상에서는 기본적으로 JSX 에서 React 를 import 하지 않아도 됩니다.

https://pozafly.github.io/react/declarative-meaning-of-react-rendering-process/#Rendering

React 17 import 구문을 사용하지 않아도 되는 이유는 \_jsx() 함수로 JSX가 변환되기 때문이다.

Babel에서 테스트해볼 수 있다. options의 React Runtime 옵션을 변경해보면 알 수 있다.

https://babeljs.io/repl#?browsers=defaults%2C%20not%20ie%2011%2C%20not%20ie_mob%2011&build=&builtIns=false&corejs=false&spec=false&loose=false&code_lz=JYWwDg9gTgLgBAbzgVwM4FMDKMCGN1wC-cAZlBCHAORTo4DGMVA3AFCvoAekscAJuhI5kAG3glkAO0bAIkuAEEwYABQBKRKzhx6c1PADaANxwjk6ADRwMMAGqnzAXTgBeFBmx50KgAxq2WnC0MMhQ8iqB2gA8AHyR2ogmZuiE8dEARsgwMHJwcgDCIsD0ANYuCOquMdbodg7eSeZVcI0EANRwAIxqhDGFxSVwALLoUQD0mdlycQlw4zNw_qyEQA&debug=false&forceAllTransforms=false&modules=false&shippedProposals=false&circleciRepo=&evaluate=false&fileSize=false&timeTravel=false&sourceType=module&lineWrap=true&presets=env%2Creact&prettier=true&targets=&version=7.22.4&externalPlugins=%40babel%2Fplugin-syntax-jsx%407.21.4&assumptions=%7B%7D

`TypeScript 에러가 발생할 경우`

tsconfig.json

```json
{
  "compilerOptions": {
    "jsx": "react-jsx"
  }
}
```

.eslintrc

```json
{
  "rules": {
    "react/react-in-jsx-scope": "off"
  }
}
```
