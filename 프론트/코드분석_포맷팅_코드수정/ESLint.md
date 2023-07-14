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

각 코드 파일을 검사할 파서를 설정  
기본 설정은 espree 이고, @typescript-eslint/eslint-plugin 처럼 특정 플러그인을 사용한다면 해당 플러그인에서 제공하는 parser 로 설정하면 된다.

## plugins

플러그인은 일련의 규칙 집합이며, 플러그인을 추가하여도 규칙은 적용되지 않습니다.  
(규칙을 적용하기 위해서는 추가한 플러그인 중, 사용할 규칙을 extends 에 추가해주어야 적용이 됩니다.)

plugin 추가 후 매번 적용가능 한 extends 를 확인하는 것이 번거롭기 때문에,  
대부분의 플러그인은 recommended 나 strict, all 등의 자체 설정을 제공함

우선 plugin 종류는 여러 가지 있는데,  
예를 들어

-   eslint-config-airbnb-base: 에어비엔비 린트 플러그인
-   eslint-config-next: Next.js 전용 린트 플러그인
-   eslint-plugin-react: 리액트 전용 플러그인
-   eslint-plugin-prettier: 린트 위에 사용할 프리티어 플러그인
-   eslint-config-prettier: 요건 린트 설정과 중복되는 부분이 있으면 프리티어 룰에서 제외하는 플러그인
-   @typescript-eslint/eslint-plugin: : 타입스크립트 전용 린트

## extends

eslint rule 설정이 저장되어 있는 외부 file 을 extends 하는 부분이다.
(extends 는 추가한 플러그인에서 사용할 규칙을 설정하는 것)

예를 들어,  
extends 에 eslint:recommended, plugin:@typescript-eslint/recommended 를 설정하면,  
사용하려는 해당 플러그인에서 기본적으로 제공하는 rule set 이 적용된다.

변경하고 싶은 부분이 있다면 rules 쪽에서 커스터마이징 하면 된다.

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

-   ecmaVersion: 사용할 ECMAScript 버전을 설정
-   sourceType: parser의 export 형태를 설정
-   ecmaFeatures: ECMAScript의 언어 확장 기능을 설정
    -   globalReturn: 전역 스코프의 사용 여부 (node, commonjs 환경에서 최상위 스코프는 module)
    -   impliedStric: strict mode 사용 여부
    -   jsx: ECMScript 규격의 JSX 사용 여부

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
            "extends": [
                "plugin:jest/recommended",
                "plugin:jest-dom/recommended",
                "plugin:testing-library/react"
            ]
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
