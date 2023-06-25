# ESLint (코드 품질, 코드 문법, 검사)

`JavaScript linter, 잠재적인 오류나 버그를 예방`  
ESLint는 코드를 정적으로 분석하여 문제를 빠르게 찾음  
ESLint가 발견한 많은 문제는 자동으로 수정될 수 있음  
코드를 사전 처리하고, 사용자 정의 파서를 사용하고, ESLint의 기본 제공 규칙과 함께 작동하는 고유한 규칙을 작성  
(코드의 가독성을 높이고 잠재적인 오류와 버그를 제거해 단단한 코드를 만드는 것이 목적)  
(과거 JSLint, JSHint에 이어서 최근에는 ESLint를 많이 사용하는 편)

`포맷팅`  
포맷팅은 일관된 코드 스타일을 유지하도록 하고 개발자로 하여금 쉽게 읽히는 코드를 만들어 준다. 이를 테면 "들여쓰기 규칙", "코드 라인의 최대 너비 규칙"을 따르는 코드가 가독성이 더 좋다.

# ESLint의 규칙을 테스트해보고 설정을 다운받을 수 있는 플레이그라운드

https://new.eslint.org/play

# ESLint 설치

https://eslint.org/docs/user-guide/getting-started

```
$ npm install -g eslint
$ npm install -D eslint-config-standard
$ npm install -D eslint-plugin-import
```

- eslint: ESLint 코어
- eslint-config-standard: eslint 기본 설정 (추가로 eslint-config-airbnb-base 존재)
- eslint-plugin-import: ES2015+의 import/export 구문을 지원

# TypeScript ESLint + Prettier 구성을 위한 설치

TSLint 프로젝트가 deprecated 상태가 되고 ESLint에 통합
https://github.com/palantir/tslint/issues/4534

2020년 까지만 TSLint를 지원하기 때문에 신규 프로젝트라면 typescript-eslint를 사용해야 한다.

https://pravusid.kr/typescript/2020/07/19/typescript-eslint-prettier.html

https://github.com/typescript-eslint/typescript-eslint#packages-included-in-this-project

typescript, eslint 패키지 설치되어 있다는 기준에서 아래 패키지 설치

```
$ npm install -D @typescript-eslint/parser @typescript-eslint/eslint-plugin
```

- @typescript-eslint/typescript-estree: ESTree(자바스크립트 AST(추상구문트리) 스펙)호환 AST를 생성하는 타입스크립트 파서
- @typescript-eslint/parser: typescript-estree를 활용한 타입스크립트용 ESLint 파서(ESLint 기본 파서인 espree를 대신함)
- @typescript-eslint/eslint-plugin: TypeScript관련 linting 규칙을 처리하는 플러그인

## Prettier

prettier 패키지 설치되어 있다는 기준에서 아래 패키지 설치

```
$ npm install -D eslint-plugin-prettier eslint-config-prettier
```

- plugin:prettier/recommended: eslint-plugin-prettier + eslint-config-prettier 동시 적용
- prettier/@typescript-eslint: prettier 규칙과 충돌하는 @typescript-eslint/eslint-plugin 규칙 비활성화

## .eslintrc

```json
{
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "project": "./tsconfig.json"
  },
  "env": {
    "node": true
  },
  "extends": ["plugin:@typescript-eslint/recommended", "plugin:prettier/recommended", "prettier/@typescript-eslint"]
}
```

# ESLint + React 구성을 위한 플러그인 설치

https://github.com/yannickcr/eslint-plugin-react#configuration

```
$ npm install -D eslint-plugin-react
```

# 웹팩에서 로더로 실행를 위한 패키지 설치

```
$ npm install -D eslint-loader
```

---

# 초기 설정파일 생성

https://eslint.org/docs/latest/use/configure/configuration-files

ESLint v9.0.0 이상 부터 새로운 구성 시스템 적용  
https://eslint.org/docs/latest/use/configure/configuration-files-new

```
$ eslint --init
```

.eslintrc.js 파일 생성됨

# husky, lint-staged

ESLint를 프로젝트에 적용시킬 때는 협업하는 모든 사람들이 같은 규칙 내에서 코딩을 하는 것을 예상한다.  
하지만 가끔은 규칙을 지키지 않고 깃헙에 코드를 푸시할 때가 생긴다.

git commit 또는 git push와 같은 git 이벤트가 일어나기 전에  
우리가 원하는 스크립트를 실행하기 위해서 git 이벤트 사이에 갈고리(hook)를 걸어주는 것이다. 이것을 git hook 제어라고 한다.

- git hook 제어를 위해서 husky 라이브러리를 사용
- lint-staged는 git add로 커밋 대상이 된 상태를 stage 상태라고 한다. stage 상태의 git 파일에 대해 lint와 우리가 설정해둔 명령어를 실행해주는 라이브러리

---

# Prettier (코드 스타일, 코드 컨벤션, 자동 변경)

Prettier는 코드를 읽어들여서 사용자 옵션에 따라 코드를 다시 포맷팅하는 코드 포맷터
정해진 규칙에 따라 자동으로 코드 스타일을 정리해 주는 코드 포멧터

EditorConfig 가 코드를 작성하는 도중에도 설정이 반영되는 것에 비해, Prettier 는 임의의 시점에 저장 완료 파일에 대해 실행합니다.  
원래 자바스크립트 주변의 코드 형태를 정리하는 도구였는데, 현재는 HTML이나 CSS, Sass의 CSS 기술법을 포함해 많은 언어에 대응하고 있습니다.

## ESLint 와 다른 점

ESLint 의 역할 중 포매팅과 겹치는 부분이 있지만, 프리티터는 좀 더 일관적인 스타일로 코드를 다듬는다.  
(반면 `코드 품질과 관련된 기능은 하지 않는 것이 ESLint와 다른 점`)
`ESLint 는 코드 구현방식에 집중, Prettier 는 줄바꿈 / 공백 / 들여쓰기 등 코딩 스타일에 집중`

# Prettier 설치

https://prettier.io/docs/en/integrating-with-linters.html  
https://prettier.io/docs/en/configuration.html  
https://prettier.io/docs/en/options.html

```
$ npm install -D prettier
```

`주의! prettier 패키지를 설치해서 사용하는 방식이 아닌, VSCode 의 extension 을 설치해 사용할 수 있다. 즉, VSCode 를 사용하는 개발자는 프로젝트의 prettier 설정파일을 바라보고 있는지, VSCode extension 설치를 통해 구성된 파일을 바라보는지 확인 필수!`

# ESLint + Prettier 함께 사용 (typescript-eslint + prettier 함께 사용)

https://prettier.io/docs/en/install.html#eslint-and-other-linters

https://pravusid.kr/typescript/2020/07/19/typescript-eslint-prettier.html

https://helloinyong.tistory.com/325

prettier 공식 문서에 보면,  
eslint-config-prettier 설치 가이드 하고 있음
(eslint 와 중복되는 규칙을 prettier 쪽에서 알아서 비활성 시켜줌)

eslint-plugin-prettier 는
prettier 규칙에 맞지 않는 요소들을 eslint 가 error 로 판단하도록 하는 설정

```
$ npm install -D eslint-plugin-prettier eslint-config-prettier
```

- plugin 이나 config 중 하나만을 사용할 수도 있다
  - plugin 만 사용: 포맷 관련 오류가 두 번 출력된다(eslint + prettier)
  - config 만 사용: eslint에서 포맷 관련 오류가 출력되지 않는다

plugin 사용만으로는 eslint formatting rules 와 prettier rules가 충돌하므로,  
eslint-config-prettier를 함께 사용한다 (공식문서에서도 둘을 함께 사용하기를 권장한다)

.eslintrc.json 또는 .eslintrc.js  
{
...
"extends": ["eslint:recommended", "prettier"],
...
}
