# JSDoc

`JavaScript용 API 문서 생성기`  
코드 자체와 함께 소스 코드에 직접 문서 주석을 추가 → JSDoc 도구는 소스 코드를 스캔하고 HTML 문서 웹사이트를 생성

JSDoc 의 목적은 JavaScript 애플리케이션 또는 라이브러리의 API를 문서화하는 것입니다.  
모듈, 네임스페이스, 클래스, 메소드, 메소드 매개변수 등과 같은 것을 문서화하려고 한다고 가정합니다.

https://jsdoc.app/  
https://github.com/jsdoc/jsdoc

> JSDoc 은 다양한 템플릿을 가지고 있음

# 타입스크립트 JSDoc 레퍼런스

https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html

---

# JSDoc 주석 형태

## @see

연관성 있는 문서나 리소스 참조함을 표시  
{@link} 와 같이 사용 가능

- 문법

```
// @see <namepath>
// @see <text>
```

- 예시

```javascript
/**
 * Both of these will link to the bar function.
 * @see {@link bar}
 * @see bar
 */
function foo() {}

// Use the inline {@link} tag to include a link within a free-form description.
/**
 * @see {@link foo} for further information.
 * @see {@link http://github.com|GitHub}
 */
function bar() {}
```

## @description (@desc)

설명을 표시

- 문법

```
// @description <some description>
```

- 예시

첫번째 줄일때에는 생략가능

```javascript
/**
 * Add two numbers.
 * @param {number} a
 * @param {number} b
 * @returns {number}
 */
function add(a, b) {
  return a + b;
}
```

첫번째 줄이 아닐때

```javascript
/**
 * @param {number} a
 * @param {number} b
 * @returns {number}
 * @description Add two numbers.
 */
function add(a, b) {
  return a + b;
}
```

## @example

예제 제공

<caption> 태그를 @example 뒤에 사용하여 캡션기능 제공 가능

- 문법

```
// @example
// @exmple <caption>captionText</caption>
```

- 예시

```javascript
/**
 * Solves equations of the form a * x = b
 * @example
 * // returns 2
 * @example <caption>Example usage of method1.</caption>
 * // returns 2
 * globalNS.method1(5, 10);
 * @returns {Number} Returns the value of x for the equation.
 */
globalNS.method1 = function (a, b) {
  return b / a;
};
```

## @constant (@const)

상수를 표시

- 문법

```
// @constant [<type> <name>]
```

- 예시

```javascript
/**
 * @constant
 * @type {string}
 * @default
 */
const RED = 'FF0000';

/** @constant {number} */
var ONE = 1;
```

## @param (@arg, @argument)

함수에 전달받은 인자 값의 이름

- 문법

```
// @param <someParamName>
// @param {<type>} <someParamName>
// @param {<type>} <some description>
```

- 예시

단일 속성

```javascript
/**
 * @param {string} somebody - Somebody's name.
 */
function sayHello(somebody) {
  alert('Hello ' + somebody);
}
```

복수 속성

```javascript
/**
 * @param {(string|string[])} [somebody=John Doe] - Somebody's name, or an array of names.
 */
function sayHello(somebody) {
  if (!somebody) {
    somebody = 'John Doe';
  } else if (Array.isArray(somebody)) {
    somebody = somebody.join(', ');
  }

  alert('Hello ' + somebody);
}
```

파라미터 Object 프로퍼티 타입

```javascript
/**
 * Assign the project to an employee.
 * @param {Object} employee - The employee who is responsible for the project.
 * @param {string} employee.name - The name of the employee.
 * @param {string} employee.department - The employee's department.
 */
Project.prototype.assign = function (employee) {
  // ...
};
```

## @return (@returns)

함수가 반환하는 값을 표시

- 문법

```
// @returns [{type}] [description]
```

- 예시

```javascript
/**
 * Returns the sum of a and b
 * @param {number} a
 * @param {number} b
 * @returns {number} Sum of a and b
 */
function sum(a, b) {
  return a + b;
}
```

---

# 설치

```
$ yarn add jsdoc
$ yarn add better-docs
```

# 설정파일 생성

https://jsdoc.app/about-configuring-jsdoc.html

```
$ mkdir jsdoc
$ cd jsdoc
$ touch config.js
```

config.js

```javascript
/**
 * JSDoc 설정파일
 *
 * 템플릿 : https://github.com/SoftwareBrothers/better-docs
 */
//const _ = require('lodash');

// 공통 설정
const config = {
  sourceType: 'module', // ES 2015를 지원하기 위해 적용
  recurseDepth: 10, // -r 명령 행 플래그로 재귀가 사용 가능한 경우 JSDoc 은 10 레벨 깊이의 파일을 검색합니다.
  tags: {
    allowUnknownTags: true, // JSDoc 이 알 수 없는 태그를 지원하도록 설정
    dictionaries: ['jsdoc', 'closure'],
  },
  plugins: [ // Markdown 을 사용하기 위해 플러그인을 추가합니다.
    'node_modules/jsdoc/plugins/markdown',
    'node_modules/better-docs/component',
    'node_modules/better-docs/typescript',
  ],
  source: {
    //include: ["./"], // 문서화 대상 파일 지정 - './' 에 includepattern 에 해당하는 파일을 대상으로 함
    includePattern: '\\.(js|jsx|ts|tsx)$',
    exclude: ['./public'],
    excludePattern: '(node_modules/|docs)',
  },
  opts: {
    destination: "./docs" // 결과물 경로 지정 - 기존에 생성되던 'out' 이라는 폴더를 'docs' 라는 폴더로 생성
    encoding: 'utf8', // Docs 에서 한글을 사용할 수 있도록 설정
    template: 'node_modules/better-docs', // 템플릿(문서스타일) 지정
    recurse: true,
    verbose: true,
    readme: "README.md",  // README.md를 추가
  },
  templates: {
    cleverLinks: false,
    monospaceLinks: false,
    search: true,
    'better-docs': {
      name: 'Front Documentation',
      title: '', // HTML title
      hideGenerator: false,
      navLinks: [
        {
          label: 'JSDoc',
          href: 'https://github.com/jsdoc/jsdoc',
        },
      ],
    },
  },
};

module.exports = config;
```

`config.js 기반으로 추가설정파일 생성`

```javascript
/**
 * JSDoc 설정 : 특정부분 설정
 */
const _ = require('lodash');
const config = require('./config');

module.exports = _.merge(config, {
  source: {
    include: ['src/test'], // 문서화 대상 파일 지정 - 서비스/비즈니스별 다르게 설정
  },
  opts: {
    destination: './public/docs/display', // 결과물 경로 지정 - 서비스비즈니스별 다르게 설정
  },
});
```

# 실행명령 추가

package.json

```
{
    ...
    "scripts": {
        "doc": "./node_modules/.bin/jsdoc -c ./jsdoc/display.js",
    },
    ...
}
```

- './node_modules/.bin/jsdoc' : jsdoc 실행명령
- '-c' : 옵션
- './jsdoc/display.js' : JSDoc 설정값이 있는 파일 지정

# Webpack 연동

```
$ yarn add jsdoc-webpack-plugin
```

webpack.config.js

```javascript
const path = require('path');
const JsDocPlugin = require('jsdoc-webpack-plugin');

module.exports = {
  entry: './index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
  },
  plugins: [
    new JsDocPlugin({
      conf: 'jsdoc.config.json', // config 이름 추가
      cwd: '.', // config의 경로
      preserveTmpFile: false, // 임시 파일을 보존할 지 설정
    }),
  ],
};
```
