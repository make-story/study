# ESLint 설정(구성) 파일

https://helloinyong.tistory.com/325

https://www.daleseo.com/eslint-config/

```json
{
  "root": true,
  "plugins": ["@typescript-eslint"],
  "extends": ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
  "parser": "@typescript-eslint/parser",
  "rules": {
    "@typescript-eslint/strict-boolean-expressions": [
      2,
      {
        "allowString": false,
        "allowNumber": false
      }
    ]
  }
}
```

## root

ESLint 구성파일 탐색 범위

default 는 true 인데, 이 값이 true 가 아니면, eslintrc 파일을 찾을 때,  
해당 프로젝트 디렉토리 뿐 아니라, 내 PC의 root 파일 시스템 root 디렉토리까지 eslint 를 찾는다.

## parser

https://velog.io/@yrnana/ESLint-%EC%95%8C%EA%B3%A0-%EC%93%B0%EC%9E%90

말 그대로 코드를 분석하기 위한 파싱툴인데, 기본값은 espree 이다.  
하지만 보통 js 워크스페이스에서는 @babel/eslint-parser 를 사용하고  
ts 워크스페이스인 경우 @typescript-eslint/parser 를 사용한다.  
사실 plugin:@typescript-eslint/recommended 를 포함시키면 @typescript-eslint/parser 가 자동으로 포함되기도 한다.

## plugins

https://velog.io/@yrnana/ESLint-%EC%95%8C%EA%B3%A0-%EC%93%B0%EC%9E%90

### eslint-plugin-\*

`플러그인은 일련의 규칙(룰) 집합이며, 플러그인을 추가하여도 규칙은 적용되지 않습니다.` (rules 집합)

예를 들면 eslint-plugin-react 는 리액트와 관련된 룰을 정의한 패키지이다.
만약 룰을 사용하고 싶다면 아래와 같이 정의해야 한다.

```json
{
  "plugins": ["react"],
  "rules": {
    "react/jsx-uses-react": "error",
    "react/jsx-uses-vars": "error"
  }
}
```

하지만 이런식으로 매번 모든 룰에 대해 분석하고 파악해서 일일히 작성하기엔 너무 귀찮은 일이다.  
때문에 `대부분의 플러그인은 recommended 나 strict, all 등의 자체 설정을 제공하는 것`이다.

eslint-plugin-react 의 경우  
recommended 와 all 두가지의 config 를 제공하는데 다음과 같이 사용할 수 있다.

```json
{
  "extends": ["plugin:react/recommended"]
}
```

https://github.com/jsx-eslint/eslint-plugin-react/blob/master/index.js

plugin 종류는 여러 가지 있는데,  
예를 들어

- eslint-plugin-react: 리액트 전용 플러그인
- eslint-plugin-prettier: 린트 위에 사용할 프리티어 플러그인
- @typescript-eslint/eslint-plugin: : 타입스크립트 전용 린트

## extends

https://velog.io/@yrnana/ESLint-%EC%95%8C%EA%B3%A0-%EC%93%B0%EC%9E%90

### eslint-config-\*

`eslint-plugin-_ 패키지들이나 룰들을 모아서 설정으로 만든 것이 eslint-config-_ 패키지다.` (plugins 또는 rules 집합)  
예를들면, eslint-config-airbnb 는
eslint, eslint-plugin-import, eslint-plugin-react, eslint-plugin-react-hooks, eslint-plugin-jsx-a11y 의 룰들을 조합한 설정 패키지이고 아래와 같이 정의해서 사용한다.

```json
{
  "extends": ["airbnb"]
}
```

eslint-plugin-\* 패키지의 설정은
extends 에서 plugin:패키지네임/설정네임으로 사용할 수 있는데  
eslint-config-\* 패키지의 설정은
바로 '\*'를 써주기만 하면 된다. 플러그인 패키지를 plugins에 단축어로 쓰던 것과 동일하다.

- eslint-config-airbnb-base: 에어비엔비 린트 플러그인
- eslint-config-next: Next.js 전용 린트 플러그인
- eslint-config-prettier: 요건 린트 설정과 중복되는 부분이 있으면 프리티어 룰에서 제외하는 플러그인

### eslint-config-next

eslint-config-next 포함된 패키지
https://github.com/vercel/next.js/blob/canary/packages/eslint-config-next/package.json

'모던 리액트 Deep Dive' 책 내용 중  
eslint-config-next Next.js 기반 프로젝트에서 사용하도록 만들어진 ESLint 설정으로,  
`구글과 협업해 만든 핵심 웹 지표(core web vital)에 도움이 되는 규칙들이 내장돼 있다.`  
Next.js 기반 프로젝트라면 꼭 사용하는 것을 추천하며, eslint-config-airbnb 와 같은 기존에 사용하던 규칙이 있다면 이에 추가로 함께 사용하는 것을 추천한다.

## rules

직접 lint rule을 적용하는 부분  
extends로 자동으로 설정된 rules 중에, 특정 rule을 끄거나, erorr를 warning으로 나오도록 변경하는 등 설정을 바꿀 수 있다.

https://eslint.org/docs/latest/rules/

## env

사전 정의된 전역변수 사용

https://eslint.org/docs/latest/use/configure/language-options#specifying-environments

```json
{
  "env": {
    "browser": true,
    "es6": true,
    "node": true
  }
}
```

## globals

전역변수를 사용하는 경우 ESLint 경고가 발생하지 않도록,  
globals 를 이용하여 사용자 전역 변수를 추가할 수 있습니다.

```javascript
{
  "globals": {
    // 사용자가 추가하는 전역 변수
    "Atomics": "readonly",
    "SharedArrayBuffer": "readonly"
  },
}
```

## parserOptions

parserOptions은 ESLint 사용을 위해 지원하려는 JavaScript 언어 옵션을 지정할 수 있습니다.

- ecmaVersion: 사용할 ECMAScript 버전을 설정
- sourceType: parser의 export 형태를 설정
- ecmaFeatures: ECMAScript의 언어 확장 기능을 설정
  - globalReturn: 전역 스코프의 사용 여부 (node, commonjs 환경에서 최상위 스코프는 module)
  - impliedStric: strict mode 사용 여부
  - jsx: ECMScript 규격의 JSX 사용 여부

```javascript
{
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    },
    "ecmaVersion": 6,
    "sourceType": "module"
  },
}
```

## overrides

https://www.daleseo.com/eslint-config/

프로젝트 내에서 일부 파일에 대해서만 다른 설정을 적용해줘야 할 때

예를 들어,  
프로젝트에 자바스크립트 파일과 타입스크립트 파일이 공존한다면 자바스크립트 파일을 기준으로 기본 설정을 하고,  
타입스크립트 파일을 위한 설정은 overrides 옵션에 명시할 수 있습니다.  
타입스크립트 확장자를 가진 파일에 대해서는 타입스크립트용 파서와 플러그인과 추천 설정을 사용하도록 세팅해주고 있습니다.

```json
{
  "overrides": [
    {
      "files": "**/*.+(ts|tsx)",
      "parser": "@typescript-eslint/parser",
      "plugins": ["@typescript-eslint"],
      "extends": ["plugin:@typescript-eslint/recommended"]
    }
  ]
}
```

만약에 프로젝트 내에 테스트 파일에만 추가적으로 Jest 플러그인과 Testing Library 플러그인에서 추천하는 규칙을 활성하고 싶다면 다음과 같이 설정합니다.

```json
{
  "overrides": [
    {
      "files": ["**/__tests__/**/*", "**/*.{spec,test}.*"],
      "env": {
        "jest/globals": true
      },
      "plugins": ["jest", "testing-library"],
      "extends": ["plugin:jest/recommended", "plugin:jest-dom/recommended", "plugin:testing-library/react"]
    }
  ]
}
```

## settings

일부 ESLint 플러그인은 추가적인 설정이 가능  
이런 경우에는 설정 파일의 settings 옵션을 사용합니다.

예를 들어, react 플러그인이 프로젝트에 설치된 리액트의 버전을 자동으로 탐지하도록 설정해보겠습니다. (기본 설정은 리액트 최신 버전을 기준으로 린트(lint)를 하게 되었습니다.)

```json
{
  "settings": {
    "react": {
      "version": "detect"
    }
  }
}
```

---

# ignorePatterns 옵션과 .eslintignore 파일

https://www.daleseo.com/eslint-config/

ESLint는 린트(lint)를 수행할 때 기본적으로 node_modules 폴더나 .로 시작하는 설정 파일은 무시  
그 밖에 다른 파일을 무시하고 싶다면 설정 파일의 ignorePatterns 옵션을 사용할 수 있습니다.

```json
{
  "ignorePatterns": ["build", "dist", "public"]
}
```
