# 프로젝스 폴더(디렉토리)/파일 구조

Next.js, Atomic, React, React State, Node 등 우리가 사용하는 기술스팩(프레임워크 등)을 고려

src 하위에 아래 폴더 구성됨

```
- common (프로젝트 공통으로 사용하는 것들이 있는 곳, NPM 패키지화하여 배포, 외부 project 참조하지 않고 캡슐화 되어 있어야 함)


- [project] (프로젝트단위 폴더, 예: customer, display, o2o, product, smartBeauty 등)
  - api
    - [각 서비스 또는 영역별 폴더]
  - components
    [아토믹 디자인 구조 또는 서비스/기능별 구조]
    - atoms
    - molecules
    - organisms
    - templetes
  - config
    - reactQuery
  - const
  - hooks
    - [각 서비스 또는 영역별 폴더]
  - sagas
    - [각 서비스 또는 영역별 폴더]
  - stores
    - [각 서비스 또는 영역별 폴더]
  - types
  - utils
    - [각 기능별 폴더]


- pages (Next.js 프레임워크 구조상 폴더)
  - [project page folder]
```

`컴포넌트 내 폴더(components 폴더) 구조는 기본 아토믹 디자인 패턴을 따르며, pages 단위(폴더)는 Next.js 프레임워크 구조에 따른 해당 경로(next.js 구조의 폴더)를 사용한다`

## 폴더/파일 네이밍

### 폴더명 규칙

- '소문자'로 시작
  - 예: /pacificShop/index.tsx

### 파일명 규칙

- 컴포넌트의 경우(index 파일 제외) '대문자'로 시작
  - 예: /molecules/FullLayer.tsx
- 컴포넌트가 아닌 경우 '소문자'로 시작
  - 예: /utils/array.ts
- 사용자 Hook 경우, 'use'로 시작 (프리픽스)
  - 예: /hooks/test/useQueryTest.ts
- HOC (고차컴포넌트) 경우, 'with'로 시작 (프리픽스)
  - 예: /hocs/test/withHocTest.tsx
- react-query API 호출 Hook 경우, 'useQuery'로 시작 (프리픽스)
  - 예: /hooks/test/useQueryTest.ts

### 비즈니스 로직 관리

`study.git/프론트/NextJS_React/패턴/React_관심사분리_공통로직_비즈니스로직_관리.md` 참고!

- 추천방법1:

  - 댄 아브라모프(Dan Abramov)의 프레젠테이션(Presentational), 컨테이너(Container, 비즈니스로직) 컴포넌트로 분리
    - 특정 컨테이너 내부 여러 컴포넌트에서의 공통 비즈니스 로직
      - 이벤트 처리, 데이터 호출, 데이터 가공 등
    - https://patterns-dev-kr.github.io/design-patterns/container-presentational-pattern/
  - 뱅크셀러드 글 참고
    - (https://blog.banksalad.com/tech/build-a-website-with-gatsby/)
    - components
      - 재사용이 가능한 요소들을 모아 컴포넌트로 구성되어 있습니다. 순수한 데이터 형태를 props로 받아오며, 다양한 container에서 사용 됩니다.
    - containers
      - container 는 화면을 구성하기 위한 영역에 해당하며 이며 여러개의 section 을 가지고 있습니다.
      - (container 내 하위 폴더가 section 입니다.)
      - (section 은 화면에서 하나의 영역 단위 입니다. 모듈같은 것)
      - 또한 section 은 여러개의 component 들의 조합으로 구성되어있습니다.
      - 기본적으로 page와 container는 1:1 매칭 된 구조를 가지고 있으며 데이터를 가져오거나, 비즈니스 로직이 포함됩니다.
    - pages
      - pages 에 존재하는 파일 이름을 기준으로 서비스의 경로가 생성됩니다.
      - 해당 파일은 경로 이름과 SEO 를 위한 title, description 등을 추가하며 콘텐츠들은 모두 container 에서 관리하였습니다.

- 추천방법2:

  - useXXX 사용자 Hooks 로 분리
    - 여러 컨테이너 또는 여러 컴포넌트에서의 공통 비즈니스 로직
      - 이벤트 처리, 데이터 호출, 데이터 가공 등
  - https://usehooks.com/
  - https://github.com/streamich/react-use
  - https://usehooks-ts.com/
  - https://blog.bitsrc.io/11-useful-custom-react-hooks-for-your-next-app-c66307cf0f0c

- 추천방법3:

  - withXXX 고차 컴포넌트(HOC)로 분리 (사용자 Hook 방식을 우선 고민)
    - 전반적으로 재사용 가능한 로직을 prop으로 컴포넌트에게 제공
    - 또는 특정 컨테이너 또는 컴포넌트 실행을 위한 선행조건 적용
    - https://patterns-dev-kr.github.io/design-patterns/hoc-pattern/

- 추천방법4:

  - GraphQL 서버에서 작업
    - 데이터 호출이 동기적으로 필요할 때
    - 매쉬업이 필요할 때

### 신규 NPM(도구, 라이브러리, 프레임워크 등등) 설치시, 파트 전체 대화채널(워크챗, ABC챗)에 공유

- 예: [공유] XXX 설치하려고 합니다. XXX를 해결하기 위한 목적입니다.

---

# 들여쓰기

`각 들여쓰기 단계는 2개의 공백을 사용하고 탭은 사용하지 않습니다. (모든 파일)`

"읽기 좋은 자바스크립트 코딩 기법" 책 내용 중...  
들여쓰기는 거의 모든 언어에서 첫 번째로 결정하는 부분입니다. 또한 마치 종교적 논쟁처럼 소프트웨어 엔지니어들끼리 몇 시간 동안 논쟁할 수 있는 주제입니다. 그만큼 민감하지만 가장 먼저 정해야 하는 주제이기도 합니다.  
치일피일 미루다 뒤늦게 정하면, 들여쓰기가 잘못된 파일에 작업할때마다 들여쓰기부터 손봐야 하는 문제가 생길 수 있습니다.

space와 tab을 섞어서 사용하지 않는다. - 'NHN 가이드'와 동일  
사용하는 개발환경에따라 탭 또는 스페이스의 들여쓰기가 다르게 보일수 있기때문에 이를 통일하지 않으면 가독성이 떨어진다.  
따라서 프로젝트를 시작할 때 반드시 공백 문자와 탭 문자 둘 중 하나를 선택해야 한다.

1. 탭을 이용한 들여쓰기  
   이 방법에는 두 가지 장점이 있습니다. 먼저, 탭과 들여쓰기 단계가 일대일로 대응되어 논리적입니다.  
   또한 각 텍스트 에디터에서 탭 크기를 원하는 대로 설정할 수 있어서 들여쓰기를 좁게 설정하는 개발자나
   넓게 설정하는 개발자 모두 원하는 대로 볼 수 있습니다.  
   그러나 탭을 이용한 들여쓰기는 시스템마다 탭 크기를 다르게 표현한다는 단점이 있습니다. 따라서 에디터나 시스템에서 열었던 파일을 다른 데서 열었을 때 자신이 보던 방식과 달라 난감할 수 있습니다. 이는 개발자마다 같은 코드를 다른 방식으로 본다는 것이고, 협업을 위해서는 좋지 않습니다.

2. 공백을 이용한 들여쓰기  
   공백으로 들여쓰기를 처리하는 방법으로, 2개/3개/8개 공백 중 한 가지 방식을 이용해서 들여쓰기하는 것이 일반적입니다.  
   이 방법은 자바스크립트뿐만 아니라 프로그래밍 언어에서 전반적으로 사용하는 스타일 가이드라인입니다.  
   그런데 실무에서는 보통 2개나 8개 공백의 절충안으로 4개를 공백 들여쓰기에 사용합니다.  
   공백을 이용한 들여쓰기의 가장 큰 장점은 어떤 에디터나 시스템에서도 똑같이 보인다는 점입니다. 또 텍스트 에디터에서 탭 키를 누르면 여러 개의 공백을 입력하도록 설정할 수도 있습니다.  
   즉 모든 개발자가 소스 코드를 동일하게 볼 수 있습니다.
   그러나 개발자 중 한 명이라도 에디터 설정을 잘못하면 서식에 문제가 생길 수 있습니다.  
   개인마다 다른 방법을 추구할 수는 있지만, 팀 내 의견을 하나로 모으는 것이 무엇보다 중요합니다.

# 문장의 종료

`한 줄에 하나의 문장만 허용하며, 문장 종료 시에는 반드시 세미콜론(;)을 사용한다.` - 'NHN 가이드'와 동일  
자바스크립트는 이를 문법으로 강제하지 않지만, 종종 생각지 못한 오류를 만들고 디버깅을 어렵게 한다.

```
// 나쁜 예: 세미콜론 없음
let a = 1

// 나쁜 예: 한 줄에 두개의 문장
let a = 1, b = 2;
```

# File Import

`import 등을 그룹화하여, 외부모듈과 내부모듈 파악 효율성을 높인다.`

상대 경로 import를 group화하여 분류하고 사이 사이에 빈 줄로 구분한다. - '뱅크샐러드 가이드'와 동일  
외부 모듈과 내부 모듈을 구분하여 사용한다. - 'NHN 가이드'와 동일

```javascript
// 나쁜 예
import React from 'react';
import Button from '../Button';

import styles from './styles.css';
import type { User } from '../../types';
import { getUser } from '../../api';

import PropTypes from 'prop-types';
import classNames from 'classnames';
import { truncate, formatNumber } from '../../utils';

// 좋은 예: 그룹화
// 1. node_modules 모듈
// 2. API, State, Type, 내부기능 또는 컴포넌트 등 그룹
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import { getUser } from '../../api'; // 절대경로 또는 alias 활용 추천
import type { User } from '../../types';
import { formatNumber, truncate } from '../../utils';
import Button from '../Button';
import styles from './styles.css';
// API, 타입, 유틸, 스타일 등등 역할별 그룹화
```

마지막 import 파일 이후에 에는 항상 1줄의 여백을 넣습니다. - '뱅크샐러드 가이드'와 동일

```javascript
// 나쁜 예: import 와 로직간 구분을 위한 빈줄 없음
import { App } from '@/components';
let a = 1;

// 좋은 예
import { App } from '@/components';

let a = 1;
```

# 공백

`연산자에 공백 넣기`  
연산자를 두 개의 피연산자에 사용할 때는 연산자 앞뒤에 공백을 하나씩 추가해 표현식이 명확하게 보이도록 합니다.

```javascript
// 좋은 예
const found = (values[i] === item);
let a = 1 + 2;
let foo = item | '';

// 좋은 예
if (found && (count > 10)) {
  // ...
}

// 좋은 예
for (i = 0, i < count; i++) {
  // ...
}

// 나쁜 예: 공백이 없음
const found = (values[i]===item);
let a=1+2;
let foo = item|'';

// 나쁜 예: 공백이 없음
if (found &&(count>10)) {
  // ...
}

// 나쁜 예: 공백이 없음
for (i=0; i<count; i++) {
  // ...
}
```

`괄호에 공백 넣기`  
괄호를 사용할 때, 여는 괄호 바로 다음과 닫는 괄호 바로 앞에는 공백이 없어야 합니다.

```
// 좋은 예
const found = values[i] === item;

// 좋은 예
if (found && count > 10) {
  doSomething();
}

// 좋은 예
for (i = 0; i < count; i++) {
  process(i);
}

// 나쁜 예: 여는 괄호 바로 다음에 공백이 입력됨
const found = ( values[i] === item);

// 나쁜 예: 닫는 괄호 바로 앞에 공백이 입력됨
if (found && count > 10 ) {
  doSomething();
}

// 나쁜 예: 인자 앞뒤로 불필요한 공백이 입력됨
for ( i = 0; i < count; i++ ) {
  process(i);
}
```

# 빈 줄 넣기

`코드내 가독성을 높이기 위한, 코드그룹(변수선언, 기능단위), 함수선언, 컴포넌트 선언 등 빈 줄을 최대한 활용한다.`

"읽기 좋은 자바스크립트 코딩 기법" 책 내용 중...  
보통 다음의 경우 빈 줄을 추가하는 것이 좋습니다.

1. 함수(메서드) 사이
2. 함수(메서드) 내 지역 변수와 첫 번째 문장 사이
3. 한 줄 또는 여러 줄 주석 전
4. 가독성을 높이기 위해 메서드 내에서 논리적으로 구분되는 곳 (역할이나 기능 단위의 코드묶음/그룹 등)

# 주석

`기계를 위한 코드 쓰기(또는 고민)도 중요하지만, 함께하는 동료들를 위해 코드읽기에 도움되는, 주석을 최대한 제공한다.`  
`(코드 읽기/파악에 있어, 최대한 사람에게 종속되지 않도록 한다.)`

"읽기 좋은 자바스크립트 코딩 기법" 책 내용 중...  
주석을 자주 사용하면 다른 사람이 코드를 이해하는 데 도뭉이 됩니다.
다음 경우에 주석을 사용합니다.

- 이해하기 어려운 코드 (개인차, 기준이 명확하지 않음. 최대한 주석 입력 추천)
- 에러로 오해하기 쉬운 코드
- 로직이 명확하지 않은 특정 브라우저를 위한 코드
- 문서 생성에 필요한 객체, 메서드, 프로퍼티, 변수

```javascript
// 한줄 설명(주석)

/* 파라미터 등 코드 사이 설명 */

/**
 * 파일 / 함수 / 컴포넌트 등 설명
 */

/*
긴 설명, 
예제 코드, 
주석 어노테이션 등
*/
```

```javascript
/**
 * 파일 첫 라인에는 해당파일의 기능(또는 역할, 화면영역)에 대한 설명
 */
import test from 'module';

/**
 * 인터페이스에 대한 설명
 */
interface ITest {};

/**
 * 타입에 대한 설명
 */
type TTest = string;

/**
 * 함수에 대한 설명
 */
const func = () => {};

/**
 * 컴포넌트 네이밍은 Index 처럼 모호한 네이밍이 아닌, 사람이 인식하기 쉬운 네이밍으로 선언
 * (브라우저 콘솔에 에러메시지 노출시, 에러발생하는 컴포넌트를 쉽게 파악/찾아가기 위함)
 */
const TestComponent = () => {

  // 스토어 상태값 종류 설명
  useSelector();

  // 주석은 한줄 빈칸(공백)을 두고 입력한다.
  const code1 = ‘’; // 변수 설명 (선택)

  // 주석은 한줄 빈칸(공백)을 두고 입력한다.
  const code2 = ‘’; // 변수 설명 (선택)

  /**
   * 큰 기능(비즈니스)단위 그룹의 경우
   */
  useEffect(() => {
    // 각 기능(디스패치, 유효성검사 등)에 대한 설명

    // ...

    // 각 기능(디스패치, 유효성검사 등)에 대한 설명

    // ...
  }, []);

  return (
    <>
      {/* 컴포넌트에 대한 설명 */}
      <AbcComponent />

      {/* 컴포넌트에 대한 설명 */}
      <DefComponent />
    </>
  );
};
```

## 주석 어노테이션

"읽기 좋은 자바스크립트 코딩 기법" 책 내용 중...  
주석은 어노테이션으로 코드에 추가적인 설명을 하기 위해 사용 됩니다.  
어노테이션은 한 단어이며 그 뒤에 콜론이 붙습니다.

어노테이션은 한 줄 주석과 여러 줄 주석 모두에 사용할 수 있으며
형식은 주석 사용 방법을 따라야 합니다.

- 'TODO:'  
  코드를 아직 다 작성하지 않았음을 의미합니다.
  다음에 작업할 내용에 대한 정보가 반드시 있어야 합니다.

- 'HACK:'  
  임시 방법을 사용한 코드를 의미합니다. (크로스 브라우징 대응)
  핵을 왜 사용했는지에 대한 정보가 반드시 있어야 합니다.
  나중에 더 나은 방법으로 문제를 해결할 수도 있다는 뜻입니다.

- 'XXX:'  
  코드에 문제가 있어 가능한 빨리 수정해야 함을 의미합니다.

- 'FIXME:'  
  코드에 문제가 있어 곧 수정해야 함을 의미합니다.
  XXX 보다는 덜 중요합니다.

- 'REVIEW:'  
  변경 가능성이 있어 리뷰가 필요한 코드를 의미합니다.

```javascript
// 좋은 예
// TODO: 더 빠르게 처리하는 방법을 찾아보겠습니다.
doSomething();

// 좋은 예
/*
 * HACK: IE 을 위한 코드입니다. 나중에 시간이 날 때
 * 다시 한번 보겠습니다. 이 코드는 버전 1.2 가 되기 전까지
 * 반드시 수정되어야 합니다.
 */
if (document.all) {
  doSomething();
}

// 좋은 예
// REVIEW: 더 좋은 방법이 있을까요?
if (document.all) {
  doSomething();
}

// 나쁜 예: 주석 공백이 잘못 되어 있음
// TODO : 빠르게 처리하는 방법을 찾아보겠습니다.
doSomething();

// 나쁜 예: 주석은 코드와 들여쓰기 단계가 같아야 합니다.
// REVIEW: 더 좋은 방법이 있을까요?
if (document.all) {
  doSomething();
}
```

# 선언과 할당

`한줄에 하나의 선언 키워드와 할당, 선언과 할등은 기능/역할별 가독성을 위한 그룹화`

`모든 변수는 사용하기전에 선언부터 해야 합니다. (가독성, 코드흐름)` - '더글라스 크락포드 가이드'와 동일  
변수의 할당은 스코프의 시작 부분에서 해주십시오. - '에어비앤비 가이드'와 동일 (let, const 등 키워드는 'throws a ReferenceError' 기본적으로 에러체크)

하나의 선언 키워드에 너무 많은 변수를 선언할 경우, 코드가 쉽게 지저분 해질 수 있으므로, 하나의 선언 키워드에 하나의 변수를 선언한다. - 'NHN 가이드'와 동일  
변수 선언은 변수당 하나씩 사용한다. - '네이버 가이드'와 동일

```
// 나쁜 예: 하나의 선언 키워드에 너무 많은 변수 할당
let foo = '',
  bar = '',
  quux = '';

// 좋은 예
let foo = '';
let bar = '';
let quux = '';

// 나쁜 예: 콤마 위치
const hero = {
  firstName: 'Bob',
  lastName: 'Parr',
  heroName: 'Mr. Incredible',
  superPower: 'strength' // 마지막 항목 콤마
};

// 좋은 예
const hero = {
  firstName: 'Bob',
  lastName: 'Parr',
  heroName: 'Mr. Incredible',
  superPower: 'strength', // 마지막 항목의 콤마는 브라우저 호환성(ES버전 지원)확인 필요, ES3의 일부 구현에서 불필요한 쉼표가 있는 경우, 배열 길이를 추가(http://es5.github.io/#D)
};
```

# 전역 변수

`전역 변수를 사용을 위해서는 동료와 협의된 이후 선언한다.`

전역변수 사용을 자제 - '더글라스 크락포드 가이드'와 동일  
전역 변수를 사용하지 않는다. - 'NHN 가이드'와 동일  
암묵적 전역 변수(구성원 협의되지 않은 선언)를 사용하지 않는다.

## 참고: 가비지 컬렉터

JavaScript 에는 더 이상 사용되지 않지만 가비지 컬렉터가 파악하지 못해 반환되지 않는 메모리가 존재합니다.  
가비지 컬렉터가 파악하지 못하는 메모리 사용은 아래와 같습니다.  
https://auth0.com/blog/four-types-of-leaks-in-your-javascript-code-and-how-to-get-rid-of-them/

- 전역 변수
- 타이머와 콜백
- DOM 외부의 참조
- 클로저

```javascript
// 나쁜 예: 함수내 전역변수 스코프체이닝
function sum(x, y) {
  result = x + y;
  return result;
}

// 나쁜 예: 함수내 암묵적 전역변수 할당
function foo() {
  let a = (b = 0); // let a = (b = 0);와 같다. b가 암묵적 전역이 된다.
}

// 좋은 예
function sum(x, y) {
  let result = x + y;

  return result;
}
```

# 네이밍

`낙타 표기법(소문자로 시작하고 새로운 단어를 사용할 때마다 첫 문자는 대문자로 입력하는 방식) 사용`  
`약어를 최대한 사용하지 않는다.`

코드를 즉시 이해할 수 있도록 하는 것이 훨씬 더 중요하므로 최소화(파일크기)에 대해 걱정하지 마십시오. - '구글 가이드'와 동일  
모호하거나 생소한 약어를 사용하지 마십시오. - '구글 가이드'와 동일  
변수 및 함수 이름은 첫 글자가 소문자인 카멜 케이스를 사용 - 'jQuery 가이드'와 동일  
한문자 이름(줄임)은 피하십시오. 이름에서 의도를 읽을 수 있도록 하십시오. - '에어비앤비 가이드'와 동일  
가장 먼저 변수의 이름을 더 명확하게 바꿔보자. - 리팩터링 2판 책 내용 중

"읽기 좋은 자바스크립트 코딩 기법" 책 내용 중...  
자바스크립트의 기반이 되는 ECMAScript는 '낙타표기법'으로 작성되었습니다.  
낙타 표기법은 소문자로 시작하고 새로운 단어를 사용할 때마다 첫 문자는 대문자로 입력하는 방식입니다.

일반적으로 자신이 사용하는 언어의 표준 라이브러리에서 따르는 이름 규칙을 사용해야 합니다.  
대부분의 자바스크립트 개발자들은 변수명과 함수명을 지을 때 낙타 표기법을 사용합니다.  
구글 자바스크립트 스타일 가이드와 SproutCore 스타일 가이드, Dojo 스타일 가이드 모두 낙타 표기법을 사용하라고 명시하고 있습니다.

- 2000년도쯤까지는 자바스크립트에서 헝가리안 표기법이 많이 쓰였습니다. 이 표기법은 변수명 앞에 변수의 타입을 붙이는 방식입니다.  
  (예를 들면, sName은 문자열 변수를 의미하고, iCount는 정수형 변수를 의미합니다.)

변수명은 명사로, 함수명은 동사로 시작하면 서로 구분하기 쉬워집니다.

함수명과 메서드(객체에 소속된 함수)의 첫 번째 단어는 동사로 시작해야 합니다.

함수 프리픽스

1. has : 불린 값을 반환하는 함수
2. is : 불린 값을 반환하는 함수
3. get : 불린 이외의 값을 반환하는 함수
4. set : 값을 저장하기 위해 사용하는 함수
5. fetch : 데이터 통신을 위해 사용하는 함수

- jQuery의 함수명은 위에서 설명한 규칙을 따르지 않습니다. jQuery 의 많은 메서드가 getter와 setter의 역할을 동시에 하기 때문입니다.

## 폴더명, 파일명

`일반적 약어(api, env 등)외 약어는 최소화 하며, 단수/복수 구분이 힘들 때는, 단수로 한다`

단수

## 상수

`상수는 모든 문자를 대문자로 쓰고, 단어가 바뀔 때는 밑줄을 사용`

"읽기 좋은 자바스크립트 코딩 기법" 책 내용 중...  
ECMAScript6 이전까지는 자바스크립트에 상수 개념이 없었습니다. 있다 해도 개발자들은 변수를 선언해 상수처럼 사용했습니다.  
값이 변할 수 있는 일반 변수와 한번 초기 값이 설정되면 절대 변경 불가한 상수를 구분하려고 이름 규칙을 다르게 합니다.  
C에서 사용하는 규칙을 가져와 상수는 모든 문자를 대문자로 쓰고, 단어가 바뀔 때는 밑줄을 사용합니다.

```javascript
// 좋은 예
const TOTAL_COUNT = 10;

// 나쁜 예: 낙타 표기법
const totalCount = 10;

// 나쁜 예: 대소문자 혼용
const total_COUNT = 10;
```

## 변수

```
// 좋은 예 - 구글 가이드
errorCount; // 약어 없음.
dnsConnectionIndex; // 대부분의 사람들은 "DNS"가 무엇을 의미하는지 알고 있습니다.
ReferrerUrl; // "URL"도 마찬가지입니다.
customerId; // "Id"는 어디에나 있고 오해의 소지가 없습니다.

// 나쁜 예 - 구글 가이드
n; // 의미가 없습니다.
nErr; // 모호한 약어.
nCompConns; // 모호한 약어.
wgcConnections; // 작성자만 그 의미를 알고 있습니다.
pcReader; // 많은 것들이 "pc"로 축약될 수 있습니다.
cstmrId; // 일부 축약된 약어.
```

## 함수

```javascript
// 좋은 예
function doSomething() {
  // 코드
}

// 나쁜 예: 대문자로 시작 (생성자 함수 제외)
function DoSomething() {
  // 코드
}

// 나쁜 예: 밑줄 사용
function do_something() {
  // 코드
}
```

## 생성자

"읽기 좋은 자바스크립트 코딩 기법" 책 내용 중...  
생성자도 다른 이름 규칙처럼 언어의 표준 라이브러리에서 따르는 규칙을 사용해야 합니다. 자바스크립트에서 생성자는 파스칼 표기법(Pascal Case)을 사용합니다.  
파스칼 표기법은 낙타 표기법과 유사하지만, 낙타 표기법과 다르게 첫 글자는 대문자로 시작합니다.  
예를 들면, anotherName 대신 AnotherName으로 이름을 짓습니다. 이렇게 하면 생성자를 변수나 함수와 쉽게 구분할 수 있습니다.  
생성자는 타입의 인스턴스를 만드는 데 사용되므로 이름은 명사로 짓습니다.

# 구문

## if

`if문의 어느 곳이라도 중괄호를 절대 빠드리면 안됩니다.` - '뱅크샐러드 가이드'와 동일

한 줄짜리 블록일 경우라도 {}를 생략하지 않으며 명확히 줄 바꿈 하여 사용한다. - 'NHN 가이드'와 동일  
한 줄짜리 블록일 경우 {}를 생략할 수 있지만, 이는 코드 구조를 애매하게 만든다.  
당장은 두 줄을 줄일 수 있겠지만 이후 오류 발생 확률이 높아 잠재된 위험 요소가 된다.

```javascript
if (condition) {
  // 코드
}

if (condition) {
  // 코드
} else {
  // 코드
}

if (condition) {
  // 코드
} else if (condition) {
  // 코드
} else {
  // 코드
}

// 나쁜 예: 중괄호가 없음
if (condition) doSomething();

// 나쁜 예: 모든 문장이 한 줄에 있음
if (condition) {
  doSomething();
}

// 나쁜 예: 중괄호 없이 모든 문장이 한 줄에 있음
if (condition) doSomething();
```

조건식이 너무 길어 가독성이 떨어진다고 생각된다면, 조건식을 변수에 담고 활용한다. - '뱅크샐러드 가이드'와 동일

```javascript
// 나쁜 예: 조건식이 너무 길어 가독성이 떨어진다.
while (
  helloWorld.longName >= thisIsLongLongVariableName ||
  isLongLongVariableNameTwo
) {}

// 좋은 예: 조건식을 변수에 담는다. (조건을 각각 그룹화하여 변수에 담을 수도 있음)
let condition2 =
  helloWorld.longName >= thisIsLongLongVariableName ||
  thisIsLongLongVariableNameTwo;

while (condition2) {}
```

## for, while, do

```javascript
for (초기화; 조건식; 증감식) {
  // 코드
}

for (변수 in 객체) {
  // 코드
}

while (조건식) {
  // 코드
}

do {
  // 코드
} while (조건식);
```

## switch

switch-case 사용 시 첫 번째 case문을 제외하고 case문 사용 이전에 개행한다. - 'NHN 가이드'와 동일

```javascript
// 좋은 예
switch (value) {
  case 1:
  // 다음 case 문에서 처리 (break 가 없다는 것을 명시적으로 주석을 남겨준다.)

  case 2:
    doSomething();
    break;

  case 3:
    return true;

  default:
    throw new Error('여기까지 실행되면 안됩니다.');
}
```

## function

`함수는 최대한 사용되기 전(코드흐름에 따라 사람이 읽어나가는 것에 우선)에 선언, content가 있는 경우에는 statement와 return문 사이에 1줄의 blank line(빈줄)을 넣는다.`

"읽기 좋은 자바스크립트 코딩 기법" 책 내용 중...  
함수는 반드시 사용하기 전에 선언되어야 합니다.  
함수가 객체에 선언된 메서드가 아니라면 반드시 함수 선언 형식을 지켜야 합니다.  
함수명과 여는 괄호 사이에는 공백을 넣지 않습니다.  
닫는 괄호와 여는 중괄호 사이에는 공백을 한 칸 넣습니다.  
여는 중괄호는 반드시 function 키워드와 같은 줄에 둡니다.  
여는 괄호 다음과 닫느 괄호 전에는 공백을 넣지 않습니다.  
인자를 입력할 때에는 콤마 다음에 한 칸 공백을 두며 콤마 앞에는 공백을 입력하지 않습니다.  
함수 본체는 한 단계 들여쓰기 합니다.

content가 있는 경우에는 statement와 return문 사이에 1줄의 blank line을 넣는다. - '뱅크샐러드 가이드'와 동일

```javascript
// 좋은 예
function doSomething(arg1, arg2) {
  return arg1 + arg2;
}

// 나쁜 예: 첫 번쨰 줄에 공백이 잘못 입력 되었음
function doSomething(arg1, arg2) {
  return arg1 + arg2;
}

// 나쁜 예: 여는 괄호가 잘못된 줄에 있음
function doSomething(arg1, arg2) {
  return arg1 + arg2;
}

// 선언 후 바로 호출하는 함수는 함수 전체를 괄호로 감싸야 합니다.
let value = (function () {
  // 함수 본체

  return {
    message: 'Hi',
  };
})();

// 나쁜 예: 내용과 리턴 사이 공백 없음
function foo() {
  var a = 1;
  return a;
}

// 나쁜 예: 리턴 위 빈공백
function bar(a, b) {
  return a + b;
}

// 좋은 예
function foo() {
  var a = 1;

  return a;
}

// 좋은 예
function bar(a, b) {
  return a + b;
}
```

## try

```javascript
try {
  // 코드
} catch (변수) {
  // 코드
}

try {
  // 코드
} catch (변수) {
  // 코드
} finally {
  // 코드
}
```

---

# 데이터(비동기) 통신

redux saga 미들웨어를 통한 데이터 통신, react component 직접 데이터 통신

데이터 활용이 지역 단위의 경우 컴포넌트에서 직접 데이터 통신, 데이터 활용이 전역(또는 전파)단위의 경우 redux saga 통한 데이터 통신 (즉, 데이터 상태관리 범위를 기준으로 한다)

## Event 중복 처리 방지

'등록'/'수정'/'삭제' 등의 버튼 클릭 후, 서버 응답이 오기 전까지 해당버튼 비활성(disabled) + API 호출 디바운싱(debounce) 처리

---

# JSDoc - 구글 가이드

https://google.github.io/styleguide/jsguide.html#jsdoc-tags  
https://google.github.io/styleguide/jsguide.html#appendices-jsdoc-tag-reference
