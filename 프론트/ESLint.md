# ESLint <!-- omit in toc -->

- [1. react](#1-react)
- [2. react-hooks](#2-react-hooks)
- [3. typescript-eslint](#3-typescript-eslint)
- [4. Prettier](#4-prettier)
- [5. Microsfot Security Development Lifecycle (SDL) ESLint Plugin](#5-microsfot-security-development-lifecycle-sdl-eslint-plugin)
  - [5.1. 설정 방법](#51-설정-방법)
  - [5.2. 사용 규칙 집합](#52-사용-규칙-집합)
  - [5.3. 세부 규칙](#53-세부-규칙)
  - [5.4. 규칙 예시](#54-규칙-예시)

## 1. react

<br /><br />

## 2. react-hooks

<br /><br />

## 3. typescript-eslint

<br /><br />

## 4. Prettier

<br /><br />

## 5. Microsfot Security Development Lifecycle (SDL) ESLint Plugin

[https://github.com/microsoft/eslint-plugin-sdl](https://github.com/microsoft/eslint-plugin-sdl)

이 ESLint 플러그인은 일반적인 보안 문제와 잘못된 구성에 초점을 맞췄습니다.

Microsoft 보안 개발 수명 주기(SDL)를 따르고 ESLint를 사용하여 정적 분석 보안 테스트(SAST)를 수행하는 프로젝트를 위한 기준이 됩니다.

### 5.1. 설정 방법

```ts
{
  // microsoft sdl plugin 추가
  "plugins": ["@microsoft/sdl"],
  // 사용할 규칙 집합 설정
  "extends": ["plugin:@microsoft/sdl/common", "plugin:@microsoft/sdl/node"],
  // 추가 규칙 개별 설정
  "rules": {
    // 랜덤 함수 사용 금지 (기본값이 0이므로 수동으로 활성화)
    "@microsoft/sdl/no-insecure-random": 2
  }
}
```

### 5.2. 사용 규칙 집합

| 사용 규칙 집합  | 설명                                                | 사용여부 |
| --------------- | --------------------------------------------------- | -------- |
| **common**      | 일반적인 자바스크립트 애플리케이션을 위한 규칙 집합 | ⭕️      |
| **node**        | Node 애플리케이션을 위한 규칙 집합                  | ⭕️      |
| ~~angular~~     | Set of rules for Angular applications               | ❌       |
| ~~angularjs~~   | Set of rules for AngularJS applications             | ❌       |
| ~~electron~~    | Set of rules for Electron applications              | ❌       |
| ~~react~~       | Set of rules for ReactJS applications               | ❌       |
| ~~recommended~~ | SDL Recommended rules for all applications          | ❌       |
| ~~required~~    | SDL Required rules for all applications             | ❌       |
| ~~typescript~~  | Set of rules for TypeScript applications            | ❌       |

### 5.3. 세부 규칙

[https://github.com/microsoft/eslint-plugin-sdl#rules](https://github.com/microsoft/eslint-plugin-sdl#rules)

### 5.4. 규칙 예시

```ts
// @microsoft/sdl/no-insecure-url
// 🙅🏻 Do not use insecure URLs
const url = 'http://iniweb.inicis.com/js/auth.js';
//           ~~~~

// @microsoft/sdl/no-insecure-random
// 🙅🏻 Do not use pseudo-random number generators for generating secret values such as tokens, passwords or keys.
const randomNumber = Math.random();
//                   ~~~~~~~~~~~~~

// @microsoft/sdl/no-inner-html
// 🙅🏻 Do not write to DOM directly using innerHTML/outerHTML property
element.innerHTML = html;
//      ~~~~~~~~~~
```
