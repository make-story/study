/*
-
ESLint 설치
https://eslint.org/docs/user-guide/getting-started
$ npm install -g eslint 

-
초기 설정파일 생성
$ eslint --init
.eslintrc.js 파일 생성됨

-
ESLint + Typescript (TSLint 프로젝트가 deprecated 상태가 되고 ESLint에 통합)
https://pravusid.kr/typescript/2020/07/19/typescript-eslint-prettier.html
https://github.com/typescript-eslint/typescript-eslint#packages-included-in-this-project
$ npm install -D @typescript-eslint/parser @typescript-eslint/eslint-plugin

-
ESLint + React
https://github.com/yannickcr/eslint-plugin-react#configuration
$ npm install -D eslint-plugin-react 

-
ESLint + Next.js
https://nextjs.org/docs/pages/building-your-application/configuring/eslint#eslint-config
$ npm install -D eslint-config-next

-
웹팩에서 로더로 실행
$ npm install -D eslint-loader

-
ESLint 와 Prettier 충돌 해결
eslint-config-prettier : eslint에서 prettier와 겹치는 포매팅룰을 삭제합니다.
eslint-plugin-prettier : eslint에 prettier의 포매팅 기능을 추가합니다.
eslint-config-pretteir로 eslint의 원래 포매팅 기능을 없애버리고, eslint-plugin-prettier로 prettier의 포매팅 기능을 사용합니다.
*/

/**
 * https://eslint.org/docs/latest/use/getting-started#configuration
 * https://eslint.org/docs/latest/rules/
 */

module.exports = {
  // ESLint 구성파일 탐색 범위
  // default 는 true 인데, 이 값이 true 가 아니면, eslintrc 파일을 찾을 때,
  // 해당 프로젝트 디렉토리 뿐 아니라, 내 PC의 root 파일 시스템 root 디렉토리까지 eslint 를 찾는다.
  root: true,

  // 프로젝트의 사용 환경을 설정한다.
  // https://eslint.org/docs/latest/use/configure/language-options#specifying-environments
  env: {
    browser: true,
    commonjs: true,
    es2020: true,
    node: true, // node: true 는 webpack.config.js 빌드시 node 환경도 적용
  },

  // 전역변수를 사용하는 경우 ESLint 경고가 발생하지 않도록,
  // globals 를 이용하여 사용자 전역 변수를 추가할 수 있습니다.
  globals: {
    React: true, // React 17 이상부터 import React from 'react' 권장 제외됨 - https://legacy.reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html
  },

  // 파서
  // 기본 설정은 espree 이고, @typescript-eslint/eslint-plugin 처럼 특정 플러그인을 사용한다면 해당 플러그인에서 제공하는 parser 로 설정하면 된다.
  parser: '@typescript-eslint/parser',

  // ESLint 사용을 위해 지원하려는 JavaScript 언어 옵션을 설정할 수 있다.
  parserOptions: {
    // 자바스크립트 버전
    //ecmaVersion: 11,
    //sourceType: "module",
    // Typescript
    project: './tsconfig.json',
    parser: 'typescript-eslint-parser',
  },

  // 플러그인은 일련의 규칙 집합이며, 플러그인을 추가하여도 규칙은 적용되지 않습니다.
  // (규칙을 적용하기 위해서는 추가한 플러그인 중, 사용할 규칙을 extends 에 추가해주어야 적용이 됩니다.)
  plugins: ['react', 'react-hooks', '@typescript-eslint', 'prettier'],

  // eslint rule 설정이 저장되어 있는 외부 file 을 extends 하는 부분이다.
  // (extends 는 추가한 플러그인에서 사용할 규칙을 설정하는 것)
  // https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin#supported-rules
  // plugin:prettier/recommended : eslint-plugin-prettier + eslint-config-prettier 동시 적용
  // prettier/@typescript-eslint : prettier 규칙과 충돌하는 @typescript-eslint/eslint-plugin 규칙 비활성화
  extends: [
    //'next/core-web-vitals', // Next.js 공식 : 엄격모드, ELint를 처음 설정하는 개발자에게 권장되는 구성
    //'next', // Next.js 공식 : 기본모드'
    'plugin:@next/next/recommended', // next/core-web-vitals 등을 사용할 경우 주석처리
    'plugin:@typescript-eslint/recommended',
    //'plugin:react/recommended', // 리액트 추천 룰셋
    //'plugin:import/recommended', // import 추천 롤셋
    //'plugin:import/typescript', // import typescript 롤셋
    //'plugin:prettier/recommended',
    //'prettier/@typescript-eslint',
    'prettier', // 기존 각각 설정해주던 prettier 설정을 하나로 통합됨 - https://github.com/prettier/eslint-config-prettier/blob/main/CHANGELOG.md#version-800-2021-02-21
  ],

  // ESLint 무시할 디렉토리, 파일을 설정
  ignorePatterns: ['dist/', 'node_modules/'],

  // 직접 lint rule 을 적용하는 부분
  // extends로 자동으로 설정된 rules 중에, 특정 rule을 끄거나, erorr를 warning으로 나오도록 변경하는 등 설정을 바꿀 수 있다.
  // https://eslint.org/docs/latest/rules/
  rules: {
    quotes: ['error', 'double'], //더블 쿼터 사용
    '@typescript-eslint/quotes': ['error', 'double'], //더블 쿼터 사용
    'no-unused-vars': 'off', //사용안한 변수 경고 중복
    'spaced-comment': 'off', //주석을 뒤에 쓰지 말라는 경고
    '@typescript-eslint/no-unused-vars': 'warn', //사용안한 변수는 경고
    'jsx-a11y/control-has-associated-label': 'off', // 상호작용하는 엘리먼트에 label을 넣는다
    'react/no-array-index-key': 'off', // key값으로 index를 사용할수 있다.
    'comma-dangle': 'off', // 마지막에 , 을 넣어주지 않는다.
    'arrow-body-style': 'off', //화살표 함수 안에 return을 사용 할 수 있다.
    'react/no-unescaped-entities': 'off', //문자열 내에서 " ' > } 허용
    'react/prop-types': 'off', //proptypes를 사용하지 않는다.
    'object-curly-newline': 'off', // { 다음 줄 바꿈을 강제로 사용하지 않는다.
    'react/jsx-one-expression-per-line': 'off', //한라인에 여러개의 JSX를 사용 할 수 있다.
    'implicit-arrow-linebreak': 'off', // 화살표 함수 다음에 줄 바꿈을 사용할 수 있다.
    'no-shadow': 'off', //파일 내에서 중복 이름을 사용 할 수 있다.
    'operator-linebreak': 'off', //연산자 다음 줄 바꿈을 사용 할 수 있다.
    'react/react-in-jsx-scope': 'off', // jsx를 사용하여도 React를 꼭 import 하지 않아도 된다.
    'react/jsx-props-no-spreading': 'off', //props를 스프래드 할 수 있다.
    'jsx-a11y/anchor-is-valid': 'off', // next js에서는 a에 href없이 사용
    'global-require': 'off', //함수 내에서 require 사용가능
    'no-use-before-define': 'off', // 선언전에 사용하지 말라,
    'import/prefer-default-export': 'off', //export default 권장
    'no-param-reassign': 'off', //param assign 하지 않기
    'jsx-a11y/label-has-associated-control': 'off',
    'no-invalid-css': 'off',
    'no-confusing-arrow': 'off',
    'react/jsx-curly-newline': 'off',
    indent: 'off',
    'react/jsx-filename-extension': [
      1,
      { extensions: ['.js', '.jsx', '.tsx'] }, //jsx사용가능한 확장자 설정
    ],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      }, //import 시 확장자명은 사용하지 않는다.
    ],
    // import 순서 규칙 설정 - eslint-plugin-import - https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/order.md
    // 코드 저장시 설정된 값 자동 반영을 위해서는 사용중인 IDE 도구(예: VSCode) 추가 설정 필요
    // vscode 의 경우 CTRL + SHIFT + P 입력 후, ESLint: Restart ESLint Server 선택해서 다시 실행
    'import/order': [
      'error',
      {
        groups: [['builtin', 'external'], 'internal', ['parent', 'sibling'], 'index'],
        'newlines-between': 'always',
      },
    ],
  },

  // 프로젝트 내에서 일부 파일에 대해서만 다른 설정을 적용해줘야 할 때
  // https://www.daleseo.com/eslint-config/
  overrides: [
    {
      files: ['**/*.tsx'],
      rules: {
        'react/prop-types': 'off',
      },
    },
  ],

  // 일부 ESLint 플러그인은 추가적인 설정이 가능
  settings: {
    'import/parser': {
      'typescript-eslint-parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      node: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
      },
    },
    react: {
      pragma: 'React',
      version: 'detect', // eslint-plugin-react가 자동 리액트버전탐지
    },
  },
};
